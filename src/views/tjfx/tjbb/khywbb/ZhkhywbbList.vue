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

          <a-col :md="6" :sm="8" >
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>=
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button type="primary" icon="download" @click="handleExportXls('客户业务报表(支行)')">导出</a-button>

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
        <span slot="sszh" slot-scope="sszh ,record" >
          <a @click="handlesszhEdit(record,'/tjfx/tjbb/khywbb/CkhywbbList')">{{sszh}}</a>
        </span>


      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <zhkhywbb-modal ref="modalForm" @ok="modalFormOk"></zhkhywbb-modal>
  </a-card>
</template>

<script>
  import ZhkhywbbModal from './modules/ZhkhywbbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { filterObj } from '@/utils/util';
  import { getAction,putAction,httpAction,downFile } from '@/api/manage'
  import moment from 'moment'

  export default {
    name: "ZhkhywbbList",
    mixins:[JeecgListMixin],
    components: {
      ZhkhywbbModal,JTreeSelect
    },
    data () {
      return {
        description: '客户业务报表(支行)管理页面',
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
            dataIndex: 'sszh_dictText',
            scopedSlots:{customRender:'sszh'}

          },
		   {
            title: '办理贷款户数',
            align:"center",
            dataIndex: 'bldkhs'
           },
		   {
            title: '办理存款户数',
            align:"center",
            dataIndex: 'blckhs'
           },
		   {
            title: '办理网上银行户数',
            align:"center",
            dataIndex: 'blwsyhhs'
           },
		   {
            title: '办理手机银行户数',
            align:"center",
            dataIndex: 'blsjyhhs'
           },
		   {
            title: '办理ETC户数',
            align:"center",
            dataIndex: 'bletchs'
           },
		   {
            title: '办理E支付户数',
            align:"center",
            dataIndex: 'blezfhs'
           },
		   {
            title: '办理E缴费户数',
            align:"center",
            dataIndex: 'blejfhs'
           },
		   {
            title: '办理POS机户数',
            align:"center",
            dataIndex: 'blposhs'
           },
		   {
            title: '办理助农终端户数',
            align:"center",
            dataIndex: 'blznzdhs'
           },
		   {
            title: '办理理财业务户数',
            align:"center",
            dataIndex: 'bllcywhs'
           },
		   {
            title: '办理保险业务户数',
            align:"center",
            dataIndex: 'blbxywhs'
           },
		   {
            title: '关注我行公众号户数',
            align:"center",
            dataIndex: 'gzwhgzhhs'
           },
		   {
            title: '办理扫码付户数',
            align:"center",
            dataIndex: 'blsmfhs'
           },
		   {
            title: '办理社保卡户数',
            align:"center",
            dataIndex: 'blsbkhs'
           },
		   {
            title: '办理信用卡户数',
            align:"center",
            dataIndex: 'blxykhs'
           },
		   {
            title: '办理福民卡户数',
            align:"center",
            dataIndex: 'blfmkhs'
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
            title: '存款余额占比',
            align:"center",
            dataIndex: 'ckyezb'
           },
		   {
            title: '贷款余额占比',
            align:"center",
            dataIndex: 'dkyezb'
           },
          {
            title: '表内不良占比',
            align:"center",
            dataIndex: 'blbldkzb'
          },
          {
            title: '表外不良占比',
            align:"center",
            dataIndex: 'bwbldkzb'
          },

          {
            title: '表内不良户数',
            align:"center",
            dataIndex: 'bnblhs'
          },
          {
            title: '表外不良户数',
            align:"center",
            dataIndex: 'bwblhs'
          },
        ],
		url: {
          list: "/tjfx.tjbb.khywbb/zhkhywbb/list",
          delete: "/tjfx.tjbb.khywbb/zhkhywbb/delete",
          deleteBatch: "/tjfx.tjbb.khywbb/zhkhywbb/deleteBatch",
          exportXlsUrl: "tjfx.tjbb.khywbb/zhkhywbb/exportXls",
          importExcelUrl: "tjfx.tjbb.khywbb/zhkhywbb/importExcel",
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
        let tjyfvalue=this.$route.query.tjyf;
        console.log(tjyfvalue)

        if(this.queryParam.tjyf) {
          tjrqment = this.queryParam.tjyf.format("YYYY-MM-DD");
        }
        if(tjyfvalue){
          tjrqment=tjyfvalue;
        }
        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        param.tjyf     = tjrqment;
        this.$route.query.tjyf=null;
        return filterObj(param);
      },
      handlesszhEdit: function(record,path) {
        console.log(path);
        console.log(record.sszh);
        this.$router.push({path: path, query: {sszh: record.sszh,tjyf:record.tjyf}})
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