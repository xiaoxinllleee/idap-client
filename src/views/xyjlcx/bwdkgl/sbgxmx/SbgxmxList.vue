<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="入账网点">
              <j-tree-select placeholder="请选择机构代码"
                             v-model="queryParam.ywjg"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账号">
              <a-input placeholder="请输入账号" v-model="queryParam.zh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="借款人姓名">
              <a-input placeholder="请输入借款人姓名" v-model="queryParam.jkrxm"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="填报日期">
                <a-range-picker @change="onChange" v-model="queryParam.tbrq"/>
              </a-form-item>
            </a-col>

            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="证件号码">
                <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="手工计息挂息余额">
                <a-input-number placeholder="Minimum" v-model="queryParam.sgjx_begin"
                                style="width: 40%; text-align: center" :min="0" />
                <a-input placeholder="~"
                         style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                         disabled />
                <a-input-number placeholder="Maximum" v-model="queryParam.sgjx_end"
                                style="width: 40%; text-align: center; border-left: 0" :min="0" />
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="核销利息挂息余额">
                <a-input-number placeholder="Minimum" v-model="queryParam.hxlx_begin"
                                style="width: 40%; text-align: center" :min="0" />
                <a-input placeholder="~"
                         style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                         disabled />
                <a-input-number placeholder="Maximum" v-model="queryParam.hxlx_end"
                                style="width: 40%; text-align: center; border-left: 0" :min="0" />
              </a-form-item>
            </a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'sbgxmx:add'">新增</a-button>
      <a-button :loading="exportLoading" icon="download" @click="handleExportXls('收本挂息明细')" v-has="'sbgxmx:exportXls'">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl"
                @change="handleImportExcel">
        <a-button icon="import" v-has="'sbgxmx:import'">导入</a-button>
      </a-upload>
      <a-button @click="init" icon="area-chart" v-has="'sbgxmx:init'">提取</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel">
            <a-icon type="delete"/>
            删除
          </a-menu-item>
        </a-menu>
<!--        <a-button style="margin-left: 8px"> 批量操作-->
<!--          <a-icon type="down"/>-->
<!--        </a-button>-->
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
<!--      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">-->
<!--        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{-->
<!--        selectedRowKeys.length }}</a>项-->
<!--        <a style="margin-left: 24px" @click="onClearSelected">清空</a>-->
<!--      </div>-->

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{x:2400}"
        @change="handleTableChange">

        <span slot="qksm" slot-scope="text"><j-ellipsis :value="text" :length="12"></j-ellipsis></span>

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'sbgxmx:edit'">编辑</a>
          <a-divider type="vertical"/>
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)" v-has="'sbgxmx:delete'">
                  <a>删除</a>
            </a-popconfirm>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <sbgxmx-modal ref="modalForm" @ok="modalFormOk"></sbgxmx-modal>
  </a-card>
</template>

<script>
  import SbgxmxModal from './modules/SbgxmxModal'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import {deleteAction, getAction} from '@/api/manage'
  import JEllipsis from "@/components/jeecg/JEllipsis";
  import {filterObj} from '@/utils/util';

  export default {
    name: "SbgxmxList",
    mixins: [JeecgListMixin],
    components: {
      SbgxmxModal,
      JTreeSelect,
      JEllipsis
    },
    data() {
      return {
        description: '收本挂息明细管理页面',
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
            title: '业务机构',
            align: "center",
            dataIndex: 'ywjg_dictText'
          },
          {
            title: '填报日期',
            align: "center",
            dataIndex: 'tbrq'
          },
          {
            title: '账号',
            align: "center",
            dataIndex: 'zh',
            width: 180
          },
          {
            title: '借款人姓名',
            align: "center",
            dataIndex: 'jkrxm'
          },
          {
            title: '证件号码',
            align: "center",
            dataIndex: 'zjhm',
            width: 180
          },
          {
            title: '借款日期',
            align: "center",
            dataIndex: 'jkrq'
          },
          {
            title: '到期日期',
            align: "center",
            dataIndex: 'dqrq'
          },
          {
            title: '手工计息挂息金额',
            align: "center",
            dataIndex: 'gxje'
          },
          {
            title: '手工计息挂息余额',
            align: "center",
            dataIndex: 'gxye'
          },
          {
            title: '核销利息挂息金额',
            align: "center",
            dataIndex: 'hxlxgxje'
          },
          {
            title: '核销利息挂息余额',
            align: "center",
            dataIndex: 'hxlxgxye'
          },
          {
            title: '挂息金额合计',
            align: "center",
            dataIndex: 'gxjehj'
          },
          {
            title: '挂息余额合计',
            align: "center",
            dataIndex: 'gxyehj'
          },
          {
            title: '情况说明',
            align: "center",
            dataIndex: 'qksm',
            scopedSlots: {customRender: 'qksm'},
            width: 250
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            width: '150',
            fixed: 'right',
            scopedSlots: {customRender: 'action'},
          }
        ],
        url: {
          list: "/sbgxmx/sbgxmx/list",
          delete: "/sbgxmx/sbgxmx/delete",
          deleteBatch: "/sbgxmx/sbgxmx/deleteBatch",
          exportXlsUrl: "sbgxmx/sbgxmx/exportXls",
          importExcelUrl: "sbgxmx/sbgxmx/importExcel",
          init: "/sbgxmx/sbgxmx/init",
        },
        exportTemplateName: '收本挂息明细导入模板'
      }
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      handleAdd: function () {
        this.$refs.modalForm.add();
        this.$refs.modalForm.title = "新增";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.disabled = false;
      },
      handleEdit(record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "编辑";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.disabled = true;
      },

      getQueryParams() {
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        delete param.tbrq;
        return filterObj(param);
      },
      init() {
        this.loading=true;
        getAction(this.url.init).then((response) => {
          if (response.success) {
            this.$message.success('提取成功！')
            this.loadData(1);
          } else {
            this.$message.warning('提取失败！')
          }
        }).catch((error) => {
          this.$message.error('提取失败！')
        }).finally(()=>{
          this.loading=false;
        })
      },
      onChange: function(value, dateString) {
        let tbrqString = dateString
        this.queryParam.tbrq_begin = tbrqString[0]
        this.queryParam.tbrq_end = tbrqString[1]
      },
      handleDelete: function (record) {
        console.log(record)
        if (!this.url.delete) {
          this.$message.error("请设置url.delete属性!")
          return
        }
        var that = this;
        deleteAction(that.url.delete, {zh: record.zh,}).then((res) => {
          if (res.success) {
            that.$message.success(res.message);
            that.loadData();
          } else {
            that.$message.warning(res.message);
          }
        });
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>