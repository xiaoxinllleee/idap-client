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
          label="贷记卡客户编码">
          <a-input placeholder="请输入贷记卡客户编码" v-decorator="['tgrybh', validatorRules.tgrybh ]" />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="员工姓名">
          <j-select-ygxx type="radio" v-decorator="['ygxm', validatorRules.yggh ]" @change="ygxxChange"></j-select-ygxx>
          <!--<a-input placeholder="" v-decorator="['yggh_dictText', {}]" :disabled="true"/>-->
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="员工工号">
          <a-input placeholder="请输入员工工号" v-decorator="['yggh', validatorRules.yggh ]" disabled/>
          <!--<a-input placeholder="" v-decorator="['yggh', validatorRules.yggh ]" :disabled="true"/>-->
          <!--<a-button @click="FindBack" type="primary" icon="plus">查找带回</a-button>-->
        </a-form-item>
      </a-form>
    </a-spin>
    <account-info ref="accountInfo" @close="colseWindow"></account-info>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import AccountInfo from './AccountInfo'
  import moment from "moment"
  import JSelectYgxx from '@/components/jeecgbiz/JSelectYgxx'

  export default {
    name: "DjkryglModal",
    components:{
      AccountInfo, JSelectYgxx
    },
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
        records:{
          yggh:'',
          ygxm:'',
          gyh:'',
          khjlbz:'',
          lrsj:'',
          lrczy:'',
          lrbz:''
        },

        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
        tgrybh:{rules: [{ required: true, message: '请输入推广人员编号!' }]},
        yggh:{rules: [{ required: true, message: '请选择员工!' }]},
        },
        url: {
          add: "/djkrygl/djkrygl/add",
          edit: "/djkrygl/djkrygl/edit",
        },
      }
    },
    created () {
    },
    methods: {
      colseWindow(args){
        this.records.yggh = args.yggh,
        this.records.yggh_dictText = args.yggh_dictText,
        this.records.gyh = args.gyh,
        this.records.khjlbz = args.khjlbz,
        this.model = Object.assign({}, this.records)
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'yggh','yggh_dictText','gyh','khjlbz'))  // loadsh的pick方法
        })
      },
      FindBack(){
        this.$refs.accountInfo.visible = true
      },
      add () {
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'tgrybh','yggh','ygxm','lrbz','lrczy'))
		  //时间格式化
          this.form.setFieldsValue({lrsj:this.model.lrsj?moment(this.model.lrsj):null})
        });

      },
      ygxxChange(ygxx) {
        console.log('ygxxChange', ygxx)
        this.form.setFieldsValue({yggh: ygxx.yggh, ygxm: ygxx.ygxm})

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
            formData.ygxm = formData.ygxm.ygxm
            //时间格式化
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