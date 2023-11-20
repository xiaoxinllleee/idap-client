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
          label="数据日期">
          <a-date-picker placeholder="请输入数据日期" v-decorator="[ 'fiscalDate', validatorRules.fiscalDate]"/>
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
          label="年初村行存款日平">
          <a-input placeholder="请输入年初村行存款日平" v-decorator="['ncchckrp', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="月末村行存款日平">
          <a-input placeholder="请输入月末村行存款日平" v-decorator="['ymchckrp', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="年初国际业务存款日平">
          <a-input placeholder="请输入年初国际业务存款日平" v-decorator="['ncgjywckrp', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="月末国际业务存款日平">
          <a-input placeholder="请输入月末国际业务存款日平" v-decorator="['ymgjywckrp', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="总部分摊手续费收入（不含税）">
          <a-input placeholder="请输入总部分摊手续费收入（不含税）" v-decorator="['zbftsxfsrbhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="6403其他税金">
          <a-input placeholder="请输入6403其他税金" v-decorator="['qtsj', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="总部分摊手续费支出">
          <a-input placeholder="请输入总部分摊手续费支出" v-decorator="['zbftsxfzc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="支行费用台账计算">
          <a-input placeholder="请输入支行费用台账计算" v-decorator="['zhfytzjs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="6602其他业务支出科目">
          <a-input placeholder="请输入6602其他业务支出科目" v-decorator="['qtywzckm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="6711营业外支出科目">
          <a-input placeholder="请输入6711营业外支出科目" v-decorator="['yywzckm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="报批费用">
          <a-input placeholder="请输入报批费用" v-decorator="['bpfy', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="经营利润任务">
          <a-input placeholder="请输入经营利润任务" v-decorator="['jylrrw', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="库存现金日均余额(外折人)">
          <a-input placeholder="请输入库存现金日均余额(外折人)" v-decorator="['kcxjrjye', {}]" />
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
    name: "CwlrcsModal",
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
        fiscalDate:{rules: [{ required: true, message: '请输入数据日期!' }]},
        jgdm:{rules: [{ required: true, message: '请输入机构代码!' }]},
        },
        url: {
          add: "/report/sgtzgl/cwbcwjylrcs/cwlrcs/add",
          edit: "/report/sgtzgl/cwbcwjylrcs/cwlrcs/edit",
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
          this.form.setFieldsValue(pick(this.model,'fiscalDate','jgdm','ncchckrp','ymchckrp','ncgjywckrp','ymgjywckrp','zbftsxfsrbhs','qtsj','zbftsxfzc','zhfytzjs','qtywzckm','yywzckm','bpfy','jylrrw','kcxjrjye'))
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
            if(!this.model.fiscalDate || !this.model.jgdm){
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