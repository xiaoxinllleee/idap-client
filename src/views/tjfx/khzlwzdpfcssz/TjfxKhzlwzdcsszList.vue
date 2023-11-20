<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8"><a-form-item label="客户类型">
            <j-dict-select-tag placeholder="请选择客户类型" v-model="queryParam.khlx" dictCode="khlx"/>
          </a-form-item></a-col>

          <a-col :md="6" :sm="8">
            <a-form-item label="字段编码">
              <j-input placeholder="请输入字段编码" v-model="queryParam.csbm" ></j-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="字段名称">
              <j-input placeholder="请输入字段名称" v-model="queryParam.csm"></j-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
       <!-- <a-col :md="6" :sm="8">
            <a-form-item label="分值">
              <a-input placeholder="请输入分值" v-model="queryParam.fz"></a-input>
            </a-form-item>
          </a-col>-->
          </template>
          <a-col :md="6" :sm="8" >
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
      <a-button @click="handAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('客户建档完整度评分参数设置')">导出</a-button>
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
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
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
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
       <!--  <a @click="handleEdit(record)">编辑</a>-->
  <a @click="delete12(record)">删除</a>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <tjfxKhzlwzdcssz-modal ref="modalForm" @ok="modalFormOk"></tjfxKhzlwzdcssz-modal>
  </a-card>
</template>

<script>
  import TjfxKhzlwzdcsszModal from './modules/TjfxKhzlwzdcsszModal1'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { getAction,putAction,httpAction } from '@/api/manage'
  import JInput from '@/components/jeecg/JInput'


  export default {
    name: "TjfxKhzlwzdcsszList",
    mixins:[JeecgListMixin],
    components: {
      TjfxKhzlwzdcsszModal,JInput
    },
    data () {
      return {
        description: '客户建档完整度评分参数设置管理页面',
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
            title: '客户类型',
            align:"center",
            dataIndex: 'khlx_dictText'
          },
		   {
            title: '字段编码',
            align:"center",
            dataIndex: 'csbm'
           },
		   {
            title: '字段名称',
            align:"center",
            dataIndex: 'csm'
           },
		   {
            title: '分值',
            align:"center",
            dataIndex: 'fz'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/tjfx.khzlwzdpfcssz/tjfxKhzlwzdcssz/list",
          delete: "/tjfx.khzlwzdpfcssz/tjfxKhzlwzdcssz/delete",
          deleteBatch: "/tjfx.khzlwzdpfcssz/tjfxKhzlwzdcssz/deleteBatch",
          exportXlsUrl: "tjfx.khzlwzdpfcssz/tjfxKhzlwzdcssz/exportXls",
          importExcelUrl: "tjfx.khzlwzdpfcssz/tjfxKhzlwzdcssz/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {

      handAdd: function () {
        var params = this.queryParam;
        if( params.khlx==null  || params.khlx=='undefined'){
          this.$message.error("请先选择客户类型!")
          return
        }
        this.$refs.modalForm.add();
        this.$refs.modalForm.title = "新增";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.khlx=params.khlx;
      },

      delete12(record) {
        var truthBeTold = window.confirm("确定删除吗")
        if (truthBeTold) {
          let csbm = record.csbm;
          putAction(this.url.delete, {"csbm":record.csbm},'put').then((res) => {
            if(res.success){
              this.$message.success(res.message);
              this.loadData(1);
            }else{
              this.$message.warning(res.message,5);
            }
          })
        } else {

        }

      },
      loadData(arg) {
        if(!this.url.list){
          this.$message.error("请设置url.list属性!")
          return
        }
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1;
        }
        var params = this.getQueryParams();//查询条件
        console.info(params)
        this.loading = true;
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            console.info(123)
            this.dataSource = res.result.records;
            this.ipagination.total = res.result.total;
          }
          if(res.code===510){
            this.$message.warning(res.message,5)
          }
          this.loading = false;
        })
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>