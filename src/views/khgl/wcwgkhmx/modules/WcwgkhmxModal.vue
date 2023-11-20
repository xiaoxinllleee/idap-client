<template>
  <a-modal :title="title"
           :width="1200"
           :visible="visible"
           :confirmLoading="confirmLoading"
           :okButtonProps="{ props: {disabled: disableSubmit} }"
           @cancel="handleCancel"
           cancelText="关闭">
    
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-card class="card" :bordered="false">
          <a-row :gutter="24">
            <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="户号编码" hasFeedback>
              <a-input placeholder="户号编码" v-decorator="['hhbm', {}]"/>
            </a-form-item></a-col>
            <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属支行" hasFeedback>
              <j-tree-select placeholder="所属支行" v-decorator="['sszh', {}]" dict="HR_BAS_ORGANIZATION, ZZJC, ZZBZ" pidField="sjzzbz"
                             :tree-default-expand-all="true"/>
            </a-form-item></a-col>
            <a-col :lg="8"><a-form-item :labelCol="labelCol_A" :wrapperCol="wrapperCol_A" label="所属村编码" hasFeedback>
              <a-input placeholder="所属村编码" v-decorator="['sscbm', {}]" />
            </a-form-item></a-col>
          </a-row>

          <a-row :gutter="24">
            <a-col :lg="8"><a-form-item :labelCol="labelCol_A" :wrapperCol="wrapperCol_A" label="所属村名称" hasFeedback>
              <a-input placeholder="所属村名称" v-decorator="['sscmc', {}]"/>
            </a-form-item></a-col>
            <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户名称" hasFeedback>
              <a-input placeholder="客户名称" v-decorator="['khmc', {}]" />
            </a-form-item></a-col>
            <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="证件号码" hasFeedback>
              <a-input placeholder="证件号码" v-decorator="['zjhm', {}]" />
            </a-form-item></a-col>
          </a-row>

          <a-row :gutter="24">
            <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="性别" hasFeedback>
              <j-dict-select-tag placeholder="性别" v-decorator="['xb',{}]" dict-code="sex"/>
            </a-form-item></a-col>
            <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="年龄" hasFeedback>
              <a-input placeholder="请输入年龄" v-decorator="['nl', {}]" />
            </a-form-item></a-col>
            <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="联系方式" hasFeedback>
              <a-input placeholder="联系方式" v-decorator="['lxfs', {}]" />
            </a-form-item></a-col>
          </a-row>

          <a-row :gutter="24">
            <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="户口性质" hasFeedback>
              <j-dict-select-tag placeholder="户口性质" v-decorator="['hkxz',{}]" dict-code="khgl_hkxz" />
            </a-form-item></a-col>
            <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="户籍地址" hasFeedback>
              <a-input placeholder="户籍地址" v-decorator="['hjdz', {}]" />
            </a-form-item></a-col>
            <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="从事行业" hasFeedback>
              <j-dict-select-tag placeholder="从事行业" v-decorator="['cshy', {}]" dict-code="cshyfl"/>
            </a-form-item></a-col>
          </a-row>

          <a-row :gutter="24">
            <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="工作单位" hasFeedback>
              <a-input placeholder="工作单位" v-decorator="['gzdw', {}]" />
            </a-form-item></a-col>
            <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="工作地点" hasFeedback>
              <a-input placeholder="工作地点" v-decorator="['gzdwdz', {}]" />
            </a-form-item></a-col>
            <a-col :lg="8"><a-form-item :labelCol="labelCol_A" :wrapperCol="wrapperCol_A" label="预计返乡时间" hasFeedback>
              <a-date-picker placeholder="预计返乡时间" v-decorator="[ 'yjfxsj', {}]" style="width: 100%;" />
            </a-form-item></a-col>
          </a-row>
        </a-card>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JTreeSelect from '../../../../components/jeecg/JTreeSelect'

  export default {
    name: "WcwgkhmxModal",
    components: { JTreeSelect },
    data () {
      return {
        title:"操作",
        visible: false,
        disableSubmit: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        labelCol_A: {
          xs: { span: 24 },
          sm: { span: 7 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        wrapperCol_A: {
          xs: { span: 24 },
          sm: { span: 14 },
        },
        confirmLoading: false,
        form: this.$form.createForm(this),
        url: {
          add: "/khgl.wcwgkhmx/wcwgkhmx/add",
          edit: "/khgl.wcwgkhmx/wcwgkhmx/edit",
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
          this.form.setFieldsValue(pick(
            this.model, 'qydm', 'sszh', 'sscbm', 'sscmc', 'hhbm', 'khmc', 'zjhm', 'nl', 'xb', 'lxfs',
            'hkxz', 'hjdz', 'cshy', 'gzdw', 'gzdwdz'
          ))
          this.form.setFieldsValue({ yjfxsj:this.model.yjfxsj ? moment(this.model.yjfxsj) : null })
        });
      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      /*handleOk () {
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
            formData.yjfxsj = formData.yjfxsj?formData.yjfxsj.format():null;
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
      },*/
      handleCancel () {
        this.close()
      },
    }
  }
</script>

<style lang="less" scoped>

</style>