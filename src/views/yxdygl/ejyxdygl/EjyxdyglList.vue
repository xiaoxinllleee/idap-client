<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属支行">
              <j-tree-select placeholder="请选择所属支行" v-model="queryParam.sszh" dict="V_HR_BAS_ORGANIZATION_CMMS,ZZJC,ZZBZ"
                             pidField="sjzzbz"  :showSearch="true" treeNodeFilterProp="title"
                             :tree-default-expand-all="true"></j-tree-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属一级营销单元">
              <j-dict-select-tag placeholder="请选择所属一级营销单元" v-model="queryParam.yjyxdybh"
                                 dict-code="YXDYGL_YJYXDYGL,DYMC,DYBH" :show-search="true"></j-dict-select-tag>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="单元性质">
              <j-dict-select-tag placeholder="请选择单元性质" v-model="queryParam.dyxz" dict-code="ejyxdyxz" />
            </a-form-item>
          </a-col>

          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="单元名称">
                <j-input placeholder="请输入单元名称" v-model="queryParam.dymc" type="likemore"></j-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="单元编号">
                <a-input placeholder="请输入单元编号" v-model="queryParam.dybh"></a-input>
              </a-form-item>
            </a-col>
          </template>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'" />
              </a>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" :loading="exportLoading" @click="handleExportXls('二级营销单元管理')">导出
      </a-button>
      <a-button type="primary" icon="import" @click="handleImport">导入</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel">
            <a-icon type="delete" />
            删除
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作
          <a-icon type="down" />
        </a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <!--<div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{
        selectedRowKeys.length }} </a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>-->

      <a-table ref="table"
               size="middle"
               bordered
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               :scroll="{ x: 3000 }"
               @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
            <a>删除</a>
          </a-popconfirm>
          <!--          <a-divider type="vertical" />-->
          <!--          <a @click="handleExport(record)">导出村情报告</a>-->
        </span>

        <span slot="dymc" slot-scope="text, record">
          <j-ellipsis :value="text" :length="8"></j-ellipsis>
        </span>
        <span slot="yjyxdymc" slot-scope="text, record">
          <j-ellipsis :value="text" :length="8"></j-ellipsis>
        </span>
        <span slot="zrbsmc" slot-scope="text, record">
          <j-ellipsis :value="text" :length="8"></j-ellipsis>
        </span>
        <span slot="zrldxm" slot-scope="text, record">
          <j-ellipsis :value="text" :length="8"></j-ellipsis>
        </span>
        <span slot="bz" slot-scope="text, record">
          <j-ellipsis :value="text" :length="10"></j-ellipsis>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <ejyxdygl-modal ref="modalForm" @ok="modalFormOk"></ejyxdygl-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"></excel-import>
    <ejyxdygl-print ref="ejyxdyglPrint" />
  </a-card>
</template>

<script>
  import EjyxdyglModal from './modules/EjyxdyglModal'
  import EjyxdyglPrint from './modules/EjyxdyglPrint'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '../../../components/jeecg/JTreeSelect'
  import JInput from '../../../components/jeecg/JInput'
  import JEllipsis from '../../../components/jeecg/JEllipsis'
  import ExcelImport from '../../../components/common/ExcelImport'
  import { downFile } from '../../../api/manage'
  import JMultiSelectTag from '../../../components/dict/JMultiSelectTag'

  export default {
    name: 'YxdyglEjyxdyglList',
    mixins: [JeecgListMixin],
    components: {
      JMultiSelectTag,
      ExcelImport,
      JEllipsis,
      JInput,
      JTreeSelect,
      EjyxdyglModal,
      EjyxdyglPrint
    },
    data () {
      return {
        description: '二级营销单元管理管理页面',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: 'center',
            customRender: function (t, r, index) {
              return parseInt(index) + 1
            }
          },
          {
            title: '一级营销单元',
            align: 'center',
            dataIndex: 'yjyxdymc',
            scopedSlots: { customRender: 'yjyxdymc' },
            width: 150
          },
          {
            title: '单元编号',
            align: 'center',
            dataIndex: 'dybh'
          },
          {
            title: '单元名称',
            align: 'center',
            dataIndex: 'dymc',
            scopedSlots: { customRender: 'dymc' },
            width: 150
          },
          {
            title: '单元性质',
            align: 'center',
            dataIndex: 'dyxz_dictText'
          },
          {
            title: '主客户经理',
            align: 'center',
            dataIndex: 'ygxm'
          },
          {
            title: '所属支行',
            align: 'center',
            dataIndex: 'sszh_dictText'
          },
          {
            title: '责任部室',
            align: 'center',
            dataIndex: 'zrbsmc',
            scopedSlots: { customRender: 'zrbsmc' }
          },
          {
            title: '责任领导',
            align: 'center',
            dataIndex: 'zrldxm',
            scopedSlots: { customRender: 'zrldxm' }
          },
          {
            title: '下级数量',
            align: 'center',
            dataIndex: 'xjdysl'
          },
          {
            title: '附件数量',
            align: 'center',
            dataIndex: 'fjsl'
          },
          {
            title: '备注',
            align: 'center',
            dataIndex: 'bz',
            scopedSlots: { customRender: 'bz' }
          },
          // {
          //   title: '农户数',
          //   align: "center",
          //   dataIndex: 'nhs'
          // },
          // {
          //   title: '农户建档数',
          //   align: "center",
          //   dataIndex: 'nhjds'
          // },
          // {
          //   title: '农户建档覆盖率',
          //   align: "center",
          //   dataIndex: 'nhjdfgl'
          // },
          // {
          //   title: '商户数',
          //   align: "center",
          //   dataIndex: 'shs'
          // },
          // {
          //   title: '商户建档数',
          //   align: "center",
          //   dataIndex: 'shjds'
          // },
          // {
          //   title: '商户建档覆盖率',
          //   align: "center",
          //   dataIndex: 'shjdfgl'
          // },
          // {
          //   title: '城区居民',
          //   align: "center",
          //   dataIndex: 'cqjm'
          // },
          // {
          //   title: '城区居民建档数',
          //   align: "center",
          //   dataIndex: 'cqjmjds'
          // },
          // {
          //   title: '城区居民建档覆盖率',
          //   align: "center",
          //   dataIndex: 'cqjmjdfgl'
          // },
          // {
          //   title: '企业数',
          //   align: "center",
          //   dataIndex: 'qys'
          // },
          // {
          //   title: '企业建档数',
          //   align: "center",
          //   dataIndex: 'qyjds'
          // },
          // {
          //   title: '企业建档覆盖率',
          //   align: "center",
          //   dataIndex: 'qyjdfgl'
          // },
          // {
          //   title: '机构数',
          //   align: "center",
          //   dataIndex: 'jgs'
          // },
          // {
          //   title: '机构建档数',
          //   align: "center",
          //   dataIndex: 'jgjds'
          // },
          // {
          //   title: '机构建档覆盖率',
          //   align: "center",
          //   dataIndex: 'jgjdfgl'
          // },
          {
            title: '创建人',
            align: 'center',
            dataIndex: 'createBy'
          },
          {
            title: '创建时间',
            align: 'center',
            dataIndex: 'createTime'
          },
          {
            title: '修改人',
            align: 'center',
            dataIndex: 'updateBy'
          },
          {
            title: '修改时间',
            align: 'center',
            dataIndex: 'updateTime'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            scopedSlots: { customRender: 'action' },
            fixed: 'right',
            width: 200
          }
        ],
        url: {
          list: '/yxdygl/ejyxdygl/list',
          delete: '/yxdygl/ejyxdygl/delete',
          deleteBatch: '/yxdygl/ejyxdygl/deleteBatch',
          exportXlsUrl: 'yxdygl/ejyxdygl/exportXls',
          importExcelUrl: 'yxdygl/ejyxdygl/importExcel',
          tmplateExportUrl: '/yxdygl/ejyxdygl/exportTemplateXls'
        }
      }
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      }
    },
    methods: {
      handleAdd: function () {
        this.$refs.modalForm.add()
        this.$refs.modalForm.title = '新增'
        this.$refs.modalForm.disableSubmit = false
        this.$refs.modalForm.disabled = false
        this.$refs.modalForm.disabled_dybh = false
        this.$refs.modalForm.okType = '1'
      },
      handleEdit (record) {
        this.$refs.modalForm.edit(record)
        this.$refs.modalForm.title = '编辑'
        this.$refs.modalForm.disableSubmit = false
        this.$refs.modalForm.disabled = false
        this.$refs.modalForm.disabled_dybh = true
        this.$refs.modalForm.okType = '2'
      },
      handleImport: function () {
        let params = {}
        params.exportTemplateUrl = this.url.tmplateExportUrl
        params.importExcelUrl = this.url.importExcelUrl
        params.exportTemplateName = '二级营销单元导入模板'
        this.$refs.excelImportModal.showModal(params)
      },
      importComplete: function (filePath) {
        let fileName = '导入结果'
        let params = {}
        downFile('/sys/common/download/' + filePath, params).then((data) => {
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
      handleExport (record) {
        this.$refs['ejyxdyglPrint'].edit(record)
      }
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>