<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计月份">
              <a-month-picker v-model="queryParam.tjyf" placeholder="请选择统计月份" :defaultValue="defaultMonthOpera"
                              :format="monthFormat" style="width: 100%;"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24"><a-form-item label="所属支行">
            <j-tree-select placeholder="请选择所属支行查询" pid-field="sjzzbz" :showSearch="true" treeNodeFilterProp="title"
                           v-model="queryParam.zzbz" :sszh="true" dict="hr_bas_organization, zzjc, zzbz" :tree-default-expand-all="true"/>
          </a-form-item></a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24"><a-form-item label="营销单元名称">
            <j-input placeholder="请输入营销单元名称" v-model="queryParam.dymc"/>
          </a-form-item></a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="营销单元编号">
              <a-input placeholder="请输入营销单元编号" v-model="queryParam.dybh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="归属客户经理编号">
              <a-input placeholder="请输入归属客户经理编号" v-model="queryParam.khjlbh"></a-input>
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
        :scroll="{ x: 6600 }"
        @change="handleTableChange">

<span slot="ckye" slot-scope="ckye ,record" >
          <a @click="handlesszhEdit(record,'/tjfx/xdgtzyb/xdgtzyb2/zhxdgtzyb2/Zhxtgtzyb2List')">{{ckye}}</a>
        </span>


        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">详情</a>

<!--          <a-divider type="vertical" />-->
        <!--  <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>-->
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <yxdytj-modal ref="modalForm" @ok="modalFormOk"></yxdytj-modal>
  </a-card>
</template>

<script>
  import yxdytjModal from './modules/yxdytjModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JInput from '@/components/jeecg/JInput'
  import { filterObj } from '@/utils/util';
  import moment from 'moment'
  import { getAction,putAction,httpAction,downFile } from '@/api/manage'
  export default {
    name: "yxdytjList",
    mixins:[JeecgListMixin],
    components: {
      yxdytjModal,JTreeSelect,JInput
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
            title: '营销单元编号',
            align:"center",
            dataIndex: 'dybh'
          },
          {
            title: '营销单元名称',
            align:"center",
            dataIndex: 'dymc'
          },
          {
            title: '营销单元性质',
            align:"center",
            dataIndex: 'dyxz_dictText'
          },
          {
            title: '所属支行',
            align:"center",
            dataIndex: 'zzbz_dictText'
          },
          {
            title: '归属客户经理',
            align:"center",
            dataIndex: 'khjlbz_dictText'
          },
       /*   {
            title: '总户数',
            align:"center",
            dataIndex: 'zhs'
          },*/
		   {
            title: '存款余额  ',
            align:"center",
            dataIndex: 'ckye'
         , scopedSlots:{customRender:'ckye'}
           },
		 /*  {
            title: '存款户数',
            align:"center",
            dataIndex: 'ckhs'
           },*/
		   {
            title: '贷款余额',
            align:"center",
            dataIndex: 'dkye'
         , scopedSlots:{customRender:'ckye'}
           },
		   {
            title: '贷款金额',
            align:"center",
            dataIndex: 'ckje'
           },
		  /* {
            title: '贷款户数 ',
            align:"center",
            dataIndex: 'dkhs'
           },*/
		  /* {
            title: '不良贷款余额 ',
            align:"center",
            dataIndex: 'bldkye'
           },
		   {
            title: '不良贷款户数',
            align:"center",
            dataIndex: 'bldkhs'
           },
		   {
            title: '表外不良贷款户数',
            align:"center",
            dataIndex: 'bwbldkhs'
         ,width:140
           },
		   {
            title: '表外不良贷款余额 ',
            align:"center",
            dataIndex: 'bwbldkye'
         ,width:140
           },
		   {
            title: '手机银行户数  ',
            align:"center",
            dataIndex: 'sjyhhs'
           },
		   {
            title: 'ETC户数 ',
            align:"center",
            dataIndex: 'etchs'
           },
		   {
            title: '网上银行户数',
            align:"center",
            dataIndex: 'wsyhhs'
           },
		   {
            title: '福民卡户数',
            align:"center",
            dataIndex: 'fmkhs'
           },
		   {
            title: '社保卡户数',
            align:"center",
            dataIndex: 'sbkhs'
           },
		   {
            title: '信用卡户数',
            align:"center",
            dataIndex: 'xykhs'
           },
		   {
            title: 'POS机户数',
            align:"center",
            dataIndex: 'posjhs'
           },
		   {
            title: '扫码付户数',
            align:"center",
            dataIndex: 'smfhs'
           },
		   {
            title: '潜在客户数',
            align:"center",
            dataIndex: 'qzkhs'
           },
		   {
            title: '吸毒人员数',
            align:"center",
            dataIndex: 'xdrys'
           },
		   {
            title: '贫困户户数',
            align:"center",
            dataIndex: 'pkhhs'
           },
		   {
            title: '低保户户数',
            align:"center",
            dataIndex: 'dbhhs'
           },*/
		   {
            title: '本月走访户数',
            align:"center",
            dataIndex: 'byzfhs'
           },
		   {
            title: '累计走访户数',
            align:"center",
            dataIndex: 'ljzfhs'
           },
		   {
            title: '本月评级户数',
            align:"center",
            dataIndex: 'bypjhs'
           },
		   {
            title: '累计评级户数',
            align:"center",
            dataIndex: 'ljpjhs'
           },
		   {
            title: '本月建档人数',
            align:"center",
            dataIndex: 'byjdrs'
           },
		   {
            title: '累计建档人数',
            align:"center",
            dataIndex: 'ljjdrs'
           },
		   {
            title: '本月授信客户数',
            align:"center",
            dataIndex: 'bysxkhs'
           },
		   {
            title: '累计授信客户数',
            align:"center",
            dataIndex: 'ljsykhs'
           },
		   {
            title: '本月用信客户数',
            align:"center",
            dataIndex: 'byyxkhs'
           },
		   {
            title: '累计用信客户数',
            align:"center",
            dataIndex: 'ljyxkhs'
           },
		   {
            title: '本月授信金额',
            align:"center",
            dataIndex: 'bysxje'
           },
		   {
            title: '累计授信金额',
            align:"center",
            dataIndex: 'ljsxje'
           },
		   {
            title: '本月用信金额',
            align:"center",
            dataIndex: 'byyxje'
           },
		   {
            title: '累计用信金额',
            align:"center",
            dataIndex: 'ljyxje'
           },
		   {
            title: '授信户数',
            align:"center",
            dataIndex: 'sxhs'
           },
		   {
            title: '预授信户数',
            align:"center",
            dataIndex: 'ysxhs'
           },
		   {
            title: '用信户数',
            align:"center",
            dataIndex: 'yxhs'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
            fixed: "right",
            width: 100
          }
        ],
		url: {
          list: "/tjfxyxdytj/yxdytj/list",
          delete: "/tjfxyxdytj/yxdytj/delete",
          deleteBatch: "/tjfxyxdytj/yxdytj/deleteBatch",
          exportXlsUrl: "tjfxyxdytj/yxdytj/exportXls",
          importExcelUrl: "tjfxyxdytj/yxdytj/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      getQueryParams() {
        let tjyfMoment = "";
        let tjyfValue  = this.$route.query.tjyf;
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
        param.tjyf = tjyfMoment;
        this.$route.query.tjyf = null;
        return filterObj(param);
      },
      handlesszhEdit: function(record,path) {
        console.log(path);
        console.log(record.sszh);
        console.log(record.tjyf);
        this.$router.push({path: path, query: {sszh: record.sszh,tjyf:record.tjyf}})
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