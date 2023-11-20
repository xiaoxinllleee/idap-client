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
          label="员工工号">
          <j-select-ygxx type="radio" ref="selectYgxx" v-decorator="['ygxm',  validatorRules.yggh ]" @selectComplete="getYgxx"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="调节类型">
          <j-dict-select-tag :triggerChange="true"  placeholder="请选择调节类型" v-decorator="['tjlx', validatorRules.tjlx]" dict-code="xstjlx" style="width: 100%;"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="调节系数">
          <a-input placeholder="请输入调节系数" v-decorator="['tjxs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="生效日期起">
          <a-date-picker v-decorator="[ 'sxrqBegin', validatorRules.sxrqBegin]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="生效日期止">
          <a-date-picker v-decorator="[ 'sxrqEnd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="备注">
          <a-input placeholder="请输入备注" v-decorator="['bz', {}]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JSelectYgxx from '@/components/jeecgbiz/JSelectYgxx'

  export default {
    name: "ErpPersonalTjxsModal",
    components: {
      JSelectYgxx
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
        yggh: '',
        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
          yggh:{rules: [{ required: true, message: '请选择员工!' }]},
          tjlx:{rules: [{ required: true, message: '请选择调节类型!' }]},
          sxrqBegin:{rules: [{ required: true, message: '请输入生效日期起!' }]},
        },
        url: {
          add: "/grtjxs/erpPersonalTjxs/add",
          edit: "/grtjxs/erpPersonalTjxs/edit",
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
          console.log('this.model', this.model)
          this.form.setFieldsValue(pick(this.model,'yggh','tjlx','tjxs','bz'))
		  //时间格式化
          this.form.setFieldsValue({sxrqBegin:this.model.sxrqBegin?moment(this.model.sxrqBegin):null})
          this.form.setFieldsValue({sxrqEnd:this.model.sxrqEnd?moment(this.model.sxrqEnd):null})
          this.form.setFieldsValue({ygxm: this.model.yggh_dictText})
          this.yggh = this.model.yggh
        });

      },
      getYgxx(selectedYgxxRows) {
        console.log('getYgxx selectedYgxxRows', selectedYgxxRows)
        if (selectedYgxxRows && selectedYgxxRows[0]) {
          this.yggh = selectedYgxxRows[0].yggh
          console.log('this.yggh', this.yggh)
        }
      },
      close () {
        this.$emit('close');
        this.yggh = ''
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
            formData.sxrqBegin = formData.sxrqBegin?formData.sxrqBegin.format():null;
            formData.sxrqEnd = formData.sxrqEnd?formData.sxrqEnd.format():null;
            formData.yggh = this.yggh

            console.log(formData)
            httpAction(httpurl,formData,method).then((res)=>{
              if(res.success){
                that.$message.success(res.message);
                that.close();
                that.$emit('ok');
              }else{
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
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