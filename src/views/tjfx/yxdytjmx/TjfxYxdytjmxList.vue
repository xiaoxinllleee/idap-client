<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计月份">
              <a-month-picker v-model="queryParam.tjyf" placeholder="请选择统计月份" :defaultValue="defaultMonthOpera"
                              style="width: 100%;"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属支行">
              <j-tree-select placeholder="请选择所属支行查询" pid-field="sjzzbz" :showSearch="true" treeNodeFilterProp="title"
                             v-model="queryParam.sszh" :sszh="true" dict="hr_bas_organization, zzjc, zzbz" :tree-default-expand-all="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="开通业务">
              <j-dict-select-tag   v-model="queryParam.ktyw"   placeholder="请选择开通业务"
                                  dictCode="yxktyw"/>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户类型">
              <j-dict-select-tag  v-model="queryParam.khlx"   placeholder="请选择客户类型"
                                  dictCode="yxkhlx"/>
            </a-form-item> </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="客户级别">
                <j-dict-select-tag  v-model="queryParam.khjb"   placeholder="请选择客户级别"
                                    dictCode="yxkhdj"/>
              </a-form-item>
            </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
          <a-form-item label="证件号码">
            <j-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></j-input>
          </a-form-item>
        </a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="this.sReset" icon="reload" style="margin-left: 8px">重置</a-button>
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
      <a-button  type="primary" icon="plus">提取</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('1')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
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
        :scroll="{ x: 2600 }"
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

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <tjfxYxdytjmx-modal ref="modalForm" @ok="modalFormOk"></tjfxYxdytjmx-modal>
  </a-card>
</template>

<script>
  import TjfxYxdytjmxModal from './modules/TjfxYxdytjmxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JInput from '@/components/jeecg/JInput'
  import { filterObj } from '@/utils/util';
  import moment from 'moment'
  import { getAction,putAction,httpAction,downFile } from '@/api/manage'
  import yxdytjModal from '../yxdytj/modules/yxdytjModal'
  export default {
    name: "TjfxYxdytjmxList",
    mixins:[JeecgListMixin],
    components: {
      TjfxYxdytjmxModal,JTreeSelect,JInput
    },
    data () {
      return {
        description: '1管理页面',
        // 表头
        columns: [

		   {
            title: '统计月份',
            align:"center",
            dataIndex: 'tjyf',
         customRender: function (text) {
           return !text ? "" : (text.length > 8 ? text.substr(0, 7) : text)
         },
         sorter: true,
           },
		   {
            title: '所属支行',
            align:"center",
            dataIndex: 'sszh_dictText'
           },
		   {
            title: '所属营销单元',
            align:"center",
            dataIndex: 'ssyxdy_dictText',
         width:150,
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
            width:160,
          },
          {
            title: '客户类型',
            align:"center",
            dataIndex: 'khlx_dictText'
          },
          {
            title: '开通业务',
            align:"center",
            dataIndex: 'ktyw_dictText'
          },
          {
            title: '客户级别',
            align:"center",
            dataIndex: 'khjb_dictText'
          },
		   {
            title: '联系方式',
            align:"center",
            dataIndex: 'lxfs'
           },
		   {
            title: '地址',
            align:"center",
            dataIndex: 'dz'
         , width:160,
           },
		   {
            title: '性别',
            align:"center",
            dataIndex: 'xb_dictText'
           },
		   {
            title: '年龄',
            align:"center",
            dataIndex: 'nl'
           },
		   {
            title: '民族',
            align:"center",
            dataIndex: 'mz'
           },
		   {
            title: '婚姻状况',
            align:"center",
            dataIndex: 'hyzk_dictText'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'bz'
           },
          {
            title: '户号编码',
            align:"center",
            dataIndex: 'hhbm'
          },
          {
            title: '与户主关系',
            align:"center",
            dataIndex: 'yhzgx_dictText'
          },
          {
            title: '是否户主',
            align:"center",
            dataIndex: 'sfhz_dictText'
          },
		   {
            title: '原所属乡镇',
            align:"center",
            dataIndex: 'yssxz'
           },
		   {
            title: '原行政村',
            align:"center",
            dataIndex: 'yxzc'
           },
		  /* {
            title: '机构代码',
            align:"center",
            dataIndex: 'jgdm'
           },*/
		 /*  {
            title: '系统评定结果',
            align:"center",
            dataIndex: 'xtpdjg_dictText'
           },
		   {
            title: '系统评定说明',
            align:"center",
            dataIndex: 'xtpdsm'
           },*/

        /*  {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/tjfx_yxdytjmx/tjfxYxdytjmx/list",
          delete: "/tjfx_yxdytjmx/tjfxYxdytjmx/delete",
          deleteBatch: "/tjfx_yxdytjmx/tjfxYxdytjmx/deleteBatch",
          exportXlsUrl: "tjfx_yxdytjmx/tjfxYxdytjmx/exportXls",
          importExcelUrl: "tjfx_yxdytjmx/tjfxYxdytjmx/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      sReset() {
        this.$router.push({path: '/tjfx/yxdytjmx/TjfxYxdytjmxList'})
        this.flag = false;
        this.queryParam = {};
        this.loadData(1);
      },
      getQueryParams() {
        let tjyfMoment = "";
        let tjyfValue  = this.$route.query.tjyf;
        let yxktyw  = this.$route.query.yxktyw;
        let yxkhlx  = this.$route.query.yxkhlx;
        let yxkhjb  = this.$route.query.yxkhjb;
        if (this.queryParam.tjyf) {
          tjyfMoment = this.queryParam.tjyf.format("YYYY-MM")+'-01';
        }
        if (tjyfValue) {
          tjyfMoment = tjyfValue;
        }
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;

        if(yxktyw!=0&&yxktyw){
          param.ktyw = yxktyw;
        }
        if(yxkhlx!=0&&yxkhlx){
          param.khlx = yxkhlx;
        }
        if(yxkhjb!=0&&yxkhjb){
          param.khjb = yxkhjb;
        }
        this.$route.query.tjyf = null;
        return filterObj(param);
      },
      moment,
      getCurrentMonth() {
        let curDate = new Date();
        let curMonth= { year : curDate.getFullYear(), month: curDate.getMonth() + 1, }
        this.defaultMonthOpera = moment(curMonth.year+'-'+0+curMonth.month, this.monthFormat);
      },
      searchReset() {
        this.flag = false;
        this.queryParam = {};
        this.loadData(1);
      },
      loadData(arg) {
        this.getCurrentMonth();
        if(!this.url.list){
          this.$message.error("请设置url.list属性!")
          return
        }
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1;
        }
        var params = this.getQueryParams();//查询条件
        if ((params.tjyf=='undefined' || params.tjyf==null) && this.flag==true) {
          params.tjyf = this.defaultMonthOpera.format("YYYY-MM")+'-01';
        }
        this.loading = true;
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records;
            this.ipagination.total = res.result.total;
          }
          if(res.code===510){
            this.$message.warning(res.message,5)
          }
          this.loading = false;
        })
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>