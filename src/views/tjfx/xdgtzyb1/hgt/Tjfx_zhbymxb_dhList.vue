<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="开始日期">
              <a-date-picker v-model="queryParam.ksrq" placeholder="请选择开始日期" style="width: 100%;"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="结束日期">
              <a-date-picker v-model="queryParam.jsrq" placeholder="请选择结束日期" style="width: 100%;"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="所属支行">
              <j-tree-select placeholder="请选择所属支行查询"
                             pid-field="sjzzbz"
                             :showSearch="true"
                             treeNodeFilterProp="title"
                             v-model="queryParam.sszh"
                             :sszh="true"
                             dict="hr_bas_organization, zzjc, zzbz"
                             :tree-default-expand-all="true"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8" >
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>

            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
<!--      <a-button type="primary" icon="area-chart" @click="initData">提取</a-button>-->
      <a-button type="primary" icon="download" @click="handleExportXls('支行行动挂图作业表1')">导出</a-button>
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
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }} </a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table ref="table"
               size="middle"
               bordered
               rowKey="id"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               :scroll="{ x: 3000 }"
               :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
               @change="handleTableChange">
        <span slot="action" slot-scope="text, record">
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
        </span>
        <span slot="hhbm" slot-scope="hhbm ,record" >
          <a @click="handlesszhEdit(record,'/tjfx/xdgtzyb1/grmx/Tjfx_zhbymxb_grList')">{{hhbm}}</a>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <tjfx_zhbymxb_dh-modal ref="modalForm" @ok="modalFormOk"></tjfx_zhbymxb_dh-modal>
  </a-card>
</template>

<script>
  import Tjfx_zhbymxb_dhModal from './modules/Tjfx_zhbymxb_dhModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { filterObj } from '@/utils/util';
  export default {
    name: "Tjfx_zhbymxb_dhList",
    mixins:[JeecgListMixin],
    components: {
      Tjfx_zhbymxb_dhModal,
      JTreeSelect
    },
    data () {
      return {
        description: '1管理页面',
        // 表头
        columns: [
          {
            title: '开始日期',
            align:"center",
            dataIndex: 'ksrq',
            sorter: (a, b) => b.jsrq.replace(/-/g, '/') - a.jsrq.replace(/-/g, '/'),
          },
          {
            title: '结束日期',
            align:"center",
            dataIndex: 'jsrq',
            sorter: (a, b) => b.jsrq.replace(/-/g, '/') - a.jsrq.replace(/-/g, '/'),
          },
          {
            title: '所属支行',
            align:"center",
            dataIndex: 'sszh_dictText'
          },
          {
            title: '行政村',
            align:"center",
            dataIndex: 'xzc'
          },
          {
            title: '组',
            align:"center",
            dataIndex: 'xzz_dictText'
          },
          {
            title: '户号编码',
            align:"center",
            dataIndex: 'hhbm',
            scopedSlots:{customRender:'hhbm'}
          },
          {
            title: '户主名称',
            align:"center",
            dataIndex: 'hzmc'
          },
          {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm',
          },
          {
            title: '责任人',
            align:"center",
            dataIndex: 'zkhjl_dictText'
          },

          {
            title: '该户是否本周走访',
            align:"center",
            dataIndex: 'sfbzzf_dictText'
          },
          {
            title: '客户类型',
            align:"center",
            dataIndex: 'khlx_dictText'
          },
          {
            title: '该户是否已走访',
            align:"center",
            dataIndex: 'sfyjzf_dictText'
          },
          {
            title: '该户是否本周评级',
            align:"center",
            dataIndex: 'sfbzpj_dictText'
          },
          {
            title: '单户人数',
            align:"center",
            dataIndex: 'dhrs'
          },
          {
            title: '该户本周授信金额',
            align:"center",
            dataIndex: 'bzsxje'
          },
          {
            title: '该户是否已评级',
            align:"center",
            dataIndex: 'sfyjpj_dictText'
          },
          {
            title: '该户累计授信金额',
            align:"center",
            dataIndex: 'ljsxje'
          },
          {
            title: '该户本周用信金额',
            align:"center",
            dataIndex: 'bzyxje'
          },
          {
            title: '该户累计用信金额',
            align:"center",
            dataIndex: 'ljyxje'
          },
        ],
        url: {
          list: "/tjfx_zhbymxb_dh/tjfx_zhbymxb_dh/list",
          delete: "/tjfx_zhbymxb_dh/tjfx_zhbymxb_dh/delete",
          deleteBatch: "/tjfx_zhbymxb_dh/tjfx_zhbymxb_dh/deleteBatch",
          exportXlsUrl: "tjfx_zhbymxb_dh/tjfx_zhbymxb_dh/exportXls",
          importExcelUrl: "tjfx_zhbymxb_dh/tjfx_zhbymxb_dh/importExcel",
        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      initData() {
        var params = this.queryParam;
        if( params.tjyf==null || params.tjyf=='undefined'){
          this.$message.error("请选择统计月份!")
          return
        }
        let tjyfstr=params.tjyf.format("YYYYMM")+'01';
        this.loading = true;
        putAction(this.url.init, 'TJYF='+tjyfstr,'put').then((res) => {
          if(res.success){
            this.loadData();
            this.$message.success(res.message);
          }else{
            this.$message.warning(res.message,5);
          }
          this.loading = false;
        })
      },
      getQueryParams(){
        let ksrqment  = "";
        let jsrqment  = "";
        let sszhvalue = this.$route.query.sszh;
        let ksrqvalue = this.$route.query.ksrq;
        let jsrqvalue = this.$route.query.jsrq;
        let xzcValue  = this.$route.query.xzc;
        let xzzValue  = this.$route.query.xzz;
        console.log(sszhvalue)
        if(this.queryParam.ksrq) {
          ksrqment = this.queryParam.ksrq.format("YYYY-MM-DD");
        }
        if(this.queryParam.jsrq) {
          jsrqment = this.queryParam.jsrq.format("YYYY-MM-DD");
        }
        if(ksrqvalue){
          ksrqment=ksrqvalue;
        }
        if(jsrqvalue){
          jsrqment=jsrqvalue;
        }
        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        param.ksrq     = ksrqment;
        param.jsrq     = jsrqment;
        if(sszhvalue) {
          param.sszh = sszhvalue;
        }
        if(xzcValue) {
          param.xzc = xzcValue;
        }
        if(xzzValue) {
          param.xzz = xzzValue;
        }
        this.$route.query.sszh=null;
        this.$route.query.ksrq=null;
        this.$route.query.jsrq=null;
        this.$route.query.xzc=null;
        this.$route.query.xzz=null;
        return filterObj(param);
      },
      handlesszhEdit: function(record,path) {
        console.log(path);
        console.log(record.sszh);
        this.$router.push({
          path: path,
          query: {
            sszh: record.sszh,
            ksrq: record.ksrq,
            jsrq: record.jsrq,
            xzc:  record.xzc,
            xzz:  record.xzz,
            hhbm: record.hhbm
          }
        })
      },

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>