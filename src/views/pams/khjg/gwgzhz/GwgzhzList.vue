<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="工资月份">
              <!--<a-month-picker placeholder="请选择工资月份" style="width: 100%;" :format="monthFormat"-->
                             <!--:defaultValue="defaultMonthOpera" v-model="queryParam.gzrq"></a-month-picker>-->
              <a-range-picker :placeholder="['开始日期', '结束日期']" v-model="queryParam.gzrq" :format="DateFormat"
                              @change="gzrqChange" style="width: 100%;"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="考核项目">
              <j-dict-select-tag placeholder="请选择考核项目" v-model="queryParam.schemeId" dict-code="V_PMA_A_SCHEME,SHOW_NAME,SCHEME_ID,evl_obj_type=3" :showSearch="true"  />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="组织名称">
              <j-tree-select placeholder="请选择组织查询"
                             v-model="queryParam.zzbz"
                             :showSearch="true"
                             treeNodeFilterProp="title"
                             dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ"
                             pidField="sjzzbz"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="岗位标志">
                <j-dict-select-tag
                  placeholder="请选择岗位名称"
                  v-model="queryParam.gwbz"
                  dictCode="Hr_bas_post,gwmc,gwbz"
                />
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="员工工号">
                <a-input placeholder="请输入员工工号" v-model="queryParam.yggh"></a-input>
              </a-form-item>
            </a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchQueryByUrl(url.listAll)" v-has="'Gwgzhz:searchAll'" icon="search" style="margin-left: 8px">查询全部</a-button>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('岗位工资汇总')" v-has="'Gwgzhz:exp'">导出</a-button>
      <a-button icon="download" :loading="exportLoading" @click="handleExportXlsByNameAndUrl('岗位工资汇总', url.exportAllXlsUrl)" v-has="'Gwgzhz:expAll'">导出全部</a-button>

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
        :rowKey="rowKey"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{ x: 1600 }"
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

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <gwgzhz-modal ref="modalForm" @ok="modalFormOk"></gwgzhz-modal>
  </a-card>
</template>

<script>
  import GwgzhzModal from './modules/GwgzhzModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { filterObj } from '@/utils/util'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'
  import { getAction } from '@/api/manage'
  import moment from 'moment'
  import store from '@/store/'

  export default {
    name: "GwgzhzList",
    mixins:[JeecgListMixin],
    components: {
      GwgzhzModal,JTreeSelect
    },
    data () {
      return {
        description: '岗位工资汇总管理页面',
        toggleSearchStatus: true,
        // 表头
        monthFormat: 'YYYY-MM',
        DateFormat: 'YYYY-MM-DD',
        // 默认当前月份
        defaultMonthOpera: '',
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
            title: '工资日期',
            align:"center",
            dataIndex: 'gzrq',
            width: 100,
          },
          {
            title: '考核项目',
            align:"center",
            dataIndex: 'schemeId_dictText',
            width: 150,
          },
          /* {
                title: '组织标志',
                align:"center",
                dataIndex: 'zzbz'
               },*/
          {
            title: '组织名称',
            align:"center",
            dataIndex: 'zzbz_dictText'
          },
          /*{
               title: '岗位标志',
               align:"center",
               dataIndex: 'gwbz'
              },*/
          {
            title: '岗位名称',
            align:"center",
            dataIndex: 'gwbz_dictText'
          },
          {
            title: '员工工号',
            align:"center",
            dataIndex: 'yggh'
          },
          {
            title: '员工姓名',
            align:"center",
            dataIndex: 'yggh_dictText'
          },

          /* {
             title: '操作',
             dataIndex: 'action',
             align:"center",
             scopedSlots: { customRender: 'action' },
           }*/
        ],
        afterColumns: [
          {
            title: '工资合计',
            align:"center",
            dataIndex: 'gzhj'
          },
          {
            title: '支行工资排名',
            align:"center",
            dataIndex: 'zhgzpm'
          },
          {
            title: '全行工资排名',
            align:"center",
            dataIndex: 'qhgzpm'
          },
        ],
        gzlbColumns: [
          {
            title: '存款工资',
            align:"center",
            dataIndex: 'ckgz',
            orderNumber: 1
          },
          {
            title: '贷款工资',
            align:"center",
            dataIndex: 'dkgz',
            orderNumber: 2
          },
          {
            title: '电子银行工资',
            align:"center",
            dataIndex: 'dzyhgz',
            orderNumber: 3
          },
          {
            title: '业务量工资',
            align:"center",
            dataIndex: 'ywlgz',
            orderNumber: 4
          },
          {
            title: '管理绩效工资',
            align:"center",
            dataIndex: 'gljxgz',
            orderNumber: 5
          },
          {
            title: '地区补差工资',
            align:"center",
            dataIndex: 'dqbcgz',
            orderNumber: 6
          },
          {
            title: '经营目标工资',
            align:"center",
            dataIndex: 'jymbgz',
            orderNumber: 8
          },
          {
            title: '延期兑付工资',
            align:"center",
            dataIndex: 'yqdfgz'
          },
          {
            title: '其他工资',
            align:"center",
            dataIndex: 'qtgz',
            orderNumber: 7
          },
          {
            title: '基本工资',
            align:"center",
            dataIndex: 'jbgz'
          },
          {
            title: '表外工资',
            align:"center",
            dataIndex: 'bwgz'
          },
          {
            title: '专项考核工资',
            align:"center",
            dataIndex: 'zxkhgz'
          },
          {
            title: '年终考核工资',
            align:"center",
            dataIndex: 'nzkhgz'
          },
        ],
        url: {
          list: "/gwgzhz/gwgzhz/list",
          listAll: "/gwgzhz/gwgzhz/listAll",
          delete: "/gwgzhz/gwgzhz/delete",
          deleteBatch: "/gwgzhz/gwgzhz/deleteBatch",
          exportXlsUrl: "gwgzhz/gwgzhz/exportXls",
          exportAllXlsUrl: "gwgzhz/gwgzhz/exportXlsAll",
          importExcelUrl: "gwgzhz/gwgzhz/importExcel",
        },
        searchAll: false,
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    created() {
      this.defaultMonthOpera = moment(new Date(), this.monthFormat);
      // this.queryParam = {gzrq: undefined};
      // this.queryParam.gzrq=this.defaultMonthOpera
      getAction(`/sys/dict/getDictItems/zblb`,{status: 1}).then((res) => {
        console.log('res', res)
        if (res.success && res.result) {
          res.result.forEach(item => {
            this.gzlbColumns.forEach(gzlbColumn => {
              if (item.value == gzlbColumn.orderNumber) {
                this.columns.push(gzlbColumn)
              }
            })
          })
        }
      }).finally(()=>{
        this.afterColumns.forEach(column => {
          this.columns.push(column)
        })
      })
    },
    methods: {
      searchReset() {
        this.queryParam = {zzbz: undefined};
        if(!store.getters.isRoot) {
          this.queryParam.zzbz = store.getters.orgCode
        }
        if (this.searchAll) {
          this.loadDataByUrl(1, this.url.listAll)
        } else {
          this.loadData(1);
        }
      },
      beforeSearchQuery(url) {
        if (url) {
          //查询全部
          this.searchAll = true
        } else {
          this.searchAll = false
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
        if (this.searchAll) {
          this.loadDataByUrl(undefined, this.url.listAll)
        } else {
          this.loadData();
        }
      },
      gzrqChange:function(value, dateString) {
        this.queryParam.gzrq_begin = dateString[0]
        this.queryParam.gzrq_end = dateString[1]
      },
      getQueryParams() {
        // if (this.queryParam.gzrq) {
        //   this.queryParam.gzrq = moment(this.queryParam.gzrq).format("YYYY-MM")+'-01';
        // }
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        delete param.gzrq
        return filterObj(param);
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>