<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
         <!-- <a-col :md="6" :sm="8"><a-form-item label="所属支行">
            <j-tree-select placeholder="请选择支行查询" v-model="queryParam.sszh"
                           dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ" pidField="sjzzbz"
                           :sszh="true" :showSearch="true" :treeDefaultExpandAll=true treeNodeFilterProp="title"/>
          </a-form-item></a-col>-->

          <a-col :md="6" :sm="8"><a-form-item label="所属支行">
            <j-tree-select placeholder="请选择所属支行" v-model="queryParam.sszh"
                           dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                           :sszh="true" :showSearch="false" :treeDefaultExpandAll="true" :filterTreeNode="true" :isAll="isAll"/>
          </a-form-item></a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24"><a-form-item label="所属乡镇">
            <j-dict-select-tag placeholder="请选择所属乡镇" v-model="queryParam.ssxz" dict-code="YXDYGL_YJYXDYGL,DYMC,DYBH"
                               :showSearch="true" @change="getyjyxdybh" :triggerChange="true" treeNodeFilterProp="title"/>
          </a-form-item></a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24" ><a-form-item label="行政村">
            <j-dict-select-tag placeholder="请选择行政村" v-model="queryParam.xzc" :dict-code="this.ejyxdybh"
                               :showSearch="true" :disabled=this.sfjsejyxdy @change="getejyxdybh" :triggerChange="true" treeNodeFilterProp="title"/>
          </a-form-item></a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24" v-if="this.sfktsjyxdy==1"><a-form-item label="行政组">
            <j-dict-select-tag placeholder="请选择行政组" v-model="this.sjyxdybhdate" :dict-code="this.sjyxdybh"
                               :showSearch="true" :disabled=this.sfjssjyxdy  @change="getsjyxdybh" :triggerChange="true" treeNodeFilterProp="title"/>
          </a-form-item></a-col>

          <!--<a-col :md="6" :sm="8"><a-form-item label="所属村名称">
            <j-dict-select-tag placeholder="请选择所属村" v-model="queryParam.yxzc"
                               dictCode="V_YXDYGL_CZXXGL,VILLAGE,VILLAGE" :showSearch="true" treeNodeFilterProp="title"/>
          </a-form-item></a-col>-->

          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8"><a-form-item label="户号编码">
              <a-input placeholder="请输入户号编码" v-model="queryParam.hhbm"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="客户名称">
              <j-input placeholder="请输入客户名称" v-model="queryParam.khmc" type="likemore"/>
            </a-form-item></a-col>
            <!--<a-col :md="6" :sm="8"> <a-form-item label="采集时间">
                <a-date-picker v-model="queryParam.cjsj" placeholder="请选采集时间" style="width: 100%;"/>
            </a-form-item></a-col>-->

            <a-col :md="6" :sm="8">
              <a-form-item label="是否已采集">
                <j-dict-select-tag placeholder="请选择是否已采集" v-model="queryParam.sfcj" dict-code="sfbz"/>
              </a-form-item>
            </a-col>

          </template>

          <!--<a-col :md="6" :sm="8" >
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button @click="searchQuery" type="primary" icon="search">查询</a-button>
              <a-button @click="searchReset" type="primary" icon="reload" style="margin-left: 8px;">重置</a-button>
               <a-button type="primary" icon="download"  style="margin-left: 8px;" @click="handleExportXls('农户信息管理')">导出采集信息</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px;">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>-->
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <!--<a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
     <!-- <a-button type="primary" icon="area-chart"  @click="initData">提取</a-button>-->
     <!-- <a-button type="primary" icon="download" @click="handleExportXls('农户信息管理')">导出</a-button>-->
      <!--    <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader"
                :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>-->
      <a-button @click="searchQuery" type="primary" icon="search">查询</a-button>
      <a-button @click="searchReset" type="primary" icon="reload" style="margin-left: 8px;">重置</a-button>
      <a-button type="primary" icon="download" :loading="exportLoading" style="margin-left: 8px;" @click="handleExportXls('农户采集信息')">导出采集信息</a-button>
      <a-button type="primary" icon="download" :loading="exportLoading" style="margin-left: 8px;" @click="exportXydjpdb('农户信用等级评定表')">导出信用等级评定表</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay"><a-menu-item key="1" @click="batchDel">
          <a-icon type="delete"/>删除
        </a-menu-item></a-menu>
        <a-button style="margin-left: 8px;"> 批量操作 <a-icon type="down"/></a-button>
      </a-dropdown>
      <a @click="handleToggleSearch" style="margin-left: 8px;">
        {{ toggleSearchStatus ? '收起' : '展开' }}
        <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
      </a>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择
        <a style="font-weight: 600;">{{ selectedRowKeys.length }}</a> 项
        <a style="margin-left: 24px;" @click="onClearSelected">清空</a>
      </div>

      <a-table bordered
               ref="table"
               size="middle"
               :columns="columns"
               :loading="loading"
               :dataSource="dataSource"
               :pagination="ipagination"
               :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
               :scroll="{ x: 2000 }"
               @change="handleTableChange">

        <span slot="sszh" slot-scope="text"><j-ellipsis :value="text" :length="8"/></span>
        <span slot="ssyxdy" slot-scope="text"><j-ellipsis :value="text" :length="8"/></span>
        <span slot="sscmc" slot-scope="text"><j-ellipsis :value="text" :length="8"/></span>
        <span slot="zjhm" slot-scope="text"><j-ellipsis :value="text" :length="10"/></span>
        <span slot="hjdz" slot-scope="text"><j-ellipsis :value="text" :length="6"/></span>
        <span slot="bz" slot-scope="text"><j-ellipsis :value="text" :length="10"/></span>
        <span slot="yhzgx" slot-scope="text"><j-ellipsis :value="text" :length="8"/></span>
        <span slot="dz" slot-scope="text"><j-ellipsis :value="text" :length="8"/></span>

        <span slot="action" slot-scope="text,record">
        <!--  <a @click="handleDetail(record)">详情</a>-->
         <!-- <a @click="handleEdit(record)">编辑</a>-->
         <!-- <a-divider type="vertical"/>-->
          <a @click="handlemxExportXls('农户基本信息',record)">导出</a>
          <a-divider type="vertical"/>
          <a-dropdown>
            <a class="ant-dropdown-link">更多<a-icon type="down"/></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm v-if="sszh==1" title="确定删除吗?" @confirm="() => handleDelete(record.zjhm)">
                 <a>删除</a>
                </a-popconfirm>
              </a-menu-item>

               <a-menu-item>
                  <a href="javascript:;" @click="handlePyxxEdit(record)">评议信息</a>
               </a-menu-item>

               <a-menu-item>
                  <a href="javascript:;" @click="handlePrint(record)">导出及打印采集信息</a>
               </a-menu-item>
              <a-menu-item >
                  <a v-if="record.sfypyjl==1" href="javascript:;" @click="handlepjsxspbPrint(record)">农户评级授信审批表</a>
               </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>
        <span slot="detail" slot-scope="khmc,record">
          <a @click="handlepjsxjdmxEdit(record)">{{khmc}}</a>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <nhjbxx-modal ref="modalForm" @ok="modalFormOk"/>
    <pyxxgl-modal ref="pyxxglModalForm" @ok="modalFormOk"/>
    <nhjbxxx-xq-modal ref="NhjbxxxXqModal" />
    <PrintYX ref="Print" v-if="qybm == '350'"/>
    <Print ref="Print" v-else/>
    <nhpjsxspb-print ref="pjsxPrint"/>
    <edit-nhjbxx-modal  ref="EditModalForm" @ok="modalFormOk" />

  </a-card>

</template>

<script>
  import NhjbxxModal from './modules/NhjbxxModal'
  import EditNhjbxxModal from './modules/EditNhjbxxModal'
  import PyxxglModal from './modules/PyxxglModal'
  import NhjbxxxXqModal from './modules/NhjbxxxXqModal'
  import Print from './modules/Print'
  import PrintYX from './modules/PrintYX'
  import NhpjsxspbPrint from './modules/NhpjsxspbPrint'
  import JInput from '../../../components/jeecg/JInput'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { getAction,putAction,httpAction,downFile } from '@/api/manage'
  import { mapGetters } from 'vuex'
  import store from '@/store/'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import moment from 'moment'
  import { filterObj } from '../../../utils/util'
  import JEllipsis from '../../../components/jeecg/JEllipsis'

  export default {
    name: "NhjbxxList",
    mixins:[JeecgListMixin],
    components: {
      JEllipsis,
      NhjbxxModal,
      PyxxglModal,Print,PrintYX,
      JInput,JTreeSelect,NhjbxxxXqModal,NhpjsxspbPrint,EditNhjbxxModal
    },
    data () {
      return {
        description: '农户管理页面',
        isAll: false,
        sszh:'',
        sfktsjyxdy: 1,
        sfjsejyxdy: true,
        sfjssjyxdy: true,
        sjyxdybhdate:'',
        ejyxdybh: "YXDYGL_EJYXDYGL,DYMC,DYBH",
        sjyxdybh: "YXDYGL_SJYXDYGL,DYMC,DYBH",
        qybm: '',
        columns: [
          {
            title: '所属支行',
            align: "center",
            dataIndex: 'sszh_dictText',
            width: 150
          },
          {
            title: '所属乡镇',
            align:"center",
            dataIndex: 'ssxz_dictText',
            width: 150
          },
          {
            title: '行政村',
            align:"center",
            dataIndex: 'xzc_dictText',
            width: 150
          },
          {
            title: '行政组',
            align:"center",
            dataIndex: 'xzz_dictText',
            width: 150
          },
          /*{
            title: '所属客户经理',
            align:"center",
            dataIndex: 'sskhjl_dictText',
            width: 150
          },*/
          {
            title: '户号编码',
            align:"center",
            dataIndex: 'hhbm',
            sorter: true,
            width: 150
          },
          {
            title: '与户主关系',
            align: "center",
            dataIndex: 'yhzgx_dictText',
            scopedSlots: { customRender: 'yhzgx' },
            width: 150,
          },
          {
            title: '是否户主',
            align: "center",
            dataIndex: 'sfhz_dictText',
            width: 80,
          },
          {
            title: '客户名称',
            align:"center",
            dataIndex: 'khmc',
            scopedSlots: { customRender: 'detail' },
            width: 100
          },
          {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm',
            width: 160
          },
          {
            title: '年龄',
            align:"center",
            dataIndex: 'nl',
            sorter: true,
            width: 80
          },
          {
            title: '性别',
            align:"center",
            dataIndex: 'xb_dictText',
            width: 80
          },
          /*{
            title: '手机号码',
            align:"center",
            dataIndex: 'lxfs',
            width: 120
          },*/
          {
            title: '地址',
            align:"center",
            dataIndex: 'dz',
            scopedSlots: { customRender: 'dz' },
            width: 150
          },
          {
            title: '是否采集',
            align:"center",
            dataIndex: 'sfcj_dictText',
            width: 80
          },
          {
            title: '采集时间',
            align:"center",
            dataIndex: 'cjsj',
            width: 100
          },
          {
            title: '原所属乡镇',
            align: "center",
            dataIndex: 'yssxz',
            scopedSlots: { customRender: 'yssxz' },
            width: 120,
          },
          {
            title: '原所属村名称',
            align:"center",
            dataIndex: 'yxzc',
            width: 150
          },
          /*{
            title: '住址',
            align:"center",
            dataIndex: 'zz',
            width: 200
          },*/
          {
            title: '备注',
            align:"center",
            dataIndex: 'bz',
            width: 100
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
            fixed: "right",
            width: 150
          }
        ],
        isorter: {
          column: '',
          order: 'desc',
        },
        url: {
          list: "/nh/nhjbxx/list",
          delete: "/nh/nhjbxx/delete",
          deleteBatch: "/nh/nhjbxx/deleteBatch",
          exportXlsUrl: "nh/nhjbxx/exportXls",
          importExcelUrl: "nh/nhjbxx/importExcel",
          nhmxexportXlsUrl:"nh/nhjbxx/nhmxexportTemplateXls",
          xydjpdbExportXlsUrl: "nh/nhjbxx/xydjpdbExportXlsUrl",
        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    created(){
      this.querycsz()
      this.isAll = store.getters.isRoot
      this.sszh = store.getters.userInfo.orgCode
      this.qybm = store.getters.qybm
      if (this.qybm == '350') {
        this.url.exportXlsUrl = "nh/nhjbxx/exportCjxxXls"
      }
    },
    methods: {
      ...mapGetters(["nickname", "avatar","userInfo"]),
      initQueryParams() {
        if(!store.getters.isRoot) {
          this.queryParam.sszh = store.getters.userInfo.orgCode
          console.log(this.queryParam.sszh)
        }
        this.paramsInited = true
      },
      searchReset: function() {
        this.queryParam = {}
        if(!store.getters.isRoot) {
          this.queryParam.sszh = store.getters.userInfo.orgCode
        }
        this.sfjsejyxdy=true;
        this.sfjssjyxdy=true;
        this.sjyxdybhdate='';
        this.loadData(1);
      },
      /**
       * 编辑评议信息
       * @param record
       */
      handlePyxxEdit: function(record) {
        this.$refs.pyxxglModalForm.edit(record);
        this.$refs.pyxxglModalForm.title = "评议信息";
        this.$refs.pyxxglModalForm.disableSubmit = true;
      },
      handleEdit:function(record){
        if(record.hhbm) {
          getAction("/nh/nhjbxx/queryHzxxByHhbm",{ hhbm: record.hhbm}).then((res) => {
            if (res.success) {
              this.$refs.EditModalForm.edit(res.result);
              this.$refs.EditModalForm.title = "编辑";
              this.$refs.EditModalForm.disableSubmit = false;
              console.log("---家庭相关情况-----")
              console.log('dataSource_jtcy', res)
            }
          });
        };
      },
      exportXydjpdb() {
        console.log('exportXydjpdb', this.queryParam)
        if (!this.queryParam.sszh || this.queryParam.sszh == 'undefined') {
          this.$message.warning("请选择所属支行")
          return false
        }
        if (!this.queryParam.xzc || this.queryParam.xzc == 'undefined') {
          this.$message.warning("请选择行政村")
          return false
        }
        let fileName = '农户信用等级评定表'
        downFile(this.url.xydjpdbExportXlsUrl, this.queryParam).then((data)=>{
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
      },
      /**
       * 提取
       */
      initData() {
        this.loading=true;
        putAction("/nh/nhjbxx/extract").then((res) => {
          if (res.success) {
            alert("提取成功")
          } else {
            alert("提取失败")
          }
        })
        this.loading=false;
      },

      handlepjsxjdmxEdit: function(record) {
        this.$refs.NhjbxxxXqModal.edit(record);
        this.$refs.NhjbxxxXqModal.title = "详情";
        this.$refs.NhjbxxxXqModal.disableSubmit = true;
      },

      handlePrint: function(record) {
        this.$refs.Print.edit(record);
      },

      // 农户评级授信审批表
      handlepjsxspbPrint:function(record){
        this.$refs.pjsxPrint.edit(record);
        this.$refs.pjsxPrint.getBankName();
      },

      getQueryParams(){
        let tjrqment = "";
        if(this.queryParam.cjsj != null) {
          tjrqment = this.queryParam.cjsj.format("YYYY-MM-DD");
        }
        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        param.cjsj     = tjrqment;
        return filterObj(param);
      },

      handlemxExportXls(fileName,record){
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        console.log("---------")
        console.log(record)
        let param = {"zjhm":record.zjhm,"sszh":record.sszh,"hhbm":record.hhbm};
        console.log("导出参数",param)
        downFile(this.url.nhmxexportXlsUrl,param).then((data)=>{
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
      },
      //查询是否显示三级营销单元字段1：是 2：否
      querycsz(){
        let params = { "csbm":"CS0004"}
        putAction("/yxdygl/yxdyglPqzrrgl/querycsz", params).then(res => {
          console.log("---------")
          if(res.result.csz==2){
            this.columns.splice(4,1)
          }
          this.sfktsjyxdy =res.result.csz
        });
      },

      getyjyxdybh(value) {
        if (value) {
            this.sfjsejyxdy=false,
            this.sfjssjyxdy=true,
            this.queryParam.ssxz = value
          let yjyxdybh = value
          this.ejyxdybh = "YXDYGL_EJYXDYGL,DYMC,DYBH,YJYXDYBH = " + yjyxdybh;
          console.log(this.ejyxdybh)
        }
      },
      getejyxdybh(value){
        if(value) {
          this.sfjssjyxdy=false,
          this.queryParam.xzc = value
          let ejyxdybh = value
          this.sjyxdybh = "YXDYGL_SJYXDYGL,DYMC,DYBH,EJYXDYBH = "+ejyxdybh;
          console.log("-----------------------")
          console.log(this.sjyxdybh)
        }
      },
      getsjyxdybh(value){
        this.sjyxdybhdate="",
        this.queryParam.xzz = value
        this.sjyxdybhdate = value
      }

    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>