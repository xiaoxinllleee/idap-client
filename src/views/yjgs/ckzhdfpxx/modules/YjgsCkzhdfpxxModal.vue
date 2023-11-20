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
              label="认领人工号">
              <a-input placeholder="认领人工号" v-model="this.model.tzr" />
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="认领人姓名">
              <a-input placeholder="认领人姓名" v-model="this.model.tzr_dictText" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="24">
          <!-- <a-col :span="12" :gutter="12">
             <a-form-item
               :labelCol="labelCol"
               :wrapperCol="wrapperCol"
               label="流程ID">
               <a-input placeholder="流程ID" v-model="this.model.processid" />
             </a-form-item>
           </a-col>-->
          <a-col :span="12" :gutter="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="认领日期">
              <a-date-picker  style="width: 100%" v-model="this.model.yjrq"/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-table
          ref="table"
          size="middle"
          bordered
          rowKey="ckzh"
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
    name: "YjgsCkkhdfpxxbModal",
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

      }
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
          list: "/performance/ckzhspxx/list",
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
            title: '存款账号',
            align:"center",
            dataIndex: 'ckzh'
          },
          {
            title: '账号类型',
            align:"center",
            dataIndex: 'zhlx_dictText'
          },
          {
            title: '开户日期',
            align:"center",
            dataIndex: 'khrq'
          },
          {
            title: '到期日期',
            align:"center",
            dataIndex: 'dqrq'
          },
          {
            title: '存款余额',
            align:"center",
            dataIndex: 'ckye'
          },
          {
            title: '存款月日平',
            align:"center",
            dataIndex: 'ckrpM'
          },
          {
            title: '存款年日平',
            align:"center",
            dataIndex: 'ckrpY'
          },
        ],
      }
    },
    created () {
    },
    methods: {
      add () {
        this.edit({});
      },
      edit () {
        this.visible = true;
        let params = {tableId: this.modalParam.tableId, ywlx: '1'}
        getAction('/performance/ckzhspxx/list', params).then((res) => {
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