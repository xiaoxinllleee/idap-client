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

        <a-row class="form-row" :gutter="8">
          <a-col :span="12">
            <a-form-item :labelCol="labelCol"
                         :wrapperCol="wrapperCol" label="员工工号">
              <a-input placeholder="员工姓名" v-decorator="['yggh', ]" disabled/>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item :labelCol="labelCol"
                         :wrapperCol="wrapperCol" label="员工姓名">
              <a-input placeholder="员工姓名" v-decorator="['yggh_dictText', ]" disabled/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="8">
          <a-col :span="12">
            <a-form-item :labelCol="labelCol"
                         :wrapperCol="wrapperCol" label="所属支行">
              <a-input placeholder="所属支行" v-decorator="['zzbz_dictText', ]" disabled/>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item :labelCol="labelCol"
                         :wrapperCol="wrapperCol" label="岗位名称">
              <a-input placeholder="岗位名称" v-decorator="['gwbz_dictText', ]" disabled/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="8">
          <a-col :span="12">
            <a-form-item :labelCol="labelCol"
                         :wrapperCol="wrapperCol" label="入岗日期">

              <a-date-picker placeholder="请选择月份"  v-decorator="['nrgrq', {}]"  disabled/>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item :labelCol="labelCol"
                         :wrapperCol="wrapperCol" label="入岗类型">

              <a-input  v-decorator="['rglx_dictText', ]" disabled />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="8">
          <a-col :span="12">
            <a-form-item :labelCol="labelCol"
                         :wrapperCol="wrapperCol" label="是否参与考核">
              <a-input placeholder="请选择是否参与考核" v-decorator="['sfcykh_dictText',]" disabled />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item :labelCol="labelCol"
                         :wrapperCol="wrapperCol" label="备注">

              <a-input  v-decorator="['nbz', {}]"  disabled/>
            </a-form-item>
          </a-col>

        </a-row>

        <a-divider>调岗后</a-divider>


        <a-row class="form-row" :gutter="8">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="调入支行">
              <j-tree-select placeholder="请选择所属支行" v-decorator="['zzbz', validatorRules.zzbz]"
                             dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                             :showSearch="true" :treeDefaultExpandAll="true" :filterTreeNode="true" :isAll="false"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="labelCol"
                         :wrapperCol="wrapperCol" label="岗位名称">
              <j-dict-select-tag placeholder="请选择岗位" v-decorator="['gwbz', validatorRules.gwbz]" readOnly
                                 dict-code="HR_BAS_POST,GWMC,GWBZ" :trigger-change="true" :show-search="true" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="8">
          <a-col :span="12">
            <a-form-item :labelCol="labelCol"
                         :wrapperCol="wrapperCol" label="调入日期">

              <a-date-picker placeholder="请选择调入日期"  v-decorator="['rgrq', {}]"  />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item :labelCol="labelCol"
                         :wrapperCol="wrapperCol" label="入岗类型">

              <j-dict-select-tag  v-decorator="['rglx', {rules: [],initialValue:'1'}]" :triggerChange="true" placeholder="请选择入岗类型"
                                  dictCode="rglx"/>
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
                         :wrapperCol="wrapperCol" label="备注">

              <a-input placeholder="请输入备注"  v-decorator="['bz', {}]"  />
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
        },
        url: {
          add: "/ygrggl/hrBasStaffPost/add",
          edit: "/ygrggl/hrBasStaffPost/reedit",
        },
      }
    },
    created () {
    },
    methods: {
      selectOK(data) {
       console.log(data)
        this.form.setFieldsValue({yggh:data[0].yggh})
        this.form.setFieldsValue({ygxm:data[0].ygxm})
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
        this.model.nrgrq = record.rgrq;
        this.model.rgrq = new Date();
        this.model.nbz = record.bz;
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'sfltx','khjlbz','gyh','bz','nbz','scbz','scczy','sfcykh','zzbz','yggh','gwbz','rglx','yggh_dictText','gwbz_dictText','sfcykh_dictText','rglx_dictText','zzbz_dictText'))
		  //时间格式化
          this.form.setFieldsValue({scsj:this.model.scsj?moment(this.model.scsj):null})
          this.form.setFieldsValue({rgrq:this.model.rgrq?moment(this.model.rgrq).startOf('month'):null})
          this.form.setFieldsValue({nrgrq:this.model.nrgrq?moment(this.model.nrgrq):null})
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
            formData.rgrq = formData.rgrq?formData.rgrq.format():null;
            formData.lgrq = formData.lgrq?formData.lgrq.format():null;
            
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