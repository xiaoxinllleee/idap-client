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
              <a-form-item label="挂片领导姓名">
                <j-dict-select-tag
                  v-model="queryParam.gpld"
                  placeholder="请选择挂片领导姓名"
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
      <a-button type="primary" icon="area-chart" @click="initData">提取</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('农商行表一')">导出</a-button>
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
        :scroll="{ x: 3500 }"
        @change="handleTableChange">

        <!-- <span slot="cmxzgs" slot-scope="cmxzgs ,record" >
          <a @click="handleDetail(record)">{{cmxzgs}}</a>
        </span>-->
        <span slot="nhhs" slot-scope="xnnhhs ,record" >
          <a @click="handlexnnhhsEdit(record,1,'辖内农户户数')">{{xnnhhs}}</a>
        </span>
        <span slot="shhs" slot-scope="xnshhs ,record" >
          <a @click="handlexnnhhsEdit(record,2,'辖内商户户数')">{{xnshhs}}</a>
        </span>
        <span slot="qyhs" slot-scope="xnqyhs ,record" >
          <a @click="handlexnnhhsEdit(record,3,'辖内企业户数')">{{xnqyhs}}</a>
        </span>
        <span slot="bzzfnhhs" slot-scope="bznhhs ,record" >
          <a @click="handlezfjdhsmxEdit(record,1,'本周走访农户户数','bz')">{{bznhhs}}</a>
        </span>
        <span slot="ljzfnhhs" slot-scope="ljnhhs ,record" >
          <a @click="handlezfjdhsmxEdit(record,1,'累计走访农户户数','lj')">{{ljnhhs}}</a>
        </span>
        <span slot="bzzfshhs" slot-scope="bzshhs ,record" >
          <a @click="handlezfjdhsmxEdit(record,2,'本周走访商户户数','bz')">{{bzshhs}}</a>
        </span>
        <span slot="ljzfshhs" slot-scope="ljshhs ,record" >
          <a @click="handlezfjdhsmxEdit(record,2,'累计走访商户户数','lj')">{{ljshhs}}</a>
        </span>
        <span slot="bzzfqyhs" slot-scope="bzqyhs ,record" >
          <a @click="handlezfjdhsmxEdit(record,3,'本周走访企业户数','bz')">{{bzqyhs}}</a>
        </span>
        <span slot="ljzfqyhs" slot-scope="ljqyhs ,record" >
          <a @click="handlezfjdhsmxEdit(record,3,'累计走访企业户数','lj')">{{ljqyhs}}</a>
        </span>


        <!-- <span slot="bzcjxx" slot-scope="bzcjxx ,record" >
           <a @click="handleDetail(record)">{{bzcjxx}}</a>
         </span>
         <span slot="ljcjxx" slot-scope="ljcjxx ,record" >
           <a @click="handleDetail(record)">{{ljcjxx}}</a>
         </span>-->

        <span slot="bzpjhs" slot-scope="bzpjhs ,record" >
          <a @click="handlepjsxjdmxEdit(record,'本周评级户数明细','bz')">{{bzpjhs}}</a>
        </span>
        <span slot="ljpjhs" slot-scope="ljpjhs ,record" >
          <a @click="handlepjsxjdmxEdit(record,'累计评级户数','lj')">{{ljpjhs}}</a>
        </span>

        <span slot="bzsxje" slot-scope="bzsxje ,record" >
          <a @click="handlepjsxjdmxEdit(record,'本周授信金额','bz')">{{bzsxje}}</a>
        </span>
        <span slot="ljsxje" slot-scope="ljsxje ,record" >
          <a @click="handlepjsxjdmxEdit(record,'累计授信金额','lj')">{{ljsxje}}</a>
        </span>

        <span slot="bzyxje" slot-scope="bzyxje ,record" >
          <a @click="handlepjsxjdyxjemxEdit(record,'本周用信金额','bz')">{{bzyxje}}</a>
        </span>
        <span slot="ljyxje" slot-scope="ljyxje ,record" >
          <a @click="handlepjsxjdyxjemxEdit(record,'累计用信金额','lj')">{{ljyxje}}</a>
        </span>


        <!-- <span slot="detail" slot-scope="bzzzpjsxwcgs ,record" >
           <a @click="handlebzzzpjsxwcgsEdit(record)">{{bzzzpjsxwcgs}}</a>
         </span>

         <span slot="detailljzzpj" slot-scope="ljzzpjsxwcgs ,record" >
           <a @click="handleDetail(record)">{{ljzzpjsxwcgs}}</a>
         </span>
 -->

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <tjfxNshby-modal ref="modalForm" @ok="modalFormOk"></tjfxNshby-modal>
    <nshby-bzzzpjsxwcgs-modal ref="bzzzpjsxmodalForm" @ok="modalFormOk"></nshby-bzzzpjsxwcgs-modal>
    <nshby-xnnhhs-modal ref="xnnhhsmodalForm" @ok="modalFormOk"></nshby-xnnhhs-modal>
    <nshby-zfjdhsmx-modal ref="NshbyZfjdhsmxModal"></nshby-zfjdhsmx-modal>
    <nshby-pjsxjdmx-modal ref="ZhbyPjsxjdmxModal"> </nshby-pjsxjdmx-modal>
    <nshby-pjsxjdyxjemx-modal ref="ZhbyPjsxjdyxjemxModal"></nshby-pjsxjdyxjemx-modal>
  </a-card>
</template>

<script>
  import TjfxNshbyModal from './modules/TjfxNshbyModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { getAction,putAction,httpAction,downFile } from '@/api/manage'
  import { filterObj } from '@/utils/util';
  import NshbyBzzzpjsxwcgsModal from './modules/NshbyBzzzpjsxwcgsModal'
  import NshbyXnnhhsModal from './modules/NshbyXnnhhsModal'
  import NshbyZfjdhsmxModal from './modules/NshbyZfjdhsmxModal'
  import NshbyPjsxjdmxModal from './modules/NshbyPjsxjdmxModal'
  import NshbyPjsxjdyxjemxModal  from './modules/NshbyPjsxjdyxjemxModal'


  export default {
    name: "TjfxNshbyList",
    mixins:[JeecgListMixin],
    components: {
      TjfxNshbyModal,JTreeSelect,
      NshbyBzzzpjsxwcgsModal,
      NshbyXnnhhsModal,NshbyZfjdhsmxModal,NshbyPjsxjdmxModal,NshbyPjsxjdyxjemxModal
    },
    data () {
      return {
        description: '农商行统计表一管理页面',
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
            title: '挂片领导',
            align:"center",
            dataIndex: 'gpld_dictText'
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
            title: '行政村个数',
            align:"center",
            dataIndex: 'xzcgs'
           },

		   {
            title: '村民小组个数',
            align:"center",
            dataIndex: 'cmxzgs'
           },
		   {
            title: '辖内农户户数',
            align:"center",
            dataIndex: 'xnnhhs',
            scopedSlots:{customRender:'nhhs'}

       },
		   {
            title: '辖内商户户数',
            align:"center",
            dataIndex: 'xnshhs',
            scopedSlots:{customRender:'shhs'}
           },
		   {
            title: '辖内企业户数',
            align:"center",
            dataIndex: 'xnqyhs',
            scopedSlots:{customRender:'qyhs'}
           },

          {
            title: '走访进度',
            children: [
              {
                title: '农户户数',
                children:[
                  {
                    title: '本周',
                    align:"center",
                    dataIndex: 'bznhhs',
                    scopedSlots:{customRender:'bzzfnhhs'}
                  },
                  {
                    title: '累计',
                    align:"center",
                    dataIndex: 'ljnhhs',
                    scopedSlots:{customRender:'ljzfnhhs'}
                  },
                ]
              },
              {
                title:'商户户数',
                children:[
                  {
                    title: '本周',
                    align:"center",
                    dataIndex: 'bzshhs',
                    scopedSlots:{customRender:'bzzfshhs'}
                  },
                  {
                    title: '累计',
                    align:"center",
                    dataIndex: 'ljshhs',
                    scopedSlots:{customRender:'ljzfshhs'}
                  },
                ]
              },
              {
                title:'企业户数',
                children:[
                  {
                    title: '本周',
                    align:"center",
                    dataIndex: 'bzqyhs',
                    scopedSlots:{customRender:'bzzfqyhs'}
                  },
                  {
                    title: '累计',
                    align:"center",
                    dataIndex: 'ljqyhs',
                    scopedSlots:{customRender:'ljzfqyhs'}
                  },
                ]
              },
              {
                title:'合计',
                children:[
                  {
                    title: '本周',
                    align:"center",
                    dataIndex: 'bzhjhs'
                  },
                  {
                    title: '累计',
                    align:"center",
                    dataIndex: 'ljhjhs',
                    sorter: (a, b) => a.ljhjhs - b.ljhjhs,

                  },

                ]
              },
            ],
          },

          {
            title:'评级授信进度',
            children:[
              {
                title: '采集信息',
                children:[
                  {
                    title: '本周',
                    align:"center",
                    dataIndex: 'bzcjxx',
                    scopedSlots:{customRender:'bzcjxx'}
                  },
                  {
                    title: '累计',
                    align:"center",
                    dataIndex: 'ljcjxx',
                    scopedSlots:{customRender:'ljcjxx'}
                  },
                ]
              },
              {
                title: '评级户数',
                children:[
                  {
                    title: '本周',
                    align:"center",
                    dataIndex: 'bzpjhs',
                    scopedSlots:{customRender:'bzpjhs'}
                  },
                  {
                    title: '累计',
                    align:"center",
                    dataIndex: 'ljpjhs',
                    scopedSlots:{customRender:'ljpjhs'}
                  },
                ]
              },
              {
                title: '授信金额',
                children:[
                  {
                    title: '本周',
                    align:"center",
                    dataIndex: 'bzsxje',
                    scopedSlots:{customRender:'bzsxje'}
                  },
                  {
                    title: '累计',
                    align:"center",
                    dataIndex: 'ljsxje',
                    scopedSlots:{customRender:'ljsxje'}
                  },
                ]
              },
              {
                title: '用信金额',
                children:[
                  {
                    title: '本周',
                    align:"center",
                    dataIndex: 'bzyxje',
                    scopedSlots:{customRender:'bzyxje'}
                  },
                  {
                    title: '累计',
                    align:"center",
                    dataIndex: 'ljyxje',
                    scopedSlots:{customRender:'ljyxje'}
                  },
                ]
              },
              {
                title: '整组评级授信完成个数',
                children:[
                  {
                    title: '本周',
                    align:"center",
                    dataIndex: 'bzzzpjsxwcgs',
                    scopedSlots:{customRender:'detail'}
                  },
                  {
                    title: '累计',
                    align:"center",
                    dataIndex: 'ljzzpjsxwcgs',
                    scopedSlots:{customRender:'detailljzzpj'}

                  },
                ]
              },
              {
                title: '整村评级授信完成个数',
                children:[
                  {
                    title: '本周',
                    align:"center",
                    dataIndex: 'bzzcpjsxwcgs'
                  },
                  {
                    title: '累计',
                    align:"center",
                    dataIndex: 'ljzcpjsxwcgs'
                  },
                ]
              },
            ]
          },
        ],
		url: {
          list: "/tjfx.xdgtzytjbb.nshby/tjfxNshby/list",
          delete: "/tjfx.xdgtzytjbb.nshby/tjfxNshby/delete",
          deleteBatch: "/tjfx.xdgtzytjbb.nshby/tjfxNshby/deleteBatch",
          exportXlsUrl: "tjfx.xdgtzytjbb.nshby/tjfxNshby/exportTemplateXls",
          importExcelUrl: "tjfx.xdgtzytjbb.nshby/tjfxNshby/importExcel",
          init:"/tjfx.xdgtzytjbb.nshby/tjfxNshby/extract"
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
       * 本周整组评级授信完成个数
       * @param record
       */
      handlebzzzpjsxwcgsEdit: function(record) {
        this.$refs.bzzzpjsxmodalForm.edit(record);
        this.$refs.bzzzpjsxmodalForm.title = "本周整组评级授信完成个数明细";
        this.$refs.bzzzpjsxmodalForm.disableSubmit = true;},

      /**
       * 辖内农户户数
       * @param record
       */
      handlexnnhhsEdit: function(record,khlx,title) {
        this.$refs.xnnhhsmodalForm.edit(record,khlx);
        this.$refs.xnnhhsmodalForm.title = title;
        this.$refs.xnnhhsmodalForm.disableSubmit = true;},

      /**
       * 走访进度进度明细
       * @param record
       */
      handlezfjdhsmxEdit: function(record,khlx,title,sjlx) {
        this.$refs.NshbyZfjdhsmxModal.edit(record,khlx,sjlx);
        this.$refs.NshbyZfjdhsmxModal.title = title;
        this.$refs.NshbyZfjdhsmxModal.disableSubmit = true;},


      /**
       * 评级授信进度明细
       * @param record
       */
      handlepjsxjdmxEdit: function(record,title,sjlx) {
        this.$refs.ZhbyPjsxjdmxModal.edit(record,sjlx);
        this.$refs.ZhbyPjsxjdmxModal.title = title;
        this.$refs.ZhbyPjsxjdmxModal.disableSubmit = true;},


      /**
       * 评级授信进度用信金额明细
       * @param record
       */
      handlepjsxjdyxjemxEdit: function(record,title,sjlx) {
        this.$refs.ZhbyPjsxjdyxjemxModal.edit(record,sjlx);
        this.$refs.ZhbyPjsxjdyxjemxModal.title = title;
        this.$refs.ZhbyPjsxjdyxjemxModal.disableSubmit = true;},

      initData() {
        var params = this.queryParam;
        if( params.ksrq==null || params.jsrq==null || params.ksrq=='undefined'){
          this.$message.error("开始日期或者接受日期不能为空!")
          return
        }

        let ksrqstr=params.ksrq.format("YYYYMMDD");
        let jsrqstr=params.jsrq.format("YYYYMMDD");
        this.loading = true;
        //let formData = Object.assign(ksrqstr, jsrqstr);

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