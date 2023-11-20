<template>
  <a-modal
    :title='title'
    :width="modalWidth"
    :visible='visible'
    :confirmLoading='confirmLoading'
    @ok='handleOk'
    @cancel='handleCancel'
    cancelText='关闭'>

    <template slot="footer" v-if='opView'>
      <a-button  @click="handleCancel">关闭</a-button>
    </template>

    <a-spin :spinning='confirmLoading'>
      <a-form :form='form'>

        <a-row type="flex" justify="space-between">
          <a-col :span="6">
            <a-form-item :labelCol='labelCol' :wrapperCol='wrapperCol' label='客户姓名'>
              <a-input placeholder='客户姓名' v-decorator="['khmc', {} ]" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :labelCol='labelCol' :wrapperCol='wrapperCol' label='证件号码'>
              <a-input placeholder='证件号码' v-decorator="['zjhm', {} ]" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :labelCol='labelCol' :wrapperCol='wrapperCol' label='性别'>
              <j-dict-select-tag placeholder='性别' v-decorator="['xb', {}]" dict-code='sex' disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :labelCol='labelCol' :wrapperCol='wrapperCol' label='年龄'>
              <a-input placeholder='年龄' v-decorator="['nl', {}]" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :labelCol='labelCol' :wrapperCol='wrapperCol' label='联系方式'>
              <a-input placeholder='联系方式' v-decorator="['lxfs', {}]" disabled/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row type="flex" justify="space-between">
          <a-col :span="6">
            <a-form-item :labelCol='labelCol1' :wrapperCol='wrapperCol1' label='原所属网格'>
              <a-input placeholder='原所属网格' v-decorator="['oldSswg_dictText', {}]" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :labelCol='labelCol1' :wrapperCol='wrapperCol1' label='原户号编码'>
              <a-input placeholder='原户号编码' v-decorator="['oldHhbm', {}]" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :labelCol='labelCol1' :wrapperCol='wrapperCol1' label='原户主姓名'>
              <a-input placeholder='原户主姓名' v-decorator="['oldHzxm', {}]" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :labelCol='labelCol2' :wrapperCol='wrapperCol2' label='与原户主关系'>
              <j-dict-select-tag placeholder='与原户主关系' v-decorator="['oldYhzgx', {}]" dict-code='yhzgx' disabled/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row type="flex" justify="space-between">
          <a-col :span="6">
            <a-form-item :labelCol='labelCol1' :wrapperCol='wrapperCol1' label='新所属网格'>
              <a-input placeholder='新所属网格' v-decorator="['sswg_dictText', {}]" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :labelCol='labelCol1' :wrapperCol='wrapperCol1' label='新户号编码'>
              <a-input placeholder='新户号编码' v-decorator="['hhbm', {} ]" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :labelCol='labelCol1' :wrapperCol='wrapperCol1' label='新户主姓名'>
              <a-input placeholder='新户主姓名' v-decorator="['hzxm', {} ]" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :labelCol='labelCol2' :wrapperCol='wrapperCol2' label='与新户主关系'>
              <j-dict-select-tag placeholder='与新户主关系' v-decorator="['yhzgx', validatorRules.yhzgx ]" dict-code='yhzgx' disabled/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row type="flex" justify="space-between">
          <a-col :span="6">
            <a-form-item :labelCol="labelCol1" :wrapperCol="wrapperCol1" label="审核状态">
              <!--<j-dict-select-tag placeholder="请选择" v-decorator="['shzt', validatorRules.shzt ]" dict-code='approval_status' :trigger-change='true'/>-->
              <a-radio-group v-decorator="['shzt', validatorRules.shzt ]" @change='shztChange' :disabled='opView'>
                <a-radio value='1'>审核通过</a-radio>
                <a-radio value='2'>驳回</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :labelCol="labelCol1" :wrapperCol="wrapperCol1" label="审核批注">
              <a-textarea placeholder="请输入审核批注" v-decorator="['shpz', validatorRules.shpz ]" :row="2" :disabled='opView'/>
            </a-form-item>
          </a-col>
          <a-col :span="6"></a-col>
          <a-col :span="6"></a-col>
        </a-row>

        <a-row type="flex" justify="start">
          <a-col :span="20">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="佐证附件">
              <j-image-upload v-model="ZzfjPicList" :imageType="3" :bizPath="ZzfjUrl" text="不可上传" is-multiple disabled/>
            </a-form-item>
          </a-col>
        </a-row>

<!--        <a-form-item-->
<!--          :labelCol='labelCol'-->
<!--          :wrapperCol='wrapperCol'-->
<!--          label='录入标识'>-->
<!--          <a-input placeholder='请输入录入标识' v-decorator="['lrbz', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol='labelCol'-->
<!--          :wrapperCol='wrapperCol'-->
<!--          label='录入时间'>-->
<!--          <a-date-picker v-decorator="[ 'lrsj', {}]" />-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          :labelCol='labelCol'-->
<!--          :wrapperCol='wrapperCol'-->
<!--          label='录入人'>-->
<!--          <a-input placeholder='请输入录入人' v-decorator="['lrr', {}]" />-->
<!--        </a-form-item>-->

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { getAction, httpAction } from '@/api/manage'
import pick from 'lodash.pick'
import moment from 'moment'
import JImageUpload from '@comp/jeecg/JImageUpload.vue'

export default {
  name: 'NhjtcyXzSPModal',
  components: { JImageUpload },
  data() {
    return {
      title: '操作',
      visible: false,
      opView: false,
      modalWidth: '70%',
      model: {},
      ZzfjPicList: [],
      ZzfjUrl: 'images/khxx/',
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      labelCol1: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      labelCol2: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      wrapperCol1: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      wrapperCol2: {
        xs: { span: 24 },
        sm: { span: 14 }
      },
      confirmLoading: false,
      form: this.$form.createForm(this),
      validatorRules: {
        // khmc:{rules: [{ required: true, message: '请输入客户姓名!' }]},
        // zjhm:{rules: [{ required: true, message: '请输入证件号码!' }]},
        // hhbm:{rules: [{ required: true, message: '请输入新户号编码!' }]},
        // hzxm:{rules: [{ required: true, message: '请输入新户主姓名!' }]},
        // yhzgx:{rules: [{ required: true, message: '请输入与新户主关系!' }]},
        // zlbh:{rules: [{ required: true, message: '请输入佐证附件编号!' }]},
        shzt: { rules: [{ required: true, message: '请选择审核状态!' }] },
        shpz: { rules: [{ required: true, message: '请输入审核批注!' }] }
      },
      url: {
        add: 'khxxgl/khflgl/nhjtcyXzSP/add',
        edit: 'khxxgl/khflgl/nhjtcyXzSP/edit',
        queryJtcyFjxx: '/nhxxgl/nhzzzlxxb/queryNhZzfjxx',
      }
    }
  },
  created() {
  },
  methods: {
    add() {
      this.edit({})
    },
    edit(record) {
      console.log('record',record)
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, 'khmc', 'zjhm', 'xb', 'nl', 'lxfs', 'oldHhbm', 'oldSswg_dictText', 'oldHzxm', 'oldYhzgx', 'hhbm', 'sswg_dictText', 'hzxm', 'yhzgx', 'shzt', 'shpz'))
        //时间格式化
        //this.form.setFieldsValue({ lrsj: this.model.lrsj ? moment(this.model.lrsj) : null })
        if (!this.opView) {
          //审核状态 初始值 赋为空
          this.form.setFieldsValue({ shzt: undefined })
        }
      })
      if (record) {
        this.queryZzfjxx('2',record.id)
      }
    },
    close() {
      this.opView = false
      this.ZzfjPicList = []
      this.$emit('close')
      this.visible = false
    },
    handleOk() {
      const that = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
          let formData = Object.assign(this.model, values)
          //时间格式化
          //formData.lrsj = formData.lrsj ? formData.lrsj.format() : null
          console.log(formData)
          that.confirmLoading = true
          httpAction(this.url.edit, formData, 'PUT').then((res) => {
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
    handleCancel() {
      this.close()
    },
    /**
     * 审核状态 改变监听事件
     *
     * @param value
     */
    shztChange: function(value) {
      this.form.setFieldsValue({ shzt: value?value:undefined })
    },
    /**
     * 查询 农户家庭成员佐证附件
     *
     * @param zzlx 佐证类型（1 户主 2 家庭成员）
     * @param id
     */
    queryZzfjxx: function(zzlx,id) {
      let that = this
      let parameter = {
        'zzlx': zzlx,
        'id': id,
      }
      getAction(that.url.queryJtcyFjxx, parameter).then((res) => {
        if (res.success && res.result !== null) {
          console.info('家庭成员佐证附件',res.result)
          for (let i = 0; i < res.result.length; i++) {
            // if (res.result[i].zllx === '3') {
            //   that.ZzfjPicList.push(res.result[i])
            // }
            that.ZzfjPicList.push(res.result[i])
          }
        } else {
          that.ZzfjPicList = []
        }
      }).catch((error) => {
        console.error("户主佐证附件获取失败！",error)
      }).finally(() => {
      })
    },
  }
}
</script>

<style lang='less' scoped>

</style>