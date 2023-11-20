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
          label="客户证件号码">
          <a-input placeholder="请输入客户证件号码" v-decorator="['custrNbr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="社保卡号">
          <a-input placeholder="请输入社保卡号" v-decorator="['securNbr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="国籍">
          <a-input placeholder="请输入国籍" v-decorator="['nation', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="单位电话号码">
          <a-input placeholder="请输入单位电话号码" v-decorator="['busiPhone', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="自购车辆购买时间">
          <a-input placeholder="请输入自购车辆购买时间" v-decorator="['carDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="自购车辆车牌号">
          <a-input placeholder="请输入自购车辆车牌号" v-decorator="['carId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="自购车辆品牌">
          <a-input placeholder="请输入自购车辆品牌" v-decorator="['carNam', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="自购车辆情况">
          <a-input placeholder="请输入自购车辆情况" v-decorator="['carCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户分类">
          <a-input placeholder="请输入客户分类" v-decorator="['classCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="单位名称">
          <a-input placeholder="请输入单位名称" v-decorator="['compName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="联系人1姓名">
          <a-input placeholder="请输入联系人1姓名" v-decorator="['conNam1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="联系人2姓名">
          <a-input placeholder="请输入联系人2姓名" v-decorator="['conNam2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="联系人1电话号码">
          <a-input placeholder="请输入联系人1电话号码" v-decorator="['conTel1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="联系人2电话号码">
          <a-input placeholder="请输入联系人2电话号码" v-decorator="['conTel2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="联系人1单位名称">
          <a-input placeholder="请输入联系人1单位名称" v-decorator="['contrNam1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="联系人1关系">
          <a-input placeholder="请输入联系人1关系" v-decorator="['contrNam2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="联系人2单位名称">
          <a-input placeholder="请输入联系人2单位名称" v-decorator="['contrNam3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="联系人2关系">
          <a-input placeholder="请输入联系人2关系" v-decorator="['contrNam4', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="直系亲属关系">
          <a-input placeholder="请输入直系亲属关系" v-decorator="['contrNam5', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="配偶单位名称">
          <a-input placeholder="请输入配偶单位名称" v-decorator="['contrTel1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="配偶证件号码">
          <a-input placeholder="请输入配偶证件号码" v-decorator="['contrTel2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="信用额度">
          <a-input placeholder="请输入信用额度" v-decorator="['credLimit', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="美元帐户额度">
          <a-input placeholder="请输入美元帐户额度" v-decorator="['credlimX', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="出生日期">
          <a-input placeholder="请输入出生日期" v-decorator="['dayBirth', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="抚养人数">
          <a-input placeholder="请输入抚养人数" v-decorator="['dependents', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="教育程度">
          <a-input placeholder="请输入教育程度" v-decorator="['educa', {}]" />
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
          label="部门">
          <a-input placeholder="请输入部门" v-decorator="['emplyDept', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="员工编号">
          <a-input placeholder="请输入员工编号" v-decorator="['emplyNbr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="分机">
          <a-input placeholder="请输入分机" v-decorator="['extension', {}]" />
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
          label="住房情况">
          <a-input placeholder="请输入住房情况" v-decorator="['homeCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="住宅电话号码">
          <a-input placeholder="请输入住宅电话号码" v-decorator="['homePhone', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="配偶税前年收入">
          <a-input placeholder="请输入配偶税前年收入" v-decorator="['incomeAn2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="个人税前年收入">
          <a-input placeholder="请输入个人税前年收入" v-decorator="['incomeAnn', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="配偶主要收入来源">
          <a-input placeholder="请输入配偶主要收入来源" v-decorator="['incomeSr2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="个人主要收入来源">
          <a-input placeholder="请输入个人主要收入来源" v-decorator="['incomeSrc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="传真号码">
          <a-input placeholder="请输入传真号码" v-decorator="['irdN', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="语言代码">
          <a-input placeholder="请输入语言代码" v-decorator="['langCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="可接受广告类别">
          <a-input placeholder="请输入可接受广告类别" v-decorator="['mailCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="婚姻状况">
          <a-input placeholder="请输入婚姻状况" v-decorator="['marStatus', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="手机号码">
          <a-input placeholder="请输入手机号码" v-decorator="['moPhone', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="分期付款额度">
          <a-input placeholder="请输入分期付款额度" v-decorator="['mpLimit', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="英文性名">
          <a-input placeholder="请输入英文性名" v-decorator="['mthrMname', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="公司性质">
          <a-input placeholder="请输入公司性质" v-decorator="['occCatgry', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="行业类别代码">
          <a-input placeholder="请输入行业类别代码" v-decorator="['occCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="职务">
          <a-input placeholder="请输入职务" v-decorator="['posnEmply', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="证件类型">
          <a-input placeholder="请输入证件类型" v-decorator="['raceCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="直系亲属姓名">
          <a-input placeholder="请输入直系亲属姓名" v-decorator="['relNam', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="直系亲属电话号码">
          <a-input placeholder="请输入直系亲属电话号码" v-decorator="['relTel', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="前公司中文全称">
          <a-input placeholder="请输入前公司中文全称" v-decorator="['forecomp', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="前公司部门">
          <a-input placeholder="请输入前公司部门" v-decorator="['foredept', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="前公司职务">
          <a-input placeholder="请输入前公司职务" v-decorator="['forejob', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="前公司电话">
          <a-input placeholder="请输入前公司电话" v-decorator="['forebusi', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="前公司收入">
          <a-input placeholder="请输入前公司收入" v-decorator="['foreann', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="前公司工龄">
          <a-input placeholder="请输入前公司工龄" v-decorator="['yrForecom', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="配偶姓名">
          <a-input placeholder="请输入配偶姓名" v-decorator="['spuNam', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="配偶电话号码">
          <a-input placeholder="请输入配偶电话号码" v-decorator="['spuTel', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="姓名">
          <a-input placeholder="请输入姓名" v-decorator="['surname', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="称谓">
          <a-input placeholder="请输入称谓" v-decorator="['xtitle', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="能否工作时间联系">
          <a-input placeholder="请输入能否工作时间联系" v-decorator="['workCalls', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="配偶工龄">
          <a-input placeholder="请输入配偶工龄" v-decorator="['yrInCom2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="个人工龄">
          <a-input placeholder="请输入个人工龄" v-decorator="['yrInComp', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="居住年数">
          <a-input placeholder="请输入居住年数" v-decorator="['yrThere', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="配偶手机号码">
          <a-input placeholder="请输入配偶手机号码" v-decorator="['spuMobile', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="月租金额/月还款额">
          <a-input placeholder="请输入月租金额/月还款额" v-decorator="['homeLoan', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="联系人1手机">
          <a-input placeholder="请输入联系人1手机" v-decorator="['conMo1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="联系人2手机">
          <a-input placeholder="请输入联系人2手机" v-decorator="['conMo2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="直系亲属手机">
          <a-input placeholder="请输入直系亲属手机" v-decorator="['relMobile', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="职务/岗位">
          <a-input placeholder="请输入职务/岗位" v-decorator="['intTaxcod', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="身份核查结果">
          <a-input placeholder="请输入身份核查结果" v-decorator="['idVerify', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否留存身份证复印件">
          <a-input placeholder="请输入是否留存身份证复印件" v-decorator="['idcpYn', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="核实结果">
          <a-input placeholder="请输入核实结果" v-decorator="['ivRst', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="无法核实原因">
          <a-input placeholder="请输入无法核实原因" v-decorator="['ivRsn', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="处置方法">
          <a-input placeholder="请输入处置方法" v-decorator="['ivDispo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="身份证件有效期">
          <a-input placeholder="请输入身份证件有效期" v-decorator="['idExpdt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户预留问题">
          <a-input placeholder="请输入客户预留问题" v-decorator="['question', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户预留问题答案">
          <a-input placeholder="请输入客户预留问题答案" v-decorator="['answer', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="催收评分">
          <a-input placeholder="请输入催收评分" v-decorator="['octScore', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="国籍细分代码">
          <a-input placeholder="请输入国籍细分代码" v-decorator="['nationCd', {}]" />
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
    name: "KhzlbModal",
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
        dtnum:{rules: [{ required: true, message: '请输入天入库表编号-对不同的表名唯一!' }]},
        },
        url: {
          add: "/khzlb/khzlb/add",
          edit: "/khzlb/khzlb/edit",
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
          this.form.setFieldsValue(pick(this.model,'custrNbr','securNbr','nation','busiPhone','carDate','carId','carNam','carCode','classCode','compName','conNam1','conNam2','conTel1','conTel2','contrNam1','contrNam2','contrNam3','contrNam4','contrNam5','contrTel1','contrTel2','credLimit','credlimX','dayBirth','dependents','educa','emailAddr','emplyDept','emplyNbr','extension','gender','homeCode','homePhone','incomeAn2','incomeAnn','incomeSr2','incomeSrc','irdN','langCode','mailCode','marStatus','moPhone','mpLimit','mthrMname','occCatgry','occCode','posnEmply','raceCode','relNam','relTel','forecomp','foredept','forejob','forebusi','foreann','yrForecom','spuNam','spuTel','surname','xtitle','workCalls','yrInCom2','yrInComp','yrThere','spuMobile','homeLoan','conMo1','conMo2','relMobile','intTaxcod','idVerify','idcpYn','ivRst','ivRsn','ivDispo','idExpdt','question','answer','octScore','nationCd','sdate','edate','loadDate','legalNo','dtnum'))
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