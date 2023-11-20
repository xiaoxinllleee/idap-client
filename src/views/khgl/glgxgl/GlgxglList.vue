<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="转移类型">
              <j-dict-select-tag placeholder="请选择转移类型" v-model="queryParam.zylx" dictCode="zylx"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属支行">
              <j-tree-select placeholder="请选择所属支行" v-model="queryParam.sszh"
                             dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                             :sszh="true" :showSearch="true" :treeDefaultExpandAll="true" :filterTreeNode="true" :isAll="isAll"/>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="镇">
              <j-dict-select-tag placeholder="镇" v-model="queryParam.yjyxdy"  @input="getyjyxdybh" dict-code="YXDYGL_YJYXDYGL,DYMC,DYBH"  />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="村">
              <j-dict-select-tag placeholder="村" v-model="queryParam.ejyxdy"  :disabled=this.sfjsejyxdy  @input="getejyxdybh" :dict-code="this.ejyxdyDictCode"  />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="组">
              <j-dict-select-tag placeholder="组" v-model="queryParam.sjyxdy"   @input="getsjyxdybh"  :dict-code="this.sjyxdyDictCode" />
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

      <a-button @click="yjzyModules" type="primary" icon="plus">一键转移</a-button>
      <a-button @click="khzyModules" type="primary" icon="plus">客户转移</a-button>

      <a-button type="primary" icon="download" :loading="exportLoading" @click="handleExportXls('关联关系管理')">导出</a-button>

      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <!--<div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>-->

      <a-table
        ref="table"
        size="small"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange">



      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->

    <yjzy-modal ref="modalForm" @ok="modalFormOk"></yjzy-modal>
    <khzy-modal ref="khzyForm" @ok="modalFormOk"></khzy-modal>

  </a-card>
</template>

<script>
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import YjzyModal from './modules/YjzyModal'
  import KhzyModal from './modules/KhzyModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import YxglJzyxModal from '../../yxgl/jzyx/modules/YxglJzyxModal'
  import store from '@/store/'
  import { mapGetters } from 'vuex'

  export default {
    name: "GlgxglList",
    mixins:[JeecgListMixin],
    components: {
      YxglJzyxModal, YjzyModal,JTreeSelect,KhzyModal
    },
    data () {
      return {
        description: '客户转移管理功能页面',
        isAll: false,
        loading: false,
        // 表头
        columns: [
          {
            title: '转移类型',
            align:"center",
            dataIndex: 'zylx_dictText'
          },
          {
            title: '所属支行',
            align:"center",
            dataIndex: 'sszh_dictText'
          },
          {
            title: '镇',
            align:"center",
            dataIndex: 'yjyxdy_dictText'
          },
          {
            title: '村',
            align:"center",
            dataIndex: 'ejyxdy_dictText'
          },
          {
            title: '组',
            align:"center",
            dataIndex: 'sjyxdy_dictText'
          },
          {
            title: '客户名称',
            align:"center",
            dataIndex: 'khmc'
          },
          {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm'
          },
          {
            title: '客户性质',
            align:"center",
            dataIndex: 'khxz_dictText'
          },
          {
            title: '原客户经理',
            align:"center",
            dataIndex: 'ykhjl_dictText'
          },
          {
            title: '转移后客户经理',
            align:"center",
            dataIndex: 'zyhkhjl_dictText'
          },
          {
            title: '操作员',
            align:"center",
            dataIndex: 'czy'
          },
          {
            title: '操作时间',
            align:"center",
            dataIndex: 'czsj'
          },

        ],
        url: {
          list: "/khgl/khglgx/glgxgl/list",
          delete: "/khgl/khglgx/glgxgl/delete",
          deleteBatch: "/khgl/khglgx/glgxgl/deleteBatch",
          exportXlsUrl: "khgl/khglgx/glgxgl/exportXls",
          importExcelUrl: "khgl/khglgx/glgxgl/importExcel",
        },
        ejyxdyDictCode:'YXDYGL_EJYXDYGL,DYMC,DYBH',
        sjyxdyDictCode:'YXDYGL_SJYXDYGL,DYMC,DYBH',
        sfjsejyxdy:true,
        sfjssjyxdy:true,
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    created(){
      this.isAll = store.getters.isRoot
    },
    methods: {
      ...mapGetters(["nickname", "avatar","userInfo"]),
      initQueryParams() {
        if(!store.getters.isRoot) {
          this.queryParam.sszh = store.getters.userInfo.orgCode
        }
        this.paramsInited=true
      },
      searchReset: function() {
        this.queryParam = {}
        if(!store.getters.isRoot) {
          this.queryParam.sszh = store.getters.userInfo.orgCode
        }
        this.loadData(1);
      },
      getyjyxdybh(value) {
       if (value) {
          let yjyxdybh = value;
          console.log('-----------------')
         console.log(yjyxdybh)
         this.ejyxdyDictCode = "YXDYGL_EJYXDYGL,DYMC,DYBH,YJYXDYBH = " + yjyxdybh;
         this.sfjsejyxdy=false
        }
      },
      getejyxdybh(value){
       if(value) {
           let ejyxdybh=value;
           this.sjyxdyDictCode = "YXDYGL_SJYXDYGL,DYMC,DYBH,EJYXDYBH = "+ejyxdybh;
        }
      },
      getsjyxdybh(value){
        this.sfjssjyxdy=false
      },
      yjzyModules(){
        this.$refs.modalForm.visible = true;
        //this.$refs.modalForm.ceshi();
        this.loadData(1);
      },
      khzyModules(){
        this.$refs.khzyForm.visible = true;
        this.loadData(1);
      },

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>