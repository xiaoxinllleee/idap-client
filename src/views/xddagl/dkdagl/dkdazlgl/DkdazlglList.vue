<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构代码">
              <j-tree-select placeholder="请选择机构查询"
                             treeNodeFilterProp="title"
                             v-model="queryParam.jgdm"
                             v-decorator="['jgdm', {rules: [{required: true, message: '请选择机构查询！'}]}]"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmmszh, zzjc, ywjgdm"
                             :tree-default-expand-all="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户类型">
              <a-select placeholder="全部" v-model="queryParam.khlx">
                <a-select-option value="1">
                  企业
                </a-select-option>
                <a-select-option value="2">
                  个人
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="录入时间">
              <a-range-picker @change="onlrsjDateChange" v-model="queryParam.lrsj"></a-range-picker>
            </a-form-item>
          </a-col>

        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户姓名">
              <a-input placeholder="请输入客户姓名" v-model="queryParam.khmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款合同">
              <a-input placeholder="请输入贷款合同" v-model="queryParam.hth"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款品种">
<!--              <a-input placeholder="请输入贷款品种" v-model="queryParam.dkpz"></a-input>-->
              <j-dict-select-tag placeholder="请选择贷款品种"  v-model="queryParam.dkpz" dict-code="dkzl"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="资料类型">
              <a-select placeholder="请选择资料类型" v-model="queryParam.fjlx" >
                <a-select-option value="1">
                  综合档案资料
                </a-select-option>
                <a-select-option value="2">
                  贷后检查报告
                </a-select-option>
                <a-select-option value="3">
                  综合档案资料(补充)
                </a-select-option>
                <a-select-option value="4">
                  诉讼资料
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
<!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('贷款档案资料管理')" v-has="'dkdazlgl:exportXls'">导出</a-button>

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
        :scroll="{x:3000}"
        @change="handleTableChange">


<!--         <span slot="zjhm" slot-scope="text">-->
<!--          <j-ellipsis :value="text" :length="5"/>-->
<!--        </span>-->
<!--        <span slot="hth" slot-scope="text">-->
<!--          <j-ellipsis :value="text" :length="5"/>-->
<!--        </span>-->
        <span slot="wjlj" slot-scope="text">
          <j-ellipsis :value="text" :length="10"/>
        </span>

        <span slot="action" slot-scope="text, record">
          <a @click="handleView(record)" v-has="'dkdazlgl:view'">查看</a>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
   <!-- <dkdazlgl-modal ref="modalForm" @ok="modalFormOk"></dkdazlgl-modal>-->
    <dkdahtsjgl-modal ref="modalForm" @ok="modalFormOk"></dkdahtsjgl-modal>
  </a-card>
</template>

<script>

  import DkdahtsjglModal from '@views/xddagl/dkdagl/dkdahtsjgl/modules/DkdahtsjglModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '../../../../components/jeecg/JTreeSelect'
  import JEllipsis from '../../../../components/jeecg/JEllipsis'
  import { filterObj } from '../../../../utils/util'

  export default {
    name: "DkdazlglList",
    mixins:[JeecgListMixin],
    components: {
      JTreeSelect,JEllipsis,DkdahtsjglModal
    },
    data () {
      return {
        description: '贷款档案资料管理管理页面',
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
            title: '机构代码',
            align:"center",
            dataIndex: 'jgdm',
            width: 100
          },
          {
            title: '客户类型',
            align:"center",
            dataIndex: 'khlx_dictText',
            width: 100
          },
          {
            title: '机构名称',
            align:"center",
            dataIndex: 'jgdm_dictText',
            width: 100
          },
          {
            title: '客户姓名',
            align:"center",
            dataIndex: 'khmc',
            width: 100
          },
           {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm',
            width: 200
          },
          {
            title: '贷款合同',
            align:"center",
            dataIndex: 'hth',
            scopedSlots: {customRender: 'hth'},
          },
          {
            title: '贷款品种',
            align:"center",
            dataIndex: 'dkpz_dictText'
          },
          {
            title: '联系电话',
            align:"center",
            dataIndex: 'lxdh',
            width: 180
          },
          {
            title: '联系地址',
            align:"center",
            dataIndex: 'lxdz'
          },
          {
            title: '档案类型',
            align:"center",
            dataIndex: 'fjlx_dictText',
            width: 160
          },
          {
            title: '文件路径',
            align:"center",
            dataIndex: 'wjlj',
            //scopedSlots: {customRender: 'wjlj'},
          },
          {
            title: '录入标识',
            align:"center",
            dataIndex: 'lrbz_dictText',
            width: 100
          },
          {
            title: '录入人',
            align:"center",
            dataIndex: 'lrr',
            width: 100
          },
          {
            title: '录入时间',
            align:"center",
            dataIndex: 'lrsj',
            width: 100
          },
          {
            title: '操作',
            dataIndex: 'action',
            width:150,
            align:"center",
            fixed:"right",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/dkdazlgl/dkdazlgl/list",
          delete: "/dkdazlgl/dkdazlgl/delete",
          deleteBatch: "/dkdazlgl/dkdazlgl/deleteBatch",
          exportXlsUrl: "dkdazlgl/dkdazlgl/exportXls",
          importExcelUrl: "dkdazlgl/dkdazlgl/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      getQueryParams() {
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        delete param.lrsj;
        return filterObj(param);
      },
      onlrsjDateChange(value,dateString){
        let lrsjString = dateString
        this.queryParam.lrsj_begin = lrsjString[0]
        this.queryParam.lrsj_end = lrsjString[1]
      },

     /* handleEdit(record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "上传";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.disabled = true;
      },*/
      handleView: function (record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "查看";
        this.$refs.modalForm.disableSubmit = true;
        this.$refs.modalForm.disabled = true;
      },

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>