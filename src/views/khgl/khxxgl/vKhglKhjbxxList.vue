<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8"><a-form-item label="所属支行">
            <j-tree-select placeholder="请选择所属支行" v-model="queryParam.sszh"
                           dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                           :sszh="true" :showSearch="false" :treeDefaultExpandAll="true" :filterTreeNode="true" :isAll="isAll"/>
          </a-form-item></a-col>

         <!-- <a-col :md="6" :sm="8"><a-form-item label="所属客户经理">
            <j-input placeholder="请输入客户经理名称" v-model="queryParam.sskhjl"/>
          </a-form-item></a-col>-->

          <a-col :xl="6" :lg="7" :md="8" :sm="24"><a-form-item label="所属乡镇">
            <j-dict-select-tag placeholder="请选择所属乡镇" v-model="queryParam.ssxz" dict-code="YXDYGL_YJYXDYGL,DYMC,DYBH"
                               :showSearch="true" @change="getyjyxdybh" :triggerChange="true" treeNodeFilterProp="title"/>
          </a-form-item></a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24" ><a-form-item label="行政村">
            <j-dict-select-tag placeholder="请选择行政村" v-model="this.ejyxdybhdate" :dict-code="this.ejyxdybh"
                               :showSearch="true" :disabled=this.sfjsejyxdy  @change="getejyxdybh" :triggerChange="true" treeNodeFilterProp="title"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="户号编码">
            <a-input placeholder="请输入户号编码" v-model="queryParam.hhbm"/>
          </a-form-item></a-col>

          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8"><a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="客户名称">
              <j-input placeholder="请输入客户名称" v-model="queryParam.khmc" type="likemore"/>
            </a-form-item></a-col>

            <a-col :md="6" :sm="8">
              <a-form-item label="是否已采集">
                <j-dict-select-tag placeholder="请选择是否已采集" v-model="queryParam.sfcj" dict-code="sfbz"/>
              </a-form-item>
            </a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
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
      <a-button type="primary" icon="download" @click="handleExportXls('客户信息管理')">导出</a-button>
      <a-button type="primary" icon="download" @click="batchExport('客户信息管理')">批量导出模板</a-button>
      <!--<a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>-->
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
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        :scroll="{ x: 2000 }"
        @change="handleTableChange">


        <span slot="sszh" slot-scope="text"><j-ellipsis :value="text" :length="8"/></span>
        <span slot="ssyxdy" slot-scope="text"><j-ellipsis :value="text" :length="8"/></span>
        <span slot="sscmc" slot-scope="text"><j-ellipsis :value="text" :length="8"/></span>
        <span slot="zjhm" slot-scope="text"><j-ellipsis :value="text" :length="10"/></span>
        <span slot="hjdz" slot-scope="text"><j-ellipsis :value="text" :length="6"/></span>
        <span slot="bz" slot-scope="text"><j-ellipsis :value="text" :length="10"/></span>
        <span slot="yhzgx" slot-scope="text"><j-ellipsis :value="text" :length="8"/></span>
        <span slot="dz" slot-scope="text"><j-ellipsis :value="text" :length="8"/></span>

        <span slot="action" slot-scope="text, record">
         <!-- <a @click="handleEdit(record)">编辑</a>

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
          </a-dropdown>-->

          <a href="javascript:;" @click="handlePrint('客户信息管理',record)">导出模板</a>

        </span>

        <span slot="detail" slot-scope="khmc,record">
          <a @click="handleKhxxEdit(record)">{{khmc}}</a>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <vKhglKhjbxx-modal ref="modalForm" @ok="modalFormOk"></vKhglKhjbxx-modal>
    <v-khgl-khjb-xq-modal ref="xqModalForm" />

  </a-card>
</template>

<script>
  import vKhglKhjbXqModal from './modules/vKhglKhjbXqModal'
  import vKhglKhjbxxModal from './modules/vKhglKhjbxxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JInput from '@/components/jeecg/JInput'
  import { mapGetters } from 'vuex'
  import store from '@/store/'
  import JEllipsis from '@/components/jeecg/JEllipsis'
  import { getAction,putAction,httpAction,downFile } from '@/api/manage'
  import { filterObj } from '@/utils/util'


  export default {
    name: "vKhglKhjbxxList",
    mixins:[JeecgListMixin],
    components: {
      vKhglKhjbxxModal,JTreeSelect,JInput,JEllipsis,vKhglKhjbXqModal
    },
    data () {
      return {
        description: '客户信息管理管理页面',
        ejyxdybhdate:'',
        sfjsejyxdy: true,
        ejyxdybh: "YXDYGL_EJYXDYGL,DYMC,DYBH",
        // 表头
        columns: [
          {
            title: '所属支行',
            align: "center",
            dataIndex: 'sszh_dictText',
            width: 150
          },
          {
            title: '所属区域',
            align: "center",
            dataIndex: 'ssyxdy_dictText',
            scopedSlots: { customRender: 'ssyxdy' },
            width: 150,
          },
          {
            title: '所属乡镇',
            align:"center",
            dataIndex: 'ssxz_dictText',
            width: 150,
          },
          {
            title: '行政村',
            align:"center",
            dataIndex: 'xzc_dictText',
            width: 150,
          },
          {
            title: '户号编码',
            align:"center",
            dataIndex: 'hhbm',
            sorter: true,
            width: 150
          },
          {
            title: '与户主关系',
            align: "center",
            dataIndex: 'yhzgx_dictText',
            scopedSlots: { customRender: 'yhzgx' },
            width: 150,
          },
          {
            title: '是否户主',
            align: "center",
            dataIndex: 'sfhz_dictText',
            width: 80,
          },
          {
            title: '客户名称',
            align:"center",
            dataIndex: 'khmc',
            scopedSlots: { customRender: 'detail' },
            width: 100
          },
          {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm',
            width: 160
          },
          {
            title: '年龄',
            align:"center",
            dataIndex: 'nl',
            sorter: true,
            width: 80
          },
          {
            title: '性别',
            align:"center",
            dataIndex: 'xb_dictText',
            width: 80
          },
          {
            title: '地址',
            align:"center",
            dataIndex: 'dz',
            scopedSlots: { customRender: 'dz' },
            width: 150
          },
          {
            title: '是否采集',
            align:"center",
            dataIndex: 'sfcj_dictText',
            width: 80
          },
          {
            title: '采集时间',
            align:"center",
            dataIndex: 'cjsj',
            width: 100
          },
          {
            title: '原所属乡镇',
            align: "center",
            dataIndex: 'yssxz',
            scopedSlots: { customRender: 'yssxz' },
            width: 120,
          },
          {
            title: '原所属村名称',
            align:"center",
            dataIndex: 'yxzc',
            width: 150
          },
          {
            title: '备注',
            align:"center",
            dataIndex: 'bz',
            width: 100
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
            fixed: "right",
            width: 120
          }
        ],
		url: {
          list: "/khgl.khxx/vKhglKhjbxx/list",
          delete: "/khgl.khxx/vKhglKhjbxx/delete",
          deleteBatch: "/khgl.khxx/vKhglKhjbxx/deleteBatch",
          exportXlsUrl: "khgl.khxx/vKhglKhjbxx/exportXls",
          importExcelUrl: "khgl.khxx/vKhglKhjbxx/importExcel",
          exportTemplateXlsUrl: "khgl.khxx/vKhglKhjbxx/exportTemplateXls",
          batchExportTemplateXlsUrl: "khgl.khxx/vKhglKhjbxx/batchExportTemplateXls",
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
      this.sszh = store.getters.userInfo.orgCode
    },
    methods: {
      ...mapGetters(["nickname", "avatar","userInfo"]),
      initQueryParams() {
        if(!store.getters.isRoot) {
          this.queryParam.sszh = store.getters.userInfo.orgCode
          console.log(this.queryParam.sszh)
        }
        this.paramsInited = true
      },
      searchReset: function() {
        this.queryParam = {}
        if(!store.getters.isRoot) {
          this.queryParam.sszh = store.getters.userInfo.orgCode
        }
        this.sfjsejyxdy=true;
        this.ejyxdybhdate="",
        this.loadData(1);
      },
      getQueryParams(){
        let tjrqment = "";
        if(this.queryParam.cjsj != null) {
          tjrqment = this.queryParam.cjsj.format("YYYY-MM-DD");
        }
        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        param.cjsj     = tjrqment;
        return filterObj(param);
      },

      handleKhxxEdit: function (record) {
        this.$refs.xqModalForm.edit(record);
        this.$refs.xqModalForm.title = "详情";
        this.$refs.xqModalForm.disableSubmit = false;
      },

      batchExport(fileName){
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        console.log("---------")
        let param = {...this.queryParam};
        console.log("导出参数",param)
        downFile(this.url.batchExportTemplateXlsUrl,param).then((data)=>{
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


      handlePrint(fileName,record){
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        console.log("---------")
        console.log(record)
        let param = {"hhbm":record.hhbm};
        console.log("导出参数",param)
        downFile(this.url.exportTemplateXlsUrl,param).then((data)=>{
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


      getyjyxdybh(value) {
        if (value) {
          this.sfjsejyxdy=false,
          this.queryParam.ssxz = value
          let yjyxdybh = value
          this.ejyxdybh = "YXDYGL_EJYXDYGL,DYMC,DYBH,YJYXDYBH = " + yjyxdybh;
          console.log(this.ejyxdybh)
        }
      },
      getejyxdybh(value){
        if(value) {
          this.queryParam.xzc = value
          let ejyxdybh = value
          this.sjyxdybh = "YXDYGL_SJYXDYGL,DYMC,DYBH,EJYXDYBH = "+ejyxdybh;
          this.ejyxdybhdate="",
          this.ejyxdybhdate = value
          console.log(this.sjyxdybh)
        }
      },

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>