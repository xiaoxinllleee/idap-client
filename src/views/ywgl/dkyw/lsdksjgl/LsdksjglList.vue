<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24"><a-form-item label="机构代码">
            <j-tree-select placeholder="请选择机构代码" v-model="queryParam.org" dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                           pid-field="sjywjgdm" treeNodeFilterProp="title"
                           :showSearch="true" :tree-default-expand-all="true"/>
          </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款账号">
              <a-input placeholder="请输入贷款账号" v-model="queryParam.acctNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户经理标识">
              <a-input placeholder="请输入客户经理标识" v-model="queryParam.custManagerId"></a-input>
              <!--<j-dict-select-tag placeholder="请输入客户经理姓名" v-model="queryParam.custManagerId" dict-code="HR_BAS_STAFF,YGXM||KHJLBH,KHJLBH,KHJLBH IS NOT NULL" :show-search="true"/>-->
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款发放日期">
              <a-range-picker @change="onChangeBeginday" v-model="queryParam.putOutDate"  :default-value="[undefined, moment(new Date(), 'YYYY/MM/DD')]" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款到期日期">
              <a-range-picker @change="onMatBeginday" v-model="queryParam.maturity" :default-value="[undefined, moment(new Date(), 'YYYY/MM/DD')]"  />
            </a-form-item>
          </a-col>

          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'lsdksjgl:add'">新增</a-button>
      <a-button :loading="exportLoading" icon="download" @click="handleExportXls('历史贷款数据管理')" v-has="'lsdksjgl:exportXls'">导出</a-button>
      <!--<a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>-->
      <a-button icon="import" @click="excelImport" v-has="'lsdksjgl:import'">导入</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>


      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{x:2800}"
        @change="handleTableChange">

        <span slot="finInsName" slot-scope="text"><j-ellipsis :value="text" :length="8"></j-ellipsis></span>
        <span slot="acctNo" slot-scope="text"><j-ellipsis :value="text" :length="18"></j-ellipsis></span>
        <span slot="ctfcCd" slot-scope="text"><j-ellipsis :value="text" :length="18"></j-ellipsis></span>

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'lsdksjgl:edit'">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link" v-has="'lsdksjgl:more'">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a @click="handleView(record)" v-has="'lsdksjgl:view'">详情</a>
              </a-menu-item>
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)" v-has="'lsdksjgl:delete'">
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
    <lsdksjgl-modal ref="modalForm" @ok="modalFormOk"></lsdksjgl-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
  import LsdksjglModal from './modules/LsdksjglModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JEllipsis from "@/components/jeecg/JEllipsis";
  import {deleteAction, downFile} from "@/api/manage";
  import {filterObj} from "@/utils/util";
  import ExcelImport from '@/components/common/ExcelImport'
  import moment from 'moment'
  import store from '@/store/'


  export default {
    name: "LsdksjglList",
    mixins:[JeecgListMixin],
    components: {
      LsdksjglModal,JTreeSelect,ExcelImport,JEllipsis
    },
    data () {
      return {
        description: '历史贷款数据管理管理页面',
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
            title: '客户经理标识',
            align:"center",
            dataIndex: 'custManagerId'
          },
          {
            title: '客户经理姓名',
            align:"center",
            dataIndex: 'custManagerId_dictText'
          },
          {
            title: '机构代码',
            align:"center",
            dataIndex: 'org'
          },
          {

            title: '机构名称',
            align:"center",
            dataIndex: 'finInsName',
            scopedSlots: {customRender: 'finInsName'}
          },
          /*{
            title: '机构代码',
            align:"center",
            dataIndex: 'finInsName'
          },
          {
            title: '机构名称',
            align:"center",
            dataIndex: 'finInsName_dictText'
          },*/
          {
            title: '贷款账号',
            align:"center",
            dataIndex: 'acctNo',
            scopedSlots: {customRender: 'acctNo'},
            width: 180
          },
          {
            title: '客户名称',
            align:"center",
            dataIndex: 'custName'
          },
          {
            title: '证件号码',
            align:"center",
            dataIndex: 'ctfcCd',
            scopedSlots: {customRender: 'ctfcCd'},
            width: 180
          },
          {
            title: '记账科目',
            align:"center",
            dataIndex: 'jzkm'
          },
          {
            title: '贷款发放日期',
            align:"center",
            dataIndex: 'putOutDate'
          },
          {
            title: '贷款到期日期',
            align:"center",
            dataIndex: 'maturity'
          },
          {
            title: '最早欠息日期',
            align:"center",
            dataIndex: 'qxDate'
          },
          {
            title: '贷款发放金额',
            align:"center",
            dataIndex: 'putoutSum'
          },
          {
            title: '贷款余额',
            align:"center",
            dataIndex: 'balance'
          },
          {
            title: '录入标识',
            align:"center",
            dataIndex: 'lrbz_dictText',
            width: 100
          },
          {
            title: '录入人',
            align:"center",
            dataIndex: 'lrczy',
            width: 100
          },
          {
            title: '录入时间',
            align:"center",
            dataIndex: 'lrsj',
            width: 100
          },
          {
            title: '修改人',
            align:"center",
            dataIndex: 'xgczy',
            width: 100
          },
          {
            title: '修改时间',
            align:"center",
            dataIndex: 'xgsj',
            width: 100
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
            fixed: 'right',
          }
        ],
		url: {
          list: "/lsdksjgl/lsdksjgl/list",
          delete: "/lsdksjgl/lsdksjgl/delete",
          deleteBatch: "/lsdksjgl/lsdksjgl/deleteBatch",
          exportXlsUrl: "lsdksjgl/lsdksjgl/exportXls",
          importExcelUrl: "lsdksjgl/lsdksjgl/importExcel",
          exportTemplateUrl: "/lsdksjgl/lsdksjgl/exportTemplateXls",
       },
        exportTemplateName: '历史贷款数据管理管理导入模板'
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    created () {
      this.queryParam.putOutDate_end = moment(new Date()).format('YYYY-MM-DD');
      this.queryParam.maturity_end = moment(new Date()).format('YYYY-MM-DD');
    },
    methods: {
      moment,
      onChangeBeginday: function(value, dateString) {
        let dkffString = dateString
        this.queryParam.putOutDate_begin = dkffString[0]
        this.queryParam.putOutDate_end = dkffString[1]
      },

      onMatBeginday: function(value, dateString){
        let dkdqString = dateString
        this.queryParam.maturity_begin = dkdqString[0]
        this.queryParam.maturity_end = dkdqString[1]
      },


      getQueryParams(){
        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        delete param.putOutDate;
        delete param.maturity;
        return filterObj(param);
      },
      searchReset() {
        this.queryParam={};
        if(!store.getters.isRoot) {
          this.queryParam.org = store.getters.ywjgdm
        }
        this.loadData(1)
      },
      handleDelete: function (record) {
        console.log(record)
        if(!this.url.delete){
          this.$message.error("请设置url.delete属性!")
          return
        }
        var that = this;
        deleteAction(that.url.delete, {acctNo: record.acctNo}).then((res) => {
          if (res.success) {
            that.$message.success(res.message);
            that.loadData();
          } else {
            that.$message.warning(res.message);
          }
        });
      },
      handleView: function (record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "评定数据详情";
        this.$refs.modalForm.disableSubmit = true;
      },
      handleExportXls(fileName){
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        let param = this.getQueryParams()
        if(this.selectedRowKeys && this.selectedRowKeys.length>0){
          param['selections'] = this.selectedRowKeys.join(",")
        }
        let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()));
        param.paramsStr = paramsStr
        console.log("导出参数",param)
        this.exportLoading=true
        downFile(this.url.exportXlsUrl,param).then((data)=>{
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
        }).finally(()=>{
          this.exportLoading=false
          this.loadData(1)
        })
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>