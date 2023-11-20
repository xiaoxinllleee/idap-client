<template>
  <a-modal
    :title="title"
    :width="1000"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :okButtonProps="{ style: { display: 'none' } }"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

      <a-row>
        <a-col :span="12" :gutter="8">
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="工资日期">
            <a-date-picker placeholder="请选择工资日期" style="width: 100%;" v-decorator="['gzrq',{}]"></a-date-picker>
          </a-form-item>
        </a-col>
        <a-col :span="12" :gutter="8">
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="组织名称">
            <a-input placeholder="请输入员工姓名" v-decorator="['zzbz_dictText', {}]" />
          </a-form-item>
        </a-col>
      </a-row>

        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="岗位名称">
              <j-dict-select-tag
                v-decorator="['gwbz',{}]"
                placeholder="请选择岗位名称"
                dictCode="Hr_bas_post,gwmc,gwbz"
                :triggerChange="true"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="员工姓名">
              <a-input placeholder="请输入员工姓名" v-decorator="['yggh_dictText', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="指标标识">
              <a-input placeholder="请输入指标标识" v-decorator="['zbid', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="指标名称">
              <a-input placeholder="请输入指标名称" v-decorator="['zbid_dictText', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="指标单价">
              <a-input placeholder="请输入指标单价" v-decorator="['zbdj', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="指标单位">
              <a-input placeholder="请输入指标单位" v-decorator="['zbdw', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="指标结果">
              <a-input placeholder="请输入指标结果" v-decorator="['zbjg', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="指标工资">
              <a-input placeholder="请输入指标工资" v-decorator="['zbgz', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="20" :gutter="8">
            <a-form-item
              :labelCol="{span: 3}"
              :wrapperCol="{span: 17}"
              label="备注">
              <a-textarea placeholder="请输入备注" v-decorator="['bz', {}]" :autoSize="true"/>
            </a-form-item>
          </a-col>
        </a-row>


      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JTreeSelect from '@comp/jeecg/JTreeSelect'
  import ATextarea from "ant-design-vue/es/input/TextArea";

  export default {
    name: "GwkhjgViewModal",
    components: {
      ATextarea,
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
          edit: "/gwkhjg/gwkhjg/edit",
        },
      }
    },
    created () {
    },
    methods: {
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'gzrq','zzbz_dictText','gwbz','yggh_dictText','zbid','zbid_dictText','zbjg','zbgz','zbdj','zbdw','bz'))
		  //时间格式化
          //this.form.setFieldsValue({gzrq:this.model.gzrq?moment(this.model.gzrq):null})
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
            httpurl+=this.url.edit;
            method = 'put';

            let formData = Object.assign(this.model, values);
            //时间格式化
            //formData.gzrq = formData.gzrq?formData.gzrq.format():null;

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