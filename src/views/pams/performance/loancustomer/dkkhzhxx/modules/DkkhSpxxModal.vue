<template>
  <a-modal
    :title="title"
    :width="1200"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :okButtonProps="{ props: {disabled: disableSubmit} }"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row class="form-row" :gutter="24">
          <a-col :span="12" :gutter="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="接收人工号">
              <a-input placeholder="接收人工号" v-model="this.model.ghr" />
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="接收人姓名">
              <a-input placeholder="接收人姓名" v-model="this.model.ghr_dictText" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="24">
          <a-col :span="12" :gutter="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="移交日期">
              <a-date-picker  style="width: 100%" v-model="this.model.yjrq"/>
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="移交说明">
              <a-textarea placeholder="请输入移交说明" v-model="this.model.sqsm" :row="1"/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-table
          ref="table"
          size="middle"
          bordered
          rowKey="khbh"
          :columns="columns"
          :dataSource="dataSource"
          :pagination="ipagination"
          :loading="loading"
          :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
          @change="handleTableChange">
        </a-table>

      </a-form>
    </a-spin>
    <template slot="footer">
      <a-button key="back" @click="handleCancel">取消</a-button>
    </template>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { getAction } from '@/api/manage'



  export default {
    name: "DkkhSpxxModal",
    mixins:[JeecgListMixin],
    props: {
      modalCreated: {
        type: Boolean,
        required: false,
        default: false
      },
      modalParam: {
        type: Object,
        required: false,
      }
    },
    watch: {
      modalCreated: {
        immediate: true,
        handler(val) {
          console.log('watch modalCreated', val)
          if (val) {
            this.edit()
          }
        }
      },
    },
    data () {
      return {
        title:"操作",
        disableSubmit:false,
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
        dataSource:[],
        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
        jgdm:{rules: [{ required: true, message: '请输入机构代码!' }]},
        khbh:{rules: [{ required: true, message: '请输入客户编号!' }]},
        },
        url: {
          list: "/dkkhspxx/dkkhspxx/list",
        },
        // 表头
        columns: [
          {
            title: '机构名称',
            align:"center",
            dataIndex: 'jgdm_dictText'
          },
          {
            title: '客户编号',
            align:"center",
            dataIndex: 'khbh'
          },
          {
            title: '客户类型',
            align:"center",
            dataIndex: 'khlx_dictText'
          },
          {
            title: '客户名称',
            align:"center",
            dataIndex: 'khmc'
          },
          {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm'
          },

          {
            title: '合同号',
            align:"center",
            dataIndex: 'hth'
          },
          {
            title: '最早合同发放日期',
            align:"center",
            dataIndex: 'zzhtffrq'
          },
          {
            title: '最早合同到期日期',
            align:"center",
            dataIndex: 'zzhtdqrq'
          },

        ],
      }
    },
    created () {
      console.log('created', this.modalCreated)
    },
    methods: {
      add () {
        this.edit({});
      },
      edit () {
        this.visible = true;
        let params = {tableId: this.modalParam.tableId, ywlx: '2'}
        getAction('/dkkhspxx/dkkhspxx/list', params).then((res) => {
          if (res.success) {
            this.model = Object.assign({}, res.result.records[0]);
            console.log("------"+this.model)
            this.dataSource = res.result.records;
            this.ipagination.total = res.result.total;
          }
          if(res.code===510){
            this.$message.warning(res.message,5)
          }
          this.loading = false;
        })

        /*this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'jgdm','khbh','khmc','zjlx','zjhm','khlx','cpxx','ckye','ckrpM','ckrpY','fpzt','lrbz'))
		  //时间格式化
          this.form.setFieldsValue({zzkhrq:this.model.zzkhrq?moment(this.model.zzkhrq):null})
        });*/

      },
      close () {
        this.$emit('close');
        this.ipagination.current = 1;
        this.visible = false;
      },
      handleCancel () {
        this.close()
      },


    }
  }
</script>

<style lang="less" scoped>

</style>