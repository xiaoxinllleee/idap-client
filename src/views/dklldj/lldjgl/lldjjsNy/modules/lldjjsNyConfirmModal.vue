<template>
  <a-modal
    :title="title"
    :width="1400"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    <a-row class="form-row" :gutter="16">
      <a-col :span="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="定价编号:">
          <a-input  :disabled="true" v-model="this.model.djid"/>
        </a-form-item>
      </a-col>

      <a-col :span="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="定价年份:">
          <a-input  :disabled="true" v-model="this.model.djnf"/>
        </a-form-item>
      </a-col>
    </a-row>

    <a-row class="form-row" :gutter="16">
      <a-col :span="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="证件号码:">
          <a-input  :disabled="true" v-model="this.model.zjhm"/>
        </a-form-item>
      </a-col>

      <a-col :span="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户名称:	">
          <a-input  :disabled="true" v-model="this.model.khmc"/>
        </a-form-item>
      </a-col>
    </a-row>


    <a-row class="form-row" :gutter="16">
      <a-col :span="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="定价得分:">
          <a-input  :disabled="true" v-model="this.model.djdf"/>
        </a-form-item>
      </a-col>

      <a-col :span="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="对用档次LPR利率:	">
          <a-input  :disabled="true" v-model="this.model.khmc"/>
        </a-form-item>
      </a-col>
    </a-row>


    <a-row class="form-row" :gutter="16">

      <a-col :span="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="优惠前LPR基点:">
          <a-input  :disabled="true" v-model="this.model.jzll"/>
        </a-form-item>
      </a-col>

      <a-col :span="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="优惠前执行利率:">
          <a-input  :disabled="true" v-model="this.model.fdfd"/>
        </a-form-item>
      </a-col>
    </a-row>

    <a-row class="form-row" :gutter="16">

      <a-col :span="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="优惠后LPR基点:">
          <a-input  :disabled="true" v-model="this.model.zxll"/>
        </a-form-item>
      </a-col>

      <a-col :span="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="优惠后执行利率:">
          <a-input  :disabled="true" v-model="this.model.fdfd"/>
        </a-form-item>
      </a-col>
    </a-row>

    <a-row class="form-row" :gutter="16">

      <a-col :span="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="优惠后最终LPR基点:">
          <a-input  :disabled="true" v-model="this.model.zxll"/>
        </a-form-item>
      </a-col>

      <a-col :span="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="优惠后最终执行利率:">
          <a-input  :disabled="true" v-model="this.model.yhhzzzxll"/>
        </a-form-item>
      </a-col>
    </a-row>


    <a-row class="form-row" :gutter="16">
      <a-col :span="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="确认状态：">
          <a-input v-model="this.model.qrzt" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="备注：">
          <a-input v-model="this.model.bz" />
        </a-form-item>
      </a-col>
    </a-row>


  </a-modal>
</template>

<script>
import { httpAction,postAction } from '@/api/manage'
import pick from 'lodash.pick'
import moment from "moment"
export default {
  name: "lldjjsNyConfirmModal",
  components: {

  },
  data () {
    return {
      title:"利率定价确认",
      visible: false,
      model:{},
      addData:{},
      spzt:"1",
      note:"",

      confirmLoading:false,
      labelCol: {
        sm: { span: 11 },
      },
      wrapperCol: {
        sm: { span: 12 },

      },
      url:{
        list:"/list",
        updateSpzt:"/rate/rateTszxlldjb/updateSpzt",
      }
    }
  },
  created () {
  },

  methods: {
    handleChange(value) {
      console.log(`selected ${value}`);
      this.spzt = value;
    },
    change(){
    },

    add() {
      this.edit({});
    },
    edit(record) {
      this.model = Object.assign(record);
      this.visible = true;

    },
    close() {
      this.$emit('close');
      this.visible = false;
    },

    //计算加权存款日平合计

    handleOk() {
      var djid =  this.model.djid;
      var note =  this.note;
      var spzt =  this.spzt;

      let data = {"djid":djid,"note":note,"spzt":spzt}

      postAction(this.url.updateSpzt, data).then((res) => {
        if (res.success) {
          this.$message.success(res.message);
          this.$emit('ok');
        } else {
          this.$message.warning(res.message,5);
        }
      }).finally(() => {
        this.confirmLoading = false;
        this.close();
      })
    },
    handleCancel() {
      this.close()
    },


  }
}
</script>

<style lang="less" scoped>
</style>