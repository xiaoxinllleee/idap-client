<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构代码">
              <j-tree-select placeholder="请选择所属支行" v-model="queryParam.jgdm"
                             dict="V_HR_BAS_ORGANIZATION_CMMS,ZZJC,ywjgdm" pidField="SJYWJGDM" treeNodeFilterProp="title"
                             :sszh="true" :showSearch="false" :treeDefaultExpandAll="true" :filterTreeNode="true" :isAll="isAll"/>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户编号">
              <a-input placeholder="请输入客户编号" v-model="queryParam.khbh"></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户名称">
              <j-input placeholder="请输入客户名称" v-model="queryParam.khmc"></j-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <j-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></j-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户类型">
              <j-dict-select-tag placeholder="请选择客户类型" v-model="queryParam.khlx" dict-code="jx_khlx"/>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
          <a-form-item label="最早开户日期">
              <a-range-picker :placeholder="['开始日期', '结束日期']" v-model="queryParam.zzkhrq" :format="DateFormat"
                              @change="onEndDateChange" style="width: 100%;"/>
            </a-form-item>
          </a-col>

          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button  @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
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
      <!--<a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button @click="handleKhrl"  type="primary" icon="plus" v-has="'YjgsCkkhdfpxxb:khrl'">认领</a-button>
      <!--<a-button @click="handleKhfp"  icon="setting" v-has="'YjgsCkkhdfpxxb:khfp'">分配</a-button>-->
      <a-button @click="handleExtract" :loading="initLoading"  icon="area-chart" v-has="'YjgsCkkhdfpxxb:init'">提取</a-button>
      <a-button icon="download" @click="handleExportXls('存款客户待分配信息')" v-has="'YjgsCkkhdfpxxb:exp'">导出</a-button>
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
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <j-select-ckkhdfp-list-modal ref="Ckhkfp" @ok="modalFormOk" />
    <j-select-ckkhdrl-list-modal ref="Ckhkrl" @ok="modalFormOk" />
  </a-card>
</template>

<script>
  import JSelectCkkhdfpListModal from './modules/JSelectCkkhdfpListModal'
  import JSelectCkkhdrlListModal from './modules/JSelectCkkhdrlListModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JInput from '@/components/jeecg/JInput'
  import store from '@/store/'
  import { mapGetters } from 'vuex'
  import { filterObj } from '@/utils/util'
  import { getAction } from '@/api/manage'


  export default {
    name: "YjgsCkkhdfpxxbList",
    mixins:[JeecgListMixin],
    components: {
      JTreeSelect,JSelectCkkhdfpListModal,JSelectCkkhdrlListModal,JInput
    },
    data () {
      return {
        description: '存款客户待分配信息管理页面',
        toggleSearchStatus: true,
        isAll: false,
        sszh:'',
        DateFormat: 'YYYY-MM-DD',
        initLoading: false,
        // 表头
        columns: [
		   {
            title: '机构名称',
            align:"center",
            dataIndex: 'jgdm_dictText'
           },
		   {
            title: '客户编号',
            align:"center",
            dataIndex: 'khbh'
           },
		   {
            title: '客户名称',
            align:"center",
            dataIndex: 'khmc'
           },
		   /*{
            title: '证件类型',
            align:"center",
            dataIndex: 'zjlx_dictText'
           },*/
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm'
           },
		   {
            title: '客户类型',
            align:"center",
            dataIndex: 'khlx_dictText'
           },
		   {
            title: '产品信息',
            align:"center",
            dataIndex: 'cpxx'
           },
		   {
            title: '最早开户日期',
            align:"center",
            dataIndex: 'zzkhrq'
           },
		   {
            title: '存款余额',
            align:"center",
            dataIndex: 'ckye'
           },
		   {
            title: '存款月日平',
            align:"center",
            dataIndex: 'ckrpye'
           },
		   {
            title: '存款年日平',
            align:"center",
            dataIndex: 'cknrpye'
           },
		   // {
       //      title: '分配状态',
       //      align:"center",
       //      dataIndex: 'fpzt_dictText'
       //     },
		   {
            title: '录入标志',
            align:"center",
            dataIndex: 'lrbz_dictText'
           },
        ],
		url: {
          list: "/yjgs/ckkhdfpxx/list",
          delete: "/yjgs/ckkhdfpxx/delete",
          deleteBatch: "/yjgs/ckkhdfpxx/deleteBatch",
          exportXlsUrl: "/yjgs/ckkhdfpxx/exportXls",
          importExcelUrl: "/yjgs/ckkhdfpxx/importExcel",
          init: "/yjgs/ckkhdfpxx/init",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    created(){
      this.isAll = store.getters.isRoot
      this.sszh =store.getters.userInfo.orgCode
      console.log("-------------")
      console.log(store.getters)

    },
    methods: {
      ...mapGetters(["nickname", "avatar","userInfo"]),
      initQueryParams() {
        if(!store.getters.isRoot) {
          //this.queryParam.sszh = store.getters.userInfo.orgCode
        }
        this.paramsInited = true
      },

      getQueryParams() {
        var param = Object.assign({}, this.queryParam, this.isorter)
        param.field = this.getQueryField()
        param.pageNo = this.ipagination.current
        param.pageSize = this.ipagination.pageSize
        delete param.zzkhrq
        return filterObj(param)
      },


      searchReset: function() {
        this.queryParam = {}
        if(!store.getters.isRoot) {
          this.queryParam.jgdm = store.getters.ywjgdm
        }
        this.loadData(1);
      },

      onEndDateChange: function(value, dateString) {
        console.log("dateString");
        console.log(dateString)
        let dqrqDateString = dateString
        this.queryParam.zzkhrq_begin = dqrqDateString[0]
        this.queryParam.zzkhrq_end = dqrqDateString[1]
      },
      handleKhrl(){
        this.$refs.Ckhkrl.showModal(this.queryParam)
      },
      handleKhfp(){
        this.$refs.Ckhkfp.showModal()
      },
      handleExtract() {
        let params = {}
        this.initLoading = true;
        getAction(this.url.init, params).then((res) => {
          if (res.success) {
            this.loadData()
            this.$message.success(res.message)
          } else {
            this.$message.warning(res.message,5)
          }
          this.initLoading = false;
        })
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>