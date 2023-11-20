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
          label="成立日期">
          <a-input placeholder="请输入成立日期" v-decorator="['createDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="标注地址,证件标注地,证件标注地址,注册地址">
          <a-input placeholder="请输入标注地址,证件标注地,证件标注地址,注册地址" v-decorator="['ctfcAddr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="颁发单位,登记机关,发证机构,发证机关,发证税务机关,认证机构">
          <a-input placeholder="请输入颁发单位,登记机关,发证机构,发证机关,发证税务机关,认证机构" v-decorator="['ctfcAwardDept', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="证件号码">
          <a-input placeholder="请输入证件号码" v-decorator="['ctfcCd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="年检日期">
          <a-input placeholder="请输入年检日期" v-decorator="['ctfcCheckDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="年检结果(是否有效),是否年检,证件类型">
          <a-input placeholder="请输入年检结果(是否有效),是否年检,证件类型" v-decorator="['ctfcCheckState', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="登记号,经营范围(66*3),实际住址,证件描述(66*3),主营范围(66*3)">
          <a-input placeholder="请输入登记号,经营范围(66*3),实际住址,证件描述(66*3),主营范围(66*3)" v-decorator="['ctfcDesc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="兼营范围(66*3),经营方式,凭证号">
          <a-input placeholder="请输入兼营范围(66*3),经营方式,凭证号" v-decorator="['ctfcDesc1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="经营到期日期,失效日期,证件年检日期">
          <a-input placeholder="请输入经营到期日期,失效日期,证件年检日期" v-decorator="['ctfcEndDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="流水编号">
          <a-input placeholder="请输入流水编号" v-decorator="['ctfcId', validatorRules.ctfcId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="注册类型">
          <a-input placeholder="请输入注册类型" v-decorator="['ctfcLoginType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="证件类型">
          <a-input placeholder="请输入证件类型" v-decorator="['ctfcName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="证书名称">
          <a-input placeholder="请输入证书名称" v-decorator="['ctfcOthCd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="实收资本">
          <a-input placeholder="请输入实收资本" v-decorator="['ctfcPaiupSum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款卡密码">
          <a-input placeholder="请输入贷款卡密码" v-decorator="['ctfcPassword', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="注册资本">
          <a-input placeholder="请输入注册资本" v-decorator="['ctfcRegSum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="登记日期,发证日期,经营起始日期,生效日期">
          <a-input placeholder="请输入登记日期,发证日期,经营起始日期,生效日期" v-decorator="['ctfcStartDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款卡状态,证件级别,资质等级">
          <a-input placeholder="请输入贷款卡状态,证件级别,资质等级" v-decorator="['ctfcState', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="经营期限,有效年限,证件有效期">
          <a-input placeholder="请输入经营期限,有效年限,证件有效期" v-decorator="['ctfcTerm', {}]" />
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
          label="有/无期限">
          <a-input placeholder="请输入有/无期限" v-decorator="['hasCtfcTerm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否为注册证件">
          <a-input placeholder="请输入是否为注册证件" v-decorator="['register', {}]" />
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
          label="调查人">
          <a-input placeholder="请输入调查人" v-decorator="['checkId', {}]" />
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
          label="暂末用">
          <a-input placeholder="请输入暂末用" v-decorator="['principal', {}]" />
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
          label="照片路径">
          <a-input placeholder="请输入照片路径" v-decorator="['photo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="年检时间">
          <a-input placeholder="请输入年检时间" v-decorator="['ctfccdate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否有效">
          <a-input placeholder="请输入是否有效" v-decorator="['isEnabled', {}]" />
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
    name: "KhzjxxModal",
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
        ctfcId:{rules: [{ required: true, message: '请输入流水编号!' }]},
        dtnum:{rules: [{ required: true, message: '请输入天入库表编号-对不同的表名唯一!' }]},
        },
        url: {
          add: "/khzjxx/khzjxx/add",
          edit: "/khzjxx/khzjxx/edit",
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
          this.form.setFieldsValue(pick(this.model,'dataFlag','createDate','ctfcAddr','ctfcAwardDept','ctfcCd','ctfcCheckDate','ctfcCheckState','ctfcDesc','ctfcDesc1','ctfcEndDate','ctfcId','ctfcLoginType','ctfcName','ctfcOthCd','ctfcPaiupSum','ctfcPassword','ctfcRegSum','ctfcStartDate','ctfcState','ctfcTerm','custId','hasCtfcTerm','register','remark','checkId','inputDate','updateDate','principal','gender','photo','ctfccdate','isEnabled','sDate','eDate','loadDate','legalNo','dtnum'))
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