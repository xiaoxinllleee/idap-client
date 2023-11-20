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
          label="所属支行">
          <j-tree-select
            v-decorator="['sszh',{rules: [{ required: true, message: '请选择机构!' }]}]"
            placeholder="请选择机构"
            dict="V_HR_BAS_ORGANIZATION_CMMS,ZZJC,ZZBZ"
            pidField="sjzzbz"
            :treeDefaultExpandAll=true
          >
          </j-tree-select>
        </a-form-item>


        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户名称">
          <a-input placeholder="请输入客户名称" v-decorator="['khmc', {}]" />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="员工">
          <a-input  hidden="true" v-model="this.model.yggh" />
          <j-select-ygxx    :treeDefaultExpandAll="true" ref="zkhjl"
                            v-model="zkhjlacct" @change="GetValueZkhjl"  ></j-select-ygxx>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="证件号码">
          <a-input placeholder="请输入证件号码" :disabled=this.disableSubmit v-decorator="['zjhm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="公式金额">
          <a-input placeholder="请输入公式金额" v-decorator="['gsje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="公式日期">
          <a-date-picker :disabled=this.disableSubmit v-decorator="[ 'gsrq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="公式次数">
          <a-input placeholder="请输入公式次数" v-decorator="['gscs', {}]" />
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JInput from '../../../../../components/jeecg/JInput'
  import JDictSelectTag from '@/components/dict/JDictSelectTag'
  import JSelectYgxx from '@/components/jeecgbiz/JSelectYgxx'
  export default {
    name: "TjfxGsxxdrModal",
    components:{JInput,JTreeSelect,JDictSelectTag,JSelectYgxx},
    data () {
      return {
        zkhjlacct:"",
        title:"操作",
        disableSubmit:false,
        visible: false,
        model: { yggh:""},
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
        validatorRules:{},
        url: {
          add: "/TjfxGsxxdr/tjfxGsxxdr/add",
          edit: "/TjfxGsxxdr/tjfxGsxxdr/edit",
        },
      }
    },
    created () {
    },
    methods: {
      GetValueZkhjl(value){
        this.model.yggh=value.yggh;
        this.zkhjlacct=value.ygxm;
      },

      add () {
        this.zkhjlacct="";
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.visible = true;
        this.zkhjlacct=record.yggh_dictText;
        //record.yggh = record.yggh_dictText
        this.model = Object.assign({}, record);

        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'jgdm','khmc','yggh','zjhm','gsje','gscs'))
		  //时间格式化
          this.form.setFieldsValue({gsrq:this.model.gsrq?moment(this.model.gsrq):null})
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
            if(!this.model.jgdm){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            formData.gsrq = formData.gsrq?formData.gsrq.format():null;

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