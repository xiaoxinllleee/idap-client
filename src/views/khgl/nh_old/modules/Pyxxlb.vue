<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
<div>
      <!-- 子表单区域 -->
  <a-table bordered
           ref="table"
           size="middle"
           :loading="PyxxglTable.loading"
           :columns="PyxxglTable.columns"
           :dataSource="PyxxglTable.dataSource"
           rowKey="id"
           @change="handleTableChange"
           :pagination="ipagination"
           :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"/>
  <span slot="operation" slot-scope="text,record">
                <a @click="handleEditPyxx(record)">编辑</a>
     <a-divider type="vertical"/>
     <a-dropdown>
       <a class="ant-dropdown-link">更多<a-icon type="down"/></a>
       <a-menu slot="overlay">
         <a-menu-item>
           <a-popconfirm  title="确定删除吗?" @confirm="() => handleDeletePyxx(record.id)">
             <a>删除</a>
           </a-popconfirm>
         </a-menu-item>
       </a-menu>
     </a-dropdown>
  </span>
</div>

</template>

<script>
  import { JEditableTableMixin } from '@/mixins/JEditableTableMixin'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import ARow from "ant-design-vue/es/grid/Row";
  import JSelectUserByDep from '@/components/jeecgbiz/JSelectUserByDep'
  import JDictSelectTag from '@/components/dict/JDictSelectTag'



  export default {
    components: {
      ARow,JSelectUserByDep,JDictSelectTag
    },
    name: 'Pyxxlb',
    mixins: [JEditableTableMixin,JeecgListMixin],
    data() {
      return {
        // 新增时子表默认添加几行空数据
        addDefaultRowNum: 1,
        validatorRules: {
        },
        refKeys: ['Pyxxlb'],
        activeKey: 'Pyxxlb',
        //房产情况
        PyxxglTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '评议员姓名',
              align: "center",
              dataIndex: 'pyyxm',
            },

            {
              title: '评议人证件号',
              align: "center",
              dataIndex: 'pyyzjhm',
            },
            {
              title: '评议得分',
              align: "center",
              dataIndex: 'pydf',

            },
            {
              title: '诚信度',
              align: "center",
              dataIndex: 'cxd',

            },
            {
              title: '建议额度',
              align: "center",
              dataIndex: 'jysxed',

            },
            {
              title: '评议类型',
              align: "center",
              dataIndex: 'pylx',

            },
            {
              title: '操作',
              dataIndex: 'action',
              align:"center",
              scopedSlots: { customRender: 'action' },
              fixed: "right",
              width: 130
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