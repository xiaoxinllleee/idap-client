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
          label="tjsj">
          <a-date-picker v-decorator="[ 'tjsj', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="zzbz">
          <a-input placeholder="请输入zzbz" v-decorator="['zzbz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="组织简称">
          <a-input placeholder="请输入组织简称" v-decorator="['zzjc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="总户数">
          <a-input placeholder="请输入总户数" v-decorator="['zhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="总人数">
          <a-input placeholder="请输入总人数" v-decorator="['zrs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="等级A">
          <a-input placeholder="请输入等级A" v-decorator="['dja', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="A比例">
          <a-input placeholder="请输入A比例" v-decorator="['abl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="等级B">
          <a-input placeholder="请输入等级B" v-decorator="['djb', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="B比例">
          <a-input placeholder="请输入B比例" v-decorator="['bbl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="等级C">
          <a-input placeholder="请输入等级C" v-decorator="['djc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="C比例">
          <a-input placeholder="请输入C比例" v-decorator="['cbl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="等级D">
          <a-input placeholder="请输入等级D" v-decorator="['djd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="D比例">
          <a-input placeholder="请输入D比例" v-decorator="['dbl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="等级E">
          <a-input placeholder="请输入等级E" v-decorator="['dje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="E比例">
          <a-input placeholder="请输入E比例" v-decorator="['ebl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="手机号码重复人数">
          <a-input placeholder="请输入手机号码重复人数" v-decorator="['sjhmcfrs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="比例">
          <a-input placeholder="请输入比例" v-decorator="['sjhmbl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="授信对象年龄过大人数">
          <a-input placeholder="请输入授信对象年龄过大人数" v-decorator="['sxdxnlrs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="比例">
          <a-input placeholder="请输入比例" v-decorator="['sxdxbl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="授信等级和金额不对人数">
          <a-input placeholder="请输入授信等级和金额不对人数" v-decorator="['sxedrs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="比例">
          <a-input placeholder="请输入比例" v-decorator="['sxedbl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="asxje">
          <a-input placeholder="请输入asxje" v-decorator="['asxje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="bsxje">
          <a-input placeholder="请输入bsxje" v-decorator="['bsxje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="csxje">
          <a-input placeholder="请输入csxje" v-decorator="['csxje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="esxje">
          <a-input placeholder="请输入esxje" v-decorator="['esxje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="dsxje">
          <a-input placeholder="请输入dsxje" v-decorator="['dsxje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="zje">
          <a-input placeholder="请输入zje" v-decorator="['zje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="下发户数">
          <a-input placeholder="请输入下发户数" v-decorator="['xfhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="下发人数">
          <a-input placeholder="请输入下发人数" v-decorator="['xfrs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="新增人数">
          <a-input placeholder="请输入新增人数" v-decorator="['xzrs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="xgrs">
          <a-input placeholder="请输入xgrs" v-decorator="['xgrs', {}]" />
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
    name: "NsbTjfxModal",
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
          add: "/nsb/nsbTjfx/add",
          edit: "/nsb/nsbTjfx/edit",
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
          this.form.setFieldsValue(pick(this.model,'zzbz','zzjc','zhs','zrs','dja','abl','djb','bbl','djc','cbl','djd','dbl','dje','ebl','sjhmcfrs','sjhmbl','sxdxnlrs','sxdxbl','sxedrs','sxedbl','asxje','bsxje','csxje','esxje','dsxje','zje','xfhs','xfrs','xzrs','xgrs'))
		  //时间格式化
          this.form.setFieldsValue({tjsj:this.model.tjsj?moment(this.model.tjsj):null})
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
            formData.tjsj = formData.tjsj?formData.tjsj.format():null;
            
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