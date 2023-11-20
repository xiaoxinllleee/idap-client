<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <!--<a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="业务机构">
              <a-input placeholder="请输入业务机构" v-model="queryParam.ywjg"></a-input>
            </a-form-item>
          </a-col>-->
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="业务机构">
              <j-tree-select placeholder="请选择业务机构"
                             v-model="queryParam.ywjg"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :sszh="true"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="卡号">
              <a-input placeholder="请输入卡号" v-model="queryParam.kh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="客户名称">
                <a-input placeholder="请输入客户名称" v-model="queryParam.khmc"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="卡状态标志">
                <a-select placeholder="全部" v-model="queryParam.kztbz">
                  <a-select-option value="0">
                    正常
                  </a-select-option>
                  <a-select-option value="1">
                    因逾期而停用卡片
                  </a-select-option>
                  <a-select-option value="2">
                    过期未续卡片
                  </a-select-option>
                  <a-select-option value="3">
                    因未激活而关闭
                  </a-select-option>
                  <a-select-option value="4">
                    银行止付卡片
                  </a-select-option>
                  <a-select-option value="5">
                    持卡人申请停卡
                  </a-select-option>
                  <a-select-option value="6">
                    欺诈
                  </a-select-option>
                  <a-select-option value="7">
                    发卡行误发附卡
                  </a-select-option>
                  <a-select-option value="8">
                    因怀疑套现而管制卡
                  </a-select-option>
                  <a-select-option value="9">
                    更换卡面
                  </a-select-option>
                  <a-select-option value="10">
                    持卡人请求关闭
                  </a-select-option>
                  <a-select-option value="11">
                    卡片丢失
                  </a-select-option>
                  <a-select-option value="12">
                    邮件退回
                  </a-select-option>
                  <a-select-option value="13">
                    未收到卡片
                  </a-select-option>
                  <a-select-option value="14">
                    拣到的卡片挂失
                  </a-select-option>
                  <a-select-option value="15">
                    持卡人请求关闭
                  </a-select-option>
                  <a-select-option value="16">
                    发卡行误发卡片
                  </a-select-option>
                  <a-select-option value="17">
                    被偷
                  </a-select-option>
                  <a-select-option value="18">
                    TEST
                  </a-select-option>
                  <a-select-option value="19">
                    授权监控止付
                  </a-select-option>
                  <a-select-option value="20">
                    贷后管理信用差止付
                  </a-select-option>
                  <a-select-option value="21">
                    损坏交回
                  </a-select-option>
                </a-select>
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'djkdksjmx:add'">新增</a-button>
      <a-button :loading="exportLoading" icon="download" @click="handleExportXls('贷记卡贷款数据明细')" v-has="'djkdksjmx:exportXls'">导出</a-button>
      <!--<a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl"
                @change="handleImportExcel">
        <a-button  icon="import" v-has="'djkdksjmx:import'">导入</a-button>
      </a-upload>-->
      <a-button icon="import" @click="excelImport" v-has="'djkdksjmx:import'">导入</a-button>

<!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl"-->
<!--                @change="handleImportExcel">-->
<!--        <a-button type="primary" icon="import">导入</a-button>-->
<!--      </a-upload>-->
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
        rowKey=""
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{x:3000}"
        @change="handleTableChange">

        <span slot="zjhm" slot-scope="text"><j-ellipsis :value="text" :length="17"></j-ellipsis></span>
        <span slot="jtzz" slot-scope="text"><j-ellipsis :value="text" :length="17"></j-ellipsis></span>

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'djkdksjmx:edit'">编辑</a>
          <a-divider type="vertical"/>
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)" v-has="'djkdksjmx:delete'">
                  <a>删除</a>
            </a-popconfirm>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <djkdksjmx-modal ref="modalForm" @ok="modalFormOk"></djkdksjmx-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
  import DjkdksjmxModal from './modules/DjkdksjmxModal'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JEllipsis from "@/components/jeecg/JEllipsis";
  import ExcelImport from '@/components/common/ExcelImport'
  import {deleteAction} from '@/api/manage'

  export default {
    name: "DjkdksjmxList",
    mixins: [JeecgListMixin],
    components: {
      DjkdksjmxModal,
      JTreeSelect,
      JEllipsis,
      ExcelImport
    },
    data() {
      return {
        description: '贷记卡贷款数据明细管理页面',
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
            dataIndex: 'ywjg',
            width: 120
          },
          {
            title: '业务机构名称',
            align: "center",
            dataIndex: 'ywjg_dictText',
            width: 120
          },
          {
            title: '卡号',
            align: "center",
            dataIndex: 'kh',
            width: 200
          },
          {
            title: '卡种类',
            align: "center",
            dataIndex: 'kzl_dictText',
            width: 100
          },
          {
            title: '证件类型',
            align: "center",
            dataIndex: 'zjlx_dictText',
            width: 120
          },
          {
            title: '证件号码',
            align: "center",
            dataIndex: 'zjhm',
            scopedSlots: {customRender: 'zjhm'},
            width: 180
          },
          {
            title: '客户名称',
            align: "center",
            dataIndex: 'khmc',
            width: 100
          },
          {
            title: '性别',
            align: "center",
            dataIndex: 'xb_dictText',
            width: 80
          },
          {
            title: '婚姻状况',
            align: "center",
            dataIndex: 'hyzk_dictText',
            width: 100
          },
          {
            title: '家庭住址',
            align: "center",
            dataIndex: 'jtzz',
            scopedSlots: {customRender: 'jtzz'},
            width: 200
          },
          {
            title: '联系电话',
            align: "center",
            dataIndex: 'sjhm',
            width: 140
          },
          {
            title: '发放日期',
            align: "center",
            dataIndex: 'fkrq',
            width: 120
          },
          {
            title: '到期日期',
            align: "center",
            dataIndex: 'dqrq',
            width: 120
          },
          {
            title: '授信金额',
            align: "center",
            dataIndex: 'sxje',
            width: 120
          },
          {
            title: '透支本金',
            align: "center",
            dataIndex: 'tzbj',
            width: 120
          },
          {
            title: '透支余额',
            align: "center",
            dataIndex: 'tzye',
            width: 120
          },
          {
            title: '推广人工号',
            align: "center",
            dataIndex: 'tgrgh',
            width: 120
          },
          {
            title: '卡状态标志',
            align: "center",
            dataIndex: 'kztbz_dictText',
            width: 200
          },
          {
            title: '录入人',
            align: "center",
            dataIndex: 'lrr'
          },
          {
            title: '录入标识',
            align: "center",
            dataIndex: 'lrbz_dictText'
          },
          {
            title: '录入时间',
            align: "center",
            dataIndex: 'lrsj'
          },
          // {
          //   title: '员工工号',
          //   align: "center",
          //   dataIndex: 'yggh'
          // },
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            width: '150',
            fixed: "right",
            scopedSlots: {customRender: 'action'},
          }
        ],
        url: {
          list: "/djkdksjmx/djkdksjmx/list",
          delete: "/djkdksjmx/djkdksjmx/delete",
          deleteBatch: "/djkdksjmx/djkdksjmx/deleteBatch",
          exportXlsUrl: "djkdksjmx/djkdksjmx/exportXls",
          importExcelUrl: "djkdksjmx/djkdksjmx/importExcel",
          exportTemplateUrl: "/djkdksjmx/djkdksjmx/exportTemplateXls",
        },
        exportTemplateName: '贷记卡贷款数据明细导入模板'
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

      handleDelete: function (record) {
        console.log(record)
        if (!this.url.delete) {
          this.$message.error("请设置url.delete属性!")
          return
        }
        var params = {
          'kh': record.kh,
          'fkrq': record.fkrq
        }
        console.info('delete params:',params)
        var that = this;
        deleteAction(that.url.delete, params).then((res) => {
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