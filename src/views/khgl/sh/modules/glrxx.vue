<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <a-table bordered
           size="middle"
           rowKey="id"
           :dataSource="dataSource"
           :columns="columns"
           :pagination="ipagination"
           :loading="loading"
           @change="handleTableChange"/>
</template>

<script>
  import ARow from "ant-design-vue/es/grid/Row";
  import JSelectUserByDep from '@/components/jeecgbiz/JSelectUserByDep'
  import JDictSelectTag from '@/components/dict/JDictSelectTag'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JEllipsis from '@/components/jeecg/JEllipsis'



  export default {
    components: {
      ARow,JSelectUserByDep,JDictSelectTag,JEllipsis
    },
    name: 'glrxx',
    mixins: [JeecgListMixin],
    data() {
      return {
        // 新增时子表默认添加几行空数据
        addDefaultRowNum: 1,
        validatorRules: {
        },
        dataSource:[],
        refKeys: ['Jtxgqk'],
        activeKey: 'Jtxgqk',
        //家庭情况
          loading: false,
          columns: [

            {
              title: '证件号码',
              align:"center",
              dataIndex: 'zjhm',
            },
            {
              title: '客户姓名',
              align:"center",
              dataIndex: 'khmc',

            },
            {
              title: '性别',
              align:"center",
              dataIndex: 'xb',
            },
            {
              title: '联系方式',
              align:"center",
              dataIndex: 'lxfs',
            },
            {
              title: '年龄',
              align:"center",
              dataIndex: 'nl',
            },
            {
              title: '从事职业',
              dataIndex: 'cszy_dictText',
              align:"center",
            },
            {
              title: '工作单位',
              dataIndex: 'gzdw',
              align:"center",
            },
            {
              title: '与申请人关系',
              dataIndex: 'ysqrgx',
              align:"center",
            },
            {
              title: '婚姻状况',
              dataIndex: 'hyzk',
              align:"center",
            },
            {
              title: '常住或经营地址',
              dataIndex: 'czhjydz',
              align:"center",
            },
          ],
        url: {
          list: "sh/vShxxgl/query",
        }
      }
    },
    methods: {
      add(){
        var that = this
        that.dataSource =[];
      },


    }
  }
</script>

<style scoped>
</style>