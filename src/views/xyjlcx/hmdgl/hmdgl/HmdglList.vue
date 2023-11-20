<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户名称">
              <a-input placeholder="请输入客户名称" v-model="queryParam.khmc"></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="不良记录行为描述">
              <a-select placeholder="请选择不良记录行为描述" v-model="queryParam.bljlxwms">
                <a-select-option value="1">
                  借款人有表外不良贷款记录
                </a-select-option>
                <a-select-option value="2">
                  借款人有表内不良贷款记录
                </a-select-option>
                <a-select-option value="3">
                  借款人有贷记卡逾期记录
                </a-select-option>
                <a-select-option value="4">
                  借款人有收本挂息记录
                </a-select-option>
                <a-select-option value="5">
                  借款人被我行起诉
                </a-select-option>
                <a-select-option value="6">
                  是借款人的关联人
                </a-select-option>
                <a-select-option value="7">
                  手工添加
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

        </a-row>
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="有效标志">
              <a-select placeholder="请选择有效标志" v-model="queryParam.yxbz">
                <a-select-option value="1">
                  有效
                </a-select-option>
                <a-select-option value="2">
                  无效
                </a-select-option>
                <a-select-option value="3">
                  待审核
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
          <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
        </a-row>

      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'hmdgl:add'">新增</a-button>
      <a-button :loading="exportLoading" icon="download" @click="handleExportXls('黑名单管理')" v-has="'hmdgl:exportXls'">导出</a-button>
<!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl"-->
<!--                @change="handleImportExcel">-->
<!--        <a-button type="primary" icon="import">导入</a-button>-->
<!--      </a-upload>-->
      <a-button icon="import" @click="excelImport" v-has="'hmdgl:import'">导入</a-button>
      <a-button @click="init" icon="area-chart" v-has="'hmdgl:init'">提取</a-button>

      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl2"
                @change="handleImportExcel" v-has="'hmdgl:importHmd'">
        <a-button icon="import">导入黑名单</a-button>
      </a-upload>

      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel">
            <a-icon type="delete" v-has="'hmdgl:delete'" />
            删除
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <!--    <div>-->
    <!--      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">-->
    <!--        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{-->
    <!--        selectedRowKeys.length }}</a>项-->
    <!--        <a style="margin-left: 24px" @click="onClearSelected">清空</a>-->
    <!--      </div>-->

    <a-table
      ref="table"
      size="middle"
      bordered
      rowKey=""
      :columns="columns"
      :dataSource="dataSource"
      :pagination="ipagination"
      :loading="loading"
      @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'hmdgl:edit'">编辑</a>
          <a-divider type="vertical" v-has="'hmdgl:edit'"/>
          <a @click="handleErase(record)" v-has="'hmdgl:mochu'">抹除</a>
          <a-divider type="vertical" v-has="'hmdgl:mochu'"/>
          <a @click="handleSp(record)" v-has="'hmdgl:shenpi'">审批</a>
          <a-divider type="vertical" v-has="'hmdgl:shenpi'"/>
          <a-dropdown>
            <a class="ant-dropdown-link">更多<a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item v-has="'hmdgl:delete'">
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
              <a-menu-item v-has="'hmdgl:xiangqing'">
                  <a href="javascript:;" @click="xq(record)">详情</a>
               </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

    </a-table>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <hmdgl-modal ref="modalForm" @ok="modalFormOk"></hmdgl-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
    <erase-modal ref="eraseModal" @ok="eraseOk"></erase-modal>
    <sp-modal ref="spModal" @ok="spOk"></sp-modal>

  </a-card>
</template>

<script>
  import EraseModal from './modules/EraseModal'
  import HmdglModal from './modules/HmdglModal'
  import SpModal from './modules/SpModal'
  import {JeecgListMixin} from '../../../../mixins/JeecgListMixin'
  import { deleteAction, getAction } from '@/api/manage'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import ExcelImport from '@/components/common/ExcelImport'
  import Vue from 'vue'

  export default {
    name: 'HmdglList',
    mixins: [JeecgListMixin],
    components: {
      HmdglModal, JTreeSelect, EraseModal,SpModal,ExcelImport
    },
    data () {
      return {
        description: '黑名单管理管理页面',
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
            title: '客户名称',
            align: 'center',
            dataIndex: 'khmc'
          },
          {
            title: '证件号码',
            align: 'center',
            dataIndex: 'zjhm'
          },
          {
            title: '不良记录行为描述',
            align: 'center',
            dataIndex: 'bljlxwms_dictText'
          },
          {
            title: '登记日期',
            align: 'center',
            dataIndex: 'djrq'
          },
          {
            title: '不良记录抹除日期',
            align: 'center',
            dataIndex: 'bljlmcrq'
          },
          {
            title: '不良行为结束日期',
            align: 'center',
            dataIndex: 'blxwjsrq'
          },
          {
            title: '有效标识',
            align: 'center',
            dataIndex: 'yxbz_dictText'
          },
          {
            title: '情况说明',
            align: 'center',
            dataIndex: 'qksm'
          },
          {
            title: '审批人',
            align: 'center',
            dataIndex: 'spr'
          },
          {
            title: '审批时间',
            align: 'center',
            dataIndex: 'spsj'
          },
          {
            title: '抹除人',
            align: 'center',
            dataIndex: 'mcr'
          },
          {
            title: '抹除时间',
            align: 'center',
            dataIndex: 'mcsj'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            scopedSlots: { customRender: 'action' }
          }
        ],
        url: {
          list: '/hmdgl/hmdgl/list',
          delete: '/hmdgl/hmdgl/delete',
          deleteBatch: '/hmdgl/hmdgl/deleteBatch',
          exportXlsUrl: 'hmdgl/hmdgl/exportXls',
          importExcelUrl: 'hmdgl/hmdgl/importExcel',
          importExcelUrl2: 'hmdgl/hmdgl/importExcel2',
          init: 'hmdgl/hmdgl/init',
          exportTemplateUrl: "/hmdgl/hmdgl/exportTemplateXls",
        },
        exportTemplateName: '黑名单管理导入模板'
      }
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      },
      importExcelUrl2: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl2}`
      }
    },
    methods: {
      // 查看详情Func
      // handleView: function (record) {
      //   console.log('HmdglList => handleView: function (record)')
      //   this.$refs.modalForm.edit(record)
      //   this.$refs.modalForm.title = '评定数据详情'
      //   this.$refs.modalForm.disableSubmit = true
      //   this.$refs.modalForm.disabled = true;
      // },

      handleAdd: function () {
        this.$refs.modalForm.add()
        this.$refs.modalForm.title = '新增'
        this.$refs.modalForm.disableSubmit = false
        this.$refs.modalForm.disabled = false
      },
      handleEdit (record) {
        this.$refs.modalForm.edit(record)
        this.$refs.modalForm.title = '编辑'
        this.$refs.modalForm.disableSubmit = false
        this.$refs.modalForm.disabled = true
      },
      handleErase (record) {
        if (record.yxbz == 2 || record.yxbz == 3) {
          this.$message.warning('该条记录已处于无效，或待审核状态！')
          return
        }
        this.$refs.eraseModal.erase(record)
        this.$refs.eraseModal.title = '抹除黑名单信息'
        this.$refs.eraseModal.disableSubmit = false
        this.$refs.eraseModal.disabled = true
      },
      handleSp (record) {
        if (record.yxbz == 1 || record.yxbz == 2) {
          this.$message.warning('该条记录未申请抹除，或已处于无效状态')
          return
        }
        this.$refs.spModal.sp(record)
        this.$refs.spModal.title = '审批黑名单信息'
        this.$refs.spModal.disableSubmit = false
        this.$refs.spModal.disabled = true
      },
      handleDelete: function (record) {
        console.log(record)
        if (!this.url.delete) {
          this.$message.error('请设置url.delete属性!')
          return
        }
        var that = this
        deleteAction(that.url.delete, { zjhm: record.zjhm, bljlxwms: record.bljlxwms }).then((res) => {
          if (res.success) {
            that.$message.success(res.message)
            that.loadData()
          } else {
            that.$message.warning(res.message)
          }
        })
      },

      xq: function (record) {
        this.$refs.modalForm.edit(record)
        this.$refs.modalForm.title = '详情'
        this.$refs.modalForm.disableSubmit = true
        this.$refs.modalForm.disabled = true;
      },
      // 黑名单提取
      init () {
        this.loading = true
        getAction(this.url.init).then((res) => {
          if (res.success) {
            this.$message.success('提取成功')
            this.loadData(1)
          } else {
            this.$message.warning('提取失败')
          }
        }).catch((err) => {
          this.$message.error('提取失败', error)
        }).finally(() => {
          this.loading = false
        })
      },
      eraseOk () {
        this.loadData(1)
        console.log('抹除窗口关闭')
      },
      spOk () {
        this.loadData(1)
        console.log('审批窗口关闭')
      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>