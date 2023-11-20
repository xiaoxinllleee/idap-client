<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24"><a-form-item label="机构代码">
            <j-tree-select placeholder="请选择机构代码"
                           v-model="queryParam.org"
                           treeNodeFilterProp="title"
                           pid-field="sjywjgdm"
                           dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                           :showSearch="true"
                           :treeDefaultExpandAll="true"/>


          </a-form-item></a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户名称">
              <j-input placeholder="请输入客户名称" v-model="queryParam.custName"></j-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款账号">
              <a-input placeholder="请输入贷款账号" v-model="queryParam.acctNo"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户经理标识">
              <a-input placeholder="请输入客户经理标识" v-model="queryParam.custManagerId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款发放日期">
              <a-range-picker @change="onPutBeginday" v-model="queryParam.putOutDate" :default-value="[undefined, moment(new Date(), 'YYYY/MM/DD')]"  />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款到期日期">
              <a-range-picker @change="onMatBeginday" v-model="queryParam.maturity" :default-value="[undefined, moment(new Date(), 'YYYY/MM/DD')]"  />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款余额">
              <a-input-number placeholder="Minimum" v-model="queryParam.balance_begin"
                              style="width: 40%; text-align: center" :min="0" />
              <a-input placeholder="~"
                       style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                       disabled />
              <a-input-number placeholder="Maximum" v-model="queryParam.balance_end"
                              style="width: 40%; text-align: center; border-left: 0" :min="0" />
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
      <a-button :loading="exportLoading" icon="download" @click="handleExportXls('贷款账号转移')" v-has="'dkzhzy:exportXls'">导出</a-button>
<!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>-->
      <a-button icon="import" @click="excelImport" v-has="'dkzhzy:import'">导入</a-button>
      <a-button icon="search" @click="init" v-has="'dkzhzy:init'">转移</a-button>
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
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">

                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)" v-has="'dkzhzy:delete'">
                  <a>删除</a>
                </a-popconfirm>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <dkzhzy-modal ref="modalForm" @ok="modalFormOk"></dkzhzy-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
  import DkzhzyModal from './modules/DkzhzyModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JInput from "@/components/jeecg/JInput"
  import {putAction,deleteAction,downFile} from "@/api/manage";
  import {filterObj} from "../../../../utils/util";
  import ExcelImport from '@/components/common/ExcelImport'
  import moment from 'moment'
  import store from '@/store/'

  export default {
    name: "DkzhzyList",
    mixins:[JeecgListMixin],
    components: {
      DkzhzyModal,JTreeSelect,ExcelImport,JInput
    },
    data () {
      return {
        description: '贷款账号转移管理页面',
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
            title: '机构代码',
            align:"center",
            dataIndex: 'org'
          },
          {
            title: '机构名称',
            align:"center",
            dataIndex: 'org_dictText'
          },
          {
            title: '客户经理标识',
            align:"center",
            dataIndex: 'custManagerId'
          },
          {
            title: '员工工号',
            align:"center",
            dataIndex: 'jobnumber'
          },
          {
            title: '姓名',
            align:"center",
            dataIndex: 'jobnumber_dictText'
          },
          {
            title: '贷款账号',
            align:"center",
            dataIndex: 'acctNo'
          },
          {
            title: '客户名称',
            align:"center",
            dataIndex: 'custName'
          },
          {
            title: '证件号码',
            align:"center",
            dataIndex: 'ctfcCd'
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
            title: '操作员',
            align:"center",
            dataIndex: 'czy'
          },
          {
            title: '操作时间',
            align:"center",
            dataIndex: 'czsj'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/dkzhzy/dkzhzy/list",
          delete: "/dkzhzy/dkzhzy/delete",
          deleteBatch: "/dkzhzy/dkzhzy/deleteBatch",
          exportXlsUrl: "dkzhzy/dkzhzy/exportXls",
          importExcelUrl: "dkzhzy/dkzhzy/importExcel",
          init: "/dkzhzy/dkzhzy/init",
          exportTemplateUrl: "/dkzhzy/dkzhzy/exportTemplateXls",
    },
        exportTemplateName: '贷款账号转移导入模板'
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
      init() {
        if (this.queryParam.org == null || this.queryParam.org == undefined){
          this.$message.warning("请选择机构代码！")
          return
        }
        if ((this.queryParam.custManagerId == null || this.queryParam.custManagerId == undefined)&&(this.queryParam.acctNo == null || this.queryParam.acctNo == undefined)) {
          this.$message.warning("请填写客户经理标识或者贷款账号！")
          return
        }
        this.loading = true
        putAction(this.url.init, this.queryParam, 'put').then((res) => {
          if (res.success) {
            this.loading = false
            console.log(res.result)
            if(res.result){
              this.$refs.modalForm.edit(res.result);
              this.$refs.modalForm.title = "转移";
              this.$refs.modalForm.disableSubmit = false;
            }else{
              this.$message.warning(res.message,5);
            }
          } else {
            this.loading = false
            this.$message.warning(res.message,5);
          }
          this.loading = false
        })
      },

      onPutBeginday: function(value, dateString){
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
      searchReset() {
        this.queryParam={org:''};
        if(!store.getters.isRoot) {
          console.log(store.getters.ywjgdm)
          this.queryParam.org = store.getters.ywjgdm
        }
        this.loadData()
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