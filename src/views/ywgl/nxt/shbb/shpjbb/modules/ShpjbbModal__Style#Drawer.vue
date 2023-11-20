<template>
  <a-drawer
      :title="title"
      :width="800"
      placement="right"
      :closable="false"
      @close="close"
      :visible="visible"
  >

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
      
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="评定类型">
          <a-input placeholder="请输入评定类型" v-decorator="['pdlx', validatorRules.pdlx ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="评定季度">
          <a-date-picker v-decorator="[ 'pdzq', validatorRules.pdzq ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构代码">
          <a-input placeholder="请输入机构代码" v-decorator="['jgdm', validatorRules.jgdm ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商户编码">
          <a-input placeholder="请输入商户编码" v-decorator="['shbm', validatorRules.shbm ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商户名称">
          <a-input placeholder="请输入商户名称" v-decorator="['shmc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="联系电话">
          <a-input placeholder="请输入联系电话" v-decorator="['lxdh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户经理名称">
          <a-input placeholder="请输入客户经理名称" v-decorator="['khjlbz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="关联账户（户名-账号,户名-账号...)">
          <a-input placeholder="请输入关联账户（户名-账号,户名-账号...)" v-decorator="['glzh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上期评定日平">
          <a-input placeholder="请输入上期评定日平" v-decorator="['sqpdrp', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上期评定等级">
          <a-input placeholder="请输入上期评定等级" v-decorator="['sqpddj', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本期评定日平">
          <a-input placeholder="请输入本期评定日平" v-decorator="['bqpdrp', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本期评定等级">
          <a-input placeholder="请输入本期评定等级" v-decorator="['bqpddj', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="评定日期">
          <a-date-picker v-decorator="[ 'pdrq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="等级是否有调整（1：是 2：否）">
          <a-input placeholder="请输入等级是否有调整（1：是 2：否）" v-decorator="['djsfytz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="录入标志（0：导入 1：录入 2：修改）">
          <a-input placeholder="请输入录入标志（0：导入 1：录入 2：修改）" v-decorator="['lrbz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="录入人">
          <a-input placeholder="请输入录入人" v-decorator="['lrr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="录入日期">
          <a-date-picker v-decorator="[ 'lrrq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="修改人">
          <a-input placeholder="请输入修改人" v-decorator="['xgr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="修改日期">
          <a-date-picker v-decorator="[ 'xgrq', {}]" />
        </a-form-item>
		
      </a-form>
    </a-spin>
    <a-button type="primary" @click="handleOk">确定</a-button>
    <a-button type="primary" @click="handleCancel">取消</a-button>
  </a-drawer>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "ShpjbbModal",
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
        pdlx:{rules: [{ required: true, message: '请输入评定类型!' }]},
        pdzq:{rules: [{ required: true, message: '请输入评定季度!' }]},
        jgdm:{rules: [{ required: true, message: '请输入机构代码!' }]},
        shbm:{rules: [{ required: true, message: '请输入商户编码!' }]},
        },
        url: {
          add: "/shpjbb/shpjbb/add",
          edit: "/shpjbb/shpjbb/edit",
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
          this.form.setFieldsValue(pick(this.model,'pdlx','jgdm','shbm','shmc','lxdh','khjlbz','glzh','sqpdrp','sqpddj','bqpdrp','bqpddj','djsfytz','lrbz','lrr','xgr'))
		  //时间格式化
          this.form.setFieldsValue({pdzq:this.model.pdzq?moment(this.model.pdzq):null})
          this.form.setFieldsValue({pdrq:this.model.pdrq?moment(this.model.pdrq):null})
          this.form.setFieldsValue({lrrq:this.model.lrrq?moment(this.model.lrrq):null})
          this.form.setFieldsValue({xgrq:this.model.xgrq?moment(this.model.xgrq):null})
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
            formData.pdzq = formData.pdzq?formData.pdzq.format():null;
            formData.pdrq = formData.pdrq?formData.pdrq.format():null;
            formData.lrrq = formData.lrrq?formData.lrrq.format():null;
            formData.xgrq = formData.xgrq?formData.xgrq.format():null;
            
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
/** Button按钮间距 */
  .ant-btn {
    margin-left: 30px;
    margin-bottom: 30px;
    float: right;
  }
</style>