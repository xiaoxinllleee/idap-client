<template>
  <a-modal :title="title"
           :visible="visible"
           :footer="null"
           width="75%"
           :confirmLoading="confirmLoading"
           :maskClosable="false"
           @cancel="handleClose">
    <!--    根据条件查询的待分配账号-->
    <a-button type="primary" @click="determine">
      确定接收人
    </a-button>
    <a-table
      ref="table"
      size="middle"
      bordered
      rowKey="yggh"
      :columns="columns"
      :dataSource="dataSource"
      :row-selection="rowSelection"
      :loading="loading"
    >
    </a-table>
  </a-modal>
</template>

<script>
import { getAction } from '@/api/manage'

export default {
  name: 'FindBack',
  components: {},
  data () {
    return {
      loading: false,
      title: '接收人',
      dataSource: [],
      // rowSelection:{
      //   type:'radio',
      // },
      //表头
      columns: [
        {
          title: '机构代码',
          align: 'center',
          dataIndex: 'ywjgdm'
        },
        {
          title: '机构名称',
          align: 'center',
          dataIndex: 'ywjgdm_dictText'
        },
        {
          title: '岗位名称',
          align: 'center',
          dataIndex: 'gwbz_dictText'
        },
        {
          title: '岗位标志',
          align: 'center',
          dataIndex: 'gwbz'
        },
        {
          title: '员工工号',
          align: 'center',
          dataIndex: 'yggh'
        },
        {
          title: '员工姓名',
          align: 'center',
          dataIndex: 'yggh_dictText'
        },
        {
          title: '入岗日期',
          align: 'center',
          dataIndex: 'rgrq'
        },
        {
          title: '离岗日期',
          align: 'center',
          dataIndex: 'lgrq'
        },
        {
          title: '柜员号',
          align: 'center',
          dataIndex: 'gyh'
        },
        {
          title: '客户经理标识',
          align: 'center',
          dataIndex: 'khjlbz'
        }
      ],
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      obj: { } ,
      url: {
        getListFindBack: '/dfpckzhgl/ckjkptDfpckzh/getListFindBack'
      }
    }
  },
  computed: {
    rowSelection () {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          this.obj=selectedRows[0];
        },
        getCheckboxProps: record => ({
          props: {
            // disabled: record.name === 'Disabled User', // Column configuration not to be checked
            //name: record.name,
          }
        }),
        type: 'radio'
      }
    }
  },
  created () {
  },
  methods: {
    handleClose () {
      this.visible = false
    },
    determine(){
      if(!this.obj){
          this.$message.warning('请选择存款账号接收人')
      }
      this.$emit("close", this.obj)
      this.visible = false
    },
    init (jgdm) {
      getAction(this.url.getListFindBack, { jgdm: jgdm }).then((res) => {
        if (res.success) {
          this.dataSource = res.result
        } else {
          this.dataSource = []
        }
        if (res.code === 510) {
          this.$message.warning(res.message,5)
        }
        this.loading = false
      })
      this.$forceUpdate()
      this.visible = true
    }
  }
}
</script>

<style scoped>

</style>