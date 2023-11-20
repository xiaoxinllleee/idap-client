<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户证件号码">
              <a-input placeholder="请输入客户证件号码" v-model="queryParam.custrNbr"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="社保卡号">
              <a-input placeholder="请输入社保卡号" v-model="queryParam.securNbr"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户分类">
              <a-input placeholder="请输入客户分类" v-model="queryParam.classCode"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="联系人1姓名">
              <a-input placeholder="请输入联系人1姓名" v-model="queryParam.conNam1"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="联系人2姓名">
              <a-input placeholder="请输入联系人2姓名" v-model="queryParam.conNam2"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="单位名称">
              <a-input placeholder="请输入单位名称" v-model="queryParam.compName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="联系人1电话号码">
              <a-input placeholder="请输入联系人1电话号码" v-model="queryParam.conTel1"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="联系人2电话号码">
              <a-input placeholder="请输入联系人2电话号码" v-model="queryParam.conTel2"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('客户资料表')">导出</a-button>
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
        :scroll="{x:12450}"
        @change="handleTableChange">



      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <khzlb-modal ref="modalForm" @ok="modalFormOk"></khzlb-modal>
  </a-card>
</template>

<script>
  import KhzlbModal from './modules/KhzlbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "KhzlbList",
    mixins:[JeecgListMixin],
    components: {
      KhzlbModal
    },
    data () {
      return {
        description: '客户资料表管理页面',
        // 表头
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
            title: '客户证件号码',
            align:"center",
            dataIndex: 'custrNbr'
           },
		   {
            title: '社保卡号',
            align:"center",
            dataIndex: 'securNbr'
           },
		   {
            title: '国籍',
            align:"center",
            dataIndex: 'nation'
           },
		   {
            title: '单位电话号码',
            align:"center",
            dataIndex: 'busiPhone'
           },
		   {
            title: '自购车辆购买时间',
            align:"center",
            dataIndex: 'carDate'
           },
		   {
            title: '自购车辆车牌号',
            align:"center",
            dataIndex: 'carId'
           },
		   {
            title: '自购车辆品牌',
            align:"center",
            dataIndex: 'carNam'
           },
		   {
            title: '自购车辆情况',
            align:"center",
            dataIndex: 'carCode'
           },
		   {
            title: '客户分类',
            align:"center",
            dataIndex: 'classCode'
           },
		   {
            title: '单位名称',
            align:"center",
            dataIndex: 'compName'
           },
		   {
            title: '联系人1姓名',
            align:"center",
            dataIndex: 'conNam1'
           },
		   {
            title: '联系人2姓名',
            align:"center",
            dataIndex: 'conNam2'
           },
		   {
            title: '联系人1电话号码',
            align:"center",
            dataIndex: 'conTel1'
           },
		   {
            title: '联系人2电话号码',
            align:"center",
            dataIndex: 'conTel2'
           },
		   {
            title: '联系人1单位名称',
            align:"center",
            dataIndex: 'contrNam1'
           },
		   {
            title: '联系人1关系',
            align:"center",
            dataIndex: 'contrNam2'
           },
		   {
            title: '联系人2单位名称',
            align:"center",
            dataIndex: 'contrNam3'
           },
		   {
            title: '联系人2关系',
            align:"center",
            dataIndex: 'contrNam4'
           },
		   {
            title: '直系亲属关系',
            align:"center",
            dataIndex: 'contrNam5'
           },
		   {
            title: '配偶单位名称',
            align:"center",
            dataIndex: 'contrTel1'
           },
		   {
            title: '配偶证件号码',
            align:"center",
            dataIndex: 'contrTel2'
           },
		   {
            title: '信用额度',
            align:"center",
            dataIndex: 'credLimit'
           },
		   {
            title: '美元帐户额度',
            align:"center",
            dataIndex: 'credlimX'
           },
		   {
            title: '出生日期',
            align:"center",
            dataIndex: 'dayBirth'
           },
		   {
            title: '抚养人数',
            align:"center",
            dataIndex: 'dependents'
           },
		   {
            title: '教育程度',
            align:"center",
            dataIndex: 'educa'
           },
		   {
            title: '电子邮件地址',
            align:"center",
            dataIndex: 'emailAddr'
           },
		   {
            title: '部门',
            align:"center",
            dataIndex: 'emplyDept'
           },
		   {
            title: '员工编号',
            align:"center",
            dataIndex: 'emplyNbr'
           },
		   {
            title: '分机',
            align:"center",
            dataIndex: 'extension'
           },
		   {
            title: '性别',
            align:"center",
            dataIndex: 'gender'
           },
		   {
            title: '住房情况',
            align:"center",
            dataIndex: 'homeCode'
           },
		   {
            title: '住宅电话号码',
            align:"center",
            dataIndex: 'homePhone'
           },
		   {
            title: '配偶税前年收入',
            align:"center",
            dataIndex: 'incomeAn2'
           },
		   {
            title: '个人税前年收入',
            align:"center",
            dataIndex: 'incomeAnn'
           },
		   {
            title: '配偶主要收入来源',
            align:"center",
            dataIndex: 'incomeSr2'
           },
		   {
            title: '个人主要收入来源',
            align:"center",
            dataIndex: 'incomeSrc'
           },
		   {
            title: '传真号码',
            align:"center",
            dataIndex: 'irdN'
           },
		   {
            title: '语言代码',
            align:"center",
            dataIndex: 'langCode'
           },
		   {
            title: '可接受广告类别',
            align:"center",
            dataIndex: 'mailCode'
           },
		   {
            title: '婚姻状况',
            align:"center",
            dataIndex: 'marStatus'
           },
		   {
            title: '手机号码',
            align:"center",
            dataIndex: 'moPhone'
           },
		   {
            title: '分期付款额度',
            align:"center",
            dataIndex: 'mpLimit'
           },
		   {
            title: '英文性名',
            align:"center",
            dataIndex: 'mthrMname'
           },
		   {
            title: '公司性质',
            align:"center",
            dataIndex: 'occCatgry'
           },
		   {
            title: '行业类别代码',
            align:"center",
            dataIndex: 'occCode'
           },
		   {
            title: '职务',
            align:"center",
            dataIndex: 'posnEmply'
           },
		   {
            title: '证件类型',
            align:"center",
            dataIndex: 'raceCode'
           },
		   {
            title: '直系亲属姓名',
            align:"center",
            dataIndex: 'relNam'
           },
		   {
            title: '直系亲属电话号码',
            align:"center",
            dataIndex: 'relTel'
           },
		   {
            title: '前公司中文全称',
            align:"center",
            dataIndex: 'forecomp'
           },
		   {
            title: '前公司部门',
            align:"center",
            dataIndex: 'foredept'
           },
		   {
            title: '前公司职务',
            align:"center",
            dataIndex: 'forejob'
           },
		   {
            title: '前公司电话',
            align:"center",
            dataIndex: 'forebusi'
           },
		   {
            title: '前公司收入',
            align:"center",
            dataIndex: 'foreann'
           },
		   {
            title: '前公司工龄',
            align:"center",
            dataIndex: 'yrForecom'
           },
		   {
            title: '配偶姓名',
            align:"center",
            dataIndex: 'spuNam'
           },
		   {
            title: '配偶电话号码',
            align:"center",
            dataIndex: 'spuTel'
           },
		   {
            title: '姓名',
            align:"center",
            dataIndex: 'surname'
           },
		   {
            title: '称谓',
            align:"center",
            dataIndex: 'xtitle'
           },
		   {
            title: '能否工作时间联系',
            align:"center",
            dataIndex: 'workCalls'
           },
		   {
            title: '配偶工龄',
            align:"center",
            dataIndex: 'yrInCom2'
           },
		   {
            title: '个人工龄',
            align:"center",
            dataIndex: 'yrInComp'
           },
		   {
            title: '居住年数',
            align:"center",
            dataIndex: 'yrThere'
           },
		   {
            title: '配偶手机号码',
            align:"center",
            dataIndex: 'spuMobile'
           },
		   {
            title: '月租金额/月还款额',
            align:"center",
            dataIndex: 'homeLoan'
           },
		   {
            title: '联系人1手机',
            align:"center",
            dataIndex: 'conMo1'
           },
		   {
            title: '联系人2手机',
            align:"center",
            dataIndex: 'conMo2'
           },
		   {
            title: '直系亲属手机',
            align:"center",
            dataIndex: 'relMobile'
           },
		   {
            title: '职务/岗位',
            align:"center",
            dataIndex: 'intTaxcod'
           },
		   {
            title: '身份核查结果',
            align:"center",
            dataIndex: 'idVerify'
           },
		   {
            title: '是否留存身份证复印件',
            align:"center",
            dataIndex: 'idcpYn'
           },
		   {
            title: '核实结果',
            align:"center",
            dataIndex: 'ivRst'
           },
		   {
            title: '无法核实原因',
            align:"center",
            dataIndex: 'ivRsn'
           },
		   {
            title: '处置方法',
            align:"center",
            dataIndex: 'ivDispo'
           },
		   {
            title: '身份证件有效期',
            align:"center",
            dataIndex: 'idExpdt'
           },
		   {
            title: '客户预留问题',
            align:"center",
            dataIndex: 'question'
           },
		   {
            title: '客户预留问题答案',
            align:"center",
            dataIndex: 'answer'
           },
		   {
            title: '催收评分',
            align:"center",
            dataIndex: 'octScore'
           },
		   {
            title: '国籍细分代码',
            align:"center",
            dataIndex: 'nationCd'
           },
		   {
            title: '数据开始日期',
            align:"center",
            dataIndex: 'sdate'
           },
		   {
            title: '数据结束日期',
            align:"center",
            dataIndex: 'edate'
           },
		   {
            title: '加载日期',
            align:"center",
            dataIndex: 'loadDate'
           },
		  /* {
            title: '法人标识',
            align:"center",
            dataIndex: 'legalNo'
           },
		   {
            title: '天入库表编号-对不同的表名唯一',
            align:"center",
            dataIndex: 'dtnum'
           },
		   {
            title: 'dttime',
            align:"center",
            dataIndex: 'dttime'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/khzlb/khzlb/list",
          delete: "/khzlb/khzlb/delete",
          deleteBatch: "/khzlb/khzlb/deleteBatch",
          exportXlsUrl: "khzlb/khzlb/exportXls",
          importExcelUrl: "khzlb/khzlb/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>