<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="档案编号">
              <a-input placeholder="请输入档案编号" v-model="queryParam.dabh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属机构">
              <j-tree-select placeholder="请选择支行"
                             v-model="queryParam.jgdm"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户名称">
              <a-input placeholder="请输入客户名称" v-model="queryParam.khmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户类型">
              <j-dict-select-tag placeholder="请选择客户类型" v-model="queryParam.khlx" dictCode="xdda_khlx"></j-dict-select-tag>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="合同号">
              <a-input placeholder="请输入合同号" v-model="queryParam.hth"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="合同开始日期">
              <a-range-picker :placeholder="['开始日期', '结束日期']" v-model="queryParam.fkrq" :format="DateFormat"
                              @change="onfkDateChange" style="width: 100%;"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="业务编号">
              <a-input placeholder="请输入业务编号" v-model="queryParam.ywbh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="合同金额">
              <a-input-group compact>
                <a-input-number placeholder="" v-model="queryParam.qyje_begin" :min="0"
                                style=" width: 40%; text-align: center; "/>
                <a-input placeholder="<->" disabled
                         style=" width: 20%; border-left: 0; pointer-events: none; backgroundColor: #FFF; "/>
                <a-input-number placeholder="" v-model="queryParam.qyje_end" :min="0"
                                style="width: 40%; text-align: center; border-left: 0;"/>
              </a-input-group>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="贷款余额">
              <a-input-group compact>
                <a-input-number placeholder="" v-model="queryParam.dkye_begin" :min="0"
                                style=" width: 40%; text-align: center; "/>
                <a-input placeholder="<->" disabled
                         style=" width: 20%; border-left: 0; pointer-events: none; backgroundColor: #FFF; "/>
                <a-input-number placeholder="" v-model="queryParam.dkye_end" :min="0"
                                style="width: 40%; text-align: center; border-left: 0;"/>
              </a-input-group>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款责任人">
              <a-input placeholder="请输入贷款责任人" v-model="queryParam.dkzrr"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="贷款品种">
              <j-dict-select-tag placeholder="请选择贷款品种" v-model="queryParam.dkpz" dictCode="dkzl"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="贷款品种(补充)">
              <j-dict-select-tag placeholder="请选择贷款品种(补充)" v-model="queryParam.dkpzbc" dictCode="dkzlbc"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="担保方式">
              <j-dict-select-tag placeholder="请选择担保方式 " v-model="queryParam.dbfs" dictCode="dbfs"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="用信状态">
              <j-dict-select-tag placeholder="请选择用信状态 " v-model="queryParam.sfsx" dictCode="yxzt"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="是否上传档案">
              <a-input placeholder="请输入是否上传档案 " v-model="queryParam.sfscda"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="贷款类型">
              <j-dict-select-tag placeholder="请选择贷款类型" v-model="queryParam.lx" dictCode="xddagl_dklx"/>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('贷款合同数据管理')" v-has="'dkhtsjgl:exportXls'">导出</a-button>
     <!-- <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button icon="import">导入</a-button>
      </a-upload>-->
      <a-button icon="import" @click="excelImport" v-has="'dkhtsjgl:import'">导入</a-button>
      <a-button icon="area-chart" @click="init" v-has="'dkhtsjgl:update'">更新数据</a-button>
      <a-button icon="plus" @click="ClaimPage" v-has="'dkhtsjgl:claim'">移交</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
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
        :scroll="{x:4040}"
        @change="handleTableChange">

        <span slot="lxdz" slot-scope="text">
          <j-ellipsis :value="text" :length="10"/>
        </span>
        <span slot="dkpz" slot-scope="text">
          <j-ellipsis :value="text" :length="10"/>
        </span>
        <span slot="dkpzbc" slot-scope="text">
          <j-ellipsis :value="text" :length="10"/>
        </span>
        <span slot="dabh" slot-scope="text">
          <j-ellipsis :value="text" :length="18"/>
        </span>
        <span slot="hth" slot-scope="text">
          <j-ellipsis :value="text" :length="20"/>
        </span>
        <span slot="ywbh" slot-scope="text">
          <j-ellipsis :value="text" :length="23"/>
        </span>
        <span slot="khmc" slot-scope="text">
          <j-ellipsis :value="text" :length="4"/>
        </span>

        <span slot="action" slot-scope="text, record">
                  <a @click="handleEdit(record)" v-has="'dkhtsjgl:edit'">编辑</a>

          <a-divider type="vertical" />
                  <a @click="handleView(record)" v-has="'dkhtsjgl:see'">详情</a>

        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <dkhtsjgl-modal ref="modalForm" @ok="modalFormOk"></dkhtsjgl-modal>
    <claim-page ref="claimpage" @close="handlerColseWindow"/>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
  import DkhtsjglModal from './modules/DkhtsjglModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JEllipsis from '@/components/jeecg/JEllipsis'
  import ClaimPage from './modules/ClaimPage'
  import {filterObj} from "../../../../utils/util";
  import {getAction} from "../../../../api/manage";
  import ExcelImport from '@/components/common/ExcelImport'

  export default {
    name: "DkhtsjglList",
    mixins:[JeecgListMixin],
    components: {
      DkhtsjglModal,JEllipsis,JTreeSelect,ClaimPage,ExcelImport
    },
    data () {
      return {
        description: '贷款合同数据管理管理页面',
        DateFormat:'YYYY-MM-DD',
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
            title: '提取日期',
            align:"center",
            dataIndex: 'tqrq',
            width: 100
          },
          {
            title: '档案编号',
            align:"center",
            dataIndex: 'dabh',
            scopedSlots: { customRender: 'dabh' },
            width: 160
          },
          {
            title: '机构代码',
            align:"center",
            dataIndex: 'jgdm',
            width: 100
          },
          {
            title: '机构名称',
            align:"center",
            dataIndex: 'jgdm_dictText',
            width: 120
          },
          {
            title: '客户名称',
            align:"center",
            dataIndex: 'khmc',
            scopedSlots: { customRender: 'khmc' },
            width: 100
          },
          {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm',
            width: 180
          },
          {
            title: '客户类型',
            align:"center",
            dataIndex: 'khlx_dictText',
            width: 100
          },
          {
            title: '联系电话',
            align:"center",
            dataIndex: 'lxdh',
            width: 120
          },
          {
            title: '联系地址',
            align:"center",
            dataIndex: 'lxdz',
            scopedSlots: { customRender: 'lxdz' },
            width: 200
          },
          {
            title: '签约日期',
            align:"center",
            dataIndex: 'qyrq',
            width: 100
          },
          {
            title: '合同号',
            align:"center",
            dataIndex: 'hth',
            scopedSlots: { customRender: 'hth' },
            width: 180
          },
          {
            title: '业务编号',
            align:"center",
            dataIndex: 'ywbh',
            scopedSlots: { customRender: 'ywbh' },
            width: 200
          },
          {
            title: '合同开始日期',
            align:"center",
            dataIndex: 'fkrq',
            width: 120
          },
          {
            title: '合同到期日期',
            align:"center",
            dataIndex: 'dqrq',
            width: 120
          },
          {
            title: '签约期限',
            align:"center",
            dataIndex: 'qyqx',
            width: 100
          },
          {
            title: '合同金额',
            align:"center",
            dataIndex: 'qyje',
            width: 120
          },
          {
            title: '贷款余额',
            align:"center",
            dataIndex: 'dkye',
            width: 120
          },
          {
            title: '最早贷款日期',
            align:"center",
            dataIndex: 'zzdkrq',
            width: 120
          },
          {
            title: '最早到期日期',
            align:"center",
            dataIndex: 'zzdqrq',
            width: 120
          },
          {
            title: '贷款品种',
            align:"center",
            dataIndex: 'dkpz_dictText',
            scopedSlots: { customRender: 'dkpz' },
            width: 160
          },
          {
            title: '贷款品种(补充)',
            align:"center",
            dataIndex: 'dkpzbc_dictText',
            scopedSlots: { customRender: 'dkpzbc' },
            width: 160
          },
          {
            title: '担保方式',
            align:"center",
            dataIndex: 'dbfs_dictText',
            width: 100
          },
          {
            title: '贷款责任人工号',
            align:"center",
            dataIndex: 'dkzrr',
            width: 120
          },
          {
            title: '贷款责任人姓名',
            align:"center",
            dataIndex: 'dkzrr_dictText',
            width: 120
          },
          {
            title: '是否用信',
            align:"center",
            dataIndex: 'sfsx_dictText',
            width: 100
          },
          {
            title: '是否上传档案',
            align:"center",
            dataIndex: 'sfscda',
            width: 120
          },
          {
            title: '数据日期',
            align:"center",
            dataIndex: 'sjrq',
            width: 100
          },
          {
            title: '贷款类型',
            align:"center",
            dataIndex: 'lx_dictText',
            width: 120
          },
          {
            title: '录入人',
            align:"center",
            dataIndex: 'lrr',
            width: 100
          },
          {
            title: '录入标志',
            align:"center",
            dataIndex: 'lrbz_dictText',
            width: 100
          },
          {
            title: '录入时间',
            align:"center",
            dataIndex: 'lrsj',
            width: 100
          },
          /*
          {
            title: '是否启用授信',
            align:"center",
            dataIndex: 'sfqysx'
          },
          {
            title: '贷款形态',
            align:"center",
            dataIndex: 'dkxt'
           },
		   {
            title: 'businessStatus',
            align:"center",
            dataIndex: 'businessStatus'
           },
		   {
            title: '审核状态',
            align:"center",
            dataIndex: 'shzt'
           },
		   {
            title: '贷款金额',
            align:"center",
            dataIndex: 'dkje'
           },*/
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            fixed: "right",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/dkhtsjgl/dkhtsjgl/list",
          delete: "/dkhtsjgl/dkhtsjgl/delete",
          deleteBatch: "/dkhtsjgl/dkhtsjgl/deleteBatch",
          exportXlsUrl: "dkhtsjgl/dkhtsjgl/exportXls",
          importExcelUrl: "dkhtsjgl/dkhtsjgl/importExcel",
          init: "/dkhtsjgl/dkhtsjgl/init",
          exportTemplateUrl: "/dkhtsjgl/dkhtsjgl/exportTemplateXls",
       },
        exportTemplateName: '贷款合同数据管理导入模板'
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      /**
       * 移交
       *
       */
      ClaimPage(){
        this.$refs.claimpage.visible = true;
      },
      handlerColseWindow() {
        this.searchReset();
        console.log("认领窗口已关闭")
      },


      getQueryParams() {
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        delete param.fkrq;
        return filterObj(param);
      },
      onfkDateChange(date,dateString){
        this.queryParam.fkString = dateString[0] + "," + dateString[1];
      },
      handleView: function(record) {
        console.log('Dkhtsjgl => handleView: function (record)')
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "查看详情";
        this.$refs.modalForm.disableSubmit = true;
      },
      init () {
        this.loading = true
        let params = {}
        getAction(this.url.init,params).then((res) => {
          if (res.success) {
            this.$message.success('提取成功')
            this.loadData(1)
          } else {
            this.$message.warning('提取失败')
          }
        }).catch((err) => {
          this.$message.error('提取失败', error)
        }).finally(() => {
          this.loading = false
        })
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>