<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属支行">
              <j-tree-select placeholder="请选择所属支行" v-model="queryParam.sszh"
                             dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                             :sszh="true" :showSearch="true" :treeDefaultExpandAll="true" :filterTreeNode="true" :isAll="isAll"/>
          </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24"><a-form-item label="客户经理工号">
            <a-input placeholder="请输入客户经理工号" v-model="queryParam.khjl"/>
          </a-form-item></a-col>
          <template v-if="toggleSearchStatus">

            <a-col :xl="6" :lg="7" :md="8" :sm="24"><a-form-item label="一级营销单元编号">
              <j-dict-select-tag placeholder="请选择一级营销单元" v-model="this.yjyxdybhdate" dict-code="YXDYGL_YJYXDYGL,DYMC,DYBH"
                                 :showSearch="true" @change="getyjyxdybh" :triggerChange="true" treeNodeFilterProp="title"/>
            </a-form-item></a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24" ><a-form-item label="二级营销单元">
              <j-dict-select-tag placeholder="请选择二级营销单元" v-model="this.ejyxdybhdate" :dict-code="this.ejyxdybh"
                                 :showSearch="true" :disabled=this.sfjsejyxdy @change="getejyxdybh" :triggerChange="true" treeNodeFilterProp="title"/>
            </a-form-item></a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24" v-if="this.sfktsjyxdy==1"><a-form-item label="三级营销单元">
              <j-dict-select-tag placeholder="请选择三级营销单元" v-model="this.sjyxdybhdate" :dict-code="this.sjyxdybh"
                                 :showSearch="true" :disabled=this.sfjssjyxdy  @change="getsjyxdybh" :triggerChange="true" treeNodeFilterProp="title"/>
            </a-form-item></a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24"><a-form-item label="区域代码">
              <a-input placeholder="请输入区域代码" v-model="queryParam.qydm"></a-input>
            </a-form-item></a-col>

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
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button @click="handleAdd2" type="primary" v-if="sfktsjyxdy==1" icon="plus">新增村</a-button>
      <a-button type="primary" icon="download" :loading="exportLoading"  @click="handleExportXls('片区责任人管理')">导出</a-button>
      <!--<a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        &lt;!&ndash;<a-button type="primary" icon="import">导入</a-button>&ndash;&gt;
        <a-button type="primary" icon="import" @click="excelImport">导入</a-button>
      </a-upload>-->
      <a-button type="primary" icon="import" @click="excelImport">导入</a-button>
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

      <a-table ref="table"
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
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
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

    <!-- 表单区域 -->
    <yxdyglPqzrrgl-modal ref="modalForm" @ok="modalFormOk"></yxdyglPqzrrgl-modal>

    <excel-import ref="excelImportModal" @ok="importComplete" />
  </a-card>
</template>

<script>
  import YxdyglPqzrrglModal from './modules/YxdyglPqzrrglModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { putAction,downFile,getAction} from '../../../api/manage'
  import ExcelImport from '@/components/common/ExcelImport'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import store from '@/store/'
  import { mapGetters } from 'vuex'
  import JInput from '../../../components/jeecg/JInput'


  export default {
    name: "YxdyglPqzrrglList",
    mixins:[JeecgListMixin],
    components: {
      JInput,
      YxdyglPqzrrglModal,ExcelImport,JTreeSelect
    },
    data () {
      return {
        isAll: false,
        description: '片区责任人管理管理页面',
        sfktsjyxdy: 1,
        yjyxdybhdate: "",
        ejyxdybhdate: "",
        sjyxdybhdate: "",
        sfjsejyxdy: true,
        sfjssjyxdy: true,
        ejyxdybh: "YXDYGL_EJYXDYGL,DYMC,DYBH",
        sjyxdybh: "YXDYGL_SJYXDYGL,DYMC,DYBH",
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
            title: '所属支行',
            align:"center",
            dataIndex: 'sszh_dictText'
          },
          {
            title: '区域代码',
            align:"center",
            dataIndex: 'qydm'
          },
          {
            title: '客户经理工号',
            align:"center",
            dataIndex: 'khjl'
          },
          {
            title: '客户经理',
            align:"center",
            dataIndex: 'khjl_dictText'
          },
          {
            title: '是否主客户经理',
            align:"center",
            dataIndex: 'sfzkhjl_dictText'
          },
          {
            title: '一级营销单元',
            align:"center",
            dataIndex: 'yjyxdybh_dictText'
          },
          {
            title: '二级营销单元',
            align:"center",
            dataIndex: 'ejyxdybh_dictText'
          },
          {
            title: '三级营销单元',
            align:"center",
            dataIndex: 'sjyxdybh_dictText'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
        url: {
          list: "/yxdygl/yxdyglPqzrrgl/list",
          delete: "/yxdygl/yxdyglPqzrrgl/delete",
          deleteBatch: "/yxdygl/yxdyglPqzrrgl/deleteBatch",
          exportXlsUrl: "yxdygl/yxdyglPqzrrgl/exportXls",
          importExcelUrl: "yxdygl/yxdyglPqzrrgl/importExcel",
          exportTemplateUrl: "yxdygl/yxdyglPqzrrgl/exportTemplateXls",
        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    created () {
      this.querycsz()
      this.isAll = store.getters.isRoot

    },

    methods: {
      ...mapGetters(["nickname", "avatar","userInfo"]),
      initQueryParams() {
        if(!store.getters.isRoot) {
          this.queryParam.sszh = store.getters.userInfo.orgCode
        }
        this.paramsInited=true
      },
      searchReset: function() {
        this.queryParam = {}
        if(!store.getters.isRoot) {
          this.queryParam.sszh = store.getters.userInfo.orgCode
        }
        this.yjyxdybhdate="";
        this.ejyxdybhdate="";
        this.sjyxdybhdate="";
        this.sfjsejyxdy=true;
        this.sfjssjyxdy=true;
        this.loadData(1);
      },
      handleAdd: function () {
        this.$refs.modalForm.add();
        this.$refs.modalForm.title = "新增";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.querycsz();
      },
      handleAdd2: function () {
        this.$refs.modalForm.add2();
        this.$refs.modalForm.title = "新增";
        this.$refs.modalForm.disableSubmit = false;
        //this.$refs.modalForm.querycsz();
      },
      handleEdit: function (record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "编辑";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.querycsz();
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
        console.log("this.getQueryParams()");
        var params = this.getQueryParams();//查询条件
        if(this.yjyxdybhdate){
          params.yjyxdybh = this.yjyxdybhdate
        }
        if(this.ejyxdybhdate){
          params.ejyxdybh = this.ejyxdybhdate
        }
        if(this.sjyxdybhdate){
          params.sjyxdybh = this.sjyxdybhdate
        }
        console.info(params)
        this.loading = true;
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records;
            this.ipagination.total = res.result.total;
          }
          if(res.code===510){
            this.$message.warning(res.message,5)
          }
          this.loading = false;
        })
      },
      excelImport(){
        let params = {}
        params.exportTemplateUrl = this.url.exportTemplateUrl
        params.importExcelUrl = this.importExcelUrl
        params.exportTemplateName = "片区责任人管理"
        this.$refs.excelImportModal.showModal(params);
      },
      importComplete(filePath) {
        let fileName = "导入结果"
        let param = {};
        console.log("filePath")
        console.log(filePath)
        downFile("/sys/common/download/" + filePath,param).then((data)=>{
          if (!data) {
            this.$message.warning("文件下载失败")
            return
          }
          var blob = new Blob([data]);
          if('msSaveOrOpenBlob' in navigator){
            window.navigator.msSaveOrOpenBlob(blob, fileName+'.xls');
            return;
          }
          var eleLink = document.createElement('a');
          eleLink.download = fileName+'.xls';
          eleLink.style.display = 'none'
          eleLink.href = URL.createObjectURL(blob);
          document.body.appendChild(eleLink);
          eleLink.click();
          document.body.removeChild(eleLink);
        })
        this.loadData();
      },
      //查询是否显示三级营销单元字段1：是 2：否
      querycsz(){
        let params = { "csbm":"CS0004"}
        putAction("/yxdygl/yxdyglPqzrrgl/querycsz", params).then(res => {
          console.log("---------")
          if(res.result.csz==2){
            this.columns.splice(8,1)
          }
          this.sfktsjyxdy =res.result.csz
        });
      },
      getyjyxdybh(value) {
        if (value) {
          this.ejyxdybhdate="",
          this.sjyxdybhdate="",
          this.sfjsejyxdy=false,
          this.sfjssjyxdy=true,
          this.yjyxdybhdate = value
          let yjyxdybh = value
          this.ejyxdybh = "YXDYGL_EJYXDYGL,DYMC,DYBH,YJYXDYBH = " + yjyxdybh;
          console.log(this.ejyxdybh)
        }
      },
      getejyxdybh(value){
        if(value) {
          //this.queryParam.sjyxdybh= "",
          this.sfjssjyxdy=false,
          this.ejyxdybhdate = value
          let ejyxdybh = value
          this.sjyxdybh = "YXDYGL_SJYXDYGL,DYMC,DYBH,EJYXDYBH = "+ejyxdybh;
          console.log(this.ejyxdybh)
        }
      },
      getsjyxdybh(value){
        this.sjyxdybhdate = value
      }
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>