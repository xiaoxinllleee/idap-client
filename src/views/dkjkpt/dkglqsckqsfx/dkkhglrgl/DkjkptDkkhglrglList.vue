<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="借款人证件号码">
              <a-input placeholder="请输入借款人证件号码" v-model="queryParam.jkrzjhm"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="借款人名称">
              <a-input placeholder="请输入借款人名称" v-model="queryParam.jkrmc"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="关联关系">
              <j-dict-select-tag v-model="queryParam.glgx"
                                 placeholder="请选择关联关系"
                                 dictCode="dkjkpt_glgx"/>
            </a-form-item>
          </a-col>

          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8">
              <a-form-item label="关联人证件号码">
                <a-input placeholder="请输入关联人证件号码" v-model="queryParam.glrzjhm"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="关联人姓名">
                <a-input placeholder="请输入关联人姓名" v-model="queryParam.glrxm"/>
              </a-form-item>
            </a-col>
          </template>

          <a-col :md="6" :sm="8">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary"
                        @click="searchQuery"
                        icon="search">查询</a-button>
              <a-button @click="searchReset"
                        icon="reload"
                        style="margin-left: 8px">重置</a-button>
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
      <a-button @click="handleAdd"
                type="primary"
                icon="plus" v-has="'dkkhglrgl:add'">新增
      </a-button>
      <a-button icon="area-chart"
                @click="initData"
                style="margin-left: 8px" v-has="'dkkhglrgl:extract'">提取
      </a-button>
      <a-button icon="download"
                @click="handleExportXls('贷款客户关联人管理')" v-has="'dkkhglrgl:exportXls'">导出
      </a-button>
      <a-button icon="import"
                @click="excelImport"
                style="margin-left: 8px" v-has="'dkkhglrgl:importExcel'">导入
      </a-button>

      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel">
            <a-icon type="delete"/>
            删除
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作
          <a-icon type="down"/>
        </a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
<!--      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">-->
<!--        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择-->
<!--        <a style="font-weight: 600">{{ selectedRowKeys.length }}</a> 项-->
<!--        <a style="margin-left: 24px" @click="onClearSelected">清空</a>-->
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
        :scroll="{ x: 2000 }"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'dkkhglrgl:edit'">编辑</a>

          <a-divider type="vertical"/>
                <a-popconfirm title="确定删除吗?" @confirm="() => delete12(record)" v-has="'dkkhglrgl:delete'">
                  <a>删除</a>
                </a-popconfirm>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <dkjkptDkkhglrgl-modal ref="modalForm" @ok="modalFormOk"/>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
  import DkjkptDkkhglrglModal from './modules/DkjkptDkkhglrglModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { getAction, putAction, httpAction ,downFile} from '@/api/manage'
  import JSelectDepart from '@/components/jeecgbiz/JSelectDepart'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { initDictOptions, filterDictText } from '@/components/dict/JDictSelectUtil'
  import ExcelImport from '@/components/common/ExcelImport'

  export default {
    name: 'DkjkptDkkhglrglList',
    mixins: [JeecgListMixin],
    components: {
      DkjkptDkkhglrglModal, JSelectDepart, JTreeSelect, ExcelImport
    },
    data() {
      return {
        description: '贷款客户关联人管理管理页面',
        // 表头
        columns: [
          {
            title: '借款人证件号码',
            align: 'center',
            dataIndex: 'jkrzjhm'
          },
          {
            title: '借款人名称',
            align: 'center',
            dataIndex: 'jkrmc'
          },
          {
            title: '关联人证件号码',
            align: 'center',
            dataIndex: 'glrzjhm'
          },
          {
            title: '关联人证件类型',
            align: 'center',
            dataIndex: 'glrzjlx_dictText'
          },
          {
            title: '关联人姓名',
            align: 'center',
            dataIndex: 'glrxm'
          },
          {
            title: '关联关系',
            align: 'center',
            dataIndex: 'glgx_dictText'
          },
          {
            title: '关联人存款余额',
            align: 'center',
            dataIndex: 'glrckye'
          },
          {
            title: '关联人工作单位',
            align: 'center',
            dataIndex: 'glrgzdw'
          },
          {
            title: '关联人联系电话',
            align: 'center',
            dataIndex: 'glrlxdh'
          },
          {
            title: '录入人',
            align: 'center',
            dataIndex: 'lrr'
          },
          {
            title: '录入标识',
            align: 'center',
            dataIndex: 'lrbz_dictText'
          },
          {
            title: '录入时间',
            align: 'center',
            dataIndex: 'lrsj'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            width: 120,
            fixed: 'right',
            scopedSlots: { customRender: 'action' }
          }
        ],
        glrzjlxDictOptions: [],
        zyjbDictOptions: [],
        url: {
          list: '/dkjkpt.dkglqsckqsfx.dkkhglrgl/dkjkptDkkhglrgl/list',
          delete: '/dkjkpt.dkglqsckqsfx.dkkhglrgl/dkjkptDkkhglrgl/delete',
          deleteBatch: '/dkjkpt.dkglqsckqsfx.dkkhglrgl/dkjkptDkkhglrgl/deleteBatch',
          exportXlsUrl: 'dkjkpt.dkglqsckqsfx.dkkhglrgl/dkjkptDkkhglrgl/exportXls',
          importExcelUrl: 'dkjkpt.dkglqsckqsfx.dkkhglrgl/dkjkptDkkhglrgl/importExcel',
          init: '/dkjkpt.dkglqsckqsfx.dkkhglrgl/dkjkptDkkhglrgl/extract',
          exportTemplateUrl: '/dkjkpt.dkglqsckqsfx.dkkhglrgl/dkjkptDkkhglrgl/exportTemplateXls'
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
        params.exportTemplateName = '客户关联人信息导入模板'
        this.$refs.excelImportModal.showModal(params)
      },
      initDictConfig() {
        console.log('--我才是真的方法!--')
        //初始化字典 - 性别
        initDictOptions('dkjkpt_glgx').then((res) => {
          if (res.success) {
            this.zyjbDictOptions = res.result
          }
        })

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
      initData() {
        var params = this.getQueryParams()
        this.loading = true

        putAction(this.url.init, '', 'put').then((res) => {
          if (res.success) {
            this.$message.success(res.message)
          } else {
            this.$message.warning(res.message,5)
          }
          this.loading = false
        })
      },


      delete12(record) {
        let jkrzjhm = record.jkrzjhm
        let glrzjhm = record.glrzjhm

        putAction(this.url.delete, { 'jkrzjhm': record.jkrzjhm, 'glrzjhm': record.glrzjhm }, 'put').then((res) => {
          if (res.success) {
            this.$message.success(res.message)
            that.loadData()
          } else {
            this.$message.warning(res.message,5)
          }
        })
      }
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>