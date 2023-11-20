<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计月份">
              <a-month-picker v-model="queryParam.tjyf" placeholder="请选择统计月份"
                              style="width: 100%;"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="机构名称">
              <j-tree-select placeholder="请选择机构查询"
                             pid-field="sjywjgdm"
                             :showSearch="true"
                             treeNodeFilterProp="title"
                             v-model="queryParam.jgdm"
                             v-decorator="['jgdm', {rules: [{required: true, message: '请选择机构查询！'}]}]"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :tree-default-expand-all="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="注册证件号">
              <a-input placeholder="请输入注册证件号" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">


            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="贷款账号">
                <a-input placeholder="请输入贷款账号" v-model="queryParam.dkzh"></a-input>
              </a-form-item>
            </a-col>

          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
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
      <a-button type="primary" icon="download" @click="handleExportXls('贷款余额表')">导出</a-button>
      <a-button type="primary" icon="import" @click="excelImport">导入</a-button>

    </div>
    <!-- table区域-begin -->
    <div>
      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{ x: 6000 }"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="bz1" slot-scope="text">
          <j-ellipsis :value="text" :length="4"/>
        </span>
        <span slot="bz2" slot-scope="text">
          <j-ellipsis :value="text" :length="4"/>
        </span>
        <span slot="dktx" slot-scope="text">
          <j-ellipsis :value="text" :length="4"/>
        </span>
        <span slot="dktx1" slot-scope="text">
          <j-ellipsis :value="text" :length="4"/>
        </span>
        <span slot="dktx2" slot-scope="text">
          <j-ellipsis :value="text" :length="4"/>
        </span>
        <span slot="dktx3" slot-scope="text">
          <j-ellipsis :value="text" :length="4"/>
        </span>
        <span slot="dktx4" slot-scope="text">
          <j-ellipsis :value="text" :length="4"/>
        </span>
        <span slot="dktx5" slot-scope="text">
          <j-ellipsis :value="text" :length="4"/>
        </span>
        <span slot="dktx6" slot-scope="text">
          <j-ellipsis :value="text" :length="4"/>
        </span>
        <span slot="dktx7" slot-scope="text">
          <j-ellipsis :value="text" :length="4"/>
        </span>
        <span slot="dktx8" slot-scope="text">
          <j-ellipsis :value="text" :length="4"/>
        </span>
        <span slot="xzcz" slot-scope="text">
          <j-ellipsis :value="text" :length="4"/>
        </span>
        <span slot="jgdm_dictText" slot-scope="text">
          <j-ellipsis :value="text" :length="4"/>
        </span>
        <span slot="xxdz" slot-scope="text">
          <j-ellipsis :value="text" :length="4"/>
        </span>
        <span slot="zjhm" slot-scope="text">
          <j-ellipsis :value="text" :length="8"/>
        </span>
        <span slot="dkzh" slot-scope="text">
          <j-ellipsis :value="text" :length="8"/>
        </span>
        <span slot="jkrhyfl" slot-scope="text">
          <j-ellipsis :value="text" :length="4"/>
        </span>
        <span slot="jkrhyfl1" slot-scope="text">
          <j-ellipsis :value="text" :length="4"/>
        </span>
        <span slot="jkrhyfl2" slot-scope="text">
          <j-ellipsis :value="text" :length="4"/>
        </span>
        <span slot="jkrhyfl3" slot-scope="text">
          <j-ellipsis :value="text" :length="4"/>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <tjfxXddkyebXdxtsj-modal ref="modalForm" @ok="modalFormOk"></tjfxXddkyebXdxtsj-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"/>

  </a-card>
</template>

<script>
  import TjfxXddkyebXdxtsjModal from './modules/TjfxXddkyebXdxtsjModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import ExcelImport from '@/components/common/ExcelImport'
  import JEllipsis from '../../../../components/jeecg/JEllipsis'
  import { filterObj } from '@/utils/util';
  import { getAction,putAction,httpAction,downFile } from '@/api/manage'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JInput from '@/components/jeecg/JInput'

  export default {
    name: 'TjfxXddkyebXdxtsjList',
    mixins: [JeecgListMixin],
    components: {
      JEllipsis, TjfxXddkyebXdxtsjModal, ExcelImport,JTreeSelect,JInput
    },
    data() {
      return {
        description: '贷款余额表管理页面',
        // 表头
        columns: [
          {
            title: '统计月份',
            align: 'center',
            dataIndex: 'tjyf',
            width: 100,
            customRender: function (text) {
              return !text ? "" : (text.length > 8 ? text.substr(0, 7) : text)
            },
          },
          {
            title: '注册证件号',
            align: 'center',
            dataIndex: 'zjhm',
            scopedSlots: { customRender: 'zjhm' }
          },
          {
            title: '机构代码',
            align: 'center',
            dataIndex: 'jgdm',
          },
          {
            title: '机构名称',
            align: 'center',
            dataIndex: 'jgdm_dictText',
            scopedSlots: { customRender: 'jgdm_dictText' }
          },
          {
            title: '贷款账号',
            align: 'center',
            dataIndex: 'dkzh',
            scopedSlots: { customRender: 'dkzh' }
          },
          {
            title: '客户名称',
            align: 'center',
            dataIndex: 'khmc',
            scopedSlots: { customRender: 'khmc' }
          },
          {
            title: '贷款金额',
            align: 'center',
            dataIndex: 'dkje'
          },
          {
            title: '本金金额',
            align: 'center',
            dataIndex: 'bjye'
          },
          {
            title: '贷款日期',
            align: 'center',
            dataIndex: 'dkrq'
          },
          {
            title: '展期日期',
            align: 'center',
            dataIndex: 'zqrq'
          },
          {
            title: '到期日期',
            align: 'center',
            dataIndex: 'dqrq'
          },
          {
            title: '上次结息日',
            align: 'center',
            dataIndex: 'scjxr'
          },
          {
            title: '贷款到期前利率%',
            align: 'center',
            dataIndex: 'dkdqqlv',
            width: 140
          },
          {
            title: '五级分类状态',
            align: 'center',
            dataIndex: 'wjflzt',
            width: 120
          },
          {
            title: '客户经理',
            align: 'center',
            dataIndex: 'khjl_dictText'
          },
          {
            title: '主客户经理',
            align: 'center',
            dataIndex: 'zkhjl_dictText'
          },
          {
            title: '第一责任人',
            align: 'center',
            dataIndex: 'dyzrr_dictText'
          },
          {
            title: '行政村组',
            align: 'center',
            dataIndex: 'xzcz',
            scopedSlots: { customRender: 'xzcz' }
          },
          {
            title: '详细地址',
            align: 'center',
            dataIndex: 'xxdz',
            scopedSlots: { customRender: 'xxdz' }
          },
          {
            title: '联系电话',
            align: 'center',
            dataIndex: 'lxdh',
            width: 120
          },
          {
            title: '借款人性质分类',
            align: 'center',
            dataIndex: 'jkrxzfl',
            width: 120
          },
          {
            title: '借款人性质分类1',
            align: 'center',
            dataIndex: 'jkrxzfl1',
            width: 130
          },
          {
            title: '借款人性质分类2',
            align: 'center',
            dataIndex: 'jkrxzfl2',
            width: 130

          },
          {
            title: '借款人性质分类3',
            align: 'center',
            dataIndex: 'jkrxzfl3',
            width: 130
          },
          {
            title: '企业规模',
            align: 'center',
            dataIndex: 'qygm'
          },
          {
            title: '企业规模1',
            align: 'center',
            dataIndex: 'qygm1'
          },
          {
            title: '贷款品种',
            align: 'center',
            dataIndex: 'dkpz_dictText',
            width: 120
          },
          {
            title: '期限分类',
            align: 'center',
            dataIndex: 'qxfl'
          },
          {
            title: '担保方式',
            align: 'center',
            dataIndex: 'dbfs_dictText'
          },
          {
            title: '贷款投向',
            align: 'center',
            dataIndex: 'dktx',
            scopedSlots: { customRender: 'dktx' }
          },
          {
            title: '贷款投向1',
            align: 'center',
            dataIndex: 'dktx1',
            scopedSlots: { customRender: 'dktx1' }
          },
          {
            title: '贷款投向2',
            align: 'center',
            dataIndex: 'dktx2',
            scopedSlots: { customRender: 'dktx2' }

          },
          {
            title: '贷款投向3',
            align: 'center',
            dataIndex: 'dktx3',
            scopedSlots: { customRender: 'dktx3' }

          },
          {
            title: '贷款投向4',
            align: 'center',
            dataIndex: 'dktx4',
            scopedSlots: { customRender: 'dktx4' }

          },
          {
            title: '贷款投向5',
            align: 'center',
            dataIndex: 'dktx5',
            scopedSlots: { customRender: 'dktx5' }

          },
          {
            title: '贷款投向6',
            align: 'center',
            dataIndex: 'dktx6',
            scopedSlots: { customRender: 'dktx6' }

          },
          {
            title: '贷款投向7',
            align: 'center',
            dataIndex: 'dktx7',
            scopedSlots: { customRender: 'dktx7' }

          },
          {
            title: '贷款投向8',
            align: 'center',
            dataIndex: 'dktx8',
            scopedSlots: { customRender: 'dktx8' }

          },
          {
            title: '是否财政贴息',
            align: 'center',
            dataIndex: 'sfcztx',
            width: 120
          },
          {
            title: '贷款其他类型1',
            align: 'center',
            dataIndex: 'dkqtlx1',
            width: 120

          },
          {
            title: '备注1',
            align: 'center',
            dataIndex: 'bz1',
            scopedSlots: { customRender: 'bz1' }
          },
          {
            title: '备注2',
            align: 'center',
            dataIndex: 'bz2',
            scopedSlots: { customRender: 'bz2' }

          },
          {
            title: '固定资产类型',
            align: 'center',
            dataIndex: 'gdzclx',
            width: 120
          },
          {
            title: '固定资产类型1',
            align: 'center',
            dataIndex: 'gdzclx1',
            width: 120
          },
          {
            title: '固定资产类型2',
            align: 'center',
            dataIndex: 'gdzclx2',
            width: 120
          },
          {
            title: '固定资产类型3',
            align: 'center',
            dataIndex: 'gdzclx3',
            width: 120
          },
          {
            title: '固定资产类型4(面积)',
            align: 'center',
            dataIndex: 'gdzclx4',
            width: 160
          },
          {
            title: '借款人行业分类',
            align: 'center',
            dataIndex: 'jkrhyfl',
            width: 120,
            scopedSlots: { customRender: 'jkrhyfl' }
          },
          {
            title: '借款人行业分类1',
            align: 'center',
            dataIndex: 'jkrhyfl1',
            width: 130,
            scopedSlots: { customRender: 'jkrhyfl1' }
          },
          {
            title: '借款人行业分类2',
            align: 'center',
            dataIndex: 'jkrhyfl2',
            width: 130,
            scopedSlots: { customRender: 'jkrhyfl2' }
          },
          {
            title: '借款人行业分类3',
            align: 'center',
            dataIndex: 'jkrhyfl3',
            width: 130,
            scopedSlots: { customRender: 'jkrhyfl3' }
          },
          {
            title: '利率类型',
            align: 'center',
            dataIndex: 'lvlx'
          },
          {
            title: '启用LPR',
            align: 'center',
            dataIndex: 'qylpr'
          },
          {
            title: '基点（BP）',
            align: 'center',
            dataIndex: 'jdbp'
          }

        ],
        url: {
          list: '/TjfxXddkyebXdxtsj/tjfxXddkyebXdxtsj/list',
          delete: '/TjfxXddkyebXdxtsj/tjfxXddkyebXdxtsj/delete',
          deleteBatch: '/TjfxXddkyebXdxtsj/tjfxXddkyebXdxtsj/deleteBatch',
          exportXlsUrl: 'TjfxXddkyebXdxtsj/tjfxXddkyebXdxtsj/exportXls',
          importExcelUrl: 'TjfxXddkyebXdxtsj/tjfxXddkyebXdxtsj/importExcel',
          exportTemplateUrl: 'TjfxXddkyebXdxtsj/tjfxXddkyebXdxtsj/exportTemplateXls'
        }
      }
    },
    computed: {
      importExcelUrl: function() {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      }
    },
    methods: {
      getQueryParams() {
        //获取查询条件
        let tjyfMoment = "";
        if (this.queryParam.tjyf) {
          tjyfMoment = this.queryParam.tjyf.format("YYYY-MM")+"-01";
        }
        console.info('tjyfMoment :',tjyfMoment);
        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.tjyf) param.tjyf = tjyfMoment;
        return filterObj(param);
      },

      searchReset(){
        this.queryParam = {};
        this.loadData(1);
      },
      excelImport() {
        let params = {}
        params.exportTemplateUrl = this.url.exportTemplateUrl
        params.importExcelUrl = this.importExcelUrl
        params.exportTemplateName = '贷款余额表'
        this.$refs.excelImportModal.showModal(params)
      },
      importComplete(filePath) {
        let fileName = '导入结果'
        let param = {}
        console.log('filePath')
        console.log(filePath)
        downFile('/sys/common/download/' + filePath, param).then((data) => {
          if (!data) {
            this.$message.warning('文件下载失败')
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

        this.loadData()
      },
      handleExportXls: function(fileName) {
        if (!fileName || typeof fileName != "string") {
          fileName = "导出文件";
        }
        let param = {...this.queryParam};
        if (this.selectedRowKeys && this.selectedRowKeys.length > 0) {
          param['selections'] = this.selectedRowKeys.join(",")
        }
        if (param.tjyf) param.tjyf = param.tjyf.format("YYYY-MM")+'-01';
        console.info('导出参数param :',param);
        downFile(this.url.exportXlsUrl,param).then((data)=>{
          if (!data) {
            this.$message.warning("文件下载失败");
            return;
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
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>