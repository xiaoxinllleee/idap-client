<template>
  <a-modal :title="title"
           :width="1200"
           :visible="visible"
           :confirmLoading="confirmLoading"
           :keyboard="false"
           :maskClosable="false"
           @ok="handleOk"
           @cancel="handleCancel"
           okText="保存"
           cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form" >
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
              <a-input placeholder="申请客户名称" :disabled="true" v-decorator="['khmc', {}]" disabled/>
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
            <a-col :span="12"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="上年执行利率">
              <a-input placeholder="上年执行利率" v-decorator="['snzxll', {}]" addon-after="%" style="width: 100%" disabled/>
            </a-form-item></a-col>

            <a-col :span="12"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="综合授信额度">
              <a-input-number placeholder="综合授信额度" v-decorator="['zhsxed', {}]" :min="0" style="width: 100%" disabled
                              :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                              :parser="value => value.replace(/\$\s?|(,*)/g, '')"/>
            </a-form-item></a-col>
            <a-col :span="12"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="贷款授信+承兑敞口">
              <a-input-number placeholder="贷款授信+承兑敞口" v-decorator="['cdck', {}]" :min="0" style="width: 100%" disabled
                              :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                              :parser="value => value.replace(/\$\s?|(,*)/g, '')"/>
            </a-form-item></a-col>

            <a-col :span="12"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="贷款期限">
              <j-dict-select-tag placeholder="请选择" v-decorator="['dkqx', {}]" :triggerChange="true" dictCode="dkqxhj" disabled/>
            </a-form-item></a-col>
            <a-col :span="12"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="担保方式">
              <j-dict-select-tag placeholder="请选择" v-decorator="['xddkpz', {}]" :triggerChange="true" dictCode="dbfs_hj" disabled/>
            </a-form-item></a-col>

            <a-col :span="12"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否便民卡">
              <j-dict-select-tag placeholder="请选择" v-decorator="['sfbmk', {}]" :triggerChange="true" dictCode="sfbz" disabled/>
            </a-form-item></a-col>
            <a-col :span="12"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否保证保险贷款">
              <j-dict-select-tag placeholder="请选择" v-decorator="['sfbzbxdk', {}]" :triggerChange="true" dictCode="sfbz" disabled/>
            </a-form-item></a-col>
          </a-row>
        </a-card>

        <a-divider orientation="left" style="color: #1890FF;">1.贡献度〔得分：{{this.DF_KH00001}}〕</a-divider>
        <a-card class="card" :bordered="true">
          <a-row class="form-row" type="flex" justify="start" align="middle">
            <a-col :span="3" offset="2"><a-form-item>资金归行率</a-form-item></a-col>
            <a-col :span="18" >
              <a-form-item>
                <a-radio-group buttonStyle="solid" v-decorator="['GZ00001',{}]" disabled>
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
                <a-radio-group buttonStyle="solid" v-decorator="['GZ00002',{}]" disabled>
                  <a-radio value="1">100（含）- 200万元</a-radio>
                  <a-radio value="2">200（含）- 500万元</a-radio>
                  <a-radio value="3">500（含）万元以上</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>

        <a-divider orientation="left" style="color: #1890FF;">2.忠诚度〔得分：{{this.DF_KH00002}}〕</a-divider>
        <a-card class="card" :bordered="true">
          <a-row class="form-row" type="flex" justify="start" align="middle">
            <a-col :span="3" offset="2"><a-form-item>合作时长</a-form-item></a-col>
            <a-col :span="18" >
              <a-form-item style="width: 20%;">
                <a-input v-decorator="['GZ00003',{}]" addon-after="年" style="width: 100%;" disabled></a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" type="flex" justify="start" align="middle">
            <a-col :span="3" offset="2"><a-form-item>产品使用</a-form-item></a-col>
            <a-col :span="18" >
              <a-form-item>
                <a-checkbox-group buttonStyle="solid" v-decorator="['GZ00004',{}]" disabled>
                  <a-checkbox value="1" v-if="this.custType === 1">信用卡</a-checkbox>
                  <a-checkbox value="2">E支付</a-checkbox>
                  <a-checkbox value="3" v-if="this.custType === 1">手机银行</a-checkbox>
                  <a-checkbox value="4" v-if="this.custType === 2">在本行开立基本账户</a-checkbox>
                </a-checkbox-group>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>

        <a-divider orientation="left" style="color: #1890FF;">3.诚信度〔得分：{{this.DF_KH00003}}〕</a-divider>
        <a-card class="card" :bordered="true">
          <a-row class="form-row" type="flex" justify="start" align="middle">
            <a-col :span="3" offset="2"><a-form-item>客户征信记录</a-form-item></a-col>
            <a-col :span="18" >
              <a-form-item>
                <a-radio-group buttonStyle="solid" v-decorator="['GZ00005',{}]" disabled>
                  <a-radio value="1">首贷户</a-radio>
                  <a-radio value="2">非首贷客户无逾期记录</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :span="8" offset="2"><a-form-item>非恶意产生的贷款本息（含信用卡）逾期期数</a-form-item></a-col>
            <a-col :span="8" >
              <a-form-item>
                <a-input v-decorator="['GZ00006',{}]" addon-after="期" style="width: 50%;" disabled></a-input>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>

        <a-divider orientation="left" style="color: #1890FF;">4.客户类别〔得分：{{this.DF_KH00004}}〕</a-divider>
        <a-card class="card" :bordered="true">
          <a-row class="form-row" type="flex" justify="start" align="middle">
            <a-col :span="7" offset="2"><a-form-item>借款主体为小微企业(含个体工商户)</a-form-item></a-col>
            <a-col :span="10" >
              <a-form-item>
                <a-radio-group buttonStyle="solid" v-decorator="['GZ00007',{}]" disabled>
                  <a-radio value="1">是</a-radio>
                  <a-radio value="2">否</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>

        <a-divider orientation="left" style="color: #1890FF;">5.贷款期限〔得分：{{this.DF_KH00005}}〕</a-divider>
        <a-card class="card" :bordered="true">
          <a-row class="form-row" type="flex" justify="start" align="middle">
            <a-col :span="7" offset="2"><a-form-item>单笔贷款期限1年以下</a-form-item></a-col>
            <a-col :span="10" >
              <a-form-item>
                <a-radio-group buttonStyle="solid" v-decorator="['GZ00008',{}]" disabled>
                  <a-radio value="1">是</a-radio>
                  <a-radio value="2">否</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>

        <a-divider orientation="left" style="color: #1890FF;">6.还款方式〔得分：{{this.DF_KH00006}}〕</a-divider>
        <a-card class="card" :bordered="true">
          <a-row class="form-row" type="flex" justify="start" align="middle">
            <a-col :span="7" offset="2"><a-form-item>还款方式选择按月结息</a-form-item></a-col>
            <a-col :span="10" >
              <a-form-item>
                <a-radio-group buttonStyle="solid" v-decorator="['GZ00009',{}]" disabled>
                  <a-radio value="1">是</a-radio>
                  <a-radio value="2">否</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>

        <a-card class="card" :bordered="true" style="margin-top: 20px">
          <a-row class="form-row">
            <a-col :span="8">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="得分合计">
                <a-input v-decorator="['dfhj', {}]" addon-after="分" style="width: 100%" disabled/>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="执行利率">
                <a-input v-decorator="['zxll', {}]" addon-after="%" style="width: 100%" disabled/>
              </a-form-item>
            </a-col>
            <a-col :span="8"></a-col>
            <a-col :span="8"></a-col>
            <a-col :span="8"></a-col>
          </a-row>
        </a-card>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { putAction,getAction } from '@/api/manage'
  import { FormTypes, getRefPromise } from '@/utils/JEditableTableUtil'
  import JEditableTable from '@comp/jeecg/JEditableTable'
  import {notification} from "ant-design-vue";

  export default {
    name: "LldjjsHjModal",
    components: {
      JTreeSelect,
      JEditableTable
    },
    data () {
      return {
        submitData: {},
        title: "利率定价计算",
        opration: '', //操作员操作标识 add/edit
        custType: '', //定价申请客户类型 1 个人/2 企业
        cdckCheck: '',//贷款授信+承兑敞口金额监听标识：300万元（含）以上/300万元以下
        djid: '',
        spzt: '0',
        model: {},
        visible: false,
        labelCol: {
          sm: {span: 11},
        },
        wrapperCol: {
          sm: {span: 12},
        },
        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{},
        DF_KH00001: 0,
        DF_KH00002: 0,
        DF_KH00003: 0,
        DF_KH00004: 0,
        DF_KH00005: 0,
        DF_KH00006: 0,
        url: {
          add: "/dklldj/lldjjsHj/addSave",
          edit: "/dklldj/lldjjsHj/editSave",
          sqmxlist: "/dklldj/lldjsqHj/sqmxlist",
          compute:"/dklldj/lldjjsHj/compute"
        },
      }
    },
    created () {},
    methods: {
      add(record) {
        this.edit(record)
      },

      edit(record) {
        console.log('贷款利率定价计算 / record:',record)
        let khlx = record.khlx
        //console.info('客户类型:',khlx)
        if (khlx) {
          if (khlx === 1 || khlx === 2) {
            this.custType = Number.parseInt(khlx)
          } else {
            notification.error({ message: '系统提示', description: '客户类型非法，请联系管理员核实申请信息！',duration: 4});
          }
        } else {
          notification.error({ message: '系统提示', description: '未获取到定价申请客户类型，请核实！',duration: 4});
        }
        this.$set(record,'khlx',this.custType)
        this.$set(record,'snsxed',record.snsxed == null ? 0 : record.snsxed)
        this.$set(record,'snzxll',record.snzxll == null ? 0 : record.snzxll)
        this.visible = true
        this.confirmLoading = true
        this.form.resetFields()
        this.model = Object.assign({}, record)
        let djnfstr = record.djnf.toString()
        var djnf = djnfstr.length > 4 ? djnfstr.substr(0, 4) : djnfstr
        this.model.djnf = djnf
        console.info('贷款利率定价计算 / this.model:',this.model)
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(
            this.model,
            'zzbz', 'zjhm',
            'djnf', 'khmc',
            'khlx', 'frdb',
            'snsxed', 'snzxll',
            'zhsxed', 'cdck',
            'dkqx', 'xddkpz',
            'sfbmk', 'sfbzbxdk'
          ))
          var cdck = this.form.getFieldValue('cdck')
          cdck = Number(cdck).toFixed(2)
          console.info('贷款授信+承兑敞口:', cdck)
          if (cdck >= 300) {
            this.cdckCheck = 'true'
          } else {
            this.cdckCheck = 'false'
          }
          let param = {
            'djnf': this.model.djnf+"-01-01",
            'zjhm': this.model.zjhm
          }
          getAction(this.url.sqmxlist, param).then((res) => {
            if (res.success) {
              console.info('定价申请明细数据返回:',res.result)
              //忠诚度 / 产品使用 / 多选值处理
              this.$set(res.result,'GZ00004',res.result.GZ00004.split(','));
              this.form.setFieldsValue(pick(res.result,
                'GZ00001', 'GZ00002','GZ00003', 'GZ00004','GZ00005', 'GZ00006', 'GZ00007','GZ00008', 'GZ00009'
              ))
              getAction(this.url.compute, param).then((res) => {
                if (res.success) {
                  notification.success({ message: '系统提示', description: '分值计算成功！', duration: 4})
                  this.model = Object.assign(this.model, res.result)
                  console.info('定价计算分值：',res.result)
                  console.info('this.model：',this.model)
                  this.DF_KH00001 = this.model.DF_KH00001 == null ? 0 : Number.parseFloat(this.model.DF_KH00001).toFixed(2)
                  this.DF_KH00002 = this.model.DF_KH00002 == null ? 0 : Number.parseFloat(this.model.DF_KH00002).toFixed(2)
                  this.DF_KH00003 = this.model.DF_KH00003 == null ? 0 : Number.parseFloat(this.model.DF_KH00003).toFixed(2)
                  this.DF_KH00004 = this.model.DF_KH00004 == null ? 0 : Number.parseFloat(this.model.DF_KH00004).toFixed(2)
                  this.DF_KH00005 = this.model.DF_KH00005 == null ? 0 : Number.parseFloat(this.model.DF_KH00005).toFixed(2)
                  this.DF_KH00006 = this.model.DF_KH00006 == null ? 0 : Number.parseFloat(this.model.DF_KH00006).toFixed(2)
                  this.$nextTick(() => {this.form.setFieldsValue(pick(this.model, 'dfhj', 'zxll'))});
                } else {
                  notification.warning({ message: '系统提示', description: res.message, duration: 4})
                }
              }).catch((error) => {
                notification.error({ message: '系统提示', description: error,duration: 4})
              }).finally(() => {
                this.confirmLoading = false
              })
            } else {
              notification.warning({ message: '系统提示', description: '查询定价申请明细失败!'+res.message,duration: 4})
            }
          }).catch((error) => {he
            notification.error({ message: '系统提示', description: '查询定价申请明细失败!'+error,duration: 4})
          })
        })
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
                let httpurl = that.url.add
                console.info('操作标识',that.opration)
                if (that.opration === 'edit') {
                  httpurl = that.url.edit
                }
                let method = 'post'
                let formData = Object.assign(that.model, values)
                let djnfstr = formData.djnf.toString()
                formData.djnf = djnfstr.length === 4 ? djnfstr + '-01-01' : djnfstr
                formData.djid = that.djid
                var spzt = Number(that.spzt).toFixed(0)
                if (spzt === 1) {
                  formData.spzt = '1'
                } else {
                  formData.spzt = '0'
                }
                console.log('利率定价计算 / 保存 / formData:', formData)
                that.confirmLoading = true
                httpAction(httpurl, formData, method).then((res) => {
                  if (res.success) {
                    notification.success({ message: '系统提示', description: '保存成功！',duration: 4});
                    that.$emit('ok')
                    that.close()
                  } else {
                    notification.warning({ message: '系统提示', description: '保存失败，请联系系统管理员！',duration: 4});
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
    }
  }
</script>

<style lang="less" scoped>

</style>