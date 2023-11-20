<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
      
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="删除标志">
          <a-input placeholder="请输入删除标志" v-decorator="['dataFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="开户行名字">
          <a-input placeholder="请输入开户行名字" v-decorator="['loanOrg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="社会保险">
          <a-input placeholder="请输入社会保险" v-decorator="['isSocialInsurance', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="人身保险">
          <a-input placeholder="请输入人身保险" v-decorator="['isPsnInsurance', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="社会保险开始日期">
          <a-input placeholder="请输入社会保险开始日期" v-decorator="['socialInsStrDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="人身保险开始日期">
          <a-input placeholder="请输入人身保险开始日期" v-decorator="['psnInsStrDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="财产保险开始日期">
          <a-input placeholder="请输入财产保险开始日期" v-decorator="['propertyInsStrDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="社会保险总额">
          <a-input placeholder="请输入社会保险总额" v-decorator="['socialInsSum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="人身保险保费">
          <a-input placeholder="请输入人身保险保费" v-decorator="['psnInsFee', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="人身保险保险额">
          <a-input placeholder="请输入人身保险保险额" v-decorator="['psnInsSum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="财产保险保额">
          <a-input placeholder="请输入财产保险保额" v-decorator="['propertyInsSum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="财产保险保费">
          <a-input placeholder="请输入财产保险保费" v-decorator="['propertyInsFee', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="财产保险">
          <a-input placeholder="请输入财产保险" v-decorator="['isPropertyInsurance', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="有无违法或法律纠纷记录">
          <a-input placeholder="请输入有无违法或法律纠纷记录" v-decorator="['isIllegalHis', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发生日期">
          <a-input placeholder="请输入发生日期" v-decorator="['illegalDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="事件描述及原因">
          <a-input placeholder="请输入事件描述及原因" v-decorator="['illegalDetail', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="公积金余额">
          <a-input placeholder="请输入公积金余额" v-decorator="['afaBalance', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="公积金月缴交额">
          <a-input placeholder="请输入公积金月缴交额" v-decorator="['afaPayment', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="寻呼号码">
          <a-input placeholder="请输入寻呼号码" v-decorator="['beepPager', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="出生日期">
          <a-input placeholder="请输入出生日期" v-decorator="['birthDay', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户编号">
          <a-input placeholder="请输入客户编号" v-decorator="['custId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="描述1">
          <a-input placeholder="请输入描述1" v-decorator="['describe1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="描述2">
          <a-input placeholder="请输入描述2" v-decorator="['describe2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="描述3">
          <a-input placeholder="请输入描述3" v-decorator="['describe3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="描述4">
          <a-input placeholder="请输入描述4" v-decorator="['describe4', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="担任职务">
          <a-input placeholder="请输入担任职务" v-decorator="['duty', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最高学位">
          <a-input placeholder="请输入最高学位" v-decorator="['eduDegree', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最高学历">
          <a-input placeholder="请输入最高学历" v-decorator="['eduExperience', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="电子邮件地址">
          <a-input placeholder="请输入电子邮件地址" v-decorator="['emailAddr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="工作单位">
          <a-input placeholder="请输入工作单位" v-decorator="['employment', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="工作简历">
          <a-input placeholder="请输入工作简历" v-decorator="['employmenuResume', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="企业客户编号">
          <a-input placeholder="请输入企业客户编号" v-decorator="['entInfoId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="家庭住址">
          <a-input placeholder="请输入家庭住址" v-decorator="['familyAddr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="家庭人口">
          <a-input placeholder="请输入家庭人口" v-decorator="['familySize', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="家庭情况">
          <a-input placeholder="请输入家庭情况" v-decorator="['familyState', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="住宅电话">
          <a-input placeholder="请输入住宅电话" v-decorator="['familyTel', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="住宅邮编">
          <a-input placeholder="请输入住宅邮编" v-decorator="['familyZip', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="曾用名(别名)">
          <a-input placeholder="请输入曾用名(别名)" v-decorator="['fullName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="性别">
          <a-input placeholder="请输入性别" v-decorator="['gender', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="毕业学校">
          <a-input placeholder="请输入毕业学校" v-decorator="['graduateSchool', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="毕业年份">
          <a-input placeholder="请输入毕业年份" v-decorator="['graduateYear', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最高学位">
          <a-input placeholder="请输入最高学位" v-decorator="['highestEducationDegree', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业余兴趣爱好">
          <a-input placeholder="请输入业余兴趣爱好" v-decorator="['hobby', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="荣誉称号">
          <a-input placeholder="请输入荣誉称号" v-decorator="['honorTitle', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="电子信箱">
          <a-input placeholder="请输入电子信箱" v-decorator="['indEmail', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="流水编号">
          <a-input placeholder="请输入流水编号" v-decorator="['indInfoId', validatorRules.indInfoId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否董事会成员">
          <a-input placeholder="请输入是否董事会成员" v-decorator="['isDirectorater', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否我行职工">
          <a-input placeholder="请输入是否我行职工" v-decorator="['isEmployee', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否关联">
          <a-input placeholder="请输入是否关联" v-decorator="['isRelating', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否我行股东">
          <a-input placeholder="请输入是否我行股东" v-decorator="['isSh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="通讯地址邮政编码">
          <a-input placeholder="请输入通讯地址邮政编码" v-decorator="['mailAddrZip', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="通讯地址">
          <a-input placeholder="请输入通讯地址" v-decorator="['mailingAddress', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="婚姻状况">
          <a-input placeholder="请输入婚姻状况" v-decorator="['marriage', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="手机号码">
          <a-input placeholder="请输入手机号码" v-decorator="['mobileTel', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="月收入">
          <a-input placeholder="请输入月收入" v-decorator="['monthlyWages', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="民族">
          <a-input placeholder="请输入民族" v-decorator="['nationality', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="籍贯">
          <a-input placeholder="请输入籍贯" v-decorator="['nativePlace', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="职业">
          <a-input placeholder="请输入职业" v-decorator="['occupation', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="单位电话">
          <a-input placeholder="请输入单位电话" v-decorator="['officeTel', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="其他企业兼职">
          <a-input placeholder="请输入其他企业兼职" v-decorator="['otherEntSideline', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="个人公积金账号">
          <a-input placeholder="请输入个人公积金账号" v-decorator="['personalAfa', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="政治面貌">
          <a-input placeholder="请输入政治面貌" v-decorator="['politicalFace', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="备注">
          <a-input placeholder="请输入备注" v-decorator="['remark', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="补充公积金余额">
          <a-input placeholder="请输入补充公积金余额" v-decorator="['safaBalance', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="补充公积金月缴交额">
          <a-input placeholder="请输入补充公积金月缴交额" v-decorator="['safaPayment', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="在我行担任职务">
          <a-input placeholder="请输入在我行担任职务" v-decorator="['selfBankSideline', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="社会保险账号">
          <a-input placeholder="请输入社会保险账号" v-decorator="['siNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="社会兼职">
          <a-input placeholder="请输入社会兼职" v-decorator="['societySideline', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="所学专业">
          <a-input placeholder="请输入所学专业" v-decorator="['speciality', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最高职称">
          <a-input placeholder="请输入最高职称" v-decorator="['techPost', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="更改日期">
          <a-input placeholder="请输入更改日期" v-decorator="['updateDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="操作员编号">
          <a-input placeholder="请输入操作员编号" v-decorator="['userId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="电子邮箱">
          <a-input placeholder="请输入电子邮箱" v-decorator="['emailAddress', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="邮政编码">
          <a-input placeholder="请输入邮政编码" v-decorator="['familyZipcode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="许可证号码">
          <a-input placeholder="请输入许可证号码" v-decorator="['xukezhengCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="居住地址">
          <a-input placeholder="请输入居住地址" v-decorator="['juzhuAddress', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存款日均">
          <a-input placeholder="请输入存款日均" v-decorator="['cunkuanRijun', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存款号">
          <a-input placeholder="请输入存款号" v-decorator="['cunkuanCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="包片人">
          <a-input placeholder="请输入包片人" v-decorator="['baopianren', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务员">
          <a-input placeholder="请输入业务员" v-decorator="['yewuyuan', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="暂末用">
          <a-input placeholder="请输入暂末用" v-decorator="['man', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="录入日期">
          <a-input placeholder="请输入录入日期" v-decorator="['inputDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="部门ID">
          <a-input placeholder="请输入部门ID" v-decorator="['deptId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="调查人">
          <a-input placeholder="请输入调查人" v-decorator="['checkId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="调查时间">
          <a-input placeholder="请输入调查时间" v-decorator="['checkDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="户主及家庭成员社会诚信,家庭及邻里关系,道德品等综合评价">
          <a-input placeholder="请输入户主及家庭成员社会诚信,家庭及邻里关系,道德品等综合评价" v-decorator="['isCantonal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="劳动力人口数">
          <a-input placeholder="请输入劳动力人口数" v-decorator="['workSize', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="劳动能力">
          <a-input placeholder="请输入劳动能力" v-decorator="['workPower', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款结算帐号">
          <a-input placeholder="请输入贷款结算帐号" v-decorator="['loanAccount', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="国标行业">
          <a-input placeholder="请输入国标行业" v-decorator="['industryType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="国标行业1">
          <a-input placeholder="请输入国标行业1" v-decorator="['industryType1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="国标行业2">
          <a-input placeholder="请输入国标行业2" v-decorator="['industryType2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="国标行业3">
          <a-input placeholder="请输入国标行业3" v-decorator="['industryType3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否发送短信">
          <a-input placeholder="请输入是否发送短信" v-decorator="['isSendMess', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="数据开始日期">
          <a-input placeholder="请输入数据开始日期" v-decorator="['sDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="数据结束日期">
          <a-input placeholder="请输入数据结束日期" v-decorator="['eDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="加载日期">
          <a-input placeholder="请输入加载日期" v-decorator="['loadDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="法人标识">
          <a-input placeholder="请输入法人标识" v-decorator="['legalNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="天入库表编号-对不同的表名唯一">
          <a-input placeholder="请输入天入库表编号-对不同的表名唯一" v-decorator="['dtnum', validatorRules.dtnum ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="dttime">
          <a-date-picker v-decorator="[ 'dttime', {}]" />
        </a-form-item>
		
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "GrjbxxModal",
    data () {
      return {
        title:"操作",
        visible: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },

        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
        indInfoId:{rules: [{ required: true, message: '请输入流水编号!' }]},
        dtnum:{rules: [{ required: true, message: '请输入天入库表编号-对不同的表名唯一!' }]},
        },
        url: {
          add: "/grjbxx/grjbxx/add",
          edit: "/grjbxx/grjbxx/edit",
        },
      }
    },
    created () {
    },
    methods: {
      add () {
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'dataFlag','loanOrg','isSocialInsurance','isPsnInsurance','socialInsStrDate','psnInsStrDate','propertyInsStrDate','socialInsSum','psnInsFee','psnInsSum','propertyInsSum','propertyInsFee','isPropertyInsurance','isIllegalHis','illegalDate','illegalDetail','afaBalance','afaPayment','beepPager','birthDay','custId','describe1','describe2','describe3','describe4','duty','eduDegree','eduExperience','emailAddr','employment','employmenuResume','entInfoId','familyAddr','familySize','familyState','familyTel','familyZip','fullName','gender','graduateSchool','graduateYear','highestEducationDegree','hobby','honorTitle','indEmail','indInfoId','isDirectorater','isEmployee','isRelating','isSh','mailAddrZip','mailingAddress','marriage','mobileTel','monthlyWages','nationality','nativePlace','occupation','officeTel','otherEntSideline','personalAfa','politicalFace','remark','safaBalance','safaPayment','selfBankSideline','siNo','societySideline','speciality','techPost','updateDate','userId','emailAddress','familyZipcode','xukezhengCode','juzhuAddress','cunkuanRijun','cunkuanCode','baopianren','yewuyuan','man','inputDate','deptId','checkId','checkDate','isCantonal','workSize','workPower','loanAccount','industryType','industryType1','industryType2','industryType3','isSendMess','sDate','eDate','loadDate','legalNo','dtnum'))
		  //时间格式化
          this.form.setFieldsValue({dttime:this.model.dttime?moment(this.model.dttime):null})
        });

      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if(!this.model.id){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            formData.dttime = formData.dttime?formData.dttime.format():null;
            
            console.log(formData)
            httpAction(httpurl,formData,method).then((res)=>{
              if(res.success){
                that.$message.success(res.message);
                that.$emit('ok');
              }else{
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
              that.close();
            })



          }
        })
      },
      handleCancel () {
        this.close()
      },


    }
  }
</script>

<style lang="less" scoped>

</style>