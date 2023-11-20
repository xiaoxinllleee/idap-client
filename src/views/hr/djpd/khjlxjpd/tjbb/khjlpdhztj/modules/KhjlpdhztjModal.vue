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
          label="gwzzDf">
          <a-input placeholder="请输入gwzzDf" v-decorator="['gwzzDf', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="kspm">
          <a-input placeholder="请输入kspm" v-decorator="['kspm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="wxjtzdjbh">
          <a-input placeholder="请输入wxjtzdjbh" v-decorator="['wxjtzdjbh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="tzhdjbh">
          <a-input placeholder="请输入tzhdjbh" v-decorator="['tzhdjbh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="sndjbh">
          <a-input placeholder="请输入sndjbh" v-decorator="['sndjbh', {}]" />
        </a-form-item>
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
          label="dfpddjbh">
          <a-input placeholder="请输入dfpddjbh" v-decorator="['dfpddjbh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="age">
          <a-input placeholder="请输入age" v-decorator="['age', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="gl">
          <a-input placeholder="请输入gl" v-decorator="['gl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="nlgltzdjbh">
          <a-input placeholder="请输入nlgltzdjbh" v-decorator="['nlgltzdjbh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="bldkzbJg">
          <a-input placeholder="请输入bldkzbJg" v-decorator="['bldkzbJg', {}]" />
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
          label="dndqshlJg">
          <a-input placeholder="请输入dndqshlJg" v-decorator="['dndqshlJg', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="bltzdjbh">
          <a-input placeholder="请输入bltzdjbh" v-decorator="['bltzdjbh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="dxbfdf">
          <a-input placeholder="请输入dxbfdf" v-decorator="['dxbfdf', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="zhzhpjjg">
          <a-input placeholder="请输入zhzhpjjg" v-decorator="['zhzhpjjg', {}]" />
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
          label="dxpjtzdjbh">
          <a-input placeholder="请输入dxpjtzdjbh" v-decorator="['dxpjtzdjbh', {}]" />
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
    name: "KhjlpdhztjModal",
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
          add: "/khjlpdhztj/khjlpdhztj/add",
          edit: "/khjlpdhztj/khjlpdhztj/edit",
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
          this.form.setFieldsValue(pick(this.model,'gwzzDf','kspm','wxjtzdjbh','tzhdjbh','sndjbh','pdzq','djbh','djms','zzbz','sjzzbz','gwbz','yggh','ygxm','pjdf','dfpddjbh','age','gl','nlgltzdjbh','bldkzbJg','yqndqshlJg','dndqshlJg','bltzdjbh','dxbfdf','zhzhpjjg','zbzhpjJg','dxpjtzdjbh'))
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

</style>