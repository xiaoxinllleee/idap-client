<template>
  <a-modal :title="title"
           :width="1600"
           :visible="visible"
           @cancel="handleCancel"
           @ok="handleCancel"
  >
      <a-row  v-if="model.pylx == '0'">
      <a-col :lg="16" v-for="item in dictOptions">
        <a-checkbox :label="item.text" :value="item.value" :checked="item.check">{{ item.text }}</a-checkbox>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :lg="12">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol"  label="评议员姓名">
          <a-input  v-model="model.pyyxm" />
        </a-form-item>
      </a-col>
      <a-col :lg="12">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="评议员证件号">
          <a-input  v-model="model.pyyzjhm" />
        </a-form-item>
      </a-col>
      <a-col :lg="12">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="备注">
          <a-input  v-model="model.bz" />
        </a-form-item>
      </a-col>
      <a-col :lg="12">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="评议时间">
          <a-input  v-model="model.pysj" />
        </a-form-item>
      </a-col>
    </a-row>

  </a-modal>


</template>

<script>
import JTreeSelect from '@comp/jeecg/JTreeSelect'
import JTreeSelectNotJg from '@comp/jeecg/JTreeSelectNotJg'
import pick from 'lodash.pick'
import moment from 'moment'
import { httpAction,getAction } from '@api/manage'

export default {
  name: "BysxqkModal",
  components: {
    JTreeSelect,JTreeSelectNotJg
  },
  data () {
    return {
      title:"不予授信情形",
      visible: false,
      dictOptions:[],
      result:[],
      model: {},
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },

    }
  },
  created () {
  },
  methods: {
    view(record){
      this.model = record
      console.log("view")
      this.visible = true
      let bysxqx = record.bysxqx.split(',')
      var params = null
      getAction(`/sys/dict/getDictItems/py_bysxqx`,params).then((res) => {
        if (res.success) {
          let js = res.result;
          let result2 = []
          for (let i = 0; i < js.length; i++) {
            let flag = true
            for (let j = 0; j < bysxqx.length; j++) {
              if (js[i].value == bysxqx[j]){
                result2.push({"text":js[i].text,"value":js[i].value,"check":true})
                flag = false;
              }
            }
            if (flag){
              result2.push({"text":js[i].text,"value":js[i].value,"check":false})
            }
          }
          this.dictOptions = result2;
        }
      })

    },
    close () {
      this.visible = false;
    },
    handleCancel () {
      this.close()
    },


  }
}
</script>

<style scoped>

</style>