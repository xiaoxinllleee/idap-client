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
          label="序号">
          <a-input placeholder="请输入序号" v-decorator="['xh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="市州">
          <a-input placeholder="请输入市州" v-decorator="['sz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="农商银行">
          <a-input placeholder="请输入农商银行" v-decorator="['nsyh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="网点（支行）">
          <a-input placeholder="请输入网点（支行）" v-decorator="['wd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="户名">
          <a-input placeholder="请输入户名" v-decorator="['hm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="证件号码">
          <a-input placeholder="请输入证件号码" v-decorator="['zjhm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款账号">
          <a-input placeholder="请输入贷款账号" v-decorator="['dkzh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="借款日期">
          <a-input placeholder="请输入借款日期" v-decorator="['jkrq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="到期日期">
          <a-input placeholder="请输入到期日期" v-decorator="['dqrq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款期限（月）">
          <a-input placeholder="请输入贷款期限（月）" v-decorator="['dkqx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款余额">
          <a-input placeholder="请输入贷款余额" v-decorator="['dkye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="担保方式">
          <a-input placeholder="请输入担保方式" v-decorator="['dbfs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="第一责任人">
          <a-input placeholder="请输入第一责任人" v-decorator="['dyzrr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户类型">
          <a-input placeholder="请输入客户类型" v-decorator="['khlx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款投向">
          <a-input placeholder="请输入贷款投向" v-decorator="['dktx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款形态">
          <a-input placeholder="请输入贷款形态" v-decorator="['dkxt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款类型">
          <a-input placeholder="请输入贷款类型" v-decorator="['dklx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="利率（%）">
          <a-input placeholder="请输入利率（%）" v-decorator="['ll', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="还款期限（月/季/年）">
          <a-input placeholder="请输入还款期限（月/季/年）" v-decorator="['hkqx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="观察期贷款">
          <a-input placeholder="请输入观察期贷款" v-decorator="['gcqdk', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="模拟观察期形态">
          <a-input placeholder="请输入模拟观察期形态" v-decorator="['mngcqxt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="出不良日期">
          <a-input placeholder="请输入出不良日期" v-decorator="['cblrq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="观察期到期日">
          <a-input placeholder="请输入观察期到期日" v-decorator="['gcqdqr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否属于调减利息">
          <a-input placeholder="请输入是否属于调减利息" v-decorator="['sfsytjlx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="利息调整前">
          <a-input placeholder="请输入利息调整前" v-decorator="['lxtzq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="利息调整后">
          <a-input placeholder="请输入利息调整后" v-decorator="['lxtzh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="一年或两个还款周期内累计调减利息额度">
          <a-input placeholder="请输入一年或两个还款周期内累计调减利息额度" v-decorator="['ljtjlxed', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="一年或两个还款周期内累计调减利息次数">
          <a-input placeholder="请输入一年或两个还款周期内累计调减利息次数" v-decorator="['ljtjlxcs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="利息调减日期">
          <a-input placeholder="请输入利息调减日期" v-decorator="['lxtjrq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="预计退出日期">
          <a-input placeholder="请输入预计退出日期" v-decorator="['yqtcrq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否属于延期付息">
          <a-input placeholder="请输入是否属于延期付息" v-decorator="['sfsyyqfx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="延期付息日期">
          <a-input placeholder="请输入延期付息日期" v-decorator="['yqfxrq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="延期付息天数">
          <a-input placeholder="请输入延期付息天数" v-decorator="['yqfxts', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="延期到期后欠本日期">
          <a-input placeholder="请输入延期到期后欠本日期" v-decorator="['yqdqhqbrq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="延期到期后欠息日期">
          <a-input placeholder="请输入延期到期后欠息日期" v-decorator="['yqdqhqxrq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否属于低息贷款">
          <a-input placeholder="请输入是否属于低息贷款" v-decorator="['sfsydxdk', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否属于一户多形态">
          <a-input placeholder="请输入是否属于一户多形态" v-decorator="['sfsyyhdxt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本人表外不良贷款余额">
          <a-input placeholder="请输入本人表外不良贷款余额" v-decorator="['brbwbldkye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本人表外不良贷款归属机构">
          <a-input placeholder="请输入本人表外不良贷款归属机构" v-decorator="['brbwbldkgsjg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本人表内不良贷款余额">
          <a-input placeholder="请输入本人表内不良贷款余额" v-decorator="['brbnbldkye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本人表内不良贷款归属机构">
          <a-input placeholder="请输入本人表内不良贷款归属机构" v-decorator="['brbnbldkgsjg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="配偶表外不良贷款余额">
          <a-input placeholder="请输入配偶表外不良贷款余额" v-decorator="['pobwbldkye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="配偶表外不良贷款归属机构">
          <a-input placeholder="请输入配偶表外不良贷款归属机构" v-decorator="['pobwbldkgsjg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="配偶表内不良贷款余额">
          <a-input placeholder="请输入配偶表内不良贷款余额" v-decorator="['pobnbldkye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="配偶表内不良贷款归属机构">
          <a-input placeholder="请输入配偶表内不良贷款归属机构" v-decorator="['pobnbldkgsjg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否逾期贷款">
          <a-input placeholder="请输入是否逾期贷款" v-decorator="['sfyqdk', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="逾期天数">
          <a-input placeholder="请输入逾期天数" v-decorator="['yqts', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="数据日期">
          <a-input placeholder="请输入数据日期" v-decorator="['sjrq', {}]" />
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
    name: "DkjkptXdlfxzctzModal",
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
          add: "/dkjkptxdlfxzctz/dkjkptXdlfxzctz/add",
          edit: "/dkjkptxdlfxzctz/dkjkptXdlfxzctz/edit",
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
          this.form.setFieldsValue(pick(this.model,'xh','sz','nsyh','wd','hm','zjhm','dkzh','jkrq','dqrq','dkqx','dkye','dbfs','dyzrr','khlx','dktx','dkxt','dklx','ll','hkqx','gcqdk','mngcqxt','cblrq','gcqdqr','sfsytjlx','lxtzq','lxtzh','ljtjlxed','ljtjlxcs','lxtjrq','yqtcrq','sfsyyqfx','yqfxrq','yqfxts','yqdqhqbrq','yqdqhqxrq','sfsydxdk','sfsyyhdxt','brbwbldkye','brbwbldkgsjg','brbnbldkye','brbnbldkgsjg','pobwbldkye','pobwbldkgsjg','pobnbldkye','pobnbldkgsjg','sfyqdk','yqts','sjrq'))
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