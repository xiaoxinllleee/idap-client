<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <!--<a-col :md="6" :sm="8"><a-form-item label="区域代码">
            <a-input placeholder="请输入区域代码" v-model="queryParam.qydm"/>
          </a-form-item></a-col>-->
          <a-col :md="6" :sm="8"><a-form-item label="所属支行">
            <j-tree-select placeholder="请选择所属支行" v-model="queryParam.sszh"
                           dict="HR_BAS_ORGANIZATION, ZZJC, ZZBZ" pidField="sjzzbz" :tree-default-expand-all="true" :show-search="true"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="客户名称">
            <j-input placeholder="请输入客户名称" v-model="queryParam.khmc" type="likemore"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="证件号码">
            <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"/>
          </a-form-item></a-col>

          <template v-if="toggleSearchStatus">
            <!--<a-col :md="6" :sm="8"><a-form-item></a-form-item></a-col>-->
            <a-col :md="6" :sm="8"><a-form-item label="户号编码">
              <a-input placeholder="请输入户号编码" v-model="queryParam.hhbm"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="所属村编码">
              <a-input placeholder="请输入所属村编码" v-model="queryParam.sscbm"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="所属村名称">
              <j-input placeholder="请输入所属村名称" v-model="queryParam.sscmc" type="likemore"/>
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
      <a-button @click="handleInitDate" type="primary" icon="cloud-download">统计</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('外出务工客户明细')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader"
                :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
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
        <a style="font-weight: 600;">{{ selectedRowKeys.length }} </a>项
        <a style="margin-left: 24px;" @click="onClearSelected">清空</a>
      </div>

      <a-table bordered
               ref="table"
               size="middle"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               :scroll="{ x: 2000 }"
               :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
               @change="handleTableChange">
        <span slot="action" slot-scope="text, record">
          <a @click="handleView(record)">详情</a>
          <!--<a-divider type="vertical"/>
          <a-dropdown>
            <a class="ant-dropdown-link">更多<a-icon type="down" /></a>
            <a-menu slot="overlay"><a-menu-item>
              <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                <a>删除</a>
              </a-popconfirm>
            </a-menu-item></a-menu>
          </a-dropdown>-->
        </span>
        <span slot="detail" slot-scope="khmc, record">
          <a @click="handleView(record)">{{khmc}}</a>
        </span>
        <!--超长字符串截取省略号显示-->
        <span slot="hjdz" slot-scope="text">
          <j-ellipsis :value="text" :length="8"/>
        </span>
        <span slot="cshy" slot-scope="text">
          <j-ellipsis :value="text" :length="6"/>
        </span>
        <span slot="gzdw" slot-scope="text">
          <j-ellipsis :value="text" :length="8"/>
        </span>
        <span slot="gzdwdz" slot-scope="text">
          <j-ellipsis :value="text" :length="8"/>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <wcwgkhmx-modal ref="modalForm" @ok="modalFormOk"/>
  </a-card>
</template>

<script>
  import WcwgkhmxModal from './modules/WcwgkhmxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { getAction,putAction,httpAction } from '@/api/manage'
  import JInput from '../../../components/jeecg/JInput'
  import JTreeSelect from '../../../components/jeecg/JTreeSelect'
  import JEllipsis from '../../../components/jeecg/JEllipsis'

  export default {
    name: "WcwgkhmxList",
    mixins:[JeecgListMixin],
    components: {
      JInput,
      JEllipsis,
      JTreeSelect,
      WcwgkhmxModal
    },
    data () {
      return {
        description: '外出务工客户明细管理页面',
        // 表头
        columns: [
          // {
          //   title: '序号',
          //   dataIndex: '',
          //   key: 'rowIndex',
          //   width: 60,
          //   align: "center",
          //   customRender:function (t,r,index) {
          //     return parseInt(index)+1;
          //   }
          // },
          // {
          //   title: '区域代码',
          //   align:"center",
          //   dataIndex: 'qydm'
          // },
          {
            title: '所属支行',
            align:"center",
            dataIndex: 'sszh_dictText',
            sorter: (a,b) => b.sszh - a.sszh,
          },
          {
            title: '所属村编码',
            align:"center",
            dataIndex: 'sscbm',
            sorter: (a,b) => b.sscbm - a.sscbm,
          },
          {
            title: '所属村名称',
            align:"center",
            dataIndex: 'sscmc',
            sorter: (a,b) => b.sscmc.length - a.sscmc.length,
          },
          {
            title: '户号编码',
            align:"center",
            dataIndex: 'hhbm',
            sorter: (a,b) => b.hhbm - a.hhbm,
          },
          {
            title: '客户名称',
            align:"center",
            dataIndex: 'khmc',
            scopedSlots: { customRender: 'detail' },
          },
          {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm'
          },
          {
            title: '年龄',
            align:"center",
            dataIndex: 'nl',
            sorter: (a,b) => b.nl - a.nl,
          },
          {
            title: '性别',
            align:"center",
            dataIndex: 'xb_dictText',
            filters: [
              { text: '男', value: '1', },
              { text: '女', value: '2', }
            ],
            onFilter: (value, record) => record.xb.indexOf(value) === 0,
          },
          {
            title: '联系方式',
            align:"center",
            dataIndex: 'lxfs'
          },
          {
            title: '户口性质',
            align:"center",
            dataIndex: 'hkxz_dictText',
            filters: [
              { text: '农业户口', value: '1', },
              { text: '非农业户口', value: '2', }
            ],
            onFilter: (value, record) => record.hkxz.indexOf(value) === 0,
          },
          {
            title: '户籍地址',
            align:"center",
            dataIndex: 'hjdz',
            scopedSlots: { customRender: 'hjdz' },
          },
          {
            title: '从事行业',
            align:"center",
            dataIndex: 'cshy_dictText',
            scopedSlots: { customRender: 'cshy' },
          },
          {
            title: '工作单位',
            align:"center",
            dataIndex: 'gzdw',
            scopedSlots: { customRender: 'gzdw' },
          },
          {
            title: '工作地点',
            align: "center",
            dataIndex: 'gzdwdz',
            scopedSlots: { customRender: 'gzdwdz' },
          },
          {
            title: '预计返乡时间',
            align:"center",
            dataIndex: 'yjfxsj',
            customRender: function (text) {
              return !text ? "" : (text.length > 10 ? text.substr(0, 10) : text)
            },
            sorter: (a, b) => b.yjfxsj.replace(/-/g, '/') - a.yjfxsj.replace(/-/g, '/'),
          },
          // {
          //   title: '操作',
          //   dataIndex: 'action',
          //   align: "center",
          //   fixed: "right",
          //   scopedSlots: { customRender: 'action' },
          //   width: 100
          // }
        ],
        isorter: {
          columns: 'yjfxsj',
          order: 'desc',
        },
        url: {
          list: "/wcwgkhmx/wcwgkhmx/list",
          delete: "/wcwgkhmx/wcwgkhmx/delete",
          deleteBatch: "/wcwgkhmx/wcwgkhmx/deleteBatch",
          exportXlsUrl: "wcwgkhmx/wcwgkhmx/exportXls",
          importExcelUrl: "wcwgkhmx/wcwgkhmx/importExcel",
          init: "/wcwgkhmx/wcwgkhmx/init",
        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      handleView: function (record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "外出务工客户详情";
        this.$refs.modalForm.disableSubmit = true;
      },
      handleInitDate() {
        this.loading = true;
        let params = {}
        getAction(this.url.init, params).then((res) => {
          if (res.success) {
            this.loadData()
            this.$message.success(res.message)
          } else {
            this.$message.warning(res.message,5)
          }
        })
        this.loading = false;
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>