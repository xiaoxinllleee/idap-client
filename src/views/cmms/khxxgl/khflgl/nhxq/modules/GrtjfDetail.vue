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
          key: 'rowIndex',
          width: 60,
          align: "center",
          customRender: function (t, r, index) {
            return parseInt(index) + 1;
          }
        },
        {
          title: '数据日期',
          align: "center",
          dataIndex: 'sjrq'
        },
        {
          title: '客户姓名',
          align: "center",
          dataIndex: 'khxm'
        },
        {
          title: '身份证',
          align: "center",
          dataIndex: 'sfz'
        },
        {
          title: '类型',
          align: "center",
          dataIndex: 'lx_dictText'
        },
        {
          title: '输入方式',
          align: "center",
          dataIndex: 'srfs_dictText'
        },
        {
          title: '数据来源',
          align: "center",
          dataIndex: 'sjly'
        },
        {
          title: '多少g',
          align: "center",
          dataIndex: 'jf'
        },
        {
          title: '多少次',
          align: "center",
          dataIndex: 'dsc'
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