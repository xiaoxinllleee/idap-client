<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="开始日期">
              <a-date-picker v-model="queryParam.ksrq"
                             placeholder="请选择开始日期"
                             style="width: 100%;"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="结束日期">
              <a-date-picker v-model="queryParam.jsrq"
                             placeholder="请选择结束日期"
                             style="width: 100%;"/>
            </a-form-item>
          </a-col>

        <template v-if="toggleSearchStatus">


          <a-col :md="6" :sm="8">
            <a-form-item label="班子成员姓名">
              <j-dict-select-tag
                v-model="queryParam.bzcymc"
                placeholder="请选择班子成员姓名"
                dictCode="HR_BAS_STAFF,ygxm,yggh"
                :showSearch="true"
                treeNodeFilterProp="title"
              />
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <a-form-item label="所属支行">
              <j-tree-select placeholder="请选择所属支行查询"
                             pid-field="sjzzbz"
                             showSearch="true"
                             treeNodeFilterProp="title"
                             v-model="queryParam.jgdm"
                             :sszh="true"
                             dict="hr_bas_organization, zzjc, zzbz"
                             :tree-default-expand-all="true"/>
            </a-form-item>
          </a-col>
          <!--<a-col :md="6" :sm="8">
            <a-form-item label="所属支行">
              <j-dict-select-tag
                v-model="queryParam.jgdm"
                placeholder="请选择支行查询"
                dictCode="v_hr_organization,zzjc,zzbz"
                :showSearch="true"
                treeNodeFilterProp="title"
              />
            </a-form-item>
          </a-col>-->

          <a-col :md="6" :sm="8">
            <a-form-item label="行政村（居委会）">
              <j-dict-select-tag
                v-model="queryParam.xzc"
                placeholder="请选择行政村查询"
                dictCode="v_yxdygl_czxxgl,VILLAGE,VILLAGE"
                :showSearch="true"
                treeNodeFilterProp="title"
              />
            </a-form-item>
          </a-col>

         <!-- <a-col :md="6" :sm="8">
            <a-form-item label="行政村（居委会）">
              <j-input placeholder="请输入行政村名称" v-model="queryParam.xzc" type="like" ></j-input>
            </a-form-item>
          </a-col>-->

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
      <a-button type="primary" icon="area-chart"  @click="initData">提取</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('示范点评级授信完成情况明细表')">导出</a-button>
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
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        :scroll="{ x: 1800 }"
        @change="handleTableChange">

         <span slot="sjzfhs" slot-scope="sjzfhs ,record" >
          <a @click="handlesjzfhsmxEdit(record,'实际走访户数','fjsl','sjzfhs')">{{sjzfhs}}</a>
        </span>
        <span slot="sjpjhs" slot-scope="sjpjhs ,record" >
          <a @click="handlesjzfhsmxEdit(record,'实际评级户数','xtcspddj','sjpjhs')">{{sjpjhs}}</a>
        </span>
        <span slot="sjsxhs" slot-scope="sjsxhs ,record" >
          <a @click="handlesjzfhsmxEdit(record,'实际授信户数','nhzzsxed','sjsxhs')">{{sjsxhs}}</a>
        </span>
        <span slot="yxhs" slot-scope="yxhs ,record" >
          <a @click="handlesjzfhsmxEdit(record,'用信户数','yxje','yxhs')">{{yxhs}}</a>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <tjfxSfdpjsxwcqkmxb-modal ref="modalForm" @ok="modalFormOk"></tjfxSfdpjsxwcqkmxb-modal>
    <zhpjsx-sjzfhshs-modal ref="ZhpjsxSjzfhshsModal" @ok="modalFormOk"></zhpjsx-sjzfhshs-modal>

  </a-card>
</template>

<script>
  import TjfxSfdpjsxwcqkmxbModal from './modules/TjfxSfdpjsxwcqkmxbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { getAction,putAction,httpAction,downFile } from '@/api/manage'
  import { filterObj } from '@/utils/util';
  import JInput from "../../../../components/jeecg/JInput.vue";
  import ZhpjsxSjzfhshsModal from '@/views/tjfx/xdgtzytjbb/tjfxzhpjsxwcqkmxb/modules/ZhpjsxSjzfhshsModal'

  export default {
    name: "TjfxSfdpjsxwcqkmxbList",
    mixins:[JeecgListMixin],
    components: {
      TjfxSfdpjsxwcqkmxbModal,JTreeSelect,JInput,ZhpjsxSjzfhshsModal
    },
    data () {
      return {
        description: '示范点评级授信完成情况明细表管理页面',
        // 表头
        columns: [
          {
            title: '开始日期',
            align:"center",
            dataIndex: 'ksrq'
          },
          {
            title: '结束日期',
            align:"center",
            dataIndex: 'jsrq'
          },

		   {
            title: '班子成员名称',
            align:"center",
            dataIndex: 'bzcymc_dictText'
           },
          {
            title: '所属支行代码',
            align:"center",
            dataIndex: 'jgdm'
          },
          {
            title: '所属支行名称',
            align:"center",
            dataIndex: 'jgdm_dictText'
          },
          {
            title: '行政村（居委会）',
            align:"center",
            dataIndex: 'xzc'
          },

          {
            title:'走访/信息采集率',
            children:[
              {
                title: '实际走访数',
                align:"center",
                dataIndex: 'sjzfhs',
                scopedSlots:{customRender:'sjzfhs'}
              },
              {
                title: '全村（社区）户数',
                align:"center",
                dataIndex: 'chs'
              },
              {
                title: '采集率',
                align:"center",
                dataIndex: 'cjl'
              },
            ]
          },
          {
            title:'评级率',
            children:[
              {
                title: '实际评级户数',
                align:"center",
                dataIndex: 'sjpjhs',
                scopedSlots:{customRender:'sjpjhs'}
              },
              {
                title: '全村（社区）户数',
                align:"center",
                dataIndex: 'chs'
              },
              {
                title: '评级率',
                align:"center",
                dataIndex: 'pjl'
              },
            ]
          },

          {
            title:'授信率',
            children:[
              {
                title: '实际授信户数',
                align:"center",
                dataIndex: 'sjsxhs',
                scopedSlots:{customRender:'sjsxhs'}
              },
              {
                title: '全村（社区）户数',
                align:"center",
                dataIndex: 'chs'
              },
              {
                title: '授信率',
                align:"center",
                dataIndex: 'sxl'
              },
            ]
          },

          {
            title:'用信率',
            children:[
              {
                title: '用信户数',
                align:"center",
                dataIndex: 'yxhs',
                scopedSlots:{customRender:'yxhs'}
              },
              {
                title: '全村（社区）户数',
                align:"center",
                dataIndex: 'chs'
              },
              {
                title: '用信率',
                align:"center",
                dataIndex: 'yxl'
              },
            ]
          },

        ],
		url: {
          list: "/tjfx.xdgtzytjbb.tjfxsfdpjsxwcqkmxb/tjfxSfdpjsxwcqkmxb/list",
          delete: "/tjfx.xdgtzytjbb.tjfxsfdpjsxwcqkmxb/tjfxSfdpjsxwcqkmxb/delete",
          deleteBatch: "/tjfx.xdgtzytjbb.tjfxsfdpjsxwcqkmxb/tjfxSfdpjsxwcqkmxb/deleteBatch",
          exportXlsUrl: "tjfx.xdgtzytjbb.tjfxsfdpjsxwcqkmxb/tjfxSfdpjsxwcqkmxb/exportTemplateXls",
          importExcelUrl: "tjfx.xdgtzytjbb.tjfxsfdpjsxwcqkmxb/tjfxSfdpjsxwcqkmxb/importExcel",
          init:"/tjfx.xdgtzytjbb.tjfxsfdpjsxwcqkmxb/tjfxSfdpjsxwcqkmxb/extract",
    },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {

      /**
       * 实际走访户数明细表
       * @param record
       */
      handlesjzfhsmxEdit: function(record,title,zdmc,gnmc) {
        this.$refs.ZhpjsxSjzfhshsModal.edit(record,'sfdpjsx',zdmc,gnmc);
        this.$refs.ZhpjsxSjzfhshsModal.title = title;
        this.$refs.ZhpjsxSjzfhshsModal.disableSubmit = true;},

      initData() {
        var params = this.queryParam;
        if( params.ksrq==null || params.jsrq==null || params.ksrq=='undefined'){
          this.$message.error("开始日期或者接受日期不能为空!")
          return
        }
        let ksrqstr=params.ksrq.format("YYYYMMDD");
        let jsrqstr=params.jsrq.format("YYYYMMDD");
        //let formData = Object.assign(ksrqstr, jsrqstr);
        this.loading = true;
        putAction(this.url.init, {"ksrq":ksrqstr,"jsrq":jsrqstr},'put').then((res) => {
          if(res.success){
            this.loadData();
            this.$message.success(res.message);
          }else{
            this.$message.warning(res.message,5);
          }
          this.loading = false;
        })
      },

      handleExportXls(fileName){
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        let param = {...this.queryParam};
        if(this.selectedRowKeys && this.selectedRowKeys.length>0){
          param['selections'] = this.selectedRowKeys.join(",")
        }
        if (param.ksrq != null ){
          param.ksrq=param.ksrq.format("YYYY-MM-DD")
        }
        if (param.jsrq != null){
          param.jsrq=param.jsrq.format("YYYY-MM-DD")
        }
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

      getQueryParams(){
        let tjrqment = "";
        let jsrq = " ";
        if(this.queryParam.ksrq != null) {
          tjrqment = this.queryParam.ksrq.format("YYYY-MM-DD");
        }
        if (this.queryParam.jsrq !=null){
          jsrq     = this.queryParam.jsrq.format("YYYY-MM-DD");
        }
        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        param.ksrq     = tjrqment;
        param.jsrq     = jsrq;
        return filterObj(param);
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>