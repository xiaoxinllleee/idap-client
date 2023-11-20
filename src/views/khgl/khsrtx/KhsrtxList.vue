<template>
  <a-card :bordered="false">
    <!-- 查询区域 Begin-->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="所属支行">
              <j-tree-select
                v-model="queryParam.sszh"
                placeholder="请选择支行查询"
                dict="hr_bas_organization,zzjc,zzbz"
                pidField="sjzzbz"
                :sszh="true"
                :showSearch="true"
                :treeDefaultExpandAll=true
                treeNodeFilterProp="title"
              >
              </j-tree-select>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="所属客户经理">
              <a-input placeholder="请输入所属客户经理" v-model="queryParam.gskhjl"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :md="6" :sm="8">
            <a-form-item label="客户名称">
              <a-input placeholder="请输入客户名称" v-model="queryParam.khmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="身份证号码">
              <a-input placeholder="请输入身份证号码" v-model="queryParam.sfzhm"></a-input>
            </a-form-item>
          </a-col>
        </template>

          <a-col :md="6" :sm="8" >
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>
    <!-- 查询区域 End-->

    <!-- 操作按钮区域 Begin-->
    <div class="table-operator">
      <a-button type="primary" icon="download" @click="handleExportXls('客户生日提醒')">导出</a-button>
      <a-button type="primary" icon="download" >发送祝福短信</a-button>
    </div>
    <!-- 操作按钮区域 End-->

    <!-- table区域-Begin -->
    <div>

      <a-table
        bordered
        ref="table"
        rowKey="id"
        size="middle"
        :columns="columns"
        :pagination="false"
        :dataSource="dataSource"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <!--字符串超长截取省略号显示-->
        <span slot="sszh" slot-scope="text">
          <j-ellipsis :value="text" :length="4"/>
        </span>
        <span slot="ssyxdy" slot-scope="text">
          <j-ellipsis :value="text" :length="6"/>
        </span>
        <span slot="sfzhm" slot-scope="text">
          <j-ellipsis :value="text" :length="6"/>
        </span>
        <span slot="address" slot-scope="text">
          <j-ellipsis :value="text" :length="6"/>
        </span>
        <span slot="xqah" slot-scope="text">
          <j-ellipsis :value="text" :length="6"/>
        </span>
        <span slot="ywhywwlqk" slot-scope="text">
          <j-ellipsis :value="text" :length="6"/>
        </span>
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a href="javascript:;" @click="handleDetail(record)">详情</a>
              </a-menu-item>
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>
      </a-table>
    </div>
    <!-- table区域-End -->

  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JEllipsis from '../../../components/jeecg/JEllipsis'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  export default {
    name: "KhsrtxList",
    mixins:[JeecgListMixin],
    components: {
      JEllipsis,JTreeSelect
    },
    data () {
      return {
        description: '客户生日提醒',
        // 表头
        columns: [
		      {
            title: '所属支行',
            align:"center",
            dataIndex: 'sszh',
            sorter: true,
            scopedSlots: { customRender: 'sszh' },
            width: 100
          },
		      {
            title: '所属营销单元',
            align:"center",
            dataIndex: 'ssyxdy',
            sorter: true,
            scopedSlots: { customRender: 'ssyxdy' },
            width: 160
          },
		      {
            title: '编号',
            align:"center",
            dataIndex: 'bh',
            width: 100
          },
		      {
            title: '档案编号',
            align:"center",
            dataIndex: 'dabh',
            width: 100
          },
		      {
            title: '客户名称',
            align:"center",
            dataIndex: 'khmc',
            width: 80
          },
		      {
            title: '身份证号码',
            align:"center",
            dataIndex: 'sfzhm',
            key: 'sfzhm',
            scopedSlots: { customRender: 'sfzhm' },
            width: 100
          },
          {
            title: '生日',
            align:"center",
            dataIndex: 'birthday',
            width: 100
          },
          {
            title: '年龄',
            align:"center",
            dataIndex: 'age',
            width: 100
          },
		      {
            title: '性别',
            align:"center",
            dataIndex: 'gender',
            filters: [
              { text: '男', value: '1' },
              { text: '女', value: '2' },
            ],
            width: 100
          },
		      {
            title: '联系方式',
            align:"center",
            dataIndex: 'lxfs',
            width: 120
          },
		      {
            title: '住址',
            align:"center",
            dataIndex: 'address',
            scopedSlots: { customRender: 'address' },
            width: 100
          },
          {
            title: '归属客户经理',
            align:"center",
            dataIndex: 'gskhjl',
            width: 120
          },

        ],
		    url: {
          list: "/api/khgl/nh",
          /*delete: "/khgl/nhxxgl/delete",
          deleteBatch: "/khgl/nhxxgl/deleteBatch",
          exportXlsUrl: "khgl/nhxxgl/exportXls",
          importExcelUrl: "khgl/nhxxgl/importExcel",*/
        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>