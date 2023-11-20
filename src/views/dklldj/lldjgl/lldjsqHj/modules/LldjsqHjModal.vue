<template>
  <a-modal :title="title"
           :width="1000"
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
              <a-input placeholder="定价年份" v-decorator="['djnf', validatorRules.djnf]" disabled/>
            </a-form-item></a-col>
            <a-col :span="12"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="申请客户名称">
              <a-input placeholder="申请客户名称" :disabled="true" v-decorator="['khmc', validatorRules.khmc]"/>
            </a-form-item></a-col>

            <a-col :span="12"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户类型">
              <j-dict-select-tag placeholder="请选择" v-decorator="['khlx', validatorRules.khlx]" :triggerChange="true" dictCode="lldj_khlx" :disabled="custtypeDisabled" @change="custtypeEvent"/>
            </a-form-item></a-col>
            <a-col :span="12"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="法人代表">
              <a-input placeholder="法人代表" v-decorator="['frdb', {}]" disabled/>
            </a-form-item></a-col>

            <a-col :span="12"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="上年授信额度">
              <a-input placeholder="上年授信额度" v-decorator="['snsxed', {}]" addon-after="万元" style="width: 100%" disabled/>
            </a-form-item></a-col>
            <a-col :span="12"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="上年执行利率">
              <a-input placeholder="上年执行利率" v-decorator="['snzxll', {}]" addon-after="%" style="width: 100%" disabled/>
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
              <j-dict-select-tag placeholder="请选择" v-decorator="['dkqx', validatorRules.dkqx]" :triggerChange="true" dictCode="dkqxhj"/>
            </a-form-item></a-col>
            <a-col :span="12"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="担保方式">
              <j-dict-select-tag placeholder="请选择" v-decorator="['xddkpz', validatorRules.xddkpz]" :triggerChange="true" dictCode="dbfs_hj"/>
            </a-form-item></a-col>

            <a-col :span="12"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否便民卡">
              <j-dict-select-tag placeholder="请选择" v-decorator="['sfbmk', validatorRules.sfbmk]" :triggerChange="true" dictCode="sfbz"/>
            </a-form-item></a-col>
            <a-col :span="12"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否保证保险贷款">
              <j-dict-select-tag placeholder="请选择" v-decorator="['sfbzbxdk', validatorRules.sfbzbxdk]" :triggerChange="true" dictCode="sfbz"/>
            </a-form-item></a-col>
          </a-row>
        </a-card>

        <a-divider orientation="left" style="color: #1890FF;">1.贡献度</a-divider>
        <a-card class="card" :bordered="true">
          <a-row class="form-row" type="flex" justify="start" align="middle">
            <a-col :span="3" offset="2"><a-form-item style="font-size: 8pt;font-weight: bold;color: red">★ 存款日平余额：</a-form-item></a-col>
            <a-col :span="18">
              <a-form-item style="font-size: 8pt;font-weight: bold;color: red">
                {{ Number.parseFloat(this.ckrpye).toFixed(4) }} 万元&nbsp;&nbsp;&nbsp;&nbsp;
                ★ 资金归行率：&nbsp;&nbsp;&nbsp;{{Number.parseFloat(this.zjghl).toFixed(2)}} %
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" type="flex" justify="start" align="middle">
            <a-col :span="3" offset="2"><a-form-item>资金归行率</a-form-item></a-col>
            <a-col :span="18" >
              <a-form-item>
                <a-radio-group buttonStyle="solid" v-decorator="['GZ00001',{ initialValue: '0' }]" :disabled="disableGZ00001">
                  <a-radio value="0">归行率低于5%</a-radio>
                  <a-radio value="1">归行率达5%</a-radio>
                  <a-radio value="2">归行率达10%</a-radio>
                  <a-radio value="3">归行率达15%</a-radio>
                  <a-radio value="4">归行率达20%</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" type="flex" justify="start" align="middle" v-if="this.cdckCheck === 'true'">
            <a-col :span="3" offset="2"><a-form-item>利息贡献</a-form-item></a-col>
            <a-col :span="18">
              <a-form-item>
                <a-radio-group buttonStyle="solid" v-decorator="['GZ00002',{}]">
                  <a-radio value="1">100（含）- 200万元</a-radio>
                  <a-radio value="2">200（含）- 500万元</a-radio>
                  <a-radio value="3">500（含）万元以上</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>

        <a-divider orientation="left" style="color: #1890FF;">2.忠诚度</a-divider>
        <a-card class="card" :bordered="true">
          <a-row class="form-row" type="flex" justify="start" align="middle">
            <a-col :span="3" offset="2"><a-form-item>合作时长（年）</a-form-item></a-col>
            <a-col :span="7" >
              <a-form-item style="width: 70%;">
                <a-input-number v-decorator="['GZ00003',{}]" :min="0" :max="99" style="width: 100%;"></a-input-number>
              </a-form-item>
            </a-col>
            <a-col :span="11"><span style="font-size: 8pt;font-weight: bold;color: red">★ 在本行建立信贷关系且无逾期情况</span></a-col>
          </a-row>
          <a-row class="form-row" type="flex" justify="start" align="middle">
            <a-col :span="3" offset="2"><a-form-item>产品使用</a-form-item></a-col>
            <a-col :span="18" >
              <a-form-item>
                <a-checkbox-group buttonStyle="solid" v-decorator="['GZ00004',{}]">
                  <a-checkbox value="1" v-if="this.custType === 1">信用卡</a-checkbox>
                  <a-checkbox value="2">E支付</a-checkbox>
                  <a-checkbox value="3" v-if="this.custType === 1">手机银行</a-checkbox>
                  <a-checkbox value="4" v-if="this.custType === 2">在本行开立基本账户</a-checkbox>
                </a-checkbox-group>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>

        <a-divider orientation="left" style="color: #1890FF;">3.诚信度</a-divider>
        <a-card class="card" :bordered="true">
          <a-row class="form-row" type="flex" justify="start" align="middle">
            <a-col :span="3" offset="2"><a-form-item>客户征信记录</a-form-item></a-col>
            <a-col :span="18" >
              <a-form-item>
                <a-radio-group buttonStyle="solid" v-decorator="['GZ00005',{}]">
                  <a-radio value="1">首贷户</a-radio>
                  <a-radio value="2">非首贷客户无逾期记录</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :span="8" offset="2"><a-form-item>非恶意产生的贷款本息（含信用卡）逾期期数</a-form-item></a-col>
            <a-col :span="8" >
              <a-form-item>
                <a-input-number v-decorator="['GZ00006',{}]" :min="0" :max="99" style="width: 50%;"></a-input-number>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>

        <a-divider orientation="left" style="color: #1890FF;">4.客户类别</a-divider>
        <a-card class="card" :bordered="true">
          <a-row class="form-row" type="flex" justify="start" align="middle">
            <a-col :span="7" offset="2"><a-form-item>借款主体为小微企业(含个体工商户)</a-form-item></a-col>
            <a-col :span="10" >
              <a-form-item>
                <a-radio-group buttonStyle="solid" v-decorator="['GZ00007',{}]">
                  <a-radio value="1">是</a-radio>
                  <a-radio value="2">否</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>

        <a-divider orientation="left" style="color: #1890FF;">5.贷款期限</a-divider>
        <a-card class="card" :bordered="true">
          <a-row class="form-row" type="flex" justify="start" align="middle">
            <a-col :span="7" offset="2"><a-form-item>单笔贷款期限1年以下</a-form-item></a-col>
            <a-col :span="10" >
              <a-form-item>
                <a-radio-group buttonStyle="solid" v-decorator="['GZ00008',{}]">
                  <a-radio value="1">是</a-radio>
                  <a-radio value="2">否</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>

        <a-divider orientation="left" style="color: #1890FF;">6.还款方式</a-divider>
        <a-card class="card" :bordered="true">
          <a-row class="form-row" type="flex" justify="start" align="middle">
            <a-col :span="7" offset="2"><a-form-item>还款方式选择按月结息</a-form-item></a-col>
            <a-col :span="10" >
              <a-form-item>
                <a-radio-group buttonStyle="solid" v-decorator="['GZ00009',{}]">
                  <a-radio value="1">是</a-radio>
                  <a-radio value="2">否</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
          </a-row>
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

  export default {
    name: "LldjsqHjModal",
    components: {
      AFormItem, ACol,
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
        validatorRules: {
          //zzbz: {rules: [{required: true, message: '所属组织为空!'}]},
          //zjhm: {rules: [{required: true, message: '证件号码为空!'}]},
          djnf: {rules: [{required: true, message: '定价年份为空!'}]},
          khmc: {rules: [{required: true, message: '客户名称为空!'}]},
          zhsxed: {rules: [{required: true, message: '授信额度为空!'}]},
          cdck: {rules: [{required: true, message: '贷款授信+承兑敞口为空!'}]},
          dkqx: {rules: [{required: true, message: '贷款期限为空!'}], initialValue: '1'},
          xddkpz: {rules: [{required: true, message: '担保方式为空!'}], initialValue: '1'},
          khlx: {rules: [{required: true, message: '客户类型为空!'}], initialValue: '1'},
          sfbmk: {rules: [{required: true, message: '请选择是否便民卡!'}], initialValue: '2'},
          sfbzbxdk: {rules: [{required: true, message: '请选择是否保证保险贷款!'}], initialValue: '2'}
        },
        url: {
          add: "/dklldj/lldjsqHj/add",
          edit: "/dklldj/lldjsqHj/edit",
          sqmxlist: "/dklldj/lldjsqHj/sqmxlist"
        },
      }
    },
    created () {},
    methods: {
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
            'sfbmk','sfbzbxdk'
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
                //忠诚度 / 产品使用 / 多选值处理
                this.$set(res.result,'GZ00004',res.result.GZ00004.split(','));
                this.form.setFieldsValue(pick(res.result,
                  'GZ00001', 'GZ00002','GZ00003', 'GZ00004','GZ00005', 'GZ00006', 'GZ00007','GZ00008', 'GZ00009'
                ))
              } else {
                notification.error({ message: '系统提示', description: '查询定价申请明细失败!'+res.message,duration: 4})
              }
            }).finally(() => {
              this.confirmLoading = false
            })
          } else {
            this.confirmLoading = false
          }
        })
        this.confirmLoading = false
      },

      // 贷款授信+承兑敞口 监听事件
      onCdckBlur() {
        var cdck = this.form.getFieldValue('cdck')
        cdck = Number(cdck).toFixed(4)
        console.info('贷款授信+承兑敞口:',cdck)
        if (cdck > 0) {
          if (cdck >= 300) {
            this.cdckCheck = 'true'
          } else {
            this.cdckCheck = 'false'
          }
          var ckrpye = Number.parseFloat(this.ckrpye).toFixed(4)
          this.zjghl = Number(ckrpye / cdck * 100).toFixed(2)
          console.info('资金归行率：',this.zjghl,'%')
          if (this.zjghl < 5) {
            //归行率低于5%
            this.form.setFieldsValue({'GZ00001': '0'})
          }
          if (this.zjghl >= 5 && this.zjghl < 10) {
            //归行率达5%
            this.form.setFieldsValue({'GZ00001': '1'})
          }
          if (this.zjghl >= 10 && this.zjghl < 15) {
            //归行率达10%
            this.form.setFieldsValue({'GZ00001': '2'})
          }
          if (this.zjghl >= 15 && this.zjghl < 20) {
            //归行率达10%
            this.form.setFieldsValue({'GZ00001': '3'})
          }
          if (this.zjghl >= 20) {
            //归行率达20%
            this.form.setFieldsValue({'GZ00001': '4'})
          }
        } else {
          this.zjghl = 0
          this.form.setFieldsValue({'GZ00001': '0'})
          this.cdckCheck = 'false'
        }
      },

      custtypeEvent(value) {
        value = Number.parseInt(value)
        if (value) {
          this.disableSubmit = false
        } else {
          this.disableSubmit = true
        }
      },

      // 确认保存
      handleOk() {
        const that = this;
        that.$confirm({
          title: '提示',
          content: '是否确认执行该操作?',
          onOk() {
            that.form.validateFields((err, values) => {
              if (!err) {
                var zhsxed   = that.form.getFieldValue('zhsxed') //综合授信额度
                var cdck     = that.form.getFieldValue('cdck')   //贷款授信+承兑敞口(除专项贷款外)
                var GZ00001  = that.form.getFieldValue('GZ00001'); //资金归行率
                var GZ00002  = that.form.getFieldValue('GZ00002'); //利息贡献度
                var GZ00003  = that.form.getFieldValue('GZ00003'); //合作时长
                var GZ00004  = that.form.getFieldValue('GZ00004'); //产品使用
                var GZ00005  = that.form.getFieldValue('GZ00005'); //客户征信记录
                var GZ00006  = that.form.getFieldValue('GZ00006'); //非恶意产生的贷款本息（含信用卡）逾期期数
                var GZ00007  = that.form.getFieldValue('GZ00007'); //借款主体为小微企业(含个体工商户)
                var GZ00008  = that.form.getFieldValue('GZ00008'); //单笔贷款期限1年以下
                var GZ00009  = that.form.getFieldValue('GZ00009'); //还款方式选择按月结息
                if (zhsxed <= 0) {
                  notification.warning({ message: '系统提示', description: '综合授信金额必须大于0!，金额以万元为单位，请检查!', duration: 4});
                  return;
                }
                if (cdck <= 0) {
                  notification.warning({ message: '系统提示', description: '贷款授信+承兑敞口金额必须大于0!，金额以万元为单位，请检查!', duration: 4});
                  return;
                }
                if (GZ00001 === undefined || GZ00001 === null) {
                  notification.warning({ message: '系统提示', description: '1. 贡献度/[资金归行率]未选择，请检查!', duration: 4});
                  return;
                }
                if (cdck >= 300) {
                  if (GZ00002 === undefined || GZ00002 === null) {
                    notification.warning({ message: '系统提示', description: '1.贡献度/利息贡献度未选择，请检查!', duration: 4});
                    return;
                  }
                }
                if (GZ00003 === undefined || GZ00003 === null) {
                  notification.warning({ message: '系统提示', description: '2. 忠诚度/[合作时长]未填写，请检查!', duration: 4});
                  return;
                }
                if (GZ00004.length <= 0) {
                  notification.warning({ message: '系统提示', description: '2. 忠诚度/[产品使用]未选择，请检查!', duration: 4});
                  return;
                }
                if (GZ00005 === undefined || GZ00005 === null) {
                  notification.warning({ message: '系统提示', description: '3. 诚信度/[客户征信记录]未选择，请检查!', duration: 4});
                  return;
                }
                if (GZ00006 === undefined || GZ00006 === null) {
                  notification.warning({ message: '系统提示', description: '3. 诚信度/[非恶意产生的贷款本息（含信用卡）逾期期数]未填写，请检查!', duration: 4});
                  return;
                }
                if (GZ00007 === undefined || GZ00007 === null) {
                  notification.warning({ message: '系统提示', description: '4. 客户类别与期限、还款方式/[借款主体为小微企业(含个体工商户)]未选择，请检查!', duration: 4});
                  return;
                }
                if (GZ00008 === undefined || GZ00008 === null) {
                  notification.warning({ message: '系统提示', description: '4. 客户类别与期限、还款方式/[单笔贷款期限1年以下]未选择，请检查!', duration: 4});
                  return;
                }
                if (GZ00009 === undefined || GZ00009 === null) {
                  notification.warning({ message: '系统提示', description: '4. 客户类别与期限、还款方式/[还款方式选择按月结息]未选择，请检查!', duration: 4});
                  return;
                }
                let formData = Object.assign(that.model, values)
                that.$set(formData,'djnf',moment(formData.djnf+'-01-01').format('YYYY-MM-DD'))
                //忠诚度 / 产品使用 / 多选值处理
                var GZ00004String = ""
                formData.GZ00004.forEach((item,index) => {
                  GZ00004String = GZ00004String.concat(item).concat(',')
                })
                that.$set(formData,'GZ00004',GZ00004String.substring(0,GZ00004String.length-1))
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
        this.$emit('close')
        this.visible = false
      },
    }
  }
</script>

<style lang="less" scoped>
</style>