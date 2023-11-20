<template>
  <a-drawer
    :title="title"
    :width="500"
    placement="right"
    :closable="false"
    @close="close"
    :visible="visible"
  >

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="创建人">
          <a-input placeholder="请输入创建人" v-decorator="['creator', validatorRules.creator]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="修改人">
          <a-input placeholder="请输入修改人" v-decorator="['updator', validatorRules.updator]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="名称">
          <a-input placeholder="请输入名称" v-decorator="['title', validatorRules.title]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="图标">
          <a-input placeholder="请输入图标" v-decorator="['icon', validatorRules.icon]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="描述">
          <a-input placeholder="请输入描述" v-decorator="['description', validatorRules.description]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="路径">
          <a-input placeholder="请输入路径" v-decorator="['page', validatorRules.page]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否启用">
<!--          <a-input placeholder="请输入是否启用" v-decorator="['sfqy_dictText', validatorRules.sfqy]" />-->
          <j-dict-select-tag placeholder="请输入是否启用" v-decorator="['sfqy_dictText', validatorRules.sfqy]" dict-code="qybz"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="分类">
<!--          <a-input placeholder="请输入分类" v-decorator="['type', validatorRules.type]" />-->
          <j-dict-select-tag placeholder="请输入分类" v-decorator="['type_dictText', validatorRules.type]" dict-code="appfl"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="排序">
          <a-input placeholder="请输入排序" v-decorator="['px', {}]" />
        </a-form-item>

      </a-form>
    </a-spin>
    <a-button type="primary" @click="handleOk">确定</a-button>
    <a-button type="primary" @click="handleCancel">取消</a-button>
  </a-drawer>
</template>

<script>
import { httpAction } from '@/api/manage'
import pick from 'lodash.pick'
import JTreeSelect from '@comp/jeecg/JTreeSelect'
import moment from "moment"
import JiamiModal from '@views/xddagl/dkdagl/cldkhtsjgl/modules/JiamiModal'
import TiquModal from '@views/xddagl/dkdagl/cldkhtsjgl/modules/TiquModal'

export default {
  name: "AppzypzModal",
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
        creator:{rules: [{ required: true, message: '请输入创建人!' }]},
        updator:{rules: [{ required: true, message: '请输入更新人!' }]},
        title:{rules: [{ required: true, message: '请输入名称!' }]},
        icon:{rules: [{ required: true, message: '请输入图标!' }]},
        description:{rules: [{ required: true, message: '请输入描述!' }]},
        page:{rules: [{ required: true, message: '请输入路径!' }]},
        sfqy:{rules: [{ required: true, message: '请输入是否启用!' }]},
        type:{rules: [{ required: true, message: '请输入分类!' }]},
      },
      url: {
        add: "/home/appHomepage/add",
        edit: "/home/appHomepage/edit",
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
        this.form.setFieldsValue(pick(this.model,'creator','updator','title','icon','description','page','sfqy_dictText','type_dictText','px'))
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
/** Button按钮间距 */
.ant-btn {
  margin-left: 30px;
  margin-bottom: 30px;
  float: right;
}
</style>