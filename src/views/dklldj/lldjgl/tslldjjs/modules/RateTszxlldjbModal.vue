<template>
  <a-modal :title="title"
           :width="1200"
           :visible="visible"
           :confirmLoading="confirmLoading"
           @ok="handleOk"
           @cancel="handleCancel"
           cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-divider orientation="left" style="color: #1890FF;">基本信息</a-divider>
        <a-row class="form-row" :gutter="24">
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="计算日期">
              <a-input placeholder="计算日期" :disabled="true" v-decorator="['lrsj', {}]"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="单位">
              <a-input placeholder="单位/万元" :disabled="true" v-model="this.danwei"/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="24">
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="申请客户名称">
              <a-input placeholder="申请客户名称" :disabled="true" v-decorator="['khmc', {}]"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="法人代表">
              <a-input placeholder="法人代表" :disabled="true" v-decorator="['frdb', {}]"/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="24">
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="贷款期限">
              <j-dict-select-tag placeholder="请选择贷款期限"
                                 v-decorator="['dkqx', {rules: [{ required: true, message: '请选择贷款期限!' }], initialValue:'1'}]"
                                 :triggerChange="true" dictCode="dkqx"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="基准利率">
              <a-input placeholder="基准利率" :disabled="true" v-model="this.jjll"/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-divider orientation="left" style="color: #1890FF;">请选择贷款类型</a-divider>
        <a-row :gutter="8" style="margin-left: 100px;">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-radio-group buttonStyle="solid" @change="onChange5" v-decorator="['dklx']">
              <a-col style="margin-bottom: 5px">
                <a-radio value=1>10万元(含)以内贷款</a-radio>
              </a-col>
              <a-col style="margin-bottom: 5px">
                <a-radio value=2>农户小额信用贷款（含福祥便民卡）</a-radio>
              </a-col>
              <a-col style="margin-bottom: 5px">
                <a-radio value=3>质押贷款</a-radio>
              </a-col>
              <a-col style="margin-bottom: 5px">
                <a-radio value=4>学校类、政府类、医疗系统类贷款、促进就业小额担保贷款、妇女创业贷款、困难党员专项贷款、银（社）团贷款、按揭贷款、公职人员贷款及员工贷款等专项贷款</a-radio>
              </a-col>
              <a-col style="margin-bottom: 5px">
                <a-radio value=5>其他系统客户和重要客户</a-radio>
              </a-col>
            </a-radio-group>
          </a-form-item>
        </a-row>

        <div v-if="this.divVal == '1'">
          <a-divider orientation="left" style="color: #1890FF;">请选择担保方式</a-divider>
          <a-row :gutter="8" style="margin-left: 100px;">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-radio-group buttonStyle="solid" @change="onChange1" v-decorator="['dklxxq', {}]">
                <a-col style="margin-bottom: 5px">
                  <a-radio value=11>以国有出让地上的房产抵押</a-radio>
                </a-col>
                <a-col style="margin-bottom: 5px">
                  <a-radio value=22>以国有划拨、集体土地上的房产抵押</a-radio>
                </a-col>
                <a-col style="margin-bottom: 5px">
                  <a-radio value=33>保证担保或联在保、林权、设备抵押等</a-radio>
                </a-col>
                <a-col style="margin-bottom: 5px">
                  <a-radio value=44>其他信用贷款</a-radio>
                </a-col>
              </a-radio-group>
            </a-form-item>
          </a-row>
        </div>

        <div v-if="this.divVal == '2'">
          <a-divider orientation="left" style="color: #1890FF;">请选择评级类型</a-divider>
          <a-row :gutter="8" style="margin-left: 100px;">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-radio-group buttonStyle="solid" @change="onChange2" v-decorator="['dklxxq', {}]">
                <a-col style="margin-bottom: 5px">
                  <a-radio value=111>未评级“信用村（社区）”的农户小额信用贷款</a-radio>
                </a-col>
                <a-col style="margin-bottom: 5px">
                  <a-radio value=222>一星级“信用村（社区）”的农户小额信用贷款</a-radio>
                </a-col>
                <a-col style="margin-bottom: 5px">
                  <a-radio value=333>二星级“信用村（社区）”的农户小额信用贷款</a-radio>
                </a-col>
                <a-col style="margin-bottom: 5px">
                  <a-radio value=444>三星级“信用村（社区）”的农户小额信用贷款</a-radio>
                </a-col>
                <a-col style="margin-bottom: 5px">
                  <a-radio value=555>四星级（及以上）“信用村（社区）”的农户小额信用贷款</a-radio>
                </a-col>
              </a-radio-group>
            </a-form-item>
          </a-row>
        </div>

        <div v-if="this.divVal == '3'">
          <a-divider orientation="left" style="color: #1890FF;">请选择质押贷款类型</a-divider>
          <a-row :gutter="8" style="margin-left: 100px;">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-radio-group buttonStyle="solid" @change="onChange3" v-decorator="['dklxxq', {}]">
                <a-col>
                  <a-radio value=1111>以存入本行存单质押，出质人与借款人属同一人（或家庭成员）</a-radio>
                </a-col>
                <a-col>
                  <a-radio value=2222>以本行存单质押但出质人与借款人不属同一人、以他行存单质押但出质人与借款人属同一人</a-radio>
                </a-col>
                <a-col style="margin-bottom: 5px">
                  <a-radio value=3333>以国债、存入他行存单质押（出质人与借款人不属同一人）</a-radio>
                </a-col>
                <a-col style="margin-bottom: 5px">
                  <a-radio value=4444>在我行开立基本账户企业受理的银行承兑汇票质押</a-radio>
                </a-col>
                <a-col style="margin-bottom: 5px">
                  <a-radio value=5555>银行其他票据质押贷款</a-radio>
                </a-col>
                <a-col style="margin-bottom: 5px">
                  <a-radio value=6666>其他权利质押贷款</a-radio>
                </a-col>

              </a-radio-group>
            </a-form-item>
          </a-row>
        </div>

        <a-divider orientation="left" style="color: #1890FF;"></a-divider>
        <div v-if="this.divVal == 1 || this.divVal == 2 ||  this.divVal == null ||this.divVal == ''">
          <a-row class="form-row" :gutter="24">
            <a-col :span="12">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="浮动幅度">
                <a-input placeholder="浮动幅度" v-decorator="['fdfd', {}]"/>
              </a-form-item>
            </a-col>
          </a-row>
        </div>

        <a-row class="form-row" :gutter="24">
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="执行利率">
              <a-input placeholder="执行利率" v-decorator="['zxll', {}]" type="number"/>
            </a-form-item>
          </a-col>
        </a-row>

        <div v-if="this.divVal == 5 || this.divVal == 4">
          <a-row class="form-row" :gutter="24">
            <a-col :span="12">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="情况说明">
                <a-textarea v-decorator="['qksm', {}]"/>
              </a-form-item>
            </a-col>
          </a-row>
        </div>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import {httpAction, postAction} from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "RateTszxlldjbModal",
    data() {
      return {
        title: "操作",
        visible: false,
        danwei: "万元",
        jjll: "4.3500",
        zxll: "0.0000",
        qksm: "",
        divVal: "",
        one: "",
        model: {},
        form: this.$form.createForm(this),
        labelCol: {
          xs: {span: 24},
          sm: {span: 5},
        },
        wrapperCol: {
          xs: {span: 24},
          sm: {span: 16},
        },
        confirmLoading: false,
        url: {
          add: "/rate/rateTszxlldjb/add",
          edit: "/rate/rateTszxlldjb/edit",
        },
      }
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        // 获取贷款期限对应的基准利率
        // 一年期 4.3500% 五年期以上 4.75%
      },

      add() {
        this.edit({});
      },

      edit(record) {
        this.divVal = record.dklx;
        this.form.resetFields();
        this.model = Object.assign({}, record);
        console.log("this.model")
        console.log(this.model)
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(
            this.model,
            'zzbz', 'zjhm', 'djnf', 'khmc', 'frdb', 'dkqx', 'dklx', 'dklxxq', 'fdfd', 'zxll',
            'lrsj', 'lrczy', 'lrbz', 'spzt', 'spr', 'spsj', 'qksm', 'note', 'djid', 'xgsj', 'xgczy', 'xgzt',
            'jzll', 'jdbp', 'lprll', 'jysxed', 'bjrq'
          ))
        })
        // 去拼需要的值
        // if (record.djid != null){
        //   console.log(record.dklx)
        //   this.form.setFieldsValue({ 'dklx': record.dklx  })
        //   this.one = record.dklx;
        // }
      },

      close() {
        this.$emit('close');
        this.model = {};
        this.visible = false;
      },

      handleOk() {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if (!this.model.djid) {
              httpurl += this.url.add;
              method = 'post';
            } else {
              httpurl += this.url.edit;
              method = 'put';
            }
            let formData = Object.assign(this.model, values);

            console.log(formData)
            httpAction(httpurl, formData, method).then((res) => {
              if (res.success) {
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

      handleCancel() {
        this.close()
      },

      onChange1(e) {
        console.log('radio checked1', e.target.value);
        let data = Number(e.target.value);
        this.form.setFieldsValue({'dklxxq': data})
        let num = 0;
        if (data == 11) {
          this.form.setFieldsValue({'fdfd': 45})
          num = 1.45 * Number(this.jjll);
          num = num.toFixed(4);
          this.form.setFieldsValue({'zxll': num})
        } else if (data == 22) {
          this.form.setFieldsValue({'fdfd': 55})
          num = 1.55 * Number(this.jjll);
          num = num.toFixed(4);
          this.form.setFieldsValue({'zxll': num})
        } else if (data == 33) {
          this.form.setFieldsValue({'fdfd': 60})
          num = 1.60 * Number(this.jjll);
          num = num.toFixed(4);
          this.form.setFieldsValue({'zxll': num})
        } else if (data == 44) {
          this.form.setFieldsValue({'fdfd': 70})
          num = 1.70 * Number(this.jjll);
          num = num.toFixed(4);
          this.form.setFieldsValue({'zxll': num})
        }

      },

      onChange2(e) {
        console.log('radio checked2', e.target.value);
        let data = Number(e.target.value);
        this.form.setFieldsValue({'dklxxq': data})
        let num = 0;
        if (data === 111) {
          this.form.setFieldsValue({'fdfd': 50})
          num = 1.60 * Number(this.jjll);
          num = num.toFixed(4);
          this.form.setFieldsValue({'zxll': num})
        } else if (data === 222) {
          this.form.setFieldsValue({'fdfd': 45})
          num = 1.45 * Number(this.jjll);
          num = num.toFixed(4);
          this.form.setFieldsValue({'zxll': num})
        } else if (data === 333) {
          this.form.setFieldsValue({'fdfd': 40})
          num = 1.40 * Number(this.jjll);
          num = num.toFixed(4);
          this.form.setFieldsValue({'zxll': num})
        } else if (data === 444) {
          this.form.setFieldsValue({'fdfd': 35})
          num = 1.35 * Number(this.jjll);
          num = num.toFixed(4);
          this.form.setFieldsValue({'zxll': num})
        } else if (data === 555) {
          this.form.setFieldsValue({'fdfd': 30})
          num = 1.30 * Number(this.jjll);
          num = num.toFixed(4);
          this.form.setFieldsValue({'zxll': num})
        }
      },

      onChange3(e) {
        console.log('radio checked3', e.target.value);
        let data = Number(e.target.value);
        this.form.setFieldsValue({'dklxxq': data})
        if (data === 1111) {
          this.form.setFieldsValue({'zxll': '4.3500'})
        } else if (data === 2222) {
          this.form.setFieldsValue({'zxll': '5.2200'})
        } else if (data === 3333) {
          this.form.setFieldsValue({'zxll': '5.6550'})
        } else if (data === 4444) {
          this.form.setFieldsValue({'zxll': '6.0900'})
        } else if (data === 5555) {
          this.form.setFieldsValue({'zxll': '6.5250'})
        } else if (data === 6666) {
          this.form.setFieldsValue({'zxll': '0.0000'})
        }
      },

      onChange5(e) {
        console.log('radio checked', e.target.value);
        this.divVal = e.target.value;
        this.form.setFieldsValue({'fdfd': '', 'zxll': '', 'dklx': e.target.value});
      },
    }
  }
</script>

<style lang="less" scoped>

</style>