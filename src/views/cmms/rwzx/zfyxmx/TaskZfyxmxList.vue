<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="任务名称">
              <a-input placeholder="请输入任务名称" v-model="queryParam.rwmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="营销类型">
              <j-dict-select-tag placeholder="请选择营销类型" v-model="queryParam.yxlx"   dict-code="zfyxlx"  />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户名称">
              <a-input placeholder="请输入客户名称" v-model="queryParam.khmc"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入营销类型" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="营销结果">
              <j-dict-select-tag placeholder="请选择营销结果" v-model="queryParam.yxjg"   dict-code="yxjg"  />
            </a-form-item>
          </a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
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
      <a-button type="primary" icon="download" :loading="exportLoading" @click="handleExportXls('走访营销明细')">导出</a-button>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        bordered
        :rowKey="rowKey"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">查看详情</a>
          <a-divider type="vertical" v-show="record.yxlx==1" />
          <a @click="updateLycl(record)" v-show="record.yxlx==1">上传录音</a>

          <!--         <a-divider type="vertical" />
                    <a-dropdown>
                      <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
                      <a-menu slot="overlay">
                        <a-menu-item>
                          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                            <a>删除</a>
                          </a-popconfirm>
                        </a-menu-item>
                      </a-menu>
                    </a-dropdown>-->
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <task-ec-zf-modal ref="eczfModal" @ok="modalFormOk"></task-ec-zf-modal>
    <task-yx-modal ref="yxModal" @ok="modalFormOk"></task-yx-modal >
    <task-scly-modal ref="sclyModal" @ok="modalFormOk"></task-scly-modal>
  </a-card>
</template>

<script>
  import TaskYxModal from './modules/TaskYxModal'
  import TaskEcZfModal from './modules/TaskEcZfModal'
  import TaskSclyModal from './modules/TaskSclyModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "TaskZfyxmxList",
    mixins:[JeecgListMixin],
    components: {
      TaskYxModal,TaskEcZfModal,TaskSclyModal
    },
    data () {
      return {
        description: '走访营销明细管理页面',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
           },

           {
            title: '任务名称',
            align:"center",
            dataIndex: 'rwmc'
          },

		   {
            title: '营销类型',
            align:"center",
            dataIndex: 'yxlx_dictText'
           },


          {
            title: '走访人(营销人)',
            align:"center",
            dataIndex: 'yxzfr'
          },

          {
            title: '客户名称',
            align:"center",
            dataIndex: 'khmc'
          },
          {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm'
          },
		   {
            title: '营销结果',
            align:"center",
            dataIndex: 'yxjg_dictText'
           },


          {
            title: '走访(营销)日期',
            align:"center",
            dataIndex: 'createTime'
          },

          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/zfyxmx/taskZfyxmx/list",
          delete: "/zfyxmx/taskZfyxmx/delete",
          deleteBatch: "/zfyxmx/taskZfyxmx/deleteBatch",
          exportXlsUrl: "zfyxmx/taskZfyxmx/exportXls",
          importExcelUrl: "zfyxmx/taskZfyxmx/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      handleEdit: function (record) {
        console.log(record)
        if(record.yxlx=='1'){
          this.$refs.yxModal.edit(record)
          this.$refs.yxModal.title = '营销详情'
          this.$refs.yxModal.disableSubmit = false
        }else if(record.yxlx=='2'){
          this.$refs.eczfModal.edit(record)
          this.$refs.eczfModal.title = '走访详情'
          this.$refs.eczfModal.disableSubmit = false
        }

      },
      updateLycl(record){
        this.$refs.sclyModal.edit(record)
        this.$refs.sclyModal.title = '录音材料'
        this.$refs.sclyModal.disableSubmit = false
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>