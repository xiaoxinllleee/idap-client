<template>
  <a-card class="card" :bordered="false">

    <a-row class="form-row" :gutter="16">
      <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户潜力值分层：">
          <a-select placeholder="请选择" v-decorator="['ctype',{}]">
            <a-select-option value="1">基础</a-select-option>
            <a-select-option value="2">核心</a-select-option>
            <a-select-option value="3">高端</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>

      <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户贡献度分层：">
          <a-select placeholder="请选择" v-decorator="['ctype',{}]">
            <a-select-option value="1">基础</a-select-option>
            <a-select-option value="2">核心</a-select-option>
            <a-select-option value="3">高端</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="在我行业务占比：">
          <a-input  v-decorator="['ngz', {}]"/>
        </a-form-item>
      </a-col>
    </a-row>

    <a-row class="form-row" :gutter="16">
      <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否需要客户经理营销：">
          <a-select placeholder="请选择" v-decorator="['ctype',{}]">
            <a-select-option value="1">是</a-select-option>
            <a-select-option value="2">否</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>

      <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="选否写明原因：">
          <a-input  v-decorator="['njszzs', {}]"/>
        </a-form-item>
      </a-col>
      <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="营销目标：">
          <a-input  v-decorator="['nzyjlr', {}]"/>
        </a-form-item>
      </a-col>
    </a-row>


  </a-card>

</template>

<script>

  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: 'Jrywxx',
    data () {
      return {
        visible: false,
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
          this.form.setFieldsValue(pick(this.model,'sszh','ssyxdy','qybh','dabh','qymc','zjhm','lxfs','dz','jyxm','jynx','zgrs','qygm','hyfl','khzycd','ywhywwlqk','qzyw','gjrxx','csxx','jyqk','zcfzqk','jrywqk','yxqk','fjxx'))
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
<style scoped>
</style>