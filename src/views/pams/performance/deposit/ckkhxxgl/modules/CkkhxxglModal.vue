<template>
  <a-modal :title="title"
           width="80%"
           :visible="visible"
           :confirmLoading="confirmLoading"
           @cancel="handleCancel"
           cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-divider orientation="left" style="color: #1890FF;margin-top: -10px;">基本信息</a-divider>
        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="机构名称">
              <a-input placeholder="请输入机构代码" v-decorator="['jgdm_dictText', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户编号">
              <a-input placeholder="请输入客户编号" v-decorator="['khbh', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户名称">
              <a-input placeholder="请输入客户名称" v-decorator="['khmc', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="证件号码">
              <a-input placeholder="请输入证件号码" v-decorator="['zjhm', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户类型">
              <a-input placeholder="请输入客户类型" v-decorator="['khlx_dictText', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="产品信息">
              <a-input placeholder="请输入产品信息" v-decorator="['cpxx', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="联系方式">
              <a-input placeholder="请输入地址" v-decorator="['dz', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="地址">
              <a-input placeholder="请输入地址" v-decorator="['dz', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="存款余额">
              <a-input placeholder="请输入存款余额" v-decorator="['ckye', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="存款月日平">
              <a-input placeholder="请输入存款月日平" v-decorator="['ckrpye', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="管户人">
              <a-input placeholder="请输入管户人" v-decorator="['ghr_dictText', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="管户比例">
              <a-input placeholder="请输入管户比例" v-decorator="['ghbl', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-divider orientation="left" style="color: #1890FF;margin-top: -20px;">存款详情</a-divider>
        <a-table bordered
                 :columns="ckxqTable.columns"
                 :dataSource="ckxqTable.dataSource"
                 :loading="ckxqTable.loading"
                 :pagination="false"
        />
        <a-divider orientation="left" style="color: #1890FF;">历史管户信息</a-divider>
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

  export default {
    name: "CkkhghxxbModal",
    data () {
      return {
        title:"操作",
        visible: false,
        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
            jgdm:{rules: [{ required: true, message: '请输入机构代码!' }]},
            khbh:{rules: [{ required: true, message: '请输入客户编号!' }]},
        },
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        url: {
          add: "/performance.ckkhghxx/wdyjCkkhghxxb/add",
          edit: "/performance.ckkhghxx/wdyjCkkhghxxb/edit",
        },
        ckxqTable: {
          columns: [
            {
              title: '机构名称',
              align: "center",
              dataIndex: 'jgdm_dictText'
            },
            {
              title: '账号',
              align: "center",
              dataIndex: 'ckzh'
            },
            {
              title: '开户日期',
              align: "center",
              dataIndex: 'khrq'
            },
            {
              title: '到期日期',
              align: "center",
              dataIndex: 'dqrq'
            },
            {
              title: '利率（%）',
              align: "center",
              dataIndex: 'll'
            },
            {
              title: '存期',
              align: "center",
              dataIndex: 'cq'
            },
            {
              title: '账户余额',
              align: "center",
              dataIndex: 'ckye'
            },
            {
              title: '拓展人',
              align: "center",
              dataIndex: 'tzr'
            },
            {
              title: '拓展比例（%）',
              align: "center",
              dataIndex: 'tzbl'
            },
            {
              title: '营销类型',
              align: "center",
              dataIndex: 'yxlx_dictText'
            },
          ],
          dataSource: [],
          loading: false
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
          this.form.setFieldsValue(pick(this.model,'jgdm_dictText','khbh','khmc','zjhm','khlx_dictText','lxfs','dz','cpxx','ckye','ckrpye','ghr_dictText','ghbl'))
		      //时间格式化
        });
        //查询存款详情
        getAction('/app/khgxglCkzhghxx/list', {jgdm: this.model.jgdm, khbh: this.model.khbh, pageSize: 999}).then(res => {
          if (res && res.success) {
            this.ckxqTable.dataSource = res.result.records
          }
        })
        //查询历史管户信息
        getAction('/ckkhghlsb/ckkhghlsb/getListByKhbh', {jgdm: this.model.jgdm, khbh: this.model.khbh}).then(res => {
          console.log('getListByKhbh', res)
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
