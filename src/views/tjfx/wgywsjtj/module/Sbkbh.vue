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
      title:"我行社保卡",
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
        list:'/tjfx/vKhxxglTjfxWgywsjtj/getKjbxxListByWgbh',
      },
      columns: [
        {
          title: '卡号',
          align:"center",
          dataIndex: 'no'
        },
        {
          title: '证件号码',
          align:"center",
          dataIndex: 'customer'
        },
        {
          title: '客户名称',
          align:"center",
          dataIndex: 'name1'
        },
        {
          title: '状态',
          align:"center",
          dataIndex: 'status'
        },
        {
          title: '电话号码',
          align:"center",
          dataIndex: 'phone'
        },
        {
          title: '地址',
          align:"center",
          dataIndex: 'address1'
        },
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
      this.loadData(1)

    },
    close () {
      this.visible = false;
    },
    handleCancel () {
      this.close()
    },
    dcmx(){
      window.location.href = `${window._CONFIG['domianURL']}/` + 'qhywxx/qhywxx/mxdc?wgbh='+this.model.wgbh+'&type=sbkbh'
    },
    dcwktmx(){
      window.location.href = `${window._CONFIG['domianURL']}/` + 'qhywxx/qhywxx/wktmxdc?wgbh='+this.model.wgbh+'&type=sbkwkt'
    }

  }
}
</script>

<style scoped>

</style>