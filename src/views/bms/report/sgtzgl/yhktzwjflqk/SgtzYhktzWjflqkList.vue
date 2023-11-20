<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="数据日期">
              <a-date-picker placeholder="请选择数据日期（月末）" v-model="queryParam.fiscalDate"  :defaultValue="defaultDateOpera"
                             :format="dateFormat" style="width: 100%;" @change="beforeUpload"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属机构">
              <j-tree-select placeholder="请选择" v-model="queryParam.branchNo" dict="v_hr_bas_organization, zzjc, ywjgdm"
                             treeNodeFilterProp="title" pid-field="sjywjgdm_b" :showSearch="true" :treeDefaultExpandAll="true"
                             condition='{"sjywjgdm": "ywjgdm"}'>
              </j-tree-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="项目数据名称">
              <j-input placeholder="请输入项目数据名称" v-model="queryParam.branchName" type='likemore'></j-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
      <a-button type="primary" @click="searchReset" icon="reload">重置</a-button>
      <a-button type="primary" icon="download" :loading="exportLoading" @click="handleExportXls('银行卡透支五级分类情况表（三）')" style="margin-left: 8px">导出</a-button>
      <a-button icon="import" @click="excelImport()">导入</a-button>
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
               :scroll="{x:2700}"
               @change="handleTableChange">
      </a-table>
    </div>
    <!-- table区域-end -->

    <excel-import ref="excelImportModal" @ok="importComplete" />
  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import moment from 'moment'
  import JEllipsis from "@/components/jeecg/JEllipsis";
  import JTreeSelect from "@/components/jeecg/JTreeSelect";
  import JInput from "@/components/jeecg/JInput";
  import ExcelImport from '@comp/common/ExcelImport'
  import notification from 'ant-design-vue/es/notification'
  import { downFile, getAction } from '@api/manage'
  import { filterObj } from '@/utils/util'

  export default {
    name: "SgtzYhktzWjflqkList",
    mixins:[JeecgListMixin],
    components: {
      ExcelImport, JEllipsis, JTreeSelect, JInput
    },
    data() {
      return {
        description: '银行卡透支五级分类情况表（三）管理页面',
        rq: undefined,
        dateFormat: 'YYYY-MM-DD',
        //默认当前月份
        defaultDateOpera: undefined,
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: 'center',
            customRender: function(t, r, index) {
              return parseInt(index) + 1
            },
            fixed: 'left',
          },
          {
            title: '数据日期',
            align: 'center',
            dataIndex: 'fiscalDate',
            fixed: 'left',
          },
          {
            title: '所属机构编码',
            align: 'center',
            dataIndex: 'branchNo',
            fixed: 'left',
          },
          {
            title: '项目数据名称',
            align: 'center',
            dataIndex: 'branchName',
            fixed: 'left',
          },
          {
            title: '卡透支年初余额',
            align: 'center',
            dataIndex: 'ktzNcye'
          },
          {
            title: '卡透支本月余额',
            align: 'center',
            dataIndex: 'ktzByye'
          },
          {
            title: '正常类贷款',
            align: 'center',
            children: [
              {
                title: '正常',
                align: 'center',
                children: [
                  {
                    title: '年初余额',
                    align: 'center',
                    dataIndex: 'zcNcye'
                  },
                  {
                    title: '月末余额',
                    align: 'center',
                    dataIndex: 'zcYmye'
                  },
                  {
                    title: '比年初+-',
                    align: 'center',
                    dataIndex: 'zcBnc'
                  },
                ],
              },
              {
                title: '关注',
                align: 'center',
                children: [
                  {
                    title: '年初余额',
                    align: 'center',
                    dataIndex: 'gzNcye'
                  },
                  {
                    title: '月末余额',
                    align: 'center',
                    dataIndex: 'gzYmye'
                  },
                  {
                    title: '比年初+-',
                    align: 'center',
                    dataIndex: 'gzBnc'
                  },
                ],
              },
            ],
          },
          {
            title: '不良类贷款',
            align: 'center',
            children: [
              {
                title: '次级',
                align: 'center',
                children: [
                  {
                    title: '年初余额',
                    align: 'center',
                    dataIndex: 'cjNcye'
                  },
                  {
                    title: '月末余额',
                    align: 'center',
                    dataIndex: 'cjYmye'
                  },
                  {
                    title: '比年初+-',
                    align: 'center',
                    dataIndex: 'cjBnc'
                  },
                ],
              },
              {
                title: '可疑',
                align: 'center',
                children: [
                  {
                    title: '年初余额',
                    align: 'center',
                    dataIndex: 'kyNcye'
                  },
                  {
                    title: '月末余额',
                    align: 'center',
                    dataIndex: 'kyYmye'
                  },
                  {
                    title: '比年初+-',
                    align: 'center',
                    dataIndex: 'kyBnc'
                  },
                ],
              },
              {
                title: '损失',
                align: 'center',
                children: [
                  {
                    title: '年初余额',
                    align: 'center',
                    dataIndex: 'ssNcye'
                  },
                  {
                    title: '月末余额',
                    align: 'center',
                    dataIndex: 'ssYmye'
                  },
                  {
                    title: '比年初+-',
                    align: 'center',
                    dataIndex: 'ssBnc'
                  },
                ],
              },
            ],
          },
          {
            title: '不良贷款',
            align: 'center',
            children: [
              {
                title: '不良年初余额',
                align: 'center',
                dataIndex: 'blNcye'
              },
              {
                title: '不良上月余额',
                align: 'center',
                dataIndex: 'blSyye'
              },
              {
                title: '不良本月余额',
                align: 'center',
                dataIndex: 'blByye'
              },
              {
                title: '比年初+-',
                align: 'center',
                dataIndex: 'blBnc'
              },
              {
                title: '比上月+-',
                align: 'center',
                dataIndex: 'blBsy'
              },
              {
                title: '不良占比%',
                align: 'center',
                dataIndex: 'blzb'
              },
              {
                title: '压缩任务',
                align: 'center',
                dataIndex: 'ysrw'
              },
              {
                title: '任务完成率',
                align: 'center',
                dataIndex: 'rwwcl'
              },
            ],
          },
        ],
        url: {
          list: '/report/sgtzgl/YhktzWjflqk/list',
          exportXlsUrl: 'report/sgtzgl/YhktzWjflqk/exportXls',
          importExcelUrl: 'report/sgtzgl/YhktzWjflqk/importExcel',
          exportTemplateUrl: 'report/sgtzgl/YhktzWjflqk/exportTemplateXls',
        }
      }
    },
    computed: {
      importExcelUrl: function() {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      }
    },
    methods: {
      /**
       * 数据日期格式化
       */
      beforeUpload() {
        if (this.queryParam.fiscalDate) {
          this.rq = this.queryParam.fiscalDate.format('YYYYMMDD')
        }
      },
      excelImport() {
        let params = {}
        if (this.queryParam.fiscalDate === undefined || this.queryParam.fiscalDate === '') {
          notification.error({ message: '系统提示', description:'请选择数据日期!',duration: 4})
          return
        } else {
          params.exportTemplateUrl = this.url.exportTemplateUrl
          params.importExcelUrl = `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}?fiscalDate=${this.rq}`
          this.exportTemplateName = '银行卡透支五级分类情况表（三）_导入模板'+'_'+moment(this.queryParam.fiscalDate).format("YYYYMMDD")
        }
        params.exportTemplateName = this.exportTemplateName
        var param = Object.assign({}, this.queryParam, params);
        this.$refs.excelImportModal.showModal(param);
      },
      getQueryParams() {
        //获取查询条件
        let sqp = {}
        if (this.superQueryParams) {
          sqp['superQueryParams'] = encodeURI(this.superQueryParams)
        }
        let tjMoment = ''
        if (this.queryParam.fiscalDate) {
          tjMoment = moment(this.queryParam.fiscalDate).format('YYYYMMDD')
        }
        var param = Object.assign(sqp, this.queryParam, this.isorter, this.filters)
        param.field = this.getQueryField()
        param.pageNo = this.ipagination.current
        param.pageSize = this.ipagination.pageSize
        param.fiscalDate = tjMoment
        return filterObj(param)
      },
      handleExportXls (fileName) {
        if (!fileName || typeof fileName != 'string') {
          fileName = '导出文件'
        }
        fileName = fileName + moment(new Date()).format('YYYYMMDDHHmmss')
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
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>