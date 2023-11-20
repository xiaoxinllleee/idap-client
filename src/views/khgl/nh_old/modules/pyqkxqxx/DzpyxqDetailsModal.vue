<template>
  <a-modal :title="title"
           :width="1400"
           :visible="visible"
           :confirmLoading="confirmLoading"
           :okButtonProps="{ props: {disabled: disableSubmit} }"
           :footer="null"
           :destroyOnClose="true"
           @cancel="handleCancel"
           cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-card class="card" :bordered="true">
        <a-form :form="form">

          <a-row class="form-row" :gutter="8">
            <a-col :lg="6"><a-form-item label="婚姻状况" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag placeholder="婚姻状况" :triggerChange="true" v-decorator="['hyzk', {}]" dict-code="py_hyzk" disabled/>
            </a-form-item></a-col>
            <a-col :lg="6"><a-form-item label="年龄情况" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag placeholder="年龄情况" :triggerChange="true" v-decorator="['nnqk', {}]" dict-code="py_nlqk" disabled/>
            </a-form-item></a-col>
            <a-col :lg="6"><a-form-item label="健康状态情况" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag placeholder="健康状态情况" :triggerChange="true" v-decorator="['jkztqk', {}]" dict-code="py_jkzkqk" disabled/>
            </a-form-item></a-col>
            <a-col :lg="6"><a-form-item label="经营能力" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag placeholder="经营能力" :triggerChange="true" v-decorator="['jynl', {}]" dict-code="py_jynl" disabled/>
            </a-form-item></a-col>
          </a-row>
          <a-row class="form-row" :gutter="8">
            <a-col :lg="6"><a-form-item label="房屋价值情况" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag placeholder="房屋价值情况" :triggerChange="true" v-decorator="['fwjzqk', {}]" dict-code="py_fwjz" disabled/>
            </a-form-item></a-col>
            <a-col :lg="6"><a-form-item label="大宗耐用消费品" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag placeholder="大宗耐用消费品情况" :triggerChange="true" v-decorator="['dznyxfpqk', {}]" dict-code="py_xfpqk" disabled/>
            </a-form-item></a-col>
            <a-col :lg="6"><a-form-item label="农机具情况" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag placeholder="农机具情况" :triggerChange="true" v-decorator="['njjqk', {}]" dict-code="py_njjqk" disabled/>
            </a-form-item></a-col>
            <a-col :lg="6"><a-form-item label="交通运输工具" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag placeholder="交通运输工具情况" :triggerChange="true" v-decorator="['jtysgjqk', {}]" dict-code="py_jtysgjqk" disabled/>
            </a-form-item></a-col>
          </a-row>
          <a-row class="form-row" :gutter="8">
            <a-col :lg="6"><a-form-item label="家庭纯收入情况" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag placeholder="家庭纯收入情况" :triggerChange="true" v-decorator="['jtcsrqk', {}]" dict-code="py_jtcsr" disabled/>
            </a-form-item></a-col>
            <a-col :lg="6"><a-form-item label="借款人还款意愿" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag placeholder="借款人还款意愿" :triggerChange="true" v-decorator="['jkrhkyy', {}]" dict-code="py_jkrhkyyqk" disabled/>
            </a-form-item></a-col>
            <a-col :lg="6"><a-form-item label="借款人本金逾期" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag placeholder="借款人本金逾期" :triggerChange="true" v-decorator="['jkrbjyq', {}]" dict-code="py_jkrbjyqqk" disabled/>
            </a-form-item></a-col>
            <a-col :lg="6"><a-form-item label="借款人利息逾期" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag placeholder="借款人利息逾期" :triggerChange="true" v-decorator="['jkrlxyq', {}]" dict-code="py_jkrlxyqqk" disabled/>
            </a-form-item></a-col>
          </a-row>
          <a-row class="form-row" :gutter="8">
            <a-col :lg="6"><a-form-item label="职业情况" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag placeholder="职业情况" :triggerChange="true" v-decorator="['zwqk', {}]" dict-code="py_zyqk" disabled/>
            </a-form-item></a-col>
            <a-col :lg="6"><a-form-item label="信誉状况" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag placeholder="信誉状况" :triggerChange="true" v-decorator="['xyzk', {}]" dict-code="py_xyzk" disabled/>
            </a-form-item></a-col>
            <a-col :lg="6"><a-form-item label="家庭成员关系" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag placeholder="家庭成员关系" :triggerChange="true" v-decorator="['jtcygx', {}]" dict-code="py_jtcygx" disabled/>
            </a-form-item></a-col>
            <a-col :lg="6"><a-form-item label="家庭劳动力人数" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag placeholder="家庭劳动力人数情况" :triggerChange="true" v-decorator="['jtndlrsqk', {}]" dict-code="py_jtldlrsqk" disabled/>
            </a-form-item></a-col>
          </a-row>
          <a-row class="form-row">
            <a-col :lg="12"><a-form-item label="家庭总收入、总支出占比情况" :labelCol="{xs:{span:24},sm:{span:7}}" :wrapperCol="{xs:{span:24},sm:{span:17}}">
              <j-dict-select-tag placeholder="家庭总收入、总支出占比情况" :triggerChange="true" v-decorator="['jtzsr', {}]" dict-code="py_jtzsr" disabled/>
            </a-form-item></a-col>

            <a-col :lg="12"><a-form-item label="存款业务往来情况" :labelCol="{xs:{span:24},sm:{span:5}}" :wrapperCol="{xs:{span:24},sm:{span:19}}">
              <j-dict-select-tag placeholder="存款业务往来情况" :triggerChange="true" v-decorator="['ckywwl', {}]" dict-code="py_ckywwlqk" disabled/>
            </a-form-item></a-col>
          </a-row>
          <a-row class="form-row">
            <a-col :lg="12"><a-form-item label="经营状况" :labelCol="{xs:{span:24},sm:{span:4}}" :wrapperCol="{xs:{span:24},sm:{span:20}}">
              <j-dict-select-tag placeholder="经营状况" :triggerChange="true" v-decorator="['jyqk', {}]" dict-code="py_jyzk" disabled/>
            </a-form-item></a-col>

            <a-col :lg="12"><a-form-item label="在民间是否有高息借款" :labelCol="{xs:{span:24},sm:{span:6}}" :wrapperCol="{xs:{span:24},sm:{span:18}}">
              <j-dict-select-tag placeholder="在民间是否有高息借款" :triggerChange="true" v-decorator="['zmjgljk', {}]" dict-code="py_sfgxjk" disabled/>
            </a-form-item></a-col>
          </a-row>
          <a-row class="form-row">
            <a-col :lg="12"><a-form-item label="社会关系状况" :labelCol="{xs:{span:24},sm:{span:4}}" :wrapperCol="{xs:{span:24},sm:{span:20}}">
              <j-dict-select-tag placeholder="社会关系状况" :triggerChange="true" v-decorator="['shgxzk', {}]" dict-code="py_shgxzk" disabled/>
            </a-form-item></a-col>

            <a-col :lg="12"><a-form-item label="其他金融机构贷款情况" :labelCol="{xs:{span:24},sm:{span:6}}" :wrapperCol="{xs:{span:24},sm:{span:18}}">
              <j-dict-select-tag placeholder="其他金融机构贷款情况" :triggerChange="true" v-decorator="['jrjgdkqk', {}]" dict-code="py_jrjgdkqk" disabled/>
            </a-form-item></a-col>
          </a-row>
          <a-row class="form-row">
            <a-col :lg="12"><a-form-item label="生活习惯情况" :labelCol="{xs:{span:24},sm:{span:4}}" :wrapperCol="{xs:{span:24},sm:{span:20}}">
              <j-dict-select-tag placeholder="生活习惯情况" :triggerChange="true" v-decorator="['shxgqk', {}]" dict-code="py_shxgqk" disabled/>
            </a-form-item></a-col>
            <a-col :lg="12" ><a-form-item label="社会声望及荣誉情况" :labelCol="{xs:{span:24},sm:{span:6}}" :wrapperCol="{xs:{span:24},sm:{span:18}}">
              <j-dict-select-tag placeholder="社会声望及荣誉情况" :triggerChange="true" v-decorator="['shswjry', {}]" dict-code="py_shsy" disabled/>
            </a-form-item></a-col>
          </a-row>
          <a-row class="form-row">
            <a-col :lg="12"><a-form-item label="家庭人口素质和技能状况" :labelCol="{xs:{span:24},sm:{span:6}}" :wrapperCol="{xs:{span:24},sm:{span:18}}">
              <j-dict-select-tag placeholder="家庭人口素质和技能状况" :triggerChange="true" v-decorator="['jtrkszhjn', {}]" dict-code="py_jtrkszhjnqk" disabled/>
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

          <a-row class="form-row" :gutter="0">
            <photo-view-dzpy ref="photoViewDzpy"/>
          </a-row>

        </a-form>
      </a-card>
    </a-spin>

  </a-modal>
</template>

<script>
  import pick from 'lodash.pick'
  import AFormItem from 'ant-design-vue/es/form/FormItem'
  import moment from 'moment'
  import { getAction } from '../../../../../api/manage'
  import PhotoViewDzpy from './annex/PhotoViewDzpy'

  export default {
    name: 'DzpyxqDetailsModal',
    components: { AFormItem, PhotoViewDzpy },
    data() {
      return {
        title: '操作',
        visible: false,
        disableSubmit: true,
        confirmLoading: false,
        form: this.$form.createForm(this),
        model: {},
        pymxInfo: {},
        zjhm: '',
        pylx: '',
        pyyzjhm: '',
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
          AnnexList: '/nh/nhjbxx/AnnexList',
        },
      }
    },
    created() {},
    methods: {
      showModal() {
        console.info('电子评议 :',this.pylx);
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
          // 电子评议:附件照片
          if (this.zjhm) {
            getAction(this.url.AnnexList,{"zjhm":this.zjhm}).then((res) => {
              if (res.success) {
                console.info('电子评议-附件信息 :',res.result.typeFiveFileList);
                this.$refs.photoViewDzpy.showImg(res.result.typeFiveFileList);
              }
            })
          }
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

<style lang="less" scoped>
  .ant-form .ant-form-item {
    margin-bottom: 10px;
  }
</style>