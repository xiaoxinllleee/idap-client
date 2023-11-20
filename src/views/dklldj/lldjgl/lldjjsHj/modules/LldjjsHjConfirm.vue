<template>
  <a-modal :title="title"
           :width="800"
           :visible="visible"
           :confirmLoading="confirmLoading"
           :keyboard="false"
           :maskClosable="false"
           @ok="handleOk"
           @cancel="handleCancel"
           cancelText="关闭">

    <!--<a-row class="form-row">
      <a-col :span="12">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="确认状态">
          <a-select default-value="确认" @change="handleChange" style="width: 100%">
            <a-select-option :value="1">确认</a-select-option>
            <a-select-option :value="0">未确认</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="12"></a-col>
    </a-row>-->

    <a-row class="form-row">
      <a-col :span="12">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="定价编号">
          <a-input placeholder="定价编号" v-model="this.model.djid" style="width: 100%" disabled/>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="定价年份">
          <a-input placeholder="定价年份" v-model="this.model.djnf" style="width: 100%" disabled/>
        </a-form-item>
      </a-col>
    </a-row>

    <a-row class="form-row">
      <a-col :span="12">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="证件号码">
          <a-input placeholder="证件号码" v-model="this.model.zjhm" style="width: 100%" disabled/>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户名称">
          <a-input placeholder="disabled" v-model="this.model.khmc" style="width: 100%" disabled/>
        </a-form-item>
      </a-col>
    </a-row>

    <a-row class="form-row">
      <a-col :span="12">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="贷款期限">
          <j-dict-select-tag placeholder="贷款期限" v-model="this.model.dkqx" dictCode="dkqxhj" style="width: 100%;" disabled/>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="基准利率">
          <a-input placeholder="基准利率" v-model="this.model.jjll" addon-after="%" style="width: 100%;" disabled/>
        </a-form-item>
      </a-col>
    </a-row>

    <a-row class="form-row">
      <a-col :span="12">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="人民币贷款市场报价日期">
          <a-input placeholder="人民币贷款市场报价日期" v-model="this.model.bjrq" style="width: 100%;" disabled/>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="人民币贷款市场报价利率">
          <a-input placeholder="人民币贷款市场报价利率（LPR）" v-model="this.model.lprll" addon-after="%" style="width: 100%;" disabled/>
        </a-form-item>
      </a-col>
    </a-row>

    <a-row class="form-row">
      <a-col :span="12">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="定价得分">
          <a-input placeholder="定价得分" v-model="this.model.dfhj" addon-after="分" style="width: 100%" disabled/>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="执行利率">
          <a-input placeholder="执行利率" v-model="this.model.zxll" addon-after="%" style="width: 100%;" disabled/>
        </a-form-item>
      </a-col>
    </a-row>

    <a-row class="form-row">
      <a-col :span="12">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="备注">
          <a-input placeholder="备注" v-decorator="['note']" style="width: 100%" @change="NoteChange"/>
        </a-form-item>
      </a-col>
      <a-col :span="12"></a-col>
    </a-row>

  </a-modal>
</template>

<script>
  import { httpAction,postAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import {notification} from "ant-design-vue";

  export default {
    name: "LldjjsHjConfrimModal",
    components: {},
    data () {
      return {
        title: "利率定价确认",
        visible: false,
        model: {},
        spzt: '1',
        note: '',
        confirmLoading: false,
        labelCol: {
          sm: {span: 11},
        },
        wrapperCol: {
          sm: {span: 12},
        },
        url: {
          confirmSave: "/dklldj/lldjjsHj/confirmSave",
        }
      }
    },
    created () {},
    methods: {
      add() {
        this.edit({});
      },

      edit(record) {
        this.visible = true
        this.model = Object.assign(record)
      },

      handleOk() {
        let params = {
          'djid': this.model.djid,
          'note': this.note,
          'spzt': this.spzt
        }
        this.confirmLoading = true
        postAction(this.url.confirmSave, params).then((res) => {
          if (res.success) {
            notification.success({ message: '系统提示', description: res.message, duration: 4});
            this.$emit('ok');
          } else {
            notification.warning({ message: '系统提示', description: res.message, duration: 4});
          }
        }).finally(() => {
          this.confirmLoading = false
          this.close()
        })
      },

      handleCancel() {
        this.close()
      },

      close() {
        this.visible = false
        this.$emit('ok')
      },

      handleChange(value) {
        this.spzt = value
      },

      NoteChange(value) {
        this.note = value.data
      },
    }
  }
</script>

<style lang="less" scoped>
</style>