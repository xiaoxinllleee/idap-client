<template>
  <a-modal :title="title"
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
          label="机构代码">
          <a-input placeholder="请输机构代码" v-decorator="['jgdm', validatorRules.jgdm ]" :disabled="true"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构名称">
          <a-input placeholder="请输机构名称" v-decorator="['jgdm_dictText', {}]" :disabled="true"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商户编码">
          <a-input placeholder="请输入商户编码" v-decorator="['shbm', validatorRules.shbm ]" :disabled="true"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商户名称">
          <a-input placeholder="请输入商户名称" v-decorator="['shmc', {}]" :disabled="true"/>
          <a-button @click="shjbxxSelect" type="primary" icon="plus" v-show="model.shbm == undefined">查找带回</a-button>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存款账号">
          <a-input placeholder="请输入存款账号" v-decorator="['ckzh', validatorRules.ckzh ]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账号名称">
          <a-input placeholder="请输入账号名称" v-decorator="['zhmc', {}]"/>
        </a-form-item>

      </a-form>
    </a-spin>
    <shjbxx-select ref="shjbxxSelect" @ok="shjbxxSelectOk"/>
  </a-modal>
</template>

<script>
  import {httpAction} from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import ShjbxxSelect from '@/views/ywgl/nxt/shpj/shjbxx/modules/ShjbxxSelect'
  import JTreeSelect from "@/components/jeecg/JTreeSelect";

  export default {
    name: "GlzhxxModal",
    components: {JTreeSelect, ShjbxxSelect},
    data() {
      return {
        title: "操作",
        visible: false,
        oldckzh: '',
        model: {},
        labelCol: {
          xs: {span: 24},
          sm: {span: 5},
        },
        wrapperCol: {
          xs: {span: 24},
          sm: {span: 16},
        },

        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules: {
          jgdm: {rules: [{required: true, message: '请输入机构代码!'}]},
          shbm: {rules: [{required: true, message: '请输入商户编码!'}]},
          ckzh: {rules: [{required: true, message: '请输入存款账号!'}]},
        },
        url: {
          add: "/glzhxx/glzhxx/add",
          edit: "/glzhxx/glzhxx/edit",
        },
      }
    },
    created() {
    },
    methods: {
      shjbxxSelect() {
        this.$refs['shjbxxSelect'].init()
      },
      shjbxxSelectOk(selectRow) {
        console.log('shjbxxSelectOk', selectRow)
        this.form.setFieldsValue(pick(selectRow[0], 'shbm', 'shmc', 'jgdm', 'jgdm_dictText'))
      },
      add() {
        this.edit({});
      },
      edit(record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.oldckzh = this.model.ckzh
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'jgdm', 'jgdm_dictText', 'shbm', 'shmc', 'ckzh', 'zhmc'))
          //时间格式化
          this.form.setFieldsValue({glrq: this.model.glrq ? moment(this.model.glrq) : null})
          /*this.form.setFieldsValue({lrrq:this.model.lrrq?moment(this.model.lrrq):null})
          this.form.setFieldsValue({xgrq:this.model.xgrq?moment(this.model.xgrq):null})*/
        })
      },
      close() {
        this.$emit('close');
        this.visible = false;
        this.oldckzh = ''
      },
      handleOk() {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            //console.log('已完成校验的表单数据', values)
            // 校验输入的存款账号是否符合要求
            let ckzhLength = Number.parseInt(values.ckzh.length)
            if (!(ckzhLength === 17 || ckzhLength === 19 || ckzhLength === 20)) {
              that.$message.error('存款账号有误，请核实！')
              return
            }
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if (!this.model.shbm && !this.model.ckzh) {
              httpurl += this.url.add;
              method = 'post';
            } else {
              httpurl += this.url.edit;
              method = 'put';
            }
            let formData = Object.assign(this.model, values);
            formData.oldckzh = this.oldckzh;
            httpurl = httpurl + '?oldckzh=' + this.oldckzh
            httpAction(httpurl, formData, method).then((res) => {
              if (res.success) {
                that.$emit('ok')
                that.$message.success(res.message)
              } else {
                that.$message.warning(res.message)
              }
            }).catch((error) => {
              that.$message.warning('添加失败！',error)
            }).finally(() => {
              that.confirmLoading = false
              that.close()
            })
          }
        })
      },
      handleCancel() {
        this.close()
      },
    }
  }
</script>

<style lang="less" scoped>

</style>