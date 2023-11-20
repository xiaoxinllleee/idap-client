<template>
  <a-modal
    :title="title"
    :width="1000"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="考核项目">
              <j-dict-select-tag placeholder="请选择考核项目" v-decorator="['schemeId', {}]" v-if="this.model.gwbz"
                                 dict-code="V_PMA_A_SCHEME,SHOW_NAME,SCHEME_ID,evl_obj_type=3"
                                 showSearch :triggerChange="true" disabled/>
              <j-dict-select-tag placeholder="请选择考核项目" v-decorator="['schemeId', {}]" v-else
                                 dict-code="V_PMA_A_SCHEME,SHOW_NAME,SCHEME_ID,evl_obj_type!=3"
                                 showSearch :triggerChange="true" disabled/>        </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="组织名称">
              <a-input placeholder="请输入组织名称" v-decorator="['zzbz_dictText', {}]" disabled/>
              <a-input type="hidden" placeholder="请输入组织名称" v-decorator="['zzbz', {}]" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              v-if="this.model.gwbz"
              label="岗位名称">
              <j-dict-select-tag
                v-decorator="['gwbz',validatorRules.gwbz]"
                placeholder="请选择岗位名称"
                dictCode="Hr_bas_post,gwmc,gwbz"
                :triggerChange="true"
                disabled
              />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="指标ID">
              <a-input placeholder="请输入指标ID" v-decorator="['zbid', {}]" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="指标名称">
              <a-input placeholder="请输入指标名称" v-decorator="['zbid_dictText', {}]" disabled/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="指标维度">
              <j-dict-select-tag  v-decorator="['zbwd', {}]" :triggerChange="true" placeholder="请选择指标维度" dictCode="zbwd" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="指标分值">
              <a-input placeholder="请输入指标分值" v-decorator="['zbfz', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="指标增减符号">
              <j-dict-select-tag  v-decorator="['zbabs', {}]" :triggerChange="true" placeholder="请选择指标增减符号" dictCode="zjbs"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="加权比率">
              <a-input placeholder="请输入加权比率" v-decorator="['jqbl', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="加权比率分值">
              <a-input placeholder="请输入加权比率分值" v-decorator="['jqblfz', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="加权限制分值">
              <a-input placeholder="请输入加权限制分值" v-decorator="['xzfz', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="减权比率">
              <a-input placeholder="请输入减权比率" v-decorator="['kqbl', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="减权比率分值">
              <a-input placeholder="请输入减权比率分值" v-decorator="['kqblfz', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="减权限制分值">
              <a-input placeholder="请输入减权限制分值" v-decorator="['kqxzfz', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="指标权重">
              <a-input placeholder="请输入指标权重" v-decorator="['zbqz', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="计分制">
              <j-dict-select-tag  v-decorator="['jfz', {}]" :triggerChange="true" placeholder="请选择计分制" dictCode="jfz"/>
            </a-form-item>
          </a-col>
        </a-row>
        <!--<a-form-item-->
          <!--:labelCol="labelCol"-->
          <!--:wrapperCol="wrapperCol"-->
          <!--label="考核类别">-->
          <!--<j-dict-select-tag  v-decorator="['khlb', {}]" :triggerChange="true" placeholder="请选择考核类别" dictCode="gwkhlb"/>-->
        <!--</a-form-item>-->
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JTreeSelect from '@comp/jeecg/JTreeSelect'

  export default {
    name: "ErpAssessPhjfkModal",
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
        },
        url: {
          add: "/khfagl/erpAssessPhjfk/add",
          edit: "/khfagl/erpAssessPhjfk/edit",
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
          this.form.setFieldsValue(pick(this.model,'schemeId','zzbz','zzbz_dictText','gwbz','zbid','zbid_dictText','zbwd','zbfz','zbabs','jqbl','jqblfz','xzfz','zbqz','jfz','kqbl','kqblfz','kqxzfz','khlb'))
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