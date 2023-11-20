<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构代码">
            <!--  <a-input placeholder="请输入机构代码" v-model="queryParam.jgdm"></a-input>-->
                <j-tree-select placeholder="请选择机构代码"
                               v-model="queryParam.jgdm"
                               treeNodeFilterProp="title"
                               pid-field="sjywjgdm"
                               dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                               :showSearch="true"
                               :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="录入时间">
              <a-range-picker @change="onChangezlrsj" v-model="queryParam.lrsj"/>
            </a-form-item>
          </a-col>
       <!-- <template v-if="toggleSearchStatus">
          </template>-->
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            <!--  <a @click="handleToggleSearch" style="margin-left: 8px">
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
   <!--   <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('贷款档案录入情况表')" v-has="'dkdalrqkb:exportXls'">导出</a-button>
     <!-- <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
      </a-upload>-->
      <a-button  icon="area-chart" @click="init" v-has="'dkdalrqkb:init'">统计</a-button>

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
        :rowKey="rowKey"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"

        @change="handleTableChange">

      <!--  <span slot="action" slot-scope="text, record">
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
        </span>-->

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <dkdalrqkb-modal ref="modalForm" @ok="modalFormOk"></dkdalrqkb-modal>
  </a-card>
</template>

<script>
  import DkdalrqkbModal from './modules/DkdalrqkbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '../../../../components/jeecg/JTreeSelect'
  import { filterObj } from '@/utils/util'
  import { getAction } from '../../../../api/manage'

  export default {
    name: "DkdalrqkbList",
    mixins:[JeecgListMixin],
    components: {
      DkdalrqkbModal,JTreeSelect
    },
    data () {
      return {
        description: '贷款档案录入情况表管理页面',
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
            title: '贷款总合同数',
            align:"center",
            dataIndex: 'zs'
           },
		   {
            title: '已上传档案数',
            align:"center",
            dataIndex: 'yscdas'
           },
		   {
            title: '未上传档案数',
            align:"center",
            dataIndex: 'wscdas'
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
		   {
            title: '录入时间',
            align:"center",
            dataIndex: 'lrsj'
           },

         /* {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/dkdalrqkb/dkdalrqkb/list",
          delete: "/dkdalrqkb/dkdalrqkb/delete",
          deleteBatch: "/dkdalrqkb/dkdalrqkb/deleteBatch",
          exportXlsUrl: "dkdalrqkb/dkdalrqkb/exportXls",
          importExcelUrl: "dkdalrqkb/dkdalrqkb/importExcel",
          init: "/dkdalrqkb/dkdalrqkb/init",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      init () {
        this.loading = true
        let params = {}
        getAction(this.url.init,params).then((res) => {
          if (res.success) {
            this.$message.success('提取成功')
            this.loadData(1)
          } else {
            this.$message.warning('提取失败')
          }
        }).catch((err) => {
          this.$message.error('提取失败', error)
        }).finally(() => {
          this.loading = false
        })
      },

      getQueryParams(){
        var param = Object.assign({},this.queryParam,this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        delete param.lrsj;
        return filterObj(param);
      },
      onChangezlrsj(value,dateString){
        let lrsjString=dateString
        this.queryParam.lrsj_begin=lrsjString[0]
        this.queryParam.lrsj_end=lrsjString[1]
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>