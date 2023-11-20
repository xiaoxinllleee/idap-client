<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <a-modal :title="title"
           :width="1200"
           :visible="visible"
           :confirmLoading="confirmLoading"
           :okButtonProps="{ props: {disabled: false} }"
           :keyboard="false"
           :maskClosable="false"
           @ok="handleCancel"
           @cancel="handleCancel"
           okText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-card :bordered="false" :class="{'abcdefg':true}">
        <div class="no-print" style="text-align: right" v-if="this.spzt == 1">
          <a-button v-show="this.title=='打印'" v-print="'#printContentLldj'" ghost type="primary">打印</a-button>
        </div>
        <section ref="print" id="printContentLldj" class="abcdefg">
          <div class="sign" style="text-align: left;height: inherit">
            <div style="margin-top: 5px">
              <h3 style="text-align: center;">
                浏阳农村商业银行贷款利率定价计算表
              </h3>
              <h4 style="text-align: right;">定价编号: {{this.djid}}（单位：万元）</h4>

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
                        <td width="25%">计算日期:</td>
                        <td width="25%">{{this.computeDate}}</td>
                        <td width="25%">有效期限至:</td>
                        <td width="25%">{{this.EffectiveDateEnd}}</td>
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
                        <td width="25%">上年优惠后最终执行利率:</td>
                        <td width="25%">{{this.model.snzxll}}</td>
                      </tr>
                      <tr>
                        <td width="25%">综合授信额度:</td>
                        <td width="25%">{{this.model.zhsxed}}</td>
                        <td width="25%">贷款授信(除专项贷款外):</td><!--贷款授信+承兑敞口(除专项贷款外)-->
                        <td width="25%">{{this.model.cdck}}</td>
                      </tr>
                      <tr>
                        <td width="25%">贷款期限:</td>
                        <td width="25%">{{this.model.dkqx_dictText}}</td>
                        <td width="25%">客户类型:</td>
                        <td width="25%">{{this.model.khlx_dictText}}</td>
                      </tr>
                      <tr>
                        <td width="25%">便民卡:</td>
                        <td width="25%" >{{this.model.sfbmk_dictText}}</td>
                        <td width="25%">保证保险贷款：</td>
                        <td width="25%" >{{this.model.sfbzbxdk_dictText}}</td>
                      </tr>
                      <tr>
                        <td width="25%">享受小微客户定价普惠措施:</td><!--是否享受`小微客户定价普惠措施`-->
                        <td width="25%" >{{this.model.sfjzxkh_dictText}}</td>
                        <td width="25%">为高危行业:</td>
                        <td width="25%" >{{this.model.sfgwhy_dictText}}</td>
                      </tr>
                      <tr>
                        <td width="25%">农村三权抵（质）押贷款:</td>
                        <td width="25%" >{{this.model.ncsqdzydk_dictText}}</td>
                        <td width="25%">是否为花炮企业:</td>
                        <td width="25%" >{{this.model.sfhpqy_dictText}}</td>
                      </tr>

                    </table>
                  </td>
                </tr>
                </tbody>
              </table>

              <table align="center" class="tableCss" style="width: 100%; margin-top: 0px;">
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
                        <td colspan="2" width="80%" style="font-size: 12pt; text-align: center">考核计分项目</td>
                        <td colspan="1" width="20%" style="font-size: 12pt; text-align: center">得分</td>
                      </tr>

                      <tr>
                        <td colspan="2" width="80%" style="font-size: 11pt; text-align: left">（一）信用评价</td>
                        <td colspan="1" width="20%" style="font-size: 11pt; text-align: center; font-weight: bold">{{ Number(this.xypj).toFixed(2) }}</td>
                      </tr>

                      <tr>
                        <td colspan="1" width="40%" style="font-size: 10pt;">1.信用等级：</td>
                        <td colspan="1" width="40%" style="font-size: 10pt;">{{ this.model.KH00001 }}</td>
                        <td colspan="1" width="20%" style="font-size: 10pt; text-align: center">{{ this.model.DF_KH00001 }}</td>
                      </tr>

                      <tr>
                        <td colspan="2" width="80%" style="font-size: 10pt;">2.扣分项目</td>
                        <td colspan="1" width="20%" style="font-size: 10pt; text-align: center">{{ this.model.DF_KH00002 }}</td>
                      </tr>

                      <tr>
                        <td colspan="2" width="40%">&nbsp;&nbsp;借款人(含法人代表、主要股东及配偶)征信有不良记录次数：{{ this.model.CS_GZ00009 }}次</td>
                        <!--<td colspan="1" width="40%">{{ this.model.CS_GZ00009 }}</td>-->
                        <td colspan="1" width="20%" style="font-size: 10pt; text-align: center">{{ Number(this.model.GZ00009).toFixed(2) }}</td>
                      </tr>

                      <tr>
                        <td colspan="2" width="40%">&nbsp;&nbsp;借款人上年在本行贷款(含贷记卡)未按期清息、还款次数：{{ this.model.CS_GZ00010 }}次</td>
                        <!--<td colspan="1" width="40%">{{ this.model.CS_GZ00010 }}</td>-->
                        <td colspan="1" width="20%" style="font-size: 10pt; text-align: center">{{ Number(this.model.GZ00010).toFixed(2) }}</td>
                      </tr>

                      <tr>
                        <td colspan="2" width="40%" style="font-size: 10pt;">
                          3.资产负债率：
                          <span style="font-size: 11px">
                            资产总额:{{this.model.CS_GZ00013}} / 负债总额:{{this.model.CS_GZ00014}} / 资产负债率:{{this.model.CS_GZ00015}}%
                          </span>
                        </td>
                        <!--<td colspan="1" width="40%">资产总额:{{this.model.CS_GZ00013}}; 负债总额:{{this.model.CS_GZ00014}}; 资产负债率:{{this.model.CS_GZ00015}}%</td>-->
                        <td colspan="1" width="20%" style="font-size: 10pt; text-align: center">{{this.model.DF_KH00003}}</td>
                      </tr>

                      <tr>
                        <td colspan="1" width="40%" style="font-size: 10pt;">4.经营期限</td>
                        <td colspan="1" width="40%">{{this.model.KH00004}}</td>
                        <td colspan="1" width="20%" style="font-size: 10pt; text-align: center">{{this.model.DF_KH00004}}</td>
                      </tr>

                      <tr>
                        <td colspan="2" width="40%" style="font-size: 10pt;">
                          5.销售收入归行：
                          <span style="font-size: 11px;">
                            销售收入:{{this.model.CS_GZ00021}} / 流动负债:{{this.model.CS_GZ00022}} / 倍数:{{this.model.CS_GZ00023}}
                          </span>
                        </td>
                        <!--<td colspan="1" width="40%" nowrap>
                          销售收入:{{this.model.CS_GZ00021}} / 流动负债:{{this.model.CS_GZ00022}} / 倍数:{{this.model.CS_GZ00023}}
                        </td>-->
                        <td colspan="1" width="20%" style="font-size: 10pt; text-align: center">{{this.model.DF_KH00005}}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                </tbody>
              </table>

              <table align="center" class="tableCss" style="width: 100%; margin-top: 0px;">
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
                        <td colspan="2" width="80%" style="font-size: 11pt; text-align: left">（二）担保类型</td>
                        <td colspan="1" width="20%" style="font-size: 11pt; font-weight: bold; text-align: center">{{this.model.dbzdf}}</td>
                      </tr>

                      <tr>
                        <td colspan="2" width="80%" style="font-size: 11pt; text-align: left">（三）客户综合贡献度</td>
                        <td colspan="1" width="20%" style="font-size: 11pt; font-weight: bold; text-align: center">{{ Number(this.khzhgxddf).toFixed(2) }}</td>
                      </tr>

                      <tr>
                        <td rowspan="7" colspan="1" width="40%" style="font-size: 10pt;">1.客户存款贡献</td>
                        <td colspan="1" width="40%" nowrap>开立基本账户往来: {{this.model.CS_GZ00031}}; 日平存款占贷款比例: {{ Number(this.model.CS_GZ00032).toFixed(2) }}%;</td>
                        <th rowspan="7" colspan="1" width="20%" style="font-size: 10pt; text-align: center; font-weight: bold;">{{ Number(this.model.DF_KH00007).toFixed(2) }}</th>
                      </tr>
                      <tr>
                        <td colspan="1" width="40%">前三年第一个年度存款日平: {{ Number(this.model.CS_GZ00033).toFixed(4) }}</td>
                      </tr>
                      <tr>
                        <td colspan="1" width="40%">前三年第二个年度存款日平：{{ Number(this.model.CS_GZ00034).toFixed(4) }}</td>
                      </tr>
                      <tr>
                        <td colspan="1" width="40%">前三年第三个年度存款日平：{{ Number(this.model.CS_GZ00035).toFixed(4) }}</td>
                      </tr>
                      <tr>
                        <td colspan="1" width="40%">客户上一年度在其他银行存款日平：{{ Number(this.model.CS_GZ00036).toFixed(2) }}</td>
                      </tr>
                      <tr>
                        <td colspan="1" width="40%">客户上一年度在其他银行定期存款日平：{{ Number(this.model.CS_GZ00037).toFixed(2) }}</td>
                      </tr>
                      <tr>
                        <td colspan="1" width="40%">定价存款日平合计: {{ Number(this.model.CS_GZ00038).toFixed(2) }}</td>
                      </tr>

                      <tr>
                        <td colspan="2" width="80%" style="font-size: 10pt;">2.客户代理业务</td>
                        <td colspan="1" width="20%" style="font-size: 10pt; font-weight: bold; text-align: center">{{this.model.DF_KH00009}}</td>
                      </tr>
                      <tr>
                        <td colspan="2" width="40%">本年在本行代发工资人数：{{this.model.CSZ_GZ00043}}人</td>
                        <!--<td colspan="1" width="40%">{{this.model.CSZ_GZ00043}}</td>-->
                        <td colspan="1" width="20%" style="text-align: center">{{ Number(this.model.CS_GZ00043).toFixed(2) }}</td>
                      </tr>
                      <tr>
                        <td colspan="2" width="40%">高危行业财产保险本年应保未保或第一受益人不是本行：{{this.model.CSZ_GZ00044}}</td>
                        <!--<td colspan="1" width="40%">{{this.model.CSZ_GZ00044}}</td>-->
                        <td colspan="1" width="20%" style="text-align: center">{{ Number(this.model.CS_GZ00044).toFixed(2) }}</td>
                      </tr>
                      <tr>
                        <td colspan="2" width="40%">高危行业财产保险本年应保不全：{{this.model.CSZ_GZ00045}}</td>
                        <!--<td colspan="1" width="40%">{{this.model.CSZ_GZ00045}}</td>-->
                        <td colspan="1" width="20%" style="text-align: center">{{ Number(this.model.CS_GZ00045).toFixed(2) }}</td>
                      </tr>
                      <tr>
                        <td colspan="2" width="40%">保险到期未能如期续保且第一受益人不是本行、不能覆盖定价周期：{{this.model.CSZ_GZ00046}}</td>
                        <!--<td colspan="1" width="40%">{{this.model.CSZ_GZ00046}}</td>-->
                        <td colspan="1" width="20%" style="text-align: center">{{ Number(this.model.CS_GZ00046).toFixed(2) }}</td>
                      </tr>

                      <tr>
                        <td colspan="2" width="80%" style="font-size: 10pt;">3.其它业务</td>
                        <td colspan="1" width="20%" style="font-size: 10pt; font-weight: bold; text-align: center">{{ Number(this.model.DF_KH00010).toFixed(2) }}</td>
                      </tr>
                      <tr>
                        <td colspan="2" width="40%">实际控制企业有国际贸易业务外汇结算量（美元）：{{this.model.CSZ_GZ00047}}</td>
                        <!--<td colspan="1" width="40%">{{this.model.CSZ_GZ00047}}</td>-->
                        <td colspan="1" width="20%" style="text-align: center">{{ Number(this.model.CS_GZ00047).toFixed(2) }}</td>
                      </tr>
                      <tr>
                        <td colspan="2" width="40%">基本账户未在我行或在我行但资金归行不走基本账户：{{this.model.CSZ_GZ00049}}</td>
                        <!--<td colspan="1" width="40%">{{this.model.CSZ_GZ00049}}</td>-->
                        <td colspan="1" width="20%" style="text-align: center">{{ Number(this.model.CS_GZ00049).toFixed(2) }}</td>
                      </tr>
                      <tr>
                        <td colspan="2" width="40%">其他银行存款日平占本行存款日平比例：{{this.model.CSZ_GZ00048}}%</td>
                        <!--<td colspan="1" width="40%">{{this.model.CSZ_GZ00048}}%</td>-->
                        <td colspan="1" width="20%" style="text-align: center">{{ Number(this.model.CS_GZ00048).toFixed(2) }}</td>
                      </tr>
                      <tr>
                        <td colspan="2" width="40%">能够开立我行手机银行、口袋零钱及其他第三方支付绑定我行卡未开通或开通未使用，每项扣2分：{{this.model.CSZ_GZ00057}}</td>
                        <!--<td colspan="1" width="40%">{{this.model.CSZ_GZ00057}}</td>-->
                        <td colspan="1" width="20%" style="text-align: center">{{ Number(this.model.CS_GZ00057).toFixed(2) }}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                </tbody>
              </table>

              <table align="center" class="tableCss" style="width: 100%; margin-top: 0px">
                <tbody>
                <tr style="page-break-after:always">
                  <td colspan="6">
                    <table align="center" class="tableCss" width="100%">
                      <tr>
                        <td colspan="1">定价得分合计：</td>
                        <td colspan="1">{{this.model.dfhj}}</td>
                        <td colspan="1">优惠前LPR基点：</td>
                        <td colspan="1">{{this.model.jdbp}}</td>
                        <td colspan="1">优惠前执行利率：</td>
                        <td colspan="1">{{this.model.zxll}}&nbsp;%</td>
                      </tr>

<!--2023年5月12日 张斐然 利率展示中间一行隐藏-->
<!--                      <tr>-->
<!--                        <td colspan="1">对应档次LPR利率：</td>-->
<!--                        <td colspan="1">{{this.model.dyyhjdcs}}&nbsp;%</td>-->
<!--                        <td colspan="1">优惠后LPR基点：</td>-->
<!--                        <td colspan="1">{{this.model.yhhjdbp}}</td>-->
<!--                        <td colspan="1">优惠后执行利率：</td>-->
<!--                        <td colspan="1">{{this.model.yhhZxll6}}&nbsp;%</td>-->
<!--                      </tr>-->

                      <tr>
                        <td colspan="1">对应档次LPR利率：</td>
                        <td colspan="1">{{this.model.dyyhjdcs}}&nbsp;%</td>
                        <td colspan="1">优惠后最终LPR基点：</td>
                        <td colspan="1">{{this.model.yhhLprjd7}}</td>
                        <td colspan="1">优惠后最终执行利率：</td>
                        <td colspan="1">{{this.model.yhhzxll}}&nbsp;%</td>
                      </tr>

                      <tr v-if="Number.parseInt(sfhpqyDisplay) === 1">
                        <td colspan="6">
                          <h4 style="">* {{this.note}}</h4>
                        </td>
                      </tr>

                      <!--方案内条例提醒-->
                      <tr><!-- v-if="this.showflag"-->
                        <td colspan="6">
                          <h3 v-if="this.reminder.remind16">{{this.reminder.remind16}}</h3>
                          <h3 v-if="this.reminder.remind20">{{this.reminder.remind20}}</h3>
                          <h3 v-if="this.reminder.remind21A">{{this.reminder.remind21A}}</h3>
                          <h3 v-if="this.reminder.remind21B">{{this.reminder.remind21B}}</h3>
                          <h3 v-if="this.reminder.remind22">{{this.reminder.remind22}}</h3>
                          <h3 v-if="this.reminder.remind23">{{this.reminder.remind23}}</h3>
                          <h3 v-if="this.reminder.remind24">{{this.reminder.remind24}}</h3>
                          <h3 v-if="this.reminder.remind25">{{this.reminder.remind25}}</h3>
                          <h3 v-if="this.reminder.remind26A">{{this.reminder.remind26A}}</h3>
                          <h3 v-if="this.reminder.remind26B">{{this.reminder.remind26B}}</h3>
                          <h3 v-if="this.reminder.remind27">{{this.reminder.remind27}}</h3>
                          <h3 v-if="this.reminder.remind29">{{this.reminder.remind29}}</h3>
                          <h3 v-if="this.reminder.remind30">{{this.reminder.remind30}}</h3>
                          <h3 v-if="this.reminder.remind33">{{this.reminder.remind33}}</h3>
                          <h3 v-if="this.reminder.remindA">{{this.reminder.remindA}}</h3>
                          <h3 v-if="this.reminder.remindB">{{this.reminder.remindB}}</h3>
                          <h3 v-if="this.reminder.remindC">{{this.reminder.remindC}}</h3>
                          <h3 v-if="this.reminder.remind41">{{this.reminder.remind41}}</h3>
                          <h3 v-if="this.reminder.remind42">{{this.reminder.remind42}}</h3>
                        </td>
                      </tr>

                      <tr>
                        <td colspan="6">
                          支行审批意见：
                          <p style="text-align: right">
<!--                            <small style="font-size: 6pt">-->
<!--                              (注：最终执行利率不得低于{{this.model.yhhzxll}}%)-->
<!--                            </small>-->
                          </p>
                        </td>
                      </tr>

                      <tr>
                        <td colspan="2">客户经理签字：</td>
                        <td colspan="2">风险经理签字：</td>
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

              <table align="center" class="tableCss" style="width: 100%; table-layout: auto;" >
                <tr>
                  <td colspan="4" style="text-align: center; font-size: 24px; height: 50px">贷款利率定价附表一</td>
                </tr>
                <tr>
                  <td colspan="4">附：客户活期存款明细(单位：万元)</td>
                </tr>
                <tr>
                  <td colspan="4">
                    <table align="center" class="tableCss" style="table-layout: auto;" width="100%">
                      <tr class="center">
                        <th style="text-align: center; font-weight: lighter">机构代码</th>
                        <th style="text-align: center; font-weight: lighter">机构名称</th>
                        <th style="text-align: center; font-weight: lighter">存款账号</th>
                        <th style="text-align: center; font-weight: lighter">户名</th>
                        <th style="text-align: center; font-weight: lighter">与客户关系</th>
                        <th style="text-align: center; font-weight: lighter">详细关系</th>
                        <th style="text-align: center; font-weight: lighter">前三年第一年存款日平</th>
                        <th style="text-align: center; font-weight: lighter">前三年第二年存款日平</th>
                        <th style="text-align: center; font-weight: lighter">前三年第三年存款日平</th>
                      </tr>
                      <tr class="center" v-for="(i,index) in this.hqckrpmx">
                        <th style="text-align: center; font-weight: lighter">{{ i.jgdm }}</th>
                        <th style="text-align: center; font-weight: lighter">{{ i.jgdm_dictText }}</th>
                        <th style="text-align: center; font-weight: lighter">{{ i.ckzh }}</th>
                        <th style="text-align: center; font-weight: lighter">{{ i.hm }}</th>
                        <th style="text-align: center; font-weight: lighter">{{ i.khgx }}</th>
                        <th style="text-align: center; font-weight: lighter">{{ i.glzhxxgx }}</th>
                        <th style="text-align: center; font-weight: lighter">{{ i.qsndynckrp }}</th>
                        <th style="text-align: center; font-weight: lighter">{{ i.qsndenckrp }}</th>
                        <th style="text-align: center; font-weight: lighter">{{ i.qsndsnckrp }}</th>
                      </tr>
                      <tr class="center" v-for="(i,index) in this.bzjckrpmx">
                        <th style="text-align: center; font-weight: lighter">{{ i.jgdm }}</th>
                        <th style="text-align: center; font-weight: lighter">{{ i.jgmc }}</th>
                        <th style="text-align: center; font-weight: lighter">{{ i.ckzh }}</th>
                        <th style="text-align: center; font-weight: lighter">{{ i.hm }}</th>
                        <th style="text-align: center; font-weight: lighter">{{ i.khgx }}</th>
                        <th style="text-align: center; font-weight: lighter">{{ i.glzhxxgx }}</th>
                        <th style="text-align: center; font-weight: lighter">{{ i.qsndynckrp }}</th>
                        <th style="text-align: center; font-weight: lighter">{{ i.qsndenckrp }}</th>
                        <th style="text-align: center; font-weight: lighter">{{ i.qsndsnckrp }}</th>
                      </tr>
                      <tr>
                        <td colspan="9">
                          其中：各类保证金日平（按前三年第三年存款日平30%计算）：{{this.bzjckrp}}；
                          定价存款日平合计：{{ Number(this.model.CS_GZ00038).toFixed(2) }}；
                          客户上一个年度在其他银行活期存款日平：{{ Number(this.model.CS_GZ00036).toFixed(2) }}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <br/>
              <br/>
              <br/>

              <table align="center" class="tableCss" style="table-layout: auto; width: 100%; margin-top: 0px;">
                <tr>
                  <td colspan="4" style="text-align: center; font-size: 24px; height: 50px">贷款利率定价附表二</td>
                </tr>
                <tr>
                  <td colspan="4">附：客户定期存款明细(单位：万元)</td>
                </tr>
                <tr>
                  <td colspan="4">
                    <table align="center" class="tableCss" style="table-layout: auto;" width="100%">
                      <tr class="center">
                        <th rowspan="2" style="text-align: center; font-weight: lighter">机构代码</th>
                        <th rowspan="2" style="text-align: center; font-weight: lighter">机构名称</th>
                        <th rowspan="2" style="text-align: center; font-weight: lighter">存款账号</th>
                        <th rowspan="2" style="text-align: center; font-weight: lighter">户名</th>
                        <th rowspan="2" style="text-align: center; font-weight: lighter">存入日</th>
                        <th rowspan="2" style="text-align: center; font-weight: lighter">支取日</th>
                        <th rowspan="2" style="text-align: center; font-weight: lighter">金额</th>
                        <th colspan="3" style="text-align: center; font-weight: lighter">前三年存款日平</th>
                      </tr>

                      <tr class="center">
                        <th style="text-align: center; font-weight: lighter">第一年</th>
                        <th style="text-align: center; font-weight: lighter">第二年</th>
                        <th style="text-align: center; font-weight: lighter">前三年</th>
                      </tr>
                      <tr v-for="(i,index) in this.dqckrpmx">
                        <th rowspan="1" style="text-align: center; font-weight: lighter">{{ i.jgdm }}</th>
                        <th rowspan="1" style="text-align: center; font-weight: lighter">{{i.jgdm_dictText}}</th>
                        <th rowspan="1" style="text-align: center; font-weight: lighter">{{ i.ckzh }}</th>
                        <th rowspan="1" style="text-align: center; font-weight: lighter">{{ i.hm }}</th>
                        <th rowspan="1" style="text-align: center; font-weight: lighter">{{ i.crr }}</th>
                        <th rowspan="1" style="text-align: center; font-weight: lighter">{{ i.zqr }}</th>
                        <th rowspan="1" style="text-align: center; font-weight: lighter">{{ i.je }}</th>
                        <th rowspan="1" style="text-align: center; font-weight: lighter">{{ i.qsndynckrp }}</th>
                        <th rowspan="1" style="text-align: center; font-weight: lighter">{{ i.qsndenckrp }}</th>
                        <th rowspan="1" style="text-align: center; font-weight: lighter">{{ i.qsndsnckrp }}</th>
                      </tr>
                      <tr>
                        <td colspan="10" rowspan="1">
                          客户上一个年度在其他银行定期存款日平: {{this.model.CS_GZ00037}}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <br/>
              <br/>
              <br/>

              <table align="center" class="tableCss" style="table-layout: auto; width: 100%; margin-top: 0px;">
                <tr>
                  <td colspan="7" style="text-align: center; font-size: 24px; height: 50px">贷款利率定价附表三</td>
                </tr>
                <tr>
                  <td colspan="7">附：客户担保信息</td>
                </tr>
                <tr>
                  <td class="center" style="text-align: center;">担保物</td>
                  <td class="center" style="text-align: center;">所有权人</td>
                  <td class="center" style="text-align: center;">评估价值</td>
                  <td class="center" style="text-align: center;">实际担保金额</td>
                  <td class="center" style="text-align: center;">担保率</td>
                  <td class="center" style="text-align: center;">担保类型</td>
                  <td class="center" style="text-align: center;">担保物描述</td>
                </tr>
                <tr v-for="(i,index) in this.dbxx">
                  <td class="center" style="text-align: center;">{{i.dbw_dictText}}</td>
                  <td class="center" style="text-align: center;">{{ i.syqr }}</td>
                  <td class="center" style="text-align: center;">{{ i.pgjz }}</td>
                  <td class="center" style="text-align: center;">{{ i.sjdbje }}</td>
                  <td class="center" style="text-align: center;">{{ i.dbl }}</td>
                  <td class="center" style="text-align: center;">{{ i.dblx_dictText }}</td>
                  <td class="center" style="text-align: center;">{{ i.dbwms }}</td>
                </tr>
              </table>
            </div>
          </div>
        </section>
      </a-card>
    </a-spin>

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
      confirmLoading: false,
      model: {},
      opType: 'print',// view & print
      djid: '', // 定价ID
      bjrq: '', // LPR利率报价日期
      xypj: '0', // 信用评价
      khzhgxddf: '0', // 客户综合贡献度得分
      dbxx: {}, // 担保信息
      hqckrpmx: {}, //活期存款日平明细
      bzjckrpmx: {}, //保证金存款日平明细
      bzjckrp: 0, //各类保证金日平
      dqckrpmx: {}, //客户定期存款明细
      spzt: '0', // 审批状态 0 未审批 1 已审批
      computeDate: '', // 计算日期
      EffectiveDateEnd: '', // 有效期至（3年有效期）
      sfhpqyDisplay: 2,  // //计算、重新计算、查看、打印 花炮企业优惠政策信息展示标识 1 展示 2 不展示
      note: '', // 花炮企业一类担保部分优惠信息
      // showflag: false,
      reminder: {
        'remind16': '',
        'remind20': '',
        'remind21A': '',
        'remind21B': '',
        'remind22': '',
        'remind23': '',
        'remind24': '',
        'remind25': '',
        'remind26A': '',
        'remind26B': '',
        'remind27': '',
        'remind29': '',
        'remind30': '',
        'remind33': '',
        'remind41': '',
        'remind42': '',
        'remindA': '',
        'remindB': '',
        'remindC': ''
      },
      url: {
        list: "list",
        getDbxxByZjhm: "/dklldj/lldjsq/getDbxxByZjhm",
        getHqCkrpmx: "/dklldj/lldjjs/getHqCkrpmx",
        getBzjCkrpmx: "/dklldj/lldjjs/getBzjCkrpmx",
        getDqCkrpmx: "/dklldj/lldjjs/getDqCkrpmx",
        getCompute: "/dklldj/lldjjs/getCompute",
        getZxxlldjbs: "/dklldj/lldjjs/getZxxlldjbs",
      },
    }
  },
  created () {},
  methods: {
    edit(record) {
      this.visible = true
      this.confirmLoading = true
      this.model = Object.assign({}, record)
      console.log("操作标识",this.opType)
      console.log('查看/打印页面 model',this.model)
      var data = {
        'djnf': this.model.djnf,
        'zjhm': this.model.zjhm
      }
      getAction(this.url.getCompute, data).then((res) => {
        if (res.success) {
          //console.log('function[`getCompute`]\n',res.result)
          this.xypj = Number(res.result.DF_KH00001) + Number(res.result.KFX_KH00002) + Number(res.result.KFX_KH00003) + Number(res.result.DF_KH00004) + Number(res.result.DF_KH00005)
          this.khzhgxddf = Number(res.result.DF_KH00007) + Number(res.result.DF_KH00009) + Number(res.result.DF_KH00010)
          this.model = Object.assign(this.model, res.result)
          getAction(this.url.getZxxlldjbs, data).then((res) => {
            if (res.success) {
              console.log('function[`getZxxlldjbs`]\n',res.result.records[0])
              this.djid = res.result.records[0].djid
              this.bjrq = res.result.records[0].bjrq
            } else {
              this.$message.warning(res.message,5)
            }
          }).catch((error)=>{
            console.info('function[`getZxxlldjbs`]执行失败！原因\n',error)
          }).finally(() => {
            this.handlerReminder(this.model)
            //获取客户担保信息
            this.queryDbxx()
            //获取客户活期存款日平明细
            this.queryHqCkrpmx()
            //获取客户保证金存款日平明细
            this.getBzjCkrpmx()
            //获取客户定期存款日平明细
            this.getDqCkrpmx()
            this.confirmLoading = false
          })
        } else {
          this.$message.warning(res.message,5)
        }
      }).catch((error)=>{
        console.info('function[`getCompute`]执行失败！原因\n',error)
      })
    },

    handlerReminder(model) {
      console.log('定价计算满足方案上条例名录\n', model)
      // this.showflag = true
      if (Number.parseInt(this.model.sfhpqy) === 1 &&
        Number.parseInt(this.model.sfjzxkh) === 2 &&
        Number.parseInt(this.model.sfhpqyDisplay) === 1) {
        this.sfhpqyDisplay = Number.parseInt(this.model.sfhpqyDisplay)
        // 花炮企业一类担保部分优惠信息
        this.note = this.model.note
        // console.info('展示：',this.sfhpqyDisplay)
      } else {
        this.sfhpqyDisplay = 2;
        this.note = '';
      }
      this.reminder.remind16  = model.remind16
      this.reminder.remind20  = model.remind20
      this.reminder.remind21A = model.remind21A
      this.reminder.remind21B = model.remind21B
      this.reminder.remind22  = model.remind22
      this.reminder.remind23  = model.remind23
      this.reminder.remind24  = model.remind24
      this.reminder.remind25  = model.remind25
      this.reminder.remind26A = model.remind26A
      this.reminder.remind26B = model.remind26B
      this.reminder.remind27  = model.remind27
      this.reminder.remind29  = model.remind29
      this.reminder.remind30  = model.remind30
      this.reminder.remind33  = model.remind33
      this.reminder.remind41  = model.remind41
      this.reminder.remind42  = model.remind42
      this.reminder.remindA   = model.remindA
      this.reminder.remindB   = model.remindB
      this.reminder.remindC   = model.remindC
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
    //客户活期存款日平明细
    queryHqCkrpmx() {
      let data = {
        'djnf': this.model.djnf,
        'zjhm': this.model.zjhm
      }
      getAction(this.url.getHqCkrpmx, data).then((res) => {
        if (res.success) {
          console.info('客户活期存款日平明细\n',res.result)
          this.hqckrpmx = res.result
        }
      }).catch((error)=>{
        console.info('客户活期存款日平明细获取失败！原因\n',error)
      })
    },
    //客户保证金存款日平明细
    getBzjCkrpmx() {
      let data = {
        'djnf': this.model.djnf,
        'zjhm': this.model.zjhm
      }
      getAction(this.url.getBzjCkrpmx, data).then((res) => {
        if (res.success) {
          console.info('客户保证金存款日平明细\n',res.result)
          this.bzjckrpmx = res.result.bzjckmx
          this.bzjckrp   = res.result.bzjckrp
        }
      }).catch((error)=>{
        console.info('客户保证金存款明细获取失败！原因\n',error)
      })
    },
    //客户定期存款日平明细
    getDqCkrpmx() {
      let data = {
        'djnf': this.model.djnf,
        'zjhm': this.model.zjhm
      }
      getAction(this.url.getDqCkrpmx, data).then((res) => {
        if (res.success) {
          console.info('客户定期存款日平明细\n',res.result)
          this.dqckrpmx = res.result
        }
      }).catch((error)=>{
        console.info('客户定期存款日平明细获取失败！原因\n',error)
      })
    },

    handleCancel () {
      this.close()
    },
    close () {
      this.visible = false;
      this.$emit('close');
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