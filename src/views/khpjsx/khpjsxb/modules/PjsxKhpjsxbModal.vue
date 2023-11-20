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
                   :loading="false"

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
  import JEllipsis from '../../../../components/jeecg/JEllipsis'

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
         /* {
            title: '评议日期',
            dataIndex: 'pyrq',
            key: 'pyrq',
            align: "center",
            scopedSlots: {customRender: 'pyrq'},
            width: 100
          },
          {
            title: '组织标识',
            dataIndex: 'zzbz_dictText',
            key: 'zzbz',
            align: "center",
            scopedSlots: {customRender: 'zzbz'},
            width: 100
          },
          {
            title: '员工工号',
            dataIndex: 'yggh',
            key: 'yggh',
            align: "center",
            scopedSlots: {customRender: 'yggh'},
            width: 80
          },
          {
            title: '客户名称',
            dataIndex: 'khmc',
            key: 'khmc',
            align: "center",
            scopedSlots: {customRender: 'khmc'},
            width: 80
          },
          {
            title: '证件号码',
            dataIndex: 'zjhm',
            key: 'zjhm',
            align: "center",
            scopedSlots: {customRender: 'zjhm'},
            width: 180
          },
          {
            title: '客户类型',
            dataIndex: 'khlx_dictText',
            key: 'khlx',
            align: "center",
            scopedSlots: {customRender: 'khlx'},
            width: 80
          },
          {
            title: '指标类别',
            dataIndex: 'zblb',
            key: 'zblb',
            align: "center",
            scopedSlots: {customRender: 'zblb'},
            width: 80
          },*/
          {
            title: '评级日期',
            dataIndex: 'tjrq',
            key: 'tjrq',
            align: "center",
            scopedSlots: {customRender: 'tjrq'},
            width: 100
          },
          {
            title: '数据项ID',
            dataIndex: 'sjxid',
            key: 'sjxid',
            align: "center",
            scopedSlots: {customRender: 'sjxid'},
            width: 100
          },
           {
            title: '数据项名称',
            dataIndex: 'sjxmc',
            key: 'sjxmc',
            align: "center",
            scopedSlots: {customRender: 'sjxmc'},
            width: 120
           },
          {
            title: '项目分值',
            dataIndex: 'df',
            key: 'df',
            align: "center",
            scopedSlots: {customRender: 'df'},
            width: 120
          },
          {
            title: '项目结果',
            dataIndex: 'sjxjg',
            key: 'sjxjg',
            align: "center",
            scopedSlots: {customRender: 'sjxjg'},
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
          var parm ={"tjrq":record.pjrq,"zjhm":record.zjhm,"khlx":record.khlx}
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
        // alert(this.model.pjrq)
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