<template>
  <a-modal
    :title="title"
    :width="1800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
          <a-tabs default-active-key="1" animated='animated'>
          <a-tab-pane key="1">
            <span slot="tab"><a-icon type="book"/>基本信息</span>
          <a-row class="form-row" :gutter="16">
            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="数据日期">
                <a-date-picker v-decorator="[ 'tjyf', {}]"
                               :disabled="true"/>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="机构代码">
                <a-input v-decorator="[ 'jgdm', {}]" :disabled="true"/>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="客户姓名">
                <a-input v-decorator="['khmc', {}]" :disabled="false"/>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="证件号码">
                <a-input v-decorator="['zjhm', {}]" :disabled="true"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="客户类型">
                <j-dict-select-tag  :disabled="true" v-decorator="['khlx', {rules: [{  message: '请选择客户类型!' }]}]" :triggerChange="true" placeholder="请选择客户类型"
                                    dictCode="dkjkpt_khlx"/>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="地址">
                <a-input v-decorator="['dz', {}]" :disabled="true"/>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="电话号码">
                <a-input v-decorator="['dhhm', {}]" :disabled="true"/>
              </a-form-item>
            </a-col>

          </a-row>
            <a-divider style="font-size: 25px">关联人信息</a-divider>
              <a-table ref="table"
                       size="middle"
                       bordered
                       rowKey="id"
                       :columns="columns"
                       :dataSource="dataSource1"
                       :loading="loading"
                       >
              </a-table>


            <a-divider style="font-size: 25px">风险资产</a-divider>
              <a-card>
                <a-divider style="font-size: 25px">关注类</a-divider>
                <a-row :gutter="24">
                  <a-col :md="6" :sm="12">
                    <a-form-item
                      :labelCol="labelCol"
                      :wrapperCol="wrapperCol"
                      label="年份">
                      <a-select placeholder="请选择年份" v-model="queryParam.tjnf" :defaultValue="dateValue">
                        <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :md="6" :sm="12">
                  <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>

                  </a-col>
                </a-row>


                  <j-editable-table
                    @valueChange="valueChange1"
                    ref="pdzbszSetTable"
                    :loading="pdzbszSetTable.loading"
                    :columns="pdzbszSetTable.columns"
                    :dataSource="pdzbszSetTable.dataSource"
                    :maxHeight="300"
                    :rowNumber="true"
                    :rowSelection="false"
                    :actionButton="false"/>

                <j-editable-table
                  @valueChange="valueChange2"
                  ref="gzlSetTable"
                  :loading="gzlSetTable.loading"
                  :columns="gzlSetTable.columns"
                  :dataSource="gzlSetTable.dataSource"
                  :maxHeight="300"
                  :rowNumber="true"
                  :rowSelection="false"
                  :actionButton="false"/>

                <a-button type="primary" @click="click" icon="plus">新增月份</a-button>
                <j-editable-table
                  @valueChange="valueChange3"
                  ref="gzljd1SetTable"
                  :loading="gzljd1SetTable.loading"
                  :columns="gzljd1SetTable.columns"
                  :dataSource="gzljd1SetTable.dataSource"
                  :maxHeight="300"
                  :rowNumber="true"
                  style="overflow-y: hidden"
                  rowHeight="122"
                  :rowSelection="false"
                  :actionButton="false"/>
                <j-editable-table v-show="this.num>=1"
                  @valueChange="valueChange4"
                  ref="gzljd2SetTable"
                  :loading="gzljd2SetTable.loading"
                  :columns="gzljd2SetTable.columns"
                  :dataSource="gzljd2SetTable.dataSource"
                  :maxHeight="300"
                  :rowNumber="true"
                  :rowSelection="false"
                  :actionButton="false"/>
                <j-editable-table v-show="this.num>=2"
                  @valueChange="valueChange5"
                  ref="gzljd3SetTable"
                  :loading="gzljd3SetTable.loading"
                  :columns="gzljd3SetTable.columns"
                  :dataSource="gzljd3SetTable.dataSource"
                  :maxHeight="300"
                  :rowNumber="true"
                  :rowSelection="false"
                  :actionButton="false"/>
                <j-editable-table v-show="this.num>=3"
                  @valueChange="valueChange6"
                  ref="gzljd4SetTable"
                  :loading="gzljd4SetTable.loading"
                  :columns="gzljd4SetTable.columns"
                  :dataSource="gzljd4SetTable.dataSource"
                  :maxHeight="300"
                  :rowNumber="true"
                  :rowSelection="false"
                  :actionButton="false"/>
                <j-editable-table v-show="this.num>=4"
                  @valueChange="valueChange7"
                  ref="gzljd5SetTable"
                  :loading="gzljd5SetTable.loading"
                  :columns="gzljd5SetTable.columns"
                  :dataSource="gzljd5SetTable.dataSource"
                  :maxHeight="300"
                  :rowNumber="true"
                  :rowSelection="false"
                  :actionButton="false"/>
                <j-editable-table v-show="this.num>=5"
                  @valueChange="valueChange8"
                  ref="gzljd6SetTable"
                  :loading="gzljd6SetTable.loading"
                  :columns="gzljd6SetTable.columns"
                  :dataSource="gzljd6SetTable.dataSource"
                  :maxHeight="300"
                  :rowNumber="true"
                  :rowSelection="false"
                  :actionButton="false"/>
                <j-editable-table v-show="this.num>=6"
                  @valueChange="valueChange9"
                  ref="gzljd7SetTable"
                  :loading="gzljd7SetTable.loading"
                  :columns="gzljd7SetTable.columns"
                  :dataSource="gzljd7SetTable.dataSource"
                  :maxHeight="300"
                  :rowNumber="true"
                  :rowSelection="false"
                  :actionButton="false"/>
                <j-editable-table v-show="this.num>=7"
                  @valueChange="valueChange10"
                  ref="gzljd8SetTable"
                  :loading="gzljd8SetTable.loading"
                  :columns="gzljd8SetTable.columns"
                  :dataSource="gzljd8SetTable.dataSource"
                  :maxHeight="300"
                  :rowNumber="true"
                  :rowSelection="false"
                  :actionButton="false"/>
                <j-editable-table v-show="this.num>=8"
                  @valueChange="valueChange11"
                  ref="gzljd9SetTable"
                  :loading="gzljd9SetTable.loading"
                  :columns="gzljd9SetTable.columns"
                  :dataSource="gzljd9SetTable.dataSource"
                  :maxHeight="300"
                  :rowNumber="true"
                  :rowSelection="false"
                  :actionButton="false"/>
                <j-editable-table v-show="this.num>=9"
                  @valueChange="valueChange12"
                  ref="gzljd10SetTable"
                  :loading="gzljd10SetTable.loading"
                  :columns="gzljd10SetTable.columns"
                  :dataSource="gzljd10SetTable.dataSource"
                  :maxHeight="300"
                  :rowNumber="true"
                  :rowSelection="false"
                  :actionButton="false"/>
                <j-editable-table v-show="this.num>=10"
                  @valueChange="valueChange13"
                  ref="gzljd10SetTable"
                  :loading="gzljd11SetTable.loading"
                  :columns="gzljd11SetTable.columns"
                  :dataSource="gzljd11SetTable.dataSource"
                  :maxHeight="300"
                  :rowNumber="true"
                  :rowSelection="false"
                  :actionButton="false"/>
                <j-editable-table v-show="this.num>=12"
                  @valueChange="valueChange14"
                  ref="gzljd10SetTable"
                  :loading="gzljd12SetTable.loading"
                  :columns="gzljd12SetTable.columns"
                  :dataSource="gzljd12SetTable.dataSource"
                  :maxHeight="300"
                  :rowNumber="true"
                  :rowSelection="false"
                  :actionButton="false"/>


           <!-- <a-row class="form-row" :gutter="16">
              <a-col :lg="8" >
                <a-form-item :labelCol="labelCol"
                             :wrapperCol="wrapperCol"
                             label="12月进度/措施">
                  <a-textarea v-model="dataSource2.month12" />
                </a-form-item>
              </a-col>
            </a-row>-->

                <a-divider style="font-size: 25px">表内不良</a-divider>
                <j-editable-table
                  @valueChange="valueChangeBnbl"
                  ref="bnblSetTable"
                  :loading="bnblSetTable.loading"
                  :columns="bnblSetTable.columns"
                  :dataSource="bnblSetTable.dataSource"
                  :maxHeight="300"
                  :rowNumber="true"
                  :rowSelection="false"
                  :actionButton="false"/>

                <j-editable-table
                  @valueChange="valueChangeBnblqs"
                  ref="bnblSetTableqs"
                  :loading="bnblSetTableqs.loading"
                  :columns="bnblSetTableqs.columns"
                  :dataSource="bnblSetTableqs.dataSource"
                  :maxHeight="300"
                  :rowNumber="true"
                  :rowSelection="false"
                  :actionButton="false"/>
                <a-button type="primary" @click="jkptbnbl" icon="plus">新增月份</a-button>
                <j-editable-table
                  @valueChange="valueChangeBnbl1"
                  ref="bnblSetTable1"
                  :loading="bnblSetTable1.loading"
                  :columns="bnblSetTable1.columns"
                  :dataSource="bnblSetTable1.dataSource"
                  :maxHeight="300"
                  :rowNumber="true"
                  :rowSelection="false"
                  :actionButton="false"/>
                <j-editable-table v-show="this.bnbl>=1"
                  @valueChange="valueChangeBnbl2"
                  ref="bnblSetTable2"
                  :loading="bnblSetTable2.loading"
                  :columns="bnblSetTable2.columns"
                  :dataSource="bnblSetTable2.dataSource"
                  :maxHeight="300"
                  :rowNumber="true"
                  :rowSelection="false"
                  :actionButton="false"/>
                <j-editable-table v-show="this.bnbl>=2"
                  @valueChange="valueChangeBnbl3"
                  ref="bnblSetTable3"
                  :loading="bnblSetTable3.loading"
                  :columns="bnblSetTable3.columns"
                  :dataSource="bnblSetTable3.dataSource"
                  :maxHeight="300"
                  :rowNumber="true"
                  :rowSelection="false"
                  :actionButton="false"/>
                <j-editable-table v-show="this.bnbl>=3"
                  @valueChange="valueChangeBnbl4"
                  ref="bnblSetTable4"
                  :loading="bnblSetTable4.loading"
                  :columns="bnblSetTable4.columns"
                  :dataSource="bnblSetTable4.dataSource"
                  :maxHeight="300"
                  :rowNumber="true"
                  :rowSelection="false"
                  :actionButton="false"/>
                <j-editable-table v-show="this.bnbl>=4"
                  @valueChange="valueChangeBnbl5"
                  ref="bnblSetTable5"
                  :loading="bnblSetTable5.loading"
                  :columns="bnblSetTable5.columns"
                  :dataSource="bnblSetTable5.dataSource"
                  :maxHeight="300"
                  :rowNumber="true"
                  :rowSelection="false"
                  :actionButton="false"/>
                <j-editable-table v-show="this.bnbl>=5"
                  @valueChange="valueChangeBnbl6"
                  ref="bnblSetTable6"
                  :loading="bnblSetTable6.loading"
                  :columns="bnblSetTable6.columns"
                  :dataSource="bnblSetTable6.dataSource"
                  :maxHeight="300"
                  :rowNumber="true"
                  :rowSelection="false"
                  :actionButton="false"/>
                <j-editable-table v-show="this.bnbl>=6"
                  @valueChange="valueChangeBnbl7"
                  ref="bnblSetTable7"
                  :loading="bnblSetTable7.loading"
                  :columns="bnblSetTable7.columns"
                  :dataSource="bnblSetTable7.dataSource"
                  :maxHeight="300"
                  :rowNumber="true"
                  :rowSelection="false"
                  :actionButton="false"/>
                <j-editable-table v-show="this.bnbl>=7"
                  @valueChange="valueChangeBnbl8"
                  ref="bnblSetTable8"
                  :loading="bnblSetTable8.loading"
                  :columns="bnblSetTable8.columns"
                  :dataSource="bnblSetTable8.dataSource"
                  :maxHeight="300"
                  :rowNumber="true"
                  :rowSelection="false"
                  :actionButton="false"/>
                <j-editable-table v-show="this.bnbl>=8"
                  @valueChange="valueChangeBnbl9"
                  ref="bnblSetTable9"
                  :loading="bnblSetTable9.loading"
                  :columns="bnblSetTable9.columns"
                  :dataSource="bnblSetTable9.dataSource"
                  :maxHeight="300"
                  :rowNumber="true"
                  :rowSelection="false"
                  :actionButton="false"/>
                <j-editable-table v-show="this.bnbl>=9"
                  @valueChange="valueChangeBnbl10"
                  ref="bnblSetTable10"
                  :loading="bnblSetTable10.loading"
                  :columns="bnblSetTable10.columns"
                  :dataSource="bnblSetTable10.dataSource"
                  :maxHeight="300"
                  :rowNumber="true"
                  :rowSelection="false"
                  :actionButton="false"/>
              <j-editable-table v-show="this.bnbl>=10"
                  @valueChange="valueChangeBnbl11"
                  ref="bnblSetTable11"
                  :loading="bnblSetTable11.loading"
                  :columns="bnblSetTable11.columns"
                  :dataSource="bnblSetTable11.dataSource"
                  :maxHeight="300"
                  :rowNumber="true"
                  :rowSelection="false"
                  :actionButton="false"/>
              <j-editable-table v-show="this.bnbl>=11"
                  @valueChange="valueChangeBnbl12"
                  ref="bnblSetTable12"
                  :loading="bnblSetTable12.loading"
                  :columns="bnblSetTable12.columns"
                  :dataSource="bnblSetTable12.dataSource"
                  :maxHeight="300"
                  :rowNumber="true"
                  :rowSelection="false"
                  :actionButton="false"/>


              <!--  <a-divider style="font-size: 25px">表外不良</a-divider>
                <j-editable-table
                  @valueChange="valueChangeBwbl"
                  ref="bwblSetTable"
                  :loading="bwblSetTable.loading"
                  :columns="bwblSetTable.columns"
                  :dataSource="bwblSetTable.dataSource"
                  :maxHeight="300"
                  :rowNumber="true"
                  :rowSelection="false"
                  :actionButton="false"/>

                <j-editable-table
                  @valueChange="valueChangeBwblqs"
                  ref="bwblSetTableqs"
                  :loading="bwblSetTableqs.loading"
                  :columns="bwblSetTableqs.columns"
                  :dataSource="bwblSetTableqs.dataSource"
                  :maxHeight="300"
                  :rowNumber="true"
                  :rowSelection="false"
                  :actionButton="false"/>
                <a-button type="primary" @click="jkptbwbl" icon="plus">新增月份</a-button>
                <j-editable-table
                  @valueChange="valueChangeBwbl1"
                  ref="bwblSetTable1"
                  :loading="bwblSetTable1.loading"
                  :columns="bwblSetTable1.columns"
                  :dataSource="bwblSetTable1.dataSource"
                  :maxHeight="300"
                  :rowNumber="true"
                  :rowSelection="false"
                  :actionButton="false"/>
                <j-editable-table v-show="this.bwbl>=1"
                  @valueChange="valueChangeBwbl2"
                  ref="bwblSetTable2"
                  :loading="bwblSetTable2.loading"
                  :columns="bwblSetTable2.columns"
                  :dataSource="bwblSetTable2.dataSource"
                  :maxHeight="300"
                  :rowNumber="true"
                  :rowSelection="false"
                  :actionButton="false"/>
                <j-editable-table v-show="this.bwbl>=2"
                  @valueChange="valueChangeBwbl3"
                  ref="bwblSetTable3"
                  :loading="bwblSetTable3.loading"
                  :columns="bwblSetTable3.columns"
                  :dataSource="bwblSetTable3.dataSource"
                  :maxHeight="300"
                  :rowNumber="true"
                  :rowSelection="false"
                  :actionButton="false"/>
                <j-editable-table v-show="this.bwbl>=3"
                  @valueChange="valueChangeBwbl4"
                  ref="bwblSetTable4"
                  :loading="bwblSetTable4.loading"
                  :columns="bwblSetTable4.columns"
                  :dataSource="bwblSetTable4.dataSource"
                  :maxHeight="300"
                  :rowNumber="true"
                  :rowSelection="false"
                  :actionButton="false"/>
                <j-editable-table v-show="this.bwbl>=4"
                  @valueChange="valueChangeBwbl5"
                  ref="bwblSetTable5"
                  :loading="bwblSetTable5.loading"
                  :columns="bwblSetTable5.columns"
                  :dataSource="bwblSetTable5.dataSource"
                  :maxHeight="300"
                  :rowNumber="true"
                  :rowSelection="false"
                  :actionButton="false"/>
              <j-editable-table v-show="this.bwbl>=5"
                  @valueChange="valueChangeBwbl6"
                  ref="bwblSetTable6"
                  :loading="bwblSetTable6.loading"
                  :columns="bwblSetTable6.columns"
                  :dataSource="bwblSetTable6.dataSource"
                  :maxHeight="300"
                  :rowNumber="true"
                  :rowSelection="false"
                  :actionButton="false"/>
                <j-editable-table v-show="this.bwbl>=6"
                                  @valueChange="valueChangeBwbl7"
                                  ref="bwblSetTable7"
                                  :loading="bwblSetTable7.loading"
                                  :columns="bwblSetTable7.columns"
                                  :dataSource="bwblSetTable7.dataSource"
                                  :maxHeight="300"
                                  :rowNumber="true"
                                  :rowSelection="false"
                                  :actionButton="false"/>
                <j-editable-table v-show="this.bwbl>=7"
                                  @valueChange="valueChangeBwbl8"
                                  ref="bwblSetTable8"
                                  :loading="bwblSetTable8.loading"
                                  :columns="bwblSetTable8.columns"
                                  :dataSource="bwblSetTable8.dataSource"
                                  :maxHeight="300"
                                  :rowNumber="true"
                                  :rowSelection="false"
                                  :actionButton="false"/>
                <j-editable-table v-show="this.bwbl>=8"
                                  @valueChange="valueChangeBwbl9"
                                  ref="bwblSetTable9"
                                  :loading="bwblSetTable9.loading"
                                  :columns="bwblSetTable9.columns"
                                  :dataSource="bwblSetTable9.dataSource"
                                  :maxHeight="300"
                                  :rowNumber="true"
                                  :rowSelection="false"
                                  :actionButton="false"/>
                <j-editable-table v-show="this.bwbl>=9"
                                  @valueChange="valueChangeBwbl10"
                                  ref="bwblSetTable10"
                                  :loading="bwblSetTable10.loading"
                                  :columns="bwblSetTable10.columns"
                                  :dataSource="bwblSetTable10.dataSource"
                                  :maxHeight="300"
                                  :rowNumber="true"
                                  :rowSelection="false"
                                  :actionButton="false"/>
                <j-editable-table v-show="this.bwbl>=10"
                                  @valueChange="valueChangeBwbl11"
                                  ref="bwblSetTable11"
                                  :loading="bwblSetTable11.loading"
                                  :columns="bwblSetTable11.columns"
                                  :dataSource="bwblSetTable11.dataSource"
                                  :maxHeight="300"
                                  :rowNumber="true"
                                  :rowSelection="false"
                                  :actionButton="false"/>
                <j-editable-table v-show="this.bwbl>=11"
                                  @valueChange="valueChangeBwbl12"
                                  ref="bwblSetTable12"
                                  :loading="bwblSetTable12.loading"
                                  :columns="bwblSetTable12.columns"
                                  :dataSource="bwblSetTable12.dataSource"
                                  :maxHeight="300"
                                  :rowNumber="true"
                                  :rowSelection="false"
                                  :actionButton="false"/>-->

            </a-card>




            <a-divider style="font-size: 25px">贷款信息</a-divider>

            <a-row class="form-row" :gutter="16">
              <a-col :lg="6">
                <a-form-item :labelCol="labelCol"
                             :wrapperCol="wrapperCol"
                             label="贷款账号">
                  <a-input v-decorator="['dkzh', {}]" :disabled="true"/>
                </a-form-item>
              </a-col>
              <a-col :lg="6">
                <a-form-item :labelCol="labelCol"
                             :wrapperCol="wrapperCol"
                             label="便民卡卡号">
                  <a-input v-decorator="['bmkkh', {}]" :disabled="true"/>
                </a-form-item>
              </a-col>
              <a-col :lg="6">
                <a-form-item :labelCol="labelCol"
                             :wrapperCol="wrapperCol"
                             label="贷款金额">
                  <a-input v-decorator="['dkje', {}]" :disabled="true"/>
                </a-form-item>
              </a-col>
              <a-col :lg="6">
                <a-form-item :labelCol="labelCol"
                             :wrapperCol="wrapperCol"
                             label="贷款余额">
                  <a-input v-decorator="['dkye', {}]" :disabled="true"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="16">
              <a-col :lg="6">
                <a-form-item :labelCol="labelCol"
                             :wrapperCol="wrapperCol"
                             label="借款日期">
                  <a-date-picker v-decorator="['jkrq', {}]" :disabled="true"/>
                </a-form-item>
              </a-col>
              <a-col :lg="6">
                <a-form-item :labelCol="labelCol"
                             :wrapperCol="wrapperCol"
                             label="到期日期">
                  <a-date-picker v-decorator="['dqrq', {}]" :disabled="true"/>
                </a-form-item>
              </a-col>
              <a-col :lg="6">
                <a-form-item :labelCol="labelCol"
                             :wrapperCol="wrapperCol"
                             label="起息日">
                  <a-date-picker v-decorator="['qxr', {}]" :disabled="true"/>
                </a-form-item>
              </a-col>
              <a-col :lg="6">
                <a-form-item :labelCol="labelCol"
                             :wrapperCol="wrapperCol"
                             label="结息日">
                  <a-input v-decorator="['jxr', {}]" :disabled="true"/>
                </a-form-item>
              </a-col>
            </a-row>

            <a-row class="form-row" :gutter="16">
              <a-col :lg="6">

                <a-form-item :labelCol="labelCol"
                             :wrapperCol="wrapperCol"
                             label="贷款期限">
                  <j-dict-select-tag  :disabled="true" v-decorator="['dkqx', {rules: [{ message: '请选择贷款期限!' }]}]" :triggerChange="true" placeholder="请选择贷款期限"
                                      dictCode="dkqx"/>
                </a-form-item>
              </a-col>
              <a-col :lg="6">
                <a-form-item :labelCol="labelCol"
                             :wrapperCol="wrapperCol"
                             label="产品名称">
                  <a-input v-decorator="['cpmc', {}]" :disabled="true"/>
                </a-form-item>
              </a-col>

              <a-col :lg="6">
                <a-form-item :labelCol="labelCol"
                             :wrapperCol="wrapperCol"
                             label="剩余天数">
                  <a-input v-decorator="['syts', {}]" :disabled="true"/>
                </a-form-item>
              </a-col>
              <a-col :lg="6">
                <a-form-item :labelCol="labelCol"
                             :wrapperCol="wrapperCol"
                             label="欠息天数">
                  <a-input v-decorator="['qxts', {}]" :disabled="true"/>
                </a-form-item>
              </a-col>
            </a-row>

            <a-row class="form-row" :gutter="16">

              <a-col :lg="6">
                <a-form-item :labelCol="labelCol"
                             :wrapperCol="wrapperCol"
                             label="表内应计利息">
                  <a-input v-decorator="['bnyjlx', {}]" :disabled="true"/>
                </a-form-item>
              </a-col>
              <a-col :lg="6">
                <a-form-item :labelCol="labelCol"
                             :wrapperCol="wrapperCol"
                             label="表外应计利息">
                  <a-input v-decorator="['bwyjlx', {}]" :disabled="true"/>
                </a-form-item>
              </a-col>
              <a-col :lg="6">
                <a-form-item :labelCol="labelCol"
                             :wrapperCol="wrapperCol"
                             label="表内应收利息">
                  <a-input v-decorator="['bnyslx', {}]" :disabled="true"/>
                </a-form-item>
              </a-col>
              <a-col :lg="6">
                <a-form-item :labelCol="labelCol"
                             :wrapperCol="wrapperCol"
                             label="表外应收利息">
                  <a-input v-decorator="['bwyslx', {}]" :disabled="true"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="16">
              <a-col :lg="6">
                <a-form-item :labelCol="labelCol"
                             :wrapperCol="wrapperCol"
                             label="表内外欠息和">
                  <a-input v-decorator="['bnwqxh', {}]" :disabled="true"/>
                </a-form-item>
              </a-col>
              <a-col :lg="6">
                <a-form-item :labelCol="labelCol"
                             :wrapperCol="wrapperCol"
                             label="贷款利率">
                  <a-input v-decorator="['dkll', {}]" :disabled="true"/>
                </a-form-item>
              </a-col>

              <a-col :lg="6">
                <a-form-item :labelCol="labelCol"
                             :wrapperCol="wrapperCol"
                             label="担保方式">
                  <j-dict-select-tag  :disabled="true" v-decorator="['dbfs', {rules: [{ message: '请选择担保方式!' }]}]" :triggerChange="true" placeholder="请选择担保方式"
                                      dictCode="dbfs"/>
                </a-form-item>
              </a-col>
              <a-col :lg="6">
                <a-form-item :labelCol="labelCol"
                             :wrapperCol="wrapperCol"
                             label="第一责任人">
                  <a-input v-decorator="['dyzrr', {}]" :disabled="true"/>
                </a-form-item>
              </a-col>
            </a-row>

            <a-row class="form-row" :gutter="16">
              <a-col :lg="6">
                <a-form-item :labelCol="labelCol"
                             :wrapperCol="wrapperCol"
                             label="贷款投向">
                  <j-dict-select-tag  :disabled="true" v-decorator="['dktx', {rules: [{ message: '请选择贷款投向!' }]}]" :triggerChange="true" placeholder="请选择贷款投向"
                                      dictCode="ckjkpt:FPDK_DKTXDZB_1,name,id"/>
                </a-form-item>
              </a-col>
              <a-col :lg="6">
                <a-form-item :labelCol="labelCol"
                             :wrapperCol="wrapperCol"
                             label="贷款形态">
                  <j-dict-select-tag  :disabled="true" v-decorator="['dkxt', {rules: [{ message: '请选择贷款形态!' }]}]" :triggerChange="true" placeholder="请选择贷款形态"
                                      dictCode="dkxt"/>
                </a-form-item>
              </a-col>
              <a-col :lg="6">
                <a-form-item :labelCol="labelCol"
                             :wrapperCol="wrapperCol"
                             label="信贷贷款品种">
                  <j-dict-select-tag  :disabled="true" v-decorator="['xddkpz', {rules: [{ message: '请选择信贷贷款品种!' }]}]" :triggerChange="true" placeholder="请选择信贷贷款品种"
                                      dictCode="dkzl"/>
                </a-form-item>
              </a-col>
              <!--<a-col :lg="6">
                <a-form-item :labelCol="labelCol"
                             :wrapperCol="wrapperCol"
                             label="行业类型">
                  <a-input v-decorator="['khsshylx', {}]" :disabled="true"/>
                </a-form-item>
              </a-col>-->
              <a-col :lg="6">
                <a-form-item :labelCol="labelCol"
                             :wrapperCol="wrapperCol"
                             label="到期情况监测">
                  <j-dict-select-tag  :disabled="true" v-decorator="['dqqkjc', {rules: [{ message: '请选择到期情况监测!' }]}]" :triggerChange="true" placeholder="请选择到期情况监测"
                                      dictCode="dqqkjc"/>
                </a-form-item>
              </a-col>
              <a-col :lg="6">
                <a-form-item :labelCol="labelCol"
                             :wrapperCol="wrapperCol"
                             label="备注">
                  <a-textarea v-decorator="['bz', {}]"/>
                </a-form-item>
              </a-col>
              <!--<a-col :lg="6">
                <a-form-item :labelCol="labelCol"
                             :wrapperCol="wrapperCol"
                             label="审核状态">
                  <a-input v-decorator="['shzt', {}]" :disabled="true"/>
                </a-form-item>
              </a-col>-->
            </a-row>
          </a-tab-pane>


          <a-tab-pane key="2">
            <span slot="tab"><a-icon type="book"/>诉讼资产</span>
            <a-row class="form-row" :gutter="16">
              <a-col :lg="8">
                <a-form-item :labelCol="labelCol"
                             :wrapperCol="wrapperCol"
                             label="担保/抵押有效性">
                  <a-input  v-model="sszcDataSource.dbdyyxx" />
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item :labelCol="labelCol"
                             :wrapperCol="wrapperCol"
                             label="转入表外日期">
                  <a-input v-model="sszcDataSource.zrbwrq" />
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item :labelCol="labelCol"
                             :wrapperCol="wrapperCol"
                             label="转入表外类型">
                  <a-input v-model="sszcDataSource.zrbwlx" />
                </a-form-item>
              </a-col>
            </a-row>

            <a-row class="form-row" :gutter="16">
              <a-col :lg="8">
                <a-form-item :labelCol="labelCol"
                             :wrapperCol="wrapperCol"
                             label="是否有权益">
                  <a-input v-model="sszcDataSource.sfyqy" />
                </a-form-item>
              </a-col>

              <a-col :lg="8">
                <a-form-item :labelCol="labelCol"
                             :wrapperCol="wrapperCol"
                             label="有无借据（合同）原件">
                  <a-input  v-model="sszcDataSource.ywjj" />
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item :labelCol="labelCol"
                             :wrapperCol="wrapperCol"
                             label="借款人类型">
                  <a-input v-model="sszcDataSource.jkrlx" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="16">
              <a-col :lg="8">
                <a-form-item :labelCol="labelCol"
                             :wrapperCol="wrapperCol"
                             label="借款人现状">
                  <a-input v-model="sszcDataSource.jkrxz" />
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item :labelCol="labelCol"
                             :wrapperCol="wrapperCol"
                             label="是否起诉">
                  <a-input v-model="sszcDataSource.sfqs" />
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item :labelCol="labelCol"
                             :wrapperCol="wrapperCol"
                             label="是否有诉讼时效">
                  <a-input  v-model="sszcDataSource.sfysssx" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="16">
              <a-col :lg="8">
                <a-form-item :labelCol="labelCol"
                             :wrapperCol="wrapperCol"
                             label="是否有执行时效">
                  <a-input v-model="sszcDataSource.sfyzxsx" />
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item :labelCol="labelCol"
                             :wrapperCol="wrapperCol"
                             label="诉讼阶段">
                  <a-input v-model="sszcDataSource.ssjd" />
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item :labelCol="labelCol"
                             :wrapperCol="wrapperCol"
                             label="抵押资产处置情况">
                  <a-input v-model="sszcDataSource.dyzcczqk" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="16">
              <a-col :lg="8">
                <a-form-item :labelCol="labelCol"
                             :wrapperCol="wrapperCol"
                             label="剩余未处置资产对应贷款本金">
                  <a-input  v-model="sszcDataSource.sywczzcdydkbj" />
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item :labelCol="labelCol"
                             :wrapperCol="wrapperCol"
                             label="未处置抵押物性质">
                  <a-input v-model="sszcDataSource.wczdywxz" />
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item :labelCol="labelCol"
                             :wrapperCol="wrapperCol"
                             label="未处置抵押物位置、楼层">
                  <a-input v-model="sszcDataSource.wqcdywwz" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="16">
              <a-col :lg="8">
                <a-form-item :labelCol="labelCol"
                             :wrapperCol="wrapperCol"
                             label="未处置抵押物面积">
                  <a-input v-model="sszcDataSource.wczdywmj" />
                </a-form-item>
              </a-col>
            </a-row>


          </a-tab-pane>


          <a-tab-pane key="3">
            <span slot="tab"><a-icon type="book"/>责任信息</span>
          <a-row class="form-row" :gutter="16">
            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="主要责任人">
                <a-input v-decorator="['zyzrr', {}]"/>
              </a-form-item>
            </a-col>

            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="次要责任人">
                <a-input v-decorator="['cyzrr', {}]" />
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="贷款责任人">
                <a-input v-decorator="['dkzrr', {}]" />
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="清收责任人">
                <a-input v-decorator="['qszrr', {}]"/>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row class="form-row" :gutter="16">
            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="清收处置措施">
                <j-dict-select-tag  :disabled="true" v-decorator="['qsczcs', {rules: [{ message: '请选择清收处置措施!' }]}]" :triggerChange="true" placeholder="请选择清收处置措施"
                                    dictCode="qsczcs"/>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="清收处置时限">
                <a-input v-decorator="['qsczsx', {}]"/>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="责任界定">
                <j-dict-select-tag  :disabled="true" v-decorator="['zrjd', {rules: [{ message: '请选择责任界定!' }]}]" :triggerChange="true" placeholder="请选择责任界定"
                                    dictCode="zrjd"/>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item :labelCol="labelCol"
                           :wrapperCol="wrapperCol"
                           label="不良形成原因">
                <j-dict-select-tag  :disabled="true" v-decorator="['blxcyy', {rules: [{ message: '请选择不良形成原因!' }]}]" :triggerChange="true" placeholder="请选择不良形成原因"
                                    dictCode="blxcyy"/>
              </a-form-item>
            </a-col>
          </a-row>
          </a-tab-pane>
            <a-tab-pane key="4">
              <span slot="tab"><a-icon type="book"/>附件管理</span>
              <a-card><form>
                <a-table :columns="columns_fjgl"
                         :dataSource="dataSource_fjgl"
                         :pagination="false">
                <span slot="action" slot-scope="text, record">
                  <photo-view ref="pictureView" @ok="modalFormOk"/>
                  <a-divider type="vertical"/>
                  <a class="orcodebtn" @click="downhander(record)">下载</a>
                  <a-divider type="vertical" />
                </span>
                </a-table>
              </form></a-card>
            </a-tab-pane>

            <a-tab-pane key="5">
              <span slot="tab"><a-icon type="book"/>状态迁徙留痕</span>
              <a-table ref="table"
                       size="middle"
                       bordered
                       rowKey="id"
                       :columns="columns2"
                       :dataSource="dataSourceBllh"
                       :loading="loading"
              >
              </a-table>

            </a-tab-pane>

          </a-tabs>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction,getAction,putAction } from '@/api/manage'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import pick from 'lodash.pick'
  import moment from "moment"
  import AFormItem from 'ant-design-vue/es/form/FormItem'
  import ATextarea from 'ant-design-vue/es/input/TextArea'
  import JEditableTable from '@comp/jeecg/JEditableTable'
  import { FormTypes, VALIDATE_NO_PASSED, getRefPromise, validateFormAndTables } from '@/utils/JEditableTableUtil'
  import { filterObj } from '@/utils/util'


  export default {
    name: "DksjjktzModal110",
    mixins: [JeecgListMixin],
    components: { ATextarea, AFormItem,JEditableTable },
    data () {
      return {
        title:"操作",
        visible: false,
        loading: false,
        dateValue: '',
        num:0,
        bnbl:0,
        bwbl:0,
        newDataSource:[],
        newDataSourceqs:[],
        newDataSource1:[],
        newDataSource2:[],
        newDataSource3:[],
        newDataSource4:[],
        newDataSource5:[],
        newDataSource6:[],
        newDataSource7:[],
        newDataSource8:[],
        newDataSource9:[],
        newDataSource10:[],
        newDataSource11:[],
        newDataSource12:[],
        bnblDataSource:[],
        bnblDataSourcesq:[],
        bnblDataSource1:[],
        bnblDataSource2:[],
        bnblDataSource3:[],
        bnblDataSource4:[],
        bnblDataSource5:[],
        bnblDataSource6:[],
        bnblDataSource7:[],
        bnblDataSource8:[],
        bnblDataSource9:[],
        bnblDataSource10:[],
        bnblDataSource11:[],
        bnblDataSource12:[],
        /*bwblDk:[],
        bwblDataSourceqs:[],
        bwblDataSource1:[],
        bwblDataSource2:[],
        bwblDataSource3:[],
        bwblDataSource4:[],
        bwblDataSource5:[],
        bwblDataSource6:[],
        bwblDataSource7:[],
        bwblDataSource8:[],
        bwblDataSource9:[],
        bwblDataSource10:[],
        bwblDataSource11:[],
        bwblDataSource12:[],*/
        dataSource:[],
        dataSourceBllh:[],
        dataSource1:[],
        dataSource2:{},
        dataSource3:{},
        dataSource4:{},
        sszcDataSource:{},
        pdzbszSetTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '进关注年月',
              key: 'jgzny',
              width: '10%',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
            {
              title: '年初余额',
              key: 'ncye',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请选择${title}',
              validateRules: [{}]
            },
            {
              title: '当前关注余额',
              key: 'dqgzye',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: []
            },
            {
              title: '客户贷款总余额',
              key: 'khdkzye',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: []
            },
            {
              title: '借款人或担保现状',
              key: 'jkrhdbxz',
              width: '50%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: []
            },
          ]
        },

        gzlSetTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '拟清收/盘活/无望',
              key: 'nqsphww',
              width: '10%',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: []
            },
            {
              title: '拟清收/盘活金额',
              key: 'nqsphje',
              width: '10%',
              type: FormTypes.inputNumber,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
            {
              title: '拟到位时间',
              key: 'ndwsj',
              width: '10%',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
            {
              title: '实到位时间',
              key: 'sdwsj',
              width: '10%',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: []
            },
            {
              title: '风险管理部要求处置进度',
              key: 'fxglbyqczjd',
              width: '50%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: []
            },
          ]
        },

        gzljd1SetTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '1月进度/措施',
              key: 'month1',
              width: '90%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
          ]
        },
        gzljd2SetTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '2月进度/措施',
              key: 'month2',
              width: '90%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
          ]
        },
        gzljd3SetTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '3月进度/措施',
              key: 'month3',
              width: '90%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: []
            },
          ]
        },
        gzljd4SetTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '4月进度/措施',
              key: 'month4',
              width: '90%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ }]
            },
          ]
        },
        gzljd5SetTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '5月进度/措施',
              key: 'month5',
              width: '90%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
          ]
        },
        gzljd6SetTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '6月进度/措施',
              key: 'month6',
              width: '90%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
          ]
        },
        gzljd7SetTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '7月进度/措施',
              key: 'month7',
              width: '90%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
          ]
        },
        gzljd8SetTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '8月进度/措施',
              key: 'month8',
              width: '90%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
          ]
        },
        gzljd9SetTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '9月进度/措施',
              key: 'month9',
              width: '90%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
          ]
        },
        gzljd10SetTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '10月进度/措施',
              key: 'month10',
              width: '90%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
          ]
        },
        gzljd11SetTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '11月进度/措施',
              key: 'month11',
              width: '90%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
          ]
        },
        gzljd12SetTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '12月进度/措施',
              key: 'month12',
              width: '90%',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
          ]
        },


        bnblSetTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '进不良年月',
              key: 'jblny',
              width: '10%',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
            {
              title: '年初余额',
              key: 'ncye',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请选择${title}',
              validateRules: [{}]
            },
            {
              title: '当前不良余额',
              key: 'dqblye',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: []
            },
            {
              title: '客户贷款总余额',
              key: 'khdkzye',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: []
            },
            {
              title: '责任认定人',
              key: 'zrrdr',
              width: '10%',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: []
            },
            {
              title: '借款人或担保现状',
              key: 'jkrhdbxz',
              width: '40%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: []
            },

          ]
        },
        bnblSetTableqs: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '压降任务',
              key: 'yjrw',
              width: '10%',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
            {
              title: '拟合计压降',
              key: 'nhjyj',
              width: '10%',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
            {
              title: '实合计压降',
              key: 'shjyj',
              width: '10%',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: []
            },
            {
              title: '清收任务',
              key: 'qsrw',
              width: '10%',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: []
            },
            {
              title: '拟合计清收',
              key: 'nhjqs',
              width: '10%',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: []
            },
            {
              title: '风险管理部要求处置进度',
              key: 'fxglbyqczjd',
              width: '40%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: []
            },

          ]
        },
        bnblSetTable1: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '1月进度/措施',
              key: 'month1',
              width: '90%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },

          ]
        },
        bnblSetTable2: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '2月进度/措施',
              key: 'month2',
              width: '90%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
          ]
        },
        bnblSetTable3: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '3月进度/措施',
              key: 'month3',
              width: '90%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
          ]
        },
        bnblSetTable4: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '4月进度/措施',
              key: 'month4',
              width: '90%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
          ]
        },
        bnblSetTable5: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '5月进度/措施',
              key: 'month5',
              width: '90%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
          ]
        },
        bnblSetTable6: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '6月进度/措施',
              key: 'month6',
              width: '90%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
          ]
        },
        bnblSetTable7: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '7月进度/措施',
              key: 'month7',
              width: '90%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
          ]
        },
        bnblSetTable8: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '8月进度/措施',
              key: 'month8',
              width: '90%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
          ]
        },
        bnblSetTable9: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '9月进度/措施',
              key: 'month9',
              width: '90%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
          ]
        },
        bnblSetTable10: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '10月进度/措施',
              key: 'month10',
              width: '90%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
          ]
        },
        bnblSetTable11: {
          loading: false,
          dataSource: [],
          columns: [
            {
            title: '贷款账号',
            key: 'dkzh',
            width: '10%',
            type: FormTypes.normal,
            defaultValue: '',
            placeholder: '请输入${title}',
            validateRules: [{ required: true, message: '${title}不能为空' }]
          },
            {
              title: '11月进度/措施',
              key: 'month11',
              width: '90%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
          ]
        },
        bnblSetTable12: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '12月进度/措施',
              key: 'month12',
              width: '90%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
          ]
        },


        bwblSetTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '核销年月',
              key: 'hxny',
              width: '10%',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
            {
              title: '有无权益',
              key: 'ywqy',
              width: '10%',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
            {
              title: '年初余额',
              key: 'ncye',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: []
            },
            {
              title: '当前表外余额',
              key: 'dqbwye',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: []
            },
            {
              title: '本年清收',
              key: 'bnqs',
              width: '10%',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: []
            },
            {
              title: '责任认定人',
              key: 'zrrdr',
              width: '10%',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: []
            },
            {
              title: '借款人或担保现状',
              key: 'jkrhdbxz',
              width: '30%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: []
            },
          ]
        },
        bwblSetTableqs: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '清收任务',
              key: 'qsrw',
              width: '10%',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
            {
              title: '拟合计清收',
              key: 'nhjqs',
              width: '10%',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
            {
              title: '实合计清收',
              key: 'shjqs',
              width: '10%',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: []
            },
            {
              title: '拟清收/盘活/无望',
              key: 'nqsphww',
              width: '10%',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: []
            },
            {
              title: '拟清收/盘活金额',
              key: 'nqsphje',
              width: '10%',
              type: FormTypes.inputNumber,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: []
            },
            {
              title: '拟到位时间',
              key: 'ndwsj',
              width: '10%',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: []
            },
            {
              title: '风险管理部要求处置进度',
              key: 'fxglbyqczjd',
              width: '30%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
          ]
        },
        bwblSetTable1: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '1月进度/措施',
              key: 'month1',
              width: '90%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
          ]
        },
        bwblSetTable2: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '2月进度/措施',
              key: 'month2',
              width: '90%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
          ]
        },
        bwblSetTable3: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '3月进度/措施',
              key: 'month3',
              width: '90%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
          ]
        },
        bwblSetTable4: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '4月进度/措施',
              key: 'month4',
              width: '40%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
          ]
        },
        bwblSetTable5: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '5月进度/措施',
              key: 'month5',
              width: '90%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
          ]
        },
        bwblSetTable6: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '6月进度/措施',
              key: 'month6',
              width: '90%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
          ]
        },
        bwblSetTable7: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '7月进度/措施',
              key: 'month7',
              width: '90%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
          ]
        },
        bwblSetTable8: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '8月进度/措施',
              key: 'month8',
              width: '90%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
          ]
        },
        bwblSetTable9: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '9月进度/措施',
              key: 'month9',
              width: '90%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
          ]
        },
      bwblSetTable10: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '10月进度/措施',
              key: 'month10',
              width: '90%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
          ]
        },
        bwblSetTable11: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '11月进度/措施',
              key: 'month11',
              width: '90%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
          ]
        },
      bwblSetTable12: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '贷款账号',
              key: 'dkzh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '12月进度/措施',
              key: 'month12',
              width: '90%',
              type: FormTypes.textarea,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{}]
            },
          ]
        },


        columns: [
          {
            title: '关联人姓名',
            align: "center",
            dataIndex: 'glrxm'
          },
          {
            title: '关联关系',
            align: "center",
            dataIndex: 'glgx_dictText'
          },
          {
            title: '证件号码',
            align: "center",
            dataIndex: 'glrzjhm'
          },
          {
            title: '证件类型',
            align: "center",
            dataIndex: 'glrzjlx_dictText'
          },
          {
            title: '存款余额',
            align: "center",
            dataIndex: 'glrckye'
          },
          {
            title: '工作单位',
            align: "center",
            dataIndex: 'glrgzdw'
          },
          {
            title: '联系电话',
            align: "center",
            dataIndex: 'glrlxdh'
          },
        ],
        columns2: [
          {
            title: '贷款日期起',
            align: "center",
            dataIndex: 'dkrqq'
          },
          {
            title: '贷款日期止',
            align: "center",
            dataIndex: 'dkrqz'
          },
          {
            title: '贷款形态',
            align: "center",
            dataIndex: 'dkxt_dictText'
          },

        ],

        columns_fjgl:[
          {
            title: '文件类型',
            dataIndex: 'fjlx',
            key: 'fjlx',
            scopedSlots: { customRender: 'fjlx' }
          },
          {
            title: '文件栏路径',
            dataIndex: 'wjlj',
            key: 'wjlj',
            scopedSlots: { customRender: 'wjlj' }
          },
          {
            title: '上传人',
            dataIndex: 'lrr',
            key: 'lrr',
            scopedSlots: { customRender: 'lrr' }
          },
          {
            title: '上传时间',
            dataIndex: 'lrsj',
            key: 'lrsj',
            scopedSlots: { customRender: 'lrsj' }
          },
        ],
        dataSource_fjgl: [],
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
        dkzh:{rules: [{ required: true, message: '请输入贷款账号!' }]},
        },
        url: {
          add: "/bndksjjktz/dndksjjktz/add",
          edit: "/bndksjjktz/dndksjjktz/edit",
        },
      }
    },
    created () {
      this.init();
    },
    methods: {

      click(){
        this.num +=1
      },
      jkptbnbl(){
        this.bnbl +=1
      },
      jkptbwbl(){
        this.bwbl +=1
      },

      loadData (arg) {
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1
        }
        this.confirmLoading = true;
        console.log(this.queryParam.tjnf)
        console.log(this.model.tjyf)
        console.log(new Date().getFullYear().toString())
        if (this.queryParam.tjnf == new Date().getFullYear().toString()) {
          var params = { "tjnf": this.model.tjyf, "zjhm": this.model.zjhm }//查询条件
        } else {
          var params = { "tjnf": this.queryParam.tjnf+'-12-01', "zjhm": this.model.zjhm }//查询条件
        }


        console.info(params)
        getAction("/bndksjjktz/dndksjjktz/queryGzl", params).then((res) => {
          console.log(res)
          if (res.success) {
            if (res.result == null){
              this.pdzbszSetTable.dataSource = []
              this.gzlSetTable.dataSource = []
              this.gzljd1SetTable.dataSource = []
              this.gzljd2SetTable.dataSource = []
              this.gzljd3SetTable.dataSource = []
              this.gzljd4SetTable.dataSource = []
              this.gzljd5SetTable.dataSource = []
              this.gzljd6SetTable.dataSource = []
              this.gzljd7SetTable.dataSource = []
              this.gzljd8SetTable.dataSource = []
              this.gzljd9SetTable.dataSource = []
              this.gzljd10SetTable.dataSource = []
              this.gzljd1SetTable.dataSource = []
              this.gzljd12SetTable.dataSource = []
            }else {
              this.pdzbszSetTable.dataSource = res.result
              this.gzlSetTable.dataSource = res.result
              this.gzljd1SetTable.dataSource = res.result
              this.gzljd2SetTable.dataSource = res.result
              this.gzljd3SetTable.dataSource = res.result
              this.gzljd4SetTable.dataSource = res.result
              this.gzljd5SetTable.dataSource = res.result
              this.gzljd6SetTable.dataSource = res.result
              this.gzljd7SetTable.dataSource = res.result
              this.gzljd8SetTable.dataSource = res.result
              this.gzljd9SetTable.dataSource = res.result
              this.gzljd10SetTable.dataSource = res.result
              this.gzljd11SetTable.dataSource = res.result
              this.gzljd12SetTable.dataSource = res.result
            }
          } else {
            this.pdzbszSetTable.dataSource = []
            this.gzlSetTable.dataSource = []
            this.gzljd1SetTable.dataSource = []
            this.gzljd2SetTable.dataSource = []
            this.gzljd3SetTable.dataSource = []
            this.gzljd4SetTable.dataSource = []
            this.gzljd5SetTable.dataSource = []
            this.gzljd6SetTable.dataSource = []
            this.gzljd7SetTable.dataSource = []
            this.gzljd8SetTable.dataSource = []
            this.gzljd9SetTable.dataSource = []
            this.gzljd10SetTable.dataSource = []
            this.gzljd1SetTable.dataSource = []
            this.gzljd12SetTable.dataSource = []
          }
        }).finally(() => {
          this.confirmLoading = false;
        })
        getAction("/bndksjjktz/dndksjjktz/queryBnbl", params).then((res) => {
          console.log(res)
          if (res.success) {
            if (res.result == null){
              this.bnblSetTable.dataSource = []
              this.bnblSetTableqs.dataSource = []
              this.bnblSetTable1.dataSource = []
              this.bnblSetTable2.dataSource = []
              this.bnblSetTable3.dataSource = []
              this.bnblSetTable4.dataSource = []
              this.bnblSetTable5.dataSource = []
              this.bnblSetTable6.dataSource = []
              this.bnblSetTable7.dataSource = []
              this.bnblSetTable8.dataSource = []
              this.bnblSetTable9.dataSource = []
              this.bnblSetTable10.dataSource = []
              this.bnblSetTable11.dataSource = []
              this.bnblSetTable12.dataSource = []
            }else {
              this.bnblSetTable.dataSource = res.result
              this.bnblSetTableqs.dataSource = res.result
              this.bnblSetTable1.dataSource = res.result
              this.bnblSetTable3.dataSource = res.result
              this.bnblSetTable2.dataSource = res.result
              this.bnblSetTable4.dataSource = res.result
              this.bnblSetTable5.dataSource = res.result
              this.bnblSetTable6.dataSource = res.result
              this.bnblSetTable7.dataSource = res.result
              this.bnblSetTable8.dataSource = res.result
              this.bnblSetTable9.dataSource = res.result
              this.bnblSetTable10.dataSource = res.result
              this.bnblSetTable11.dataSource = res.result
              this.bnblSetTable12.dataSource = res.result
            }
          } else {
            this.bnblSetTable.dataSource = []
            this.bnblSetTableqs.dataSource = []
            this.bnblSetTable1.dataSource = []
            this.bnblSetTable2.dataSource = []
            this.bnblSetTable3.dataSource = []
            this.bnblSetTable4.dataSource = []
            this.bnblSetTable5.dataSource = []
            this.bnblSetTable6.dataSource = []
            this.bnblSetTable7.dataSource = []
            this.bnblSetTable8.dataSource = []
            this.bnblSetTable9.dataSource = []
            this.bnblSetTable10.dataSource = []
            this.bnblSetTable11.dataSource = []
            this.bnblSetTable12.dataSource = []
          }
        }).finally(() => {
          this.confirmLoading = false;
        })
        getAction("/bndksjjktz/dndksjjktz/queryBwbl", params).then((res) => {
          console.log(res)
          if (res.success) {
            if (res.result == null){
              this.bwblSetTable.dataSource = []
              this.bwblSetTableqs.dataSource = []
              this.bwblSetTable1.dataSource = []
              this.bwblSetTable2.dataSource = []
              this.bwblSetTable3.dataSource = []
              this.bwblSetTable4.dataSource = []
              this.bwblSetTable5.dataSource = []
              this.bwblSetTable6.dataSource = []
              this.bwblSetTable7.dataSource = []
              this.bwblSetTable8.dataSource = []
              this.bwblSetTable9.dataSource = []
              this.bwblSetTable10.dataSource = []
              this.bwblSetTable11.dataSource = []
              this.bwblSetTable12.dataSource = []
            }else {
              this.bwblSetTable.dataSource = res.result
              this.bwblSetTableqs.dataSource = res.result
              this.bwblSetTable1.dataSource = res.result
              this.bwblSetTable2.dataSource = res.result
              this.bwblSetTable3.dataSource = res.result
              this.bwblSetTable4.dataSource = res.result
              this.bwblSetTable5.dataSource = res.result
              this.bwblSetTable6.dataSource = res.result
              this.bwblSetTable7.dataSource = res.result
              this.bwblSetTable8.dataSource = res.result
              this.bwblSetTable9.dataSource = res.result
              this.bwblSetTable10.dataSource = res.result
              this.bwblSetTable11.dataSource = res.result
              this.bwblSetTable12.dataSource = res.result
            }
          } else {
            this.bwblSetTable.dataSource = [{}]
            this.bwblSetTable2.dataSource = [{}]
            this.bwblSetTable3.dataSource = [{}]
            this.bwblSetTable4.dataSource = [{}]
            this.bwblSetTable5.dataSource = [{}]
            this.bwblSetTable6.dataSource = [{}]
            this.bwblSetTable7.dataSource = [{}]
            this.bwblSetTable8.dataSource = [{}]
            this.bwblSetTable9.dataSource = [{}]
            this.bwblSetTable10.dataSource = [{}]
            this.bwblSetTable11.dataSource = [{}]
            this.bwblSetTable12.dataSource = [{}]
          }
        }).finally(() => {
          this.confirmLoading = false;
        })

        getAction("/bndksjjktz/dndksjjktz/querySszc", {"zjhm": this.model.zjhm,"dkzh": this.model.dkzh} ).then((res) => {
          if (res.success) {
            this.sszcDataSource = res.result;
            console.log(this.sszcDataSource)
          }
        })

      },




      // 获取当前年份
      init(){
        var myDate = new Date;
        var year = myDate.getFullYear();
        this.initSelectYear(year)
        this.queryParam = {tjnf: undefined};
        this.queryParam.tjnf = year;
      },
      // 初始化年份选择下拉框
      initSelectYear(year){
        this.years = [];
        for(let i=0; i<30; i++){
          this.years.push({value:((year - i)+''),label:((year - i)+'')});
        }
      },
      valueChange1(e){
        console.log('valueChange',e)
        this.newDataSource=e.newDataSource
      },
      valueChange2(e){
        console.log('valueChange2',e)
        this.newDataSourceqs=e.newDataSource
      },
      valueChange3(e){
        console.log('valueChange3',e)
        this.newDataSource1=e.newDataSource
      },
      valueChange4(e){
        console.log('valueChange4',e)
        this.newDataSource2=e.newDataSource
      },
      //三月
      valueChange5(e){
        console.log('valueChange5',e)
        this.newDataSource3=e.newDataSource
      },
      //四月
      valueChange6(e){
        console.log('valueChange6',e)
        this.newDataSource4=e.newDataSource
      },
      valueChange7(e){
        console.log('valueChange7',e)
        this.newDataSource5=e.newDataSource
      },
      valueChange8(e){
        console.log('valueChange8',e)
        this.newDataSource6=e.newDataSource
      },
      valueChange9(e){
        console.log('valueChange9',e)
        this.newDataSource7=e.newDataSource
      },
      valueChange10(e){
        console.log('valueChange10',e)
        this.newDataSource8=e.newDataSource
      },
      valueChange11(e){
        console.log('valueChange11',e)
        this.newDataSource9=e.newDataSource
      },
      valueChange12(e){
        console.log('valueChange12',e)
        this.newDataSource10=e.newDataSource
      },
      valueChange13(e){
        console.log('valueChange12',e)
        this.newDataSource11=e.newDataSource
      },
      valueChange14(e){
        console.log('valueChange12',e)
        this.newDataSource12=e.newDataSource
      },

      valueChangeBnbl(e){
        console.log('valueChangeBnbl',e)
        this.bnblDataSource=e.newDataSource
      },
      valueChangeBnblqs(e){
        console.log('valueChangeBnblqs',e)
        this.bnblDataSourcesq=e.newDataSource
      },
      valueChangeBnbl1(e){
        console.log('valueChangeBnbl1',e)
        this.bnblDataSource1=e.newDataSource
      },
      valueChangeBnbl2(e){
        console.log('valueChangeBnbl2',e)
        this.bnblDataSource2=e.newDataSource
      },
      valueChangeBnbl3(e){
        console.log('valueChangeBnbl3',e)
        this.bnblDataSource3=e.newDataSource
      },
      valueChangeBnbl4(e){
        console.log('valueChangeBnbl4',e)
        this.bnblDataSource4=e.newDataSource
      },
      valueChangeBnbl5(e){
        console.log('valueChangeBnbl5',e)
        this.bnblDataSource5=e.newDataSource
      },
      valueChangeBnbl6(e){
        console.log('valueChangeBnbl6',e)
        this.bnblDataSource6=e.newDataSource
      },
      valueChangeBnbl7(e){
        console.log('valueChangeBnbl7',e)
        this.bnblDataSource7=e.newDataSource
      },
      valueChangeBnbl8(e){
        this.bnblDataSource8=e.newDataSource
      },
      valueChangeBnbl9(e){
        console.log('valueChangeBnbl9',e)
        this.bnblDataSource9=e.newDataSource
      },
      valueChangeBnbl10(e){
        console.log('valueChangeBnbl10',e)
        this.bnblDataSource10=e.newDataSource
      },
      valueChangeBnbl11(e){
        console.log('valueChangeBnbl11',e)
        this.bnblDataSource11=e.newDataSource
      },
      valueChangeBnbl12(e){
        console.log('valueChangeBnbl12',e)
        this.bnblDataSource12=e.newDataSource
      },

    /*  valueChangeBwbl(e){
        console.log('bwblDk',e)
        this.bwblDk=e.newDataSource
      },
      valueChangeBwblqs(e){
        console.log('bwblDataSourceqs',e)
        this.bwblDataSourceqs=e.newDataSource
      },
      valueChangeBwbl1(e){
        console.log('valueChangeBwbl1',e)
        this.bwblDataSource1=e.newDataSource
      },
      valueChangeBwbl2(e){
        console.log('bwblDataSource2',e)
        this.bwblDataSource2=e.newDataSource
      },
      valueChangeBwbl3(e){
        console.log('bwblDataSource3',e)
        this.bwblDataSource3=e.newDataSource
      },
      valueChangeBwbl4(e){
        console.log('bwblDataSource4',e)
        this.bwblDataSource4=e.newDataSource
      },
      valueChangeBwbl5(e){
        console.log('bwblDataSource5',e)
        this.bwblDataSource5=e.newDataSource
      },
      valueChangeBwbl6(e){
        console.log('bwblDataSource6',e)
        this.bwblDataSource6=e.newDataSource
      },
      valueChangeBwbl7(e){
        console.log('bwblDataSource7',e)
        this.bwblDataSource7=e.newDataSource
      },
      valueChangeBwbl8(e){
        console.log('bwblDataSource8',e)
        this.bwblDataSource8=e.newDataSource
      },
    valueChangeBwbl9(e){
        console.log('bwblDataSource9',e)
        this.bwblDataSource9=e.newDataSource
      },
      valueChangeBwbl10(e){
        console.log('bwblDataSource10',e)
        this.bwblDataSource10=e.newDataSource
      },
      valueChangeBwbl11(e){
        console.log('bwblDataSource11',e)
        this.bwblDataSource11=e.newDataSource
      },
      valueChangeBwbl12(e){
        console.log('bwblDataSource12',e)
        this.bwblDataSource12=e.newDataSource
      },*/


      add () {
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        console.log(this.model)
        this.visible = true;
        this.$nextTick(() => {
          if (record.dkzh) {
            getAction("/bndksjjktz/dndksjjktz/query", { "dkzh": record.dkzh }).then((res) => {
              if (res.success) {
                this.dataSource = res.result;
                this.form.setFieldsValue(
                  pick(
                    this.dataSource,
                    'jgdm', 'khmc', 'zjhm', 'khlx', 'dz', 'dkzh', 'bmkkh', 'dkje', 'dkye', 'jxr', 'dkqx', 'cpmc', 'syts', 'qxts', 'bnyjlx', 'bnyslx', 'bwyjlx', 'bwyslx', 'bnwqxh', 'dkll', 'dbfs',
                    'dyzrr', 'khjlbz', 'khsshylx', 'dktx', 'dkxt', 'xddkpz', 'dqqkjc', 'blxcyy', 'zrjd', 'qsczcs', 'qsczsx', 'dkzrr', 'qszrr', 'bz', 'lrbz', 'lrr', 'khjlyggh', 'zyzrr', 'cyzrr',
                    'xwqy', 'dhhm', 'shzt'
                  )
                )
              }
            })

            getAction("/DkjkptDhgzfjxx/dkjkptDhgzfjxx/queryFjxx", { "dkzh": record.dkzh }).then((res) => {
              this.dataSource_fjgl = res.result;
            });
            getAction("/bndksjjktz/dndksjjktz/queryGlrxx",{"zjhm":record.zjhm}).then((res)=>{
              if (res.success){
                this.dataSource1 = res.result;
              }else{
                this.dataSource1 =[]
              }
            })
            getAction("/bndksjjktz/dndksjjktz/queryBllh",{"dkzh":record.dkzh}).then((res)=>{
              if (res.success){
                  this.dataSourceBllh = res.result;
              }else{
                this.dataSourceBllh = []
              }
            })


          }
          console.log(this.model)
          //时间格式化
          this.form.setFieldsValue({ tjyf: this.model.tjyf ? moment(this.model.tjyf) : null })
          this.form.setFieldsValue({ jkrq: this.model.jkrq ? moment(this.model.jkrq) : null })
          this.form.setFieldsValue({ dqrq: this.model.dqrq ? moment(this.model.dqrq) : null })
          this.form.setFieldsValue({ qxr: this.model.qxr ? moment(this.model.qxr) : null })
          this.loadData()

        })


      },
      close () {
        this.$emit('close');
        this.dataSourceBllh = []
        this.num=0;
        this.bnbl=0;
        this.bwbl=0;
        this.visible = false;
      },
      handleOk () {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;

            let formData = Object.assign(this.model,this.dataSource2, values);
            console.log(formData)
            //时间格式化
            formData.tjyf = formData.tjyf?formData.tjyf.format():null;
            formData.jkrq = formData.jkrq?formData.jkrq.format():null;
            formData.dqrq = formData.dqrq?formData.dqrq.format():null;
            formData.qxr  = formData.qxr?formData.qxr.format():null;
            formData.ndwsj  = moment(formData.ndwsj)?moment(formData.ndwsj).format():null;
            formData.sdwsj  = moment(formData.sdwsj)?moment(formData.sdwsj).format():null;
            //formData.lrsj = formData.lrsj?formData.lrsj.format():null;

            console.log(formData)

            let record ={
              'tjnf':this.queryParam.tjnf+'-01-01',
              'formData':formData,
              'gzl':this.newDataSource,
              'gzljdqs':this.newDataSourceqs,
              'gzljd1':this.newDataSource1,
              'gzljd2':this.newDataSource2,
              'gzljd3':this.newDataSource3,
              'gzljd4':this.newDataSource4,
              'gzljd5':this.newDataSource5,
              'gzljd6':this.newDataSource6,
              'gzljd7':this.newDataSource7,
              'gzljd8':this.newDataSource8,
              'gzljd9':this.newDataSource9,
              'gzljd10':this.newDataSource10,
              'gzljd11':this.newDataSource11,
              'gzljd12':this.newDataSource12,

              'bnbl':this.bnblDataSource,
              'bnblqs':this.bnblDataSourcesq,
              'bnbl1':this.bnblDataSource1,
              'bnbl2':this.bnblDataSource2,
              'bnbl3':this.bnblDataSource3,
              'bnbl4':this.bnblDataSource4,
              'bnbl5':this.bnblDataSource5,
              'bnbl6':this.bnblDataSource6,
              'bnbl7':this.bnblDataSource7,
              'bnbl8':this.bnblDataSource8,
              'bnbl9':this.bnblDataSource9,
              'bnbl10':this.bnblDataSource10,
              'bnbl11':this.bnblDataSource11,
              'bnbl12':this.bnblDataSource12,

             /* 'bwbl':this.bwblDk,
              'bwblqs':this.bwblDataSourceqs,
              'bwbl1':this.bwblDataSource1,
              'bwbl2':this.bwblDataSource2,
              'bwbl3':this.bwblDataSource3,
              'bwbl4':this.bwblDataSource4,
              'bwbl5':this.bwblDataSource5,
              'bwbl6':this.bwblDataSource6,
              'bwbl7':this.bwblDataSource7,
              'bwbl8':this.bwblDataSource8,
              'bwbl9':this.bwblDataSource9,
              'bwbl10':this.bwblDataSource10,
              'bwbl11':this.bwblDataSource11,
              'bwbl12':this.bwblDataSource12,*/

              'sszc':this.sszcDataSource,
            }
            httpAction('/bndksjjktz/dndksjjktz/edit110',record,'post').then((res)=>{
              if(res.success) {
                that.$message.success(res.message);
                that.$emit('ok');
              } else {
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
              that.close();
            })



          }
        })
      },
      handleCancel () {
        this.close()
      },
    }
  }
</script>

<style lang="less" scoped>

</style>