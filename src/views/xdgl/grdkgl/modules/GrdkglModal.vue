<template>
  <j-modal centered
           :title="title"
           :width="1200"
           :visible="visible"
           :maskClosable="false"
           :confirmLoading="confirmLoading"
           :destroyOnClose="true"
           switchFullscreen
           :fullscreen="false"
           @ok="handleOk"
           @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-tabs default-active-key="1">
          <a-tab-pane tab="客户基本信息" key="1" :forceRender="true">
            <a-divider orientation="left" style="color: #1890FF;">客户基本信息</a-divider>
            <a-row  class="form-row" :gutter="16">
              <a-col :lg="8">
                <a-input  hidden="true"  v-decorator="['hhbm', {}]"   />
                <a-input  hidden="true"  v-decorator="['sszh', {}]"   />
                <a-input  hidden="true"  v-decorator="['ssyxdy', {}]"   />
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="客户名称">
                  <a-input placeholder="请输入客户名称" v-decorator="['khmc', { rules: [{ required: true, message: '请填写客户名称!', whitespace: true }],}]"/>
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="证件号码">
                  <a-input placeholder="请输入证件号码"  :disabled="this.showZjhm" @change="getzjhm" v-decorator="['zjhm', {rules: [{ required: true, message: '请输入证件号码!', whitespace: true }]}]"/>
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="性别">
                  <j-dict-select-tag placeholder="请选择客户性别" style="width: 100%;" v-decorator="['xb', { }]" :triggerChange="true" dictCode="sex"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row  class="form-row" :gutter="16">
              <a-col :lg="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="婚姻状况">
                  <j-dict-select-tag placeholder="请选择婚姻状况" style="width: 100%;" v-decorator="['hyzk', {rules: [{ required: true, message: '请选择婚姻状况!', whitespace: true  }]}]" :triggerChange="true" dictCode="hyzk_cj"/>
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="联系电话">
                  <a-input placeholder="请输入联系电话" v-decorator="['sjhm', {}]"/>
                </a-form-item>
              </a-col>

              <a-col :lg="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="地址">
                  <a-input placeholder="请输入地址" v-decorator="['dz', {rules: [{ required: true, message: '请输入地址!', whitespace: true }],}]"/>
                </a-form-item>
              </a-col>


            </a-row>
            <a-row  class="form-row" :gutter="16">
              <a-col :lg="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="行业">
                  <j-dict-select-tag placeholder="请选择行业" style="width: 100%;" v-decorator="['cshy', {rules: [{  }]}]" :triggerChange="true" dictCode="grdk_khhy"/>
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="从事职业">
                  <j-dict-select-tag placeholder="请选择从事职业" :showSearch="true" style="width: 100%;" v-decorator="['cszy', {rules: [{rules: [{ required: true, message: '请选择从事职业!', whitespace: true }],  }]}]" :triggerChange="true" dictCode="cszy"/>
                </a-form-item>
              </a-col>

              <a-col :lg="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="品行">
                  <j-dict-select-tag placeholder="请选择客户品行" style="width: 100%;" v-decorator="['khpx', {rules: [{  }]}]" :triggerChange="true" dictCode="grdk_khpx"/>
                </a-form-item>
              </a-col>

            </a-row>
            <a-row  class="form-row" :gutter="16">
              <a-col :lg="8">
                <a-input hidden="true" v-decorator="['yjyxdybh', {}]"   />
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="镇">
                  <a-select placeholder="请选择镇"  v-decorator="[ 'yjyxdymc',  { rules: [{ required: true, message: '请选择镇!'}]} ]"  @change="ssxzChange"  >
                    <a-select-option v-for="item in yjxydyOptions" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :lg="8" >
                <a-input  hidden="true" v-decorator="['ejyxdybh', {}]" />
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="村">
                  <a-select placeholder="请选择村" v-decorator="[ 'ejyxdymc',  { rules: [{ required: true, message: '请选择村!', whitespace: true }],}, ]"   @change="xzcChange" >
                    <a-select-option v-for="item in ejxydyOptions" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-input  hidden="true" v-decorator="['sjyxdybh', {}]" />
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="组">
                  <a-select placeholder="请选择组"  v-decorator="[ 'sjyxdymc',  { rules: [{ required: true, message: '请选择村!', whitespace: true }],}, ]"    @change="xzzChange" >
                    <a-select-option v-for="item in sjxydyOptions" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row  class="form-row" :gutter="16">

              <a-col :lg="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="客户身份">
                  <j-multi-select-tag placeholder="客户身份" v-decorator="['khlx', {}]" dict-code="khsf" style="width: 100%;"/>
                </a-form-item>
              </a-col>

              <!--<a-col :lg="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="项目">
                  <a-input placeholder="请输入客户项目" v-decorator="['khxm', {}]"/>
                </a-form-item>
              </a-col>-->
              <a-col :lg="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="是否授信对象">
                  <j-dict-select-tag placeholder="请选择是否授信对象" style="width: 100%;" v-decorator="['sfsxdx', {rules: [{  }]}]" :triggerChange="true" dictCode="sfbz"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-divider orientation="left" style="color: #1890FF;">补充信息</a-divider>
            <a-row  class="form-row" :gutter="16">
              <a-col :lg="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="对外担保">
                  <j-dict-select-tag placeholder="请输入对外担保" v-decorator="['dwdb', {}]" dictCode="sfbz" :triggerChange="true" @change="onChangeEvent"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="16" v-show="this.IsShowDwdbxx == '1'">
              <a-col :lg="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="担保对象">
                  <a-input placeholder="请输入担保对象" v-decorator="['dbdx', {}]"/>
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="其他用信">
                  <a-input placeholder="请输入其他用信" v-decorator="['qtyx', {}]"/>
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="担保备注">
                  <a-input placeholder="请输入担保备注" v-decorator="['dbbz', {}]"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row  class="form-row" :gutter="16">
              <a-col :lg="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="共同借款人">
                  <a-input placeholder="请输入共同借款人" v-decorator="['gtjkr', {}]"/>
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item
                  :labelCol="{xs: { span: 24 },sm: { span: 9 }}"
                  :wrapperCol="{xs: { span: 24 },sm: { span: 15 }}"
                  label="共同借款人手机号码">
                  <a-input placeholder="请输入手机号码" v-decorator="['gtjkrsj', {}]"/>
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item
                  :labelCol="{xs: { span: 24 },sm: { span: 9 }}"
                  :wrapperCol="{xs: { span: 24 },sm: { span: 15 }}"
                  label="共同借款人证件号码">
                  <a-input placeholder="请输入证件号码" v-decorator="['gtjkrzjhm', {}]"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row  class="form-row" :gutter="16">
              <a-col :lg="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="指定签收人">
                  <a-input placeholder="请输入指定签收人" v-decorator="['zdqsr', {}]"/>
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="签收人手机">
                  <a-input placeholder="请输入签收人手机" v-decorator="['qsrsj', {}]"/>
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="签收人传真">
                  <a-input placeholder="请输入签收人传真" v-decorator="['qsrcz', {}]"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row  class="form-row" :gutter="16">
              <a-col :lg="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="签收人邮箱">
                  <a-input placeholder="请输入签收人邮箱" v-decorator="['qsryx', {}]"/>
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="签收人微信">
                  <a-input placeholder="请输入签收人微信" v-decorator="['qsrwx', {}]"/>
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="其他签收方式">
                  <a-input placeholder="请输入其他签收方式" v-decorator="['qtqsfs', {}]"/>
                </a-form-item>
              </a-col>
            </a-row>

            <a-divider orientation="left" style="color: #1890FF;">资信状况</a-divider>
            <div>
              <a-row type="flex"  justify="center" align="middle">
                <a-col :span="10" :offset="1">
                  是否有失信人或被执行人信息或记录:
                </a-col>
                <a-col :span="11" :offset="0">
                  <a-form-item >
                    <a-radio-group  v-decorator="['sfsxrhbzxr', {}]"  >
                      <a-radio value="1">是</a-radio>
                      <a-radio value="2">否</a-radio>
                      <a-input v-show="this.form.getFieldValue('sfsxrhbzxr')=='1'"  v-decorator="['sfrqksm', {}]"   size="small" style="border:0;border-bottom: 1px solid #ddd;;width: 100px"/>
                    </a-radio-group>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row type="flex"  justify="center" align="middle">
                <a-col :span="10" :offset="1">
                  启信宝或企查查网站查询是否有风险信息:
                </a-col>
                <a-col :span="11" :offset="0">
                  <a-form-item >
                    <a-radio-group  v-decorator="['sfyfxxx', {}]"  >
                      <a-radio value="1">是</a-radio>
                      <a-radio value="2">否</a-radio>
                      <a-input v-show="this.form.getFieldValue('sfyfxxx')=='1'"  v-decorator="['fxxxqksm', {}]"   size="small" style="border:0;border-bottom: 1px solid #ddd;;width: 100px"/>
                    </a-radio-group>
                  </a-form-item>
                </a-col>
              </a-row>
            </div>
          </a-tab-pane>
          <a-tab-pane tab="家庭成员" key="2" :forceRender="true">
            <a-card class="card" :bordered="false">
              <j-editable-table
                AddButtonName="添加成员"
                rowKey="zjhm"
                :ref="refKeys[0]"
                :loading="jtcyxxTable.loading"
                :columns="jtcyxxTable.columns"
                :dataSource="jtcyxxTable.dataSource"
                :maxHeight="300"
                :rowNumber="true"
                :rowSelection="true"
                :actionButton="true">
              </j-editable-table>
            </a-card>
          </a-tab-pane>
          <a-tab-pane tab="关联企业" key="3" :forceRender="true">
            <a-card class="card" :bordered="false">
              <j-editable-table
                AddButtonName="添加企业"
                rowKey="zjhm"
                :ref="refKeys[1]"
                :loading="glqyTable.loading"
                :columns="glqyTable.columns"
                :dataSource="glqyTable.dataSource"
                :maxHeight="300"
                :rowNumber="true"
                :rowSelection="true"
                :actionButton="true">
              </j-editable-table>
            </a-card>
          </a-tab-pane>
          <a-tab-pane tab="资产负债情况" key="4" :forceRender="true">
            <a-divider orientation="left" style="color: #1890FF;">
              固定资产信息<span><font style="color: red;font-size: 15px;"> 固定资产合计: {{this.gdzcHj}} 万元</font></span>
            </a-divider>
            <a-card class="card" :bordered="false">
              <j-editable-table rowKey="zjhm"
                                AddButtonName="添加住房"
                                :ref="refKeys[2]"
                                :loading="fwxxTable.loading"
                                :columns="fwxxTable.columns"
                                :dataSource="fwxxTable.dataSource"
                                :maxHeight="300"
                                :rowNumber="true"
                                :rowSelection="true"
                                :actionButton="true"
                                @valueChange="fwChange"/>
              <j-editable-table rowKey="zjhm"
                                AddButtonName="添加厂房"
                                :ref="refKeys[3]"
                                :loading="cfxxTable.loading"
                                :columns="cfxxTable.columns"
                                :dataSource="cfxxTable.dataSource"
                                :maxHeight="300"
                                :rowNumber="true"
                                :rowSelection="true"
                                :actionButton="true"
                                @valueChange="cfChange"/>
              <j-editable-table rowKey="zjhm"
                                AddButtonName="添加车辆"
                                :ref="refKeys[4]"
                                :loading="clxxTable.loading"
                                :columns="clxxTable.columns"
                                :dataSource="clxxTable.dataSource"
                                :maxHeight="300"
                                :rowNumber="true"
                                :rowSelection="true"
                                @valueChange="clChange"
                                :actionButton="true"/>
              <j-editable-table rowKey="zjhm"
                                AddButtonName="添加其他固定资产"
                                :ref="refKeys[5]"
                                :loading="qtglzcTable.loading"
                                :columns="qtglzcTable.columns"
                                :dataSource="qtglzcTable.dataSource"
                                :maxHeight="300"
                                :rowNumber="true"
                                :rowSelection="true"
                                :actionButton="true"
                                @valueChange="qtgdzcChange"/>
            </a-card>

            <a-divider orientation="left" style="color: #1890FF;">
              流动资产信息<span><font style="color: red;font-size: 15px;"> 流动资产合计: {{this.ldzcHj}} 万元</font></span>
            </a-divider>
            <a-card class="card" :bordered="false">
              <a-table size="middle"
                       bordered
                       :pagination="false"
                       :columns="ldzcTable.columns"
                       :dataSource="ldzcTable.dataSource">
                <template slot-scope="text, record, index" v-for="ldzccolname in ['xjck', 'ycl', 'bcp','ccp','yszk','yfzk']" :slot="ldzccolname">
                  <template>
                    <a-input :value="text"  @change="e => ldzcChange(e.target.value, record.key, ldzccolname)" style="margin: -5px 0"/>
                  </template>
                </template>
              </a-table>
            </a-card>
            <a style="width:300px;margin-left:82.6%;">
              <font style="color: red">资产总额 : </font>
              <a-input v-model="this.zczeHj" size="small" style="border:0;border-bottom: 1px solid #ddd;;width: 60px" :disabled="true"/>万元
            </a>

            <a-divider orientation="left" style="color: #1890FF;">负债信息</a-divider>
            <a-card class="card" :bordered="false">
              <j-editable-table rowKey="zjhm"
                                AddButtonName="添加银行贷款"
                                :ref="refKeys[6]"
                                :loading="yhdkTable.loading"
                                :columns="yhdkTable.columns"
                                :dataSource="yhdkTable.dataSource"
                                :maxHeight="300"
                                :rowNumber="true"
                                :rowSelection="true"
                                :actionButton="true"
                                @valueChange="yhdkChange"/>
              <a-table size="middle"
                       bordered
                       :pagination="false"
                       :columns="qtjkTable.columns"
                       :dataSource="qtjkTable.dataSource">
                <template slot-scope="text, record, index" v-for="qtjkcolname in ['qtjk', 'fzyf', 'fzys']" :slot="qtjkcolname">
                  <template >
                    <a-input :value="text" @change="e => qtjkChange(e.target.value, record.key, qtjkcolname)" style="margin: -5px 0"/>
                  </template>
                </template>
              </a-table>
            </a-card>
            <a style="width:300px;margin-left:82.6%;">
              <font style="color: red">负债总额 : </font>
              <a-input v-model="this.fzzeHj" size="small" style="border:0;border-bottom: 1px solid #ddd;;width: 60px" :disabled="true"/>万元
            </a>

            <a-card class="card" :bordered="false">
              <a-alert :banner="true" :message="`净资产：${this.jzcHj} 万元`" type="info"/>
            </a-card>
          </a-tab-pane>
          <a-tab-pane tab="经营状况" key="5" :forceRender="true">
            <div>
              <a-row type="flex"  justify="center" align="middle">
                <a-col :span="10" :offset="1">去年产值:</a-col>
                <a-col :span="11" :offset="0"><a-form-item>
                   <a-input-number placeholder="请输入金额" v-decorator="['qncz', {}]" :min="0" size="small" style="border:0;border-bottom: 1px solid #ddd;;width: 150px;"/>万元
                </a-form-item></a-col>
              </a-row>
              <a-row type="flex"  justify="center" align="middle">
                <a-col :span="10" :offset="1">销售额:</a-col>
                <a-col :span="11" :offset="0"><a-form-item>
                    <a-input-number placeholder="请输入金额" v-decorator="['xse', {}]" :min="0" size="small" style="border:0;border-bottom: 1px solid #ddd;;width: 150px;"/>万元
                </a-form-item></a-col>
              </a-row>
              <!--<a-row type="flex"  justify="center" align="middle">
                <a-col :span="10" :offset="1">
                  税金:
                </a-col>
                <a-col :span="11" :offset="0">
                  <a-form-item >
                    <a-input    placeholder="请输入金额"  v-decorator="['sj', {}]"   size="small" style="border:0;border-bottom: 1px solid #ddd;;width: 60px"/>万元
                  </a-form-item>
                </a-col>
              </a-row>-->
              <a-row type="flex"  justify="center" align="middle">
                <a-col :span="10" :offset="1">净利润:</a-col>
                <a-col :span="11" :offset="0"><a-form-item>
                  <a-input-number placeholder="请输入金额" v-decorator="['jlr', {}]" :min="0" size="small" style="border:0;border-bottom: 1px solid #ddd;;width: 150px;"/>万元
                </a-form-item></a-col>
              </a-row>
              <!--<a-row type="flex"  justify="center" align="middle">
                <a-col :span="10" :offset="1">
                  发放工资:
                </a-col>
                <a-col :span="11" :offset="0">
                  <a-form-item >
                    <a-input    placeholder="请输入金额"  v-decorator="['ffgz', {}]"   size="small" style="border:0;border-bottom: 1px solid #ddd;;width: 60px"/>万元
                  </a-form-item>
                </a-col>
              </a-row>-->
              <a-row type="flex"  justify="center" align="middle">
                <a-col :span="10" :offset="1">截止调查日产值:</a-col>
                <a-col :span="11" :offset="0"><a-form-item>
                  <a-input-number placeholder="请输入金额" v-decorator="['zzdcrcz', {}]" :min="0" size="small" style="border:0;border-bottom: 1px solid #ddd;;width: 150px;"/>万元
                </a-form-item></a-col>
              </a-row>
              <a-row type="flex" justify="center" align="middle">
                <a-col :span="10" :offset="1">截止调查日利润:</a-col>
                <a-col :span="11" :offset="0"><a-form-item>
                  <a-input-number placeholder="请输入金额" v-decorator="['zzdcrlr', {}]" :min="0" size="small" style="border:0;border-bottom: 1px solid #ddd;;width: 150px;"/>万元
                </a-form-item></a-col>
              </a-row>
              <a-row type="flex" justify="center" align="middle">
                <a-col :span="10" :offset="1">预计今年全年产值:</a-col>
                <a-col :span="11" :offset="0"><a-form-item>
                  <a-input-number placeholder="请输入金额" v-decorator="['yjjnqncz', {}]" :min="0" size="small" style="border:0;border-bottom: 1px solid #ddd;;width: 150px;"/>万元
                </a-form-item></a-col>
              </a-row>
              <a-row type="flex" justify="center" align="middle">
                <a-col :span="10" :offset="1">预计净利润:</a-col>
                <a-col :span="11" :offset="0"><a-form-item>
                  <a-input-number placeholder="请输入金额" v-decorator="['yjjlr', {}]" :min="0" size="small" style="border:0;border-bottom: 1px solid #ddd;;width: 150px;"/>万元
                </a-form-item></a-col>
              </a-row>
              <a-row type="flex"  justify="center" align="middle">
                <a-col :span="10" :offset="1">市场前景:</a-col>
                <a-col :span="11" :offset="0"><a-form-item >
                  <a-radio-group v-decorator="['scqj', {}]" :options="scqjOptions"/>
                </a-form-item></a-col>
              </a-row>
            </div>
          </a-tab-pane>
          <a-tab-pane tab="担保方式" key="6" :forceRender="true">
            <a-card class="card" :bordered="false">
              <a-tabs v-model="activeKey" @change="handleChangeTabs">
                <a-tab-pane tab="保证担保" :key="refKeys[7]" :forceRender="true">
                  <j-editable-table :ref="refKeys[7]"
                                    :loading="bzdbTable.loading"
                                    :columns="bzdbTable.columns"
                                    :dataSource="bzdbTable.dataSource"
                                    :maxHeight="300"
                                    :rowNumber="true"
                                    :rowSelection="true"
                                    :actionButton="true"/>
                </a-tab-pane>
                <a-tab-pane tab="抵押担保" :key="refKeys[8]" :forceRender="true">
                  <j-editable-table :ref="refKeys[8]"
                                    :loading="dydbTable.loading"
                                    :columns="dydbTable.columns"
                                    :dataSource="dydbTable.dataSource"
                                    :maxHeight="300"
                                    :rowNumber="true"
                                    :rowSelection="true"
                                    :actionButton="true"/>
                </a-tab-pane>
                <a-tab-pane tab="质押担保" :key="refKeys[9]" :forceRender="true">
                  <j-editable-table :ref="refKeys[9]"
                                    :loading="zydbTable.loading"
                                    :columns="zydbTable.columns"
                                    :dataSource="zydbTable.dataSource"
                                    :maxHeight="300"
                                    :rowNumber="true"
                                    :rowSelection="true"
                                    :actionButton="true"/>
                </a-tab-pane>
                <a-tab-pane tab="信用担保" :key="refKeys[10]" :forceRender="true">
                  <j-editable-table :ref="refKeys[10]"
                                    :loading="xydbTable.loading"
                                    :columns="xydbTable.columns"
                                    :dataSource="xydbTable.dataSource"
                                    :maxHeight="300"
                                    :rowNumber="true"
                                    :rowSelection="true"
                                    :actionButton="true"/>
                </a-tab-pane>
              </a-tabs>
            </a-card>
          </a-tab-pane>
          <a-tab-pane tab="授信申请" key="7" :forceRender="true">
            <a-divider orientation="left" style="color: #1890FF;">申请信息</a-divider>
             <div>
                <a-row type="flex"  justify="center" align="middle">
                  <a-col :span="10" :offset="1">
                    申请金额:
                  </a-col>
                  <a-col :span="12" :offset="0">
                    <a-form-item >
                      <a-input-number placeholder="请输入金额" v-decorator="['sqje', {}]" :min="0" size="small" style="border:0;border-bottom: 1px solid #ddd;;width: 200px"/>万元
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row type="flex"  justify="center" align="middle">
                  <a-col :span="10" :offset="1">
                    借款用途:
                  </a-col>
                  <a-col :span="12" :offset="0">
                    <a-form-item >
                      <a-input    placeholder="请填写借款用途(不多于50字)"  v-decorator="['jkyt', {}]"   size="small" style="border:0;border-bottom: 1px solid #ddd;;width: 200px"/>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row type="flex"  justify="center" align="middle">
                  <a-col :span="10" :offset="1">
                    借款期限:
                  </a-col>
                  <a-col :span="12" :offset="0">
                    <a-form-item >
                      <a-input-number placeholder="请输入月数"  v-decorator="['jkqx', {}]" :min="0" size="small" style="border:0;border-bottom: 1px solid #ddd;;width: 200px"/>月
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row type="flex"  justify="center" align="middle">
                  <a-col :span="10" :offset="1">
                    用信方式:
                  </a-col>
                  <a-col :span="12" :offset="0">
                    <a-form-item >
                      <a-checkbox-group   v-model="jkfsList" @change="jkfsChange"  >
                        <a-checkbox  value="1" >福农卡</a-checkbox>
                         <a-input-number placeholder="福农卡金额" v-decorator="['fnkjkje', {}]" :min="0" size="small" style="border: 1px solid #ddd;width: 100px"/>
                        <a-checkbox  value="2" >便明卡</a-checkbox>
                         <a-input-number placeholder="便明卡金额" v-decorator="['bmkjkje', {}]" :min="0" size="small" style="border: 1px solid #ddd;width: 100px"/>
                        <a-checkbox  value="3" >担保金额</a-checkbox>
                         <a-input-number placeholder="担保金额" v-decorator="['dbjkje', {}]" :min="0" size="small" style="border: 1px solid #ddd;width: 100px"/>
                      </a-checkbox-group>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row type="flex"  justify="center" align="middle">
                  <a-col :span="10" :offset="1">还款来源:</a-col>
                  <a-col :span="12" :offset="0">
                    <a-form-item >
                      <a-input placeholder="请填写还款来源" v-decorator="['hkfs', {}]" size="small" style="border:0;border-bottom: 1px solid #ddd;;width: 200px"/>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row type="flex"  justify="center" align="middle">
                  <a-col :span="10" :offset="1">还款计划:</a-col>
                  <a-col :span="12" :offset="0">
                    <a-form-item >
                      <j-dict-select-tag placeholder="请选择还款计划" style=" border:0;border-bottom: 1px solid #ddd;width: 200px " v-decorator="['hkjh', {}]" :triggerChange="true" dictCode="grdk_hkjh" />
                    </a-form-item>
                  </a-col>
                </a-row>
              </div>
              <a-divider orientation="left" style="color: #1890FF;">贷款风险点分析及防范措施</a-divider>
                <a-row class="form-row" :gutter="16">
                  <a-col :span="24" :pull="2"><a-form-item
                    :labelCol="{ xs: { span: 24 }, sm: { span: 4} }"
                    :wrapperCol="{ xs: { span: 24 }, sm: { span: 20 }}"
                    label="措施">
                    <a-textarea  placeholder="请填写贷款风险点分析及防范措施" v-decorator="['dkfxdjfycs', {rules: [{  }]}]" :autosize="{ minRows: 2, maxRows: 4 }"/>
                  </a-form-item></a-col>
                </a-row>

              <a-divider orientation="left" style="color: #1890FF;">备注信息</a-divider>
              <a-row class="form-row" :gutter="16">
                <a-col :span="24" :pull="2"><a-form-item
                  :labelCol="{ xs: { span: 24 }, sm: { span: 4} }"
                  :wrapperCol="{ xs: { span: 24 }, sm: { span: 20 }}"
                  label="备注信息">
                  <a-textarea placeholder="请填写备注信息" v-decorator="['bz', {rules: [{  }]}]" :autosize="{ minRows: 2, maxRows: 4 }"/>
                </a-form-item></a-col>
              </a-row>
          </a-tab-pane>
          <a-tab-pane tab="附件信息" key="10" :forceRender="true">
            <photo-view ref="photoView" :showupload="false"/>
          </a-tab-pane>
        </a-tabs>
      </a-form>
    </a-spin>

    <template slot="footer">
      <a-button key="back" @click="handleCancel">取消</a-button>
      <a-button key="submit" :disabled="disableSubmit" type="primary" :loading="loading" @click="handleOk">保存</a-button>
    </template>
  </j-modal>
</template>

<script>
  import moment from 'moment'
  import pick from 'lodash.pick'
  import { FormTypes } from '@/utils/JEditableTableUtil'
  import { JEditableTableMixin } from '@/mixins/JEditableTableMixin'
  import JSelectEjyxdy from '@/views/yxdygl/pqzrrgl/modules/JSelectEjyxdy'
  import JSelectSjyxdy from '@/views/yxdygl/pqzrrgl/modules/JSelectSjyxdy'
  import JDictSelectTag from '@/components/dict/JDictSelectTag'
  import ARow from 'ant-design-vue/lib/grid/Row'
  import { VALIDATE_NO_PASSED, getRefPromise, validateFormAndTables } from '@/utils/JEditableTableUtil'
  import { getAction, httpAction } from '@/api/manage'
  import JMultiSelectTag from '@/components/dict/JMultiSelectTag'
  import PhotoView from './PhotoView.vue'
  import { getEjyxdyOption, getSjyxdyOption, getYjyxdyOption } from '@api/area'

  export default {
    name: 'GrdkglModal',
    mixins: [JEditableTableMixin],
    components: {ARow,JSelectEjyxdy,JSelectSjyxdy,JDictSelectTag,JMultiSelectTag,PhotoView},
    data() {
      return {
        yjxydyOptions: [{value:'', label: '请选择'}],
        ejxydyOptions: [{value:'', label: '请选择'}],
        sjxydyOptions: [{value:'', label: '请选择'}],
        loading:false,
        disableSubmit:false,
        // 新增时子表默认添加几行空数据
        addDefaultRowNum: 1,
        validatorRules: {},
        refKeys: ['jtcyxx', 'glqy', 'fwxx', 'cfxx', 'clxx', 'qtglzc', 'yhdk', 'bzdb','dydb', 'zydb', 'xydb', ],
        activeKey: 'jtcyxx',
        yjyxdymc:'',
        jkfsList:[],
        ejyxdymc:'',
        sjyxdymc:'',
        gdzcHj:0,
        ldzcHj:0,
        qtjkHj:0,
        yhjkHj:0,
        fzzeHj:0,
        count:0,
        fwZc:0,
        cfZc:0,
        clZc:0,
        qtgdZc:0,
        zczeHj:0,
        jzcHj:0,
        IsShowDwdbxx: '2',
        showZjhm:true,
        sfrqksmShow:false,
        fxxxqksmShow:false,
        scqjOptions:[
          { label: '良好', value: '1' },
          { label: '较好', value: '2' },
          { label: '一般', value: '3' },
          { label: '差',   value: '4' }
          ],
        plainOptions : [
          { label: '福农卡', value: '1' },
          { label: '便民卡', value: '2' },
          { label: '担保金额', value: '3' },
          ],
        // 家庭成员
        jtcyxxTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '姓名',
              key: 'khmc',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [
                {
                  required: true, // 必填
                  message: '${title}不能为空' // 提示的文本
                },
              ]
            },
            {
              title: '证件号码',
              key: 'zjhm',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [
                {
                  // 自定义函数校验 handler
                  handler(type, value, row, column, callback, target) {
                    if (type === 'input'||type === 'blur') {
                      if (value === '') {
                        callback(false, '${title}不能为空') // false = 未通过，可以跟自定义提示
                        return
                      }else{
                        var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
                        var tip = ""
                        var pass = true
                        if (!value || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(value)) {
                          tip = "身份证格式错误"
                          pass = false;
                        } else if (!city[value.substr(0, 2)]) {
                          // tip = "地址编码错误"
                          tip="身份证输入错误"
                          pass = false
                        } else {
                          // 18位身份证需要验证最后一位校验位
                          if (value.length === 18) {
                            value = value.split('')
                            // ∑(ai×Wi)(mod 11)
                            // 加权因子
                            var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
                            // 校验位
                            var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
                            var sum = 0
                            var ai = 0
                            var wi = 0
                            for (var i = 0; i < 17; i++) {
                              ai = value[i]
                              wi = factor[i]
                              sum += ai * wi
                            }
                            var last = parity[sum % 11];
                            if (parity[sum % 11] != value[17]) {
                              // tip = "校验位错误"
                              tip="身份证输入错误"
                              pass = false
                            }
                          }
                        }
                        if (!pass) {
                          callback(false,tip)
                        } else {
                          callback(true)
                        }

                      }
                      callback(true) // true = 通过验证
                    } else {
                      callback() // 不填写或者填写 null 代表不进行任何操作
                    }
                  },
                  message: '${title}默认提示'
                }
              ]
            },

            {
              title: '联系电话',
              key: 'sjhm',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '从事职业',
              placeholder: '请选择${title}',
              key: 'cszy',
              type: FormTypes.select,
              options: [],
              dictCode: 'cszy',
              allowSearch: true,
            },
            {
              title: '与被评价人关系',
              placeholder: '请选择${title}',
              key: 'yhzgx',
              type: FormTypes.select,
              align: "center",
              options: [],
              dictCode: 'yhzgx',
              validateRules: [
                {
                  required: true, // 必填
                  message: '${title}不能为空' // 提示的文本
                },
              ]
            },
          ]
        },
        // 关联企业
        glqyTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '公司名称',
              key: 'gsmc',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '统一社会信用代码',
              key: 'tyshxydm',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '占股比例(%)',
              key: 'zgbl',
              type: FormTypes.inputNumber,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
          ]
        },
        // 房产信息
        fwxxTable: {
          loading: false,
          dataSource: [],
          columns: [

            {
              title: '占地面积',
              key: 'zdmj',
              type: FormTypes.inputNumber,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '房屋面积',
              key: 'fwmj',
              type: FormTypes.inputNumber,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '评估价值',
              key: 'pjgz',
              type: FormTypes.inputNumber,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '具体位置',
              key: 'jtwz',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '土地性质',
              key: 'tdxz',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
          ]
        },
        // 厂房信息
        cfxxTable: {
          loading: false,
          dataSource: [],
          columns: [

            {
              title: '占地面积',
              key: 'zdmj',
              type: FormTypes.inputNumber,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '房屋面积',
              key: 'fwmj',
              type: FormTypes.inputNumber,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '评估价值',
              key: 'pjgz',
              type: FormTypes.inputNumber,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '具体位置',
              key: 'jtwz',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '土地性质',
              key: 'tdxz',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
          ]
        },
        // 车辆信息
        clxxTable: {
          loading: false,
          dataSource: [],
          columns: [

            {
              title: '车辆牌照',
              key: 'clpz',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '评估价值',
              key: 'pjgz',
              type: FormTypes.inputNumber,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '车辆类型',
              key: 'cllx',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
          ]
        },
        ldzcTableObject:{},
        // 流动资产
        ldzcTable: {
          loading: false,
          dataSource: [
            { }
          ],
          columns: [
            {
              title: '现金和存款',
              key: 'xjck',
              align: "center",
              dataIndex: 'xjck',
              scopedSlots: { customRender: 'xjck' },
              width:100,
              placeholder: '请输入${title}',
            },

            {
              title: '原材料',
              key: 'ycl',
              align: "center",
              dataIndex: 'ycl',
              scopedSlots: { customRender: 'ycl' },
              width:100,
              placeholder: '请输入${title}',
            },
            {
              title: '半成品',
              key: 'bcp',
              align: "center",
              dataIndex: 'bcp',
              scopedSlots: { customRender: 'bcp' },
              width:100,
              placeholder: '请输入${title}',
            },
            {
              title: '产成品',
              key: 'ccp',
              align: "center",
              dataIndex: 'ccp',
              scopedSlots: { customRender: 'ccp'},
              width:100,
              placeholder: '请输入${title}',
            },
            {
              title: '应收账款',
              key: 'yszk',
              align: "center",
              dataIndex: 'yszk',
              scopedSlots: { customRender: 'yszk'},
              width:100,
              placeholder: '请输入${title}',
            },
            {
              title: '预付账款',
              key: 'yfzk',
              align: "center",
              dataIndex: 'yfzk',
              scopedSlots: { customRender: 'yfzk'},
              width:100,
              placeholder: '请输入${title}',
            },

          ]
        },
        // 其他固定资产
        qtglzcTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '资产名称及简介',
              key: 'zcmcjjj',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '评估价值',
              key: 'pjgz',
              type: FormTypes.inputNumber,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '具体位置',
              key: 'jtwz',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
          ]
        },
        // 银行贷款
        yhdkTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款银行',
              key: 'dkyh',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '金额',
              key: 'dkje',
              type: FormTypes.inputNumber,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '担保物或担保人',
              key: 'dbwhdbr',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '到期时间',
              key: 'dkzh',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
          ]
        },
        qtjkTableObject:{},
        // 其他借款
        qtjkTable: {
          loading: false,
          dataSource: [
            { }
          ],
          columns: [
            {
              title: '其他借款(万元)',
              key: 'qtjk',
              align: "center",
              dataIndex: 'qtjk',
              scopedSlots: { customRender: 'qtjk' },
              width:100,
              placeholder: '请输入${title}',
            },

            {
              title: '应付账款(万元)',
              key: 'fzyf',
              align: "center",
              dataIndex: 'fzyf',
              scopedSlots: { customRender: 'fzyf' },
              width:100,
              placeholder: '请输入${title}',
            },
            {
              title: '预收账款(万元)',
              key: 'fzys',
              align: "center",
              dataIndex: 'fzys',
              scopedSlots: { customRender: 'fzys' },
              width:100,
              placeholder: '请输入${title}',
            },
          ]
        },
        // 保证担保
        bzdbTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '担保人',
              key: 'dbr',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '资产',
              key: 'dbrzz',
              type: FormTypes.inputNumber,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '负债',
              key: 'dbrfz',
              type: FormTypes.inputNumber,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '负债中银行贷款',
              key: 'dbrfzzdk',
              type: FormTypes.inputNumber,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '经营盈利情况',
              key: 'dbrylqk',
              type: FormTypes.select,
              defaultValue: '',
              placeholder: '请选择${title}',
              allowSearch: true,
              dictCode: 'jyylqk',
            },
            {
              title: '担保人身份证号',
              key: 'dbrzjhm',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '担保人地址',
              key: 'dbrdz',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '担保人性别',
              key: 'dbrxb',
              type: FormTypes.select,
              defaultValue: '',
              placeholder: '请选择${title}',
              allowSearch: true,
              dictCode: 'sex',
            },
            {
              title: '担保人婚姻状况',
              key: 'dbrhyzk',
              type: FormTypes.select,
              defaultValue: '',
              placeholder: '请选择${title}',
              allowSearch: true,
              dictCode: 'hyzk_cj',
            },
            {
              title: '担保人配偶姓名',
              key: 'dbrpoxm',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '担保人配偶身份证号',
              key: 'dbrpozjhm',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '担保人配偶联系方式',
              key: 'dbrpolxfs',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
          ]
        },
        // 抵押担保
        dydbTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '抵押物类型',
              key: 'zywlx',
              type: FormTypes.select,
              defaultValue: '',
              placeholder: '请选择${title}',
              allowSearch: true,
              dictCode: 'grdk_dzylx_dy',
            },
            {
              title: '所有权人',
              key: 'syqr',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '与被调查人关系',
              key: 'ybdcrgx',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '评估值',
              key: 'pgz',
              type: FormTypes.inputNumber,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '使用权面积',
              key: 'syqmj',
              type: FormTypes.inputNumber,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '具体位置',
              key: 'jtwz',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '不动产登记证号',
              key: 'bdcdjzh',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '不动产用途',
              key: 'bdcyt',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '不动产建成时间',
              key: 'bdcjcsj',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '不动产每方单价',
              key: 'bdcmpfdj',
              type: FormTypes.inputNumber,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '所有权人电话',
              key: 'syqrdh',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '抵押贷款金额',
              key: 'dydkje',
              type: FormTypes.inputNumber,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '土地证号',
              key: 'tdzh',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '土地类型',
              key: 'tdlx',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '土地用途',
              key: 'tdyt',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '土地使用面积',
              key: 'tdsymj',
              type: FormTypes.inputNumber,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '土地终止日期',
              key: 'tdzzrq',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '房产证号',
              key: 'fczh',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '总层数',
              key: 'zcs',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '整栋用途',
              key: 'zdyt',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '房产建成时间',
              key: 'fcjcsj',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '房屋楼层',
              key: 'fclc',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '房屋用途',
              key: 'fcyt',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '房屋建筑面积',
              key: 'fcjzmj',
              type: FormTypes.inputNumber,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '整栋建筑面积',
              key: 'zdljzmj',
              type: FormTypes.inputNumber,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
          ]
        },
        // 质押担保
        zydbTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '质押物类型',
              key: 'zywlx',
              type: FormTypes.select,
              defaultValue: '',
              placeholder: '请选择${title}',
              allowSearch: true,
              dictCode: 'grdk_dzylx_zy',
            },
            {
              title: '所有权人',
              key: 'syqr',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '与被调查人关系',
              key: 'ybdcrgx',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              /*dictCode: 'yhzgx',*/
            },
            {
              title: '评估值',
              key: 'pgz',
              type: FormTypes.inputNumber,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '使用权面积',
              key: 'syqmj',
              type: FormTypes.inputNumber,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '具体位置',
              key: 'jtwz',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
          ]
        },
        // 信用担保
        xydbTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '担保类型',
              key: 'dblx',
              type: FormTypes.select,
              defaultValue: '1',
              placeholder: '请选择${title}',
              dictCode: 'grdk_xydb',
            },
          ]
        },
        labelCol: {
          xs: {span: 24},
          sm: {span: 8},
        },
        wrapperCol: {
          xs: {span: 24},
          sm: {span: 16},
        },
        url: {
          add: "/xdgl/grdkgl/add",
          edit: "/xdgl/grdkgl/edit",
          jtcyxx: {
            list: '/xdgl/grdkgl/queryJtcyxxByMainId'
          },
          glqy: {
            list: '/xdgl/grdkgl/queryGlqyByMainId'
          },
          fwxx: {
            list: '/xdgl/grdkgl/queryFwxxByMainId'
          },
          cfxx: {
            list: '/xdgl/grdkgl/queryCfxxByMainId'
          },
          clxx: {
            list: '/xdgl/grdkgl/queryClxxByMainId'
          },
          qtglzc: {
            list: '/xdgl/grdkgl/queryQtglzcByMainId'
          },
          yhdk: {
            list: '/xdgl/grdkgl/queryYhdkByMainId'
          },
          bzdb: {
            list: '/xdgl/grdkgl/queryBzdbByMainId'
          },
          dydb: {
            list: '/xdgl/grdkgl/queryDydbByMainId'
          },
          zydb: {
            list: '/xdgl/grdkgl/queryZydbByMainId'
          },
          xydb: {
            list: '/xdgl/grdkgl/queryXydbByMainId'
          },
        },
      }
    },
    created () {
      this.init();
    },

    methods: {
      init() {
        //获取一级营销单元下拉列表数据
        getYjyxdyOption().then(response => {
          let list = response.result
          list.forEach(item => {
            this.yjxydyOptions.push({
              value: item.dybh,
              label: item.dymc
            })
          })
        })

        getEjyxdyOption({}).then(response => {
          console.log(response)
          let list = response.result
          list.forEach(item => {
            this.ejxydyOptions.push({
              value: item.dybh,
              label: item.dymc
            })
          })
        })

        getSjyxdyOption({}).then(response => {
          let list = response.result
          list.forEach(item => {
            this.sjxydyOptions.push({
              value: item.dybh,
              label: item.dymc
            })
          })
        })
      },
      add (value) {
        this.edit({});
        this.$nextTick(() => {
           this.form.setFieldsValue({ zjhm: value.zjhm})
           this.form.setFieldsValue({csny:value.zjhm.substr(6,8)})
        });
      },
      jkfsChange(jkfslist){
        console.log(jkfslist)
      },
      inityhdk(){
        const yhdkData = [...this.yhdkTable.dataSource];
        this.yhjkHj=0;
        for (let i = 0; i < yhdkData.length; i++) {
          this.yhjkHj+=(yhdkData[i].dkje == '' ||yhdkData[i].dkje == 'undefined' ||yhdkData[i].dkje == null? 0 : parseFloat(yhdkData[i].dkje));
        }
        console.log('银行贷款合计 :',this.yhjkHj);
      },
      initfwxx(){
        const fwData = [...this.fwxxTable.dataSource];
        this.fwZc=0;
        for (let i = 0; i < fwData.length; i++) {
          this.fwZc+=(fwData[i].pjgz == '' ||fwData[i].pjgz == 'undefined' ||fwData[i].pjgz == null? 0 : parseFloat(fwData[i].pjgz));
        }
        console.log('房屋资产 :',this.fwZc);
      },
      initcfxx(){
        const cfData = [...this.cfxxTable.dataSource];
        this.cfZc=0;
        for (let i = 0; i < cfData.length; i++) {
          this.cfZc+=(cfData[i].pjgz == '' ||cfData[i].pjgz == 'undefined' ||cfData[i].pjgz == null? 0 : parseFloat(cfData[i].pjgz));
        }
        console.log('厂房资产 :',this.cfZc);
      },
      initclxx(){
        const clData = [...this.clxxTable.dataSource];
        this.clZc=0;
        for (let i = 0; i < clData.length; i++) {
          this.clZc+=(clData[i].pjgz == '' ||clData[i].pjgz == 'undefined' ||clData[i].pjgz == null? 0 : parseFloat(clData[i].pjgz));
        }
        console.log('车辆资产 :',this.clZc);
      },
      initqtglzc(){
        const qtgdzcData = [...this.qtglzcTable.dataSource];
        this.qtgdZc=0;
        for (let i = 0; i < qtgdzcData.length; i++) {
          this.qtgdZc+=(qtgdzcData[i].pjgz == '' ||qtgdzcData[i].pjgz == 'undefined' ||qtgdzcData[i].pjgz == null? 0 : parseFloat(qtgdzcData[i].pjgz));
        }
        console.log('其他固定资产 :',this.qtgdZc)
      },

      edit(record) {
        console.info('record -',record);
        if (typeof this.editBefore === 'function') this.editBefore(record)
        this.visible = true
        this.activeKey = this.refKeys[7]
        this.form.resetFields()
        this.model = Object.assign({}, record)
        this.$nextTick(() => {
          this.form.setFieldsValue({yjyxdymc:record.yjyxdybh,ejyxdymc:record.ejyxdybh,sjyxdymc:record.sjyxdybh});
        });
        this.qtjkHj=(record.qtjk==null?0:record.qtjk)+(record.fzyf==null?0:record.fzyf)+(record.fzys==null?0:record.fzys);
        this.ldzcHj=(record.ldzcHj==null?0:record.ldzcHj);
        this.fzzeHj=(record.fzzeHj==null?0:record.fzzeHj);
        let qtjkTableObject={"qtjk":record.qtjk,"fzyf":record.fzyf,"fzys":record.fzys}
        this.qtjkTable.dataSource=[];
        this.qtjkTable.dataSource.push(qtjkTableObject);
        let ldzcTableObject={"xjck":record.xjck,"ycl":record.ycl,"bcp":record.bcp,"ccp":record.ccp,"yszk":record.yszk,"yfzk":record.yfzk}
        this.ldzcTable.dataSource=[];
        this.ldzcTable.dataSource.push(ldzcTableObject);
        this.gdzcHj=(record.gdzcHj==null?0:record.gdzcHj);
        this.zczeHj=(record.zczeHj==null?0:record.zczeHj);
        this.jzcHj=(record.jzcHj==null?0:record.jzcHj);
        this.jkfsList=record.jkfs==null ? this.jkfsList:record.jkfs.split(',');
        //获取附件信息
        if (this.model.zjhm) {
          let params = { "zjhm": record.zjhm }
          getAction("/xdgl/grdkgl/img", params).then((res) => {
            if (res.success) {
              console.log('附件信息 :',res.result);
              this.$refs.photoView.showImg(res.result);
            }
          });
        }
        if (typeof this.editAfter === 'function') this.editAfter(this.model);
        if (record.dwdb === '1') this.IsShowDwdbxx = '1';
        if (record.dwdb === '2') this.IsShowDwdbxx = '2';
      },

      /** 调用完edit()方法之后会自动调用此方法 */
      editAfter() {
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'khmc', 'zjhm', 'khxm', 'cshy', 'khpx', 'dwdb', 'dbdx', 'qtyx', 'gtjkr', 'zdqsr', 'qsrsj', 'qsrcz', 'qsryx', 'qsrwx', 'qtqsfs', 'sfsxrhbzxr', 'sfyfxxx', 'sfrqksm', 'fxxxqksm', 'gdzcHj', 'xjck', 'ycl', 'bcp', 'ccp', 'yszk', 'yfzk', 'ldzcHj', 'zczeHj', 'fzzeHj', 'qtjk', 'fzyf', 'fzys', 'jzcHj', 'qncz', 'xse', 'sj', 'jlr', 'ffgz', 'zzdcrcz', 'zzdcrlr', 'yjjnqncz', 'yjjlr', 'scqj', 'sqje', 'jkyt', 'jkqx', 'qtjkfs', 'hkfs', 'hkjh', 'dyhkly', 'dehkly', 'dkfxdjfycs', 'bz', 'sskhjl', 'hmcId', 'sszh', 'ssyxdy', 'hhbm', 'yhzgx', 'sfhz', 'khlx', 'dz', 'xb', 'mz', 'hyzk', 'jgdm', 'csny', 'cszy', 'hjdz', 'sjhm','yjyxdybh','ejyxdybh','sjyxdybh','sfsxdx','fnkjkje','bmkjkje','dbjkje' ))
          // 时间格式化
          // this.form.setFieldsValue({ sfrqksm: this.model.sfrqksm ? moment(this.model.sfrqksm) : null })
        })
        // 加载子表数据
        if (this.model.id) {
          let paramshhmm = { hhbm: this.model.hhbm ,zjhm:this.model.zjhm}
          let paramszjhm = { id: this.model.zjhm }
          this.requestSubTableData(this.url.jtcyxx.list, paramshhmm, this.jtcyxxTable)
          this.requestSubTableData(this.url.glqy.list, paramszjhm, this.glqyTable)
          this.fwxxTable.loading = true
          getAction(this.url.fwxx.list, paramszjhm).then(res => {
            this.fwxxTable.dataSource = res.result || []
          }).finally(() => {
            this.fwxxTable.loading = false
            this.initfwxx();
          });
          this.cfxxTable.loading = true
          getAction(this.url.cfxx.list, paramszjhm).then(res => {
            this.cfxxTable.dataSource = res.result || []
          }).finally(() => {
            this.cfxxTable.loading = false
            this.initcfxx();
          });

          this.clxxTable.loading = true
          getAction(this.url.clxx.list, paramszjhm).then(res => {
            this.clxxTable.dataSource = res.result || []
          }).finally(() => {
            this.clxxTable.loading = false
            this.initclxx();
          });
          this.qtglzcTable.loading = true
          getAction(this.url.qtglzc.list, paramszjhm).then(res => {
            this.qtglzcTable.dataSource = res.result || []
          }).finally(() => {
            this.qtglzcTable.loading = false
            this.initqtglzc();
          });
          this.requestSubTableData(this.url.bzdb.list, paramszjhm, this.bzdbTable)
          this.requestSubTableData(this.url.dydb.list, paramszjhm, this.dydbTable)
          this.requestSubTableData(this.url.zydb.list, paramszjhm, this.zydbTable)
          this.requestSubTableData(this.url.xydb.list, paramszjhm, this.xydbTable)
          this.yhdkTable.loading = true
          getAction(this.url.yhdk.list, paramszjhm).then(res => {
            this.yhdkTable.dataSource = res.result || []
          }).finally(() => {
            this.yhdkTable.loading = false
            this.inityhdk();

          });
        }

      },

      /** 整理成formData */
      classifyIntoFormData(allValues) {
        let fzzeHj={
          fzzeHj:this.fzzeHj
        }
        let gdzcHj={
          gdzcHj:this.gdzcHj
        }
        let zczeHj={
          zczeHj:this.zczeHj
        }
        let jzcHj={
          jzcHj:this.jzcHj
        }
        let jkfs={
          jkfs:this.jkfsList.join(',')
        }
       //获取附件信息表数据
        console.log("------附件信息表数据---------")
        this.$refs.photoView.add()
        let imgdate ={"imgdate":this.$refs.photoView.imgdate }
        console.log("------附件信息表数据---------")


        let main = Object.assign(this.model, allValues.formValue,this.ldzcTableObject,this.qtjkTableObject,fzzeHj,gdzcHj,zczeHj,jzcHj,jkfs)
        //时间格式化
        //main.sfrqksm = main.sfrqksm ? main.sfrqksm.format() : null;
        return {
          ...main, // 展开
          jtcyxxList: allValues.tablesValue[0].values,
          glqyList: allValues.tablesValue[1].values,
          fwxxList: allValues.tablesValue[2].values,
          cfxxList: allValues.tablesValue[3].values,
          clxxList: allValues.tablesValue[4].values,
          qtglzcList: allValues.tablesValue[5].values,
          yhdkList: allValues.tablesValue[6].values,
          bzdbList: allValues.tablesValue[7].values,
          dydbList: allValues.tablesValue[8].values,
          zydbList: allValues.tablesValue[9].values,
          xydbList: allValues.tablesValue[10].values,
          imgdate:imgdate
        }
      },
      ssxzChange(value) {
        console.log('ssxzChange')
        console.log(value)
         //先清空下级的数据
        this.form.setFieldsValue({yjyxdybh:value});
        this.ejxydyOptions = [{value:'', label: '请选择'}],
        this.sjxydyOptions = [{value:'', label: '请选择'}],
        this.form.setFieldsValue({ejyxdymc:''});
        this.form.setFieldsValue({sjyxdymc:''});
        this.form.setFieldsValue({ejyxdybh:''});
        this.form.setFieldsValue({sjyxdybh:''});

        if(value){
          getEjyxdyOption({'yjyxdybh': value}).then(response => {
            console.log(response)
            let list = response.result
            list.forEach(item => {
              this.ejxydyOptions.push({
                value: item.dybh,
                label: item.dymc
              })
            })
            console.log(this.ejxydyOptions)
          })
        }

      },
      xzcChange(value) {
        console.log('xzcChange')
        console.log(value)
        this.form.setFieldsValue({ejyxdybh:value});
        //先清空下级的数据
        this.sjxydyOptions = [{value:'', label: '请选择'}],
        this.form.setFieldsValue({sjyxdymc:''});
        this.form.setFieldsValue({sjyxdybh:''});
        if(value){
          getSjyxdyOption({'yjyxdybh': this.model.yjyxdybh, 'ejyxdybh': value}).then(response => {
            console.log(response)
            let list = response.result
            list.forEach(item => {
              this.sjxydyOptions.push({
                value: item.dybh,
                label: item.dymc
              })
            })
            console.log(this.sjxydyOptions)
          })
        }
      },
      xzzChange(value) {
        console.log(value)
        this.form.setFieldsValue({sjyxdybh:value});
        this.form.setFieldsValue({ssyxdy:value});
        getSjyxdyOption({'sjyxdybh': this.model.sjyxdybh}).then(response => {
          console.log(1111)
          this.form.setFieldsValue({sszh:response.result[0].sszh});

        })
      },
      getValuesjdybh(value){
        console.log(value)
        this.yjyxdymc = value.yjdymc
        this.ejyxdymc = value.ejdymc
        this.sjyxdymc = value.dymc
        //this.sszhmc=value.sszhmc
        //this.model.qydm = value.dybh
        this.form.setFieldsValue({
          yjyxdybh:value.yjdybh,
          ejyxdybh:value.ejdybh,
          sjyxdybh:value.dybh,
          sszh:value.sszh,
          ssyxdy:value.dybh
        });
      },

      fwChange(e){
        const newData = [...e.newDataSource];
        this.fwZc=0;
        for (let i = 0; i < newData.length; i++) {
          this.fwZc+=(newData[i].pjgz == '' ||newData[i].pjgz == 'undefined' ||newData[i].pjgz == null? 0 : parseFloat(newData[i].pjgz));
        }
        this.gdzcHj=this.fwZc+this.cfZc+this.clZc+this.qtgdZc;
        this.zczeHj=this.gdzcHj+this.ldzcHj;
        this.jzcHj=this.zczeHj-this.fzzeHj;
      },
      cfChange(e){
        const newData = [...e.newDataSource];
        this.cfZc=0;
        for (let i = 0; i < newData.length; i++) {
          this.cfZc+=(newData[i].pjgz == '' ||newData[i].pjgz == 'undefined' ||newData[i].pjgz == null? 0 : parseFloat(newData[i].pjgz));
        }
        this.gdzcHj=this.fwZc+this.cfZc+this.clZc+this.qtgdZc;
        this.zczeHj=this.gdzcHj+this.ldzcHj;
        this.jzcHj=this.zczeHj-this.fzzeHj;

      },
      clChange(e){
        const newData = [...e.newDataSource];
        this.clZc=0;
        for (let i = 0; i < newData.length; i++) {
          this.clZc+=(newData[i].pjgz == '' ||newData[i].pjgz == 'undefined' ||newData[i].pjgz == null? 0 : parseFloat(newData[i].pjgz));
        }
        this.gdzcHj=this.fwZc+this.cfZc+this.clZc+this.qtgdZc;
        this.zczeHj=this.gdzcHj+this.ldzcHj;
        this.jzcHj=this.zczeHj-this.fzzeHj;

      },
      qtgdzcChange(e){
        const newData = [...e.newDataSource];
        this.qtgdZc=0;
        for (let i = 0; i < newData.length; i++) {
          this.qtgdZc+=(newData[i].pjgz == '' ||newData[i].pjgz == 'undefined' ||newData[i].pjgz == null? 0 : parseFloat(newData[i].pjgz));
        }
        this.gdzcHj=this.fwZc+this.cfZc+this.clZc+this.qtgdZc;
        this.zczeHj=this.gdzcHj+this.ldzcHj;
        this.jzcHj=this.zczeHj-this.fzzeHj;

      },
      //家庭负债情况
      ldzcChange(value, key, column) {
        const newData = [...this.ldzcTable.dataSource];
        console.log(newData)
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
          target[column] = value;
          //汇总负债合计
          newData[0].xjck=newData[0].xjck == '' ||newData[0].xjck == 'undefined' ||newData[0].xjck == null?'0' : newData[0].xjck
          newData[0].ycl=newData[0].ycl == '' ||newData[0].ycl == 'undefined' ||newData[0].ycl == null?'0' : newData[0].ycl
          newData[0].bcp=newData[0].bcp == '' ||newData[0].bcp == 'undefined' ||newData[0].bcp == null?'0' : newData[0].bcp
          newData[0].ccp=newData[0].ccp == '' ||newData[0].ccp == 'undefined' ||newData[0].ccp == null?'0' : newData[0].ccp
          newData[0].yszk=newData[0].yszk == '' ||newData[0].yszk == 'undefined' ||newData[0].yszk == null?'0' : newData[0].yszk
          newData[0].yfzk=newData[0].yfzk == '' ||newData[0].yfzk == 'undefined' ||newData[0].yfzk == null?'0' : newData[0].yfzk
          newData[0].ldzcHj = parseInt(newData[0].xjck )+parseInt(newData[0].ycl )+ parseInt( newData[0].bcp ) +parseInt( newData[0].ccp )+
                              parseInt(newData[0].yszk )+parseInt(newData[0].yfzk);
          this.ldzcHj=newData[0].ldzcHj
          this.zczeHj=this.gdzcHj+this.ldzcHj;
          this.jzcHj=this.zczeHj-this.fzzeHj;

          this.ldzcTableObject= {"xjck":newData[0].xjck,"ycl":newData[0].ycl,"bcp":newData[0].bcp,"ccp":newData[0].ccp,'yszk':newData[0].yszk,'yfzk':newData[0].yfzk,'ldzcHj':newData[0].ldzcHj}
        }
      },
      qtjkChange(value, key, column) {
        const newData = [...this.qtjkTable.dataSource];
        console.log(newData)
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
          target[column] = value;
          //汇总负债合计
          newData[0].qtjkHj = parseInt(newData[0].qtjk == '' ||newData[0].qtjk == 'undefined' ||newData[0].qtjk == null?0:newData[0].qtjk)+
                              parseInt(newData[0].fzyf == '' ||newData[0].fzyf == 'undefined' ||newData[0].fzyf == null?0 : newData[0].fzyf)+
                              parseInt(newData[0].fzys == '' ||newData[0].fzys == 'undefined' ||newData[0].fzys == null?0 : newData[0].fzys );
          this.qtjkHj=newData[0].qtjkHj
          this.qtjkTableObject={"qtjk":newData[0].qtjk,"fzyf":newData[0].fzyf,"fzys":newData[0].fzys}
          this.fzzeHj=this.yhjkHj+this.qtjkHj;
          this.jzcHj=this.zczeHj-this.fzzeHj;
        }

      },
      yhdkChange(e){
        const newData = [...e.newDataSource];
        this.yhjkHj=0;
        for (let i = 0; i < newData.length; i++) {
          console.log(newData[i].dkje);
          this.yhjkHj+=(newData[i].dkje == '' ||newData[i].dkje == 'undefined' ||newData[i].dkje == null? 0 : parseFloat(newData[i].dkje));
        }
        this.fzzeHj=this.yhjkHj+this.qtjkHj;
        this.jzcHj=this.zczeHj-this.fzzeHj;

      },
      getzjhm(e){
        this.zjhm = e.target.value
        console.log("zjhm"+this.zjhm)
        this.form.setFieldsValue({csny:this.zjhm.substr(6,8)})

        //this.zjhm = value
        /* if(!this.checkBirthday(this.zjhm)){
           this.$message.error("请先填写证件号码后在进行操作")
         }*/


      },
      handleCancel() {
        this.$refs.photoView.close()
        this.close()
      },

      handleOk() {
        this.$refs.jtcyxx.getValues((error, values) => {
          // 错误数 = 0 则代表验证通过
          if (error === 0) {
            let flag=true;
            values.forEach((data,index) => {
              if(!this.validateIdCard(data.zjhm)){
                try{
                  this.$message.error('家庭成员['+data.khmc+']证件号输入错误，请检查！',5)
                  flag=false;
                  throw Error();
                }catch(err){
                  console.log(err)
                }
              }
            })
            if(flag){
              /** 触发表单验证 */
              this.getAllTable().then(tables => {
                /** 一次性验证主表和所有的次表 */
                return validateFormAndTables(this.form, tables)
              }).then(allValues => {
                if (typeof this.classifyIntoFormData !== 'function') {
                  throw this.throwNotFunction('classifyIntoFormData')
                }
                let formData = this.classifyIntoFormData(allValues)
                // 发起请求
                return this.request(formData)
              }).catch(e => {
                if (e.error === Symbol()) {
                  // 如果有未通过表单验证的子表，就自动跳转到它所在的tab
                  this.activeKey = e.index == null ? this.activeKey : this.refKeys[e.index]
                } else {
                  console.error(e)
                }
              })
            }
            // 将通过后的数组提交到后台或自行进行其他处理
            console.log(values)
          } else {
            values.forEach((data,index) => {
              if(this.validateIdCard(data.zjhm)){
                this.$message.error('家庭成员表单验证失败，请检查！',5)
                return;
              }
            })
          }
        })
      },
      // 对外担保监听事件
      onChangeEvent: function(value) {
        console.info('是否对外担保 -',value);
        if (value === '1') {
          this.IsShowDwdbxx = '1';
        }
        if (value === '2') {
          this.IsShowDwdbxx = '2';
        }
      },
    }
  }
</script>

<style lang="less" scoped>
  .ant-form .ant-form-item {
    margin-bottom: 2px;
  }
</style>