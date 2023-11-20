<template>
  <a-modal
    :title="title"
    width="75%"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    :okButtonProps="{ props: {disabled: disableSubmit} }"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="机构代码">
              <j-tree-select placeholder="请选择机构代码"
                             treeNodeFilterProp="title"
                             v-decorator="['jgdm', {rules: [{required: true, message: '请选择机构查询！'}]}]"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmmszh, zzjc, ywjgdm"
                             :tree-default-expand-all="true"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="预约日期">
              <a-date-picker v-decorator="[ 'yyrq',  {rules: [{required: true, message: '请选择预约日期！'}]}]" :disabled-date="disabledDate"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="客户名称">
              <a-input placeholder="请输入客户名称" v-decorator="['khmc', {rules: [{required: true, message: '请填写客户名称！'}]}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="证件号码">
              <a-input placeholder="请输入证件号码" v-decorator="['zjhm',  {rules: [{required: true, message: '请填写证件号码！'}]}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="营销人">
              <j-select-ygxx type="radio" ref="selectYgxx" v-decorator="['ygxm',  {rules: [{required: true, message: '请填写营销人工号！'}]}]" @selectComplete="getYgxx"/>
              <!--<a-input placeholder="请输入营销人" v-decorator="['yxrgh',  {rules: [{required: true, message: '请填写营销人工号！'}]}]" />-->
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="营销比例">
              <a-input-number placeholder="请输入营销比例" :min="0" :max="100" style="width: 170px;"
                              v-decorator="['yxbl',  {rules: [{required: true, message: '请填写营销比例！'}]}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="预约类型">
              <j-dict-select-tag :triggerChange="true" v-decorator="['yylx', {rules: [{required: true, message: '请选择预约类型！'}]}]"
                                 @change="yylxChange" placeholder="请选择预约类型" dictCode="yylx"/>
            </a-form-item>
          </a-col>
          <a-col :span="12" v-if="ckzlShow">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="存款种类">
              <j-dict-select-tag :triggerChange="true" v-decorator="['ckzl', {rules: [{required: true, message: '请选择存款种类！'}]}]"
                                 @change="ckzlChange" placeholder="请选择存款种类" dictCode="ckzl"/>
            </a-form-item>
          </a-col>
          <a-col :span="12" v-show="ckzhShow">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="存款账号">
              <a-input placeholder="请输入存款账号" v-decorator="['ckzh', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12" v-show="ckzhShow">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="存款金额(元)">
              <a-input-number placeholder="请输入存款金额" :min="0" style="width: 170px;" v-decorator="['ckje', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="手机号码">
              <a-input placeholder="请输入手机号码" v-decorator="['sjhm', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="备注">
              <a-input placeholder="请输入备注" v-decorator="['bz', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">

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
  import JSelectYgxx from '@/components/jeecgbiz/JSelectYgxx'

  export default {
    name: "KhxxglYjyyKhyydjbModal",
    components: {
      JTreeSelect, JSelectYgxx
    },
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
          add: "/yjyy/khxxglYjyyKhyydjb/add",
          edit: "/yjyy/khxxglYjyyKhyydjb/edit",
        },
        yggh: '',
        ckzlShow: true,
        ckzhShow: false,
      }
    },
    created () {
    },
    methods: {
      add () {
        this.edit({yxbl: 100,yylx : 1});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.yylxChange(this.model.yylx)
          this.ckzlChange(this.model.ckzl)
          this.form.setFieldsValue(pick(this.model,'yylx','jgdm','khmc','zjhm','sjhm','yxrgh','yxbl','bz','ckzl','ckzh','ckje'))
          this.form.setFieldsValue({ygxm: this.model.yxrgh_dictText})
          this.yggh = this.model.yxrgh
		  //时间格式化
          this.form.setFieldsValue({yyrq:this.model.yyrq?moment(this.model.yyrq):null})

        });

      },
      disabledDate(current) {
        // Can not select days before today and today
        return current < moment().startOf('day');
      },
      close () {
        this.$emit('close');
        this.yggh = ''
        this.ckzlShow = true
        this.ckzhShow = false
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
            formData.yyrq = formData.yyrq?formData.yyrq.format():null;
            formData.yxrgh = this.yggh

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
      getYgxx(selectedYgxxRows) {
        console.log('getYgxx selectedYgxxRows', selectedYgxxRows)
        if (selectedYgxxRows && selectedYgxxRows[0]) {
          this.yggh = selectedYgxxRows[0].yggh
          console.log('this.yggh', this.yggh)
        }
      },
      yylxChange(val) {
        console.log('yylxChange', val)
        if (val == '1') {
          this.ckzlShow = true
        } else {
          this.ckzlShow = false
          this.ckzhShow = false
        }
      },
      ckzlChange(val) {
        console.log('ckzlChange', val)
        if (val == '1') {
          this.ckzhShow = true
        } else {
          this.ckzhShow = false
        }
      }
    }
  }
</script>

<style lang="less" scoped>

</style>