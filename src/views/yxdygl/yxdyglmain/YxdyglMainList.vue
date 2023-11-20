<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属支行">
              <j-tree-select placeholder="请选择所属支行"
                             v-model="queryParam.zzbz"
                             treeNodeFilterProp="title"
                             pid-field="sjzzbz"
                             dict="v_hr_bas_organization_cmms, zzjc, zzbz"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="单元名称">
              <j-input placeholder="请输入单元名称" v-model="queryParam.wgmc"></j-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="单元编号">
              <a-input placeholder="请输入单元编号" v-model="queryParam.wgbh"></a-input>
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
<!--      <a-button @click="handleAdd1" type="primary" icon="plus" v-has="'yxdyglMaim:add1'" v-show="show1">新增{{showName}}</a-button>
      <a-button @click="handleAdd2" type="primary" icon="plus" v-has="'yxdyglMaim:add2'" v-show="show2">新增{{showName}}</a-button>
      <a-button @click="handleAdd2" type="primary" icon="plus" v-has="'yxdyglMaim:add3'"v-show="show3">新增{{showName}}</a-button>-->
      <a-button icon="download" @click="handleExportXls('网格基本信息')" v-has="'yxdyglMain:exp'">导出</a-button>
<!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel" v-has="'yxdyglMaim:imp'">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>-->
      <a-button icon="import" @click="excelImport" v-has="'yxdyglMain:imp'">导入</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel" v-has="'yxdyglMain:batdel'"><a-icon type="delete"/>删除</a-menu-item>
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
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'yxdyglMain:update'">编辑</a>

          <a-divider type="vertical" v-has="'yxdyglMain:del'"/>
          <a-dropdown v-has="'yxdyglMain:del'">
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item v-has="'yxdyglMain:del'">
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->
    <YxdyglMeunModal ref="modalForm" @ok="modalFormOk"></YxdyglMeunModal>
    <excel-import ref="excelImportModal" @ok="importComplete"/>

    <!-- 表单区域 -->
  </a-card>
</template>

<script>
  import { JeecgListMixin } from '../../../mixins/JeecgListMixin'
  import YxdyglMeunModal from './modules/YxdyglMeunModal'
  import ExcelImport from '@/components/common/ExcelImport'
  import { deleteAction } from '@/api/manage'
  import JInput from "@/components/jeecg/JInput";
  import JTreeSelect from '@/components/jeecg/JTreeSelect'

  export default {
    name: "YxdyglMainList",
    mixins:[JeecgListMixin],
    components: {
      YxdyglMeunModal,ExcelImport, JInput, JTreeSelect
    },
    data () {
      return {
        exportTemplateName: '网格基本信息导入模板',
        show1 : false,
        showName : '',
        show2 : false,
        show3 : false,
        description: '营销单元管理管理页面',
        menuDate : [],
        disableMixinCreated: true,
        // 表头
        columns: [
         /* {
            title: '#',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
          },*/
          {
            title: '网格名称',
            align:"center",
            dataIndex: 'wgmc'
          },
          {
            title: '网格编号',
            align:"center",
            dataIndex: 'wgbh'
          },
          {
            title: '单元性质',
            align:"center",
            dataIndex: 'wgxz_dictText'
          },
          {
            title: '上级网格',
            align:"center",
            dataIndex: 'parentId_dictText'
          },
          {
            title: '所属支行',
            align:"center",
            dataIndex: 'zzbz_dictText'
          },
          {
            title: '网格面积',
            align:"center",
            dataIndex: 'wgmj'
          },
          {
            title: '网格情况',
            align:"center",
            dataIndex: 'wgqk'
          },
          {
            title: '网格痛点分析',
            align:"center",
            dataIndex: 'wgtdfx'
          },
          {
            title: '网格位置',
            align:"center",
            dataIndex: 'wgwz'
          },
          // {
          //   title: '网格关键人1',
          //   align:"center",
          //   dataIndex: 'wggjr1'
          // },
          // {
          //   title: '关键人1联系方式',
          //   align:"center",
          //   dataIndex: 'gjrlxfs1'
          // },
          // {
          //   title: '网格关键人2',
          //   align:"center",
          //   dataIndex: 'wggjr2'
          // },
          // {
          //   title: '关键人2联系方式',
          //   align:"center",
          //   dataIndex: 'gjrlxfs2'
          // },
          // {
          //   title: '网格关键人3',
          //   align:"center",
          //   dataIndex: 'wggjr3'
          // },
          // {
          //   title: '关键人3联系方式',
          //   align:"center",
          //   dataIndex: 'gjrlxfs3'
          // },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            width: 120,
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/yxdyglmain/yxdyglMain/list",
          delete: "/yxdyglmain/yxdyglMain/delete",
          deleteBatch: "/yxdyglmain/yxdyglMain/deleteBatch",
          exportXlsUrl: "yxdyglmain/yxdyglMain/exportXls",
          importExcelUrl: "yxdyglmain/yxdyglMain/importExcel",
          exportTemplateUrl: "/yxdyglmain/yxdyglMain/exportTemplateXls",
    },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      resetParams(){
        this.queryParam = [];
      },
      myRefresh(data){
        console.log('yxdyglMain myRefresh')
        this.resetParams()
        //this.isCanAdd = data.isLeaf;
        //this.parentId = data.id;
        /*let params = {"id":data.id}
        getAction(this.url.listChild,params).then((res) => {
          console.log(res)
          this.dataSource = res.result.records
          console.log(this.dataSource)
          this.ipagination = res.result;
        })*/
        this.queryParam.parentId = data.id;
        this.loadData(1);
      },

      handleDelete: function (id) {
        deleteAction(this.url.delete, {id: id}).then((res) => {
          if (res.success) {
            this.$message.success(res.message);
            this.loadData();
            this.$emit('ok');
          } else {
            this.$message.warning(res.message,5);
          }
        });
      },

      /*handleAdd1(){
        this.$refs.modalForm.add(this.menuDate);
        this.$refs.modalForm.title = "新增";
        this.$refs.modalForm.disableSubmit = false;
      },
      handleAdd2(){
        this.$refs.modalForm2.add(this.menuDate);
        this.$refs.modalForm2.title = "新增";
        this.$refs.modalForm2.disableSubmit = false;
      },
      handleAdd3(){},*/

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>