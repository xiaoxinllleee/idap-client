<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <a-modal :title="title"
           :width="800"
           :visible="visible"
           :maskClosable="false"
           :confirmLoading="confirmLoading"
           :okButtonProps="{ props: {disabled: disableSubmit} }"
           :destroyOnClose="true"
           @ok="handleOk"
           @cancel="handleCancel">

    <a-spin :spinning="confirmLoading">
      <!-- 主表单区域 begin -->
      <a-form :form="form">
        <a-row>
          <a-col :span="12" :gutter="8"><a-form-item label="规则维度" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
            <a-select placeholder="请选择规则维度" v-decorator="['gzwd', validatorRules.gzwd]" style="width: 100%;">
              <a-select-option value="">请选择</a-select-option>
              <a-select-option value="MM">月</a-select-option>
              <a-select-option value="Q">季</a-select-option>
              <a-select-option value="YYYY">年</a-select-option>
            </a-select>
          </a-form-item></a-col>
          <a-col :span="12" :gutter="8"><a-form-item label="客户等级" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
            <j-dict-select-tag placeholder="请选择客户等级" v-decorator="['khdjbh', validatorRules.khdjbh]"
                               :triggerChange="true" dict-code="KHDJ_KHDJSZ, DJMC, DJBH" style="width: 100%;"/>
          </a-form-item></a-col>
          <a-col :span="12" :gutter="8"><a-form-item label="规则编号" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
            <a-input placeholder="请输入规则编号" v-decorator="['gzbh', validatorRules.gzbh]" style="width: 100%;"/>
          </a-form-item></a-col>
          <a-col :span="12" :gutter="8"><a-form-item label="规则名称" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
            <a-input placeholder="请输入规则名称" v-decorator="['gzmc', validatorRules.gzmc]" style="width: 100%;"/>
          </a-form-item></a-col>
          <a-col :span="24" :gutter="8"><a-form-item label="规则概述" :labelCol="{xs: { span: 24 },sm: { span: 4 }}" :wrapperCol="{xs: { span: 24 },sm: { span: 20 }}">
            <a-input placeholder="请输入规则概述" v-decorator="['gzgs', {}]" style="width: 100%;"/>
          </a-form-item></a-col>
        </a-row>
      </a-form>
      <!-- 主表单区域 end -->

      <!-- 子表单区域 begin -->
      <a-tabs v-model="activeKey" ><!--type="editable-card" @edit="onEdit"-->
        <a-tab-pane v-for="(pane, index) in panes" :tab="pane.title" :key="pane.key" :closable="pane.closable" :forceRender="true">
          <j-editable-table :ref="refKeys[index]"
                            :maxHeight="300"
                            :rowNumber="true"
                            :rowSelection="true"
                            :actionButton="true"
                            :loading="gzszGzxxTable.loading"
                            :columns="gzszGzxxTable.columns"
                            :dataSource="gzszGzxxTable.dataSource[index]"
                            :onscroll="true"
                            @added="added"/>
        </a-tab-pane>
      </a-tabs>
      <!-- 子表单区域 end -->
    </a-spin>

  </a-modal>
</template>

<script>
  import pick from 'lodash.pick'
  import JEditableTable from '@/components/jeecg/JEditableTable'
  import { FormTypes } from '@/utils/JEditableTableUtil'
  import { JEditableTableMixin } from '@/mixins/JEditableTableMixin'
  import { VALIDATE_NO_PASSED, getRefPromise, validateFormAndTables } from '@/utils/JEditableTableUtil'
  import { getAction ,httpAction} from '@/api/manage'
  import { duplicateCheck } from '../../../../api/api'

  export default {
    name: 'KhdjpdGzszModal',
    mixins: [],
    components: { JEditableTable,FormTypes},
    data() {
      return {
        title:"操作",
        okType: 'add',
        activeKey: '1',
        // 校验未通过
        VALIDATE_NO_PASSED: "",
        form: this.$form.createForm(this),
        addFlag: false,
        visible: false,
        disableSubmit: false,
        confirmLoading: false,
        panes: [],
        refKeys: [],
        newTabIndex: 1,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        // 规则详情
        gzszGzxxTable: {
          dataSource: [[]],
          loading: false,
          columns: [
            {
              title : 'Key',
              type  : FormTypes.hidden,
              key   : 'key',
            },
            {
              title: '客户类型',
              placeholder: '请选择${title}',
              key: 'khlx',
              type: FormTypes.select,
              dictCode: 'khdjpd_khlx',
              width: '20%',
            },
            {
              title: '评定数据项',
              placeholder: '请选择${title}',
              key: 'gzbh',
              type: FormTypes.select,
              dictCode: 'KHDJ_DJPDSJX,SJXMC,SJXID,SFPDGZ=1',
              width: '30%',
            },
            {
              title: '规则符号',
              placeholder: '请选择${title}',
              key: 'gzfh',
              type: FormTypes.select,
              dictCode: 'ysfh',
              width: '25%',
            },
            {
              title : '规则值',
              placeholder : '请输入${title}',
              type  : FormTypes.input,
              key   : 'gzz',
              width: '25%',
            },
          ],
        },
        validatorRules: {
          gzbh:{rules: [
              { required: true, message: '请输入规则编号！' },
              { validator: this.validataCode }
          ]},
          gzmc:{rules: [{ required: true, message: '请输入规则名称！' }]},
          khdjbh:{rules: [{ required: true, message: '请选择客户等级！' }]},
          gzwd:{rules: [{ required: true, message: '请选择规则维度！' }]},
        },
        url: {
          add: "/khdj/khdjpdgzsz/add",
          edit: "/khdj/khdjpdgzsz/edit",
          gzszGzxx: {
            list: '/khdj/khdjpdgzsz/queryByMainIdAndKey',
            getAllKey: '/khdj/khdjpdgzsz/getAllKey'
          },
        }
      }
    },
    methods: {
      add () {
        this.newTabIndex = 1
        this.addFlag = true
        this.panes = []
        this.panes.push(
          { title: '个人客户', content: '', key: '1'},
          { title: '对公客户', content: '', key: '2'},
        )
        this.refKeys = []
        this.refKeys.push('tableKey1','tableKey2')
        this.gzszGzxxTable.dataSource = [[]]
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.activeKey = '1'
        if(!this.addFlag) {
          this.panes = []
          this.refKeys = []
          this.gzszGzxxTable.dataSource = [[]]
        }
        this.addFlag = false
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'gzwd','gzbh', 'gzmc', 'gzgs','khdjbh'))
          // 加载子表数据
          if (this.model.id) {
            //获取详情Key
            let params = { mainId: this.model.id}
            getAction(this.url.gzszGzxx.getAllKey, params).then(res => {
              let result = res.result
              let keys = []
              result.forEach((array, index) => {
                console.info('array -',array);
                console.info('index -',index);
                console.info('array.key -',array.key);
                if(!keys.includes(array.key)) {
                  if (array.key == 1) {
                    this.panes.push(
                      { title: '个人客户', content: '', key: array.key }
                    )
                  } else if (array.key == 2) {
                    this.panes.push(
                      { title: '对公客户', content: '', key: array.key }
                    )
                  }
                  this.newTabIndex = array.key
                  this.refKeys.push('tableKey'+array.key)
                  params = { mainId: this.model.id, key: array.key}
                  this.requestSubTableData(this.url.gzszGzxx.list, params, this.gzszGzxxTable)
                }
                keys.push(array.key)
              })
            })
          }
        });

      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      // 查询某个tab的数据
      requestSubTableData(url, params, tab) {
        tab.loading = true
        getAction(url, params).then(res => {
          tab.dataSource[params.key-1] = res.result || []
        }).finally(() => {
          if (params.key == 1) {
            tab.loading = false
          }
        })
      },
      // 关闭按钮点击事件
      handleCancel () {
        this.close()
      },
      added(addRow) {
        console.log('added')
        console.log(addRow)
        addRow.target.setValues([
          {
            rowKey: addRow.row.id,
            values: { 'key': this.activeKey }
          }
        ])
      },
      // 确定按钮点击事件
      handleOk() {
        /** 触发表单验证 */
        this.getAllTable().then(tables => {
          console.info('tables -',tables);
          /** 一次性验证主表和所有的次表 */
          return validateFormAndTables(this.form, tables)
        }).then(allValues => {
          if (typeof this.classifyIntoFormData !== 'function') {
            throw this.throwNotFunction('classifyIntoFormData')
          }
          let formData = this.classifyIntoFormData(allValues);
          // 发起请求
          return this.request(formData)
        }).catch(e => {
          if (e.error === VALIDATE_NO_PASSED) {
            // 如果有未通过表单验证的子表，就自动跳转到它所在的tab
            this.activeKey = e.index == null ? this.activeKey : this.refKeys[e.index]
          } else {
            console.error(e)
          }
        })
      },
      // 发起请求，自动判断是执行新增还是修改操作
      request(formData) {
        let url = this.url.add, method = 'post'
        if (this.model.id) {
          url = this.url.edit
          method = 'put'
        }
        this.confirmLoading = true
        httpAction(url, formData, method).then((res) => {
          if (res.success) {
            this.$message.success(res.message)
            this.$emit('ok')
            this.close()
          } else {
            this.$message.warning(res.message,5)
          }
        }).finally(() => {
          this.confirmLoading = false
        })
      },
      // 整理成formData
      classifyIntoFormData(allValues) {
        let main = Object.assign(this.model, allValues.formValue)
        //时间格式化
        let tableValues = allValues.tablesValue
        console.log(allValues)
        console.log(tableValues)
        let gzszGzxxList = []
        tableValues.forEach(item=>{
          let values = item.values
          values.forEach(item=>{
            gzszGzxxList.push(item)
          })
        })
        return {
          ...main, // 展开
          gzap_jhxf_khjl_gzxx_realList: gzszGzxxList,
        }
      },
      onEdit(targetKey, action) {
        if(action === 'add') {
          this.addTab(targetKey);
        } else {
          if (targetKey === '1') {
            this.$message.error("这是最后的页签,不能删除！")
          } else {
            this[action](targetKey)
          }
        }
      },
      addTab() {
        const panes = this.panes;
        const activeKey = `${++this.newTabIndex}`;
        panes.push({ title: '对公客户', content: '', key: activeKey });
        this.panes = panes;
        this.activeKey = activeKey;
        this.refKeys.push('tableKey' + activeKey)
        // this.gzszGzxxTable.dataSource = []
      },
      remove(targetKey) {
        let activeKey = this.activeKey;
        let lastIndex;
        this.panes.forEach((pane, i) => {
          if (pane.key === targetKey) {
            lastIndex = i - 1;
          }
        });
        const panes = this.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
          if (lastIndex >= 0) {
            activeKey = panes[lastIndex].key;
          } else {
            activeKey = panes[0].key;
          }
        }
        this.panes = panes;
        this.activeKey = activeKey;
      },
      // 获取所有的editableTable实例
      getAllTable() {
        if (!(this.refKeys instanceof Array)) {
          throw this.throwNotArray('refKeys')
        }
        let values = this.refKeys.map(key => getRefPromise(this, key))
        console.log(values)
        return Promise.all(values)
      },
      validataCode: function(rule, value, callback) {
        var params = {
          tableName: 'KHDJ_KHDJPDGZSZ',
          fieldName: 'gzbh',
          fieldVal: value
        }
        if (this.okType === "add") {
          if (params.fieldVal != null && params.fieldVal !== 'undefined') {
            duplicateCheck(params).then((res) => {
              if (res.success) {
                callback()
              } else {
                callback(res.message)
              }
            });
          } else {
            callback()
          }
        } else {
          callback()
        }
      },
    }
  }
</script>