<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <!--<a-col :md="6" :sm="8"><a-form-item label="指标规则ID">
            <j-input placeholder="请输入指标规则ID" v-model="queryParam.zbgzid"/>
          </a-form-item></a-col>-->
          <a-col :span="12" :gutter="6"><a-form-item  :labelCol="labelCol" :wrapperCol="wrapperCol" label="指标规则项目">
            <j-dict-select-tag placeholder="请选择指标规则项目" v-model="queryParam.zbgzid"
                               dict-code="rate:rate_zbgzxxb,zbgzmc,zbgzid" :show-search="true"/>
          </a-form-item></a-col>
          <template v-if="toggleSearchStatus"></template>
          <a-col :md="6" :sm="8" >
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'gzbdssz:add'">新增</a-button>
      <a-button icon="download" @click="handleExportXls('规则表达式设置')" v-has="'gzbdssz:exportXls'">导出</a-button>
      <!--<a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>-->
    </div>

    <!-- table区域-begin -->
    <div>
      <!--<div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }} </a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>-->

      <a-table ref="table"
               size="middle"
               bordered
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               @change="handleTableChange">
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'gzbdssz:edit'">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)" v-has="'gzbdssz:delete'">
            <a>删除</a>
          </a-popconfirm>
          <!--<a-dropdown>
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
        <span slot="zbgzidText" slot-scope="text, record">
          <j-ellipsis :value="text" :length="30"/>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <gzbdssz-modal ref="modalForm" @ok="modalFormOk"/>
  </a-card>
</template>

<script>
  import GzbdsszModal from './modules/GzbdsszModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JEllipsis from '../../../../components/jeecg/JEllipsis'
  import JInput from '../../../../components/jeecg/JInput'
  import { deleteAction } from '@/api/manage'

  export default {
    name: "GzbdsszList",
    mixins:[JeecgListMixin],
    components: {
      JInput,
      JEllipsis,
      GzbdsszModal
    },
    data () {
      return {
        description: '规则表达式设置管理页面',
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: "center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
          },
          {
            title: '指标规则ID',
            align: "center",
            dataIndex: 'zbgzid',
            width: 100,
          },
          {
            title: '指标规则项目',
            align: "center",
            dataIndex: 'zbgzid_dictText',
            width: 300,
            scopedSlots: { customRender: 'zbgzidText' },
          },
          {
            title: '表达式键值',
            align: "center",
            dataIndex: 'bdskey',
            width: 100,
          },
          {
            title: '表达式值',
            align: "center",
            dataIndex: 'bdsvalue',
            width: 100,
          },
          {
            title: '表达式分值',
            align: "center",
            dataIndex: 'bdsfz',
            width: 100,
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            scopedSlots: { customRender: 'action' },
            width: 100,
          }
        ],
        url: {
          list: "/csszgl/gzbdssz/list",
          delete: "/csszgl/gzbdssz/delete",
          deleteBatch: "/csszgl/gzbdssz/deleteBatch",
          exportXlsUrl: "csszgl/gzbdssz/exportXls",
          importExcelUrl: "csszgl/gzbdssz/importExcel",
        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      handleAdd: function () {
        this.$refs.modalForm.add();
        this.$refs.modalForm.title = "新增指标规则";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.disabled = false;
      },
      handleEdit(record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "编辑指标规则";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.disabled = true;
      },
      handleDelete: function (record) {
        if(!this.url.delete){
          this.$message.error("请设置url.delete属性!")
          return
        }
        var that = this;
        deleteAction(that.url.delete, {zbgzid: record.zbgzid, bdskey: record.bdskey}).then((res) => {
          if (res.success) {
            that.$message.success(res.message);
            that.loadData();
          } else {
            that.$message.warning(res.message);
          }
        });
      },
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>