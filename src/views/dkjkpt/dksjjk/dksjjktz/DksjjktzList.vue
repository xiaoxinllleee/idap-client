<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="数据日期">
              <a-date-picker placeholder="请选择数据日期" v-model="queryParam.tjyf"  :defaultValue="defaultMonthOpera"
                             :format="DateFormat" style="width: 100%;" />
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="机构代码">
              <j-tree-select placeholder="请选择机构查询" v-model="queryParam.jgdm"
                             dict="V_HR_BAS_ORGANIZATION_CMMS, ZZJC, YWJGDM"
                             pid-field="SJYWJGDM" :showSearch="true" treeNodeFilterProp="title"
                             :tree-default-expand-all="true"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="贷款账号">
              <a-input placeholder="请输入贷款账号" v-model="queryParam.dkzh"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="客户姓名">
              <j-input placeholder="请输入客户姓名" v-model="queryParam.khmc" type="likemore"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <a-form-item label="便民卡卡号">
              <a-input placeholder="请输入便民卡卡号" v-model="queryParam.bmkkh"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="借款日期">
              <a-range-picker :placeholder="['开始日期', '结束日期']" v-model="queryParam.jkrq" :format="DateFormat"
                              @change="onQxDateChange" style="width: 100%;"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="到期日期">
              <a-range-picker :placeholder="['开始日期', '结束日期']" v-model="queryParam.dqrq" :format="DateFormat"
                              @change="onEndDateChange" style="width: 100%;"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="剩余天数">
              <a-input-group compact>
                <a-input-number placeholder="" v-model="queryParam.syts_begin" :min="0"
                                style=" width: 40%; text-align: center; "/>
                <a-input placeholder="~" disabled
                         style=" width: 20%; border-left: 0; pointer-events: none; backgroundColor: #FFF; "/>
                <a-input-number placeholder="" v-model="queryParam.syts_end" :min="0"
                                style="width: 40%; text-align: center; border-left: 0; "/>
              </a-input-group>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <a-form-item label="贷款金额">
              <a-input-group compact>
                <a-input-number placeholder="" v-model="queryParam.dkje_begin" :min="0"
                                style=" width: 40%; text-align: center; "/>
                <a-input placeholder="<->" disabled
                         style=" width: 20%; border-left: 0; pointer-events: none; backgroundColor: #FFF; "/>
                <a-input-number placeholder="" v-model="queryParam.dkje_end" :min="0"
                                style="width: 40%; text-align: center; border-left: 0;"/>
              </a-input-group>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="贷款余额">
              <a-input-group compact>
                <a-input-number placeholder="" v-model="queryParam.dkye_begin" :min="0"
                                style=" width: 40%; text-align: center; "/>
                <a-input placeholder="<->" disabled
                         style=" width: 20%; border-left: 0; pointer-events: none; backgroundColor: #FFF; "/>
                <a-input-number placeholder="" v-model="queryParam.dkye_end" :min="0"
                                style="width: 40%; text-align: center; border-left: 0; "/>
              </a-input-group>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="第一责任人">
              <j-input placeholder="请输入第一责任人" v-model="queryParam.dyzrr" type="likemore"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="主客户经理">
              <j-input placeholder="请输入主客户经理" v-model="queryParam.khjlbz" type="likemore"/>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <a-form-item label="主要责任人">
              <j-input placeholder="请输入主要责任人" v-model="queryParam.zyzrr" type="likemore"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="次要责任人">
              <j-input placeholder="请输入次要责任人" v-model="queryParam.cyzrr" type="likemore"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="清收责任人">
              <j-input placeholder="请输入清收责任人" v-model="queryParam.qszrr" type="likemore"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="清收处置时限">
              <a-input placeholder="请输入清收处置时限" v-model="queryParam.qsczsx"/>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <a-form-item label="贷款形态">
              <j-select-multiple v-model="queryParam.dkxt" :options="jselectMultiple.options1" placeholder="请选择贷款形态"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="客户类型">
              <j-dict-select-tag placeholder="请选择客户类型 " v-model="queryParam.khlx" dictCode="dkjkpt_khlx"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="贷款期限">
              <j-dict-select-tag placeholder="请选择贷款期限 " v-model="queryParam.dkqx" dictCode="dkqx"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="到期情况监测">
              <j-dict-select-tag placeholder="到期情况监测 " v-model="queryParam.dqqkjc" dictCode="dqqkjc"/>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <a-form-item label="不良形成原因">
              <j-dict-select-tag placeholder="请选择不良形成原因 " v-model="queryParam.blxcyy" dictCode="blxcyy"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="责任界定">
              <j-dict-select-tag placeholder="责任界定 " v-model="queryParam.zrjd" dictCode="zrjd"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="清收处置措施">
              <j-dict-select-tag placeholder="请选择清收处置措施" v-model="queryParam.qsczcs" dictCode="qsczcs"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="信贷贷款品种">
              <j-select-multiple v-model="queryParam.xddkpz" :options="jselectMultiple.options2" placeholder="请选择信贷贷款品种"/>
            </a-form-item>
          </a-col>
         <!-- <template v-if="toggleSearchStatus">


            <a-col :md="6" :sm="8">
              <a-form-item></a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item></a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item></a-form-item>
            </a-col>
          </template>-->

          <a-col :md="6" :sm="8">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px;">重置</a-button>
           <!--   <a @click="handleToggleSearch" style="margin-left: 8px">
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'dksjjktz:add'">新增</a-button>
      <a-button @click="handleExtract" icon="area-chart" v-has="'dksjjktz:init'">提取</a-button>
      <a-button icon="download" @click="handleExportXls('贷款数据监控台账',1)" v-has="'dksjjktz:exportXls'">导出</a-button>
      <a-button icon="import" @click="excelImport(1)" v-has="'dksjjktz:importExcel'">导入</a-button>
      <a-button icon="import" @click="excelImport(2)" v-has="'dksjjktz:importExcelGzl'">导入关注类</a-button>
      <a-button icon="download" @click="handleExportXls('贷款数据监控台账关注类',2)" v-has="'dksjjktz:exportXlsGzl'">导出关注类</a-button>
      <a-button icon="import" @click="excelImport(3)" v-has="'dksjjktz:importExcelBnbl'">导入表内不良</a-button>
      <a-button icon="download" @click="handleExportXls('贷款数据监控台账表内不良',3)" v-has="'dksjjktz:exportXlsBnbl'">导出表内不良</a-button>
     <!-- <a-button icon="import" @click="excelImport(4)" v-has="'dksjjktz:importExcelBwbl'">导入表外不良</a-button>-->
<!--      <a-button icon="download" @click="handleExportXls('贷款数据监控台账表外不良',4)" v-has="'dksjjktz:exportXlsBwbl'">导出表外不良</a-button>-->
      <a-button icon="import" @click="excelImport(5)" v-has="'dksjjktz:importExcelSszc'">导入诉讼资产</a-button>
      <a-button icon="download" @click="handleExportXls('贷款数据监控台账诉讼资产',5)" v-has="'dksjjktz:exportXlsSszc'">导出诉讼资产</a-button>
      <!--<a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px;"> 批量操作 <a-icon type="down"/></a-button>
      </a-dropdown>-->
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{
        selectedRowKeys.length }} </a> 项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>

        <span style="float: right;">
          <a @click="loadData"><a-icon type="sync"/>刷新</a>
          <a-divider type="vertical"/>
          <a-popover title="自定义列"
                     trigger="click"
                     placement="bottomLeft">
            <template slot="content">
              <a-checkbox-group @change="onColSettingsChange"
                                v-model="settingColumns"
                                :defaultValue="settingColumns">
                <a-row>
                  <template v-for="(item,index) in defColumns">
                    <template v-if="item.key!='rowIndex'&& item.dataIndex!='action'">
                        <a-col :md="8" :sm="8">
                          <a-checkbox :value="item.dataIndex">
                          {{ item.title }}
                        </a-checkbox></a-col>
                    </template>
                </template>
                </a-row>
              </a-checkbox-group>
            </template>
            <a><a-icon type="setting"/>自定义列</a>
          </a-popover>
        </span>
      </div>

      <a-table ref="table"
               size="middle"
               bordered
               rowKey="id"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               :scroll="{ x: 7000 }"
               @change="handleTableChange">

        <!-- 字符串超长截取省略号显示 -->
        <span slot="dz" slot-scope="text">
          <j-ellipsis :value="text" :length="8"/>
        </span>
        <span slot="zjhm" slot-scope="text">
          <j-ellipsis :value="text" :length="12"/>
        </span>
        <span slot="bz" slot-scope="text">
          <j-ellipsis :value="text" :length="8"/>
        </span>
        <span slot="cpmc" slot-scope="text">
          <j-ellipsis :value="text" :length="8"/>
        </span>
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'dksjjktz:edit'">编辑</a>
          <!--<a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
            <a>删除</a>
          </a-popconfirm>-->
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <dksjjktz-modal ref="modalForm" @ok="modalFormOk"></dksjjktz-modal>
    <dksjjktz-modal110 ref="modalForm110" @ok="modalFormOk"></dksjjktz-modal110>
    <excel-import ref="excelImportModal" @ok="importComplete"></excel-import>

  </a-card>
</template>

<script>
  import DksjjktzModal from './modules/DksjjktzModal'
  import DksjjktzModal110 from './modules/DksjjktzModal110'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { initDictOptions, filterDictText } from '@/components/dict/JDictSelectUtil'
  import JEllipsis from '@/components/jeecg/JEllipsis'
  import Vue from 'vue'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import ExcelImport from '@/components/common/ExcelImport'
  import { getAction, downFile } from '@/api/manage'
  import ACol from 'ant-design-vue/es/grid/Col'
  import AFormItem from 'ant-design-vue/es/form/FormItem'
  import JInput from '../../../../components/jeecg/JInput'
  import { filterObj } from '../../../../utils/util'
  import JSelectMultiple from "../../../../components/jeecg/JSelectMultiple";
  import {ajaxGetDictItems} from '@/api/api'
  import store from '@/store/'
  import moment from 'moment'

  export default {
    name: 'DksjjktzList',
    mixins: [JeecgListMixin],
    components: {
      JInput,
      AFormItem,
      ACol,
      JTreeSelect,
      DksjjktzModal,
      JEllipsis,
      ExcelImport,
      JSelectMultiple,
      DksjjktzModal110
    },
    data() {
      return {
        description: '贷款数据监控台账管理页面',
        DateFormat: 'YYYY-MM-DD',
        // 默认当前月份
        defaultMonthOpera: '',
        value: [],
        mode: ['date', 'date'],
        qybm:'',
        columns: [],
        settingColumns: [],
        khlxDictOptions: [],
        dbfsDictOptions: [],
        // 表头
        defColumns: [
          {
            title: '数据日期',
            align: 'center',
            dataIndex: 'tjyf'
          },
          {
            title: '机构代码',
            align: 'center',
            dataIndex: 'jgdm'
          },
          {
            title: '机构名称',
            align: 'center',
            dataIndex: 'jgdm_dictText'
          },
          {
            title: '客户姓名',
            align: 'center',
            dataIndex: 'khmc'
          },
          {
            title: '证件号码',
            align: 'center',
            dataIndex: 'zjhm',
            scopedSlots: { customRender: 'zjhm' }
          },
          {
            title: '客户类型',
            align: 'center',
            dataIndex: 'khlx_dictText'
          },
          {
            title: '地址',
            align: 'center',
            dataIndex: 'dz',
            scopedSlots: { customRender: 'dz' },
            width: 150
          },
          {
            title: '电话号码',
            align: 'center',
            dataIndex: 'dhhm'
          },
          {
            title: '贷款账号',
            align: 'center',
            dataIndex: 'dkzh',
            width: 160
          },
          {
            title: '便民卡卡号',
            align: 'center',
            dataIndex: 'bmkkh'
          },
          {
            title: '贷款金额',
            align: 'center',
            dataIndex: 'dkje'
          },
          {
            title: '贷款余额',
            align: 'center',
            dataIndex: 'dkye'
          },
          {
            title: '借款日期',
            align: 'center',
            dataIndex: 'jkrq',
            customRender: function(text) {
              return !text ? '' : (text.length > 10 ? text.substr(0, 10) : text)
            }
          },
          {
            title: '到期日期',
            align: 'center',
            dataIndex: 'dqrq',
            customRender: function(text) {
              return !text ? '' : (text.length > 10 ? text.substr(0, 10) : text)
            }
          },
          {
            title: '起息日',
            align: 'center',
            dataIndex: 'qxr'
          },
          {
            title: '结息日',
            align: 'center',
            dataIndex: 'jxr'
          },
          {
            title: '贷款期限',
            align: 'center',
            dataIndex: 'dkqx_dictText'
          },
          {
            title: '产品名称',
            align: 'center',
            dataIndex: 'cpmc',
            scopedSlots: { customRender: 'cpmc' }
          },
          {
            title: '剩余天数',
            align: 'center',
            dataIndex: 'syts'
          },
          {
            title: '欠息天数',
            align: 'center',
            dataIndex: 'qxts'
          },
          {
            title: '表内应计利息',
            align: 'center',
            dataIndex: 'bnyjlx'
          },
          {
            title: '表内应收利息',
            align: 'center',
            dataIndex: 'bnyslx'
          },
          {
            title: '表外应计利息',
            align: 'center',
            dataIndex: 'bwyjlx'
          },
          {
            title: '表外应收利息',
            align: 'center',
            dataIndex: 'bwyslx'
          },
          {
            title: '表内外欠息和',
            align: 'center',
            dataIndex: 'bnwqxh'
          },
          {
            title: '贷款利率(%)',
            align: 'center',
            dataIndex: 'dkll'
          },
          {
            title: '担保方式',
            align: 'center',
            dataIndex: 'dbfs_dictText'
          },
          {
            title: '第一责任人',
            align: 'center',
            dataIndex: 'dyzrr'
          },
          {
            title: '主客户经理',
            align: 'center',
            dataIndex: 'khjlbz'
          },
          {
            title: '客户经理员工工号',
            align: 'center',
            dataIndex: 'khjlyggh'
          },
          {
            title: '所属行业类型',
            align:"center",
            dataIndex: 'khsshylx_dictText',
            // scopedSlots: { customRender: 'khsshylx' },
            width: 300
          },
          {
            title: '贷款投向',
            align: 'center',
            dataIndex: 'dktx_dictText'
          },
          {
            title: '贷款形态',
            align: 'center',
            dataIndex: 'dkxt_dictText'
          },
          {
            title: '信贷贷款品种',
            align: 'center',
            dataIndex: 'xddkpz_dictText'
          },
          {
            title: '到期情况监测',
            align: 'center',
            dataIndex: 'dqqkjc_dictText'
          },
          {
            title: '不良形成原因',
            align: 'center',
            dataIndex: 'blxcyy_dictText'
          },
          {
            title: '责任界定',
            align: 'center',
            dataIndex: 'zrjd_dictText'
          },
          {
            title: '清收处置措施',
            align: 'center',
            dataIndex: 'qsczcs_dictText'
          },
          {
            title: '清收处置时限',
            align: 'center',
            dataIndex: 'qsczsx'
          },
          {
            title: '主要责任人',
            align: 'center',
            dataIndex: 'zyzrr'
          },
          {
            title: '次要责任人',
            align: 'center',
            dataIndex: 'cyzrr'
          },
          {
            title: '清收责任人',
            align: 'center',
            dataIndex: 'qszrr'
          },
          {
            title: '贷款责任人',
            align: 'center',
            dataIndex: 'dkzrr'
          },
          {
            title: '审核状态',
            align: 'center',
            dataIndex: 'shzt_dictText'
          },
          {
            title: '备注',
            align: 'center',
            dataIndex: 'bz',
            scopedSlots: { customRender: 'bz' }
          },
          {
            title: '录入时间',
            align: 'center',
            dataIndex: 'lrsj'
          },
          {
            title: '录入标识',
            align: 'center',
            dataIndex: 'lrbz_dictText'
          },
          {
            title: '录入人',
            align: 'center',
            dataIndex: 'lrr'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            fixed: 'right',
            scopedSlots: { customRender: 'action' },
            width: 100
          }
        ],
        url: {
          list: '/bndksjjktz/dndksjjktz/list',
          delete: '/bndksjjktz/dndksjjktz/delete',
          deleteBatch: '/bndksjjktz/dndksjjktz/deleteBatch',
          exportXlsUrl: 'bndksjjktz/dndksjjktz/exportXls',
          exportXlsUrlGzl: 'bndksjjktz/dndksjjktz/exportXlsGzl',
          exportXlsUrlBnbl: 'bndksjjktz/dndksjjktz/exportXlsBnbl',
          exportXlsUrlBwbl: 'bndksjjktz/dndksjjktz/exportXlsBwbl',
          exportXlsUrlSszc: 'bndksjjktz/dndksjjktz/exportXlsSszc',
          importExcelUrl: 'bndksjjktz/dndksjjktz/importExcel',
          exportTemplateUrl: '/bndksjjktz/dndksjjktz/exportTemplateXls',
          exportTemplateUrlGzl: '/bndksjjktz/dndksjjktz/exportTemplateXlsGzl',
          exportTemplateUrlBnbl: '/bndksjjktz/dndksjjktz/exportTemplateXlsBnbl',
          exportTemplateUrlBwbl: '/bndksjjktz/dndksjjktz/exportTemplateXlsBwbl',
          exportTemplateUrlSszc: '/bndksjjktz/dndksjjktz/exportTemplateXlsSszc',
          init: '/bndksjjktz/dndksjjktz/init'
        },
        jselectMultiple:{
          options1:[],
          options2:[],
        },
      }
    },
    computed: {
      importExcelUrl: function() {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      }
    },
    methods: {
      handleEdit: function (record) {
        console.log(this.qybm)
        if (this.qybm == "110" || this.qybm == "560"){
          this.$refs.modalForm110.edit(record)
          this.$refs.modalForm110.title = '编辑'
          this.$refs.modalForm110.disableSubmit = false
        }else {
          this.$refs.modalForm.edit(record)
          this.$refs.modalForm.title = '编辑'
          this.$refs.modalForm.disableSubmit = false
        }

      },

      initDictData(dictCode) {
        //根据字典Code, 初始化字典数组
        ajaxGetDictItems(dictCode, null).then((res) => {
          if (res.success) {
            if (dictCode=='dkxt') {
              this.jselectMultiple.options1 = res.result;
            }
            if (dictCode=='dkzl') {
              this.jselectMultiple.options2 = res.result;
            }
          }
        })
      },
      onQxDateChange: function(value, dateString) {
        let jkrqDateString = dateString
        this.queryParam.jkrq_begin = jkrqDateString[0]
        this.queryParam.jkrq_end = jkrqDateString[1]
      },
      onEndDateChange: function(value, dateString) {
        let dqrqDateString = dateString
        this.queryParam.dqrq_begin = dqrqDateString[0]
        this.queryParam.dqrq_end = dqrqDateString[1]
      },
      getQueryParams: function() {
        let tjyfMoment = "";
        if (this.queryParam.tjyf){
          tjyfMoment = moment(this.queryParam.tjyf).format("YYYY-MM-DD");
        }
        var param = Object.assign({}, this.queryParam, this.isorter)
        param.field = this.getQueryField()
        param.pageNo = this.ipagination.current
        param.pageSize = this.ipagination.pageSize
        param.tjyf  = tjyfMoment;
        delete param.jkrq
        delete param.dqrq
        return filterObj(param)
      },
      handleExportXls(fileName,num) {
        let httpurl = '';
        if(num==1){
          httpurl += this.url.exportXlsUrl;
        } else if(num==2){
          httpurl += this.url.exportXlsUrlGzl;
        }else if(num==3){
          httpurl += this.url.exportXlsUrlBnbl;
        }else if(num==4){
          httpurl += this.url.exportXlsUrlBwbl;
        }else {
          httpurl += this.url.exportXlsUrlSszc
        }

        if (!fileName || typeof fileName != 'string') {
          fileName = '导出文件'
        }
        let param = { ...this.queryParam }
        if (this.selectedRowKeys && this.selectedRowKeys.length > 0) {
          param['selections'] = this.selectedRowKeys.join(',')
        }
        if (param.tjyf != null) {
          param.tjyf = param.tjyf.format('YYYY-MM-DD')
        }
        delete param.dqrq
        delete param.jkrq

        let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()))
        param.paramsStr = paramsStr
        console.log('导出参数', param)
        downFile(httpurl, param).then((data) => {
          if (!data) {
            this.$message.warning('文件下载失败')
            return
          }
          var blob = new Blob([data])
          if ('msSaveOrOpenBlob' in navigator) {
            window.navigator.msSaveOrOpenBlob(blob, fileName + '.xls')
            return
          }
          var eleLink = document.createElement('a')
          eleLink.download = fileName + '.xls'
          eleLink.style.display = 'none'
          eleLink.href = URL.createObjectURL(blob)
          document.body.appendChild(eleLink)
          eleLink.click()
          document.body.removeChild(eleLink)
        })
      },
      excelImport(num) {
        let params = {}
        if (num == 1){
          params.exportTemplateUrl = this.url.exportTemplateUrl
          params.importExcelUrl = this.importExcelUrl
          params.exportTemplateName = '贷款数据监控台账导入模板'
        }else if (num ==2){
          params.exportTemplateUrl = this.url.exportTemplateUrlGzl
          params.importExcelUrl = "/bndksjjktz/dndksjjktz/importExcelGzl"
          params.exportTemplateName = '贷款数据监控台账关注类导入模板'
        }else if (num==3){
          params.exportTemplateUrl = this.url.exportTemplateUrlBnbl
          params.importExcelUrl = "/bndksjjktz/dndksjjktz/importExcelBnbl"
          params.exportTemplateName = '贷款数据监控台账表内不良导入模板'
        }else if (num ==4){
          params.exportTemplateUrl = this.url.exportTemplateUrlBwbl
          params.importExcelUrl = "/bndksjjktz/dndksjjktz/importExcelBwbl"
          params.exportTemplateName = '贷款数据监控台账表外不良导入模板'
        }else {
          params.exportTemplateUrl = this.url.exportTemplateUrlSszc
          params.importExcelUrl = "/bndksjjktz/dndksjjktz/importExcelSszc"
          params.exportTemplateName = '贷款数据监控台账诉讼资产导入模板'
        }
        this.$refs.excelImportModal.showModal(params)
      },

      importComplete() {
        this.loadData()
      },
      //列设置更改事件
      onColSettingsChange(checkedValues) {
        var key = this.$route.name + ':colsettings'
        Vue.ls.set(key, checkedValues, 7 * 24 * 60 * 60 * 1000)
        this.settingColumns = checkedValues
        const cols = this.defColumns.filter(item => {
          if (item.key == 'rowIndex' || item.dataIndex == 'action') {
            return true
          }
          if (this.settingColumns.includes(item.dataIndex)) {
            return true
          }
          return false
        })
        this.columns = cols
      },

      initColumns() {
        var key = this.$route.name + ':colsettings'
        let colSettings = Vue.ls.get(key)
        if (colSettings == null || colSettings == undefined) {
          let allSettingColumns = []
          this.defColumns.forEach(function(item, i, array) {
            allSettingColumns.push(item.dataIndex)
          })
          this.settingColumns = allSettingColumns
          this.columns = this.defColumns
        } else {
          this.settingColumns = colSettings
          const cols = this.defColumns.filter(item => {
            if (item.key == 'rowIndex' || item.dataIndex == 'action') {
              return true
            }
            if (colSettings.includes(item.dataIndex)) {
              return true
            }
            return false
          })
          this.columns = cols
        }
      },

      handleExtract() {
        this.loading = true
        let params = {}
        getAction(this.url.init, params).then((res) => {
          if (res.success) {
            this.loadData()
            this.$message.success(res.message)
          } else {
            this.$message.warning(res.message,5)
          }
          this.loading = false
        })
      }
    },
    created() {
      this.qybm = store.getters.qybm
      this.initColumns()
      this.initDictData('dkxt')
      this.initDictData('dkzl')
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>