<template>
  <a-modal
    :title="title"
    :width="1500"
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
              <j-dict-select-tag @change="changeLpRByDkQx()" placeholder="请选择贷款期限"
                                 v-decorator="['dkqx', {rules: [{ required: true, message: '请选择贷款期限!' }], initialValue:'1'}]"
                                 :triggerChange="true" dictCode="dkqx"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="LPR利率">
              <a-input placeholder="LPR利率" :disabled="true" v-model="this.jjll"/>
            </a-form-item>
          </a-col>
        </a-row>


        <a-divider orientation="left" style="color: #1890FF;">请选择贷款类型</a-divider>
        <a-row :gutter="8" style="margin-left: 100px;">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-radio-group buttonStyle="solid" @change="onChange5" v-decorator="['dklx']">
              <a-col style="margin-bottom: 5px">
                <a-radio value=1>政策性惠民类贷款</a-radio>
              </a-col>
              <a-col style="margin-bottom: 5px">
                <a-radio value=2>福祥便民卡贷款</a-radio>
              </a-col>
              <a-col style="margin-bottom: 5px">
                <a-radio value=3>质押贷款</a-radio>
              </a-col>
              <a-col style="margin-bottom: 5px">
                <a-radio value=4>其他特殊贷款客户类</a-radio>
              </a-col>
            </a-radio-group>
          </a-form-item>
        </a-row>


        <div v-if="this.divVal == '1'">
        <a-divider orientation="left" style="color: #1890FF;">请选择政策性惠民贷款类型</a-divider>
        <a-row :gutter="8" style="margin-left: 100px;">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-radio-group  buttonStyle="solid" @change="onChange1" v-decorator="['dklxxq']">
              <a-col style="margin-bottom: 5px">
                <a-radio value=1>符合“四有两好”项目的脱贫人口小额信用贷款，
                  目前按1年期以内（含1年期）3.70%，一年至三年期4.30%利率执行。
                  如遇贷款市场报价利率（ LPR）变化，按1年期执行同期同档贷款市场报价利率（LPR），
                  1年至3年期利率按5年期贷款市场报价利率（LPR）下浮30BP执行。合同签订采用固定利率，贷款利率在贷款合同期内保持不变；
                </a-radio>
              </a-col>
              <a-col style="margin-bottom: 5px">
                <a-radio value=2>符合金叶贷授信条件的新放贷款按固定年利率3.85%执行；</a-radio>
              </a-col>
              <a-col style="margin-bottom: 5px">
                <a-radio value=3>符合金丝贷授信条件的新放贷款，烟草经营许可证10级（含）-15级（不含）的，按固定年利率4.50%执行；烟草经营许可证15级（含）以上的，按固定年利率4.15%执行</a-radio>
              </a-col>
              <a-col style="margin-bottom: 5px">
                <a-radio value=4>符合惠农贷授信条件的惠农贷贷款按固定年利率7.2%执行</a-radio>
              </a-col>
            </a-radio-group>
          </a-form-item>
        </a-row>
        </div>

        <div v-if="this.divVal == '2'">
        <a-divider orientation="left" style="color: #1890FF;">请选择福祥便民卡贷款类型</a-divider>
        <a-row :gutter="8" style="margin-left: 100px;">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-radio-group buttonStyle="solid" @change="onChange2" v-decorator="['dklxxq']">
              <a-col style="margin-bottom: 5px">
                <a-radio value=11>福祥便民卡集团授信A:在本行已开立对公账户和职工工资代发账户的（老客户）按5.5‰执行（上浮51.725%）</a-radio>
              </a-col>
              <a-col style="margin-bottom: 5px">
                <a-radio value=22>福祥便民卡集团授信B:在本行已开立对公账户和职工工资代发账户的按6‰执行（上浮65.518%）</a-radio>
              </a-col>
              <a-col style="margin-bottom: 5px">
                <a-radio value=33>福祥便民卡集团授信C：在本行只开立职工工资代发账户的按固定利率6.5‰执行（上浮79.311%）</a-radio>
              </a-col>
              <a-col style="margin-bottom: 5px">
                <a-radio value=44>福祥便民卡集团授信D：其他情形的按固定利率7‰执行（上浮93.104%）</a-radio>
              </a-col>
            </a-radio-group>
          </a-form-item>
        </a-row>
        </div>


        <div v-if="this.divVal == '3'">
        <a-divider orientation="left" style="color: #1890FF;">请选择质押贷款类型</a-divider>
        <a-row :gutter="8" style="margin-left: 100px;">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-radio-group buttonStyle="solid" @change="onChange3" v-decorator="['dklxxq']">
              <a-col style="margin-bottom: 5px">
                <a-radio value=111>存单质押贷款A，经营项目合规、合法，信誉良好，质押存单为自有及家庭成员的,按同档次中国人民银行挂牌基准利率上浮20%执行</a-radio>
              </a-col>
              <a-col style="margin-bottom: 5px">
                <a-radio value=222>存单质押贷款B，经营项目合规、合法，信誉良好，质押存单为他有的,按同档次中国人民银行挂牌基准利率上浮50%执行；</a-radio>
              </a-col>
              <a-col style="margin-bottom: 5px">
                <a-radio value=333>市内其他农村商业银行股权质押贷款：存单质押贷款A，经营项目合规、合法，信誉良好，质押股权为自有及家庭成员的,按同档次中国人民银行挂牌基准利率上浮50%执行；</a-radio>
              </a-col>
              <a-col style="margin-bottom: 5px">
                <a-radio value=444>市内其他农村商业银行股权质押贷款：存单质押贷款B，经营项目合规、合法，信誉良好，质押存单为他有的,按同档次中国人民银行挂牌基准利率上浮80%执行；</a-radio>
              </a-col>
            </a-radio-group>
          </a-form-item>
        </a-row>
        </div>











        <a-divider orientation="left" style="color: #1890FF;"></a-divider>
        <div  v-if="this.divVal == 1 || this.divVal == 2|| this.divVal == 3|| this.divVal == 7||this.divVal == 8|| this.divVal == null ||this.divVal == ''&&visible1">
          <a-row class="form-row" :gutter="24">
            <a-col :span="12">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="浮动幅度">
                <a-input placeholder="浮动幅度" v-decorator="['fdfd', {}]"/>
              </a-form-item>
            </a-col>
          </a-row>
        </div>

        <div>
        <a-row class="form-row" :gutter="24">
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="执行利率">
              <a-input placeholder="执行利率" v-decorator="['zxll', {}]" type="number"/>
            </a-form-item>
          </a-col>
        </a-row>
        </div>

        <div >
        <a-row class="form-row" :gutter="24">
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="基点(加/减)BP">
              <a-input placeholder="基点(加/减)BP：" v-decorator="['jdbp', {}]" type="number"/>
            </a-form-item>
          </a-col>
        </a-row>
        </div>

        <div v-if="this.divVal == 4 || this.divVal == 6">
        <a-row class="form-row" :gutter="24">
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="情况说明">
              <a-input placeholder="情况说明：" v-decorator="['qksm', {}]" type="textarea"/>
            </a-form-item>
          </a-col>
        </a-row>
        </div>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>

  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "RateTszxlldjbModal",

    data () {
      return {
        visible1:false,
        divVal:"",
        title:"操作",
        visible: false,
        model: {},
        jjll:"",
        lrpList:{},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        danwei: "万元",
        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
        zzbz:{rules: [{ required: true, message: '请输入组织标识!' }]},
        zjhm:{rules: [{ required: true, message: '请输入证件号码!' }]},
        djnf:{rules: [{ required: true, message: '请输入定价年份!' }]},
        djid:{rules: [{ required: true, message: '请输入定价编号!' }]},
        },
        url: {
          add: "/com.lyr/rateTszxlldjb/add",
          edit: "/com.lyr/rateTszxlldjb/edit",
        },
      }
    },
    created () {
    },
    methods: {
      changeLpRByDkQx()
      {
       let dkqx=this.form.getFieldValue("dkqx")
      if(dkqx===1)
      {
         this.jjll=this.lrpList.LPRLv1
      }else {
        this.jjll=this.lrpList.LPRLv2
      }

      },
      onChange5(e)
      {
        this.divVal =e.target.value
        this.form.setFieldsValue({'fdfd': '', 'zxll': '', 'dklx': e.target.value});

      },
      onChange1(e)
      {
        let data = Number(e.target.value);
        this.form.setFieldsValue({'dklxxq': data})
        let num = 0;
        if (data == 1) {
          this.form.setFieldsValue({'fdfd': 0})
          num = Number(Number(this.jjll)*100/12*10);
          num = num.toFixed(4);
          this.form.setFieldsValue({'zxll': num})
        } else if (data == 2) {
          this.form.setFieldsValue({'fdfd': 0})
          num = Number(Number(this.jjll)*100/12*10);
          num = num.toFixed(4);
          this.form.setFieldsValue({'zxll': num})
        } else if (data == 3) {
          this.form.setFieldsValue({'fdfd': 0})

        } else if (data == 4) {
          this.form.setFieldsValue({'fdfd': 70})
          num = 1.70 * Number(this.jjll);
          num = num.toFixed(4);
          this.form.setFieldsValue({'zxll': num})
        }

      },
      onChange2(e)
      {
        console.log('radio checked2', e.target.value);
        let data = Number(e.target.value);
        this.form.setFieldsValue({'dklxxq': data})
        let num = 0;
        if (data === 11) {
          this.form.setFieldsValue({'fdfd': 50})
          num = 1.60 * Number(this.jjll);
          num = num.toFixed(4);
          this.form.setFieldsValue({'zxll': num})
        } else if (data === 22) {
          this.form.setFieldsValue({'fdfd': 45})
          num = 1.45 * Number(this.jjll);
          num = num.toFixed(4);
          this.form.setFieldsValue({'zxll': num})
        } else if (data === 33) {
          this.form.setFieldsValue({'fdfd': 40})
          num = 1.40 * Number(this.jjll);
          num = num.toFixed(4);
          this.form.setFieldsValue({'zxll': num})
        } else if (data === 44) {
          this.form.setFieldsValue({'fdfd': 35})
          num = 1.35 * Number(this.jjll);
          num = num.toFixed(4);
          this.form.setFieldsValue({'zxll': num})
        } else if (data === 55) {
          this.form.setFieldsValue({'fdfd': 30})
          num = 1.30 * Number(this.jjll);
          num = num.toFixed(4);
          this.form.setFieldsValue({'zxll': num})
        }

      },
      onChange3(e)
      {
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
      onChange4(e)
      {
        console.log('radio checked2', e.target.value);
        let data = Number(e.target.value);
        this.form.setFieldsValue({'dklxxq': data})
        let num = 0;
        if (data === 1111) {
          this.form.setFieldsValue({'fdfd': 50})
          num = 1.60 * Number(this.jjll);
          num = num.toFixed(4);
          this.form.setFieldsValue({'zxll': num})
        } else if (data === 2222) {
          this.form.setFieldsValue({'fdfd': 45})
          num = 1.45 * Number(this.jjll);
          num = num.toFixed(4);
          this.form.setFieldsValue({'zxll': num})
        } else if (data === 3333) {
          this.form.setFieldsValue({'fdfd': 40})
          num = 1.40 * Number(this.jjll);
          num = num.toFixed(4);
          this.form.setFieldsValue({'zxll': num})
        } else if (data === 4444) {
          this.form.setFieldsValue({'fdfd': 35})
          num = 1.35 * Number(this.jjll);
          num = num.toFixed(4);
          this.form.setFieldsValue({'zxll': num})
        } else if (data === 5555) {
          this.form.setFieldsValue({'fdfd': 30})
          num = 1.30 * Number(this.jjll);
          num = num.toFixed(4);
          this.form.setFieldsValue({'zxll': num})
        }

      },

      onChange6(e)
      {
        console.log('radio checked2', e.target.value);
        let data = Number(e.target.value);
        this.form.setFieldsValue({'dklxxq': data})
        let num = 0;
        if (data === 11111) {
          this.form.setFieldsValue({'fdfd': 50})
          num = 1.60 * Number(this.jjll);
          num = num.toFixed(4);
          this.form.setFieldsValue({'zxll': num})
        } else if (data === 22222) {
          this.form.setFieldsValue({'fdfd': 45})
          num = 1.45 * Number(this.jjll);
          num = num.toFixed(4);
          this.form.setFieldsValue({'zxll': num})
        } else if (data === 33333) {
          this.form.setFieldsValue({'fdfd': 40})
          num = 1.40 * Number(this.jjll);
          num = num.toFixed(4);
          this.form.setFieldsValue({'zxll': num})
        } else if (data === 44444) {
          this.form.setFieldsValue({'fdfd': 35})
          num = 1.35 * Number(this.jjll);
          num = num.toFixed(4);
          this.form.setFieldsValue({'zxll': num})
        } else if (data === 55555) {
          this.form.setFieldsValue({'fdfd': 30})
          num = 1.30 * Number(this.jjll);
          num = num.toFixed(4);
          this.form.setFieldsValue({'zxll': num})
        }

      },
      onChange7(e)
      {
        console.log('radio checked2', e.target.value);
        let data = Number(e.target.value);
        this.form.setFieldsValue({'dklxxq': data})
        let num = 0;
        if (data === 111111) {
          this.form.setFieldsValue({'fdfd': 50})
          num = 1.60 * Number(this.jjll);
          num = num.toFixed(4);
          this.form.setFieldsValue({'zxll': num})
        } else if (data === 222222) {
          this.form.setFieldsValue({'fdfd': 45})
          num = 1.45 * Number(this.jjll);
          num = num.toFixed(4);
          this.form.setFieldsValue({'zxll': num})
        } else if (data === 333333) {
          this.form.setFieldsValue({'fdfd': 40})
          num = 1.40 * Number(this.jjll);
          num = num.toFixed(4);
          this.form.setFieldsValue({'zxll': num})
        } else if (data === 444444) {
          this.form.setFieldsValue({'fdfd': 35})
          num = 1.35 * Number(this.jjll);
          num = num.toFixed(4);
          this.form.setFieldsValue({'zxll': num})
        } else if (data === 555555) {
          this.form.setFieldsValue({'fdfd': 30})
          num = 1.30 * Number(this.jjll);
          num = num.toFixed(4);
          this.form.setFieldsValue({'zxll': num})
        }

      },

      add () {
        this.edit({});
      },
      edit (record) {

        this.form.resetFields();
        this.lrpList.LPRLv1=record.LPRLv1;
        this.lrpList.LPRLv2=record.LPRLv2;
        this.model = Object.assign({}, record);
        this.form.setFieldsValue(pick(
          this.model,
          'lrsj', 'khmc', 'zjhm', 'frdb', 'zzbz'))
        this.visible = true;
        this.$nextTick(() => {

        });

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
            formData.djnf = formData.djnf?formData.djnf.format():null;
            formData.lrsj = formData.lrsj?formData.lrsj.format():null;
            formData.spsj = formData.spsj?formData.spsj.format():null;
            formData.xgsj = formData.xgsj?formData.xgsj.format():null;

            console.log(formData)
            httpAction(httpurl,formData,method).then((res)=>{
              if(res.success){
                that.$message.success(res.message);
                that.$emit('ok');
              }else{
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