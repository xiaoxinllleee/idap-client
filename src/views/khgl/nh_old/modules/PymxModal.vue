<template>
  <a-modal :title="title"
           :width="1400"
           :visible="visible"
           :confirmLoading="confirmLoading"
           :okButtonProps="{ props: {disabled: disableSubmit} }"
           @cancel="handleCancel"
           cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-card class="card" :bordered="true">
        <a-form :form="form">
          <a-divider orientation="left" style="color: #1890FF; margin-top: -15px;">客户评议情况</a-divider>
          <a-row class="form-row" :gutter="8">
            <a-col :lg="6"><a-form-item label="婚姻状况" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag placeholder="婚姻状况" :triggerChange="true" v-decorator="['hyzk', {}]" dict-code="bkbpy_hyzk" disabled/>
            </a-form-item></a-col>
            <a-col :lg="6"><a-form-item label="年龄情况" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag placeholder="年龄情况" :triggerChange="true" v-decorator="['nnqk', {}]" dict-code="bkbpy_nlqk" disabled/>
            </a-form-item></a-col>
            <a-col :lg="6"><a-form-item label="健康状态情况" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag placeholder="健康状态情况" :triggerChange="true" v-decorator="['jkztqk', {}]" dict-code="bkbpy_qkms" disabled/>
            </a-form-item></a-col>
            <a-col :lg="6"><a-form-item label="经营能力" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag placeholder="经营能力" :triggerChange="true" v-decorator="['jynl', {}]" dict-code="bkbpy_qkms" disabled/>
            </a-form-item></a-col>
          </a-row>

          <a-row class="form-row" :gutter="8">
            <a-col :lg="6"><a-form-item label="职业情况" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag placeholder="职业情况" :triggerChange="true" v-decorator="['zwqk', {}]" dict-code="bkbpy_zyqk" disabled/>
            </a-form-item></a-col>
            <a-col :lg="6"><a-form-item label="信誉状况" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag placeholder="信誉状况" :triggerChange="true" v-decorator="['xyzk', {}]" dict-code="bkbpy_qkms" disabled/>
            </a-form-item></a-col>
            <a-col :lg="6"><a-form-item label="家庭成员关系" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag placeholder="家庭成员关系" :triggerChange="true" v-decorator="['jtcygx', {}]" dict-code="bkbpy_jtcygx" disabled/>
            </a-form-item></a-col>
            <a-col :lg="6"><a-form-item label="家庭劳动力人数" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag placeholder="家庭劳动力人数情况" :triggerChange="true" v-decorator="['jtndlrsqk', {}]" dict-code="bkbpy_jtldlrsqk" disabled/>
            </a-form-item></a-col>
          </a-row>

          <a-row class="form-row" :gutter="8">
            <a-col :lg="6"><a-form-item label="家庭纯收入情况" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag placeholder="家庭纯收入情况" :triggerChange="true" v-decorator="['jtcsrqk', {}]" dict-code="bkbpy_jtcsrqk" disabled/>
            </a-form-item></a-col>
            <a-col :lg="6"><a-form-item label="借款人还款意愿" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag placeholder="借款人还款意愿" :triggerChange="true" v-decorator="['jkrhkyy', {}]" dict-code="bkbpy_jkrhkyy" disabled/>
            </a-form-item></a-col>
            <a-col :lg="6"><a-form-item label="借款人本金逾期" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag placeholder="借款人本金逾期" :triggerChange="true" v-decorator="['jkrbjyq', {}]" dict-code="bkbpy_jkrbjyq" disabled/>
            </a-form-item></a-col>
            <a-col :lg="6"><a-form-item label="借款人利息逾期" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag placeholder="借款人利息逾期" :triggerChange="true" v-decorator="['jkrlxyq', {}]" dict-code="bkbpy_jkrlxyq" disabled/>
            </a-form-item></a-col>
          </a-row>

          <a-row class="form-row" :gutter="8">
            <a-col :lg="6"><a-form-item label="房屋价值情况" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag placeholder="房屋价值情况" :triggerChange="true" v-decorator="['fwjzqk', {}]" dict-code="bkbpy_fwjzqk" disabled/>
            </a-form-item></a-col>
            <a-col :lg="6"><a-form-item label="大宗耐用消费品" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag placeholder="大宗耐用消费品情况" :triggerChange="true" v-decorator="['dznyxfpqk', {}]" dict-code="bkbpy_dznyxfpqk" disabled/>
            </a-form-item></a-col>
            <a-col :lg="6"><a-form-item label="农机具情况" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag placeholder="农机具情况" :triggerChange="true" v-decorator="['njjqk', {}]" dict-code="bkbpy_njjqk" disabled/>
            </a-form-item></a-col>
            <a-col :lg="6"><a-form-item label="交通运输工具" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag placeholder="交通运输工具情况" :triggerChange="true" v-decorator="['jtysgjqk', {}]" dict-code="bkbpy_jtysgjqk" disabled/>
            </a-form-item></a-col>
          </a-row>

          <!--<a-divider orientation="left" style="color: #1890FF; margin-top: -15px;"></a-divider>-->
          <a-row class="form-row">
            <a-col :lg="12"><a-form-item label="收入支出占比" :labelCol="{xs:{span:24},sm:{span:5}}" :wrapperCol="{xs:{span:24},sm:{span:19}}">
              <j-dict-select-tag placeholder="家庭总收入支出占比" :triggerChange="true" v-decorator="['jtzsr', {}]" dict-code="bkbpy_jtzsrzczb" disabled/>
            </a-form-item></a-col>

            <a-col :lg="12"><a-form-item label="存款业务往来" :labelCol="{xs:{span:24},sm:{span:5}}" :wrapperCol="{xs:{span:24},sm:{span:19}}">
              <j-dict-select-tag placeholder="存款业务往来" :triggerChange="true" v-decorator="['ckywwl', {}]" dict-code="bkbpy_ckywwlqk" disabled/>
            </a-form-item></a-col>
          </a-row>

          <a-row class="form-row">
            <a-col :lg="12"><a-form-item label="经营情况" :labelCol="{xs:{span:24},sm:{span:5}}" :wrapperCol="{xs:{span:24},sm:{span:19}}">
              <j-dict-select-tag placeholder="经营情况" :triggerChange="true" v-decorator="['jyqk', {}]" dict-code="bkbpy_jyqk" disabled/>
            </a-form-item></a-col>

            <a-col :lg="12"><a-form-item label="是否有高息借款" :labelCol="{xs:{span:24},sm:{span:5}}" :wrapperCol="{xs:{span:24},sm:{span:19}}">
              <j-dict-select-tag placeholder="在民间是否有高息借款" :triggerChange="true" v-decorator="['zmjgljk', {}]" dict-code="bkbpy_zmjgxjkqk" disabled/>
            </a-form-item></a-col>
          </a-row>

          <a-row class="form-row">
            <a-col :lg="12"><a-form-item label="社会关系状况" :labelCol="{xs:{span:24},sm:{span:5}}" :wrapperCol="{xs:{span:24},sm:{span:19}}">
              <j-dict-select-tag placeholder="社会关系状况" :triggerChange="true" v-decorator="['shgxzk', {}]" dict-code="bkbpy_shgxzk" disabled/>
            </a-form-item></a-col>

            <a-col :lg="12"><a-form-item label="其他金融机构贷款" :labelCol="{xs:{span:24},sm:{span:5}}" :wrapperCol="{xs:{span:24},sm:{span:19}}">
              <j-dict-select-tag placeholder="其他金融机构贷款情况" :triggerChange="true" v-decorator="['jrjgdkqk', {}]" dict-code="bkbpy_qtjgdkqk" disabled/>
            </a-form-item></a-col>
          </a-row>

          <a-row class="form-row">
            <a-col :lg="24"><a-form-item label="生活习惯情况" :labelCol="{xs:{span:24},sm:{span:3}}" :wrapperCol="{xs:{span:24},sm:{span:21}}">
              <j-dict-select-tag placeholder="生活习惯情况" :triggerChange="true" v-decorator="['shxgqk', {}]" dict-code="bkbpy_shxgqk" disabled/>
            </a-form-item></a-col>
          </a-row>

          <a-row class="form-row">
            <a-col :lg="24" ><a-form-item label="社会声望及荣誉" :labelCol="{xs:{span:24},sm:{span:3}}" :wrapperCol="{xs:{span:24},sm:{span:21}}">
              <j-dict-select-tag placeholder="社会声望及荣誉" :triggerChange="true" v-decorator="['shswjry', {}]" dict-code="bkbpy_shswjry" disabled/>
            </a-form-item></a-col>
          </a-row>

          <a-row class="form-row">
            <a-col :lg="24"><a-form-item label="家庭人口素质和技能" :labelCol="{xs:{span:24},sm:{span:3}}" :wrapperCol="{xs:{span:24},sm:{span:21}}">
              <j-dict-select-tag placeholder="家庭人口素质和技能" :triggerChange="true" v-decorator="['jtrkszhjn', {}]" dict-code="bkbpy_jtrkszhjn" disabled/>
            </a-form-item></a-col>
          </a-row>

          <a-divider orientation="left" style="color: #1890FF; margin-top: -15px;">评议员评议结果</a-divider>
          <a-row class="form-row" :gutter="0">
            <a-col :lg="8"><a-form-item label="评议时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-date-picker placeholder="评议时间" v-decorator="['pysj', {}]" disabled style="width: 285.76px;"/>
            </a-form-item></a-col>

            <a-col :lg="8"><a-form-item label="评议员姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input placeholder="评议员姓名" v-decorator="['pyyxm', {}]" disabled/>
            </a-form-item></a-col>

            <a-col :lg="8"><a-form-item label="评议员证件号码" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input placeholder="评议员证件号码" v-decorator="['pyyzjhm', {}]" disabled/>
            </a-form-item></a-col>

            <a-col :lg="8"><a-form-item label="评议得分" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input placeholder="评议得分(自动运算)" v-decorator="['pydf', {}]" disabled/>
            </a-form-item></a-col>

            <a-col :lg="8"><a-form-item label="信用等级" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag placeholder="信用等级(自动运算)" v-decorator="['cxd', {}]" :triggerChange="true" dict-code="bkbpy_xydj" disabled/>
            </a-form-item></a-col>

            <a-col :lg="8"><a-form-item label="建议授信额度" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input placeholder="建议授信额度(自动运算)" v-decorator="['jysxed', {}]" disabled/>
            </a-form-item></a-col>

            <a-col :lg="8"><a-form-item label="备注" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-textarea :autosize="{ minRows: 2, maxRows: 4 }" placeholder="备注" v-decorator="['bz', {}]" disabled/>
            </a-form-item></a-col>
          </a-row>

          <!--<a-divider orientation="left" style="color: #1890FF; margin-top: -15px;">评议附件</a-divider>-->

        </a-form>
      </a-card>
    </a-spin>

  </a-modal>
</template>

<script>
  import pick from 'lodash.pick'
  import AFormItem from 'ant-design-vue/es/form/FormItem'
  import { getAction, putAction } from '../../../../api/manage'
  import moment from 'moment'

  export default {
    name: 'PymxModal',
    components: { AFormItem },
    data() {
      return {
        title: '操作',
        visible: false,
        disableSubmit: true,
        confirmLoading: false,
        form: this.$form.createForm(this),
        model: {},
        zjhm: '',
        pyyzjhm: '',
        pymxInfo: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        },
        url: {
          pymxList: '/nh/nhjbxx/PymxData',
        },
      }
    },
    created() {},
    methods: {
      showModal() {
        this.visible = true
        this.form.resetFields()
        let params = { zjhm: this.zjhm, pyyzjhm: this.pyyzjhm }
        getAction(this.url.pymxList, params, this.form).then(res => {
          this.model = Object.assign({}, res.result);
          this.form.setFieldsValue(pick(this.model,
            'hyzk', 'nnqk', 'jkztqk', 'jynl', 'fwjzqk', 'dznyxfpqk', 'njjqk', 'jyqk', 'jtcsrqk', 'jtzsr', 'jkrhkyy',
            'jkrbjyq', 'jkrlxyq', 'ckywwl', 'zwqk', 'jtcygx', 'jtndlrsqk', 'jtrkszhjn', 'xyzk', 'shswjry', 'shgxzk',
            'shxgqk', 'jtysgjqk', 'zmjgljk', 'jrjgdkqk', 'pydf', 'cxd', 'jysxed', 'pysj', 'pyyxm', 'pyyzjhm', 'bz'
          ))
          // 评议时间格式化
          this.form.setFieldsValue({ pysj: this.model.pysj ? moment(this.model.pysj) : null })
        })
      },
      close() {
        this.$emit('close');
        this.visible = false;
      },
      handleCancel() {
        this.close()
      },
    }
  }
</script>