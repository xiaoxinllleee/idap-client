<template xmlns:background-color="http://www.w3.org/1999/xhtml">
  <a-row :gutter="10">
    <a-col :md="8" :sm="24">
      <a-card :bordered="false">

        <!-- 按钮操作区域 -->
        <a-row style="margin-left: 14px">
          <a-button @click="handleAdd(2)" type="primary">添加子部门</a-button>
          <a-button type="primary" icon="download" @click="handleExportXls('部门信息')">导出</a-button>
          <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
            <a-button type="primary" icon="import">导入</a-button>
          </a-upload>
          <a-button title="删除多条数据" @click="batchDel" type="default">批量删除</a-button>
          <!--<a-button @click="refresh" type="default" icon="reload" :loading="loading">刷新</a-button>-->
        </a-row>
        <div style="background: #fff;padding-left:16px;height: 100%; margin-top: 5px">
          <a-alert type="info" :showIcon="true">
            <div slot="message">
              当前选择：
              <a v-if="this.currSelected.title">{{ getCurrSelectedTitle() }}</a>
              <a v-if="this.currSelected.title" style="margin-left: 10px" @click="onClearSelected">取消选择</a>
            </div>
          </a-alert>
          <a-input-search @search="onSearch" style="width:100%;margin-top: 10px" placeholder="请输入部门名称"/>
          <!-- 树-->
          <a-col :md="10" :sm="24">
            <template>
              <a-dropdown :trigger="[this.dropTrigger]" @visibleChange="dropStatus">
               <span style="user-select: none">
            <a-tree
              checkable
              multiple
              @select="onSelect"
              @check="onCheck"
              @rightClick="rightHandle"
              :selectedKeys="selectedKeys"
              :checkedKeys="checkedKeys"
              :treeData="departTree"
              :checkStrictly="true"
              :expandedKeys="iExpandedKeys"
              :autoExpandParent="autoExpandParent"
              @expand="onExpand"/>
                </span>
                <!--新增右键点击事件,和增加添加和删除功能-->
                <a-menu slot="overlay">
                  <a-menu-item @click="handleAdd(3)" key="1">添加</a-menu-item>
                  <a-menu-item @click="handleDelete" key="2">删除</a-menu-item>
                  <a-menu-item @click="closeDrop" key="3">取消</a-menu-item>
                </a-menu>
              </a-dropdown>
            </template>
          </a-col>
        </div>
      </a-card>
    </a-col>
    <a-col :md="16" :sm="24">
      <a-card :bordered="false">
        <a-form :form="form">
          <a-row :gutter="24">
            <a-col  :md="12" :sm="6">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="组织标识">
                <a-input  placeholder="请输入组织标识" v-decorator="['zzbz', {rules: [{ required: true, message: '请输入组织标志' }]}]"  />
              </a-form-item>
            </a-col>
            <a-col  :md="12" :sm="6">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="组织名称">
                <a-input :required="true" placeholder="请输入组织名称" v-decorator="['zzmc', {rules: [{ required: true, message: '请输入组织名称' }]}]" />
              </a-form-item>
            </a-col>
          </a-row>



          <a-row :gutter="24">
            <a-col  :md="12" :sm="6">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="组织类别">
                <a-select placeholder="请选择组织类别"  style="width: 220px" :required="true"  v-decorator="['zzlb', {rules: [{ required: true, message: '请选择组织类别' }]}]">
                  <a-select-option value="1">联社</a-select-option>
                  <a-select-option value="2">分社</a-select-option>
                  <a-select-option value="3">部门</a-select-option>
                  <a-select-option value="4">支行/社</a-select-option>
                  <a-select-option value="5">网点/分社</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col  :md="12" :sm="6">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="组织级别">
                <a-select placeholder="请选择组织级别"  style="width: 220px" :required="true"  v-decorator="['zzjb', {rules: [{ required: true, message: '请选择组织级别' }]}]">
                  <a-select-option value="1">省联社</a-select-option>
                  <a-select-option value="2">市联社</a-select-option>
                  <a-select-option value="3">农商行/县联社</a-select-option>
                  <a-select-option value="4">支行/社/部门</a-select-option>
                  <a-select-option value="5">网点/分社</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row :gutter="24">
            <a-col  :md="12" :sm="6">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="启用标识">
                <a-select placeholder="请选择启用标识"  style="width: 220px" :required="true"  v-decorator="['qybz', {rules: [{ required: true, message: '请选择启用标识' }]}]">
                  <a-select-option value="1">是</a-select-option>
                  <a-select-option value="2">否</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col  :md="12" :sm="6">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="上级组织">
                <a-tree-select
                  style="width:100%"
                  :dropdownStyle="{maxHeight:'200px',overflow:'auto'}"
                  :treeData="departTree"
                  v-model="model.parentId"
                  placeholder="请选择上级部门"
                  :disabled="condition">
                </a-tree-select>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row :gutter="24">
            <a-col  :md="12" :sm="6">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="组织简称">
                <a-input placeholder="请输入组织简称" v-decorator="['zzjc', {rules: [{ required: true, message: '请输入组织名称' }]}]"/>
              </a-form-item>
            </a-col>
            <a-col  :md="12" :sm="6">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="业务机构代码">
                <a-input placeholder="请输入业务机构代码"  v-decorator="['ywjgdm', {rules: [{ required: true, message: '请输入组织名称' }]}]"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col  :md="12" :sm="6">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="报表权限机构代码">
                <a-input placeholder="请输入报表权限机构代码" v-decorator="['bbqxjgdm', {}]" />
              </a-form-item>
            </a-col>
            <a-col  :md="12" :sm="6">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="业务机构类型">
                <a-select placeholder="请选择业务机构类型"  style="width: 220px"  v-decorator="['ywjglx', {}]">
                  <a-select-option value="1">准柜员制</a-select-option>
                  <a-select-option value="2">复合制</a-select-option>
                  <a-select-option value="3">综合制</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col  :md="12" :sm="6">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="业务机构性质">
                <a-select placeholder="请选择业务机构性质"  style="width: 220px" :required="true"  v-decorator="['ywjgxz', {}]">
                  <a-select-option value="1">有贷款城区支行</a-select-option>
                  <a-select-option value="2">有贷款农村支行</a-select-option>
                  <a-select-option value="3">无贷款支行</a-select-option>
                  <a-select-option value="4">有不良贷款支行</a-select-option>
                  <a-select-option value="5">无不良贷款支行</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col  :md="12" :sm="6">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="业务机构标识">
                <a-select placeholder="请选择业务机构标识"  style="width: 220px" :required="true"  v-decorator="['ywjgbz', {rules: [{ required: true, message: '请选择业务机构标识' }]}]">
                  <a-select-option value="1">是</a-select-option>
                  <a-select-option value="2">否</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row :gutter="24">
            <a-col  :md="12" :sm="6">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="排序序号">
                <a-input placeholder="请输入排序序号"  v-decorator="['pxxh', {rules: [{ required: true, message: '请输入排序序号' }]}]" />
              </a-form-item>
            </a-col>
            <a-col  :md="12" :sm="6">

              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="所在区域">
                <a-input placeholder="请输入所在区域" v-decorator="['szqy', {}]" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col  :md="12" :sm="6">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="机构经营类型">
                <a-select placeholder="请选择机构经营类型"  style="width: 220px" :required="true"  v-decorator="['jgjylx', {}]">
                  <a-select-option value="1">经营型</a-select-option>
                  <a-select-option value="2">服务型</a-select-option>
                  <a-select-option value="3">效益型</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <div class="anty-form-btn">
          <a-button @click="emptyCurrForm" type="default" htmlType="button" icon="sync">重置</a-button>
          <a-button @click="submitCurrForm" type="primary" htmlType="button" icon="form">修改并保存</a-button>
        </div>
      </a-card>
    </a-col>
    <depart-modal ref="departModal" @ok="loadTree"></depart-modal>
  </a-row>
</template>
<script>
  import DepartModal from './modules/DepartModal'
  import pick from 'lodash.pick'
  import {queryDepartTreeList, searchByKeywords, deleteByDepartId} from '@/api/api'
  import {httpAction, deleteAction} from '@/api/manage'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  // 表头
  const columns = [
    {
      title: '组织标志',
      dataIndex: 'zzbz'
    },
    {
      title: '机构名称',
      dataIndex: 'zzmc'
    },
    {
      title: '机构简称',
      dataIndex: 'zzjc'
    },
    {
      title: '机构类型',
      align: 'center',
      dataIndex: 'zzlb'
    },
    {
      title: '机构编码',
      dataIndex: 'ywjgdm',
    },
    {
      title: '排序',
      align: 'center',
      dataIndex: 'pxxh'
    },
    {
      title: '操作',
      align: 'center',
      dataIndex: 'action',
      scopedSlots: {customRender: 'action'}
    }
  ]
  export default {
    name: 'DepartList',
    mixins: [JeecgListMixin],
    components: {
      DepartModal
    },
    data() {
      return {
        iExpandedKeys: [],
        loading: false,
        autoExpandParent: true,
        currFlowId: '',
        currFlowName: '',
        disable: true,
        treeData: [],
        visible: false,
        departTree: [],
        rightClickSelectedKey: '',
        hiding: true,
        model: {},
        dropTrigger: '',
        depart: {},
        columns: columns,
        disableSubmit: false,
        checkedKeys: [],
        selectedKeys: [],
        autoIncr: 1,
        currSelected: {},
        form: this.$form.createForm(this),
        labelCol: {
          xs: {span: 24},
          sm: {span: 10}
        },
        wrapperCol: {
          xs: {span: 80},
          sm: {span: 12}
        },
        graphDatasource: {
          nodes: [],
          edges: []
        },
        validatorRules: {
          departName: {rules: [{required: true, message: '请输入机构/部门名称!'}]},
          orgCode: {rules: [{required: true, message: '请输入机构编码!'}]},
          mobile: {rules: [{validator: this.validateMobile}]}
        },
        url: {
          delete: '/sys/hrBasOrganization/delete',
          edit: '/sys/hrBasOrganization/edit',
          deleteBatch: '/sys/hrBasOrganization/deleteBatch',
          exportXlsUrl: "sys/sysDepart/exportXls",
          importExcelUrl: "sys/sysDepart/importExcel",
        },
      }
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      loadData() {
        this.refresh();
      },
      loadTree() {
        var that = this
        that.treeData = []
        that.departTree = []
        queryDepartTreeList().then((res) => {
          if (res.success) {
            for (let i = 0; i < res.result.length; i++) {
              let temp = res.result[i]
              that.treeData.push(temp)
              that.departTree.push(temp)
              that.setThisExpandedKeys(temp)
              console.log(temp.id)
            }
            this.loading = false
          }
        })
      },
      setThisExpandedKeys(node) {
        if (node.children && node.children.length > 0) {
          this.iExpandedKeys.push(node.key)
          for (let a = 0; a < node.children.length; a++) {
            this.setThisExpandedKeys(node.children[a])
          }
        }
      },
      refresh() {
        this.loading = true
        this.loadTree()
      },
      // 右键操作方法
      rightHandle(node) {
        this.dropTrigger = 'contextmenu'
        console.log(node.node.eventKey)
        this.rightClickSelectedKey = node.node.eventKey
      },
      onExpand(expandedKeys) {
        console.log('onExpand', expandedKeys)
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.iExpandedKeys = expandedKeys
        this.autoExpandParent = false
      },
      backFlowList() {
        this.$router.back(-1)
      },
      // 右键点击下拉框改变事件
      dropStatus(visible) {
        if (visible == false) {
          this.dropTrigger = ''
        }
      },
      // 右键店家下拉关闭下拉框
      closeDrop() {
        this.dropTrigger = ''
      },
      addRootNode() {
        this.$refs.nodeModal.add(this.currFlowId, '')
      },
      batchDel: function () {
        console.log(this.checkedKeys)
        if (this.checkedKeys.length <= 0) {
          this.$message.warning('请选择一条记录！')
        } else {
          var ids = ''
          for (var a = 0; a < this.checkedKeys.length; a++) {
            ids += this.checkedKeys[a] + ','
          }
          var that = this
          this.$confirm({
            title: '确认删除',
            content: '确定要删除所选中的 ' + this.checkedKeys.length + ' 条数据，以及子节点数据吗?',
            onOk: function () {
              deleteAction(that.url.deleteBatch, {ids: ids}).then((res) => {
                if (res.success) {
                  that.$message.success(res.message)
                  that.loadTree()
                  that.onClearSelected()
                } else {
                  that.$message.warning(res.message)
                }
              })
            }
          })
        }
      },
      onSearch(value) {
        let that = this
        if (value) {
          searchByKeywords({keyWord: value}).then((res) => {
            if (res.success) {
              that.departTree = []
              for (let i = 0; i < res.result.length; i++) {
                let temp = res.result[i]
                that.departTree.push(temp)
              }
            } else {
              that.$message.warning(res.message)
            }
          })
        } else {
          that.loadTree()
        }

      },
      nodeModalOk() {
        this.loadTree()
      },
      nodeModalClose() {
      },
      hide() {
        console.log(111)
        this.visible = false
      },
      onCheck(checkedKeys, info) {
        console.log('onCheck', checkedKeys, info)
        this.hiding = false
        this.checkedKeys = checkedKeys.checked
      },
      onSelect(selectedKeys, e) {
        console.log('selected', selectedKeys, e)
        this.hiding = false
        let record = e.node.dataRef
        console.log('onSelect-record', record)
        this.currSelected = Object.assign({}, record)
        this.model = this.currSelected
        this.selectedKeys = [record.key]
        this.model.parentId = record.parentId
        this.setValuesToForm(record)


      },
      // 触发onSelect事件时,为部门树右侧的form表单赋值
      setValuesToForm(record) {
        this.form.getFieldDecorator('fax', {initialValue: ''})
        this.form.setFieldsValue(pick(record, 'zzbz','zzmc','zzlb','zzjb','qybz','sjzzbz','zzjc','ywjgdm','bbqxjgdm','ywjglx','ywjgxz','ywjgbz','pxxh','szqy','jgjylx'))
      },
      getCurrSelectedTitle() {
        return !this.currSelected.title ? '' : this.currSelected.title
      },
      onClearSelected() {
        this.hiding = true
        this.checkedKeys = []
        this.currSelected = {}
        this.form.resetFields()
        this.selectedKeys = []
      },
      handleNodeTypeChange(val) {
        this.currSelected.nodeType = val
      },
      notifyTriggerTypeChange(value) {
        this.currSelected.notifyTriggerType = value
      },
      receiptTriggerTypeChange(value) {
        this.currSelected.receiptTriggerType = value
      },
      submitCurrForm() {
        this.form.validateFields((err, values) => {
          if (!err) {
            if (!this.currSelected.id) {
              this.$message.warning('请点击选择要修改部门!')
              return
            }

            let formData = Object.assign(this.currSelected, values)
            console.log('Received values of form: ', formData)
            httpAction(this.url.edit, formData, 'put').then((res) => {
              if (res.success) {
                this.$message.success('保存成功!')
                this.loadTree()
              } else {
                this.$message.error(res.message,5)
              }
            })
          }
        })
      },
      emptyCurrForm() {
        this.form.resetFields()
      },
      nodeSettingFormSubmit() {
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values)
          }
        })
      },
      openSelect() {
        this.$refs.sysDirectiveModal.show()
      },
      handleAdd(num) {
        if (num == 1) {
          this.$refs.departModal.add()
          this.$refs.departModal.title = '新增'
        } else if (num == 2) {
          let key = this.currSelected.key
          if (!key) {
            this.$message.warning('请先选中一条记录!')
            return false
          }
          this.$refs.departModal.add(this.selectedKeys)
          this.$refs.departModal.title = '新增'
        } else {
          this.$refs.departModal.add(this.rightClickSelectedKey)
          this.$refs.departModal.title = '新增'
        }
      },
      handleDelete() {
        deleteByDepartId({id: this.rightClickSelectedKey}).then((resp) => {
          if (resp.success) {
            this.$message.success('删除成功!')
            this.loadTree()
          } else {
            this.$message.warning('删除失败!')
          }
        })
      },
      selectDirectiveOk(record) {
        console.log('选中指令数据', record)
        this.nodeSettingForm.setFieldsValue({directiveCode: record.directiveCode})
        this.currSelected.sysCode = record.sysCode
      },
      getFlowGraphData(node) {
        this.graphDatasource.nodes.push({
          id: node.id,
          text: node.flowNodeName
        })
        if (node.children.length > 0) {
          for (let a = 0; a < node.children.length; a++) {
            let temp = node.children[a]
            this.graphDatasource.edges.push({
              source: node.id,
              target: temp.id
            })
            this.getFlowGraphData(temp)
          }
        }
      },
    },
    created() {
      this.currFlowId = this.$route.params.id
      this.currFlowName = this.$route.params.name
      // this.loadTree()
    },

  }
</script>
<style scoped>
  .ant-card-body .table-operator {
    margin: 15px;
  }

  .anty-form-btn {
    width: 100%;
    text-align: center;
  }

  .anty-form-btn button {
    margin: 0 5px;
  }

  .anty-node-layout .ant-layout-header {
    padding-right: 0
  }

  .header {
    padding: 0 8px;
  }

  .header button {
    margin: 0 3px
  }

  .ant-modal-cust-warp {
    height: 100%
  }

  .ant-modal-cust-warp .ant-modal-body {
    height: calc(100% - 110px) !important;
    overflow-y: auto
  }

  .ant-modal-cust-warp .ant-modal-content {
    height: 90% !important;
    overflow-y: hidden
  }

  #app .desktop {
    height: auto !important;
  }

  /** Button按钮间距 */
  .ant-btn {
    margin-left: 3px
  }

  .drawer-bootom-button {
    /*position: absolute;*/
    bottom: 0;
    width: 100%;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: left;
    left: 0;
    background: #fff;
    border-radius: 0 0 2px 2px;
  }
</style>