<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="所属支行">
              <j-tree-select placeholder="请选择" v-model="queryParam.zzbz" @change="sszhChange"
                             dict="v_hr_bas_organization_cmms,zzjc,zzbz" pidField="sjzzbz" treeNodeFilterProp="title"
                             :sszh="true" :showSearch="false" :treeDefaultExpandAll="true" :filterTreeNode="true"
                             :isAll="isAll"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="行政村（请先选择所属支行）">
              <a-select placeholder="请选择" v-model="queryParam.xzc" :disabled="XzcDisabled">
                <a-select-option v-for="item in xzcOptions" :key="item.wgbh" :value="item.wgbh">{{ item.wgmc }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8" >
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'ZftjysbRwsz:add'">新增</a-button>
      <a-button icon="download" @click="handleExportXls('走访统计验收表任务设置')" v-has="'ZftjysbRwsz:exp'">导出</a-button>
      <a-button icon="import" @click="excelImport" v-has="'ZftjysbRwsz:imp'">导入</a-button>
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
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'ZftjysbRwsz:edit'">编辑</a>
          <a-divider type="vertical"  v-has="'ZftjysbRwsz:delete'"/>
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)" v-has="'ZftjysbRwsz:delete'">
            <a>删除</a>
          </a-popconfirm>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->
    <rwsz-modal ref="modalForm" @ok="modalFormOk"/>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JInput from '@/components/jeecg/JInput'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { mapGetters } from 'vuex'
  import { filterObj } from '@/utils/util'
  import { getAction,putAction,httpAction,downFile } from '@/api/manage'
  import store from '@/store/'
  import rwszModal from './modules/rwszModal'
  import ExcelImport from '@/components/common/ExcelImport'
  export default {
    name: "ZftjysbRwszList",
    mixins:[JeecgListMixin],
    components: {
      rwszModal,
      JTreeSelect,
      JInput,
      ExcelImport
    },
    data () {
      return {
        description: '走访统计验收表任务设置',
        monthFormat: 'YYYY-MM',
        // 默认当前月份
        defaultMonthOpera: undefined,
        XzcDisabled: true,
        // 重置标识
        flag: true,
        // 表头
        isAll: false,
        sszh :'',
        xzcOptions: [],
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
            title: '支行名称',
            align: "center",
            dataIndex: 'zzbz_dictText',
            sorter: (a, b) => b.zzbz - a.zzbz,
          },
          {
            title: '行政村',
            align: "center",
            dataIndex: 'xzc_dictText',
          },
          {
            title: '操作',
            dataIndex: 'action',
            fixed: 'right',
            align: "center",
            scopedSlots: { customRender: 'action' },
            width: 120,
          }
        ],
        url: {
          list: "/rwsz/zftjysbRwsz/list",
          delete: "/rwsz/zftjysbRwsz/delete",
          deleteBatch: "/rwsz/zftjysbRwsz/deleteBatch",
          exportXlsUrl: "rwsz/zftjysbRwsz/exportXls",
          importExcelUrl: "rwsz/zftjysbRwsz/importExcel",
          exportTemplateUrl: "rwsz/zftjysbRwsz/exportTemplateXls",
          // getXzcList: "/yxdygl/ejyxdygl/querlist"
          getXzcList: "/yxdyglmain/yxdyglMain/querlist"
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
      ...mapGetters(["userInfo"]),
      initQueryParams() {
        if(!store.getters.isRoot) {
          this.queryParam.zzbz = store.getters.userInfo.orgCode
        }
        this.paramsInited = true
      },
      searchReset: function() {
        this.flag = false;
        this.$route.query.zzbz = null;
        this.queryParam = {}
        this.xzcOptions = []
        this.XzcDisabled=true
        if(!store.getters.isRoot) {
          this.queryParam.zzbz = store.getters.userInfo.orgCode
        }
        this.loadData(1);
      },
      sszhChange(value) {
        console.log('所属支行监听事件 -', value)
        //根据所选支行获取行政村数据
        let params = {}
        params.zzbz = value
        params.wgxz = 2
        params.pageSize = 999
        this.$set(this.queryParam, 'xzc', '')
        if (value) {
          this.XzcDisabled=true
          getAction(this.url.getXzcList, params).then(res => {
            console.log('getXzcList', res)
            this.xzcOptions = res.result.records
            console.log(this.xzcOptions)
          }).finally(()=>{
            this.XzcDisabled=false
          })
        } else {
          this.xzcOptions = []
        }
      },
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

        this.loading = true;
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records;
            this.ipagination.total = res.result.total;
          } else {
            this.dataSource = []
            this.ipagination.total = 0
          }
          if(res.code===510){
            this.$message.warning(res.message)
          }
          this.loading = false;
        })
      },
      getQueryParams() {
        let sszhValue  = this.$route.query.zzbz;
        var param = Object.assign({}, this.queryParam);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (sszhValue) {
          param.zzbz = sszhValue;
        }

        return filterObj(param);
      },
      excelImport(){
        let params = {}
        params.exportTemplateUrl = this.url.exportTemplateUrl
        params.importExcelUrl = this.importExcelUrl
        params.exportTemplateName = "走访统计验收表任务设置导入模板"
        this.$refs.excelImportModal.showModal(params);
      },
      handleExportXls(fileName){
        var param = this.getQueryParams();//查询条件
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
      importComplete(filePath) {
        let fileName = "导入结果"
        let param = {};
        console.log("filePath")
        console.log(filePath)
        this.loadData();
      },
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>