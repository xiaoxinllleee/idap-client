<template>
<div>
  <a-card>
    <form >
    <a-table bordered
             :columns="columns"
             :dataSource="dataSource"
             rowKey="id"
             @change="handleTableChange"
             :loading="loading"
             :pagination="ipagination"
             :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}">

      <span slot="detail" slot-scope="khmc,record">
          <a @click="handleKhxxEdit(record)">{{khmc}}</a>
        </span>
    </a-table>


  </form>
  </a-card>
</div>
</template>

<script>
  import JDictSelectTag from '@/components/dict/JDictSelectTag'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JEllipsis from '@/components/jeecg/JEllipsis'

  export default {
    components: {
      JDictSelectTag, JEllipsis
    },
    name: 'Jtcyxx',
    mixins: [JeecgListMixin],
    data() {
      return {
        // 新增时子表默认添加几行空数据
        dataSource: [],
        //家庭情况
        loading: false,
        columns: [
          {
            title: '户号编码',
            align:"center",
            dataIndex: 'hhbm',
          },
          {
            title: '客户姓名',
            align:"center",
            dataIndex: 'khmc',
            scopedSlots: {customRender: 'detail'},
          },
          {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm',

          },
          {
            title: '与户主关系',
            align:"center",
            dataIndex: 'yhzgx',
          },
          {
            title: '性别',
            align:"center",
            dataIndex: 'xb',
          },
          {
            title: '联系电话',
            dataIndex: 'sjhm',
            align:"center",
          }, {
            title: '存款余额',
            dataIndex: 'ckye',
            align:"center",
          },
          {
            title: '存款日均',
            dataIndex: 'ckrpye',
            align:"center",
          }, {
            title: '贷款余额',
            dataIndex: 'dkye',
            align:"center",
          }, {
            title: '表内不良余额',
            dataIndex: 'bldkye',
            align:"center",
          }, {
            title: '表外不良余额',
            dataIndex: 'bwbldkye',
            align:"center",
          },
        ],
        url: {
          list: "sh/vShxxgl/query",
        }
      }
    },

    methods: {

      /*show(res) {
        console.log("res.list")
        console.log(res.list)

      },*/
      handleKhxxEdit: function (record) {
        this.$refs.xqModalForm.edit(record);
        this.$refs.xqModalForm.title = "详情";
        this.$refs.xqModalForm.disableSubmit = false;
      },


    }
  }
</script>

<style scoped>
</style>