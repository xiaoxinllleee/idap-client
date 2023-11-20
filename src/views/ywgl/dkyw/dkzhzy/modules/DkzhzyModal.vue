<template>
  <a-modal
    :title="title"
    :width="1400"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-card title="待转移员工信息">

            <a-row :gutter="24">
              <a-col :lg="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="归属机构">
                  <j-tree-select placeholder="请选择所属机构"
                                 v-decorator="['jgdm', {}]"
                                 :disabled="true"
                                 treeNodeFilterProp="title"
                                 pid-field="sjywjgdm"
                                 dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                                 :showSearch="true"
                                 :treeDefaultExpandAll="true"/>
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="员工姓名">
                  <a-input placeholder="请输入员工姓名"   :disabled="true" v-decorator="['ygxm']" />
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="员工工号">
                  <a-input placeholder="请输入员工工号"  :disabled="true" v-decorator="['yggh']" />
                </a-form-item>
              </a-col>
            </a-row>

            <a-row :gutter="24">
              <a-col :lg="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="客户经理编号">
                  <a-input placeholder="请输入客户经理编号"   :disabled="true" v-decorator="['khjlbz']" />

                </a-form-item>
              </a-col>
              <a-col :lg="8" v-show="this.model.dkzh!=null">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="贷款账号">
                  <a-input placeholder="请输入贷款账号"  :disabled="true"  v-decorator="['dkzh']" />
                </a-form-item>
              </a-col>
              <a-col :lg="8"  v-show="this.model.dkzh==null">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="待转移账号数">
                  <a-input placeholder="请输入待转移账号数"  :disabled="true"  v-decorator="['zhs']" />
                </a-form-item>
              </a-col>
            </a-row>


        </a-card>
        <a-card title="请选择转移的员工">
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="接收人">
            <j-select-ygxx  ref="zkhjl" :treeDefaultExpandAll="true" v-model="zyhyg" @selectComplete="selectComplete" @change="GetValueSskhjl"/>

<!--            <j-dict-select-tag  :triggerChange="true" :showSearch="true" placeholder="请选择责任人" v-decorator="['zyhyg',{}]" @change="ygghChange" style="width: 100%" :dict-code="ygghSql"/>-->
          </a-form-item>
        </a-card>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JSelectYgxx from './JSelectYgxx'
  export default {
    name: "DkzhzyModal",
    components: {
      JTreeSelect,JSelectYgxx
    },
    data () {
      return {
        zyhyg:'',
        zyhygxm:'',
        zyhxx:'',
        title:"操作",
        visible: false,
        model: {},
        ygghSql:"V_HR_BAS_STAFF_POST,YGXM||'_'||YGGH||'_'||GWMC,YGGH",
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
        org:{rules: [{ required: true, message: '请输入org!' }]},
        },
        url: {
          add: "/dkzhzy/dkzhzy/add",
          edit: "/dkzhzy/dkzhzy/edit",
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
          this.form.setFieldsValue(pick(this.model,'jgdm','yggh','ygxm','khjlbz','zhs','dkzh','zyhyg'))
        });

      },
      GetValueSskhjl(value){
        this.zyhyg=value.ygxm;
      },
      selectComplete(value){
        console.log(value)
        this.zyhxx=value;
      },
      close () {
        this.$emit('close');
        this.visible = false;
        this.zyhyg='';
      },
      handleOk () {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let httpurl = this.url.add;
            let method = 'post';
            let zyhData={zyhyggh:this.zyhxx.yggh,zyhzzbz:this.zyhxx.zzbz,zyhgwbz:this.zyhxx.gwbz,zyhkhjlbz:this.zyhxx.khjlbz,zyhgyh:this.zyhxx.gyh}
            let formData = Object.assign(this.model, values,zyhData);
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