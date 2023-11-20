<template>
  <a-modal :title="title"
           :width="1600"
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
  name: "Ckxx",
  mixins:[JeecgListMixin],
  components: {
    JTreeSelect,JTreeSelectNotJg
  },
  data () {
    return {
      title:"存款信息",
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
          title: '存款累计(单位：元)',
          children: [
            {
              title: '余额',
              align: 'center',
              dataIndex: 'ckye'
            },
            {
              title: '月日平',
              align: 'center',
              dataIndex: 'ckrpye'
            },
            {
              title: '年日平',
              align: 'center',
              dataIndex: 'cknrpye'
            }
          ]
        },
        {
          title: '活期存款(单位：元)',
          children: [
            {
              title: '余额',
              align: 'center',
              dataIndex: 'hqckye'
            },
            {
              title: '月日平',
              align: 'center',
              dataIndex: 'hqckrpye'
            },
            {
              title: '年日平',
              align: 'center',
              dataIndex: 'hqcknrpye'
            }
          ]
        },
        {
          title: '定期存款(单位：元)',
          children: [
            {
              title: '余额',
              align: 'center',
              dataIndex: 'dqckye'
            },
            {
              title: '月日平',
              align: 'center',
              dataIndex: 'dqckrpye'
            },
            {
              title: '年日平',
              align: 'center',
              dataIndex: 'dqcknrpye'
            }
          ]
        }

      ],
    }
  },
  created () {
  },
  methods: {
    view(record){
      this.model = record
      this.visible = true

      this.queryParam.rq = record.tjrq
      this.queryParam.type = '4'
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
      +'&wgbh='+this.model.wgbh+'&type=4'
    },
    dcwktmx(){
      window.location.href = `${window._CONFIG['domianURL']}/` + 'qhywxx/qhywxx/wktmxdc?rq='+this.model.tjrq
        +'&wgbh='+this.model.wgbh+'&type=4'
    }

  }
}
</script>

<style scoped>

</style>