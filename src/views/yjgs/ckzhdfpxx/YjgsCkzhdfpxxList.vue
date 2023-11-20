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
            <a-form-item label="账号类型">
              <j-dict-select-tag placeholder="请选择账号类型" v-model="queryParam.zhlx" dict-code="ckzhlx"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="存款账号">
              <a-input placeholder="请输入存款账号" v-model="queryParam.ckzh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="开户日期">
              <a-range-picker :placeholder="['开始日期', '结束日期']" v-model="queryParam.khrq" :format="DateFormat"
                              @change="startDateChange" style="width: 100%;"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="到期日期">
              <a-range-picker :placeholder="['开始日期', '结束日期']" v-model="queryParam.dqrq" :format="DateFormat"
                              @change="onEndDateChange" style="width: 100%;"/>
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
      <!--<a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button @click="handleZhrl" type="primary" icon="plus" v-has="'YjgsCkzhdfpxx:zhrl'">认领</a-button>
      <!--<a-button @click="handleZhfp"  icon="setting" v-has="'YjgsCkzhdfpxx:zhfp'">分配</a-button>-->
      <a-button @click="handleExtract" icon="area-chart" v-has="'YjgsCkzhdfpxx:init'" :loading="extractLoading">提取</a-button>

      <a-button icon="download" @click="handleExportXls('存款账号待分配信息表')" v-has="'YjgsCkzhdfpxx:exp'">导出</a-button>
      <!--<a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>-->
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
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

        <!--<span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

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

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <yjgsCkzhdfpxx-modal ref="modalForm" @ok="modalFormOk"></yjgsCkzhdfpxx-modal>
    <j-select-ckzhdfp-list-modal ref="Ckzhfp" @ok="modalFormOk" />
    <j-select-ckzhdrl-list-modal ref="Ckzhrl" @ok="modalFormOk" />
  </a-card>
</template>

<script>
  import YjgsCkzhdfpxxModal from './modules/YjgsCkzhdfpxxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JInput from '@/components/jeecg/JInput'
  import store from '@/store/'
  import { mapGetters } from 'vuex'
  import { filterObj } from '@/utils/util'
  import { getAction } from '@/api/manage'
  import JSelectCkzhdfpListModal from './modules/JSelectCkzhdfpListModal'
  import JSelectCkzhdrlListModal from './modules/JSelectCkzhdrlListModal'

  export default {
    name: "YjgsCkzhdfpxxList",
    mixins:[JeecgListMixin],
    components: {
      YjgsCkzhdfpxxModal,JTreeSelect,JInput,JSelectCkzhdfpListModal,JSelectCkzhdrlListModal
    },
    data () {
      return {
        description: '存款账号待分配信息表管理页面',
        toggleSearchStatus: true,
        isAll: false,
        sszh:'',
        extractLoading: false,
        DateFormat: 'YYYY-MM-DD',
        // 表头
        columns: [
		   {
            title: '机构代码',
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
            dataIndex: 'zjlx'
           },*/
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm'
           },
		   {
            title: '存款账号',
            align:"center",
            dataIndex: 'ckzh'
           },
		   {
            title: '账号类型',
            align:"center",
            dataIndex: 'zhlx_dictText'
           },
		   {
            title: '开户日期',
            align:"center",
            dataIndex: 'khrq'
           },
		   {
            title: '到期日期',
            align:"center",
            dataIndex: 'dqrq'
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
          /*{
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/yjgs/ckzhdrlxx/list",
          delete: "/yjgs/ckzhdrlxx/delete",
          deleteBatch: "/yjgs/ckzhdrlxx/deleteBatch",
          exportXlsUrl: "/yjgs/ckzhdrlxx/exportXls",
          importExcelUrl: "/yjgs/ckzhdrlxx/importExcel",
          init: "/yjgs/ckzhdrlxx/init",
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

      startDateChange:function(value, dateString) {
        console.log("dateString");
        console.log(dateString)
        let khrqDateString = dateString
        this.queryParam.khrq_begin = khrqDateString[0]
        this.queryParam.khrq_end = khrqDateString[1]
      },
      onEndDateChange: function(value, dateString) {
        let dqrqDateString = dateString
        this.queryParam.dqrq_begin = dqrqDateString[0]
        this.queryParam.dqrq_end  = dqrqDateString[1]
      },

      handleZhrl(){
        this.$refs.Ckzhrl.showModal(this.queryParam)
      },
      handleZhfp(){
        this.$refs.Ckzhfp.showModal()
      },
      handleExtract() {
        let params = {}
        this.extractLoading = true;
        getAction(this.url.init, params).then((res) => {
          if (res.success) {
            this.loadData()
            this.$message.success(res.message)
          } else {
            this.$message.warning(res.message,5)
          }
          this.extractLoading = false;
        })
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>