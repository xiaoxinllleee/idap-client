<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8">
            <a-form-item label="附件年份">
              <a-select placeholder="请选择附件年份" v-model="queryParam.fjnf" @change="selectValue">
                <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="机构代码">
              <j-tree-select placeholder="请选择机构查询"
                             pid-field="sjywjgdm"
                             :showSearch="true"
                             treeNodeFilterProp="title"
                             v-model="queryParam.jgdm"
                             v-decorator="['jgdm', {rules: [{required: true, message: '请选择机构查询！'}]}]"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :tree-default-expand-all="true"/>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <a-form-item label="客户姓名">
              <j-input placeholder="请输入客户姓名" v-model="queryParam.khmc"/>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8">
              <a-form-item label="证件号码">
                <a-input placeholder="请输入贷款账号" v-model="queryParam.zjhm"></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="7" :sm="6">
              <a-form-item label="附件时间节点">
                <a-select placeholder="请选择时间节点" v-model="queryParam.fjsjjd" style="width: 100%;">
                  <a-select-opt-group label="首发跟踪">
                    <a-select-option value="8">首发跟踪</a-select-option>
                  </a-select-opt-group>
                  <a-select-opt-group label="季度跟踪">
                    <a-select-option value="1">第一季度</a-select-option>
                    <a-select-option value="2">第二季度</a-select-option>
                    <a-select-option value="3">第三季度</a-select-option>
                    <a-select-option value="4">第四季度</a-select-option>
                  </a-select-opt-group>
                  <a-select-opt-group label="半年跟踪">
                    <a-select-option value="5">上半年</a-select-option>
                    <a-select-option value="6">下半年</a-select-option>
                  </a-select-opt-group>
                  <a-select-opt-group label="年度跟踪">
                    <a-select-option value="7">年度</a-select-option>
                  </a-select-opt-group>
                </a-select>
              </a-form-item>
            </a-col>
          </template>


          <a-col :md="6" :sm="8" >
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary"
                        @click="searchQuery"
                        icon="search">查询</a-button>
              <a-button
                        @click="searchReset"
                        icon="reload"
                        style="margin-left: 8px;">重置</a-button>
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
      <a-button @click="handleAdd" icon="plus" v-has="'V_dkjkpt_dhjcbbg:add'">附件上传</a-button>
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('贷后检查报告')" v-has="'V_dkjkpt_dhjcbbg:exp'">导出</a-button>
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
          <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{
          selectedRowKeys.length }}</a>项
          <a style="margin-left: 24px" @click="onClearSelected">清空</a>
          <span style="float:right;">
          <a @click="loadData()"><a-icon type="sync" />刷新</a>
          <a-divider type="vertical" />
          <a-popover title="自定义列" trigger="click" placement="leftBottom">
            <template slot="content">
              <a-checkbox-group @change="onColSettingsChange" v-model="settingColumns" :defaultValue="settingColumns">
                <a-row>
                  <template v-for="(item,index) in defColumns">
                    <template v-if="item.key!='rowIndex'&& item.dataIndex!='action'">
                        <a-col :span="12"><a-checkbox :value="item.dataIndex">{{ item.title }}</a-checkbox></a-col>
                    </template>
                  </template>
                </a-row>
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
        @change="handleTableChange">

        <div slot="filterDropdown">
          <a-card>
            <a-checkbox-group @change="onColSettingsChange" v-model="settingColumns" :defaultValue="settingColumns">
              <a-row>
                <template v-for="(item,index) in defColumns">
                  <template v-if="item.key!='rowIndex'&& item.dataIndex!='action'">
                    <a-col :span="12"><a-checkbox :value="item.dataIndex">{{ item.title }}</a-checkbox></a-col>
                  </template>
                </template>
              </a-row>
            </a-checkbox-group>
          </a-card>
        </div>
        <a-icon slot="filterIcon" type='setting' :style="{ fontSize:'16px',color:  '#108ee9' }" />


        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'V_dkjkpt_dhjcbbg:edit'">附件编辑</a>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <v_dkjkpt_dhjcbbg-modal ref="modalForm" @ok="modalFormOk"/>

  </a-card>
</template>

<script>

  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import V_dkjkpt_dhjcbbgModal from './modules/V_dkjkpt_dhjcbbgModal'
  import Vue from 'vue'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { filterObj } from '@/utils/util'
  import DateSelect from '@/components/jeecg/DateSelect'
  import JEllipsis from "@/components/jeecg/JEllipsis"
  import JInput from '../../../../components/jeecg/JInput'
  export default {
    name: "V_dkjkpt_dhjcbbgList",
    mixins: [JeecgListMixin],
    components: {
      JInput,
      V_dkjkpt_dhjcbbgModal,JTreeSelect,DateSelect,JEllipsis
    },
    data () {
      return {
        description: '贷后检查报告管理页面',
        // 表头
        columns: [],
        settingColumns:[],
        //列定义
        defColumns: [
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
            dataIndex: 'dhdkje'
          },
          {
            title: '单户贷款余额',
            align:"center",
            dataIndex: 'dhdkye'
          },
          {
            title: '最新借款日期',
            align:"center",
            dataIndex: 'zxjkrq'
          },
          {
            title: '附件年份',
            align:"center",
            dataIndex: 'fjnf',
            customRender:function (text) {
              return !text?"":(text.length>8?text.substr(0,4):text)
            },
          },
          {
            title: '附件类型',
            align:"center",
            dataIndex: 'fjlx_dictText'
          },

          {
            title: '附件数据节点',
            align:"center",
            dataIndex: 'fjsjjd_dictText'
          },

          {
            title: '备注',
            align:"center",
            dataIndex: 'bz'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: {
              filterDropdown: 'filterDropdown',
              filterIcon: 'filterIcon',
              customRender: 'action'},
          }
        ],
        // 请求参数
    	url: {
              list: "/dkjkpt/dhgl/dhjcbg/v_dkjkpt_dhjcbbg/list",
              delete: "/dkjkpt/dhgl/dhjcbg/v_dkjkpt_dhjcbbg/delete",
              deleteBatch: "/dkjkpt/dhgl/dhjcbg/v_dkjkpt_dhjcbbg/deleteBatch",
              exportXlsUrl: "/dkjkpt/dhgl/dhjcbg/v_dkjkpt_dhjcbbg/exportXls",
              importExcelUrl: "/dkjkpt/dhgl/dhjcbg/v_dkjkpt_dhjcbbg/importExcel",
           },
        }
      },
      computed: {
        importExcelUrl: function(){
          return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
        }
      },
    methods: {
      selectValue(val){
        console.log(val)
      },
      init(){
        var myDate = new Date;
        var year = myDate.getFullYear();//获取当前年
        this.initSelectYear(year)
      },
      initSelectYear(year){
        this.years = [];
        for(let i=0;i<30;i++){
          this.years.push({value:((year - i)+'-01-01'),label:((year - i)+'')});
        }
      },
      //跳转单据页面
      jump() {
        this.$router.push({path: '/jeecg/helloworld'})
      },
      //列设置更改事件
      onColSettingsChange (checkedValues) {
        var key = this.$route.name+":colsettings";
        Vue.ls.set(key, checkedValues, 7 * 24 * 60 * 60 * 1000)
        this.settingColumns = checkedValues;
        const cols = this.defColumns.filter(item => {
          if(item.key =='rowIndex'|| item.dataIndex=='action'){
            return true
          }
          if (this.settingColumns.includes(item.dataIndex)) {
            return true
          }
          return false
        })
        this.columns =  cols;
      },
      initColumns(){
        //权限过滤（列权限控制时打开，修改第二个参数为授权码前缀）
        //this.defColumns = colAuthFilter(this.defColumns,'testdemo:');

        var key = this.$route.name+":colsettings";
        let colSettings= Vue.ls.get(key);
        if(colSettings==null||colSettings==undefined){
          let allSettingColumns = [];
          this.defColumns.forEach(function (item,i,array ) {
            allSettingColumns.push(item.dataIndex);
          })
          this.settingColumns = allSettingColumns;
          this.columns = this.defColumns;
        }else{
          this.settingColumns = colSettings;
          const cols = this.defColumns.filter(item => {
            if(item.key =='rowIndex'|| item.dataIndex=='action'){
              return true;
            }
            if (colSettings.includes(item.dataIndex)) {
              return true;
            }
            return false;
          })
          this.columns =  cols;
        }
      }
    },
    getQueryParams(){
     /* var param = Object.assign({}, this.queryParam,this.isorter);
      param.field = this.getQueryField();
      param.pageNo = this.ipagination.current;
      param.pageSize = this.ipagination.pageSize;
      delete param.createTimeRange; // 时间参数不传递后台
      return filterObj(param);*/
    },
    created() {
      this.initColumns();
      this.init();

    },

  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>