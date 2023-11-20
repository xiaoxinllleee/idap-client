<template>
  <a-modal :title="title"
           :width="1400"
           :visible="visible"
           :confirmLoading="confirmLoading"
           @ok="handleOk"
           @cancel="handleCancel"
           okText="导出"
           cancelText="关闭">
    
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <!--<a-card class="card" :bordered="false">-->
          <a-table bordered
                   size="middle"
                   rowKey="id"
                   :dataSource="this.dataSource"
                   :columns="columns"
                   :pagination="ipagination"
                   :loading="loading"
                   @change="handleTableChange"/>
        <!-- 字符串超长截取省略号显示 -->
        <span slot="zjhm" slot-scope="text">
          <j-ellipsis :value="text" :length="8"/>
        </span>
        <span slot="zbmc" slot-scope="text">
          <j-ellipsis :value="text" :length="8"/>
        </span>
        <!--</a-card>-->
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction,putAction,downFile } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JEllipsis from '../../../../../components/jeecg/JEllipsis'

  export default {
    name: "PjsxKhpjsxbModal",
    components: { JEllipsis },
    mixins:[JeecgListMixin],
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
        dataSource: [],
        columns: [

          {
            title: '证件号码',
            dataIndex: 'zjhm',
            key: 'zjhm',
            align: "center",
            scopedSlots: {customRender: 'zjhm'},
            width: 100
          },
          {
            title: '客户名称',
            dataIndex: 'khmc',
            key: 'khmc',
            align: "center",
            scopedSlots: {customRender: 'khmc'},
            width: 100
          },

          {
            title: '项目ID',
            dataIndex: 'xmid',
            key: 'xmid',
            align: "center",
            scopedSlots: {customRender: 'xmid'},
            width: 100
          },
           {
            title: '项目名称',
            dataIndex: 'xmmc',
            key: 'xmmc',
            align: "center",
            scopedSlots: {customRender: 'xmmc'},
            width: 120
           },
          {
            title: '项目分值',
            dataIndex: 'xmfz',
            key: 'xmfz',
            align: "center",
            scopedSlots: {customRender: 'xmfz'},
            width: 120
          },
          {
            title: '项目结果',
            dataIndex: 'xmjg',
            key: 'xmjg',
            align: "center",
            scopedSlots: {customRender: 'xmjg'},
            width: 100
          },
        ],
        confirmLoading: false,
        form: this.$form.createForm(this),
        url: {
          list: "/khpjsx.khpjsxb/pjsxKhpjsxb/pymx",
          exportXlsUrl:"/khpjsx.khpjsxb/pjsxKhpjsxb/exportTemplateXls"
        },
      }
    },
    created () {

    },
    methods: {
      edit (record) {
        this.visible = true;
        if (record.zjhm) {
          this.model = Object.assign({}, record);
          var parm ={"pjrq":record.pjrq,"zjhm":record.zjhm}
          putAction(this.url.list, parm).then((res) => {
            this.dataSource = res.result;
          });
        }
      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        alert(this.model.pjrq)
        this.handleExportXls("客户授信明细表")
      },
      handleExportXls(fileName){
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        let param = this.model;
        if(this.selectedRowKeys && this.selectedRowKeys.length>0){
          param['selections'] = this.selectedRowKeys.join(",")
        }
        /*if (param.pjrq != null ){
          this.model.pjrq=this.param.pjrq.format("YYYY-MM-DD")
        }*/
        var dcsj  ={"pyrq":this.model.pjrq,"zjhm":this.model.zjhm }
        console.log("导出参数",param)
        downFile(this.url.exportXlsUrl,dcsj).then((data)=>{
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
      handleCancel () {
        this.close()
      },
    }
  }
</script>

<style lang="less" scoped>

</style>