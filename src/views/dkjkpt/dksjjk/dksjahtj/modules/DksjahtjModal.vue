<template>
  <a-modal :title="title"
           :width="1800"
           :visible="visible"
           :confirmLoading="confirmLoading"
           @ok="handleOk"
           @cancel="handleCancel"
           okText="导出单户贷款数据明细"
           cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-table bordered
                 ref="table"
                 size="middle"
                 :columns="DhdksjmxTable.columns"
                 :dataSource="dataSource"
                 :pagination="false"
                 :loading="DhdksjmxTable.loading"
                 :scroll="{ x: 2000 }">
          <a-empty v-if="showFlag"/>
        </a-table>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import pick from 'lodash.pick'
  import moment from "moment"
  import { downFile, getAction } from '../../../../../api/manage'

  export default {
    name: "DksjahtjModal",
    data () {
      return {
        title:"操作",
        visible: false,
        showFlag: false,
        confirmLoading: false,
        form: this.$form.createForm(this),
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        isorter: {
          columns: 'tjyf',
          order: 'desc',
        },
        dataSource: [],
        DhdksjmxTable: {
          loading: false,
          columns: [
            {
              title: '数据月份',
              align: "center",
              dataIndex: 'tjyf',
              customRender:function (text) {
                return !text?"":(text.length>10?text.substr(0,10):text)
              },
              sorter: (a, b) => b.tjyf.replace(/-/g, '/') - a.tjyf.replace(/-/g, '/'),
            },
            {
              title: '机构代码',
              align: "center",
              dataIndex: 'jgdm'
            },
            {
              title: '机构名称',
              align: "center",
              dataIndex: 'jgdm_dictText'
            },
            {
              title: '客户名称',
              align: "center",
              dataIndex: 'khmc'
            },
            {
              title: '证件号码',
              align: "center",
              dataIndex: 'zjhm'
            },
            {
              title: '贷款账号',
              align: "center",
              dataIndex: 'dkzh'
            },
            {
              title: '便民卡卡号',
              align: "center",
              dataIndex: 'bmkkh'
            },
            {
              title: '贷款金额',
              align: "center",
              dataIndex: 'dkje',
              sorter: (a, b) => b.dkje - a.dkje,
            },
            {
              title: '贷款余额',
              align: "center",
              dataIndex: 'dkye',
              sorter: (a, b) => b.dkye - a.dkye,
            },
            {
              title: '贷款利率(%)',
              align: "center",
              dataIndex: 'dkll',
              sorter: (a, b) => b.dkll - a.dkll,
            },
            {
              title: '借款日期',
              align: "center",
              dataIndex: 'jkrq',
              customRender:function (text) {
                return !text?"":(text.length>10?text.substr(0,10):text)
              },
            },
            {
              title: '到期日期',
              align: "center",
              dataIndex: 'dqrq',
              customRender:function (text) {
                return !text?"":(text.length>10?text.substr(0,10):text)
              },
            },
            {
              title: '贷款形态',
              align: "center",
              dataIndex: 'dkxt_dictText'
            },
          ],
        },
        url: {
          list: "/dkjkpt/dksjjk/dksjahtj/dhdksjmx",
          exportXlsUrl: "dkjkpt/dksjjk/dksjahtj/DhdksjmxExportXls",
        },
      }
    },
    methods: {
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'jgdm', 'zjhm'))
		      // 时间格式化
          this.form.setFieldsValue({tjyf:this.model.tjyf?moment(this.model.tjyf):null})
        });
        let params = this.model;
        if (params) {
          getAction(this.url.list, { tjrq: params.tjyf,jgdm: params.jgdm,zjhm: params.zjhm }).then((res) => {
            if (res.success) {
              this.dataSource = res.result;
            }
          })
        }
        if (this.dataSource==null) {
          this.showFlag = true;
        }
      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        const that = this;
        that.handleExportDhdksjmxXls("单户贷款数据明细");
      },
      handleCancel () {
        this.close()
      },
      // 单户贷款数据明细-导出
      handleExportDhdksjmxXls: function(fileName) {
        if (!fileName || typeof fileName!="string") {
          fileName="单户贷款数据明细";
        }
        let param = this.model;
        console.log(param);
        if(this.selectedRowKeys && this.selectedRowKeys.length>0){
          param['selections'] = this.selectedRowKeys.join(",")
        }
        let exportParam = { "tjrq": this.model.tjyf,"jgdm": this.model.jgdm,"zjhm": this.model.zjhm };
        console.log(exportParam);
        downFile(this.url.exportXlsUrl, exportParam).then((data) => {
          if (!data){
            this.$message.warning("文件下载失败");
            return;
          }
          var blob = new Blob([data]);
          if ('msSaveOrOpenBlob' in navigator) {
            window.navigator.msSaveOrOpenBlob(blob, fileName+'.xls');
            return;
          }
          var eleLink = document.createElement("a");
          eleLink.download = fileName+".xls";
          eleLink.style.display = "none";
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