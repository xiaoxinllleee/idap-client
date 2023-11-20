<template>
  <a-modal
    :title="title"
    :width="1200"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row class="form-row" :gutter="24">
          <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户名称">
          <a-input placeholder="请输入客户名称" v-decorator="['khmc', {}]" />
        </a-form-item>
          </a-col>
          <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="地址">
          <a-input placeholder="请输入地址" v-decorator="['dz', {}]" />
        </a-form-item>
          </a-col>
          <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="电话号码">
          <a-input placeholder="请输入电话号码" v-decorator="['dhhm', {}]" />
        </a-form-item>
          </a-col>
          <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="身份证号码">
          <a-input placeholder="请输入身份证号码" v-decorator="['zjhm', validatorRules.zjhm]" />
        </a-form-item>
          </a-col>
          <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="卡号">
          <a-input placeholder="请输入卡号" v-decorator="['kh', {}]" />
        </a-form-item>
          </a-col>
          <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款额度">
          <a-input placeholder="请输入贷款额度" v-decorator="['dked', {}]" />
        </a-form-item>
          </a-col>
          <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="信用卡额度">
          <a-input placeholder="请输入信用卡额度" v-decorator="['xyked', {}]" />
        </a-form-item>
          </a-col>
          <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="五级分类">
          <a-input placeholder="请输入五级分类" v-decorator="['wjfl', {}]" />
        </a-form-item>
          </a-col>
          <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="卡状态">
          <a-input placeholder="请输入卡状态" v-decorator="['kzt', {}]" />
        </a-form-item>
          </a-col>
          <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="逾期期数">
          <a-input placeholder="请输入逾期期数" v-decorator="['yqqs', {}]" />
        </a-form-item>
          </a-col>
          <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账户状态">
          <a-input placeholder="请输入账户状态" v-decorator="['zhzt', {}]" />
        </a-form-item>
          </a-col>
          <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账单地址">
          <a-input placeholder="请输入账单地址" v-decorator="['zddz', {}]" />
        </a-form-item>
          </a-col>
          <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发卡日期">
          <a-date-picker v-decorator="[ 'fkrq', {}]" style="width: 100%"/>
        </a-form-item>
          </a-col>
          <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否激活">
          <a-input placeholder="请输入是否激活" v-decorator="['sfjh', {}]" />
        </a-form-item>
          </a-col>
          <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否绑定微信">
          <a-input placeholder="请输入是否绑定微信" v-decorator="['sfbdwx', {}]" />
        </a-form-item>
          </a-col>
          <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="推广人">
          <a-input placeholder="请输入推广人" v-decorator="['tgr', {}]" />
        </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "KhxxglWbsjglXyksjModal",
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
          zjhm:{rules: [{ required: true, message: '请输入身份证号码!' }]},
        },
        url: {
          add: "/xyksj/khxxglWbsjglXyksj/add",
          edit: "/xyksj/khxxglWbsjglXyksj/edit",
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
          this.form.setFieldsValue(pick(this.model,'khmc','dz','dhhm','zjhm','kh','dked','xyked','wjfl','kzt','yqqs','zhzt','zddz','sfjh','sfbdwx','tgr'))
		  //时间格式化
          this.form.setFieldsValue({fkrq:this.model.fkrq?moment(this.model.fkrq):null})
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
            formData.fkrq = formData.fkrq?formData.fkrq.format():null;
            formData.lrsj = formData.lrsj?formData.lrsj.format():null;
            
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