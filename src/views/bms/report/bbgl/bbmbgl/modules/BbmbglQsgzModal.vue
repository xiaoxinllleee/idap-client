<template>
  <a-modal
    :title="title"
    width="98%"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :bodyStyle="{ height: modalHeight, overflowY: 'auto' }"
    :dialogStyle="{top: '20px'}"
    @ok="handleOk"
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
              <a-input placeholder="请输入报表编号" v-decorator="['bbbh', validatorRules.bbbh ]" />
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
        <table id="bbmbglQsgzTable" align="center" class="gridtable" width="100%" v-html="reportHtml" @click="tableClick">
        </table>

      </a-form>
    </a-spin>
    <bbmbgl-qsgz-edit-modal ref="bbmbglQsgzEditModal" @ok="qsgzEditOk"/>
  </a-modal>
</template>

<script>
  import { httpAction, getAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import JUploadOne from '@/components/jeecg/JUploadOne'
  import BbmbglQsgzEditModal from './BbmbglQsgzEditModal'

  export default {
    name: "BbmbglModal",
    components: {
      JUploadOne, BbmbglQsgzEditModal
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

        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
          bbbh: {rules: [{ required: true, message: '请输入报表编号!' }]},
          bblj: {rules: [{ required: true, message: '请上传报表模板文件!' }] },
        },
        url: {
          add: "/bbgl/bbmbgl/add",
          edit: "/bbgl/bbmbgl/edit",
          getReportHtml: "/bbgl/bbmbgl/getReportHtml",
          editCell: "/bbgl/bbmbgl/editCell"
        },
        reportHtml: '',
        selectCell: undefined,
        cellEditInfo: [],
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
      add () {
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.confirmLoading = true
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'bbbh','bbmc'))
          getAction(this.url.getReportHtml, {id: this.model.id}).then(res => {
            this.reportHtml = res.result.reportHtml
            console.log('getReportHtml', this.reportHtml)
            this.confirmLoading = false
          })
		  //时间格式化
        });
      },
      tableClick(e) {
        console.log('tableClick', e.target)
        if (this.selectCell) {
          this.selectCell.style.backgroundColor = 'transparent'
        }
        let fn = e.target.getAttribute('fn')
        if (fn) {
          this.$message.warning('公式单元格不能编辑取数规则！')
          return false
        }
        this.selectCell = e.target;
        e.target.style.backgroundColor = '#C0C0C0'
        let model = {}
        model.cell = e.target.getAttribute('cn')
        model.text = e.target.innerText
        this.$refs['bbmbglQsgzEditModal'].init(model)
      },
      qsgzEditOk(data) {
        console.log('qsgzEditOk', data)
        console.log('this.selectCell', this.selectCell)
        this.selectCell.innerText = data.qsgz
        let editInfo = this.cellEditInfo.filter(item => {
          return item.cell != data.cell
        })
        this.cellEditInfo = editInfo
        this.cellEditInfo.push(data)
      },
      close () {
        this.$emit('close');
        this.reportHtml = ''
        this.selectCell = undefined
        this.visible = false;
        this.cellEditInfo = []
      },
      handleOk () {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let formData = Object.assign(this.model, values);
            //文件路径
            formData.cellEditInfo = this.cellEditInfo
            console.log(formData)
            httpAction(this.url.editCell,formData,'post').then((res)=>{
              if(res.success){
                that.$message.success(res.message);
                that.$emit('ok');
              }else{
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
              that.close();
            })



          }
        })
      },
      handleCancel () {
        if (this.cellEditInfo.length > 0) {
          let that = this
          this.$confirm({
            title: "确认关闭",
            content: "本次编辑了取数规则，是否确认不保存直接关闭?",
            onOk: function () {
              that.close();
            }
          });
        } else {
          this.close();
        }
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