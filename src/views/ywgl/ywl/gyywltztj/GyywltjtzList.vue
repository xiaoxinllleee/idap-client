<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计月份">
              <a-month-picker placeholder="请选择统计月份" v-model="queryParam.tjyf" :defaultValue="defaultMonthOpera"
                              :format="dateFormat" style="width: 100%;"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="组织标识">
              <j-tree-select placeholder="请选择组织标识"
                             v-model="queryParam.zzbz"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="岗位标识">
              <j-dict-select-tag
                placeholder="全部"
                v-model="queryParam.yggw"
                dictCode="Hr_bas_post,gwmc,gwbz"
              />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="员工工号">
              <a-input placeholder="请输入员工工号" v-model="queryParam.yggh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <!--<a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>-->
            </span>
          </a-col>
        </a-row>

      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <!--<a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button icon="download" @click="handleExportXls('柜员业务量统计调整')">导出</a-button>
      <!--<a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>-->
      <a-button icon="area-chart" @click="init">提取</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <gyywltjtz-modal ref="modalForm" @ok="modalFormOk"></gyywltjtz-modal>
  </a-card>
</template>

<script>
  import GyywltjtzModal from './modules/GyywltjtzModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import moment from 'moment'
  import {filterObj} from "@/utils/util";
  import {getAction} from "@/api/manage";

  export default {
    name: "GyywltjtzList",
    mixins:[JeecgListMixin],
    components: {
      GyywltjtzModal,JTreeSelect
    },
    data () {
      return {
        description: '柜员业务量统计调整管理页面',
        defaultMonthOpera: '',
        dateFormat: '',
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
            dataIndex: 'tjyf'
           },
		   {
            title: '网点',
            align:"center",
            dataIndex: 'zzbz_dictText'
           },
          {
            title: '员工姓名',
            align:"center",
            dataIndex: 'yggh_dictText'
          },
		   {
            title: '岗位名称',
            align:"center",
            dataIndex: 'gwbz_dictText'
           },
		   {
            title: '网点情况',
            align:"center",
            dataIndex: 'wdqk'
           },
		   {
            title: '所在网点月平均业务量',
            align:"center",
            dataIndex: 'szwdpjywl'
           },
		   {
            title: '柜员月累计业务量',
            align:"center",
            dataIndex: 'gyyljywl'
           },
		   {
            title: '手工调整业务量',
            align:"center",
            dataIndex: 'sgtzywl'
           },
		   {
            title: '所在网点月平均现金流量',
            align:"center",
            dataIndex: 'szwdypjxjll'
           },
		   {
            title: '柜员月累计现金流量',
            align:"center",
            dataIndex: 'gyyljxjll'
           },
		   {
            title: '手工调整现金流量',
            align:"center",
            dataIndex: 'sgtzxjll'
           },
          {
            title: '录入时间',
            align:"center",
            dataIndex: 'lrsj'
          },
		   {
            title: '录入标识',
            align:"center",
            dataIndex: 'lrbz_dictText'
           },
          {
            title: '录入人',
            align:"center",
            dataIndex: 'lrr'
          },

          /*{
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/gyywltjtz/gyywltjtz/list",
          delete: "/gyywltjtz/gyywltjtz/delete",
          deleteBatch: "/gyywltjtz/gyywltjtz/deleteBatch",
          exportXlsUrl: "gyywltjtz/gyywltjtz/exportXls",
          importExcelUrl: "gyywltjtz/gyywltjtz/importExcel",
          init: "/gyywltjtz/gyywltjtz/init",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      init(){
        if (!this.queryParam.tjyf){
          this.$message.warning("统计月份不能为空！");
          return
        }
        if (this.queryParam.tjyf){
          this.queryParam.tjyf = moment(this.queryParam.tjyf).format("YYYY-MM") + '-01';
        }
        getAction(this.url.init,this.queryParam).then((res)=>{
          if(res.code===500){
            this.$message.warning(res.message,5)
          }else if (res.code===200){
            this.$message.success(res.message)
          }
        });
      },

      getQueryParams(){
        let tjrqment = "";
        if(this.queryParam.tjyf) {
          tjrqment = moment(this.queryParam.tjyf).format("YYYY-MM") + '-01';
        }
        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.tjyf) {
          param.tjyf = tjrqment;
        }
        return filterObj(param);
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>