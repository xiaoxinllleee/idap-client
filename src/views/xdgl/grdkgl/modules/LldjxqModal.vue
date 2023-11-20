<template>
  <a-modal :width="1000"
           :visible="visible"
           :confirmLoading="confirmLoading"
           :destroyOnClose="true"
           @ok="handleOk"
           @cancel="handleCancel"
           okText="导出"
           cancelText="关闭">


    <a-card :bordered="false" :class="{'abcdefg':true}">
      <div class="no-print" style="text-align: right">
        <a-button v-print="'#printContent'" ghost type="primary">打印</a-button>
      </div>
      <section ref="print" id="printContent" class="abcdefg">
        <!--<div style="text-align: center">
          &lt;!&ndash;<p style="font-size: 24px;font-weight: 800">{{this.nhxxcj.qydm}}贷款利率定价计算表</p>&ndash;&gt;
          <p style="font-size: 24px;font-weight: 800">浏阳农商行贷款利率定价计算表</p>
        </div>-->
        <!--签字-->

        <div class="sign" style="text-align: left;height: inherit">

          <div id="lldjjsPrintDiv">
            <p style="padding-top: 10px; text-align:center;font-size:25px;height: 40px;font-weight:bolder" class="title">浏阳农商行贷款利率定价计算表</p>
            <p align="right" style="padding-right: 80px;">定价编号：{{this.zxlldjb.djid}}</p>
            <table align="center"  class="tableCss" width="100%">
              <colgroup>
                <col width="25%">
                <col width="25%">
                <col width="25%">
                <col width="25%">
              </colgroup>
              <tbody>
              <tr>
                <td class="right" style="text-align:left;">
                  计算日期:
                </td>
                <td class="left">
                  {{this.zxlldjb.spsj}}
                </td>
                <td class="right" style="text-align:left;">
                  单位:
                </td>
                <td class="left">
                  万元
                </td>
              </tr>
              <tr>
                <td class="right" style="text-align:left;">
                  申请客户名称:
                </td>
                <td class="left">
                  {{this.djsqxx.khmc}}
                </td>
                <td class="right" style="text-align:left;">
                  法人代表:
                </td>
                <td class="left">
                  {{this.djsqxx.frdb}}
                </td>
              </tr>
              <tr>
                <td class="right" style="text-align:left;">
                  上年授信额度:
                </td>
                <td class="left">
                  {{parseFloat(this.djsqxx.snsxed == " " ? '0.00' : this.djsqxx.snsxed).toFixed(2) }}
                </td>
                <td class="right" style="text-align:left;">
                  上年贷款利率上浮幅度:
                </td>
                <td class="left">
                  {{parseFloat(this.djsqxx.sndkllsffd == " " ? '0.00' : this.djsqxx.sndkllsffd).toFixed(2) }}
                </td>
              </tr>
              <tr>
                <td class="right" style="text-align:left;">
                  综合授信额度:
                </td>
                <td class="left">
                  {{parseFloat(this.djsqxx.zhsxed == " " ? '0.00' : this.djsqxx.zhsxed).toFixed(2) }}
                </td>
                <td class="right" style="text-align:left;">
                  其中:贷款授信+承兑敞口:
                </td>
                <td class="left" >
                  {{parseFloat(this.djsqxx.cdck == " " ? '0.00' : this.djsqxx.cdck).toFixed(2) }}
                </td>
              </tr>
              <tr>
                <td class="right" style="text-align:left;">
                  贷款期限:
                </td>
                <td class="left">
                  {{this.dkqxOptions}}
                </td>
                <td class="right" style="text-align:left;">
                  客户类型:
                </td>
                <td class="left">
                  {{this.khlxOptions}}
                </td>
              </tr>
              <tr>
                <td class="right" style="text-align:left;">
                  是否便民卡:
                </td>
                <td class="left">
                  {{this.sfbmkOptions}}
                </td>
                <td class="right" style="text-align:left;">
                  是否保证保险贷款：
                </td>
                <td class="left">
                  {{this.sfbzbxdkOptions}}
                </td>
              </tr>

              <tr style="page-break-after:always">
                <td colspan="4">
                  <table align="center"  class="tableCss" width="100%" >
                    <tr>
                      <th colspan="3" style="text-align: center;font-weight:bolder;font-size:14px;" width="90%">考核计分项目</th>
                      <th style="text-align: center;font-weight:bolder;font-size:14px;" width="10%">得分</th>
                    </tr>

                    <tr>
                      <td colspan="3" width="90%" style="font-size:14px;font-weight:bolder;">(一)信用评价</td>
                      <th width="10%">
                        {{parseFloat(this.xypxdf == " " ? '0.0' : this.xypxdf).toFixed(1) }}
                      </th>
                    </tr>

                    <tr>
                      <td width="30%" style="font-weight:bolder;" nowrap>1.信用等级:</td>
                      <td colspan="2" width="60%">
                        {{this.zbxx.KH00001}}
                      </td>
                      <th width="10%"> {{parseFloat(this.zbxx.DF_KH00001 == " " ? '0.0' : this.zbxx.DF_KH00001).toFixed(1) }} </th>
                    </tr>

                    <tr>
                      <td colspan="3" width="90%" style="font-weight:bolder;">2.扣分项目</td>
                      <th width="10%"> {{parseFloat(this.zbxx.KFX_KH00002 == " " ? '0.0' : this.zbxx.KFX_KH00002).toFixed(1) }} </th>
                    </tr>

                    <tr>
                      <td colspan="2" width="65%" >借款人(含法人代表、主要股东及配偶)征信有不良记录</td>
                      <td width="20%">{{this.zbxx.CS_GZ00009}}</td>
                      <th width="15%"> {{parseFloat(this.zbxx.GZ00009 == " " ? '0.0' : this.zbxx.GZ00009).toFixed(1) }}</th>
                    </tr>

                    <tr>
                      <td colspan="2" width="65%" >借款人上年在本行贷款（含贷记卡）未按期清息、还款次数</td>
                      <td width="20%">{{this.zbxx.CS_GZ00010}}</td>
                      <th width="15%"> {{parseFloat(this.zbxx.GZ00010 == " " ? '0.0' : this.zbxx.GZ00010).toFixed(1) }}</th>
                    </tr>

                    <tr>
                      <td colspan="1" width="20%" style="font-weight:bolder;">3.资产负债率</td>
                      <td colspan="2" width="70%" >资产总额:{{this.zbxx.CS_GZ00013}}；负债总额:{{this.zbxx.CS_GZ00014}}；资产负债率:{{this.zbxx.CS_GZ00015}} </td>
                      <th width="10%"  > {{parseFloat(this.zbxx.KFX_KH00003 == " " ? '0.0' : this.zbxx.KFX_KH00003).toFixed(1) }} </th>
                    </tr>

                    <tr>
                      <td colspan="1" width="20%" style="font-weight:bolder;">4.经营期限</td>

                      <td colspan="2" width="70%" nowrap>
                        {{this.zbxx.KH00004}}
                      </td>
                      <th width="10%"> {{parseFloat(this.zbxx.DF_KH00004 == " " ? '0.0' : this.zbxx.DF_KH00004).toFixed(1) }}</th>
                    </tr>

                    <tr>
                      <td rowspan="2" colspan="1" width="20%" style="font-weight:bolder;">5.销售收入归行</td>

                      <td colspan="2" width="70%" nowrap>销售收入:{{this.zbxx.CS_GZ00021}}</td>
                      <th rowspan="2"  width="10%">  {{parseFloat(this.zbxx.DF_KH00005 == " " ? '0.0' : this.zbxx.DF_KH00005).toFixed(1) }} </th>
                    </tr>

                    <tr>
                      <td colspan="2">流动负债:{{this.zbxx.CS_GZ00022}}；倍数: {{parseFloat(this.zbxx.CS_GZ00023 == " " ? '0.0' : this.zbxx.CS_GZ00023).toFixed(1) }} </td>
                    </tr>

                  </table>
                </td>
              </tr>
              </tbody></table>




            <table align="center" class="tableCss" width="100%" style="margin-top: 20px;">
              <tbody><tr>
                <td colspan="6">
                  <table align="center" class="tableCss" width="100%">
                    <tbody><tr>
                      <td colspan="3" width="90%" style="font-size:14px;font-weight:bolder;">(二)担保类型</td>
                      <th width="10%">{{this.zbxx.dbzdf}}</th>
                    </tr>

                    <tr>
                      <td colspan="3" width="90%" style="font-size:14px;font-weight:bolder;">(三)客户综合贡献度</td>

                      <th width="10%"> {{parseFloat(this.khzhgxddf == " " ? '0.0' : this.khzhgxddf).toFixed(1) }}</th>
                    </tr>



                    <tr>
                      <td rowspan="7" colspan="1" style="font-weight:bolder;" width="20%">1.客户存款贡献</td>

                      <td colspan="2" width="40%">
                        开立基本账户往来: {{this.zbxx.CS_GZ00031}} ；
                        日平存款占贷款比例: {{parseFloat(this.zbxx.CS_GZ00032 == " " ? '0.00' : this.zbxx.CS_GZ00032).toFixed(2) }}%;
                      </td>
                      <th rowspan="7" width="10%">{{parseFloat(this.zbxx.DF_KH00007 == " " ? '0.00' : this.zbxx.DF_KH00007).toFixed(1) }} </th>
                    </tr>

                    <tr>
                      <td colspan="2">前三年第一个年度存款日平: {{parseFloat(this.zbxx.CS_GZ00033 == " " ? '0.0000' : this.zbxx.CS_GZ00033).toFixed(4) }}  </td>
                    </tr>

                    <tr>
                      <td colspan="2">前三年第二个年度存款日平:{{parseFloat(this.zbxx.CS_GZ00034 == " " ? '0.0000' : this.zbxx.CS_GZ00034).toFixed(4) }}</td>
                    </tr>

                    <tr>
                      <td colspan="2">前三年第三个年度存款日平:{{parseFloat(this.zbxx.CS_GZ00035 == " " ? '0.0000' : this.zbxx.CS_GZ00035).toFixed(4) }}</td>
                    </tr>

                    <tr>
                      <td colspan="2">客户上一年度在其他银行存款日平:{{parseFloat(this.zbxx.CS_GZ00035 == " " ? '0.0000' : this.zbxx.CS_GZ00035).toFixed(4)}}  </td>
                    </tr>

                    <tr>
                      <td colspan="2">客户上一年度在其他银行定期存款日平:{{parseFloat(this.zbxx.CS_GZ00037 == " " ? '0.0000' : this.zbxx.CS_GZ00037).toFixed(4)}} </td>
                    </tr>

                    <tr>
                      <td colspan="2">定价存款日平合计:{{parseFloat(this.zbxx.CS_GZ00038 == " " ? '0.0000' : this.zbxx.CS_GZ00038).toFixed(4) }} </td>
                    </tr>


                    <tr>
                      <td colspan="3" width="90%" style="font-weight:bolder;">2.客户代理业务</td>

                      <th width="10%">{{parseFloat(this.zbxx.DF_KH00009 == " " ? '0.0' : this.zbxx.DF_KH00009).toFixed(1) }}</th>
                    </tr>

                    <tr>
                      <td colspan="2" width="70%">客户本年度代发工资业务不在本行代发</td>
                      <td width="20%">{{this.zbxx.CSZ_GZ00043}} </td>
                      <th width="10%">{{parseFloat(this.zbxx.CS_GZ00043 == " " ? '0.0' : this.zbxx.CS_GZ00043).toFixed(1)}}</th>
                    </tr>

                    <tr>
                      <td colspan="2" width="70%">高危行业财产保险本年应保未保或第一受益人不是本行</td>
                      <td width="20%">{{this.zbxx.CSZ_GZ00044}} </td>
                      <th width="10%">{{parseFloat(this.zbxx.CS_GZ00044 == " " ? '0.0' : this.zbxx.CS_GZ00044).toFixed(1)}}</th>
                    </tr>

                    <tr>
                      <td colspan="2" width="70%">高危行业财产保险本年应保不全</td>
                      <td width="20%">{{this.zbxx.CSZ_GZ00045}} </td>
                      <th width="10%">{{parseFloat(this.zbxx.CS_GZ00045 == " " ? '0.0' : this.zbxx.CS_GZ00045).toFixed(1)}}</th>
                    </tr>

                    <tr>
                      <td colspan="2" width="70%">保险到期未能如期续保且第一受益人不是本行、不能覆盖定价周期</td>
                      <td width="20%">{{this.zbxx.CSZ_GZ00046}} </td>
                      <th width="10%">{{parseFloat(this.zbxx.CS_GZ00046 == " " ? '0.0' : this.zbxx.CS_GZ00046).toFixed(1)}}</th>
                    </tr>

                    <tr>
                      <td colspan="3" width="90%" style="font-weight:bolder;">3.其它业务</td>
                      <th width="10%">{{parseFloat(this.zbxx.DF_KH00010 == " " ? '0.0' : this.zbxx.DF_KH00010).toFixed(1)}}</th>
                    </tr>

                    <tr>
                      <td colspan="2" width="70%">客户实际控制企业有国际贸易业务的，上年在本行往来</td>
                      <td width="20%">{{this.zbxx.CSZ_GZ00047}} </td>
                      <th width="10%">{{parseFloat(this.zbxx.CS_GZ00047 == " " ? '0.0' : this.zbxx.CS_GZ00047).toFixed(1)}}</th>
                    </tr>

                    <tr>
                      <td colspan="2" width="70%">基本账户未在我行或在我行但资金归行不走基本账户</td>
                      <td width="20%">{{this.zbxx.CSZ_GZ00049}} </td>
                      <th width="10%">{{parseFloat(this.zbxx.CS_GZ00049 == " " ? '0.0' : this.zbxx.CS_GZ00049).toFixed(1)}}</th>
                    </tr>

                    <tr>
                      <td colspan="2" width="70%">其他银行存款日平占本行存款日平比例</td>
                      <td width="20%">{{this.zbxx.CSZ_GZ00048}} </td>
                      <th width="10%">{{parseFloat(this.zbxx.CS_GZ00048 == " " ? '0.0' : this.zbxx.CS_GZ00048).toFixed(1)}}</th>
                    </tr>
                    </tbody>
                  </table>
                </td>
              </tr>



              <tr>
                <td>得分合计：</td>
                <th>{{parseFloat(this.zbxx.zxlldjbTable.dfhj == null ? '0.0' : this.zbxx.zxlldjbTable.dfhj).toFixed(1)}}</th>
                <td>LPR基点</td>
                <th>{{parseFloat(this.zbxx.zxlldjbTable.jdbp == null ? '0.0' : this.zbxx.zxlldjbTable.jdbp).toFixed(1)}}</th>
                <td>优惠后LPR基点</td>
                <th>{{this.zbxx.zxlldjbTable.yhhjdbp}}</th>
              </tr>

              <tr>
                <td>对应档次LPR：</td>
                <th>{{this.zbxx.Dyyhjdcs}}  </th>
                <td>执行利率</td>
                <th>{{parseFloat(this.zbxx.zxlldjbTable.zxll == null ? '0.0000' : this.zbxx.zxlldjbTable.zxll).toFixed(4)}}%</th>
                <td>优惠后执行利率</td>
                <th>{{parseFloat(this.zbxx.zxlldjbTable.yhhzxll == null ? '0.0000' : this.zbxx.zxlldjbTable.yhhzxll).toFixed(4)}}%</th>
              </tr>
              </tbody></table>

            <table align="center" width="100%" class="tableCss">
              <tbody><tr>
                <td>客户经理签字：</td>
                <td>信贷内勤签字：</td>
                <td>行长签字：</td>
              </tr>
              </tbody>
            </table>
          </div>

          <br>
          <br>
          <br>
          <div id="lldjjsPrintDiv2">
            <table align="center" class="tableCss" style="table-layout: auto;" width="98%">
              <tr>
                <td colspan="4"  style="text-align: center;font-weight:bolder;font-size:24px;height: 50px">贷款利率定价附表一</td>
              </tr>

              <tr>
                <td colspan="4">附：客户活期存款明细(单位：万元)</td>
              </tr>

              <tr>
                <td colspan="4">
                  <table align="center" class="tableCss" style="table-layout: auto;" width="100%">
                    <tr class="center">
                      <th align="center">机构代码</th>
                      <th align="center">机构名称</th>
                      <th align="center">存款账号</th>
                      <th align="center">户名</th>
                      <th align="center">与客户关系</th>
                      <th align="center">详细关系</th>
                      <th align="center">前三年第一年存款日平</th>
                      <th align="center">前三年第二年存款日平</th>
                      <th align="center">前三年第三年存款日平</th>
                    </tr>

                   <!-- <%
                    Rate_lldj_zhckrp hqckrp =(Rate_lldj_zhckrp) request.getAttribute("hqckrp");
                    Rate_lldj_zhckrp bzjckmx =(Rate_lldj_zhckrp) request.getAttribute("bzjckmx");
                    %>-->
                    <tr  v-for='(item,index) in this.zbxx.hqckrp' v-bind:key='item.ckzh' >
                      <td>{{item.jgdm}}</td>
                      <td>{{item.jgdm_dictText}}</td>
                      <td>{{item.ckzh}}</td>
                      <td>{{item.hm}}</td>
                      <td>{{item.ykhgx_dictText}}</td>
                      <td>{{item.glzhxxgx}}</td>
                      <td>{{item.qsndynckrp}}</td>
                      <td> {{item.qsndenckrp}}</td>
                      <td>{{item.qsndsnckrp}} </td>
                    </tr>


                    <tr v-for="(bzjckmx,index) in this.zbxx.bzjckmx " v-bind:key='bzjckmx.ckzh'>
                      <td>{{bzjckmx.jgdm}}</td>
                      <td>{{bzjckmx.jgdm_dictText}}</td>
                      <td>{{bzjckmx.ckzh}}</td>
                      <td>{{bzjckmx.hm}}</td>
                      <td>{{bzjckmx.ykhgx_dictText}}</td>
                      <td>{{bzjckmx.glzhxxgx}}</td>
                      <td>{{bzjckmx.qsndynckrp}}</td>
                      <td> {{bzjckmx.qsndenckrp}}</td>
                      <td>{{bzjckmx.qsndsnckrp}} </td>
                    </tr>

                    <tr>
                      <td colspan="9">
                        其中：
                        各类保证金日平（按前三年第三年存款日平30%计算）：{{parseFloat(this.zbxx.bzjckrp == null ? '0.0000' : this.zbxx.bzjckrp).toFixed(4)}}；
                        定价存款日平合计：{{parseFloat(this.zbxx.GZ00038 == null ? '0.0000' : this.zbxx.GZ00038).toFixed(4)}}；
                        客户上一个年度在其他银行活期存款日平：{{parseFloat(this.zbxx.GZ00036 == null ? '0.0000' : this.zbxx.GZ00036).toFixed(4)}}；
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

           <table align="center" class="tableCss" style="table-layout: auto;" width="98%">
              <tr>
                <td colspan="4" style="text-align: center;font-weight:bolder;font-size:24px;height: 50px">贷款利率定价附表二</td>
              </tr>

              <tr>
                <td colspan="4">附：客户定期存款明细(单位：万元)</td>
              </tr>

              <tr>
                <td colspan="4">
                  <table align="center" class="tableCss" style="table-layout: auto;" width="100%">
                    <tr class="center">
                      <th rowspan="2" align="center">机构代码</th>
                      <th rowspan="2" align="center">机构名称</th>
                      <th rowspan="2" align="center">存款账号</th>
                      <th rowspan="2" align="center">户名</th>
                      <th rowspan="2" align="center">存入日</th>
                      <th rowspan="2" align="center">支取日</th>
                      <th rowspan="2" align="center">金额</th>
                      <th colspan="3" align="center">前三年存款日平</th>
                    </tr>

                    <tr class="center">
                      <th align="center">第一年</th>
                      <th align="center">第二年</th>
                      <th align="center">前三年</th>
                    </tr>

                   <!-- <%
                    Rate_lldj_zhckrp dqckrp =(Rate_lldj_zhckrp) request.getAttribute("dqckrp");
                    %>-->

                      <tr v-for="(dqckrp,index) in this.zbxx.dqckrp" v-bind:key='dqckrp.ckzh'>
                        <td>{{dqckrp.jgdm}}</td>
                        <td>{{dqckrp.jgdm_dictText}}</td>
                        <td>{{dqckrp.ckzh}}</td>
                        <td>{{dqckrp.hm}}</td>
                        <td>{{dqckrp.crr}}</td>
                        <td>{{dqckrp.zqr}}</td>
                        <td>{{dqckrp.je}}</td>
                        <td>{{dqckrp.qsndynckrp}}</td>
                        <td>{{dqckrp.qsndenckrp}}</td>
                        <td>{{dqckrp.qsndsnckrp}}</td>
                      </tr>
                    <tr>
                      <td colspan="10">
                        客户上一个年度在其他银行定期存款日平
                        {{parseFloat(this.zbxx.GZ00037 == null ? '0.0000' : this.zbxx.GZ00037).toFixed(4)}};
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <table align="center" class="tableCss" style="table-layout: auto;" width="98%">
              <tr>
                <td colspan="7" style="text-align: center;font-weight:bolder;font-size:24px;height: 50px">贷款利率定价附表三</td>
              </tr>

              <tr>
                <td colspan="7">附：客户担保信息</td>
              </tr>

              <tr>
                <td class="center">担保物</td>
                <td class="center">所有权人</td>
                <td class="center">评估价值</td>
                <td class="center">担保率</td>
                <td class="center">实际担保金额</td>
                <td class="center">担保类型</td>
                <td class="center">担保物描述</td>
              </tr>

              <!--<%
              Rate_dbxxgl dbxxTable =(Rate_dbxxgl) request.getAttribute("dbxxTable");
              %>-->

              <tr align='center' v-for="(dbxxTable,index) in this.zbxx.dbxxTable" >
                <td align='center' >
                 {{dbxxTable.dbw_dictText}}
                </td>
                <td align='center'>
                  {{dbxxTable.syqr}}
                </td>
                <td align='center'>
                  {{parseFloat(dbxxTable.pgjz == null ? '0.00' : dbxxTable.pgjz).toFixed(2)}};
                </td>
                <td align='center'>
                  {{parseFloat(dbxxTable.dbl == null ? '0.00' : dbxxTable.dbl).toFixed(2)}};
                </td>
                <td align='center'>
                  {{parseFloat(dbxxTable.sjdbje == null ? '0.00' : dbxxTable.sjdbje).toFixed(2)}};
                 </td>
                <td align='center' >
                  {{dbxxTable.dblx_dictText}}
                </td>
                <td align='center'>
                  {{dbxxTable.dbwms}}
                </td>
              </tr>



            </table>
          </div>


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
    name: 'LldjxqModal',
    props:{
      reBizCode:{
        type: String,
        default: ''
      }
    },
    data(){
      return {
        jtnsr:" ",
        jtnzc:" ",
        jtcsr:" ",
        sj:5,
        dkqxOptions:"",
        khlxOptions:"",
        sfbmkOptions:"",
        sfbzbxdkOptions:"",
        zxlldjb:{},
        xypxdf:'',
        khzhgxddf:'',
        djsqxx:{},
        zbxx:{},
        model:{},
        visible:false,
        confirmLoading: false,
        dbxxTable:[],
        columns: [{
        }
        ],
        labelCol: {
          xs: { span: 24 },
          sm: { span: 2 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        previewVisible: false,
        previewImage: '',

        url:{
          loadApplicant:"/sps/register/loadApplicants",
          loadRegisterFiles:"/sps/register/getRegisterFilesConfig",
          khxxcjportXlsUrl:"/nh/nhjbxx/khxxcjexportXls"
        }
      }
    },
    created() {
      this.getDate();
    },
    /*mounted() {
      this.sj=this.Jtcylist.length+3;
    },*/
    methods: {

      edit (record) {
        this.model = Object.assign({}, record)
        console.log("--------")
        console.log(record)
        //查询利率定价详情
        if(record.zjhm) {
          putAction("/xdgl/grdkgl/grdksplc/querylldjxq", {zjhm: record.zjhm, sszh:record.sszh}).then((res) => {
            if (res.success) {
              this.zxlldjb = res.result.rateZxlldjb;
              this.djsqxx = res.result.rateDjsqxx;
              this.dkqxOptions = res.result.dkqxOptions,
              this.khlxOptions = res.result.khlxOptions,
              this.sfbmkOptions = res.result.sfbmkOptions,
              this.sfbzbxdkOptions = res.result.sfbzbxdkOptions,
              this.zbxx = res.result.zbxx,
              this.queryjsdf(res.result.zbxx),
              //this.sj=this.Jtcylist.length+3;
              console.log("---利率定价详情-----")
              console.log(res.result)
              this.visible = true;
            }else{
              this.$message.warning(res.message,5);
            }
          });
        }
      },

      //计算得分
      queryjsdf(value) {
        //查询信用评价得分
          this.xypxdf= (parseFloat(value.DF_KH00001 == " " ? '0' : value.DF_KH00001).toFixed(2)*1) + (parseFloat(value.KFX_KH00002 == " " ? '0' : value.KFX_KH00002).toFixed(2)*1)+
            (parseFloat(value.KFX_KH00003 == " " ? '0' : value.KFX_KH00003).toFixed(2)*1)+(parseFloat(value.DF_KH00004 == " " ? '0' : value.DF_KH00004).toFixed(2)*1)+
            (parseFloat(value.DF_KH00005 == " " ? '0' : value.DF_KH00005).toFixed(2)*1)
           console.log("----------")
           console.log(this.xypxdf)
           console.log("----------")
        //客户综合贡献度
          this.khzhgxddf= (parseFloat(value.DF_KH00007 == " " ? '0' : value.DF_KH00007).toFixed(2)*1) + (parseFloat(value.DF_KH00009 == " " ? '0' : value.DF_KH00009).toFixed(2)*1)+
           (parseFloat(value.DF_KH00010 == " " ? '0' : value.DF_KH00010).toFixed(2)*1)
          console.log("----------")
          console.log(this.khzhgxddf)
          console.log("----------")
      },




      loadData(){

      },
      getDate(){
        // 当前时间
      },
      handleCancel () {
        this.previewVisible = false;
        this.close();
      },
      handlePreview (file) {
        this.previewImage = file.url || file.thumbUrl
        this.previewVisible = true
      },
      handleChange ({ fileList }) {
        this.fileList = fileList
      },

      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        this.handleExportXls("客户信息采集表")
      },

      handleExportXls(fileName){
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        console.log("---------")
        console.log(this.model)
        let param = {"hhbm":this.model.hhbm};
        console.log("导出参数",param)
        downFile(this.url.khxxcjportXlsUrl,param).then((data)=>{
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