<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="机构代码">
              <j-tree-select placeholder="请选择机构查询" v-model="queryParam.jgdm"
                             dict="V_HR_BAS_ORGANIZATION_CMMS, ZZJC, YWJGDM" pid-field="SJYWJGDM"
                             treeNodeFilterProp="title"
                              :tree-default-expand-all="true"/>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <a-form-item label="贷款账号">
              <a-input placeholder="请输入贷款账号" v-model="queryParam.dkzh"/>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"/>
            </a-form-item>
          </a-col>


          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8">
              <a-form-item label="客户名称">
                <a-input placeholder="请输入客户名称" v-model="queryParam.khmc"></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="贷款形态">
                <j-select-multiple v-model="queryParam.dkxt" :options="jselectMultiple.options" placeholder="请选择贷款形态"/>
              </a-form-item>
            </a-col>

            <a-col :md="6" :sm="8">
              <a-form-item label="到期时间区间">
                <j-dict-select-tag placeholder="请选择到期时间区间"
                                   v-model="queryParam.dqlx"
                                   dictCode="dqlx"/>
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
      <a-button icon="download" @click="handleExportXls('贷款到期预警')" style="margin-left: 8px;" v-has="'dkdqyj:exportXls'">
        导出
      </a-button>

    </div>

    <!-- table区域-begin -->
    <div>
      <!--      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">-->
      <!--        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择-->
      <!--        <a style="font-weight: 600;">{{ selectedRowKeys.length }}</a> 项-->
      <!--        <a style="margin-left: 24px;" @click="onClearSelected">清空</a>-->
      <!--      </div>-->

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{ x: 3000 }"
        @change="handleTableChange">

        <!-- 字符串超长截取省略号显示 -->
        <span slot="dz" slot-scope="text">
          <j-ellipsis :value="text" :length="8"/>
        </span>
        <span slot="dkzh" slot-scope="text">
          <j-ellipsis :value="text" :length="8"/>
        </span>
        <span slot="xddkpz" slot-scope="text">
          <j-ellipsis :value="text" :length="8"/>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <dkdqyj-modal ref="modalForm" @ok="modalFormOk"></dkdqyj-modal>
  </a-card>
</template>

<script>
import DkdqyjModal from './modules/DkdqyjModal'
import {JeecgListMixin} from '@/mixins/JeecgListMixin'
import JEllipsis from '@/components/jeecg/JEllipsis'
import JTreeSelect from '../../../../components/jeecg/JTreeSelect'
import AFormItem from 'ant-design-vue/es/form/FormItem'
import JSelectMultiple from "../../../../components/jeecg/JSelectMultiple";
import {ajaxGetDictItems} from '@/api/api'

export default {
  name: 'DkdqyjList',
  mixins: [JeecgListMixin],
  components: {
    AFormItem,
    JTreeSelect,
    DkdqyjModal,
    JEllipsis,
    JSelectMultiple
  },
  data() {
    return {
      description: '贷款到期预警管理页面',
      // 表头
      columns: [
        /* {
           title: '序号',
           dataIndex: '',
           key: 'rowIndex',
           width: 60,
           align: "center",
           customRender:function (t,r,index) {
             return parseInt(index)+1;
           }
         },*/
        /*  {
            title: '机构代码',
            align:"center",
            dataIndex: 'jgdm',
            width: 100
          },*/
        {
          title: '机构名称',
          align: 'center',
          dataIndex: 'jgdm_dictText',
          width: 100
        },
        {
          title: '客户名称',
          align: 'center',
          dataIndex: 'khmc',
          width: 100
        },
        {
          title: '证件号码',
          align: 'center',
          dataIndex: 'zjhm',
          width: 130
        },

        {
          title: '地址',
          align: 'center',
          dataIndex: 'dz',
          scopedSlots: {customRender: 'dz'},
          width: 140
        },
        {
          title: '电话号码',
          align: 'center',
          dataIndex: 'dhhm',
          width: 100
        },

        {
          title: '贷款金额',
          align: 'center',
          dataIndex: 'dkje',
          width: 100
        },
        {
          title: '贷款余额',
          align: 'center',
          dataIndex: 'dkye',
          width: 100
        },
        {
          title: '到期日期',
          align: 'center',
          dataIndex: 'dqrq',
          width: 100,
          sorter: (a, b) => b.dqrq.replace(/-/g, '/') - a.dqrq.replace(/-/g, '/')
        },
        {
          title: '借款日期',
          align: 'center',
          dataIndex: 'jkrq',
          width: 100
        },
        {
          title: '剩余天数',
          align: 'center',
          dataIndex: 'syts',
          width: 100,
          sorter: (a, b) => a.syts - b.syts
        },
        {
          title: '贷款账号',
          align: 'center',
          dataIndex: 'dkzh',
          scopedSlots: {customRender: 'dkzh'},
          width: 150
        },
        {
          title: '贷款期限',
          align: 'center',
          dataIndex: 'dkqx_dictText',
          width: 100
        },


        {
          title: '客户类型',
          align: 'center',
          dataIndex: 'khlx_dictText',
          width: 100
        },
        {
          title: '第一责任人',
          align: 'center',
          dataIndex: 'dyzrr',
          width: 100
        },
        {
          title: '客户经理标识',
          align: 'center',
          dataIndex: 'khjlbz',
          width: 100
        },
        {
          title: '贷款形态',
          align: 'center',
          dataIndex: 'dkxt_dictText',
          width: 100
        },
        {
          title: '信贷贷款品种',
          align: 'center',
          dataIndex: 'xddkpz_dictText',
          width: 120
        },
        {
          title: '主要责任人',
          align: 'center',
          dataIndex: 'zyzrr',
          width: 100
        },
        {
          title: '次要责任人',
          align: 'center',
          dataIndex: 'cyzrr',
          width: 100
        },
        {
          title: '清收责任人',
          align: 'center',
          dataIndex: 'qszrr',
          width: 100
        }
        /*{
          title: '便民卡卡号',
          align:"center",
          dataIndex: 'bmkkh',
          scopedSlots: { customRender: 'bmkkh' },
          width: 150
        },
        {
          title: '起息日',
          align:"center",
          dataIndex: 'qxr',
          width: 100
        },
        {
          title: '结息日',
          align:"center",
          dataIndex: 'jxr',
          width: 100
        },
        {
          title: '产品名称',
          align:"center",
          dataIndex: 'cpmc',
          scopedSlots: { customRender: 'cpmc' },
          width: 150
        },
        {
          title: '欠息天数',
          align:"center",
          dataIndex: 'qxts',
          width: 100
        },
        {
          title: '表内应计利息',
          align:"center",
          dataIndex: 'bnyjlx',
          width: 120
        },
        {
          title: '表内应收利息',
          align:"center",
          dataIndex: 'bnyslx',
          width: 120
        },
        {
          title: '表外应计利息',
          align:"center",
          dataIndex: 'bwyjlx',
          width: 120
        },
        {
          title: '表外应收利息',
          align:"center",
          dataIndex: 'bwyslx',
          width: 120
        },
        {
          title: '表内外欠息和',
          align:"center",
          dataIndex: 'bnwqxh',
          width: 120
        },
        {
          title: '贷款利率',
          align:"center",
          dataIndex: 'dkll',
          width: 100
        },
        {
          title: '担保方式',
          align:"center",
          dataIndex: 'dbfs',
          width: 100
        },
        {
          title: '客户经理员工工号',
          align:"center",
          dataIndex: 'khjlyggh',
          width: 100
        },
        {
          title: '客户所属行业类型',
          align:"center",
          dataIndex: 'khsshylx',
          width: 100
        },
        {
          title: '贷款投向',
          align:"center",
          dataIndex: 'dktx',
          width: 100
        },
        {
          title: '到期情况监测',
          align:"center",
          dataIndex: 'dqqkjc',
          width: 120
        },
        {
          title: '不良形成原因',
          align:"center",
          dataIndex: 'blxcyy',
          width: 120
        },
        {
          title: '责任界定',
          align:"center",
          dataIndex: 'zrjd',
          width: 100
        },
        {
          title: '清收处置措施',
          align:"center",
          dataIndex: 'qsczcs',
          scopedSlots: { customRender: 'qsczcs' },
          width: 120
        },
        {
          title: '清收处置时限',
          align:"center",
          dataIndex: 'qsczsx',
          width: 120
        },
        {
          title: '贷款责任人',
          align:"center",
          dataIndex: 'dkzrr',
          width: 100
        },
        {
          title: '备注',
          align:"center",
          dataIndex: 'bz',
          scopedSlots: { customRender: 'bz' },
          width: 120
        },
        {
          title: '录入时间',
          align:"center",
          dataIndex: 'lrsj',
          width: 100
        },
        {
          title: '录入标识',
          align:"center",
          dataIndex: 'lrbz',
          width: 100
        },
        {
          title: '录入人',
          align:"center",
          dataIndex: 'lrr',
          width: 100
        }*/
      ],
      url: {
        list: '/dkdqyj/dkdqyj/list',
        delete: '/dkdqyj/dkdqyj/delete',
        deleteBatch: '/dkdqyj/dkdqyj/deleteBatch',
        exportXlsUrl: 'dkdqyj/dkdqyj/exportXls',
        importExcelUrl: 'dkdqyj/dkdqyj/importExcel'
      },
      jselectMultiple: {
        options: [],
      },
    }
  },
  computed: {
    importExcelUrl: function () {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    }
  },
  created() {
    this.initDictData('dkxt')
  },
  methods: {
    initDictData(dictCode) {
      //根据字典Code, 初始化字典数组
      ajaxGetDictItems(dictCode, null).then((res) => {
        if (res.success) {
          this.jselectMultiple.options = res.result;
        }
      })
    },
  }
}
</script>

<style scoped>
@import '~@assets/less/common.less'
</style>