<template>
  <a-modal :title="title"
           :width="1200"
           :visible="visible"
           :confirmLoading="confirmLoading"
           :keyboard="false"
           :maskClosable="false"
           :okButtonProps="{ props: {disabled: disableSubmit} }"
           @ok="handleOk"
           @cancel="handleCancel"
           okText="保存"
           cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-divider orientation="left" style="color: #1890FF;">定价申请基本信息（单位：万元）</a-divider>
        <a-card class="card" :bordered="true">
          <!--隐藏域-->
          <a-input v-decorator="['zjhm', {}]" hidden/>
          <j-tree-select v-decorator="['zzbz', {}]" hidden/>
          <!--隐藏域-->
          <a-row>
            <a-col :span="12"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="定价年份">
              <a-input placeholder="定价年份" v-decorator="['djnf', {}]" disabled/>
            </a-form-item></a-col>
            <a-col :span="12"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="申请客户名称">
              <a-input placeholder="申请客户名称" :disabled="true" v-decorator="['khmc', {}]"/>
            </a-form-item></a-col>

            <a-col :span="12"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户类型">
              <j-dict-select-tag placeholder="请选择" v-decorator="['khlx', {}]" :triggerChange="true" dictCode="lldj_khlx" disabled/>
            </a-form-item></a-col>
            <a-col :span="12"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="法人代表">
              <a-input placeholder="法人代表" v-decorator="['frdb', {}]" disabled/>
            </a-form-item></a-col>

            <a-col :span="12"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="上年授信额度">
              <a-input placeholder="上年授信额度" v-decorator="['snsxed', {}]" addon-after="万元" style="width: 100%" disabled/>
            </a-form-item></a-col>
            <a-col :span="12"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="上年按基点(加/减)BP">
              <a-input placeholder="上年按基点(加/减)BP" v-decorator="['sndkjdbp', {}]" style="width: 100%" disabled/>
            </a-form-item></a-col>

            <a-col :span="12"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="综合授信额度">
              <a-input-number placeholder="综合授信额度" v-decorator="['zhsxed', {}]" :min="0" style="width: 100%"
                              :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                              :parser="value => value.replace(/\$\s?|(,*)/g, '')" disabled/>
            </a-form-item></a-col>
            <a-col :span="12"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="贷款授信+承兑敞口">
              <a-input-number placeholder="贷款授信+承兑敞口" v-decorator="['cdck', {}]" :min="0" style="width: 100%"
                              :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                              :parser="value => value.replace(/\$\s?|(,*)/g, '')" disabled/>
            </a-form-item></a-col>

            <a-col :span="12"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="贷款期限">
              <j-dict-select-tag placeholder="请选择" v-decorator="['dkqx', {}]" :triggerChange="true" dictCode="dkqx" disabled/>
            </a-form-item></a-col>
            <a-col :span="12"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否便民卡">
              <j-dict-select-tag placeholder="请选择" v-decorator="['sfbmk', {}]" :triggerChange="true" dictCode="sfbz" disabled/>
            </a-form-item></a-col>

            <a-col :span="12"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="信贷贷款品种">
              <j-dict-select-tag placeholder="请选择" v-decorator="['xddkpz', {}]" :triggerChange="true" dictCode="xddkpz_one" disabled/>
            </a-form-item></a-col>
          </a-row>
        </a-card>

        <a-divider orientation="left" style="color: #1890FF;">1.信用等级[得分:{{ this.model.DFKH00001 == null ? "0.00" : this.model.DFKH00001 }}]</a-divider>
        <a-card class="card" :bordered="false">
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="24" :offset="2">
              <a-form-item>
                <a-radio-group buttonStyle="solid" v-decorator="['KH00001',{}]" disabled>
                  <a-radio value="GZ00001">企业A</a-radio>
                  <a-radio value="GZ00002">企业AA</a-radio>
                  <a-radio value="GZ00003">企业AAA</a-radio>
                  <a-radio value="GZ00007">企业BBB</a-radio>
                  <a-radio value="GZ00004">个人1级</a-radio>
                  <a-radio value="GZ00005">个人2级</a-radio>
                  <a-radio value="GZ00006">个人3级</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>

        <a-divider orientation="left" style="color: #1890FF;">2.扣分项目[扣分:{{ this.model.DFKH00002 == null ? "0.00" : this.model.DFKH00002 }}]</a-divider>
        <a-card class="card" :bordered="false">
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item>贷款人在近五年有不良记录（含配偶）</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item>
                <a-input-number placeholder="请填写数字" v-decorator="['GZ00008', {}]" :min="0" :max="100" :step="1" style="width: 30%" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>

        <a-divider orientation="left" style="color: #1890FF;">3.资产负债率 - 数据来源于用户征信报告[得分:{{ this.model.DFKH00003 == null ? "0.00" : this.model.DFKH00003 }}]</a-divider>
        <a-card class="card" :bordered="false">
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >资产总额</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item >
                <a-input-number placeholder="请填写数字" v-decorator="['GZ00009', {}]" :min="0" style="width: 30%" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >负债总额</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item >
                <a-input-number placeholder="请填写数字" v-decorator="['GZ00010', {}]" :min="0" style="width: 30%" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >资产负债率（%）</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item>
                <a-input-number placeholder="资产负债率" v-decorator="['GZ00011', {initialValue:'0'}]"
                                :formatter="value => `${value}%`" :parser="value => value.replace('%','')" :step="0.01"
                                :min="0" :max="100" style="width: 30%" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>

        <a-divider orientation="left" style="color: #1890FF;">4.经营期限/贷款投向[得分:{{ this.model.DFKH00004 == null ? "0.00" : this.model.DFKH00004 }}]</a-divider>
        <a-card class="card" :bordered="false">
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >经营期限</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item>
                <j-dict-select-tag placeholder="请选择" v-decorator="['GZ00012', {initialValue:'1'}]" :triggerChange="true" dictCode="jyqx_ningyuan" style="width: 30%" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >贷款投向</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item>
                <j-dict-select-tag placeholder="请选择" v-decorator="['GZ00013', {initialValue:'1'}]" :triggerChange="true" dictCode="dktx_ningyuan" style="width: 85%" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>

        <a-divider orientation="left" style="color: #1890FF;">5.客户存款贡献度[得分:{{ this.model.DFKH00005 == null ? "0.00" : this.model.DFKH00005 }}]</a-divider>
        <a-card class="card" :bordered="false">
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >前三季度第一个季度存款日平</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item >
                <a-input-number placeholder="前三季度第一个季度存款日平" v-decorator="['GZ00016', {initialValue:'0'}]"
                                :formatter="value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')" :step="0.001"
                                :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                                :min="0" style="width: 30%" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >前三季度第二个季度存款日平</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item >
                <a-input-number placeholder="前三季度第二个季度存款日平" v-decorator="['GZ00017', {initialValue:'0'}]"
                                :formatter="value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')" :step="0.001"
                                :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                                :min="0" style="width: 30%" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >前三季度第三个季度存款日平</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item >
                <a-input-number placeholder="前三季度第三个季度存款日平" v-decorator="['GZ00018', {initialValue:'0'}]"
                                :formatter="value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')" :step="0.001"
                                :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                                :min="0" style="width: 30%" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >日平存款占贷款比例（%）</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item >
                <a-input-number placeholder="日平存款占贷款比例" v-decorator="['GZ00019', {initialValue:'0'}]"
                                :formatter="value => `${value}%`" :parser="value => value.replace('%', '')" :step="0.01"
                                :min="0" style="width: 30%" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>

        <a-divider orientation="left" style="color: #1890FF;">6.信贷业务往来及效益贡献度[得分:{{ this.model.DFKH00006 == null ? "0.00" : this.model.DFKH00006 }}]</a-divider>
        <a-card class="card" :bordered="false">
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >信贷业务往来时间</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item>
                <j-dict-select-tag placeholder="请选择" v-decorator="['GZ00020', {initialValue:'1'}]" :triggerChange="true" dictCode="xdywwlsj_ningyuan" style="width: 30%" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >上年执行利率</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item>
                <a-input-number placeholder="上年执行利率" v-decorator="['GZ00021', {initialValue:'0'}]"
                                :formatter="value => `${value}%`" :parser="value => value.replace('%', '')" :step="0.0001"
                                :min="0" style="width: 30%" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >本行资金成本率</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item>
                <a-input-number placeholder="本行资金成本率" v-decorator="['GZ00022', {initialValue:'0'}]"
                                :formatter="value => `${value}%`" :parser="value => value.replace('%', '')" :step="0.0001"
                                :min="0" style="width: 30%" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >上年贷款日平</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item>
                <a-input-number placeholder="上年贷款日平" v-decorator="['GZ00023', {initialValue:'0'}]"
                                :formatter="value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')" :step="0.001"
                                :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                                :min="0" style="width: 30%" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >客户效益贡献</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item>
                <a-input-number placeholder="客户效益贡献" v-decorator="['GZ00024', {initialValue:'0'}]"
                                :formatter="value => `￥ ${value}`"
                                :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                                :min="0" style="width: 30%" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >客户利息贡献</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item>
                <a-input-number placeholder="客户利息贡献" v-decorator="['GZ00025', {initialValue:'0'}]"
                                :formatter="value => `￥ ${value}`"
                                :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                                :min="0" style="width: 30%" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>

        <a-divider orientation="left" style="color: #1890FF;">7.其他业务扣分项[扣分:{{ this.model.DFKH00007 == null ? "0.00" : this.model.DFKH00007 }}]</a-divider>
        <a-card class="card" :bordered="false">
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >客户是否购买了意外伤害险</a-form-item></a-col>
            <a-col :span="11">
              <a-form-item >
                <j-dict-select-tag placeholder="请选择" v-decorator="['GZ00026', {initialValue:'1'}]" :triggerChange="true" dictCode="sfbz" style="width: 30%" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >借款人近两年在本行是否有未结清的不良贷款记录</a-form-item></a-col>
            <a-col :span="11">
              <a-form-item >
                <j-dict-select-tag placeholder="请选择" v-decorator="['GZ00027', {initialValue:'2'}]" :triggerChange="true" dictCode="sfbz" style="width: 30%" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>

        <a-divider orientation="left" style="color: #1890FF;">8.其他业务加分项[得分:{{ this.model.DFKH00008 == null ? "0.00" : this.model.DFKH00008 }}]</a-divider>
        <a-card class="card" :bordered="false">
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >客户在本行开通了商户POS机或聚合支付（扫码）业务</a-form-item></a-col>
            <a-col :span="11">
              <a-form-item >
                <j-dict-select-tag placeholder="请选择" v-decorator="['GZ00028', {initialValue:'2'}]" :triggerChange="true" dictCode="sfbz" style="width: 30%" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >客户办理了本行的手机或网上银行业务</a-form-item></a-col>
            <a-col :span="11">
              <a-form-item >
                <j-dict-select-tag placeholder="请选择" v-decorator="['GZ00029', {initialValue:'2'}]" :triggerChange="true" dictCode="sfbz" style="width: 30%" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >客户在本行代发工资</a-form-item></a-col>
            <a-col :span="11">
              <a-form-item >
                <j-dict-select-tag placeholder="请选择" v-decorator="['GZ00030', {initialValue:'2'}]" :triggerChange="true" dictCode="sfbz" style="width: 30%" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >客户办理了本行的ETC银行业务</a-form-item></a-col>
            <a-col :span="11">
              <a-form-item >
                <j-dict-select-tag placeholder="请选择" v-decorator="['GZ00031', {initialValue:'2'}]" :triggerChange="true" dictCode="sfbz" style="width: 30%" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >客户办理了本行信用卡且为活卡</a-form-item></a-col>
            <a-col :span="11">
              <a-form-item >
                <j-dict-select-tag placeholder="请选择" v-decorator="['GZ00032', {initialValue:'2'}]" :triggerChange="true" dictCode="sfbz" style="width: 30%" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>

        <a-divider orientation="left" style="color: #1890FF;">9.LPR利率</a-divider>
        <a-card class="card" :bordered="false">
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >贷款市场利率（LPR）报价日期</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item>
                <a-input placeholder="贷款市场利率报价日期" v-decorator="['GZ00037', {}]" style="width: 30%" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >1年期LPR利率</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item>
                <a-input-number placeholder="1年期LPR利率" v-decorator="['GZ00038', {initialValue:'0'}]"
                                :formatter="value => `${value}%`" :parser="value => value.replace('%', '')" :step="0.0001"
                                :min="0" style="width: 30%" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >5年期以上LPR利率</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item>
                <a-input-number placeholder="5年期以上LPR利率" v-decorator="['GZ00039', {initialValue:'0'}]"
                                :formatter="value => `${value}%`" :parser="value => value.replace('%', '')" :step="0.0001"
                                :min="0" style="width: 30%" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>

        <a-divider orientation="left" style="color: #1890FF;">10.担保方式及担保物品分类[得分:{{ this.model.dbdf }}]</a-divider>
        <a-card class="card" :bordered="false">
          <j-editable-table ref="khdbxx"
                            AddButtonName="添加担保信息"
                            :disabled="true"
                            :loading="dbxxTable.loading"
                            :columns="dbxxTable.columns"
                            :dataSource="dbxxTable.dataSource"
                            :maxHeight="500"
                            :rowNumber="true"
                            :rowSelection="true"
                            :actionButton="true">
          </j-editable-table>
          <!--<j-editable-table ref="khdbxx"
                            AddButtonName="添加担保信息"
                            :disabled="false"
                            :loading="dbxxTable.loading"
                            :columns="dbxxTable.columns"
                            :dataSource="dbxxTable.dataSource"
                            :maxHeight="500"
                            :rowNumber="true"
                            :rowSelection="true"
                            :actionButton="true"
                            @valueChange="valueChange">

            <template v-slot:dbwSlot="props">
              <a-select placeholder="请选择" :default-value="props.text" @change="(value) => handleDbwChange(value, props.rowId)">
                <a-select-option v-for="(item, i) in dbwList" :key="i" :value="item.value">
                  {{ item.text }}
                </a-select-option>
              </a-select>
            </template>

            <template v-slot:dbwlxSlot="props">
              <a-select placeholder="请选择" :default-value="props.text" @change="(value) => handleDbwlxChange(value, props.rowId)">
                <a-select-option v-for="(item, i) in dbwlxList" :key="i" :value="item.value">
                  {{ item.text }}
                </a-select-option>
              </a-select>
            </template>

          </j-editable-table>-->
        </a-card>

        <a-card class="card" :bordered="true" style="margin-top: 20px">
          <a-row class="form-row" >
            <a-col :span="12">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="定价得分合计">
                <a-input v-decorator="['dfhj', {initialValue:'0'}]" style="width: auto" disabled/>
              </a-form-item>
            </a-col>
<!--            <a-col :span="12">-->
<!--              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="对应档次LPR利率">-->
<!--                <a-input v-decorator="['lprll']" style="width: auto" :formatter="value => `${value}%`" :parser="value => value.replace('%','')" disabled/>&nbsp;%-->
<!--              </a-form-item>-->
<!--            </a-col>-->

<!--            <a-col :span="12">-->
<!--              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="按LPR加/减基点">-->
<!--                <a-input v-decorator="['jdbp']" style="width: auto" disabled/>-->
<!--              </a-form-item>-->
<!--            </a-col>-->
            <a-col :span="12">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="执行利率">
                <a-input v-decorator="['zxll']" style="width: auto" :formatter="value => `${value}%`" :parser="value => value.replace('%','')" disabled/>&nbsp;%
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>

      </a-form>
    </a-spin>

  </a-modal>
</template>

<script>
import pick from "lodash.pick";
import {getAction, httpAction} from "@/api/manage";
import {notification} from "ant-design-vue";
import {FormTypes} from "@/utils/JEditableTableUtil";
import JEditableTable from "@/components/jeecg/JEditableTable";

export default {
  name: 'lldjjsNyModal',
  components: {JEditableTable},
  data () {
    return {
      title:"利率定价计算",
      visible: false,
      disableSubmit: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      opration: '',
      model: {},
      labelCol: {
        sm: {span: 11},
      },
      wrapperCol: {
        sm: {span: 12},
      },
      dbxxTable: {
        loading: false,
        dataSource: [],
        columns: [
          {
            title: '担保物品名称',
            key: 'dbw',
            type: FormTypes.select,
            defaultValue: '',
            placeholder: '${title}',
            dictCode: 'dbw_ningyuan',
            validateRules:[{
              required: true, // 必填
              message: '${title}不能为空' // 提示的文本
            }],
            width: '15%',
          },
          {
            title: '担保物品二级分类',
            key: 'dblx',
            type: FormTypes.select,
            defaultValue: '',
            placeholder: '${title}',
            dictCode: 'dblx_ningyuan',
            validateRules:[{
              required: true, // 必填
              message: '${title}不能为空' // 提示的文本
            }],
            width: '15%',
          },
          {
            title: '设定条件',
            key: 'dbwms',
            type: FormTypes.select,
            defaultValue: '',
            placeholder: '${title}',
            dictCode: 'dbwsdtj_ningyuan',
            ellipsis: true,
            validateRules:[{
              required: true, // 必填
              message: '${title}不能为空' // 提示的文本
            }],
            width: '30%',
          },
          {
            title: '所有权人',
            key: 'syqr',
            type: FormTypes.input,
            defaultValue: '',
            placeholder: '${title}',
            ellipsis: true,
            validateRules:[{
              required: true, // 必填
              message: '${title}不能为空' // 提示的文本
            }],
            width: '10%',
          },
          {
            title: '评估价值',
            key: 'pgjz',
            type: FormTypes.inputNumber,
            defaultValue: '',
            placeholder: '${title}',
            validateRules:[
              {
                required: true, // 必填
                message: '${title}不能为空' // 提示的文本
              },
              {
                pattern: /^([0-9]*|d*.d{1}?d*)$/, // 正则
                message: '${title}只能是带一位小数点的数字'
              }
            ],
            width: '10%',
          },
          {
            title: '实际担保金额',
            key: 'sjdbje',
            type: FormTypes.inputNumber,
            defaultValue: '',
            placeholder: '${title}',
            validateRules:[
              {
                required: true, // 必填
                message: '${title}不能为空', // 提示的文本
              },
              {
                pattern: /^([0-9]*|d*.d{1}?d*)$/, // 正则
                message: '${title}只能是带一位小数点的数字'
              },
            ],
            width: '10%',
          },
          {
            title: '担保率(%)',
            key: 'dbl',
            type: FormTypes.inputNumber,
            defaultValue: '0',
            placeholder: '请输入${title}',
            disabled: true,
            validateRules:[{
              required: true, // 必填
              message: '${title}不能为空' // 提示的文本
            }],
            width: '10%',
          },
        ]
      },
      url: {
        add: "/dklldj/lldjjsNy/addSave",
        edit: "/dklldj/lldjjsNy/editSave",
        sqmxlist: "/dklldj/lldjsqNy/sqmxlist",
        dbxxList: "/dklldj/lldjsqNy/dbxxList",
        compute:"/dklldj/lldjjsNy/compute",
      },
    }
  },
  created () {},
  methods: {
    add() {
      this.edit({})
    },
    edit(record) {
      var records = {
        'zzbz': record.zzbz,
        'zjhm': record.zjhm,
        'djnf': record.djnf,
        'khmc': record.khmc,
        'khlx': record.khlx,
        'frdb': record.frdb,
        'snsxed': record.snsxed == null ? 0 : record.snsxed,
        'snzxll': record.snzxll == null ? 0 : record.snzxll,
      }
      this.form.resetFields()
      this.model = Object.assign({}, record, records)
      this.model.djnf = records.djnf.length > 4 ? records.djnf.substr(0, 4) : records.djnf
      this.visible = true
      this.confirmLoading = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(
          this.model,
          'zzbz','zjhm',
          'djnf','khmc',
          'khlx','frdb',
          'snsxed','sndkjdbp',
          'zhsxed','cdck',
          'dkqx', 'sfbmk', 'xddkpz'
        ))
        let param = {
          'zjhm': this.model.zjhm,
          'djnf': this.model.djnf+"-01-01"
        }
        getAction(this.url.sqmxlist, param).then((res) => {
          if (res.success) {
            console.info('定价申请明细数据返回:',res.result)
            this.form.setFieldsValue(pick(res.result,
              'KH00001',
              'GZ00008','GZ00009','GZ00010','GZ00011','GZ00012','GZ00013',
              'GZ00016','GZ00017','GZ00018','GZ00019','GZ00020',
              'GZ00021','GZ00022','GZ00023','GZ00024','GZ00025',
              'GZ00026','GZ00027','GZ00028','GZ00029','GZ00030',
              'GZ00031','GZ00032','GZ00037','GZ00038','GZ00039'
            ))
            // 查询客户担保信息
            getAction(this.url.dbxxList, param).then((res) => {
              if (res.success) {
                this.dbxxTable.dataSource = res.result
              }
            }).catch((error) => {
              notification.error({ message: '系统提示', description: '担保信息查询失败!'+error,duration: 4})
            }).finally(() => {
              // 计算得分
              getAction(this.url.compute, param).then((res) => {
                if (res.success) {
                  console.log('定价得分计算返回',res.result)
                  this.model = Object.assign(this.model, res.result)
                  this.form.setFieldsValue(pick(
                    res.result,
                    'DFKH00001','DFKH00002','DFKH00003','DFKH00004','DFKH00005','DFKH00006','DFKH00007','DFKH00008','dbdf',
                    'dfhj','lprll','jdbp','zxll'
                  ))
                }
              }).catch((error) => {
                notification.error({ message: '系统提示', description: '定价得分计算失败!'+error,duration: 4})
              }).finally(() => {
                this.confirmLoading = false
              })
            })
          }
        }).catch((error) => {
          notification.error({ message: '系统提示', description: '查询定价申请明细失败!'+error,duration: 4})
        })
      })
    },
    handleOk() {
      const that = this;
      that.$confirm({
        title: '提示',
        content: '是否确认执行该操作?',
        onOk() {
          that.form.validateFields((err, values) => {
            if (!err) {
              let httpurl = that.url.add
              console.info('操作标识',that.opration)
              if (that.opration === 'edit') {
                httpurl = that.url.edit
              }
              let method = 'post'
              let formData = Object.assign(that.model, values)
              console.log('审批状态:', that.spzt)
              var spzt = Number(that.spzt).toFixed(0)
              if (spzt === 1) {
                formData.spzt = '1'
              } else {
                formData.spzt = '0'
              }
              let djnfstr = formData.djnf.toString()
              formData.djnf = djnfstr.length === 4 ? djnfstr + '-01-01' : djnfstr
              console.log('利率定价计算 保存formData', formData)
              that.confirmLoading = true
              httpAction(httpurl, formData, method).then((res) => {
                if (res.success) {
                  that.$message.success(res.message)
                  that.$emit('ok')
                  that.close()
                } else {
                  that.$message.warning(res.message)
                }
              }).finally(() => {
                that.confirmLoading = false
              })
            }
          })
        },
        onCancel() {
          console.log('用户取消操作！')
        },
      });
    },
    handleCancel() {
      this.close()
    },
    close() {
      this.model.zzbz = ""
      this.model.zjhm = ""
      this.model.djnf = ""
      this.$emit('close')
      this.visible = false
    },
  },
}
</script>

<style scoped>

</style>