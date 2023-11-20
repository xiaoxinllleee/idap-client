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
          label="pdzq">
          <a-input placeholder="请输入pdzq" v-decorator="['pdzq', validatorRules.pdzq ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="pdrq">
          <a-date-picker v-decorator="[ 'pdrq', validatorRules.pdrq ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="djbh">
          <a-input placeholder="请输入djbh" v-decorator="['djbh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="djms">
          <a-input placeholder="请输入djms" v-decorator="['djms', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="zzbz">
          <a-input placeholder="请输入zzbz" v-decorator="['zzbz', validatorRules.zzbz ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="sjzzbz">
          <a-input placeholder="请输入sjzzbz" v-decorator="['sjzzbz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="gwbz">
          <a-input placeholder="请输入gwbz" v-decorator="['gwbz', validatorRules.gwbz ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="yggh">
          <a-input placeholder="请输入yggh" v-decorator="['yggh', validatorRules.yggh ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="khjlbz">
          <a-input placeholder="请输入khjlbz" v-decorator="['khjlbz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="ygxm">
          <a-input placeholder="请输入ygxm" v-decorator="['ygxm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="pjdf">
          <a-input placeholder="请输入pjdf" v-decorator="['pjdf', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="ssdj">
          <a-input placeholder="请输入ssdj" v-decorator="['ssdj', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="gwzzDf">
          <a-input placeholder="请输入gwzzDf" v-decorator="['gwzzDf', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="kjz">
          <a-input placeholder="请输入kjz" v-decorator="['kjz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="yhycyzgz">
          <a-input placeholder="请输入yhycyzgz" v-decorator="['yhycyzgz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="jsjczz">
          <a-input placeholder="请输入jsjczz" v-decorator="['jsjczz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="pxksJg">
          <a-input placeholder="请输入pxksJg" v-decorator="['pxksJg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="pxksDf">
          <a-input placeholder="请输入pxksDf" v-decorator="['pxksDf', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="pxksRw">
          <a-input placeholder="请输入pxksRw" v-decorator="['pxksRw', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="cknrpJg">
          <a-input placeholder="请输入cknrpJg" v-decorator="['cknrpJg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="cknrpDf">
          <a-input placeholder="请输入cknrpDf" v-decorator="['cknrpDf', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="cknrpRw">
          <a-input placeholder="请输入cknrpRw" v-decorator="['cknrpRw', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="dknrpJg">
          <a-input placeholder="请输入dknrpJg" v-decorator="['dknrpJg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="dknrpDf">
          <a-input placeholder="请输入dknrpDf" v-decorator="['dknrpDf', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="dknrpRw">
          <a-input placeholder="请输入dknrpRw" v-decorator="['dknrpRw', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="dkhsJg">
          <a-input placeholder="请输入dkhsJg" v-decorator="['dkhsJg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="dkhsDf">
          <a-input placeholder="请输入dkhsDf" v-decorator="['dkhsDf', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="dkhsRw">
          <a-input placeholder="请输入dkhsRw" v-decorator="['dkhsRw', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="bndkzbJg">
          <a-input placeholder="请输入bndkzbJg" v-decorator="['bndkzbJg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="bndkzbDf">
          <a-input placeholder="请输入bndkzbDf" v-decorator="['bndkzbDf', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="bndkzbRw">
          <a-input placeholder="请输入bndkzbRw" v-decorator="['bndkzbRw', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="djkhysJg">
          <a-input placeholder="请输入djkhysJg" v-decorator="['djkhysJg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="djkhysDf">
          <a-input placeholder="请输入djkhysDf" v-decorator="['djkhysDf', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="djkhysRw">
          <a-input placeholder="请输入djkhysRw" v-decorator="['djkhysRw', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="djkxzblJg">
          <a-input placeholder="请输入djkxzblJg" v-decorator="['djkxzblJg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="djkxzblDf">
          <a-input placeholder="请输入djkxzblDf" v-decorator="['djkxzblDf', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="bwbldkqszbJg">
          <a-input placeholder="请输入bwbldkqszbJg" v-decorator="['bwbldkqszbJg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="bwbldkqszbDf">
          <a-input placeholder="请输入bwbldkqszbDf" v-decorator="['bwbldkqszbDf', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="bwbldkqszbRw">
          <a-input placeholder="请输入bwbldkqszbRw" v-decorator="['bwbldkqszbRw', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="bwbldkqsJg">
          <a-input placeholder="请输入bwbldkqsJg" v-decorator="['bwbldkqsJg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="yqndqshlJg">
          <a-input placeholder="请输入yqndqshlJg" v-decorator="['yqndqshlJg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="yqndqshlDf">
          <a-input placeholder="请输入yqndqshlDf" v-decorator="['yqndqshlDf', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="dndqshlJg">
          <a-input placeholder="请输入dndqshlJg" v-decorator="['dndqshlJg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="dndqshlDf">
          <a-input placeholder="请输入dndqshlDf" v-decorator="['dndqshlDf', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="sjyhJg">
          <a-input placeholder="请输入sjyhJg" v-decorator="['sjyhJg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="sjyhDf">
          <a-input placeholder="请输入sjyhDf" v-decorator="['sjyhDf', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="sjyhRw">
          <a-input placeholder="请输入sjyhRw" v-decorator="['sjyhRw', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="kdlqJg">
          <a-input placeholder="请输入kdlqJg" v-decorator="['kdlqJg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="kdlqDf">
          <a-input placeholder="请输入kdlqDf" v-decorator="['kdlqDf', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="kdlqRw">
          <a-input placeholder="请输入kdlqRw" v-decorator="['kdlqRw', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="posJg">
          <a-input placeholder="请输入posJg" v-decorator="['posJg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="posDf">
          <a-input placeholder="请输入posDf" v-decorator="['posDf', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="posRw">
          <a-input placeholder="请输入posRw" v-decorator="['posRw', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="zhzhpjDf">
          <a-input placeholder="请输入zhzhpjDf" v-decorator="['zhzhpjDf', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="zhzhpjJg">
          <a-input placeholder="请输入zhzhpjJg" v-decorator="['zhzhpjJg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="zbzhpjJg">
          <a-input placeholder="请输入zbzhpjJg" v-decorator="['zbzhpjJg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="zbzhpjkfJg">
          <a-input placeholder="请输入zbzhpjkfJg" v-decorator="['zbzhpjkfJg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="zbzhpjDf">
          <a-input placeholder="请输入zbzhpjDf" v-decorator="['zbzhpjDf', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="jfxDf">
          <a-input placeholder="请输入jfxDf" v-decorator="['jfxDf', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="kfxDf">
          <a-input placeholder="请输入kfxDf" v-decorator="['kfxDf', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="etcJg">
          <a-input placeholder="请输入etcJg" v-decorator="['etcJg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="etcDf">
          <a-input placeholder="请输入etcDf" v-decorator="['etcDf', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="etcRw">
          <a-input placeholder="请输入etcRw" v-decorator="['etcRw', {}]" />
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
    name: "KhjlpdmxtjModal",
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
        pdzq:{rules: [{ required: true, message: '请输入pdzq!' }]},
        pdrq:{rules: [{ required: true, message: '请输入pdrq!' }]},
        zzbz:{rules: [{ required: true, message: '请输入zzbz!' }]},
        gwbz:{rules: [{ required: true, message: '请输入gwbz!' }]},
        yggh:{rules: [{ required: true, message: '请输入yggh!' }]},
        },
        url: {
          add: "/khjlpdmxtj/khjlpdmxtj/add",
          edit: "/khjlpdmxtj/khjlpdmxtj/edit",
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
          this.form.setFieldsValue(pick(this.model,'pdzq','djbh','djms','zzbz','sjzzbz','gwbz','yggh','khjlbz','ygxm','pjdf','ssdj','gwzzDf','kjz','yhycyzgz','jsjczz','pxksJg','pxksDf','pxksRw','cknrpJg','cknrpDf','cknrpRw','dknrpJg','dknrpDf','dknrpRw','dkhsJg','dkhsDf','dkhsRw','bndkzbJg','bndkzbDf','bndkzbRw','djkhysJg','djkhysDf','djkhysRw','djkxzblJg','djkxzblDf','bwbldkqszbJg','bwbldkqszbDf','bwbldkqszbRw','bwbldkqsJg','yqndqshlJg','yqndqshlDf','dndqshlJg','dndqshlDf','sjyhJg','sjyhDf','sjyhRw','kdlqJg','kdlqDf','kdlqRw','posJg','posDf','posRw','zhzhpjDf','zhzhpjJg','zbzhpjJg','zbzhpjkfJg','zbzhpjDf','jfxDf','kfxDf','etcJg','etcDf','etcRw'))
		  //时间格式化
          this.form.setFieldsValue({pdrq:this.model.pdrq?moment(this.model.pdrq):null})
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
            formData.pdrq = formData.pdrq?formData.pdrq.format():null;
            
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