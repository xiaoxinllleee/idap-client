<template>
  <a-modal
    :title="title"
    :width="1300"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row class="form-row" :gutter="24">
          <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="法人行机构码">
          <a-input placeholder="请输入法人行机构码" v-decorator="['frhjgdm', {}]" :disabled="this.disabled"/>
        </a-form-item>
          </a-col>
          <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="法人行机构名称">
          <a-input placeholder="请输入法人行机构名称" v-decorator="['frhjgmc', {}]" :disabled="this.disabled"/>
        </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="24">
          <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="营业网点名称">
          <a-input placeholder="请输入营业网点名称" v-decorator="['yywdmc', {}]" :disabled="this.disabled"/>
        </a-form-item>
          </a-col>
          <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="网点机构码">
          <a-input placeholder="请输入网点机构码" v-decorator="['yywdjgm', {}]" :disabled="this.disabled"/>
        </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="24">
          <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="办理渠道">
          <a-input placeholder="请输入办理渠道" v-decorator="['blqd', {}]" :disabled="this.disabled"/>
        </a-form-item>
          </a-col>
          <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="办理员工编号">
          <a-input placeholder="请输入办理员工编号" v-decorator="['blygbh', {}]" :disabled="this.disabled"/>
        </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="24">
          <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="办理员工姓名">
          <a-input placeholder="请输入办理员工姓名" v-decorator="['blygxm', {}]" :disabled="this.disabled"/>
        </a-form-item>
          </a-col>
            <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户姓名">
          <a-input placeholder="请输入客户姓名" v-decorator="['khxm', {}]" :disabled="this.disabled"/>
        </a-form-item>
            </a-col>
        </a-row>

        <a-row class="form-row" :gutter="24">
          <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户身份证号">
          <a-input placeholder="请输入客户身份证号" v-decorator="['khsfzh', validatorRules.khsfzh ]" :disabled="this.disabled"/>
        </a-form-item>
          </a-col>
          <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户手机号">
          <a-input placeholder="请输入客户手机号" v-decorator="['khsjh', {}]" :disabled="this.disabled"/>
        </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="24">
          <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="车牌号码">
          <a-input placeholder="请输入车牌号码" v-decorator="['cphm', {}]" :disabled="this.disabled"/>
        </a-form-item>
          </a-col>
          <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="车牌颜色">
          <a-input placeholder="请输入车牌颜色" v-decorator="['cpys', {}]" :disabled="this.disabled"/>
        </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="24">
          <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="获客方式">
          <a-input placeholder="请输入获客方式" v-decorator="['hkfs', {}]" :disabled="this.disabled"/>
        </a-form-item>
          </a-col>
          <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="绑定账号卡">
          <a-input placeholder="请输入绑定账号卡" v-decorator="['bdzkh', {}]" :disabled="this.disabled"/>
        </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="24">
          <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="开户机构">
          <a-input placeholder="请输入开户机构" v-decorator="['khjgdm', {}]" :disabled="this.disabled"/>
        </a-form-item>
          </a-col>
          <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="开户日期">
          <a-date-picker v-decorator="[ 'khrq', validatorRules.khrq ]" style="width: 100%" :disabled="this.disabled"/>
        </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="24">
          <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="开户时间(时分秒)">
          <a-input placeholder="请输入开户时间(时分秒)" v-decorator="['khsj', validatorRules.khsj ]" :disabled="this.disabled"/>
        </a-form-item>
          </a-col>
          <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="销户日期">
          <a-date-picker v-decorator="[ 'xhrq', {}]" style="width: 100%" :disabled="this.disabled"/>
        </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="24">
          <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="销户时间(时分秒)">
          <a-input placeholder="请输入销户时间(时分秒)" v-decorator="['xhsj', {}]" :disabled="this.disabled"/>
        </a-form-item>
          </a-col>
          <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="ETC绑定状态">
          <a-input placeholder="请输入ETC绑定状态" v-decorator="['etcbdzt', {}]" :disabled="this.disabled"/>
        </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="24">
          <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="推荐人">
          <a-input placeholder="请输入推荐人" v-decorator="['tjr', {}]" :disabled="this.disabled"/>
        </a-form-item>
          </a-col>
            <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="推荐人姓名">
          <a-input placeholder="请输入推荐人姓名" v-decorator="['tjrxm', {}]" :disabled="this.disabled"/>
        </a-form-item>
            </a-col>
        </a-row>

        <a-row class="form-row" :gutter="24">
          <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="推荐人机构">
          <a-input placeholder="请输入推荐人机构" v-decorator="['tjrjg', {}]" :disabled="this.disabled"/>
        </a-form-item>
          </a-col>
            <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="销户操作员">
          <a-input placeholder="请输入销户操作员" v-decorator="['xhczy', {}]" :disabled="this.disabled"/>
        </a-form-item>
            </a-col>
        </a-row>

        <a-row class="form-row" :gutter="24">
          <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="销户操作员姓名">
          <a-input placeholder="请输入销户操作员姓名" v-decorator="['xhczyxm', {}]" :disabled="this.disabled"/>
        </a-form-item>
          </a-col>
          <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="销户操作员机构">
          <a-input placeholder="请输入销户操作员机构" v-decorator="['xhczyjg', {}]" :disabled="this.disabled"/>
        </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="24">
          <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="营销人工号">
          <a-input placeholder="请输入营销人工号" v-decorator="['yxrgh', {}]" />
        </a-form-item>
          </a-col>
          <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="营销机构代码">
          <a-input placeholder="请输入营销机构代码" v-decorator="['yxjgdm', {}]" />
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
    name: "EtcyxxxglModal",
    data () {
      return {
        title:"操作",
        visible: false,
        disabled: true,
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
        khsfzh:{rules: [{ required: true, message: '请输入khsfzh!' }]},
        khrq:{rules: [{ required: true, message: '请输入khrq!' }]},
        khsj:{rules: [{ required: true, message: '请输入khsj!' }]},
        },
        url: {
          add: "/etcyxxxgl/etcyxxxgl/add",
          edit: "/etcyxxxgl/etcyxxxgl/edit",
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
          this.form.setFieldsValue(pick(this.model,'frhjgdm','frhjgmc','yywdmc','yywdjgm','blqd','blygbh','blygxm','khxm','khsfzh','khsjh','cphm','cpys','hkfs','bdzkh','khjgdm','khsj','xhsj','etcbdzt','yxrgh','yxjgdm','tjr','tjrxm','tjrjg','xhczy','xhczyxm','xhczyjg','xgr'))
		  //时间格式化
          //this.form.setFieldsValue({tjyf:this.model.tjyf?moment(this.model.tjyf):null})
          this.form.setFieldsValue({khrq:this.model.khrq?moment(this.model.khrq):null})
          this.form.setFieldsValue({xhrq:this.model.xhrq?moment(this.model.xhrq):null})
          //this.form.setFieldsValue({xgsj:this.model.xgsj?moment(this.model.xgsj):null})
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
            if(!this.model.khsfzh && !this.model.khsj && !this.model.khrq){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            //formData.tjyf = formData.tjyf?formData.tjyf.format():null;
            formData.khrq = formData.khrq?formData.khrq.format():null;
            formData.xhrq = formData.xhrq?formData.xhrq.format():null;
            //formData.xgsj = formData.xgsj?formData.xgsj.format():null;
            
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