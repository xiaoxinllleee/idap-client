<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8"><a-form-item label="区域编码">
            <a-input placeholder="请输入区域编码" v-model="queryParam.qybm"/>
          </a-form-item></a-col>

          <a-col :md="6" :sm="8"><a-form-item label="所属机构">
            <j-tree-select placeholder="请选择支行"
                           v-model="queryParam.ssjgdm"
                           treeNodeFilterProp="title"
                           pid-field="sjywjgdm"
                           dict="v_hr_bas_organization_cmmszh, zzjc, ywjgdm"
                           :showSearch="true"
                           :treeDefaultExpandAll="true"/>
          </a-form-item></a-col>

          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8"><a-form-item label="村(街道/居委会)">
              <j-input placeholder="请输入村(街道/居委会)" v-model="queryParam.village" type="likemore"/>
            </a-form-item></a-col>

            <a-col :md="6" :sm="8"><a-form-item></a-form-item></a-col>

            <a-col :md="6" :sm="8"><a-form-item label="组">
              <j-input placeholder="请输入组名称" v-model="queryParam.organize" type="likemore"/>
            </a-form-item></a-col>

            <a-col :md="6" :sm="8"><a-form-item label="乡镇">
              <j-input placeholder="请输入乡镇名称" v-model="queryParam.town" type="likemore"/>
            </a-form-item></a-col>
          </template>

          <a-col :md="6" :sm="8" >
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px;">重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px;">
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
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('村组信息管理')">导出</a-button>
      <!--<a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>-->
      <a-button type="primary" icon="import" @click="excelImport">导入</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px;"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择
        <a style="font-weight: 600;">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px;" @click="onClearSelected">清空</a>
      </div>

      <a-table bordered
               ref="table"
               size="middle"
               rowKey="id"
               :scroll="{ y: 350 }"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
               @change="handleTableChange">
        <!--字符串超长截取省略号显示-->
        <span slot="zkhjl" slot-scope="text">
          <j-ellipsis :value="text" :length="8"/>
        </span>
        <span slot="fkhjl" slot-scope="text">
          <j-ellipsis :value="text" :length="8"/>
        </span>
        <span slot="bz" slot-scope="text">
          <j-ellipsis :value="text" :length="8"/>
        </span>
        <span slot="xzc" slot-scope="village,record" >
          <a @click="handleViewxq(record)">{{village}}</a>
        </span>

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.qybm)">
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
    <yxdygl_czxxgl-modal ref="modalForm" @ok="modalFormOk"/>
    <khgl-fjxxtj-xzc-modal ref="KhglFjxxtjXzcModal" @ok="modalFormOk"/>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
  import Yxdygl_czxxglModal from './modules/Yxdygl_czxxglModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import ExcelImport from '@/components/common/ExcelImport'
  import JInput from '../../../components/jeecg/JInput'
  import { getAction, downFile } from '@/api/manage'
  import JEllipsis from '../../../components/jeecg/JEllipsis'
  import  KhglFjxxtjXzcModal from './modules/KhglFjxxtjXzcModal'

  export default {
    name: "Yxdygl_czxxglList",
    mixins:[JeecgListMixin],
    components: {
      JEllipsis,
      Yxdygl_czxxglModal,JTreeSelect,ExcelImport,JInput,KhglFjxxtjXzcModal
    },
    data () {
      return {
        description: '村组信息管理管理页面',
        // 表头
        columns: [
          {
            title: '区域编码',
            align:"center",
            dataIndex: 'qybm',
            sorter: (a,b) => a.qydm -b.qydm,
            width: 100
          },
          {
            title: '乡镇',
            align:"center",
            dataIndex: 'town',
            width: 140
          },
          {
            title: '村(街道/居委会)',
            align:"center",
            dataIndex: 'village',
            width: 140,
            scopedSlots:{customRender:'xzc'}
          },
          {
            title: '组',
            align:"center",
            dataIndex: 'organize',
            width: 120
          },
          {
            title: '所属机构',
            align:"center",
            dataIndex: 'ssjgdm_dictText',
            width: 120
          },
          {
            title: '主客户经理',
            align:"center",
            dataIndex: 'zkhjl_dictText',
            scopedSlots: { customRender: 'zkhjl' },
            width: 120
          },
          {
            title: '辅客户经理',
            align:"center",
            dataIndex: 'fkhjl_dictText',
            scopedSlots: { customRender: 'fkhjl' },
            width: 120
          },
          {
            title: '备注',
            align:"center",
            dataIndex: 'bz',
            scopedSlots: { customRender: 'bz' },
            width: 120
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },

            width: 120
          }
        ],
        url: {
          list: "/yxdygl_czxxgl/yxdygl_czxxgl/list",
          delete: "/yxdygl_czxxgl/yxdygl_czxxgl/delete",
          deleteBatch: "/yxdygl_czxxgl/yxdygl_czxxgl/deleteBatch",
          exportXlsUrl: "yxdygl_czxxgl/yxdygl_czxxgl/exportXls",
          importExcelUrl: "yxdygl_czxxgl/yxdygl_czxxgl/importExcel",
          exportTemplateUrl: "yxdygl_czxxgl/yxdygl_czxxgl/exportTemplateXls",
        },
        isorter: {
          column: 'qybm',
          order: 'desc',
        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      excelImport(){
        let params = {}
        params.exportTemplateUrl = this.url.exportTemplateUrl
        params.importExcelUrl = this.importExcelUrl
        params.exportTemplateName = "村组信息导入模板"
        this.$refs.excelImportModal.showModal(params);
      },
      importComplete(filePath) {
        let fileName = "导入结果"
        let param = {};
        console.log("filePath")
        console.log(filePath)
        downFile("/sys/common/download/" + filePath,param).then((data)=>{
          if (!data) {
            this.$message.warning("文件下载失败")
            return
          }
          var blob = new Blob([data]);
          if('msSaveOrOpenBlob' in navigator){
            window.navigator.msSaveOrOpenBlob(blob, fileName+'.xls');
            return;
          }
          var eleLink = document.createElement('a');
          eleLink.download = fileName+'.xls';
          eleLink.style.display = 'none'
          eleLink.href = URL.createObjectURL(blob);
          document.body.appendChild(eleLink);
          eleLink.click();
          document.body.removeChild(eleLink);
        })

        this.loadData();
      },
      /*handleTableChange(pagination, filters, sorter) {
        //分页、排序、筛选变化时触发
        console.log(sorter);
        //TODO 筛选
        if (Object.keys(sorter).length > 0) {
          this.isorter.column = sorter.field;
          this.isorter.order = "ascend" == sorter.order ? "asc" : "desc"
        }
        /!*this.ipagination = pagination;*!/
        this.loadData();
      },*/

      handleViewxq :function(record) {
        this.$refs.KhglFjxxtjXzcModal.edit(record)
        this.$refs.KhglFjxxtjXzcModal.title = "详情";
        this.$refs.KhglFjxxtjXzcModal.disableSubmit = false;
      }
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>