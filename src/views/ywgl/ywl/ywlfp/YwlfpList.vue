<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="组织标识">
              <j-tree-select placeholder="请选择所属组织"
                             v-model="queryParam.zzbz"
                             dict="hr_bas_organization,zzjc,zzbz"
                             pidField="sjzzbz"
                             treeNodeFilterProp="title"
                             :sszh="true"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"
                             :filterTreeNode="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计月份">
              <a-month-picker placeholder="请输入统计月份" v-model="queryParam.tjrq" style="width: 100%"></a-month-picker>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="员工岗位">
              <j-dict-select-tag
                placeholder="全部"
                v-model="queryParam.yggw"
                dictCode="Hr_bas_post,gwmc,gwbz"
              />
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item>
              </a-form-item>
            </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="员工工号">
              <a-input placeholder="请输入员工工号" v-model="queryParam.yggh"></a-input>
            </a-form-item>
          </a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button :loading="exportLoading" icon="download" @click="handleExportXls('业务量分配')" v-has="'ywlfp:exportXls'">导出</a-button>
      <!--<a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>-->
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <!--<div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>-->

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <!--<a @click="handleEdit(record)">编辑</a>-->

          <!--<a-divider type="vertical" />-->
          <!--<a-dropdown>-->
            <!--<a class="ant-dropdown-link">更多 <a-icon type="down" /></a>-->
            <!--<a-menu slot="overlay">-->
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)" v-has="'ywlfp:delete'">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            <!--</a-menu>-->
          <!--</a-dropdown>-->
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <ywlfp-modal ref="modalForm" @ok="modalFormOk"></ywlfp-modal>
  </a-card>
</template>

<script>
  import YwlfpModal from './modules/YwlfpModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import {filterObj} from "@/utils/util";
  import {deleteAction} from "../../../../api/manage";

  export default {
    name: "YwlfpList",
    mixins:[JeecgListMixin],
    components: {
      YwlfpModal,JTreeSelect
    },
    data () {
      return {
        description: '业务量分配管理页面',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
           },
          {
            title: '统计月份',
            align:"center",
            dataIndex: 'tjrq'
          },
          {
            title: '组织标识',
            align:"center",
            dataIndex: 'zzbz'
          },
          {
            title: '组织名称',
            align:"center",
            dataIndex: 'zzbz_dictText'
          },
		   {
            title: '员工工号',
            align:"center",
            dataIndex: 'yggh'
           },
          {
            title: '员工姓名',
            align:"center",
            dataIndex: 'yggh_dictText'
          },
          {
            title: '员工岗位',
            align:"center",
            dataIndex: 'yggw_dictText'
          },
          {
            title: '机构分配笔数',
            align:"center",
            dataIndex: 'jgfpywbs'
          },
          {
            title: '机构分配现金流量',
            align:"center",
            dataIndex: 'jgfpxjll'
          },
          {
            title: 'ATM分配笔数',
            align:"center",
            dataIndex: 'atmfpywbs'
          },
          {
            title: 'ATM分配现金流量',
            align:"center",
            dataIndex: 'atmfpxjll'
          },
          {
            title: '分配操作员',
            align:"center",
            dataIndex: 'fpczy'
          },
		   {
            title: '分配时间',
            align:"center",
            dataIndex: 'fpsj'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/ywlfp/ywlfp/list",
          delete: "/ywlfp/ywlfp/delete",
          deleteBatch: "/ywlfp/ywlfp/deleteBatch",
          exportXlsUrl: "ywlfp/ywlfp/exportXls",
          importExcelUrl: "ywlfp/ywlfp/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      getQueryParams(){
        let tjrqment = "";
        if(this.queryParam.tjrq) {
          tjrqment = this.queryParam.tjrq.format("YYYY-MM") + '-01';
        }
        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.tjrq) {
          param.tjrq = tjrqment;
        }
        return filterObj(param);
      },
      handleDelete: function (record) {
        console.log(record)
        if (!this.url.delete) {
          this.$message.error('请设置url.delete属性!')
          return
        }
        var that = this
        deleteAction(that.url.delete, { fpid: record.fpid }).then((res) => {
          if (res.success) {
            that.$message.success(res.message)
            that.loadData()
          } else {
            that.$message.warning(res.message)
          }
        })
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>