<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构代码">
              <j-tree-select placeholder="请选择机构代码" v-model="queryParam.org" dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             pid-field="sjywjgdm" treeNodeFilterProp="title"
                             :showSearch="true" :tree-default-expand-all="true"/>

          </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="核销日期">
              <a-range-picker @change="onChangeBeginday" v-model="queryParam.hxrq"  :default-value="[undefined, moment(new Date(), 'YYYY/MM/DD')]" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款发放日期">
              <a-range-picker @change="onputBeginday" v-model="queryParam.putOutDate"  :default-value="[undefined, moment(new Date(), 'YYYY/MM/DD')]" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款到期日期">
              <a-range-picker @change="onmatBeginday" v-model="queryParam.maturity" :default-value="[undefined, moment(new Date(), 'YYYY/MM/DD')]"  />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <!--<a-form-item label="贷款余额">
              <a-input style="width: 46%" v-model="queryParam.balanceS"></a-input>
              至
              <a-input style="width: 46%" v-model="queryParam.balanceE"></a-input>
            </a-form-item>-->
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
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款账号">
              <a-input placeholder="请输入贷款账号" v-model="queryParam.acctNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户名称">
              <j-input placeholder="请输入客户名称" v-model="queryParam.custName"></j-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="员工工号">
              <a-input placeholder="请输入员工工号" v-model="queryParam.jobnumber"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户经理标识">
              <a-input placeholder="请输入客户经理标识" v-model="queryParam.custManagerId"></a-input>
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'hxdkgl:add'">新增</a-button>
      <a-button :loading="exportLoading" icon="download" @click="handleExportXls('核销贷款管理')" v-has="'hxdkgl:exportXls'">导出</a-button>
<!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>-->
      <a-button icon="import" @click="excelImport" v-has="'hxdkgl:import'">导入</a-button>

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
        :scroll="{x:2500}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'hxdkgl:edit'">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link" v-has="'hxdkgl:more'">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)" v-has="'hxdkgl:delete'">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
              <a-menu-item>
                <a @click="handleView(record)" v-has="'hxdkgl:view'">详情</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <hxdkgl-modal ref="modalForm" @ok="modalFormOk"></hxdkgl-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
  import HxdkglModal from './modules/HxdkglModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JInput from "@/components/jeecg/JInput"
  import {deleteAction} from "@/api/manage";
  import {filterObj} from "@/utils/util";
  import {downFile} from "../../../../api/manage";
  import ExcelImport from '@/components/common/ExcelImport'
  import moment from 'moment'
  import store from '@/store/'


  export default {
    name: "HxdkglList",
    mixins:[JeecgListMixin],
    components: {
      HxdkglModal,JTreeSelect,ExcelImport,JInput
    },
    data () {
      return {
        description: '核销贷款管理管理页面',
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
            dataIndex: 'org',
            width: 100,
           },
		   {
            title: '机构名称',
            align:"center",
            dataIndex: 'org_dictText',
            width: 100,
           },
          {
            title: '员工工号',
            align:"center",
            dataIndex: 'jobnumber',
            width: 100,
          },
          {
            title: '员工姓名',
            align:"center",
            dataIndex: 'jobnumber_dictText',
            width: 100,
          },
          {
            title: '客户经理标识',
            align:"center",
            dataIndex: 'custManagerId',
            width: 120,
          },
		   {
            title: '贷款账号',
            align:"center",
            dataIndex: 'acctNo',
            width: 180
           },
          {
            title: '客户名称',
            align:"center",
            dataIndex: 'custName',
            width: 100
          },
          {
            title: '证件号码',
            align:"center",
            dataIndex: 'ctfcCd',
            width: 180
          },
          {
            title: '贷款发放日期',
            align:"center",
            dataIndex: 'putOutDate',
            width: 120
          },
          {
            title: '贷款到期日期',
            align:"center",
            dataIndex: 'maturity',
            width: 120
          },
          {
            title: '最早欠息日期',
            align: 'center',
            dataIndex: 'minCalcDate',
            width: 120
          },
          {
            title: '贷款发放金额',
            align:"center",
            dataIndex: 'putoutSum',
            width: 120
          },
          {
            title: '贷款余额',
            align:"center",
            dataIndex: 'balance',
            width: 120
          },
          {
            title: '核销日期',
            align:"center",
            dataIndex: 'hxrq',
            width: 120
          },
          {
            title: '表外贷款账号',
            align:"center",
            dataIndex: 'bwdkzh',
            width: 180
          },
          {
            title: '录入标识',
            align:"center",
            dataIndex: 'lrbz_dictText',
            width: 100
          },
          {
            title: '录入时间',
            align:"center",
            dataIndex: 'lrsj',
            width: 100
          },
          {
            title: '录入人',
            align:"center",
            dataIndex: 'lrczy',
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
            fixed: "right",
            width: 140,
            scopedSlots: { customRender: 'action' },
            fixed: 'right',
          }
        ],
		url: {
          list: "/hxdkgl/hxdkgl/list",
          delete: "/hxdkgl/hxdkgl/delete",
          deleteBatch: "/hxdkgl/hxdkgl/deleteBatch",
          exportXlsUrl: "hxdkgl/hxdkgl/exportXls",
          importExcelUrl: "hxdkgl/hxdkgl/importExcel",
          exportTemplateUrl: "/hxdkgl/hxdkgl/exportTemplateXls",
       },
        exportTemplateName: '核销贷款管理导入模板'
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    created () {
      this.queryParam.hxrq_end = moment(new Date()).format('YYYY-MM-DD');
      this.queryParam.putOutDate_end = moment(new Date()).format('YYYY-MM-DD');
      this.queryParam.maturity_end = moment(new Date()).format('YYYY-MM-DD');
    },

    methods: {
      moment,
      onChangeBeginday: function(value, dateString){
        let hxrqDateString = dateString
        this.queryParam.hxrq_begin = hxrqDateString[0]
        this.queryParam.hxrq_end = hxrqDateString[1]
      },
      onputBeginday: function(value, dateString){
        let putdayString = dateString
        this.queryParam.putOutDate_begin = putdayString[0]
        this.queryParam.putOutDate_end = putdayString[1]
      },
      onmatBeginday: function(value, dateString){
        let matdayString = dateString
        this.queryParam.maturity_begin = matdayString[0]
        this.queryParam.maturity_end = matdayString[1]
      },
      getQueryParams(){
        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        delete param.hxrq;
        delete param.putOutDate;
        delete param.maturity
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

      handleView: function (record) {
        console.log('HxdkglList => handleView: function (record)')
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "详情";
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

      searchReset() {
        this.queryParam={org:''};
        if(!store.getters.isRoot) {
          this.queryParam.org = store.getters.ywjgdm
        }
        this.loadData(1)
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>