<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="机构名称">
              <j-tree-select placeholder="请选择机构查询"
                             pid-field="sjywjgdm"
                             :showSearch="true"
                             treeNodeFilterProp="title"
                             v-model="queryParam.jgdm"
                             v-decorator="['jgdm', {rules: [{required: true, message: '请选择机构查询！'}]}]"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :tree-default-expand-all="true"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="证件号码">
              <j-input placeholder="请输入证件号码" v-model="queryParam.zjhm" type="likemore"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="贷款账号">
              <a-input placeholder="请输入贷款账号" v-model="queryParam.dkzh"></a-input>
            </a-form-item>
          </a-col>

          <!--<template v-if="toggleSearchStatus">


            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="贷款账号">
                <a-input placeholder="请输入贷款账号" v-model="queryParam.dkzh"></a-input>
              </a-form-item>
            </a-col>
          </template>-->

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <!--<a @click="handleToggleSearch" style="margin-left: 8px">
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'LoanBwdkSjmx:add'">新增</a-button>
      <a-button icon="download" @click="handleExportXls('表外台账管理 ')" v-has="'LoanBwdkSjmx:exp'">导出</a-button>
      <a-button icon="import" @click="excelImport" v-has="'LoanBwdkSjmx:imp'">导入</a-button>

      <!--      <a-dropdown v-if="selectedRowKeys.length > 0">-->
      <!--        <a-menu slot="overlay">-->
      <!--          <a-menu-item key="1" @click="batchDel">-->
      <!--            <a-icon type="delete"/>-->
      <!--            删除-->
      <!--          </a-menu-item>-->
      <!--        </a-menu>-->
      <!--        <a-button style="margin-left: 8px"> 批量操作-->
      <!--          <a-icon type="down"/>-->
      <!--        </a-button>-->
      <!--      </a-dropdown>-->
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{
        selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table ref="table"
               size="middle"
               bordered
               rowKey="id"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               :scroll="{ x: 2200 }"
               :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
               @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'LoanBwdkSjmx:edit'">编辑</a>
          <a-divider type="vertical"/>
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down"/></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.xh)">
                  <a v-has="'LoanBwdkSjmx:del'">删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <loanBwdkSjmx-modal ref="modalForm" @ok="modalFormOk"></loanBwdkSjmx-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"/>

  </a-card>
</template>

<script>
  import LoanBwdkSjmxModal from './modules/LoanBwdkSjmxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import ExcelImport from '@/components/common/ExcelImport'
  import { downFile, getAction } from '@/api/manage'
  import JEllipsis from '@/components/jeecg/JEllipsis'
  import JInput from '@/components/jeecg/JInput'


  export default {
    name: 'LoanBwdkSjmxList',
    mixins: [JeecgListMixin],
    components: {
      JInput,
      JEllipsis,
      LoanBwdkSjmxModal, JTreeSelect, ExcelImport
    },
    data() {
      return {
        jbxx: {},
        description: '表外台账管理 管理页面',
        // 表头
        columns: [
          {
            title: '原贷款机构名称',
            align: 'center',
            dataIndex: 'jgdm_dictText',
            width: 120,
          },
          {
            title: '机构代码',
            align: 'center',
            dataIndex: 'jgdm'
          },
          {
            title: '贷款账号',
            align: 'center',
            dataIndex: 'dkzh',
            width: 210
          },
          {
            title: '姓名',
            align: 'center',
            dataIndex: 'khmc',
            width: 120
          },
          {
            title: '证件号码',
            align: 'center',
            dataIndex: 'zjhm',
            width: 210
          },
          {
            title: '借款日期',
            align: 'center',
            dataIndex: 'dkrq'
          },
          {
            title: '到期日期',
            align: 'center',
            dataIndex: 'dqrq'
          },
          {
            title: '转入表外类型',
            align: 'center',
            dataIndex: 'zrbwlx_dictText'
          },
          {
            title: '处置金额',
            align: 'center',
            dataIndex: 'je'
          },
          {
            title: '欠息',
            align: 'center',
            dataIndex: 'qx'
          },
          {
            title: '本息金额合计',
            align: 'center',
            dataIndex: 'bxjehj',
            customRender: function (text) {
              return parseFloat(text).toFixed(2)
            },
          },
          {
            title: '新收回本金',
            align: 'center',
            dataIndex: 'shbj'
          },
          {
            title: '新收回利息',
            align: 'center',
            dataIndex: 'shlx'
          },
          {
            title: '新收回本金合计',
            align: 'center',
            dataIndex: 'xshbjhj',
            customRender: function (text) {
              return parseFloat(text).toFixed(2)
            },
          },
          {
            title: '处置类型',
            align: 'center',
            dataIndex: 'czlx'
          },
          {
            title: '余额',
            align: 'center',
            dataIndex: 'hxye'
          },

          {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            scopedSlots: { customRender: 'action' },
            fixed: 'right',
            width: 120
          }
        ],
        url: {
          list: '/LoanBwdkSjmx/loanBwdkSjmx/list',
          delete: '/LoanBwdkSjmx/loanBwdkSjmx/delete',
          deleteBatch: '/LoanBwdkSjmx/loanBwdkSjmx/deleteBatch',
          exportXlsUrl: 'LoanBwdkSjmx/loanBwdkSjmx/exportXls',
          importExcelUrl: 'LoanBwdkSjmx/loanBwdkSjmx/importExcel',
          exportTemplateUrl: 'LoanBwdkSjmx/loanBwdkSjmx/exportTemplateXls'
        }
      }
    },
    computed: {
      importExcelUrl: function() {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      }
    },
    methods: {
      excelImport() {
        let params = {}
        params.exportTemplateUrl = this.url.exportTemplateUrl
        params.importExcelUrl = this.importExcelUrl
        params.exportTemplateName = '表外台账导入'
        this.$refs.excelImportModal.showModal(params)
      },
      importComplete(filePath) {
        let fileName = '导入结果'
        let param = {}

        downFile('/sys/common/download/' + filePath, param).then((data) => {
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

        this.loadData()
      },

      loadData(arg) {
        if (!this.url.list) {
          this.$message.error('请设置url.list属性!')
          return
        }
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1
        }
        var params = this.getQueryParams()//查询条件
        console.info(params)
        this.loading = true
        let dataSourceflag = []
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            this.dataSource = []
            dataSourceflag = res.result.records
            console.log(dataSourceflag + '-----------' + dataSourceflag.length)
            for (let i = 0; i < dataSourceflag.length; i++) {
              this.jbxx = dataSourceflag[i]
              let bxjehj = { bxjehj: dataSourceflag[i].qx + dataSourceflag[i].je }
              let xshbjhj = { xshbjhj: dataSourceflag[i].shbj + dataSourceflag[i].shlx }

              this.dataSource.push(Object.assign(this.jbxx, bxjehj, xshbjhj))
            }

            this.ipagination.total = res.result.total
          }
          if (res.code === 510) {
            this.$message.warning(res.message,5)
          }
          this.loading = false
        })
      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>