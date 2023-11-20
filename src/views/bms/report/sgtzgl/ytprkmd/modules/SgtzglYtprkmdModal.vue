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
          label="序号">
          <a-input placeholder="请输入序号" v-decorator="['xh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="数据日期">
          <a-date-picker v-decorator="[ 'fiscalDate', validatorRules.fiscalDate]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="县(市、区、旗)">
          <a-input placeholder="请输入县(市、区、旗)" v-decorator="['cs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="乡(镇)">
          <a-input placeholder="请输入乡(镇)" v-decorator="['xz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="行政村">
          <a-input placeholder="请输入行政村" v-decorator="['xzc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="自然村">
          <a-input placeholder="请输入自然村" v-decorator="['zrc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="户编号">
          <a-input placeholder="请输入户编号" v-decorator="['hbh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="人编号">
          <a-input placeholder="请输入人编号" v-decorator="['rgh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="姓名">
          <a-input placeholder="请输入姓名" v-decorator="['xm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="证件号码">
          <a-input placeholder="请输入证件号码" v-decorator="['zjhm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="人数">
          <a-input placeholder="请输入人数" v-decorator="['rs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="与户主关系">
          <a-input placeholder="请输入与户主关系" v-decorator="['yhzgx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="民族">
          <a-input placeholder="请输入民族" v-decorator="['mz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="文化程度">
          <a-input placeholder="请输入文化程度" v-decorator="['whcd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="在校生状况">
          <a-input placeholder="请输入在校生状况" v-decorator="['zxszk', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="健康状况">
          <a-input placeholder="请输入健康状况" v-decorator="['jkzk', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="劳动技能">
          <a-input placeholder="请输入劳动技能" v-decorator="['ldjn', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="务工时间（月）">
          <a-input placeholder="请输入务工时间（月）" v-decorator="['wgsj', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否参加大病保险">
          <a-input placeholder="请输入是否参加大病保险" v-decorator="['sfcjdbbx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="致贫原因1">
          <a-input placeholder="请输入致贫原因1" v-decorator="['zpyy', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="危房户">
          <a-input placeholder="请输入危房户" v-decorator="['wfh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否解决安全饮用水">
          <a-input placeholder="请输入是否解决安全饮用水" v-decorator="['sfjjaqyys', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="人均纯收入">
          <a-input placeholder="请输入人均纯收入" v-decorator="['rjcsr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="户联系电话">
          <a-input placeholder="请输入户联系电话" v-decorator="['hlxdh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="人联系电话">
          <a-input placeholder="请输入人联系电话" v-decorator="['rlxdh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="首次识别时间">
          <a-input placeholder="请输入首次识别时间" v-decorator="['scsbsj', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="人员识别时间">
          <a-input placeholder="请输入人员识别时间" v-decorator="['rysbsj', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="户类型">
          <a-input placeholder="请输入户类型" v-decorator="['hlx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="易返贫致贫户(监测对象)类型">
          <a-input placeholder="请输入易返贫致贫户(监测对象)类型" v-decorator="['yfpzph', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="风险是否消除">
          <a-input placeholder="请输入风险是否消除" v-decorator="['fxsfxc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="风险识别时间">
          <a-input placeholder="请输入风险识别时间" v-decorator="['fxsbsj', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="风险消除时间">
          <a-input placeholder="请输入风险消除时间" v-decorator="['fxxcsj', {}]" />
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
    name: "SgtzglYtprkmdModal",
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
          fiscalDate: { rules: [{ required: true, message: '请选择数据日期!' }] },

        },
        url: {
          add: "/ytprkmd/sgtzglYtprkmd/add",
          edit: "/ytprkmd/sgtzglYtprkmd/edit",
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
          this.form.setFieldsValue(pick(this.model,'fiscalDate','zjhm','xh','cs','xz','xzc','zrc','hbh','rgh','xm','rs','yhzgx','mz','whcd','zxszk','jkzk','ldjn','wgsj','sfcjdbbx','zpyy','wfh','sfjjaqyys','rjcsr','hlxdh','rlxdh','scsbsj','rysbsj','hlx','yfpzph','fxsfxc','fxsbsj','fxxcsj'))
		  //时间格式化
          this.form.setFieldsValue({fiscalDate:this.model.fiscalDate?moment(this.model.fiscalDate):null})

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
            formData.fiscalDate = formData.fiscalDate?formData.fiscalDate.format():null;

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