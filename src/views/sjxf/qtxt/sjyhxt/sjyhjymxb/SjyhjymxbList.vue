<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="开户机构">
             <!-- <a-input placeholder="请输入开户机构" v-model="queryParam.opennode"></a-input>-->
              <j-tree-select placeholder="全部"
                             v-model="queryParam.opennode"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="开户类型">
              <a-input placeholder="请输入开户类型" v-model="queryParam.opentype"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="开销户状态">
              <a-input placeholder="请输入开销户状态" v-model="queryParam.accStat"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.no"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户姓名">
              <a-input placeholder="请输入客户姓名" v-model="queryParam.namecn"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户姓名1">
              <a-input placeholder="请输入客户姓名1" v-model="queryParam.name"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="开户日期">
              <a-range-picker @change="onChangekhrq" v-model="queryParam.openDt" :format="dateFormat"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="销户日期">
              <a-range-picker @change="onChangexhrq" v-model="queryParam.closeDt" :format="dateFormat2"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="本月交易金额">
             <!-- <a-input placeholder="请输入本月交易金额" v-model="queryParam.tranamtMm"></a-input>-->
              <a-input-number placeholder="Minimum" v-model="queryParam.tranamtMm_begin"
                              style="width: 40%; text-align: center" :min="0" />
              <a-input placeholder="~"
                       style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                       disabled />
              <a-input-number placeholder="Maximum" v-model="queryParam.tranamtMm_end"
                              style="width: 40%; text-align: center; border-left: 0" :min="0" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="本月交易笔数">
             <!-- <a-input placeholder="请输入本月交易笔数" v-model="queryParam.trannoMm"></a-input>-->
              <a-input-number placeholder="Minimum" v-model="queryParam.trannoMm_begin"
                              style="width: 40%; text-align: center" :min="0" />
              <a-input placeholder="~"
                       style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                       disabled />
              <a-input-number placeholder="Maximum" v-model="queryParam.trannoMm_end"
                              style="width: 40%; text-align: center; border-left: 0" :min="0" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="本年交易金额">
            <!--  <a-input placeholder="请输入本年交易金额" v-model="queryParam.tranamtYy"></a-input>-->
              <a-input-number placeholder="Minimum" v-model="queryParam.tranamtYy_begin"
                              style="width: 40%; text-align: center" :min="0" />
              <a-input placeholder="~"
                       style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                       disabled />
              <a-input-number placeholder="Maximum" v-model="queryParam.tranamtYy_end"
                              style="width: 40%; text-align: center; border-left: 0" :min="0" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="本年交易笔数">
            <!--  <a-input placeholder="请输入本年交易笔数" v-model="queryParam.trannoYy"></a-input>-->
              <a-input-number placeholder="Minimum" v-model="queryParam.trannoYy_begin"
                              style="width: 40%; text-align: center" :min="0" />
              <a-input placeholder="~"
                       style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                       disabled />
              <a-input-number placeholder="Maximum" v-model="queryParam.trannoYy_end"
                              style="width: 40%; text-align: center; border-left: 0" :min="0" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="上线以来交易金额">
            <!--  <a-input placeholder="请输入上线以来交易金额" v-model="queryParam.tranamt"></a-input>-->
              <a-input-number placeholder="Minimum" v-model="queryParam.tranamt_begin"
                              style="width: 40%; text-align: center" :min="0" />
              <a-input placeholder="~"
                       style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                       disabled />
              <a-input-number placeholder="Maximum" v-model="queryParam.tranamt_end"
                              style="width: 40%; text-align: center; border-left: 0" :min="0" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="上线以来交易笔数">
            <!--  <a-input placeholder="请输入上线以来交易笔数" v-model="queryParam.tranno"></a-input>-->
              <a-input-number placeholder="Minimum" v-model="queryParam.tranno_begin"
                              style="width: 40%; text-align: center" :min="0" />
              <a-input placeholder="~"
                       style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                       disabled />
              <a-input-number placeholder="Maximum" v-model="queryParam.tranno_end"
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('手机银行交易明细表')">导出</a-button>
    </div>

    <!-- table区域-begin -->
    <div>


      <a-table
        ref="table"
        size="middle"
        bordered
        :rowKey="rowKey"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{x:2450}"
        @change="handleTableChange">



      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <sjyhjymxb-modal ref="modalForm" @ok="modalFormOk"></sjyhjymxb-modal>
  </a-card>
</template>




<script>
  import SjyhjymxbModal from './modules/SjyhjymxbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '../../../../../components/jeecg/JTreeSelect'
  import {filterObj} from '@/utils/util'

  export default {
    name: "SjyhjymxbList",
    mixins:[JeecgListMixin],
    components: {
      SjyhjymxbModal,JTreeSelect
    },
    data () {
      return {
        description: '手机银行交易明细表管理页面',
        // 表头
        dateFormat:'YYYY-MM-DD',
        dateFormat2:'YYYY-MM-DD',
        columns: [
          {
            title: '',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
           },
		   {
            title: '开户机构',
            align:"center",
            dataIndex: 'opennode_dictText'
           },
		   {
            title: '开户机构名称',
            align:"center",
            dataIndex: 'orgName'
           },
		   {
            title: '开户类型',
            align:"center",
            dataIndex: 'opentype'
           },
		   {
            title: '开销户状态',
            align:"center",
            dataIndex: 'accStat'
           },
          {
            title: '证件类型',
            align:"center",
            dataIndex: 'type'
           },
          {
            title: '证件号码',
            align:"center",
            dataIndex: 'no'
           },
		   {
            title: '客户姓名',
            align:"center",
            dataIndex: 'namecn'
           },
		   {
            title: '手机号',
            align:"center",
            dataIndex: 'mobile'
           },
		   {
            title: '客户姓名1',
            align:"center",
            dataIndex: 'name'
           },
          {
            title: '手机号1',
            align:"center",
            dataIndex: 'dhhm'
           },
		   {
            title: '开户日期',
            align:"center",
            dataIndex: 'openDt'
           },
		   {
            title: '销户日期',
            align:"center",
            dataIndex: 'closeDt'
           },

		   {
            title: '本月交易金额',
            align:"center",
            dataIndex: 'tranamtMm'
           },
		   {
            title: '本月交易笔数',
            align:"center",
            dataIndex: 'trannoMm'
           },
		   {
            title: '本年交易金额',
            align:"center",
            dataIndex: 'tranamtYy'
           },
		   {
            title: '本年交易笔数',
            align:"center",
            dataIndex: 'trannoYy'
           },
		   {
            title: '上线以来交易金额',
            align:"center",
            dataIndex: 'tranamt'
           },
		   {
            title: '上线以来交易笔数',
            align:"center",
            dataIndex: 'tranno'
           },
		 /*  {
            title: 'legalNo',
            align:"center",
            dataIndex: 'legalNo'
           },
		   {
            title: 'dtnum',
            align:"center",
            dataIndex: 'dtnum'
           },
		   {
            title: 'name',
            align:"center",
            dataIndex: 'name'
           },
		   {
            title: 'dhhm',
            align:"center",
            dataIndex: 'dhhm'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/sjyhjymxb/sjyhjymxb/list",
          delete: "/sjyhjymxb/sjyhjymxb/delete",
          deleteBatch: "/sjyhjymxb/sjyhjymxb/deleteBatch",
          exportXlsUrl: "sjyhjymxb/sjyhjymxb/exportXls",
          importExcelUrl: "sjyhjymxb/sjyhjymxb/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      getQueryParams() {
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        delete param.openDt;
        delete param.closeDt;
        return filterObj(param);
      },
      onChangekhrq(value,dateString){
        let openDtString = dateString
        this.queryParam.openDt_begin = openDtString[0]
        this.queryParam.openDt_end = openDtString[1]
      },
      onChangexhrq(value,dateString){
        let closeDtDtString = dateString
        this.queryParam.closeDt_begin = closeDtDtString[0]
        this.queryParam.closeDt_end = closeDtDtString[1]
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>