<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构代码">
              <!--<j-tree-select placeholder="请选择机构代码"
                             v-model="queryParam.jgdm"
                             treeNodeFilterProp="title"
                             dict="V_HR_BAS_ORGANIZATION_CMMS,ZZJC,ywjgdm" pidField="sjywjgdm"
                             :sszh="true"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>-->
              <j-tree-select placeholder="请选择支行" v-model="queryParam.jgdm"
                             dict="v_hr_bas_organization_cmms,zzjc,ywjgdm" pidField="sjywjgdm"
                             treeNodeFilterProp="title"
                             :showSearch="false" :treeDefaultExpandAll="true" :filterTreeNode="true" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="开票日期">
              <a-range-picker @change="onChangeBeginday" v-model="queryParam.kprq"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="货物或应税劳务、服务名称">
              <a-input placeholder="请输入货物或应税劳务、服务名称" v-model="queryParam.fwmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="发票号码">
              <a-input placeholder="请输入发票号码" v-model="queryParam.fphm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="发票代码">
              <a-input placeholder="请输入发票代码" v-model="queryParam.hydm"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="价税合计金额">
                <a-input-number placeholder="Minimum" v-model="queryParam.jshj_begin"
                                style="width: 40%; text-align: center" :min="0"/>
                <a-input placeholder="~"
                         style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                         disabled/>
                <a-input-number placeholder="Maximum" v-model="queryParam.jshj_end"
                                style="width: 40%; text-align: center; border-left: 0" :min="0"/>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="销售方单位名称">
                <a-input placeholder="请输入销售方单位名称" v-model="queryParam.xsfdwmc"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="列账项目名称">
                <a-input placeholder="请输入列账项目名称" v-model="queryParam.lzxmmc"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="经办人">
                <a-input placeholder="请输入经办人" v-model="queryParam.jbr"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="记账人">
                <a-input placeholder="请输入记账人" v-model="queryParam.jzr"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="是否电子发票">
                <a-select placeholder="全部" v-model="queryParam.sfdzfp">
                  <a-select-option value="1">
                    是
                  </a-select-option>
                  <a-select-option value="2">
                    否
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </template>
          <!--<a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>-->
          <a-button type="primary" @click="searchQueryAdmin" icon="search" v-has="`zzsfpxx:adminQuery`">管理员查询</a-button>
          <a-button type="primary" @click="searchQuery" icon="search" style="margin-left: 8px">查询</a-button>
          <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
          <a @click="handleToggleSearch" style="margin-left: 8px">
            {{ toggleSearchStatus ? '收起' : '展开' }}
            <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
          </a>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'zzsfpxx:add'">新增</a-button>
      <a-button :loading="exportLoading" icon="download" @click="handleExportXls('增值税发票信息')" v-has="'zzsfpxx:exportXls'">导出</a-button>
      <a-button icon="import" @click="excelImport" v-has="'zzsfpxx:import'">导入</a-button>
      <!--<a-button :loading="exportLoading" icon="download" @click="handleExportXlsAdmin('增值税发票信息')" v-has="'zzsfpxx:adminExportXls'">管理员导出</a-button>-->

    </div>

    <!-- table区域-begin -->
    <div>
      <!--<div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>-->

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

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'zzsfpxx:edit'">编辑</a>

          <a-divider type="vertical"/>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)" v-has="'zzsfpxx:delete'">
                  <a>删除</a>
                </a-popconfirm>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <zzsfpxx-modal ref="modalForm" @ok="modalFormOk"></zzsfpxx-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
  import ZzsfpxxModal from './modules/ZzsfpxxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import ExcelImport from '@/components/common/ExcelImport'
  import { filterObj } from '@/utils/util'
  import {deleteAction, downFile, getAction} from '@/api/manage'
  import moment from 'moment'

  export default {
    name: 'ZzsfpxxList',
    mixins: [JeecgListMixin],
    components: {
      ZzsfpxxModal, JTreeSelect, ExcelImport, moment
    },
    data () {
      return {
        description: '增值税发票信息管理页面',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: 'center',
            customRender: function (t, r, index) {
              return parseInt(index) + 1
            }
          },
          {
            title: '机构代码',
            align: 'center',
            dataIndex: 'jgdm'
          },
          {
            title: '机构名称',
            align: 'center',
            dataIndex: 'jgdm_dictText'
          },
          {
            title: '开票日期',
            align: 'center',
            dataIndex: 'kprq'
          },
          {
            title: '发票号码',
            align: 'center',
            dataIndex: 'fphm'
          },
          {
            title: '发票代码',
            align: 'center',
            dataIndex: 'hydm'
          },
          {
            title: '货物或应税劳务、服务名称',
            align: 'center',
            dataIndex: 'fwmc'
          },
          {
            title: '价税合计金额',
            align: 'center',
            dataIndex: 'jshj'
          },

          {
            title: '开票地区',
            align: 'center',
            dataIndex: 'kpdq'
          },
          {
            title: '销售方单位名称',
            align: 'center',
            dataIndex: 'xsfdwmc'
          },
          {
            title: '列账项目名称',
            align: 'center',
            dataIndex: 'lzxmmc'
          },
          {
            title: '是否电子发票',
            align: 'center',
            dataIndex: 'sfdzfp_dictText'
          },
          {
            title: '备注',
            align: 'center',
            dataIndex: 'remarks'
          },
          {
            title: '经办人',
            align: 'center',
            dataIndex: 'jbr'
          },
          {
            title: '记账人',
            align: 'center',
            dataIndex: 'jzr'
          },

          {
            title: '录入人',
            align: 'center',
            dataIndex: 'lrr'
          },
          {
            title: '录入时间',
            align: 'center',
            dataIndex: 'lrsj'
          },
          {
            title: '修改人',
            align: 'center',
            dataIndex: 'xgr'
          },
          {
            title: '修改时间',
            align: 'center',
            dataIndex: 'xgsj'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            width: '100px',
            scopedSlots: { customRender: 'action' },
          }
        ],
        url: {
          list: '/zzsfpxx/zzsfpxx/list',
          delete: '/zzsfpxx/zzsfpxx/delete',
          deleteBatch: '/zzsfpxx/zzsfpxx/deleteBatch',
          exportXlsUrl: 'zzsfpxx/zzsfpxx/exportXls',
          importExcelUrl: 'zzsfpxx/zzsfpxx/importExcel',
          exportTemplateUrl: '/zzsfpxx/zzsfpxx/exportTemplateXls',
        },
        exportTemplateName: '增值税发票信息导入模板',
        adminOpration: 'false'
      }
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      }
    },
    methods: {
      handleAdd: function () {
        this.$refs.modalForm.add()
        this.$refs.modalForm.title = '新增'
        this.$refs.modalForm.disableSubmit = false
        this.$refs.modalForm.disabled = false
      },
      handleEdit (record) {
        this.$refs.modalForm.edit(record)
        this.$refs.modalForm.title = '编辑'
        this.$refs.modalForm.disableSubmit = false
        this.$refs.modalForm.disabled = true
      },
      onChangeBeginday: function (value, dateString) {
        let kprqString = dateString
        this.queryParam.kprq_begin = kprqString[0]
        this.queryParam.kprq_end = kprqString[1]
      },
      getQueryParams () {
        var param = Object.assign({}, this.queryParam, this.isorter)
        param.field = this.getQueryField()
        param.pageNo = this.ipagination.current
        param.pageSize = this.ipagination.pageSize
        delete param.kprq
        return filterObj(param)
      },
      handleDelete: function (record) {
        console.log(record)
        if (!this.url.delete) {
          this.$message.error('请设置url.delete属性!')
          return
        }
        var that = this
        deleteAction(that.url.delete, record).then((res) => {
          if (res.success) {
            that.$message.success(res.message)
            that.loadData()
          } else {
            that.$message.warning(res.message)
          }
        })
      },

      searchQueryAdmin: function () {
        this.adminOpration = 'true'
        this.loadData(1);
      },
      loadData(arg) {
        if (!this.url.list) {
          this.$message.error("请设置url.list属性!")
          return
        }
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1;
        }
        var params = this.getQueryParams();//查询条件
        var flag = false
        if (this.adminOpration === 'true') {
          flag = true
        }
        params.flag = flag
        console.info(params)
        this.loading = true;
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records;
            this.ipagination.total = res.result.total;
            this.loading = false;
          } else {
            this.dataSource = [];
            this.ipagination.total = 0;
            this.loading = false;
          }
          if (res.code === 510) {
            this.$message.warning(res.message,5)
            this.loading = false;
          }
          this.loading = false;
        })
      },

      /*handleExportXlsAdmin: function (filename) {
        this.adminOpration = 'true'
        this.handleExportXls(filename);
      },*/

      handleExportXls(fileName) {
        if (!fileName || typeof fileName != "string") {
          fileName = "导出文件"
        }
        let kprq_begin = ''
        let kprq_end = ''
        let param = Object.assign({}, this.queryParam)
        if (this.queryParam.kprq_begin !== undefined && this.queryParam.kprq_begin !== null) {
          kprq_begin = moment(param.kprq_begin).format("YYYY-MM-DD")
        }
        if (this.queryParam.kprq_end !== undefined && this.queryParam.kprq_end !== null) {
          kprq_end = moment(param.kprq_end).format("YYYY-MM-DD")
        }
        param.kprq_begin=kprq_begin;
        param.kprq_end=kprq_end;
        delete param.kprq
        if (this.selectedRowKeys && this.selectedRowKeys.length > 0) {
          param['selections'] = this.selectedRowKeys.join(",")
          param['rowKey'] = this.rowKey
        }
        let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()));
        param.paramsStr = paramsStr
        console.log("导出参数", param)
        this.exportLoading = true
        downFile(this.url.exportXlsUrl, param).then((data) => {
          if (!data) {
            this.$message.warning("文件下载失败")
            return
          }
          var blob = new Blob([data]);
          if ('msSaveOrOpenBlob' in navigator) {
            window.navigator.msSaveOrOpenBlob(blob, fileName + '.xls');
            return;
          }
          var eleLink = document.createElement('a');
          eleLink.download = fileName + '.xls';
          eleLink.style.display = 'none'
          eleLink.href = URL.createObjectURL(blob);
          document.body.appendChild(eleLink);
          eleLink.click();
          document.body.removeChild(eleLink);
          this.exportLoading = false
        })
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>