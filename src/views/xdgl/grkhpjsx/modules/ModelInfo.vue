<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :okButtonProps="{ props: {disabled: false} }"
    @ok="handleCancel"
    @cancel="handleCancel"
    okText="关闭"
    >
    <a-card :bordered="false" :class="{'abcdefg':true}">

      <section ref="print" id="printContent" class="abcdefg">
        <!--<div style="text-align: center">
          &lt;!&ndash;<p style="font-size: 24px;font-weight: 800">{{this.nhxxcj.qydm}}贷款利率定价计算表</p>&ndash;&gt;
          <p style="font-size: 24px;font-weight: 800">浏阳农商行贷款利率定价计算表</p>
        </div>-->
        <!--签字-->

        <div class="sign" style="text-align: left;height: inherit">

          <div id="lldjjsPrintDiv">
            <p style="padding-top: 1px; text-align:center;font-size:25px;height: 40px;font-weight:bolder" class="title">浏阳农商行模型计算详情</p>

            <table align="center"  class="tableCss" width="100%">
              <colgroup>
                <col width="25%">
                <col width="25%">
                <col width="25%">
                <col width="25%">
              </colgroup>
              <tbody>


              <tr style="page-break-after:always">
                <td colspan="4">
                  <table align="center"  class="tableCss" width="100%" >
                    <tr>
                      <th colspan="3" style="text-align: center;font-weight:bolder;font-size:14px;" width="90%">模型计分项目</th>
                      <th style="text-align: center;font-weight:bolder;font-size:14px;" width="10%">得分</th>
                    </tr>

                    <tr>
                      <td colspan="4" width="100%" style="font-size:14px;font-weight:bolder;">(一)家庭人数</td>
                    </tr>


                    <tr>
                      <td colspan="3" width="90%">1.家庭人数：{{jtrs}} 人</td>
                      <th width="10%">{{jtrsdf}}</th>
                    </tr>
                    <tr>
                      <td colspan="3" width="90%">2.年龄：{{nl}}</td>
                      <th width="10%">{{nldf}}</th>
                    </tr>
                    <tr>
                      <td colspan="3" width="90%">3.健康状况：{{jkzk}}</td>
                      <th width="10%">{{jkzkdf}}</th>
                    </tr>

                    <tr>
                      <td colspan="3" width="90%">4.婚姻状况：{{hyzk}}</td>
                      <th width="10%">{{hyzkdf}}</th>
                    </tr>

                    <tr>
                      <td colspan="3" width="90%">5.从事职业：{{cszy}}</td>
                      <th width="10%">{{cszydf}}</th>
                    </tr>

                    <tr>
                      <td colspan="3" width="90%">6.职称情况：{{zc}}</td>
                      <th width="10%">{{zcdf}}</th>
                    </tr>
                    <tr>
                      <td colspan="3" width="90%" style="font-size:14px;font-weight:bolder;">总得分</td>
                      <th width="10%">
                        {{scoreOne}}
                      </th>
                    </tr>







                  </table>
                </td>
              </tr>
              </tbody></table>

            <table align="center"  class="tableCss" width="100%">
              <colgroup>
                <col width="25%">
                <col width="25%">
                <col width="25%">
                <col width="25%">
              </colgroup>
              <tbody>


              <tr style="page-break-after:always">
                <td colspan="4">
                  <table align="center"  class="tableCss" width="100%" >


                    <tr>
                      <td colspan="4" width="100%" style="font-size:14px;font-weight:bolder;">(二)定活期余额</td>
                    </tr>

                    <tr>
                      <td colspan="3" width="90%">1.定活期余额：{{dqdf}} 元</td>
                      <th width="10%">{{scoreTwo}}</th>
                    </tr>

                    <tr>
                      <td colspan="3" width="90%" style="font-size:14px;font-weight:bolder;">总得分</td>
                      <th width="10%">
                        {{scoreTwo}}
                      </th>
                    </tr>







                  </table>
                </td>
              </tr>
              </tbody></table>

            <table align="center"  class="tableCss" width="100%">
              <colgroup>
                <col width="25%">
                <col width="25%">
                <col width="25%">
                <col width="25%">
              </colgroup>
              <tbody>


              <tr style="page-break-after:always">
                <td colspan="4">
                  <table align="center"  class="tableCss" width="100%" >


                    <tr>
                      <td colspan="4" width="100%" style="font-size:14px;font-weight:bolder;">(三)与我行关系</td>
                    </tr>

                    <tr>
                      <td colspan="3" width="90%">1.存入金额：{{crjye}} 元</td>
                      <th width="10%">{{crzcdf}}</th>
                    </tr>

                    <tr>
                      <td colspan="3" width="90%">2.支出金额：{{zcjye}} 元</td>
                      <th width="10%">{{crzcdf}}</th>
                    </tr>

                    <tr>
                      <td colspan="3" width="90%">3.存款账号数量：{{ckzhsl}} 个</td>
                      <th width="10%">{{ckzhsldf}}</th>
                    </tr>

                    <tr>
                      <td colspan="3" width="90%">4.手机银行：{{sjyhjls}} 交易次数</td>
                      <th width="10%">{{sjyhjls}}</th>
                    </tr>

                    <tr>
                      <td colspan="3" width="90%">5.口袋零钱：{{kdlqjls}} 交易次数</td>
                      <th width="10%">{{kdlqjlsdf}}</th>
                    </tr>

                    <tr>
                      <td colspan="3" width="90%">6.网银：{{wyjls}} 交易次数</td>
                      <th width="10%">{{wyjlsdf}}</th>
                    </tr>

                    <tr>
                      <td colspan="3" width="90%">7.etc：{{etcjls}} 交易次数</td>
                      <th width="10%">{{etcjlsdf}}</th>
                    </tr>

                    <tr>
                      <td colspan="3" width="90%">8.农信银：{{nxyjls}} 交易次数</td>
                      <th width="10%">{{nxyjlsdf}}</th>
                    </tr>

                    <tr>
                      <td colspan="3" width="90%">9.水费代收：{{sfds}} 交易次数</td>
                      <th width="10%">{{sfdsdf}}</th>
                    </tr>


                    <tr>
                      <td colspan="3" width="90%" style="font-size:14px;font-weight:bolder;">总得分</td>
                      <th width="10%">
                        {{scoreThree}}
                      </th>
                    </tr>







                  </table>
                </td>
              </tr>
              </tbody></table>

            <table align="center"  class="tableCss" width="100%">
              <colgroup>
                <col width="25%">
                <col width="25%">
                <col width="25%">
                <col width="25%">
              </colgroup>
              <tbody>


              <tr style="page-break-after:always">
                <td colspan="4">
                  <table align="center"  class="tableCss" width="100%" >


                    <tr>
                      <td colspan="4" width="100%" style="font-size:14px;font-weight:bolder;">(四)逾期信息</td>
                    </tr>

                    <tr>
                      <td colspan="2" width="50%">1.逾期信息等级判定：{{yqdj}} </td>
                      <td width="40%">理由：{{yqdjly}} </td>
                      <th width="10%">{{yqdjdf}}</th>
                    </tr>

                    <tr>
                      <td colspan="3" width="90%" style="font-size:14px;font-weight:bolder;">总得分</td>
                      <th width="10%">
                        {{yqdjdf}}
                      </th>
                    </tr>



                  </table>
                </td>
              </tr>
              </tbody></table>


            <table align="center"  class="tableCss" width="100%">
              <colgroup>
                <col width="25%">
                <col width="25%">
                <col width="25%">
                <col width="25%">
              </colgroup>
              <tbody>


              <tr style="page-break-after:always">
                <td colspan="4">
                  <table align="center"  class="tableCss" width="100%" >


                    <tr>
                      <td colspan="4" width="100%" style="font-size:14px;font-weight:bolder;">(五)社会声誉</td>
                    </tr>

                    <tr>
                      <td colspan="2" width="50%">1.社会声誉判定等级：{{shpj}} </td>
                      <td width="40%">理由：{{shpjly}} </td>
                      <th width="10%">{{ shpjdf }}</th>
                    </tr>


                    <tr>
                      <td colspan="3" width="90%" style="font-size:14px;font-weight:bolder;">总得分</td>
                      <th width="10%">
                        {{shpjdf}}
                      </th>
                    </tr>



                  </table>
                </td>
              </tr>
              </tbody></table>

            <table align="center"  class="tableCss" width="100%">
              <colgroup>
                <col width="25%">
                <col width="25%">
                <col width="25%">
                <col width="25%">
              </colgroup>
              <tbody>


              <tr style="page-break-after:always">
                <td colspan="4">
                  <table align="center"  class="tableCss" width="100%" >


                    <tr>
                      <td colspan="3" width="100%" style="font-size:14px;font-weight:bolder;">(六)模型计算</td>
                    </tr>

                    <tr>
                      <td colspan="2" width="50%">1.模型判定等级：{{typeflag}} </td>
                      <td width="40%">规则：逾期等级和社会声誉等级中的大值 </td>
                    </tr>

                    <tr>
                      <td colspan="2" width="50%">模型得分：</td>
                      <td width="50%">{{xtpjdf}}</td>
                    </tr>

                    <tr>
                      <td colspan="2" width="50%">模型等级：</td>
                      <td width="50%">{{xtpddj}}</td>
                    </tr>

                    <tr>
                      <td colspan="2" width="50%">授信金额：</td>
                      <td width="50%">{{xtsxje}} 万元</td>
                    </tr>



                  </table>
                </td>
              </tr>
              </tbody></table>




          </div>



        </div>
      </section>
    </a-card>


  </a-modal>

</template>

<script>

  import moment from 'moment'
  import pick from 'lodash.pick'
  import { JEditableTableMixin } from '@/mixins/JEditableTableMixin'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { httpAction,putAction,getAction } from '@/api/manage'
  import { mapGetters } from 'vuex'
  import ACol from "ant-design-vue/es/grid/Col";
  import ARow from "ant-design-vue/es/grid/Row";
  import ATextarea from 'ant-design-vue/es/input/TextArea'




  export default {
    components: {},
    name: 'ModelInfo',
    mixins: [JEditableTableMixin,JeecgListMixin],
    data() {
      return {
       jtrs:"",
       jtrsdf:"",
        nl:"",
        nldf:"",
        jkzk:"",
        jkzkdf:"",
        hyzk:"",
        hyzkdf:"",
        zc:"",
        zcdf:"",
        cszy:"",
        cszydf:"",
        dqdf:"",
        scoreTwo:"",
        crjye:"",
        zcjye:"",
        crzcdf:"",
        zcjycs:"",
        zcjycsdf:"",
        crjycs:"",
        crjycsdf:"",
        ckzhsl:"",
        ckzhsldf:"",
        sjyhjls:"",
        sjyhjlsdf:"",
        kdlqjls:"",
        kdlqjlsdf:"",
        wyjls:"",
        wyjlsdf:"",
        etcjls:"",
        etcjlsdf:"",
        nxyjls:"",
        nxyjlsdf:"",
        sfds:"",
        sfdsdf:"",
        yqdj:"",
        yqdjly:"",
        yqdjdf:"",
        shpj:"",
        shpjly:"",
        shpjdf:"",
        typeflag:"",
        xtpddj:"",
        xtpjdf:"",
        xtsxje:"",


       scoreOne:"",
       scoreThree:"",
        url: {
          list: "/",
        }
      }
    },

    created () {
      this.querycsz()
    },


    methods: {

      add (value) {
        this.addzjhm = value.zjhm
        this.zjhm=this.addzjhm
        this.edit({});
      },
      edit (record) {
        this.model = Object.assign({});
        this.visible = true;
        this.zjhm = record.zjhm;
        this.hhbm = record.hhbm;
        this.jtrs = record.jtrs;
        this.jtrsdf = record.jtrsdf;

        this.nl = record.nl;
        this.nldf = record.nldf;
        this.jkzk = record.jkzk;
        this.jkzkdf = record.jkzkdf;
        this.hyzk = record.hyzk;
        this.hyzkdf = record.hyzkdf;
        this.zcdf = record.zcdf;
        this.zc = record.zc;
        this.cszy = record.cszy;
        this.cszydf = record.cszydf;
        this.dqdf = record.dqdf;
        this.scoreTwo = record.scoreTwo;



        this.crjye = record.crjye;
        this.zcjye = record.zcjye;
        this.crzcdf = record.crzcdf;
        this.zcjycs = record.zcjycs;
        this.zcjycsdf = record.zcjycsdf;
        this.ckzhsl = record.ckzhsl;
        this.ckzhsldf = record.ckzhsldf;
        this.sjyhjls = record.sjyhjls;
        this.sjyhjlsdf = record.sjyhjlsdf;
        this.kdlqjls = record.kdlqjls;
        this.kdlqjlsdf = record.kdlqjlsdf;
        this.wyjls = record.wyjls;
        this.wyjlsdf = record.wyjlsdf;
        this.etcjls = record.etcjls;
        this.etcjlsdf = record.etcjlsdf;
        this.nxyjls = record.nxyjls;
        this.nxyjlsdf = record.nxyjlsdf;
        this.sfds = record.sfds;
        this.sfdsdf = record.sfdsdf;
        this.scoreOne = record.scoreOne;
        this.scoreThree = record.scoreThree;
        this.yqdj = record.yqdj;
        this.yqdjly = record.yqdjly;
        this.yqdjdf = record.yqdjdf;
        this.shpj = record.shpj;
        this.shpjly = record.shpjly;
        this.shpjdf = record.shpjdf;

        if (this.yqdj > this.shpj)
        {
          this.typeflag = this.yqdj;
        }else {
          this.typeflag = this.shpj;
        }

        //this.xtpddj = record.xtpddj;
        if (record.xtpddj == "A"){
          this.xtpddj = "特级";
        }else if (record.xtpddj == "B"){
          this.xtpddj = "优秀";
        }else if (record.xtpddj == "C"){
          this.xtpddj = "较好";
        }else if (record.xtpddj == "D"){
          this.xtpddj = "一般";
        }else if (record.xtpddj == "E"){
          this.xtpddj = "级外";
        }





        this.xtpjdf = record.xtpjdf;
        this.xtsxje = record.xtsxje;

      },
      handleCancel () {
        this.close()
      },

      close () {
        this.jkyt= null;
        this.dkje=null;
        this.dkqx=null;
        this.hkly=null;
        this.id = null;
        this.zjhm =null;
        this.hhbm =null;
        this.$emit('close');
        this.visible = false;
      },
      //查询是否开通三级营销单元
      querycsz(){
        let params = { "csm":"CS0004"}
        putAction("/yxdygl/yxdyglPqzrrgl/querycsz", params).then(res => {
          if (res.success) {
            this.sfktsjyxdy =res.result.csz
          }
        });
      },

      handleOk () {
        let formData={}
        formData.zjhm = this.zjhm;
        formData.hhbm = this.hhbm;
        formData.wordColumnOne = this.jkyt;
        formData.wordColumnTwo = this.dkje;
        formData.wordColumnThree = this.dkqx;
        formData.wordColumnFour = this.hkly;
        formData.id = this.id;
        formData.wordType = this.wordType;

        var reg = /^[0-9]+.?[0-9]*$/
        var dz = this.zjhm;

        /*if (this.jkyt.length > 100){
          this.$message.error("您输入的借款用途字数长度限制在100");
          return ;
        }

        if (!this.dkje.test(reg)){
          this.$message.error("您输入的借款金额必须是整数");
          return ;
        }

        if (!this.dkje.test(reg)){
          this.$message.error("您输入的借款期限必须是整数");
          return ;
        }*/


        putAction('/wordinfo/camsZcsxWordinfo/edit',formData).then((res)=>{
          if(res.success){
            getAction('/xdgl/nhxe/nhxe/generate',formData).then((res)=>{
              if(res.success){
                  console.log(this.zjhm+" =========")
                  let url= `${window._CONFIG['staticDomainURL']}/`+ "dkzl/"+dz+"nhxe.doc"
                  window.open(
                    //'http://127.0.0.1:8012/onlinePreview?url='+encodeURIComponent(url)
                    `${window._CONFIG['kkFileViewURL']}`+ '?url='+encodeURIComponent(url))

              }else{
                this.$message.warning(res.message,5);
              }
            })
          }else{
            this.$message.warning(res.message,5);
          }
        }).finally(() => {
          this.confirmLoading = false;
          this.close();
      })

      },
      radioChange(e){
        this.wordType = e.target.value;
      }

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
.explain .ant-input,.sign .ant-input{
  font-weight:bolder;
  text-align:center;
  border-left-width:0px!important;
  border-top-width:0px!important;;
  border-right-width:0px!important;;
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

table.tableCss {
  font-family: verdana, arial, sans-serif;
  font-size: 11px;
  color: #000000;
  border-width: 1px;
  border-color: #000000;
  border-collapse: collapse;
}

table.tableCss th {
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #000000;
  background-color: #FFFFFF;
}

table.tableCss td {
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #000000;
  background-color: #ffffff;
}
</style>