<template>
  <a-modal
    :title="title"
    :width="1000"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    :okButtonProps="{ props: {disabled: disableSubmit} }"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-row class="form-row" :gutter="8">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="入岗组织">
              <j-tree-select placeholder="请选择入岗组织" v-decorator="['zzbz', validatorRules.zzbz]"
                             dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                             :showSearch="true" :treeDefaultExpandAll="true" :filterTreeNode="true" :isAll="false"/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="8">
          <a-col :span="12">
            <a-form-item :labelCol="labelCol"
                         :wrapperCol="wrapperCol" label="员工工号">
              <a-input-search  v-decorator="['yggh', validatorRules.yggh]"
                placeholder="选择员工"
                readOnly
                @search="handleAddUserDepart" >
                <a-button slot="enterButton" icon="search"></a-button>
              </a-input-search>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item :labelCol="labelCol"
                         :wrapperCol="wrapperCol" label="员工姓名">

                <a-input placeholder="员工姓名" v-decorator="['ygxm', ]" disabled/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="8">
          <a-col :span="12">
            <a-form-item :labelCol="labelCol"
                         :wrapperCol="wrapperCol" label="柜员号">

              <a-input placeholder="请输入柜员号" v-decorator="['gyh', {}]" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="labelCol"
                         :wrapperCol="wrapperCol" label="客户经理标识">

              <a-input placeholder="请输入客户经理标识" v-decorator="['khjlbz', {}]" disabled/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="8">
          <a-col :span="12">
            <a-form-item :labelCol="labelCol"
                         :wrapperCol="wrapperCol" label="岗位名称">
              <j-dict-select-tag placeholder="请选择岗位" v-decorator="['gwbz', validatorRules.gwbz]" readOnly
                                 dict-code="HR_BAS_POST,GWMC,GWBZ" :trigger-change="true" :show-search="true" />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item :labelCol="labelCol"
                         :wrapperCol="wrapperCol" label="入岗类型">

              <j-dict-select-tag  v-decorator="['rglx', {rules: [],initialValue:'1'}]" :triggerChange="true" placeholder="请选择入岗类型" dictCode="rglx"/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="8">
          <a-col :span="12">
            <a-form-item :labelCol="labelCol"
                         :wrapperCol="wrapperCol" label="是否参与考核">
              <j-dict-select-tag placeholder="请选择是否参与考核" v-decorator="['sfcykh', {rules: [],initialValue:'1'}]"
                                 dictCode="sfbz" :trigger-change="true" :show-search="true" />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item :labelCol="labelCol"
                         :wrapperCol="wrapperCol" label="是否临退休">
              <j-dict-select-tag placeholder="请选择是否临退休" v-decorator="['sfltx', {rules: [],initialValue:'2'}]"
                                 dictCode="sfbz" :trigger-change="true" :show-search="true" />
            </a-form-item>
          </a-col>

        </a-row>

        <a-row class="form-row" :gutter="8">
          <a-col :span="12">
            <a-form-item :labelCol="labelCol"
                         :wrapperCol="wrapperCol" label="入岗日期">
              <a-date-picker placeholder="请选择入岗日期"  v-decorator="['rgrq', validatorRules.rgrq]"  allowClear/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="labelCol"
                         :wrapperCol="wrapperCol" label="离岗日期">
              <a-date-picker placeholder="请选择离岗日期"  v-decorator="['lgrq', {}]"  allowClear/>
            </a-form-item>
          </a-col>

        </a-row>

        <a-row class="form-row" :gutter="8">


          <a-col :span="12">
            <a-form-item :labelCol="labelCol"
                         :wrapperCol="wrapperCol" label="备注">

              <a-input placeholder="请输入备注"  v-decorator="['bz', {}]"  allowClear/>
            </a-form-item>
          </a-col>
        </a-row>




      </a-form>
    </a-spin>

    <Select-User-Modal ref="selectUserModal" @selectFinished="selectOK"></Select-User-Modal>

  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import SelectUserModal from './SelectUserModal'

  export default {
    name: "HrBasStaffPostModal",
    components: {
     JTreeSelect,SelectUserModal
    },
    data () {
      return {
        title:"操作",
        visible: false,
        model: {},
        disableSubmit: false,
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
        zzbz:{rules: [{ required: true, message: '请输入组织标识!' }]},
        yggh:{rules: [{ required: true, message: '请输入员工工号!' }]},
        rgrq:{rules: [{ required: true, message: '请选择入岗日期!' }]},
        },
        url: {
          add: "/ygrggl/hrBasStaffPost/add",
          edit: "/ygrggl/hrBasStaffPost/edit",
        },
      }
    },
    created () {
    },
    methods: {
      selectOK(data) {
        console.log('selectOK', data)
        this.form.setFieldsValue({yggh:data[0].yggh})
        this.form.setFieldsValue({ygxm:data[0].ygxm})
        this.form.setFieldsValue({gyh:data[0].gyh})
        this.form.setFieldsValue({khjlbz:data[0].khjlbh})

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
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'sfltx','khjlbz','gyh','bz','scbz','scczy','sfcykh','zzbz','yggh','gwbz','rglx'))
		  //时间格式化
          this.form.setFieldsValue({scsj:this.model.scsj?moment(this.model.scsj):null})
          this.form.setFieldsValue({rgrq:this.model.rgrq?moment(this.model.rgrq):null})
          this.form.setFieldsValue({lgrq:this.model.lgrq?moment(this.model.lgrq):null})
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
            // formData.scsj = formData.scsj?formData.scsj.format():null;
            formData.rgrq = formData.rgrq?formData.rgrq.format("YYYY-MM-DD"):null;
            formData.lgrq = formData.lgrq?formData.lgrq.format("YYYY-MM-DD"):null;

            console.log('formData', formData)
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