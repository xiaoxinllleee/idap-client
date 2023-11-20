<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="信贷贷款品种">
              <j-dict-select-tag placeholder="请输入信贷贷款品种" v-model="queryParam.xddkpz" dict-code="xddkpz_one"></j-dict-select-tag>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款期限">
              <j-dict-select-tag placeholder="请输入贷款期限" v-model="queryParam.dkqx" dict-code="dkqx"></j-dict-select-tag>
            </a-form-item>
          </a-col>
          <!--<template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="综合评测得分_起">
                <a-input placeholder="请输入综合评测得分_起" v-model="queryParam.zhpcdfBegin"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="综合评测得分_止">
                <a-input placeholder="请输入综合评测得分_止" v-model="queryParam.zhpcdfEnd"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="下浮比例(%)">
                <a-input placeholder="请输入下浮比例(%)" v-model="queryParam.xfbl"></a-input>
              </a-form-item>
            </a-col>
          </template>-->
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <!--<a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>-->
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'zxllpzgl:add'">新增</a-button>
      <a-button type="primary" icon="download" :loading="exportLoading" @click="handleExportXls('执行利率配置管理')" v-has="'zxllpzgl:export'">导出</a-button>
<!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">-->
<!--        <a-button type="primary" icon="import">导入</a-button>-->
<!--      </a-upload>-->
      <a-button type="primary" icon="import" @click="excelImport" v-has="'zxllpzgl:import'">导入</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0" v-has="'zxllpzgl:batchdelete'">
        <a-menu slot="overlay" v-has="'zxllpzgl:batchdelete'">
          <a-menu-item key="1" @click="batchDel">
            <a-icon type="delete"/>删除
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px" v-has="'zxllpzgl:batchdelete'"> 批量操作
          <a-icon type="down"/>
        </a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{selectedRowKeys.length}}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table ref="table"
               size="middle"
               bordered
               :rowKey="rowKey"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
               @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'zxllpzgl:edit'">编辑</a>

          <a-divider type="vertical"/>
          <a-dropdown v-has="'zxllpzgl:delete'">
            <a class="ant-dropdown-link">更多 <a-icon type="down"/></a>
            <a-menu slot="overlay">
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
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <zxllpzgl-modal ref="modalForm" @ok="modalFormOk"></zxllpzgl-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"></excel-import>
  </a-card>
</template>

<script>
  import zxllpzglModal from './modules/zxllpzglModal.vue'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import {downFile} from "@/api/manage";
  import notification from "ant-design-vue/lib/notification";
  import ExcelImport from '@/components/common/ExcelImport'

  export default {
    name: "zxllpzglList",
    mixins: [JeecgListMixin],
    components: {
      zxllpzglModal,
      ExcelImport
    },
    data() {
      return {
        description: '执行利率配置管理页面',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: "center",
            customRender: function (t, r, index) {
              return parseInt(index) + 1;
            }
          },
          {
            title: '信贷贷款品种',
            align: "center",
            dataIndex: 'xddkpz_dictText'
          },
          {
            title: '贷款期限',
            align: "center",
            dataIndex: 'dkqx_dictText'
          },
          {
            title: '定价得分起',
            align: "center",
            dataIndex: 'zhpcdfBegin'
          },
          {
            title: '定价得分止',
            align: "center",
            dataIndex: 'zhpcdfEnd'
          },
          {
            title: '下浮比例(%)',
            align: "center",
            dataIndex: 'xfbl'
          },
          {
            title: '月执行利率(‰)',
            align: "center",
            dataIndex: 'zxllM'
          },
          {
            title: '执行利率(%)',
            align: "center",
            dataIndex: 'zxllY'
          },
          {
            title: '状态标识',
            align: "center",
            dataIndex: 'lrbz_dictText'
          },
          {
            title: '录入人',
            align: "center",
            dataIndex: 'lrr'
          },
          {
            title: '录入时间',
            align: "center",
            dataIndex: 'lrsj'
          },
          {
            title: '修改人',
            align: "center",
            dataIndex: 'xgr'
          },
          {
            title: '修改时间',
            align: "center",
            dataIndex: 'xgsj'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            scopedSlots: {customRender: 'action'},
          }
        ],
        url: {
          list: "/csszgl/zxllpzgl/list",
          delete: "/csszgl/zxllpzgl/delete",
          deleteBatch: "/csszgl/zxllpzgl/deleteBatch",
          exportXlsUrl: "csszgl/zxllpzgl/exportXls",
          importExcelUrl: "csszgl/zxllpzgl/importExcel",
          exportTemplateUrl: "csszgl/zxllpzgl/exportTemplateXls",
        },
        exportTemplateName: '执行利率配置导入模板'
      }
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      importComplete (filePath) {
        let fileName = '导入结果'
        let param = {}
        console.log('filePath:', filePath)
        downFile('/sys/common/download/' + filePath, param).then((data) => {
          if (!data) {
            notification.error({message: '系统提示', descriptions: '文件下载失败！', duration: 4})
            return
          }
          var blob = new Blob([data])
          if ('msSaveOrOpenBlob' in navigator) {
            window.navigator.msSaveOrOpenBlob(blob, fileName + '.xls')
            return
          }
          var eleLink = document.createElement('a')
          eleLink.download = fileName + '.xls'
          eleLink.style.display = 'none'
          eleLink.href = URL.createObjectURL(blob)
          document.body.appendChild(eleLink)
          eleLink.click()
          document.body.removeChild(eleLink)
        })
        this.loadData(1)
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>
