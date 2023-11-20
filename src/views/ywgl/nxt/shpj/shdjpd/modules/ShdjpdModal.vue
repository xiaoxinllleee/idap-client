<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row class="form-row" :gutter="8">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="评定类型">
              <j-dict-select-tag placeholder="请输入评定类型" v-decorator="['pdlx', {rules: [{ required: true, message: '请输入评定类型!' }], initialValue:'MM'}]"
                                 :triggerChange="true" @change="pdlxChange" :disabled="model.shbm != undefined" dictCode="pdlx"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item  :labelCol="labelCol"
                          :wrapperCol="wrapperCol" label="评定年份" v-if="dateType=='YYYY'">
              <a-select placeholder="请选择评定年份" v-decorator="[ 'pdnf', validatorRules.pdzq ]" style="width: 100%;" :disabled="model.shbm != undefined">
                <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item :labelCol="labelCol"
                         :wrapperCol="wrapperCol" label="评定季度" v-if="dateType=='Q'">
              <a-select placeholder="季度年份" v-decorator="[ 'pdnf', validatorRules.pdzq ]" style="width: 50%;" :disabled="model.shbm != undefined">
                <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
              </a-select>
              <a-select placeholder="请选择评定季度" v-model="pdjd" @change="selectValue" style="width: 50%;" :disabled="model.shbm != undefined">
                <a-select-option value="">请选择</a-select-option>
                <a-select-option value="01">第一季度</a-select-option>
                <a-select-option value="04">第二季度</a-select-option>
                <a-select-option value="07">第三季度</a-select-option>
                <a-select-option value="10">第四季度</a-select-option>
              </a-select>
            </a-form-item>

            <a-form-item  :labelCol="labelCol"
                          :wrapperCol="wrapperCol" label="评定月份" v-if="dateType=='MM'">
              <a-month-picker placeholder="请选择评定月份" v-decorator="[ 'pdzq', validatorRules.pdzq ]" :disabled="model.shbm != undefined"
                              @change="selectValue" style="width: 100%;" />
            </a-form-item>

            <a-form-item  :labelCol="labelCol"
                          :wrapperCol="wrapperCol" label="评定半年" v-if="dateType=='YY'">
              <a-select placeholder="评定年份" v-decorator="[ 'pdnf', validatorRules.pdzq ]" @change="selectValue" :disabled="model.shbm != undefined"
                        style="width: 50%;">
                <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
              </a-select>
              <a-select placeholder="请选择评定周期" v-model="pdbn" @change="selectValue" style="width: 50%;" :disabled="model.shbm != undefined">
                <a-select-option value="">请选择</a-select-option>
                <a-select-option value="01">上半年</a-select-option>
                <a-select-option value="07">下半年</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="8">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="商户编码">
              <a-input placeholder="请输入商户编码" v-decorator="['shbm', validatorRules.shbm ]" disabled/>
              <a-button @click="shjbxxSelect" type="primary" icon="plus" v-show="model.shbm == undefined">查找带回</a-button>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="商户名称">
              <a-input placeholder="请输入商户名称" v-decorator="['shmc', {}]" disabled/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="8">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="机构标识">
              <a-input placeholder="请输入机构标识" v-decorator="['jgdm', validatorRules.jgdm ]" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="机构名称">
              <a-input placeholder="请输入机构名称" v-decorator="['jgdm_dictText', validatorRules.jgdm ]" disabled/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="8">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="上期评定日平">
              <a-input placeholder="请输入上期评定日平" v-decorator="['sqpdrp', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="上期评定等级">
              <j-dict-select-tag placeholder="请选择上期评定等级" v-decorator="['sqpddj', {}]" :trigger-change="true" dictCode="eweb:Erp_shpj_shpjcssz, csmc, csbh"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="8">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="本期评定日平">
              <a-input placeholder="请输入本期评定日平" v-decorator="['bqpdrp', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="本期评定等级">
              <j-dict-select-tag placeholder="请选择本期评定等级" v-decorator="['bqpddj', {}]" :trigger-change="true" dictCode="eweb:Erp_shpj_shpjcssz, csmc, csbh"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="8">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="等级是否有调整">
              <j-dict-select-tag placeholder="请输入等级是否有调整" v-decorator="['djsfytz', {}]" :trigger-change="true" dictCode="sfbz"/>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
    <shjbxx-select ref="shjbxxSelect" @ok="shjbxxSelectOk"/>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import ShjbxxSelect from '@/views/ywgl/nxt/shpj/shjbxx/modules/ShjbxxSelect'

  export default {
    name: "ShdjpdModal",
    components: {
      ShjbxxSelect
    },
    data () {
      return {
        title:"操作",
        visible: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 14 },
        },

        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
        pdlx:{rules: [{ required: true, message: '请输入评定类型!' }]},
        pdzq:{rules: [{ required: true, message: '请输入评定季度!' }]},
        jgdm:{rules: [{ required: true, message: '请输入机构代码!' }]},
        shbm:{rules: [{ required: true, message: '请输入商户编码!' }]},
        },
        dateType: 'MM',
        dateValue: '',
        years: [],
        pdjd:'',
        pdbn:'',
        url: {
          add: "/shdjpd/shdjpd/add",
          edit: "/shdjpd/shdjpd/edit",
        },
      }
    },
    created () {
      this.initSelectYear(new Date().getFullYear())
    },
    methods: {
      add () {
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'pdlx','jgdm','jgdm_dictText','shbm','shmc','lxdh','khjlbz','glzh','sqpdrp','sqpddj','bqpdrp','bqpddj','djsfytz','lrbz','lrr','xgr'))
		  //时间格式化
          this.form.setFieldsValue({pdzq:this.model.pdzq?moment(this.model.pdzq):null})
        });

      },
      // 初始化年份选择下拉框
      initSelectYear(year){
        this.years = [];
        for(let i=0; i<30; i++){
          this.years.push({value:((year - i)+''),label:((year - i)+'')});
        }
      },
      shjbxxSelect() {
        this.$refs['shjbxxSelect'].init()
      },
      shjbxxSelectOk(selectRow) {
        console.log('shjbxxSelectOk', selectRow)
        this.form.setFieldsValue(pick(selectRow[0],'shbm','shmc','jgdm','jgdm_dictText'))
      },
      selectValue(value){
        console.log('ShdjpdList => selectValue(value)')
        console.log('selectValue::::'+value)
        let val=value;
        this.$emit('change', val);
      },
      pdlxChange(e) {
        console.log('pdlxChange', e)
        this.dateType = e
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
            if(!this.model.shbm){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            console.log('formData', formData)
            let pdlx = formData.pdlx
            let pdzq = ''
            if (pdlx == 'MM') {
              pdzq = formData.pdzq?moment(formData.pdzq).format("YYYY-MM") + '-01':null;
            } else if (pdlx == 'Q') {
              pdzq = formData.pdnf + '-' + this.pdjd + '-01'
            } else if (pdlx == 'YY') {
              pdzq = formData.pdnf + '-' + this.pdbn + '-01'
            } else if (pdlx == 'YYYY') {
              pdzq = formData.pdnf + '-01-01'
            }
            //时间格式化
            formData.pdzq = pdzq

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