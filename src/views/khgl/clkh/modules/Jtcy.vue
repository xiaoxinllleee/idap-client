<template>
  <a-card class="card" :bordered="false">
    <!--<a-list-item class="DefaultListItem" term="家庭成员信息">家庭成员信息</a-list-item>-->
    <a-divider style="margin-top: 5px; margin-bottom: 5px;"/>
    <!--<a-table size="middle"
             :columns="columns"
             :dataSource="data"
             :pagination="false">
      <template :slot="col"
                v-for="(col, i) in ['ykhgx', 'cyxm', 'cyzjhm', 'cylxdh', 'bz']"
                slot-scope="text, record, index">
        &lt;!&ndash;<a-tooltip title="必填项"
                   :defaultVisible="false"
                   :overlayStyle="{ color: 'red' }">&ndash;&gt;
          <a-input :key="col"
                   :value="text"
                   :placeholder="columns[i].title"
                   v-if="record.editable"
                   @change="e => handlerRowChange(e.target.value, record.id, col)"
                   style="margin: -5px 0;"/>
          <template v-else>{{ text }}</template>
        &lt;!&ndash;</a-tooltip>&ndash;&gt;
      </template>

      <template slot="operation" slot-scope="text, record, index">

        <template v-if="record.editable">
         <span v-if="record.isNew">
           <a @click="saveRow(record.id,record.cyzjhm)">添加</a>
           <a-divider type="vertical"/>
           <a-popconfirm title="是否要删除此行？" @confirm="removeRow(record.id)"><a>删除</a></a-popconfirm>
         </span>
         <span v-else>
           <a @click="saveRow(record.id, record.cyzjhm)">保存</a>
           <a-divider type="vertical"/>
           <a @click="cancelEditRow(record.id)">取消</a>
         </span>
        </template>

        <span v-else>
          <a @click="editRow(record.id)">编辑</a>
          <a-divider type="vertical"/>
          <a-popconfirm title="是否要删除此行？" @confirm="removeRow(record.id)"><a>删除</a></a-popconfirm>
        </span>
      </template>

    </a-table>
    <a-button style="width: 100%; margin-top: 16px; margin-bottom: 15px;" type="dashed" icon="plus" @click="newRow">新增成员</a-button>-->

    <a-table bordered
             rowKey="id"
             size="middle"
             :columns="columns"
             :dataSource="dataSources"
             :loading="loading"
             :pagination="ipagination">
      <span slot="bz" slot-scope="text, record">
        <j-ellipsis :value="text" :length="15"/>
      </span>
    </a-table>
  </a-card>
</template>

<script>
  import JEllipsis from '../../../../components/jeecg/JEllipsis'

  export default {
    name: 'jtcy',
    components: { JEllipsis },
    // 家庭成员
    data () {
      return {
        dataSources: [],
        columns: [
          {
            title: '与客户关系',
            key: 'ykhgx',
            align: "center",
            dataIndex: 'ykhgx',
            width: 100,
          },
          {
            title: '成员姓名',
            key: 'cyxm',
            align: "center",
            dataIndex: 'cyxm',
            width: 100,
          },
          {
            title: '成员证件类型',
            key: 'cyzjlx',
            align: "center",
            dataIndex: 'cyzjlx',
            width: 150,
          },
          {
            title: '成员证件号码',
            key: 'cyzjhm',
            align: "center",
            dataIndex: 'cyzjhm',
            width: 150,
          },
          {
            title: '成员联系电话',
            key: 'cylxdh',
            align: "center",
            dataIndex: 'cylxdh',
            width: 100,
          },
          {
            title: '备注',
            key: 'bz',
            align: "center",
            dataIndex: 'bz',
            scopedSlots: { customRender: 'bz' },
            width: 150,
          },
        ],
      }
    },
    methods: {
      // 家庭成员新增一行
      // newRow () {
      //   // 通过时间戳生成 UUID
      //   let uuid = Math.round(new Date().getTime()).toString();
      //   this.dataSources.push({
      //     id: uuid,
      //     ykhgx: '',
      //     cyxm: '',
      //     cyzjhm: '',
      //     cylxdh: '',
      //     bz: '',
      //     editable: true,
      //     isNew: true
      //   })
      // },
      // 家庭成员移除一行
      // removeRow (key) {
      //   const newData = this.data.filter(item => item.id !== key)
      //   this.data = newData
      // },
      // 家庭成员保存一行
      // saveRow (key, cyzjhm) {
      //   const newData = [...this.data]
      //   let check = this.data.filter(item => item.id != key && item.cyzjhm===cyzjhm)
      //   if(check.length > 0) {
      //     this.$message.error("已经存在的家庭成员证件号码，请确认！")
      //     return false
      //   }
      //   let target = this.data.filter(item => item.id === key)[0]
      //   if (target) {
      //     target.editable = false
      //     target.isNew = false
      //     this.data = newData
      //   }
      // },
      // editRow (key) {
      //   const newData = [...this.data]
      //   let target = newData.filter(item => item.id === key)[0]
      //   if(target) {
      //     target.editable = !target.editable
      //     this.data = newData
      //   }
      // },
      // handlerRowChange (value, key, column) {
      //   const newData = [...this.data]
      //   const target = newData.filter(item => key === item.id)[0]
      //   if (target) {
      //     target[column] = value
      //     this.data = newData
      //   }
      // },
      // cancelEditRow (key) {
      //   const newData = [...this.data]
      //   let target = this.data.filter(item => item.id === key)[0]
      //   if (target) {
      //     target.editable = false
      //     this.data = newData
      //   }
      // },
      // filter(inputValue, path) {
      //   return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
      // },
    }
  }
</script>

<style scoped>
  .ant-card-wider-padding .ant-card-body {
    padding: 8px 32px;
  }
  .DefaultListItem {
    color: #1890FF;
    font-weight: 500;
    font-size: 14px;
  }
</style>