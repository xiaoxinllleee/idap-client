<template>
  <a-card :bordered='false'>

    <!-- 查询区域 -->
    <div class='table-page-search-wrapper'>
      <a-form layout='inline' @keyup.enter.native='searchQuery'>
        <a-row :gutter='24'>

          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='参数编码'>
              <a-input placeholder='请输入参数编码' v-model='queryParam.csbm'></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='参数名称'>
              <a-input placeholder='请输入参数名称' v-model='queryParam.csmc'></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='参数值'>
              <a-input placeholder='请输入参数值' v-model='queryParam.csz'></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <span style='float: left;overflow: hidden;' class='table-page-search-submitButtons'>
              <a-button type='primary' @click='searchQuery' icon='search'>查询</a-button>
              <a-button type='primary' @click='searchReset' icon='reload' style='margin-left: 8px'>重置</a-button>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class='table-operator'>
      <a-button @click='handleAdd' type='primary' icon='plus' v-has="'cssz:add'">新增</a-button>
      <a-button icon='download' :loading='exportLoading' @click="handleExportXls('参数设置')">导出
      </a-button>
      <!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">-->
      <!--        <a-button type="primary" icon="import">导入</a-button>-->
      <!--      </a-upload>-->
    </div>

    <!-- table区域-begin -->
    <div>
      <a-table
        ref='table'
        size='middle'
        bordered
        :rowKey='rowKey'
        :columns='columns'
        :dataSource='dataSource'
        :pagination='ipagination'
        :loading='loading'
        @change='handleTableChange'>

        <span slot='action' slot-scope='text, record'>
          <a @click='handleEdit(record)' v-has="'cssz:edit'">编辑</a>

          <a-divider type='vertical' v-has="'cssz:delete'"/>

          <a-popconfirm title='确定删除吗?' @confirm='() => handleDelete(record.csbm)' v-has="'cssz:delete'">
              <a>删除</a>
          </a-popconfirm>

        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <tjbbCsglCssz-modal ref='modalForm' @ok='modalFormOk'></tjbbCsglCssz-modal>
  </a-card>
</template>

<script>
import TjbbCsglCsszModal from './modules/TjbbCsglCsszModal'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { deleteAction } from '@api/manage'

export default {
  name: 'TjbbCsglCsszList',
  mixins: [JeecgListMixin],
  components: {
    TjbbCsglCsszModal
  },
  data() {
    return {
      description: '参数设置管理页面',
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
          }
        },
        {
          title: '参数编码',
          align: 'center',
          dataIndex: 'csbm'
        },
        {
          title: '参数名称',
          align: 'center',
          dataIndex: 'csmc'
        },
        {
          title: '参数值',
          align: 'center',
          dataIndex: 'csz'
        },
        {
          title: '备注',
          align: 'center',
          dataIndex: 'bz'
        },
        // {
        //   title: '录入标识（0 导入 1录入 2 修改）',
        //   align: 'center',
        //   dataIndex: 'lrbz'
        // },
        // {
        //   title: '录入人',
        //   align: 'center',
        //   dataIndex: 'lrr'
        // },
        // {
        //   title: '录入时间',
        //   align: 'center',
        //   dataIndex: 'lrsj'
        // },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      url: {
        list: '/tjbb/tjfz/csgl/cssz/tjbbCsglCssz/list',
        delete: '/tjbb/tjfz/csgl/cssz/tjbbCsglCssz/delete',
        deleteBatch: '/tjbb/tjfz/csgl/cssz/tjbbCsglCssz/deleteBatch',
        exportXlsUrl: 'tjbb/tjfz/csgl/cssz/tjbbCsglCssz/exportXls',
        importExcelUrl: 'tjbb/tjfz/csgl/cssz/tjbbCsglCssz/importExcel'
      }
    }
  },
  computed: {
    importExcelUrl: function() {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    }
  },
  methods: {
    handleDelete(csbm) {
      if (!this.url.delete) {
        this.$message.error('请设置url.delete属性!')
        return
      }
      var that = this
      deleteAction(that.url.delete, { csbm: csbm }).then((res) => {
        if (res.success) {
          that.$message.success(res.message)
          that.loadData()
        } else {
          that.$message.warning(res.message)
        }
      })
    },
    handleEdit(record){
      this.$refs.modalForm.edit(record)
      this.$refs.modalForm.title = '编辑'
      this.$refs.modalForm.disableSubmit = false
      this.$refs.modalForm.isShow=true
    }
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less'
</style>