<template>
  <a-drawer
      :title="title"
      :width="800"
      placement="right"
      :closable="false"
      @close="close"
      :visible="visible"
  >

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">



<!--        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户经理">
          <a-tree
            v-model="checkedKeys"
            checkable
            @check="onCheck"
            :treeData="treeData"
            :replaceFields="{ title:'wgmc', key:'id'}"
          />
        </a-form-item>-->


        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="网格名称">
          <a-input  disabled v-decorator="['menuId_dictText', {}]" />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户经理工号">
          <a-input  disabled v-decorator="['khjl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户经理名称">
          <a-input  disabled v-decorator="['khjl_dictText', {}]" />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户经理权限类型">
          <j-dict-select-tag placeholder="请选择客户经理权限类型" style="width: 100%;" :triggerChange="true"
                             v-decorator="['sfzkhjl', {rules: [{ required: true, message: '请选择客户经理权限类型!' }]} ]" dictCode="sfzkhjl" />
        </a-form-item>


        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="数据权限类型">
          <j-multi-select-tag   placeholder="多选数据权限类型" v-decorator="['sjqx', {}]" dict-code="wgsjqx" style="width: 100%;"/>

        </a-form-item>
		
      </a-form>
    </a-spin>
    <a-button type="primary" @click="handleOk">确定</a-button>
    <a-button type="primary" @click="handleCancel">取消</a-button>
    <Select-User-Modal ref="selectUserModal" @selectFinished="selectOK"></Select-User-Modal>
  </a-drawer>
</template>

<script>
  import { httpAction,getAction,postAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import SelectUserModal from '../../../hr/yggl/ygrggl/modules/SelectUserModal'
  import JMultiSelectTag from '../../../../components/dict/JMultiSelectTag'

  export default {
    name: "YxdyglPqzrrglModalDrawer",
    components:{
      SelectUserModal,JMultiSelectTag
    },
    data () {
      return {
        title:"操作",
        visible: false,
        model: {},
        checkedKeys:[],
        treeData:[],
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
        sfzkhjl:{rules: [{ required: true, message: '请输入是否主客户经理!' }]},
        },
        url: {
          add: "/YXDYGL_PQQXGL/yxdyglPqqxgl/add",
          edit: "/pqqxgl/yxdyglPqqxgl/edit",
          treeUrl:"/yxdyglmain/yxdyglMain/getYxdyglMaimTreeDate",
        },
      }
    },
    created () {
    },
    methods: {

      onCheck(checkedKeys) {
        this.checkedKeys = checkedKeys;
      },
      selectOK(data) {
        console.log(data)
        this.model.khjl = data[0].yggh;
        this.form.setFieldsValue({khjlVal:data[0].ygxm})
      },
      handleAddUserDepart() {
        this.$refs.selectUserModal.visible = true;
      },
      add () {
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        console.log('edit record', record)
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'khjl','khjl_dictText','sfzkhjl','menuId','qfbs','menuId_dictText','sjqx'))
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
/** Button按钮间距 */
  .ant-btn {
    margin-left: 30px;
    margin-bottom: 30px;
    float: right;
  }
</style>