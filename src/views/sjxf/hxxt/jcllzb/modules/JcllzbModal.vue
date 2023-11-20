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
      
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="socNo">
          <a-input placeholder="请输入socNo" v-decorator="['socNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="areaId">
          <a-input placeholder="请输入areaId" v-decorator="['areaId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="baseId">
          <a-input placeholder="请输入baseId" v-decorator="['baseId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="rateId">
          <a-input placeholder="请输入rateId" v-decorator="['rateId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="basmDate">
          <a-input placeholder="请输入basmDate" v-decorator="['basmDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="basmTime">
          <a-input placeholder="请输入basmTime" v-decorator="['basmTime', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="rate">
          <a-input placeholder="请输入rate" v-decorator="['rate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="status">
          <a-input placeholder="请输入status" v-decorator="['status', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="keyPointer">
          <a-input placeholder="请输入keyPointer" v-decorator="['keyPointer', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="maturityDate">
          <a-input placeholder="请输入maturityDate" v-decorator="['maturityDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="recalcInd">
          <a-input placeholder="请输入recalcInd" v-decorator="['recalcInd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="recalcDate">
          <a-input placeholder="请输入recalcDate" v-decorator="['recalcDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="description">
          <a-input placeholder="请输入description" v-decorator="['description', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="tellerNo1">
          <a-input placeholder="请输入tellerNo1" v-decorator="['tellerNo1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="tellerNo2">
          <a-input placeholder="请输入tellerNo2" v-decorator="['tellerNo2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="branchNo">
          <a-input placeholder="请输入branchNo" v-decorator="['branchNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="terminalNo">
          <a-input placeholder="请输入terminalNo" v-decorator="['terminalNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="lastDateChanged">
          <a-input placeholder="请输入lastDateChanged" v-decorator="['lastDateChanged', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="lastTimeChanged">
          <a-input placeholder="请输入lastTimeChanged" v-decorator="['lastTimeChanged', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="lastMaintDate">
          <a-input placeholder="请输入lastMaintDate" v-decorator="['lastMaintDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="lastMaintStat">
          <a-input placeholder="请输入lastMaintStat" v-decorator="['lastMaintStat', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="sDate">
          <a-input placeholder="请输入sDate" v-decorator="['sdate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="eDate">
          <a-input placeholder="请输入eDate" v-decorator="['edate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="loadDate">
          <a-input placeholder="请输入loadDate" v-decorator="['loadDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="天入库表编号-对不同的表名唯一">
          <a-input placeholder="请输入天入库表编号-对不同的表名唯一" v-decorator="['dtnum', validatorRules.dtnum ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="dttime">
          <a-date-picker v-decorator="[ 'dttime', {}]" />
        </a-form-item>
		
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "JcllzbModal",
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
        dtnum:{rules: [{ required: true, message: '请输入天入库表编号-对不同的表名唯一!' }]},
        },
        url: {
          add: "/jcllzb/jcllzb/add",
          edit: "/jcllzb/jcllzb/edit",
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
          this.form.setFieldsValue(pick(this.model,'socNo','areaId','baseId','rateId','basmDate','basmTime','rate','status','keyPointer','maturityDate','recalcInd','recalcDate','description','tellerNo1','tellerNo2','branchNo','terminalNo','lastDateChanged','lastTimeChanged','lastMaintDate','lastMaintStat','sdate','edate','loadDate','dtnum'))
		  //时间格式化
          this.form.setFieldsValue({dttime:this.model.dttime?moment(this.model.dttime):null})
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
            formData.dttime = formData.dttime?formData.dttime.format():null;
            
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