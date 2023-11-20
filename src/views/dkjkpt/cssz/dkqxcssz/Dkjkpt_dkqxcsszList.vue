<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="参数编号">
              <a-input placeholder="请输入参数编号" v-model="queryParam.csbh"></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>

            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'dkqxcssz:add'">新增</a-button>
      <a-button :loading="exportLoading" icon="download" @click="handleExportXls('贷款期限参数设置')" v-has="'dkqxcssz:exportXls'">导出</a-button>
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
<!--        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{-->
<!--        selectedRowKeys.length }}</a>项-->
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
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'dkqxcssz:edit'">编辑</a>

          <a-divider type="vertical"/>
                <a-popconfirm title="确定删除吗?" @confirm="() => deleteById(record.csbh)" v-has="'dkqxcssz:delete'">
                  <a>删除</a>
                </a-popconfirm>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <dkjkpt_dkqxcssz-modal ref="modalForm" @ok="modalFormOk"></dkjkpt_dkqxcssz-modal>
  </a-card>
</template>

<script>
  import Dkjkpt_dkqxcsszModal from './modules/Dkjkpt_dkqxcsszModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { deleteAction } from '@/api/manage'

  export default {
    name: 'Dkjkpt_dkqxcsszList',
    mixins: [JeecgListMixin],
    components: {
      Dkjkpt_dkqxcsszModal
    },
    data() {
      return {
        description: '贷款期限参数设置管理页面',
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
            title: '参数编号',
            align: 'center',
            dataIndex: 'csbh'
          },
          {
            title: '参数值起',
            align: 'center',
            dataIndex: 'cszq'
          },
          {
            title: '参数值止',
            align: 'center',
            dataIndex: 'cszz'
          },
          {
            title: '调整值',
            align: 'center',
            dataIndex: 'tzz'
          },
          {
            title: '备注',
            align: 'center',
            dataIndex: 'bz'
          },
          {
            title: '录入人',
            align: 'center',
            dataIndex: 'lrr'
          },
          {
            title: '录入时间',
            align: 'center',
            dataIndex: 'lrsj'
          },
          {
            title: '录入标志',
            align: 'center',
            dataIndex: 'lrbz'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            scopedSlots: { customRender: 'action' }
          }
        ],
        url: {
          list: '/DKJKPT_DKQXCSSZ/dkjkpt_dkqxcssz/list',
          delete: '/DKJKPT_DKQXCSSZ/dkjkpt_dkqxcssz/deleteByCsbh',
          deleteBatch: '/DKJKPT_DKQXCSSZ/dkjkpt_dkqxcssz/deleteBatch',
          exportXlsUrl: 'DKJKPT_DKQXCSSZ/dkjkpt_dkqxcssz/exportXls',
          importExcelUrl: 'DKJKPT_DKQXCSSZ/dkjkpt_dkqxcssz/importExcel'
        }
      }
    },
    computed: {
      importExcelUrl: function() {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      }
    },
    methods: {
      deleteById(csbh) {
        console.log(csbh)
        deleteAction(this.url.delete, { 'csbh': csbh}).then((res) => {
          if (res.success) {
            this.$message.success(res.message)
            this.loadData(1)
          } else {
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