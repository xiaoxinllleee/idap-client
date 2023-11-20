<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8"><a-form-item label="所属支行">
            <j-tree-select placeholder="请选择所属支行" v-model="queryParam.xzzbz"
                           dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ" pidField="sjzzbz" :treeDefaultExpandAll="true" :show-search="true"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="所属营销单元">
            <j-dict-select-tag placeholder="请选择所属营销单元" v-model="queryParam.ssyxdy"
                               dictCode="YXDYGL_EJYXDYGL,DYMC,DYBH" :show-search="true"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="交接前所属支行">
            <j-tree-select placeholder="请选择交接前所属支行" v-model="queryParam.yzzbz"
                           dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ" pidField="sjzzbz" :treeDefaultExpandAll="true" :show-search="true"/>
          </a-form-item></a-col>

          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8"><a-form-item></a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="客户名称">
              <j-input placeholder="请输入客户名称" v-model="queryParam.khmc"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"/>
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
      <!--<a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button type="primary" icon="download" @click="handleExportXls('客户交接日志管理')">导出</a-button>
      <!--<a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>-->
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择
        <a style="font-weight: 600">{{ selectedRowKeys.length }} </a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table bordered
               ref="table"
               size="middle"
               rowKey="id"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               @change="handleTableChange">
        <!--<span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多<a-icon type="down"/></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>-->
      </a-table>
    </div>
    <!-- table区域-end -->
  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JInput from '../../../components/jeecg/JInput'
  import JTreeSelect from '../../../components/jeecg/JTreeSelect'

  export default {
    name: "KhjjrzglList",
    mixins:[JeecgListMixin],
    components: {
      JTreeSelect,
      JInput,
    },
    data () {
      return {
        description: '客户交接日志管理管理页面',
        // 表头
        columns: [
          {
            title: '所属营销单元',
            align: "center",
            dataIndex: 'ssyxdy_dictText',
            width: 120
          },
          {
            title: '客户名称',
            align: "center",
            dataIndex: 'khmc',
            width: 100
          },
          {
            title: '证件号码',
            align: "center",
            dataIndex: 'zjhm',
            width: 120
          },
          {
            title: '交接前所属支行',
            align: "center",
            dataIndex: 'yzzbz_dictText',
            width: 120
          },
          {
            title: '交接前客户经理',
            align: "center",
            dataIndex: 'ykhjl_dictText',
            width: 100
          },
          {
            title: '交接后所属支行',
            align: "center",
            dataIndex: 'xzzbz_dictText',
            width: 120
          },
          {
            title: '交接后客户经理',
            align: "center",
            dataIndex: 'xkhjl_dictText',
            width: 100
          },
          {
            title: '交接人',
            align: "center",
            dataIndex: 'createBy',
            width: 100
          },
          {
            title: '交接时间',
            align: "center",
            dataIndex: 'createTime',
            width: 120,
            customRender: function(text) {
              return !text ? "":(text.length>10 ? text.substr(0,10) : text)
            }
          },
        ],
        url: {
          list: "/khgl.khjjrzgl/khjjrzgl/list",
          //delete: "/khgl.khjjrzgl/khjjrzgl/delete",
          //deleteBatch: "/khgl.khjjrzgl/khjjrzgl/deleteBatch",
          exportXlsUrl: "khgl.khjjrzgl/khjjrzgl/exportXls",
          //importExcelUrl: "khgl.khjjrzgl/khjjrzgl/importExcel",
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