<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="提醒年份">
              <a-select    :defaultValue="dateValue" @change="selectValue"  placeholder="请选择">
                <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构代码">
              <j-tree-select placeholder="请选择机构查询"
                             pid-field="sjywjgdm"
                             :showSearch="true"
                             treeNodeFilterProp="title"
                             v-model="queryParam.jgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :tree-default-expand-all="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="本次贷后检查是否已完成">
              <j-dict-select-tag placeholder="请选择本次贷后检查是否已完成" v-model="queryParam.bcnjsfywc" dictCode="sfbz"></j-dict-select-tag>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
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
            <a-form-item label="单户贷款金额">
              <a-input-group compact>
                <a-input placeholder="Min"
                         v-model="queryParam.dkje_begin"
                         style=" width: 40%; text-align: center; "/>
                <a-input placeholder="~"
                         disabled
                         style=" width: 20%; border-left: 0; pointer-events: none; backgroundColor: #FFF; "/>
                <a-input placeholder="Max"
                         v-model="queryParam.dkje_end"
                         style="width: 40%; text-align: center; border-left: 0;"/>
              </a-input-group>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="单户贷款余额">
              <a-input-group compact>
                <a-input placeholder="Min"
                         v-model="queryParam.dkye_begin"
                         style=" width: 40%; text-align: center; "/>
                <a-input placeholder="~"
                         disabled
                         style=" width: 20%; border-left: 0; pointer-events: none; backgroundColor: #FFF; "/>
                <a-input placeholder="Max"
                         v-model="queryParam.dkye_end"
                         style="width: 40%; text-align: center; border-left: 0;"/>
              </a-input-group>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('湘潭贷后检查提醒')">导出</a-button>

      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
  <!--    <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
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
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <fxgljcDhjctx-modal ref="modalForm" @ok="modalFormOk"></fxgljcDhjctx-modal>
  </a-card>
</template>

<script>
  import FxgljcDhjctxModal from './modules/FxgljcDhjctxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'
  import JInput from '@comp/jeecg/JInput'
  import { filterObj } from '@/utils/util'
  import { getAction } from '@api/manage'

  export default {
    name: "FxgljcDhjctxList",
    mixins:[JeecgListMixin],
    components: {
      FxgljcDhjctxModal,JTreeSelect,JInput
    },
    data () {
      return {
        description: '湘潭贷后检查提醒管理页面',
        dateValue:'',
        jgdmvalue:'',
        zjhmvalue:'',
        // 表头
        columns: [

          {
            title: '提醒年份',
            align:"center",
            dataIndex: 'tjnf',
            customRender:function (text) {
              return !text?"":(text.length>8?text.substr(0,4):text)
            },
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
            title: '客户经理员工号',
            align:"center",
            dataIndex: 'khjlyggh'
          },
          {
            title: '客户经理姓名',
            align:"center",
            dataIndex: 'khjlyggh_dictText'
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
            title: '单户贷款金额',
            align:"center",
            dataIndex: 'dkje'
          },
          {
            title: '单户贷款余额',
            align:"center",
            dataIndex: 'dkye'
          },
          {
            title: '最新借款日期',
            align:"center",
            dataIndex: 'jkrq'
          },
          {
            title: '检查到期日期',
            align:"center",
            dataIndex: 'dqrq'
          },
          {
            title: '附件类型',
            align:"center",
            dataIndex: 'txlx_dictText'
          },
          {
            title: '未上传报告类型',
            align:"center",
            dataIndex: 'wsc'
          },
		   {
            title: '本次贷后检查是否已完成',
            align:"center",
            dataIndex: 'bcnjsfywc_dictText'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/dhjctx110/fxgljcDhjctx/list",
          delete: "/dhjctx110/fxgljcDhjctx/delete",
          deleteBatch: "/dhjctx110/fxgljcDhjctx/deleteBatch",
          exportXlsUrl: "dhjctx110/fxgljcDhjctx/exportXls",
          importExcelUrl: "dhjctx110/fxgljcDhjctx/importExcel",
       },
    }
  },
/*    mounted() {
        this.jgdmvalue = this.$route.query.jgdm;
        this.zjhmvalue = this.$route.query.zjhm;
    },*/
    watch: {
      // 监听路由变化
      '$route': {
        handler:function (to, from) {
          console.log('路由变化了')
          console.log('路由变化了to=='+to)
          console.log('路由变化了from=='+from)
          let num =this.$route.query.num;
          this.loadData(1,num)
        },
        deep:true,
        immediate: true,
      }

    },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    created() {
      this.init();
    },
    methods: {
      selectValue(val){
        console.log(val)
        this.queryParam.tjnf=val;
      },
      init(){
        var myDate = new Date;
        var year = myDate.getFullYear();//获取当前年
        this.dateValue=year;
        this.initSelectYear(year)
      },
      initSelectYear(year){
        this.years = [];
        for(let i=0;i<30;i++){
          this.years.push({value:((year - i)+'-01-01'),label:((year - i)+'')});
        }
      },
      getQueryParams(num){
        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (num=='1'){
            param.jgdm = this.$route.query.jgdm;
            param.zjhm=this.$route.query.zjhm;
        }
        return filterObj(param);
      },
      searchReset () {
        this.jgdmvalue=''
        this.zjhmvalue=''
        this.queryParam = {}
        this.loadData(1)
      },
      loadData (arg,num) {
        if (!this.url.list) {
          this.$message.error('请设置url.list属性!')
          return
        }
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1
        }
        var params = this.getQueryParams(num)//查询条件

        console.info(params)
        this.loading = true
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records
            this.ipagination.total = res.result.total
            this.loading = false
          } else {
            this.dataSource = []
            this.ipagination.total = 0
            this.loading = false
          }
          if (res.code === 510) {
            this.$message.warning(res.message,5)
            this.loading = false
          }
        }).finally(() => {
          this.jgdmvalue =''
          this.zjhmvalue =''
          this.loading = false;
        })
      },

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>