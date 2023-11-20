<template>
  <a-card class="card" :bordered="false">
    <!--<a-list-item class="DefaultListItem" term="经营情况">经营情况</a-list-item>-->
    <a-divider orientation="left" style="color: #1890FF; margin-top: 0px;">经营情况</a-divider>
    <a-row class="form-row" :gutter="24">
      <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="年营业收入(万元)" hasFeedback>
        <a-input-number placeholder="0.00" v-decorator="['nyysr', {}]" :min="0" style="width: 100%;"/>
      </a-form-item></a-col>
      <a-col :lg="8"><a-form-item :labelCol="labelCol_A" :wrapperCol="wrapperCol_A" label="年主营业务成本(万元)" hasFeedback>
        <a-input-number placeholder="0.00" v-decorator="['nzyywcb', {}]" :min="0" style="width: 100%;"/>
      </a-form-item></a-col>
      <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="年工资(万元)" hasFeedback>
        <a-input-number placeholder="0.00" v-decorator="['ngz', {}]" :min="0" style="width: 100%;"/>
      </a-form-item></a-col>
    </a-row>

    <a-row class="form-row" :gutter="24">
      <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="年缴纳所得税(万元)" hasFeedback>
        <a-input-number placeholder="0.00" v-decorator="['njnsds', {}]" :min="0" style="width: 100%;"/>
      </a-form-item></a-col>
      <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="年缴纳增值税(万元)" hasFeedback>
        <a-input-number placeholder="0.00" v-decorator="['njnzzs', {}]" :min="0" style="width: 100%;"/>
      </a-form-item></a-col>
      <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="年主营净利润(万元)" hasFeedback>
        <a-input-number placeholder="0.00" v-decorator="['nzyjlr', {}]" :min="0" style="width: 100%;"/>
      </a-form-item></a-col>
    </a-row>

    <!--<a-list-item class="DefaultListItem" term="其他">其他</a-list-item>-->
    <a-divider orientation="left" style="color: #1890FF; margin-top: 0px;">其他</a-divider>
    <a-row class="form-row" :gutter="16">
      <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="其他收入(万元)" hasFeedback>
        <a-input-number placeholder="0.00" v-decorator="['qtsr', {}]" :min="0" style="width: 100%;"/>
      </a-form-item></a-col>
      <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="其他支出(万元)" hasFeedback>
        <a-input-number placeholder="0.00" v-decorator="['qtzc', {}]" :min="0" style="width: 100%;"/>
      </a-form-item></a-col>
    </a-row>

    <!--<a-list-item class="DefaultListItem" term="合计">合计</a-list-item>-->
    <a-divider orientation="left" style="color: #1890FF; margin-top: 0px;">合计</a-divider>
    <a-row class="form-row" :gutter="16">
      <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="总收入(万元)" hasFeedback>
        <a-input-number placeholder="0.00" v-decorator="['zsr', {}]" :min="0" style="width: 100%;"/>
      </a-form-item></a-col>
      <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="总支出(万元)" hasFeedback>
        <a-input-number placeholder="0.00" v-decorator="['zzc', {}]" :min="0" style="width: 100%;"/>
      </a-form-item></a-col>
      <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="净利润(万元)" hasFeedback>
        <a-input-number placeholder="0.00" v-decorator="['jlr', {}]" :min="0" style="width: 100%;"/>
      </a-form-item></a-col>
    </a-row>
  </a-card>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'

  export default {
    name: 'Jyqk',
    data () {
      return {
        visible: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        labelCol_A: {
          xs: { span: 24 },
          sm: { span: 10 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 12 }
        },
        wrapperCol_A: {
          xs: { span: 24 },
          sm: { span: 10 }
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
          this.form.setFieldsValue(
            pick(
              this.model,
              'sszh','ssyxdy','qybh','dabh','qymc','zjhm','lxfs','dz','jyxm','jynx','zgrs','qygm',
              'hyfl','khzycd','ywhywwlqk','qzyw','gjrxx','csxx','jyqk','zcfzqk','jrywqk','yxqk','fjxx'
            )
          )
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
  .DefaultListItem {
    color: #1890FF;
    font-weight: 500;
    font-size: 14px;
  }
</style>