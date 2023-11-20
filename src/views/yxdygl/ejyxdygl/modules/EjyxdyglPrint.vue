<template>
  <a-modal :width="900"
           :visible="visible"
           :confirmLoading="confirmLoading"
           :destroyOnClose="true"
           :bodyStyle="{padding: '0px'}"
           @ok="handleOk"
           @cancel="handleCancel"
           okText="导出"
           cancelText="关闭">


  <a-card :bordered="false" :class="{'abcdefg':true}">
    <div class="no-print" style="text-align: right;padding-right: 20px;">
      <a-button v-print="'#printContent'" ghost type="primary">打印</a-button>
    </div>
    <section ref="print" id="printContent" class="abcdefg">
      <div style="text-align: center">
        <p style="font-size: 20px;font-weight: 800;">{{ssxz_dictText}}{{xzc_dictText}}村情分析报告</p>
      </div>
      <div style="text-align: left">
        <p style="font-size: 16px;text-indent: 2em;">经过调查走访，掌握了{{ssxz_dictText}}{{xzc_dictText}}的基本情况，现将该村基本情况概述如下：</p>
      </div>
      <div style="text-align: center">
        <p style="font-size: 18px;font-weight: bold;">{{ssxz_dictText}}{{xzc_dictText}}基本情况</p>
      </div>

      <div class="sign" style="text-align: left;height: inherit">

        <table   width="100%" border="1">
          <colgroup>
            <col style="text-align:center;width:200px;word-break: break-all;"></col>
            <col style="text-align:center;width:350px;word-break: break-all;"></col>
            <col style="text-align:center;width:100px;word-break: break-all;"></col>
            <col style="text-align:center;width:350px;word-break: break-all;"></col>
          </colgroup>
          <tr>
            <td colspan="1" style="text-align:center;width: 200px;font-weight: bold">
              网格名称
            </td>
            <td colspan="1" style="text-align:center;width: 350px;">
              {{ssxz_dictText}}{{xzc_dictText}}
            </td>
            <td colspan="1" style="text-align:center;width: 100px;font-weight: bold">
              位置
            </td>
            <td colspan="1"style="text-align:center;width:350px;">
              {{ejyxdygl.wgwz}}
            </td>
          </tr>
          <tr>
            <td colspan="1" style="text-align:center;width: 200px;font-weight: bold">
              户数
            </td>
            <td colspan="1" style="text-align:center;width: 350px;">
              {{cqtj.hs}}户
            </td>
            <td colspan="1" style="text-align:center;width: 100px;font-weight: bold">
              人口
            </td>
            <td colspan="1"style="text-align:center;width:350px;">
              {{cqtj.rks}}
            </td>
          </tr>
          <tr>
            <td colspan="1" style="text-align:center;width: 200px;font-weight: bold">
              网格面积
            </td>
            <td colspan="3" style="text-align:center;">
              {{ejyxdygl.wgmj}}
            </td>
          </tr>
          <tr>
            <td colspan="1" style="text-align:center;width: 200px;font-weight: bold">
              网格情况
            </td>
            <td colspan="3" style="text-align:center;">
              {{ejyxdygl.wgqk}}
            </td>
          </tr>
          <tr>
            <td colspan="1" style="text-align:center;width: 200px;font-weight: bold">
              网格痛点分析
            </td>
            <td colspan="3" style="text-align:center;">
              {{ejyxdygl.wgtdfx}}
            </td>
          </tr>
          <tr>
            <td colspan="2" style="text-align:center;font-weight: bold">
              关键人姓名
            </td>
            <td colspan="2" style="text-align:center;font-weight: bold">
              关键人描述
            </td>
          </tr>
          <tr>
            <td colspan="2" style="text-align:center;">
              {{ejyxdygl.cwsj}}
            </td>
            <td colspan="2" style="text-align:center;">
              村委书记
            </td>
          </tr>
          <tr>
            <td colspan="2" style="text-align:center;">
              {{ejyxdygl.cwzr}}
            </td>
            <td colspan="2" style="text-align:center;">
              村委主任
            </td>
          </tr>
          <tr>
            <td colspan="2" style="text-align:center;">
              {{ejyxdygl.cwbgszr}}
            </td>
            <td colspan="2" style="text-align:center;">
              村委办公室主任
            </td>
          </tr>
        </table>
        <br/>
        <table width="100%" border="1">
          <colgroup>
            <col style="text-align:center;width:200px;word-break: break-all;"></col>
            <col style="text-align:center;width:350px;word-break: break-all;"></col>
            <col style="text-align:center;width:100px;word-break: break-all;"></col>
            <col style="text-align:center;width:350px;word-break: break-all;"></col>
          </colgroup>
          <tr>
            <td colspan="4" style="text-align:center;font-size: 16px;font-weight: bold">
              {{ssxz_dictText}}{{xzc_dictText}}人口结构情况表
            </td>
          </tr>
          <tr>
            <td colspan="1" style="text-align:center;width: 200px;font-weight: bold">
              网格名称
            </td>
            <td colspan="1" style="text-align:center;width: 350px;">
              {{ssxz_dictText}}{{xzc_dictText}}
            </td>
            <td colspan="1" style="text-align:center;width: 100px;font-weight: bold">
              人口数
            </td>
            <td colspan="1"style="text-align:center;width:350px;">
              {{cqtj.rks}}
            </td>
          </tr>
          <tr>
            <td colspan="4" style="text-align:center;font-weight: bold">
              年龄结构统计
            </td>
          </tr>
          <tr>
            <td colspan="2" style="text-align:center;font-weight: bold">
              年龄结构
            </td>
            <td colspan="2" style="text-align:center;font-weight: bold">
              人数
            </td>
          </tr>
          <tr>
            <td colspan="2" style="text-align:center;">
              0-18岁
            </td>
            <td colspan="2" style="text-align:center;">
              {{cqtj.rks0z18}}
            </td>
          </tr>
          <tr>
            <td colspan="2" style="text-align:center;">
              19-45岁
            </td>
            <td colspan="2" style="text-align:center;">
              {{cqtj.rks19z45}}
            </td>
          </tr>
          <tr>
            <td colspan="2" style="text-align:center;">
              46-60岁
            </td>
            <td colspan="2" style="text-align:center;">
              {{cqtj.rks46z60}}
            </td>
          </tr>
          <tr>
            <td colspan="2" style="text-align:center;">
              61岁以上
            </td>
            <td colspan="2" style="text-align:center;">
              {{cqtj.rks61}}
            </td>
          </tr>
        </table>
        <div style="text-align: left">
          <p style="font-size: 18px;text-indent: 2em;font-weight: bold">一、该网格基本情况</p>
        </div>
        <div style="text-align: left">
          <p style="text-indent: 2em;">{{xzc_dictText}}村中共有{{sjyxdysl}}个组，分别为{{sjyxdymc}}，共计人口{{cqtj.rks}}人，家庭户数{{cqtj.hs}}户。</p>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
        </div>
        <div style="text-align: left">
          <p style="font-size: 18px;text-indent: 2em;font-weight: bold">二、该网格客户情况</p>
        </div>
        <table width="100%" border="1">
          <colgroup>
            <col style="text-align:center;width:200px;word-break: break-all;"></col>
            <col style="text-align:center;width:800px;word-break: break-all;"></col>
          </colgroup>
          <tr>
            <td colspan="1" style="text-align:center;font-weight: bold">
              客户分类
            </td>
            <td colspan="1" style="text-align:center;font-weight: bold">
              客户数量
            </td>
          </tr>
          <tr>
            <td colspan="1" style="text-align:center;">
              高端客户
            </td>
            <td colspan="1" style="text-align:center;">
              {{cqtj.gdkhs}}
            </td>
          </tr>
          <tr>
            <td colspan="1" style="text-align:center;">
              核心客户
            </td>
            <td colspan="1" style="text-align:center;">
              {{cqtj.hxkhs}}
            </td>
          </tr>
          <tr>
            <td colspan="1" style="text-align:center;">
              总客户
            </td>
            <td colspan="1" style="text-align:center;">
              {{cqtj.zkhs}}
            </td>
          </tr>
          <tr>
            <td colspan="1" style="text-align:center;">
              建档客户
            </td>
            <td colspan="1" style="text-align:center;">
              {{cqtj.jdkhs}}
            </td>
          </tr>
          <tr>
            <td colspan="1" style="text-align:center;">
              产品覆盖情况
            </td>
            <td colspan="1" style="text-align:center;">
              存款{{cqtj.ktckywrs}}人，存款总额{{cqtj.ckze}}万元；贷款{{cqtj.yxrs}}人，贷款余额{{cqtj.dkye}}万元；开通手机银行{{cqtj.ktsjyhrs}}人，开通ETC业务{{cqtj.ktetcrs}}人。
            </td>
          </tr>
          <tr>
            <td colspan="1" style="text-align:center;">
              存款客户
            </td>
            <td colspan="1" style="text-align:center;">
              {{cqtj.ktckywrs}}人
            </td>
          </tr>
          <tr>
            <td colspan="1" style="text-align:center;">
              存款规模
            </td>
            <td colspan="1" style="text-align:center;">
              存款总额：{{cqtj.ckze}}万元。按照客户年龄分类：30岁（含）以下客户{{cqtj.ckkhs0z30}}人，存款余额{{cqtj.ckye0z30}}万元，
              存款客户人均存款{{cqtj.ckrj0z30}}万元；30岁（不含）-50岁（含）客户{{cqtj.ckkhs30z50}}户，存款余额{{cqtj.ckye30z50}}万元，
              存款客户人均存款{{cqtj.ckrj30z50}}万元；50岁（不含）-60岁（含）客户{{cqtj.ckkhs50z60}}人，存款余额{{cqtj.ckye50z60}}万元，
              存款客户人均存款{{cqtj.ckrj50z60}}万元；60岁（不含）以上客户{{cqtj.ckkhs61}}人，存款余额{{cqtj.ckye61}}万元，
              存款客户人均存款{{cqtj.ckrj61}}万元；按照价值客户分类：存款余额5万（含)以上客户{{cqtj.ckkhs5w}}人，存款余额{{cqtj.ckye5w}}万元。
            </td>
          </tr>
          <tr>
            <td colspan="1" style="text-align:center;">
              贷款客户数
            </td>
            <td colspan="1" style="text-align:center;">
              {{cqtj.ktdkywrs}}人
            </td>
          </tr>
          <tr>
            <td colspan="1" style="text-align:center;">
              贷款规模
            </td>
            <td colspan="1" style="text-align:center;">
              建立信贷关系客户{{cqtj.ktdkywrs}}人，用信人数{{cqtj.yxrs}}人，用信{{cqtj.dkye}}万元
            </td>
          </tr>
        </table>
      </div>
    </section>
  </a-card>
  <!--</page-layout>-->
  </a-modal>
</template>
<script>
  import ACol from "ant-design-vue/es/grid/Col";
  import ARow from "ant-design-vue/es/grid/Row";
  import ATextarea from 'ant-design-vue/es/input/TextArea'
  import { httpAction,putAction,getAction,downFile } from '@/api/manage'


  export default {
    components: {
      ATextarea,
      ARow,
      ACol,
    },
    name: 'Printgzsld',
    props:{
      reBizCode:{
        type: String,
        default: ''
      }
    },
    data(){
      return {
        model:{},
        visible:false,
        confirmLoading: false,
        ejyxdygl: {},
        cqtj: {},
        ssxz_dictText: '',
        xzc_dictText: '',
        sjyxdysl: 0,
        sjyxdymc: '',
        url:{
          loadApplicant:"/sps/register/loadApplicants",
          loadRegisterFiles:"/sps/register/getRegisterFilesConfig",
          khxxcjportXlsUrl:"/yxdygl/ejyxdygl/download"
        }
      }
    },
    methods: {
      edit (record) {
        this.model = Object.assign({}, record)
        console.log("--------")
        console.log(record)
        if(record.dybh) {
          getAction("/yxdygl/ejyxdygl/getCqtj", { dybh: record.dybh }).then((res) => {
            if (res.success) {
              this.ejyxdygl = res.result.ejyxdygl || {};
              this.cqtj = res.result.cqtj || {}
              this.ssxz_dictText = res.result.ssxz_dictText
              this.xzc_dictText = res.result.xzc_dictText
              this.sjyxdysl = res.result.sjyxdysl
              this.sjyxdymc = res.result.sjyxdymc
            } else {
              this.$message.error("查询营销单元信息失败!")
            }
          });
        }
        this.visible = true;
      },

      handleCancel () {
        this.close();
      },

      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        let fileName = this.ssxz_dictText + this.xzc_dictText + "村情分析报告.doc"
        this.handleExportXls(fileName)
      },

      handleExportXls(fileName){
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        console.log("---------")
        console.log(this.model)
        let param = {"dybh":this.model.dybh};
        console.log("导出参数",param)
        downFile(this.url.khxxcjportXlsUrl,param).then((data)=>{
          if (!data) {
            this.$message.warning("文件下载失败")
            return
          }
          var blob = new Blob([data]);
          if('msSaveOrOpenBlob' in navigator){
            window.navigator.msSaveOrOpenBlob(blob, fileName);
            return;
          }
          var eleLink = document.createElement('a');
          eleLink.download = fileName;
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
<style scoped>
  .abcdefg .ant-card-body{
    margin-left: 0%;
    margin-right: 0%;
    margin-bottom: 1%;
    border:0px solid black;
    min-width: 800px;
  }
  .explain{
    text-align: left;
    margin-left: 50px;
  }
  .sign table {
    /*table-layout: fixed;*/
    border-collapse: collapse;
    border: 1px solid;
    /*word-break: break-all;*/
  }
  .sign table tr td{
    padding: 3px 0;
    /*word-break: break-all;*/
  }
  .explain div{
    margin-bottom: 10px;
  }
  /* you can make up upload button and sample style by using stylesheets */
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
</style>