<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

      <!-- 子表单区域 -->
          <j-editable-table
            :ref="refKeys[0]"
            :loading="Cams_Zcsx_NhfzqkTable.loading"
            :columns="Cams_Zcsx_NhfzqkTable.columns"
            :dataSource="dataSource_fzqkxx"
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
    name: 'Fzqk',
    mixins: [JEditableTableMixin],
    data() {
      return {
        // 新增时子表默认添加几行空数据
        addDefaultRowNum: 1,
        validatorRules: {
        },
        fzqkxx:[],
        dataSource_fzqkxx:[],
        refKeys: ['fzqkxx'],
        activeKey: 'fzqkxx',
        //房产情况
        Cams_Zcsx_NhfzqkTable: {
          loading: false,
          columns: [
            {
              title: '借款方式',
              key: 'jkfs',
              type: FormTypes.select,
              defaultValue: '',
              placeholder: '请输入${title}',
              dictCode: 'jkfs',
            },

            {
              title: '债权人',
              key: 'zqr',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },

            {
              title: '借款金额(元)',
              key: 'jkje',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },

            {
              title: '借款说明',
              key: 'jksm',
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
        this.$refs.fzqkxx.getValues((error, values) => {
          this.fzqkxx=values
          console.log(this.fzqkxx)
        })
        //this.$emit("getC",this.jtxgqk)
      }


    }
  }
</script>

<style scoped>
</style>