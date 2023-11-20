<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8"><a-form-item label="统计月份">
            <a-month-picker placeholder="请选择统计月份" v-model="queryParam.tjyf" style="width: 100%;"
                            :defaultValue="defaultMonthOpera" :format="monthFormat"/>
          </a-form-item></a-col>

          <a-col :md="6" :sm="8"><a-form-item label="所属支行">
            <j-tree-select placeholder="请选择所属支行" v-model="queryParam.sszh"
                           dict="V_HR_BAS_ORGANIZATION_CMMS,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                           :sszh="true" :showSearch="false" :treeDefaultExpandAll="true" :filterTreeNode="true" :isAll="isAll"/>
          </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8"><a-form-item label="行政村">
            <j-input placeholder="请输入行政村" v-model="queryParam.xzc" type="likemore"/>
          </a-form-item></a-col>

          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8"><a-form-item label="行政组">
              <!--<j-dict-select-tag placeholder="请输入行政组" v-model="queryParam.xzz" dict-code="V_CZXXGL_ORGANIZE,ORGANIZE,QYBM"/>-->
              <j-input placeholder="请输入行政组" v-model="queryParam.xzz"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="责任人">
              <j-dict-select-tag placeholder="请选择责任人" v-model="queryParam.zkhjl" dict-code="HR_BAS_STAFF,YGXM,YGGH" :show-search="true"/>
            </a-form-item></a-col>
          </template>

          <a-col :md="6" :sm="8" >
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
      <!--<a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button type="primary" icon="download" @click="handleExportXls('行政组走访数据明细统计')">导出</a-button>
<!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">-->
<!--        <a-button type="primary" icon="import">导入</a-button>-->
<!--      </a-upload>-->
<!--      <a-dropdown v-if="selectedRowKeys.length > 0">-->
<!--        <a-menu slot="overlay">-->
<!--          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>-->
<!--        </a-menu>-->
<!--        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>-->
<!--      </a-dropdown>-->
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }} </a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table ref="table"
               size="middle"
               bordered
               rowKey="id"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
               @change="handleTableChange">
<!--        <span slot="action" slot-scope="text, record">-->
<!--          <a @click="handleEdit(record)">编辑</a>-->
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
<!--        </span>-->
        <span slot="detail" slot-scope="xzz, record">
          <a @click="handlerDetailToDh(record, '/tjfx/zfsjmx/dhsjmx/ZfsjmxDhList')">{{xzz}}</a>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <zfsjmxXzz-modal ref="modalForm" @ok="modalFormOk"></zfsjmxXzz-modal>
  </a-card>
</template>

<script>
  import ZfsjmxXzzModal from './modules/ZfsjmxXzzModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '../../../../components/jeecg/JTreeSelect'
  import JInput from '../../../../components/jeecg/JInput'
  import moment from 'moment'
  import { filterObj } from '../../../../utils/util'
  import { getAction,putAction,httpAction,downFile } from '@/api/manage'
  import { mapGetters } from 'vuex'
  import store from '@/store/'

  export default {
    name: "ZfsjmxXzzList",
    mixins:[JeecgListMixin],
    components: {
      JInput,
      JTreeSelect,
      ZfsjmxXzzModal
    },
    data () {
      return {
        description: '行政组走访数据明细统计管理页面',
        monthFormat: 'YYYY-MM',
        // 默认当前月份
        defaultMonthOpera: undefined,
        // 重置标识
        flag: true,
        isorter: {
          column: 'tjyf',
          order: 'desc',
        },
        // 表头
        isAll: false,
        sszh :'',
        columns: [
          {
            title: '序号',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: "center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
          },
          {
            title: '统计月份',
            align: "center",
            dataIndex: 'tjyf',
            customRender:function (text) {
              return !text ? "" : (text.length>7 ? text.substr(0,7) : text)
            },
            sorter: (a, b) => b.tjyf.replace(/-/g, '/') - a.tjyf.replace(/-/g, '/'),
          },
          {
            title: '所属支行',
            align: "center",
            dataIndex: 'sszh_dictText',
            sorter: (a, b) => b.sszh - a.sszh,
          },
          {
            title: '行政村',
            align: "center",
            dataIndex: 'xzc_dictText',
          },
          {
            title: '行政组',
            align: "center",
            dataIndex: 'xzz_dictText',
            scopedSlots: { customRender: 'detail' }
          },
          {
            title: '责任人',
            align: "center",
            dataIndex: 'zkhjl_dictText'
          },
          {
            title: '有效走访户数',
            align: "center",
            dataIndex: 'yxzfhs'
          },
          {
            title: '总户数',
            align: "center",
            dataIndex: 'zhs'
          },
          {
            title: '走访覆盖率(%)',
            align: "center",
            dataIndex: 'zffgl',
            sorter: (a, b) => b.zffgl - a.zffgl,
          },
          // {
          //   title: '操作',
          //   dataIndex: 'action',
          //   align: "center",
          //   scopedSlots: { customRender: 'action' },
          // }
        ],
        url: {
          list: "/tjfx.zfsjmx/xzzsjmx/list",
          delete: "/tjfx.zfsjmx/xzzsjmx/delete",
          deleteBatch: "/tjfx.zfsjmx/xzzsjmx/deleteBatch",
          exportXlsUrl: "tjfx.zfsjmx/xzzsjmx/exportXls",
          importExcelUrl: "tjfx.zfsjmx/xzzsjmx/importExcel",
        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    created(){
      this.isAll = store.getters.isRoot
      this.sszh =store.getters.userInfo.orgCode
    },
    methods: {
      ...mapGetters(["nickname", "avatar","userInfo"]),
      initQueryParams() {
        if(!store.getters.isRoot) {
          //this.queryParam.sszh = store.getters.userInfo.orgCode
        }
        this.paramsInited = true
      },
      searchReset: function() {
        this.flag = false;
        this.$route.query.tjyf = null;
        this.$route.query.sszh = null;
        this.$route.query.xzc  = null;
        this.queryParam = {}
        if(!store.getters.isRoot) {
          //this.queryParam.sszh = store.getters.userInfo.orgCode
        }
        this.loadData(1);
      },
      moment,
      getCurrentMonth() {
        let curDate = new Date();
        let curMonth= { year : curDate.getFullYear(), month: curDate.getMonth() + 1, }
        this.defaultMonthOpera = moment(curDate);
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
      getQueryParams() {
        let tjyfMoment = "";
        let tjyfValue  = this.$route.query.tjyf;
        let sszhValue  = this.$route.query.sszh;
        let xzcValue   = this.$route.query.xzc;
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

        if (sszhValue) {
          param.sszh = sszhValue;
        }
        if (xzcValue) {
          param.xzc = xzcValue;
        }

        return filterObj(param);
      },
      handlerDetailToDh: function(record, path) {
        this.$router.push({
          path: path,
          query: {
            tjyf: record.tjyf, sszh: record.sszh,
            szc: record.xzc, xzz: record.xzz
          },
        })
      },

      handleExportXls(fileName){
        var param = this.getQueryParams();//查询条件
        if ((param.tjyf=='undefined' || param.tjyf==null) && this.flag==true) {
          param.tjyf = this.defaultMonthOpera.format("YYYY-MM")+'-01';
        }
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        //let param = {...this.queryParam};
        if(this.selectedRowKeys && this.selectedRowKeys.length>0){
          param['selections'] = this.selectedRowKeys.join(",")
        }
        // if (param.tjyf != null){
        //   param.tjyf=param.tjyf.format("YYYY-MM")+'-01'}
        console.log("导出参数",param)
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
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>