<template>
  <a-modal :title="title"
           :width="1600"
           :visible="visible"
           @cancel="handleCancel"
           @ok="handleCancel"
  >
    <a-button style="margin-bottom: 10px" @click="dcmx">导出明细</a-button>
    <a-button style="margin: 0 0 10px 10px" @click="dcwktmx" v-show="type =='1'">导出未开通明细</a-button>
    <a-table bordered
             :columns="columns"
             :dataSource="dataSource"
             rowKey="id"
             :pagination="ipagination"
             :loading="loading"
             @change="handleTableChange"
    />


  </a-modal>


</template>

<script>
import JTreeSelect from '@comp/jeecg/JTreeSelect'
import JTreeSelectNotJg from '@comp/jeecg/JTreeSelectNotJg'
import pick from 'lodash.pick'
import moment from 'moment'
import { httpAction,getAction } from '@api/manage'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'


export default {
  name: "Dkxx",
  mixins:[JeecgListMixin],
  components: {
    JTreeSelect,JTreeSelectNotJg
  },
  data () {
    return {
      title:"贷款信息",
      visible: false,
      loading:false,
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
      type:'',
      url:{
        list:'/qhywxx/qhywxx/getYwsjBySjrq',
      },
      columns: [
        {
          title: '客户姓名',
          align: 'center',
          dataIndex: 'khmc'
        },
        {
          title: '证件号码',
          align: 'center',
          dataIndex: 'zjhm'
        },
        {
          title: '贷款金额',
          align: 'center',
          dataIndex: 'dkje'
        },
        {
          title: '贷款余额',
          align: 'center',
          dataIndex: 'dkye'
        },
        {
          title: '最近贷款到期日期',
          align: 'center',
          dataIndex: 'zjdkdqrq'
        },
        {
          title: '不良贷款余额',
          align: 'center',
          dataIndex: 'bldkye'
        },
        {
          title: '表外不良贷款余额',
          align: 'center',
          dataIndex: 'bwbldkye'
        }
      ],
    }
  },
  created () {
  },
  methods: {
    view(record,val){
      this.model = record
      this.visible = true

      this.queryParam.rq = record.tjrq
      this.queryParam.type = val
      this.type = val;
      this.queryParam.wgbh = record.wgbh
      this.loadData(1)

    },
    close () {
      this.visible = false;
    },
    handleCancel () {
      this.close()
    },
    dcmx(){
      window.location.href = `${window._CONFIG['domianURL']}/` + 'qhywxx/qhywxx/mxdc?rq='+this.model.tjrq
        +'&wgbh='+this.model.wgbh+'&type='+this.type
    },
    dcwktmx(){
      window.location.href = `${window._CONFIG['domianURL']}/` + 'qhywxx/qhywxx/wktmxdc?rq='+this.model.tjrq
        +'&wgbh='+this.model.wgbh+'&type='+this.type
    }
  }
}
</script>

<style scoped>

</style>