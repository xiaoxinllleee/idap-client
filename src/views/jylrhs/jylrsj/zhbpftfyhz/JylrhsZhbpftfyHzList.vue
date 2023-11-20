<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="会计/记账年份">
<!--              <a-input placeholder="请输入会计/记账年份" v-model="queryParam.fiscalYear"></a-input>-->
              <a-select placeholder="请选择会计/记账年份" v-model="jznf" @change="selectValue" :allowClear="true">
                <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="业务机构代码/组织标识">
              <a-input placeholder="请输入业务机构代码/组织标识" v-model="queryParam.ywjgdm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="业务机构名称">
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
      <a-button type="primary" icon="download" :loading="exportLoading"
                @click="handleExportXls('报批分摊费用（汇总）')">导出</a-button>
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
      </a-table>
    </div>
    <!-- table区域-end -->

  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { filterObj } from '@/utils/util'
  import { notification } from 'ant-design-vue'
  import moment from 'moment/moment'
  import { downFile, getAction } from '@api/manage'
  import store from '@/store'
  import JInput from '@comp/jeecg/JInput.vue'

  export default {
    name: "JylrhsZhbpftfyHzList",
    mixins:[JeecgListMixin],
    components: {
      JInput
    },
    data() {
      return {
        description: '报批分摊费用（汇总）管理页面',
        rowKey: 'fiscal_year,jgdm',
        jznf: undefined,
        years: undefined,
        // 表头
        columns: [
          {
            title: '会计/记账年份',
            align: 'center',
            dataIndex: 'fiscalYear',
            customRender: function (text) {
              return !text ? "" : (text.length > 8 ? text.substr(0, 4) : text)
            },
            width: 120
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
            width: 140
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
            width: 110
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
          }
        ],
        url: {
          list: '/jylrhs/jylrsj/zhbpftfyhz/list',
          exportXlsUrl: 'jylrhs/jylrsj/zhbpftfyhz/exportXls'
        }
      }
    },
    computed: {
      importExcelUrl: function() {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      }
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        var date = new Date
        var year = date.getFullYear()
        this.jznf = year
        this.initSelectYear(year)
      },
      initSelectYear(year) {
        this.years = [];
        for (let i = 0; i < 30; i++) {
          this.years.push({value: ((year - i) + ''), label: ((year - i) + '')});
        }
      },
      selectValue(value) {
        this.$emit('change', value)
      },
      getQueryParams() {
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        let jznf = undefined
        if (this.jznf) {
          jznf = this.jznf + '-12-31'
        }
        param.fiscalYear = jznf
        return filterObj(param);
      },
      searchReset() {
        this.queryParam = {fiscalYear: undefined}
        var date = new Date
        var year = date.getFullYear()
        this.jznf = year
        this.queryParam.fiscalYear = moment(this.jznf).format("YYYY")+"-12-31"
        this.loadData(1)
      },
      handleExportXls (fileName) {
        if (!fileName || typeof fileName != 'string') {
          fileName = '导出文件'
        }
        fileName = fileName + '导出_' + moment(new Date()).format('YYYYMMDDHHmmss')
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
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>