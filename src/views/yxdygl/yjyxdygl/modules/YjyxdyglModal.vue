<template>
  <a-modal :title="title"
           :width="500"
           :visible="visible"
           :confirmLoading="confirmLoading"
           :okButtonProps="{ props: {disabled: disableSubmit} }"
           :destroyOnClose="true"
           @ok="handleOk"
           @cancel="handleCancel"
           cancelText="关闭">
    
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="单元性质" hasFeedback>
          <j-dict-select-tag placeholder="请选择单元性质" v-decorator="['dyxz', validatorRules.dyxz]" dict-code="yjyxdyxz" :trigger-change="true"></j-dict-select-tag>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="单元编号" hasFeedback>
          <a-input placeholder="请输入单元编号" v-decorator="['dybh', validatorRules.dybh]" :disabled="this.disabled_dybh"/>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="单元名称" hasFeedback>
          <a-input placeholder="请输入单元名称" v-decorator="['dymc', validatorRules.dymc]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="备注" hasFeedback>
          <a-textarea placeholder="请输入备注" v-decorator="['bz', {}]" />
        </a-form-item>

        <!--<a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="农户数">
          <a-input placeholder="请输入农户数" v-decorator="['nhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="农户建档数">
          <a-input placeholder="请输入农户建档数" v-decorator="['nhjds', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="农户建档覆盖率">
          <a-input placeholder="请输入农户建档覆盖率" v-decorator="['nhjdfgl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商户数">
          <a-input placeholder="请输入商户数" v-decorator="['shs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商户建档数">
          <a-input placeholder="请输入商户建档数" v-decorator="['shjds', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商户建档覆盖率">
          <a-input placeholder="请输入商户建档覆盖率" v-decorator="['shjdfgl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="城区居民">
          <a-input placeholder="请输入城区居民" v-decorator="['cqjm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="城区居民建档数">
          <a-input placeholder="请输入城区居民建档数" v-decorator="['cqjmjds', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="城区居民建档覆盖率">
          <a-input placeholder="请输入城区居民建档覆盖率" v-decorator="['cqjmjdfgl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="企业数">
          <a-input placeholder="请输入企业数" v-decorator="['qys', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="企业建档数">
          <a-input placeholder="请输入企业建档数" v-decorator="['qyjds', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="企业建档覆盖率">
          <a-input placeholder="请输入企业建档覆盖率" v-decorator="['qyjdfgl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构数">
          <a-input placeholder="请输入机构数" v-decorator="['jgs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构建档数">
          <a-input placeholder="请输入机构建档数" v-decorator="['jgjds', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构建档覆盖率">
          <a-input placeholder="请输入机构建档覆盖率" v-decorator="['jgjdfgl', {}]" />
        </a-form-item>-->
		
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import { duplicateCheck } from '@/api/api'

  export default {
    name: "YxdyglYjyxdyglModal",
    data () {
      return {
        title:"操作",
        visible: false,
        disabled: false,
        disableSubmit: false,
        disabled_dybh: false,
        confirmLoading: false,
        form: this.$form.createForm(this),
        okType: "",
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        validatorRules:{
          dymc: {rules: [{ required: true, message: '请输入单元名称!😅' }]},
          dybh: {rules: [
            { required: true, message: '请输入单元编号!😅' },
            { validator: this.validateCode }
          ]},
          dyxz: {rules: [{ required: true, message: '请选择单元性质!😅' }]},
        },
        url: {
          add: "/yxdygl/yjyxdygl/add",
          edit: "/yxdygl/yjyxdygl/edit",
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
          this.form.setFieldsValue(pick(this.model,
            'dymc','dybh','dyxz'
            // ,'nhs','nhjds','nhjdfgl','shs','shjds','shjdfgl','cqjm','cqjmjds','cqjmjdfgl','qys','qyjds','qyjdfgl','jgs','jgjds','jgjdfgl'
            ,'bz'
          ))
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
      // duplicateCheck表单字段重复校验
      validateCode: function(rule, value, callback) {
        // let pattern = /^[a-z|A-Z][a-z|A-Z|\d|_|-]{0,}$/;
        // if (pattern.test(value)) {
        //   callback('单元编号必须以字母开头,可包含数字、下划线、横杠');
        // }
        var params = {
          // 表名
          tableName: 'YXDYGL_YJYXDYGL',
          // 字段名
          fieldName: 'dybh',
          // 字段值
          fieldVal: value,
          // 表主键
          dataId: this.model.dybh,
        };
        if (this.okType == "1") {
          if (params.fieldVal != null && params.fieldVal != 'undefined') {
            duplicateCheck(params).then((res) => {
              if (res.success) {
                callback();
              } else {
                callback(res.message);
              }
            });
          } else {
            callback();
          }
        } else {
          callback();
        }
      },
    }
  }
</script>

<style lang="less" scoped>

</style>