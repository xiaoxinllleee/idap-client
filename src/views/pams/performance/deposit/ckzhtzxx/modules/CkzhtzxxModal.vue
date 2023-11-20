<template>
  <a-modal
    :title="title"
    width="75%"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-divider orientation="left" style="color: #1890FF;margin-top: -10px;">基本信息</a-divider>
        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="机构名称">
              <a-input placeholder="请输入机构名称" v-decorator="['jgdm_dictText', {} ]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="客户编号">
              <a-input placeholder="请输入客户编号" v-decorator="['khbh', {} ]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="客户名称">
              <a-input placeholder="请输入客户名称" v-decorator="['khmc', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="证件号码">
              <a-input placeholder="请输入证件号码" v-decorator="['zjhm', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="存款账号">
              <a-input placeholder="请输入存款账号" v-decorator="['ckzh', {} ]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="营销类型">
              <a-input placeholder="请输入营销类型" v-decorator="['yxlx_dictText', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="账号类型">
              <a-input placeholder="请输入账号类型" v-decorator="['zhlx_dictText', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="利率">
              <a-input placeholder="请输入利率" v-decorator="['ll', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="开户日期">
              <a-date-picker v-decorator="[ 'khrq', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="到期日期">
              <a-date-picker v-decorator="[ 'dqrq', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="管户人">
              <a-input placeholder="请输入管户人" v-decorator="['ghr_dictText', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="拓展人">
              <a-input placeholder="请输入拓展人" v-decorator="['tzr_dictText', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="拓展比例">
              <a-input placeholder="请输入拓展比例" v-decorator="['tzbl', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="存款余额">
              <a-input placeholder="请输入存款余额" v-decorator="['ckye', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="存款月日平">
              <a-input placeholder="请输入存款月日平" v-decorator="['ckyrp', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="存款年日平">
              <a-input placeholder="请输入存款年日平" v-decorator="['ckrpye', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="电话号码">
              <a-input placeholder="请输入电话号码" v-decorator="['dhhm', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-divider orientation="left" style="color: #1890FF;margin-top: -20px;">历史管户信息</a-divider>
        <a-table bordered
                 :columns="ghlsbTable.columns"
                 :dataSource="ghlsbTable.dataSource"
                 :loading="ghlsbTable.loading"
                 :pagination="false"
        />
      </a-form>
    </a-spin>
    <template slot="footer">
      <a-button @click="handleCancel">关闭</a-button>
    </template>
  </a-modal>
</template>

<script>
  import { getAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "CkzhtzxxModal",
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
        jgdm:{rules: [{ required: true, message: '请输入机构代码!' }]},
        khbh:{rules: [{ required: true, message: '请输入客户编号!' }]},
        ckzh:{rules: [{ required: true, message: '请输入存款账号!' }]},
        },
        url: {
          add: "/performance/ckzhtzgl/add",
          edit: "/performance/ckzhtzgl/edit",
        },
        ghlsbTable: {
          columns: [
            {
              title: '管户人工号',
              align: "center",
              dataIndex: 'ghr'
            },
            {
              title: '管户人姓名',
              align: "center",
              dataIndex: 'ghr_dictText'
            },
            {
              title: '管户比例（%）',
              align: "center",
              dataIndex: 'ghbl'
            },
            {
              title: '开始日期',
              align: "center",
              dataIndex: 'ksrq'
            },
            {
              title: '结束日期',
              align: "center",
              dataIndex: 'jsrq'
            },
          ],
          dataSource: [],
          loading: false
        }
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
          this.form.setFieldsValue(pick(this.model,'jgdm_dictText','khbh','khmc','zjhm','yxlx_dictText','ckzh','zhlx_dictText','ll','ckye','ghr_dictText','tzr_dictText','tzbl','ckrpye','ckyrp','dhhm'))
		  //时间格式化
          this.form.setFieldsValue({khrq:this.model.khrq?moment(this.model.khrq):null})
          this.form.setFieldsValue({dqrq:this.model.dqrq?moment(this.model.dqrq):null})
        });
        //查询历史管户信息
        getAction('/ckzhghlsb/ckzhghlsb/getListByCkzh', {jgdm: this.model.jgdm, khbh: this.model.khbh, ckzh: this.model.ckzh}).then(res => {
          console.log('getListByCkzh', res)
          if (res && res.success) {
            this.ghlsbTable.dataSource = res.result
          }
        })
      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleCancel () {
        this.close()
      },


    }
  }
</script>

<style lang="less" scoped>
  .ant-form .ant-form-item {
    margin-bottom: 12px;
  }
</style>