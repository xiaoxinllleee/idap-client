<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="所属支行">
              <j-tree-select placeholder="请选择所属支行" v-model="queryParam.sszh"
                             dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                             :sszh="true" :showSearch="false" :treeDefaultExpandAll="false" :filterTreeNode="true" :isAll="isAll" :display-by-permission="false"/>
            </a-form-item>
          </a-col>
          <!--<a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属营销单元">
              <a-input placeholder="请输入所属营销单元" v-model="queryParam.ssyxdy"></a-input>
            </a-form-item>
          </a-col>-->
          <a-col :md="6" :sm="8">
            <a-form-item label="商户名称">
              <a-input placeholder="请输入商户名称" v-model="queryParam.shmc" type="likemore" ></a-input>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <a-form-item label="采集人">
              <a-input placeholder="请输入采集人" v-model="queryParam.cjr" type="likemore"></a-input>
            </a-form-item>
          </a-col>

          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8">
              <a-form-item label="法定代表人">
                <a-input placeholder="请输入法定代表人" v-model="queryParam.fddbr" type="likemore"></a-input>
              </a-form-item>
            </a-col>

            <a-col :md="6" :sm="8">
              <a-form-item label="法人证件号码">
                <a-input placeholder="请输入法人证件号码" v-model="queryParam.frzjhm"></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="经营状态">
                <j-dict-select-tag placeholder="请选择经营状态" v-model="queryParam.jyzt" dict-code="jyzt"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="商户类型">
                <j-dict-select-tag placeholder="请选择商户类型" v-model="queryParam.shlx" dict-code="qylx"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="是否已采集">
                <j-dict-select-tag placeholder="请选择是否已采集" v-model="queryParam.sfycj" dict-code="sfbz"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="统一社会信用代码">
                <a-input placeholder="请输入统一社会信用代码" v-model="queryParam.tyshxydm"></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="是否上传附件">
                <j-dict-select-tag placeholder="请选择是否上传附件" v-model="queryParam.sfscfj" dict-code="sfbz"/>
              </a-form-item>
            </a-col>
          </template>


          <!--<template v-if="toggleSearchStatus">

             <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="所属乡镇">
                <a-input placeholder="请输入所属乡镇" v-model="queryParam.ssxz"></a-input>
              </a-form-item>
            </a-col>

            </template>-->
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
      <a-button type="primary" icon="download" @click="handleExportXls('商户信息管理')">导出</a-button>
      <!-- <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
         <a-button type="primary" icon="import" @click="excelImport">导入</a-button>
       </a-upload>-->
      <a-button type="primary" icon="import" @click="excelImport">导入</a-button>

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
        :scroll="{ x: 4000}"
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
        <span slot="dz" slot-scope="text">
          <j-ellipsis :value="text" :length="10"/>
        </span>
        <span slot="jyfw" slot-scope="text">
          <j-ellipsis :value="text" :length="10"/>
        </span>
        <span slot="detail" slot-scope="shmc,record">
          <a @click="handlepjsxjdmxEdit(record)">{{shmc}}</a>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <vKhglShxxgl-modal ref="modalForm" @ok="modalFormOk"></vKhglShxxgl-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
  import VKhglShxxglModal from './modules/VKhglShxxglModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JEllipsis from '../../../components/jeecg/JEllipsis'
  import { mapGetters } from 'vuex'
  import store from '@/store/'
  import ExcelImport from '@/components/common/ExcelImport'
  import { downFile } from '@/api/manage'

  export default {
    name: "VKhglShxxglList",
    mixins:[JeecgListMixin],
    components: {
      ExcelImport,
      JEllipsis,
      VKhglShxxglModal,JTreeSelect
    },
    data () {
      return {
        isAll: false,
        description: '商户信息管理管理页面',
        // 表头
        columns: [
          {
            title: '所属支行',
            align:"center",
            dataIndex: 'sszh_dictText'
          },

          {
            title: '所属营销单元',
            align:"center",
            dataIndex: 'ssyxdy'
          },
          {
            title: '商户名称',
            align:"center",
            width: 150,
            scopedSlots: { customRender: 'detail' },
            dataIndex: 'shmc'
          },
          {
            title: '法定代表人',
            align:"center",
            dataIndex: 'fddbr'
          },
          {
            title: '法人证件号码',
            align:"center",
            width: 160,
            dataIndex: 'frzjhm'
          },
          {
            title: '统一社会信用代码',
            align:"center",
            width: 180,
            dataIndex: 'tyshxydm'
          },
          {
            title: '营业执照',
            align:"center",
            width: 150,
            dataIndex: 'yyzz'
          },
          {
            title: '纳税人识别号',
            align:"center",
            width: 180,
            dataIndex: 'nsrsbh'
          },
          {
            title: '组织机构代码',
            align:"center",
            dataIndex: 'zzjgdm'
          },
          {
            title: '注册号',
            align:"center",
            dataIndex: 'zch'
          },
          {
            title: '经营状态',
            align:"center",
            dataIndex: 'jyzt_dictText'
          },
          {
            title: '注册资本',
            align:"center",
            dataIndex: 'zczb'
          },
          {
            title: '成立日期',
            align:"center",
            dataIndex: 'clrq'
          },
          {
            title: '联系方式',
            align:"center",
            dataIndex: 'lxfs'
          },
          {
            title: '更多联系方式',
            align:"center",
            dataIndex: 'gdlxfs'
          },
          {
            title: '邮箱地址',
            align:"center",
            dataIndex: 'yxdz'
          },
          {
            title: '更多邮箱地址',
            align:"center",
            dataIndex: 'gdyxdz'
          },
          {
            title: '地址',
            align:"center",
            scopedSlots: { customRender: 'dz' },
            dataIndex: 'dz'
          },
          {
            title: '参保人数',
            align:"center",
            dataIndex: 'cbrs'
          },
          {
            title: '商户类型',
            align:"center",
            dataIndex: 'shlx_dictText'
          },
          {
            title: '所属行业',
            align:"center",
            dataIndex: 'sshy'
          },
          {
            title: '曾用名',
            align:"center",
            dataIndex: 'cym'
          },
          {
            title: '网址',
            align:"center",
            dataIndex: 'wz'
          },
          {
            title: '经营范围',
            align:"center",
            scopedSlots: { customRender: 'jyfw' },
            dataIndex: 'jyfw'
          },
          {
            title: '备注',
            align:"center",
            dataIndex: 'bz'
          },
          {
            title: '是否采集',
            align:"center",
            dataIndex: 'sfycj_dictText'
          },
          {
            title: '是否上传附件',
            align:"center",
            dataIndex: 'sfscfj_dictText'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
        url: {
          list: "sh/vShxxgl/list",
          delete: "sh/vShxxgl/delete",
          deleteBatch: "sh/vShxxgl/deleteBatch",
          exportXlsUrl: "sh/vShxxgl/exportXls",
          importExcelUrl: "sh/vShxxgl/importExcel",
          exportTemplateUrl: "/sh/vShxxgl/exportTemplateXls",
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
        // if (!store.getters.isRoot) {
        //   this.queryParam.sszh = store.getters.userInfo.orgCode
        // }
        this.paramsInited = true
      },
      searchReset: function() {
        this.queryParam = {}
        // if(!store.getters.isRoot) {
        //   this.queryParam.sszh = store.getters.userInfo.orgCode
        // }
        this.loadData(1);
      },

      excelImport(){
        let params = {}
        params.exportTemplateUrl = this.url.exportTemplateUrl
        params.importExcelUrl = this.importExcelUrl
        params.exportTemplateName = "商户信息管理"
        this.$refs.excelImportModal.showModal(params);
      },
      importComplete(filePath) {
        let fileName = "导入结果"
        let param = {};
        console.log("filePath")
        console.log(filePath)
        downFile("/sys/common/download/" + filePath,param).then((data)=>{
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

        this.loadData();
      },

      handlepjsxjdmxEdit: function(record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "详情";
        this.$refs.modalForm.disableSubmit = true;
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>