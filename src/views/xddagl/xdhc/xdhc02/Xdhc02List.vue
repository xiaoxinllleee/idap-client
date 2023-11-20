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
            <a-form-item label="机构代码">
              <j-tree-select placeholder="请选择所属机构" v-model="queryParam.jgdm" dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             treeNodeFilterProp="title" pid-field="sjywjgdm"
                             :showSearch="true" :treeDefaultExpandAll="true"/>
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
            <a-form-item label="客户类型">
<!--              <a-input placeholder="请输入客户类型" v-model="queryParam.khlx"></a-input>-->
              <j-dict-select-tag  :placeholder="true" dict-code="xddagl_khlx" v-model="queryParam.khlx"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="合同号">
              <a-input placeholder="请输入合同号" v-model="queryParam.hth"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="合同开始日期">
              <a-range-picker @change="onhtksrqDateChange" v-model="queryParam.jkrq" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="业务编号">
              <a-input placeholder="请输入业务编号" v-model="queryParam.ywbh"></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="合同金额">
<!--              <a-input placeholder="请输入合同金额" v-model="queryParam.qyje"></a-input>-->
              <a-input-number  v-model="queryParam.qyje_begin"
                              style="width: 40%; text-align: center" :min="0" />
              <a-input placeholder="~"
                       style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                       disabled />
              <a-input-number  v-model="queryParam.qyje_end"
                              style="width: 40%; text-align: center; border-left: 0" :min="0" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款余额">
              <a-input-number  v-model="queryParam.dkye_begin"
                              style="width: 40%; text-align: center" :min="0" />
              <a-input placeholder="~"
                       style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                       disabled />
              <a-input-number  v-model="queryParam.dkye_end"
                              style="width: 40%; text-align: center; border-left: 0" :min="0" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款责任人">
              <a-input placeholder="请输入贷款责任人" v-model="queryParam.dkzrr_dictText"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款品种">
              <!--              <a-input placeholder="全部" v-model="queryParam.xddkpz"></a-input>-->
              <j-dict-select-tag  :placeholder="true" dict-code="dkzl" v-model="queryParam.dkpz" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款品种(补充)">
              <!--              <a-input placeholder="全部" v-model="queryParam.xddkpz"></a-input>-->
              <j-dict-select-tag  :placeholder="true" dict-code="dkzlbc" v-model="queryParam.dkpzbc" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="担保方式">
              <!--              <a-input placeholder="全部" v-model="queryParam.xddkpz"></a-input>-->
              <j-dict-select-tag  :placeholder="true" dict-code="gljydbfs" v-model="queryParam.dbfs" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="用信状态">
             <!-- <a-select placeholder="全部"   v-model="queryParam.sfsx" >
                </a-select>-->
              <j-dict-select-tag  :placeholder="true" dict-code="yxzt" v-model="queryParam.sfsx" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="是否上传档案">
              <!--              <a-input placeholder="全部" v-model="queryParam.xddkpz"></a-input>-->
              <j-dict-select-tag  :placeholder="true" dict-code="sfbs" v-model="queryParam.sfscda" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款类型">
              <!--              <a-input placeholder="全部" v-model="queryParam.xddkpz"></a-input>-->
              <j-dict-select-tag  :placeholder="true" dict-code="xddagl_dklx" v-model="queryParam.lx" />
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
<!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('信贷T+1核查')" v-has="'xdhc02:exportXls'">导出</a-button>
      <a-button icon="import" @click="excelImport" v-has="'xdhc02:import'">导入</a-button>
      <a-button @click="init" icon="area-chart" v-has="'xdhc02:init'">更新数据</a-button>
<!--      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>-->
    </div>

    <!-- table区域-begin -->
    <div>
<!--      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
         :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      </div>-->

      <a-table
        ref="table"
        size="middle"
        bordered
        :rowKey="rowKey"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{x:6050}"
        @change="handleTableChange">


<!--        <span slot="zjhm" slot-scope="text">-->
<!--          <j-ellipsis :value="text" :length="6"/>-->
<!--        </span>-->
<!--        <span slot="dabh" slot-scope="text">-->
<!--          <j-ellipsis :value="text" :length="6"/>-->
<!--        </span>-->
<!--        <span slot="lxdz" slot-scope="text">-->
<!--          <j-ellipsis :value="text" :length="6"/>-->
<!--        </span>-->
<!--        <span slot="lxdh" slot-scope="text">-->
<!--          <j-ellipsis :value="text" :length="6"/>-->
<!--        </span>-->
<!--        <span slot="hth" slot-scope="text">-->
<!--          <j-ellipsis :value="text" :length="6"/>-->
<!--        </span>-->
<!--        <span slot="ywbh" slot-scope="text">-->
<!--          <j-ellipsis :value="text" :length="6"/>-->
<!--        </span>-->
<!--        <span slot="dkpz_dictText" slot-scope="text">-->
<!--          <j-ellipsis :value="text" :length="6"/>-->
<!--        </span>-->

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'xdhc02:edit'">编辑</a>
          <a-divider type="vertical" />
           <a @click="handleView(record)" v-has="'xdhc02:view'">查看</a>
          <a-divider type="vertical" />
          <a @click="audit(record)" v-has="'xdhc02:audit'">审核</a>
<!--          <a-dropdown>
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
    <xdhc02-modal ref="modalForm" @ok="modalFormOk"></xdhc02-modal>
    <excel-import ref="excelImportModal" @ok="importComplete" />
  </a-card>
</template>

<script>
  import Xdhc02Modal from './modules/Xdhc02Modal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '../../../../components/jeecg/JTreeSelect'
  import JEllipsis from '../../../../components/jeecg/JEllipsis'
  import { filterObj } from '@/utils/util'
  import ExcelImport from '@/components/common/ExcelImport'
  import { getAction, putAction } from '../../../../api/manage'

  export default {
    name: "Xdhc02List",
    mixins:[JeecgListMixin],
    components: {
      Xdhc02Modal,JTreeSelect,JEllipsis,ExcelImport
    },
    data () {
      return {
        description: '信贷T+1核查管理页面',
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
            dataIndex: 'tqrq'
           },
          {
            title: '档案编号',
            align:"center",
            dataIndex: 'dabh',
            scopedSlots: { customRender: 'dabh' }
           },
		   {
            title: '机构代码',
            align:"center",
            dataIndex: 'jgdm'
           }, {
            title: '机构名称',
            align:"center",
            dataIndex: 'jgdm_dictText'
           },
          {
            title: '客户名称',
            align:"center",
            dataIndex: 'khmc'
          },
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm',
         scopedSlots: { customRender: 'zjhm' }
           },

		   {
            title: '客户类型',
            align:"center",
            dataIndex: 'khlx_dictText'
           },
		   {
            title: '联系电话',
            align:"center",
            dataIndex: 'lxdh',
         scopedSlots: { customRender: 'lxdh' },
           },
		   {
            title: '联系地址',
            align:"center",
            dataIndex: 'lxdz',
         scopedSlots: { customRender: 'lxdz' },
           },
		   {
            title: '签约日期',
            align:"center",
            dataIndex: 'qyrq'
           },
		   {
            title: '合同号',
            align:"center",
            dataIndex: 'hth',
         scopedSlots: { customRender: 'hth' },
           },
		   {
            title: '业务编号',
            align:"center",
            dataIndex: 'ywbh',
         scopedSlots: { customRender: 'ywbh' },
           },
		   {
            title: '合同开始日期',
            align:"center",
            dataIndex: 'fkrq'
           },
		   {
            title: '合同到期日期',
            align:"center",
            dataIndex: 'dqrq'
           },
		   {
            title: '签约期限',
            align:"center",
            dataIndex: 'qyqx'
           },
		   {
            title: '合同金额',
            align:"center",
            dataIndex: 'qyje'
           },
          {
            title: '贷款余额',
            align:"center",
            dataIndex: 'dkye'
          },
          {
            title: '最早贷款日期',
            align:"center",
            dataIndex: 'zzdkrq'
           },

          {
            title: '最早到期日期',
            align:"center",
            dataIndex: 'zzdqrq'
           },
          {
            title: '贷款品种',
            align:"center",
            dataIndex: 'dkpz_dictText',
            scopedSlots: { customRender: 'dkpz_dictText' },
          },
          {
            title: '贷款品种(补充)',
            align:"center",
            dataIndex: 'dkpzbc_dictText'
          },
          {
            title: '担保方式',
            align:"center",
            dataIndex: 'dbfs_dictText'
          },
          {
            title: '贷款责任人工号',
            align:"center",
            dataIndex: 'dkzrr'
          },
          {
            title: '贷款责任人姓名',
            align:"center",
            dataIndex: 'dkzrr_dictText'
          },
          {
            title: '是否用信',
            align:"center",
            dataIndex: 'sfsx_dictText'
           },
          {
            title: '审核状态',
            align:"center",
            dataIndex: 'shzt_dictText'
          },
          {
            title: '是否上传档案',
            align:"center",
            dataIndex: 'sfscda_dictText'
          },
          {
            title: '数据日期',
            align:"center",
            dataIndex: 'sjrq'
           },
          {
            title: '贷款类型',
            align:"center",
            dataIndex: 'lx_dictText'
          },
          {
            title: '录入人',
            align:"center",
            dataIndex: 'lrr'
          },
          {
            title: '录入标志',
            align:"center",
            dataIndex: 'lrbz_dictText'
           },
          {
            title: '录入时间',
            align:"center",
            dataIndex: 'lrsj'
          },

          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            fixed:"right",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/xdhc02/xdhc02/list",
          delete: "/xdhc02/xdhc02/delete",
          deleteBatch: "/xdhc02/xdhc02/deleteBatch",
          exportXlsUrl: "xdhc02/xdhc02/exportXls",
          importExcelUrl: "xdhc02/xdhc02/importExcel",
          init: "/xdhc02/xdhc02/init",
          audit:"/xdhc02/xdhc02/audit",
          exportTemplateUrl: "/xdhc02/xdhc02/exportTemplateXls",
       },
        exportTemplateName: '信贷T+1核查管理_2导入模板'
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      handleEdit(record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "上传";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.disabled = true;
      },
      handleView: function (record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "查看";
        this.$refs.modalForm.disableSubmit = true;
        this.$refs.modalForm.disabled = true;
        this.$refs.modalForm.show = false;
      },

      getQueryParams() {
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        delete param.jkrq;
        return filterObj(param);
      },
      onhtksrqDateChange(value,dateString){
        let jkrqString = dateString
        this.queryParam.jkrq_begin = jkrqString[0]
        this.queryParam.jkrq_end = jkrqString[1]
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
      audit (record) {
        let params = record
        console.log(params)
        this.loading=true
        putAction(this.url.audit,params).then((res) => {
          if (res.success) {
            this.$message.success('审核成功！')
          } else {
            this.$message.warning('审核失败！')
          }
        }).catch((err) => {
          this.$message.error('审核失败', error)
        }).finally(res =>{
          this.loading=false
          this.loadData(1)
        })
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>