<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row type="flex">
          <a-col :flex="1">
            <a-form-item label="组织机构">
              <j-tree-select placeholder="请选择组织机构" v-model="queryParam.zzbz" dict="hr_bas_organization, zzjc, zzbz" getAllZzjg="1"
                             pid-field="sjzzbz" treeNodeFilterProp="title" :showSearch="true" :tree-default-expand-all="true"/>
            </a-form-item>
          </a-col>
          <a-col :flex="2">
            <a-form-item label="排序方式" style="padding-left: 15px">
              <a-radio-group v-model="queryParam.pxfs" :default-value="1">
                <a-radio :value="1">高</a-radio>
                <a-radio :value="2">低</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :flex="2"></a-col>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
      <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
      <a-button icon="download" @click="handleExportXls('利率浮动排行')" style="margin-left: 8px" v-has="'llfdph:exportXls'">导出</a-button>
    </div>

    <!-- table区域-begin -->
    <div>
      <!--<div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }} </a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>-->

      <a-table ref="table"
               size="middle"
               bordered
               rowKey="id"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               @change="handleTableChange">
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <!--<zxllcx-modal ref="modalForm" @ok="modalFormOk"></zxllcx-modal>-->
  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { getAction,putAction } from '../../../../api/manage'
  import moment from 'moment'
  import { filterObj } from '@/utils/util';
  import JTreeSelect from '../../../../components/jeecg/JTreeSelect'
  import store from '@/store/'

  export default {
    name: "ZxllcxList",
    mixins:[JeecgListMixin],
    components: { JTreeSelect },
    data () {
      return {
        description: '利率浮动排行 管理页面',
        isorter: {
          order: 'desc'
        },
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: "center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
          },
          {
            title: '组织标识',
            align: "center",
            dataIndex: 'zzbz'
          },
          {
            title: '组织名称',
            align: "center",
            dataIndex: 'zzbz_dictText'
          },
          {
            title: '证件号码',
            align: "center",
            dataIndex: 'zjhm'
          },
          {
            title: '客户名称',
            align: "center",
            dataIndex: 'khmc'
          },
          {
            title: '执行定价ID',
            align: "center",
            dataIndex: 'djid'
          },
          // {
          //   title: '定价日期',
          //   align: "center",
          //   dataIndex: 'djrq'
          // },
          // {
          //   title: '定价年份',
          //   align: "center",
          //   dataIndex: 'djnf'
          // },
          // {
          //   title: '法人代表',
          //   align: "center",
          //   dataIndex: 'frdb'
          // },
          {
            title: '定价得分',
            align: "center",
            dataIndex: 'dfhj',
            sorter: true,
          },
          {
            title: '基准利率(%)',
            align: "center",
            dataIndex: 'jjll',
            sorter: true,
          },
          {
            title: '上浮幅度(%)',
            align: "center",
            dataIndex: 'sffd',
            sorter: true,
          },
          {
            title: '执行利率(%)',
            align: "center",
            dataIndex: 'zxll',
            sorter: true,
          },
          // {
          //   title: 'LPR利率',
          //   align: "center",
          //   dataIndex: 'lprll'
          // },
          // {
          //   title: '基点(加/减)BP',
          //   align: "center",
          //   dataIndex: 'jdbp'
          // },
          // {
          //   title: '修改状态',
          //   align: "center",
          //   dataIndex: 'xgzt'
          // },
          // {
          //   title: '修改时间',
          //   align: "center",
          //   dataIndex: 'xgsj'
          // },
          // {
          //   title: '修改人',
          //   align: "center",
          //   dataIndex: 'xgr'
          // },
          // {
          //   title: '录入时间',
          //   align: "center",
          //   dataIndex: 'lrsj'
          // },
          // {
          //   title: '录入操作员',
          //   align: "center",
          //   dataIndex: 'lrczy'
          // },
          // {
          //   title: '操作',
          //   dataIndex: 'action',
          //   align: "center",
          //   scopedSlots: { customRender: 'action' },
          // }
        ],
        url: {
          list: "/tjfxgl/llfdph/list",
          delete: "/tjfxgl/llfdph/delete",
          deleteBatch: "/tjfxgl/llfdph/deleteBatch",
          exportXlsUrl: "tjfxgl/llfdph/exportXls",
          importExcelUrl: "tjfxgl/llfdph/importExcel",
        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      // initQueryParams() {
      //   if (!store.getters.isRoot) {
      //     this.queryParam.zzbz = store.getters.userInfo.orgCode
      //   }
      //   this.paramsInited = true
      // },

      searchReset() {
        this.flag = false
        this.queryParam = {tjyf: undefined}
        this.queryParam.tjyf = this.defaultMonthOpera
        // if (!store.getters.isRoot) {
        //   this.queryParam.zzbz = store.getters.userInfo.orgCode
        // }
        this.loadData(1)
      },
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>