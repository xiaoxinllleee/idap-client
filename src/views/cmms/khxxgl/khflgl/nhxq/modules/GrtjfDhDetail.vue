<template>
  <a-modal :title="title"
           :width="1450"
           :visible="visible"
           :confirmLoading="confirmLoading"
           :okButtonProps="{ props: {disabled: true} }"
           :destroyOnClose="true"
           @cancel="handleCancel"
           cancelText="关闭">
  <a-table
    ref="table"
    size="middle"
    bordered
    :rowKey="(record,index)=>{return index}"
    :columns="columns"
    :dataSource="infoList"
  />
  </a-modal>
</template>

<script>
import JTreeSelect from '@comp/jeecg/JTreeSelect'
import JTreeSelectNotJg from '@comp/jeecg/JTreeSelectNotJg'
import JDictRadioTag from '@comp/dict/JDictRadioTag'
import pick from 'lodash.pick'
import moment from 'moment'
import { httpAction,getAction } from '@api/manage'

export default {
  name: "GrtjfDetail",
  components: {
    JTreeSelect, JTreeSelectNotJg, JDictRadioTag
  },
  data() {
    return {
      confirmLoading: false,
      title: '详情',
      visible: false,
      infoList: [],
      columns: [
        {
          title: '#',
          dataIndex: '',
          key:'rowIndex',
          width:60,
          align:"center",
          customRender:function (t,r,index) {
            return parseInt(index)+1;
          }
        },
        {
          title: '年份',
          align:"center",
          dataIndex: 'nf'
        },
        {
          title: '证件号码',
          align:"center",
          dataIndex: 'zjhm'
        },
        {
          title: '姓名',
          align:"center",
          dataIndex: 'khmc'
        },
        {
          title: '兑换积分',
          align:"center",
          dataIndex: 'dhjf'
        },
      ],
    }
  },
  methods: {
    edit(list) {
      this.visible = true;
      this.infoList = list
    },
    handleCancel() {
      this.close()
    },
    close() {
      this.$emit('close')
      this.visible = false
    }
  }
}
</script>

<style scoped>

</style>