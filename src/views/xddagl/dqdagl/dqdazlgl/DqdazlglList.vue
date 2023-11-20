<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="档案编号">
              <a-input placeholder="请输入档案编号" v-model="queryParam.dabh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属机构">
              <j-tree-select placeholder="请选择所属机构" v-model="queryParam.ywjg" dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             treeNodeFilterProp="title" pid-field="sjywjgdm"
                             :showSearch="true" :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户姓名">
              <a-input placeholder="请输入客户姓名" v-model="queryParam.khxm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="匹配状态">
              <a-select placeholder="全部" v-model="queryParam.ppzt">
                <a-select-option value="1">
                  是
                </a-select-option>
                <a-select-option value="2">
                  否
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
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
      <a-button  @click="handleAdd" icon="plus">注册</a-button>

    </div>

    <!-- table区域-begin -->
    <div>

      <a-table
        ref="table"
        size="middle"
        bordered
        :rowKey="rowKey"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{x:2086}"
        @change="handleTableChange">

<!--        <span slot="dz" slot-scope="text">-->
<!--          <j-ellipsis :value="text" :length="9"/>-->
<!--        </span>-->
<!--        <span slot="hth" slot-scope="text">-->
<!--          <j-ellipsis :value="text" :length="14"/>-->
<!--        </span>-->

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'dqdazlgl:edit'">上传</a>
          <a-divider type="vertical" />
          <a @click="handleView(record)" v-has="'dqdazlgl:view'">查看</a>
          <a-divider type="vertical" />
          <a @click="confirm(record)" v-has="'dqdazlgl:confirm'">确认</a>
          <a-divider type="vertical" />
           <a @click="match(record)" v-has="'dqdazlgl:match'">匹配</a>
          <a-divider type="vertical" />
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <dqdazlgl-modal ref="modalForm" @ok="modalFormOk"></dqdazlgl-modal>
    <match ref="match" @ok="colseWindow"></match>

  </a-card>
</template>

<script>
  import match from './modules/match'
  import DqdazlglModal from './modules/DqdazlglModal'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JEllipsis from "../../../../components/jeecg/JEllipsis";
  import {putAction} from '@/api/manage'

  export default {
    name: "DqdazlglList",
    mixins:[JeecgListMixin],
    components: {
      DqdazlglModal,JTreeSelect,JEllipsis,match
    },
    data () {
      return {
        description: '贷前档案资料管理管理页面',
        // 表头
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
            title: '客户姓名',
            align:"center",
            dataIndex: 'khxm',
            width: 100
           },
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm',
            width: 180
           },
		   {
            title: '手机号码',
            align:"center",
            dataIndex: 'sjhm',
            width: 150
           },
		   {
            title: '地址',
            align:"center",
            dataIndex: 'dz',
            width: 180,
            scopedSlots: {customRender: 'dz'}
           },
          {
            title: '档案编号',
            align:"center",
            dataIndex: 'dabh',
            width: 180
          },
          {
            title: '合同号',
            align:"center",
            dataIndex: 'hth',
            width: 160,
            scopedSlots: {customRender: 'hth'}
          },
		   {
            title: '签约日期',
            align:"center",
            dataIndex: 'htrq',
            width: 100
           },
		   {
            title: '机构代码',
            align:"center",
            dataIndex: 'ywjg',
            width: 100
           },
          {
            title: '机构名称',
            align:"center",
            dataIndex: 'ywjg_dictText',
            width: 150
          },
          {
            title: '录入人',
            align:"center",
            dataIndex: 'lrr',
            width: 100
          },
		   {
            title: '录入标志',
            align:"center",
            dataIndex: 'lrbz_dictText',
            width: 100
           },
          {
            title: '录入时间',
            align:"center",
            dataIndex: 'lrsj',
            width: 100
          },
		   {
            title: '确认状态',
            align:"center",
            dataIndex: 'qrzt_dictText',
            width: 100
           },
          {
            title: '匹配状态',
            align:"center",
            dataIndex: 'ppzt_dictText',
            width: 100
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
          list: "/dqdazlgl/dqdazlgl/list",
          delete: "/dqdazlgl/dqdazlgl/delete",
          deleteBatch: "/dqdazlgl/dqdazlgl/deleteBatch",
          exportXlsUrl: "dqdazlgl/dqdazlgl/exportXls",
          importExcelUrl: "dqdazlgl/dqdazlgl/importExcel",
          checkUpload:"dqdazlgl/dqdazlgl/checkUpload",
          confirm:"dqdazlgl/dqdazlgl/confirm",
          match:"dqdazlgl/dqdazlgl/match",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      handleAdd: function () {
        this.$refs.modalForm.add();
        this.$refs.modalForm.title = "注册信息";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.disabled = false;
      },
      handleEdit(record) {
        putAction(this.url.checkUpload, record).then((res) => {
          if (res.success) {
            this.$refs.modalForm.edit(record);
            this.$refs.modalForm.title = "上传";
            this.$refs.modalForm.disableSubmit = false;
            this.$refs.modalForm.disabled = false;
          }else{
            this.$message.warning(res.message,5)
          }
        })
      },
      handleView: function (record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "查看";
        this.$refs.modalForm.disableSubmit = true;
        this.$refs.modalForm.disabled = true;
        this.$refs.modalForm.show = false;
      },
      confirm: function(record) {
        putAction(this.url.confirm, record).then((res) => {
          if (res.success) {
            this.$message.success(res.message)
            this.loadData(1)
          }else{
            this.$message.warning(res.message,5)
          }
        })
      },
      match: function(record) {
        if(record.qrzt==2){
          return this.$message.warning("上传资料未确认，暂不能匹配！")
        }
        if(record.ppzt==1){
          return this.$message.warning("此条记录已匹配！")
        }
        this.$refs.match.init(record)
      },
      colseWindow(){

      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>