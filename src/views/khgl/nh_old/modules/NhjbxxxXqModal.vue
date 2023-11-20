<template>
  <a-modal :title="title"
           :width="1450"
           :visible="visible"
           :confirmLoading="confirmLoading"
           :okButtonProps="{ props: {disabled: true} }"
           :destroyOnClose="true"
           @ok="handleOk"
           @cancel="handleCancel"
           cancelText="关闭">

    <!--客户管理\农户信息管理\新增农户信息-->
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-tabs default-active-key="1" animated='animated'>
          <!--Tab 1：农户基本信息\Begin-->
          <a-tab-pane key="1">
            <span slot="tab"><a-icon type="book"/>农户基本信息</span>
            <a-card class="card" :bordered="false">
              <a-divider orientation="left" style="color: #1890FF;margin-top: -20px;">基本信息</a-divider>
              <a-row class="form-row" :gutter="16">
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属支行">
                  <j-dict-select-tag placeholder="请输入所属支行" v-decorator="['sszh', {} ]" :triggerChange="true" dict-code="HR_BAS_ORGANIZATION,zzjc,zzbz"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="原所属村">
                  <a-input placeholder="原所属村" v-decorator="['yxzc', {} ]" />
                </a-form-item></a-col>

                <a-col :lg="8"><a-form-item :labelCol="labelCol":wrapperCol="wrapperCol"label="原所属乡镇">
                  <a-input placeholder="请输入原所属乡镇" v-decorator="['yssxz', {}]" />
                </a-form-item></a-col>


                <!-- <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol"label="所属营销单元">
                     <j-dict-select-tag  v-decorator="['ssyxdy', {rules: [{ required: true, message: '请选择所属营销单元!' }]}]" :triggerChange="true" placeholder="请选择所属营销单元" dictCode="V_CZXXGL_ORGANIZE,ORGANIZE,QYBM"/>
                   </a-form-item>
                 </a-col>-->


                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户名称">
                  <a-input placeholder="请输入客户名称" v-decorator="['khmc', {}]" />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="证件号码">
                  <a-input placeholder="请输入身份证号码" v-decorator="['zjhm', {} ]" />
                </a-form-item></a-col>
                <!--<a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="主客户经理">
                    <a-input  hidden="true" v-model="this.model.sskhjl" />
                    <j-select-ygxx    :treeDefaultExpandAll="true" ref="zkhjl"
                                      v-model="zkhjlacct" @change="GetValueZkhjl"  ></j-select-ygxx>
                  </a-form-item>
                </a-col>-->
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="户号编码">
                  <a-input placeholder="请输入户号编码" v-decorator="['hhbm', {} ]" />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否户主">
                  <j-dict-select-tag placeholder="请选择是否户主" v-decorator="['sfhz', {rules: [{  message: '' }]}]" :triggerChange="true" dictCode="sfbz"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="与户主关系">
                  <j-dict-select-tag placeholder="请选择与户主关系" v-decorator="['yhzgx', {rules: [{  message: '请选择与户主关系!' }]}]" :triggerChange="true" dictCode="yhzgx"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户性别">
                  <j-dict-select-tag placeholder="请选择客户性别" v-decorator="['xb', {rules: [{  }]}]" :triggerChange="true" dictCode="sex"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户年龄">
                  <a-input placeholder="请输入客户年龄" v-decorator="['nl', {}]" />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="民族">
                  <j-dict-select-tag placeholder="请选择客户民族" v-decorator="['mz', {}]" :triggerChange="true" dict-code="mz"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="手机号码">
                  <a-input placeholder="请输入手机号码" v-decorator="['sjhm', {}]" />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="婚姻状况">
                  <j-dict-select-tag placeholder="请选择婚姻状况" v-decorator="['hyzk', {}]" :triggerChange="true" dict-code="bkbpy_hyzk"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="户籍地址">
                  <a-input placeholder="请输入户籍地址" v-decorator="['hjdz', {}]"/>
                </a-form-item></a-col>
              </a-row>

              <a-divider orientation="left" style="color: #1890FF;margin-top: -20px;">采集信息</a-divider>
              <a-row class="form-row" :gutter="16">
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="文化程度">
                <j-dict-select-tag placeholder="请选择文化程度" v-decorator="['whcd', {}]" :triggerChange="true" dict-code="whcd"/>
              </a-form-item></a-col>
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="户口性质">
                <j-dict-select-tag placeholder="请选择户口性质" v-decorator="['hkxz', {rules: [{  message: '请选择户口性质!' }]}]" :triggerChange="true" dictCode="khgl_hkxz"/>
              </a-form-item></a-col>
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="备用号码">
                <a-input placeholder="请输入备用号码" v-decorator="['byhm', {}]" />
              </a-form-item></a-col>

              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="QQ号码">
                <a-input placeholder="请输入QQ号码" v-decorator="['qq', {}]" />
              </a-form-item></a-col>
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户类型I">
                <j-dict-select-tag placeholder="请选择客户类型I" v-decorator="['khlx1', {}]" dictCode="khlx1"/>
              </a-form-item></a-col>
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户类型II">
                <j-dict-select-tag placeholder="请选择客户类型II" v-decorator="['khlx2', {}]" dictCode="khlx2"/>
              </a-form-item></a-col>

              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="居住地址">
                <a-input placeholder="请输入常住地址" v-decorator="['zz', {}]"/>
              </a-form-item></a-col>
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="曾住地址">
                <a-input placeholder="请输入曾住地址" v-decorator="['zz1', {}]"/>
              </a-form-item></a-col>
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="其他地址">
                <a-input placeholder="请输入其他地址" v-decorator="['zz2', {}]"/>
              </a-form-item></a-col>

              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="有无子女">
                <j-dict-select-tag placeholder="请选择有无子女" v-decorator="['ywzn', {}]" dictCode="sfbz"/>
              </a-form-item></a-col>
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="健康状况">
                <j-dict-select-tag placeholder="请选择健康状况" v-decorator="['jkzk', {}]" dictCode="jkzk"/>
              </a-form-item></a-col>
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="劳动能力">
                <j-dict-select-tag placeholder="请选择劳动能力" v-decorator="['ldnl', {}]" dictCode="ldnl"/>
              </a-form-item></a-col>

              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="居住年限">
                <j-dict-select-tag placeholder="请选择居住年限" v-decorator="['jznx', {}]" dictCode="jznx"/>
              </a-form-item></a-col>
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="居住状态">
                <a-input placeholder="请输入居住状态" v-decorator="['jzzt', {}]"/>
              </a-form-item></a-col>
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="最高学历">
                <j-dict-select-tag placeholder="请选择最高学历" v-decorator="['zgxl', {}]" dictCode="whcd"/>
              </a-form-item></a-col>
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="最高学位">
                <j-dict-select-tag placeholder="请选择最高学位" v-decorator="['zgxw', {}]" dictCode="zgxw"/>
              </a-form-item></a-col>

              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否不良贷款户">
                <j-dict-select-tag placeholder="是否不良贷款户" v-decorator="['sfbldkh', {}]" dictCode="sfbz"/>
              </a-form-item></a-col>
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否贫困户">
                <j-dict-select-tag placeholder="是否贫困户" v-decorator="['sfpkh', {}]" dictCode="sfbz"/>
              </a-form-item></a-col>
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否低保户">
                <j-dict-select-tag placeholder="是否低保户" v-decorator="['sfdbh', {}]" dictCode="sfbz"/>
              </a-form-item></a-col>
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否外出务工">
                <j-dict-select-tag placeholder="是否外出务工" v-decorator="['sfycdg', {}]" dictCode="sfbz"/>
              </a-form-item></a-col>

              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="务工城市">
                <a-input placeholder="请输入务工城市" v-decorator="['wgcs', {}]"/>
              </a-form-item></a-col>
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="陪访人">
                <a-input placeholder="请输入陪访人" v-decorator="['pfr', {}]"/>
              </a-form-item></a-col>

              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否授信">
                <j-dict-select-tag placeholder="是否授信" v-decorator="['sfsx', {}]" dictCode="sfbz"/>
              </a-form-item></a-col>
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="从事行业或工作单位">
                <a-input placeholder="请输入从事行业或工作单位" v-decorator="['cshygz', {}]"/>
              </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户重要程度">
                  <j-dict-select-tag placeholder="请选择客户重要程度" v-decorator="['kfyyqk', {}]" :triggerChange="true" dictCode="khgl_khzycd"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户潜在业务">
                  <j-multi-select-tag placeholder="客户潜在业务" v-decorator="['kcqzyw', {}]" dict-code="khqzyw" style="width: 100%;"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户授信情况">
                  <j-dict-select-tag v-decorator="['khsxqk', {rules: [{  }]}]" :triggerChange="true" dictCode="khgl_sxqk"/>
                </a-form-item></a-col>
              </a-row>
              <a-row class="form-row" :gutter="16">
              <a-col :lg="24"><a-form-item :labelCol="{span:8}" :wrapperCol="{span: 8}" label="户主及家庭成员社会诚信，家庭及邻里关系，道德品质等综合评价">
                <j-dict-select-tag placeholder="" v-decorator="['ddpzzhpj', {}]" dictCode="ddpzzhpj"/>
              </a-form-item></a-col>
              </a-row>

            </a-card>
          </a-tab-pane>

          <!--Tab 2：家庭相关情况-->
          <a-tab-pane key="2">
            <span slot="tab"><a-icon type="book"/>家庭相关情况</span>
            <a-card><form >
              <a-table bordered
                       :columns="columns_jtqk"
                       :dataSource="dataSource_jtcy"
                       rowKey="id"
                       @change="handleTableChange"
                       :loading="loading"
                       :pagination="ipagination"
                       :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"/>
            </form></a-card>
          </a-tab-pane>

          <!--Tab 3：业务信息-->
          <a-tab-pane key="3">
            <span slot="tab"><a-icon type="book"/>业务信息</span>
            <a-card class="card" :bordered="false">

              <a-divider orientation="left" style="color: #1890FF;">与我行相关业务信息</a-divider>
              <a-row class="form-row" :gutter="10">
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="存款余额">
                  <a-input placeholder="请输入存款余额" v-model="this.ywhxgywxxmodel.ckye" readonly="true" />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="存款日平余额">
                  <a-input placeholder="请输入存款日平余额" v-model="this.ywhxgywxxmodel.ckrpye"  readonly="true" />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="存款年日平余额">
                  <a-input placeholder="请输入存款年日平余额" v-model="this.ywhxgywxxmodel.cknrpye"  readonly="true" />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否开通存款业务">
                  <j-dict-select-tag v-model="this.ywhxgywxxmodel.sfktckyw"  readonly="true" :triggerChange="true" dictCode="sfbz"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否开通贷款业务">
                  <j-dict-select-tag v-model="this.ywhxgywxxmodel.sfktdkyw"  readonly="true" :triggerChange="true" dictCode="sfbz"/>
                </a-form-item></a-col>
                <!--<a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否不良贷款户">
                  <j-dict-select-tag  v-decorator="['sfbldkh', {} ]" disabled :triggerChange="true" dictCode="sfbz"/>
                </a-form-item></a-col>-->
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="贷款余额">
                  <a-input placeholder="请输入贷款余额" v-model="this.ywhxgywxxmodel.dkye"  readonly="true"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="不良贷款余额">
                  <a-input placeholder="请输入不良贷款余额" v-model="this.ywhxgywxxmodel.bldkye"  readonly="true" />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="表外不良贷款余额">
                  <a-input placeholder="请输入表外不良贷款余额"  readonly="true" v-model="this.ywhxgywxxmodel.bwbldkye" />
                </a-form-item></a-col>

                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否开通手机银行业务">
                  <j-dict-select-tag v-model="this.ywhxgywxxmodel.sfktsjyhyw" :triggerChange="true" dictCode="sfbz"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否开通网上银行业务">
                  <j-dict-select-tag v-model="this.ywhxgywxxmodel.sfktwsyhyw" :triggerChange="true" dictCode="sfbz"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否办理etc业务">
                  <j-dict-select-tag v-model="this.ywhxgywxxmodel.sfbletcyw" :triggerChange="true" dictCode="sfbz"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否开通社保卡">
                  <j-dict-select-tag v-model="this.ywhxgywxxmodel.sfktsbk" :triggerChange="true" dictCode="sfbz"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否开通POS机">
                  <j-dict-select-tag v-model="this.ywhxgywxxmodel.sfktpos" :triggerChange="true" dictCode="sfbz"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否开通聚合支付">
                  <j-dict-select-tag v-model="this.ywhxgywxxmodel.sfktjhzf" :triggerChange="true" dictCode="sfbz"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否办理E支付">
                  <j-dict-select-tag v-model="this.ywhxgywxxmodel.sfblezf" :triggerChange="true" dictCode="sfbz"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否办理E缴费">
                  <j-dict-select-tag v-model="this.ywhxgywxxmodel.sfblejf" :triggerChange="true" dictCode="sfbz"/>
                </a-form-item></a-col>

                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否办理助农终端">
                  <j-dict-select-tag v-model="this.ywhxgywxxmodel.sfblznzd" :triggerChange="true" dictCode="sfbz"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否办理理财业务">
                  <j-dict-select-tag v-model="this.ywhxgywxxmodel.sfbllcyw" :triggerChange="true" dictCode="sfbz"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否办理代理保险业务">
                  <j-dict-select-tag v-model="this.ywhxgywxxmodel.sfbldlbx" :triggerChange="true" dictCode="sfbz"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否关注我行公众号">
                  <j-dict-select-tag v-model="this.ywhxgywxxmodel.sfgzgzh" :triggerChange="true" dictCode="sfbz"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否开通信用卡">
                  <j-dict-select-tag v-model="this.ywhxgywxxmodel.sfktxyk" :triggerChange="true" dictCode="sfbz"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否开通福民卡">
                  <j-dict-select-tag v-model="this.ywhxgywxxmodel.sfktfmk" :triggerChange="true" dictCode="sfbz"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否开扫码付">
                  <j-dict-select-tag v-model="this.ywhxgywxxmodel.sfktsmf" :triggerChange="true" dictCode="sfbz"/>
                </a-form-item></a-col>
              </a-row>
            </a-card>
          </a-tab-pane>

          <!--Tab 4：房产情况\Begin-->
          <a-tab-pane key="4">
            <span slot="tab"><a-icon type="book"/>房产情况</span>
            <a-card class="card" :bordered="false">
              <a-table bordered
                       size="middle"
                       :dataSource="this.dataSource"
                       :columns="Cams_Zcsx_NhfxxxTable.columns"
                       rowKey="id"
                       :loading="loading"
                       :pagination="ipagination"
                       />
            </a-card>
          </a-tab-pane>

          <!--Tab 5：资产情况\Begin-->
          <a-tab-pane key="5">
            <span slot="tab"><a-icon type="book"/>资产负债情况</span>
            <a-divider orientation="left" style="color: #1890FF;">资产情况</a-divider>
            <a-card class="card" :bordered="false">
              <a-table size="middle"
                       :pagination="false"
                       :dataSource="this.dataSource1"
                       :columns="Cams_Zcsx_NhzcqkTable.columns"/>
            </a-card>
            <a-divider orientation="left" style="color: #1890FF;">负债情况</a-divider>
            <a-card class="card" :bordered="false">
              <a-table size="middle"
                       :pagination="false"
                       :dataSource="this.dataSource2"
                       :columns="Cams_Zcsx_NhfzqkTable.columns"/>
            </a-card>
            <a-divider orientation="left" style="color: #1890FF;">经营情况</a-divider>
            <a-card class="card" :bordered="false">
              <a-table size="middle"
                       :pagination="false"
                       :dataSource="this.dataSource3"
                       :columns="Cams_Zcsx_NhjyqkTable.columns"/>
            </a-card>
          </a-tab-pane>

          <!--Tab 8：附件管理-->
         <!-- <a-tab-pane key="8">
            <span slot="tab"><a-icon type="book"/>附件管理</span>
            <a-card><form>
              <a-table :columns="columns_fjgl"
                       :dataSource="dataSource_fjgl"
                       :pagination="false">
                <span slot="action" slot-scope="text, record">
                  <photo-view ref="photoView" @ok="modalFormOk"/>
                  <a-divider type="vertical"/>
                  <a class="orcodebtn" @click="downhander(record)">下载</a>
                  <a-divider type="vertical" />
                </span>
              </a-table>
            </form></a-card>
          </a-tab-pane>-->

          <a-tab-pane key="8">
            <span slot="tab"><a-icon type="book"/>附件管理</span>
            <a-card><form>
              <a-divider style="color: #1890FF; margin-top: 0px;">个人附件</a-divider>
              <table align="center" border="1"  width="100%" >
                <tr style="height: 80px" align="center">
                  <td style="width: 150px">资料编号</td>
                  <td style="width: 100px">资料名称</td>
                  <td style="width: 100px">附件备注</td>
                  <td style="width: 80px">上传人</td>
                  <td style="width: 100px">上传时间</td>
                  <td style="width: 150px">操作</td>
                </tr>

                <tr v-for='(list,index) in dataSource_fjgl' v-bind:key='list.zlbh' align="center" >
                  <td>
                    <a-input  style="border: black; text-align: center" v-model="list.zlbh"/>
                  </td>
                  <td>
                    <a-input  style="border: black; text-align: center" v-model="list.zlmc"/>
                  </td>
                  <td>
                    <a-input  style="border: black; text-align: center" v-model="list.fjbz"/>
                  </td>
                  <td>
                    <a-input  style="border: black; text-align: center" v-model="list.scr"/>
                  </td>
                  <td>
                    <a-input  style="border: black; text-align: center" v-model="list.scsj"/>
                  </td>
                  <td>
                    <photo-view :id="list.zlbh" :studentImg="initFileList(list.fwlj)" ref="photoView" @ok="modalFormOk"/>
                    <!--<a-divider type="vertical"/>
                    <a class="orcodebtn" @click="downhander(list)">下载</a>
                    <a-divider type="vertical" />-->
                  </td>
                </tr>
              </table>
              <br>
              <br>

              <a-divider style="color: #1890FF; margin-top: 0px;">户主附件</a-divider>

              <table align="center" border="1"  width="100%" >
                <tr style="height: 80px" align="center">
                  <td style="width: 150px">资料编号</td>
                  <td style="width: 100px">资料名称</td>
                  <td style="width: 100px">附件备注</td>
                  <td style="width: 80px">上传人</td>
                  <td style="width: 100px">上传时间</td>
                  <td style="width: 150px">操作</td>
                </tr>

                <tr v-for='(list,index) in dataSource_nhfjgl' v-bind:key='list.zlbh' align="center" >
                  <td>
                    <a-input  style="border: black; text-align: center" v-model="list.zlbh"/>
                  </td>
                  <td>
                    <a-input  style="border: black; text-align: center" v-model="list.zlmc"/>
                  </td>
                  <td>
                    <a-input  style="border: black; text-align: center" v-model="list.fjbz"/>
                  </td>
                  <td>
                    <a-input  style="border: black; text-align: center" v-model="list.scr"/>
                  </td>
                  <td>
                    <a-input  style="border: black; text-align: center" v-model="list.scsj"/>
                  </td>
                  <td>
                    <photo-view :id="list.zlbh" :studentImg="initFileList(list.fwlj)" ref="photoView" @ok="modalFormOk"/>
                    <a-divider type="vertical"/>
                    <a class="orcodebtn" @click="downhander2(list)">下载</a>
                    <a-divider type="vertical" />
                  </td>
                </tr>
              </table>
            </form></a-card>
          </a-tab-pane>


          <!--Tab 9：评定管理-->
          <a-tab-pane key="9">
            <span slot="tab"><a-icon type="book"/>评定管理</span>
            <a-card><form>
              <a-table :columns="columns_pdgl"
                       :dataSource="dataSource_pdgl"
                       :pagination="false"/>
            </form></a-card>
          </a-tab-pane>

          <!--Tab 10：总评打分\Begin-->
          <a-tab-pane key="10">
            <span slot="tab"><a-icon type="book"/>总评打分</span>
            <a-card class="card" :bordered="true">

              <a-row class="form-row" :gutter="8">
                <a-col :lg="16"><a-form-item :labelCol="{xs: {span: 24},sm: {span: 4}}" :wrapperCol="{xs: {span: 24},sm: {span: 20}}" label="社会评价">
                  <j-dict-select-tag placeholder="请选择社会评价" v-model="model.nhshpj" :triggerChange="true" dict-code="khgl_shpj" disabled/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="劳动力人数">
                  <j-dict-select-tag placeholder="请选择劳动力人数" v-model="model.ndlrs" :triggerChange="true" dict-code="khgl_ldlrs" disabled/>
                </a-form-item></a-col>
              </a-row>

              <a-row class="form-row" :gutter="8">
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="家庭净资产">
                  <a-input placeholder="家庭净资产" v-model="model.nhjzc" disabled/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="家庭年收入">
                  <a-input placeholder="家庭年收入" v-model="model.nhcsr" disabled/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="资产负债率">
                  <a-input-number placeholder="资产负债率" v-model="model.zcfzl" disabled style="width: 100%;"/>
                </a-form-item></a-col>
              </a-row>

              <a-row class="form-row" :gutter="8">
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="存款贡献">
                  <a-input-number placeholder="存款贡献" v-model="model.ckgx" disabled style="width: 100%;"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="手机银行">
                  <a-input-number placeholder="手机银行" v-model="model.sjyh" disabled style="width: 100%;"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="总评得分小计">
                  <a-input-number placeholder="总评得分小计" v-model="model.zpdfxj" disabled style="width: 100%;"/>
                </a-form-item></a-col>
              </a-row>

            </a-card>
          </a-tab-pane>

          <!--Tab 11：等级评定\Begin-->
          <a-tab-pane key="11">
            <span slot="tab"><a-icon type="book"/>等级评定</span>
            <a-card class="card" :bordered="false">
              <a-row class="form-row" :gutter="16">
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="系统测算授信额度(元)">
                  <a-input placeholder="自动运算项" v-model="model.xtcssxed"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="系统测算评定等级">
                  <a-input placeholder="自动运算项" v-model="model.xtcspddj"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="外部授信额度(元)">
                  <a-input placeholder="外部授信额度" v-model="model.czlwsxed"/>
                </a-form-item></a-col>
              </a-row>

              <a-row class="form-row" :gutter="16">
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户经理授信额度(元)">
                    <a-input placeholder="客户经理授信额度" v-model="model.khjlsxed"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="最终授信额度(元)">
                  <a-input placeholder="最终授信额度" v-model="model.nhzzsxed"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="备注">
                  <a-input placeholder="备注" v-model="model.bz"/>
                </a-form-item></a-col>
              </a-row>
            </a-card>
          </a-tab-pane>


        </a-tabs>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import pick from 'lodash.pick'
  import moment from "moment"
  import { httpAction,putAction,getAction } from '@/api/manage'
  import AFormItem from 'ant-design-vue/es/form/FormItem'
  import JUploadOne from '@/components/jeecg/JUploadOne'
  import  photoView from './photoView.vue'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JMultiSelectTag from '../../../../components/dict/JMultiSelectTag'
  import JSelectYgxx from '@/components/jeecgbiz/JSelectYgxx'
  import { getFileAccessHttpUrl } from '@/api/manage';



  export default {
    name: "NhjbxxModal",
    components: { AFormItem ,JUploadOne,photoView,JMultiSelectTag,JSelectYgxx},
    mixins:[JeecgListMixin],
    data () {
      return {
        title: "操作",
        visible: false,
        urlDownload:window._CONFIG['staticDomainURL'],
        model: {sskhjl:" "},
        zkhjlacct:'',
        imgsrc:'',
        nhcjxxb:{},
        labelCol: {
          xs: {span: 24},
          sm: {span: 8},
        },
        wrapperCol: {
          xs: {span: 24},
          sm: {span: 16},
        },
        ywhxgywxxmodel: {},
        dataSource_jtcy: {},
        dataSource_pdgl: {},
        dataSource_fjgl: {},
        dataSource_nhfjgl: {},
        bwbldkye:"",
        bldkye:"",
        dkye:"",sfbldkh:"",sfktdkyw:"",sfktckyw:"",cknrpye:"",ckrpye:"",ckye:"",
        zjhmFlag:false,
        disableSubmit: true,
        confirmLoading: false,
        animated:true,
        form: this.$form.createForm(this),
        validatorRules: {
          zjhm: {rules: [{required: true, messkhmc: '请输入证件号码!'}]},
          qydm: {rules: [{required: true, messkhmc: '请输入区域代码!'}]},
        },
        dataSource: [],
        dataSource1: [],
        dataSource2: [],
        dataSource3: [],
        // 房产情况
        Cams_Zcsx_NhfxxxTable : {
          columns: [
            {
              title: '房产位置',
              dataIndex: 'fcwz',
              key: 'fcwz',
              width: '20%',
              align: "center",
              scopedSlots: {customRender: 'fcwz'}
            },
            {
              title: '房产性质',
              dataIndex: 'fcxz',
              key: 'fcxz',
              width: '15%',
              align: "center",
              scopedSlots: {customRender: 'fcxz'}
            },
            {
              title: '房产面积(平米)',
              dataIndex: 'fcmj',
              key: 'fcmj',
              width: '15%',
              align: "center",
              scopedSlots: {customRender: 'fcmj'}
            },
            {
              title: '单价(元)',
              dataIndex: 'fcdj',
              key: 'fcdj',
              width: '15%',
              align: "center",
              scopedSlots: {customRender: 'fcdj'}
            },
            {
              title: '房产价值',
              dataIndex: 'fcjz',
              key: 'fcjz',
              width: '15%',
              align: "center",
              scopedSlots: {customRender: 'fcjz'}
            },
            {
              title: '备注',
              dataIndex: 'bz',
              key: 'bz',
              width: '15%',
              align: "center",
              scopedSlots: {customRender: 'bz'}
            },
            // {
            //   title: '户号编码',
            //   dataIndex: 'hhbm',
            //   key: 'hhbm',
            //   width: '10%',
            //   align: "center",
            //   scopedSlots: {customRender: 'hhbm'}
            // },
            // {
            //   title: '客户名称',
            //   dataIndex: 'khmc',
            //   key: 'khmc',
            //   width: '10%',
            //   align: "center",
            //   scopedSlots: {customRender: 'khmc'}
            // },
            // {
            //   title: '证件号码',
            //   dataIndex: 'zjhm',
            //   key: 'zjhm',
            //   width: '20%',
            //   align: "center",
            //   scopedSlots: {customRender: 'zjhm'}
            // },
          ],
        },
        // 资产情况
        Cams_Zcsx_NhzcqkTable : {
          columns: [
            {
              title: '资产类型',
              dataIndex: 'zclx',
              key: 'zclx',
              width: '25%',
              align: "center",
              scopedSlots: {customRender: 'zclx'}
            },
            {
              title: '资产数量',
              dataIndex: 'zcsl',
              key: 'zcsl',
              width: '25%',
              align: "center",
              scopedSlots: {customRender: 'zcsl'}
            },
            {
              title: '资产价格(元)',
              dataIndex: 'zcjg',
              key: 'zcjg',
              width: '25%',
              align: "center",
              scopedSlots: {customRender: 'zcjg'}
            },
            {
              title: '资产说明',
              dataIndex: 'zcsm',
              key: 'zcsm',
              width: '25%',
              align: "center",
              scopedSlots: {customRender: 'zcsm'}
            },
          ],
        },
        // 负债情况
        Cams_Zcsx_NhfzqkTable : {
          columns: [
            {
              title: '借款方式',
              dataIndex: 'jkfs',
              key: 'jkfs',
              width: '25%',
              align: "center",
              scopedSlots: {customRender: 'jkfs'}
            },
            {
              title: '债权人',
              dataIndex: 'zqr',
              key: 'zqr',
              width: '25%',
              align: "center",
              scopedSlots: {customRender: 'zqr'}
            },
            {
              title: '借款金额(元)',
              dataIndex: 'jkje',
              key: 'jkje',
              width: '25%',
              align: "center",
              scopedSlots: {customRender: 'jkje'}
            },
            {
              title: '借款说明',
              dataIndex: 'jksm',
              key: 'jksm',
              width: '25%',
              align: "center",
              scopedSlots: {customRender: 'jksm'}
            },
          ],
        },
        // 经营情况
        Cams_Zcsx_NhjyqkTable : {
          columns: [
            {
              title: '项目类型',
              dataIndex: 'xmlx',
              key: 'xmlx',
              width: '25%',
              align: "center",
              scopedSlots: {customRender: 'xmlx'}
            },
            {
              title: '项目情况',
              dataIndex: 'xmqk',
              key: 'xmqk',
              width: '40%',
              align: "center",
              scopedSlots: {customRender: 'xmqk'}
            },
            {
              title: '项目净收入(元)',
              dataIndex: 'xmjsr',
              key: 'xmjsr',
              width: '35%',
              align: "center",
              scopedSlots: {customRender: 'xmjsr'}
            },
          ],
        },
        //家庭情况
        columns_jtqk: [
          {
            title: '户号编码',
            align:"center",
            dataIndex: 'hhbm',
          },
          {
            title: '客户姓名',
            align:"center",
            dataIndex: 'khmc',

          },
          {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm',

          },
          {
            title: '与户主关系',
            align:"center",
            dataIndex: 'yhzgx',
          },
          {
            title: '性别',
            align:"center",
            dataIndex: 'xb',
          },
          {
            title: '联系电话',
            dataIndex: 'sjhm',
            align:"center",
          }, {
            title: '存款余额',
            dataIndex: 'ckye',
            align:"center",
          },
          {
            title: '存款日均',
            dataIndex: 'ckrpye',
            align:"center",
          }, {
            title: '贷款余额',
            dataIndex: 'dkye',
            align:"center",
          }, {
            title: '表内不良余额',
            dataIndex: 'bldkye',
            align:"center",
          }, {
            title: '表外不良余额',
            dataIndex: 'bwbldkye',
            align:"center",
          },
          /*{
            title: '操作',
            key: 'action',
            scopedSlots: { customRender: 'operation' }
          }*/
        ],
        //评定管理
        columns_pdgl:[
          {
            title: '评定方式',
            dataIndex: 'pdfs',
            key: 'pdfs',
            scopedSlots: { customRender: 'pdfs' }
          },
          {
            title: '评定结果',
            dataIndex: 'pdjg',
            key: 'pdjg',
            scopedSlots: { customRender: 'pdgl' }
          }, {
            title: '评定说明',
            dataIndex: 'pdsm',
            key: 'pdsm',
            scopedSlots: { customRender: 'pdsm' }
          },
        ],
        //附件管理
        columns_fjgl:[
          {
            title: '资料编号',
            dataIndex: 'zlbh',
            key: 'zlbh',
            scopedSlots: { customRender: 'zlbh' }
          },
          {
            title: '资料名称',
            dataIndex: 'zlmc',
            key: 'zlmc',
            scopedSlots: { customRender: 'zlmc' }
          },
          {
            title: '附件备注',
            dataIndex: 'fjbz',
            key: 'fjbz',
            scopedSlots: { customRender: 'fjbz' }
          },
          {
            title: '上传人',
            dataIndex: 'scr',
            key: 'scr',
            scopedSlots: { customRender: 'scr' }
          },
          {
            title: '上传时间',
            dataIndex: 'scsj',
            key: 'scsj',
            scopedSlots: { customRender: 'scsj' }
          },
          {
            title: '图片(点击放大)',
            dataIndex: 'action',
            key: 'action',
            scopedSlots: { customRender: 'action' }
          },
        ],
        url: {
          add: "/nh/nhjbxx/add",
          edit: "/nh/nhjbxx/edit",
          list: "/nh/nhjbxx/list",
          NhfcqkList: '/nh/nhjbxx/queryCams_Zcsx_NhfxxxByMainId',
          Cams_Zcsx_Nhzcxx: {
            list: '/nh/nhjbxx/queryCams_Zcsx_NhzcxxByMainId',
            fzqklist: '/nh/nhjbxx/queryCams_Zcsx_NhfzqkByMainId',
            jyqklist: '/nh/nhjbxx/queryCams_Zcsx_NhjyqkByMainId',
            pjxxlist: '/nh/nhjbxx/queryCams_Zcsx_NhpjxxByMainId'

          },
        },
      }
    },
    created () {
    },
    mounted() {

    },
    methods: {
      downhander(record){
        this.downloadImg(this.orcode,record.zlmc,record.zlbh);
      },
      downhander2(record){
        this.downloadImg2(this.orcode,record.zlmc,record.zlbh);
      },
      downloadImg(imgsrc, name,zlbh){
        let image = new Image();
// 解决跨域 Canvas 污染问题
        image.setAttribute("crossOrigin", "anonymous");
        image.onload = function() {
          let canvas = document.createElement("canvas");
          canvas.width = image.width;
          canvas.height = image.height;
          let context = canvas.getContext("2d");
          context.drawImage(image, 0, 0, image.width, image.height);
          let url = canvas.toDataURL("image/png"); //得到图片的base64编码数据

          let a = document.createElement("a"); // 生成一个a元素
          let event = new MouseEvent("click"); // 创建一个单击事件
          a.download = name || "photo"; // 设置图片名称
          a.href = url; // 将生成的URL设置为a.href属性
          a.dispatchEvent(event); // 触发a的单击事件
        };
          getAction("/nh/nhjbxx/dpic", { zlbh: zlbh}).then((res) => {
            let j=eval(res);
            console.log("下载路径")
            console.log(j)
            /* this.$refs.photoView.showModal(j.zllj),
             this.$refs.photoView.studentImg=j.zllj*/
            image.src = j.zllj;
          });
      },
      downloadImg2(imgsrc, name,zlbh){
        let image = new Image();
        // 解决跨域 Canvas 污染问题
        image.setAttribute("crossOrigin", "anonymous");
        image.onload = function() {
          let canvas = document.createElement("canvas");
          canvas.width = image.width;
          canvas.height = image.height;
          let context = canvas.getContext("2d");
          context.drawImage(image, 0, 0, image.width, image.height);
          let url = canvas.toDataURL("image/png"); //得到图片的base64编码数据

          let a = document.createElement("a"); // 生成一个a元素
          let event = new MouseEvent("click"); // 创建一个单击事件
          a.download = name || "photo"; // 设置图片名称
          a.href = url; // 将生成的URL设置为a.href属性
          a.dispatchEvent(event); // 触发a的单击事件
        };
        getAction("/nh/nhjbxx/downLoad", { zlbh: zlbh}).then((res) => {
          let j=eval(res);
          console.log("下载路径")
          console.log(j)
          /* this.$refs.photoView.showModal(j.zllj),
           this.$refs.photoView.studentImg=j.zllj*/
          image.src = j.zllj;
        });
      },
      initFileList(paths){
        if(!paths || paths.length==0){
          return '';
        }
        let file = '';
        file = getFileAccessHttpUrl(paths,this.urlDownload,"http");
        console.log("附件路径")
        console.log(file)
       return  file
      },
      add () {
        this.edit({});
      },
      edit (record,qfbs) {
        if(record.zjhm){
          this.zjhmFlag=false;
          getAction(this.url.Cams_Zcsx_Nhzcxx.pjxxlist, { zjhm: record.zjhm }).then((res) => {
            this.model = Object.assign({}, res.result);
          });
          // 加载与我行相关业务信息子表数据
          if (this.model.zjhm) {
            let params = { "zjhm": record.zjhm,"hmcId":record.id}
            console.log("zjhm"+params)
            getAction("/nh/nhjbxx/queryYwhxgywxx", params,this.form).then(res => {
              this.ywhxgywxxmodel = Object.assign({}, res.result);
              console.log("---与我行相关业务信息-----")
              console.log(this.ywhxgywxxmodel)
              // this.$nextTick(() => {
              //   let fields = pick(this.ywhxgywxxmodel, 'sfdfgz','sfktpos','sfktjhzf','sfblezf','sfblejf','sfblznzd','sfbllcyw','sfbldlbx','sfgzgzh','sfktxyk','sfktfmk','sfktsmf','khmc','hmcId','zjhm','sfktckyw','ckye','ckrpye','cknrpye','hqckye','dqckye','hqckrpye','dqckrpye','hqcknrpye','dqcknrpye','sfktdkyw','dkje','dkye','bldkye','bwbldkye','sfktsjyhyw','sfktwsyhyw','sfbletcyw','sfktsbk')
              //   this.form.setFieldsValue(fields)
              // })
              let fields = pick(this.ywhxgywxxmodel, 'sfdfgz','sfktpos','sfktjhzf','sfblezf','sfblejf','sfblznzd','sfbllcyw','sfbldlbx','sfgzgzh','sfktxyk','sfktfmk','sfktsmf','khmc','hmcId','zjhm','sfktckyw','ckye','ckrpye','cknrpye','hqckye','dqckye','hqckrpye','dqckrpye','hqcknrpye','dqcknrpye','sfktdkyw','dkje','dkye','bldkye','bwbldkye','sfktsjyhyw','sfktwsyhyw','sfbletcyw','sfktsbk')
              this.form.setFieldsValue(fields)
            });
          }

          //加载家庭相关情况字表数据
          if(record.zjhm) {
            getAction("/nh/nhjbxx/queryJtcy", { hhbm: record.hhbm, sszh:record.sszh}).then((res) => {
              if (res.success) {
                this.dataSource_jtcy = res.result;
                console.log("---家庭相关情况-----")
                console.log('dataSource_jtcy', res)
              }
            });
          }

         /* putAction("/nh/nhjbxx/queryJtcy", { hhbm: record.hhbm, sszh:record.sszh}).then((res) => {
            this.dataSource_jtcy =res;
            console.log('dataSource_jtcy',res)
          });*/
          getAction("/nh/nhjbxx/queryPdsm", {zjhm: record.zjhm,hhbm: record.hhbm, sszh:record.sszh}).then((res) => {
            this.dataSource_pdgl =res;
          });
          getAction("/nh/nhjbxx/queryFj", { zjhm:record.zjhm}).then((res) => {
            this.dataSource_fjgl =res;
            /*this.$nextTick(() => {
             this.imgsrc =  this.dataSource_fjgl[0].fwlj;
              this.$refs.photoView.showModal(this.dataSource_fjgl[0].fwlj)
            })*/
          });

        }

        //加载农户附件信息
        if (record.hhbm) {
          getAction("/nh/nhjbxx/queryNhFj", { hhbm:record.hhbm}).then((res) => {
            console.ingo('农户附件信息数据返回值 -',res)
            this.dataSource_nhfjgl = res;

          });
        }

        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        //qfbs 1:农户页面跳转进入，2：统一查询页面进入
        if (qfbs==2){
          let params = { "zjhm": record.zjhm}
          getAction("/nh/nhjbxx/queryNhjbxx", params,this.form).then(res => {
            this.model = Object.assign({}, res.result);
            console.log("---农户基本信息-----")
            console.log(this.model)
            let fields = pick(this.model, 'xtpdsm','xgr','sfxdry','sfpkh','sfdb','sfktxyk','sfktfmk','sfgzry','sfffjz','hbjl','infoRate','sfktsmf','sflqsbk','sfktsbk','yssxz','yxzc','xtpdjg','jgdm','sszh','ssyxdy','hhbm','yhzgx','sfhz','khmc','zjhm','khlx','lxfs','dz','xb','nl','mz','hyzk','bz','lrbz','lrr')
            this.form.setFieldsValue(fields)
          });
        }else{
          this.$nextTick(() => {
            this.form.setFieldsValue(pick(this.model,'xtpdsm','xgr','sfxdry','sfpkh','sfdb','sfktxyk','sfktfmk','sfgzry','sfffjz','hbjl','infoRate','sfktsmf','sflqsbk','sfktsbk','yssxz','yxzc','xtpdjg','jgdm','sszh','ssyxdy','hhbm','yhzgx','sfhz','khmc','zjhm','khlx','lxfs','dz','xb','nl','mz','hyzk','bz','lrbz','lrr'))
            // 时间格式化
          })
        }


        // 农户采集信息
        if (this.model.zjhm) {
          let params = { "zjhm": record.zjhm}
          getAction("/nh/nhjbxx/nhcjxx", params).then(res => {
            console.log(res.result)
            this.nhcjxxb = Object.assign({}, res.result.nhcjxxList);
            this.zkhjlacct=res.result.zkhjl_dictText;

            console.log("---农户采集信息-----")
            console.log(this.nhcjxxb)
            this.$nextTick(() => {
              let fieldscjxx = pick(this.nhcjxxb, 'pyxxFlag','khxxFlag','khglFlag','signFlag','sskhjl','gzdw','gzdwdz','khmc','zjhm','whcd','sjhm','hkxz','zz','zz1','zz2','sfbldkh','sfpkh','sfdbh','xtpdjg','xtpdsm','gjrpdjg','gjrpdsm','zzpdjg','zzpdsm','cshygz','sfycdg','kfyyqk','kcqzyw','khsxqk','longitude','latitude','sign1','sign2','bz','byhm','pfr','khlx1','khlx2','zdyzbm','ywzn','jkzk','ldnl','jznx','zgxl','zgxw','ddpzzhpj','jzzt','upDt','upTm','ddpzzhpj1','ddpzzhpj2','khblsh','qzywyysj','hjdz','sfsx')
              this.form.setFieldsValue(fieldscjxx)
            })
          });
        }
        // 农户房产情况
        if (record.hhbm) {
          let params = {hhbm: record.hhbm}
          getAction(this.url.NhfcqkList, params).then((res) => {
            console.info('农户房产情况数据返回值 -',res);
            if (res.success) this.dataSource = res.result;
          })
        }
        // 加载子表数据
        if(record.zjhm) {
          let params = {zjhm: record.zjhm}
          getAction(this.url.Cams_Zcsx_Nhzcxx.list, params).then((res) => {
            console.info(res)
            if(res.success) {
              this.dataSource1 = res.result;
            }
            console.log('dataSource1',res)

          })
        }
        // 加载子表数据
        if(record.zjhm) {
          let params = {zjhm: record.zjhm}
          getAction(this.url.Cams_Zcsx_Nhzcxx.fzqklist, params).then((res) => {
            console.info(res)
            if(res.success) {
              this.dataSource2 = res.result;
            }
          })
        }
        // 加载子表数据
        if(record.zjhm) {
          let params = {zjhm: record.zjhm}
          getAction(this.url.Cams_Zcsx_Nhzcxx.jyqklist, params).then((res) => {
            console.info(res)
            if(res.success) {
              this.dataSource3 = res.result;
            }
          })
        }
      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if(!this.model.id){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            formData.lrsj = formData.lrsj?formData.lrsj.format():null;
            formData.zjqfrq = formData.zjqfrq?formData.zjqfrq.format():null;
            formData.zjdqrq = formData.zjdqrq?formData.zjdqrq.format():null;
            formData.fxsj = formData.fxsj?formData.fxsj.format():null;

            console.log(formData)
            httpAction(httpurl,formData,method).then((res)=>{
              if(res.success){
                that.$messkhmc.success(res.messkhmc);
                that.$emit('ok');
              }else{
                that.$messkhmc.warning(res.messkhmc);
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
      GetValueZkhjl(value){
        this.model.sskhjl=value.yggh;
        this.zkhjlacct=value.ygxm;
      },
    }
  }
</script>

<style lang="less" scoped>
  .ant-form .ant-form-item {
    margin-bottom: 5px;
  }
</style>