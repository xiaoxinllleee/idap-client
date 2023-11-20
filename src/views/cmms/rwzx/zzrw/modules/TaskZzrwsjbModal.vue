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
          label="任务名称">
          <a-input placeholder="请输入任务名称" v-decorator="['rwmc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="所属支行">
          <j-tree-select placeholder="请选择所属支行"
                         v-model="model.sszh"
                         treeNodeFilterProp="title"
                         pid-field="sjzzbz"
                         dict="v_hr_bas_organization_cmms, zzjc, zzbz"
                         :showSearch="true"
                         getAllZzjg="1"
                         :treeDefaultExpandAll="true" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="所属网格">
          <a-tree-select
            :treeData=sswgTreeDateoptions
            :replaceFields=replaceFields
            v-model="model.sswg"
            defaultExpandAll="false"
            allow-clear
            :dropdownStyle="{maxHeight:'400px',overflow:'auto'}"
            showSearch
            treeNodeFilterProp="title"
          />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务所属支行">
          <j-tree-select placeholder="请选择所属支行"
                         v-model="model.ywsszh"
                         treeNodeFilterProp="title"
                         pid-field="sjzzbz"
                         dict="v_hr_bas_organization_cmms, zzjc, zzbz"
                         :showSearch="true"
                         getAllZzjg="1"
                         :treeDefaultExpandAll="true" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="户号编码">
          <a-input placeholder="请输入户号编码" v-decorator="['hhbm', {}]" />
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
          label="证件号码">
          <a-input placeholder="请输入证件号码" v-decorator="['zjhm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="联系方式">
          <a-input placeholder="请输入联系方式" v-decorator="['lxfs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户类型">
          <j-dict-select-tag placeholder='请选择客户类型' v-model='model.khlx'
                             dict-code='khlx1'></j-dict-select-tag>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户类型2">
          <j-dict-select-tag placeholder='请选择客户类型2' v-model='model.khlx2'
                             dict-code='yx_khlx2'></j-dict-select-tag>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户等级">
          <j-dict-select-tag placeholder='请选择客户等级' v-model='model.khdj'
                             dict-code='khdj_yx'></j-dict-select-tag>
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { getAction, httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JTreeSelect from '@/components/jeecg/JTreeSelect'

  export default {
    name: "TaskZzrwsjbModal",
    components: {
      JTreeSelect
    },
    data () {
      return {
        sswgTreeDateoptions: [],
        replaceFields:
          { children: 'children', title: 'wgmc', key: 'wgbh', value: 'wgbh' },
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
          add: "/zzrw/taskZzrwsjb/add",
          edit: "/zzrw/taskZzrwsjb/edit",
        },
      }
    },
    created () {
      getAction('/yxdyglmain/yxdyglMain/getWgxxTreeDateBySskhjl').then(res => {
        if (res.success) {
          this.sswgTreeDateoptions = res.result
        }
      })
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
          this.form.setFieldsValue(pick(this.model,'rwmc','sszh','sswg','ywsszh','hhbm','khmc','zjhm','lxfs','khlx','khlx2','khdj'))
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