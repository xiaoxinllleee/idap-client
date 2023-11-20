<template>
  <a-modal :title="title"
           :width="600"
           :visible="visible"
           :confirmLoading="confirmLoading"
           @ok="handleOk"
           @cancel="handleCancel"
           :okButtonProps="{ props: {disabled: disableSubmit} }"
           cancelText="关闭">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <!--<a-row :gutter="24">
          <a-col :lg="24">-->
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属支行">
              <j-tree-select placeholder="请选择" v-decorator="['zzbz',{rules: [{ required: true, message: '请选择所属支行!' }]}]"
                             dict="v_hr_bas_organization_cmms,zzjc,zzbz" pidField="sjzzbz"
                             :treeDefaultExpandAll=true
                             @change="sszhChange">
              </j-tree-select>
            </a-form-item>
          <!--</a-col>
        </a-row>-->

        <!--<a-row :gutter="24">
          <a-col :lg="24">-->
            <a-form-item :labelCol="{xs: { span: 24 },sm: { span: 12 }}" :wrapperCol="{xs: { span: 24 },sm: { span: 12 }}" label="行政村（请先选择所属支行）">
              <a-select placeholder="请选择" v-decorator="['xzc',{rules: [{ required: true, message: '请选择行政村!' }]}]" :disabled="XzcDisabled">
                <a-select-option v-for="item in xzcOptions" :key="item.wgbh" :value="item.wgbh">{{ item.wgmc }}</a-select-option>
              </a-select>
            </a-form-item>
          <!--</a-col>
        </a-row>-->

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { getAction, postAction } from '@/api/manage'
  import store from '@/store/'
  import pick from 'lodash.pick'
  export default {
    name: 'rwszModal',
    components: {
      JTreeSelect
    },
    created(){
      this.isAll = store.getters.isRoot
      this.sszh =store.getters.userInfo.orgCode
    },
    data() {
      return {
        title:"操作",
        visible: false,
        disableSubmit: false,
        XzcDisabled: true,
        model: {},
        isAll: false,
        sszh :'',
        xzcOptions: [],
        url: {
          add: "/rwsz/zftjysbRwsz/add",
          edit: "/rwsz/zftjysbRwsz/edit",
          // getXzcList: "/yxdygl/ejyxdygl/querlist"
          getXzcList: "/yxdyglmain/yxdyglMain/querlist"
        },
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },

        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
        },
      }
    },
    methods: {
      add () {
        this.edit({});
      },
      edit(record) {
        console.log('record', record)
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        if (record.zzbz) {
          this.sszhChange(record.zzbz)
        }
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'zzbz', 'xzc'))
        })
      },
      sszhChange(value) {
        console.log('所属支行监听事件 -', value)
        //根据所选支行获取行政村数据
        let params = {}
        params.zzbz = value
        params.wgxz = 2
        params.pageSize = 999
        this.form.setFieldsValue({xzc: ''})
        if (value) {
          this.XzcDisabled=true
          getAction(this.url.getXzcList, params).then(res => {
            console.log('getXzcList', res)
            this.xzcOptions = res.result.records
            console.log(this.xzcOptions)
          }).finally(()=>{
            this.XzcDisabled=false
          })
        } else {
          this.xzcOptions = []
        }
      },
      handleOk () {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let httpurl = '';
            if(!this.model.id){
              httpurl+=this.url.add;
            }else{
              httpurl+=this.url.edit;
            }
            let formData = Object.assign(this.model, values);
            console.log(formData)
            postAction(httpurl,formData).then((res)=>{
              if(res.success){
                that.$message.success(res.message);
                that.handleCancel();
                that.$emit('ok');
              }else{
                that.$message.error(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
            })
          }
        })
      },
      handleCancel () {
        this.$emit('close');
        this.visible = false;
      },
    }
  }
</script>

<style scoped>

</style>