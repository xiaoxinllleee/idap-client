<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计月份">
              <a-month-picker placeholder="请选择统计月份" v-model="queryParam.tjyf"  @change="onChange" style="width: 100%;"
                              :defaultValue="defaultMonthOpera" :format="monthFormat"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户姓名">
              <a-input placeholder="请输入客户姓名" v-model="queryParam.khmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="最早开户日">
              <a-range-picker @change="onChangezzkhr" v-model="queryParam.zzkhr" :default-value="[undefined, moment(new Date(), 'YYYY/MM/DD')]" ></a-range-picker>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="存款金额">
              <a-input-number placeholder="Minimum" v-model="queryParam.ckje_begin"
                              style="width: 40%; text-align: center" :min="0" />
              <a-input placeholder="~"
                       style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                       disabled />
              <a-input-number placeholder="Maximum" v-model="queryParam.ckje_end"
                              style="width: 40%; text-align: center; border-left: 0" :min="0" />
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="存款月日平">
              <a-input-number placeholder="Minimum" v-model="queryParam.ckrpye_begin"
                              style="width: 40%; text-align: center" :min="0" />
              <a-input placeholder="~"
                       style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                       disabled />
              <a-input-number placeholder="Maximum" v-model="queryParam.ckrpye_end"
                              style="width: 40%; text-align: center; border-left: 0" :min="0" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="存款年日平">
              <a-input-number placeholder="Minimum" v-model="queryParam.cknrpye_begin"
                              style="width: 40%; text-align: center" :min="0" />
              <a-input placeholder="~"
                       style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                       disabled />
              <a-input-number placeholder="Maximum" v-model="queryParam.cknrpye_end"
                              style="width: 40%; text-align: center; border-left: 0" :min="0" />
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
      <a-button icon="download" @click="handleExportXls('全行存款客户分类汇总表')">导出</a-button>
      <!--<a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>-->
    </div>

    <!-- table区域-begin -->
    <div>
      <!--<div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
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
    <qhckkhflhzb-modal ref="modalForm" @ok="modalFormOk"></qhckkhflhzb-modal>
  </a-card>
</template>

<script>
  import QhckkhflhzbModal from './modules/QhckkhflhzbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import moment from 'moment'
  import {getAction} from "../../../../api/manage";
  import {filterObj} from "../../../../utils/util";

  export default {
    name: "QhckkhflhzbList",
    mixins:[JeecgListMixin],
    components: {
      QhckkhflhzbModal
    },
    data () {
      return {
        description: '全行存款客户分类汇总表管理页面',
        defaultMonthOpera: '',
        monthFormat: 'YYYY-MM',
        // 表头
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
            dataIndex: 'tjyf'
          },
          {
            title: '客户姓名',
            align:"center",
            dataIndex: 'khmc'
          },
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm'
           },

		   {
            title: '最早开户日',
            align:"center",
            dataIndex: 'zzkhr'
           },
		   {
            title: '存款金额',
            align:"center",
            dataIndex: 'ckje'
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
		   {
            title: '账户数',
            align:"center",
            dataIndex: 'zhs'
           },

          /*{
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/qhckkhflhzb/qhckkhflhzb/list",
          delete: "/qhckkhflhzb/qhckkhflhzb/delete",
          deleteBatch: "/qhckkhflhzb/qhckkhflhzb/deleteBatch",
          exportXlsUrl: "qhckkhflhzb/qhckkhflhzb/exportXls",
          importExcelUrl: "qhckkhflhzb/qhckkhflhzb/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    created(){
      this.getCurrentDate();
      this.queryParam.zzkhr_end = moment(new Date()).format('YYYY-MM-DD');
    },
    methods: {
      moment,
      onChange(date,dateString){
        this.queryParam.tjyf = dateString;
      },
      onChangezzkhr(value,dateString){
        //this.queryParam.zzkhrString = dateString[0] + ',' +dateString[1];
        let zzkhrString = dateString
        this.queryParam.zzkhr_begin = zzkhrString[0]
        this.queryParam.zzkhr_end = zzkhrString[1]
      },
      getCurrentDate() {
        let curDate = new Date()
        let curMonth= {year : curDate.getFullYear(), month: curDate.getMonth() -1 ,}
        this.defaultMonthOpera = moment(curMonth)
      },
      searchReset() {
        this.flag = false;
        this.queryParam = {};
        this.loadData(1);
      },
      loadData(arg) {
        if (!this.url.list){
          this.$message.error("请设置url.list属性!");
          return;
        }
        // 加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1;
        }
        // 查询条件
        var params = this.getQueryParams();
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
      getQueryParams(){
        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        delete param.zzkhr
        return filterObj(param);
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>