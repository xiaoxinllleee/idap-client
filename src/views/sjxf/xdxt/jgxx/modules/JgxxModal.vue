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
          label="五级分类流程分支标准">
          <a-input placeholder="请输入五级分类流程分支标准" v-decorator="['fvStd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="对应客户编号">
          <a-input placeholder="请输入对应客户编号" v-decorator="['custId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="综合业务结算代码">
          <a-input placeholder="请输入综合业务结算代码" v-decorator="['deptAcno', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构代码">
          <a-input placeholder="请输入机构代码" v-decorator="['deptCd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="流水编号">
          <a-input placeholder="请输入流水编号" v-decorator="['deptId', validatorRules.deptId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构级别">
          <a-input placeholder="请输入机构级别" v-decorator="['deptLevel', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上级机构机构代码">
          <a-input placeholder="请输入上级机构机构代码" v-decorator="['deptParent', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构类型">
          <a-input placeholder="请输入机构类型" v-decorator="['deptType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="金融机构代码">
          <a-input placeholder="请输入金融机构代码" v-decorator="['finInsCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="金融机构代码名称">
          <a-input placeholder="请输入金融机构代码名称" v-decorator="['finInsName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="金融机构密码">
          <a-input placeholder="请输入金融机构密码" v-decorator="['finInsPwd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否可用">
          <a-input placeholder="请输入是否可用" v-decorator="['isEnabled', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否上报">
          <a-input placeholder="请输入是否上报" v-decorator="['isReport', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构领导编号">
          <a-input placeholder="请输入机构领导编号" v-decorator="['principalId', {}]" />
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
          label="机构电话">
          <a-input placeholder="请输入机构电话" v-decorator="['deptTel', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="金融机构许可证号码">
          <a-input placeholder="请输入金融机构许可证号码" v-decorator="['finInsAdmiNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="营业执照">
          <a-input placeholder="请输入营业执照" v-decorator="['shopCardNo', {}]" />
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
          label="机构地址">
          <a-input placeholder="请输入机构地址" v-decorator="['deptAddr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否办理贷款业务">
          <a-input placeholder="请输入是否办理贷款业务" v-decorator="['isCredit', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="加贷审会审批权限(金额)">
          <a-input placeholder="请输入加贷审会审批权限(金额)" v-decorator="['checkValueOne', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="风险管理委员会审批权限(金额)">
          <a-input placeholder="请输入风险管理委员会审批权限(金额)" v-decorator="['checkValueTwo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贴现权限(金额)">
          <a-input placeholder="请输入贴现权限(金额)" v-decorator="['checkValueThree', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="承兑汇票权限(金额)">
          <a-input placeholder="请输入承兑汇票权限(金额)" v-decorator="['checkValueFour', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="风险管理部权限(金额)">
          <a-input placeholder="请输入风险管理部权限(金额)" v-decorator="['checkValueFive', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务发展部权限(金额)">
          <a-input placeholder="请输入业务发展部权限(金额)" v-decorator="['checkValueSix', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="信贷管理部权限(金额)">
          <a-input placeholder="请输入信贷管理部权限(金额)" v-decorator="['checkValueSeven', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否需要现场照像">
          <a-input placeholder="请输入是否需要现场照像" v-decorator="['isCamera', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款余额上限">
          <a-input placeholder="请输入贷款余额上限" v-decorator="['checkValueEight', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否动态取贷审会成员">
          <a-input placeholder="请输入是否动态取贷审会成员" v-decorator="['isDynamic', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷审会总成员数">
          <a-input placeholder="请输入贷审会总成员数" v-decorator="['examAllNum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷审会动态成员数">
          <a-input placeholder="请输入贷审会动态成员数" v-decorator="['examDynamicNum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否动态取风管会成员">
          <a-input placeholder="请输入是否动态取风管会成员" v-decorator="['isRiskDynamic', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="风管会总成员数">
          <a-input placeholder="请输入风管会总成员数" v-decorator="['riskAllNum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="风管会动态成员数">
          <a-input placeholder="请输入风管会动态成员数" v-decorator="['riskDynamicNum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="正常减值/计提比例">
          <a-input placeholder="请输入正常减值/计提比例" v-decorator="['normalRatio', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="关注减值/计提比例">
          <a-input placeholder="请输入关注减值/计提比例" v-decorator="['concernRatio', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="次级减值/计提比例">
          <a-input placeholder="请输入次级减值/计提比例" v-decorator="['secondaryRatio', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="可疑减值/计提比例">
          <a-input placeholder="请输入可疑减值/计提比例" v-decorator="['supicousRatio', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="损失减值/计提比例">
          <a-input placeholder="请输入损失减值/计提比例" v-decorator="['loseRatio', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="综合计提测算序号">
          <a-input placeholder="请输入综合计提测算序号" v-decorator="['devalueRatioId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="更新日期">
          <a-input placeholder="请输入更新日期" v-decorator="['checkValueNine', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构属性">
          <a-input placeholder="请输入机构属性" v-decorator="['deptAttribute', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构统计属性">
          <a-input placeholder="请输入机构统计属性" v-decorator="['deptCount', {}]" />
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
    name: "JgxxModal",
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
        deptId:{rules: [{ required: true, message: '请输入流水编号!' }]},
        dtnum:{rules: [{ required: true, message: '请输入天入库表编号-对不同的表名唯一!' }]},
        },
        url: {
          add: "/jgxx/jgxx/add",
          edit: "/jgxx/jgxx/edit",
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
          this.form.setFieldsValue(pick(this.model,'dataFlag','fvStd','custId','deptAcno','deptCd','deptId','deptLevel','deptParent','deptType','finInsCode','finInsName','finInsPwd','isEnabled','isReport','principalId','remark','inputDate','updateDate','deptTel','finInsAdmiNo','shopCardNo','isCantonal','deptAddr','isCredit','checkValueOne','checkValueTwo','checkValueThree','checkValueFour','checkValueFive','checkValueSix','checkValueSeven','isCamera','checkValueEight','isDynamic','examAllNum','examDynamicNum','isRiskDynamic','riskAllNum','riskDynamicNum','normalRatio','concernRatio','secondaryRatio','supicousRatio','loseRatio','devalueRatioId','checkValueNine','deptAttribute','deptCount','sDate','eDate','loadDate','dtnum'))
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