<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="开户行名字">
              <a-input placeholder="请输入开户行名字" v-model="queryParam.loanOrg"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户编号">
              <a-input placeholder="请输入客户编号" v-model="queryParam.custId"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="企业客户编号">
              <a-input placeholder="请输入企业客户编号" v-model="queryParam.entInfoId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="操作员编号">
              <a-input placeholder="请输入操作员编号" v-model="queryParam.userId"></a-input>
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
<!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('个人基本信息')">导出</a-button>
<!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>-->
    </div>

    <!-- table区域-begin -->
    <div>
<!--      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
         :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      </div>-->

      <a-table
        ref="table"
        size="middle"
        bordered
        :rowKey="rowKey"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{x:10000}"
        @change="handleTableChange">

<!--        <span slot="action" slot-scope="text, record">
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
        </span>-->

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <grjbxx-modal ref="modalForm" @ok="modalFormOk"></grjbxx-modal>
  </a-card>
</template>

<script>
  import GrjbxxModal from './modules/GrjbxxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "GrjbxxList",
    mixins:[JeecgListMixin],
    components: {
      GrjbxxModal
    },
    data () {
      return {
        description: '个人基本信息管理页面',
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
            title: '删除标志',
            align:"center",
            dataIndex: 'dataFlag'
           },
		   {
            title: '开户行名字',
            align:"center",
            dataIndex: 'loanOrg'
           },
		   {
            title: '社会保险',
            align:"center",
            dataIndex: 'isSocialInsurance'
           },
		   {
            title: '人身保险',
            align:"center",
            dataIndex: 'isPsnInsurance'
           },
		   {
            title: '社会保险开始日期',
            align:"center",
            dataIndex: 'socialInsStrDate'
           },
		   {
            title: '人身保险开始日期',
            align:"center",
            dataIndex: 'psnInsStrDate'
           },
		   {
            title: '财产保险开始日期',
            align:"center",
            dataIndex: 'propertyInsStrDate'
           },
		   {
            title: '社会保险总额',
            align:"center",
            dataIndex: 'socialInsSum'
           },
		   {
            title: '人身保险保费',
            align:"center",
            dataIndex: 'psnInsFee'
           },
		   {
            title: '人身保险保险额',
            align:"center",
            dataIndex: 'psnInsSum'
           },
		   {
            title: '财产保险保额',
            align:"center",
            dataIndex: 'propertyInsSum'
           },
		   {
            title: '财产保险保费',
            align:"center",
            dataIndex: 'propertyInsFee'
           },
		   {
            title: '财产保险',
            align:"center",
            dataIndex: 'isPropertyInsurance'
           },
		   {
            title: '有无违法或法律纠纷记录',
            align:"center",
            dataIndex: 'isIllegalHis'
           },
		   {
            title: '发生日期',
            align:"center",
            dataIndex: 'illegalDate'
           },
		   {
            title: '事件描述及原因',
            align:"center",
            dataIndex: 'illegalDetail'
           },
		   {
            title: '公积金余额',
            align:"center",
            dataIndex: 'afaBalance'
           },
		   {
            title: '公积金月缴交额',
            align:"center",
            dataIndex: 'afaPayment'
           },
		   {
            title: '寻呼号码',
            align:"center",
            dataIndex: 'beepPager'
           },
		   {
            title: '出生日期',
            align:"center",
            dataIndex: 'birthDay'
           },
		   {
            title: '客户编号',
            align:"center",
            dataIndex: 'custId'
           },
		   {
            title: '描述1',
            align:"center",
            dataIndex: 'describe1'
           },
		   {
            title: '描述2',
            align:"center",
            dataIndex: 'describe2'
           },
		   {
            title: '描述3',
            align:"center",
            dataIndex: 'describe3'
           },
		   {
            title: '描述4',
            align:"center",
            dataIndex: 'describe4'
           },
		   {
            title: '担任职务',
            align:"center",
            dataIndex: 'duty'
           },
		   {
            title: '最高学位',
            align:"center",
            dataIndex: 'eduDegree'
           },
		   {
            title: '最高学历',
            align:"center",
            dataIndex: 'eduExperience'
           },
		   {
            title: '电子邮件地址',
            align:"center",
            dataIndex: 'emailAddr'
           },
		   {
            title: '工作单位',
            align:"center",
            dataIndex: 'employment'
           },
		   {
            title: '工作简历',
            align:"center",
            dataIndex: 'employmenuResume'
           },
		   {
            title: '企业客户编号',
            align:"center",
            dataIndex: 'entInfoId'
           },
		   {
            title: '家庭住址',
            align:"center",
            dataIndex: 'familyAddr'
           },
		   {
            title: '家庭人口',
            align:"center",
            dataIndex: 'familySize'
           },
		   {
            title: '家庭情况',
            align:"center",
            dataIndex: 'familyState'
           },
		   {
            title: '住宅电话',
            align:"center",
            dataIndex: 'familyTel'
           },
		   {
            title: '住宅邮编',
            align:"center",
            dataIndex: 'familyZip'
           },
		   {
            title: '曾用名(别名)',
            align:"center",
            dataIndex: 'fullName'
           },
		   {
            title: '性别',
            align:"center",
            dataIndex: 'gender'
           },
		   {
            title: '毕业学校',
            align:"center",
            dataIndex: 'graduateSchool'
           },
		   {
            title: '毕业年份',
            align:"center",
            dataIndex: 'graduateYear'
           },
		   {
            title: '最高学位',
            align:"center",
            dataIndex: 'highestEducationDegree'
           },
		   {
            title: '业余兴趣爱好',
            align:"center",
            dataIndex: 'hobby'
           },
		   {
            title: '荣誉称号',
            align:"center",
            dataIndex: 'honorTitle'
           },
		   {
            title: '电子信箱',
            align:"center",
            dataIndex: 'indEmail'
           },
		   {
            title: '流水编号',
            align:"center",
            dataIndex: 'indInfoId'
           },
		   {
            title: '是否董事会成员',
            align:"center",
            dataIndex: 'isDirectorater'
           },
		   {
            title: '是否我行职工',
            align:"center",
            dataIndex: 'isEmployee'
           },
		   {
            title: '是否关联',
            align:"center",
            dataIndex: 'isRelating'
           },
		   {
            title: '是否我行股东',
            align:"center",
            dataIndex: 'isSh'
           },
		   {
            title: '通讯地址邮政编码',
            align:"center",
            dataIndex: 'mailAddrZip'
           },
		   {
            title: '通讯地址',
            align:"center",
            dataIndex: 'mailingAddress'
           },
		   {
            title: '婚姻状况',
            align:"center",
            dataIndex: 'marriage'
           },
		   {
            title: '手机号码',
            align:"center",
            dataIndex: 'mobileTel'
           },
		   {
            title: '月收入',
            align:"center",
            dataIndex: 'monthlyWages'
           },
		   {
            title: '民族',
            align:"center",
            dataIndex: 'nationality'
           },
		   {
            title: '籍贯',
            align:"center",
            dataIndex: 'nativePlace'
           },
		   {
            title: '职业',
            align:"center",
            dataIndex: 'occupation'
           },
		   {
            title: '单位电话',
            align:"center",
            dataIndex: 'officeTel'
           },
		   {
            title: '其他企业兼职',
            align:"center",
            dataIndex: 'otherEntSideline'
           },
		   {
            title: '个人公积金账号',
            align:"center",
            dataIndex: 'personalAfa'
           },
		   {
            title: '政治面貌',
            align:"center",
            dataIndex: 'politicalFace'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'remark'
           },
		   {
            title: '补充公积金余额',
            align:"center",
            dataIndex: 'safaBalance'
           },
		   {
            title: '补充公积金月缴交额',
            align:"center",
            dataIndex: 'safaPayment'
           },
		   {
            title: '在我行担任职务',
            align:"center",
            dataIndex: 'selfBankSideline'
           },
		   {
            title: '社会保险账号',
            align:"center",
            dataIndex: 'siNo'
           },
		   {
            title: '社会兼职',
            align:"center",
            dataIndex: 'societySideline'
           },
		   {
            title: '所学专业',
            align:"center",
            dataIndex: 'speciality'
           },
		   {
            title: '最高职称',
            align:"center",
            dataIndex: 'techPost'
           },
		   {
            title: '更改日期',
            align:"center",
            dataIndex: 'updateDate'
           },
		   {
            title: '操作员编号',
            align:"center",
            dataIndex: 'userId'
           },
		   {
            title: '电子邮箱',
            align:"center",
            dataIndex: 'emailAddress'
           },
		   {
            title: '邮政编码',
            align:"center",
            dataIndex: 'familyZipcode'
           },
		   {
            title: '许可证号码',
            align:"center",
            dataIndex: 'xukezhengCode'
           },
		   {
            title: '居住地址',
            align:"center",
            dataIndex: 'juzhuAddress'
           },
		   {
            title: '存款日均',
            align:"center",
            dataIndex: 'cunkuanRijun'
           },
		   {
            title: '存款号',
            align:"center",
            dataIndex: 'cunkuanCode'
           },
		   {
            title: '包片人',
            align:"center",
            dataIndex: 'baopianren'
           },
		   {
            title: '业务员',
            align:"center",
            dataIndex: 'yewuyuan'
           },
		   {
            title: '暂末用',
            align:"center",
            dataIndex: 'man'
           },
		   {
            title: '录入日期',
            align:"center",
            dataIndex: 'inputDate'
           },
		   {
            title: '部门ID',
            align:"center",
            dataIndex: 'deptId'
           },
		   {
            title: '调查人',
            align:"center",
            dataIndex: 'checkId'
           },
		   {
            title: '调查时间',
            align:"center",
            dataIndex: 'checkDate'
           },
		   {
            title: '户主及家庭成员社会诚信,家庭及邻里关系,道德品等综合评价',
            align:"center",
            dataIndex: 'isCantonal'
           },
		   {
            title: '劳动力人口数',
            align:"center",
            dataIndex: 'workSize'
           },
		   {
            title: '劳动能力',
            align:"center",
            dataIndex: 'workPower'
           },
		   {
            title: '贷款结算帐号',
            align:"center",
            dataIndex: 'loanAccount'
           },
		   {
            title: '国标行业',
            align:"center",
            dataIndex: 'industryType'
           },
		   {
            title: '国标行业1',
            align:"center",
            dataIndex: 'industryType1'
           },
		   {
            title: '国标行业2',
            align:"center",
            dataIndex: 'industryType2'
           },
		   {
            title: '国标行业3',
            align:"center",
            dataIndex: 'industryType3'
           },
		   {
            title: '是否发送短信',
            align:"center",
            dataIndex: 'isSendMess'
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
		   {
            title: '法人标识',
            align:"center",
            dataIndex: 'legalNo'
           },
		  /* {
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
          list: "/grjbxx/grjbxx/list",
          delete: "/grjbxx/grjbxx/delete",
          deleteBatch: "/grjbxx/grjbxx/deleteBatch",
          exportXlsUrl: "grjbxx/grjbxx/exportXls",
          importExcelUrl: "grjbxx/grjbxx/importExcel",
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