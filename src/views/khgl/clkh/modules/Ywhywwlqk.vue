<template>
  <a-card class="card" :bordered="false">
    <!--<a-list-item class="DefaultListItem" term="存贷款情况">存贷款情况</a-list-item>-->
    <a-divider orientation="left" style="color: #1890FF; margin-top: 0px;">存贷款情况</a-divider>
    <a-row class="form-row" :gutter="16">
      <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否开通存款业务" hasFeedback>
        <j-dict-select-tag placeholder="是否开通存款业务" v-decorator="['sfktckyw', {}]" dictCode="sfbz" :triggerChange="true"/>
      </a-form-item></a-col>
      <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="存款余额" hasFeedback>
        <a-input-number placeholder="0.00" v-decorator="['ckye', {}]" :min="0" style="width: 100%;"/>
      </a-form-item></a-col>
      <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="存款日平余额" hasFeedback>
        <a-input-number placeholder="0.00" v-decorator="['ckrpye', {}]" :min="0" style="width: 100%;"/>
      </a-form-item></a-col>
    </a-row>
    <a-row class="form-row" :gutter="16">
      <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否开通贷款业务" hasFeedback>
        <j-dict-select-tag placeholder="是否开通贷款业务" v-decorator="['sfktdkyw', {}]" dictCode="sfbz" :triggerChange="true"/>
      </a-form-item></a-col>
      <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="贷款余额" hasFeedback>
        <a-input-number placeholder="0.00" v-decorator="['dkye', {}]" :min="0" style="width: 100%;"/>
      </a-form-item></a-col>
      <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="最近贷款到期日期" hasFeedback>
        <j-date placeholder="最近贷款到期日期" v-decorator="[ 'zjdkdqrq',{}]" :trigger-change="true" style="width: 100%;"/>
      </a-form-item></a-col>
    </a-row>
    <a-row class="form-row" :gutter="16">
      <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="不良贷款余额" hasFeedback>
        <a-input-number placeholder="0.00" v-decorator="['bldkye', {}]" :min="0" style="width: 100%;"/>
      </a-form-item></a-col>
      <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="表外不良贷款余额" hasFeedback>
        <a-input-number placeholder="0.00" v-decorator="['bwbldkye', {}]" :min="0" style="width: 100%;"/>
      </a-form-item></a-col>
    </a-row>

    <!--<a-list-item class="DefaultListItem" term="与我行业务合作情况">与我行业务合作情况</a-list-item>-->
    <a-divider orientation="left" style="color: #1890FF; margin-top: 0px;">与我行业务合作情况</a-divider>
    <a-row v-if="khxz=='1'" class="form-row" :gutter="16">
      <a-col :lg="8"><a-form-item :labelCol="{ xs: { span: 24 },sm: { span: 10 } }" :wrapperCol="{ xs: { span: 24 },sm: { span: 14 } }" label="是否开通手机银行业务" hasFeedback>
        <j-dict-select-tag placeholder="是否开通手机银行业务" v-decorator="['sfktsjyhyw', {}]" dictCode="sfbz" :triggerChange="true"/>
      </a-form-item></a-col>
      <a-col :lg="8"><a-form-item :labelCol="{ xs: { span: 24 },sm: { span: 10 } }" :wrapperCol="{ xs: { span: 24 },sm: { span: 14 } }" label="是否开通网上银行业务" hasFeedback>
        <j-dict-select-tag placeholder="是否开通网上银行业务" v-decorator="['sfktwsyhyw', {}]" dictCode="sfbz" :triggerChange="true"/>
        </a-form-item>
      </a-col>
      <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否办理ETC业务" hasFeedback>
        <j-dict-select-tag placeholder="是否办理ETC业务" v-decorator="['sfbletcyw', {}]" dictCode="sfbz" :triggerChange="true"/>
      </a-form-item></a-col>
    </a-row>

    <a-row v-else-if="khxz=='2'" class="form-row" :gutter="16">
      <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="代发工资" hasFeedback>
        <j-dict-select-tag placeholder="是否在本行代发工资" v-decorator="['sfdfgz', {}]" dictCode="sfbz" :triggerChange="true"/>
      </a-form-item></a-col>
      <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="商户POS机" hasFeedback>
        <j-dict-select-tag placeholder="是否在本行开通商户POS机" v-decorator="['sfktpos', {}]" dictCode="sfbz" :triggerChange="true"/>
      </a-form-item></a-col>
      <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="聚合支付" hasFeedback>
        <j-dict-select-tag placeholder="是否在本行开通聚合支付(扫码)业务" v-decorator="['sfktjhzf', {}]" dictCode="sfbz" :triggerChange="true"/>
      </a-form-item></a-col>
    </a-row>
  </a-card>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import JDate from '@/components/jeecg/JDate'
  import pick from 'lodash.pick'

  export default {
    name: 'Ywhywwlqk',
    components: {
      JDate
    },
    props: [
      'khxz'
    ],
    data () {
      return {
        visible: false,
        ywhywwlqkForm: this.$form.createForm(this),
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 12 }
        },
      }
    },
    created () {
      console.log("khxz:" + this.khxz)
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
          this.form.setFieldsValue(pick(
            this.model,
            'sszh','ssyxdy','qybh','dabh','qymc','zjhm','lxfs','dz','jyxm','jynx','zgrs','qygm',
            'hyfl','khzycd','ywhywwlqk','qzyw','gjrxx','csxx','jyqk','zcfzqk','jrywqk','yxqk','fjxx',
          ))
          //时间格式化
          this.form.setFieldsValue({zjdkdqrq:this.model.zjdkdqrq?moment(this.model.zjdkdqrq):null})
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
            formData.zjdkdqrq = formData.zjdkdqrq?formData.zjdkdqrq.format():null;
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

<style scoped>
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }
  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
  .DefaultListItem {
    color: #1890FF;
    font-weight: 500;
    font-size: 14px;
  }
</style>