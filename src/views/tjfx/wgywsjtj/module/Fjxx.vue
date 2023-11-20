<template>
  <a-modal :title="title"
           :width="800"
           :visible="visible"
           @cancel="handleCancel"
           @ok="handleCancel"
  >
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
      title:"附加信息",
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
        list:'/khgl.khhmc/khfjxxgl/getFjxxByWgbh',
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

      this.queryParam.wgbh = record.wgbh
      this.queryParam.type = val
      this.loadData(1)

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