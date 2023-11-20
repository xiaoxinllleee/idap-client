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
    name: "ZhbyZfjdhsmxModal",
    components: { JEllipsis },
    mixins:[JeecgListMixin],
    data () {
      return {
        title:"操作",
        visible: false,
        model: {},
        khlx:"",
        sjlx:"",
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
            title: '所属支行',
            dataIndex: 'sszh_dictText',
            key: 'sszh',
            align: "center",
            scopedSlots: {customRender: 'sszh'},
            width: 100
          },
           {
            title: '责任人',
            dataIndex: 'zkhjl_dictText',
            key: 'zkhjl',
            align: "center",
            scopedSlots: {customRender: 'zkhjl'},
            width: 120
           },
          {
            title: '行政村',
            dataIndex: 'xzc',
            key: 'xzc',
            align: "center",
            scopedSlots: {customRender: 'xzc'},
            width: 120
          },
          {
            title: '走访时间',
            dataIndex: 'pysj',
            key: 'pysj',
            align: "center",
            scopedSlots: {customRender: 'pysj'},
            width: 100
          },
          {
            title: '户号编码',
            dataIndex: 'hhbm',
            key: 'hhbm',
            align: "center",
            scopedSlots: {customRender: 'hhbm'},
            width: 100
          },
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
            title: '附件数量',
            dataIndex: 'fjsl',
            key: 'fjsl',
            align: "center",
            scopedSlots: {customRender: 'fjsl'},
            width: 100
          },
        ],
        confirmLoading: false,
        form: this.$form.createForm(this),
        url: {
          list: "/tjfx.xdgtzytjbb.zhtjbby/tjfxZhby/zfjdmx",
          exportXlsUrl:"/tjfx.xdgtzytjbb.zhtjbby/tjfxZhby/exportTemplatezfjdmxXls"
        },
      }
    },
    created () {

    },
    methods: {
      edit (record,khlx,sjlx) {
        this.khlx = khlx;
        this.sjlx = sjlx;
        this.visible = true;
        if (record.zrre) {
          this.model = Object.assign({}, record);
          var parm ={"ksrq":record.ksrq,"jsrq":record.jsrq,"xzc":record.xzc,"zkhjl":record.zrre,"khlx":khlx,"sjlx":sjlx}
          putAction(this.url.list, parm).then((res) => {
            console.log("----------")
            console.log( res.result)
            this.dataSource = res.result;
          });
        }
      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        this.handleExportXls("走访进度明细表")
      },
      handleExportXls(fileName){
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        let param = this.model;
        if(this.selectedRowKeys && this.selectedRowKeys.length>0){
          param['selections'] = this.selectedRowKeys.join(",")
        }

        var dcsj ={"ksrq":this.model.ksrq,"jsrq":this.model.jsrq,"xzc":this.model.xzc,"zkhjl":this.model.zrre,"khlx":this.khlx,"sjlx":this.sjlx}
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