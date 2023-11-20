<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计日期">
              <a-date-picker v-model="queryParam.tjrq" placeholder="请选择统计日期" style="width: 100%;":defaultValue="defaultMonthOpera"
                             :format="monthFormat"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="组织标志">
              <j-tree-select placeholder="请选择所属支行" v-model="queryParam.zzbz"
                             dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                             show-search :showSearch="true" :treeDefaultExpandAll="true" :filterTreeNode="true" :isAll="false"/>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="员工工号">
              <a-input placeholder="请输入员工工号" v-model="queryParam.yggh"></a-input>
            </a-form-item>
          </a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('个人汇总统计')" v-has="'Grzfhztj:exp'">导出</a-button>
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
        :scroll="{x: 2500}"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
<!--    <grzfhztj-modal ref="modalForm" @ok="modalFormOk"></grzfhztj-modal>-->
  </a-card>
</template>

<script>
 /* import GrzfhztjModal from './modules/GrzfhztjModal'*/
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
 import JTreeSelect from '@comp/jeecg/JTreeSelect'
 import moment from 'moment'
 import { filterObj } from '@/utils/util'
 import store from '@/store/'
  export default {
    name: "GrzfhztjList",
    mixins:[JeecgListMixin],
    components: {
      JTreeSelect
    },
    data () {
      return {
        description: '个人汇总统计管理页面',
        defaultMonthOpera: undefined,
        monthFormat: 'YYYY-MM-DD',
        // 表头
        columns:[],
        columns1: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: 'center',
            customRender: function(t, r, index) {
              return parseInt(index) + 1
            }
          },
          {
            title: '统计日期',
            align: 'center',
            dataIndex: 'tjrq',
            width: 110
          },
          {
            title: '组织标志',
            align: 'center',
            dataIndex: 'zzbz'
          },
          {
            title: '组织名称',
            align: 'center',
            dataIndex: 'zzbz_dictText',
            width: 120
          },
          {
            title: '岗位名称',
            align: 'center',
            dataIndex: 'gwbz_dictText'
          },
          {
            title: '员工工号',
            align: 'center',
            dataIndex: 'yggh'
          },
          {
            title: '员工姓名',
            align: 'center',
            dataIndex: 'yggh_dictText'
          },
          {
            title: '农户',
            align: 'center',
            children: [
              {
                title: '本日走访数',
                align: 'center',
                dataIndex: 'nhbrzfs',
                scopedSlots: { customRender: 'nhbr' }
              },
              {
                title: '本周走访数',
                align: 'center',
                dataIndex: 'nhbzzfs',
                scopedSlots: { customRender: 'nhbz' }
              },
              {
                title: '本月走访数',
                align: 'center',
                dataIndex: 'nhbyzfs',
                scopedSlots: { customRender: 'nhby' }
              },
              {
                title: '本季走访数',
                align: 'center',
                dataIndex: 'nhbjzfs',
                scopedSlots: { customRender: 'nhbj' }
              },
              {
                title: '本年走访数',
                align: 'center',
                dataIndex: 'nhbnzfs',
                scopedSlots: { customRender: 'nhbn' }
              },
              {
                title: '累计走访数',
                align: 'center',
                dataIndex: 'nhljzfs',
                scopedSlots: { customRender: 'nhlj' }
              },
              {
                title: '本日有效走访数',
                align: 'center',
                dataIndex: 'nhbryxzfs',
                scopedSlots: { customRender: 'nhbryx' }
              },
              {
                title: '本周有效走访数',
                align: 'center',
                dataIndex: 'nhbzyxzfs',
                scopedSlots: { customRender: 'nhbzyx' }
              },
              {
                title: '本月有效走访数',
                align: 'center',
                dataIndex: 'nhbyyxzfs',
                scopedSlots: { customRender: 'nhbyyx' }

              },
              {
                title: '本季有效走访数',
                align: 'center',
                dataIndex: 'nhbjyxzfs',
                scopedSlots: { customRender: 'nhbjyx' }
              },
              {
                title: '本年有效走访数',
                align: 'center',
                dataIndex: 'nhbnyxzfs',
                scopedSlots: { customRender: 'nhbnyx' }
              },
              {
                title: '累计有效走访数',
                align: 'center',
                dataIndex: 'nhljyxzfs',
                scopedSlots: { customRender: 'nhljyx' }
              }
            ]
          },
          {
            title: '商户',
            align: 'center',
            children: [
              {
                title: '本日走访数',
                align: 'center',
                dataIndex: 'shbrzfs',
                scopedSlots: { customRender: 'shbr' }
              },
              {
                title: '本周走访数',
                align: 'center',
                dataIndex: 'shbzzfs',
                scopedSlots: { customRender: 'shbz' }
              },
              {
                title: '本月走访数',
                align: 'center',
                dataIndex: 'shbyzfs',
                scopedSlots: { customRender: 'shby' }
              },
              {
                title: '本季走访数',
                align: 'center',
                dataIndex: 'shbjzfs',
                scopedSlots: { customRender: 'shbj' }
              },
              {
                title: '本年走访数',
                align: 'center',
                dataIndex: 'shbnzfs',
                scopedSlots: { customRender: 'shbn' }
              },
              {
                title: '累计走访数',
                align: 'center',
                dataIndex: 'shljzfs',
                scopedSlots: { customRender: 'shlj' }
              },
              {
                title: '本日有效走访数',
                align: 'center',
                dataIndex: 'shbryxzfs',
                scopedSlots: { customRender: 'shbryx' }
              },
              {
                title: '本周有效走访数',
                align: 'center',
                dataIndex: 'shbzyxzfs',
                scopedSlots: { customRender: 'shbzyx' }
              },
              {
                title: '本月有效走访数',
                align: 'center',
                dataIndex: 'shbyyxzfs',
                scopedSlots: { customRender: 'shbyyx' }

              },
              {
                title: '本季有效走访数',
                align: 'center',
                dataIndex: 'shbjyxzfs',
                scopedSlots: { customRender: 'shbjyx' }
              },
              {
                title: '本年有效走访数',
                align: 'center',
                dataIndex: 'shbnyxzfs',
                scopedSlots: { customRender: 'shbnyx' }
              },
              {
                title: '累计有效走访数',
                align: 'center',
                dataIndex: 'shljyxzfs',
                scopedSlots: { customRender: 'shljyx' }
              }
            ]
          }
        ],
        columns2: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: 'center',
            customRender: function(t, r, index) {
              return parseInt(index) + 1
            }
          },
          {
            title: '统计日期',
            align: 'center',
            dataIndex: 'tjrq',
            width: 110
          },
          {
            title: '组织标志',
            align: 'center',
            dataIndex: 'zzbz'
          },
          {
            title: '组织名称',
            align: 'center',
            dataIndex: 'zzbz_dictText',
            width: 120
          },
          {
            title: '岗位名称',
            align: 'center',
            dataIndex: 'gwbz_dictText'
          },
          {
            title: '员工工号',
            align: 'center',
            dataIndex: 'yggh'
          },
          {
            title: '员工姓名',
            align: 'center',
            dataIndex: 'yggh_dictText'
          },
          {
            title: '农户',
            align: 'center',
            children: [
              {
                title: '本日走访数',
                align: 'center',
                dataIndex: 'nhbrzfs',
                scopedSlots: { customRender: 'nhbr' }
              },
              {
                title: '本周走访数',
                align: 'center',
                dataIndex: 'nhbzzfs',
                scopedSlots: { customRender: 'nhbz' }
              },
              {
                title: '本月走访数',
                align: 'center',
                dataIndex: 'nhbyzfs',
                scopedSlots: { customRender: 'nhby' }
              },
              {
                title: '本季走访数',
                align: 'center',
                dataIndex: 'nhbjzfs',
                scopedSlots: { customRender: 'nhbj' }
              },
              {
                title: '本年走访数',
                align: 'center',
                dataIndex: 'nhbnzfs',
                scopedSlots: { customRender: 'nhbn' }
              },
              {
                title: '累计走访数',
                align: 'center',
                dataIndex: 'nhljzfs',
                scopedSlots: { customRender: 'nhlj' }
              },
              {
                title: '本日有效走访数',
                align: 'center',
                dataIndex: 'nhbryxzfs',
                scopedSlots: { customRender: 'nhbryx' }
              },
              {
                title: '本周有效走访数',
                align: 'center',
                dataIndex: 'nhbzyxzfs',
                scopedSlots: { customRender: 'nhbzyx' }
              },
              {
                title: '本月有效走访数',
                align: 'center',
                dataIndex: 'nhbyyxzfs',
                scopedSlots: { customRender: 'nhbyyx' }

              },
              {
                title: '本季有效走访数',
                align: 'center',
                dataIndex: 'nhbjyxzfs',
                scopedSlots: { customRender: 'nhbjyx' }
              },
              {
                title: '本年有效走访数',
                align: 'center',
                dataIndex: 'nhbnyxzfs',
                scopedSlots: { customRender: 'nhbnyx' }
              },
              {
                title: '累计有效走访数',
                align: 'center',
                dataIndex: 'nhljyxzfs',
                scopedSlots: { customRender: 'nhljyx' }
              },
              {
                title: '本日二次走访数',
                align: 'center',
                dataIndex: 'nhbreczfs',
                scopedSlots: { customRender: 'nhbrec' }
              },
              {
                title: '本周二次走访数',
                align: 'center',
                dataIndex: 'nhbzeczfs',
                scopedSlots: { customRender: 'nhbzec' }
              },
              {
                title: '本月二次走访数',
                align: 'center',
                dataIndex: 'nhbyeczfs',
                scopedSlots: { customRender: 'nhbyec' }
              },
              {
                title: '本季二次走访数',
                align: 'center',
                dataIndex: 'nhbjeczfs',
                scopedSlots: { customRender: 'nhbjec' }
              },
              {
                title: '本年二次走访数',
                align: 'center',
                dataIndex: 'nhbneczfs',
                scopedSlots: { customRender: 'nhbnec' }
              },
              {
                title: '累计二次走访数',
                align: 'center',
                dataIndex: 'nhljeczfs',
                scopedSlots: { customRender: 'nhljec' }
              },
            ]
          },
          {
            title: '商户',
            align: 'center',
            children: [
              {
                title: '本日走访数',
                align: 'center',
                dataIndex: 'shbrzfs',
                scopedSlots: { customRender: 'shbr' }
              },
              {
                title: '本周走访数',
                align: 'center',
                dataIndex: 'shbzzfs',
                scopedSlots: { customRender: 'shbz' }
              },
              {
                title: '本月走访数',
                align: 'center',
                dataIndex: 'shbyzfs',
                scopedSlots: { customRender: 'shby' }
              },
              {
                title: '本季走访数',
                align: 'center',
                dataIndex: 'shbjzfs',
                scopedSlots: { customRender: 'shbj' }
              },
              {
                title: '本年走访数',
                align: 'center',
                dataIndex: 'shbnzfs',
                scopedSlots: { customRender: 'shbn' }
              },
              {
                title: '累计走访数',
                align: 'center',
                dataIndex: 'shljzfs',
                scopedSlots: { customRender: 'shlj' }
              },
              {
                title: '本日有效走访数',
                align: 'center',
                dataIndex: 'shbryxzfs',
                scopedSlots: { customRender: 'shbryx' }
              },
              {
                title: '本周有效走访数',
                align: 'center',
                dataIndex: 'shbzyxzfs',
                scopedSlots: { customRender: 'shbzyx' }
              },
              {
                title: '本月有效走访数',
                align: 'center',
                dataIndex: 'shbyyxzfs',
                scopedSlots: { customRender: 'shbyyx' }

              },
              {
                title: '本季有效走访数',
                align: 'center',
                dataIndex: 'shbjyxzfs',
                scopedSlots: { customRender: 'shbjyx' }
              },
              {
                title: '本年有效走访数',
                align: 'center',
                dataIndex: 'shbnyxzfs',
                scopedSlots: { customRender: 'shbnyx' }
              },
              {
                title: '累计有效走访数',
                align: 'center',
                dataIndex: 'shljyxzfs',
                scopedSlots: { customRender: 'shljyx' }
              }
            ]
          }
        ],
		url: {
          list: "/grhztj/grzfhztj/list",
          delete: "/grhztj/grzfhztj/delete",
          deleteBatch: "/grhztj/grzfhztj/deleteBatch",
          exportXlsUrl: "grhztj/grzfhztj/exportXls",
          importExcelUrl: "grhztj/grzfhztj/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      getQueryParams() {
        //获取查询条件
        let tjyfMoment = "";
        if (this.queryParam.tjrq){
          tjyfMoment = moment(this.queryParam.tjrq).format("YYYY-MM-DD");
        }
        var param = Object.assign({}, this.queryParam,this.filters);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.tjrq) {
          param.tjrq   = tjyfMoment;
        }
        return filterObj(param);
      },
    },
    created() {
      let qybm=store.getters.qybm
      if(qybm=='390'){
        this.columns=this.columns2
      }else {
        this.columns=this.columns1
      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>