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
          label="删除标识">
          <a-input placeholder="请输入删除标识" v-decorator="['dataFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户编号">
          <a-input placeholder="请输入客户编号" v-decorator="['custId', validatorRules.custId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构客户类型">
          <a-input placeholder="请输入机构客户类型" v-decorator="['orgCustType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="国家或地区代码">
          <a-input placeholder="请输入国家或地区代码" v-decorator="['nationCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="行政区划代码">
          <a-input placeholder="请输入行政区划代码" v-decorator="['areaCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="组织机构类型">
          <a-input placeholder="请输入组织机构类型" v-decorator="['orgType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="组织机构代码">
          <a-input placeholder="请输入组织机构代码" v-decorator="['orgCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="营业执照号码">
          <a-input placeholder="请输入营业执照号码" v-decorator="['busiLicNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="行业分类（主营）">
          <a-input placeholder="请输入行业分类（主营）" v-decorator="['mainIndustry', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="行业分类（副营）">
          <a-input placeholder="请输入行业分类（副营）" v-decorator="['minorIndustry', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="产业划分">
          <a-input placeholder="请输入产业划分" v-decorator="['industryDivision', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="企业性质">
          <a-input placeholder="请输入企业性质" v-decorator="['entProperty', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="企业规模">
          <a-input placeholder="请输入企业规模" v-decorator="['entScale', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="资产规模">
          <a-input placeholder="请输入资产规模" v-decorator="['assetsScale', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="员工规模">
          <a-input placeholder="请输入员工规模" v-decorator="['employeeScale', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="经济类型">
          <a-input placeholder="请输入经济类型" v-decorator="['economicType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="控股类型">
          <a-input placeholder="请输入控股类型" v-decorator="['comHoldType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="组织形式">
          <a-input placeholder="请输入组织形式" v-decorator="['orgForm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="投资主体">
          <a-input placeholder="请输入投资主体" v-decorator="['investType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="企业隶属">
          <a-input placeholder="请输入企业隶属" v-decorator="['entBelong', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="成立日期">
          <a-input placeholder="请输入成立日期" v-decorator="['buildDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="主管部门">
          <a-input placeholder="请输入主管部门" v-decorator="['superDept', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="主营业务">
          <a-input placeholder="请输入主营业务" v-decorator="['mainBusiness', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="兼营业务">
          <a-input placeholder="请输入兼营业务" v-decorator="['minorBusiness', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="经营方式">
          <a-input placeholder="请输入经营方式" v-decorator="['businessMode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="开始营业时间">
          <a-input placeholder="请输入开始营业时间" v-decorator="['busiStartDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="经费来源">
          <a-input placeholder="请输入经费来源" v-decorator="['fundSource', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="经济区编码">
          <a-input placeholder="请输入经济区编码" v-decorator="['zoneCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="外汇许可证号码">
          <a-input placeholder="请输入外汇许可证号码" v-decorator="['fexcPrmCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="产业化龙头企业级别">
          <a-input placeholder="请输入产业化龙头企业级别" v-decorator="['topCorpLevel', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="特种经营标志">
          <a-input placeholder="请输入特种经营标志" v-decorator="['comSpBusiness', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="特种经营许可证编号">
          <a-input placeholder="请输入特种经营许可证编号" v-decorator="['comSpLicNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="特种经营情况">
          <a-input placeholder="请输入特种经营情况" v-decorator="['comSpDetail', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="特种许可证颁发机关">
          <a-input placeholder="请输入特种许可证颁发机关" v-decorator="['comSpLicOrg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="特种经营起始日期">
          <a-input placeholder="请输入特种经营起始日期" v-decorator="['comSpStrDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="特种经营到期日期">
          <a-input placeholder="请输入特种经营到期日期" v-decorator="['comSpEndDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="法定代表人名称">
          <a-input placeholder="请输入法定代表人名称" v-decorator="['legalReprName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="法定代表人性别">
          <a-input placeholder="请输入法定代表人性别" v-decorator="['legalReprGender', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="法定代表人证件类型">
          <a-input placeholder="请输入法定代表人证件类型" v-decorator="['legalReprIdentType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="法定代表人证件号码">
          <a-input placeholder="请输入法定代表人证件号码" v-decorator="['legalReprIdentNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="法定代表人联系电话">
          <a-input placeholder="请输入法定代表人联系电话" v-decorator="['legalReprTel', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="法定代表人户籍地址">
          <a-input placeholder="请输入法定代表人户籍地址" v-decorator="['legalReprAddr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="法定代表人所在国家（地区）">
          <a-input placeholder="请输入法定代表人所在国家（地区）" v-decorator="['legalReprNationCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="财务报表类型">
          <a-input placeholder="请输入财务报表类型" v-decorator="['finRepType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="总资产">
          <a-input placeholder="请输入总资产" v-decorator="['totalAssets', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="总负债">
          <a-input placeholder="请输入总负债" v-decorator="['totalDebt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="年收入">
          <a-input placeholder="请输入年收入" v-decorator="['annualIncome', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="年利润">
          <a-input placeholder="请输入年利润" v-decorator="['annualProfit', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="通讯地址">
          <a-input placeholder="请输入通讯地址" v-decorator="['orgAddr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="邮政编码">
          <a-input placeholder="请输入邮政编码" v-decorator="['orgZipcode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="联系人">
          <a-input placeholder="请输入联系人" v-decorator="['orgCus', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="联系电话">
          <a-input placeholder="请输入联系电话" v-decorator="['orgTel', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="传真号码">
          <a-input placeholder="请输入传真号码" v-decorator="['orgFex', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="电子邮件地址">
          <a-input placeholder="请输入电子邮件地址" v-decorator="['orgEmail', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="主页">
          <a-input placeholder="请输入主页" v-decorator="['orgHomepage', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="微博">
          <a-input placeholder="请输入微博" v-decorator="['orgWeibo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="微信">
          <a-input placeholder="请输入微信" v-decorator="['orgWeixin', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="备注">
          <a-input placeholder="请输入备注" v-decorator="['remarks', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最后更新系统">
          <a-input placeholder="请输入最后更新系统" v-decorator="['lastUpdateSys', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最后更新人">
          <a-input placeholder="请输入最后更新人" v-decorator="['lastUpdateUser', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最后更新时间">
          <a-input placeholder="请输入最后更新时间" v-decorator="['lastUpdateTm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易流水号">
          <a-input placeholder="请输入交易流水号" v-decorator="['txSeqNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="数据开始日期">
          <a-input placeholder="请输入数据开始日期" v-decorator="['sdate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="数据结束日期">
          <a-input placeholder="请输入数据结束日期" v-decorator="['edate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="加载时间">
          <a-input placeholder="请输入加载时间" v-decorator="['loadDate', {}]" />
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
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="legalReprIdentExpDate">
          <a-input placeholder="请输入legalReprIdentExpDate" v-decorator="['legalReprIdentExpDate', {}]" />
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
    name: "JgkhbModal",
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
        custId:{rules: [{ required: true, message: '请输入客户编号!' }]},
        dtnum:{rules: [{ required: true, message: '请输入天入库表编号-对不同的表名唯一!' }]},
        },
        url: {
          add: "/jgkhb/jgkhb/add",
          edit: "/jgkhb/jgkhb/edit",
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
          this.form.setFieldsValue(pick(this.model,'dataFlag','custId','orgCustType','nationCode','areaCode','orgType','orgCode','busiLicNo','mainIndustry','minorIndustry','industryDivision','entProperty','entScale','assetsScale','employeeScale','economicType','comHoldType','orgForm','investType','entBelong','buildDate','superDept','mainBusiness','minorBusiness','businessMode','busiStartDate','fundSource','zoneCode','fexcPrmCode','topCorpLevel','comSpBusiness','comSpLicNo','comSpDetail','comSpLicOrg','comSpStrDate','comSpEndDate','legalReprName','legalReprGender','legalReprIdentType','legalReprIdentNo','legalReprTel','legalReprAddr','legalReprNationCode','finRepType','totalAssets','totalDebt','annualIncome','annualProfit','orgAddr','orgZipcode','orgCus','orgTel','orgFex','orgEmail','orgHomepage','orgWeibo','orgWeixin','remarks','lastUpdateSys','lastUpdateUser','lastUpdateTm','txSeqNo','sdate','edate','loadDate','legalNo','dtnum','legalReprIdentExpDate'))
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