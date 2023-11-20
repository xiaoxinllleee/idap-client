<template>
  <a-modal
    :title="title"
    width="98%"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :bodyStyle="{ height: modalHeight, overflowY: 'auto' }"
    :dialogStyle="{top: '20px'}"
    :footer="null"
    @cancel="handleCancel"
    okText="保存"
    cancelText="关闭">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="报表编号">
              <a-input placeholder="请输入报表编号" v-decorator="['bbbh', {} ]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="报表名称">
              <a-input placeholder="请输入报表名称" v-decorator="['bbmc', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <table id="bbmbglQsgzTable" align="center" class="gridtable" width="100%" v-html="reportHtml">
        </table>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { getAction } from '@/api/manage'
  import pick from 'lodash.pick'

  export default {
    name: "BbsjglPreviewModal",
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
        url: {
          getReportHtml: "/bbgl/bbsjgl/getReportHtml",
        },
        reportHtml: '',
      }
    },
    created () {
    },
    computed: {
      modalHeight: function() {
        return (document.documentElement.clientHeight - 150 - 20) + 'px';
      },
    },
    methods: {
      preview (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.confirmLoading = true
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'bbbh','bbmc'))
          getAction(this.url.getReportHtml, {id: this.model.id}).then(res => {
            this.reportHtml = res.result.reportHtml
            this.confirmLoading = false
          })
        });
      },

      close () {
        this.$emit('close');
        this.reportHtml = ''
        this.visible = false;
      },
      handleCancel () {
        this.close();
      },
    }
  }
</script>

<style lang="less">
  .gridtable {
    font-family: verdana, arial, sans-serif;
    font-size: 11px;
    color: #333333;
    border-width: 1px;
    border-color: #666666;
    border-collapse: collapse;
    table-layout: fixed;
  }

  .gridtable th {
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #666666;
    background-color: #dedede;
  }

  .gridtable td {
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #666666;
    background-color: #ffffff;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>