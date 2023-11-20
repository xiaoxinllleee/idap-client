<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
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
          <a-col :md="6" :sm="8">
            <a-form-item label="客户名称">
              <j-input placeholder="请输入客户名称" v-model="queryParam.khmc" type="likemore"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="证件号码">
              <j-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></j-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
          <a-col :md="6" :sm="8">
            <a-form-item label="贷款账号">
              <a-input placeholder="请输入贷款账号" v-model="queryParam.dkzh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="借款日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-range-picker
                style="width: 100%"
                format="YYYY-MM-DD"
                :placeholder="['开始时间', '结束时间']"
                @change="onDateChange_jkrq"
                v-model="queryParam.jkrq"
                :default-value="[undefined, moment(new Date(), 'YYYY/MM/DD')]"
              />
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="到期日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-range-picker
                style="width: 100%"
                format="YYYY-MM-DD"
                :placeholder="['开始时间', '结束时间']"
                @change="onDateChange_dqrq"
                v-model="queryParam.dqrq"
                :default-value="[undefined, moment(new Date(), 'YYYY/MM/DD')]"
              />
            </a-form-item>
          </a-col>


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
      <a-button @click="handleAdd" icon="plus" v-has="'tsfxtzs:fjsc'">附件上传</a-button>
      <a-button icon="download" @click="handleExportXls('提示复息通知书')" v-has="'tsfxtzs:exportXls'">导出</a-button>
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
        <span style="float:right;">
          <a @click="loadData()"><a-icon type="sync" />刷新</a>
          <a-divider type="vertical" />
          <a-popover title="自定义列" trigger="click" placement="leftBottom">
            <template slot="content">
              <a-checkbox-group @change="onColSettingsChange" v-model="settingColumns" :defaultValue="settingColumns">
                <a-row>
                  <template v-for="(item,index) in columns">
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
      </div>-->

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange">
       <!-- <div slot="filterDropdown">
          <a-card>
            <a-checkbox-group @change="onColSettingsChange" v-model="settingColumns" :defaultValue="settingColumns">
              <a-row>
                <template v-for="(item,index) in columns">
                  <template v-if="item.key!='rowIndex'&& item.dataIndex!='action'">
                    <a-col :span="12"><a-checkbox :value="item.dataIndex">{{ item.title }}</a-checkbox></a-col>
                  </template>
                </template>
              </a-row>
            </a-checkbox-group>
          </a-card>
        </div>-->
        <a-icon slot="filterIcon" type='setting' :style="{ fontSize:'16px',color:  '#108ee9' }" />

        <span slot="action" slot-scope="text, record">
<!--          <a @click="handleEdit(record)">附件编辑</a>-->
          <a @click="handleEdit(record)" v-has="'tsfxtzs:xq'">详情</a>
<!--          <a-divider type="vertical" />-->
<!--          <a-dropdown>-->
<!--            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>-->
<!--            <a-menu slot="overlay">-->
<!--              <a-menu-item>-->
<!--                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">-->
<!--                  <a>删除</a>-->
<!--                </a-popconfirm>-->
<!--              </a-menu-item>-->
<!--            </a-menu>-->
<!--          </a-dropdown>-->
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
  <vDkjkptTsfxtzs-modal ref="modalFormfj" @ok="modalFormOk"></vDkjkptTsfxtzs-modal>
    <v-dkjkpt-tsfxtzs-view ref="modalForm" @ok="modalFormOk"></v-dkjkpt-tsfxtzs-view>
  </a-card>
</template>

<script>
  import vDkjkptTsfxtzsModal from './modules/vDkjkptTsfxtzsModal'
  import vDkjkptTsfxtzsView from '../../dksjjk/dksjjktz/modules/DksjjktzModal.vue'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JInput from '../../../../components/jeecg/JInput'
  import Vue from 'vue'
  import DateSelect from '@/components/jeecg/DateSelect'
  import JEllipsis from "@/components/jeecg/JEllipsis"
  import { getAction,putAction,httpAction,downFile} from '@/api/manage'
  import moment from 'moment'

  export default {
    name: "vDkjkptTsfxtzsList",
    mixins:[JeecgListMixin],
    components: {
      vDkjkptTsfxtzsModal,JTreeSelect,JInput,vDkjkptTsfxtzsView
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
        description: '1管理页面',  settingColumns:[],
        // 表头
        jkrq_begin:null,
        jkrq_end:null,
        dqrq_begin:null,
        dqrq_end:null,
        columns: [
          {
            title: '统计月份',
            align:"center",
            dataIndex: 'tjyf',
            customRender:function (text) {
              return !text?"":(text.length>8?text.substr(0,4):text)
            },
          },
          {
            title: '机构名称',
            align:"center",
            dataIndex: 'jgdm_dictText'
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
            width: 160
          },
          {
            title: '贷款账号',
            align:"center",
            dataIndex: 'dkzh',
            width: 160
          },
          {
            title: '便民卡卡号',
            align:"center",
            dataIndex: 'bmkkh'
          },
          {
            title: '贷款金额',
            align:"center",
            dataIndex: 'dkje'
          },
          {
            title: '贷款余额',
            align:"center",
            dataIndex: 'dkye'
          },
          {
            title: '借款日期',
            align:"center",
            dataIndex: 'jkrq'
          },
          {
            title: '到期日期',
            align:"center",
            dataIndex: 'dqrq'
          },
          {
            title: '贷款形态',
            align:"center",
            dataIndex: 'dkxt_dictText'
          },
          {
            title: '文件名',
            align:"center",
            dataIndex: 'wjm',
            ellipsis: true,
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
        url: {
          list: "/V_dkjkpt_tsfxtzs/vDkjkptTsfxtzs/list",
          delete: "/V_dkjkpt_tsfxtzs/vDkjkptTsfxtzs/delete",
          deleteBatch: "/V_dkjkpt_tsfxtzs/vDkjkptTsfxtzs/deleteBatch",
          exportXlsUrl: "V_dkjkpt_tsfxtzs/vDkjkptTsfxtzs/exportXls",
          importExcelUrl: "V_dkjkpt_tsfxtzs/vDkjkptTsfxtzs/importExcel",
        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    created () {
      this.queryParam.jkrq_end = moment(new Date()).format('YYYY-MM-DD');
      this.queryParam.dqrq_end = moment(new Date()).format('YYYY-MM-DD');
    },
    /* created() {
       this.initColumns();
       this.init();
     },*/
    methods: {
      moment,
      loadData(arg) {
        if(!this.url.list){
          this.$message.error("请设置url.list属性!")
          return
        }
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1;
        }
        var params = this.getQueryParams();//查询条件
        delete params.jkrq; // 时间参数不传递后台
        delete params.dqrq; // 时间参数不传递后台
        this.loading = true;
        if (this.jkrq_begin!=null&&this.jkrq_end!=null){
          params.jkrq_begin=this.jkrq_begin;
          params.jkrq_end=this.jkrq_end;
        }
        if (this.dqrq_begin!=null&&this.dqrq_end!=null){
          params.dqrq_begin=this.dqrq_begin;
          params.dqrq_end=this.dqrq_end;
        }
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
      onDateChange_jkrq(date, dateString) {
        this.jkrq_begin=date[0].format("YYYY-MM-DD");
        this.jkrq_end=date[1].format("YYYY-MM-DD");
      },
      onDateChange_dqrq(date, dateString) {
        this.dqrq_begin=date[0].format("YYYY-MM-DD");
        this.dqrq_end=date[1].format("YYYY-MM-DD");
      },
      handleExportXls(fileName){

        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        let param = {...this.queryParam};
        console.log("导出参数",param)
        delete param.jkrq; // 时间参数不传递后台
        delete param.dqrq; // 时间参数不传递后台

        downFile(this.url.exportXlsUrl,param).then((data)=>{
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
      onColSettingsChange (checkedValues) {
        var key = this.$route.name+":colsettings";
        Vue.ls.set(key, checkedValues, 7 * 24 * 60 * 60 * 1000)
        alert(checkedValues)
        this.settingColumns = checkedValues;
        const cols = this.columns.filter(item => {
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
        //this.columns = colAuthFilter(this.columns,'testdemo:');

        var key = this.$route.name+":colsettings";
        let colSettings= Vue.ls.get(key);
        if(colSettings==null||colSettings==undefined){
          let allSettingColumns = [];
          this.columns.forEach(function (item,i,array ) {
            allSettingColumns.push(item.dataIndex);
          })
          this.settingColumns = allSettingColumns;
          this.columns = this.columns;
        }else{
          this.settingColumns = colSettings;
          const cols = this.columns.filter(item => {
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
      handleAdd: function () {
        this.$refs.modalFormfj.add();
        this.$refs.modalFormfj.title = "新增";
        this.$refs.modalFormfj.disableSubmit = false;
      },
      searchReset() {
        this.queryParam = {}
        this.jkrq_end=null;
        this.jkrq_begin=null;
        this.dqrq_end=null;
        this.dqrq_begin=null;
        this.loadData(1);
      },
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>