<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

      <!-- 子表单区域 -->
          <j-editable-table
            :ref="refKeys[0]"
            :loading="Cams_Zcsx_NhjyqkTable.loading"
            :columns="Cams_Zcsx_NhjyqkTable.columns"
            :dataSource="dataSource_jyqkxx"
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
    name: 'Jyqk',
    mixins: [JEditableTableMixin],
    data() {
      return {
        // 新增时子表默认添加几行空数据
        addDefaultRowNum: 1,
        validatorRules: {
        },
        jyqkxx:[],
        dataSource_jyqkxx:[],
        refKeys: ['jyqkxx'],
        activeKey: 'jyqkxx',
        //房产情况
        Cams_Zcsx_NhjyqkTable: {
          loading: false,
          columns: [
            {
              title: '项目类型',
              key: 'xmlx',
              type: FormTypes.select,
              defaultValue: '',
              placeholder: '请输入${title}',
              dictCode: 'xmlx',
            },
            {
              title: '项目情况',
              key: 'xmqk',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '项目年收入(元)',
              key: 'xmnsr',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '项目年支出(元)',
              key: 'xmnzc',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
            },
            {
              title: '项目净收入(元)',
              key: 'xmjsr',
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
        this.$refs.jyqkxx.getValues((error, values) => {
          this.jyqkxx=values
          console.log(this.jyqkxx)
        })
        //this.$emit("getC",this.jtxgqk)
      }


    }
  }
</script>

<style scoped>
</style>