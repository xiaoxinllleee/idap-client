<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8">
            <a-form-item label="子系统名称">
              <j-input placeholder="输入子系统名称模糊查询" v-model="queryParam.xtmc"></j-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="子系统简称">
              <j-input placeholder="输入子系统简称模糊查询" v-model="queryParam.xtjc"></j-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator" style="border-top: 5px">
      <a-button @click="handleAdd" v-has="'subSystem:add'" type="primary" icon="plus">新增</a-button>
    </div>

    <!-- table区域-begin -->
    <div>
      <a-table
        ref="table"
        bordered
        size="middle"
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'subSystem:edit'">编辑</a>
          <a-divider type="vertical" v-has="'subSystem:edit'"/>
          <a-popconfirm v-has="'subSystem:delete'" title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->
    <sub-system-modal ref="modalForm" @ok="modalFormOk"></sub-system-modal>
  </a-card>
</template>

<script>
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import JInput from '@/components/jeecg/JInput'
  import SubSystemModal from './modules/SubSystemModal'

  export default {
    name: "SubSystemList",
    components: { JInput, SubSystemModal },
    mixins: [JeecgListMixin],
    data() {
      return {
        url: {
          list: "/subsystem/list",
          add: "/subsystem/add",
          delete: "/subsystem/delete",
        },
        columns: [
          {
            title: '系统简称',
            align: "center",
            dataIndex: 'xtjc',
          },
          {
            title: '系统名称',
            align: "center",
            dataIndex: 'xtmc',
          },
          {
            title: '是否启用',
            align: "center",
            dataIndex: 'sfqy_dictText',
          },
          {
            title: '排序序号',
            align: "center",
            dataIndex: 'sx',
          },
          {
            title: '操作',
            dataIndex: 'action',
            scopedSlots: {customRender: 'action'},
            align: "center",
            width: 170
          }
        ],
      }
    }
  }
</script>

<style scoped>

</style>