<template>
  <a-modal :title="title"
           :width="800"
           :visible="visible"
           :confirmLoading="confirmLoading"
           :keyboard="false"
           :maskClosable="false"
           @ok="handleOk"
           @cancel="handleCancel"
           cancelText="关闭">

    <a-row class="form-row">
      <a-col :span="12">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="确认状态">
          <a-select default-value="确认" @change="handleChange" style="width: 100%">
            <a-select-option :value="1">确认</a-select-option>
            <a-select-option :value="0">未确认</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="12"></a-col>
    </a-row>

    <a-row class="form-row">
      <a-col :span="12">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="定价编号">
          <a-input placeholder="定价编号" v-model="this.model.djid" style="width: 100%" disabled/>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="定价年份">
          <a-input placeholder="定价年份" v-model="this.model.djnf" style="width: 100%" disabled/>
        </a-form-item>
      </a-col>
    </a-row>

    <a-row class="form-row">
      <a-col :span="12">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="证件号码">
          <a-input placeholder="证件号码" v-model="this.model.zjhm" style="width: 100%" disabled/>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户名称">
          <a-input placeholder="disabled" v-model="this.model.khmc" style="width: 100%" disabled/>
        </a-form-item>
      </a-col>
    </a-row>

    <a-row class="form-row">
      <a-col :span="12">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="定价得分">
          <a-input-number placeholder="定价得分" v-model="this.model.dfhj" style="width: 100%" disabled/>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="对用档次LPR利率">
          <a-input-number placeholder="对用档次LPR利率" v-model="this.model.lprll" :precision="4" style="width: 100%;"
                          :formatter="value => `${value}%`" :parser="value => value.replace('%','')" disabled/>
        </a-form-item>
      </a-col>
    </a-row>

    <a-row class="form-row">
      <a-col :span="12">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="优惠前LPR基点">
          <a-input-number placeholder="优惠前LPR基点" v-model="this.model.jdbp" :precision="2" style="width: 100%;" disabled/>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="优惠前执行利率">
          <a-input-number placeholder="优惠前执行利率" v-model="this.model.zxll" :precision="4" style="width: 100%;"
                          :formatter="value => `${value}%`" :parser="value => value.replace('%','')" disabled/>
        </a-form-item>
      </a-col>
    </a-row>

    <a-row class="form-row">
      <a-col :span="12">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="优惠后LPR基点">
          <a-input-number placeholder="优惠后LPR基点" v-model="this.model.yhhjdbp" :precision="2" style="width: 100%;" disabled/>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="优惠后执行利率">
          <a-input-number placeholder="优惠后执行利率" v-model="this.model.yhhZxll6" :precision="4" style="width: 100%;"
                          :formatter="value => `${value}%`" :parser="value => value.replace('%','')" disabled/>
        </a-form-item>
      </a-col>
    </a-row>

    <a-row class="form-row">
      <a-col :span="12">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="优惠后最终LPR基点">
          <a-input-number placeholder="优惠后最终LPR基点" v-model="this.model.yhhLprjd7" :precision="2" style="width: 100%;" disabled/>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="优惠后最终执行利率">
          <a-input-number placeholder="优惠后最终执行利率" v-model="this.model.yhhzxll" :precision="4" style="width: 100%;"
                          :formatter="value => `${value}%`" :parser="value => value.replace('%','')" disabled/>
        </a-form-item>
      </a-col>
    </a-row>

    <a-row class="form-row">
      <a-col :span="12">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="备注">
          <a-textarea placeholder="备注" v-model="this.model.note" style="width: 100%" @change="NoteChange"/>
        </a-form-item>
      </a-col>
      <a-col :span="12"></a-col>
    </a-row>

  </a-modal>
</template>

<script>
  import { httpAction,postAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "SureModal",
    components: {},
    data () {
      return {
        title: "利率定价确认",
        visible: false,
        model: {},
        addData: {},
        spzt: '1',
        note: '',
        confirmLoading: false,
        labelCol: {
          sm: {span: 11},
        },
        wrapperCol: {
          sm: {span: 12},
        },
        url: {
          updateSpzt: "/dklldj/lldjjs/updateSpzt",
        }
      }
    },
    created () {},
    methods: {
      handleChange(value) {
        console.info('确认状态已改变',value)
        this.spzt = value
      },
      NoteChange(value) {
        console.info('备注',value)
        this.note = value.data
      },
      add() {
        this.edit({});
      },
      edit(record) {
        this.visible = true
        this.model = Object.assign(record)
        console.info('this.model',this.model)
        this.model.djnf = record.djnf.substr(0, 4)
        var lprll = this.model.lprll
        lprll = Number(lprll).toFixed(4)
        var yhhjdbp = this.model.yhhjdbp
        yhhjdbp = Number(yhhjdbp).toFixed(4)
        var yhhzxll = Number(lprll) + Number(yhhjdbp / 100)
        yhhzxll = Number(yhhzxll).toFixed(4)
        console.info('优惠后执行利率',yhhzxll,'%')
        this.$set(this.model,'yhhZxll6',yhhzxll)
        var yhhzzzxll = this.model.yhhzxll
        yhhzzzxll = Number(yhhzzzxll).toFixed(4)
        var yhhzzjdbp = (yhhzzzxll - lprll) * 100
        yhhzzjdbp = Number(yhhzzjdbp).toFixed(4)
        console.info('优惠后最终执行利率',yhhzzjdbp)
        this.$set(this.model,'yhhLprjd7',yhhzzjdbp)
      },
      handleOk() {
        var djid =  this.model.djid
        var note =  this.note
        var spzt =  this.spzt
        let data = {
          'djid': djid,
          'note': note,
          'spzt': spzt
        }
        console.info('请求参数：',data)
        this.confirmLoading = true
        postAction(this.url.updateSpzt, data).then((res) => {
         if (res.success) {
           this.$message.success(res.message)
           this.$emit('ok');
         } else {
           this.$message.warning(res.message,5)
         }
        }).finally(() => {
         this.confirmLoading = false
         this.close()
        })
      },

      handleCancel() {
        this.close()
      },
      close() {
        this.visible = false
        this.$emit('ok')
      },
    }
  }
</script>

<style lang="less" scoped>
</style>