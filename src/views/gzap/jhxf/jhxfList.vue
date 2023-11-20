<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :span="6">
            <a-form-item label="计划类型">
<!--              <a-input placeholder="请输入计划类型" v-model="queryParam.gzlx"></a-input>-->
              <a-select placeholder="请选择工作类型"    v-model="queryParam.gzlx">
                <a-select-option value="2" >月工作计划</a-select-option>
                <a-select-option value="1" >周工作计划</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="计划开始日期">
<!--              <a-input placeholder="请输入计划开始日期" v-model="queryParam.jhkssj"></a-input>-->
              <a-month-picker
                placeholder="请选择计划开始日期"
                style="width:100%"
                v-model="queryParam.jhkssj"/>
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item label="状态">
              <j-dict-select-tag placeholder="请选择计划状态"
                                 v-model="queryParam.zt"
                                 dict-code="gzap_rwxfzt"/>
            </a-form-item>
          </a-col>
          <a-col :span="6" >
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
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('计划下发')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i>
        <span>已选择</span>
        <a style="font-weight: 600">
          {{ selectedRowKeys.length }}
        </a>
        <span>项</span>
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">详情</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
              <a-menu-item>
                  <a-popconfirm title="确定结束吗?" @confirm="() => handleCheck(record.id)">
                  <a>结束</a>
                </a-popconfirm>
              </a-menu-item></a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <jhxf-modal ref="modalForm" @ok="modalFormOk"/>

  </a-card>
</template>

<script>

  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import jhxfModal from './modules/jhxfModal'
  import { deleteAction, getAction,downFile } from '@/api/manage'
  import { filterObj } from '@/utils/util';
  export default {
    name: "jhxfList",
    mixins: [JeecgListMixin],
    components: {
      jhxfModal
    },
    data () {
      return {
        description: '计划下发管理页面',
        // 表头
        columns: [

          {
            title: '计划类型',
            align:"center",
            dataIndex: 'gzlx_dictText'
          },
          {
            title: '计划开始日期',
            align:"center",
            dataIndex: 'jhkssj',
            customRender: function (text) {
              return !text ? "" : (text.length > 8 ? text.substr(0, 7) : text)
            },
          },
          {
            title: '计划结束日期',
            align:"center",
            dataIndex: 'jhjssj',
            customRender: function (text) {
              return !text ? "" : (text.length > 8 ? text.substr(0, 7) : text)
            },
          },
          {
            title: '计划概述',
            align:"center",
            dataIndex: 'gs'
          },
        /*  {
            title: '计划内容',
            align:"center",
            dataIndex: 'nr'
          },*/
          {
            title: '状态',
            align:"center",
            dataIndex: 'zt_dictText',

          },
          {
            title: '备注',
            align:"center",
            dataIndex: 'bz'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
        // 请求参数
    	url: {
              list: "/gzap_jhxf/jhxf/list",
              delete: "/gzap_jhxf/jhxf/delete",
              deleteBatch: "/gzap_jhxf/jhxf/deleteBatch",
              exportXlsUrl: "gzap_jhxf/jhxf/exportXls",
              importExcelUrl: "gzap_jhxf/jhxf/importExcel",
           },
        }
      },
      computed: {
        importExcelUrl: function(){
          return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
        }
      },


    methods: {
      handleCheck(id){
        deleteAction( "/gzap_jhxf/jhxf/check", {id: id}).then((res) => {
          if (res.success) {
            this.$message.success(res.message);
            this.loadData();
          } else {
            this.$message.warning(res.message,5);
          }
        });
      },
      handleEdit: function (record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "编辑";
        this.$refs.modalForm.disableSubmit = false;
      },
      getQueryParams(){
        let tjrqment = "";
        if(this.queryParam.jhkssj) {
          var tjrqment1 = this.queryParam.jhkssj.format("YYYY-MM")+'-01';
        }
        if(this.queryParam.jhjssj) {
          var  tjrqment2 = this.queryParam.jhjssj.format("YYYY-MM")+'-01';
        }
        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        param.jhkssj   = tjrqment1;
        param.jhjssj   = tjrqment2;
        return filterObj(param);
      },
      searchQuery() {
        this.loadData(1);
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>