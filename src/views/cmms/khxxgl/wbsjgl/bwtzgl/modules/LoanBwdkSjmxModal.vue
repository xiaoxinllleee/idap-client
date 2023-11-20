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
        <a-row class="form-row" :gutter="24">
<!--        <a-col :lg="12">-->
<!--&lt;!&ndash;        <a-form-item hasFeedback&ndash;&gt;-->
<!--&lt;!&ndash;          :labelCol="labelCol"&ndash;&gt;-->
<!--&lt;!&ndash;          :wrapperCol="wrapperCol"&ndash;&gt;-->
<!--&lt;!&ndash;          label="原机构名称">&ndash;&gt;-->
<!--&lt;!&ndash;          <a-input placeholder="请输入原机构名称" v-decorator="['yjgmc', {}]" />&ndash;&gt;-->
<!--&lt;!&ndash;        </a-form-item>&ndash;&gt;-->
<!--        </a-col>-->
          <a-col :lg="12">
          <a-form-item hasFeedback
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="所属支行">
          <j-tree-select
            v-decorator="['jgdm']"
            placeholder="请选择机构"
            dict="V_HR_BAS_ORGANIZATION_CMMS,ZZJC,ywjgdm"
            pidField="sjywjgdm"
            :treeDefaultExpandAll=true
          >
          </j-tree-select>
        </a-form-item>
          </a-col>
          <a-col :lg="12">
          <a-form-item hasFeedback
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款账号">
          <a-input placeholder="请输入贷款账号"  v-decorator="['dkzh', validatorRules.dkzh ]" />
        </a-form-item>
          </a-col>
          <a-col :lg="12">
          <a-form-item hasFeedback
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="证件号码">
          <a-input placeholder="请输入证件号码" v-decorator="['zjhm', {}]" />
        </a-form-item>
          </a-col>
          <a-col :lg="12">
          <a-form-item hasFeedback
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="姓名">
          <a-input placeholder="请输入姓名" v-decorator="['khmc', {}]" />
        </a-form-item>
          </a-col>
          <a-col :lg="12">

          <a-form-item hasFeedback
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="借款日期">
          <a-date-picker v-decorator="[ 'dkrq', {}]" style="width: 100%"/>
        </a-form-item>
          </a-col>
          <a-col :lg="12">

          <a-form-item hasFeedback
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="到期日期">
          <a-date-picker v-decorator="[ 'dqrq', {}]" style="width: 100%"/>
        </a-form-item>
          </a-col>
          <a-col :lg="12">

          <a-form-item hasFeedback
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="处置金额">
          <a-input placeholder="请输入处置金额" v-decorator="['je', {}]" />
        </a-form-item>
          </a-col>
          <a-col :lg="12">

          <a-form-item hasFeedback
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="欠息">
          <a-input placeholder="请输入欠息" v-decorator="['qx', {}]" />
        </a-form-item>
          </a-col>
          <a-col :lg="12">

          <a-form-item hasFeedback
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="新收回本金">
          <a-input placeholder="请输入新收回本金" v-decorator="['shbj', {}]" />
        </a-form-item>
          </a-col>
          <a-col :lg="12">

          <a-form-item hasFeedback
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="新收回利息">
          <a-input placeholder="请输入新收回利息" v-decorator="['shlx', {}]" />
        </a-form-item>
          </a-col>
          <a-col :lg="12">

          <a-form-item hasFeedback
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="处置类型">
          <a-input placeholder="请输入处置类型" v-decorator="['czlx', {}]" />
        </a-form-item>
          </a-col>
          <a-col :lg="12">

          <a-form-item hasFeedback
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="余额">
          <a-input placeholder="请输入余额" v-decorator="['hxye', {}]" />
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
  // import {  duplicateCheck } from '@/api/api'

  export default {
    name: "LoanBwdkSjmxModal",
    components:{JTreeSelect},
    data () {
      return {
        title:"操作",
        visible: false,
        disable:"true",
        model: {},
        value:1,
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
          dkzh: {
            rules: [{ required: true, message: '请输入贷款账号!' },
              { validator: this.validateDictCode }]
          }
        },
        url: {
          add: "/LoanBwdkSjmx/loanBwdkSjmx/add",
          edit: "/LoanBwdkSjmx/loanBwdkSjmx/edit",
        },

      }
    },
    created () {
    },
    methods: {
      // validateDictCode(rule, value, callback) {
      //   // 重复校验
      //   var params = {
      //     tableName: 'loan_bwdk_sjmx',
      //     fieldName: 'dkzh',
      //     fieldVal: value,
      //     //dataId: this.model.id
      //   }
      //   duplicateCheck(params).then((res) => {
      //     if (res.success) {
      //       callback()
      //     } else {
      //       callback(res.message)
      //     }
      //   })
      // },
      add () {
        this.edit({});
      },
      edit (record) {

        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'qx','czlx','yjgmc','jgdm','dkzh','zjhm','khmc','khdz','lxfs','je','yshje','hxye','zrbwlx','ysll','sssx','zt','lrr','lrbz','shbj','shlx','lx','bj','ywid','zjlx','khzk','jjmc','jkfs','bz','spzt','glzrrgh','yclx','jkzt','sfjrss','sfjrzx','sprgh','bsr','zhhzspr','zzspr','xcblyy','wzqk','hjcs','bwgx','dbwqk','zdcr','cdcr','spcbzrrxm','dkfl','bzzzrrgh','sgsx','czzjcs','dbfmc','dbfzz','dbflxfs','dbwmc','hyfl','qslx','jkyt','bldkrdqk','shbwgx','xh'))
		  //时间格式化
          this.form.setFieldsValue({dkrq:this.model.dkrq?moment(this.model.dkrq):null})
          this.form.setFieldsValue({dqrq:this.model.dqrq?moment(this.model.dqrq):null})
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
            if(!this.model.dkzh){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            formData.dkrq = formData.dkrq?formData.dkrq.format():null;
            formData.dqrq = formData.dqrq?formData.dqrq.format():null;

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