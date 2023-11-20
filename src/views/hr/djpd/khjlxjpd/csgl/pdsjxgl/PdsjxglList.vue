<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="数据项ID">
              <a-input placeholder="请输入数据项ID" v-model="queryParam.sjxid"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="数据项名称">
              <a-input placeholder="请输入数据项名称" v-model="queryParam.sjxmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="数据项维度">
              <a-select placeholder="全部" v-model="queryParam.sjxwd">
                <a-select-option value="DD">
                  天
                </a-select-option>
                <a-select-option value="MM">
                  月
                </a-select-option>
                <a-select-option value="Q">
                  季
                </a-select-option>
                <a-select-option value="YYYY">
                  年
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

        </a-row>
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="数据来源">
              <a-select placeholder="全部" v-model="queryParam.sjly">
                <a-select-option value="0">
                  系统取数
                </a-select-option>
                <a-select-option value="1">
                  人工录入
                </a-select-option>
              </a-select>
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'Pdsjxgl:add'">新增</a-button>
      <a-button icon="download" @click="handleExportXls('评定数据项管理')" v-has="'Pdsjxgl:exp'">导出</a-button>
      <!--<a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>-->
    </div>

    <!-- table区域-begin -->
    <div>
      <!--<div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>-->

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

        <span slot="sjxsql" slot-scope="text">
          <j-ellipsis :value="text" :length="8" />
        </span>

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'Pdsjxgl:edit'">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)">
                  <a v-has="'Pdsjxgl:del'">删除</a>
                </a-popconfirm>
              </a-menu-item>
              <a-menu-item>
                  <a href="javascript:;" @click="xq(record)" v-has="'Pdsjxgl:view'">详情</a>
               </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <pdsjxgl-modal ref="modalForm" @ok="modalFormOk"></pdsjxgl-modal>
  </a-card>
</template>

<script>
  import PdsjxglModal from './modules/PdsjxglModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { deleteAction } from '@/api/manage'
  import JEllipsis from '@/components/jeecg/JEllipsis'

  export default {
    name: "PdsjxglList",
    mixins:[JeecgListMixin],
    components: {
      PdsjxglModal,JEllipsis
    },
    data () {
      return {
        description: '评定数据项管理管理页面',
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
            title: '数据项ID',
            align:"center",
            dataIndex: 'sjxid'
           },
		   {
            title: '数据项名称',
            align:"center",
            dataIndex: 'sjxmc'
           },
		   {
            title: '数据项维度',
            align:"center",
            dataIndex: 'sjxwd_dictText'
           },
		   {
            title: '数据项取值SQL',
            align:"center",
            dataIndex: 'sjxsql',
            scopedSlots: { customRender: 'sjxsql' },
            //width: 150
           },
		   {
            title: '数据来源',
            align:"center",
            dataIndex: 'sjly_dictText'
           },
		   {
            title: '执行顺序',
            align:"center",
            dataIndex: 'zxsx'
           },
		   {
            title: '录入时间',
            align:"center",
            dataIndex: 'lrsj'
           },
		   {
            title: '录入标识',
            align:"center",
            dataIndex: 'lrbz_dictText'
           },
		   {
            title: '录入人',
            align:"center",
            dataIndex: 'lrr'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/pdsjxgl/pdsjxgl/list",
          delete: "/pdsjxgl/pdsjxgl/delete",
          deleteBatch: "/pdsjxgl/pdsjxgl/deleteBatch",
          exportXlsUrl: "pdsjxgl/pdsjxgl/exportXls",
          importExcelUrl: "pdsjxgl/pdsjxgl/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      handleDelete: function (record) {
        console.log(record)
        if(!this.url.delete){
          this.$message.error("请设置url.delete属性!")
          return
        }
        var that = this;
        deleteAction(that.url.delete, {sjxid: record.sjxid,sjxwd:record.sjxwd}).then((res) => {
          if (res.success) {
            that.$message.success(res.message);
            that.loadData();
          } else {
            that.$message.warning(res.message);
          }
        });
      },
      xq:function(record){
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title="详情";
        this.$refs.modalForm.disableSubmit = true;
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>