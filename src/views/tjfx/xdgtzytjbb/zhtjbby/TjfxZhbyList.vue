<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="开始日期">
              <a-date-picker v-model="queryParam.ksrq" placeholder="请选择开始日期" style="width: 100%;"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="结束日期">
              <a-date-picker v-model="queryParam.jsrq" placeholder="请选择结束日期" style="width: 100%;"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="所属支行">
              <j-tree-select
                v-model="queryParam.jgdm"
                placeholder="请选择支行查询"
                dict="hr_bas_organization,zzjc,zzbz"
                pidField="sjzzbz"
                :sszh="true"
                :showSearch="true"
                :treeDefaultExpandAll=true
                treeNodeFilterProp="title"
              >
              </j-tree-select>
            </a-form-item>
          </a-col>

          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8"><a-form-item></a-form-item></a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="责任人工号">
                <a-input placeholder="请输入责任人工号" v-model="queryParam.zrre"></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="责任人姓名">
                <j-dict-select-tag
                  v-model="queryParam.zrre"
                  placeholder="请选择责任人姓名"
                  dictCode="HR_BAS_STAFF,ygxm,yggh"
                  :showSearch="true"
                  treeNodeFilterProp="title"
                />
              </a-form-item>
            </a-col>
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
      <a-button type="primary" icon="download" @click="handleExportXls('支行统计报表一')">导出</a-button>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }} </a>项
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
        :scroll="{ x: 3000 }"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

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
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <tjfxZhby-modal ref="modalForm" @ok="modalFormOk"></tjfxZhby-modal>
    <zhby-bzzzpjsxwcgs-modal ref="bzzzpjsxmodalForm" @ok="modalFormOk"></zhby-bzzzpjsxwcgs-modal>
    <zhby-xnnhhs-modal ref="xnnhhsmodalForm" @ok="modalFormOk"></zhby-xnnhhs-modal>
    <zhby-zfjdhsmx-modal ref="ZhbyZfjdhsmxModal"></zhby-zfjdhsmx-modal>
    <zhby-pjsxjdmx-modal ref="ZhbyPjsxjdmxModal"> </zhby-pjsxjdmx-modal>
    <zhby-pjsxjdyxjemx-modal ref="ZhbyPjsxjdyxjemxModal"></zhby-pjsxjdyxjemx-modal>
  </a-card>
</template>

<script>
  import TjfxZhbyModal from './modules/TjfxZhbyModal'
  import ZhbyBzzzpjsxwcgsModal from './modules/ZhbyBzzzpjsxwcgsModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { getAction,putAction,httpAction,downFile } from '@/api/manage'
  import { filterObj } from '@/utils/util';
  import JInput from "../../../../components/jeecg/JInput.vue";
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import ZhbyXnnhhsModal from './modules/ZhbyXnnhhsModal'
  import ZhbyZfjdhsmxModal from './modules/ZhbyZfjdhsmxModal'
  import ZhbyPjsxjdmxModal from './modules/ZhbyPjsxjdmxModal'
  import ZhbyPjsxjdyxjemxModal  from './modules/ZhbyPjsxjdyxjemxModal'

  export default {
    name: "TjfxZhbyList",
    mixins:[JeecgListMixin],
    components: {
      ZhbyZfjdhsmxModal,ZhbyPjsxjdmxModal,ZhbyPjsxjdyxjemxModal,
      TjfxZhbyModal,JInput,JTreeSelect,ZhbyBzzzpjsxwcgsModal,ZhbyXnnhhsModal,
    },
    data () {
      return {
        description: '支行统计表一管理页面',
        isorter: {
          columns: 'jsrq',
          order: 'desc',
        },
        // 表头
        columns: [
          {
            title: '开始日期',
            dataIndex: 'ksrq',
            key: 'ksrq',
            align: "center",
            sorter: (a, b) => b.ksrq.replace(/-/g, '/') - a.ksrq.replace(/-/g, '/'),
          },
          {
            title: '结束日期',
            align: "center",
            key: 'jsrq',
            dataIndex: 'jsrq',
            sorter: (a, b) => b.jsrq.replace(/-/g, '/') - a.jsrq.replace(/-/g, '/'),
          },
          {
            title: '所属支行代码',
            align: "center",
            key: 'jgdm',
            dataIndex: 'jgdm',
            sorter: (a, b) => b.jgdm - a.jgdm,
          },
          {
            title: '所属支行名称',
            align: "center",
            dataIndex: 'jgdm_dictText'
          },
          {
            title: '责任人',
            align: "center",
            key: 'zrre',
            dataIndex: 'zrre_dictText'
          },
          {
            title: '行政村（居委会）',
            align: "center",
            key: 'xzc',
            dataIndex: 'xzc'
          },
          // {
          //   title: '组',
          //   align: "center",
          //   dataIndex: 'zxx_dictText'
          // },
          {
            title: '村民小组个数',
            align: "center",
            key: 'cmxzgs',
            dataIndex: 'cmxzgs',
            sorter: (a, b) => b.cmxzgs - a.cmxzgs,
            scopedSlots:{customRender:'cmxzgs'}
          },
          {
            title: '辖内农户户数',
            align: "center",
            key: 'xnnhhs',
            dataIndex: 'xnnhhs',
            scopedSlots:{customRender:'nhhs'},
            sorter: (a, b) => b.xnnhhs - a.xnnhhs,
          },
          {
            title: '辖内商户户数',
            align: "center",
            key:'xnshhs',
            dataIndex: 'xnshhs',
            scopedSlots:{customRender:'shhs'},
            sorter: (a, b) => b.xnshhs - a.xnshhs,
          },
          {
            title: '辖内企业户数',
            align: "center",
            dataIndex: 'xnqyhs',
            key:'xnqyhs',
            scopedSlots:{customRender:'qyhs'},
            sorter: (a, b) => b.xnqyhs - a.xnqyhs,
          },
          {
            title: '走访进度',
            children: [
              {
                title: '农户户数',
                children:[
                  {
                    title: '本周',
                    align: "center",
                    dataIndex: 'bznhhs',
                    scopedSlots:{customRender:'bzzfnhhs'}
                  },
                  {
                    title: '累计',
                    align: "center",
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
                    align: "center",
                    dataIndex: 'bzshhs',
                    scopedSlots:{customRender:'bzzfshhs'}
                  },
                  {
                    title: '累计',
                    align: "center",
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
                    align: "center",
                    dataIndex: 'bzqyhs',
                    scopedSlots:{customRender:'bzzfqyhs'}
                  },
                  {
                    title: '累计',
                    align: "center",
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
                    align: "center",
                    dataIndex: 'bzhjhs'
                  },
                  {
                    title: '累计',
                    align: "center",
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
                    align: "center",
                    dataIndex: 'bzcjxx',
                    scopedSlots:{customRender:'bzcjxx'}
                  },
                  {
                    title: '累计',
                    align: "center",
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
                    align: "center",
                    dataIndex: 'bzpjhs',
                    scopedSlots:{customRender:'bzpjhs'}
                  },
                  {
                    title: '累计',
                    align: "center",
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
                    align: "center",
                    dataIndex: 'bzsxje',
                    scopedSlots:{customRender:'bzsxje'}
                  },
                  {
                    title: '累计',
                    align: "center",
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
                    align: "center",
                    dataIndex: 'bzyxje',
                    scopedSlots:{customRender:'bzyxje'}
                  },
                  {
                    title: '累计',
                    align: "center",
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
                    align: "center",
                    dataIndex: 'bzzzpjsxwcgs',
                    scopedSlots:{customRender:'detail'}
                  },
                  {
                    title: '累计',
                    align: "center",
                    dataIndex: 'ljzzpjsxwcgs',
                    scopedSlots:{customRender:'detailljzzpj'}
                  },
                ]
              },
            ]
          },
        ],
        url: {
          list: "/tjfx.xdgtzytjbb.zhtjbby/tjfxZhby/list",
          delete: "/tjfx.xdgtzytjbb.zhtjbby/tjfxZhby/delete",
          deleteBatch: "/tjfx.xdgtzytjbb.zhtjbby/tjfxZhby/deleteBatch",
          exportXlsUrl: "tjfx.xdgtzytjbb.zhtjbby/tjfxZhby/exportTemplateXls",
          importExcelUrl: "tjfx.xdgtzytjbb.zhtjbby/tjfxZhby/importExcel",
          init:"/tjfx.xdgtzytjbb.zhtjbby/tjfxZhby/extract"

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
        this.$refs.bzzzpjsxmodalForm.disableSubmit = true;
      },
      /**
       * 辖内农户户数
       * @param record
       */
      handlexnnhhsEdit: function(record,khlx,title) {
        this.$refs.xnnhhsmodalForm.edit(record,khlx);
        this.$refs.xnnhhsmodalForm.title = title;
        this.$refs.xnnhhsmodalForm.disableSubmit = true;
      },
      /**
       * 走访进度进度明细
       * @param record
       */
      handlezfjdhsmxEdit: function(record,khlx,title,sjlx) {
        this.$refs.ZhbyZfjdhsmxModal.edit(record,khlx,sjlx);
        this.$refs.ZhbyZfjdhsmxModal.title = title;
        this.$refs.ZhbyZfjdhsmxModal.disableSubmit = true;
      },
      /**
       * 评级授信进度明细
       * @param record
       */
      handlepjsxjdmxEdit: function(record,title,sjlx) {
        this.$refs.ZhbyPjsxjdmxModal.edit(record,sjlx);
        this.$refs.ZhbyPjsxjdmxModal.title = title;
        this.$refs.ZhbyPjsxjdmxModal.disableSubmit = true;
      },
      /**
       * 评级授信进度用信金额明细
       * @param record
       */
      handlepjsxjdyxjemxEdit: function(record,title,sjlx) {
        this.$refs.ZhbyPjsxjdyxjemxModal.edit(record,sjlx);
        this.$refs.ZhbyPjsxjdyxjemxModal.title = title;
        this.$refs.ZhbyPjsxjdyxjemxModal.disableSubmit = true;
      },
      initData() {
        var params = this.queryParam;
        if( params.ksrq==null || params.jsrq==null || params.ksrq=='undefined'){
          this.$message.error("开始日期或者接受日期不能为空!")
          return
        }
        let ksrqstr=params.ksrq.format("YYYYMMDD");
        let jsrqstr=params.jsrq.format("YYYYMMDD");
        //let formData = Object.assign(ksrqstr, jsrqstr);
        let jgdmstr = params.jgdm;
        this.loading = true;
        putAction(this.url.init, {"ksrq":ksrqstr,"jsrq":jsrqstr,"jgdm":jgdmstr},'put').then((res) => {
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