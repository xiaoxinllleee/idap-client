<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8"><a-form-item label="所属支行">
            <j-tree-select placeholder="请选择支行查询" v-model="queryParam.sszh" :sszh="true" :showSearch="false" :treeDefaultExpandAll="true"
                           dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"/>
          </a-form-item></a-col>

          <a-col :md="6" :sm="8"><a-form-item label="所属村">
            <a-input placeholder="所属村名称" v-model="queryParam.ssyxdy"></a-input>
          </a-form-item></a-col>

          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8"><a-form-item label="户号编码">
              <a-input placeholder="请输入户号编码" v-model="queryParam.hhbm"></a-input>
            </a-form-item></a-col>

            <a-col :md="6" :sm="8"><a-form-item label="客户名称">
              <j-input placeholder="请输入客户名称" v-model="queryParam.khmc" type="likemore"/>
            </a-form-item></a-col>

            <a-col :md="6" :sm="8"><a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item></a-col>

            <a-col :md="6" :sm="8"><a-form-item label="客户类型">
              <j-dict-select-tag placeholder="请选择客户类型" v-model="queryParam.khlx" dictCode="khlx"/>
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

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
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
          <a @click="nhhandleEdit(record)" v-if="record.khlx == '1'">农户明细</a>
          <a @click="shhandleEdit(record)" v-if="record.khlx == '2'">商户明细</a>
          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item v-if="record.khlx == '1'">
                <a @click="handlemxExportXls('农户明细',record)">导出农户信息</a>
              </a-menu-item>
              <a-menu-item v-if="record.khlx == '2'">
                <a @click="handlemxExportXls('商户明细',record)">导出商户信息</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>
        <span slot="ssyxdy" slot-scope="text, record">
          <j-ellipsis :value="text" :length="6"/>
        </span>
        <span slot="zz" slot-scope="text, record">
          <j-ellipsis :value="text" :length="8"/>
        </span>
        <span slot="hjdz" slot-scope="text, record">
          <j-ellipsis :value="text" :length="8"/>
        </span>
        <span slot="hhbm" slot-scope="text, record">
          <j-ellipsis :value="text" :length="18"/>
        </span>
        <span slot="khmc" slot-scope="text, record">
          <j-ellipsis :value="text" :length="10"/>
        </span>
        <span slot="zjhm" slot-scope="text, record">
          <j-ellipsis :value="text" :length="18"/>
        </span>
        <span slot="yhzgx" slot-scope="text, record">
          <j-ellipsis :value="text" :length="5"/>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <vKhglKhtycx-modal ref="modalForm" @ok="modalFormOk"></vKhglKhtycx-modal>
    <nhjbxxx-xq-moda ref="nhmodalForm" @ok="modalFormOk" ></nhjbxxx-xq-moda>
    <shjbxx-modal ref="shjbxxModal" @ok="modalFormOk"></shjbxx-modal>
  </a-card>
</template>

<script>
  import VKhglKhtycxModal from './modules/VKhglKhtycxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import NhjbxxxXqModa from '../nh_old/modules/NhjbxxxXqModal'
  //import shjbxxModal from '@/views/khgl/sh_new/modules/Khgl_shjbxxModal'
  import { getAction,putAction,httpAction,downFile } from '@/api/manage'
  import JEllipsis from '../../../components/jeecg/JEllipsis'
  import JInput from '../../../components/jeecg/JInput'

  export default {
    name: "VKhglKhtycxList",
    mixins:[JeecgListMixin],
    components: {
      JInput,
      JEllipsis,
      VKhglKhtycxModal,JTreeSelect,NhjbxxxXqModa
    },
    data () {
      return {
        description: '客户统一查询',
        isAll: false,
        // 表头
        columns: [
          {
            title: '所属支行',
            align:"center",
            dataIndex: 'sszh_dictText',
            width: 120,
          },
          {
            title: '所属村',
            align:"center",
            dataIndex: 'ssyxdy_dictText',
            scopedSlots: { customRender: 'ssyxdy' },
            width: 120,
          },
          {
            title: '户号编码',
            align: "center",
            dataIndex: 'hhbm',
            width: 160,
            scopedSlots: { customRender: 'hhbm' },
            sorter: true,
          },
          {
            title: '是否户主',
            align: "center",
            dataIndex: 'sfhz_dictText',
            width: 80,
          },
          {
            title: '与户主关系',
            align: "center",
            dataIndex: 'yhzgx_dictText',
            scopedSlots: { customRender: 'yhzgx' },
            width: 100,
          },
          {
            title: '客户名称',
            align: "center",
            dataIndex: 'khmc',
            scopedSlots: { customRender: 'khmc' },
            width: 150,
          },
          {
            title: '证件号码',
            align: "center",
            dataIndex: 'zjhm',
            scopedSlots: { customRender: 'zjhm' },
            width: 160,
          },
          {
            title: '客户类型',
            align: "center",
            dataIndex: 'khlx_dictText',
            width: 100,
          },
          {
            title: '性别',
            align: "center",
            dataIndex: 'xb_dictText',
            width: 100,
            filters: [
              { text: '男', value: '1', },
              { text: '女', value: '2', }
            ],
            onFilter: (value, record) => record.xb.indexOf(value) === 0,
          },
          {
            title: '年龄',
            align: "center",
            dataIndex: 'nl',
            width: 100,
            sorter: true,
          },
          {
            title: '民族',
            align: "center",
            dataIndex: 'mz',
            width: 100,
          },
          {
            title: '联系方式',
            align: "center",
            dataIndex: 'lxfs',
            width: 150,
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            width: 150,
            scopedSlots: { customRender: 'action' },
          }
        ],
        url: {
          list: "/khgl.khglkhtycx/khtycxKhglKhhmcxx/list",
          delete: "/khgl.khglkhtycx/vKhglKhtycx/delete",
          deleteBatch: "/khgl.khglkhtycx/vKhglKhtycx/deleteBatch",
          exportXlsUrl: "khgl.khglkhtycx/vKhglKhtycx/exportXls",
          importExcelUrl: "khgl.khglkhtycx/vKhglKhtycx/importExcel",
          nhmxexportXlsUrl:"nh/nhjbxx/nhmxexportTemplateXls",
          shmxexportXlsUrl:"/khgl_shjbxx/khgl_shjbxx/shmxexportTemplateXls",
        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    created(){
      // this.isAll = store.getters.isRoot
    },
    methods: {
      // ...mapGetters(["nickname", "avatar","userInfo"]),
      handlemxExportXls(fileName,record){
        if (!fileName || typeof fileName != "string") {
          fileName = "导出文件"
        }
        let param = record;
        if (this.selectedRowKeys && this.selectedRowKeys.length>0) {
          param['selections'] = this.selectedRowKeys.join(",")
        }
        console.log("导出参数",param)
        let httpurl = '';
        var dcsj = '';
        if (record.khlx== 1){
          httpurl += this.url.nhmxexportXlsUrl;
          dcsj = {'zjhm':record.zjhm,'hhbm':record.hhbm ,'sszh':record.sszh}
          console.log('httpurl',dcsj)
        } else {
          httpurl += this.url.shmxexportXlsUrl;
          dcsj = {'zjhm':record.zjhm,'sszh':record.sszh}
        }
        console.log('@@@@@@'+dcsj)
        downFile(httpurl,dcsj).then((data)=>{
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
      nhhandleEdit: function (record) {
        this.$refs.nhmodalForm.edit(record);
        this.$refs.nhmodalForm.title = "农户详情";
        this.$refs.nhmodalForm.disableSubmit = false;
      },
      shhandleEdit: function (record) {
        this.$refs.shjbxxModal.edit(record,'khtycx');
        this.$refs.shjbxxModal.title = "商户详情";
        this.$refs.shjbxxModal.disableSubmit = false;
      },
      initQueryParams() {
        //通过首页查询
        if(this.$route.query.type) {
          this.queryParam.type = this.$route.query.type;
          this.queryParam.queryValue = this.$route.query.queryValue;
          this.paramsInited = true;
        }
      },
      beforeSearchQuery() {
        this.queryParam.type = null;
      },
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>