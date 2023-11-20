<template>
  <a-modal :title="title"
           :visible="visible"
           :footer="null"
           width="75%"
           :confirmLoading="confirmLoading"
           :maskClosable="false"
           @cancel="handleClose">

    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="4" :sm="5">
            <a-form-item label="分配月份">
              <a-month-picker v-model="records.fpyf" style="width: 100%;"
                              :defaultValue="defaultMonthOpera" :format="monthFormat" />
            </a-form-item>
          </a-col>
          <a-input style="width:10%" hidden="hidden" v-model="records.yggh"></a-input>
          <a-input style="width:10%" disabled="disabled" placeholder="员工姓名" readonly="readonly" v-model="records.yggh_dictText"></a-input>
          <a-button type="primary" @click="getListFindBack(jgdm)" icon="search">查找存款账号接收人</a-button>
          <a-button style="margin-left: 10px" width="46px" type="primary" @click="preservation" icon="search">保存
          </a-button>
        </a-row>
      </a-form>
    </div>


    <div>


    </div>

    <!--    根据条件查询的待分配账号-->
    <a-table
      ref="table"
      size="middle"
      bordered
      rowKey="zjhm"
      :columns="columns"
      :dataSource="dataSource"
      :pagination="ipagination"
      :row-selection="rowSelection"
      :loading="loading"
    >
    </a-table>
    <!-- 表单区域 -->
    <find-back ref="findBack" @close="colseWindow" />
  </a-modal>
</template>

<script>
import { getAction, httpAction } from '@/api/manage'
import FindBack from './FindBack'
import moment from 'moment'

export default {
  name: 'CustomerInfoDetail',
  components: {
    FindBack
  },
  data () {
    return {
      defaultMonthOpera: '',
      monthFormat: 'YYYY-MM',
      loading: false,
      title: '分配存款账号',
      ipagination: {
        current: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '30'],
        showTotal: (total, range) => {
          return range[0] + '-' + range[1] + ' 共' + total + '条'
        },
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0
      },
      dataSource: [],
      // rowSelection:{
      //   type:'checkbox',
      // },
      //表头
      columns: [
        {
          title: '客户账号',
          align: 'center',
          dataIndex: 'khzh'
        },
        {
          title: '户名',
          align: 'center',
          dataIndex: 'hm'
        },
        {
          title: '证件号码',
          align: 'center',
          dataIndex: 'zjhm'
        },
        {
          title: '帐号性质',
          align: 'center',
          dataIndex: 'zhxz_dictText'
        },
        {
          title: '账户余额',
          align: 'center',
          dataIndex: 'zhye'
        },
        {
          title: '月存款日平余额',
          align: 'center',
          dataIndex: 'yzhrpye'
        },
        {
          title: '年存款日平余额',
          align: 'center',
          dataIndex: 'nzhrpye'
        }
      ],
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      records: {
        yggh_dictText: '',
        yggh: '',
        gwbz: '',
        zzbz: '',
        fpyf: '',
        gyh: '',
        khjlbz: ''
      },
      jgdm: '',
      array: [],
      url: {
        preservation: '/dfpckzhgl/ckjkptDfpckzh/preservation',
        list: '/dfpckzhgl/ckjkptDfpckzh/list',
        extract: '/dfpckzhgl/ckjkptDfpckzh/extract',
        getListFindBack: '/dfpckzhgl/ckjkptDfpckzh/getListFindBack'
      }
    }
  },
  computed: {
    rowSelection () {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          this.array = selectedRows
          console.log(this.array)
        },
        getCheckboxProps: record => ({
          props: {
            //disabled: record.name === 'Disabled User', // Column configuration not to be checked
            //name: record.name,
          }
        })
      }
    }
  },
  created () {
  },
  methods: {
    getCurrentMonth () {
      let curDate = new Date()
      let curMonth = { year: curDate.getFullYear(), month: curDate.getMonth() + 1 }
      this.defaultMonthOpera = moment(curDate)
      this.records.fpyf = moment(curDate)
    },
    preservation () {
      if (!this.records.yggh) {
        this.$message.warning('请选择存款账号接收人')
        return
      }
      if (this.array.length == 0) {
        this.$message.warning('请选择存款账号')
        return
      }
      this.records.fpyf = this.records.fpyf.format('YYYY-MM') + '-01'
      let param = {
        array: this.array,
        yggh: this.records.yggh,
        gwbz: this.records.gwbz,
        zzbz: this.records.zzbz,
        fpyf: this.records.fpyf,
        gyh: this.records.gyh,
        khjlbz: this.records.khjlbz,
        jgdm: this.records.jgdm
      }
      httpAction(this.url.preservation, param, 'post').then((res) => {
        if (res.success) {
          this.$message.success('分配成功')
        } else {
          this.$message.warning('分配失败')
        }
      })
      this.handleClose()
      this.$emit('close', 1)
    },
    colseWindow (args) {
      this.records.yggh = args.yggh
      this.records.yggh_dictText = args.yggh_dictText
      this.records.gwbz = args.gwbz
      this.records.zzbz = args.zzbz
      this.records.gyh = args.gyh
      this.records.khjlbz = args.khjlbz
      this.records.jgdm = args.ywjgdm
    },
    getListFindBack (jgdm) {
      this.$refs.findBack.init(jgdm)
    },
    handleClose () {
      this.visible = false
      this.records = {
        yggh_dictText: '',
        yggh: '',
        gwbz: '',
        zzbz: '',
        fpyf: '',
        gyh: '',
        khjlbz: '',
        jgdm: ''
      }

      this.array = []
    },
    init (params) {
      this.getCurrentMonth()
      this.jgdm = params.jgdm
      getAction(this.url.list, params).then((res) => {
        if (res.success) {
          this.dataSource = res.result.records
          this.ipagination.total = res.result.total
        } else {
          this.dataSource = []
          this.ipagination.total = 0
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