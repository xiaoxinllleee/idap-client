<template>
  <a-modal :title="title"
           :visible="visible"
           :confirmLoading="confirmLoading"
           :keyboard="true"
           :maskClosable="false"
           :destroyOnClose="true"
           :closable="true"
           @cancel="handleCancel"
           width="50%">

    <a-spin :spinning="confirmLoading">
      <a-card :bordered="true" :class="{'abcdefg':true}">
        <div class="no-print" style="text-align: right">
          <a-button v-print="'#printContentReport'" ghost type="primary">打印</a-button>
        </div>
        <section ref="print" id="printContentReport" class="abcdefg">
          <a-row>
            <div style="padding-top: 20px;color: #0066CC">
              <a-col :span="24" style="align-content: center;">
                <p style="font-size: 24pt; text-align: center; margin: 8px;color: #0066CC">湖南{{ this.areaName
                  }}农村商业银行</p>
                <p style="font-size: 24pt; text-align: center; margin: 16px;color: #0066CC">一键查客户信息（准入报告）</p>
              </a-col>
              <a-col :span="12" style="text-align: left;padding-left: 5px;">报告编号: {{ this.reportNo }}</a-col>
              <a-col :span="12" style="text-align: right;padding-right: 5px;">报告时间: {{ this.reportTm }}</a-col>
              <a-col :span="24">
                <table class="g-tab-bor" border="1" style="border-collapse: collapse;width: 100%;margin-top: 10px;">
                  <tr>
                    <td style="text-align: center;width: 30%;" colspan="1" rowspan="6">
                      <img alt="profile" src="@/views/cmms/yjzrbg/assetsfile/user-profile.png" width="30%"
                           height="50%" />
                    </td>
                    <td style="text-align: center;width: 35%;">查询机构</td>
                    <td style="text-align: center;width: 35%;">{{ this.queryInfo.cxjg }}</td>
                  </tr>
                  <tr>
                    <td style="text-align: center;width: 35%;">查询操作员</td>
                    <td style="text-align: center;width: 35%;">{{ this.queryInfo.cxczy }}</td>
                  </tr>
                  <tr>
                    <td style="text-align: center;width: 35%;">查询原因</td>
                    <td style="text-align: center;width: 35%;">{{ this.queryInfo.cxyy }}</td>
                  </tr>
                  <tr>
                    <td style="text-align: center;width: 35%;">信用评分</td>
                    <td style="text-align: center;width: 35%;">{{ score.fs }}</td>
                  </tr>
                  <tr>
                    <td style="text-align: center;width: 35%;">风险等级</td>
                    <td style="text-align: center;width: 35%;">{{ score.fxdj }}</td>
                  </tr>
                  <tr>
                    <td style="text-align: center;width: 35%;">测算额度</td>
                    <td style="text-align: center;width: 35%;">{{ model.csed }}</td>
                  </tr>
                </table>
              </a-col>
              <!--<a-card title="湖南临武农村商业银行一键查客户信息（准入报告）">
                <a-card-grid style="width: 20%; text-align: center" :hoverable="false">Content</a-card-grid>
                <a-card-grid style="width: 20%; text-align: center" :hoverable="false">Content</a-card-grid>
                <a-card-grid style="width: 20%; text-align: center" :hoverable="false">Content</a-card-grid>
                <a-card-grid style="width: 20%; text-align: center" :hoverable="false">Content</a-card-grid>
                <a-card-grid style="width: 20%; text-align: center" :hoverable="false">Content</a-card-grid>
                <a-card-grid style="width: 20%; text-align: center">Content</a-card-grid>
                <a-card-grid style="width: 20%; text-align: center">Content</a-card-grid>
                <a-card-grid style="width: 20%; text-align: center">Content</a-card-grid>
                <a-card-grid style="width: 20%; text-align: center">Content</a-card-grid>
                <a-card-grid style="width: 20%; text-align: center">Content</a-card-grid>
              </a-card>-->
            </div>
          </a-row>

          <a-row>
            <div style="padding-top: 10px;width: 100%;">
              <a-col :span="12">
                <a-card :bordered="false" style="text-align: center;">
                  <!--<img alt="pass-through" src="@/views/cmms/yjzrbg/assetsfile/pass-through.png"/>-->
                  <a-progress type="circle" :percent="score.fs/10" :width="150" :strokeWidth="14">
                    <template #format="percent">
                      <div style="padding-bottom: 10px;">
                        <span style="font-size: 14px;">{{ score.fsval }}</span>
                      </div>
                      <span style="color: #0066CC;font-weight: 700;font-size: 20px">{{ score.fs }}</span>
                    </template>
                  </a-progress>
                </a-card>
              </a-col>

              <a-col :span="12">
                <a-card :bordered="false" style="text-align: center;">
                  <img v-if="score.fs >= 500" alt="pass-through"
                       src="@/views/cmms/yjzrbg/assetsfile/pass-through-1.png" />
                  <img v-else alt="pass-through" src="@/views/cmms/yjzrbg/assetsfile/fail-pass-1.png" />
                </a-card>
                <div style="text-align: center;color: #13C463;">
                  <!--<table border="2" style="width: 50%">
                    <tr><td>500-1000:建议通过</td></tr>
                  </table>-->
                  <span>500-1000:建议通过</span>
                </div>
              </a-col>
            </div>
          </a-row>

          <a-row style="padding-top: 10px;color: #0066CC">
            <table class="g-tab-bor" id="table-gwyj" border="1" width="100%">
              <tr>
                <td style="text-align: left;font-size: 12pt;padding: 3px;" colspan="2">高危预警</td>
              </tr>
              <tr v-if="score.nbzx == 2">
                <td class="table-gwyj-td-left">内部征信</td>
                <td class="table-gwyj-td-right">{{ score.nbzxval }}</td>
              </tr>
              <tr v-if="score.hmd == 2">
                <td class="table-gwyj-td-left">黑名单管理</td>
                <td class="table-gwyj-td-right">{{ score.hmdval }}</td>
              </tr>
              <tr v-if="score.bkbpy == 2">
                <td class="table-gwyj-td-left">背靠背评议</td>
                <td class="table-gwyj-td-right">{{ score.bkbpyval }}</td>
              </tr>
              <tr v-if="score.zxbg == 2">
                <td class="table-gwyj-td-left">征信报告（人民银行）</td>
                <td class="table-gwyj-td-right">{{ score.zxbgval }}</td>
              </tr>
              <tr v-if="score.wbhdbh == 2">
                <td class="table-gwyj-td-left">背靠背评议</td>
                <td class="table-gwyj-td-right">{{ score.wbhdbhval }}</td>
              </tr>
              <tr v-if="score.tpjch == 2">
                <td class="table-gwyj-td-left">脱贫及检测户</td>
                <td class="table-gwyj-td-right">{{ score.tpjchval }}</td>
              </tr>


              <!--              <tr>-->
              <!--                <td class="table-gwyj-td-left">黑名单管理</td>-->
              <!--                <td class="table-gwyj-td-right"></td>-->
              <!--              </tr>-->
              <!--              <tr>-->
              <!--                <td class="table-gwyj-td-left">背靠背评议</td>-->
              <!--                <td class="table-gwyj-td-right"></td>-->
              <!--              </tr>-->
              <!--              <tr>-->
              <!--                <td class="table-gwyj-td-left">外部数据</td>-->
              <!--                <td class="table-gwyj-td-right"></td>-->
              <!--              </tr>-->
              <!--              <tr>-->
              <!--                <td class="table-gwyj-td-left">法院信息</td>-->
              <!--                <td class="table-gwyj-td-right"></td>-->
              <!--              </tr>-->
              <!--              <tr>-->
              <!--                <td class="table-gwyj-td-left">特殊名单核查</td>-->
              <!--                <td class="table-gwyj-td-right"></td>-->
              <!--              </tr>-->
              <!--              <tr>-->
              <!--                <td class="table-gwyj-td-left">征信报告</td>-->
              <!--                <td class="table-gwyj-td-right"></td>-->
              <!--              </tr>-->
              <!--              <tr>-->
              <!--                <td class="table-gwyj-td-left">腾讯信用（腾讯）</td>-->
              <!--                <td class="table-gwyj-td-right"></td>-->
              <!--              </tr>-->
              <!--              <tr>-->
              <!--                <td class="table-gwyj-td-left">芝麻信用（支付宝）</td>-->
              <!--                <td class="table-gwyj-td-right"></td>-->
              <!--              </tr>-->
              <!--              <tr>-->
              <!--                <td class="table-gwyj-td-left">天眼查</td>-->
              <!--                <td class="table-gwyj-td-right"></td>-->
              <!--              </tr>-->
              <!--              <tr>-->
              <!--                <td class="table-gwyj-td-left">七星大数据风险检测平台</td>-->
              <!--                <td class="table-gwyj-td-right"></td>-->
              <!--              </tr>-->
            </table>
          </a-row>

          <a-row>
            <div style="margin-top: 20px;">
              <a-col :span="24" style="align-content: center;">
                <p style="font-size: 12pt; text-align: center; color: #0066CC;">一、基本信息</p>
              </a-col>
              <a-col :span="24">
                <p style="margin-top: 10px; margin-left: 10px; font-size: 10pt; text-align: center;">身份信息</p>
                <a-table :columns="columnsOne"
                         class="table_info"
                         :data-source="dataOne"
                         :bordered="true"
                         :pagination="false"
                         :locale="{emptyText: emptyText}"
                         :customHeaderRow="customHeaderRow"
                         :customRow="customRow" />
              </a-col>
              <a-col :span="24">
                <p style="margin-top: 10px; margin-left: 10px; font-size: 10pt; text-align: center;">关联人信息</p>
                <a-table :columns="columnsTwo"
                         :data-source="dataTwo"
                         class="table_info"
                         :bordered="true"
                         :pagination="false"
                         :locale="{emptyText: emptyText}"
                         :customHeaderRow="customHeaderRow"
                         :customRow="customRow" />
              </a-col>

              <a-col :span="24">
                <p style="margin-top: 10px; margin-left: 10px; font-size: 10pt; text-align: center;">背靠背评议信息</p>
                <a-table :columns="columnsBkb"
                         :data-source="dataBkb"
                         class="table_info"
                         :bordered="true"
                         :pagination="false"
                         :locale="{emptyText: emptyText}"
                         :customHeaderRow="customHeaderRow"
                         :customRow="customRow" />
              </a-col>
            </div>
          </a-row>

          <a-row>
            <div style="margin-top: 20px;">
              <a-col :span="24" style="align-content: center;">
                <p style="font-size: 12pt; text-align: center; color: #0066CC;">二、核查内容</p>
              </a-col>
              <a-col :span="24">
                <table class="g-tab-bor" id="table-hcnr" border="1" style="margin-top: 10px; ">
                  <tr>
                    <td class="table-hcnr-td-left">内部征信报告</td>
                    <td class="table-hcnr-td-right">
                      <!--<a-switch checked-children="✔" un-checked-children="✖" v-model:checked="hcnr.nbzxbg" />-->


                      <img alt="checked" v-if="score.nbzx == 1" src="@/views/cmms/yjzrbg/assetsfile/choose.png" />
                      <img alt="checked" v-if="score.nbzx == 2" src="@/views/cmms/yjzrbg/assetsfile/cw.png"
                           width="18px" />
                      <img alt="checked" v-if="score.nbzx == 3" src="@/views/cmms/yjzrbg/assetsfile/warning.png" />

                    </td>
                    <td class="table-hcnr-td-left">黑名单管理</td>
                    <td class="table-hcnr-td-right">
                      <!--<a-switch checked-children="✔" un-checked-children="✖" v-model:checked="hcnr.hmdgl" />-->
                      <img alt="checked" v-if="score.hmd == 1" src="@/views/cmms/yjzrbg/assetsfile/choose.png" />
                      <img alt="checked" v-if="score.hmd == 2" src="@/views/cmms/yjzrbg/assetsfile/cw.png"
                           width="18px" />
                      <img alt="checked" v-if="score.hmd == 3" src="@/views/cmms/yjzrbg/assetsfile/warning.png" />
                    </td>
                  </tr>
                  <tr>
                    <td class="table-hcnr-td-left">背靠背评议</td>
                    <td class="table-hcnr-td-right">
                      <!--<a-switch checked-children="✔" un-checked-children="✖" v-model:checked="hcnr.bkbpy" />-->
                      <img alt="checked" v-if="score.bkbpy == 1" src="@/views/cmms/yjzrbg/assetsfile/choose.png" />
                      <img alt="checked" v-if="score.bkbpy == 2" src="@/views/cmms/yjzrbg/assetsfile/cw.png"
                           width="18px" />
                      <img alt="checked" v-if="score.bkbpy == 3" src="@/views/cmms/yjzrbg/assetsfile/warning.png" />
                    </td>
                    <!--                    <td class="table-hcnr-td-left">天眼查</td>-->
                    <!--                    <td class="table-hcnr-td-right">-->
                    <!--                      <img alt="checked" v-if="hcnr.tyc == 1" src="@/views/cmms/yjzrbg/assetsfile/choose.png"/>-->
                    <!--                      <img alt="checked" v-if="hcnr.tyc == 2" src="@/views/cmms/yjzrbg/assetsfile/cw.png" width="18px"/>-->
                    <!--                      <img alt="checked" v-if="hcnr.tyc == 3" src="@/views/cmms/yjzrbg/assetsfile/warning.png"/>-->
                    <!--                    </td>-->

                    <td class="table-hcnr-td-left">征信报告（人民银行）</td>
                    <td class="table-hcnr-td-right">
                      <img alt="checked" v-if="score.zxbg == 1" src="@/views/cmms/yjzrbg/assetsfile/choose.png" />
                      <img alt="checked" v-if="score.zxbg == 2" src="@/views/cmms/yjzrbg/assetsfile/cw.png"
                           width="18px" />
                      <img alt="checked" v-if="score.zxbg == 3" src="@/views/cmms/yjzrbg/assetsfile/warning.png" />
                    </td>
                  </tr>
                  <tr>
                    <td class="table-hcnr-td-left">五保户、低保户名单</td>
                    <td class="table-hcnr-td-right">
                      <!--<a-switch checked-children="✔" un-checked-children="✖" v-model:checked="hcnr.wbhdbhmd" />-->
                      <img alt="checked" v-if="score.wbhdbh == 1" src="@/views/cmms/yjzrbg/assetsfile/choose.png" />
                      <img alt="checked" v-if="score.wbhdbh == 2" src="@/views/cmms/yjzrbg/assetsfile/cw.png"
                           width="18px" />
                      <img alt="checked" v-if="score.wbhdbh == 3" src="@/views/cmms/yjzrbg/assetsfile/warning.png" />
                    </td>
                    <td class="table-hcnr-td-left">脱贫户以及监测户名单</td>
                    <td class="table-hcnr-td-right">
                      <!--<a-switch checked-children="✔" un-checked-children="✖" v-model:checked="hcnr.tphjchmd" />-->
                      <img alt="checked" v-if="score.tpjch == 1" src="@/views/cmms/yjzrbg/assetsfile/choose.png" />
                      <img alt="checked" v-if="score.tpjch == 2" src="@/views/cmms/yjzrbg/assetsfile/cw.png"
                           width="18px" />
                      <img alt="checked" v-if="score.tpjch == 3" src="@/views/cmms/yjzrbg/assetsfile/warning.png" />
                    </td>
                  </tr>
                  <tr>
                    <!--                    <td class="table-hcnr-td-left">七星大数据风险检测平台</td>-->
                    <!--                    <td class="table-hcnr-td-right">-->
                    <!--                      <img alt="checked" v-if="hcnr.qxdsj_fxjcpt == 1" src="@/views/cmms/yjzrbg/assetsfile/choose.png"/>-->
                    <!--                      <img alt="checked" v-if="hcnr.qxdsj_fxjcpt == 2" src="@/views/cmms/yjzrbg/assetsfile/cw.png" width="18px"/>-->
                    <!--                      <img alt="checked" v-if="hcnr.qxdsj_fxjcpt == 3" src="@/views/cmms/yjzrbg/assetsfile/warning.png"/>-->
                    <!--                    </td>-->
                  </tr>
                  <!--                  <tr>-->
                  <!--                    <td class="table-hcnr-td-left">腾信信用（腾讯）</td>-->
                  <!--                    <td class="table-hcnr-td-right">-->
                  <!--                      &lt;!&ndash;<a-switch checked-children="✔" un-checked-children="✖" v-model:checked="hcnr.TENCENTCREDIT" />&ndash;&gt;-->
                  <!--                      <img alt="checked" v-if="hcnr.TENCENTCREDIT == 1" src="@/views/cmms/yjzrbg/assetsfile/choose.png"/>-->
                  <!--                      <img alt="checked" v-if="hcnr.TENCENTCREDIT == 2" src="@/views/cmms/yjzrbg/assetsfile/cw.png" width="18px"/>-->
                  <!--                      <img alt="checked" v-if="hcnr.TENCENTCREDIT == 3" src="@/views/cmms/yjzrbg/assetsfile/warning.png"/>-->
                  <!--                    </td>-->
                  <!--                    <td class="table-hcnr-td-left">芝麻信用（支付宝）</td>-->
                  <!--                    <td class="table-hcnr-td-right">-->
                  <!--                      &lt;!&ndash;<a-switch checked-children="✔" un-checked-children="✖" v-model:checked="hcnr.ALIPAYCREDIT" />&ndash;&gt;-->
                  <!--                      <img alt="checked" v-if="hcnr.ALIPAYCREDIT == 1" src="@/views/cmms/yjzrbg/assetsfile/choose.png"/>-->
                  <!--                      <img alt="checked" v-if="hcnr.ALIPAYCREDIT == 2" src="@/views/cmms/yjzrbg/assetsfile/cw.png" width="18px"/>-->
                  <!--                      <img alt="checked" v-if="hcnr.ALIPAYCREDIT == 3" src="@/views/cmms/yjzrbg/assetsfile/warning.png"/>-->
                  <!--                    </td>-->
                  <!--                  </tr>-->

                </table>
              </a-col>
            </div>
          </a-row>

          <a-row>
            <div style="margin-top: 20px;">
              <a-col :span="24" style="align-content: center;">
                <p style="font-size: 12pt; text-align: center; color: #0066CC;">三、业务情况</p>
              </a-col>
              <a-col :span="24">
                <p style="margin-top: 10px; margin-left: 10px; font-size: 10pt; text-align: center;">存款信息</p>
                <a-table :columns="columnsThr"
                         class="table_info"
                         :data-source="dataThr"
                         :bordered="true"
                         :pagination="false"
                         :locale="{emptyText: emptyText}"
                         :customHeaderRow="customHeaderRow"
                         :customRow="customRow" />
              </a-col>
              <!--              <a-col :span="24">-->
              <!--                <p style="margin-top: 10px; margin-left: 10px; font-size: 10pt; text-align: center;">现金流</p>-->
              <!--                <a-table :columns="columnsFou"-->
              <!--                         class="table_info"-->
              <!--                         :data-source="dataFou"-->
              <!--                         :bordered="true"-->
              <!--                         :pagination="false"-->
              <!--                         :locale="{emptyText: emptyText}"-->
              <!--                         :customHeaderRow="customHeaderRow"-->
              <!--                         :customRow="customRow"/>-->
              <!--              </a-col>-->
              <a-col :span="24">
                <p style="margin-top: 10px; margin-left: 10px; font-size: 10pt; text-align: center;">电子银行信息</p>
                <a-table :columns="columnsFiv"
                         class="table_info"
                         :data-source="dataThr"
                         :bordered="true"
                         :pagination="false"
                         :locale="{emptyText: emptyText}"
                         :customHeaderRow="customHeaderRow"
                         :customRow="customRow" />
              </a-col>
            </div>
          </a-row>

          <a-row>
            <div style="margin-top: 20px;">
              <a-col :span="24" style="align-content: center;">
                <p style="font-size: 12pt; text-align: center; color: #0066CC;">四、信息概要</p>
              </a-col>
              <a-col :span="24">
                <p style="margin-top: 10px; margin-left: 10px; font-size: 10pt; text-align: center;">(一) 信用提示</p>
                <a-table :columns="columnsSix"
                         :data-source="dataSix"
                         class="table_info"
                         :bordered="true"
                         :pagination="false"
                         :locale="{emptyText: emptyText}"
                         :customHeaderRow="customHeaderRow"
                         :customRow="customRow" />
              </a-col>
              <a-col :span="24">
                <p style="margin-top: 10px; margin-left: 10px; font-size: 10pt; text-align: center;">(二)
                  其他信息概要</p>
                <p v-for="(item, index) in otherInfo" :key="index" style="padding-top: 2px; font-size: 9pt;">{{ item
                  }}</p>
              </a-col>
            </div>
          </a-row>

          <a-row>
            <div style="margin-top: 20px;">
              <a-col :span="24" style="align-content: center;">
                <p style="font-size: 12pt; text-align: center; color: #0066CC;">五、 信贷交易信息明细</p>
              </a-col>
              <a-col :span="24">
                <p style="margin-top: 10px; font-size: 10pt; text-align: center;">(一) 贷款</p>
                <p style="font-size: 9pt;">该户贷款用信明细如下：</p>
                <a-table class="table_info"
                         :columns="columnsSev"
                         :data-source="dataSev"
                         :bordered="true"
                         :pagination="false"
                         :locale="{emptyText: emptyText}"
                         :customHeaderRow="customHeaderRow"
                         :customRow="customRow" />
              </a-col>
              <a-col :span="24" v-if="openKey">
                <!--利息违约明细-->
                <p v-for="(item, index) in dkyqInfo" :key="index" style="padding-top: 2px; font-size: 9pt;">{{ item
                  }}</p>
                <p style="padding-top: 2px; font-size: 9pt;" v-if="mxOpenKey">明细如下：</p>
                <a-table v-if="mxOpenKey"
                         class="table_info"
                         :columns="columnsEig"
                         :data-source="dataEig"
                         :bordered="true"
                         :pagination="false"
                         :customHeaderRow="customHeaderRow"
                         :customRow="customRow" />
              </a-col>
              <a-col :span="24">
                <p style="margin-top: 10px; font-size: 10pt; text-align: center;">(二) 贷记卡</p>
                <p v-for="(item, index) in djkInfo" :key="index" style="margin-top: 10px; font-size: 9pt;">{{ item
                  }}</p>
              </a-col>
            </div>
          </a-row>

          <a-row>
            <div style="margin-top: 20px;">
              <a-col :span="24" style="align-content: center;">
                <p style="font-size: 12pt; text-align: center; color: #0066CC;">六、 征信报告</p>
              </a-col>

              <a-col :span="24" style="align-content: center;">
                <div v-html="zxbghtml"></div>
              </a-col>
              <a-col :span="24" v-for="item in zxbgpdfList">
                <img alt="pass-through" :src="item" width="100%" />
              </a-col>
            </div>
          </a-row>

          <!--          <a-row>-->
          <!--            <div style="margin-top: 20px;">-->
          <!--              <a-col :span="24" style="align-content: center;">-->
          <!--                <p style="font-size: 12pt; text-align: center; color: #0066CC;">七、 七星大数据风险检测平台</p>-->
          <!--              </a-col>-->

          <!--              <a-col :span="24" >-->
          <!--                <img alt="pass-through" src="@/views/cmms/yjzrbg/assetsfile/4301032022060610880.jpg" width="100%"/>-->
          <!--              </a-col>-->
          <!--              <a-col :span="24" >-->
          <!--                <img alt="pass-through" src="@/views/cmms/yjzrbg/assetsfile/4301032022060610881.jpg"  width="100%"/>-->
          <!--              </a-col>-->
          <!--              <a-col :span="24" >-->
          <!--                <img alt="pass-through" src="@/views/cmms/yjzrbg/assetsfile/4301032022060610882.jpg"  width="100%"/>-->
          <!--              </a-col>-->
          <!--            </div>-->
          <!--          </a-row>-->
        </section>
      </a-card>
    </a-spin>

    <template slot="footer">
      <a-button @click="handleCancel">关闭</a-button>
    </template>
  </a-modal>
</template>

<script>
import { getAction, httpAction } from '@/api/manage'
import pick from 'lodash.pick'
import moment from 'moment'
import { notification } from 'ant-design-vue'
import ImagPreview from '@/views/jeecg/ImagPreview'

export default {
  name: 'YjzrbgPrintModal',
  components: { ImagPreview },
  data () {
    return {
      title: '一键查准入报告',
      visible: false,
      // 准入报告 数据接收
      model: {},
      pageElement: {},
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      confirmLoading: false,
      form: this.$form.createForm(this),
      validatorRules: {},
      url: {
        //report: "/creditreportquery/yjzrbgreport",
        report: '/creditreportquery/yjzrbgPrint'
      },

      // 客户名称
      custName: '',
      // 客户证件号
      identNo: '',
      cxyy: '',
      // 法人行社隶属县市地区
      areaName: '临武',
      reportNo: '180101XX00' + '-' + moment(new Date()).format('YYYYMMDD') + '-' + 0,
      reportTm: '',
      // 查询信息
      queryInfo: {
        // 查询机构
        cxjg: 'xx支行',
        // 查询操作员
        cxczy: '操作员小刘',
        // 查询原因
        cxyy: '贷款审批',
        // 信用评分
        xypf: '799',
        // 风险等级
        fxdj: '中'
      },
      //高危预警
      HighRiskWarning: {
        // 内部征信
        nbzx: '表外不良贷款（已结清/未结清）',
        // 黑名单管理
        hmdgl: '',
        // 背靠背评议
        bkbpy: '',
        // 反电信诈骗
        fdxzp: '',
        // 外部数据
        wbsj: '五保户、低保户/脱贫及检测户',
        // 法院信息
        fyxx: '存在失信记录',
        // 特殊名单核查
        tsmdhc: '命中特殊名单核查高风险项',
        // 征信报告
        zxbg: '',
        // 腾讯信用（腾讯）
        TENCENTCREDIT: '',
        // 芝麻信用（支付宝）
        ALIPAYCREDIT: '',
        // 天眼查
        tyc: ''
      },

      emptyText: '暂无数据',
      //一:基本信息:身份信息
      dataOne: [],
      columnsOne: [
        {
          title: '姓名',
          align: 'center',
          key: 'khmc',
          dataIndex: 'khmc',
          scopedSlots: { customRender: 'khmc' }
        },
        {
          title: '性别',
          align: 'center',
          key: 'xb',
          dataIndex: 'xb_dictText',
          scopedSlots: { customRender: 'xb' }
        },
        {
          title: '年龄',
          align: 'center',
          key: 'nl',
          dataIndex: 'nl'
        },
        {
          title: '婚姻状况',
          align: 'center',
          key: 'hyzk',
          dataIndex: 'hyzk_dictText',
          scopedSlots: { customRender: 'hyzk' }
        },
        {
          title: '手机号码',
          align: 'center',
          key: 'sjhm',
          dataIndex: 'sjhm',
          scopedSlots: { customRender: 'sjhm' }
        },
        // {
        //   title: '住宅电话',
        //   align: 'center',
        //   key: 'homeTel',
        //   dataIndex: 'homeTel',
        //   scopedSlots: {customRender: 'homeTel'},
        // },
        {
          title: '学历',
          align: 'center',
          key: 'xl',
          dataIndex: 'xl_dictText'
        },
        {
          title: '户籍地址',
          align: 'center',
          key: 'hjdz',
          dataIndex: 'hjdz'
        }
      ],
      dataBkb: [],
      columnsBkb: [{
        title: '所属网格',
        dataIndex: 'qydm_dictText',
        key: 'qydm',
        align: 'center'
      },
        {
          title: '客户名称',
          dataIndex: 'khmc',
          key: 'khmc',
          align: 'center'
        },
        {
          title: '经营项目',
          dataIndex: 'jyxm',
          key: 'jyxm',
          align: 'center'
        },
        {
          title: '家庭收入',
          dataIndex: 'jtsr_dictText',
          key: 'jtsr',
          align: 'center'
        },
        {
          title: '授信额度',
          dataIndex: 'jysxed',
          key: 'jysxed',
          align: 'center'
        }
      ],
      //一:基本信息:关联人信息
      dataTwo: [],
      columnsTwo: [
        {
          title: '姓名',
          dataIndex: 'khmc',
          key: 'khmc',
          align: 'center'
        },
        {
          title: '证件号码',
          dataIndex: 'zjhm',
          key: 'zjhm',
          align: 'center'
        },
        {
          title: '手机号码',
          dataIndex: 'sjhm',
          key: 'sjhm',
          align: 'center'
        },
        {
          title: '与户主关系',/*关联关系*/
          dataIndex: 'yhzgx_dictText',
          key: 'yhzgx',
          align: 'center'
        }
      ],
      //二:核查内容
      hcnr: {
        // 内部征信报告
        nbzxbg: 3,
        // 黑名单管理
        hmdgl: 3,
        // 背靠背评议
        bkbpy: 3,
        bkbpyText: '',
        // 反电诈
        //fdxzp: true,
        // 五保户、低保户名单
        wbhdbhmd: 3,
        // 脱贫户以及监测户名单
        tphjchmd: 3,
        // 七星大数据风险检测平台
        qxdsj_fxjcpt: 1,
        // 征信报告（人民银行）
        zxbg_pbc: 3,
        // 腾信信用（腾讯）
        TENCENTCREDIT: 3,
        // 芝麻信用（支付宝）
        ALIPAYCREDIT: 3,
        // 天眼查
        tyc: 3
      },
      //三:业务情况:存款信息
      dataThr: [],
      columnsThr: [
        {
          title: '存款累计（单位：元）',
          children: [
            {
              title: '余额',
              dataIndex: 'ckye',
              key: 'ckye',
              align: 'center'
            },
            {
              title: '月日平',
              dataIndex: 'ckrpye',
              key: 'ckrpye',
              align: 'center'
            },
            {
              title: '年日平',
              dataIndex: 'cknrpye',
              key: 'cknrpye',
              align: 'center'
            }
          ]
        },
        {
          title: '活期存款（单位：元）',
          children: [
            {
              title: '余额',
              dataIndex: 'hqckye',
              key: 'hqckye',
              align: 'center'
            },
            {
              title: '月日平',
              dataIndex: 'hqckrpye',
              key: 'hqckrpye',
              align: 'center'
            },
            {
              title: '年日平',
              dataIndex: 'hqcknrpye',
              key: 'hqcknrpye',
              align: 'center'
            }
          ]
        },
        {
          title: '定期存款（单位：元）',
          children: [
            {
              title: '余额',
              dataIndex: 'dqckye',
              key: 'dqckye',
              scopedSlots: { customRender: 'dqckye' },
              align: 'center'
            },
            {
              title: '月日平',
              dataIndex: 'dqckrpye',
              key: 'dqckrpye',
              align: 'center'
            },
            {
              title: '年日平',
              dataIndex: 'dqcknrpye',
              key: 'dqcknrpye',
              align: 'center'
            }
          ]
        }
      ],
      //三:业务情况:现金流
      dataFou: [],
      columnsFou: [
        {
          title: '时间起',
          dataIndex: 'ksrq',
          key: 'ksrq',
          scopedSlots: { customRender: 'ksrq' },
          align: 'center'
        },
        {
          title: '时间止',
          dataIndex: 'jsrq',
          key: 'jsrq',
          scopedSlots: { customRender: 'jsrq' },
          align: 'center'
        },
        {
          title: '现金流入',
          dataIndex: 'xjlr',
          key: 'xjlr',
          scopedSlots: { customRender: 'xjlr' },
          align: 'center'
        },
        {
          title: '现金流出',
          dataIndex: 'xjlc',
          key: 'xjlc',
          scopedSlots: { customRender: 'xjlc' },
          align: 'center'
        },
        {
          title: '总现金流',
          dataIndex: 'zxjl',
          key: 'zxjl',
          scopedSlots: { customRender: 'zxjl' },
          align: 'center'
        },
        {
          title: '净现金流',
          dataIndex: 'jxjl',
          key: 'jxjl',
          scopedSlots: { customRender: 'jxjl' },
          align: 'center'
        }
      ],
      //三:业务情况:电子银行信息
      dataFiv: [],
      columnsFiv: [
        {
          title: '手机银行',
          dataIndex: 'sfktwsyhyw_dictText',
          key: 'sfktwsyhyw',
          align: 'center'
        },
        {
          title: '社保卡',
          dataIndex: 'sfktsbk_dictText',
          key: 'sfktsbk',
          align: 'center'
        },
        {
          title: '信用卡',
          dataIndex: 'sfktxyk_dictText',
          key: 'sfktxyk',
          align: 'center'
        },
        {
          title: 'ETC',
          dataIndex: 'sfbletcyw_dictText',
          key: 'sfbletcyw',
          align: 'center'
        },
        {
          title: '福祥 E 支付',
          dataIndex: 'sfblezf_dictText',
          key: 'sfblezf',
          align: 'center'
        }
      ],
      //四:信息概要:信用提示
      dataSix: [],
      columnsSix: [
        {
          title: '序号',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: 'center',
          customRender: function (t, r, index) {
            return parseInt(index) + 1
          }
        },
        {
          title: '项目',
          dataIndex: 'xytsxm_dictText',
          key: 'xytsxm',
          scopedSlots: { customRender: 'xytsxm' },
          align: 'center'
        },
        {
          title: '信贷往来机构数',
          dataIndex: 'xdwljgs',
          key: 'xdwljgs',
          align: 'center'

        },
        {
          title: '历史业务次数累计',
          dataIndex: 'lsywcslj',
          key: 'lsywcslj',
          align: 'center'
        },
        {
          title: '存量笔数',
          dataIndex: 'clbs',
          key: 'clbs',
          align: 'center'
        },
        {
          title: '存量首笔开户日期',
          dataIndex: 'clsbkhrq',
          key: 'clsbkhrq',
          scopedSlots: { customRender: 'clsbkhrq' },
          align: 'center'
        },
        {
          title: '合同金额',
          dataIndex: 'htje',
          key: 'htje',
          align: 'center'
        },
        {
          title: '用信余额',
          dataIndex: 'yxye',
          key: 'yxye',
          align: 'center'
        },
        {
          title: '历史本金逾期次数',
          dataIndex: 'bjyqcs',
          key: 'bjyqcs',
          align: 'center'
        },
        {
          title: '历史利息违约次数',
          dataIndex: 'lxyqcs',
          key: 'lxyqcs',
          align: 'center'
        },
        {
          title: '单月最高欠息总额',
          dataIndex: 'dyzgqxze',
          key: 'dyzgqxze',
          align: 'center'
        },
        {
          title: '特殊交易次数',
          dataIndex: 'tsjycs',
          key: 'tsjycs',
          align: 'center'
        }
      ],
      //四:信息概要:其他信息概要
      otherInfo: [],
      //五:信贷交易信息明细:贷款
      dataSev: [],
      columnsSev: [
        {
          title: '序号',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: 'center',
          customRender: function (t, r, index) {
            return parseInt(index) + 1
          }
        },
        {
          title: '机构名称',
          dataIndex: 'jgdm_dictText',
          key: 'jgdm',
          scopedSlots: { customRender: 'jgdm' },
          align: 'center'
        },
        {
          title: '账号',
          dataIndex: 'dkzh',
          key: 'dkzh',
          scopedSlots: { customRender: 'dkzh' },
          align: 'center'
        },
        {
          title: '借款日期',
          dataIndex: 'jkrq',
          key: 'jkrq',
          scopedSlots: { customRender: 'jkrq' },
          align: 'center'
        },
        {
          title: '到期日期',
          dataIndex: 'dqrq',
          key: 'dqrq',
          scopedSlots: { customRender: 'dqrq' },
          align: 'center'
        },
        {
          title: '贷款金额',
          dataIndex: 'dkje',
          key: 'dkje',
          scopedSlots: { customRender: 'dkje' },
          align: 'center'
        },
        {
          title: '核心余额',
          dataIndex: 'hxye',
          key: 'hxye',
          scopedSlots: { customRender: 'hxye' },
          align: 'center'
        },
        {
          title: '最小欠息日期',
          dataIndex: 'zxqxr',
          key: 'zxqxr',
          scopedSlots: { customRender: 'zxqxr' },
          align: 'center'
        },
        {
          title: '累计欠息次数',
          dataIndex: 'ljqxcs',
          key: 'ljqxcs',
          scopedSlots: { customRender: 'ljqxcs' },
          align: 'center'
        },
        {
          title: '五级分类',
          dataIndex: 'wjflbz_dictText',
          key: 'wjflbz',
          scopedSlots: { customRender: 'wjflbz' },
          align: 'center'
        },
        {
          title: '客户经理',
          dataIndex: 'khjl_dictText',
          key: 'khjl',
          scopedSlots: { customRender: 'khjl' },
          align: 'center'
        }
      ],
      //五:信贷交易信息明细:贷款:利息违约明细
      // 利息违约明细 信息提示 是否展示标识
      openKey: false,
      // 利息违约明细 数据表格 是否展示标识
      mxOpenKey: false,
      dataEig: [],
      columnsEig: [
        {
          title: '贷款账号',
          dataIndex: 'acctNo',
          key: 'acctNo',
          scopedSlots: { customRender: 'acctNo' },
          align: 'center'
        },
        {
          title: '业务种类',
          dataIndex: 'ywzl',
          key: 'ywzl',
          scopedSlots: { customRender: 'ywzl' },
          align: 'left'
        },
        {
          title: '逾期月份',
          dataIndex: 'yqyf',
          key: 'yqyf',
          scopedSlots: { customRender: 'yqyf' },
          align: 'center'
        },
        {
          title: '逾期利息',
          dataIndex: 'yqlx',
          key: 'yqlx',
          scopedSlots: { customRender: 'yqlx' },
          align: 'center'
        },
        {
          title: '逾期本金',
          dataIndex: 'yqbj',
          key: 'yqbj',
          scopedSlots: { customRender: 'yqbj' },
          align: 'center'
        }
      ],
      //五:信贷交易信息明细:贷款:利息违约明细:利息违约提示
      dkyqInfo: [],
      //五:信贷交易信息明细:贷记卡
      djkInfo: [],
      qxfk1: '',
      qxfk2: '',
      qxfk3: '',
      zxbgImgList: [],
      zxbghtml: '',
      score: {},
      zxbgpdfList: []
    }
  },
  created () {
  },
  methods: {
    init (record) {
      this.form.resetFields()
      if (this.cxyy === 1) this.queryInfo.cxyy = '贷款审批'
      if (this.cxyy === 2) this.queryInfo.cxyy = '信用卡审批'
      if (this.cxyy === 3) this.queryInfo.cxyy = '贷后管理'
      if (this.cxyy === 4) this.queryInfo.cxyy = '担保资格审查'
      if (this.cxyy === 5) this.queryInfo.cxyy = '特约商户实名审查'
      this.custName = record.khmc
      this.identNo = record.zjhm
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
      })
      //this.getNhxx()
      this.pageInitional(record.khmc, record.zjhm)
      //this.queryQxfk();
      //this.zxbgQuery();
      //this.jsdf()
      this.reportTm = moment(new Date()).format('YYYY.MM.DD HH:mm:ss')
    },
    getNhxx () {
      this.dataOne = []
      this.dataTwo = []
      this.dataBkb = []
      getAction('/khflgl/nhxq/queryByZjhm', { zjhm: this.model.zjhm }).then(res => {
        if (res.success) {
          this.dataOne.push(res.result)
          if (res.result.hhbm != undefined && res.result.hhbm) {
            this.getJtxx(res.result.hhbm)
            getAction('/nh/nhbkbpy/queryByHhbm', { hhbm: res.result.hhbm }).then(res3 => {
              if (res3.success) {
                this.dataBkb = res3.result
                this.hcnr.bkbpy = 1
                for (let i = 0; i < res3.result.length; i++) {
                  let obj = res3.result[i]
                  let text = ''
                  if (obj.bysxqx_dictText != undefined && obj.bysxqx_dictText != null) {
                    text += obj.khmc + '有不予授信情形：' + obj.bysxqx_dictText + ' '
                  }
                  if (text.length > 0) {
                    this.hcnr.bkbpyText = text
                    this.hcnr.bkbpy = 2
                  }
                }
              }
            })
          }
        }
      })
    },
    getJtxx (hhbm) {
      getAction('/khflgl/nhxq/queryJtcyxx', { hhbm: hhbm }).then(res2 => {
        if (res2.success) {
          this.dataTwo = res2.result

        }
      })
    },

    pageInitional: function (name, zjhm) {
      let parameters = {
        'zjhm': zjhm,
        'name': name
      }
      this.confirmLoading = true
      notification.info({ message: '系统提示', description: '一键准入报告正在生成，请稍等...', duration: 8 })
      this.dataOne = []
      this.dataTwo = []
      this.dataSix = []
      this.zxbgpdfList = []
      this.zxbghtml = ''
      getAction(this.url.report, parameters).then((res) => {
        if (res.success) {
          console.info('一键准入报告生成完毕 -', res.result)
          // 一 基本信息 身份信息
          //this.dataOne = res.result.jbxx_sfxx
          if (res.result.nhxx != undefined && res.result.nhxx != null) {
            this.dataOne.push(res.result.nhxx)
          }
          // 二 基本信息 关联人信息
          //this.dataTwo = res.result.jbxx_glrxx
          if (res.result.nhxqList != undefined && res.result.nhxqList != null) {
            this.dataTwo = res.result.nhxqList
          }
          // 背靠背评议信息
          if (res.result.nhbkbpyList != undefined && res.result.nhbkbpyList != null) {
            this.dataBkb = res.result.nhbkbpyList
          }

          if (res.result.html != undefined && res.result.html != null) {
            this.zxbghtml = res.result.html
          }
          if (res.result.pdf != undefined && res.result.pdf != null) {
            let obj = res.result.pdf
            console.log(obj)
            let num = obj.imgNumber == null ? 0 : obj.imgNumber
            for (let i = 0; i < num; i++) {
              let fwlj = obj.fwlj
              let lj = window._CONFIG['staticDomainURL'] + '/' + fwlj.replace('.pdf', i + '.jpg')
              this.zxbgpdfList.push(lj)
            }

            // let ywhywwlxx = obj.ywhywwlxx
            // if (ywhywwlxx != undefined && ywhywwlxx != null) {
            //   this.dataThr.push(ywhywwlxx)
            // }
          }

          // if (obj.ywhywwlxx != undefined && obj.ywhywwlxx != null) {
          //   this.dataThr.push(obj.ywhywwlxx)
          // }

          if (res.result.jsdf != undefined && res.result.jsdf != null) {
            this.score = res.result.jsdf

            if (res.result.jsdf.ywhywwlxx != undefined && res.result.jsdf.ywhywwlxx != null ){
              this.dataThr.push(res.result.jsdf.ywhywwlxx)
            }
          }

          //this.zxbghtml = res.message
          //this.hcnr.zxbg_pbc = 1

          // 四 信息概要 信用提示
          if (res.result.xxgy_xyts != undefined && res.result.xxgy_xyts != null) {
            this.dataSix = res.result.xxgy_xyts
          }
          // 四 信息概要 其他信息概要
          if (res.result.xxgy_qtxxgy != undefined && res.result.xxgy_qtxxgy != null) {

            let qtxxgy = res.result.xxgy_qtxxgy
            if (qtxxgy !== undefined && qtxxgy.length > 0) {
              qtxxgy.forEach((item, index) => {
                item = Number.parseInt(index) + 1 + '.' + item
                this.otherInfo.push(item)
              })
            }
          }
          // 五 信贷交易信息明细 贷款
          if (res.result.xdjyxxmx_dk != undefined && res.result.xdjyxxmx_dk != null) {
            let xdjyxxmx_dk = res.result.xdjyxxmx_dk
            // console.info('xdjyxxmx_dk',xdjyxxmx_dk)
            let dksj = xdjyxxmx_dk.dksj
            if (dksj != undefined && dksj.length > 0) {
              dksj.forEach((item, index) => {
                // console.info('dksj',index,item)
                item.dkje = item.dkje == null ? 0.00 : Number.parseFloat(item.dkje).toFixed(2)
                item.hxye = item.dkje == null ? 0.00 : Number.parseFloat(item.hxye).toFixed(2)
                this.dataSev.push(item)
                // 五 信贷交易信息明细 欠息明细
                let qxmxInfo_0 = ''
                let qxmxInfo_1 = ''
                let zhlx = item.zhlx == null ? 0 : Number.parseInt(item.zhlx)
                let qxcs = item.ljqxcs == null ? 0 : Number.parseInt(item.ljqxcs)
                let ywzl = item.ywzl_dictText === null ? '' : '，业务种类：' + item.ywzl_dictText
                if (zhlx !== 1) {
                  ywzl = item.dkzlShow === null ? '' : '，' + item.dkzlShow
                }
                let zhzt = item.zhzt_dictText === null ? '/' : item.zhzt_dictText
                if (zhlx !== 1 || (zhlx === 1 && qxcs !== 0)) {
                  this.openKey = true
                  qxmxInfo_0 = index + 1 + '.' + '贷款账号：' + item.dkzh + ywzl + '，账户状态：' + zhzt
                  if (qxcs === 0) {
                    qxmxInfo_0 = qxmxInfo_0 + '。'
                  } else {
                    let qxhj = item.qxhj == null ? 0.00 : Number.parseFloat(item.qxhj).toFixed(2)
                    qxmxInfo_1 = '，' + '利息违约次数累计达 ' + qxcs + ' 次，欠息合计 ' + qxhj + ' 元。'
                    qxmxInfo_0 = qxmxInfo_0 + qxmxInfo_1
                    this.mxOpenKey = true
                    item.dkqxdjbTable.forEach((item, index) => {
                      // console.info('dkqxdjbTable',index,item)
                      item.ywzl = ywzl.replace('，', '')
                      item.yqyf = item.yqyf == null ? '' : moment(item.yqyf).format('YYYY.MM')
                      item.yqlx = item.yqlx == null ? 0.00 : Number.parseFloat(item.yqlx).toFixed(2)
                      item.yqbj = item.yqbj == null ? 0.00 : Number.parseFloat(item.yqbj).toFixed(2)
                      this.dataEig.push(item)
                    })
                  }
                  this.dkyqInfo.push(qxmxInfo_0)
                }
              })
            }
            let dksj_total = {}
            this.$set(dksj_total, 'jgmc', '')
            this.$set(dksj_total, 'dkzh', '')
            this.$set(dksj_total, 'jkrq', '')
            this.$set(dksj_total, 'dqrq', '合计')
            this.$set(dksj_total, 'dkje', xdjyxxmx_dk.dkjeSum == null ? 0.00 : Number.parseFloat(xdjyxxmx_dk.dkjeSum).toFixed(2))
            this.$set(dksj_total, 'hxye', xdjyxxmx_dk.hxyeSum == null ? 0.00 : Number.parseFloat(xdjyxxmx_dk.hxyeSum).toFixed(2))
            this.$set(dksj_total, 'zxqxr', '')
            this.$set(dksj_total, 'ljqxcs', '')
            this.$set(dksj_total, 'wjflbzShow', '')
            this.$set(dksj_total, 'khjl', '')
            this.dataSev.push(dksj_total)
          }
          // 五 信贷交易信息明细 贷记卡
          let djkxx = res.result.xdjyxxmx_djk
          if (djkxx !== undefined && djkxx.length > 0) {
            djkxx.forEach((item, index) => {
              item = Number.parseInt(index) + 1 + '.' + item
              this.djkInfo.push(item)
            })
          }

          notification.success({ message: '系统提示', description: '一键准入报告生成完毕', duration: 4 })
        }
      }).catch((error) => {
        notification.error({ message: '系统提示', description: '一键准入报告生成失败，请联系管理员！', duration: 4 })
        console.error('一键准入报告生成失败', error)
      }).finally(() => {
        this.confirmLoading = false
      })
    },
    clearElment () {
      this.openKey = false
      this.mxOpenKey = false
      this.cxyy = ''
      this.areaName = ''
      this.reportNo = ''
      this.reportTm = ''
      // this.queryInfo = {}
      // this.HighRiskWarning = {}
      this.dataOne = []
      this.dataTwo = []
      // this.hcnr = {}
      this.dataThr = []
      this.dataFou = []
      this.dataFiv = []
      this.dataSix = []
      this.dataSev = []
      this.dataEig = []
      this.otherInfo = []
      this.dkyqInfo = []
      this.djkInfo = []
    },
    handleCancel () {
      this.clearElment()
      this.close()
    },
    close () {
      this.$emit('close')
      this.visible = false
    },
    customHeaderRow () {
      return {
        style: {
          'font-size': '4pt'
        }
      }
    },
    customRow () {
      return {
        style: {
          'font-size': '3pt'
        }
      }
    },

    zxbgQuery () {
      this.zxbgpdfList = []
      this.zxbghtml = ''
      getAction('/yjzrbg/zxbgPdfImg/queryByZjhm', { zjhm: this.model.zjhm }).then(
        res => {
          if (res.success) {
            if (res.message.length > 100) {
              this.zxbghtml = res.message
              this.hcnr.zxbg_pbc = 1
            } else {
              let obj = res.result
              let num = obj.imgNumber == null ? 0 : obj.imgNumber
              for (let i = 0; i < num; i++) {
                let fwlj = res.result.fwlj
                let lj = window._CONFIG['staticDomainURL'] + '/' + fwlj.replace('.pdf', i + '.jpg')
                this.zxbgpdfList.push(lj)
              }
            }

          }
        }
      )
    },
    queryQxfk () {
      getAction('/qxfk/qxfkPdfImg/queryById', { zjhm: this.model.zjhm, sfsq: '1' }).then(
        res => {
          if (res.success) {
            let fwlj = res.result.fwlj
            this.qxfk1 = window._CONFIG['staticDomainURL'] + '/' + fwlj.replace('.pdf', '0.jpg')
            this.qxfk2 = window._CONFIG['staticDomainURL'] + '/' + fwlj.replace('.pdf', '1.jpg')
            this.qxfk3 = window._CONFIG['staticDomainURL'] + '/' + fwlj.replace('.pdf', '2.jpg')
          }
        }
      )
    },
    jsdf () {
      this.score = {}
      this.dataThr = []
      getAction('/yjzrbg/camsZcsxYjzrbg/getYwhywxx', { zjhm: this.model.zjhm }).then(
        res => {
          if (res.success) {
            this.score = res.result

            let obj = res.result
            if (obj.blkh) {
              this.hcnr.nbzxbg = 1
            } else {
              this.hcnr.nbzxbg = 2
            }
            if (obj.tpjch) {
              this.hcnr.tphjchmd = 1
            } else {
              this.hcnr.tphjchmd = 2
            }
            let ywhywwlxx = res.result.ywhywwlxx
            if (ywhywwlxx != undefined && ywhywwlxx != null) {
              this.dataThr.push(ywhywwlxx)
            }
          }
        }
      )
    }
  }
}
</script>

<style scoped>
@import '~@assets/less/common.less'

#table-gwyj {
  border-collapse: collapse;
  width: 100%;
  font-weight: bold;
}

.table-gwyj-td-left {
  text-align: left;
  padding: 3px;
  width: 20%;
}

.table-gwyj-td-right {
  text-align: left;
  padding: 3px;
  color: red;
  width: 80%;
}

#table-hcnr {
  border-collapse: collapse;
  width: 100%;
}

.table-hcnr-td-left {
  text-align: left;
  padding: 3px;
  width: 30%;
}

.table-hcnr-td-right {
  text-align: center;
}


.ant-table-tbody > tr > td {
  padding: 0px !important;
}

#printContentReport tr {
  height: 80%;
}

@page {
  size: auto A4 landscape;
  margin: 15mm;
}

/deep/ .ant-table table tr td {
  font-size: 10px;
  padding: 2px;
  border: 1px solid;
}

/deep/ .ant-table table tr th {
  font-size: 12px;
  padding: 2px;
  border: 1px solid;
}

/deep/ .ant-table table {
  border: 1px solid;
}
</style>