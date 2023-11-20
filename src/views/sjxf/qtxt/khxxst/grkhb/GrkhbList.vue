<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户编号">
              <a-input placeholder="请输入客户编号" v-model="queryParam.custId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="个人客户类型">
              <a-input placeholder="请输入个人客户类型" v-model="queryParam.perCustType"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户名字">
              <a-input placeholder="请输入客户名字" v-model="queryParam.personalName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="手机号码">
              <a-input placeholder="请输入手机号码" v-model="queryParam.mobilePhone"></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易流水号">
              <a-input placeholder="请输入交易流水号" v-model="queryParam.txSeqNo"></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button  @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>

            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('个人客户表')">导出</a-button>

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
        :scroll="{x: 8000}"
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
    <grkhb-modal ref="modalForm" @ok="modalFormOk"></grkhb-modal>
  </a-card>
</template>

<script>
  import GrkhbModal from './modules/GrkhbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "GrkhbList",
    mixins:[JeecgListMixin],
    components: {
      GrkhbModal
    },
    data () {
      return {
        description: '个人客户表管理页面',
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
            title: '删除标示',
            align:"center",
            dataIndex: 'dataFlag'
           },
		   {
            title: '客户编号',
            align:"center",
            dataIndex: 'custId'
           },
		   {
            title: '个人客户类型',
            align:"center",
            dataIndex: 'perCustType'
           },
		   {
            title: '客户姓氏',
            align:"center",
            dataIndex: 'surName'
           },
		   {
            title: '客户名字',
            align:"center",
            dataIndex: 'personalName'
           },
		   {
            title: '联名户标志',
            align:"center",
            dataIndex: 'jointMemberFlag'
           },
		   {
            title: '拼音名称',
            align:"center",
            dataIndex: 'pinyinName'
           },
		   {
            title: '拼音缩写',
            align:"center",
            dataIndex: 'pinyinAbbr'
           },
		   {
            title: '客户称谓',
            align:"center",
            dataIndex: 'personTitle'
           },
		   {
            title: '客户昵称',
            align:"center",
            dataIndex: 'nickName'
           },
		   {
            title: '曾用名',
            align:"center",
            dataIndex: 'usedName'
           },
		   {
            title: '性别',
            align:"center",
            dataIndex: 'gender'
           },
		   {
            title: '生日是否农历',
            align:"center",
            dataIndex: 'isCnBirthday'
           },
		   {
            title: '出生日期',
            align:"center",
            dataIndex: 'birthday'
           },
		   {
            title: '出生地点',
            align:"center",
            dataIndex: 'birthlocale'
           },
		   {
            title: '国籍',
            align:"center",
            dataIndex: 'citizenship'
           },
		   {
            title: '民族',
            align:"center",
            dataIndex: 'nationality'
           },
		   {
            title: '籍贯',
            align:"center",
            dataIndex: 'nativeplace'
           },
		   {
            title: '是否通过联网核查',
            align:"center",
            dataIndex: 'isIdentityVerify'
           },
		   {
            title: '户口所在地',
            align:"center",
            dataIndex: 'hukouPlace'
           },
		   {
            title: '婚姻状况',
            align:"center",
            dataIndex: 'marriage'
           },
		   {
            title: '居住状况',
            align:"center",
            dataIndex: 'residence'
           },
		   {
            title: '健康状况',
            align:"center",
            dataIndex: 'health'
           },
		   {
            title: '宗教信仰',
            align:"center",
            dataIndex: 'religiousBelief'
           },
		   {
            title: '政治面貌',
            align:"center",
            dataIndex: 'politicalFace'
           },
		   {
            title: '手机号码',
            align:"center",
            dataIndex: 'mobilePhone'
           },
		   {
            title: '电子邮件地址',
            align:"center",
            dataIndex: 'email'
           },
		   {
            title: '主页',
            align:"center",
            dataIndex: 'homepage'
           },
		   {
            title: '微博',
            align:"center",
            dataIndex: 'weibo'
           },
		   {
            title: '微信',
            align:"center",
            dataIndex: 'weixin'
           },
		   {
            title: 'QQ',
            align:"center",
            dataIndex: 'qq'
           },
		   {
            title: '星座',
            align:"center",
            dataIndex: 'starSign'
           },
		   {
            title: '住宅地址',
            align:"center",
            dataIndex: 'homeAddr'
           },
		   {
            title: '住宅邮编',
            align:"center",
            dataIndex: 'homeZipcode'
           },
		   {
            title: '住宅电话',
            align:"center",
            dataIndex: 'homeTel'
           },
		   {
            title: '最高学历',
            align:"center",
            dataIndex: 'highestSchooling'
           },
		   {
            title: '最高学位',
            align:"center",
            dataIndex: 'highestDegree'
           },
		   {
            title: '毕业学校',
            align:"center",
            dataIndex: 'graduateSchool'
           },
		   {
            title: '所学专业',
            align:"center",
            dataIndex: 'major'
           },
		   {
            title: '毕业时间',
            align:"center",
            dataIndex: 'graduationDate'
           },
		   {
            title: '职业状况',
            align:"center",
            dataIndex: 'careerStat'
           },
		   {
            title: '职业',
            align:"center",
            dataIndex: 'careerType'
           },
		   {
            title: '从事行业',
            align:"center",
            dataIndex: 'profession'
           },
		   {
            title: '单位名称',
            align:"center",
            dataIndex: 'unitName'
           },
		   {
            title: '单位性质',
            align:"center",
            dataIndex: 'unitChar'
           },
		   {
            title: '单位地址',
            align:"center",
            dataIndex: 'unitAddr'
           },
		   {
            title: '单位邮编',
            align:"center",
            dataIndex: 'unitZipcode'
           },
		   {
            title: '单位电话',
            align:"center",
            dataIndex: 'unitTel'
           },
		   {
            title: '传真号码',
            align:"center",
            dataIndex: 'unitFex'
           },
		   {
            title: '通讯地址',
            align:"center",
            dataIndex: 'postAddr'
           },
		   {
            title: '通讯编码',
            align:"center",
            dataIndex: 'postZipcode'
           },
		   {
            title: '职务',
            align:"center",
            dataIndex: 'duty'
           },
		   {
            title: '参加工作时间',
            align:"center",
            dataIndex: 'careerStartDate'
           },
		   {
            title: '年收入范围',
            align:"center",
            dataIndex: 'annualIncomeScope'
           },
		   {
            title: '年收入',
            align:"center",
            dataIndex: 'annualIncome'
           },
		   {
            title: '年支出',
            align:"center",
            dataIndex: 'annualExpenditure'
           },
		   {
            title: '参加本单位日期',
            align:"center",
            dataIndex: 'currCareerStartDate'
           },
		   {
            title: '是否有执业资格',
            align:"center",
            dataIndex: 'hasQualification'
           },
		   {
            title: '资格证书名称',
            align:"center",
            dataIndex: 'qualification'
           },
		   {
            title: '职称',
            align:"center",
            dataIndex: 'careerTitle'
           },
		   {
            title: '不良记录',
            align:"center",
            dataIndex: 'familyAdverseRecords'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'remarks'
           },
		   {
            title: '最后更新系统',
            align:"center",
            dataIndex: 'lastUpdateSys'
           },
		   {
            title: '最后更新人',
            align:"center",
            dataIndex: 'lastUpdateUser'
           },
		   {
            title: '最后更新时间',
            align:"center",
            dataIndex: 'lastUpdateTm'
           },
		   {
            title: '交易流水号',
            align:"center",
            dataIndex: 'txSeqNo'
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
            title: '加载时间',
            align:"center",
            dataIndex: 'loadDate'
           },
		   {
            title: '法人标识',
            align:"center",
            dataIndex: 'legalNo'
           },
		   // {
       //      title: '天入库表编号-对不同的表名唯一',
       //      align:"center",
       //      dataIndex: 'dtnum'
       //     },
		   // {
       //      title: 'dttime',
       //      align:"center",
       //      dataIndex: 'dttime'
       //     },
       //    {
       //      title: '操作',
       //      dataIndex: 'action',
       //      align:"center",
       //      scopedSlots: { customRender: 'action' },
       //    }
        ],
		url: {
          list: "/grkhb/grkhb/list",
          delete: "/grkhb/grkhb/delete",
          deleteBatch: "/grkhb/grkhb/deleteBatch",
          exportXlsUrl: "grkhb/grkhb/exportXls",
          importExcelUrl: "grkhb/grkhb/importExcel",
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