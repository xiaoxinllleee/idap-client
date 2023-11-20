<template>
  <j-modal
    :title="title"
    :width="1400"
    :visible="visible"
    :maskClosable="false"
    :confirmLoading="confirmLoading"
    :okButtonProps="{ props: {disabled: disableSubmit} }"
    :destroyOnClose="true"
    switchFullscreen
    :fullscreen="false"
    @ok="handleOk"
    @cancel="handleCancel">
    <template slot="footer">
      <a-button key="back" @click="handleCancel">
        取消
      </a-button>
      <a-button  v-if="!isShowFxsp&&!isCxtj&&!isfxjl"  :loading="bntloading" :disabled="disableSubmit" type="primary"  @click="handleOk">
        提交申请
      </a-button>
      <a-button v-if="isShowFxsp&&!isCxtj&&!isfxjl"  :disabled="disableSubmit" type="primary"  @click="fxspsq">
        提交审批
      </a-button>
      <a-button v-if="isCxtj&&!isfxjl"  :disabled="disableSubmit" type="primary"  @click="fxspsq">
        提交审批
      </a-button>

      <Button v-if="isfxjl&&activeTab==10" type="warning" @click="nextStep">
        下一步
        <Icon type="ios-arrow-forward" />
      </Button>
      <Button  v-show="isfxjl&&activeTab==11" type="warning" icon="ios-arrow-back"  @click="syStep">上一步</Button>

      <a-button v-show="isfxjl&&activeTab==11"  :disabled="disableSubmit" type="primary"  @click="fxjlQrsp">
        确认审批
      </a-button>

    </template>
    <a-spin :spinning="confirmLoading">
      <!-- 主表单区域 -->
      <a-form  :form="form">
        <a-tabs  v-model="activeTab">
          <a-tab-pane tab="客户基本" key="1" :forceRender="true">
            <a-divider orientation="left" style="color: #1890FF;">客户基本信息</a-divider>
            <a-row  class="form-row" :gutter="16">
              <a-col :lg="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="客户名称">
                  <a-input  hidden="true"  v-decorator="['hhbm', {}]"   />
                  <a-input  hidden="true"  v-decorator="['sszh', {}]"   />
                  <a-input  hidden="true"  v-decorator="['ssyxdy', {}]"   />
                  <a-input :disabled="true" placeholder="请输入客户名称" v-decorator="['khmc', {}]"/>
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="证件号码">
                  <a-input placeholder="请输入证件号码" :disabled="true" @change="getzjhm" v-decorator="['zjhm', {}]"/>
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="性别">
                  <j-dict-select-tag :disabled="true"  placeholder="请选择客户性别" style="width: 100%;" v-decorator="['xb', {rules: [{  }]}]" :triggerChange="true" dictCode="sex"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row  class="form-row" :gutter="16">
              <a-col :lg="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="婚姻状况">
                  <j-dict-select-tag :disabled="true" placeholder="请选择婚姻状况" style="width: 100%;" v-decorator="['hyzk', {rules: [{  }]}]" :triggerChange="true" dictCode="hyzk_cj"/>
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="联系电话">
                  <a-input :disabled="true" placeholder="请输入联系电话" v-decorator="['sjhm', {}]"/>
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="地址">
                  <a-input :disabled="true" placeholder="请输入地址" v-decorator="['dz', {}]"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row  class="form-row" :gutter="16">

              <a-col :lg="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="行业">
                  <j-dict-select-tag :disabled="true"  placeholder="请选择行业" style="width: 100%;" v-decorator="['cshy', {rules: [{  }]}]" :triggerChange="true" dictCode="grdk_khhy"/>
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="从事职业">
                  <j-dict-select-tag :disabled="true"  placeholder="请选择从事职业" style="width: 100%;" v-decorator="['cszy', {rules: [{  }]}]" :triggerChange="true" dictCode="cszy"/>
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="品行">
                  <j-dict-select-tag :disabled="true" placeholder="请选择客户品行" style="width: 100%;" v-decorator="['khpx', {rules: [{  }]}]" :triggerChange="true" dictCode="grdk_khpx"/>
                </a-form-item>
              </a-col>

            </a-row>
            <a-row  class="form-row" :gutter="16">
              <a-col :lg="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="镇">
                  <a-input  hidden="true"  v-decorator="['yjyxdybh', {}]"   />
                  <a-input  v-model="this.yjyxdymc"  :disabled="true"  />
                </a-form-item>
              </a-col>
              <a-col :lg="8" >
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="村">
                  <a-input  hidden="true" v-decorator="['ejyxdybh', {}]" />
                  <a-input  v-model="this.ejyxdymc" :disabled="true" />
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="组">
                  <a-input  hidden="true" v-decorator="['sjyxdybh', {}]" />
                  <j-select-sjyxdy :disabled="true" treeDefaultExpandAll="true"
                                   v-model="this.sjyxdymc" @change="getValuesjdybh" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row  class="form-row" :gutter="16">
              <a-col :lg="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="客户身份">
                  <j-multi-select-tag  :disabled="true" placeholder="客户身份" v-decorator="['khlx', {}]" dict-code="khsf" style="width: 100%;"/>
                </a-form-item>
              </a-col>

              <a-col :lg="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="项目">
                  <a-input :disabled="true" placeholder="请输入客户项目" v-decorator="['khxm', {}]"/>
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="是否授信对象">
                  <j-dict-select-tag :disabled="true" placeholder="请选择是否授信对象" style="width: 100%;" v-decorator="['sfsxdx', {rules: [{  }]}]" :triggerChange="true" dictCode="sfbz"/>
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
                  <a-input :disabled="true" placeholder="请输入对外担保" v-decorator="['dwdb', {}]"/>
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="担保对象">
                  <a-input :disabled="true" placeholder="请输入担保对象" v-decorator="['dbdx', {}]"/>
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="其他用信">
                  <a-input :disabled="true" placeholder="请输入其他用信" v-decorator="['qtyx', {}]"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row  class="form-row" :gutter="16">
              <a-col :lg="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="共同借款人">
                  <a-input :disabled="true" placeholder="请输入共同借款人" v-decorator="['gtjkr', {}]"/>
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="指定签收人">
                  <a-input :disabled="true" placeholder="请输入指定签收人" v-decorator="['zdqsr', {}]"/>
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="签收人手机">
                  <a-input :disabled="true"  placeholder="请输入签收人手机" v-decorator="['qsrsj', {}]"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row  class="form-row" :gutter="16">
              <a-col :lg="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="签收人传真">
                  <a-input :disabled="true" placeholder="请输入签收人传真" v-decorator="['qsrcz', {}]"/>
                </a-form-item>
              </a-col>

              <a-col :lg="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="签收人邮箱">
                  <a-input :disabled="true" placeholder="请输入签收人邮箱" v-decorator="['qsryx', {}]"/>
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="签收人微信">
                  <a-input :disabled="true" placeholder="请输入签收人微信" v-decorator="['qsrwx', {}]"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row  class="form-row" :gutter="16">
              <a-col :lg="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="其他签收方式">
                  <a-input :disabled="true" placeholder="请输入其他签收方式" v-decorator="['qtqsfs', {}]"/>
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
                    <a-radio-group  :disabled="true" v-decorator="['sfsxrhbzxr', {}]"  >
                      <a-radio  value="1">是
                        <a-input  v-show="this.form.getFieldValue('sfsxrhbzxr')=='1'"  v-decorator="['sfrqksm', {}]"   size="small" style="border:0;border-bottom: 1px solid #ddd;;width: 100px"/>
                      </a-radio>
                      <a-radio  value="2">否</a-radio>
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
                    <a-radio-group :disabled="true"  v-decorator="['sfyfxxx', {}]"  >
                      <a-radio  value="1">是
                        <a-input  v-show="this.form.getFieldValue('sfyfxxx')=='1'"  v-decorator="['fxxxqksm', {}]"   size="small" style="border:0;border-bottom: 1px solid #ddd;;width: 100px"/>
                      </a-radio>
                      <a-radio  value="2">否</a-radio>
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
                :disabled="true"
                :ref="refKeys[0]"
                :loading="jtcyxxTable.loading"
                :columns="jtcyxxTable.columns"
                :dataSource="jtcyxxTable.dataSource"
                :maxHeight="300"
                :rowNumber="true"
                :rowSelection="true"
                :actionButton="false">
              </j-editable-table>
            </a-card>
          </a-tab-pane>
          <a-tab-pane tab="关联企业" key="3" :forceRender="true">
            <a-card class="card" :bordered="false">
              <j-editable-table
                rowKey="zjhm"
                :disabled="true"
                :ref="refKeys[1]"
                :loading="glqyTable.loading"
                :columns="glqyTable.columns"
                :dataSource="glqyTable.dataSource"
                :maxHeight="300"
                :rowNumber="true"
                :rowSelection="true"
                :actionButton="false">
              </j-editable-table>
            </a-card>

          </a-tab-pane>
          <a-tab-pane tab="资产负债" key="4" :forceRender="true">
            <a-divider orientation="left" style="color: #1890FF;">固定资产信息   <font style="color: red"> 固定资产合计:{{this.gdzcHj}} 万元</font></a-divider>
            <a-card class="card" :bordered="false">
              <j-editable-table
                rowKey="zjhm"
                :disabled="true"
                AddButtonName="添加住房"
                :ref="refKeys[2]"
                :loading="fwxxTable.loading"
                :columns="fwxxTable.columns"
                :dataSource="fwxxTable.dataSource"
                :maxHeight="300"
                :rowNumber="true"
                :rowSelection="true"
                :actionButton="false"
                @valueChange="fwChange"

              />
              <j-editable-table
                rowKey="zjhm"
                AddButtonName="添加厂房"
                :disabled="true"
                :ref="refKeys[3]"
                :loading="cfxxTable.loading"
                :columns="cfxxTable.columns"
                :dataSource="cfxxTable.dataSource"
                :maxHeight="300"
                :rowNumber="true"
                :rowSelection="true"
                :actionButton="false"
                @valueChange="cfChange"
              />
              <j-editable-table
                rowKey="zjhm"
                AddButtonName="添加车辆"
                :disabled="true"
                :ref="refKeys[4]"
                :loading="clxxTable.loading"
                :columns="clxxTable.columns"
                :dataSource="clxxTable.dataSource"
                :maxHeight="300"
                :rowNumber="true"
                :rowSelection="true"
                @valueChange="clChange"
                :actionButton="false"
              />
              <j-editable-table
                rowKey="zjhm"
                AddButtonName="添加其他固定资产"
                :disabled="true"
                :ref="refKeys[5]"
                :loading="qtglzcTable.loading"
                :columns="qtglzcTable.columns"
                :dataSource="qtglzcTable.dataSource"
                :maxHeight="300"
                :rowNumber="true"
                :rowSelection="true"
                :actionButton="false"
                @valueChange="qtgdzcChange"
              />
            </a-card>

            <a-divider orientation="left" style="color: #1890FF;">流动资产信息  <font style="color: red"> 流动资产合计:{{this.ldzcHj}} 万元</font></a-divider>
            <a-card class="card" :bordered="false">
              <a-table
                :disabled="true"
                size="middle"
                :pagination="false"
                :columns="ldzcTable.columns"
                :dataSource="ldzcTable.dataSource"
                bordered>
                <template
                  v-for="ldzccolname in []"
                  :slot="ldzccolname"
                  slot-scope="text, record, index" >
                  <template >
                    <a-input   style="margin: -5px 0"  :value="text"  @change="e => ldzcChange(e.target.value, record.key, ldzccolname)"    />
                  </template>
                </template>
              </a-table>
            </a-card>
            <a style="width:300px;margin-left:82.6%;" > <font style="color: red">资产总额 : </font> <a-input :disabled="true" size="small" style="border:0;border-bottom: 1px solid #ddd;;width: 60px" v-model="this.zczeHj" />万元</a>
            <a-divider orientation="left" style="color: #1890FF;">负债信息</a-divider>
            <a-card class="card" :bordered="false">
              <j-editable-table
                rowKey="zjhm"
                :disabled="true"
                AddButtonName="添加银行贷款"
                :ref="refKeys[6]"
                :loading="yhdkTable.loading"
                :columns="yhdkTable.columns"
                :dataSource="yhdkTable.dataSource"
                :maxHeight="300"
                :rowNumber="true"
                :rowSelection="true"
                :actionButton="false"
                @valueChange="yhdkChange"
              />

              <a-table
                size="middle"
                :disabled="true"
                :pagination="false"
                :columns="qtjkTable.columns"
                :dataSource="qtjkTable.dataSource"
                bordered>
                <template
                  v-for="qtjkcolname in []"
                  :slot="qtjkcolname"
                  slot-scope="text, record, index">
                  <template >
                    <a-input   style="margin: -5px 0"  :value="text"  @change="e => qtjkChange(e.target.value, record.key, qtjkcolname)" />
                  </template>
                </template>
              </a-table>

            </a-card>
            <a style="width:300px;margin-left:82.6%;" > <font style="color: red">负债总额 : </font> <a-input :disabled="true" size="small" style="border:0;border-bottom: 1px solid #ddd;;width: 60px" v-model="this.fzzeHj"  />万元</a>

            <a-card class="card" :bordered="false">
              <a-alert :banner="true" :message="`净资产：${this.jzcHj} 万元`" type="info" />
            </a-card>
          </a-tab-pane>
          <a-tab-pane tab="经营状况" key="5" :forceRender="true">
            <div>
              <a-row type="flex"  justify="center" align="middle">
                <a-col :span="10" :offset="1">
                  去年产值:
                </a-col>
                <a-col :span="11" :offset="0">
                  <a-form-item >
                    <a-input   :disabled="true"  placeholder="请输入金额"  v-decorator="['qncz', {}]"   size="small" style="border:0;border-bottom: 1px solid #ddd;;width: 60px"/>万元
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row type="flex"  justify="center" align="middle">
                <a-col :span="10" :offset="1">
                  销售额:
                </a-col>
                <a-col :span="11" :offset="0">
                  <a-form-item >
                    <a-input    :disabled="true" placeholder="请输入金额"  v-decorator="['xse', {}]"   size="small" style="border:0;border-bottom: 1px solid #ddd;;width: 60px"/>万元
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row type="flex"  justify="center" align="middle">
                <a-col :span="10" :offset="1">
                  税金:
                </a-col>
                <a-col :span="11" :offset="0">
                  <a-form-item >
                    <a-input    :disabled="true" placeholder="请输入金额"  v-decorator="['sj', {}]"   size="small" style="border:0;border-bottom: 1px solid #ddd;;width: 60px"/>万元
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row type="flex"  justify="center" align="middle">
                <a-col :span="10" :offset="1">
                  净利润:
                </a-col>
                <a-col :span="11" :offset="0">
                  <a-form-item >
                    <a-input    :disabled="true" placeholder="请输入金额"  v-decorator="['jlr', {}]"   size="small" style="border:0;border-bottom: 1px solid #ddd;;width: 60px"/>万元
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row type="flex"  justify="center" align="middle">
                <a-col :span="10" :offset="1">
                  发放工作:
                </a-col>
                <a-col :span="11" :offset="0">
                  <a-form-item >
                    <a-input    :disabled="true" placeholder="请输入金额"  v-decorator="['ffgz', {}]"   size="small" style="border:0;border-bottom: 1px solid #ddd;;width: 60px"/>万元
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row type="flex"  justify="center" align="middle">
                <a-col :span="10" :offset="1">
                  截止调查日产值:
                </a-col>
                <a-col :span="11" :offset="0">
                  <a-form-item >
                    <a-input    :disabled="true" placeholder="请输入金额"  v-decorator="['zzdcrcz', {}]"   size="small" style="border:0;border-bottom: 1px solid #ddd;;width: 60px"/>万元
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row type="flex" justify="center"  align="middle">
                <a-col :span="10" :offset="1">
                  截止调查日利润:
                </a-col>
                <a-col :span="11" :offset="0">
                  <a-form-item >
                    <a-input    :disabled="true" placeholder="请输入金额"  v-decorator="['zzdcrlr', {}]"   size="small" style="border:0;border-bottom: 1px solid #ddd;;width: 60px"/>万元
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row type="flex" justify="center"  align="middle">
                <a-col :span="10" :offset="1">
                  预计今年全年产值:
                </a-col>
                <a-col :span="11" :offset="0">
                  <a-form-item >
                    <a-input   :disabled="true"  placeholder="请输入金额"  v-decorator="['yjjnqncz', {}]"   size="small" style="border:0;border-bottom: 1px solid #ddd;;width: 60px"/>万元
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row type="flex" justify="center"  align="middle">
                <a-col :span="10" :offset="1">
                  预计净利润:
                </a-col>
                <a-col :span="11" :offset="0">
                  <a-form-item >
                    <a-input   :disabled="true"  placeholder="请输入金额"  v-decorator="['yjjlr', {}]"   size="small" style="border:0;border-bottom: 1px solid #ddd;;width: 60px"/>万元
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row type="flex"  justify="center" align="middle">
                <a-col :span="10" :offset="1">
                  市场前景:
                </a-col>
                <a-col :span="11" :offset="0">
                  <a-form-item >
                    <a-radio-group  :disabled="true"  v-decorator="['scqj', {}]" :options="scqjOptions"   />
                  </a-form-item>
                </a-col>
              </a-row>
            </div>
          </a-tab-pane>
          <a-tab-pane tab="与我行业务" key="6" :forceRender="true">
            <a-card class="card" :bordered="false">
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
                  :ref="refKeys[10]"
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
          <a-tab-pane tab="担保方式" key="7" :forceRender="true">
            <a-card class="card" :bordered="false">
              <a-tabs v-model="activeKey" @change="handleChangeTabs">
                <a-tab-pane tab="保证担保" :key="refKeys[7]" :forceRender="true">
                  <j-editable-table
                    :disabled="true"
                    :ref="refKeys[7]"
                    :loading="bzdbTable.loading"
                    :columns="bzdbTable.columns"
                    :dataSource="bzdbTable.dataSource"
                    :maxHeight="300"
                    :rowNumber="true"
                    :rowSelection="true"
                    :actionButton="false"/>
                </a-tab-pane>
                <a-tab-pane tab="抵押担保" :key="refKeys[8]" :forceRender="true">
                  <j-editable-table
                    :disabled="true"
                    :ref="refKeys[8]"
                    :loading="dydbTable.loading"
                    :columns="dydbTable.columns"
                    :dataSource="dydbTable.dataSource"
                    :maxHeight="300"
                    :rowNumber="true"
                    :rowSelection="true"
                    :actionButton="false"/>
                </a-tab-pane>
                <a-tab-pane tab="质押担保" :key="refKeys[9]" :forceRender="true">
                  <j-editable-table
                    :disabled="true"
                    :ref="refKeys[9]"
                    :loading="zydbTable.loading"
                    :columns="zydbTable.columns"
                    :dataSource="zydbTable.dataSource"
                    :maxHeight="300"
                    :rowNumber="true"
                    :rowSelection="true"
                    :actionButton="false"/>
                </a-tab-pane>
                <a-tab-pane tab="信用担保" :key="refKeys[10]" :forceRender="true">
                  <j-editable-table
                    :disabled="true"
                    :ref="refKeys[10]"
                    :loading="xydbTable.loading"
                    :columns="xydbTable.columns"
                    :dataSource="xydbTable.dataSource"
                    :maxHeight="300"
                    :rowNumber="true"
                    :rowSelection="true"
                    :actionButton="false"/>
                </a-tab-pane>
              </a-tabs>
            </a-card>
          </a-tab-pane>
          <a-tab-pane tab="授信申请" key="8" :forceRender="true">
            <a-divider orientation="left" style="color: #1890FF;">申请信息</a-divider>
            <div>
              <a-row type="flex"  justify="center" align="middle">
                <a-col :span="10" :offset="1">
                  申请金额:
                </a-col>
                <a-col :span="12" :offset="0">
                  <a-form-item >
                    <a-input    :disabled="true" placeholder="请输入金额"  v-decorator="['sqje', {}]"   size="small" style="border:0;border-bottom: 1px solid #ddd;;width: 60px"/>万元
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row type="flex"  justify="center" align="middle">
                <a-col :span="10" :offset="1">
                  借款用途:
                </a-col>
                <a-col :span="12" :offset="0">
                  <a-form-item >
                    <a-input    :disabled="true" placeholder="请填写借款用途(不多于50字)"  v-decorator="['jkyt', {}]"   size="small" style="border:0;border-bottom: 1px solid #ddd;;width: 200px"/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row type="flex"  justify="center" align="middle">
                <a-col :span="10" :offset="1">
                  借款期限:
                </a-col>
                <a-col :span="12" :offset="0">
                  <a-form-item >
                    <a-input    :disabled="true" placeholder="请输入月数"  v-decorator="['jkqx', {}]"   size="small" style="border:0;border-bottom: 1px solid #ddd;;width: 60px"/>月
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row type="flex"  justify="center" align="middle">
                <a-col :span="10" :offset="1">
                  用信方式:
                </a-col>
                <a-col :span="12" :offset="0">
                  <a-form-item >
                    <a-checkbox-group  :disabled="true" v-model="jkfsList" >
                      <a-checkbox  value="1" >福农卡</a-checkbox>
                      <a-input  :disabled="true"   placeholder="福农卡金额" v-decorator="['fnkjkje', {}]"  size="small" style="border: 1px solid #ddd;width: 100px"/>
                      <a-checkbox  value="2" >便明卡</a-checkbox>
                      <a-input    :disabled="true"  placeholder="便明卡金额"  v-decorator="['bmkjkje', {}]"  size="small" style="border: 1px solid #ddd;width: 100px"/>
                      <a-checkbox  value="3" >担保金额</a-checkbox>
                      <a-input   :disabled="true"  placeholder="担保金额"   v-decorator="['dbjkje', {}]"  size="small" style="border: 1px solid #ddd;width: 100px"/>
                    </a-checkbox-group>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row type="flex"  justify="center" align="middle">
                <a-col :span="10" :offset="1">
                  还款来源:
                </a-col>
                <a-col :span="12" :offset="0">
                  <a-form-item >
                    <a-input   :disabled="true"  placeholder="请填写还款来源"  v-decorator="['hkfs', {}]"   size="small" style="border:0;border-bottom: 1px solid #ddd;;width: 200px"/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row type="flex"  justify="center" align="middle">
                <a-col :span="10" :offset="1">
                  还款计划:
                </a-col>
                <a-col :span="12" :offset="0">
                  <a-form-item >
                    <j-dict-select-tag :disabled="true" placeholder="请选择还款计划" style=" border:0;border-bottom: 1px solid #ddd;width: 200px " v-decorator="['hkjh', {rules: [{  }]}]" :triggerChange="true" dictCode="grdk_hkjh" />
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
                <a-textarea  :disabled="true" placeholder="请填写贷款风险点分析及防范措施" v-decorator="['dkfxdjfycs', {rules: [{  }]}]" :autosize="{ minRows: 2, maxRows: 4 }"/>
              </a-form-item></a-col>
            </a-row>

            <a-divider orientation="left" style="color: #1890FF;">备注信息</a-divider>
            <a-row class="form-row" :gutter="16">
              <a-col :span="24" :pull="2"><a-form-item
                :labelCol="{ xs: { span: 24 }, sm: { span: 4} }"
                :wrapperCol="{ xs: { span: 24 }, sm: { span: 20 }}"
                label="备注信息">
                <a-textarea :disabled="true" placeholder="请填写备注信息" v-decorator="['bz', {rules: [{  }]}]" :autosize="{ minRows: 2, maxRows: 4 }"/>
              </a-form-item></a-col>
            </a-row>

          </a-tab-pane>
          <a-tab-pane tab="附件信息" key="9" :forceRender="true">
            <photo-view ref="photoView"  :showupload="true" />
          </a-tab-pane>
          <a-tab-pane tab="评定信息" key="10" :forceRender="true" ref="pdxxgzxy">
              <a-divider orientation="left" style="color: #1890FF;">担保信息</a-divider>
              <j-editable-table
                AddButtonName="新增担保"
                :ref="refKeys[11]"
                :disabled="!isShowFxsp"
                :loading="dbxxTable.loading"
                :columns="dbxxTable.columns"
                :dataSource="dbxxTable.dataSource"
                :maxHeight="300"
                :rowNumber="true"
                :rowSelection="true"
                :actionButton="true"/>
              <a-divider orientation="left" style="color: #1890FF;">保证信息</a-divider>
              <j-editable-table
                :disabled="!isShowFxsp"
                AddButtonName="新增保证"
                :ref="refKeys[12]"
                :loading="bzxxTable.loading"
                :columns="bzxxTable.columns"
                :dataSource="bzxxTable.dataSource"
                :maxHeight="300"
                :rowNumber="true"
                :rowSelection="true"
                :actionButton="true"/>
              <a-card title="定价信息" :bordered="true">
                <a-row  class="form-row" :gutter="16">
                  <a-col :lg="8">
                    <a-form-item
                      :labelCol="labelCol"
                      :wrapperCol="wrapperCol"
                      label="计算日期">
                      <a-input :disabled="true" v-decorator="['djrq', {}]"/>
                    </a-form-item>
                  </a-col>
                  <a-col :lg="8">
                    <a-form-item
                      :labelCol="labelCol"
                      :wrapperCol="wrapperCol"
                      label="综合授信额度">
                      <a-input :disabled="true" v-decorator="['sxed', {}]"/>
                    </a-form-item>
                  </a-col>
                  <a-col :lg="8">
                    <a-form-item
                      :labelCol="labelCol"
                      :wrapperCol="wrapperCol"
                      label="贷款期限">
                      <j-dict-select-tag  :disabled="true" v-decorator="['dkqx', {}]" :triggerChange="true" placeholder="请选择贷款期限"
                                          dictCode="dkqx"/>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row  class="form-row" :gutter="16">
                  <a-col :lg="8">
                    <a-form-item
                      :labelCol="labelCol"
                      :wrapperCol="wrapperCol"
                      label="得分合计">
                      <a-input :disabled="true" v-decorator="['dfhj', {}]"/>
                    </a-form-item>
                  </a-col>
                  <a-col :lg="8">
                    <a-form-item
                      :labelCol="labelCol"
                      :wrapperCol="wrapperCol"
                      label="LPR基点">
                      <a-input :disabled="true" v-decorator="['jdbp', {}]"/>
                    </a-form-item>
                  </a-col>
                  <a-col :lg="8">
                    <a-form-item
                      :labelCol="labelCol"
                      :wrapperCol="wrapperCol"
                      label="优惠后LPR基点">
                      <a-input :disabled="true" v-decorator="['yhhjdbp', {}]"/>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row  class="form-row" :gutter="16">
                  <a-col :lg="8">
                    <a-form-item
                      :labelCol="labelCol"
                      :wrapperCol="wrapperCol"
                      label="对应档次LPR">
                      <a-input :disabled="true" v-decorator="['lprll', {}]"/>
                    </a-form-item>
                  </a-col>
                  <a-col :lg="8">
                    <a-form-item
                      :labelCol="labelCol"
                      :wrapperCol="wrapperCol"
                      label="执行利率">
                      <a-input :disabled="true" v-decorator="['zxll', {}]"/>
                    </a-form-item>
                  </a-col>
                  <a-col :lg="8">
                    <a-form-item
                      :labelCol="labelCol"
                      :wrapperCol="wrapperCol"
                      label="优惠后执行利率">
                      <a-input :disabled="true" v-decorator="['yhhzxll', {}]"/>
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-card>
              <a-card title="评定及意见" :bordered="true">
                <a-row justify="start" align="middle">
                  <a-col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }">
                    <a-form-item  label="">
                      <font bold color="red"> <strong>评定等级：</strong></font><j-dict-select-tag :disabled="!isShowFxsp" style="width: 100px;" size="small"  v-decorator="['pddj', { rules: [{ required: true, message: '请选择评定等级!' }] } ]"   :triggerChange="true" dictCode="grdk_pddj"/>
                    </a-form-item>
                  </a-col>
                  <a-col :xs="{ span: 11, offset: 1 }" :lg="{ span: 6, offset: 2 }">

                    <a-form-item >
                      <font bold color="red"><strong>授信额度：</strong></font><a-input-number  :disabled="!isShowFxsp"  :min="this.min" :max="this.max" size="small"  style="border:hidden;width: 100px;border-bottom: 1px solid #ddd;"  v-decorator="['sxje', { rules: [{ required: true, message: '请输入授信额度!' }] } ]"/> 万元
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row type="flex" justify="start" align="middle">
                  <a-col :span="20" :offset="2">
                    <a-form-item >
                      <font bold color="red"> <strong>调查结论:</strong></font><a-textarea :disabled="!isShowFxsp"  :rows="2"  v-decorator="['dcjl', { rules: [{ required: true, message: '请填写调查结论!' }] } ]" />
                    </a-form-item>
                  </a-col>
                </a-row>

               <!-- <a-row type="flex" justify="start" align="middle">
                  <a-col :span="20" :offset="2">
                    <a-form-item >
                      <font bold color="red"> <strong>风险经理意见:</strong></font><a-textarea :disabled="!isfxjl"  :rows="2"  v-decorator="['fxjlspyj', { rules: [{ required: isfxjl, message: '请填写风险经理意见!' }] } ]" />
                    </a-form-item>
                  </a-col>
                </a-row>-->

              </a-card>
              <!--<a-card v-show="showSpls" title="审批历史" :bordered="true">
                <a-table
                  size="middle"
                  :pagination="false"
                  :columns="splsTable.columns"
                  :dataSource="splsTable.dataSource"
                  bordered>
                </a-table>

              </a-card>-->
          </a-tab-pane>
          <a-tab-pane  v-if="iszhfxpj" tab="支行风险评价" key="11" :forceRender="true">
            <a-card :bordered="false">
              <grdk-fxsp-modal  ref="fxspxx"/>
            </a-card>
          </a-tab-pane>
        </a-tabs>

      </a-form>


      <!-- 子表单区域 -->

    </a-spin>
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
  import JMultiSelectTag from '@/components/dict/JMultiSelectTag'
  import { httpAction, getAction,putAction } from '@/api/manage'
  import PhotoView from './PhotoView.vue'
  import  GrdkFxspModal from './GrdkFxspModal'
  export default {
    name: 'GrdkglModal',
    mixins: [JEditableTableMixin],
    components: {ARow,JSelectEjyxdy,JSelectSjyxdy,JDictSelectTag,JMultiSelectTag,PhotoView,GrdkFxspModal},
    data() {
      return {
        bntloading:false,
        jkfsList:[],
        loading:false,
        min:0,
        max:10000,
        // 新增时子表默认添加几行空数据
        addDefaultRowNum: 1,
        validatorRules: {
        },
        showButton:false,
        refKeys: ['jtcyxx', 'glqy', 'fwxx', 'cfxx', 'clxx', 'qtglzc', 'yhdk', 'bzdb','dydb', 'zydb', 'xydb','dbxx','bzxx' ],
        activeKey: 'jtcyxx',
        activeTab: '10',
        yjyxdymc:'',
        ejyxdymc:'',
        sjyxdymc:'',
        sfrqksmShow:false,
        fxxxqksmShow:false,
        // 家庭成员
        scqjOptions:[
          { label: '良好', value: '1' },
          { label: '较好', value: '2' },
          { label: '一般', value: '3' },
          { label: '差',   value: '4' }
          ]
        ,
        splsTable: {
          loading: false,
          dataSource: [],
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
            },
            {
              title: '证件号码',
              key: 'zjhm',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }],
            },

            {
              title: '从事职业',
              key: 'cszy',
              type: FormTypes.select,
              defaultValue: '',
              placeholder: '请输入${title}',
              dictCode: 'cszy',
            },
            {
              title: '联系电话',
              key: 'sjhm',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '与被评价人关系',
              key: 'yhzgx',
              type: FormTypes.select,
              defaultValue: '',
              placeholder: '请输入${title}',
              dictCode: 'yhzgx',
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
              title: '评价估值',
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
              title: '评价估值',
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
              title: '评价估值',
              key: 'pjgz',
              type: FormTypes.inputNumber,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
          ]
        },
        ldzcTableObject:{},
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
              title: '评价估值',
              key: 'pjgz',
              type: FormTypes.inputNumber,
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
              title: '贷款行',
              key: 'dkyh',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '贷款账号',
              key: 'dkzh',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '余额',
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
          ]
        },
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
        disableSubmit: false,
        dafactivekey:'1',
        qtjkTableObject:{},
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
              type: FormTypes.inputNumber,
              defaultValue: '',
              placeholder: '请输入${title}',
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
              placeholder: '请输入${title}',
              dictCode: 'sex',
            },

            {
              title: '担保人婚姻状况',
              key: 'dbrhyzk',
              type: FormTypes.select,
              defaultValue: '',
              placeholder: '请输入${title}',
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
              placeholder: '请输入${title}',
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
              type: FormTypes.select,
              defaultValue: '',
              placeholder: '请输入${title}',
              dictCode: 'yhzgx',

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
              type: FormTypes.input,
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
              type: FormTypes.input,
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
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '整栋建筑面积',
              key: 'zdljzmj',
              type: FormTypes.input,
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
              placeholder: '请输入${title}',
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
              type: FormTypes.select,
              defaultValue: '',
              placeholder: '请输入${title}',
              dictCode: 'yhzgx',

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
              placeholder: '请输入${title}',
              dictCode: 'grdk_xydb',
            },
          ]
        },
        showSpls:false,
        dbxxTable: {
          loading: false,
          dataSource: [{}],
          columns: [
            {
              title: '担保方式',
              key: 'dbfs',
              type: FormTypes.select,
              defaultValue: '',
              placeholder: '请选择${title}',
              dictCode: 'grdk_dbfs',
              validateRules: [{ required: true, message: '请选择${title}' }]

            },
            {
              title: '担保物名称',
              key: 'dbw',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '请输入${title}' }]

            },
            {
              title: '所有权人',
              key: 'syqr',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '请输入${title}' }]

            },
            {
              title: '所有权人证件号',
              key: 'syqrzjhm',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '请输入${title}' }]


            },

            {
              title: '评估价值',
              key: 'pgjz',
              type: FormTypes.inputNumber,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '请输入${title}' }]

            },
            {
              title: '抵押金额',
              key: 'dyje',
              type: FormTypes.inputNumber,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '请输入${title}' }]

            },
            {
              title: '抵押期限',
              key: 'dyqx',
              type: FormTypes.inputNumber,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '请输入${title}' }]

            },
            {
              title: '权证号码(选填)',
              key: 'qzhm',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',

            },
            {
              title: '房屋位置(选填)',
              key: 'fwwz',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',

            },
            {
              title: '权证面积(选填)',
              key: 'qzmj',
              type: FormTypes.inputNumber,
              defaultValue: '',
              placeholder: '请输入${title}',

            },
          ]
        },
        bzxxTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '保证人',
              key: 'bzr',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '请输入${title}' }]


            },
            {
              title: '保证人证件号',
              key: 'bzrzjhm',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '请输入${title}' }]


            },
            {
              title: '担保名称',
              key: 'dbmc',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '请输入${title}' }]

            },
            {
              title: '担保金额',
              key: 'dbje',
              type: FormTypes.inputNumber,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '请输入${title}' }]

            },
            {
              title: '担保期限',
              key: 'dbqx',
              type: FormTypes.inputNumber,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '请输入${title}' }]

            },
          ]
        },
        url: {
          add: "/xdgl/grdkgl/add",
          edit: "/xdgl/grdkgl/grdksplc/edit",
          editFxsp: "/xdgl/grdkgl/grdksplc/editFxsp",
          editCxFxsp:"/xdgl/grdkgl/grdksplc/editCxFxsp",
          editFxjlsp:"/xdgl/grdkgl/grdksplc/editFxjlsp",
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
          ywhywxx:{
            list: '/xdgl/grdkgl/queryYwhywxxByHhbm'
          },

          bzxx: {
            list: '/xdgl/grdkgl/queryBzxxByMainId'
          },
          dbxx:{
            list: '/xdgl/grdkgl/queryDbxxByMainId'
          }


        },
        labelCol: {
          xs: {span: 24},
          sm: {span: 8},
        },
        wrapperCol: {
          xs: {span: 24},
          sm: {span: 16},
        },
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
        showZjhm:true,
        isShowFxsp:false,
        isfxjl:false,
        isCxtj:false,
        iszhfxpj:false,
        istfxjlysj:false,
        lldjsqed:0,
        spsxed:0,
      }
    },

    methods: {
      add (value) {
        this.edit({});
        this.$nextTick(() => {
           this.form.setFieldsValue({ zjhm: value.zjhm})
           this.form.setFieldsValue({csny:value.zjhm.substr(6,8)})
        });
      },
      inityhdk(){
        const yhdkData = [...this.yhdkTable.dataSource];
        this.yhjkHj=0;
        for (let i = 0; i < yhdkData.length; i++) {
          this.yhjkHj+=(yhdkData[i].dkje == '' ||yhdkData[i].dkje == 'undefined' ||yhdkData[i].dkje == null? 0 : parseFloat(yhdkData[i].dkje));
        }
        console.info('--------yhdkhj')
        console.info(this.yhjkHj)
      },
      initfwxx(){
        const fwData = [...this.fwxxTable.dataSource];
        this.fwZc=0;
        for (let i = 0; i < fwData.length; i++) {
          this.fwZc+=(fwData[i].pjgz == '' ||fwData[i].pjgz == 'undefined' ||fwData[i].pjgz == null? 0 : parseFloat(fwData[i].pjgz));
        }
        console.info('--------fwZc')
        console.info(this.fwZc)
      },
      initcfxx(){
        const cfData = [...this.cfxxTable.dataSource];
        this.cfZc=0;
        for (let i = 0; i < cfData.length; i++) {
          this.cfZc+=(cfData[i].pjgz == '' ||cfData[i].pjgz == 'undefined' ||cfData[i].pjgz == null? 0 : parseFloat(cfData[i].pjgz));
        }
        console.info('--------cfZc')
        console.info(this.cfZc)
      },
      initclxx(){
        const clData = [...this.clxxTable.dataSource];
        this.clZc=0;
        for (let i = 0; i < clData.length; i++) {
          this.clZc+=(clData[i].pjgz == '' ||clData[i].pjgz == 'undefined' ||clData[i].pjgz == null? 0 : parseFloat(clData[i].pjgz));
        }
        console.info('--------clZc')
        console.info(this.clZc)
      },
      initqtglzc(){
        const qtgdzcData = [...this.qtglzcTable.dataSource];
        this.qtgdZc=0;
        for (let i = 0; i < qtgdzcData.length; i++) {
          this.qtgdZc+=(qtgdzcData[i].pjgz == '' ||qtgdzcData[i].pjgz == 'undefined' ||qtgdzcData[i].pjgz == null? 0 : parseFloat(qtgdzcData[i].pjgz));
        }
        console.info('--------qtgdZc')
        console.info(this.qtgdZc)
      },


      edit(record) {
        if (typeof this.editBefore === 'function') this.editBefore(record)
        this.visible = true
        this.activeKey = this.refKeys[7]
        this.form.resetFields()
        this.model = Object.assign({}, record)
        this.yjyxdymc = record.yjyxdybh_dictText
        this.ejyxdymc = record.ejyxdybh_dictText
        this.sjyxdymc = record.sjyxdybh_dictText
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
        this.lldjsqed=record.sxed;
        this.spsxed=record.sxje;
       /* if (record.bussinessId) {
          let params = {"spid":record.bussinessId}
          putAction("xdgl/grkhpjsx/spls", params).then(res => {
            if (res.success) {
              console.log(res.result)
              this.splsTable.dataSource = res.result.spls
            }
          });
        }*/
        if (record.zjhm) {
          let params = { "zjhm": record.zjhm }
          getAction("/xdgl/grdkgl/img", params).then((res) => {
            if (res.success) {
              this.$refs.photoView.showImg(res.result)
            }
          });
        }

        this.$nextTick(() => {
          if(this.iszhfxpj){
            this.$refs.fxspxx.edit(record);
          }
        });
        if (typeof this.editAfter === 'function') this.editAfter(this.model)
      },

      /** 调用完edit()方法之后会自动调用此方法 */
      editAfter() {
        this.confirmLoading = true
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'khmc', 'zjhm', 'khxm', 'cshy', 'khpx', 'dwdb', 'dbdx', 'qtyx', 'gtjkr', 'zdqsr', 'qsrsj', 'qsrcz', 'qsryx', 'qsrwx', 'qtqsfs', 'sfsxrhbzxr', 'sfyfxxx', 'sfrqksm', 'fxxxqksm', 'gdzcHj', 'xjck', 'ycl', 'bcp', 'ccp', 'yszk', 'yfzk', 'ldzcHj', 'zczeHj', 'fzzeHj', 'qtjk', 'fzyf', 'fzys', 'jzcHj', 'qncz', 'xse', 'sj', 'jlr', 'ffgz', 'zzdcrcz', 'zzdcrlr', 'yjjnqncz', 'yjjlr', 'scqj', 'sqje', 'jkyt', 'jkqx', 'jkfs', 'qtjkfs', 'hkfs', 'hkjh', 'dyhkly', 'dehkly', 'dkfxdjfycs', 'bz', 'sskhjl', 'hmcId', 'sszh', 'ssyxdy', 'hhbm', 'yhzgx', 'sfhz', 'khlx', 'dz', 'xb', 'mz', 'hyzk', 'jgdm', 'csny', 'cszy', 'hjdz', 'sjhm','yjyxdybh','ejyxdybh','sjyxdybh','sfsxdx' ,'pddj','dcjl','sxje','ckye','dqckye','cknrpye','dkje','dkye','bldkye','bwbldkye','sjyhsl','wsyhsl','sbksl','ercsl','fnkjkje','bmkjkje','dbjkje','djrq','sxed','dkqx','dfhj','jdbp','yhhjdbp','lprll','zxll','yhhzxll','fxjlspyj','fxjlspzt'))
          // 时间格式化
          // this.form.setFieldsValue({ sfrqksm: this.model.sfrqksm ? moment(this.model.sfrqksm) : null })
        })
        // 加载子表数据
        if (this.model.id) {
          let paramshhmm = { hhbm: this.model.hhbm ,zjhm:this.model.zjhm}
          let paramszjhm = { id: this.model.zjhm }
          let paramhhmm=  {hhbm: this.model.hhbm}
          this.requestSubTableData(this.url.bzxx.list, paramszjhm, this.bzxxTable)
          getAction(this.url.dbxx.list, paramszjhm).then(res => {
            this.dbxxTable.dataSource = res.result || [];
            if(res.result.length==0||res.result==[]){
              this.dbxxTable.dataSource =[{}]
            }
          }).finally(() => {
            this.dbxxTable.loading = false
            this.confirmLoading = false
          });

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
          this.requestSubTableData(this.url.ywhywxx.list, paramhhmm, this.ywhywxxTable)

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
        let main = Object.assign(this.model, allValues.formValue)
        //时间格式化
        //main.sfrqksm = main.sfrqksm ? main.sfrqksm.format() : null;
        return {
          ...main, // 展开
          dbxxList: allValues.tablesValue[11].values,
          bzxxList: allValues.tablesValue[12].values,

        }
      },

      fxspsq(){
        this.$refs.dbxx.getValues((error) => {
          if (error!=0) {
             this.$message.error('担保信息资料不全，请补充！',3);
          }else{
            this.$refs.bzxx.getValues((error) => {
              if (error!=0) {
                this.$message.error('保证信息资料不全，请补充！',3);
              }else{
                if(this.model.yhhzxll==null||this.model.yhhzxll==''){
                  return this.$message.error('请先进行利率定价！',3)
                }else{
                  var lldjsqed=this.form.getFieldValue('sxed');
                  var spsxed=this.form.getFieldValue('sxje');
                  if(lldjsqed!=spsxed){
                    this.$Modal.confirm({
                      title: "提交风险经理审批",
                      // 记得确认修改此处
                      content: "利率定价额度与评定额度不一致, 确认提交?",
                      //loading: true,
                      onOk: () => {
                        this.handleOkFxsp();
                      }
                    });
                  }else{
                    this.handleOkFxsp();
                  }

                }
              }
            })
           }
        })
      },

      fxjlQrsp(){
        this.$refs.dbxx.getValues((error) => {
          if (error!=0) {
            this.$message.error('担保信息资料不全，请补充！',3);
          }else{
            this.$refs.bzxx.getValues((error) => {
              if (error!=0) {
                this.$message.error('保证信息资料不全，请补充！',3);
              }else{
                if(this.model.yhhzxll==null||this.model.yhhzxll==''){
                  return this.$message.error('请先进行利率定价！',3)
                }else{
                  var lldjsqed=this.form.getFieldValue('sxed');
                  var spsxed=this.form.getFieldValue('sxje');
                  if(lldjsqed!=spsxed){
                    this.$Modal.confirm({
                      title: "提交风险经理审批",
                      // 记得确认修改此处
                      content: "利率定价额度与评定额度不一致, 确认提交?",
                      //loading: true,
                      onOk: () => {
                        var flag=false;
                        this.$refs.fxspxx.handleOk(flag).then(
                          val => {
                            this.handleOkFxsp();
                          });
                      }
                    });
                  }else{
                    var flag=false;
                    this.$refs.fxspxx.handleOk(flag).then(
                      val => {
                        this.handleOkFxsp();
                      });
                  }
                }
              }
            })
          }
        })
      },

      cxfxspsq(){
        this.$refs.dbxx.getValues((error) => {
          if (error!=0) {
            this.$message.error('担保信息资料不全，请补充！',3);
          }else{
            this.$refs.bzxx.getValues((error) => {
              if (error!=0) {
                this.$message.error('保证信息资料不全，请补充！',3);
              }else{
                if(this.model.yhhzxll==null||this.model.yhhzxll==''){
                  return this.$message.error('请先进行利率定价！',3)
                }else{
                  if(this.model.sxed!=this.model.sxje){
                    this.$Modal.confirm({
                      title: "提交风险经理审批",
                      // 记得确认修改此处
                      content: "利率定价额度与评定额度不一致, 确认提交?",
                      //loading: true,
                      onOk: () => {
                        this.handleOkFxsp();
                      }
                    });
                  }

                }
              }
            })
          }
        })
      },

      handleOk() {
        this.bntloading=true;
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
          if (e.error === VALIDATE_NO_PASSED) {
            // 如果有未通过表单验证的子表，就自动跳转到它所在的tab
            this.activeKey = e.index == null ? this.activeKey : this.refKeys[e.index]
          } else {
            console.error(e)
          }
        })
      },
      nextStep () {
        this.getAllTable().then(tables => {
          return validateFormAndTables(this.form, tables)
        }).then(allValues => {
          this.showButton=true;
          this.activeTab='11';
        }).catch(e => {
          if (e.error === VALIDATE_NO_PASSED) {
            // 如果有未通过表单验证的子表，就自动跳转到它所在的tab
            this.activeKey = e.index == null ? this.activeKey : this.refKeys[e.index]
          } else {
            console.error(e)
          }
        })

      },
      syStep () {
        this.showButton=false;
        this.activeTab='10';

      },

      handleOkFxsp() {
        this.getAllTable().then(tables => {
          /** 一次性验证主表和所有的次表 */
          return validateFormAndTables(this.form, tables)
        }).then(allValues => {
          if (typeof this.classifyIntoFormData !== 'function') {
            throw this.throwNotFunction('classifyIntoFormData')
          }
          let formData = this.classifyIntoFormData(allValues)
          // 发起请求
          return this.requestfxsp(formData)
        }).catch(e => {
          if (e.error === VALIDATE_NO_PASSED) {
            console.log(e)
            // 如果有未通过表单验证的子表，就自动跳转到它所在的tab
            this.activeTab = '10';
            this.$message.error("表单验证失败，请填写必填项！")

          } else {
            console.error(e)
          }
        })
      },
      requestfxsp(formData) {
        let url = this.url.add, method = 'post'
        if (this.model.id) {
          url = this.url.edit
          if(this.isShowFxsp){
            url = this.url.editFxsp
          }
          if(this.isCxtj){
            url = this.url.editFxsp
          }
          if(this.isfxjl){
            url=this.url.editFxjlsp
          }
          method = 'put'
        }
        this.confirmLoading = true
        console.log("url:---",url)
        httpAction(url, formData, method).then((res) => {
          if (res.success) {
            this.$message.success(res.message)
            this.$emit('ok')
            this.close()
          } else {
            this.$message.warning(res.message,5)
          }
        }).finally(() => {
          this.confirmLoading = false
        })
      },



      request(formData) {
        let url = this.url.add, method = 'post'
        if (this.model.id) {
          url = this.url.edit
          if(this.isShowFxsp){
            url = this.url.editFxsp
          }
          if(this.isCxtj){
            url = this.url.editCxFxsp
          }
          method = 'put'
        }
        this.confirmLoading = true
        httpAction(url, formData, method).then((res) => {
          if (res.success) {
            this.$emit('ok')
            this.close()
            this.$emit('apply',res.result);
          } else {
            this.$message.warning(res.message,5)
          }
        }).finally(() => {
          this.confirmLoading = false
          this.bntloading=false
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

    }
  }
</script>

<style lang="less" scoped>
  .ant-form .ant-form-item {
    margin-bottom: 2px;
  }
</style>