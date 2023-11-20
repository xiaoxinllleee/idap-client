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
          label="数据日期">
          <a-date-picker v-decorator="[ 'sjrq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户姓名">
          <a-input placeholder="请输入客户姓名" v-decorator="['khxm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户身份证号码">
          <a-input placeholder="请输入客户身份证号码" v-decorator="['khsfzhm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="额度">
          <a-input placeholder="请输入额度" v-decorator="['ey', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="基点">
          <a-input placeholder="请输入基点" v-decorator="['jd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="授信期限(月)">
          <a-input placeholder="请输入授信期限(月)" v-decorator="['sxqx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户分群">
          <a-input placeholder="请输入客户分群" v-decorator="['khfq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户经理工号">
          <a-input placeholder="请输入客户经理工号" v-decorator="['khljgh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="调查责任人一工号">
          <a-input placeholder="请输入调查责任人一工号" v-decorator="['dczrrgh1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="调查责任人一比例">
          <a-input placeholder="请输入调查责任人一比例" v-decorator="['dczrrbl1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="调查责任人二工号">
          <a-input placeholder="请输入调查责任人二工号" v-decorator="['dczrrgh2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="调查责任人二比例">
          <a-input placeholder="请输入调查责任人二比例" v-decorator="['dczrrbl2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="管理责任人工号">
          <a-input placeholder="请输入管理责任人工号" v-decorator="['glzrrgh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="管理责任人比例">
          <a-input placeholder="请输入管理责任人比例" v-decorator="['glzrrbl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="审查责任人工号">
          <a-input placeholder="请输入审查责任人工号" v-decorator="['sczrrgh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="审查责任人比例">
          <a-input placeholder="请输入审查责任人比例" v-decorator="['sczrrbl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最终审批责任人工号">
          <a-input placeholder="请输入最终审批责任人工号" v-decorator="['zzspzrrgh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最终审批责任人比例">
          <a-input placeholder="请输入最终审批责任人比例" v-decorator="['zzspzrrbl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="第一责任人工号">
          <a-input placeholder="请输入第一责任人工号" v-decorator="['dyzrrgh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="第一责任人比例">
          <a-input placeholder="请输入第一责任人比例" v-decorator="['dyzrrbl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="民族">
          <a-input placeholder="请输入民族" v-decorator="['mz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户类型1">
          <a-input placeholder="请输入客户类型1" v-decorator="['khlx1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户类型2">
          <a-input placeholder="请输入客户类型2" v-decorator="['khlx2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="乡镇">
          <a-input placeholder="请输入乡镇" v-decorator="['xz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="有无子女">
          <a-input placeholder="请输入有无子女" v-decorator="['ywzn', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="健康状况">
          <a-input placeholder="请输入健康状况" v-decorator="['jkzk', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="婚姻状况">
          <a-input placeholder="请输入婚姻状况" v-decorator="['hyzk', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="配偶身份证号码">
          <a-input placeholder="请输入配偶身份证号码" v-decorator="['posfzhm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="家庭人口">
          <a-input placeholder="请输入家庭人口" v-decorator="['jtrk', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="居住年限">
          <a-input placeholder="请输入居住年限" v-decorator="['jznx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="居住状况">
          <a-input placeholder="请输入居住状况" v-decorator="['jzzk', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最高学历">
          <a-input placeholder="请输入最高学历" v-decorator="['zgxl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="常住地址">
          <a-input placeholder="请输入常住地址" v-decorator="['czdz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="通讯地址">
          <a-input placeholder="请输入通讯地址" v-decorator="['txdz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="行政区划代码">
          <a-input placeholder="请输入行政区划代码" v-decorator="['xzqhdm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="住地邮政编码">
          <a-input placeholder="请输入住地邮政编码" v-decorator="['zdyzbm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="手机号码">
          <a-input placeholder="请输入手机号码" v-decorator="['sjhm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否户主">
          <a-input placeholder="请输入是否户主" v-decorator="['sfhz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否发送短信提醒">
          <a-input placeholder="请输入是否发送短信提醒" v-decorator="['sffsdxtx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="现工资单位">
          <a-input placeholder="请输入现工资单位" v-decorator="['xgzdw', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="现担任职务">
          <a-input placeholder="请输入现担任职务" v-decorator="['xdrzw', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="行业">
          <a-input placeholder="请输入行业" v-decorator="['hy', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="经营情况是否正常">
          <a-input placeholder="请输入经营情况是否正常" v-decorator="['jyqksfzc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="产品市场需求情况">
          <a-input placeholder="请输入产品市场需求情况" v-decorator="['cpscxqqk', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="借款人还款意愿">
          <a-input placeholder="请输入借款人还款意愿" v-decorator="['jkrhkyy', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="职业">
          <a-input placeholder="请输入职业" v-decorator="['zy', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="职称">
          <a-input placeholder="请输入职称" v-decorator="['zc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="从业年限">
          <a-input placeholder="请输入从业年限" v-decorator="['cxnx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="综合评价标志">
          <a-input placeholder="请输入综合评价标志" v-decorator="['zhpjbz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="个体工商户名称">
          <a-input placeholder="请输入个体工商户名称" v-decorator="['gtgshmc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="统一社会信用代码">
          <a-input placeholder="请输入统一社会信用代码" v-decorator="['tyshxydm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="家庭年收入">
          <a-input placeholder="请输入家庭年收入" v-decorator="['jtnsr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="个人年收入">
          <a-input placeholder="请输入个人年收入" v-decorator="['grnsr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="循环标志">
          <a-input placeholder="请输入循环标志" v-decorator="['xhbz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="信用等级">
          <a-input placeholder="请输入信用等级" v-decorator="['xydj', {}]" />
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
    name: "TjfxHnkdModal",
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
        },
        url: {
          add: "/tjfxHnkd/tjfxHnkd/add",
          edit: "/tjfxHnkd/tjfxHnkd/edit",
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
          this.form.setFieldsValue(pick(this.model,'khxm','khsfzhm','ey','jd','sxqx','khfq','khljgh','dczrrgh1','dczrrbl1','dczrrgh2','dczrrbl2','glzrrgh','glzrrbl','sczrrgh','sczrrbl','zzspzrrgh','zzspzrrbl','dyzrrgh','dyzrrbl','mz','khlx1','khlx2','xz','ywzn','jkzk','hyzk','posfzhm','jtrk','jznx','jzzk','zgxl','czdz','txdz','xzqhdm','zdyzbm','sjhm','sfhz','sffsdxtx','xgzdw','xdrzw','hy','jyqksfzc','cpscxqqk','jkrhkyy','zy','zc','cxnx','zhpjbz','gtgshmc','tyshxydm','jtnsr','grnsr','xhbz','xydj'))
		  //时间格式化
          this.form.setFieldsValue({sjrq:this.model.sjrq?moment(this.model.sjrq):null})
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
            formData.sjrq = formData.sjrq?formData.sjrq.format():null;
            
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