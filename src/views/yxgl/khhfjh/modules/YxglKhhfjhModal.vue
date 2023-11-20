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
        <a-row>
          <a-col :span="12" :gutter="8">
        <a-form-item
          v-if="this.jhyfFlag1"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="计划月份"
          >
          <a-month-picker @change="onChange"  v-model="jhyf"   placeholder="请选择月份" style="width: 321px"/>
        </a-form-item>
            <a-form-item
              :labelCol="labelCol"
              v-if="this.jhyfFlag2"
              :wrapperCol="wrapperCol"
              label="计划月份"
              validate-status="error"
              help="请选择月份"
              >
              <a-month-picker @change="onChange"  v-model="jhyf"   placeholder="请选择月份" style="width: 321px"/>
            </a-form-item>
          </a-col>

          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="回访客户等级类型">
              <j-dict-select-tag placeholder="请选择回访客户等级类型"  :triggerChange="true" v-decorator="['hfkhdjlx',  validatorRules.hfkhdjlx ]" dict-code="KHDJ_KHDJSZ,DJMC,DJBH"/>
            </a-form-item>
          </a-col>

        </a-row>


        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="计划开始日期">
              <a-date-picker
                disabled
                placeholder="计划开始日期"
                style="width:100%"
                v-model="this.model.jhkssj"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="计划结束日期">
              <a-date-picker
                disabled
                placeholder="计划结束日期"
                style="width:100%"
                v-model="this.model.jhjssj"
              />
            </a-form-item>
          </a-col>
        </a-row>


        <a-row style="margin-top: -20px;">
          <a-col :span="24" :pull="2">
            <a-form-item label="计划概叙"
                         :labelCol="{ xs: { span: 24 }, sm: { span: 6 } }"
                         :wrapperCol="{ xs: { span: 24 }, sm: { span: 18 } }">
              <a-textarea :autosize="{ minRows: 2, maxRows: 4 }"
                          placeholder="请输入计划概叙"
                          v-decorator="['jhgx', { rules: [{ required: true, message: '请输入计划概叙!' }] }]"/>
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

  export default {
    name: "YxglKhhfjhModal",
    data () {
      return {
        title:"操作",
        visible: false,
        model: {
          jhyf:null,
        },
       jhyf:null,
       jhyfFlag1:true,
       jhyfFlag2:false,
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        jhflag:"",
        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
        hfkhdjlx:{rules: [{ required: true, message: '请输入客户回访等级类型!' }]},
        jhyf:{rules: [{ required: true, message: '请输入计划月份!' }]},
        jhkssj:{rules: [{ required: true, message: '请输入计划开始时间!' }]},
        jhjssj:{rules: [{ required: true, message: '请输入计划结束时间!' }]},
        khjl:{rules: [{ required: true, message: '请输入客户经理!' }]},
        },
        url: {
          add: "/yxgl.khhfjh/yxglKhhfjh/add",
          edit: "/yxgl.khhfjh/yxglKhhfjh/edit",
        },
      }
    },
    created () {
    },
    methods: {
      add () {
         this.jhyf=null,
         this.jhkssj=null,
         this.jhjssj=null,
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          if(record.khjl) {
            this.model.jhkssj=moment(record.jhkssj, 'YYYY-MM-DD');
            this.model.jhjssj=moment(record.jhjssj, 'YYYY-MM-DD');
            this.jhyf =moment(record.jhyf, 'YYYY-MM-DD');
          }

          this.form.setFieldsValue(pick(this.model,'khjl','hfkhdjlx','jhgx','sfmxsc','jhyf','jhjssj','jhkssj'))
		  //时间格式化
          this.form.setFieldsValue({jhkssj:this.model.jhkssj?moment(this.model.jhkssj):null})
          this.form.setFieldsValue({jhjssj:this.model.jhjssj?moment(this.model.jhjssj):null})
          this.form.setFieldsValue({jhyf:this.model.jhyf?moment(this.model.jhyf):null})
        });

      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        if (this.jhyf == null) {
          this.jhyfFlag1 = false,
            this.jhyfFlag2 = true
        }else {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if (!this.model.khjl) {
              httpurl += this.url.add;
              method = 'post';
            } else {
              httpurl += this.url.edit;
              method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            formData.jhyf = this.jhyf.format("YYYY-MM") + '-01';
            console.log("@@@@@"+formData.jhkssj)
            formData.jhkssj = formData.jhkssj ? formData.jhkssj.format() : null;
            formData.jhjssj = formData.jhjssj ? formData.jhjssj.format() : null;


            console.log(formData)
            httpAction(httpurl, formData, method).then((res) => {
              if (res.success) {
                that.$message.success(res.message);
                that.$emit('ok');
              } else {
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
              that.close();
            })
            this.jhyfFlag1=true;
              this.jhyfFlag2=false
          }
        })
      }
      },
      handleCancel () {
        this.close()
      },


      onChange(date) {
          this.model.jhkssj=  moment(moment(date).year()+"-"+(moment(date).month()+1)+"-01", 'YYYY-MM-DD');
          this.model.jhjssj=   moment(moment(date).year()+"-"+(moment(date).month()+1)+"-"+moment(date).daysInMonth(), 'YYYY-MM-DD');
      },

    }
  }
</script>

<style lang="less" scoped>

</style>