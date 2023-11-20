<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <!--<a-col :md="6" :sm="8"><a-form-item label="所属支行">
            <j-tree-select placeholder="请选择所属支行" v-model="queryParam.zzbz"
                           dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ" pidField="sjzzbz" :treeDefaultExpandAll="true"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="所属营销单元">
            <j-dict-select-tag placeholder="请选择营销单元查询" v-model="queryParam.ssyxdy"
                               dictCode="YXDYGL_EJYXDYGL,DYMC,DYBH"/>
          </a-form-item></a-col>-->
          <a-col :md="6" :sm="8"><a-form-item label="客户编号">
            <a-input placeholder="请输入客户编号" v-model="queryParam.custid"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="户主客户编号">
            <a-input placeholder="请输入户主客户编号" v-model="queryParam.hzcustid"></a-input>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="是否用信">
            <j-dict-select-tag placeholder="请选择是否用信" v-model="queryParam.sfyx" dictCode="sfbz"/>
          </a-form-item></a-col>

          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8"><a-form-item label="客户名称">
              <j-input placeholder="请输入客户名称" v-model="queryParam.khmc" type="likemore" />
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="是否户主">
              <j-dict-select-tag placeholder="请选择是否户主" v-model="queryParam.sfhz" dictCode="sfbz"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="与户主关系">
              <j-dict-select-tag placeholder="请选择与户主关系" v-model="queryParam.yhzgx" dictCode="yhzgx"/>
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
      <a-button @click="handleExtract" type="primary" icon="cloud-download">提取</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('未用信客户信息')">导出</a-button>
      <!--<a-dropdown v-if="selectedRowKeys.length > 0">
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
               rowKey="zjhm"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               :scroll="{ x: 2500 }"
               :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
               @change="handleTableChange">
        <!--<span slot="action" slot-scope="text, record">
          <a @click="handleDetail(record)">详情</a>
          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>-->
        <span slot="detail" slot-scope="khmc,record"><a @click="handleDetail(record)">{{khmc}}</a></span>
        <span slot="zz" slot-scope="text"><j-ellipsis :value="text" :length="8" /></span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <wyxkhxx-modal ref="modalForm" @ok="modalFormOk"/>
  </a-card>
</template>

<script>
  import WyxkhxxModal from './modules/WyxkhxxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { postAction, getAction, putAction } from '@/api/manage'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JInput from '../../../components/jeecg/JInput'
  import JEllipsis from '../../../components/jeecg/JEllipsis'

  export default {
    name: "WyxkhxxList",
    mixins:[JeecgListMixin],
    components: {
      JEllipsis,
      JInput,
      WyxkhxxModal,JTreeSelect
    },
    data () {
      return {
        description: '未用信客户信息管理页面',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: "center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
          },
		      // {
          //   title: '所属支行',
          //   align: "center",
          //   dataIndex: 'zzbz_dictText',
          //   width: 120,
          // },
		      // {
          //   title: '所属营销单元',
          //   align: "center",
          //   dataIndex: 'ssyxdy_dictText',
          //   width: 120,
          // },
		      {
            title: '客户编号',
            align: "center",
            dataIndex: 'custid',
            width: 120,
            sorter: (a, b) => b.custid - a.custid,
          },
		      {
            title: '户主客户编号',
            align: "center",
            dataIndex: 'hzcustid',
            width: 120,
            sorter: (a, b) => b.hzcustid - a.hzcustid,
          },
		      {
            title: '与户主关系',
            align: "center",
            dataIndex: 'yhzgx_dictText',
            width: 120,
          },
		      {
            title: '是否户主',
            align: "center",
            dataIndex: 'sfhz_dictText',
            width: 100,
          },
		      {
            title: '客户名称',
            align: "center",
            dataIndex: 'khmc',
            scopedSlots: { customRender: 'detail' },
            width: 120,
          },
		      {
            title: '证件号码',
            align: "center",
            dataIndex: 'zjhm',
            width: 140,
          },
		      {
            title: '性别',
            align: "center",
            dataIndex: 'xb_dictText',
            width: 80,
            filters: [
              { text: '男', value: '1', },
              { text: '女', value: '2', }
            ],
            onFilter: (value, record) => record.xb.indexOf(value) === 0,
          },
		      {
            title: '年龄',
            align: "center",
            dataIndex: 'nl',
            width: 80,
            sorter: (a, b) => b.nl - a.nl,
          },
		      {
            title: '联系方式',
            align: "center",
            dataIndex: 'lxfs',
            width: 100,
          },
		      {
            title: '住址',
            align: "center",
            dataIndex: 'zz',
            width: 150,
            scopedSlots: { customRender: 'zz' },
          },
		      {
            title: '是否用信',
            align: "center",
            dataIndex: 'sfyx_dictText',
            width: 80,
          },
		      {
            title: '贷款余额',
            align: "center",
            dataIndex: 'dkye',
            width: 100,
            sorter: (a, b) => b.dkye - a.dkye,
          },
          {
            title: '不良贷款余额',
            align: "center",
            dataIndex: 'bldkye',
            width: 100,
            sorter: (a, b) => b.bldkye - a.bldkye,
          },
          {
            title: '表外不良贷款余额',
            align: "center",
            dataIndex: 'bwbldkye',
            width: 100,
            sorter: (a, b) => b.bwbldkye - a.bwbldkye,
          },
          {
            title: '是否开通存款业务',
            align: "center",
            dataIndex: 'sfktckyw_dictText',
            width: 80,
          },
          {
            title: '存款余额',
            align: "center",
            dataIndex: 'ckye',
            width: 100,
            sorter: (a, b) => b.ckye - a.ckye,
          },
          {
            title: '存款日平余额',
            align: "center",
            dataIndex: 'ckrpye',
            width: 100,
            sorter: (a, b) => b.ckrpye - a.ckrpye,
          },
          {
            title: '存款年日平余额',
            align: "center",
            dataIndex: 'cknrpye',
            width: 100,
            sorter: (a, b) => b.cknrpye - a.cknrpye,
          },
		      {
            title: '录入标识',
            align: "center",
            dataIndex: 'lrbz_dictText',
            width: 80,
          },
		      {
            title: '录入时间',
            align: "center",
            dataIndex: 'lrsj',
            width: 100,
            sorter: (a, b) => b.lrsj.replace(/-/g, '/') - a.lrsj.replace(/-/g, '/'),
          },
		      {
            title: '录入人',
            align: "center",
            dataIndex: 'lrr',
            width: 100,
          },
          // {
          //   title: '操作',
          //   dataIndex: 'action',
          //   fixed: 'right',
          //   align: "center",
          //   scopedSlots: { customRender: 'action' },
          //   width: 80
          // }
        ],
        url: {
          list: "/khgl/wyxkhxx/list",
          delete: "/khgl/wyxkhxx/delete",
          init: "/khgl/wyxkhxx/init",
          deleteBatch: "/khgl/wyxkhxx/deleteBatch",
          exportXlsUrl: "khgl/wyxkhxx/exportXls",
          importExcelUrl: "khgl/wyxkhxx/importExcel",
        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      handleExtract() {
        this.loading = true;
        let params = {}
        getAction(this.url.init, params).then((res) => {
          if (res.success) {
            this.loadData()
            this.$message.success(res.message)
          } else {
            this.$message.warning(res.message,5)
          }
          this.loading = false;
        })
      },
      handleDetail(record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "未用信客户信息详情";
        this.$refs.modalForm.disableSubmit = true;
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>