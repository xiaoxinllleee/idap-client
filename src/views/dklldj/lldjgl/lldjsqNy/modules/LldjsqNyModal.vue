<template>
  <a-modal :title="title"
           :width="1200"
           :visible="visible"
           :confirmLoading="confirmLoading"
           :keyboard="false"
           :maskClosable="false"
           :okButtonProps="{ props: {disabled: disableSubmit} }"
           :destroyOnClose="true"
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
              <a-input placeholder="定价年份" v-decorator="['djnf', validatorRules.djnf]" disabled/>
            </a-form-item></a-col>
            <a-col :span="12"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="申请客户名称">
              <a-input placeholder="申请客户名称" :disabled="true" v-decorator="['khmc', validatorRules.khmc]"/>
            </a-form-item></a-col>

            <a-col :span="12"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户类型">
              <j-dict-select-tag placeholder="请选择" v-decorator="['khlx', validatorRules.khlx]" :triggerChange="true" dictCode="lldj_khlx" :disabled="custtypeDisabled"/>
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
              <a-input-number placeholder="综合授信额度" v-decorator="['zhsxed', validatorRules.zhsxed]" :min="0" style="width: 100%"
                              :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                              :parser="value => value.replace(/\$\s?|(,*)/g, '')"/>
            </a-form-item></a-col>
            <a-col :span="12"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="贷款授信+承兑敞口">
              <a-input-number placeholder="贷款授信+承兑敞口" v-decorator="['cdck', validatorRules.cdck]"  @blur="onCdckBlur" :min="0" style="width: 100%"
                              :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                              :parser="value => value.replace(/\$\s?|(,*)/g, '')"/>
            </a-form-item></a-col>

            <a-col :span="12"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="贷款期限">
              <j-dict-select-tag placeholder="请选择" v-decorator="['dkqx', validatorRules.dkqx]" :triggerChange="true" dictCode="dkqx"/>
            </a-form-item></a-col>
            <!--<a-col :span="12"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否保证保险贷款">
              <j-dict-select-tag placeholder="是否保证保险贷款" v-decorator="['sfbzbxdk', validatorRules.sfbzbxdk]" :triggerChange="true" dictCode="sfbz"/>
            </a-form-item></a-col>-->

            <a-col :span="12"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否便民卡">
              <j-dict-select-tag placeholder="请选择" v-decorator="['sfbmk', validatorRules.sfbmk]" :triggerChange="true" dictCode="sfbz"/>
            </a-form-item></a-col>
            <a-col :span="12"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="信贷贷款品种">
              <j-dict-select-tag placeholder="请选择" v-decorator="['xddkpz', validatorRules.xddkpz]" :triggerChange="true" dictCode="xddkpz_one"/>
            </a-form-item></a-col>
          </a-row>
        </a-card>

        <a-divider orientation="left" style="color: #1890FF;">1.信用等级</a-divider>
        <a-card class="card" :bordered="false">
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="24" :offset="2">
              <a-form-item>
                <a-radio-group buttonStyle="solid" v-decorator="['KH00001',{}]">
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

        <a-divider orientation="left" style="color: #1890FF;">2.扣分项目</a-divider>
        <a-card class="card" :bordered="false">
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item>贷款人在近五年有不良记录（含配偶）</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item>
                <a-input-number placeholder="请填写数字" v-decorator="['GZ00008', {}]" :min="0" :max="100" :step="1" style="width: 30%"/>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>

        <a-divider orientation="left" style="color: #1890FF;">3.资产负债率 - 数据来源于用户征信报告</a-divider>
        <a-card class="card" :bordered="false">
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >资产总额</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item >
                <a-input-number placeholder="请填写数字" v-decorator="['GZ00009', {}]" @blur="calcFzl" :min="0" style="width: 30%"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >负债总额</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item >
                <a-input-number placeholder="请填写数字" v-decorator="['GZ00010', {}]" @blur="calcFzl" :min="0" style="width: 30%"/>
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

        <a-divider orientation="left" style="color: #1890FF;">4.经营期限/贷款投向</a-divider>
        <a-card class="card" :bordered="false">
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >经营期限</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item>
                <j-dict-select-tag placeholder="请选择" v-decorator="['GZ00012', {initialValue:'1'}]" :triggerChange="true" dictCode="jyqx_ningyuan" style="width: 30%"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >贷款投向</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item>
                <j-dict-select-tag placeholder="请选择" v-decorator="['GZ00013', {initialValue:'1'}]" :triggerChange="true" dictCode="dktx_ningyuan" style="width: 85%"/>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>

        <a-divider orientation="left" style="color: #1890FF;">5.客户存款贡献度</a-divider>
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

        <a-divider orientation="left" style="color: #1890FF;">6.信贷业务往来及效益贡献度</a-divider>
        <a-card class="card" :bordered="false">
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >信贷业务往来时间</a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item>
                <j-dict-select-tag placeholder="请选择" v-decorator="['GZ00020', {initialValue:'1'}]" :triggerChange="true" dictCode="xdywwlsj_ningyuan" style="width: 30%"/>
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

        <a-divider orientation="left" style="color: #1890FF;">7.其他业务扣分项</a-divider>
        <a-card class="card" :bordered="false">
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >客户是否购买了意外伤害险</a-form-item></a-col>
            <a-col :span="11">
              <a-form-item >
                <j-dict-select-tag placeholder="请选择" v-decorator="['GZ00026', {initialValue:'1'}]" :triggerChange="true" dictCode="sfbz" style="width: 30%"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >借款人近两年在本行是否有未结清的不良贷款记录</a-form-item></a-col>
            <a-col :span="11">
              <a-form-item >
                <j-dict-select-tag placeholder="请选择" v-decorator="['GZ00027', {initialValue:'2'}]" :triggerChange="true" dictCode="sfbz" style="width: 30%"/>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>

        <a-divider orientation="left" style="color: #1890FF;">8.其他业务加分项</a-divider>
        <a-card class="card" :bordered="false">
          <a-row class="form-row"  type="flex" justify="start" align="middle">
            <a-col :span="10" :offset="2">
              <a-form-item >客户在本行开通了商户POS机或聚合支付（扫码）业务</a-form-item></a-col>
            <a-col :span="11">
              <a-form-item >
                <j-dict-select-tag placeholder="请选择" v-decorator="['GZ00028', {initialValue:'2'}]" :triggerChange="true" dictCode="sfbz" style="width: 30%"/>
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
                <j-dict-select-tag placeholder="请选择" v-decorator="['GZ00030', {initialValue:'2'}]" :triggerChange="true" dictCode="sfbz" style="width: 30%"/>
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

        <a-divider orientation="left" style="color: #1890FF;">10.担保方式及担保物品分类</a-divider>
        <a-card class="card" :bordered="false">
          <j-editable-table ref="khdbxx"
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
          </j-editable-table>

<!--          <j-editable-table ref="khdbxx"-->
<!--                            AddButtonName="添加担保信息"-->
<!--                            :disabled="false"-->
<!--                            :loading="dbxxTable.loading"-->
<!--                            :columns="dbxxTable.columns"-->
<!--                            :dataSource="dbxxTable.dataSource"-->
<!--                            :maxHeight="500"-->
<!--                            :rowNumber="true"-->
<!--                            :rowSelection="true"-->
<!--                            :actionButton="true"-->
<!--                            @valueChange="valueChange">-->

<!--            <template v-slot:dbwSlot="props">-->
<!--              <a-select placeholder="请选择" :default-value="props.text" @change="(value) => handleDbwChange(value, props.rowId)">-->
<!--                <a-select-option v-for="(item, i) in dbwList" :key="i" :value="item.value">-->
<!--                  {{ item.text }}-->
<!--                </a-select-option>-->
<!--              </a-select>-->
<!--            </template>-->

<!--            <template v-slot:dbwlxSlot="props">-->
<!--              <a-select placeholder="请选择" :default-value="props.text" @change="(value) => handleDbwlxChange(value, props.rowId)">-->
<!--                <a-select-option v-for="(item, i) in dbwlxList" :key="i" :value="item.value">-->
<!--                  {{ item.text }}-->
<!--                </a-select-option>-->
<!--              </a-select>-->
<!--            </template>-->
<!--          </j-editable-table>-->
        </a-card>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import {getAction, httpAction} from '@/api/manage'
  import pick from 'lodash.pick'
  import {FormTypes} from '@/utils/JEditableTableUtil'
  import ACol from 'ant-design-vue/es/grid/Col'
  import AFormItem from 'ant-design-vue/es/form/FormItem'
  import {notification} from "ant-design-vue";
  import moment from 'moment'
  import JEditableTable from '@comp/jeecg/JEditableTable'
  import {ajaxGetDictItems} from "@/api/api";
  import {cloneObject} from "@/utils/util";

  export default {
    name: "LldjsqNyModal",
    components: {
      AFormItem, ACol, JEditableTable,
    },
    data () {
      return {
        submitData:{},
        title:"操作",
        opration: '', //操作员操作标识 add/edit
        custType: '', //定价申请客户类型 1 个人/2 企业
        custtypeDisabled: true, //客户类型 禁用标识
        disableGZ00001: true, // 资金归行率 禁用标识
        cdckCheck: 'false',//贷款授信+承兑敞口金额监听标识：300万元（含）以上/300万元以下
        model: {},
        visible: false,
        labelCol: {
          sm: { span: 12 },
          xs: { span: 24 },
        },
        wrapperCol: {
          sm: { span: 12 },
          xs: { span: 24 },
        },
        ckrpye: 0, //存款日平余额
        zjghl: 0, //资金归行率
        disableSubmit: false,
        confirmLoading: false,
        form: this.$form.createForm(this),
        dbwList: [],
        dbwlxList: [],
        // dbwlxDictCode: 'dbwlx_syyf_ningyuan',
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
        // dbxxTable: {
        //   loading: false,
        //   dataSource: [],
        //   columns: [
        //     {
        //       title: '担保物',
        //       key: 'dbw',
        //       type: FormTypes.slot,
        //       defaultValue: '',
        //       placeholder: '请选择',
        //       //dictCode: 'dbw_ningyuan',
        //       validateRules:[{
        //         required: true, // 必填
        //         message: '${title}不能为空' // 提示的文本
        //       }],
        //       width: '15%',
        //       slotName: 'dbwSlot',
        //     },
        //     {
        //       title: '担保物类型',
        //       key: 'dblx',
        //       type: FormTypes.slot,
        //       defaultValue: '',
        //       placeholder: '请选择',
        //       dictCode: '',
        //       validateRules:[{
        //         required: true, // 必填
        //         message: '${title}不能为空' // 提示的文本
        //       }],
        //       width: '20%',
        //       slotName: 'dbwlxSlot',
        //     },
        //     {
        //       title: '担保物描述',
        //       key: 'dbwms',
        //       type: FormTypes.input,
        //       defaultValue: '',
        //       placeholder: '担保物描述',
        //       ellipsis: true,
        //       disabled: false,
        //       validateRules:[{
        //         required: false, // 必填
        //         message: '${title}不能为空' // 提示的文本
        //       }],
        //       width: '25%'
        //     },
        //     {
        //       title: '所有权人',
        //       key: 'syqr',
        //       type: FormTypes.input,
        //       defaultValue: '',
        //       placeholder: '请输入',
        //       ellipsis: true,
        //       validateRules:[{
        //         required: true, // 必填
        //         message: '${title}不能为空' // 提示的文本
        //       }],
        //       width: '10%',
        //     },
        //     {
        //       title: '评估价值',
        //       key: 'pgjz',
        //       type: FormTypes.inputNumber,
        //       defaultValue: '',
        //       placeholder: '请输入',
        //       validateRules:[
        //         {
        //           required: true, // 必填
        //           message: '${title}不能为空' // 提示的文本
        //         },
        //         {
        //           pattern: /^([0-9]*|d*.d{1}?d*)$/, // 正则
        //           message: '${title}只能是带一位小数点的数字'
        //         }
        //       ],
        //       width: '10%',
        //     },
        //     {
        //       title: '实际担保金额',
        //       key: 'sjdbje',
        //       type: FormTypes.inputNumber,
        //       defaultValue: '',
        //       placeholder: '请输入',
        //       validateRules:[
        //         {
        //           required: true, // 必填
        //           message: '${title}不能为空', // 提示的文本
        //         },
        //         {
        //           pattern: /^([0-9]*|d*.d{1}?d*)$/, // 正则
        //           message: '${title}只能是带一位小数点的数字'
        //         },
        //       ],
        //       width: '10%',
        //     },
        //     {
        //       title: '担保率(%)',
        //       key: 'dbl',
        //       type: FormTypes.inputNumber,
        //       defaultValue: '0',
        //       placeholder: '${title}',
        //       disabled: true,
        //       validateRules:[{
        //         required: true, // 必填
        //         message: '${title}不能为空' // 提示的文本
        //       }],
        //       width: '10%',
        //     },
        //   ]
        // },
        dbxxCheck: false,
        sjdbjezh: 0,
        validatorRules: {
          //zzbz: {rules: [{required: true, message: '所属组织为空!'}]},
          //zjhm: {rules: [{required: true, message: '证件号码为空!'}]},
          djnf: {rules: [{required: true, message: '定价年份为空!'}]},
          khmc: {rules: [{required: true, message: '客户名称为空!'}]},
          zhsxed: {rules: [{required: true, message: '授信额度为空!'}]},
          cdck: {rules: [{required: true, message: '贷款授信+承兑敞口为空!'}]},
          dkqx: {rules: [{required: true, message: '贷款期限为空!'}], initialValue: '1'},
          khlx: {rules: [{required: true, message: '客户类型为空!'}], initialValue: '1'},
          sfbmk: {rules: [{required: true, message: '请选择是否便民卡!'}], initialValue: '2'},
          //sfbzbxdk: {rules: [{required: true, message: '请选择是否保证保险贷款!'}], initialValue: '2'},
          xddkpz: {rules: [{required: true, message: '信贷贷款品种为空!'}], initialValue: '1'}
        },
        url: {
          add: "/dklldj/lldjsqNy/add",
          edit: "/dklldj/lldjsqNy/edit",
          sqmxlist: "/dklldj/lldjsqNy/sqmxlist",
          dbxxList: "/dklldj/lldjsqNy/dbxxList",
        },
      }
    },
    created () {
      this.initDictData()
    },
    methods: {
      // 担保物下拉数据字典初始化
      initDictData() {
        //根据字典Code, 初始化字典数组
        ajaxGetDictItems('dbw_ningyuan', null).then((res) => {
          if (res.success) {
            //console.info('担保物：',res.result)
            this.dbwList = res.result;
          }
        })
        ajaxGetDictItems(this.dbwlxDictCode, null).then((res) => {
          if (res.success) {
            this.dbwlxList = res.result;
          }
        })
      },
      add() {
        this.edit({})
      },
      edit(record) {
        console.info('操作标识:',this.opration)
        console.info('利率定价申请.edit.record:',record)
        this.ckrpye = record.ckrpye == null ? 0 : Number.parseFloat(record.ckrpye).toFixed(4)
        let khlx = record.khlx
        //console.info('客户类型:',khlx)
        if (khlx) {
          if (khlx === 1 || khlx === 2) {
            this.custType = Number.parseInt(khlx)
          } else {
            this.disableSubmit = true
            this.custtypeDisabled = false
            notification.error({ message: '系统提示', description: '客户类型非法，请手动选择！',duration: 4});
          }
        } else {
          notification.error({ message: '系统提示', description: '未获取到定价申请客户类型，请核实！',duration: 4});
        }
        var records = {
          'zzbz': record.zzbz,
          'zjhm': record.zjhm,
          'djnf': record.djnf,
          'khmc': record.khmc,
          'khlx': khlx,
          'frdb': record.frdb,
          'snsxed': record.snsxed == null ? 0 : record.snsxed,
          'snzxll': record.snzxll == null ? 0 : record.snzxll,
        }
        this.form.resetFields()
        this.model = Object.assign({}, record, records)
        this.model.djnf = records.djnf.length > 4 ? records.djnf.substr(0, 4) : records.djnf
        console.info('利率定价申请.edit.model:',this.model)
        this.visible = true
        this.confirmLoading = true
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(
            this.model,
            'zzbz','zjhm',
            'djnf','khmc',
            'khlx','frdb',
            'snsxed','snzxll',
            'zhsxed','cdck',
            'dkqx','xddkpz',
            'sfbmk','sfbzbxdk',
            'GZ00016','GZ00017','GZ00018',
            'GZ00021','GZ00022','GZ00023','GZ00024','GZ00025',
            'GZ00029','GZ00031','GZ00032',
            'GZ00037','GZ00038','GZ00039'
          ))
          if (this.opration === 'edit') {
            this.onCdckBlur()
            let data = {
              'zjhm': this.model.zjhm,
              'djnf': this.model.djnf+"-01-01"
            }
            getAction(this.url.sqmxlist, data).then((res) => {
              if (res.success) {
                console.info('定价申请明细数据返回:',res.result)
                this.form.setFieldsValue(pick(res.result,
                  'KH00001','GZ00008','GZ00009','GZ00010','GZ00011','GZ00012','GZ00013',
                  'GZ00020','GZ00026','GZ00027','GZ00028','GZ00030'
                ))
              } else {
                notification.error({ message: '系统提示', description: '查询定价申请明细失败!'+res.message,duration: 4})
              }
            }).finally(() => {
              // 查询客户担保信息
              this.queryDbxx()
            })
          } else {
            this.confirmLoading = false
          }
        })
      },
      // 查询客户担保信息
      queryDbxx() {
        let data = {
          'zjhm': this.model.zjhm,
          'djnf': this.model.djnf+'-01-01'
        }
        getAction(this.url.dbxxList, data).then((res) => {
          if (res.success) {
            this.dbxxTable.dataSource = res.result
          } else {
            notification.warning({ message: '系统提示', description: '查询客户担保信息失败!'+res.message,duration: 4})
          }
        }).catch((error) => {
          notification.error({ message: '系统提示', description: '查询客户担保信息失败!'+error,duration: 4})
        }).finally(() => {
          this.confirmLoading = false
        })
      },
      // 贷款授信+承兑敞口 监听事件
      onCdckBlur() {
        var cdck = this.form.getFieldValue('cdck')
        cdck = Number(cdck).toFixed(4)
        console.info('本年度贷款授信总额',cdck)
        if (cdck > 0) {
          // 关联存款账户日平存款余额占贷款授信额度比例 =
          // (客户在本行前三季度第一个季度关联存款账户存款日平余额 * 10% +
          // 前三季度第二个季度关联存款账户存款日平余额 * 20% +
          // 前三季度第三个季度关联存款账户存款日平余额 * 70%) / 客户在本行本年度贷款授信总额
          var QSJD_DYJD_CKRP = this.form.getFieldValue('GZ00016')
          var QSJD_DEJD_CKRP = this.form.getFieldValue('GZ00017')
          var QSJD_DSJD_CKRP = this.form.getFieldValue('GZ00018')
          var RPCK_Z_DKSXBL = Number.parseFloat(((QSJD_DYJD_CKRP * 0.1 + QSJD_DEJD_CKRP * 0.2 + QSJD_DSJD_CKRP * 0.7) / cdck) * 100).toFixed(2)
          this.form.setFieldsValue({'GZ00019': RPCK_Z_DKSXBL})
        } else {
          this.form.setFieldsValue({'GZ00019': '0.00'})
        }
      },
      // 资产负债率监听事件
      calcFzl(){
        var zcze = this.form.getFieldValue('GZ00009')
        console.info('资产总额',zcze)
        if (zcze == null || zcze === 0 || zcze === '') {
          this.form.setFieldsValue({GZ00011: 0.00})
          return
        }
        var zcfz = this.form.getFieldValue('GZ00010')
        console.info('资产负债',zcfz)
        if (zcfz == null || zcfz === 0 || zcfz === '') {
          this.form.setFieldsValue({GZ00011: 0.00})
          return
        }
        var result = (Number(zcfz) / Number(zcze)) * 100
        result = result.toFixed(2)
        this.form.setFieldsValue({GZ00011: result})
      },
      //担保物监听事件
      /*handleDbwChange(value,id) {
        console.info('担保物-已改变:','id-',id,'value-',value)
        if (value) {
          let values = [{
              rowKey: id,
              values: {'dbw': value},
          }]
        } else {
          console.warn('担保物-未获取到值！')
        }
      },*/
      //担保物类型监听事件
      /*handleDbwlxChange(value,id) {
        console.info('担保物类型-已改变:','id-',id,'value-',value)
        if (value) {

          let values = [{
            rowKey: id,
            values: {
              'dblx': value,
              'dbwms': ''
            },
          }]
        } else {
          console.warn('担保物类型-未获取到值！')
        }
      },*/
      // 担保信息-担保率计算
      valueChange(record) {
        //console.info('担保信息-值发生改变:',record)
        //担保物处理
        var dbw = Number.parseInt(record.row.dbw)
        //担保类型处理
        var dbwlx = Number.parseInt(record.row.dblx)
        //担保率处理
        var sjdbje = Number.parseFloat(record.row.sjdbje).toFixed(2)
        var pgjz   = Number.parseFloat(record.row.pgjz).toFixed(2)
        if (!isNaN(sjdbje) && !isNaN(pgjz)) {
          var dbl = Number(sjdbje / pgjz * 100).toFixed(0)
          this.$refs.khdbxx.setValues([
            {
              rowKey: record.row.id,
              values: {
                'dbl': dbl,
              }
            },
          ])
        }
      },
      // 担保信息校验
      viDbxx() {
        let dbjeze = 0
        let {error, values} = this.$refs.khdbxx.getValuesSync({})
        if (error === 0) {
          this.dbxxCheck = true
          if (values == null || values.length === 0) {
            notification.warning({message: '系统提示', description: '请添加担保信息！', duration: 4})
            return
          } else {
            this.model.khdbxxList = values
            values.filter((item, i) => {
              dbjeze = dbjeze + (item.sjdbje - 0)
            })
          }
          this.sjdbjezh = dbjeze
        } else {
          this.dbxxCheck = false
          console.info('values',values)
          values.forEach((item,index) =>{
            console.info('index',index)
            console.info('item',item)
            if (item.dbw === undefined || item.dbw === '') {
              notification.warning({message: '系统提示', description: '担保物不能为空！', duration: 4})
              return
            }
            if (item.dblx === undefined || item.dblx === '') {
              notification.warning({message: '系统提示', description: '担保物类型不能为空！', duration: 4})
              return
            }
            if (item.dbwms === undefined || item.dbwms === '') {
              notification.warning({message: '系统提示', description: '担保物描述不能为空！', duration: 4})
              return
            }
            if (item.syqr === undefined || item.syqr === '') {
              notification.warning({message: '系统提示', description: '所有权人不能为空！', duration: 4})
              return
            }
            if (item.pgjz === undefined || item.pgjz === '') {
              notification.warning({message: '系统提示', description: '评估价值不能为空！', duration: 4})
              return
            }
            if (item.sjdbje === undefined || item.sjdbje === '') {
              notification.warning({message: '系统提示', description: '实际担保金额不能为空！', duration: 4})
              return
            }
            if (item.dbl === undefined || item.dbl === '') {
              notification.warning({message: '系统提示', description: '担保率不能为空！', duration: 4})
              return
            }
          })
        }
      },
      // 确认保存
      handleOk() {
        const that = this;
        that.$confirm({
          title: '提示',
          content: '是否确认执行该操作?',
          onOk() {
            //校验客户担保信息 TODO 因担保信息层级联动未完成，暂时先屏蔽
            that.viDbxx()
            if (!that.dbxxCheck) {
              notification.warning({ message: '系统提示', description: '担保信息校验未通过，请检查!', duration: 4});
              return
            }
            that.form.validateFields((err, values) => {
              if (!err) {
                let formData = Object.assign(that.model, values)
                that.$set(formData,'djnf',moment(formData.djnf+'-01-01').format('YYYY-MM-DD'))

                delete formData.GZ00001
                delete formData.GZ00002
                delete formData.GZ00003
                delete formData.GZ00004
                delete formData.GZ00005
                delete formData.GZ00006
                delete formData.GZ00007
                delete formData.GZ00014
                delete formData.GZ00015
                delete formData.GZ00033
                delete formData.GZ00034
                delete formData.GZ00035
                delete formData.GZ00036
                delete formData.sndkrp
                delete formData.sfbzbxdk
                //delete formData.xddkpz

                var zhsxed   = formData.zhsxed
                var cdck     = formData.cdck
                var KH00001  = formData.KH00001
                if (zhsxed <= 0) {
                  notification.warning({ message: '系统提示', description: '综合授信金额必须大于0!，金额以万元为单位，请检查!', duration: 4});
                  return;
                }
                if (cdck <= 0) {
                  notification.warning({ message: '系统提示', description: '贷款授信+承兑敞口金额必须大于0!，金额以万元为单位，请检查!', duration: 4});
                  return;
                }
                if (KH00001 === undefined || KH00001 === null) {
                  notification.warning({ message: '系统提示', description: '1. 信用等级未选择，请检查!', duration: 4});
                  return;
                }
                console.log('贷款利率定价申请-页面表单:', formData)
                let httpurl = ''
                let method  = ''
                if (that.opration === 'add') {
                  httpurl += that.url.add
                  method = 'post'
                } else if (that.opration === 'edit') {
                  httpurl += that.url.edit
                  method = 'put'
                } else {
                  notification.error({ message: '系统提示', description: '未获取到操作标识[opration]，请联系系统管理员！', duration: 4});
                  return;
                }
                that.confirmLoading = true
                httpAction(httpurl, formData, method).then((res) => {
                  if (res.success) {
                    notification.success({ message: '系统提示', description: res.message, duration: 4})
                    that.$emit('ok')
                  } else {
                    console.info(res.message)
                    notification.warning({ message: '系统提示', description: '操作失败！请联系系统管理员', duration: 4})
                  }
                }).finally(() => {
                  that.confirmLoading = false
                  that.close()
                })
              }
            })
          },
          onCancel() {
            console.log('用户取消操作！')
          },
        })
      },
      handleCancel() {
        this.close()
      },
      close() {
        this.model.zzbz = ""
        this.model.zjhm = ""
        this.model.djnf = ""
        this.dbxxTable.dataSource = []
        this.$emit('close')
        this.visible = false
      },
    }
  }
</script>

<style lang="less" scoped>
</style>