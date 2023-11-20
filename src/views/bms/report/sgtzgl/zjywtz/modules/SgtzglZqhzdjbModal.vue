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
          label="会计日期">
          <a-input placeholder="请输入会计日期" v-decorator="['fiscalDate', validatorRules.fiscalDate ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="申请编号">
          <a-input placeholder="请输入申请编号" v-decorator="['sqbh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="内部账号">
          <a-input placeholder="请输入内部账号" v-decorator="['nbzh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="成交编号">
          <a-input placeholder="请输入成交编号" v-decorator="['cjbh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="品种">
          <a-input placeholder="请输入品种" v-decorator="['pz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="债券（存单）代码">
          <a-input placeholder="请输入债券（存单）代码" v-decorator="['dm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="债券（存单）简称">
          <a-input placeholder="请输入债券（存单）简称" v-decorator="['jc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发行主体">
          <a-input placeholder="请输入发行主体" v-decorator="['fxzt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否含权">
          <a-input placeholder="请输入是否含权" v-decorator="['sfhq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="期限">
          <a-input placeholder="请输入期限" v-decorator="['qx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="起息日">
          <a-input placeholder="请输入起息日" v-decorator="['qxr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="到期日">
          <a-input placeholder="请输入到期日" v-decorator="['dqx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="起息日">
          <a-input placeholder="请输入起息日" v-decorator="['qxr1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="到期日">
          <a-input placeholder="请输入到期日" v-decorator="['dqx1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="计息方式">
          <a-input placeholder="请输入计息方式" v-decorator="['jxfss', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="结息方式">
          <a-input placeholder="请输入结息方式" v-decorator="['jxfs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="买入时主体评级">
          <a-input placeholder="请输入买入时主体评级" v-decorator="['mrsztpj', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="买入时债项评级">
          <a-input placeholder="请输入买入时债项评级" v-decorator="['mrszxpj', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="购入日">
          <a-input placeholder="请输入购入日" v-decorator="['grr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="购入日">
          <a-input placeholder="请输入购入日" v-decorator="['grr1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="券面总额(元)">
          <a-input placeholder="请输入券面总额(元)" v-decorator="['qmze', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="券面总额(万元)">
          <a-input placeholder="请输入券面总额(万元)" v-decorator="['qmze1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="首次应计利息(元)">
          <a-input placeholder="请输入首次应计利息(元)" v-decorator="['scyjlx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="初始购入全价（元/百元）">
          <a-input placeholder="请输入初始购入全价（元/百元）" v-decorator="['csgrqj', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="初始购入净价（元/百元）">
          <a-input placeholder="请输入初始购入净价（元/百元）" v-decorator="['csgrjj', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="持有至到期收益率（%）">
          <a-input placeholder="请输入持有至到期收益率（%）" v-decorator="['cyzdqsyl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易类型">
          <a-input placeholder="请输入交易类型" v-decorator="['jylx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易对手">
          <a-input placeholder="请输入交易对手" v-decorator="['jyds', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="金融资产分类">
          <a-input placeholder="请输入金融资产分类" v-decorator="['jrzcfl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账面余额">
          <a-input placeholder="请输入账面余额" v-decorator="['zmye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账面价值">
          <a-input placeholder="请输入账面价值" v-decorator="['zmjz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="含减值余额">
          <a-input placeholder="请输入含减值余额" v-decorator="['hjzye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="含减值余额（万元）">
          <a-input placeholder="请输入含减值余额（万元）" v-decorator="['hjzyewy', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="剩余面值">
          <a-input placeholder="请输入剩余面值" v-decorator="['symz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="公允价值变动余额（元）">
          <a-input placeholder="请输入公允价值变动余额（元）" v-decorator="['gyjzbdye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="利息调整余额(元)">
          <a-input placeholder="请输入利息调整余额(元)" v-decorator="['lxtzye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="应收利息余额（元）">
          <a-input placeholder="请输入应收利息余额（元）" v-decorator="['yslxye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="减值准备(元)">
          <a-input placeholder="请输入减值准备(元)" v-decorator="['jzzb', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当期票面（%）">
          <a-input placeholder="请输入当期票面（%）" v-decorator="['dqpm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="剩余年限">
          <a-input placeholder="请输入剩余年限" v-decorator="['synx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="剩余月限">
          <a-input placeholder="请输入剩余月限" v-decorator="['syyx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="剩余天数">
          <a-input placeholder="请输入剩余天数" v-decorator="['syts', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="实时主体评级">
          <a-input placeholder="请输入实时主体评级" v-decorator="['ssztpj', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="实时债项评级">
          <a-input placeholder="请输入实时债项评级" v-decorator="['sszxpj', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="净价估值（元/百元）">
          <a-input placeholder="请输入净价估值（元/百元）" v-decorator="['jjgz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="估值市值">
          <a-input placeholder="请输入估值市值" v-decorator="['gzsz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="浮动盈亏（元）">
          <a-input placeholder="请输入浮动盈亏（元）" v-decorator="['fdyk', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="浮动盈亏（万元）">
          <a-input placeholder="请输入浮动盈亏（万元）" v-decorator="['fdykwy', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="浮动盈亏比例（%）">
          <a-input placeholder="请输入浮动盈亏比例（%）" v-decorator="['fdykbl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="部分卖出金额(元)">
          <a-input placeholder="请输入部分卖出金额(元)" v-decorator="['bfmcje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="部分卖出利息(元)">
          <a-input placeholder="请输入部分卖出利息(元)" v-decorator="['bfmclx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="累计结息金额(元)">
          <a-input placeholder="请输入累计结息金额(元)" v-decorator="['ljjxje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务状态">
          <a-input placeholder="请输入业务状态" v-decorator="['ywzt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="五级分类">
          <a-input placeholder="请输入五级分类" v-decorator="['wjfl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="特殊标识">
          <a-input placeholder="请输入特殊标识" v-decorator="['tsbz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="投组">
          <a-input placeholder="请输入投组" v-decorator="['tz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="托管机构">
          <a-input placeholder="请输入托管机构" v-decorator="['tgjg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构号">
          <a-input placeholder="请输入机构号" v-decorator="['jgh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构名称">
          <a-input placeholder="请输入机构名称" v-decorator="['jgmc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="实收利息(元)">
          <a-input placeholder="请输入实收利息(元)" v-decorator="['sslx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="资产等级">
          <a-input placeholder="请输入资产等级" v-decorator="['zcdj', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="序号">
          <a-input placeholder="请输入序号" v-decorator="['xh', {}]" />
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
    name: "SgtzglZqhzdjbModal",
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
        fiscalDate:{rules: [{ required: true, message: '请输入会计日期!' }]},
        },
        url: {
          add: "/Zqhzdjb/sgtzglZqhzdjb/add",
          edit: "/Zqhzdjb/sgtzglZqhzdjb/edit",
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
          this.form.setFieldsValue(pick(this.model,'fiscalDate','sqbh','nbzh','cjbh','pz','dm','jc','fxzt','sfhq','qx','qxr','dqx','qxr1','dqx1','jxfss','jxfs','mrsztpj','mrszxpj','grr','grr1','qmze','qmze1','scyjlx','csgrqj','csgrjj','cyzdqsyl','jylx','jyds','jrzcfl','zmye','zmjz','hjzye','hjzyewy','symz','gyjzbdye','lxtzye','yslxye','jzzb','dqpm','synx','syyx','syts','ssztpj','sszxpj','jjgz','gzsz','fdyk','fdykwy','fdykbl','bfmcje','bfmclx','ljjxje','ywzt','wjfl','tsbz','tz','tgjg','jgh','jgmc','sslx','zcdj','xh'))
		  //时间格式化
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