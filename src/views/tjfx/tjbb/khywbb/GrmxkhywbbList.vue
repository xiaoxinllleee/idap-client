<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8">
            <a-form-item label="数据日期">
              <a-date-picker v-model="queryParam.tjyf" placeholder="请选择数据日期"   style="width: 100%;"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="所属支行">
              <j-tree-select placeholder="请选择所属支行查询"
                             pid-field="sjzzbz"
                             :showSearch="true"
                             treeNodeFilterProp="title"
                             v-model="queryParam.sszh"
                             :sszh="true"
                             dict="hr_bas_organization, zzjc, zzbz"
                             :tree-default-expand-all="true"/>
            </a-form-item>
          </a-col>

        <template v-if="toggleSearchStatus">
          <a-col :md="6" :sm="8">
            <a-form-item label="乡镇">
              <a-input placeholder="请输入乡镇" v-model="queryParam.xz"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
          <a-form-item label="村/社">
            <a-input placeholder="请输入村/社" v-model="queryParam.xzc"></a-input>
          </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="客户经理">
              <a-input placeholder="请输入客户经理" v-model="queryParam.zkhjl"></a-input>
            </a-form-item>
          </a-col>

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
      <a-button type="primary" icon="download" @click="handleExportXls('客户业务报表(明细)')">导出</a-button>
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
        :scroll="{ x: 3500 }"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <grmxkhywbb-modal ref="modalForm" @ok="modalFormOk"></grmxkhywbb-modal>
  </a-card>
</template>

<script>
  import GrmxkhywbbModal from './modules/GrmxkhywbbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { filterObj } from '@/utils/util';
  import { getAction,putAction,httpAction,downFile } from '@/api/manage'
  import moment from 'moment'

  export default {
    name: "GrmxkhywbbList",
    mixins:[JeecgListMixin],
    components: {
      GrmxkhywbbModal,JTreeSelect
    },
    data () {
      return {
        description: '客户业务报表(明细)管理页面',
        // 表头
        columns: [
          {
            title: '统计月份',
            align:"center",
            dataIndex: 'tjyf'
          },
          {
            title: '所属支行',
            align:"center",
            dataIndex: 'sszh'
          },
          {
            title: '乡镇',
            align:"center",
            dataIndex: 'xz'
          },
          {
            title: '村',
            align:"center",
            dataIndex: 'xzc'
          },
          {
            title: '客户类型',
            align:"center",
            dataIndex: 'khlx_dictText'
          },
          {
            title: '户号编码',
            align:"center",
            dataIndex: 'hhbm'
          },
          {
            title: '客户名称',
            align:"center",
            dataIndex: 'khmc'
          },
          {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm'
          },
          {
            title: '是否户主',
            align:"center",
            dataIndex: 'sfhz_dictText  '
          },
          {
            title: '客户经理',
            align:"center",
            dataIndex: 'zkhjl'
          },
		   {
            title: '是否办理扫码付',
            align:"center",
            dataIndex: 'sfblsmf'
           },
		   {
            title: '是否办理社保卡',
            align:"center",
            dataIndex: 'sfblsbk'
           },
		   {
            title: '是否办理信用卡',
            align:"center",
            dataIndex: 'sfblxyk'
           },
		   {
            title: '是否办理福民卡',
            align:"center",
            dataIndex: 'sfblfmk'
           },
		   {
            title: '存款余额',
            align:"center",
            dataIndex: 'ckye'
           },
		   {
            title: '活期存款余额',
            align:"center",
            dataIndex: 'hqckye'
           },
		   {
            title: '定期存款余额',
            align:"center",
            dataIndex: 'dqckye'
           },
		   {
            title: '贷款余额',
            align:"center",
            dataIndex: 'dkye'
           },
		   {
            title: '贷款金额',
            align:"center",
            dataIndex: 'dkje'
           },
		   {
            title: '表内不良贷款',
            align:"center",
            dataIndex: 'blbldk'
           },
		   {
            title: '表外不良贷款',
            align:"center",
            dataIndex: 'bwbldk'
           },

		   {
            title: '是否办理贷款',
            align:"center",
            dataIndex: 'sfbldk'
           },
		   {
            title: '是否办理存款',
            align:"center",
            dataIndex: 'sfblck'
           },
		   {
            title: '是否办理网上银行',
            align:"center",
            dataIndex: 'sfblwsyh'
           },
		   {
            title: '是否办理手机银行',
            align:"center",
            dataIndex: 'sfblsjyh'
           },
		   {
            title: '是否办理ETC',
            align:"center",
            dataIndex: 'sfbletc'
           },
		   {
            title: '是否办理E支付',
            align:"center",
            dataIndex: 'sfblezf'
           },
		   {
            title: '是否办理E缴费',
            align:"center",
            dataIndex: 'sfblejf'
           },
		   {
            title: '是否办理POS机',
            align:"center",
            dataIndex: 'sfblpos'
           },
		   {
            title: '是否办理助农终端',
            align:"center",
            dataIndex: 'sfblznzd'
           },
		   {
            title: '是否办理理财业务',
            align:"center",
            dataIndex: 'sfbllcyw'
           },
		   {
            title: '是否办理保险业务',
            align:"center",
            dataIndex: 'sfblbxyw'
           },
		   {
            title: '是否关注我行公众号',
            align:"center",
            dataIndex: 'sfgzwhgzh'
           },

        ],
		url: {
          list: "/tjfx.tjbb.khywbb/grmxkhywbb/list",
          delete: "/tjfx.tjbb.khywbb/grmxkhywbb/delete",
          deleteBatch: "/tjfx.tjbb.khywbb/grmxkhywbb/deleteBatch",
          exportXlsUrl: "tjfx.tjbb.khywbb/grmxkhywbb/exportXls",
          importExcelUrl: "tjfx.tjbb.khywbb/grmxkhywbb/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
   },

  methods: {
    moment,
    getQueryParams(){
      let tjrqment = "";
      let sszhvalue=this.$route.query.sszh;
      let tjyfvalue=this.$route.query.tjyf;
      let zkhjlvalue=this.$route.query.zkhjl;
      let xzclvalue=this.$route.query.xzc;

      var param      = Object.assign({}, this.queryParam,this.isorter);
      param.field    = this.getQueryField();
      param.pageNo   = this.ipagination.current;
      param.pageSize = this.ipagination.pageSize;
      if(this.queryParam.tjyf) {
        tjrqment = this.queryParam.tjyf.format("YYYY-MM-DD");
      }
      console.log(tjrqment)
      console.log(tjyfvalue)
      if(tjyfvalue){
        tjrqment=tjyfvalue;
      }
      console.log(tjrqment)
      param.tjyf     = tjrqment;

      if(sszhvalue){
        param.sszh = sszhvalue;
      }
      if(zkhjlvalue){
        param.zkhjl = zkhjlvalue;
      }
      if(xzclvalue){
        param.xzc = xzclvalue;
      }

      return filterObj(param);
  },
    searchReset() {
      this.flag = false;
      this.$route.query.sszh=null;
      this.$route.query.tjyf=null;
      this.$route.query.zkhjl=null;
      this.$route.query.xzc=null;
      this.queryParam = {};
      this.loadData(1);
    },

    handleExportXls(fileName){
      if(!fileName || typeof fileName != "string"){
        fileName = "导出文件"
      }
      let param = {...this.queryParam};
      if(this.selectedRowKeys && this.selectedRowKeys.length>0){
        param['selections'] = this.selectedRowKeys.join(",")
      }
      if (param.tjyf != null){
        param.tjyf=param.tjyf.format("YYYY-MM")+'-01'}
      console.log("导出参数",param)
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
      })
    },



   }
}
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>