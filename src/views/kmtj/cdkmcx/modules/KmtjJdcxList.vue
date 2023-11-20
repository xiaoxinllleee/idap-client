<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构代码">
              <j-tree-select placeholder="请选择机构查询" v-model="queryParam.jgdm"
                             dict="V_HR_BAS_ORGANIZATION_CMMS, ZZJC, YWJGDM" pid-field="SJYWJGDM" treeNodeFilterProp="title"
                             :showSearch="show" :tree-default-expand-all="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构名称">
              <a-input placeholder="请输入机构名称" v-model="queryParam.showjgdm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计月份">
              <a-month-picker placeholder="请选择统计月份" v-model="queryParam.tjyf" style="width: 100%;"
                              :defaultValue="defaultMonthOpera" :format="monthFormat"/>
            </a-form-item>
          </a-col>
      <!--  <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="期初存款余额">
              <a-input placeholder="请输入期初存款余额" v-model="queryParam.qcckye"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="期末存款余额">
              <a-input placeholder="请输入期末存款余额" v-model="queryParam.qmckye"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="存款日平余额">
              <a-input placeholder="请输入存款日平余额" v-model="queryParam.ckrpye"></a-input>
            </a-form-item>
          </a-col>
          </template>-->
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
             <!-- <a @click="handleToggleSearch" style="margin-left: 8px">
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('季度查询')">导出</a-button>
      <a-button icon="import" @click="initData">提取</a-button>
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
        :rowKey="rowKey"
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

  </a-card>
</template>

<script>

  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'
  import moment from 'moment'
  import { putAction } from '@api/manage'
  import { filterObj } from '@/utils/util'

  export default {
    name: "KmtjJdcxList",
    mixins:[JeecgListMixin],
    components: {
      JTreeSelect
    },
    data () {
      return {
        description: '季度查询管理页面',
        // 表头
        monthFormat: 'YYYY-MM',
        // 默认当前月份
        defaultMonthOpera: '',
        show: true,
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
            title: '机构代码',
            align:"center",
            dataIndex: 'jgdm'
           },
          {
            title: '机构名称',
            align:"center",
            dataIndex: 'jgdm_dictText'
           },
          {
            title: '统计月份',
            align:"center",
            dataIndex: 'tjyf',
            customRender: function (text) {
              return !text ? "" : (text.length > 8 ? text.substr(0, 7) : text)
            },
            sorter: true,
          },
		   {
            title: '期初存款余额',
            align:"center",
            dataIndex: 'qcckye'
           },
		   {
            title: '期末存款余额',
            align:"center",
            dataIndex: 'qmckye'
           },
		   {
            title: '存款日平余额',
            align:"center",
            dataIndex: 'ckrpye'
           },
		   {
            title: '期初贷款余额',
            align:"center",
            dataIndex: 'qcdkye'
           },
		   {
            title: '期末贷款余额',
            align:"center",
            dataIndex: 'qmdkye'
           },
		   {
            title: '贷款日平余额',
            align:"center",
            dataIndex: 'dkrpye'
           },
        ],
		url: {
          list: "/jdcx/kmtjJdcx/list",
          delete: "/jdcx/kmtjJdcx/delete",
          deleteBatch: "/jdcx/kmtjJdcx/deleteBatch",
          exportXlsUrl: "jdcx/kmtjJdcx/exportXls",
          importExcelUrl: "jdcx/kmtjJdcx/importExcel",
          init: "/jdcx/kmtjJdcx/init",
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
        let tjyfMoment = "";
        if(this.queryParam.tjyf) {
          tjyfMoment = moment(this.queryParam.tjyf).format("YYYY-MM")+'-01';
        }
        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.tjyf) {
          param.tjyf = tjyfMoment;
        }
        return filterObj(param);
      },
      initData() {
        let tjyf=''
        var params = Object.assign({}, this.queryParam)
        if (params.tjyf === undefined || params.tjyf === null) {
          this.$message.warning("请选择统计月份！")
          return false
        }else {
          tjyf = moment(params.tjyf).format("YYYY-MM")+"-01"
        }
        this.loading = true
        putAction(this.url.init, {'tjyf': tjyf}).then((res) => {
          if (res.success) {
            this.$message.success("提取成功！")
            this.loadData(1)
          } else {
            this.$message.warning("提取失败！")
          }
        }).catch((error) => {
          this.$message.error(error, "提取失败！")
        }).finally(() => {
          this.loading = false
        })
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>