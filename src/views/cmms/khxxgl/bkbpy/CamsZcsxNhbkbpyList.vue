<template>
  <a-card :bordered='false'>

    <!-- 查询区域 -->
    <div class='table-page-search-wrapper'>
      <a-form layout='inline' @keyup.enter.native='searchQuery'>
        <a-row :gutter='24'>


          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='归属网格'>
              <!--<a-tree-select-->
              <!--:treeData=sswgTreeDateoptions-->
              <!--:replaceFields=replaceFields-->
              <!--v-model="queryParam.qydm"-->
              <!--:dropdownStyle="{maxHeight:'400px',overflow:'auto'}"-->
              <!--showSearch-->
              <!--treeNodeFilterProp="title"-->
              <!--&gt;-->
              <!--</a-tree-select>-->
              <WgxxTreeSelect
                :options=sswgTreeDateoptions
                :replaceFields=replaceFields
                v-model='queryParam.qydm'
                :loading='wgxxTreeLoading'
                :dropdownStyle="{maxHeight:'400px',overflow:'auto'}"
                showSearch
                treeNodeFilterProp='title'
              >
              </WgxxTreeSelect>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='户号编码'>
              <a-input placeholder='请输入户号编码' v-model='queryParam.hhbm'></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='证件号码'>
              <a-input placeholder='请输入证件号码' v-model='queryParam.zjhm'></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='客户名称'>
              <a-input placeholder='请输入客户名称' v-model='queryParam.khmc'></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='评议员姓名'>
              <a-input v-model='queryParam.pyyxm' placeholder='请选择评议员姓名' />
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='评议时间'>
              <a-date-picker v-model='queryParam.pysj' placeholder='请选择评议时间' style='width: 100%;' />
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24' v-if="qybm == '095'">
            <a-form-item label='初复评类型'>
              <a-select placeholder='请选择初复评类型' v-model='queryParam.cfplx' allowClear>
                <a-select-option value='1'>
                  初评
                </a-select-option>
                <a-select-option value='2'>
                  复评
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24' v-if="qybm == '095'">
            <a-form-item label='不予授信类型'>
              <a-select placeholder='请选择不予授信类型' v-model='queryParam.bysxType' allowClear>
                <a-select-option value='1'>
                  评议不予授信
                </a-select-option>
                <a-select-option value='2'>
                  审定不予授信
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <span style='float: left;overflow: hidden;' class='table-page-search-submitButtons'>
              <a-button type='primary' @click='searchQuery' icon='search'>查询</a-button>
              <a-button @click='searchReset' icon='reload' style='margin-left: 8px'>重置</a-button>
              <a @click='handleToggleSearch' style='margin-left: 8px'>
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'" />
              </a>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class='table-operator'>
      <a-button icon='download' :loading='exportLoading' @click="handleExportXls('农户背靠背评议')"
                v-has="'CamsZcsxNhbkbpy:exp'">导出
      </a-button>
      <a-button icon='download' :loading='exportLoading2' @click='bmddc()' v-if="qybm=='425' || qybm=='405'">
        导出白名单
      </a-button>
      <a-button icon='download' :loading='exportJcxxLoading' v-if="qybm=='420'"
                @click="exportJcxxXlsByUrl('基础信息收集表')">导出基础信息收集表
      </a-button>
      <a-button icon='download' :loading='exportPysjLoading' v-has="'CamsZcsxNhbkbpy:pyxxExport'"
                @click="exportPysjXlsByUrl('评议数据明细表')">导出评议数据
      </a-button>
      <a-button icon='import' v-has="'CamsZcsxNhbkbpy:pyxxImport'" @click='importPysjXlsByUrl'>导入评议数据</a-button>
      <a-dropdown v-if='selectedRowKeys.length > 0'>
        <a-menu slot='overlay'>
          <a-menu-item key='1' @click='batchDel'>
            <a-icon type='delete' />
            删除
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class='ant-alert ant-alert-info' style='margin-bottom: 16px;'>
        <i class='anticon anticon-info-circle ant-alert-icon'></i> 已选择 <a
        style='font-weight: 600'>{{ selectedRowKeys.length }}</a>项
        <a style='margin-left: 24px' @click='onClearSelected'>清空</a>
      </div>

      <a-table
        ref='table'
        size='middle'
        bordered
        :rowKey='rowKey'
        :columns='columns'
        :dataSource='dataSource'
        :pagination='ipagination'
        :loading='loading'
        :scroll='{ x: 1800 }'
        :rowSelection='{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}'
        @change='handleTableChange'>
        <span slot='detail' slot-scope='khmc,record'>
          <a @click='viewBkbpy(record)'>{{ khmc }}</a>
        </span>
        <span slot='action' slot-scope='text, record'>
          <a @click='handleEdit(record)'>编辑</a>

          <a-divider type='vertical' />
          <a-dropdown>
            <a class='ant-dropdown-link'>更多 <a-icon type='down' /></a>
            <a-menu slot='overlay'>
              <a-menu-item>
                <a-popconfirm title='确定删除吗?' @confirm='() => handleDelete(record.id)'>
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->
    <bysxqk-modal ref='bysxqkModal'></bysxqk-modal>
    <jcxxpy-modal ref='jcxxpyModal'></jcxxpy-modal>
    <jydzpy-modal ref='jydzpyModal'></jydzpy-modal>
    <dzpy-modal ref='dzpyModal'></dzpy-modal>
    <qtpy-modal ref='qtpyModal'></qtpy-modal>
    <excel-import-ny ref='excelImportModal' @ok='endImport' />
    <!-- 表单区域 -->
  </a-card>
</template>

<script>
import ExcelImport from '@/components/common/ExcelImport'
import BysxqkModal from '@views/cmms/khxxgl/khflgl/nhxq/modules/BysxqkModal'
import JcxxpyModal from '@views/cmms/khxxgl/khflgl/nhxq/modules/JcxxpyModal'
import JydzpyModal from '@views/cmms/khxxgl/khflgl/nhxq/modules/JydzpyModal'
import DzpyModal from '@views/cmms/khxxgl/khflgl/nhxq/modules/DzpyModal'
import QtpyModal from '@views/cmms/khxxgl/khflgl/nhxq/modules/QtpyModal'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import JTreeSelectNotJg from '@/components/jeecg/JTreeSelectNotJg'
import WgxxTreeSelect from '@/components/jeecg/WgxxTreeSelect'
import { getAction, downFile } from '@api/manage'
import { filterObj } from '@/utils/util'
import moment from 'moment'
import Vue from 'vue'
import ExcelImportNy from '@views/cmms/khxxgl/bkbpy/ExcelImportNy'
import {
  USER_INFO
} from '@/store/mutation-types'
import store from '@/store/'
import { syncGwxxZzbz } from '@api/api'

export default {
  name: 'CamsZcsxNhbkbpyList',
  mixins: [JeecgListMixin],
  components: {
    JTreeSelectNotJg,
    WgxxTreeSelect,
    BysxqkModal,
    JcxxpyModal,
    JydzpyModal,
    DzpyModal,
    QtpyModal,
    ExcelImport,
    ExcelImportNy
  },
  data() {
    return {
      description: '农户背靠背评议管理页面',
      exportLoading2: false,
      exportJcxxLoading: false,
      exportPysjLoading: false,
      importPysjLoading: false,
      wgxxTreeLoading: false,
      qybm: '',
      sswgTreeDateoptions: [],
      replaceFields:
        { children: 'children', title: 'wgmc', key: 'wgbh', value: 'wgbh' },
      // 表头
      columns: [],
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
        // {
        //      title: 'hmcId',
        //      align:"center",
        //      dataIndex: 'hmcId'
        //     },
        {
          title: '所属网格',
          align: 'center',
          dataIndex: 'qydm_dictText'
        },
        {
          title: '户号编码',
          align: 'center',
          dataIndex: 'hhbm'
        },
        {
          title: '证件号码',
          align: 'center',
          width: 180,
          dataIndex: 'zjhm'
        },
        {
          title: '客户名称',
          align: 'center',
          width: 80,
          dataIndex: 'khmc',
          scopedSlots: { customRender: 'detail' }
        },
        {
          title: '评议轮数',
          align: 'center',
          width: 80,
          dataIndex: 'pyls'
        },
        {
          title: '评议类型',
          align: 'center',
          width: 80,
          dataIndex: 'pylx_dictText'
        },
        {
          title: '是否了解情况',
          align: 'center',
          width: 110,
          dataIndex: 'sfljqk_dictText'
        },
        {
          title: '建议授信额度',
          align: 'center',
          width: 110,
          dataIndex: 'jysxed'
        },
        {
          title: '评议员建议额度',
          align: 'center',
          width: 120,
          dataIndex: 'pyyjyed'
        },
        {
          title: '不予授信情形',
          align: 'center',
          dataIndex: 'bysxqx_dictText'
        },
        {
          title: '评议员姓名',
          align: 'center',
          width: 100,
          dataIndex: 'pyyxm'
        },
        {
          title: '评议员证件号码',
          align: 'center',
          width: 180,
          dataIndex: 'pyyzjhm'
        },

        {
          title: '评议时间',
          align: 'center',
          width: 100,
          dataIndex: 'pysj'
        },
        {
          title: '备注',
          align: 'center',
          dataIndex: 'bz'
        }
        // {
        //      title: '年龄',
        //      align:"center",
        //      dataIndex: 'nl'
        //     },
        // {
        //      title: '性别',
        //      align:"center",
        //      dataIndex: 'xb_dictText'
        //     },
        // {
        //      title: '经营项目',
        //      align:"center",
        //      dataIndex: 'jyxm'
        //     },
        // {
        //      title: '家庭收入',
        //      align:"center",
        //      dataIndex: 'jtsr'
        //     },
        // {
        //      title: '资产情况',
        //      align:"center",
        //      dataIndex: 'zcqk'
        //     },
        // {
        //      title: '是否有稳定收入',
        //      align:"center",
        //      dataIndex: 'sfywdsr'
        //     },
        // {
        //      title: '诚信度',
        //      align:"center",
        //      dataIndex: 'cxd_dictText'
        //     },
        // {
        //      title: '是否建议授信',
        //      align:"center",
        //      dataIndex: 'sfjysx_dictText'
        //     },
        //
        // {
        //      title: '评议得分',
        //      align:"center",
        //      dataIndex: 'pydf'
        //     },
        // {
        //      title: '婚姻状况',
        //      align:"center",
        //      dataIndex: 'hyzk_dictText'
        //     },
        // {
        //      title: '年龄情况',
        //      align:"center",
        //      dataIndex: 'nnqk_dictText'
        //     },
        // {
        //      title: '健康状态情况',
        //      align:"center",
        //      dataIndex: 'jkztqk_dictText'
        //     },
        // {
        //      title: '经营能力',
        //      align:"center",
        //      dataIndex: 'jynl_dictText'
        //     },
        // {
        //      title: '房屋价值情况',
        //      align:"center",
        //      dataIndex: 'fwjzqk_dictText'
        //     },
        // {
        //      title: '大宗耐用消费品情况',
        //      align:"center",
        //      dataIndex: 'dznyxfpqk_dictText'
        //     },
        // {
        //      title: '农机具情况',
        //      align:"center",
        //      dataIndex: 'njjqk_dictText'
        //     },
        // {
        //      title: '经营情况',
        //      align:"center",
        //      dataIndex: 'jyqk_dictText'
        //     },
        // {
        //      title: '家庭纯收入情况',
        //      align:"center",
        //      dataIndex: 'jtcsrqk_dictText'
        //     },
        // {
        //      title: '家庭总收入',
        //      align:"center",
        //      dataIndex: 'jtzsr_dictText'
        //     },
        // {
        //      title: '借款日还款意愿',
        //      align:"center",
        //      dataIndex: 'jkrhkyy_dictText'
        //     },
        // {
        //      title: '借款人本期逾期',
        //      align:"center",
        //      dataIndex: 'jkrbjyq_dictText'
        //     },
        // {
        //      title: '借款人利息逾期',
        //      align:"center",
        //      dataIndex: 'jkrlxyq_dictText'
        //     },
        // {
        //      title: '存款业务往来',
        //      align:"center",
        //      dataIndex: 'ckywwl_dictText'
        //     },
        // {
        //      title: '职业情况',
        //      align:"center",
        //      dataIndex: 'zwqk_dictText'
        //     },
        // {
        //      title: '家庭成员关系',
        //      align:"center",
        //      dataIndex: 'jtcygx_dictText'
        //     },
        // {
        //      title: '家庭劳动力人数情况',
        //      align:"center",
        //      dataIndex: 'jtndlrsqk_dictText'
        //     },
        // {
        //      title: '家庭人口素质和技能',
        //      align:"center",
        //      dataIndex: 'jtrkszhjn_dictText'
        //     },
        // {
        //      title: '信誉状况',
        //      align:"center",
        //      dataIndex: 'xyzk_dictText'
        //     },
        // {
        //      title: '社会声望及荣誉',
        //      align:"center",
        //      dataIndex: 'shswjry_dictText'
        //     },
        // {
        //      title: '社会关系状况',
        //      align:"center",
        //      dataIndex: 'shgxzk_dictText'
        //     },
        // {
        //      title: '生活习惯情况',
        //      align:"center",
        //      dataIndex: 'shxgqk_dictText'
        //     },
        // {
        //      title: '交通运输工具情况',
        //      align:"center",
        //      dataIndex: 'jtysgjqk_dictText'
        //     },
        // {
        //      title: '在民间高利监控',
        //      align:"center",
        //      dataIndex: 'zmjgljk_dictText'
        //     },
        // {
        //      title: '金融机构贷款情况',
        //      align:"center",
        //      dataIndex: 'jrjgdkqk_dictText'
        //     },
        // {
        //      title: '评议类型',
        //      align:"center",
        //      dataIndex: 'pylx_dictText'
        //     },
        // {
        //      title: '家庭负债情况',
        //      align:"center",
        //      dataIndex: 'jtfzqk_dictText'
        //     },
        // {
        //      title: '先锋党员和公职人员',
        //      align:"center",
        //      dataIndex: 'xfdyhgzry'
        //     },
        // {
        //      title: '书香家族',
        //      align:"center",
        //      dataIndex: 'sxjz'
        //     },
        // {
        //      title: '乡村振兴家庭',
        //      align:"center",
        //      dataIndex: 'xczxjt'
        //     },
        // {
        //      title: '遵纪守法户',
        //      align:"center",
        //      dataIndex: 'zjsfh'
        //     },
        // {
        //      title: '和谐家庭',
        //      align:"center",
        //      dataIndex: 'hxjt'
        //     },
        // {
        //      title: '手工录入',
        //      align:"center",
        //      dataIndex: 'sglr'
        //     },
        // {
        //      title: '不予授信类型',
        //      align:"center",
        //      dataIndex: 'bysxlx_dictText'
        //     },
        //
        // {
        //      title: '农村房产情况',
        //      align:"center",
        //      dataIndex: 'ncfcqk_dictText'
        //     },
        // {
        //      title: '城区有无房产',
        //      align:"center",
        //      dataIndex: 'cqywfc_dictText'
        //     },
        // {
        //      title: '有无车辆',
        //      align:"center",
        //      dataIndex: 'ywcl_dictText'
        //     },
        // {
        //      title: '收入',
        //      align:"center",
        //      dataIndex: 'sr'
        //     },
        // {
        //      title: '工作类型',
        //      align:"center",
        //      dataIndex: 'gzlx_dictText'
        //     },
        // {
        //      title: '长期居住地',
        //      align:"center",
        //      dataIndex: 'cqjzd'
        //     },
        // {
        //      title: '主营项目',
        //      align:"center",
        //      dataIndex: 'zyxm'
        //     },
        // {
        //      title: '基础模型测算',
        //      align:"center",
        //      dataIndex: 'jcmxcs'
        //     },
        // {
        //      title: '是否在本地',
        //      align:"center",
        //      dataIndex: 'sfzbd_dictText'
        //     },
        // {
        //      title: '长期居住地备注',
        //      align:"center",
        //      dataIndex: 'cqjzdbz'
        //     },
        // {
        //      title: '评议员建议额度',
        //      align:"center",
        //      dataIndex: 'pyyjyed'
        //     },
        // {
        //      title: '家庭存款日平合计',
        //      align:"center",
        //      dataIndex: 'jtckrphj'
        //     },
        //    {
        //      title: '操作',
        //      dataIndex: 'action',
        //      align:"center",
        //      scopedSlots: { customRender: 'action' },
        //    }
      ],
      columnsTY: [
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
          title: '所属网格',
          align: 'center',
          dataIndex: 'qydm_dictText'
        },
        {
          title: '户号编码',
          align: 'center',
          dataIndex: 'hhbm'
        },
        {
          title: '证件号码',
          align: 'center',
          width: 180,
          dataIndex: 'zjhm'
        },
        {
          title: '客户名称',
          align: 'center',
          width: 80,
          dataIndex: 'khmc',
          scopedSlots: { customRender: 'detail' }
        },
        {
          title: '评议轮数',
          align: 'center',
          width: 80,
          dataIndex: 'pyls'
        },
        {
          title: '评议类型',
          align: 'center',
          width: 80,
          dataIndex: 'pylx_dictText'
        },
        {
          title: '是否了解情况',
          align: 'center',
          width: 110,
          dataIndex: 'sfljqk_dictText'
        },
        {
          title: '建议授信额度',
          align: 'center',
          width: 110,
          dataIndex: 'jysxed'
        },
        {
          title: '评议员建议额度',
          align: 'center',
          width: 120,
          dataIndex: 'pyyjyed'
        },
        {
          title: '不予授信情形',
          align: 'center',
          dataIndex: 'bysxqx_dictText'
        },
        {
          title: '支行审定备注',
          align: 'center',
          dataIndex: 'zhsdbz'
        },
        {
          title: '评议员姓名',
          align: 'center',
          width: 100,
          dataIndex: 'pyyxm'
        },
        {
          title: '评议员证件号码',
          align: 'center',
          width: 180,
          dataIndex: 'pyyzjhm'
        },

        {
          title: '评议时间',
          align: 'center',
          width: 100,
          dataIndex: 'pysj'
        },
        {
          title: '备注',
          align: 'center',
          dataIndex: 'bz'
        }
      ],
      url: {
        list: '/nh/nhbkbpy/list',
        delete: '/nh/nhbkbpy/delete',
        deleteBatch: '/nh/nhbkbpy/deleteBatch',
        exportXlsUrl: 'nh/nhbkbpy/exportXls',
        importExcelUrl: 'nh/nhbkbpy/importExcel',
        exportJcxxXlsUrl: 'khflgl/nhxq/exportYpyxxXls',
        exportPysjXlsUrl: '/nh/nhbkbpy/exportPysjXls',
        importPysjXlsUrl: '/nh/nhbkbpy/importPysjXls'
      }
    }
  },
  created() {
    this.qybm = store.getters.qybm
    if (this.qybm=='095'){
      this.columns=this.columnsTY
    }else{
      this.columns=this.columns1
    }
    this.wgxxTreeLoading = true
    getAction('/yxdyglmain/yxdyglMain/getWgxxTreeDateBySskhjl', {
      wgxz: '6,8',
      wgxzType: '2',
      maxLevel: '3'
    }).then(res => {
      if (res.success) {
        this.sswgTreeDateoptions = res.result
      }
    }).finally(() => {
      this.wgxxTreeLoading = false
    })
  },
  computed: {
    importExcelUrl: function() {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    }
  },
  methods: {
    getQueryParams() {
      //获取查询条件
      let sqp = {}
      if (this.superQueryParams) {
        sqp['superQueryParams'] = encodeURI(this.superQueryParams)
      }
      let pysj = ''
      if (this.queryParam.pysj) {
        pysj = moment(this.queryParam.pysj).format('YYYY-MM-DD')
      }
      var param = Object.assign(sqp, this.queryParam, this.isorter, this.filters)
      param.field = this.getQueryField()
      param.pageNo = this.ipagination.current
      param.pageSize = this.ipagination.pageSize
      param.pysj = pysj
      return filterObj(param)
    },
    viewBkbpy(record) {
      console.log('viewBkbpy')
      console.log(record)
      console.log(record.sfljqk)
      //不予授信情况 和 不了解情况
      if (record.pylx == '0' || record.sfljqk == '否') {
        this.$refs.bysxqkModal.view(record)
      } else if (record.pylx == '9') {
        this.$refs.jcxxpyModal.view(record)
      } else if (record.pylx == '6') {
        this.$refs.jydzpyModal.view(record)
      } else if (record.pylx == '5') {
        this.$refs.dzpyModal.view(record)
      } else {
        this.$refs.qtpyModal.view(record)
      }
    },
    bmddc() {
      let user = Vue.ls.get(USER_INFO)
      console.log(user)

      let this_ = this
      this_.exportLoading2 = true
      let wgbh = ''
      if (this.queryParam.qydm != undefined)
        wgbh = this.queryParam.qydm
      window.location.href = `${window._CONFIG['domianURL']}/` + 'nh/nhbkbpy/bmddc?yggh=' + user.workNo + '&qydm=' + wgbh
      setTimeout(function() {
        this_.exportLoading2 = false
      }, 3000)
    },
    exportJcxxXlsByUrl(fileName) {
      if (!fileName || typeof fileName != 'string') {
        fileName = '导出文件'
      }
      if (this.queryParam.qydm == '' || this.queryParam.qydm == undefined) {
        this.$message.warning('请选择归属网格！')
        return
      }

      let param = { wgbh: this.queryParam.qydm }

      console.log('导出参数', param)
      this.exportJcxxLoading = true
      downFile(this.url.exportJcxxXlsUrl, param).then((data) => {
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
      }).finally(() => {
        this.exportJcxxLoading = false
      })
    },
    exportPysjXlsByUrl(fileName) {
      if (!fileName || typeof fileName != 'string') {
        fileName = '导出文件'
      }
      if (this.queryParam.qydm == '' || this.queryParam.qydm == undefined) {
        this.$message.warning('请选择归属网格！')
        return
      }
      getAction('/yxdyglmain/yxdyglMain/queryById', { id: this.queryParam.qydm }).then(res => {
        if (res.success) {
          if (res.result.wgxz != '2') {
            this.$message.warning('导出的评议数据必须以村或者社区为单位！请选择村或者社区！')
          } else {
            let param = { wgbh: this.queryParam.qydm }
            console.log('导出参数', param)
            this.exportPysjLoading = true
            downFile(this.url.exportPysjXlsUrl, param).then((data) => {
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
            }).finally(() => {
              this.exportPysjLoading = false
            })
          }
        }
      })
    },
    importPysjXlsByUrl() {
      if (this.queryParam.qydm == '' || this.queryParam.qydm == undefined) {
        this.$message.warning('请选择归属网格！')
        return
      }
      getAction('/yxdyglmain/yxdyglMain/queryById', { id: this.queryParam.qydm }).then(res => {
        if (res.success) {
          if (res.result.wgxz != '2') {
            this.$message.warning('导入的评议数据必须以村或者社区为单位！请选择村或者社区！')
          } else {
            this.$confirm({
              title: '温馨提示',
              okText: '确定',
              cancelText: '取消',
              content: '请注意备份评议数据！！否则将造成数据丢失！！备份方法：在背靠背评议明细页面中选中归属网格后，点击导出评议数据按钮。',
              onOk: () => {
                let params = {}
                params.importExcelUrl = this.url.importPysjXlsUrl
                params.wgbh = this.queryParam.qydm
                this.$refs.excelImportModal.showModal(params)
              },
              onCancel: e => {
                if (e.triggerCancel) {
                  // 点击x或者按键盘esc关闭的弹窗
                  return
                }
                // 函数体 方法
                e()
              }
            })
          }
        }
      })
    },
    endImport() {
      this.loadData(1)
    }
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less'
</style>