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
          label="债券代码
">
          <a-input placeholder="请输入债券代码
" v-decorator="['zjdm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="债券名称
">
          <a-input placeholder="请输入债券名称
" v-decorator="['zjmc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="债券票面利率
">
          <a-input placeholder="请输入债券票面利率
" v-decorator="['zjpmll', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="票面金额（元）
">
          <a-input placeholder="请输入票面金额（元）
" v-decorator="['pmjey', {}]" />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前账面余额（元)
">
          <a-input placeholder="请输入当前账面余额（元)
" v-decorator="['dqzmjey', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="计提应收利息余额（元）
">
          <a-input placeholder="请输入计提应收利息余额（元）
" v-decorator="['jtyslxyey', {}]" />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="计提减值准备（元）
">
          <a-input placeholder="请输入计提减值准备（元）
" v-decorator="['jzzb', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="应计提减值准备（万元）
">
          <a-input placeholder="请输入应计提减值准备（万元）
" v-decorator="['yjtjzzb', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="已计提减值
">
          <a-input placeholder="请输入已计提减值
" v-decorator="['yjtjz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账面余额合计（元）
">
          <a-input placeholder="请输入账面余额合计（元）
" v-decorator="['zmyehjy', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账面余额合计（万元）
">
          <a-input placeholder="请输入账面余额合计（万元）
" v-decorator="['zmyehjwy', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="债券类别
">
          <a-input placeholder="请输入债券类别
" v-decorator="['zjlb', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发行主体1
">
          <a-input placeholder="请输入发行主体1
" v-decorator="['fhzt1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发行主体2
">
          <a-input placeholder="请输入发行主体2
" v-decorator="['fhzt2', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="会计分类
">
          <a-input placeholder="请输入会计分类
" v-decorator="['kjfl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="买入日
">
          <a-input placeholder="请输入买入日
" v-decorator="['mrr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交易对手方（季度填写，报银监）
">
          <a-input placeholder="请输入交易对手方（季度填写，报银监）
" v-decorator="['jydsf', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="基准日
">
          <a-input placeholder="请输入基准日
" v-decorator="['jzr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="到期日
">
          <a-input placeholder="请输入到期日
" v-decorator="['dqr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="剩余期限（天）
">
          <a-input placeholder="请输入剩余期限（天）
" v-decorator="['syxq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="剩余年数
">
          <a-input placeholder="请输入剩余年数
" v-decorator="['syns', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="剩余月数
">
          <a-input placeholder="请输入剩余月数
" v-decorator="['syys', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="评级
">
          <a-input placeholder="请输入评级
" v-decorator="['pj', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="湖南地区
">
          <a-input placeholder="请输入湖南地区
" v-decorator="['dq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="五级分类
">
          <a-input placeholder="请输入五级分类
" v-decorator="['wjfl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否涉政
">
          <a-input placeholder="请输入是否涉政
" v-decorator="['shsz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="数据日期">
          <a-date-picker v-decorator="[ 'sjrq', {}]" />
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
    name: "XtxjtzqkbModal",
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
        },
        url: {
          add: "/xtxjtzqkb/xtxjtzqkb/add",
          edit: "/xtxjtzqkb/xtxjtzqkb/edit",
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
          this.form.setFieldsValue(pick(this.model,'zjdm','zjmc','zjpmll','pmjey','dqzmjey','jtyslxyey','jzzb','yjtjzzb','yjtjz','zmyehjy','zmyehjwy','zjlb','fhzt1','fhzt2','kjfl','mrr','jydsf','jzr','dqr','syxq','syns','syys','pj','dq','wjfl','shsz'))
		  //时间格式化
          this.form.setFieldsValue({sjrq:this.model.sjrq?moment(this.model.sjrq):null})
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
            formData.sjrq = formData.sjrq?formData.sjrq.format():null;

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