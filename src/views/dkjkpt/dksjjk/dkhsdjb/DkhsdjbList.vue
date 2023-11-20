<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8"><a-form-item label="收回日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-range-picker :placeholder="['开始时间', '结束时间']"
                            v-model="queryParam.createTimeRange"
                            style="width: 100%"
                            format="YYYY-MM-DD"
                            @change="onDateChange"/>
          </a-form-item></a-col>

          <a-col :md="6" :sm="8"><a-form-item label="机构代码">
            <j-tree-select placeholder="请选择机构查询"
                           pid-field="sjywjgdm"
                           :showSearch="true"
                           treeNodeFilterProp="title"
                           v-model="queryParam.jgdm"
                           v-decorator="['jgdm', {rules: [{required: true, message: '请选择机构查询！'}]}]"
                           dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                           :tree-default-expand-all="true"/>
          </a-form-item></a-col>

          <a-col :md="6" :sm="8"><a-form-item label="客户姓名">
            <a-input placeholder="请输入客户姓名" v-model="queryParam.khmc"></a-input>
          </a-form-item></a-col>

          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8"><a-form-item label="证件号码">
            <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
          </a-form-item></a-col>

            <a-col :md="6" :sm="8"><a-form-item label="贷款账号">
            <a-input placeholder="请输入贷款账号" v-model="queryParam.dkzh"></a-input>
          </a-form-item></a-col>
          </template>

          <a-col :md="6" :sm="8" >
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
      <a-button @click="handleExtract" icon="area-chart" v-has="'dkhsdjb:init'">提取</a-button>
      <a-button icon="download"
                @click="handleExportXls('贷款回收登记簿')" v-has="'dkhsdjb:exportXls'">导出</a-button>
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
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择
        <a style="font-weight: 600">{{ selectedRowKeys.length }}</a> 项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>

        <span style="float: right;">
          <a @click="loadData"><a-icon type="sync"/>刷新</a>

          <a-divider type="vertical"/>

          <a-popover title="自定义列"
                     trigger="click"
                     placement="bottomLeft">
            <template slot="content">
              <a-checkbox-group @change="onColSettingsChange"
                                v-model="settingColumns"
                                :defaultValue="settingColumns">
                <a-row><template v-for="(item,index) in defColumns">
                    <template v-if="item.key!='rowIndex'&& item.dataIndex!='action'">
                        <a-col :md="8" :sm="8"><a-checkbox :value="item.dataIndex">
                          {{ item.title }}
                        </a-checkbox></a-col>
                    </template>
                </template></a-row>
              </a-checkbox-group>
            </template>
            <a><a-icon type="setting" />自定义列</a>
          </a-popover>
        </span>
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
        :scroll="{ x: 3000 }"
        @change="handleTableChange">

        <!-- 字符串超长截取省略号显示 -->
        <span slot="zjhm" slot-scope="text">
          <j-ellipsis :value="text" :length="8" />
        </span>
        <span slot="action" slot-scope="text, record">
          <!--<a @click="handleDetail(record)">详情</a>
          <a-divider type="vertical" />-->
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
            <a>删除</a>
          </a-popconfirm>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <dkhsdjb-modal ref="modalForm" @ok="modalFormOk"></dkhsdjb-modal>
  </a-card>
</template>

<script>
  import DkhsdjbModal from './modules/DkhsdjbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import {initDictOptions, filterDictText} from '@/components/dict/JDictSelectUtil'
  import JEllipsis from "@/components/jeecg/JEllipsis"
  import Vue from 'vue'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { filterObj } from '@/utils/util'
  import { getAction,putAction,httpAction,downFile } from '@/api/manage'

  export default {
    name: "DkhsdjbList",
    mixins:[JeecgListMixin],
    components: {
      JTreeSelect,
      DkhsdjbModal,
      JEllipsis
    },
    data () {
      return {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        description: '贷款回收登记簿管理页面',
        columns: [],
        settingColumns:[],
        dbfsDictOptions: [],
        // 表头
        defColumns: [
          {
            title: '收回日期',
            align:"center",
              dataIndex: 'shrq',
            width: 100
          },
		      {
            title: '机构代码',
            align:"center",
            dataIndex: 'jgdm_dictText',
            width: 100
          },
		      {
            title: '客户姓名',
            align:"center",
            dataIndex: 'khmc',
            width: 100
          },
		      {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm',
            scopedSlots: { customRender: 'zjhm' },
            width: 150
          },
		      {
            title: '贷款账号',
            align:"center",
            dataIndex: 'dkzh',
            width: 150
          },
		      {
            title: '便民卡卡号',
            align:"center",
            dataIndex: 'bmkkh',
            width: 150
          },
         /* {
            title: '信贷贷款品种',
            align:"center",
            dataIndex: 'xddkpz_dictText',
            width: 150
          },*/
		      {
            title: '产品名称',
            align:"center",
            dataIndex: 'cpmc',
            width: 150
          },
		      {
            title: '担保方式',
            align:"center",
            dataIndex: 'dbfs_dictText',
            width: 150,
          },
          {
            title: '贷款形态',
            align:"center",
            dataIndex: 'dkxt_dictText',
            width: 150
          },
		      {
            title: '第一责任人',
            align:"center",
            dataIndex: 'dyzrr',
            width: 100
          },
		      {
            title: '主客户经理',
            align:"center",
            dataIndex: 'zkhjl',
            width: 100
          },
		      {
            title: '借款日期',
            align:"center",
            dataIndex: 'jkrq',
            width: 100
          },
		      {
            title: '到期日期',
            align:"center",
            dataIndex: 'dqrq',
            width: 100
          },
		      {
            title: '贷款金额',
            align:"center",
            dataIndex: 'dkje',
            width: 100
          },
		      {
            title: '贷款余额',
            align:"center",
            dataIndex: 'dkye',
            width: 100
          },
		      {
            title: '还款账号',
            align:"center",
            dataIndex: 'hkzh',
            scopedSlots: { customRender: 'hkzh' },
            width: 150
          },
		      {
            title: '剩余天数',
            align:"center",
            dataIndex: 'syts',
            width: 100
          },

		      {
            title: '收回本金',
            align:"center",
            dataIndex: 'shbj',
            width: 100
          },
		      {
            title: '收回利息',
            align:"center",
            dataIndex: 'shlx',
            width: 100
          },
		      {
            title: '收回罚息',
            align:"center",
            dataIndex: 'shfx',
            width: 100
          },
		      {
            title: '录入时间',
            align:"center",
            dataIndex: 'lrsj',
            width: 100
          },
		      {
            title: '录入标识',
            align:"center",
            dataIndex: 'lrbz',
            width: 100
          },
		      {
            title: '录入人',
            align:"center",
            dataIndex: 'lrr',
            width: 100
          },

        ],
		    url: {
          list: "/dkhsdjbmx/dkhsdjbmx/list",
          delete: "/dkhsdjbmx/dkhsdjbmx/delete",
          deleteBatch: "/dkhsdjbmx/dkhsdjbmx/deleteBatch",
          exportXlsUrl: "dkhsdjbmx/dkhsdjbmx/exportXls",
          importExcelUrl: "dkhsdjbmx/dkhsdjbmx/importExcel",
          init: "/dkhsdjbmx/dkhsdjbmx/init",

        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {


      // 重置
      searchReset(){
        var that = this;
        that.queryParam = {}; //清空查询区域参数
        that.loadData(this.ipagination.current);
      },

      initDictConfig() {
        //初始化字典 - 担保方式
        initDictOptions('dbfs').then((res) => {
          if (res.success) {
            this.dbfsDictOptions = res.result;
          }
        });
      },
      //列设置更改事件
      onColSettingsChange (checkedValues) {
        var key = this.$route.name + ":colsettings";
        Vue.ls.set(key, checkedValues, 7 * 24 * 60 * 60 * 1000)
        this.settingColumns = checkedValues;
        const cols = this.defColumns.filter(item => {
          if(item.key =='rowIndex' || item.dataIndex=='action') {
            return true;
          }
          if(this.settingColumns.includes(item.dataIndex)) {
            return true;
          }
          return false;
        })
        this.columns = cols;
      },
      initColumns(){
        var key = this.$route.name + ":colsettings";
        let colSettings = Vue.ls.get(key);
        if(colSettings==null || colSettings==undefined){
          let allSettingColumns = [];
          this.defColumns.forEach(function (item, i, array) {
            allSettingColumns.push(item.dataIndex);
          })
          this.settingColumns = allSettingColumns;
          this.columns = this.defColumns;
        } else {
          this.settingColumns = colSettings;
          const cols = this.defColumns.filter(item => {
            if(item.key =='rowIndex' || item.dataIndex=='action') {
              return true;
            }
            if(colSettings.includes(item.dataIndex)) {
              return true;
            }
            return false;
          })
          this.columns = cols;
        }
      },
      handleExtract() {
        this.loading = true;
        let params = {}
        getAction(this.url.init, params).then((res) => {
          if (res.success) {
            this.loadData()
            this.$message.success(res.message)
          } else {
            this.$message.warning(res.message,5)
          }
          this.loading = false;
        })
      },
      onDateChange: function (value, dateString) {
        console.log(dateString[0],dateString[1]);
        this.queryParam.shrq_begin=dateString[0];
        this.queryParam.shrq_end=dateString[1];
      },
      getQueryParams(){
        console.log("---"+this.queryParam.createTimeRange)
        var param = Object.assign({}, this.queryParam,this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        delete param.createTimeRange; // 时间参数不传递后台
        delete param.shrq;
        return filterObj(param);
      },
      handleExportXls(fileName){

        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        let param = {...this.queryParam};
        // if(this.selectedRowKeys && this.selectedRowKeys.length>0){
        //   param['selections'] = this.selectedRowKeys.join(",")
        // }
        console.log("导出参数",param)
        delete param.createTimeRange; // 时间参数不传递后台
        delete param.shrq;
        downFile(this.url.exportXlsUrl+"?begin="+param.shrq_begin+"&end="+param.shrq_end,param).then((data)=>{
          if (!data) {
            this.$message.warning("文件下载失败")
            return
          }
          var blob = new Blob([data]);
          if('msSaveOrOpenBlob' in navigator){
            window.navigator.msSaveOrOpenBlob(blob, fileName+'.xls');
            return;
          }
          var eleLink = document.createElement('a');
          eleLink.download = fileName+'.xls';
          eleLink.style.display = 'none'
          eleLink.href = URL.createObjectURL(blob);
          document.body.appendChild(eleLink);
          eleLink.click();
          document.body.removeChild(eleLink);
        })
      },

    },
    created() {
      this.initColumns();
    },
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>