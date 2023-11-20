<template>
  <a-modal
    :title="title"
    width="90%"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-row :gutter="24">
          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="贷款账号">
              <a-input placeholder="请输入贷款账号" :disabled="true" v-decorator="['dkzh', validatorRules.dkzh ]" />
            </a-form-item>
          </a-col>
          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="客户名称">
              <a-input placeholder="请输入客户名称" :disabled="true"  v-decorator="['khmc', {}]" />
            </a-form-item>
          </a-col>
          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="证件号码">
              <a-input placeholder="请输入证件号码" :disabled="true"   v-decorator="['zjhm', {}]" />
            </a-form-item>
          </a-col>

        </a-row>

        <a-row :gutter="24">
          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="机构代码">
            <j-tree-select placeholder="请选择机构代码"
                           :disabled="true"
                           v-decorator="['jgdm', {}]"
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
              label="客户经理标识">
              <a-input placeholder="请输入客户经理标识" :disabled="true"  v-decorator="['custid', {}]" />
            </a-form-item>
          </a-col>
          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="工号">
              <a-input placeholder="请输入工号" :disabled="true"  v-decorator="['jobnumber', {}]" />
            </a-form-item>
          </a-col>

        </a-row>
        <a-row :gutter="24">
          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="责任人姓名">
              <j-select-yggwxx type="radio" v-decorator="['jobnumberzr_dictText', {} ]" ref="selectYggwxx" @change="getYgxx"/>
              <!--<j-dict-select-tag  :triggerChange="true" :showSearch="true" placeholder="请选择责任人" v-decorator="['maturity',{}]" @change="ygghChange" style="width: 100%" :dict-code="ygghSql"/>-->
            </a-form-item>
          </a-col>
          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="责任人工号">
              <a-input placeholder="责任人工号" :disabled="true" v-decorator="['jobnumberzr',{}]" />

            </a-form-item>
          </a-col>
          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="责任客户经理标识">
              <a-input placeholder="请输入责任客户经理标识" :disabled="true" v-decorator="['custidzr', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="24">
          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="追责标识">
              <j-dict-select-tag placeholder="请选择追责标识 " :triggerChange="true" v-decorator="['zzbz', validatorRules.zzbz ]"  dictCode="zzbs"/>
            </a-form-item>
          </a-col>
          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="追责日期">
              <a-date-picker placeholder="请选择追责日期" v-decorator="[ 'zzrq', {}]" />
            </a-form-item>
          </a-col>
          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="是否异议不接收">
              <j-dict-select-tag placeholder="请选择是否异议不接收" :triggerChange="true" v-decorator="['sfyybjs', {}]"  dictCode="sfbz"/>

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
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JSelectYggwxx from '@/components/jeecgbiz/JSelectYggwxx'
  import { deleteAction, getAction } from '@/api/manage'

  export default {
    name: "DksjzrglModal",
    components: {
      JTreeSelect, JSelectYggwxx
    },
    data () {
      return {
        ygghSql:'V_HR_BAS_STAFF_POST,YGXM,YGGH,KHJLZB IS NOT NULL',
        zzbz:'',
        flag:'add',
        title:"操作",
        visible: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },

        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
          dkzh:{rules: [{ required: true, message: '请输入贷款账号!' }]},
          zzbz:{rules: [{ required: true, message: '请选择追责标识!' }]},
        },
        url: {
          add: "/dksjzrgl/dksjzrgl/add",
          edit: "/dksjzrgl/dksjzrgl/edit",
        },
      }
    },
    created () {
    },
    methods: {
      add (record) {
        this.zzbz=record.zzbz;
        delete record.zzbz;
        this.ygghSql='V_HR_BAS_STAFF_POST,YGXM,YGGH,KHJLBZ IS NOT NULL AND ZZBZ =' +this.zzbz;
        this.flag='add';
        record.flag='add'
        this.edit(record);
      },

      edit (record) {
        console.log(record)
        if(record.flag!='add'){
          this.flag='edit';
        }
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'sfyybjs','dkzh','khmc','zjhm','jgdm','custid','jobnumber','custidzr','jobnumberzr','zzbz','jobnumberzr_dictText'))
		  //时间格式化
          this.form.setFieldsValue({zzrq:this.model.zzrq?moment(this.model.zzrq):null})
        });

      },
      ygghChange(val){
        console.log(val);
        var param = Object.assign({}, {jobnumber:val});
        getAction("/dksjzrgl/dksjzrgl/getYgxx", param).then((res) => {
          if (res.success) {
            console.log(res.result);
            if(res.result){
              this.form.setFieldsValue(
                {
                  jobnumberzr: res.result.yggh,
                  custidzr: res.result.khjlbh
                }
              )
            }
          }else{
            this.$message.error("员工信息查询失败!")

          }
        })

      },
      getYgxx(ygxx) {
        console.log('getYgxx', ygxx)
        this.form.setFieldsValue({jobnumberzr: ygxx.yggh, custidzr: ygxx.khjlbz})
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
            if(this.flag=='add'){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            formData.zzrq = formData.zzrq?formData.zzrq.format():null;

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