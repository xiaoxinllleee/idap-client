<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="统计月份">
              <a-month-picker  v-model="queryParam.tjyf" placeholder="请选择统计月份"/>
            </a-form-item>
          </a-col>
        <!--  <a-col :md="6" :sm="8">
            <a-form-item label=" 支行名称">
              <j-dict-select-tag v-model="queryParam.username" placeholder="请选择支行名称"
                                 dictCode="HR_BAS_ORGANIZATION,zzmc,zzbz"/>
            </a-form-item>
          </a-col>-->
          <a-col :md="6" :sm="8">
            <a-form-item label=" 支行名称">
              <j-tree-select
                v-decorator="['zhmc', {}]"
                placeholder="请选择支行"
                dict="hr_bas_organization,zzjc,zzbz"
                pidField="sjzzbz"
                :treeDefaultExpandAll="true"
              >
              </j-tree-select>
            </a-form-item>

          </a-col>

        <template v-if="toggleSearchStatus">
        <a-col :md="6" :sm="8">
            <a-form-item label="营销单元">
              <a-input placeholder="请输入营销单元" v-model="queryParam.yxdy"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="客户经理">
              <a-input placeholder="请输入客户经理" v-model="queryParam.khjl"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="信息完整度">
              <a-select placeholder="请选择信息完整度" style="width: 220px" @change="handleChange" v-model="queryParam.xxwzd" >
                <a-select-option value="1">不完备</a-select-option>
                <a-select-option value="2">较完备</a-select-option>
                <a-select-option value="3">基本完备</a-select-option>
                <a-select-option value="4">完备</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>


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
      <a-button type="primary" icon="area-chart" @click="initData"  >统计</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('客户信息完整度统计')">导出</a-button>

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
    <tjfxkhxxwzd-modal ref="modalForm" @ok="modalFormOk"></tjfxkhxxwzd-modal>
  </a-card>
</template>

<script>
  import TjfxkhxxwzdModal from './modules/TjfxkhxxwzdModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { getAction,putAction,httpAction } from '@/api/manage'
  import JSelectDepart from '@/components/jeecgbiz/JSelectDepart'
  import JTreeSelect from '../../../components/jeecg/JTreeSelect'
  export default {
    name: "TjfxkhxxwzdList",
    mixins:[JeecgListMixin],
    components: {
      TjfxkhxxwzdModal,JSelectDepart,JTreeSelect
    },
    data () {
      return {
        queryParam:[
        ],
        description: '客户信息完整度统计管理页面',
        // 表头
        /*tjyf :[queryParam.tjyf],*/
        // 查询条件
       /* tjyf:queryParam.tjyf,*/
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
            title: '统计月份',
            align:"center",
            dataIndex: 'tjyf',
            customRender:function (text) {
              return !text?"":(text.length>8?text.substr(0,7):text)
            },
            width:120
          },
		   {
            title: '支行名称',
            align:"center",
            dataIndex: 'zhmc'
           },
		   {
            title: '营销单元',
            align:"center",
            dataIndex: 'yxdy'
           },
		   {
            title: '客户经理',
            align:"center",
            dataIndex: 'khjl'
           },
		   {
            title: '信息完整度',
            align:"center",
            dataIndex: 'xxwzd'
           },
		   {
            title: '人数',
            align:"center",
            dataIndex: 'rs'
           },
		   {
            title: '占比',
            align:"center",
            dataIndex: 'zb'
           },
        ],
		url: {
          list: "/tjfx.xxwzdtj/tjfxkhxxwzd/list",
          delete: "/tjfx.xxwzdtj/tjfxkhxxwzd/delete",
          deleteBatch: "/tjfx.xxwzdtj/tjfxkhxxwzd/deleteBatch",
          exportXlsUrl: "tjfx.xxwzdtj/tjfxkhxxwzd/exportXls",
          importExcelUrl: "tjfx.xxwzdtj/tjfxkhxxwzd/importExcel",
          init: "/tjfx.xxwzdtj/tjfxkhxxwzd/init",

    },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
     /* initData(arg) {
        var params = this.getQueryParams();//查询条件
        if( params.tjyf == null || params.tjyf=='undefined'){
          this.$message.error("请输入统计月份!")
          return
        }
        let  lettjyf = params.tjyf.format("YYYYMM")+'01';
        alert(lettjyf);
        putAction("/tjfx.xxwzdtj/tjfxkhxxwzd/init", lettjyf,put).then((res) => {
          if(res.success){
            this.$message.success(res.message);
          }else{
            this.$message.warning(res.message,5);
          }
          this.loading = false;
        })
      },*/

      initData() {
        var params = this.getQueryParams();
        if( params.tjyf==null || params.tjyf=='undefined'){
          this.$message.error("请选择统计月份!")
          return
        }
        let tjyfstr=params.tjyf.format("YYYYMM")+'01';
        putAction(this.url.init, 'TJYF='+tjyfstr).then((res) => {
          if(res.success){
            this.$message.success(res.message);
          }else{
            this.$message.warning(res.message,5);
          }
        })
      },


     /* initData() {
        if (this.tjyf == '') {
          this.$message.error("请选择统计月份!")
        } else {
          httpAction("/tjfx.xxwzdtj/tjfxkhxxwzd/init", {queryParam: "3"}, 'put').then((res) => {
            if (res.success) {
              alert("统计成功！");
            } else {
              alert("统计失败！");
            }
          })
        }
        /!*httpAction("/tjfx.xxwzdtj/tjfxkhxxwzd/init",{tjyf:"3"},'put').then((res)=>{

        })*!/
      }*/


    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>