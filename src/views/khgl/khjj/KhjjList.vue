<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8"><a-form-item label="所属支行">
            <j-tree-select placeholder="请选择所属支行" v-model="queryParam.sszh"
                           dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ" pidField="sjzzbz"
                           :treeDefaultExpandAll="true" :show-search="true"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="所属营销单元">
            <j-dict-select-tag placeholder="请选择所属营销单元" v-model="queryParam.ssyxdy"
                               dictCode="YXDYGL_EJYXDYGL,DYMC,DYBH" :show-search="true"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="原客户经理">
            <j-input placeholder="请输入原客户经理" v-model="queryParam.ykhjl" type="likemore"/>
          </a-form-item></a-col>

          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8"><a-form-item></a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="新客户经理">
              <j-input placeholder="请输入新客户经理" v-model="queryParam.xkhjl" type="likemore"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="新营销单元">
              <j-dict-select-tag placeholder="请选择新营销单元" v-model="queryParam.xyxdy"
                                 dictCode="YXDYGL_EJYXDYGL,DYMC,DYBH" :show-search="true"/>
            </a-form-item></a-col>
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

    <!-- 操作按钮区域 -->
    <div class="table-operator">
     <!--<a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button @click="handleEdit(record)" type="primary">变更</a-button>-->
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择
        <a style="font-weight: 600;">{{ selectedRowKeys.length }} </a>项
        <a style="margin-left: 24px;" @click="onClearSelected">清空</a>
      </div>

      <a-table bordered
               ref="table"
               size="middle"
               rowKey="id"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
               @change="handleTableChange">
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">变更</a>
          <!--<a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>-->
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <khjj-modal ref="modalForm" @ok="modalFormOk"></khjj-modal>
  </a-card>
</template>

<script>
  import KhjjModal from './modules/KhjjModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '../../../components/jeecg/JTreeSelect'
  import JInput from '../../../components/jeecg/JInput'

  export default {
    name: "KhjjList",
    mixins:[JeecgListMixin],
    components: {
      JInput,
      JTreeSelect,
      KhjjModal
    },
    data () {
      return {
        description: 'KHJJ管理页面',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
          },
          {
            title: '所属支行',
            align:"center",
            dataIndex: 'sszh'
          },
          {
            title: '所属营销单元',
            align:"center",
            dataIndex: 'ssyxdy'
          },
          {
            title: '原客户经理',
            align:"center",
            dataIndex: 'ykhjl'
          },
          {
            title: '新客户经理',
            align:"center",
            dataIndex: 'xkhjl'
          },
          {
            title: '新营销单元',
            align:"center",
            dataIndex: 'xyxdy'
          },
          {
            title: '变更原因',
            align:"center",
            dataIndex: 'bgyy'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: {
              filterDropdown: 'filterDropdown',
              filterIcon: 'filterIcon',
              customRender: 'action'},
          }
        ],
        url: {
          list: "/api/khjj",
          delete: "/khgl.khjj/khjj/delete",
          deleteBatch: "/khgl.khjj/khjj/deleteBatch",
          exportXlsUrl: "khgl.khjj/khjj/exportXls",
          importExcelUrl: "khgl.khjj/khjj/importExcel",
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