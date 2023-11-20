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
          label="是否与政府合作">
          <a-input placeholder="请输入是否与政府合作" v-decorator="['budgetType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="主管部门">
          <a-input placeholder="请输入主管部门" v-decorator="['changeDepartment', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="法人ID">
          <a-input placeholder="请输入法人ID" v-decorator="['corpId', {}]" />
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
          label="担保金额销售额">
          <a-input placeholder="请输入担保金额销售额" v-decorator="['dbValue', {}]" />
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
          label="描述3(担保机构经营许可证号)">
          <a-input placeholder="请输入描述3(担保机构经营许可证号)" v-decorator="['describe3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="财务部联系方式">
          <a-input placeholder="请输入财务部联系方式" v-decorator="['describe4', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="企业所在地">
          <a-input placeholder="请输入企业所在地" v-decorator="['districtBelong', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="经济性质">
          <a-input placeholder="请输入经济性质" v-decorator="['economyType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="公司邮箱">
          <a-input placeholder="请输入公司邮箱" v-decorator="['emailAddr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="职工人数">
          <a-input placeholder="请输入职工人数" v-decorator="['employeeNumber', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="主键流水号">
          <a-input placeholder="请输入主键流水号" v-decorator="['entInfoId', validatorRules.entInfoId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否集团标志">
          <a-input placeholder="请输入是否集团标志" v-decorator="['enterpriseBelong', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="财务主管">
          <a-input placeholder="请输入财务主管" v-decorator="['financManger', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="报表类型">
          <a-input placeholder="请输入报表类型" v-decorator="['financeBelong', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="报表时间间隔">
          <a-input placeholder="请输入报表时间间隔" v-decorator="['financeUpType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="进出口资格">
          <a-input placeholder="请输入进出口资格" v-decorator="['hasIeRight', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="所属行业">
          <a-input placeholder="请输入所属行业" v-decorator="['industryType', {}]" />
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
          label="是否授权">
          <a-input placeholder="请输入是否授权" v-decorator="['isAccredit', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="基本帐户开户行">
          <a-input placeholder="请输入基本帐户开户行" v-decorator="['isBaseAccount', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否法人资格">
          <a-input placeholder="请输入是否法人资格" v-decorator="['isCorp', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否担保企业">
          <a-input placeholder="请输入是否担保企业" v-decorator="['isDb', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="董事会">
          <a-input placeholder="请输入董事会" v-decorator="['isDirectorate', {}]" />
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
          label="法人担任职务">
          <a-input placeholder="请输入法人担任职务" v-decorator="['juriDuty', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="法人是否我行高管">
          <a-input placeholder="请输入法人是否我行高管" v-decorator="['juriIsHighManager', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="法人联系电话">
          <a-input placeholder="请输入法人联系电话" v-decorator="['juriPhone', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="法律责任形式">
          <a-input placeholder="请输入法律责任形式" v-decorator="['legalDutyType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否上市公司">
          <a-input placeholder="请输入是否上市公司" v-decorator="['listingCorpOrNot', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="经营范围及主要产品">
          <a-input placeholder="请输入经营范围及主要产品" v-decorator="['mainProduction', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="市场前景">
          <a-input placeholder="请输入市场前景" v-decorator="['marketForeground', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="高新技术企业">
          <a-input placeholder="请输入高新技术企业" v-decorator="['newTechCorpOrNot', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="办公地址">
          <a-input placeholder="请输入办公地址" v-decorator="['officeAddr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="传真号码">
          <a-input placeholder="请输入传真号码" v-decorator="['officeTax', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="联系电话">
          <a-input placeholder="请输入联系电话" v-decorator="['officeTel', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="邮政编码">
          <a-input placeholder="请输入邮政编码" v-decorator="['officeZip', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="开户许可证号">
          <a-input placeholder="请输入开户许可证号" v-decorator="['openLicense', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="组织形式">
          <a-input placeholder="请输入组织形式" v-decorator="['orgType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="实收资本">
          <a-input placeholder="请输入实收资本" v-decorator="['paicalUpCaptial', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="实收资本币种">
          <a-input placeholder="请输入实收资本币种" v-decorator="['pcCurrency', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="注册资本币种">
          <a-input placeholder="请输入注册资本币种" v-decorator="['rcCurrency', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="所在的行政区域代码">
          <a-input placeholder="请输入所在的行政区域代码" v-decorator="['regionCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="注册地址">
          <a-input placeholder="请输入注册地址" v-decorator="['registerAddr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="注册资本">
          <a-input placeholder="请输入注册资本" v-decorator="['registerCaptial', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="离退休人数">
          <a-input placeholder="请输入离退休人数" v-decorator="['retireeNumber', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="主导产品">
          <a-input placeholder="请输入主导产品" v-decorator="['saleMainProduct', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="销售情况">
          <a-input placeholder="请输入销售情况" v-decorator="['saleThing', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="企业规模">
          <a-input placeholder="请输入企业规模" v-decorator="['scopy', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="省联社所有制/商行性质分类">
          <a-input placeholder="请输入省联社所有制/商行性质分类" v-decorator="['slxHavSystem', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="省联社标准/商行行业分类">
          <a-input placeholder="请输入省联社标准/商行行业分类" v-decorator="['slxStandard', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="技术人员人数">
          <a-input placeholder="请输入技术人员人数" v-decorator="['technicianNumber', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="公司网站">
          <a-input placeholder="请输入公司网站" v-decorator="['webAddr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="资产总额">
          <a-input placeholder="请输入资产总额" v-decorator="['zcValue', {}]" />
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
          label="更新日期">
          <a-input placeholder="请输入更新日期" v-decorator="['updateDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="财务管理人员ID">
          <a-input placeholder="请输入财务管理人员ID" v-decorator="['financMangerId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="基本帐户开户行">
          <a-input placeholder="请输入基本帐户开户行" v-decorator="['baseAccountBank', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否市辖区">
          <a-input placeholder="请输入是否市辖区" v-decorator="['isCantonal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否龙头企业">
          <a-input placeholder="请输入是否龙头企业" v-decorator="['isLongtou', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="龙头企业级别">
          <a-input placeholder="请输入龙头企业级别" v-decorator="['longtouJibie', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构号">
          <a-input placeholder="请输入机构号" v-decorator="['deptId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="操作员号">
          <a-input placeholder="请输入操作员号" v-decorator="['userId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="行业规模1">
          <a-input placeholder="请输入行业规模1" v-decorator="['scopy1', {}]" />
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
          label="是否劳动密集性">
          <a-input placeholder="请输入是否劳动密集性" v-decorator="['isWorkDense', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="公司类客户级别">
          <a-input placeholder="请输入公司类客户级别" v-decorator="['entCustClass', {}]" />
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
		
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "QyjbxxModal",
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
        entInfoId:{rules: [{ required: true, message: '请输入主键流水号!' }]},
        dtnum:{rules: [{ required: true, message: '请输入天入库表编号-对不同的表名唯一!' }]},
        },
        url: {
          add: "/qyjbxx/qyjbxx/add",
          edit: "/qyjbxx/qyjbxx/edit",
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
          this.form.setFieldsValue(pick(this.model,'dataFlag','budgetType','changeDepartment','corpId','custId','dbValue','describe1','describe2','describe3','describe4','districtBelong','economyType','emailAddr','employeeNumber','entInfoId','enterpriseBelong','financManger','financeBelong','financeUpType','hasIeRight','industryType','industryType1','industryType2','industryType3','isAccredit','isBaseAccount','isCorp','isDb','isDirectorate','isSh','juriDuty','juriIsHighManager','juriPhone','legalDutyType','listingCorpOrNot','mainProduction','marketForeground','newTechCorpOrNot','officeAddr','officeTax','officeTel','officeZip','openLicense','orgType','paicalUpCaptial','pcCurrency','rcCurrency','regionCode','registerAddr','registerCaptial','retireeNumber','saleMainProduct','saleThing','scopy','slxHavSystem','slxStandard','technicianNumber','webAddr','zcValue','inputDate','updateDate','financMangerId','baseAccountBank','isCantonal','isLongtou','longtouJibie','deptId','userId','scopy1','isSendMess','isWorkDense','entCustClass','sDate','eDate','loadDate','legalNo','dtnum'))
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