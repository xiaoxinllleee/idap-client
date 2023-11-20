<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

      <!-- 子表单区域 -->
          <j-editable-table
            :ref="refKeys[0]"
            :loading="Cams_Zcsx_NhzcqkTable.loading"
            :columns="Cams_Zcsx_NhzcqkTable.columns"
            :dataSource="dataSource_zcqkxx"
            :maxHeight="300"
            :rowNumber="true"
            :rowSelection="true"
            :actionButton="true">
          </j-editable-table>

</template>

<script>

  import moment from 'moment'
  import pick from 'lodash.pick'
  import { FormTypes } from '@/utils/JEditableTableUtil'
  import { JEditableTableMixin } from '@/mixins/JEditableTableMixin'
  import ARow from "ant-design-vue/es/grid/Row";
  import JSelectUserByDep from '@/components/jeecgbiz/JSelectUserByDep'
  import JDictSelectTag from '@/components/dict/JDictSelectTag'



  export default {
    components: {
      ARow,JSelectUserByDep,JDictSelectTag,
    },
    name: 'Zcfzqk',
    mixins: [JEditableTableMixin],
    data() {
      return {
        // 新增时子表默认添加几行空数据
        addDefaultRowNum: 1,
        validatorRules: {
        },
        zcfzqk:[],
        dataSource_zcqkxx:[],
        refKeys: ['zcfzqk'],
        activeKey: 'zcfzqk',
        //房产情况
        Cams_Zcsx_NhzcqkTable: {
          loading: false,
          columns: [
            {
              title: '资产类型',
              key: 'zclx',
              type: FormTypes.select,
              defaultValue: '',
              dictCode: 'zclx',
              placeholder: '请输入${title}',
            },
            {
              title: '资产说明',
              key: 'zcsm',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '资产数量',
              key: 'zcsl',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '资产价值(元)',
              key: 'zcjz',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },

          ],
        },
        url: {
          add: "/gzap.rwxf/gzapRwxfJxz/add",
          edit: "/gzap.rwxf/gzapRwxfJxz/edit",
          gzapRwxf_Rwgl: {
            list: '/gzap.rwxf/gzapRwxfJxz/queryGzapRwxf_RwglByMainId'
          },
        }
      }
    },
    methods: {
      edit() {
        this.$refs.zcfzqk.getValues((error, values) => {
          this.zcfzqk=values
          console.log(this.zcfzqk)
        })
        //this.$emit("getC",this.jtxgqk)
      }


    }
  }
</script>

<style scoped>
</style>