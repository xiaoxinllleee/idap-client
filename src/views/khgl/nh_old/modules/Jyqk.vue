<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

      <!-- 子表单区域 -->
  <a-table size="middle"
           :pagination="false"
           :columns="Cams_Zcsx_NhjyqkTable.columns"
           :dataSource="dataSource_jyqkxx"
           bordered>
    <template v-for="jyqkcolname in ['xmlx', 'xmqk','xmnsr','xmnzc']" :slot="jyqkcolname" slot-scope="text, record, index"><template >
      <a-input style="margin: -5px 0" :value="text" @change="e => handjtszqkChange(e.target.value, record.key, jyqkcolname)"/>
    </template></template>
  </a-table>

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
        Cams_Zcsx_NhjyqkTable:{
          loading: false,
          columns: [
            {
              title: '项目类型',
              key: 'xmlx',
              align: "center",
              dataIndex: 'xmlx',
              scopedSlots: { customRender: 'xmlx'},
              width: 100,
              placeholder: '请输入${title}',
            },

            {
              title: '项目情况',
              key: 'xmqk',
              align: "center",
              dataIndex: 'xmqk',
              scopedSlots: { customRender: 'xmqk'},
              width: 100,
              placeholder: '请输入${title}',
            },
            {
              title: '项目年收入(元)',
              key: 'xmnsr',
              align: "center",
              dataIndex: 'xmnsr',
              scopedSlots: { customRender: 'xmnsr'},
              width: 100,
              placeholder: '请输入${title}',
            },
            {
              title: '项目年支出(元)',
              key: 'xmnzc',
              align: "center",
              dataIndex: 'xmnzc',
              scopedSlots: { customRender: 'xmnzc'},
              width: 100,
              placeholder: '请输入${title}',
            },

            {
              title: '项目净收入(元)',
              key: 'xmjsr',
              type: FormTypes.input,
              dataIndex: 'xmjsr',
              align: "center",
              width: 100,
              placeholder: '请输入${title}',
            },
          ]
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
      },

      //家庭收支情况
      handjtszqkChange(value, key, column) {
        const newData = [...this.jtszqkTable.dataSource];
        console.log(newData)
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
          target[column] = value;
          //汇总收入合计
          newData[0].srHj = parseInt(newData[0].srZz == null ? '0' : newData[0].srZz )+parseInt(newData[0].srYz == null ? '0' : newData[0].srYz )+
            parseInt(newData[0].srLw ==null? '0' : newData[0].srLw ) + parseInt(newData[0].srGsy==null ? '0' : newData[0].srGsy) +
            parseInt(newData[0].srQtsr == null ? '0' : newData[0].srQtsr )
          //汇总支出合计
          newData[0].zcHj = parseInt(newData[0].zcJy == null ? '0' : newData[0].zcJy )+ parseInt(newData[0].zcYl==null ? '0' : newData[0].zcYl)+
            parseInt(newData[0].zcYlao == null ? '0' : newData[0].zcYlao )+parseInt(newData[0].zcSccb ==null? '0' : newData[0].zcSccb ) +
            parseInt(newData[0].zcRcsh == null ? '0' : newData[0].zcRcsh )+parseInt(newData[0].zcQtzc == null ? '0' : newData[0].zcQtzc )
          //家庭净收入
          newData[0].jtjsr = newData[0].srHj - newData[0].zcHj
          this.jtszqkTable.dataSource = newData;
          console.log("----------")
          console.log( this.jtszqkTable.dataSource)
          console.log("----------")
        }
      },

    }
  }
</script>

<style scoped>
</style>