<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构代码">
              <j-tree-select placeholder="请选择所属机构" v-model="queryParam.jgdm"
                             dict="V_HR_BAS_ORGANIZATION_CMMS,ZZJC,YWJGDM" pid-field="sjywjgdm" tree-node-filter-prop="title"
                             :sszh="true" :show-search="true" :tree-default-expand-all="true" :filter-tree-node="true" :is-all="isAll"/>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户名称">
              <a-input placeholder="请输入客户名称" v-model="queryParam.khmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="存款账号">
              <a-input placeholder="请输入存款账号" v-model="queryParam.ckzh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账号类型">
              <j-dict-select-tag placeholder="请选择账号类型" v-model="queryParam.zhlx" dictCode="ckzhlx"/>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="客户编号">
                <a-input placeholder="请输入客户编号" v-model="queryParam.khbh"></a-input>
              </a-form-item>
            </a-col>

            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="营销类型">
                <j-dict-select-tag placeholder="请选择营销类型 " v-model="queryParam.yxlx" dictCode="yxlx"/>
              </a-form-item>
            </a-col>

            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="拓展人">
                <j-input placeholder="请输入拓展人" v-model="queryParam.tzr"></j-input>
              </a-form-item>
            </a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchQueryByUrl(url.listAll)" v-has="'ckzhtzxx:searchAll'" icon="search" style="margin-left: 8px">查询全部</a-button>
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
      <a-button @click="handleDataExtraction" icon="area-chart" v-has="'Ckzhtzxx:init'">提取</a-button>
      <a-button icon="download" :loading="exportLoading"  @click="handleExportXls('存款账户拓展信息')" v-has="'Ckzhtzxx:exp'">导出</a-button>
      <a-button icon="download" :loading="exportLoading" @click="handleExportXlsByNameAndUrl('存款账户拓展信息', url.exportAllXlsUrl)" v-has="'Ckzhtzxx:expAll'">导出全部</a-button>
      <a-button @click="handleTransfer" icon="export" v-has="'Ckzhtzxx:transfer'">移交</a-button>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        bordered
        :rowKey="rowKey"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{x:2800}"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <Button type="primary" size="small" @click="handleView(record)" v-has="'Ckzhtzxx:view'">查看</Button>
          <!--<a-divider type="vertical" />-->
          <!--<a-dropdown>-->
            <!--<a class="ant-dropdown-link">更多 <a-icon type="down" /></a>-->
            <!--<a-menu slot="overlay">-->
              <!--<a-menu-item>-->
                <!--<a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">-->
                  <!--<a v-has="'Ckzhtzxx:delete'">删除</a>-->
                <!--</a-popconfirm>-->
              <!--</a-menu-item>-->
            <!--</a-menu>-->
          <!--</a-dropdown>-->
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <ckzhtzxx-modal ref="modalForm" @ok="modalFormOk"></ckzhtzxx-modal>
    <ckzhtzyj-modal ref="yjModalForm" @ok="modalFormOk" @close="closeWindow()"></ckzhtzyj-modal>

  </a-card>
</template>

<script>
  import CkzhtzxxModal from './modules/CkzhtzxxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from "@/components/jeecg/JTreeSelect";
  import store from '@/store/'
  import {mapGetters} from "vuex";
  import JInput from '@/components/jeecg/JInput'
  import {putAction} from "@/api/manage";
  import CkzhtzyjModal from "./modules/CkzhtzyjModal";


  export default {
    name: "CkzhtzxxList",
    mixins:[JeecgListMixin],
    components: {
      JInput,
      CkzhtzxxModal,JTreeSelect,CkzhtzyjModal
    },
    data () {
      return {
        description: '存款账户拓展信息管理页面',
        isAll: false,
        loading:false,
        sszh: "",
        userId: "",
        workNo: "",
        isorter: {
          order: 'desc',
        },
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
            title: '机构代码',
            align:"center",
            dataIndex: 'jgdm',
           },
          {
            title: '机构名称',
            align:"center",
            dataIndex: 'jgdm_dictText',
          },
		   {
            title: '客户编号',
            align:"center",
            dataIndex: 'khbh',
           },
		   {
            title: '客户名称',
            align:"center",
            dataIndex: 'khmc',
           },
          {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm',
            width: 180
          },
		  /* {
            title: '证件类型',
            align:"center",
            dataIndex: 'zjlx_dictText'
           },*/
          {
            title: '电话号码',
            align:"center",
            dataIndex: 'dhhm',
            width: 140
          },

		   {
            title: '营销类型',
            align:"center",
            dataIndex: 'yxlx_dictText',
           },
		   {
            title: '存款账号',
            align:"center",
            dataIndex: 'ckzh',
            width: 160
           },
		   {
            title: '账号类型',
            align:"center",
            dataIndex: 'zhlx_dictText'
           },

          {
            title: '开户日期',
            align:"center",
            dataIndex: 'khrq',
          },
		     {
            title: '到期日期',
            align:"center",
            dataIndex: 'dqrq',
         },
          {
            title: '利率',
            align:"center",
            dataIndex: 'll'
          },

          {
            title: '存期',
            align:"center",
            dataIndex: 'cq'
          },

          {
            title: '存款余额',
            align:"center",
            dataIndex: 'ckye'
          },

          {
            title: '存款月日平',
            align:"center",
            dataIndex: 'ckyrp'
          },

          {
            title: '存款年日平',
            align:"center",
            dataIndex: 'ckrpye'
          },

          {
            title: '上年年日均',
            align:"center",
            dataIndex: 'sncknrj'
          },
          {
            title: '管户人',
            align:"center",
            dataIndex: 'ghr_dictText'
          },

          {
            title: '拓展人',
            align:"center",
            dataIndex: 'tzr_dictText'
          },
          {
            title: '拓展比例',
            align:"center",
            dataIndex: 'tzbl'
          },

        /*  {
            title: '拓展日期',
            align:"center",
            dataIndex: 'tzrq'
          },*/

        /*  {
            title: '存量标志',
            align:"center",
            dataIndex: 'clbz'
          },


		   {
            title: '当年认领金额',
            align:"center",
            dataIndex: 'dnrlje'
           },*/
		   {
            title: '录入标识',
            align:"center",
            dataIndex: 'lrbz_dictText'
           },
		   {
            title: '录入人',
            align:"center",
            dataIndex: 'lrr'
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
            scopedSlots: { customRender: 'action' },
            width:120, fixed: 'right',
          }
        ],
		url: {
          list: "/performance/ckzhtzgl/list",
          listAll: "/performance/ckzhtzgl/listAll",
          delete: "/performance/ckzhtzgl/delete",
          deleteBatch: "/performance/ckzhtzgl/deleteBatch",
          exportXlsUrl: "performance/ckzhtzgl/exportXls",
          exportAllXlsUrl: "performance/ckzhtzgl/exportAllXls",
          importExcelUrl: "performance/ckzhtzgl/importExcel",
          extract: "/performance/ckzhtzgl/extract",
       },
        searchAll: false,
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    created() {
      this.isAll  = store.getters.isRoot;
      this.sszh   = store.getters.userInfo.orgCode;
      this.userId = store.getters.userInfo.id;
      this.workNo = store.getters.userInfo.workNo;
    },
    methods: {
      ...mapGetters(["nickname", "avatar","userInfo"]),
      searchReset () {
        this.queryParam = {jgdm: undefined};
        if(!store.getters.isRoot) {
          this.queryParam.jgdm = store.getters.ywjgdm
        }
        if (this.searchAll) {
          this.loadDataByUrl(1, this.url.listAll)
        } else {
          this.loadData(1);
        }
      },
      /**
       * 数据抽取
       */
      handleDataExtraction: function () {
        //var param = {"WorkNo":this.workNo};
        // console.info('param -',param);
        this.loading = true;
        putAction(this.url.extract).then((res) => {
          if (res.success) {
            console.info('res -',res);
            this.loadData();
            this.$message.success(res.message);
          } else {
            this.$message.error(res.message,5);
          }
        }).finally(() => {
          this.loading = false;
        })
      },
      handleTransfer: function () {
        this.$refs.yjModalForm.showModal();
      },
      closeWindow: function () {
        // console.info('closeWindow');
        this.loadData();
      },
      beforeSearchQuery(url) {
        if (url) {
          //查询全部
          this.searchAll = true
        } else {
          this.searchAll = false
        }
      },
      handleTableChange (pagination, filters, sorter) {
        //分页、排序、筛选变化时触发
        //TODO 筛选
        if (Object.keys(sorter).length > 0) {
          this.isorter.column = sorter.field
          this.isorter.order = 'ascend' == sorter.order ? 'asc' : 'desc'
        }
        this.ipagination = pagination
        if (this.searchAll) {
          this.loadDataByUrl(undefined, this.url.listAll)
        } else {
          this.loadData();
        }
      },
    }

  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>