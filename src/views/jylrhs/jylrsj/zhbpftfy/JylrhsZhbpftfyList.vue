<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="会计/记账日期">
              <a-date-picker placeholder="请选择会计/记账日期" v-model="queryParam.fiscalDate"
                             :format="dateFormat" style="width: 100%;"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="业务机构代码/组织标识">
              <a-input placeholder="请输入业务机构代码/组织标识" v-model="queryParam.ywjgdm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="业务机构">
              <j-input placeholder="请输入业务机构名称" v-model="queryParam.ywjg" type='likemore'></j-input>
            </a-form-item>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
      <a-button type="primary" @click="searchReset" icon="reload">重置</a-button>
      <a-button type="primary" icon="download" :loading="exportLoading" v-has="'zhbpftfy:export'"
                @click="handleExportXls('报批分摊费用')">导出</a-button>
      <a-button icon="import" @click="excelImport()" v-has="'zhbpftfy:import'">导入</a-button>
    </div>

    <!-- table区域-begin -->
    <div>
      <a-table ref="table"
               size="small"
               bordered
               :rowKey="rowKey"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               :scroll='{x:9000}'
               @change="handleTableChange">
        <span slot="action" slot-scope="text, record">
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)" v-has="'zhbpftfy:delete'">
            <a>删除</a>
          </a-popconfirm>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <excel-import ref="excelImportModal" @ok="importComplete" />

  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import ExcelImport from '@comp/common/ExcelImport'
  import notification from 'ant-design-vue/lib/notification'
  import moment from 'moment/moment'
  import { filterObj } from '@/utils/util'
  import { deleteAction, downFile } from '@api/manage'
  import JTreeSelect from '@comp/jeecg/JTreeSelect.vue'
  import JInput from '@comp/jeecg/JInput.vue'

  export default {
    name: "JylrhsZhbpftfyList",
    mixins:[JeecgListMixin],
    components: {
      JInput,
      JTreeSelect,
      ExcelImport
    },
    data() {
      return {
        description: '报批分摊费用管理页面',
        rowKey: 'fiscal_date,jgdm',
        rq: undefined,
        dateFormat: 'YYYY-MM-DD',
        // 表头
        columns: [
          // {
          //   title: '#',
          //   dataIndex: '',
          //   key: 'rowIndex',
          //   width: 60,
          //   align: 'center',
          //   customRender: function(t, r, index) {
          //     return parseInt(index) + 1
          //   }
          // },
          {
            title: '会计/记账日期',
            align: 'center',
            dataIndex: 'fiscalDate',
            width: 120,
          },
          {
            title: '业务机构代码/组织标识',
            align: 'center',
            dataIndex: 'ywjgdm',
            width: 170
          },
          {
            title: '业务机构',
            align: 'center',
            dataIndex: 'ywjg',
            width: 140,
          },
          {
            title: '业务宣传费',
            align: 'center',
            dataIndex: 'ywxcf660101',
            width: 120
          },
          {
            title: '广告费',
            align: 'center',
            dataIndex: 'ggf660102',
            width: 120
          },
          {
            title: '印刷费',
            align: 'center',
            dataIndex: 'ysf660103',
            width: 120
          },
          {
            title: '业务招待费',
            align: 'center',
            dataIndex: 'ywzdf660104',
            width: 120
          },
          {
            title: '电子设备运转费',
            align: 'center',
            dataIndex: 'dzsbyzf660105',
            width: 120
          },
          {
            title: '钞币运送费',
            align: 'center',
            dataIndex: 'cbysf660106',
            width: 120
          },
          {
            title: '安全保卫费',
            align: 'center',
            dataIndex: 'aqbwf660107',
            width: 120
          },
          {
            title: '保险费',
            align: 'center',
            dataIndex: 'bxf660108',
            width: 120
          },
          {
            title: '邮电费',
            align: 'center',
            dataIndex: 'ydf660109',
            width: 120
          },
          {
            title: '诉讼费',
            align: 'center',
            dataIndex: 'ssf660110',
            width: 120
          },
          {
            title: '公证费',
            align: 'center',
            dataIndex: 'gzf660111',
            width: 120
          },
          {
            title: '咨询费',
            align: 'center',
            dataIndex: 'zxf660112',
            width: 120
          },
          {
            title: '审计费',
            align: 'center',
            dataIndex: 'sjf660113',
            width: 120
          },
          {
            title: '监管费',
            align: 'center',
            dataIndex: 'jgf660114',
            width: 120
          },
          {
            title: '技术转让费',
            align: 'center',
            dataIndex: 'jszrf660115',
            width: 120
          },
          {
            title: '研究开发费',
            align: 'center',
            dataIndex: 'yjkff660116',
            width: 120
          },
          {
            title: '外事费',
            align: 'center',
            dataIndex: 'csf660117',
            width: 120
          },
          {
            title: '公杂费',
            align: 'center',
            dataIndex: 'gzf660118',
            width: 120
          },
          {
            title: '差旅费',
            align: 'center',
            dataIndex: 'clf660119',
            width: 120
          },
          {
            title: '水电费',
            align: 'center',
            dataIndex: 'sdf660120',
            width: 120
          },
          {
            title: '会议费',
            align: 'center',
            dataIndex: 'hyf660121',
            width: 120
          },
          {
            title: '绿化费',
            align: 'center',
            dataIndex: 'lhf660122',
            width: 120
          },
          {
            title: '理(董)事会费',
            align: 'center',
            dataIndex: 'lshf660123',
            width: 120
          },
          {
            title: '会费',
            align: 'center',
            dataIndex: 'hf660124',
            width: 120
          },
          {
            title: '税费',
            align: 'center',
            dataIndex: 'sf660125',
            width: 120
          },
          {
            title: '交通工具耗用费',
            align: 'center',
            dataIndex: 'jtgjhyf660126',
            width: 120
          },
          {
            title: '开办费',
            align: 'center',
            dataIndex: 'kbf660127',
            width: 120
          },
          {
            title: '管理费',
            align: 'center',
            dataIndex: 'glf660128',
            width: 120
          },
          {
            title: '物业费',
            align: 'center',
            dataIndex: 'wyf660129',
            width: 120
          },
          {
            title: '职工工资',
            align: 'center',
            dataIndex: 'zggz660130',
            width: 120
          },
          {
            title: '职工福利费',
            align: 'center',
            dataIndex: 'zgflf660131',
            width: 120
          },
          {
            title: '职工教育经费',
            align: 'center',
            dataIndex: 'zgjyjf660132',
            width: 120
          },
          {
            title: '工会经费',
            align: 'center',
            dataIndex: 'ghjf660133',
            width: 120
          },
          {
            title: '劳动保护费',
            align: 'center',
            dataIndex: 'ldbhf660134',
            width: 120
          },
          {
            title: '基本养老保险金',
            align: 'center',
            dataIndex: 'jbylbxj660135',
            width: 120
          },
          {
            title: '基本医疗保险金',
            align: 'center',
            dataIndex: 'jbylbxj660136',
            width: 120
          },
          {
            title: '工伤保险金',
            align: 'center',
            dataIndex: 'gsbxj660137',
            width: 120
          },
          {
            title: '生育保险金',
            align: 'center',
            dataIndex: 'sybxj660138',
            width: 120
          },
          {
            title: '失业保险金',
            align: 'center',
            dataIndex: 'sybxj660139',
            width: 120
          },
          {
            title: '补充养老保险金',
            align: 'center',
            dataIndex: 'bcylbxj660140',
            width: 120
          },
          {
            title: '补充医疗保险金',
            align: 'center',
            dataIndex: 'bcylbxj660141',
            width: 120
          },
          {
            title: '股份支付',
            align: 'center',
            dataIndex: 'gfzf660142',
            width: 120
          },
          {
            title: '辞退福利',
            align: 'center',
            dataIndex: 'ctfl660143',
            width: 120
          },
          {
            title: '非货币性福利',
            align: 'center',
            dataIndex: 'fhbxfl660144',
            width: 120
          },
          {
            title: '住房公积金',
            align: 'center',
            dataIndex: 'zfgjj660145',
            width: 120
          },
          {
            title: '取暖及降温费',
            align: 'center',
            dataIndex: 'qnjwf660146',
            width: 120
          },
          {
            title: '租赁费',
            align: 'center',
            dataIndex: 'zlf660147',
            width: 120
          },
          {
            title: '修理费',
            align: 'center',
            dataIndex: 'xlf660148',
            width: 120
          },
          {
            title: '低值易耗品摊销',
            align: 'center',
            dataIndex: 'dzyhptx660149',
            width: 120
          },
          {
            title: '长期待摊费用摊销',
            align: 'center',
            dataIndex: 'cqdtfytx660150',
            width: 130
          },
          {
            title: '无形资产摊销',
            align: 'center',
            dataIndex: 'wxzctx660151',
            width: 120
          },
          {
            title: '固定资产折旧费',
            align: 'center',
            dataIndex: 'gdzczjf660152',
            width: 120
          },
          {
            title: '劳务费',
            align: 'center',
            children: [
              {
                title: '劳务派遣人员',
                align: 'center',
                children: [
                  {
                    title: '业务岗位',
                    align: 'center',
                    dataIndex: 'ywgwlwf66015301',
                    width: 120
                  },
                  {
                    title: '工勤岗位',
                    align: 'center',
                    dataIndex: 'gqgwlwf66015302',
                    width: 120
                  },
                ],
              },
              {
                title: '劳务外包费用',
                align: 'center',
                dataIndex: 'lwwbfy66015303',
                width: 120
              },
            ],
          },
          {
            title: '租赁负债利息费用',
            align: 'center',
            dataIndex: 'zlfzlxfy660154',
            width: 130
          },
          {
            title: '使用权资产折旧费用',
            align: 'center',
            dataIndex: 'syqzczjfy660155',
            width: 140
          },
          {
            title: '其他费用',
            align: 'center',
            dataIndex: 'qtfy660199',
            width: 120
          },
          {
            title: '6601合计',
            align: 'center',
            dataIndex: 'hj6601',
            width: 120
          },
          {
            title: '6403科目',
            align: 'center',
            dataIndex: 'km6403',
            width: 120
          },
          {
            title: '6421科目',
            align: 'center',
            dataIndex: 'km6421',
            width: 120
          },
          {
            title: '6602科目',
            align: 'center',
            dataIndex: 'km6602',
            width: 120
          },
          {
            title: '6711科目',
            align: 'center',
            dataIndex: 'km6711',
            width: 120
          },
          // {
          //   title: '6901以前年度利得',
          //   align: 'center',
          //   dataIndex: 'yqndld690101',
          //   width: 140
          // },
          // {
          //   title: '6901以前年度损失',
          //   align: 'center',
          //   dataIndex: 'yqndss690102',
          //   width: 140
          // },
          {
            title: '6901科目',
            align: 'center',
            dataIndex: 'km6901',
            width: 120
          },
          {
            title: '合计',
            align: 'center',
            dataIndex: 'total',
            width: 120
          },
          {
            title: '操作类型',
            align: 'center',
            dataIndex: 'oprationType_dictText',
            width: 120
          },
          {
            title: '操作员',
            align: 'center',
            dataIndex: 'operator',
            width: 120
          },
          {
            title: '录入/操作时间',
            align: 'center',
            dataIndex: 'oprationTime',
            width: 160,
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            scopedSlots: { customRender: 'action' },
            fixed: 'right',
            width: 100
          }
        ],
        url: {
          list: '/jylrhs/jylrsj/zhbpftfy/list',
          delete: '/jylrhs/jylrsj/zhbpftfy/delete',
          exportXlsUrl: 'jylrhs/jylrsj/zhbpftfy/exportXls',
          importExcelUrl: 'jylrhs/jylrsj/zhbpftfy/importExcel',
          exportTemplateUrl: 'jylrhs/jylrsj/zhbpftfy/exportTemplateXls',
        }
      }
    },
    computed: {
      importExcelUrl: function() {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      }
    },
    methods: {
      getQueryParams () {
        //获取查询条件
        let sqp = {}
        if (this.superQueryParams) {
          sqp['superQueryParams'] = encodeURI(this.superQueryParams)
        }
        var param = Object.assign(sqp, this.queryParam, this.isorter, this.filters)
        console.log('param',param)
        if (param.fiscalDate) {
          param.fiscalDate = moment(param.fiscalDate).format("YYYY-MM-DD")
        }
        param.field = this.getQueryField()
        param.pageNo = this.ipagination.current
        param.pageSize = this.ipagination.pageSize
        return filterObj(param)
      },
      excelImport() {
        let params = {}
        params.exportTemplateUrl = this.url.exportTemplateUrl
        params.importExcelUrl = `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
        this.exportTemplateName = '机关费用及支行报批分摊费用_导入模板' + '_' + moment(new Date()).format('YYYYMMDDHHmmss')

        params.exportTemplateName = this.exportTemplateName
        var param = Object.assign({}, this.queryParam, params);
        this.$refs.excelImportModal.showModal(param);
      },
      handleExportXls (fileName) {
        if (!fileName || typeof fileName != 'string') {
          fileName = '导出文件'
        }
        fileName = fileName + '导出_' + moment(new Date()).format('YYYYMMDDHHmmss')
        //let param = {...this.queryParam};
        let param = this.getQueryParams();
        if(this.selectedRowKeys && this.selectedRowKeys.length>0) {
          param['selections'] = this.selectedRowKeys.join(",")
          param['rowKey'] = this.rowKey
        }
        let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()))
        param.paramsStr = paramsStr
        console.log('导出参数', param)
        this.exportLoading = true
        downFile(this.url.exportXlsUrl, param).then((data) => {
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
          this.exportLoading = false
        })
      },
      handleDelete: function (record) {
        if (!this.url.delete) {
          this.$message.error('请设置url.delete属性!')
          return
        }
        var that = this
        let params = {
          'fiscal_date': record.fiscalDate,
          'ywjg': record.ywjg
        }
        deleteAction(that.url.delete, params).then((res) => {
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