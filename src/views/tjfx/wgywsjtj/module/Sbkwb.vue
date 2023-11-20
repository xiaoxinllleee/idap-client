<template>
  <a-modal :title="title"
           :width="1200"
           :visible="visible"
           @cancel="handleCancel"
           @ok="handleCancel"
  >
    <a-button style="margin-bottom: 10px" @click="dcmx">导出明细</a-button>
    <a-button style="margin: 0 0 10px 10px" @click="dcwktmx">导出未开通明细</a-button>
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
  name: "Fjxx",
  mixins:[JeecgListMixin],
  components: {
    JTreeSelect,JTreeSelectNotJg
  },
  data () {
    return {
      title:"外部社保卡",
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
      url:{
        list:'/wgtjfx/wgxxtj/jbxxlist',
      },
      columns: [
        { title: '网格名称', dataIndex: 'wgbh_dictText' },
        { title: '客户名称', dataIndex: 'khmc' },
        { title: '证件号码', dataIndex: 'zjhm' },
        { title: '银行名称', dataIndex: 'yhmc' },
        { title: '银行卡号', dataIndex: 'yhkh' },
        { title: '卡状态', dataIndex: 'kzt' },
        { title: '医保用卡记录', dataIndex: 'ybykjl' },
        { title: '疑似风险卡', dataIndex: 'ysfxk' },
        { title: '联系电话', dataIndex: 'lxdh' },
        { title: '联系地址', dataIndex: 'lxdz' },
        { title: '单位', dataIndex: 'dw' },
        { title: '网点名称', dataIndex: 'wdmc' }
      ],
    }
  },
  created () {
  },
  methods: {
    view(record){
      this.model = record
      this.visible = true

      this.queryParam.wgbh = record.wgbh
      this.queryParam.cs = '4'
      this.loadData(1)

    },
    close () {
      this.visible = false;
    },
    handleCancel () {
      this.close()
    },
    dcmx(){
      window.location.href = `${window._CONFIG['domianURL']}/` + 'qhywxx/qhywxx/mxdc?wgbh='+this.model.wgbh+'&type=sbkwb'
    },
    dcwktmx(){
      window.location.href = `${window._CONFIG['domianURL']}/` + 'qhywxx/qhywxx/wktmxdc?wgbh='+this.model.wgbh+'&type=sbkwkt'
    }


  }
}
</script>

<style scoped>

</style>