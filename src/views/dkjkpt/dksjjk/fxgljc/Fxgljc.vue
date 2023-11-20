<template>
    <!-- 操作按钮区域 -->
<!--    <div class="table-operator">
      &lt;!&ndash;<a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>&ndash;&gt;
      &lt;!&ndash;      <a-button icon="area-chart" @click="init">提取</a-button>&ndash;&gt;
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>-->

    <!-- table区域-begin -->
  <a-card :bordered="false" >
  <div>
      <div style="background-color: #ececec;">
        <a-row :gutter="0">
          <a-col :span="8" >
            <a-card  :bordered="true" style="min-height:346px;">
              <slot name="title">
                <div style="font-weight: bold; color: red; margin-bottom: 10px;font-size: 16px;">贷后检查按频率提醒</div>
              </slot>
              <a-table
                class="ant-table"
                ref="table"
                size="middle"
                bordered
                :pagination="false"
                :columns="columns"
                :dataSource="dataSource"
                :scroll="{  y: 80 }"
                :loading="loading">
              <span slot="zjhm" slot-scope='text'>
                <j-ellipsis :value="text" :length="10"/>
              </span>
              </a-table>

                <!--                <a-button icon="download"  @click="handleExportXls('贷后检查按频率提醒',1)">导出</a-button>-->
              <div class="table-operator">
                <a-button icon="menu-unfold" type="primary" style="margin-left: 80%" @click="more(1)">更多</a-button>
              </div>
            </a-card>
          </a-col>
          <a-col :span="8">
            <a-card  :bordered="true" style="min-height:346px;" >
              <slot name="title">
                <div style="font-weight: bold; color: red; margin-bottom: 10px;font-size: 16px;">本月及下月到期贷款</div>
              </slot>
              <a-table
                class="ant-table"
                ref="table"
                size="middle"
                bordered
                :columns="columns3"
                :dataSource="dataSource2"
                :pagination="false"
                :scroll="{  y: 80  }"
                :loading="loading">
              <span slot="dkzh" slot-scope="text">
                <j-ellipsis :value="text" :length="10"/>
              </span>
              </a-table>
              <div class="table-operator">
                <!--                <a-button icon="download"  @click="handleExportXls('本月及下月到期贷款',2)">导出</a-button>-->
                <a-button icon="menu-unfold" type="primary" style="margin-left: 80%" @click="more(2)">更多</a-button>

              </div>
            </a-card>
          </a-col>
          <a-col :span="8">
            <a-card :bordered="true" style="min-height:346px;">
              <slot name="title">
                <div style="font-weight: bold; color: red; margin-bottom: 10px;font-size: 16px;">利息、本金逾期将进关注类</div>
              </slot>
              <a-table
                class="ant-table"
                ref="table"
                size="middle"
                bordered
                :columns="columns3"
                :dataSource="dataSource3"
                :pagination="false"
                :scroll="{ y: 80 }"
                :loading="loading">
               <span slot="dkzh" slot-scope="text">
                <j-ellipsis :value="text" :length="10"/>
              </span>
              </a-table>
              <div class="table-operator" style="margin-left: 300px;">
                <a-button  @click="view(1)">查看明细</a-button>
                <a-button icon="menu-unfold" type="primary"  @click="more(3)">更多</a-button>
              </div>
            </a-card>
          </a-col>
        </a-row>
      </div>

      <div style="background-color: #ececec;">
        <a-row :gutter="0">
          <a-col :span="8">
            <a-card :bordered="true" style="min-height:346px;">
              <slot name="title">
                <div style="font-weight: bold; color: red; margin-bottom: 10px;font-size: 16px;">利息、本金逾期将进不良类</div>
              </slot>
              <a-table
                class="ant-table"
                ref="table"
                size="middle"
                bordered
                :columns="columns3"
                :dataSource="dataSource4"
                :pagination="false"
                :scroll="{  y: 80  }"
                :loading="loading">
               <span slot="dkzh" slot-scope="text">
                <j-ellipsis :value="text" :length="10"/>
              </span>
              </a-table>
              <div class="table-operator" style="margin-left: 300px;">
                <!--                <a-button icon="download"  @click="handleExportXls('利息、本金逾期将进不良类',4)">导出</a-button>-->
                <a-button  @click="view(2)">查看明细</a-button>
                <a-button icon="menu-unfold" type="primary"  @click="more(4)">更多</a-button>
              </div>
            </a-card>
          </a-col>
          <a-col :span="8">
            <a-card  :bordered="true" style="min-height:346px;">
              <slot name="title">
                <div style="font-weight: bold; color: red; margin-bottom: 10px;font-size: 16px;">本月新进关注类</div>
              </slot>
              <a-table
                class="ant-table"
                ref="table"
                size="middle"
                bordered
                :columns="columns3"
                :dataSource="dataSource5"
                :pagination="false"
                :scroll="{  y: 80  }"
                :loading="loading">
               <span slot="dkzh" slot-scope="text">
                <j-ellipsis :value="text" :length="10"/>
              </span>
              </a-table>
              <div class="table-operator" style="margin-left:300px;">
                <a-button  @click="view(3)">查看明细</a-button>
                <a-button icon="menu-unfold" type="primary" @click="more(5)">更多</a-button>
              </div>
            </a-card>
          </a-col>
          <a-col :span="8">
            <a-card  :bordered="true" style="min-height:346px;">
              <slot name="title">
                <div style="font-weight: bold; color: red; margin-bottom: 10px;font-size: 16px;">本月新进不良</div>
              </slot>
              <a-table
                class="ant-table"
                ref="table"
                size="middle"
                bordered
                :columns="columns3"
                :dataSource="dataSource6"
                :pagination="false"
                :scroll="{  y: 80  }"
                :loading="loading">
               <span slot="dkzh" slot-scope="text">
                <j-ellipsis :value="text" :length="10"/>
              </span>
              </a-table>
              <div class="table-operator" style="margin-left:300px;">
                <a-button  @click="view(4)">查看明细</a-button>
                <a-button icon="menu-unfold" type="primary" @click="more(6)">更多</a-button>

              </div>
            </a-card>
          </a-col>
        </a-row>
      </div>



      <a-modal
        title="明细"
        width="80%"
        :footer="null"
        :visible="visible"
        :confirm-loading="confirmLoading"
        @cancel="handleCancel(1)">
        <a-table
          ref="table"
          size="middle"
          bordered
          :rowKey="rowKey"
          :columns="columns2"
          :pagination="ipagination"
          :dataSource="dataSource"
          @change="handleTableChange"
          :loading="loading">
            <span slot='zjhm' slot-scope='zjhm,record'>
          <a @click="ckxq(record)">{{ zjhm }}</a>
        </span>
        </a-table>
      </a-modal>

      <a-modal
        title="明细"
        width="80%"
        :footer="null"
        :visible="visible2"
        :confirm-loading="confirmLoading"
        @cancel="handleCancel(2)">
        <a-table
          ref="table"
          size="middle"
          bordered
          :rowKey="rowKey"
          :pagination="ipagination2"
          :columns="columns4"
          :dataSource="dataSource2"
          @change="handleTableChange2"
          :loading="loading">
        </a-table>
      </a-modal>
      <a-modal
        title="明细"
        width="80%"
        :footer="null"
        :visible="visible3"
        :confirm-loading="confirmLoading"
        @cancel="handleCancel(3)">
        <a-table
          ref="table"
          size="middle"
          bordered
          :rowKey="rowKey"
          :columns="columns6"
          :pagination="ipagination3"
          :dataSource="dataSource3"
          @change="handleTableChange3"
          :loading="loading">
        </a-table>
      </a-modal>
      <a-modal
        title="明细"
        width="80%"
        :footer="null"
        :visible="visible4"
        :confirm-loading="confirmLoading"
        @cancel="handleCancel(4)">
        <a-table
          ref="table"
          size="middle"
          bordered
          :rowKey="rowKey"
          :pagination="ipagination4"
          :columns="columns6"
          :dataSource="dataSource4"
          @change="handleTableChange4"
          :loading="loading">
        </a-table>
      </a-modal>
      <a-modal
        title="明细"
        width="80%"
        :footer="null"
        :visible="visible5"
        :confirm-loading="confirmLoading"
        @cancel="handleCancel(5)">
        <a-table
          ref="table"
          size="middle"
          bordered
          :rowKey="rowKey"
          :pagination="ipagination5"
          :columns="columns9"
          :dataSource="dataSource5"
          @change="handleTableChange5"
          :loading="loading">
        </a-table>
      </a-modal>
      <a-modal
        title="明细"
        width="80%"
        :footer="null"
        :visible="visible6"
        :confirm-loading="confirmLoading"
        @cancel="handleCancel(6)">
        <a-table
          ref="table"
          size="middle"
          bordered
          :rowKey="rowKey"
          :columns="columns9"
          :pagination="ipagination6"
          :dataSource="dataSource6"
          @change="handleTableChange6"
          :loading="loading">
        </a-table>
      </a-modal>


    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
  </a-card>
</template>

<script>

import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { downFile, getAction } from '@api/manage'
import JEllipsis from '@comp/jeecg/JEllipsis'
import { filterObj } from '@/utils/util'

export default {
  name: "FxgljcDhjcList",
  mixins:[JeecgListMixin],
  components: {
    JEllipsis
  },
  data () {
    return {
      description: '贷后检查管理页面',
      // 表头
      visible:false,
      visible2:false,
      visible3:false,
      visible4:false,
      visible5:false,
      visible6:false,
      confirmLoading: false,
      dataSource2:[],
      dataSource3:[],
      dataSource4:[],
      dataSource5:[],
      dataSource6:[],
      ipagination: {
        current: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '30'],
        showTotal: (total, range) => {
          return range[0] + '-' + range[1] + ' 共' + total + '条'
        },
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0
      },
      ipagination2: {
        current: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '30'],
        showTotal: (total, range) => {
          return range[0] + '-' + range[1] + ' 共' + total + '条'
        },
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0
      },
      ipagination3: {
        current: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '30'],
        showTotal: (total, range) => {
          return range[0] + '-' + range[1] + ' 共' + total + '条'
        },
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0
      },
      ipagination4: {
        current: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '30'],
        showTotal: (total, range) => {
          return range[0] + '-' + range[1] + ' 共' + total + '条'
        },
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0
      },
      ipagination5: {
        current: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '30'],
        showTotal: (total, range) => {
          return range[0] + '-' + range[1] + ' 共' + total + '条'
        },
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0
      },
      ipagination6: {
        current: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '30'],
        showTotal: (total, range) => {
          return range[0] + '-' + range[1] + ' 共' + total + '条'
        },
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0
      },
      columns: [
        {
          title: '客户名称',
          align:"center",
          dataIndex: 'khmc',
          width:100
        },
        {
          title: '证件号码',
          align:"center",
          dataIndex: 'zjhm',
          scopedSlots: { customRender: 'zjhm' },
        },
        {
          title: '贷款金额',
          align:"center",
          dataIndex: 'dkje',
          width:100
        },

      ],
      columns2: [
        {
          title: '',
          dataIndex: '',
          key:'rowIndex',
          width:60,
          align:"center",
          customRender:function (t,r,index) {
            return parseInt(index)+1;
          }
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
          scopedSlots: { customRender: 'zjhm' },
        },
        {
          title: '贷款金额',
          align:"center",
          dataIndex: 'dkje'
        },
        {
          title: '手机号码',
          align:"center",
          dataIndex: 'sjhm'
        },
        {
          title: '合同签订日期',
          align:"center",
          dataIndex: 'htqdrq'
        },
        /* {
           title: '操作',
           dataIndex: 'action',
           align:"center",
           scopedSlots: { customRender: 'action' },
         }*/
      ],
      columns3: [
        {
          title: '客户名称',
          align:"center",
          dataIndex: 'khmc',
          width:100
        },

        {
          title: '贷款账号',
          align:"center",
          dataIndex: 'dkzh',
          scopedSlots: { customRender: 'dkzh' },
        },
        {
          title: '贷款金额',
          align:"center",
          dataIndex: 'dkje',
          width:100
        },
      ],
      columns4: [
        {
          title: '',
          dataIndex: '',
          key:'rowIndex',
          width:60,
          align:"center",
          customRender:function (t,r,index) {
            return parseInt(index)+1;
          }
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
          title: '贷款账号',
          align:"center",
          dataIndex: 'dkzh'
        },
        {
          title: '贷款金额',
          align:"center",
          dataIndex: 'dkje'
        },
        {
          title: '手机号码',
          align:"center",
          dataIndex: 'sjhm'
        },
        {
          title: '到期日期',
          align:"center",
          dataIndex: 'dqrq'
        },
      ],
      columns6: [
        {
          title: '',
          dataIndex: '',
          key:'rowIndex',
          width:60,
          align:"center",
          customRender:function (t,r,index) {
            return parseInt(index)+1;
          }
        },
        {
          title: '支行名称',
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
          dataIndex: 'zjhm'
        },
        {
          title: '贷款账号',
          align:"center",
          dataIndex: 'dkzh'
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
          title: '欠息天数',
          align:"center",
          dataIndex: 'qxts'
        },
        {
          title: '欠本天数',
          align:"center",
          dataIndex: 'qbts'
        },
        {
          title: '担保方式',
          align:"center",
          dataIndex: 'dbfs_dictText'
        },
        {
          title: '贷款形态',
          align:"center",
          dataIndex: 'dkxt_dictText'
        },

      ],
      columns9: [
        {
          title: '',
          dataIndex: '',
          key:'rowIndex',
          width:60,
          align:"center",
          customRender:function (t,r,index) {
            return parseInt(index)+1;
          }
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
          title: '贷款账号',
          align:"center",
          dataIndex: 'dkzh'
        },
        {
          title: '贷款金额',
          align:"center",
          dataIndex: 'dkje'
        },
        {
          title: '担保方式',
          align:"center",
          dataIndex: 'dbfs_dictText'
        },
      ],

      url: {
        list: "/dhjc/fxgljcDhjc/list",
        list2: "/dqdk/fxgljcDqdk/list",
        list3: "/yqjjgzl/fxgljcYqjjgzl/list",
        list4: "/yqjjbll/fxgljcYqjjbll/list",
        list5: "/byxjgz/fxgljcByxjgz/list",
        list6: "/byxjbl/fxgljcByxjbl/list",
        delete: "/dhjc/fxgljcDhjc/delete",
        deleteBatch: "/dhjc/fxgljcDhjc/deleteBatch",
        exportXlsUrl: "dhjc/fxgljcDhjc/exportXls",
        exportXlsUrl2: "dqdk/fxgljcDqdk/exportXls",
        exportXlsUrl3: "yqjjgzl/fxgljcYqjjgzl/exportXls",
        exportXlsUrl4: "yqjjbll/fxgljcYqjjbll/exportXls",
        exportXlsUrl5: "byxjgz/fxgljcByxjgz/exportXls",
        exportXlsUrl6: "byxjbl/fxgljcByxjbl/exportXls",
        importExcelUrl: "dhjc/fxgljcDhjc/importExcel",
        init: "/dhjc/fxgljcDhjc/init",
      },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
  created () {
    this.init()
    this.loadData()
  },


  methods: {
    ckxq(record){
      console.log(record)
      this.$router.push({ path: '/dkjkpt/dhgztx110/FxgljcDhjctxList', query: {jgdm:record.jgdm,zjhm:record.zjhm,num:'1'}})
      this.visible =false
    },
    view(num){
      if (num==1){
        this.$router.push({ path: '/dkjkpt/tjcx/byjjgz/DkjkptByjjgzl'})
      }else if (num==2){
        this.$router.push({ path: '/dkjkpt/tjcx/byjjbl/DkjkptByjjbl'})
      }else if (num==3){
        this.$router.push({ path: '/dkjkpt/tjcx/byxjgz/DkjkptByxjgzBsnm'})
      }else {
        this.$router.push({ path: '/dkjkpt/tjcx/byxjbl/DkjkptByxjbl'})
      }
    },
    handleTableChange (pagination, filters, sorter) {
      //分页、排序、筛选变化时触发
      //TODO 筛选
      if (Object.keys(sorter).length > 0) {
        this.isorter.column = sorter.field
        this.isorter.order = 'ascend' == sorter.order ? 'asc' : 'desc'
      }
      this.ipagination = pagination
      this.more(1)
    },
    handleTableChange2 (pagination, filters, sorter) {
      //分页、排序、筛选变化时触发
      //TODO 筛选
      if (Object.keys(sorter).length > 0) {
        this.isorter.column = sorter.field
        this.isorter.order = 'ascend' == sorter.order ? 'asc' : 'desc'
      }
      this.ipagination2 = pagination
      this.more(2)
    },
    handleTableChange3 (pagination, filters, sorter) {
      //分页、排序、筛选变化时触发
      //TODO 筛选
      if (Object.keys(sorter).length > 0) {
        this.isorter.column = sorter.field
        this.isorter.order = 'ascend' == sorter.order ? 'asc' : 'desc'
      }
      this.ipagination3 = pagination
      this.more(3)
    },
    handleTableChange4 (pagination, filters, sorter) {
      //分页、排序、筛选变化时触发
      //TODO 筛选
      if (Object.keys(sorter).length > 0) {
        this.isorter.column = sorter.field
        this.isorter.order = 'ascend' == sorter.order ? 'asc' : 'desc'
      }
      this.ipagination4 = pagination
      this.more(4)
    },
    handleTableChange5 (pagination, filters, sorter) {
      //分页、排序、筛选变化时触发
      //TODO 筛选
      if (Object.keys(sorter).length > 0) {
        this.isorter.column = sorter.field
        this.isorter.order = 'ascend' == sorter.order ? 'asc' : 'desc'
      }
      this.ipagination5 = pagination
      this.more(5)
    },
    handleTableChange6 (pagination, filters, sorter) {
      //分页、排序、筛选变化时触发
      //TODO 筛选
      if (Object.keys(sorter).length > 0) {
        this.isorter.column = sorter.field
        this.isorter.order = 'ascend' == sorter.order ? 'asc' : 'desc'
      }
      this.ipagination6 = pagination
      this.more(6)
    },
  /*  getQueryParams () {
      //获取查询条件
      let sqp = {}
      if (this.superQueryParams) {
        sqp['superQueryParams'] = encodeURI(this.superQueryParams)
      }
      var param = Object.assign(sqp, this.isorter, this.filters)
      param.field = this.getQueryField()
      param.pageNo = this.ipagination.current
      param.pageSize = this.ipagination.pageSize
      return filterObj(param)
    },*/
    more(num){
      this.loading = true
      if (num ==1){
        let sqp = {}
        if (this.superQueryParams) {
          sqp['superQueryParams'] = encodeURI(this.superQueryParams)
        }
        var param = Object.assign(sqp, this.isorter, this.filters)
        param.field = this.getQueryField()
        param.pageNo = this.ipagination.current
        param.pageSize = this.ipagination.pageSize
        var params =  filterObj(param)
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records
            this.ipagination.total = res.result.total;
            this.loading = false
          }
          if (res.code === 510) {
            this.$message.warning(res.message,5)
            this.loading = false
          }
          this.loading = false
        })
        this.visible = true;
      }else if (num ==2){
        let sqp = {}
        if (this.superQueryParams) {
          sqp['superQueryParams'] = encodeURI(this.superQueryParams)
        }
        var param = Object.assign(sqp, this.isorter, this.filters)
        param.field = this.getQueryField()
        param.pageNo = this.ipagination2.current
        param.pageSize = this.ipagination2.pageSize
        var params =  filterObj(param)
        getAction(this.url.list2, params).then((res) => {
          if (res.success) {
            this.dataSource2 = res.result.records
            this.ipagination2.total = res.result.total;
            this.loading = false
          }
          if (res.code === 510) {
            this.$message.warning(res.message,5)
            this.loading = false
          }
          this.loading = false
        })
        this.visible2 = true;
      }else if (num ==3){
        let sqp = {}
        if (this.superQueryParams) {
          sqp['superQueryParams'] = encodeURI(this.superQueryParams)
        }
        var param = Object.assign(sqp, this.isorter, this.filters)
        param.field = this.getQueryField()
        param.pageNo = this.ipagination3.current
        param.pageSize = this.ipagination3.pageSize
        var params =  filterObj(param)
        getAction(this.url.list3, params).then((res) => {
          if (res.success) {
            this.dataSource3 = res.result.records
            this.ipagination3.total = res.result.total;
            this.loading = false
          }
          if (res.code === 510) {
            this.$message.warning(res.message,5)
            this.loading = false
          }
          this.loading = false
        })
        this.visible3 = true;
      }else if (num ==4){
        let sqp = {}
        if (this.superQueryParams) {
          sqp['superQueryParams'] = encodeURI(this.superQueryParams)
        }
        var param = Object.assign(sqp, this.isorter, this.filters)
        param.field = this.getQueryField()
        param.pageNo = this.ipagination4.current
        param.pageSize = this.ipagination4.pageSize
        var params =  filterObj(param)
        getAction(this.url.list4, params).then((res) => {
          if (res.success) {
            this.dataSource4 = res.result.records
            this.ipagination4.total = res.result.total;
            this.loading = false
          } else {
            this.dataSource = []
            this.ipagination4.total = 0
            this.loading = false
          }
          if (res.code === 510) {
            this.$message.warning(res.message,5)
            this.loading = false
          }
          this.loading = false
        })
        this.visible4 = true;
      }else if (num ==5){
        let sqp = {}
        if (this.superQueryParams) {
          sqp['superQueryParams'] = encodeURI(this.superQueryParams)
        }
        var param = Object.assign(sqp, this.isorter, this.filters)
        param.field = this.getQueryField()
        param.pageNo = this.ipagination5.current
        param.pageSize = this.ipagination5.pageSize
        var params =  filterObj(param)
        getAction(this.url.list5, params).then((res) => {
          if (res.success) {
            this.dataSource5 = res.result.records
            this.ipagination5.total = res.result.total;
            this.loading = false
          } else {
            this.dataSource = []
            this.ipagination5.total = 0
            this.loading = false
          }
          if (res.code === 510) {
            this.$message.warning(res.message,5)
            this.loading = false
          }
          this.loading = false
        })
        this.visible5 = true;
      }else {
        let sqp = {}
        if (this.superQueryParams) {
          sqp['superQueryParams'] = encodeURI(this.superQueryParams)
        }
        var param = Object.assign(sqp, this.isorter, this.filters)
        param.field = this.getQueryField()
        param.pageNo = this.ipagination6.current
        param.pageSize = this.ipagination6.pageSize
        var params =  filterObj(param)
        getAction(this.url.list6, params).then((res) => {
          if (res.success) {
            this.dataSource6 = res.result.records
            this.ipagination6.total = res.result.total;
            this.loading = false
          } else {
            this.dataSource = []
            this.ipagination6.total = 0
            this.loading = false
          }
          if (res.code === 510) {
            this.$message.warning(res.message,5)
            this.loading = false
          }
          this.loading = false
        })
        this.visible6 = true;
      }
    },
    init () {
      this.loading = true
      let params = {}
      getAction(this.url.init,params).then((res) => {
        if (res.success) {
          this.$message.success('提取成功')
          this.loadData(1)
        } else {
          this.$message.warning('提取失败')
        }
      }).catch((err) => {
        this.$message.error('提取失败', error)
      }).finally(() => {
        this.loading = false
      })
    },
    handleCancel(num) {
      console.log('Clicked cancel button');
      if (num==1){
        this.visible = false;
      }else if (num==2){
        this.visible2 = false;
      }else if (num==3){
        this.visible3 = false;
      }else if (num==4){
        this.visible4 = false;
      }else if (num==5){
        this.visible5 = false;
      }else{
        this.visible6 = false;
      }
    },
    loadData () {
      if (!this.url.list) {
        this.$message.error('请设置url.list属性!')
        return
      }
      this.loading = true
      let params = {}
      getAction(this.url.list, params).then((res) => {
        if (res.success) {
          this.dataSource = res.result.records
          this.loading = false
        } else {
          this.dataSource = []
          this.loading = false
        }
        if (res.code === 510) {
          this.$message.warning(res.message,5)
          this.loading = false
        }
        this.loading = false
      })
      getAction(this.url.list2, params).then((res) => {
        if (res.success) {
          this.dataSource2 = res.result.records
          this.loading = false
        } else {
          this.dataSource2 = []
          this.loading = false
        }
        if (res.code === 510) {
          this.$message.warning(res.message,5)
          this.loading = false
        }
        this.loading = false
      })
      getAction(this.url.list3, params).then((res) => {
        if (res.success) {
          this.dataSource3 = res.result.records
          this.loading = false
        } else {
          this.dataSource3 = []
          this.loading = false
        }
        if (res.code === 510) {
          this.$message.warning(res.message,5)
          this.loading = false
        }
        this.loading = false
      })
      getAction(this.url.list4, params).then((res) => {
        if (res.success) {
          this.dataSource4 = res.result.records
          this.loading = false
        } else {
          this.dataSource4 = []
          this.loading = false
        }
        if (res.code === 510) {
          this.$message.warning(res.message,5)
          this.loading = false
        }
        this.loading = false
      })
      getAction(this.url.list5, params).then((res) => {
        if (res.success) {
          this.dataSource5 = res.result.records
          this.loading = false
        } else {
          this.dataSource5 = []
          this.loading = false
        }
        if (res.code === 510) {
          this.$message.warning(res.message,5)
          this.loading = false
        }
        this.loading = false
      })
      getAction(this.url.list6, params).then((res) => {
        if (res.success) {
          this.dataSource6 = res.result.records
          this.loading = false
        } else {
          this.dataSource6 = []
          this.loading = false
        }
        if (res.code === 510) {
          this.$message.warning(res.message,5)
          this.loading = false
        }
        this.loading = false
      })
    },

    handleExportXls (fileName,num) {
      if (!fileName || typeof fileName != 'string') {
        fileName = '导出文件'
      }

      //let param = {...this.queryParam};
      let param = this.getQueryParams();
      if(this.selectedRowKeys && this.selectedRowKeys.length>0) {
        param['selections'] = this.selectedRowKeys.join(",")
        param['rowKey'] = this.rowKey
      }
      let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()))
      param.paramsStr = paramsStr
      console.log('导出参数', param)
      this.exportLoading = true
      let url=''
      if (num ==1){
        url =this.url.exportXlsUrl
      }else if (num ==2){
        url =this.url.exportXlsUrl2
      }else if (num ==3){
        url =this.url.exportXlsUrl3
      }else if (num ==4){
        url =this.url.exportXlsUrl4
      }else if (num ==5){
        url =this.url.exportXlsUrl5
      }else {
        url =this.url.exportXlsUrl6
      }
      downFile(url, param).then((data) => {
        if (!data) {
          this.$message.warning('文件下载失败')
          return
        }
        var blob = new Blob([data])
        if ('msSaveOrOpenBlob' in navigator) {
          window.navigator.msSaveOrOpenBlob(blob, fileName + '.xls')
          return
        }
        var eleLink = document.createElement('a')
        eleLink.download = fileName + '.xls'
        eleLink.style.display = 'none'
        eleLink.href = URL.createObjectURL(blob)
        document.body.appendChild(eleLink)
        eleLink.click()
        document.body.removeChild(eleLink)
        this.exportLoading = false
      })
    },

  }
}
</script>
<style scoped>
.ant-table {
  min-height: 100px !important;
}
@import '~@assets/less/common.less'
</style>