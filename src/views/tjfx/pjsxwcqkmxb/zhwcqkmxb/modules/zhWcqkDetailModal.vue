<template>
  <a-modal :title="title"
           :width="1400"
           :visible="visible"
           :confirmLoading="confirmLoading"
           @ok="handleOk"
           @cancel="handleCancel"
           cancelText="关闭">
    
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-table bordered
                 size="middle"
                 :columns="columns"
                 :dataSource="dataSource"
                 :loading="loading"
                 :pagination="ipagination"
                 :okButtonProps="{ props: {disabled: disableSubmit} }"
                 @change="handleTableChange">
        <span slot="zjhm" slot-scope="text">
          <j-ellipsis :value="text" :length="8"/>
        </span>
          <span slot="zbmc" slot-scope="text">
          <j-ellipsis :value="text" :length="8"/>
        </span>
        </a-table>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JEllipsis from '../../../../../components/jeecg/JEllipsis'
  export default {
    name: "ZhWcqkDetailModal",
    components: { JEllipsis },
    data () {
      return {
        title:"操作",
        visible: false,
        disableSubmit: false,
        confirmLoading: false,
        form: this.$form.createForm(this),
        model: {},
        khlx:'',
        qfbs:'',
        zdmc:'',
        gnmc:'',
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        dataSource: [],
        columns: [
          {
            title: '所属支行',
            align: "center",
            key: 'sszh',
            dataIndex: 'sszh_dictText',
            scopedSlots: {customRender: 'sszh'},
            width: '15%',
          },
          {
            title: '行政村',
            dataIndex: 'xzc',
            key: 'xzc',
            align: "center",
            scopedSlots: {customRender: 'xzc'},
            width: '20%',
          },
          {
            title: '户号编码',
            dataIndex: 'hhbm',
            key: 'hhbm',
            align: "center",
            scopedSlots: {customRender: 'hhbm'},
            width: '25%',
          },
          {
            title: '客户名称',
            dataIndex: 'khmc',
            key: 'khmc',
            align: "center",
            scopedSlots: {customRender: 'khmc'},
            width: '15%',
          },
          {
            title: '证件号码',
            dataIndex: 'zjhm',
            key: 'zjhm',
            align: "center",
            scopedSlots: {customRender: 'zjhm'},
            width: '25%',
          },
        ],
        url: {
          list: "",
        },
      }
    },
    created () {},
    methods: {
      edit (record) {
        this.visible = true;
      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {

      },
      handleExportXls(fileName) {

      },
      handleCancel () {
        this.close()
      },
    }
  }
</script>

<style lang="less" scoped>

</style>