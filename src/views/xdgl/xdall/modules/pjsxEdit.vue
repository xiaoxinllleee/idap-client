<template>

  <j-modal
    :title="title"
    :width="1450"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :destroyOnClose="true"
    switchFullscreen
    :fullscreen="false"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    <template slot="footer">
      <a-button @click="handleCancel">
        关闭
      </a-button>

      <a-button type="primary" @click="handleOk(2)" v-if=" (formData.status == 2 || formData.status == 3) && valType">
        拒绝
      </a-button>

      <a-button type="primary" @click="handleOk(1)" v-if="(formData.status == 2 || formData.status == 3) && valType">
        通过
      </a-button>
      <a-button type="primary" @click="handleOk(1)" v-if="valType && formData.status != 2 && formData.status != 3">
        保存
      </a-button>
    </template>
    <a-spin :spinning="confirmLoading">
      <!-- 主表单区域 -->
      <a-form :form="form">
        <a-tabs :default-active-key="dafactivekey" v-model="activeKey">

          <a-tab-pane tab="评定及意见" key="0" :forceRender="true" v-if="dafactivekey == '0'">
            <a-card title="审批历史" :bordered="true" v-if="splsTable.dataSource.length > 0">
              <a-table
                size="small"
                :columns="splsTable.columns"
                :dataSource="splsTable.dataSource"
                :pagination="ipagination"
                @change="handleTableChange"
                bordered>
              </a-table>

            </a-card>

            <a-card :bordered="true">

              <a-row justify="center">
                <a-col :span="4" :offset="8">
                  <a-timeline>
                    <a-timeline-item color="green">客户经理申请:{{ workNo }}</a-timeline-item>
                    <a-timeline-item :color=" formData.status > 1 ?'green': 'gray'">风险经理审批:{{ fxjlStr }}
                    </a-timeline-item>
                    <a-timeline-item :color=" formData.status > 2 ?'green': 'gray'">
                      支行行长审批:{{ zhhzStr }}
                    </a-timeline-item>
                  </a-timeline>
                </a-col>
              </a-row>


              <!--              <a-row type="flex" justify="start" align="middle">-->
              <!--                <a-col :span="4" :offset="2">-->
              <!--                  初评等级-->
              <!--                </a-col>-->
              <!--                <a-col :span="8">-->
              <!--                  <a-form-item>-->
              <!--                    <j-dict-radio-tag v-model="model.cpdj" dictCode="pjsx_pddj" disabled/>-->
              <!--                  </a-form-item>-->
              <!--                </a-col>-->
              <!--              </a-row>-->

              <!--          <a-row justify="start" align="middle" style="margin-bottom: 20px">-->
              <!--            <a-col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }">-->
              <!--              模型评定等级：<a-input size="small"   style="border:hidden;width: 100px;" v-model="pjsxxx.xtpddj" />-->
              <!--            </a-col>-->
              <!--            <a-col :xs="{ span: 11, offset: 1 }" :lg="{ span: 6, offset: 2 }">-->
              <!--              模型授信额度：<a-input size="small"   style="border:hidden;width: 100px;" v-model="pjsxxx.xtsxed" /> (万元)-->
              <!--            </a-col>-->
              <!--          </a-row>-->
              <a-row justify="start" align="middle">
                <a-col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }">
                  <a-form-item label="">
                    <font bold color="red"> <strong>信用产品：</strong></font>
                    <j-dict-select-tag @change="changeCpzl" style="width: 100px;" size="small" :triggerChange="true"
                                       v-decorator="['cpzl', { rules: [{ required: true, message: '请选择信用产品!' }] } ]"
                                       dictCode="ly_xend_cpzl"/>
                  </a-form-item>
                </a-col>
                <a-col :xs="{ span: 11, offset: 1 }" :lg="{ span: 6, offset: 2 }">

                  <a-form-item>
                    <font bold color="red"><strong>信用产品利率：</strong></font>
                    <a-input-number size="small"
                                    style="border:hidden;width: 100px;border-bottom: 1px solid #ddd;"
                                    v-decorator="['cpzlll', { rules: [{ required: true, message: '请输入信用产品利率!' }] } ]"/>
                    (万元)
                  </a-form-item>
                </a-col>
              </a-row>


              <a-row justify="start" align="middle">
                <a-col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }">
                  <a-form-item label="">
                    <font bold color="red"> <strong>申请评定等级：</strong></font>
                    <j-dict-select-tag @change="changeZzsxed" style="width: 100px;" size="small" :triggerChange="true"
                                       v-decorator="['zzpddj', { rules: [{ required: true, message: '请选择最终评定等级!' }] } ]"
                                       dictCode="pjsx_pddj"/>
                  </a-form-item>
                </a-col>
                <a-col :xs="{ span: 11, offset: 1 }" :lg="{ span: 8, offset: 2 }">

                  <a-form-item>
                    <font bold color="red"><strong>申请授信额度：{{zded}}</strong></font>
                    <a-input-number :min="this.min" :max="this.max" size="small"
                                    style="border:hidden;width: 100px;border-bottom: 1px solid #ddd;"
                                    v-decorator="['zzsxed', { rules: [{ required: true, message: '请输入最终授信额度!' }] } ]"/>
                    (万元)
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row type="flex" justify="start" align="middle">
                <a-col :span="12" :offset="2">
                  <a-form-item>
                    <font bold color="red"> <strong>评定意见:</strong></font>
                    <a-textarea :rows="4" v-decorator="['yj', { rules: [{ required: true, message: '请填写评定意见!' }] } ]"/>
                  </a-form-item>
                </a-col>

              </a-row>
              <a-row>
                <a-col :span="4" :offset="2">
                  <a-form-item>
                    <div style="font-size:12px; text-align:left; padding-left:20px;padding-bottom:20px">
                      <strong>客户经理签字：</strong>
                      <div id="khjlImg">
                        <span @click="innerVisiblekhjl = true"><img :src="valueKhjl" width="120" height="50"></span>
                      </div>
                    </div>
                    <div class="item" style="text-align: center">
                      <a-modal
                        width="900px"
                        title="客户经理签字"
                        :visible.sync="innerVisiblekhjl"
                        @cancel="innerVisiblekhjl = false"
                        @ok="innerVisiblekhjl = false"
                      >
                        <div id="khjlqm">
                          <sign-canvas class="sign-canvas" ref="SignCanvas" :options="options" v-model="valueKhjl"/>
                          <div class="sign-btns">
                            <span id="khjlclear" @click="canvasClear()">清空</span>
                            <span id="khjlsave" @click="saveAsImg('khjl')">生成</span>
                          </div>
                        </div>
                      </a-modal>
                    </div>
                  </a-form-item>
                </a-col>

                <a-col :span="4" :offset="2">
                  <a-form-item>
                    <div style="font-size:12px; text-align:left; padding-left:20px;padding-bottom:20px">
                      <strong>风险经理签字：</strong>
                      <div id="fxjlImg">
                        <span @click="innerVisiblefxjl = true"><img :src="valueFxjl" width="120" height="50"></span>
                      </div>
                    </div>
                    <div class="item" style="text-align: center">
                      <a-modal
                        width="900px"
                        title="风险经理签字"
                        :visible.sync="innerVisiblefxjl"
                        @cancel="innerVisiblefxjl = false"
                        @ok="innerVisiblefxjl = false"
                      >
                        <div id="fxjlqm">
                          <sign-canvas class="sign-canvas" ref="SignCanvas" :options="options" v-model="valueFxjl"/>
                          <div class="sign-btns">
                            <span id="fxjlclear" @click="canvasClear()">清空</span>
                            <span id="fxjlsave" @click="saveAsImg('fxjl')">生成</span>
                          </div>
                        </div>
                      </a-modal>
                    </div>
                  </a-form-item>
                </a-col>

                <a-col :span="4" :offset="2">
                  <a-form-item>
                    <div style="font-size:12px; text-align:left; padding-left:20px;padding-bottom:20px">
                      <strong>支行行长签字：</strong>
                      <div id="zhhzImg">
                        <span @click="innerVisiblezhhz = true"><img :src="valueZhhz" width="120" height="50"></span>
                      </div>
                    </div>
                    <div class="item" style="text-align: center">
                      <a-modal
                        width="900px"
                        title="支行行长签字"
                        :visible.sync="innerVisiblezhhz"
                        @cancel="innerVisiblezhhz = false"
                        @ok="innerVisiblezhhz = false"
                      >
                        <div id="zhhzqm">
                          <sign-canvas class="sign-canvas" ref="SignCanvas" :options="options" v-model="valueZhhz"/>
                          <div class="sign-btns">
                            <span id="zhhzclear" @click="canvasClear()">清空</span>
                            <span id="zhhzsave" @click="saveAsImg('zhhz')">生成</span>
                          </div>
                        </div>
                      </a-modal>
                    </div>
                  </a-form-item>
                </a-col>
              </a-row>

              <!--<a-button type="primary" block :loading="loading" @click="calculation">
                {{csbtname}}
              </a-button>-->
            </a-card>

          </a-tab-pane>


          <a-tab-pane tab="客户基本信息" key="1" :forceRender="true">
            <a-row class="form-row" :gutter="16">

              <a-col :lg="8">
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属支行">
                  <j-dict-select-tag style="width: 100%;" v-model="formData.sszh"
                                     dict-code="HR_BAS_ORGANIZATION,zzjc,zzbz" disabled/>

                </a-form-item>
              </a-col>

              <a-col :lg="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="所属网格">
                  <j-dict-select-tag style="width: 100%;" v-model="formData.wgbh"
                                     dict-code="yxdygl_main,wgmc,wgbh" disabled/>

                </a-form-item>
              </a-col>

              <a-col :lg="8">
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属客户经理">
                  <j-dict-select-tag style="width: 100%;" v-model="formData.sskhjl"
                                     dict-code="HR_BAS_STAFF,YGXM,YGGH"/>
                </a-form-item>
              </a-col>

              <a-col :lg="8">
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户名称">
                  <a-input style="width: 100%;" v-model="formData.khmc"/>
                </a-form-item>
              </a-col>

              <a-col :lg="8">
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="证件号码">
                  <a-input style="width: 100%;" v-model="formData.zjhm"/>
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户性别">
                  <j-dict-select-tag style="width: 100%;" v-model="formData.xb" dictCode="sex"/>
                </a-form-item>
              </a-col>

              <a-col :lg="8">
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="婚姻状况">
                  <j-dict-select-tag style="width: 100%;" v-model="formData.hyzk"
                                     dict-code="hyzk_cj"/>
                </a-form-item>
              </a-col>

              <a-col :lg="8">
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="联系方式">
                  <a-input style="width: 100%;" v-model="formData.sjhm"/>
                </a-form-item>
              </a-col>

              <a-col :lg="8">
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="与户主关系">
                  <j-dict-select-tag v-model="formData.yhzgx" dictCode="yhzgx"/>
                </a-form-item>
              </a-col>

              <a-col :lg="8">
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="从事职业">
                  <j-dict-select-tag style="width: 100%;" v-model="formData.cszy"
                                     dict-code="cszy"/>
                </a-form-item>
              </a-col>


              <!--                <a-col :lg="8">-->
              <!--                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否授信对象">-->
              <!--                    <j-dict-select-tag   style="width: 100%;" v-model="formData.sfsxdx"  dict-code="sfbz"/>-->
              <!--                  </a-form-item>-->
              <!--                </a-col>-->


            </a-row>
            <a-row>
              <a-col :lg="8">
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="家庭住址">
                  <a-input style="width: 460px;" v-model="formData.zz"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-divider orientation="left" style="color: #1890FF;">备注信息</a-divider>
            <a-row type="flex" justify="start" align="middle">
              <a-col :span="2" :offset="1">
                采集备注信息:
              </a-col>
              <a-col :span="18">
                <a-form-item>
                  <a-textarea v-model="pjsxxx.bz" :autosize="{ minRows: 2, maxRows: 4 }"/>
                </a-form-item>
              </a-col>
            </a-row>
          </a-tab-pane>
          <a-tab-pane tab="家庭成员" key="2" :forceRender="true">
            <a-card class="card" :bordered="false">
              <a-button @click="AddNhxq" type="primary" icon="plus">新增</a-button>

              <a-table
                size="middle"
                :pagination="false"
                :columns="jtzycyxxTable.columns"
                :dataSource="jtzycyxxTable.dataSource"
                bordered>
                <span slot="jtAction" slot-scope="text, record">
                  <a-menu v-if="record.id != formData.id">
                  <a-menu-item>
                  <a-popconfirm title="确定删除吗?" @confirm="() => deleteJtcy(record.id)">
                                     <a-button type="primary">删除</a-button>
                </a-popconfirm>
              </a-menu-item>
                  </a-menu>
                </span>
              </a-table>
            </a-card>
          </a-tab-pane>

          <a-tab-pane tab="资产负债情况" key="3" :forceRender="true">
            <a-card>

              <a-divider orientation="left" style="color: #1890FF;">为收集户情况</a-divider>
              <a-row type="flex" justify="center" align="middle">
                <a-col :span="12" :offset="0">
                  <a-form-item>
                    <j-dict-radio-tag v-model="formData.sjhyy" dictCode="sjhyy"/>
                  </a-form-item>
                </a-col>
              </a-row>

              <a-divider orientation="left" style="color: #1890FF;">不予授信情况</a-divider>
              <a-row type="flex" justify="center" align="middle">
                <a-col :span="12" :offset="0">
                  <a-form-item>
                    <j-dict-select-tag v-model="formData.bysxqx" dictCode="bysxqk"/>
                  </a-form-item>
                </a-col>
              </a-row>

              <a-row>
                <a-divider orientation="left" style="color: #1890FF;">家庭资产情况</a-divider>
                <a-row>
                  <a-col :span="8" :offset="16">
                    <div style="text-align:right">
                      <span>(单位：住房/套、面积/㎡、万元/价值)</span>
                    </div>
                  </a-col>
                </a-row>
                <table border="border" style="width: 100%">
                  <tr>
                    <th colspan="5">固定资产</th>
                  </tr>
                  <tr>
                    <th>住房套数</th>
                    <th>面积</th>
                    <th>价值</th>
                    <th>其他固定资产</th>
                    <th>合计</th>
                  </tr>
                  <tr>
                    <td>
                      <a-input-number v-model="pjsxxx.gdzcZfts" @input.native="handleChange()"
                                      controls-position="right"></a-input-number>
                    </td>
                    <td>
                      <a-input-number v-model="pjsxxx.gdzcZfmj" controls-position="right"></a-input-number>
                    </td>
                    <td>
                      <a-input-number v-model="pjsxxx.gdzcZfjz" @blur="gzzcjs"
                                      controls-position="right"></a-input-number>
                    </td>
                    <td>
                      <a-input-number v-model="pjsxxx.gdzcQt" @blur="gzzcjs" controls-position="right"></a-input-number>
                    </td>
                    <td>
                      <a-input-number v-model="pjsxxx.gdzcHj"></a-input-number>
                    </td>

                  </tr>
                </table>

                <table border="border" style="width: 100%">
                  <tr>
                    <th colspan="6">流动资产</th>
                  </tr>
                  <tr>
                    <th>现金及我行存款</th>
                    <th>是否在他行开户</th>
                    <th>他行存款金额</th>
                    <th>应收款</th>
                    <th>其他流动资产</th>
                    <th>合计</th>
                  </tr>
                  <tr>
                    <td>
                      <a-input-number v-model="pjsxxx.ldzcXjjwhck" @blur="ldzcjs"
                                      controls-position="right"></a-input-number>
                    </td>
                    <td>
                      <j-dict-select-tag v-model="pjsxxx.ldzcSfthkh" dict-code="sfbz" width="100px"></j-dict-select-tag>
                    </td>
                    <td>
                      <a-input-number v-model="pjsxxx.ldzcThckje" @blur="ldzcjs"
                                      controls-position="right"></a-input-number>
                    </td>
                    <td>
                      <a-input-number v-model="pjsxxx.ldzcYsk" @blur="ldzcjs"
                                      controls-position="right"></a-input-number>
                    </td>
                    <td>
                      <a-input-number v-model="pjsxxx.ldzcQt" @blur="ldzcjs" controls-position="right"></a-input-number>
                    </td>
                    <td>
                      <a-input-number v-model="pjsxxx.ldzcHj"></a-input-number>
                    </td>
                  </tr>
                </table>
              </a-row>

              <a-row>
                <a-col :span="8" :offset="16">
                  <div style="text-align:right">
                    <a> <font style="color: #1E90FF;">家庭总资产(万元) : </font>
                      <a-input size="small" style="width: 100px" v-model="pjsxxx.zzchj"/>
                    </a>
                  </div>
                </a-col>
              </a-row>

              <a-row>
                <a-divider orientation="left" style="color: #1890FF;">家庭负债情况</a-divider>
                <table border="border" style="width: 100%">

                  <tr>
                    <th>我行借款</th>
                    <th>他行借款</th>
                    <th>私人或其他借款</th>
                    <th>应付款</th>
                    <th>为他人担保</th>
                    <th>其他负债</th>
                    <th>负债合计</th>
                  </tr>
                  <tr>
                    <td>
                      <a-input-number v-model="pjsxxx.fzWhjk" @blur="fzjs" controls-position="right"></a-input-number>
                    </td>
                    <td>
                      <a-input-number v-model="pjsxxx.fzQtyhjk" @blur="fzjs" controls-position="right"></a-input-number>
                    </td>
                    <td>
                      <a-input-number v-model="pjsxxx.fzSrjkhqtjk" @blur="fzjs"
                                      controls-position="right"></a-input-number>
                    </td>
                    <td>
                      <a-input-number v-model="pjsxxx.fzYfk" @blur="fzjs" controls-position="right"></a-input-number>
                    </td>
                    <td>
                      <a-input-number v-model="pjsxxx.fzWtrdb" @blur="fzjs" controls-position="right"></a-input-number>
                    </td>
                    <td>
                      <a-input-number v-model="pjsxxx.fzQtfz" @blur="fzjs" controls-position="right"></a-input-number>
                    </td>
                    <td>
                      <a-input-number v-model="pjsxxx.fzHj"></a-input-number>
                    </td>
                  </tr>
                </table>
              </a-row>

              <a-row>
                <a-col :span="8" :offset="16">
                  <div style="text-align:right">
                    <a> <font style="color: #1E90FF;">家庭净资产(万元) : </font>
                      <a-input size="small" style="width: 100px" v-model="pjsxxx.jtjzc"/>
                    </a>
                  </div>
                </a-col>
              </a-row>

              <a-row>
                <a-divider orientation="left" style="color: #1890FF;">家庭收支情况(调查日前一年度或预测本年度家庭收入支出情况)</a-divider>
                <table border="border" style="width: 100%">
                  <tr>
                    <th colspan="6">收入</th>
                  </tr>
                  <tr>
                    <th>种植</th>
                    <th>养殖</th>
                    <th>劳务</th>
                    <th>经营收入</th>
                    <th>其他收入</th>
                    <th>合计</th>
                  </tr>
                  <tr>
                    <td>
                      <a-input-number v-model="pjsxxx.srZz" @blur="srjs" controls-position="right"></a-input-number>
                    </td>
                    <td>
                      <a-input-number v-model="pjsxxx.srYz" @blur="srjs" controls-position="right"></a-input-number>
                    </td>
                    <td>
                      <a-input-number v-model="pjsxxx.srLw" @blur="srjs" controls-position="right"></a-input-number>
                    </td>
                    <td>
                      <a-input-number v-model="pjsxxx.srGsy" @blur="srjs" controls-position="right"></a-input-number>
                    </td>
                    <td>
                      <a-input-number v-model="pjsxxx.srQtsr" @blur="srjs" controls-position="right"></a-input-number>
                    </td>
                    <td>
                      <a-input-number v-model="pjsxxx.srHj"></a-input-number>
                    </td>
                  </tr>
                </table>


                <table border="border" style="width: 100%">
                  <tr>
                    <th colspan="7">支出</th>
                  </tr>
                  <tr>
                    <th>教育</th>
                    <th>医疗</th>
                    <th>养老</th>
                    <th>生产成本</th>
                    <th>日常生活</th>
                    <th>其他支出</th>
                    <th>合计</th>
                  </tr>
                  <tr>
                    <td>
                      <a-input-number v-model="pjsxxx.zcJy" @blur="zcjs" controls-position="right"></a-input-number>
                    </td>
                    <td>
                      <a-input-number v-model="pjsxxx.zcYl" @blur="zcjs" controls-position="right"></a-input-number>
                    </td>
                    <td>
                      <a-input-number v-model="pjsxxx.zcYlao" @blur="zcjs" controls-position="right"></a-input-number>
                    </td>
                    <td>
                      <a-input-number v-model="pjsxxx.zcSccb" @blur="zcjs" controls-position="right"></a-input-number>
                    </td>
                    <td>
                      <a-input-number v-model="pjsxxx.zcRcsh" @blur="zcjs" controls-position="right"></a-input-number>
                    </td>
                    <td>
                      <a-input-number v-model="pjsxxx.zcQtzc" @blur="zcjs" controls-position="right"></a-input-number>
                    </td>
                    <td>
                      <a-input-number v-model="pjsxxx.zcHj"></a-input-number>
                    </td>
                  </tr>
                </table>
              </a-row>

              <a-row>
                <a-col :span="8" :offset="16">
                  <div style="text-align:right">
                    <a> <font style="color: #1E90FF;">家庭净收入(万元) : </font>
                      <a-input size="small" style="width: 100px" v-model="pjsxxx.jtjsr"/>
                    </a>
                  </div>
                </a-col>
              </a-row>

            </a-card>
          </a-tab-pane>

          <a-tab-pane tab="社会声誉" key="4" :forceRender="true">
            <div>
              <a-row type="flex" justify="center" align="middle">
                <a-col :span="10" :offset="1">
                  家庭成员是否有不良嗜好（黄赌毒、酗酒、偷盗、传销、沉迷于其他不良活动）:
                </a-col>
                <a-col :span="11" :offset="0">
                  <a-form-item>
                    <j-dict-radio-tag v-model="pjsxxx.shsyBlsh" dict-code="sfbz"></j-dict-radio-tag>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row type="flex" justify="center" align="middle">
                <a-col :span="10" :offset="1">
                  家庭成员是否勤快:
                </a-col>
                <a-col :span="11" :offset="0">
                  <a-form-item>
                    <j-dict-radio-tag v-model="pjsxxx.shsySfqk" dict-code="jtcysfqk"></j-dict-radio-tag>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row type="flex" justify="center" align="middle">
                <a-col :span="10" :offset="1">
                  家庭成员是否有民间高息贷款:
                </a-col>
                <a-col :span="11" :offset="0">
                  <a-form-item>
                    <j-dict-radio-tag v-model="pjsxxx.shsySfygld" dict-code="jtcysfgxdk"></j-dict-radio-tag>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row type="flex" justify="center" align="middle">
                <a-col :span="10" :offset="1">
                  家庭成员是否有打架，闹事等不良行为:
                </a-col>
                <a-col :span="11" :offset="0">
                  <a-form-item>
                    <j-dict-radio-tag v-model="pjsxxx.shsySfdjns" dict-code="jtcysfyblxw"></j-dict-radio-tag>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row type="flex" justify="center" align="middle">
                <a-col :span="10" :offset="1">
                  家庭成员领取补助情况:
                </a-col>
                <a-col :span="11" :offset="0">
                  <a-form-item>
                    <j-dict-radio-tag v-model="pjsxxx.shsySflqbz" dict-code="shsy_sflqbz"></j-dict-radio-tag>
                    &nbsp&nbsp
                    <a-input size="mini" v-if="pjsxxx.shsySflqbz =='4'" placeholder="其他补助情况" v-model="pjsxxx.qtbzqk"
                             style="width: 320px;"/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row type="flex" justify="center" align="middle">
                <a-col :span="10" :offset="1">
                  家庭成员建档立卡贫困户情况:
                </a-col>
                <a-col :span="11" :offset="0">
                  <a-form-item>
                    <j-dict-radio-tag v-model="pjsxxx.sfjdlkpkh" dict-code="sfbz"></j-dict-radio-tag>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row type="flex" justify="center" align="middle">
                <a-col :span="10" :offset="1">
                  家庭成员是否有刑事犯罪记录:
                </a-col>
                <a-col :span="11" :offset="0">
                  <a-form-item>
                    <j-dict-radio-tag v-model="pjsxxx.shsySfxsfz" dict-code="sfbz"></j-dict-radio-tag>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row type="flex" justify="center" align="middle">
                <a-col :span="10" :offset="1">
                  家庭成员是否涉诉:
                </a-col>
                <a-col :span="11" :offset="0">
                  <a-form-item>
                    <j-dict-radio-tag v-model="pjsxxx.shsySfss" dict-code="sfbz"></j-dict-radio-tag>
                  </a-form-item>
                </a-col>
              </a-row>
            </div>
            <a-divider orientation="left" style="color: #1890FF;">对户主评价</a-divider>

            <div>
              <a-row type="flex" justify="start" align="middle">
                <a-col :span="4" :offset="2">
                  品行评价:
                </a-col>
                <a-col :span="6">
                  <a-form-item>
                    <j-dict-radio-tag v-model="pjsxxx.dhzpjPxpj" dict-code="grdk_khpx"></j-dict-radio-tag>
                  </a-form-item>
                </a-col>
              </a-row>

              <a-row type="flex" justify="start" align="middle">
                <a-col :span="4" :offset="2">
                  信用评价
                </a-col>
                <a-col :span="6">
                  <a-form-item>
                    <j-dict-radio-tag v-model="pjsxxx.dhzpjXypj" dictCode="grdk_khpx"/>
                  </a-form-item>
                </a-col>
              </a-row>
            </div>
            <a-divider orientation="left" style="color: #1890FF;">初评等级</a-divider>
            <a-row type="flex" justify="start" align="middle">
              <a-col :span="4" :offset="2">
                初评等级
              </a-col>
              <a-col :span="8">
                <a-form-item>
                  <j-dict-radio-tag v-model="pjsxxx.cpdj" @change="changeZzsxed" dictCode="pjsx_pddj"/>
                </a-form-item>
              </a-col>
            </a-row>

            <!--            <a-row type="flex" justify="start" align="middle">-->
            <!--              <a-col :span="4" :offset="2">-->
            <!--                客户经理授信额度（万元）-->
            <!--              </a-col>-->
            <!--              <a-col :span="8">-->
            <!--                <a-form-item>-->
            <!--                  <a-input-->
            <!--                    style="width: 150px;" :min="this.min" :max="this.max" v-model="pjsxxx.zzsxed">-->
            <!--                  </a-input>-->
            <!--                </a-form-item>-->
            <!--              </a-col>-->
            <!--            </a-row>-->

          </a-tab-pane>
          <a-tab-pane tab="附件信息" key="7" :forceRender="true">
            <!--            <photo-view ref="fjxxUpload"  @getImageData="imageData"/>-->
            <photo-edit ref="photoFj" :zjhm="formData.zjhm" @getImageData="imageData"></photo-edit>
          </a-tab-pane>

          <a-tab-pane tab="确认书签字" key="8" :forceRender="true">
            <qrsqz ref="qrsqz" @getQrsSignBase64="getQrsSignBase64"></qrsqz>
          </a-tab-pane>

          <a-tab-pane tab="签署协议" key="9" :forceRender="true">
            <zxsqxy ref="zxsqxy" @getSignBase64="getSignBase64"></zxsqxy>
          </a-tab-pane>

          <a-tab-pane tab="与我行业务" key="6" :forceRender="true">
            <a-card class="card" :bordered="false">
              <!--<a-list-item class="DefaultListItem" term="存贷款情况">存贷款情况</a-list-item>-->
              <a-divider orientation="left" style="color: #1890FF; margin-top: 0px;">与我行业务关系(家庭总计)</a-divider>
              <a-row class="form-row" :gutter="16">
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="存款余额">
                    <a-input-number placeholder="0.00" v-model="hj.ckye" :min="0" style="width: 100%;" disabled/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="其中定期">
                    <a-input-number placeholder="0.00" v-model="hj.dqckye" :min="0" style="width: 100%;" disabled/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="当年存款日平">
                    <a-input-number placeholder="0.00" v-model="hj.cknrpye" :min="0" style="width: 100%;" disabled/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row class="form-row" :gutter="16">
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="贷款金额">
                    <a-input-number placeholder="0.00" v-model="hj.dkje" :min="0" style="width: 100%;" disabled/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="贷款余额">
                    <a-input-number placeholder="0.00" v-model="hj.dkye" :min="0" style="width: 100%;" disabled/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="表内不良贷款">
                    <a-input-number placeholder="0.00" v-model="hj.bldkye" :min="0" style="width: 100%;" disabled/>
                  </a-form-item>
                </a-col>


              </a-row>
              <a-row class="form-row" :gutter="16">
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="表外不良贷款">
                    <a-input-number placeholder="0.00" v-model="hj.bwbldkye" :min="0" style="width: 100%;" disabled/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="手机银行数">
                    <a-input-number placeholder="0.00" v-model="hj.sjyhsl" :min="0" style="width: 100%;" disabled/>
                  </a-form-item>
                </a-col>

                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="网上银行数">
                    <a-input-number placeholder="0.00" v-model="hj.wsyhsl" :min="0" style="width: 100%;" disabled/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row class="form-row" :gutter="16">
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="社保卡数">
                    <a-input-number placeholder="0.00" v-model="hj.sbksl" :min="0" style="width: 100%;" disabled/>
                  </a-form-item>
                </a-col>

                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="ETC数">
                    <a-input-number placeholder="0.00" v-model="hj.etssl" :min="0" style="width: 100%;" disabled/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-card title="家庭成员明细" :bordered="true">
                <!--                <j-editable-table
                                  disabled
                                  :loading="ywhywxxTable.loading"
                                  :columns="ywhywxxTable.columns"
                                  :dataSource="ywhywxxTable.dataSource"
                                  :maxHeight="300"
                                  :rowNumber="true"
                                  :rowSelection="true"
                                  :actionButton="false" />-->

                <a-table
                  size="middle"
                  :pagination="false"
                  :columns="ywhywxxTable.columns"
                  :dataSource="ywhywxxTable.dataSource"
                  bordered>

                </a-table>

              </a-card>
            </a-card>
          </a-tab-pane>
        </a-tabs>

        <add-nhxq ref="addNhxq" @ok="getByHhbm"></add-nhxq>
      </a-form>

    </a-spin>


  </j-modal>


</template>

<script>
  import {httpAction, putAction, getAction, postAction, postActionJson} from '@/api/manage'
  import JMultiSelectTag from '@comp/dict/JMultiSelectTag.vue'
  import PhotoEdit from './PhotoEdit.vue'
  import JEditableTable from '@comp/jeecg/JEditableTable.vue'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import {FormTypes} from '@/utils/JEditableTableUtil'
  import JDictRadioTag from '@comp/dict/JDictRadioTag.vue'
  import store from '@/store/'
  import pick from 'lodash.pick'
  import moment from 'moment'
  import AddNhxq from '@views/xdgl/xdall/modules/addNhxq'
  import Qrsqz from './Qrsqz.vue'
  import Zxsqxy from './Zxsqxy.vue'
  import AFormItem from "ant-design-vue/es/form/FormItem";

  export default {
    components: {AFormItem, AddNhxq, JDictRadioTag, JEditableTable, PhotoEdit, JMultiSelectTag, Qrsqz, Zxsqxy},
    mixins: [JeecgListMixin],
    computed: {
      pre: function () {
        return `${window._CONFIG['staticDomainURL']}/`
      }
    },
    data() {
      return {
        uploadAction: window._CONFIG['domianURL'] + '/sys/common/upload',
        dafactivekey: '1',
        workNo: '',
        activeKey: '1',
        bntloading: false,
        confirmLoading: false,
        disableSubmit: false,
        title: '编辑',
        visible: false,
        formData: {},
        model: {},
        pjsxxx: {},
        imageBaseKhjl: '',
        imageBaseFxjl: '',
        imageBaseZhhz: '',
        innerVisiblekhjl: false,
        valueKhjl: null,
        innerVisiblefxjl: false,
        valueFxjl: null,
        innerVisiblezhhz: false,
        valueZhhz: null,
        options: {
          canvasWidth: 800, //canvas宽高 [Number] 可选
          canvasHeight: 300,  //高度  [Number] 可选
          isSign: true, //签名模式 [Boolean] 默认为非签名模式,有线框, 当设置为true的时候没有任何线框
          isShowBorder: false, //是否显示边框 [可选]
        },
        form: this.$form.createForm(this),
        // 家庭主要成员信息
        jtzycyxxTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '姓名',
              key: 'khmc',
              align: 'center',
              dataIndex: 'khmc'

            },
            {
              title: '身份证号',
              key: 'zjhm',
              align: 'center',
              dataIndex: 'zjhm'

            },
            {
              title: '从事职业',
              key: 'cszy',
              align: 'center',
              dataIndex: 'cszy_dictText'
            },

            {
              title: '联系电话',
              key: 'sjhm',
              dataIndex: 'sjhm',
              align: 'center'
            },
            {
              title: '与被评价人关系',
              key: 'yhzgx',
              align: 'center',
              dataIndex: 'yhzgx_dictText'
            },
            {
              title: '操作',
              dataIndex: 'jtAction',
              align: "center",
              scopedSlots: {customRender: 'jtAction'},
              width: 200, fixed: 'right',
            }

          ]
        },
        ywhywxxTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '姓名',
              key: 'khmc',
              align: 'center',
              dataIndex: 'khmc'
            },
            {
              title: '证件号码',
              key: 'zjhm',
              align: 'center',
              dataIndex: 'zjhm'
            },
            {
              title: '存款余额',
              key: 'ckye',
              align: 'center',
              dataIndex: 'ckye'
            },
            {
              title: '其中定期',
              key: 'dqckye',
              align: 'center',
              dataIndex: 'dqckye'
            },
            {
              title: '当年存款日平',
              key: 'cknrpye',
              align: 'center',
              dataIndex: 'cknrpye'
            },
            {
              title: '贷款金额',
              key: 'dkje',
              align: 'center',
              dataIndex: 'dkje'
            },
            {
              title: '贷款余额',
              key: 'dkye',
              align: 'center',
              dataIndex: 'dkye'
            },
            {
              title: '表内不良贷款',
              key: 'bldkye',
              align: 'center',
              dataIndex: 'bldkye'
            },
            {
              title: '表外不良贷款',
              key: 'bwbldkye',
              align: 'center',
              dataIndex: 'bwbldkye'
            },
            {
              title: '是否开通手机银行',
              key: 'sfktsjyhyw',
              align: 'center',
              dataIndex: 'sfktsjyhyw'

            },
            {
              title: '是否开通网上银行',
              key: 'sfktwsyhyw',
              align: 'center',
              dataIndex: 'sfktwsyhyw_dictText'
            },
            {
              title: '是否开通社保卡',
              key: 'sfktsbk',
              align: 'center',
              dataIndex: 'sfktsbk_dictText'
            },
            {
              title: '是否办理ETC',
              key: 'sfbletcyw',
              align: 'center',
              dataIndex: 'sfbletcyw_dictText'
            }
          ]
        },
        splsTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '审批人',
              key: 'yggh',
              align: 'center',
              dataIndex: 'yggh_dictText'

            },
            {
              title: '评定等级',
              key: 'pddj',
              align: 'center',
              dataIndex: 'pddj'

            },
            {
              title: '建议额度(万元)',
              key: 'jyed',
              align: 'center',
              dataIndex: 'jyed'

            },
            {
              title: '信用产品',
              key: 'jyed',
              align: 'center',
              dataIndex: 'cpzl_dictText'

            },
            {
              title: '信用产品利率',
              key: 'pddj',
              align: 'center',
              dataIndex: 'cpzlll'

            },
            {
              title: '审批意见',
              key: 'spyj',
              align: 'center',
              dataIndex: 'spyj'
            },
            {
              title: '审批结果',
              key: 'status',
              align: 'center',
              dataIndex: 'status_dictText'
            },
            {
              title: '审批时间',
              key: 'createTime',
              align: 'center',
              dataIndex: 'createTime'
              // customRender: function (text) {
              //   return !text ? "" : (text.length > 10 ? text.substr(0, 10) : text)
              // },
            }
          ]
        },
        hj: {},

        labelCol: {
          xs: {span: 24},
          sm: {span: 8}
        },
        wrapperCol: {
          xs: {span: 24},
          sm: {span: 12}
        },
        min: 0,
        max: 30,
        max2: 0,
        showQtbzxx: false,
        qmList: [],
        fxjlStr: '',
        zhhzStr: '',
        ipagination: {
          current: 1,
          pageSize: 10,
          pageSizeOptions: ['10', '20', '30'],
          showTotal: (total, range) => {
            return range[0] + '-' + range[1] + ' 共' + total + '条'
          },
          showQuickJumper: true,
          showSizeChanger: true,
          total: 0
        },
        valType: true,
        cpzllls: [],
        zded: '',
        imagesList: [],
        deleteFileList: [],

      }
    },
    created() {
      this.workNo = store.getters.userInfo.workNo
    },
    methods: {
      /**
       * 清除画板
       */
      canvasClear() {
        this.$refs.SignCanvas.canvasClear();
      },

      /**
       * 保存图片
       */
      saveAsImg(val) {
        if (val == 'khjl') {
          const img = this.$refs.SignCanvas.saveAsImg();
          this.innerVisiblekhjl = false;
          this.imageBaseKhjl = img;
          //this.formData.khjlqz = this.imageBaseKhjl
          //this.$emit('getQrsSignBase64', {imageBaseKhjl: this.imageBaseKhjl})
        } else if (val == 'fxjl') {
          const img = this.$refs.SignCanvas.saveAsImg();
          this.innerVisiblefxjl = false;
          this.imageBaseFxjl = img;
          //this.formData.fxjlqz = this.imageBaseFxjl
          //this.$emit('getQrsSignBase64',{imageBaseFxjl: this.imageBaseFxjl})
        } else {
          const img = this.$refs.SignCanvas.saveAsImg();
          this.innerVisiblezhhz = false;
          this.imageBaseZhhz = img;
          //this.formData.zhhzqz = this.imageBaseZhhz
          //this.$emit('getQrsSignBase64',{imageBaseZhhz: this.imageBaseZhhz})
        }
      },
      imageData(data) {
        console.log("附件信息")
        console.log(data)
        let _this = this;
        //提交附件信息-信息
        if (data) {
          if (data.uploadFilesHzfjxx != undefined && data.uploadFilesHzfjxx.length > 0) {
            for (let i = 0; i < data.uploadFilesHzfjxx.length; i++) {
              data.uploadFilesHzfjxx[i].zlbh = data.uploadFilesHzfjxx[i].zlbh ? data.uploadFilesHzfjxx[i].zlbh : '';
              data.uploadFilesHzfjxx[i].uid = data.uploadFilesHzfjxx[i].uid;
              data.uploadFilesHzfjxx[i].zllx = data.uploadFilesHzfjxx[i].zllx;
              data.uploadFilesHzfjxx[i].zldx = data.uploadFilesHzfjxx[i].size;
              data.uploadFilesHzfjxx[i].fwlj = data.uploadFilesHzfjxx[i].fwlj;
              data.uploadFilesHzfjxx[i].zlmc = data.uploadFilesHzfjxx[i].name;
              data.uploadFilesHzfjxx[i].hhbm = this.formData.hhbm;
              data.uploadFilesHzfjxx[i].hmcId = this.formData.id;
              data.uploadFilesHzfjxx[i].qydm = this.formData.wgbh;
              data.uploadFilesHzfjxx[i].zjhm = this.formData.zjhm;

            }
            for (let i = 0; i < this.imagesList.length; i++) {
              if (this.imagesList[i].zllx == data.uploadFilesHzfjxx[0].zllx) {
                this.imagesList.splice(i, 1);
                i--;
              }
            }
            for (let i = 0; i < data.uploadFilesHzfjxx.length; i++) {
              this.imagesList.push(data.uploadFilesHzfjxx[i]);
            }
            for (let i = 0; i < this.imagesList.length; i++) {
              if (data.deleteFilesHzfjxx != undefined && data.deleteFilesHzfjxx.length > 0) {
                for (let y = 0; y < data.deleteFilesHzfjxx.length; y++) {
                  if (this.imagesList[i].uid == data.deleteFilesHzfjxx[y].file.uid) {
                    this.imagesList.splice(i, 1);
                  }
                }
              }
            }
          }
          for (let i = 0; i < data.deleteFilesHzfjxx.length; i++) {
            if (data.deleteFilesHzfjxx[i].file.zlbh) {
              this.deleteFileList.push({zlbh: data.deleteFilesHzfjxx[i].file.zlbh})
            }
          }
        }
      },
      getQrsSignBase64(val) {
        this.formData.sign1 = val.imageBaseQrs;
      },
      getSignBase64(val) {
        this.formData.sign2 = val.imageBaseBr;
        this.formData.sign3 = val.imageBasePo;
      },
      getCpzllls() {
        getAction("/sys/dict/getDictItems/ly_xend_cpzlll").then(res => {
          if (res.success) {
            this.cpzllls = res.result
          }
        })
      },

      AddNhxq() {
        this.$refs.addNhxq.addJtcy(this.formData)
        this.$refs.addNhxq.title = '新增家庭成员'
      },
      deleteJtcy(val) {
        getAction("/khflgl/nhxq/removeHhbmById", {id: val}).then(res => {
          this.successInfo('成功')
          this.getByHhbm()
        })
      },
      changeCpzl(val) {
        if (val === '6' || val === '13' || val === '14') {
          this.zded = 'A等级额度升为50万';
          this.max2 = 50
          this.max = 50
        } else if (val === '7') {
          this.zded = 'A等级额度升为40万';
          this.max2 = 40
          this.max = 40
        } else {
          this.zded = '';
          this.max2 = 30
          this.max = 30
        }

        let flag = true;
        for (let i = 0; i < this.cpzllls.length; i++) {
          let obj = this.cpzllls[i];
          if (flag && val === obj.value) {
            this.form.setFieldsValue({
              cpzlll: obj.text
            })
            flag = false
          }
        }
        if (flag) {
          this.form.setFieldsValue({
            cpzlll: ''
          })
        }
      },

      changeZzsxed: function (value) {
        // 将选定值绑定至下拉选择框
        if (value == 'A') {
          this.min = 21
          if (this.max2 > 0) {
            this.max = this.max2
          } else {
            this.max = 30
          }
        } else if (value == 'B') {
          this.min = 11
          this.max = 20
        } else if (value == 'C') {
          this.min = 6
          this.max = 10
        } else if (value == 'D') {
          this.min = 1
          this.max = 5
        } else if (value == 'E') {
          this.min = 0
          this.max = 0
        }
      },
      edit(record, val) {
        this.formData = record
        this.visible = true

        this.dafactivekey = val
        this.activeKey = val

        if (val == '0') {
          this.loadspls()
          this.form.resetFields()
          this.model = Object.assign({}, record)
          this.$nextTick(() => {
            this.form.setFieldsValue(pick(this.model, 'cpdj', 'zzpddj', 'zzsxed', 'yj', 'cpzl', 'cpzlll'))
          })

        } else if (val == '1') {

        }

        if (record.zzpddj) {
          this.changeZzsxed(record.zzpddj)
        }

        /* this.qmList = []
        if (record.sign1) {
          this.qmList.push(record.sign1)
        }
        if (record.sign2) {
          this.qmList.push(record.sign2)
        }
        if (record.sign3) {
          this.qmList.push(record.sign3)
        } */


        this.loadPjsx()
        this.getByHhbm()
        this.loadYwh()
        //this.loadfj()
        this.loadfxjl()
        this.loadzhhz()
        this.getCpzllls()
        this.getSignBase64020()
      },
      getSignBase64020() {
        getAction("xend/pad/signBase64020", {id: this.formData.id}).then(res => {
          if (res.success) {
            /*console.info('sign -',res.result);*/
            if (JSON.stringify(res.result) != "{}") {
              this.sign1 = res.result.sign1;
              this.sign2 = res.result.sign2;
              this.sign3 = res.result.sign3;
              this.khjlqz = res.result.khjlqz;
              this.fxjlqz = res.result.fxjlqz;
              this.zhhzqz = res.result.zhhzqz;
              this.$refs.zxsqxy.valueBr = this.sign2;
              this.$refs.zxsqxy.valuePo = this.sign3;
              this.$refs.qrsqz.value = this.sign1;
              this.valueKhjl = this.khjlqz;
              this.valueFxjl = this.fxjlqz;
              this.valueZhhz = this.zhhzqz;
            }
          }
        });
      },
      handleTableChange(pagination, filters, sorter) {
        this.ipagination = pagination
        let data = {
          'zjhm': this.formData.zjhm
          , 'pageNo': this.ipagination.current
          , 'pageSize': this.ipagination.pageSize
        }
        getAction('/nh/vNhPjsx/splsXend', data).then(res => {
          if (res.success) {
            this.splsTable.dataSource = res.result.records
            this.ipagination.total = res.result.total
          } else {
            this.dataSource = []
            this.ipagination.total = 0
          }

        })
      },

      loadspls() {
        if (this.formData.zjhm) {
          let params = {'zjhm': this.formData.zjhm}
          getAction('/nh/vNhPjsx/splsXend', params).then(res => {
            if (res.success) {
              this.splsTable.dataSource = res.result.records
              this.ipagination.total = res.result.total
            } else {
              this.dataSource = []
              this.ipagination.total = 0
            }
          })
        }
      },

      saveFjxx() {
        if (this.imagesList.length > 0) {
          postAction("/xend/pad/saveXendFjxx", this.imagesList).then(res => {

          })

          if (this.deleteFileList.length > 0) {
            postAction("/xend/pad/deleteXendFjxx", this.deleteFileList).then(res => {

            })
          }
          // saveXendFjxx(this.imagesList).then(function (res) {
          //   if (res.success) {
          //   } else {
          //     _this.$message({
          //       message: `添加图片失败`,
          //       type: 'error',
          //       duration: 2000
          //     })
          //   }
          // }).catch(function (error) {
          //   console.log(error);
          // });
        }
      },

      handleOk(val) {
        let formData = {
          ...this.formData
        }
        if (this.dafactivekey == '1') {
          postActionJson('/grpjsx/add', this.pjsxxx).then(res => {
          })

          this.saveFjxx();

          postActionJson('/khflgl/nhxq/editNhxq', formData).then((res) => {
            if (res.success) {
              this.successInfo('成功')
              this.$emit('ok')
              this.close()
            } else {
              this.successInfo('失败')
            }
          }).finally(() => {

          })
        } else if (this.dafactivekey == '0') {
          const that = this
          that.bntloading = true
          this.form.validateFields((err, values) => {
            if (!err) {
              console.log(values)

              that.confirmLoading = true
              let httpurl = '/nh/vNhPjsx/apply'

              let data = {
                zzpddj: values.zzpddj,
                zzsxed: values.zzsxed,
                yj: values.yj,
                cpzl: values.cpzl,
                cpzlll: values.cpzlll,
                id: that.formData.id,
                zjhm: that.formData.zjhm,
                sfsx: val,
                khjlqz: that.imageBaseKhjl,
                fxjlqz: that.imageBaseFxjl,
                zhhzqz: that.imageBaseZhhz
              }
              console.log("@@@@@@@@@@@@@@@@@@@@@@@" + data)
              putAction(httpurl, data).then((res) => {
                if (res.success) {
                  that.$emit('ok')
                } else {
                  that.$message.warning(res.message)
                }
              }).finally(() => {
                that.confirmLoading = false
                that.close()
                that.bntloading = false
              })
            } else {
              that.bntloading = false
              that.$message.error('请填写评定信息！')
            }
          })
        }

      },
      handleCancel() {
        this.close()
      },
      close() {
        this.jtzycyxxTable.dataSource = []
        this.$emit('close')
        this.visible = false
        this.activeKey = '1'
        this.dafactivekey = '1'
      },
      //加载农户信息
      loadNh(id) {

      },

      loadfxjl() {
        getAction('/sys/user/queryByCode', {type: '1'}).then(res => {
          if (res.success) {
            if (res.message) {
              this.fxjlStr = res.message
            }
          }
        })
      },
      loadzhhz() {
        getAction('/sys/user/queryByCode', {type: '2'}).then(res => {
          if (res.success) {
            if (res.message) {
              this.zhhzStr = res.message
            }
          }
        })
      },

      //加载家庭信息
      getByHhbm() {
        console.log("===getByHhbm===")
        console.log(this.formData.hhbm)
        if (this.formData.hhbm) {
          let params = {'hhbm': this.formData.hhbm}
          getAction('/khflgl/nhxq/getByHhbm', params).then(res => {
            if (res.success) {
              this.jtzycyxxTable.dataSource = res.result
            }
          })
        }
      },
      //加载评级授信信息
      loadPjsx() {
        getAction('/grpjsx/queryById', {id: this.formData.id}).then(res => {
          if (res.success) {
            this.pjsxxx = res.result
            if (!res.result.hmcId) {
              this.pjsxxx.hmcId = this.formData.id
              this.pjsxxx.hhbm = this.formData.hhbm
              this.pjsxxx.qybm = this.formData.wgbh
            }
          }
        })
      },
      //加载与我行关系
      loadYwh() {
        getAction('/nh/vNhPjsx/ywhywxx', {hhbm: this.formData.hhbm}).then(res => {
          if (res.success) {
            this.hj = res.result.hj
            this.ywhywxxTable.dataSource = res.result.list
          }
        })
      },
      //加载附件
      loadfj() {
        if (this.formData.zjhm) {
          /* let params = { 'zjhm': this.formData.zjhm }
          getAction('khgl/vKhglKrkhgl/img', params).then((res) => {
            if (res.success) {
              this.$refs.photoView.showImg(res.result)
            }
          }) */

          //this.$refs.photoFj.getFjxxData(this.formData.zjhm)
          //this.$refs.photoFj.test = '11111111111111111111111'

        }
      },

      //固定资产合计
      gzzcjs() {
        this.pjsxxx.gdzcHj = this.pjsxxx.gdzcZfjz + this.pjsxxx.gdzcQt
        this.zzcjs()
      },
      //家庭总资产
      zzcjs() {
        this.pjsxxx.zzchj = this.pjsxxx.gdzcHj + this.pjsxxx.ldzcHj
        this.jtjzcjs()
      },
      jtjzcjs() {
        this.pjsxxx.jtjzc = this.pjsxxx.zzchj - this.pjsxxx.fzHj
      },
      ldzcjs() {
        this.pjsxxx.ldzcHj = this.pjsxxx.ldzcXjjwhck + this.pjsxxx.ldzcThckje + this.pjsxxx.ldzcYsk + this.pjsxxx.ldzcQt
        this.zzcjs()
      },
      fzjs() {
        this.pjsxxx.fzHj = this.pjsxxx.fzWhjk + this.pjsxxx.fzQtyhjk + this.pjsxxx.fzSrjkhqtjk + this.pjsxxx.fzYfk
          + this.pjsxxx.fzWtrdb + this.pjsxxx.fzQtfz
        this.zzcjs()
      },
      srjs() {
        this.pjsxxx.srHj = this.pjsxxx.srZz + this.pjsxxx.srYz + this.pjsxxx.srLw + this.pjsxxx.srGsy + this.pjsxxx.srQtsr
        this.jsrjs()
      },
      jsrjs() {
        this.pjsxxx.jtjsr = this.pjsxxx.srHj - this.pjsxxx.zcHj
      },
      zcjs() {
        this.pjsxxx.zcHj = this.pjsxxx.zcJy + this.pjsxxx.zcYl + this.pjsxxx.zcYlao + this.pjsxxx.zcSccb + this.pjsxxx.zcRcsh
          + this.pjsxxx.zcQtzc
        this.jsrjs()
      }
    }
  }
</script>


<style scoped>
  .ant-form .ant-form-item {
    margin-bottom: 10px;
  }

  table {
    width: 100%;
    text-align: center;
    border-collapse: collapse;
    background-color: #FFFFFF;
    table-layout: fixed;
    border-color: #E8EAEC;
    margin-bottom: 5px;
  }

  td {
    height: 40px;
  }

  th {
    height: 40px;
  }

  * {
    margin: 0;
    padding: 0;
  }

  .sign-canvas {
    display: block;
    margin: 0 auto;
    border: 1px dashed #f00;
  }

  .view-image {
    display: block;
    margin: 20px auto;
  }

  .sign-btns {
    width: 800px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;

  #khjlclear,
  #fxjlclear,
  #zhhzclear,
  #fxjlsave,
  #zhhzsave,
  #clear1,
  #khjlsave {
    margin: 0 auto;
    display: inline-block;
    padding: 5px 10px;
    width: 150px;
    height: 40px;
    line-height: 40px;
    border: 1px solid #eee;
    background: #e1e1e1;
    border-radius: 10px;
    text-align: center;
    margin: 20px auto;
    cursor: pointer;
  }

  }
</style>