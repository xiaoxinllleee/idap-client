<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <a-modal
    :title="title"
    :width="1200"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :okButtonProps="{ props: {disabled: false} }"
    @ok="handleCancel"
    @cancel="handleCancel"
    okText="关闭"
  >
    <a-card :bordered="false" :class="{'abcdefg':true}">
      <div class="no-print" style="text-align: right" v-if="this.spzt == 1">
        <a-button v-show="this.title=='打印'" v-print="'#printContent'" ghost type="primary">打印</a-button>
      </div>
      <section ref="print" id="printContent" class="abcdefg">
        <!--<div style="text-align: center">
          &lt;!&ndash;<p style="font-size: 24px;font-weight: 800">{{this.nhxxcj.qydm}}贷款利率定价计算表</p>&ndash;&gt;
          <p style="font-size: 24px;font-weight: 800">浏阳农商行贷款利率定价计算表</p>
        </div>-->
        <!--签字-->

        <div style="font-size:14px;font-weight:bolder;float:right">
          定价编号: {{this.djid}}
        </div>
        <div class="sign" style="text-align: left;height: inherit">

          <div>
            <p style="padding-top: 1px; text-align:center;font-size:25px;height: 40px;font-weight:bolder" class="title">
              浏阳农商行贷款利率定价计算表</p>

            <table align="center" class="tableCss" width="100%">
              <colgroup>
                <col width="25%">
                <col width="25%">
                <col width="25%">
                <col width="25%">
              </colgroup>
              <tbody>


              <tr style="page-break-after:always">
                <td colspan="4">
                  <table align="center" class="tableCss" width="100%">
                    <tr>
                      <td width="25%">计算日期</td>
                      <td width="25%">{{this.bjrq}}</td>
                      <td width="25%">单位：</td>
                      <td width="25%">万元</td>
                    </tr>
                    <tr>
                      <td width="25%">申请客户名称:</td>
                      <td width="25%">{{this.model.khmc}}</td>
                      <td width="25%">法人代表：</td>
                      <td width="25%">{{this.model.frdb}}</td>
                    </tr>
                    <tr>
                      <td width="25%">上年授信额度:</td>
                      <td width="25%">{{this.model.snsxed}}</td>
                      <td width="25%">上年贷款利率上浮幅度:</td>
                      <td width="25%">{{this.model.sndkllsffd}}</td>
                    </tr>
                    <tr>
                      <td width="25%">综合授信额度:</td>
                      <td width="25%">{{this.model.zhsxed}}</td>
                      <td width="25%">其中:贷款授信+承兑敞口:</td>
                      <td width="25%">{{this.model.cdck}}</td>
                    </tr>
                    <tr>
                      <td width="25%">贷款期限:</td>
                      <td width="25%">{{this.model.dkqx_dictText}}</td>
                      <td width="25%">客户类型:</td>
                      <td width="25%">{{this.model.khlx_dictText}}</td>
                    </tr>
                    <tr>
                      <td width="25%">是否便民卡:</td>
                      <td width="25%" >{{this.model.sfbmk_dictText}}</td>
                      <td width="25%">是否保证保险贷款：</td>
                      <td width="25%" >{{this.model.sfbzbxdk_dictText}}</td>
                    </tr>

                    <!--<tr>
                      <td  width="80%" style="font-size:14px;font-weight:bolder;">考核计分项目</td>
                      <td  width="20%" style="font-size:14px;font-weight:bolder;">得分</td>
                    </tr>-->

                  </table>
                </td>
              </tr>
              </tbody>
            </table>

            <table align="center" class="tableCss" width="100%">
              <colgroup>
                <col width="40%">
                <col width="40%">
                <col width="20%">
              </colgroup>
              <tbody>


              <tr style="page-break-after:always">
                <td colspan="3">
                  <table align="center" class="tableCss" width="100%">
                    <tr>
                      <td colspan="2" width="80%" style="font-size:14px;font-weight:bolder;">考核计分项目</td>
                      <td colspan="1" width="20%" style="font-size:14px;font-weight:bolder;">得分</td>
                    </tr>

                    <tr>
                      <td colspan="2" width="80%" style="font-size:14px;font-weight:bolder;">（一）信用评价</td>
                      <td colspan="1" width="20%" style="font-size:14px;font-weight:bolder;">{{this.xypj}}</td>
                    </tr>

                    <tr>
                      <td colspan="1" width="40%" style="font-size:14px;font-weight:bolder;">1.信用等级：</td>
                      <td colspan="1" width="40%" style="font-size:14px;font-weight:bolder;">{{this.model.KH00001}}</td>
                      <td colspan="1" width="20%" style="font-size:14px;font-weight:bolder;">{{this.model.DF_KH00001}}</td>
                    </tr>

                    <tr>
                      <td colspan="2" width="80%" style="font-size:14px;font-weight:bolder;">2.扣分项目</td>
                      <td colspan="1" width="20%" style="font-size:14px;font-weight:bolder;">{{ this.model.DF_KH00002 }}</td>
                    </tr>

                    <tr>
                      <td colspan="1" width="40%">借款人(含法人代表、主要股东及配偶)征信有不良记录</td>
                      <td colspan="1" width="40%">{{this.model.CS_GZ00009}}</td>
                      <td colspan="1" width="20%" style="font-size:14px;font-weight:bolder;">{{this.model.GZ00009}}</td>
                    </tr>

                    <tr>
                      <td colspan="1" width="40%">借款人上年在本行贷款（含贷记卡）未按期清息、还款次数</td>
                      <td colspan="1" width="40%" >{{this.model.CS_GZ00010}}</td>
                      <td colspan="1" width="20%" style="font-size:14px;font-weight:bolder;">{{this.model.GZ00010}}</td>
                    </tr>

                    <tr>
                      <td colspan="1" width="40%" style="font-size:14px;font-weight:bolder;">3.资产负债率</td>
                      <td colspan="1" width="40%" >
                        资产总额:{{this.model.CS_GZ00013}}负债总额:{{this.model.CS_GZ00014}}资产负债率:{{this.model.CS_GZ00015}}%</td>
                      <td colspan="1" width="20%" style="font-size:14px;font-weight:bolder;">{{this.model.DF_KH00003}}</td>
                    </tr>

                    <tr>
                      <td colspan="1" width="40%" style="font-size:14px;font-weight:bolder;">4.经营期限</td>
                      <td colspan="1" width="40%">{{this.model.KH00004}}</td>
                      <td colspan="1" width="20%" style="font-size:14px;font-weight:bolder;">{{this.model.DF_KH00004}}</td>
                    </tr>

                    <tr>
                      <td rowspan="2" colspan="1" width="40%" style="font-weight:bolder;">5.销售收入归行</td>
                      <td colspan="1" width="40%" nowrap>销售收入:{{this.model.CS_GZ00021}}</td>
                      <th rowspan="2" colspan="1" width="20%" style="font-size:14px;font-weight:bolder;">{{this.model.DF_KH00005}}</th>
                    </tr>
                    <tr>
                      <td colspan="1" width="40%">流动负债:{{this.model.CS_GZ00022}};倍数:{{this.model.CS_GZ00023}}</td>
                    </tr>


                  </table>
                </td>
              </tr>
              </tbody>
            </table>


            <table align="center" class="tableCss" width="100%">
              <colgroup>
                <col width="40%">
                <col width="40%">
                <col width="20%">
              </colgroup>
              <tbody>


              <tr style="page-break-after:always">
                <td colspan="3">
                  <table align="center" class="tableCss" width="100%">
                    <tr>
                      <td colspan="2" width="80%" style="font-size:14px;font-weight:bolder;">（二）担保类型</td>
                      <td colspan="1" width="20%" style="font-size:14px;font-weight:bolder;">{{this.model.dbzdf}}</td>
                    </tr>

                    <tr>
                      <td colspan="2" width="80%" style="font-size:14px;font-weight:bolder;">（三）客户综合贡献度</td>
                      <td colspan="1" width="20%" style="font-size:14px;font-weight:bolder;">{{this.khzhgxddf}}</td>
                    </tr>

                    <tr>
                      <td rowspan="7" colspan="1" width="40%" style="font-weight:bolder;">1.客户存款贡献</td>
                      <td colspan="1" width="40%" nowrap>开立基本账户往来: {{this.model.CS_GZ00031}}; 日平存款占贷款比例: {{this.model.CS_GZ00032}}%;</td>
                      <th rowspan="7" colspan="1" width="20%">{{this.model.DF_KH00007}}</th>
                    </tr>
                    <tr>
                      <td colspan="1" width="40%">前三年第一个年度存款日平: {{this.model.CS_GZ00033}}</td>
                    </tr>
                    <tr>
                      <td colspan="1" width="40%">前三年第二个年度存款日平：{{this.model.CS_GZ00034}}</td>
                    </tr>
                    <tr>
                      <td colspan="1" width="40%">前三年第三个年度存款日平：{{this.model.CS_GZ00035}}</td>
                    </tr>
                    <tr>
                      <td colspan="1" width="40%">客户上一年度在其他银行存款日平：{{this.model.CS_GZ00036}}</td>
                    </tr>
                    <tr>
                      <td colspan="1" width="40%">客户上一年度在其他银行定期存款日平：{{this.model.CS_GZ00037}}</td>
                    </tr>
                    <tr>
                      <td colspan="1" width="40%">定价存款日平合计: {{this.model.CS_GZ00038}}</td>
                    </tr>

                    <tr>
                      <td colspan="2" width="80%" style="font-size:14px;font-weight:bolder;">2.客户代理业务</td>
                      <td colspan="1" width="20%" style="font-size:14px;font-weight:bolder;">{{this.model.DF_KH00009}}</td>
                    </tr>
                    <tr>
                      <td colspan="1" width="40%">本年在本行代发工资人数</td>
                      <td colspan="1" width="40%">{{this.model.CSZ_GZ00043}}</td>
                      <td colspan="1" width="20%" style="font-size:14px;font-weight:bolder;">{{this.model.CS_GZ00043}}</td>
                    </tr>
                    <tr>
                      <td colspan="1" width="40%">高危行业财产保险本年应保未保或第一受益人不是本行</td>
                      <td colspan="1" width="40%">{{this.model.CSZ_GZ00044}}</td>
                      <td colspan="1" width="20%" style="font-size:14px;font-weight:bolder;">{{this.model.CS_GZ00044}}</td>
                    </tr>
                    <tr>
                      <td colspan="1" width="40%">高危行业财产保险本年应保不全</td>
                      <td colspan="1" width="40%">{{this.model.CSZ_GZ00045}}</td>
                      <td colspan="1" width="20%" style="font-size:14px;font-weight:bolder;">{{this.model.CS_GZ00045}}</td>
                    </tr>
                    <tr>
                      <td colspan="1" width="40%">保险到期未能如期续保且第一受益人不是本行、不能覆盖定价周期</td>
                      <td colspan="1" width="40%">{{this.model.CSZ_GZ00046}}</td>
                      <td colspan="1" width="20%" style="font-size:14px;font-weight:bolder;">{{this.model.CS_GZ00046}}</td>
                    </tr>


                    <tr>
                      <td colspan="2" width="80%" style="font-size:14px;font-weight:bolder;">3.其它业务</td>
                      <td colspan="1" width="20%" style="font-size:14px;font-weight:bolder;">{{this.model.DF_KH00010}}</td>
                    </tr>
                    <tr>
                      <td colspan="1" width="40%">实际控制企业有国际贸易业务外汇结算量（美元）</td>
                      <td colspan="1" width="40%">{{this.model.CSZ_GZ00047}}</td>
                      <td colspan="1" width="20%" style="font-size:14px;font-weight:bolder;">{{this.model.CS_GZ00047}}</td>
                    </tr>
                    <tr>
                      <td colspan="1" width="40%">基本账户未在我行或在我行但资金归行不走基本账户</td>
                      <td colspan="1" width="40%">{{this.model.CSZ_GZ00049}}</td>
                      <td colspan="1" width="20%" style="font-size:14px;font-weight:bolder;">{{this.model.CS_GZ00049}}</td>
                    </tr>
                    <tr>
                      <td colspan="1" width="40%">其他银行存款日平占本行存款日平比例</td>
                      <td colspan="1" width="40%">{{this.model.CSZ_GZ00048}}%</td>
                      <td colspan="1" width="20%" style="font-size:14px;font-weight:bolder;">{{this.model.CS_GZ00048}}</td>
                    </tr>
                    <tr>
                      <td colspan="1" width="40%">客户能够开立我行手机银行、口袋零钱及其他第三方支付绑定我行卡但未开通的，或开通未使用的，每项扣2分</td>
                      <td colspan="1" width="40%">{{this.model.CSZ_GZ00057}}</td>
                      <td colspan="1" width="20%" style="font-size:14px;font-weight:bolder;">{{this.model.CS_GZ00057}}</td>
                    </tr>
                  </table>
                </td>
              </tr>
              </tbody>
            </table>

            <table align="center" class="tableCss" width="100%">
              <!--<colgroup>
                <col width="40%">
                <col width="40%">
                <col width="20%">
              </colgroup>-->
              <tbody>


              <tr style="page-break-after:always">
                <td colspan="6">
                  <table align="center" class="tableCss" width="100%">
                    <tr>
                      <td colspan="1">得分合计：</td>
                      <td colspan="1">{{this.model.dfhj}}</td>
                      <td colspan="1">LPR基点</td>
                      <td colspan="1">{{this.model.jdbp}}</td>
                      <td colspan="1">优惠后LPR基点</td>
                      <td colspan="1">{{this.model.yhhjdbp}}</td>
                    </tr>

                    <tr>
                      <td colspan="1">对应档次LPR：</td>
                      <td colspan="1">{{this.model.dyyhjdcs}}</td>
                      <td colspan="1">执行利率</td>
                      <td colspan="1">{{this.model.zxll}}%</td>
                      <td colspan="1">优惠后执行利率</td>
                      <td colspan="1">{{this.model.yhhzxll}}%</td>
                    </tr>

                    <tr>
                      <td colspan="2">客户经理签字：</td>
                      <td colspan="2">信贷内勤签字：</td>
                      <td colspan="2">行长签字：</td>
                    </tr>

                  </table>
                </td>
              </tr>
              </tbody>
            </table>

            <br/>
            <br/>
            <br/>

            <table align="center" class="tableCss" style="table-layout: auto;" width="98%">
              <tr>
                <td colspan="4" style="text-align: center;font-weight:bolder;font-size:24px;height: 50px">贷款利率定价附表一</td>
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

                    <tr class="center" v-for="(i,index) in this.ckrps">
                      <th align="center">{{ i.jgdm }}</th>
                      <th align="center">{{i.jgdm_dictText}}</th>
                      <th align="center">{{ i.ckzh }}</th>
                      <th align="center">{{ i.hm }}</th>
                      <th align="center">{{ i.ykhgx_dictText }}</th>
                      <th align="center">{{ i.glzhxxgx }}</th>
                      <th align="center">{{ i.qsndynckrp }}</th>
                      <th align="center">{{ i.qsndenckrp }}</th>
                      <th align="center">{{ i.qsndsnckrp }}</th>
                    </tr>
                    <tr>
                      <td colspan="9">
                        其中： 各类保证金日平（按前三年第三年存款日平30%计算）：{{this.bzjrp}};
                        定价存款日平合计：{{this.model.CS_GZ00038}};
                        客户上一个年度在其他银行活期存款日平：{{this.model.CS_GZ00036}}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>


            <br/>
            <br/>
            <br/>

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

                    <tr v-for="(i,index) in this.dqrps">

                      <th rowspan="1" align="center">{{ i.jgdm }}</th>
                      <th rowspan="1" align="center">{{i.jgdm_dictText}}</th>
                      <th rowspan="1" align="center">{{ i.ckzh }}</th>
                      <th rowspan="1" align="center">{{ i.hm }}</th>
                      <th rowspan="1" align="center">{{ i.crr }}</th>
                      <th rowspan="1" align="center">{{ i.zqr }}</th>
                      <th rowspan="1" align="center">{{ i.je }}</th>
                      <th rowspan="1" align="center">{{ i.qsndynckrp }}</th>
                      <th rowspan="1" align="center">{{ i.qsndenckrp }}</th>
                      <th rowspan="1" align="center">{{ i.qsndsnckrp }}</th>
                    </tr>

                    <tr>
                      <td colspan="10" rowspan="1">
                        客户上一个年度在其他银行定期存款日平: {{this.model.CS_GZ00037}}
                        <!--  <fmt:formatNumber value="${GZ00037}" pattern="#0.0000"/>;-->
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <br/>
            <br/>
            <br/>

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

              <tr v-for="(i,index) in this.dbxx">
                <td class="center">{{i.dbw_dictText}}</td>
                <td class="center">{{ i.syqr }}</td>
                <td class="center">{{ i.pgjz }}</td>
                <td class="center">{{ i.dbl }}</td>
                <td class="center">{{ i.sjdbje }}</td>
                <td class="center">{{ i.dblx_dictText }}</td>
                <td class="center">{{ i.dbwms }}</td>
              </tr>

            </table>
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
import { httpAction, putAction, getAction } from '@/api/manage'
import { mapGetters } from 'vuex'
import ACol from 'ant-design-vue/es/grid/Col'
import ARow from 'ant-design-vue/es/grid/Row'
import ATextarea from 'ant-design-vue/es/input/TextArea'

export default {
  components: {},
  name: 'ModelInfo',
  mixins: [JEditableTableMixin, JeecgListMixin],
  data () {
    return {
      model: {},
      djid:'',
      bjrq:'',
      xypj:'0',
      khzhgxddf:'0',
      dbxx:{},
      ckrps:{},
      dqrps:{},
      bzjrp:0,
      spzt:'0',
      url:{
        list:"list",
        getDbxxByZjhm: "/dklldj/lldjsq/getDbxxByZjhm",
        getCkrps: "/dklldj/lldjjs/getCkrps",
        getBzjrp:"/dklldj/lldjjs/getBzjrp",
        getCompute:"/dklldj/lldjjs/getCompute",
        getZxxlldjbs:"/dklldj/lldjjs/getZxxlldjbs",
      },

    }
  },

  created () {
  },

  methods: {

    handleCancel () {
      this.close()
    },
    queryDbxx(){
      var zjhm = this.model.zjhm;
      var djnf = this.model.djnf;
      let data ={"zjhm":zjhm,"djnf":djnf};
      getAction(this.url.getDbxxByZjhm,data).then((res) => {
        if (res.success){
          this.dbxx= res.result;
        }
      })

    },
    queryCkrps(){
      var djnf = this.model.djnf;
      var zjhm = this.model.zjhm;
      let data ={"djnf":djnf,"zjhm":zjhm,"tjlx":"1"};
      getAction(this.url.getCkrps,data).then((res) => {
        if (res.success){
          this.ckrps= res.result;
        }
      })
    },
    //查定期
    queryDqrps(){
      var djnf = this.model.djnf;
      var zjhm = this.model.zjhm;
      let data ={"djnf":djnf,"zjhm":zjhm,"tjlx":"2"};
      getAction(this.url.getCkrps,data).then((res) => {
        if (res.success){
          this.dqrps= res.result;
        }
      })
    },
    getBzjrp(){
      var djnf = this.model.djnf;
      var zjhm = this.model.zjhm;
      let data ={"djnf":djnf,"zjhm":zjhm,"tjlx":"3"};
      getAction(this.url.getBzjrp,data).then((res) => {
        if (res.success){
          this.bzjrp= res.result;
        }
      })
    },

    edit(record) {
      console.log('====print info ====')
      this.model = Object.assign({},record);
      let data = {zjhm: this.model.zjhm ,djnf:this.model.djnf};
      getAction(this.url.getCompute, data).then((res) => {
        if (res.success) {
          console.log(res.result)
          this.xypj = Number(res.result.DF_KH00001)+Number(res.result.KFX_KH00002) +Number(res.result.KFX_KH00003) +Number(res.result.DF_KH00004) +Number(res.result.DF_KH00005);
          this.khzhgxddf=Number(res.result.DF_KH00007)+Number(res.result.DF_KH00009) +Number(res.result.DF_KH00010);
          this.model = Object.assign(this.model, res.result);
         // this.model.xypj = Number(this.model.DF_KH00001)+Number(this.model.KFX_KH00002) +Number(this.model.KFX_KH00003) +Number(this.model.DF_KH00004) +Number(this.model.DF_KH00005);
          console.log('MM',this.model)

          var zjhm = record.zjhm;
          var djnf = record.djnf;
          let data = {"zjhm": zjhm,"djnf": djnf}
          getAction(this.url.getZxxlldjbs, data).then((res) => {
            if (res.success) {
              console.log(res.result.records[0]);
              this.djid=res.result.records[0].djid;
              this.bjrq=res.result.records[0].bjrq;
            } else {
              this.$message.error(res.message,5)
            }
          })
          this.queryDbxx();
          this.queryCkrps();
          this.queryDqrps();
          this.getBzjrp();

        } else {
          this.$message.warning(res.message,5);
        }
      }).finally(() => {
        this.addLoading = false
      })
      this.visible = true



    },
    close () {
      this.$emit('close');
      this.visible = false;
    }
  },

}
</script>

<style scoped>
.abcdefg .ant-card-body {
  margin-left: 0%;
  margin-right: 0%;
  margin-bottom: 1%;
  border: 0px solid black;
  min-width: 800px;
}

.explain {
  text-align: left;
  margin-left: 50px;
}

.explain .ant-input, .sign .ant-input {
  font-weight: bolder;
  text-align: center;
  border-left-width: 0px !important;
  border-top-width: 0px !important;;
  border-right-width: 0px !important;;
}

.explain div {
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