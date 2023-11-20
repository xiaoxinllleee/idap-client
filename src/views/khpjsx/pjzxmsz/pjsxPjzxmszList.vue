<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :span="6">
            <a-form-item label="区域代码">
              <a-input placeholder="请输入区域代码" v-model="queryParam.qydm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="5">
          <a-form-item label="项目编号">
            <a-input placeholder="请输入项目编号" v-model="queryParam.xmbh"></a-input>
          </a-form-item>
        </a-col>
          <a-col :span="5">
            <a-form-item label="客户类型">
              <j-dict-select-tag placeholder="请选择是否启用" v-model="queryParam.khlx" dict-code="khlx"/>
            </a-form-item>
          </a-col>
          <a-col :span="8" >
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'pjsxPjzxmsz:add'">新增</a-button>
<!--      <a-button type="primary" icon="download" @click="handleExportXls('评级子项目设置')">导出</a-button>-->
    <!--  <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>-->
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="delee"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i>
        <span>已选择</span>
        <a style="font-weight: 600">
          {{ selectedRowKeys.length }}
        </a>
        <span>项</span>
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange">
<!--        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"-->
        <span slot="xmmc" slot-scope="text, record">
          <j-ellipsis :value="text" :length="12"/>
        </span>
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'pjsxPjzxmsz:edit'">编辑</a>
                    <a-divider type="vertical" />

          <a-popconfirm title="确定删除吗?" @confirm="() => delee(record)" v-has="'pjsxPjzxmsz:del'">
                  <a>删除</a>
                </a-popconfirm>

<!--          <a-dropdown>-->
<!--            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>-->
<!--            <a-menu slot="overlay">-->
<!--              <a-menu-item>-->
<!--                <a-popconfirm title="确定删除吗?" @confirm="() => delee(record)">-->
<!--                  <a>删除</a>-->
<!--                </a-popconfirm>-->
<!--              </a-menu-item>-->
<!--            </a-menu>-->
<!--          </a-dropdown>-->
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <pjsxPjzxmsz-modal ref="modalForm" @ok="modalFormOk"/>

  </a-card>
</template>

<script>

  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import pjsxPjzxmszModal from './modules/pjsxPjzxmszModal'
  import {getAction, httpAction} from "../../../api/manage";
  import JEllipsis from '@/components/jeecg/JEllipsis'
  export default {
    name: "pjsxPjzxmszList",
    mixins: [JeecgListMixin],
    components: {
      pjsxPjzxmszModal,JEllipsis
    },
    data () {
      return {
        description: '评级子项目设置管理页面',
        // 表头
        columns: [
          {
            title: '区域代码',
            align:"center",
            dataIndex: 'qydm'
          },
         /* {
            title: '父项目编号',
            align:"center",
            dataIndex: 'fxmbh'
          },*/
          {
            title: '项目名称',
            align:"center",
            dataIndex: 'fxmbh_dictText'
          },
          {
            title: '项目编号',
            align:"center",
            dataIndex: 'fxmbh'
          },
          {
            title: '项目概述',
            align:"center",
            dataIndex: 'xmmc',
            scopedSlots: { customRender: 'xmmc' },
          },
          {
            title: '计算方式',
            align:"center",
            dataIndex: 'jsfs_dictText'
          },
          {
            title: '分值',
            align:"center",
            dataIndex: 'fz'
          },
          {
            title: '客户类型',
            align:"center",
            dataIndex: 'khlx_dictText'
          },
          {
            title: '备注',
            align:"center",
            dataIndex: 'bz'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
        // 请求参数
    	url: {
              list: "/pjzxmsz/pjsxPjzxmsz/list",
              delete: "/pjzxmsz/pjsxPjzxmszdelete",
              deleteBatch: "/pjzxmsz/pjsxPjzxmsz/deleteBatch",
              exportXlsUrl: "/pjzxmsz/pjsxPjzxmsz/exportXls",
              importExcelUrl: "/pjzxmsz/pjsxPjzxmsz/importExcel",
           },
        }
      },
      computed: {
        importExcelUrl: function(){
          return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
        }
      },


    methods: {
      delee(record){
        httpAction('/pjzxmsz/pjsxPjzxmsz/delete', {'khlx':record.khlx,'xmbh':record.fxmbh,"qydm":record.qydm,"jsfs":record.jsfs
        }, 'put').then((res) => {
          if (res.success) {
            this.$message.success(res.message)
            this.$emit('ok')
            this.loadData(1);
            this.close()
          } else {
            this.$message.warning(res.message,5)
          }

        })
      },
      loadData(arg) {
        if(!this.url.list){
          this.$message.error("请设置url.list属性!")
          return
        }
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1;
        }
        var params = this.getQueryParams();//查询条件
        console.info(params)
        this.loading = true;
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records;
            this.ipagination.total = res.result.total;
          }
          if(res.code===510){
            this.$message.warning(res.message,5)
          }
          this.loading = false;
        })
      },
      initDictConfig() {
      }

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>