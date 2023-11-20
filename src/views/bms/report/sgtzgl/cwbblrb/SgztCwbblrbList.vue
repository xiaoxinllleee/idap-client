<template>
  <a-card :bordered="false">
    <a-tabs default-active-key="1" @change="chagwTabs">
      <a-tab-pane tab="人民币" key="1" :forceRender="true">
        <!-- 查询区域 -->
        <div class="table-page-search-wrapper">
          <a-form layout="inline" @keyup.enter.native="searchQuery">
            <a-row :gutter="24">

              <a-col :xl="6" :lg="7" :md="8" :sm="24">
                <a-form-item label="数据日期">
                  <a-date-picker placeholder="请选择数据日期" v-model="queryParam.sjrq"  :defaultValue="defaultMonthOpera"
                                  :format="monthFormat" style="width: 100%;" @change="beforeUpload(1)"/>
                </a-form-item>
              </a-col>
              <a-col :xl="6" :lg="7" :md="8" :sm="24">
                <a-form-item label="项目">
                  <a-input placeholder="请输入项目" v-model="queryParam.xm"></a-input>
                </a-form-item>
              </a-col>
              <a-col :xl="6" :lg="7" :md="8" :sm="24">
                <a-form-item label="行次">
                  <a-input placeholder="请输入行次" v-model="queryParam.hc"></a-input>
                </a-form-item>
              </a-col>
              <template v-if="toggleSearchStatus">
                <a-col :xl="6" :lg="7" :md="8" :sm="24">
                  <a-form-item label="本期金额">
                    <a-input placeholder="请输入本期金额" v-model="queryParam.bqje"></a-input>
                  </a-form-item>
                </a-col>
                <a-col :xl="6" :lg="7" :md="8" :sm="24">
                  <a-form-item label="上年同期金额">
                    <a-input placeholder="请输入上年同期金额" v-model="queryParam.sntqje"></a-input>
                  </a-form-item>
                </a-col>
              </template>
              <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery(1)" icon="search">查询</a-button>
              <a-button @click="searchReset(1)" icon="reload" style="margin-left: 8px">重置</a-button>
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
          <a-button @click="handleAdd(1)" type="primary" icon="plus">新增</a-button>
          <a-button icon="download" :loading="exportLoading" @click="handleExportXls('财务报表利润表-人民币',1)">导出
          </a-button>
          <a-button icon="import" @click="excelImport(1)">导入</a-button>
          <a-button @click="handleDelete1(1)" icon="delete">删除</a-button>
          <a-dropdown v-if="selectedRowKeys.length > 0">
            <a-menu slot="overlay">
              <a-menu-item key="1" @click="batchDel(1)">
                <a-icon type="delete"/>
                删除
              </a-menu-item>
            </a-menu>
            <a-button style="margin-left: 8px"> 批量操作
              <a-icon type="down"/>
            </a-button>
          </a-dropdown>
        </div>

        <!-- table区域-begin -->
        <div>
          <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
            <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a
            style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
            <a style="margin-left: 24px" @click="onClearSelected">清空</a>
          </div>

          <a-table
            ref="table"
            size="middle"
            bordered
            :rowKey="rowKey"
            :columns="columns"
            :dataSource="dataSource1"
            :pagination="ipagination1"
            :loading="loading"
            :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
            @change="handleTableChange1">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record,1)">编辑</a>

          <a-divider type="vertical"/>
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down"/></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id,1)">
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
        <sgztCwbblrb-modal ref="modalForm" @ok="modalFormOk"></sgztCwbblrb-modal>
        <excel-import ref="excelImportModal" @ok="importComplete"/>
      </a-tab-pane>

      <a-tab-pane tab="外折人" key="2" :forceRender="true">
        <!-- 查询区域 -->
        <div class="table-page-search-wrapper">
          <a-form layout="inline" @keyup.enter.native="searchQuery">
            <a-row :gutter="24">

              <a-col :xl="6" :lg="7" :md="8" :sm="24">
                <a-form-item label="数据日期">
                  <a-date-picker placeholder="请选择数据日期" v-model="queryParam.sjrq"  :defaultValue="defaultMonthOpera"
                                  :format="monthFormat" style="width: 100%;" @change="beforeUpload(2)"/>
                </a-form-item>
              </a-col>
              <a-col :xl="6" :lg="7" :md="8" :sm="24">
                <a-form-item label="项目">
                  <a-input placeholder="请输入项目" v-model="queryParam.xm"></a-input>
                </a-form-item>
              </a-col>
              <a-col :xl="6" :lg="7" :md="8" :sm="24">
                <a-form-item label="行次">
                  <a-input placeholder="请输入行次" v-model="queryParam.hc"></a-input>
                </a-form-item>
              </a-col>
              <template v-if="toggleSearchStatus">
                <a-col :xl="6" :lg="7" :md="8" :sm="24">
                  <a-form-item label="本期金额">
                    <a-input placeholder="请输入本期金额" v-model="queryParam.bqje"></a-input>
                  </a-form-item>
                </a-col>
                <a-col :xl="6" :lg="7" :md="8" :sm="24">
                  <a-form-item label="上年同期金额">
                    <a-input placeholder="请输入上年同期金额" v-model="queryParam.sntqje"></a-input>
                  </a-form-item>
                </a-col>
              </template>
              <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery(2)" icon="search">查询</a-button>
              <a-button @click="searchReset(2)" icon="reload" style="margin-left: 8px">重置</a-button>
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
          <a-button @click="handleAdd(2)" type="primary" icon="plus">新增</a-button>
          <a-button icon="download" :loading="exportLoading" @click="handleExportXls('财务报表利润表-外折人',2)">导出
          </a-button>
          <a-button icon="import" @click="excelImport(2)">导入</a-button>
          <a-button @click="handleDelete1(2)" icon="delete">删除</a-button>
          <a-dropdown v-if="selectedRowKeys.length > 0">
            <a-menu slot="overlay">
              <a-menu-item key="1" @click="batchDel(2)">
                <a-icon type="delete"/>
                删除
              </a-menu-item>
            </a-menu>
            <a-button style="margin-left: 8px"> 批量操作
              <a-icon type="down"/>
            </a-button>
          </a-dropdown>
        </div>

        <!-- table区域-begin -->
        <div>
          <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
            <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a
            style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
            <a style="margin-left: 24px" @click="onClearSelected">清空</a>
          </div>

          <a-table
            ref="table"
            size="middle"
            bordered
            :rowKey="rowKey"
            :columns="columns"
            :dataSource="dataSource2"
            :pagination="ipagination2"
            :loading="loading"
            :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
            @change="handleTableChange2">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record,2)">编辑</a>

          <a-divider type="vertical"/>
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down"/></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id,2)">
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
        <sgztCwbblrb-modal ref="modalForm" @ok="modalFormOk"></sgztCwbblrb-modal>
        <excel-import ref="excelImportModal" @ok="importComplete"/>
      </a-tab-pane>

      <a-tab-pane tab="本外币" key="3" :forceRender="true">
        <!-- 查询区域 -->
        <div class="table-page-search-wrapper">
          <a-form layout="inline" @keyup.enter.native="searchQuery">
            <a-row :gutter="24">

              <a-col :xl="6" :lg="7" :md="8" :sm="24">
                <a-form-item label="数据日期">
                  <a-date-picker placeholder="请选择数据日期" v-model="queryParam.sjrq"  :defaultValue="defaultMonthOpera"
                                  :format="monthFormat" style="width: 100%;" @change="beforeUpload(3)"/>
                </a-form-item>
              </a-col>
              <a-col :xl="6" :lg="7" :md="8" :sm="24">
                <a-form-item label="项目">
                  <a-input placeholder="请输入项目" v-model="queryParam.xm"></a-input>
                </a-form-item>
              </a-col>
              <a-col :xl="6" :lg="7" :md="8" :sm="24">
                <a-form-item label="行次">
                  <a-input placeholder="请输入行次" v-model="queryParam.hc"></a-input>
                </a-form-item>
              </a-col>
              <template v-if="toggleSearchStatus">
                <a-col :xl="6" :lg="7" :md="8" :sm="24">
                  <a-form-item label="本期金额">
                    <a-input placeholder="请输入本期金额" v-model="queryParam.bqje"></a-input>
                  </a-form-item>
                </a-col>
                <a-col :xl="6" :lg="7" :md="8" :sm="24">
                  <a-form-item label="上年同期金额">
                    <a-input placeholder="请输入上年同期金额" v-model="queryParam.sntqje"></a-input>
                  </a-form-item>
                </a-col>
              </template>
              <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery(3)" icon="search">查询</a-button>
              <a-button  @click="searchReset(3)" icon="reload" style="margin-left: 8px">重置</a-button>
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
          <a-button @click="handleAdd(3)" type="primary" icon="plus">新增</a-button>
          <a-button  icon="download" :loading="exportLoading" @click="handleExportXls('财务报表利润表-本外币',3)">导出</a-button>
          <a-button icon="import" @click="excelImport(3)">导入</a-button>
          <a-button @click="handleDelete1(3)" icon="delete">删除</a-button>
          <a-dropdown v-if="selectedRowKeys.length > 0">
            <a-menu slot="overlay">
              <a-menu-item key="1" @click="batchDel(3)">
                <a-icon type="delete"/>
                删除
              </a-menu-item>
            </a-menu>
            <a-button style="margin-left: 8px"> 批量操作
              <a-icon type="down"/>
            </a-button>
          </a-dropdown>
        </div>

        <!-- table区域-begin -->
        <div>
          <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
            <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a
            style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
            <a style="margin-left: 24px" @click="onClearSelected">清空</a>
          </div>

          <a-table
            ref="table"
            size="middle"
            bordered
            :rowKey="rowKey"
            :columns="columns"
            :dataSource="dataSource3"
            :pagination="ipagination3"
            :loading="loading"
            :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
            @change="handleTableChange3">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record,3)">编辑</a>

          <a-divider type="vertical"/>
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down"/></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id,3)">
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
        <sgztCwbblrb-modal ref="modalForm" @ok="modalFormOk"></sgztCwbblrb-modal>
        <excel-import ref="excelImportModal" @ok="importComplete"/>
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>

<script>
import SgztCwbblrbModal from './modules/SgztCwbblrbModal'
import {JeecgListMixin} from '@/mixins/JeecgListMixin'
import ExcelImport from '@/components/common/ExcelImport'
import { deleteAction, downFile, getAction, putAction } from '@/api/manage'
import { filterObj } from '@/utils/util'
import moment from 'moment'

export default {
  name: "SgztCwbblrbList",
  mixins: [JeecgListMixin],
  components: {
    SgztCwbblrbModal,ExcelImport
  },
  data() {
    return {
      description: '财务报表利润表管理页面',
      monthFormat: 'YYYY-MM-DD',
      // 默认当前月份
      defaultMonthOpera: '',
      rq:'',
      bzlx:'',
      dataSource1:[],
      dataSource2:[],
      dataSource3:[],
      ipagination1: {
        total: 0,
        current: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '30'],
        showTotal: (total, range) => {
          return range[0] + '-' + range[1] + ' 共' + total + '条'
        },
        showQuickJumper: true,
        showSizeChanger: true,
      },
      ipagination2: {
        current:1,
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
      tabsKey:'',
      // 表头
      columns: [
        {
          title: '序号',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: "center",
          customRender: function (t, r, index) {
            return parseInt(index) + 1;
          }
        },
        {
          title: '数据日期',
          align: 'center',
          dataIndex: 'sjrq'
        },
        {
          title: '项目',
          align: "center",
          dataIndex: 'xm'
        },
        {
          title: '行次',
          align: "center",
          dataIndex: 'hc'
        },
        {
          title: '本期金额',
          align: "center",
          dataIndex: 'bqje'
        },
        {
          title: '上年同期金额',
          align: "center",
          dataIndex: 'sntqje'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: "center",
          scopedSlots: {customRender: 'action'},
        }
      ],
      url: {
        list1: "/cwbblrbRmb/sgtzCwbblrbRmb/list",
        delete1: "/cwbblrbRmb/sgtzCwbblrbRmb/delete",
        deleteBatch1: "/cwbblrbRmb/sgtzCwbblrbRmb/deleteBatch",
        deleteByBatch1: "/cwbblrbRmb/sgtzCwbblrbRmb/deleteByBatch",
        exportXlsUrl1: "/cwbblrbRmb/sgtzCwbblrbRmb/exportXls",
        importExcelUrl1: "/cwbblrbRmb/sgtzCwbblrbRmb/importExcel",
        exportTemplateUrl1:"/cwbblrbRmb/sgtzCwbblrbRmb/exportTemplateXls",

        list2: "/cwbblrbWzrmb/sgtzCwbblrbWzrmb/list",
        delete2: "/cwbblrbWzrmb/sgtzCwbblrbWzrmb/delete",
        deleteBatch2: "/cwbblrbWzrmb/sgtzCwbblrbWzrmb/deleteBatch",
        deleteByBatch2: "/cwbblrbWzrmb/sgtzCwbblrbWzrmb/deleteByBatch",
        exportXlsUrl2: "/cwbblrbWzrmb/sgtzCwbblrbWzrmb/exportXls",
        importExcelUrl2: "/cwbblrbWzrmb/sgtzCwbblrbWzrmb/importExcel",
        exportTemplateUrl2:"/cwbblrbWzrmb/sgtzCwbblrbWzrmb/exportTemplateXls",

        list3: "/cwbblrb/sgztCwbblrb/list",
        delete3: "/cwbblrb/sgztCwbblrb/delete",
        deleteBatch3: "/cwbblrb/sgztCwbblrb/deleteBatch",
        deleteByBatch3: "/cwbblrb/sgztCwbblrb/deleteByBatch",
        exportXlsUrl3: "cwbblrb/sgztCwbblrb/exportXls",
        importExcelUrl3: "cwbblrb/sgztCwbblrb/importExcel",
        exportTemplateUrl3:"/cwbblrb/sgztCwbblrb/exportTemplateXls",
      },
    }
  },
  computed: {},
  created () {
    this.chagwTabs()
  },
  methods: {
    handleDelete: function (id,num) {
      var that = this
      if (num == 1){
        if (!this.url.delete1) {
          this.$message.error('请设置url.delete属性!')
          return
        }
        deleteAction(that.url.delete1, { id: id }).then((res) => {
          if (res.success) {
            that.$message.success(res.message)
            that.loadData()
          } else {
            that.$message.warning(res.message)
          }
        })
      }else if (num==2){
        if (!this.url.delete2) {
          this.$message.error('请设置url.delete属性!')
          return
        }
        deleteAction(that.url.delete2, { id: id }).then((res) => {
          if (res.success) {
            that.$message.success(res.message)
            that.loadData()
          } else {
            that.$message.warning(res.message)
          }
        })
      }else {
        if (!this.url.delete3) {
          this.$message.error('请设置url.delete属性!')
          return
        }
        deleteAction(that.url.delete3, { id: id }).then((res) => {
          if (res.success) {
            that.$message.success(res.message)
            that.loadData()
          } else {
            that.$message.warning(res.message)
          }
        })
      }
    },

    handleDelete1: function (num) {
      if (num ==1){
        if (this.queryParam.sjrq == undefined && this.queryParam.sjrq == null){
          this.$message.error("请选择数据日期!")
          return
        }else {
          this.rq = this.queryParam.sjrq.format("YYYYMMDD");
          console.log(this.rq)
          var that = this;
          deleteAction(that.url.deleteByBatch1, {sjrq:this.rq}).then((res) => {
            if (res.success) {
              that.$message.success(res.message);
              that.loadData();
            } else {
              that.$message.warning(res.message);
            }
          });
        }
      }else if (num==2){
        if (this.queryParam.sjrq == undefined && this.queryParam.sjrq == null){
          this.$message.error("请选择数据日期!")
          return
        }else {
          this.rq = this.queryParam.sjrq.format("YYYYMMDD");
          console.log(this.rq)
          var that = this;
          deleteAction(that.url.deleteByBatch2, {sjrq:this.rq}).then((res) => {
            if (res.success) {
              that.$message.success(res.message);
              that.loadData();
            } else {
              that.$message.warning(res.message);
            }
          });
        }
      }else {
        if (this.queryParam.sjrq == undefined && this.queryParam.sjrq == null){
          this.$message.error("请选择数据日期!")
          return
        }else {
          this.rq = this.queryParam.sjrq.format("YYYYMMDD");
          console.log(this.rq)
          var that = this;
          deleteAction(that.url.deleteByBatch3, {sjrq:this.rq}).then((res) => {
            if (res.success) {
              that.$message.success(res.message);
              that.loadData();
            } else {
              that.$message.warning(res.message);
            }
          });
        }
      }
    },

    batchDel: function (num) {
      if (num==1){
        if (this.selectedRowKeys.length <= 0) {
          this.$message.warning('请选择一条记录！')
          return
        } else {
          var ids = ''
          for (var a = 0; a < this.selectedRowKeys.length; a++) {
            ids += this.selectedRowKeys[a] + ','
          }
          var that = this
          this.$confirm({
            title: '确认删除',
            content: '是否删除选中数据?',
            onOk: function () {
              that.loading = true
              deleteAction(that.url.deleteBatch1, { ids: ids }).then((res) => {
                if (res.success) {
                  that.$message.success(res.message)
                  that.loadData()
                  that.onClearSelected()
                } else {
                  that.$message.warning(res.message)
                }
              }).finally(() => {
                that.loading = false
              })
            }
          })
        }
      }else if (num==2){
        if (this.selectedRowKeys.length <= 0) {
          this.$message.warning('请选择一条记录！')
          return
        } else {
          var ids = ''
          for (var a = 0; a < this.selectedRowKeys.length; a++) {
            ids += this.selectedRowKeys[a] + ','
          }
          var that = this
          this.$confirm({
            title: '确认删除',
            content: '是否删除选中数据?',
            onOk: function () {
              that.loading = true
              deleteAction(that.url.deleteBatch2, { ids: ids }).then((res) => {
                if (res.success) {
                  that.$message.success(res.message)
                  that.loadData()
                  that.onClearSelected()
                } else {
                  that.$message.warning(res.message)
                }
              }).finally(() => {
                that.loading = false
              })
            }
          })
        }
      }else {
        if (this.selectedRowKeys.length <= 0) {
          this.$message.warning('请选择一条记录！')
          return
        } else {
          var ids = ''
          for (var a = 0; a < this.selectedRowKeys.length; a++) {
            ids += this.selectedRowKeys[a] + ','
          }
          var that = this
          this.$confirm({
            title: '确认删除',
            content: '是否删除选中数据?',
            onOk: function () {
              that.loading = true
              deleteAction(that.url.deleteBatch3, { ids: ids }).then((res) => {
                if (res.success) {
                  that.$message.success(res.message)
                  that.loadData()
                  that.onClearSelected()
                } else {
                  that.$message.warning(res.message)
                }
              }).finally(() => {
                that.loading = false
              })
            }
          })
        }
      }




    },
    getQueryParams () {
      //获取查询条件
      let sqp = {}
      let tjMoment=""
      if (this.superQueryParams) {
        sqp['superQueryParams'] = encodeURI(this.superQueryParams)
      }
      var param = Object.assign(sqp, this.queryParam, this.isorter, this.filters)
      param.field = this.getQueryField()
      console.log(this.bzlx)
      if (this.bzlx=='1'){
        if (this.queryParam.sjrq) {
          tjMoment=moment(this.queryParam.sjrq).format("YYYYMMDD")
        }
        param.sjrq=tjMoment
        param.pageNo = this.ipagination1.current
        param.pageSize = this.ipagination1.pageSize
      }else if (this.bzlx == '2'){
        if (this.queryParam.sjrq) {
          tjMoment=moment(this.queryParam.sjrq).format("YYYYMMDD")
        }
        param.sjrq=tjMoment
        param.pageNo = this.ipagination2.current
        param.pageSize = this.ipagination2.pageSize
      }else {
        if (this.queryParam.sjrq) {
          tjMoment=moment(this.queryParam.sjrq).format("YYYYMMDD")
        }
        param.sjrq=tjMoment
        param.pageNo = this.ipagination3.current
        param.pageSize = this.ipagination3.pageSize
      }
      return filterObj(param)
    },
    handleTableChange1 (pagination, filters, sorter) {
      //分页、排序、筛选变化时触发
      //TODO 筛选
      if (Object.keys(sorter).length > 0) {
        this.isorter.column = sorter.field
        this.isorter.order = 'ascend' == sorter.order ? 'asc' : 'desc'
      }
      this.ipagination1 = pagination
      this.loadData(1)
    },
    handleTableChange2 (pagination, filters, sorter) {
      //分页、排序、筛选变化时触发
      //TODO 筛选
      if (Object.keys(sorter).length > 0) {
        this.isorter.column = sorter.field
        this.isorter.order = 'ascend' == sorter.order ? 'asc' : 'desc'
      }
      this.ipagination2 = pagination
      this.loadData(2)
    },
    handleTableChange3 (pagination, filters, sorter) {
      //分页、排序、筛选变化时触发
      //TODO 筛选
      if (Object.keys(sorter).length > 0) {
        this.isorter.column = sorter.field
        this.isorter.order = 'ascend' == sorter.order ? 'asc' : 'desc'
      }
      this.ipagination3 = pagination
      this.loadData(3)
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
      //let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()))
      //param.paramsStr = paramsStr
      console.log('导出参数', param)
      this.exportLoading = true
      console.log(num+'导出')
      if (num == 1){
        downFile(this.url.exportXlsUrl1, param).then((data) => {
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
      }else if (num ==2){
        downFile(this.url.exportXlsUrl2, param).then((data) => {
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
      }else {
        downFile(this.url.exportXlsUrl3, param).then((data) => {
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
      }
    },
    beforeUpload(num) {
      if (num ==1){
        if (this.queryParam.sjrq){
          this.rq = this.queryParam.sjrq.format("YYYYMMDD");
        }
      }else if (num ==2){
        if (this.queryParam.sjrq){
          this.rq = this.queryParam.sjrq.format("YYYYMMDD");
        }
      }else {
        if (this.queryParam.sjrq){
          this.rq = this.queryParam.sjrq.format("YYYYMMDD");
        }
      }

    },
    excelImport(num) {
      let params = {}
      if (num==1){
        if (this.queryParam.sjrq == undefined || this.queryParam.sjrq == '') {
          this.$message.error("请选择数据日期!")
          return
        }else {
          params.exportTemplateUrl = this.url.exportTemplateUrl1
          params.importExcelUrl = `${window._CONFIG['domianURL']}/${this.url.importExcelUrl1}?sjrq=${this.rq}`
          this.exportTemplateName = '财务报表利润表-人民币导入模板'
        }
      }else if (num==2){
        if (this.queryParam.sjrq == undefined || this.queryParam.sjrq == '') {
          this.$message.error("请选择数据日期!")
          return
        }else {
          params.exportTemplateUrl = this.url.exportTemplateUrl2
          params.importExcelUrl = `${window._CONFIG['domianURL']}/${this.url.importExcelUrl2}?sjrq=${this.rq}`
          this.exportTemplateName = '财务报表利润表-外折人导入模板'
        }
      }else{
        if (this.queryParam.sjrq == undefined || this.queryParam.sjrq == '') {
          this.$message.error("请选择数据日期!")
          return
        }else {
          params.exportTemplateUrl = this.url.exportTemplateUrl3
          params.importExcelUrl = `${window._CONFIG['domianURL']}/${this.url.importExcelUrl3}?sjrq=${this.rq}`
          this.exportTemplateName = '财务报表利润表-本外币导入模板'
        }
      }
      params.exportTemplateName = this.exportTemplateName
      var param = Object.assign({}, this.queryParam, params);
      this.$refs.excelImportModal.showModal(param);
    },
    chagwTabs(key){
      console.log(key)
      if (key == undefined){
        key=1
      }
      this.bzlx = key
      this.searchReset(key)
    },
    handleAdd(num){
      this.$refs.modalForm.add(num);
    },
    handleEdit: function (record,num) {
      this.$refs.modalForm.edit(record,num);
      this.$refs.modalForm.title = "编辑";
      this.$refs.modalForm.disableSubmit = false;
    },
    ok(num){
      console.log(num)
      this.loadData(num)
    },
    searchQuery(num){
      this.loadData(num,1);
    },
    searchReset(num){
      this.ipagination1.current = 1
      this.ipagination2.current = 1
      this.ipagination3.current = 1
      this.queryParam = {}
      this.loadData(num);
    },
    loadData(num,arg){
      this.loading = true;
      if (arg === 1) {
        this.ipagination1.current = 1
        this.ipagination2.current = 1
        this.ipagination3.current = 1
      }
      var params = this.getQueryParams();//查询条件
      if(num==1){
        getAction(this.url.list1, params).then((res) => {
          if (res.success) {
            this.dataSource1 = res.result.records;
            this.ipagination1.total = res.result.total
            this.loading = false;
          }else{
            this.$message.error(res.message,5);
            this.loading = false;
          }
        })
      }else if (num==2){
        getAction(this.url.list2, params).then((res) => {
          if (res.success) {
            this.dataSource2 = res.result.records;
            this.ipagination2.total = res.result.total
            this.loading = false;
          }else{
            this.$message.error(res.message,5);
            this.loading = false;
          }
        })
      }else {
        getAction(this.url.list3, params).then((res) => {
          if (res.success) {
            this.dataSource3 = res.result.records;
            this.ipagination3.total = res.result.total
            this.loading = false;
          }else{
            this.$message.error(res.message,5);
            this.loading = false;
          }
        })
      }
    },
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less'
</style>