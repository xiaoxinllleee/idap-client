<template>
  <a-modal
    :title="title"
    :width="1200"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    :footer="null"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">


        <a-row class="form-row" :gutter="8" v-show="!isEdit">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="组织名称">
              <a-input placeholder="请输入组织名称" v-decorator="['zzbz_dictText', ]" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="岗位名称">
              <a-input placeholder="请输入岗位名称" v-decorator="['gwbz_dictText', ]" disabled/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="8">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="考核系数">
              <a-input-number placeholder="请输入考核系数" @blur="calcZxs" :min="0" :precision="2" :step="0.1" style="width: 100%"
                       v-decorator="['khxs', { rules: [{ required: true, message: '请输入考核系数!' }],initialValue:1 }]"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="不参与考核系数">
              <a-input-number placeholder="请输入不参与考核系数" @blur="calcZxs" :min="0" :precision="2" :step="0.1" style="width: 100%"
                       v-decorator="['bcykhxs', {rules: [],initialValue: 0}]"/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="8">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="总系数">
              <a-input placeholder="请输入总系数" v-decorator="['zxs', {initialValue:1}]" disabled/>
            </a-form-item>
          </a-col>
          <div class="table-operator">
            <a-button @click="handleOk" icon="check" type="primary">保存</a-button>
          </div>
        </a-row>

        <a-row class="form-row" :gutter="8" v-show="isEdit">
          <a-col :span="12">
            <Alert type="warning" show-icon>岗位选择</Alert>
            <div class="tree-bar">
              <div>
                <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
                  <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a
                  style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
                  <a style="margin-left: 24px" @click="onClearSelected">清空</a>
                </div>
                <a-table
                  :pagination="{ pageSize: 50 }"
                  :scroll="{ y: 300 }"
                  ref="table"
                  size="small"
                  bordered
                  rowKey="gwbz"
                  :columns="columns"
                  :dataSource="dataSource"
                  :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
                >
                </a-table>
              </div>
            </div>
          </a-col>
          <a-col :span="12">

            <Alert show-icon>
              机构选择：
            </Alert>
            <div style="overflow: auto">
              <a-directory-tree
                style="height: 400px"
                selectable
                :defaultExpandAll="true"
                :checkable="true"
                :checkStrictly="false"
                v-model="checkedKeys"
                @check="onSelect"
                :treeData="departTree"
                v-if="!spinningZzjg"
              />
            </div>
          </a-col>
        </a-row>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { httpAction } from '@/api/manage'
import pick from 'lodash.pick'
import { queryDepartTreeList, searchByKeywords } from '@/api/api'
import { getAction } from '../../../../../api/manage'
import { JeecgListMixin } from '../../../../../mixins/JeecgListMixin'
import XEUtils from 'xe-utils'

export default {
  name: 'ErpPostKhxsModal',
  mixins: [JeecgListMixin],
  data() {
    return {
      title: '操作',
      visible: false,
      model: {},
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      departTree: [],
      spinningZzjg: true,
      checkedKeys: [],
      confirmLoading: false,
      form: this.$form.createForm(this),
      url: {
        list: 'gwxxgl/hrBasPost/listAll',
        add: '/hr/erpPostKhxs/add',
        edit: '/hr/erpPostKhxs/edit'
      },
      // 表头
      columns: [
        {
          title: '岗位标识',
          align: 'center',
          dataIndex: 'gwbz',
          width: 150
        },
        {
          title: '岗位名称',
          align: 'center',
          dataIndex: 'gwmc',
          width: 150
        }

      ],
      dataSource: [],
      selectedRowKeys: [],
      isEdit: false
    }
  },
  created() {
  },
  methods: {
    add() {
      this.isEdit = true
      this.loadTree()
      this.edit({})
    },
    edit(record) {
      this.checkedKeys = []
      this.selectedRowKeys = []
      this.selectionRows = []

      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, 'zzbz', 'gwbz', 'khxs', 'bcykhxs', 'zxs', 'zzbz_dictText', 'gwbz_dictText'))
        //时间格式化
      })

    },

    close() {
      this.isEdit = false
      this.$emit('close')
      this.visible = false
    },
    handleOk() {
      if (this.isEdit) {
        if (this.checkedKeys.length == 0 || this.selectedRowKeys.length == 0) {
          this.$message.warning('请选择至少一个岗位和一个组织')
          return
        }
      }

      const that = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
          that.confirmLoading = true
          let httpurl = ''
          let method = ''
          if (!this.model.id) {
            httpurl += this.url.add
            method = 'post'
          } else {
            httpurl += this.url.edit
            method = 'put'
          }
          let formData = Object.assign(this.model, values)
          //时间格式化

          console.log(formData)
          httpAction(httpurl, formData, method).then((res) => {
            if (res.success) {
              that.$message.success(res.message)
              that.$emit('ok')
            } else {
              that.$message.warning(res.message)
            }
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
    loadTree() {
      queryDepartTreeList().then((res) => {
        this.departTree = res.result
        this.spinningZzjg = false
      })

      getAction(this.url.list, {}).then((res) => {
        if (res.success && res.result) {
          this.dataSource = res.result
        }
      })
    },
    calcZxs() {
      let khxs = this.form.getFieldValue('khxs')
      let bcykhxs = this.form.getFieldValue('bcykhxs')
      let data = [Number(khxs), Number(bcykhxs)]
      let zxs = XEUtils.sum(data)
      this.form.setFieldsValue({ zxs: zxs })
    },
    onSelect(checkedKeys, e) {
      this.checkedKeys = checkedKeys
      this.model.zzbz = checkedKeys
      console.log(checkedKeys)
    },
    onSelectChange(selectedRowKeys, selectionRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectionRows = selectionRows

      this.model.gwbz = selectedRowKeys
      console.log(selectedRowKeys)
      console.log(selectionRows)
    }

  }
}
</script>

<style lang="less" scoped>

</style>