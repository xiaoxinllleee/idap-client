<template>
  <a-modal :title="title"
           :width="1000"
           :visible="visible"
           :confirmLoading="confirmLoading"
           :okButtonProps="{ props: {disabled: disableSubmit} }"
           :footer="null"
           :destroyOnClose="true"
           @cancel="handleCancel"
           cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-card class="card" :bordered="true">
        <a-form :form="form">
          <a-row class="form-row" :gutter="8">
            <a-col :lg="8"><a-form-item label="评议类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag placeholder="评议类型" v-decorator="['pylx', {}]" dict-code="bkbpy_pylx" :triggerChange="true" disabled/>
            </a-form-item></a-col>
            <a-col :lg="8"><a-form-item label="评议时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-date-picker placeholder="评议时间" v-decorator="['pysj', {}]" disabled style="width: 100%;"/>
            </a-form-item></a-col>
            <a-col :lg="8"><a-form-item label="评议员姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input placeholder="评议员姓名" v-decorator="['pyyxm', {}]" disabled/>
            </a-form-item></a-col>
          </a-row>
          <a-row class="form-row" :gutter="8">
            <a-col :lg="8"><a-form-item label="评议员证件号码" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input placeholder="评议员证件号码" v-decorator="['pyyzjhm', {}]" disabled/>
            </a-form-item></a-col>
            <a-col :lg="8"><a-form-item label="信用等级" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag placeholder="信用等级" v-decorator="['cxd', {}]" dict-code="xydj" :triggerChange="true" disabled/>
            </a-form-item></a-col>
            <a-col :lg="8"><a-form-item label="建议授信额度" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number placeholder="建议授信额度" v-decorator="['jysxed', {}]" :min="0" disabled style="width: 100%;"/>
            </a-form-item></a-col>
          </a-row>
          <a-row class="form-row" :gutter="24">
            <a-col :lg="24"><a-form-item label="备注" :labelCol="{xs:{span:24},sm:{span:3}}" :wrapperCol="{xs:{span:24},sm:{span:21}}">
              <a-input placeholder="备注" v-decorator="['bz', {}]" disabled/>
            </a-form-item></a-col>
          </a-row>
          <photo-view-qtpy ref="photoViewDzpy" />
        </a-form>
      </a-card>
    </a-spin>

  </a-modal>
</template>

<script>
  import { getAction } from '../../../../../api/manage'
  import pick from 'lodash.pick'
  import moment from 'moment'
  import AFormItem from 'ant-design-vue/es/form/FormItem'
  import PhotoViewQtpy from './annex/PhotoViewQtpy'

  export default {
    name: 'ZzpyxqDetailsModal',
    components: { AFormItem,PhotoViewQtpy },
    data() {
      return {
        title: '操作',
        visible: false,
        disableSubmit: true,
        confirmLoading: false,
        form: this.$form.createForm(this),
        pylx: '',
        zjhm: '',
        pyyzjhm: '',
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 9 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 15 }
        },
        url: {
          pymxList: '/nh/nhjbxx/PymxData',
          AnnexList: '/nh/nhjbxx/AnnexList',
          SenateTableList: '/nh/nhjbxx/SenateTableList',
        },
      }
    },
    created() {},
    methods: {
      close() {
        this.$emit('close');
        this.visible = false;
      },
      handleCancel() {
        this.close()
      },
      showModal() {
        this.visible = true;
        this.form.resetFields();
        let params = { zjhm: this.zjhm, pyyzjhm: this.pyyzjhm };
        getAction(this.url.pymxList, params, this.form).then(res => {
          this.model = Object.assign({}, res.result);
          this.$set(this.model,"pylx",this.pylx);
          this.form.setFieldsValue(pick(this.model, 'pylx', 'cxd', 'jysxed', 'pyyxm', 'pyyzjhm', 'pysj', 'bz'))
          // 评议时间格式化
          this.form.setFieldsValue({ pysj: this.model.pysj ? moment(this.model.pysj) : null })
          // console.info('评议类型 showModal-',this.model.pylx);
          this.$refs.photoViewDzpy.pylx = this.model.pylx;
          // 电子评议:附件照片
          if (this.zjhm) {
            getAction(this.url.AnnexList,{"zjhm":this.zjhm}).then((res) => {
              if (res.success) {
                // console.info('其它评议-附件信息 :',res.result);
                this.$refs.photoViewDzpy.showImg(res.result);
              }
            })
            getAction(this.url.SenateTableList, {"zjhm":this.zjhm,"pylx":this.pylx,"zllx":'评议表'}).then((res) => {
              if (res.success) {
                // console.info('其它评议-评议表 :',res.result);
                this.$refs.photoViewDzpy.showSenateImg(res.result);
              }
            })
          }
        })
      },
    },
  }
</script>

<style lang="less" scoped>
  .ant-form .ant-form-item {
    margin-bottom: 10px;
  }
</style>