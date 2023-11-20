<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <a-table bordered
           size="middle"
           rowKey="id"
           :dataSource="dataSource_jtcy"
           :columns="Cams_Zcsx_NhjtqkTable.columns"
           :pagination="ipagination"
           :loading="Cams_Zcsx_NhjtqkTable.loading"
           @change="handleTableChange"/>
</template>

<script>

  import moment from 'moment'
  import pick from 'lodash.pick'
  import { FormTypes } from '@/utils/JEditableTableUtil'
  import { JEditableTableMixin } from '@/mixins/JEditableTableMixin'
  import ARow from "ant-design-vue/es/grid/Row";
  import JSelectUserByDep from '@/components/jeecgbiz/JSelectUserByDep'
  import JDictSelectTag from '@/components/dict/JDictSelectTag'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JEllipsis from '@/components/jeecg/JEllipsis'



  export default {
    components: {
      ARow,JSelectUserByDep,JDictSelectTag,JEllipsis
    },
    name: 'Jtxgqk',
    mixins: [JEditableTableMixin,JeecgListMixin],
    data() {
      return {
        // 新增时子表默认添加几行空数据
        addDefaultRowNum: 1,
        validatorRules: {
        },
        jtxgqk:[],
        dataSource_jtcy:[],
        refKeys: ['Jtxgqk'],
        activeKey: 'Jtxgqk',
        //家庭情况
        Cams_Zcsx_NhjtqkTable: {
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
        },
        url: {
          list: "/nh/nhjbxx/queryJtcy",
        }
      }
    },
    methods: {
      add(){
        var that = this
        that.dataSource_jtcy =[];
      },
     /* edit() {
        this.$refs.Jtxgqk.getValues((error, values) => {
          this.jtxgqk=values
          console.log(this.jtxgqk)
        })
        alert("edit")
        //this.$emit("getC",this.jtxgqk)
      }*/


    }
  }
</script>

<style scoped>
</style>