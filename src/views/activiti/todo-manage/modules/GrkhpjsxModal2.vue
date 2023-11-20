<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <j-modal
    :title="title"
    :width="1450"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :okButtonProps="{ props: {disabled: disableSubmit} }"
    :destroyOnClose="true"
    :fullscreen="false"
    switchFullscreen
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    <template slot="footer">

      <a-button key="back" @click="handleCancel">
        取消
      </a-button>
      <a-button key="submit" v-show="!disableSubmit"  type="primary" :loading="loading" @click="handleOk">
        确认通过
      </a-button>
    </template>
    <a-spin :spinning="confirmLoading">
      <!-- 主表单区域 -->
      <a-form :form="form">
        <a-tabs :default-active-key="dafactivekey" @change="handleChangeTab"  >
          <a-tab-pane  v-if="disableSubmit" tab="评定信息" key="8" :forceRender="true">
            <a-card title="评定及意见" style="height: 760px" :bordered="true">
              <a-row>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户名称">
                    <a-input  :disabled="true" style="width: 100%;" v-decorator="['khmc', {}]" />
                  </a-form-item>
                </a-col>

                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="证件号码">
                    <a-input :disabled="true" style="width: 100%;" v-decorator="['zjhm', {} ]" />
                  </a-form-item>
                </a-col>

              </a-row>
              <a-divider orientation="left" style="color: #1890FF;">模型测算结果</a-divider>
              <a-row justify="start" align="middle">
                <a-col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }">
                  模型测算得分：<a-input size="small" :disabled="true"  style="border:hidden;width: 100px;" v-model="this.model.xtpddf" />
                </a-col>
                <a-col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }">
                  模型评定等级：<a-input size="small" :disabled="true"  style="border:hidden;width: 100px;" v-model="this.model.xtpddj_dictText" />
                </a-col>
                <a-col :xs="{ span: 11, offset: 1 }" :lg="{ span: 6, offset: 2 }">
                  模型授信额度：<a-input size="small" :disabled="true"  style="border:hidden;width: 100px;" v-model="this.model.xtsxed" /> (万元)
                </a-col>
              </a-row>
              <a-divider orientation="left" style="color: #1890FF;">客户经理审批</a-divider>

              <a-row justify="start" align="middle">
                <a-col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }">
                  <a-form-item  label="">
                     <strong>客户经理姓名：</strong><j-dict-select-tag size="small" :disabled="true" style="width: 40%;" v-decorator="['sskhjl', {} ]" :triggerChange="true" dict-code="HR_BAS_STAFF,YGXM,YGGH"/>
                  </a-form-item>
                </a-col>
                <a-col :xs="{ span: 11, offset: 1 }" :lg="{ span: 6, offset: 2 }">
                  <a-form-item  label="">
                    <strong>客户经理工号：</strong><a-input   :disabled="true" style="width: 40%;" v-decorator="['sskhjl', {} ]" />
                  </a-form-item>
                </a-col>
              </a-row>

              <a-row type="flex" justify="start" align="middle">
                <a-col :span="2" :offset="2">
                  初评等级:
                </a-col>
                <a-col :span="8">
                  <a-form-item>
                    <a-radio-group  :options="cpdjoptions"  v-decorator="['cpdj', {}]"     disabled/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row justify="start" align="middle">
                <a-col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }">
                  <a-form-item  label="">
                    <font bold color="red"> <strong>评定等级：</strong></font><j-dict-select-tag  :disabled="true"   @change="changeZzsxed" style="width: 100px;" size="small"  v-decorator="['zzpddj', { rules: [{ required: true, message: '请选择最终评定等级!' }] } ]"   :triggerChange="true" dictCode="pjsx_pddj"/>
                  </a-form-item>
                </a-col>
                <a-col :xs="{ span: 11, offset: 1 }" :lg="{ span: 6, offset: 2 }">
                  <a-form-item >
                    <font bold color="red"><strong>授信额度：</strong></font><a-input-number  :disabled="true"  :min="this.min" :max="this.max" size="small"  style="border:hidden;width: 100px;border-bottom: 1px solid #ddd;"  v-decorator="['zzsxed', { rules: [{ required: true, message: '请输入最终授信额度!' }] } ]"/> 万元
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row type="flex" justify="start" align="middle">
                <a-col :span="20" :offset="2">
                  <a-form-item >
                    <font bold color="red"> <strong>评定意见: </strong></font><a-textarea  style="width: 80%" :disabled="true"  :rows="2"  v-decorator="['yj', { rules: [{ required: true, message: '请填写评定意见!' }] } ]" />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-divider orientation="left" style="color: #1890FF;">支行长审批</a-divider>
              <a-row justify="start" align="middle">
                <a-col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }">
                  <a-form-item  label="">
                    <font bold color="red"> <strong>最终评定等级：</strong></font>
                    <Select v-model="spform.pddj" style="width: 30%">
                      <Option v-for="(item, i) in pjsxpddj" :key="i" :value="item.key">{{item.name}}</Option>
                    </Select>
                  </a-form-item>
                </a-col>
                <a-col :xs="{ span: 11, offset: 1 }" :lg="{ span: 6, offset: 2 }">
                  <a-form-item >
                    <font bold color="red"><strong>最终授信额度：</strong></font>
                    <a-input-number  v-model="spform.jysxed"   :min="this.min1" :max="this.max1" size="small"  style="border:hidden;width: 100px;border-bottom: 1px solid #ddd;"  /> 万元
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row type="flex" justify="start" align="middle">
                <a-col :span="20" :offset="2">
                  <a-form-item >
                    <font bold color="red"> <strong>审批意见: </strong></font>
                    <Input style="width: 80%" type="textarea" v-model="spform.comment" :rows="3" />
                  </a-form-item>
                </a-col>
              </a-row>
            </a-card>
          </a-tab-pane>
          <a-tab-pane v-if="!disableSubmit" tab="评定信息" key="8" :forceRender="true">
            <a-card title="评定及意见" style="height: 760px" :bordered="true">
              <a-row>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户名称">
                    <a-input  :disabled="true" style="width: 100%;" v-decorator="['khmc', {}]" />
                  </a-form-item>
                </a-col>

                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="证件号码">
                    <a-input :disabled="true" style="width: 100%;" v-decorator="['zjhm', {} ]" />
                  </a-form-item>
                </a-col>

              </a-row>
              <a-divider orientation="left" style="color: #1890FF;">模型测算结果</a-divider>
              <a-row justify="start" align="middle">
                <a-col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }">
                  模型测算得分：<a-input size="small" :disabled="true"  style="border:hidden;width: 100px;" v-model="this.model.xtpddf" />
                </a-col>
                <a-col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }">
                  模型评定等级：<a-input size="small" :disabled="true"  style="border:hidden;width: 100px;" v-model="this.model.xtpddj_dictText" />
                </a-col>
                <a-col :xs="{ span: 11, offset: 1 }" :lg="{ span: 6, offset: 2 }">
                  模型授信额度：<a-input size="small" :disabled="true"  style="border:hidden;width: 100px;" v-model="this.model.xtsxed" /> (万元)
                </a-col>
              </a-row>
              <a-divider orientation="left" style="color: #1890FF;">客户经理审批</a-divider>
              <a-row justify="start" align="middle">
                <a-col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }">
                  <a-form-item  label="">
                    <strong>客户经理姓名：</strong><j-dict-select-tag size="small" :disabled="true" style="width: 40%;" v-decorator="['sskhjl', {} ]" :triggerChange="true" dict-code="HR_BAS_STAFF,YGXM,YGGH"/>
                  </a-form-item>
                </a-col>
                <a-col :xs="{ span: 11, offset: 1 }" :lg="{ span: 6, offset: 2 }">
                  <a-form-item  label="">
                    <strong>客户经理工号：</strong><a-input   :disabled="true" style="width: 40%;" v-decorator="['sskhjl', {} ]" />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row type="flex" justify="start" align="middle">
                <a-col :span="2" :offset="2">
                  初评等级:
                </a-col>
                <a-col :span="8">
                  <a-form-item>
                    <a-radio-group  :options="cpdjoptions"  v-decorator="['cpdj', {}]"     disabled/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row justify="start" align="middle">
                <a-col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }">
                  <a-form-item  label="">
                    <font bold color="red"> <strong>评定等级：</strong></font><j-dict-select-tag  :disabled="true"   @change="changeZzsxed" style="width: 100px;" size="small"  v-decorator="['zzpddj', { rules: [{ required: true, message: '请选择最终评定等级!' }] } ]"   :triggerChange="true" dictCode="pjsx_pddj"/>
                  </a-form-item>
                </a-col>
                <a-col :xs="{ span: 11, offset: 1 }" :lg="{ span: 6, offset: 2 }">
                  <a-form-item >
                    <font bold color="red"><strong>授信额度：</strong></font><a-input-number  :disabled="true"  :min="this.min" :max="this.max" size="small"  style="border:hidden;width: 100px;border-bottom: 1px solid #ddd;"  v-decorator="['zzsxed', { rules: [{ required: true, message: '请输入最终授信额度!' }] } ]"/> 万元
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row type="flex" justify="start" align="middle">
                <a-col :span="20" :offset="2">
                  <a-form-item >
                    <font bold color="red"> <strong>评定意见: </strong></font><a-textarea  style="width: 80%" :disabled="true"  :rows="2"  v-decorator="['yj', { rules: [{ required: true, message: '请填写评定意见!' }] } ]" />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-divider orientation="left" style="color: #1890FF;">支行长审批</a-divider>
              <a-row justify="start" align="middle">
                <a-col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }">
                  <a-form-item  label="">
                    <font bold color="red"> <strong>最终评定等级：</strong></font>
                    <Select v-model="spform.pddj" style="width: 30%" @on-change="changeZzsxed1">
                      <Option v-for="(item, i) in pjsxpddj" :key="i" :value="item.key">{{item.name}}</Option>
                    </Select>
                  </a-form-item>
                </a-col>
                <a-col :xs="{ span: 11, offset: 1 }" :lg="{ span: 6, offset: 2 }">
                  <a-form-item >
                    <font bold color="red"><strong>最终授信额度：</strong></font>
                    <a-input-number  v-model="spform.jysxed"   :min="this.min1" :max="this.max1" size="small"  style="border:hidden;width: 100px;border-bottom: 1px solid #ddd;"  /> 万元
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row type="flex" justify="start" align="middle">
                <a-col :span="20" :offset="2">
                  <a-form-item >
                    <font bold color="red"> <strong>审批意见: </strong></font>
                    <Input style="width: 80%" type="textarea" v-model="spform.comment" :rows="3" />
                  </a-form-item>
                </a-col>
              </a-row>
            </a-card>
          </a-tab-pane>
          <a-tab-pane tab="客户基本信息" key="1" :forceRender="true">
            <a-row class="form-row" :gutter="16">
              <a-col :lg="8">
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属支行">
                  <j-dict-select-tag  :disabled="true"  style="width: 100%;" v-decorator="['sszh', {} ]" :triggerChange="true" dict-code="HR_BAS_ORGANIZATION,zzjc,zzbz"/>
                </a-form-item>
              </a-col>

              <a-col :lg="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="区域代码">
                  <a-input   v-decorator="['qydm', {} ]"  :disabled="true"/>
                </a-form-item>
              </a-col>

              <a-col :lg="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="镇">
                  <j-dict-select-tag  :disabled="true" style="width: 100%;" v-decorator="['yjyxdybh', {} ]" :triggerChange="true" dict-code="YXDYGL_YJYXDYGL,DYMC,DYBH"/>

                </a-form-item>
              </a-col>
              <a-col :lg="8" >
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="村">
                  <j-dict-select-tag  :disabled="true" style="width: 100%;" v-decorator="['ejyxdybh', {} ]" :triggerChange="true" dict-code="YXDYGL_EJYXDYGL,DYMC,DYBH"/>
                </a-form-item>
              </a-col>
              <a-col :lg="8" >
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="组">
                  <j-dict-select-tag  :disabled="true" style="width: 100%;" v-decorator="['sjyxdybh', {} ]" :triggerChange="true" dict-code="YXDYGL_SJYXDYGL,DYMC,DYBH"/>
                </a-form-item>
              </a-col>

              <a-col :lg="8">
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属客户经理">
                  <j-dict-select-tag  :disabled="true" style="width: 100%;" v-decorator="['sskhjl', {} ]" :triggerChange="true" dict-code="HR_BAS_STAFF,YGXM,YGGH"/>
                </a-form-item>
              </a-col>

              <a-col :lg="8">
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="户号编码">
                  <a-input   :disabled="true" v-decorator="['hhbm', {} ]" />
                </a-form-item>
              </a-col>

              <a-col :lg="8">
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户名称">
                  <a-input  :disabled="true" style="width: 100%;" v-decorator="['khmc', {}]" />
                </a-form-item>
              </a-col>

              <a-col :lg="8">
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="证件号码">
                  <a-input :disabled="true" style="width: 100%;" v-decorator="['zjhm', {} ]" />
                </a-form-item>
              </a-col>

              <a-col :lg="8">
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户性别">
                  <j-dict-select-tag  :disabled="true" style="width: 100%;" v-decorator="['xb', {rules: [{  }]}]" :triggerChange="true" dictCode="sex"/>
                </a-form-item>
              </a-col>

              <a-col :lg="8">
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="婚姻状况">
                  <j-dict-select-tag  :disabled="true" style="width: 100%;" v-decorator="['hyzk', {}]" :triggerChange="true" dict-code="hyzk_cj"/>
                </a-form-item>
              </a-col>

              <a-col :lg="8">
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="手机号码">
                  <a-input :disabled="true"  style="width: 100%;" v-decorator="['sjhm', {}]" />
                </a-form-item>
              </a-col>

              <a-col :lg="8">
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="居住地址">
                  <a-input  :disabled="true" style="width: 100%;" v-decorator="['zz', {}]"/>
                </a-form-item>
              </a-col>

              <a-col :lg="8">
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="从事职业">
                  <j-dict-select-tag  :disabled="true" style="width: 100%;" v-decorator="['cszy', {}]" :triggerChange="true" dict-code="cszy"/>

                </a-form-item>
              </a-col>

              <a-col :lg="8">
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户身份">
                  <j-multi-select-tag :disabled="true" placeholder="客户身份" v-decorator="['khlx', {}]" dict-code="khsf" style="width: 100%;"/>
                </a-form-item>
              </a-col>

              <a-col :lg="8">
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="与户主关系">
                  <j-dict-select-tag  :disabled="true" v-decorator="['yhzgx', {rules: [{  message: '请选择与户主关系!' }]}]" :triggerChange="true" dictCode="yhzgx"/>
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
                  <a-textarea  :disabled="true"   v-decorator="['bz', {rules: [{  }]}]" :autosize="{ minRows: 2, maxRows: 4 }"/>
                </a-form-item>
              </a-col>
            </a-row>
          </a-tab-pane>
          <a-tab-pane tab="家庭成员" key="2" :forceRender="true">
            <a-card class="card" :bordered="false">
              <a-table
                size="middle"
                :pagination="false"
                :columns="jtzycyxxTable.columns"
                :dataSource="jtzycyxxTable.dataSource"
                bordered>
              </a-table>
            </a-card>
          </a-tab-pane>
          <a-tab-pane tab="资产负债情况" key="3" :forceRender="true">
            <a-divider orientation="left" style="color: #1890FF;">家庭资产情况(截至日期:{{this.model.createTime}})    <font style="color: red">总资产合计:{{this.model.zzchj}} </font></a-divider>
            <span slot="tab"><a-icon type="book"/>固定资产</span>
            <a-card class="card" :bordered="false">
              <a-table
                size="middle"
                :pagination="false"
                :columns="jtzcqkGdzcTable.columns"
                :dataSource="jtzcqkGdzcTable.dataSource"
                bordered>
              </a-table>

              <a-table
                size="middle"
                :pagination="false"
                :columns="jtzcqkldzcTable.columns"
                :dataSource="jtzcqkldzcTable.dataSource"
                bordered>
              </a-table>
            </a-card>

            <a-divider orientation="left" style="color: #1890FF;">家庭负债情况(截至日期:{{this.model.createTime}})</a-divider>
            <a-card class="card" :bordered="false">
              <a-table
                size="middle"
                :pagination="false"
                :columns="jtfzqkTable.columns"
                :dataSource="jtfzqkTable.dataSource"
                bordered>
                <template
                  v-for="jtfzqkcolname in ['fzWhjk', 'fzQtyhjk', 'fzSrjkhqtjk','fzYfk','fzQtfz','fzWtrdb']"
                  :slot="jtfzqkcolname"
                  slot-scope="text, record, index">
                  <template >
                    <a-input   style="margin: -5px 0"  :value="text" @change="e => handjtfzqkChange(e.target.value, record.key, jtfzqkcolname)"/>
                  </template>
                </template>
              </a-table>



            </a-card>
            <a style="width:300px;margin-left:82.6%;" > <font style="color: red">家庭净资产(万元) : </font> <a-input :disabled="true" style="width: 100px" v-model="this.model.jtjzc" /></a>

            <a-divider orientation="left" style="color: #1890FF;">家庭收支情况(调查日前一年度或预测本年度家庭收入支出情况)</a-divider>
            <a-card class="card" :bordered="false">
              <a-table
                size="middle"
                :pagination="false"
                :columns="jtszqkTable.columns"
                :dataSource="jtszqkTable.dataSource"
                bordered>
                <template
                  v-for="jtszqkcolname in ['srZz', 'srYz','srLw','srGsy','srQtsr','zcJy','zcYl','zcYlao','zcSccb','zcRcsh','zcQtzc']"
                  :slot="jtszqkcolname"
                  slot-scope="text, record, index"
                >
                  <template >
                    <a-input   style="margin: -5px 0"  :value="text"
                               @change="e => handjtszqkChange(e.target.value, record.key, jtszqkcolname)"
                    />
                  </template>
                </template>
              </a-table>


            </a-card>
            <a style="width:300px;margin-left:82.6%;" > <font style="color: red">家庭净收入(万元) : </font> <a-input :disabled="true"  style="width: 100px" v-model="this.model.jtjsr"  /></a>
          </a-tab-pane>
          <a-tab-pane tab="社会声誉" key="4" :forceRender="true">
            <div>
              <a-row type="flex"  justify="center" align="middle">
                <a-col :span="10" :offset="1">
                  家庭成员是否有不良嗜好（黄赌毒、酗酒、偷盗、传销、沉迷于其他不良活动）:
                </a-col>
                <a-col :span="11" :offset="0">
                  <a-form-item >
                    <!--<j-dict-select-tag   style="width: 100px;" v-decorator="['shsyBlsh', {}]" :triggerChange="true" dict-code="sfbz"/>-->
                    <a-radio-group   v-decorator="['shsyBlsh', {}]" :options="sfblshOptions" disabled  />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row type="flex"  justify="center" align="middle">
                <a-col :span="10" :offset="1">
                  家庭成员是否勤快:
                </a-col>
                <a-col :span="11" :offset="0">
                  <a-form-item >
                    <!--<j-dict-select-tag style="width: 100px;" v-decorator="['shsySfqk', {}]" :triggerChange="true" dict-code="jtcysfqk"/>-->
                    <a-radio-group   v-decorator="['shsySfqk', {}]" :options="jtcysfqkOptions" disabled  />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row type="flex"  justify="center" align="middle">
                <a-col :span="10" :offset="1">
                  家庭成员是否有民间高息贷款:
                </a-col>
                <a-col :span="11" :offset="0">
                  <a-form-item >
                    <!--<j-dict-select-tag style="width: 100px;" v-decorator="['shsySfygld', {}]" :triggerChange="true" dict-code="jtcysfgxdk"/>-->
                    <a-radio-group   v-decorator="['shsySfygld', {}]" :options="jtcysfgxdkOptions" disabled  />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row type="flex"  justify="center" align="middle">
                <a-col :span="10" :offset="1">
                  家庭成员是否有打架，闹事等不良行为:
                </a-col>
                <a-col :span="11" :offset="0">
                  <a-form-item >
                    <!-- <j-dict-select-tag style="width: 100px;" v-decorator="['shsySfdjns', {}]" :triggerChange="true" dict-code="jtcysfyblxw"/>-->
                    <a-radio-group   v-decorator="['shsySfdjns', {}]" :options="jtcysfyblxwOptions" disabled  />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row type="flex"  justify="center" align="middle">
                <a-col :span="10" :offset="1">
                  家庭成员领取补助情况:
                </a-col>
                <a-col :span="11" :offset="0">
                  <a-form-item >
                    <!-- <j-dict-select-tag style="width: 100px;" v-decorator="['shsySflqbz', {}]" :triggerChange="true" /> -->
                    <a-checkbox-group disabled v-model="jtcylqbzqkList" :options="plainOptions"  />
                    <a-input    :disabled="true"  v-if="this.model.qtbzqk!=null"  :value="this.model.qtbzqk" size="small" style="border:0;border-bottom: 1px solid #ddd;width: 100px"/>
                    ( <a-radio disabled :checked="this.model.sfjdlkpkh==1">建档立卡贫困户</a-radio>)
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row type="flex"  justify="center" align="middle">
                <a-col :span="10" :offset="1">
                  家庭成员是否有刑事犯罪记录:
                </a-col>
                <a-col :span="11" :offset="0">
                  <a-form-item >
                    <!--<j-dict-select-tag style="width: 100px;" v-decorator="['shsySfxsfz', {}]" :triggerChange="true" dict-code="sfbz"/>-->
                    <a-radio-group disabled v-model="shsySfxsfz" @change="onChangeSfxsfz">
                      <a-radio  :value="1">是
                      <!--  <a-input disabled v-if="shsySfxsfz === 1" :value="this.model.fzlx" size="small" style="border:0;border-bottom: 1px solid #ddd;;width: 100px"/>-->
                      </a-radio>
                      <a-radio  :value="2">否</a-radio>
                    </a-radio-group>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row type="flex" justify="center"  align="middle">
                <a-col :span="10" :offset="1">
                  家庭成员是否涉诉:
                </a-col>
                <a-col :span="11" :offset="0">
                  <a-form-item >
                    <!--<j-dict-select-tag style="width: 100px;" v-decorator="['shsySfss', {}]" :triggerChange="true" dict-code="sfss"/>-->
                    <a-radio-group    v-decorator="['shsySfss', {}]" :options="sfbzOptions" disabled  />
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
                  <a-form-item >
                    <a-radio-group    v-decorator="['dhzpjPxpj', {}]"  :options="pxpjOptions" disabled  />
                  </a-form-item>
                </a-col>
              </a-row>

              <a-row type="flex" justify="start" align="middle">
                <a-col :span="4" :offset="2">
                  信用评价
                </a-col>
                <a-col :span="6">
                  <a-form-item >
                    <a-radio-group    v-decorator="['dhzpjXypj', {}]"     :options="xypjOptions" disabled   />
                  </a-form-item>
                </a-col>
              </a-row>
            </div>
          </a-tab-pane>
          <a-tab-pane tab="与我行业务" key="6" :forceRender="true">
            <a-card class="card" :bordered="false">
              <!--<a-list-item class="DefaultListItem" term="存贷款情况">存贷款情况</a-list-item>-->
              <a-divider orientation="left" style="color: #1890FF; margin-top: 0px;">与我行业务关系(家庭总计)</a-divider>
              <a-row class="form-row" :gutter="16">
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="存款余额" >
                    <a-input-number :disabled="true" placeholder="0.00" v-decorator="['ckye', {}]" :min="0" style="width: 100%;"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="其中定期" >
                    <a-input-number :disabled="true" placeholder="0.00" v-decorator="['dqckye', {}]" :min="0" style="width: 100%;"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="当年存款日平" >
                    <a-input-number :disabled="true" placeholder="0.00" v-decorator="['cknrpye', {}]" :min="0" style="width: 100%;"/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row class="form-row" :gutter="16">
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="贷款金额" >
                    <a-input-number :disabled="true" placeholder="0.00" v-decorator="['dkje', {}]" :min="0" style="width: 100%;"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="贷款余额" >
                    <a-input-number :disabled="true" placeholder="0.00" v-decorator="['dkye', {}]" :min="0" style="width: 100%;"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="表内不良贷款" >
                    <a-input-number :disabled="true" placeholder="0.00" v-decorator="['bldkye', {}]" :min="0" style="width: 100%;"/>
                  </a-form-item>
                </a-col>


              </a-row>
              <a-row class="form-row" :gutter="16">
                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="表外不良贷款" >
                    <a-input-number :disabled="true" placeholder="0.00" v-decorator="['bwbldkye', {}]" :min="0" style="width: 100%;"/>
                  </a-form-item>
                </a-col>
                <a-col :lg="8">
                  <a-form-item  :labelCol="labelCol" :wrapperCol="wrapperCol" label="手机银行数" >
                    <a-input-number :disabled="true" placeholder="0.00" v-decorator="['sjyhsl', {}]" :min="0" style="width: 100%;"/>
                  </a-form-item>
                </a-col>

                <a-col :lg="8">
                  <a-form-item  :labelCol="labelCol" :wrapperCol="wrapperCol" label="网上银行数" >
                    <a-input-number :disabled="true" placeholder="0.00" v-decorator="['wsyhsl', {}]" :min="0" style="width: 100%;"/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row class="form-row" :gutter="16">
                <a-col :lg="8">
                  <a-form-item  :labelCol="labelCol" :wrapperCol="wrapperCol" label="社保卡数" >
                    <a-input-number :disabled="true" placeholder="0.00" v-decorator="['sbksl', {}]" :min="0" style="width: 100%;"/>
                  </a-form-item>
                </a-col>

                <a-col :lg="8">
                  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="ETC数" >
                    <a-input-number :disabled="true" placeholder="0.00" v-decorator="['etssl', {}]" :min="0" style="width: 100%;"/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-card title="家庭成员明细" :bordered="true">
                <j-editable-table
                  :disabled="true"
                  :loading="ywhywxxTable.loading"
                  :columns="ywhywxxTable.columns"
                  :dataSource="ywhywxxTable.dataSource"
                  :maxHeight="300"
                  :rowNumber="true"
                  :rowSelection="true"
                  :actionButton="false"/>
              </a-card>
            </a-card>
          </a-tab-pane>
          <a-tab-pane tab="附件信息" key="7" :forceRender="true">
            <photo-view ref="photoView" :showupload="true"/>
          </a-tab-pane>
        </a-tabs>
      </a-form>

    </a-spin>


  </j-modal>

</template>

<script>

  import moment from 'moment'
  import pick from 'lodash.pick'
  import { JEditableTableMixin } from '@/mixins/JEditableTableMixin'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { httpAction,putAction,getAction } from '@/api/manage'
  import { VALIDATE_NO_PASSED, getRefPromise, validateFormAndTables } from '@/utils/JEditableTableUtil'
  import { mapGetters } from 'vuex'
  import JMultiSelectTag from '@/components/dict/JMultiSelectTag'
  import { FormTypes } from '@/utils/JEditableTableUtil'
  import photoView from './photoView.vue'
  import {pass} from "@/api/activiti";

  export default {
    components: {JMultiSelectTag,photoView},
    name: 'GrkhpjsxModal',
    mixins: [JEditableTableMixin,JeecgListMixin],
    data() {
      return {
        spform:{

        },
        pjsxpddj: [
          {
            key: "A",
            name: "特级"
          },
          {
            key: "B",
            name: "优秀"
          },
          {
            key: "C",
            name: "较好"
          },
          {
            key: "D",
            name: "一般"
          },
          {
            key: "E",
            name: "级外"
          }
        ],
        visible:false,
        modalTaskVisible:true,
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 12 }
        },
        loading: false,
        min:0,
        max:10,
        min1:0,
        max1:10,
        csbtname:'模型计算',
        shsySfxsfz:1,
        jtcylqbzqkList:[],
        sfktsjyxdy:" ",
        sfdk:false,
        jtzycyxx:[],
        zzpddj:"",
        zzsxed:"",
        cpdjoptions:[
          { label: '级外', value: 'E' },
          { label: '一般', value: 'D' },
          { label: '较好', value: 'C' },
          { label: '优秀', value: 'B' },
          { label: '特级', value: 'A' },
        ],
        plainOptions : [
          { label: '低保', value: '1' },
          { label: '五保', value: '2' },
          { label: '幼保', value: '3' },
          { label: '其他', value: '4' }
        ],
        jtcysfqkOptions:[
          { label: '否'     , value: '3' },
          { label: '一般勤快', value: '2' },
          { label: '非常勤快', value: '1' },
        ],
        sfbzOptions:[
          { label: '是', value: '1' },
          { label: '不了解'   , value: '3' },
          { label: '否', value: '2' },
        ],
        sfblshOptions:[
          { label: '是', value: '1' },
          { label: '否', value: '2' },
        ],
        sfjdlkpkhOptions:[
          { label: '是', value: '1' },
          { label: '否', value: '2' },
        ],
        pxpjOptions:[
          { label: '差', value: '4' },
          { label: '一般', value: '3' },
          { label: '较好', value: '2' },
          { label: '良好', value: '1' },
        ],
        xypjOptions:[
          { label: '差', value: '4' },
          { label: '一般', value: '3' },
          { label: '较好', value: '2' },
          { label: '良好', value: '1' },
        ],
        jtcysfgxdkOptions:[
          { label: '是', value: '1' },
          { label: '不了解'   , value: '3' },
          { label: '否', value: '2' },

        ],
        jtcysfyblxwOptions:[
          { label: '偶尔', value: '1' },
          { label: '经常', value: '2' },
          { label: '否'   , value: '3' }
        ],
        ywhywxxTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '姓名',
              key: 'khmc',
              type: FormTypes.inputNumber,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '证件号码',
              key: 'zjhm',
              type: FormTypes.inputNumber,
              defaultValue: '',
              placeholder: '请输入${title}',
              width:160
            },
            {
              title: '存款余额',
              key: 'ckye',
              type: FormTypes.inputNumber,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '其中定期',
              key: 'dqckye',
              type: FormTypes.inputNumber,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '当年存款日平',
              key: 'cknrpye',
              type: FormTypes.inputNumber,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '贷款金额',
              key: 'dkje',
              type: FormTypes.inputNumber,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '贷款余额',
              key: 'dkye',
              type: FormTypes.inputNumber,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '表内不良贷款',
              key: 'bldkye',
              type: FormTypes.inputNumber,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '表外不良贷款',
              key: 'bwbldkye',
              type: FormTypes.inputNumber,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '是否开通手机银行',
              key: 'sfktsjyhyw',
              type: FormTypes.select,
              defaultValue: '',
              placeholder: '请输入${title}',
              dictCode: 'sfbz',

            },
            {
              title: '是否开通网上银行',
              key: 'sfktwsyhyw',
              type: FormTypes.select,
              defaultValue: '',
              placeholder: '请输入${title}',
              dictCode: 'sfbz',
            },
            {
              title: '是否开通社保卡',
              key: 'sfktsbk',
              type: FormTypes.select,
              defaultValue: '',
              placeholder: '请输入${title}',
              dictCode: 'sfbz',
            },
            {
              title: '是否办理ETC',
              key: 'sfbletcyw',
              type: FormTypes.select,
              defaultValue: '',
              placeholder: '请输入${title}',
              dictCode: 'sfbz',

            },
          ]
        },
        // 家庭主要成员信息
        jtzycyxxTable: {
          loading: false,
          dataSource: [ ],
          columns: [
            {
              title: '姓名',
              key: 'khmc',
              align: "center",
              dataIndex: 'khmc',

            },
            {
              title: '身份证号',
              key: 'zjhm',
              align: "center",
              dataIndex: 'zjhm',

            },
            {
              title: '从事职业',
              key: 'cszy',
              align: "center",
              dataIndex: 'cszy_dictText',
            },

            {
              title: '联系电话',
              key: 'lxfs',
              dataIndex: 'lxfs',
              align: "center",
            },
            {
              title: '与被评价人关系',
              key: 'yhzgx',
              align: "center",
              dataIndex: 'yhzgx_dictText',
            },

          ]
        },
        jtzcqkGdzcTable: {
          loading: false,
          dataSource: [
            { }
          ],
          columns: [
            {
              title: '固定资产',
              children:[
                {
                  title: '住房套数',
                  key: 'gdzcZfts',
                  align: "center",
                  dataIndex: 'gdzcZfts',
                  width:100,
                },

                {
                  title: '面积',
                  key: 'gdzcZfmj',
                  dataIndex: 'gdzcZfmj',
                  align: "center",
                  width:100,
                },
                {
                  title: '价值',
                  key: 'gdzcZfjz',
                  dataIndex: 'gdzcZfjz',
                  align: "center",
                  width:100,
                },
                {
                  title: '其他',
                  key: 'gdzcQt',
                  dataIndex: 'gdzcQt',
                  align: "center",
                  width:100,
                },

                {
                  title: '合计',
                  key: 'gdzcHj',
                  dataIndex: 'gdzcHj',
                  align: "center",
                  width:100,
                },
              ]
            },
          ]
        },
        jtzcqkldzcTable: {
          loading: false,
          dataSource: [
            { }
          ],
          columns: [
            {
              title: '流动资产',
              children:[
                {
                  title: '现金及我行存款',
                  key: 'ldzcXjjwhck',
                  dataIndex: 'ldzcXjjwhck',
                  align: "center",
                  width:100,
                },

                {
                  title: '其他',
                  key: 'ldzcQt',
                  dataIndex: 'ldzcQt',
                  align: "center",
                  width:100,
                },
                {
                  title: '应收款',
                  key: 'ldzcYsk',
                  dataIndex: 'ldzcYsk',
                  align: "center",
                  width:100,
                },
                {
                  title: '是否在他行开户',
                  key: 'ldzcSfthkh',
                  dataIndex: 'ldzcSfthkh',
                  align: "center",
                  width:100,
                },
                {
                  title: '是否在他行有存款',
                  key: 'ldzcSfthyck',
                  align: "center",
                  dataIndex: 'ldzcSfthyck',
                  width:100,
                },
                {
                  title: '他行存款金额',
                  key: 'ldzcThckje',
                  align: "center",
                  dataIndex: 'ldzcThckje',
                  width:100,
                },
                {
                  title: '合计',
                  key: 'ldzcHj',
                  align: "center",
                  dataIndex: 'ldzcHj',
                  width:100,
                },
              ]
            },
          ]
        },
        jtfzqkTable: {
          loading: false,
          dataSource: [
            { }
          ],
          columns: [
            {
              title: '我行借款',
              key: 'fzWhjk',
              align: "center",
              dataIndex: 'fzWhjk',
              width:100,
            },

            {
              title: '其他银行借款',
              key: 'fzQtyhjk',
              align: "center",
              dataIndex: 'fzQtyhjk',
              width:100,
            },
            {
              title: '私人借款和其他借款',
              key: 'fzSrjkhqtjk',
              align: "center",
              dataIndex: 'fzSrjkhqtjk',
              width:100,
            },
            {
              title: '应付款',
              key: 'fzYfk',
              align: "center",
              dataIndex: 'fzYfk',
              width:100,
            },
            {
              title: '其他负债',
              key: 'fzQtfz',
              align: "center",
              dataIndex: 'fzQtfz',
              width:100,
            },
            {
              title: '为他人提供担保',
              key: 'fzWtrdb',
              align: "center",
              dataIndex: 'fzWtrdb',
              width:100,
            },
            {
              title: '负债合计',
              key: 'fzHj',
              align: "center",
              dataIndex: 'fzHj',
              width:100,
            },
          ]
        },
        jtszqkTable:{
          loading: false,
          dataSource: [
            { }
          ],
          columns: [
            {
              title: '收入',
              children: [
                {
                  title: '种植',
                  key: 'srZz',
                  align: "center",
                  dataIndex: 'srZz',
                  width: 100,
                },

                {
                  title: '养殖',
                  key: 'srYz',
                  align: "center",
                  dataIndex: 'srYz',
                  width: 100,
                },
                {
                  title: '劳务',
                  key: 'srLw',
                  align: "center",
                  dataIndex: 'srLw',
                  width: 100,
                },
                {
                  title: '工商业',
                  key: 'srGsy',
                  dataIndex: 'srGsy',
                  align: "center",
                  width: 100,
                },
                {
                  title: '其他收入',
                  key: 'srQtsr',
                  align: "center",
                  dataIndex: 'srQtsr',
                  width: 100,
                },
                {
                  title: '合计',
                  key: 'srHj',
                  align: "center",
                  dataIndex: 'srHj',
                  width: 100,
                },
              ]
            },
            {
              title: '支出',
              children: [
                {
                  title: '教育',
                  key: 'zcJy',
                  dataIndex: 'zcJy',
                  align: "center",
                  width: 100,
                },

                {
                  title: '医疗',
                  key: 'zcYl',
                  dataIndex: 'zcYl',
                  align: "center",
                  width: 100,
                },
                {
                  title: '养老',
                  key: 'zcYlao',
                  dataIndex: 'zcYlao',
                  align: "center",
                  width: 100,
                },
                {
                  title: '生产成本',
                  key: 'zcSccb',
                  dataIndex: 'zcSccb',
                  align: "center",
                  width: 100,
                },
                {
                  title: '日常生活',
                  key: 'zcRcsh',
                  dataIndex: 'zcRcsh',
                  align: "center",
                  width: 100,
                },
                {
                  title: '其他支付',
                  key: 'zcQtzc',
                  dataIndex: 'zcQtzc',
                  align: "center",
                  width: 100,
                },
                {
                  title: '合计',
                  key: 'zcHj',
                  dataIndex: 'zcHj',
                  align: "center",
                  width: 100,
                },
              ],
            },


          ]
        },
        splsTable: {
          loading: false,
          dataSource: [ ],
          columns: [
            {
              title: '审批人',
              key: 'yggh',
              align: "center",
              dataIndex: 'yggh_dictText',

            },
            {
              title: '评定等级',
              key: 'pddj',
              align: "center",
              dataIndex: 'pddj_dictText',

            },
            {
              title: '建议额度(万元)',
              key: 'jyed',
              align: "center",
              dataIndex: 'jyed',

            },
            {
              title: '审批意见',
              key: 'spyj',
              align: "center",
              dataIndex: 'spyj',
            },
            {
              title: '审批时间',
              key: 'createTime',
              align: "center",
              dataIndex: 'createTime',
              customRender: function (text) {
                return !text ? "" : (text.length > 10 ? text.substr(0, 10) : text)
              },
            },
          ]
        },
        dafactivekey:'7',
        disableSubmit: false,
        confirmLoading: false,
        url: {
          list: "/xdgl/grkhpjsx/list",
          add: "/khgl/vKhglKrkhgl/add",
          edit: "/xdgl/grkhpjsx/edit",
          ywhywxx:{
            list: '/xdgl/grdkgl/queryYwhywxxByHhbm'
          }
        }
      }
    },
    methods: {
      ...mapGetters(["nickname", "avatar","userInfo"]),
      handleChangeTab(key) {
        this.$refs[`editableTable${key}`].resetScrollTop()
      },
      add (value) {
        this.edit({});
      },
      edit (record) {
        //领取补助多选 转换成list
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'dhzpjPxpj','sszh', 'qydm', 'yjyxdybh','ejyxdybh','sjyxdybh','sskhjl','hhbm','khmc','zjhm', 'yhzgx','xb','hyzk','cszy', 'sjhm','khlx','zz','shsyBlsh','shsySfqk','shsySfygld','shsySfdjns','shsySfss','dhzpjXypj','cpdj','bz','zzpddj','zzsxed','yj','ckye','dqckye','cknrpye','dkje','dkye','bldkye','bwbldkye','sjyhsl','wsyhsl','sbksl','etcsl'))
          //时间格式化
        });
        this.jtcylqbzqkList=record.shsySflqbz==null?this.jtcylqbzqkList:record.shsySflqbz.split(',');
        console.log(this.jtcylqbzqkList)
        this.shsySfxsfz=record.shsySfxsfz=="1"?1:2;

        //家庭成员信息
        if (this.model.zjhm) {
          let params = {"zjhm":record.zjhm}
          putAction("xdgl/grkhpjsx/jtcyxx", params).then(res => {
            if (res.success) {
              console.log(res.result)
              this.jtzycyxxTable.dataSource = res.result.jtcylist
              console.log("---家庭成员信息-----")
              console.log(this.jtzycyxxTable.dataSource)
            }
          });
          let paramhhmm=  {hhbm: record.hhbm}
          this.requestSubTableData(this.url.ywhywxx.list, paramhhmm, this.ywhywxxTable)
        }
        if (record.bussinessId) {
          let params = {"spid":record.bussinessId}
          putAction("xdgl/grkhpjsx/splsXend", params).then(res => {
            if (res.success) {
              console.log(res.result)
              this.splsTable.dataSource = res.result.spls
            }
          });
        }
        if (record.zjhm) {
          let params = { "zjhm": record.zjhm }
          getAction("khgl/vKhglKrkhgl/img", params).then((res) => {
            if (res.success) {
              this.$refs.photoView.showImg(res.result)
            }
          });
        }

        //家庭固定资产
        let jtgdzc = []
        var jtgdzcobj ={"gdzcZfts":this.model.gdzcZfts,"gdzcZfmj":this.model.gdzcZfmj,"gdzcZfjz":this.model.gdzcZfjz,"gdzcQt":this.model.gdzcQt,'gdzcHj':this.model.gdzcHj}
        jtgdzc.push(jtgdzcobj)
        this.jtzcqkGdzcTable.dataSource=jtgdzc;

        //家庭流动资产
        let jtldzc = []
        var jtldzcobj ={"ldzcXjjwhck":this.model.ldzcXjjwhck,"ldzcQt":this.model.ldzcQt,"ldzcYsk":this.model.ldzcYsk,"ldzcSfthkh":this.model.ldzcSfthkh_dictText,
                      "ldzcSfthyck":this.model.ldzcSfthyck_dictText,"ldzcThckje":this.model.ldzcThckje,"ldzcHj":this.model.ldzcHj}
        jtldzc.push(jtldzcobj)
        this.jtzcqkldzcTable.dataSource=jtldzc;

        //家庭负债情况
        let jtfzqk = []
        var  jtfzqkobj={"fzWhjk":this.model.fzWhjk, "fzQtyhjk":this.model.fzQtyhjk, "fzSrjkhqtjk":this.model.fzSrjkhqtjk,
          "fzYfk":this.model.fzYfk,  "fzQtfz":this.model.fzQtfz,  "fzWtrdb":this.model.fzWtrdb, "fzHj":this.model.fzHj}
         jtfzqk.push(jtfzqkobj)
        this.jtfzqkTable.dataSource=jtfzqk;

        //家庭收支情况情况
        let jtszqkqk = []
        var  jtszqkobj={"srZz":this.model.srZz,"srYz":this.model.srYz,"srLw":this.model.srLw, "srGsy":this.model.srGsy,
          "srQtsr":this.model.srQtsr,  "srHj":this.model.srHj,"zcJy":this.model.zcJy, "zcYl":this.model.zcYl,"zcYlao":this.model.zcYlao,
          "zcSccb":this.model.zcSccb,  "zcRcsh":this.model.zcRcsh, "zcQtzc":this.model.zcQtzc,"zcHj":this.model.zcHj, }
        jtszqkqk.push(jtszqkobj)
        this.jtszqkTable.dataSource=jtszqkqk;
      },
      handleCancel () {
        this.close()
      },
      onChangeSfxsfz(e) {
        console.log('radio checked', e.target.value);
      },
      close () {
          this.jtzycyxxTable.dataSource=[],
          this.jtzcqkGdzcTable.dataSource = [{}],
          this.jtzcqkldzcTable.dataSource = [{}],
          this.jtfzqkTable.dataSource=[{}],
          this.jtszqkTable.dataSource=[{}],
          this.$emit('close');
          this.visible = false;
      },
      //查询是否开通三级营销单元
      querycsz(){
        let params = { "csm":"CS0004"}
        putAction("/yxdygl/yxdyglPqzrrgl/querycsz", params).then(res => {
          if (res.success) {
            console.log("---------")
            console.log(res.result.csz)
            this.sfktsjyxdy =res.result.csz
          }
        });
      },
      changeZzsxed: function(value){
        // 将选定值绑定至下拉选择框
        if(value=='A'){
          this.min=9;
          this.max=10;
        }else if(value=='B'){
          this.min=6;
          this.max=9;
        }else if(value=='C'){
          this.min=3;
          this.max=5;
        }else if(value=='D'){
          this.min=1;
          this.max=2;
        }else if(value=='E'){
          this.min=0;
          this.max=0;
        }
      },
      changeZzsxed1: function(value){
        // 将选定值绑定至下拉选择框
        if(value=='A'){
          this.min1=9;
          this.max1=10;
        }else if(value=='B'){
          this.min1=6;
          this.max1=9;
        }else if(value=='C'){
          this.min1=3;
          this.max1=5;
        }else if(value=='D'){
          this.min1=1;
          this.max1=2;
        }else if(value=='E'){
          this.min1=0;
          this.max1=0;
        }
      },
      handleOk () {
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log(this.spform)

            if(this.spform.jysxed==null){
              this.$message.warning('请填写最终授信额度');
              return;
            }
            if(this.spform.pddj==null){
              this.$message.warning('请填写最终评定等级');
              return;
            }
            // 通过
            this.error = "";

            if(this.spform.jysxed>this.model.zzsxed){
              this.$Message.error("审批额度不能大于客户经理提交的额度!");
              this.submitLoading = false;
              return;
            }
            let ret = '';
            for (let it in this.spform) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(this.spform[it]) + '&';
            }
            ret = ret.substring(0, ret.length - 1);
            pass(ret).then(res => {
              this.submitLoading = false;
              if (res.success) {
                this.$Message.success("操作成功");
                this.handleCancel();
                this.$emit('getDataList');
              }
            });
          }
        })
      },

      calculation(){
        const that = this;
        this.form.validateFields((err, values) => {
          that.confirmLoading = true;
          let zbtable = Object.assign(this.model, values);
          let formData = {
          }
          formData.hhbm=zbtable.hhbm;
          formData.zjhm=zbtable.zjhm;
          console.log("-------")
          console.log(formData)
          putAction('/xdgl/grkhpjsx/calculation',formData).then((res)=>{
            if(res.success){
              that.$message.success(res.message);
              that.model.xtpddf=res.result.xtpddf;
              console.log(res.result.xtpddj)
              that.model.xtpddj_dictText=res.result.xtpddj;
              that.model.xtsxed=res.result.xtsxed;
              that.$emit('ok');
            }else{
              that.$message.warning(res.message);

            }
          }).finally(() => {
            that.confirmLoading = false;
          })
        })
      }


    }
  }
</script>

<style scoped>
  .ant-form .ant-form-item {
    margin-bottom: 10px;
  }
</style>