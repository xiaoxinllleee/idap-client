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
      
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="员工组织标志">
          <a-input placeholder="请输入员工组织标志" v-decorator="['zzbz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="员工工号">
          <a-input placeholder="请输入员工工号" v-decorator="['yggh', validatorRules.yggh ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="员工岗位">
          <a-input placeholder="请输入员工岗位" v-decorator="['yggw', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="统计月份">
          <a-date-picker v-decorator="[ 'tjyf', validatorRules.tjyf ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务量组织标志">
          <a-input placeholder="请输入业务量组织标志" v-decorator="['ywlzzbz', validatorRules.ywlzzbz ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="自身业务笔数">
          <a-input placeholder="请输入自身业务笔数" v-decorator="['zsywbs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="自身现金流量">
          <a-input placeholder="请输入自身现金流量" v-decorator="['zsxjll', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="原始分配业务笔数">
          <a-input placeholder="请输入原始分配业务笔数" v-decorator="['ysfpywbs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="原始分配现金流量">
          <a-input placeholder="请输入原始分配现金流量" v-decorator="['ysfpxjll', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构分配业务笔数">
          <a-input placeholder="请输入机构分配业务笔数" v-decorator="['jgfpywbs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构分配现金流量">
          <a-input placeholder="请输入机构分配现金流量" v-decorator="['jgfpxjll', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="ATM分配业务笔数">
          <a-input placeholder="请输入ATM分配业务笔数" v-decorator="['atmfpywbs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="ATM分配现金流量">
          <a-input placeholder="请输入ATM分配现金流量" v-decorator="['atmfpxjll', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="总业务笔数">
          <a-input placeholder="请输入总业务笔数" v-decorator="['zywbs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="总现金流量">
          <a-input placeholder="请输入总现金流量" v-decorator="['zxjll', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="录入时间">
          <a-date-picker v-decorator="[ 'lrsj', {}]" />
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
  import moment from "moment"

  export default {
    name: "YwltqytjModal",
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
        yggh:{rules: [{ required: true, message: '请输入员工工号!' }]},
        tjyf:{rules: [{ required: true, message: '请输入统计月份!' }]},
        ywlzzbz:{rules: [{ required: true, message: '请输入业务量组织标志!' }]},
        },
        url: {
          add: "/ywltqytj/ywltqytj/add",
          edit: "/ywltqytj/ywltqytj/edit",
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
          this.form.setFieldsValue(pick(this.model,'zzbz','yggh','yggw','ywlzzbz','zsywbs','zsxjll','ysfpywbs','ysfpxjll','jgfpywbs','jgfpxjll','atmfpywbs','atmfpxjll','zywbs','zxjll'))
		  //时间格式化
          this.form.setFieldsValue({tjyf:this.model.tjyf?moment(this.model.tjyf):null})
          this.form.setFieldsValue({lrsj:this.model.lrsj?moment(this.model.lrsj):null})
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
            formData.tjyf = formData.tjyf?formData.tjyf.format():null;
            formData.lrsj = formData.lrsj?formData.lrsj.format():null;
            
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