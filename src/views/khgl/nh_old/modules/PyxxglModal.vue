<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <a-modal :title="title"
           :width="1250"
           :visible="visible"
           :confirmLoading="confirmLoading"
           :okButtonProps="{ props: {disabled: disableSubmit} }"
           :footer="null"
           @cancel="handleCancel"
           cancelText="关闭">

    <a-spin :spinning="confirmLoading">
        <a-card class="card" :bordered="true">
          <!--基本情况 => begin-->
          <a-form :form="form">
            <a-divider orientation="left" style="color: #1890FF;">基本情况</a-divider>
            <a-row class="form-row">
              <a-col :span="12" :gutter="8"><a-form-item label="户号编码" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-input placeholder="户号编码" v-decorator="['hhbm', validatorRules.hhbm]" disabled/>
              </a-form-item></a-col>
              <a-col :span="12" :gutter="8"></a-col>
            </a-row>

            <a-row class="form-row">
              <a-col :span="12" :gutter="8"><a-form-item label="客户性别" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <j-dict-select-tag placeholder="客户性别" v-decorator="['xb',{}]" dictCode="sex" :triggerChange="true" disabled/>
              </a-form-item></a-col>

              <a-col :span="12" :gutter="8"><a-form-item label="客户名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-input aria-placeholder="客户名称" v-decorator="['khmc', validatorRules.khmc]" disabled/>
              </a-form-item></a-col>
            </a-row>

            <a-row class="form-row">
              <a-col :span="12" :gutter="8"><a-form-item label="客户年龄" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-input aria-placeholder="客户年龄" v-decorator="['nl', validatorRules.nl]" disabled/>
              </a-form-item></a-col>

              <a-col :span="12" :gutter="8"><a-form-item label="证件号码" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-input aria-placeholder="证件号码" v-decorator="['zjhm', validatorRules.zjhm]" disabled/>
              </a-form-item></a-col>
            </a-row>
          </a-form>
          <!--基本情况 => end-->

          <a-divider orientation="left" style="color: #1890FF;">总体情况</a-divider>
          <a-table bordered
                   ref="table"
                   :columns="pyztqkTable.columns"
                   :loading="pyztqkTable.loading"
                   :dataSource="pyztqkTable.dataSource"
                   :pagination="false">
                <span slot="action" slot-scope="text, record">
                  <a-button type="primary" @click="handlePyztqkExportXls(record)" >导出</a-button><!--v-show="props.getValue().pylx==='5'"-->
                  <a-divider type="vertical" />
                  <a-button type="primary" @click="handlePyztqkPrint(record)" >打印</a-button>
                </span>
          </a-table>
          <a-divider orientation="left" style="color: #1890FF;">评议详情</a-divider>
          <!--评议情况 => begin-->
          <j-editable-table :ref="refKeys[0]"
                            :loading="PyxxglTable.loading"
                            :columns="PyxxglTable.columns"
                            :dataSource="PyxxglTable.dataSource"
                            :maxHeight="300"
                            :rowSelection="true"
                            :actionButton="false"
                            :disabled="true">
            <template v-slot:detail="props,rowIndex">
              <a-button type="primary" @click="viewDetails(props)">详情</a-button>
            </template>
            <template v-slot:export="props">
              <a-button type="primary" @click="handleExportXls(props)" >导出</a-button><!--v-show="props.getValue().pylx==='5'"-->
            </template>
            <template v-slot:print="props">
              <a-button type="primary" @click="handlePrint(props)" >打印</a-button>
            </template>
          </j-editable-table>


          <!--评议情况 => end-->

          <pymx-modal ref="pymxFormModal"></pymx-modal>
          <pyxx-print ref="PyxxPrintModal"></pyxx-print>
          <pyztqk-print ref="PyztqkPrintModal"></pyztqk-print>

          <!--评议情况:详情-->
          <dzpyxq-details-modal ref="DzpyxqDetailsModal"/>
          <qtpyxq-details-modal ref="QtpyxqDetailsModal"/>
          <bysxqx-details-modal ref="BysxqxDetailsModal"/>
        </a-card>
    </a-spin>
  </a-modal>
</template>

<script>
  import pick from 'lodash.pick'
  import AFormItem from 'ant-design-vue/es/form/FormItem'
  import ARow from 'ant-design-vue/es/grid/Row'
  import JDictSelectTag from '@/components/dict/JDictSelectTag'
  import JEditableTable from '../../../../components/jeecg/JEditableTable'
  import PymxModal from './PymxModal'
  import { FormTypes } from '../../../../utils/JEditableTableUtil'
  import { getAction } from '../../../../api/manage'
  import { downFile } from '@/api/manage'
  import PyxxPrint from './PyxxPrint'
  import PyztqkPrint from './PyztqkPrint'

  import DzpyxqDetailsModal from './pyqkxqxx/DzpyxqDetailsModal'
  import QtpyxqDetailsModal from './pyqkxqxx/QtpyxqDetailsModal'
  import BysxqxDetailsModal from './pyqkxqxx/BysxqxDetailsModal'

  export default {
    name: "PyxxModal",
    components: {
      ARow,
      AFormItem,
      JDictSelectTag,
      JEditableTable,
      PymxModal,
      PyxxPrint,
      PyztqkPrint,
      DzpyxqDetailsModal,
      QtpyxqDetailsModal,
      BysxqxDetailsModal,
    },
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
        disabled: false,
        disableSubmit: true,
        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules: {},
        pylx: "",
        refKeys: ['PyxxglTable'],
        activeKey: 'PyxxglTable',
        pyztqkTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '最近评议时间',
              key: 'zjpysj',
              dataIndex: 'zjpysj',
              align: 'center'
            },
            {
              title: '评议平均得分',
              key: 'pypjdf',
              dataIndex: 'pypjdf',
              align: 'center'
            },
            {
              title: '信用等级',
              key: 'cxd_dictText',
              dataIndex: 'cxd_dictText',
              align: 'center'
            },
            {
              title: '建议授信额度',
              key: 'jysxed',
              dataIndex: 'jysxed',
              align: 'center'
            },
            {
              title: '操作',
              key: 'action',
              scopedSlots: { customRender: 'action' },
            },
          ]
        },
        PyxxglTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '评议时间',
              placeholder: '${title}',
              key: 'pysj',
              type: FormTypes.date,
              width: '130px'
            },
            {
              title: '评议员姓名',
              placeholder: '${title}',
              key: 'pyyxm',
              type: FormTypes.input,
              width: '100px'
            },
            {
              title: '评议员证件号码',
              placeholder: '${title}',
              key: 'pyyzjhm',
              type: FormTypes.input,
              width: '185px'
            },
            {
              title: '评议类型',
              placeholder: '${title}',
              key: 'pylx',
              type: FormTypes.select,
              dictCode: 'bkbpy_pylx',
              width: '120px'
            },
            {
              title: '评议得分',
              placeholder: '${title}',
              key: 'pydf',
              type: FormTypes.input,
              width: '100px'
            },
            {
              title: '信用等级',
              placeholder: '${title}',
              key: 'cxd',
              type: FormTypes.select,
              dictCode: 'xydj',
              width: '100px'
            },
            {
              title: '建议授信额度',
              placeholder: '${title}',
              key: 'jysxed',
              type: FormTypes.inputNumber,
              width: '150px'
            },
            {
              title: '详情',
              placeholder: '${title}',
              key: 'detail',
              type: FormTypes.slot,
              slotName: 'detail',
              width: '80px'
            },
            {
              title: '导出',
              placeholder: '${title}',
              key: 'export',
              type: FormTypes.slot,
              slotName: 'export',
              width: '80px'
            },
            {
              title: '打印',
              placeholder: '${title}',
              key: 'print',
              type: FormTypes.slot,
              slotName: 'print',
              width: '80px'
            },
          ],
        },
        url: {
          add: "/nh/nhjbxx/add",
          edit: "/nh/nhjbxx/edit",
          exportXlsUrl: "nh/nhjbxx/exportTemplateXls",
          exportPyztqkXlsUrl: "nh/nhjbxx/exportPyztqkTemplateXls",
          PyxxglTable: {
            list: '/nh/nhjbxx/viewDetail',
          },
        },
      }
    },
    created () {},
    methods: {
      add () {
        this.edit({});
      },
      edit (record) {
        this.PyxxglTable.dataSource = []
        this.pyztqkTable.dataSource = []
        this.form.resetFields();
        this.model = Object.assign({}, record);
        console.log('this.model', this.model)
        this.visible = true;
        let _that = this
        this.$nextTick(() => {
          _that.form.setFieldsValue(pick(_that.model, 'hhbm', 'khmc', 'zjhm', 'nl','xb'))
          if (_that.model.zjhm) {
            let params = { zjhm: this.model.zjhm }
            _that.PyxxglTable.loading = true
            _that.pyztqkTable.loading = true
            getAction(_that.url.PyxxglTable.list, params).then(res => {
              _that.PyxxglTable.dataSource = res.result.pyxxList || []
              _that.pyztqkTable.dataSource = res.result.ztqkList || []
              // for (var i=0; i<tab.dataSource.length; i++) {
              //   console.info('Tab DataSource :',tab.dataSource[i].pylx)
              // }
            }).finally(() => {
              _that.PyxxglTable.loading = false
              _that.pyztqkTable.loading = false
            })
          }
        });
      },
      requestSubTableData(url, params, tab) {
        tab.loading = true
        getAction(url, params).then(res => {
          tab.dataSource = res.result || []
          // for (var i=0; i<tab.dataSource.length; i++) {
          //   console.info('Tab DataSource :',tab.dataSource[i].pylx)
          // }
        }).finally(() => {
          tab.loading = false
        })
      },
      /**
       * 查看评议明细
       * @param props
       */
      viewDetails(props) {
        // this.$refs.pymxFormModal.zjhm = this.model.zjhm;
        // this.$refs.pymxFormModal.pyyzjhm = this.PyxxglTable.dataSource[props.index].pyyzjhm;
        // this.$refs.pymxFormModal.showModal();
        // this.$refs.pymxFormModal.title = "评议情况";
        // this.$refs.pymxFormModal.disableSubmit = true;
        let pylx = this.PyxxglTable.dataSource[props.index].pylx;
        // console.info('评议信息 - 评议类型 -',pylx);
        if (pylx === "5") {
          /** 评议类型：电子评议 */
          this.$refs.DzpyxqDetailsModal.disableSubmit = true;
          this.$refs.DzpyxqDetailsModal.title = "电子评议详情";
          this.$refs.DzpyxqDetailsModal.zjhm = this.model.zjhm;
          this.$refs.DzpyxqDetailsModal.pylx = pylx;
          this.$refs.DzpyxqDetailsModal.pyyzjhm = this.PyxxglTable.dataSource[props.index].pyyzjhm;
          this.$refs.DzpyxqDetailsModal.showModal();
        } else if (pylx === "0") {
          /*不予授信*/
          this.$refs.BysxqxDetailsModal.disableSubmit = true;
          this.$refs.BysxqxDetailsModal.title = "不予授信情形";
          this.$refs.BysxqxDetailsModal.zjhm = this.model.zjhm;
          this.$refs.BysxqxDetailsModal.pylx = pylx;
          this.$refs.BysxqxDetailsModal.pyyzjhm = this.PyxxglTable.dataSource[props.index].pyyzjhm;
          this.$refs.BysxqxDetailsModal.showModal();
        } else {
          /** 其它评议：纸质、电话、微信、开会评议 */
          this.$refs.QtpyxqDetailsModal.disableSubmit = true;
          this.$refs.QtpyxqDetailsModal.title = "其它评议详情";
          this.$refs.QtpyxqDetailsModal.pylx = pylx;
          this.$refs.QtpyxqDetailsModal.zjhm = this.model.zjhm;
          this.$refs.QtpyxqDetailsModal.pyyzjhm = this.PyxxglTable.dataSource[props.index].pyyzjhm;
          this.$refs.QtpyxqDetailsModal.showModal();
        }
      },
      handlePrint(props) {
        let pylx = props.getValue().pylx;
        if (pylx === '5') {
          this.$refs.PyxxPrintModal.nl = this.model.nl;
          this.$refs.PyxxPrintModal.xb = this.model.xb_dictText;
          this.$refs.PyxxPrintModal.zjhm=this.model.zjhm
          this.$refs.PyxxPrintModal.pyyzjhm = this.PyxxglTable.dataSource[props.index].pyyzjhm;
          this.$refs.PyxxPrintModal.pysj = this.PyxxglTable.dataSource[props.index].pysj;
          this.$refs.PyxxPrintModal.edit(props);
        } else {
          this.$message.warning("除'电子评议'外无法打印！")
        }
      },
      handlePyztqkPrint(record) {
        console.log('record', record)
        this.$refs.PyztqkPrintModal.nl = this.model.nl;
        this.$refs.PyztqkPrintModal.xb = this.model.xb_dictText;
        this.$refs.PyztqkPrintModal.zjhm=this.model.zjhm
        this.$refs.PyztqkPrintModal.edit(record, this.model, this.PyxxglTable.dataSource);
      },
      /**
       * 关闭按钮点击事件
       */
      handleCancel () {
        this.close()
      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      /**
       * 评议明细导出
       * @param props
       */
      handleExportXls(props){
        let pylx = props.getValue().pylx;
        if (pylx === '5') {
          let fileName='农户背靠背外部评审表';
          let param = {...this.queryParam};
          if(this.selectedRowKeys && this.selectedRowKeys.length>0){
            param['selections'] = this.selectedRowKeys.join(",")
          }
          console.log("导出参数",param)
          let zjhm = "";
          let pyyzjhm = "";
          zjhm = this.model.zjhm;
          pyyzjhm = this.PyxxglTable.dataSource[props.index].pyyzjhm
          downFile(this.url.exportXlsUrl,{"zjhm":zjhm,"pyyzjhm":pyyzjhm}).then((data)=>{
            if (!data) {
              this.$message.warning("文件下载失败")
              return
            }
            var blob = new Blob([data]);
            if('msSaveOrOpenBlob' in navigator){
              window.navigator.msSaveOrOpenBlob(blob, fileName+'.xls');
              return;
            }
            var eleLink = document.createElement('a');
            eleLink.download = fileName+'.xls';
            eleLink.style.display = 'none'
            eleLink.href = URL.createObjectURL(blob);
            document.body.appendChild(eleLink);
            eleLink.click();
            document.body.removeChild(eleLink);
          })
        } else {
          this.$message.warning("除'电子评议'外无导出文件！")
        }
      },
      handlePyztqkExportXls(record){
        let fileName='农户背靠背评议总体情况表';
        let zjhm = "";
        zjhm = this.model.zjhm;
        downFile(this.url.exportPyztqkXlsUrl,{"zjhm":zjhm, "pypjdf": record.pypjdf, "cxd": record.cxd, "jysxed": record.jysxed}).then((data)=>{
          if (!data) {
            this.$message.warning("文件下载失败")
            return
          }
          var blob = new Blob([data]);
          if('msSaveOrOpenBlob' in navigator){
            window.navigator.msSaveOrOpenBlob(blob, fileName+'.xls');
            return;
          }
          var eleLink = document.createElement('a');
          eleLink.download = fileName+'.xls';
          eleLink.style.display = 'none'
          eleLink.href = URL.createObjectURL(blob);
          document.body.appendChild(eleLink);
          eleLink.click();
          document.body.removeChild(eleLink);
        })
      },
    }
  }
</script>

<style lang="less" scoped>
</style>