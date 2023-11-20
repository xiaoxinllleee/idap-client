<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

      <!-- 子表单区域 -->

          <j-editable-table
            :ref="refKeys[0]"
            :loading="Cams_Zcsx_NhfxxxTable.loading"
            :columns="Cams_Zcsx_NhfxxxTable.columns"
            :dataSource="dataSource_fcqkxx"
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
    name: 'Fcqkxx',
    mixins: [JEditableTableMixin],
    data() {
      return {
        // 新增时子表默认添加几行空数据
        addDefaultRowNum: 1,
        validatorRules: {
        },
        fcqkxx:[],
        dataSource_fcqkxx:[],
        refKeys: ['Fcqkxx'],
        activeKey: 'Fcqkxx',
        //房产情况
        Cams_Zcsx_NhfxxxTable: {
          loading: false,
          columns: [
            {
              title: '户号编码',
              key: 'hhbm',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '客户姓名',
              key: 'khmc',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '证件号码',
              key: 'zjhm',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '房产编码',
              key: 'fcbm',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '房产位置',
              key: 'fcwz',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '房产面积',
              key: 'fcmj',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '房产价格(元)',
              key: 'fcjz',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '房产性质',
              key: 'fcxz',
              type: FormTypes.select,
              defaultValue: '',
              placeholder: '请输入${title}',
              dictCode: 'khgl_fcxz'
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
        this.$refs.Fcqkxx.getValues((error, values) => {
          this.fcqkxx=values
          console.log(this.fcqkxx)
        })
        //this.$emit("getC",this.jtxgqk)
      }


    }
  }
</script>

<style scoped>
</style>