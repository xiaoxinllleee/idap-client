<template>

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
  import JDictSelectTag from '@/components/dict/JDictSelectTag'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JEllipsis from '@/components/jeecg/JEllipsis'

  export default {
    components: {
      JDictSelectTag, JEllipsis
    },
    name: 'frjtxx',
    mixins: [JeecgListMixin],
    data() {
      return {
        // 新增时子表默认添加几行空数据
        addDefaultRowNum: 1,
        dataSource: [],
        //家庭情况
        loading: false,
        columns: [
          {
            title: '姓名',
            align: 'center',
            dataIndex: 'khmc'
          },
          {
            title: '证件号码',
            align: 'center',
            dataIndex: 'zjhm'
          },
          {
            title: '性别',
            align: 'center',
            dataIndex: 'xb'
          },
          {
            title: '联系方式',
            align: 'center',
            dataIndex: 'lxfs'
          },
          {
            title: '年龄',
            align: 'center',
            dataIndex: 'nl'
          },
          {
            title: '与户主关系',
            dataIndex: 'yhzgx',
            align: 'center'
          },
          {
            title: '存款余额',
            dataIndex: 'ckye',
            align: 'center'
          },
          {
            title: '贷款余额',
            dataIndex: 'dkye',
            align: 'center'
          },
          {
            title: '存款年日平',
            dataIndex: 'cknrpye',
            align: 'center'
          }
        ],
      }
    },

    methods: {

      show(res) {
        console.log("res.list")
        console.log(res.list)

      }


    }
  }
</script>

<style scoped>
</style>