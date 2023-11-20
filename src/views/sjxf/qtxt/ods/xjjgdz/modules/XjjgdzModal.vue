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
          label="新机构号">
          <a-input placeholder="请输入新机构号" v-decorator="['newBrNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="旧机构号">
          <a-input placeholder="请输入旧机构号" v-decorator="['oldBrNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构名称">
          <a-input placeholder="请输入机构名称" v-decorator="['brName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="联系方式">
          <a-input placeholder="请输入联系方式" v-decorator="['tel', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上级管理机构（老财务）">
          <a-input placeholder="请输入上级管理机构（老财务）" v-decorator="['sjgljg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上级清算关系（老核心）">
          <a-input placeholder="请输入上级清算关系（老核心）" v-decorator="['sjqsgx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="法人联社编号（老财务）">
          <a-input placeholder="请输入法人联社编号（老财务）" v-decorator="['frlsbh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="法人联社编号">
          <a-input placeholder="请输入法人联社编号" v-decorator="['frlsbh1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="支付系统行号">
          <a-input placeholder="请输入支付系统行号" v-decorator="['zfxthh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="国结(SWIFT)地址">
          <a-input placeholder="请输入国结(SWIFT)地址" v-decorator="['gjdz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="银行机构代码（新核心）">
          <a-input placeholder="请输入银行机构代码（新核心）" v-decorator="['yhjgdm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="金融机构许可证（新核心）">
          <a-input placeholder="请输入金融机构许可证（新核心）" v-decorator="['jrjgxkz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否启用银承（新核心）">
          <a-input placeholder="请输入是否启用银承（新核心）" v-decorator="['sfqyyc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="联社级管理中心（新核心）">
          <a-input placeholder="请输入联社级管理中心（新核心）" v-decorator="['lsjglzx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上级分行代码（新核心）">
          <a-input placeholder="请输入上级分行代码（新核心）" v-decorator="['sjfhdm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上级业务机构（新核心）">
          <a-input placeholder="请输入上级业务机构（新核心）" v-decorator="['sjywjg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上级清算机构（新核心）">
          <a-input placeholder="请输入上级清算机构（新核心）" v-decorator="['sjqsjg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上级现金机构（新核心）">
          <a-input placeholder="请输入上级现金机构（新核心）" v-decorator="['sjxjjg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上级重空机构（新核心）">
          <a-input placeholder="请输入上级重空机构（新核心）" v-decorator="['sjzkjg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="银行卡城市代码">
          <a-input placeholder="请输入银行卡城市代码" v-decorator="['yhkcsdm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="城市代码">
          <a-input placeholder="请输入城市代码" v-decorator="['csdm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构使用状态">
          <a-input placeholder="请输入机构使用状态" v-decorator="['jgsyzt', {}]" />
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
          label="机构号">
          <a-input placeholder="请输入机构号" v-decorator="['organId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="数据日期">
          <a-input placeholder="请输入数据日期" v-decorator="['dataDate', {}]" />
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
          label="法人标识">
          <a-input placeholder="请输入法人标识" v-decorator="['legalNo', {}]" />
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
    name: "XjjgdzModal",
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
          add: "/xjjgdz/xjjgdz/add",
          edit: "/xjjgdz/xjjgdz/edit",
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
          this.form.setFieldsValue(pick(this.model,'newBrNo','oldBrNo','brName','tel','sjgljg','sjqsgx','frlsbh','frlsbh1','zfxthh','gjdz','yhjgdm','jrjgxkz','sfqyyc','lsjglzx','sjfhdm','sjywjg','sjqsjg','sjxjjg','sjzkjg','yhkcsdm','csdm','jgsyzt','remark','organId','dataDate','loadDate','legalNo'))
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