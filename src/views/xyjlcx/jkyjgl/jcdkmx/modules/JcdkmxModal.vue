<template>
  <a-modal
    :title="title"
    :width="1450"
    :visible="visible"
    :maskClosable="false"
    :okButtonProps="{ props: {disabled: disableSubmit} }"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-row class="form-row" :gutter="24">
          <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构代码">
          <!--<a-input placeholder="请输入机构代码" v-decorator="['jgdm', {}]" />-->
          <j-tree-select
            v-decorator="['jgdm',{}]"
            placeholder="请选择机构"
            treeNodeFilterProp="title"
            dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
            :sszh="true"
            pid-field="sjywjgdm"
            :showSearch="true"
            :disabled="this.disabled"
            :treeDefaultExpandAll=true
          />
        </a-form-item>
          </a-col>
          <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户名称">
          <a-input placeholder="请输入客户名称" v-decorator="['khmc', {}]" :disabled="this.disabled"/>
        </a-form-item>
          </a-col>
          <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="证件号码">
          <a-input placeholder="请输入证件号码" v-decorator="['zjhm', {}]" :disabled="this.disabled"/>
        </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="24">
          <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款类型">
          <j-dict-select-tag placeholder="请输入贷款类型" v-decorator="['dklx', {}]" dictCode="dklx" :disabled="this.disabled"/>
        </a-form-item>
          </a-col>
          <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款余额">
          <a-input placeholder="请输入贷款余额" v-decorator="['dkye', {}]" :disabled="this.disabled"/>
        </a-form-item>
          </a-col>
          <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交叉类型">
          <j-dict-select-tag placeholder="请输入交叉类型" v-decorator="['jclx', {}]" dictCode="jclx" :disabled="this.disabled"/>
        </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="24">
          <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交叉机构名称">
          <j-tree-select
            v-decorator="['jcjgdm',{}]"
            placeholder="请选择机构"
            treeNodeFilterProp="title"
            dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
            :sszh="true"
            pid-field="sjywjgdm"
            :showSearch="true"
            :disabled="this.disabled"
            :treeDefaultExpandAll=true
          />
        </a-form-item>
          </a-col>
          <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交叉客户名称">
          <a-input placeholder="请输入交叉客户名称" v-decorator="['jckhmc', {}]" :disabled="this.disabled"/>
        </a-form-item>
          </a-col>
          <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交叉证件号码">
          <a-input placeholder="请输入交叉证件号码" v-decorator="['jczjhm', {}]" :disabled="this.disabled"/>
        </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="24">
          <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交叉贷款类型">
          <j-dict-select-tag placeholder="请输入交叉贷款类型" v-decorator="['jcdklx', {}]" dictCode="dklx" :disabled="this.disabled"/>
        </a-form-item>
          </a-col>
          <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交叉余额">
          <a-input placeholder="请输入交叉余额" v-decorator="['jcye', {}]" :disabled="this.disabled"/>
        </a-form-item>
          </a-col>
          <a-col :lg="8">
        <!--<a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交换标志">
          <a-input placeholder="请输入交换标志" v-decorator="['jhbz', {}]" />
        </a-form-item>-->
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
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import ACol from "ant-design-vue/es/grid/Col";

  export default {
    name: "JcdkmxModal",
    components: {ACol,JTreeSelect},
    data () {
      return {
        title:"操作",
        visible: false,
        disabled: true,
        disableSubmit: true,
        confirmLoading: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        form: this.$form.createForm(this),
        validatorRules:{
        },
        url: {
          add: "/jcdkmx/jcdkmx/add",
          edit: "/jcdkmx/jcdkmx/edit",
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
          this.form.setFieldsValue(pick(this.model,'jgdm','khmc','zjhm','dklx','dkye','jclx','jcjgdm','jckhmc','jczjhm','jcdklx','jcye'))
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