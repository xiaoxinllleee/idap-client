<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="工资日期">
              <a-range-picker :placeholder="['开始日期', '结束日期']" v-model="queryParam.gzrq" :format="DateFormat"
                              @change="gzrqChange" style="width: 100%;"/>
              <!--<a-month-picker placeholder="请选择工资月份" style="width: 100%;" :format="monthFormat"-->
                             <!--:defaultValue="defaultMonthOpera" v-model="queryParam.gzrq"></a-month-picker>-->

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
            <a-form-item label="岗位名称">
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
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="指标标识">
              <a-input placeholder="请输入指标标识" v-model="queryParam.zbid"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="指标类别">
              <j-dict-select-tag placeholder="请选择指标类别" v-model="queryParam.zblb" dict-code="zblb" :showSearch="true"  />
            </a-form-item>
          </a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search" v-has="'Gwkhjg:search'">查询</a-button>
              <a-button type="primary" @click="searchQueryByUrl(url.listAll)" v-has="'Gwkhjg:searchAll'" icon="search" style="margin-left: 8px">查询全部</a-button>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('岗位考核结果')" v-has="'Gwkhjg:exp'">导出</a-button>
      <a-button icon="download" :loading="exportLoading" @click="handleExportXlsByNameAndUrl('岗位考核结果', url.exportAllXlsUrl)" v-has="'Gwkhjg:expAll'">导出全部</a-button>
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
        :scroll="{ x: 1600 }"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <!--<a @click="handleEdit(record)">查看</a>-->
          <a @click="handleView(record)">查看</a>

       <!--   <a-divider type="vertical" />
          <a-dropdown>
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
    <gwkhjg-modal ref="modalForm" @ok="modalFormOk"></gwkhjg-modal>
    <gwkhjg-view-modal ref="modalViewForm" @ok="modalFormOk"></gwkhjg-view-modal>
    <ZbmxAutoModal ref="zbmxAutoModal" @ok="modalFormOk"></ZbmxAutoModal>
  </a-card>
</template>

<script>
  import GwkhjgModal from './modules/GwkhjgModal'
  import GwkhjgViewModal from './modules/GwkhjgViewModal'
  import ZbmxAutoModal from './modules/ZbmxAutoModal'

  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'
  import { filterObj } from '@/utils/util'
  import { downFile } from '@api/manage'
  import moment from 'moment'
  import { getAction ,putAction} from '@/api/manage'
  import store from '@/store/'

  export default {
    name: "GwkhjgList",
    mixins:[JeecgListMixin],
    components: {
      GwkhjgModal,JTreeSelect,GwkhjgViewModal,ZbmxAutoModal
    },
    data () {
      return {
        description: '岗位考核结果管理页面',
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
          {
            title: '组织名称',
            align:"center",
            dataIndex: 'zzbz_dictText',
            width: 120
          },
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
          {
            title: '指标标识',
            align:"center",
            dataIndex: 'zbid'
          },
          {
            title: '指标名称',
            align:"center",
            dataIndex: 'zbid_dictText',
            width: 120,
          },
		   {
            title: '指标类别',
            align:"center",
            dataIndex: 'zblb_dictText'
           },
          {
            title: '指标结果',
            align:"center",
            dataIndex: 'zbjg'
          },
		   {
            title: '指标工资',
            align:"center",
            dataIndex: 'zbgz'
           },
          {
            title: '指标单价',
            align:"center",
            dataIndex: 'zbdj'
          },
          {
            title: '指标单位',
            align:"center",
            dataIndex: 'zbdw'
          },
		   {
            title: '在岗天数',
            align:"center",
            dataIndex: 'zgts'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'bz',
            width: 150,
            ellipsis:true,
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            fixed: "right",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/jgkhjg/jgkhjg/listGw",
          listAll: "/jgkhjg/jgkhjg/listGwAll",
          delete: "/jgkhjg/jgkhjg/delete",
          getzbmxset:"/zbmx/zbmxSet/queryByZbid",
          deleteBatch: "/jgkhjg/jgkhjg/deleteBatch",
          exportXlsUrl: "/jgkhjg/jgkhjg/exportXlsGw",
          exportAllXlsUrl: "/jgkhjg/jgkhjg/exportXlsGwAll",
          importExcelUrl: "gwkhjg/gwkhjg/importExcel",
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
      handleView: function (record) {
        putAction(this.url.getzbmxset, record).then(res => {
          if (res.success) {
            if( !res.result || res.result.mxlx=='1'){
              this.$refs.modalViewForm.edit(record)
              this.$refs.modalViewForm.title = '详情'
            }else if(res.result.mxlx=='2'){
              console.log(res.result.zszdxx)
              console.log(res.result.zbmxjg)
              this.$refs.zbmxAutoModal.edit(record,res.result.zszdxx,res.result.zbmxjg,res.result.total)
              this.$refs.zbmxAutoModal.title = '指标明细'
            }
          }else{
            this.$refs.modalViewForm.edit(record)
            this.$refs.modalViewForm.title = '详情'
          }
        }).finally(() => {
          this.confirmLoading = false;
        })



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


      handleExportXls (fileName) {
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
        downFile(this.url.exportXlsUrl, param).then((data) => {
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
  @import '~@assets/less/common.less'
</style>