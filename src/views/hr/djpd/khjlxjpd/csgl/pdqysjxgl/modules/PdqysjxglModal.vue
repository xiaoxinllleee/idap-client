<template>
  <a-modal
    :title="title"
    :width="1750"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :okButtonProps="{props:{disabled:disableSubmit}}"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row class="form-row" :gutter="24">
          <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="数据项编号">
          <a-input placeholder="请输入数据项编号" v-decorator="['sjxno', validatorRules.sjxno ]" />
        </a-form-item>
          </a-col>
          <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="数据项ID">
          <a-input placeholder="请输入数据项ID" v-decorator="['sjxid', validatorRules.sjxid]" />
        </a-form-item>
          </a-col>
          <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="数据项类型">
          <j-dict-select-tag v-decorator="['sjxlx', validatorRules.sjxlx]" :triggerChange="true" placeholder="请选择数据项类型"
                             dictCode="sjxlx"/>
        </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="24">
          <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="数据项维度">
          <j-dict-select-tag v-decorator="['sjxwd', validatorRules.sjxwd]" :triggerChange="true" placeholder="请选择数据项维度"
                             dictCode="rqwd"/>
        </a-form-item>
          </a-col>
          <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="数据项名称">
          <a-input placeholder="请输入数据项名称" v-decorator="['sjxmc', validatorRules.sjxmc]" />
        </a-form-item>
          </a-col>
          <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="区域代码">
          <a-input placeholder="请输入区域代码" v-decorator="['qydm', validatorRules.qydm ]" />
        </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="24">
          <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="启用标识">
          <j-dict-select-tag v-decorator="['qybz', validatorRules.qybz]" :triggerChange="true" placeholder="请选择启用标识"
                             dictCode="sjxqybz"/>
        </a-form-item>
          </a-col>
          <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="考核方式">
          <j-dict-select-tag v-decorator="['khfs', validatorRules.khfs]" :triggerChange="true" placeholder="请选择考核方式"
                             dictCode="khfs"/>
        </a-form-item>
          </a-col>
          <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="执行批次">
          <a-input placeholder="请输入执行批次" v-decorator="['zxpc', {}]" />
        </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="24">
          <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="执行顺序">
          <a-input placeholder="请输入执行顺序" v-decorator="['zxsx', {}]" />
        </a-form-item>
          </a-col>
          <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="考核数据逻辑说明">
          <a-textarea placeholder="请输入考核数据逻辑说明" v-decorator="['khjsljsm', {}]" :autoSize="true" />
        </a-form-item>
          </a-col>
          <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="工资计算逻辑说明">
          <a-textarea placeholder="请输入工资计算逻辑说明" v-decorator="['gzsjljsm', {}]" :autoSize="true"/>
        </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="24">
          <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="数据项SQL">
          <a-textarea placeholder="请输入数据项SQL" v-decorator="['khjssql', {}]" :autoSize="true"/>
        </a-form-item>
          </a-col>
          <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="指标工资计算SQL">
          <a-textarea placeholder="请输入指标工资计算SQL" v-decorator="['gzjssql', {}]" :autoSize="true"/>
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
  import JTreeSelect from '@comp/jeecg/JTreeSelect'

  export default {
    name: "PdqysjxglModal",
    components: {
      JTreeSelect
    },
    data () {
      return {
        sfqy:'',
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
        sjxno:{rules: [{ required: true, message: '请输入数据项编号!' }]},
        qydm:{rules: [{ required: true, message: '请输入区域代码!' }]},
        sjxid:{rules: [{ required: true, message: '请输入数据项ID!' }]},
        sjxmc:{rules: [{ required: true, message: '请输入数据项名称!' }]},
        sjxwd:{rules: [{ required: true, message: '请选择数据项维度!' }]},
        sjxlx:{rules: [{ required: true, message: '请选择数据项类型!' }]},
        khfs:{rules: [{ required: true, message: '请选择考核方式!' }]},
        qybz:{rules: [{ required: true, message: '请选择启用标志!' }]},
        },
        url: {
          add: "/pdqysjxgl/pdqysjxgl/add",
          edit: "/pdqysjxgl/pdqysjxgl/edit",
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
          this.form.setFieldsValue(pick(this.model,'sjxno','sjxid','sjxlx','sjxwd','sjxmc','qydm','khjssql','gzjssql','qybz','khfs','zxpc','zxsx','khjsljsm','gzsjljsm'))
		  //时间格式化
          /*this.form.setFieldsValue({lrsj:this.model.lrsj?moment(this.model.lrsj):null})*/
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
            if(!this.model.sjxno){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            /*formData.lrsj = formData.lrsj?formData.lrsj.format():null;*/

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