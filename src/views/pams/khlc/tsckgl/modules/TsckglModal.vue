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
        <a-row :gutter="8">
          <a-col :span="12" >
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="存款账号">
              <a-input-search placeholder="请输入存款账号" v-decorator="['ckzh', validatorRules.ckzh ]" enter-button @search="onSearch" :disabled="model.ckzh !== undefined"/>
            </a-form-item>
          </a-col>
          <a-col :span="12" >
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="机构代码">
              <j-tree-select
                v-decorator="['jgdm',{}]"
                placeholder="请选择机构"
                treeNodeFilterProp="title"
                dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                :sszh="true"
                pid-field="sjywjgdm"
                :showSearch="true"
                :treeDefaultExpandAll=true
                disabled
              />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="8">
          <a-col :span="12" >
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="证件号码">
              <a-input placeholder="请输入证件号码" v-decorator="['zjhm', {}]" disabled/>
            </a-form-item>

          </a-col>
          <a-col :span="12" >
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="客户姓名">
              <a-input placeholder="请输入客户姓名" v-decorator="['custName', {}]" disabled/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="8">
          <a-col :span="12" >
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="科目号">
              <a-input placeholder="请输入科目号" v-decorator="['subjNo', {}]" disabled/>
            </a-form-item>

          </a-col>
          <a-col :span="12" >
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="科目号名称">
              <a-input placeholder="请输入科目号名称" v-decorator="['subjName', {}]" disabled/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="8">
          <a-col :span="12" >
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="开户日期">
              <a-date-picker v-decorator="[ 'khrq', {}]" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="12" >
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="存款标签">
              <j-dict-select-tag placeholder="请选择存款标签" v-decorator="['ckbq', validatorRules.ckbq]" :trigger-change="true" dictCode="ckbq" :pleaseSelect="false" allowClear/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="8">
          <a-col :span="12" >
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="备注">
              <a-input placeholder="请输入备注" v-decorator="['bz', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
		
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction, getAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JTreeSelect from '@/components/jeecg/JTreeSelect'

  export default {
    name: "TsckglModal",
    components: {
      JTreeSelect
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

        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
          ckzh:{rules: [{ required: true, message: '请输入存款账号!' }]},
          ckbq:{rules: [{ required: true, message: '请选择存款标签!' }]},
        },
        url: {
          add: "/tsckgl/tsckgl/add",
          edit: "/tsckgl/tsckgl/edit",
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
          this.form.setFieldsValue(pick(this.model,'jgdm','zjhm','ckzh','custName','subjNo','subjName','ckbq','bz'))
		  //时间格式化
          this.form.setFieldsValue({khrq:this.model.khrq?moment(this.model.khrq):null})
        });

      },
      onSearch(value) {
        if (value) {
          getAction('/tsckgl/tsckgl/queryByCkzh', {ckzh: value}).then(res => {
            console.log('res', res)
            if (res.success && res.result) {
              let data = res.result
              this.form.setFieldsValue({jgdm: data.branchNo, zjhm: data.identNo, custName: data.custName, subjNo: data.subjNo, subjName: data.subjName})
              this.form.setFieldsValue({khrq:data.acctOpenDt?moment(data.acctOpenDt):null})
            } else {
              this.$message.warning(res.message);
            }
          });
        }
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
            if(!this.model.ckzh){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            formData.khrq = formData.khrq?formData.khrq.format():null;
            
            console.log(formData)
            httpAction(httpurl,formData,method).then((res)=>{
              if(res.success){
                that.$message.success(res.message);
                that.$emit('ok');
                that.close();
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