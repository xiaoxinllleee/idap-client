<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24"><a-form-item label="机构代码">
            <j-tree-select placeholder="请选择机构代码" v-model="queryParam.jgdm" dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                           pid-field="sjywjgdm" treeNodeFilterProp="title"
                           :showSearch="true" :tree-default-expand-all="true"/>
          </a-form-item></a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款账号">
              <a-input placeholder="请输入贷款账号" v-model="queryParam.dkzh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="存款余额">
              <a-input style="width: 46%" v-model="queryParam.ckyeS"></a-input>
              至
              <a-input style="width: 46%" v-model="queryParam.ckyeE"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="第一责任人工号">
              <a-input placeholder="请输入第一责任人工号" v-model="queryParam.dyzrrgh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="第一责任人姓名">
              <a-input placeholder="请输入第一责任人姓名" v-model="queryParam.dyzrrxm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="当前欠息">
              <a-input style="width: 46%" v-model="queryParam.dqqxS"></a-input>
              至
              <a-input style="width: 46%" v-model="queryParam.dqqxE"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="领户五级分类">
              <a-select placeholder="请选择领户五级分类" v-model="queryParam.lhwjfl">
                <a-select-option value="0">
                  全部
                </a-select-option>
                <a-select-option value="1">
                  正常
                </a-select-option>
                <a-select-option value="2">
                  关注
                </a-select-option>
                <a-select-option value="3">
                  次级
                </a-select-option>
                <a-select-option value="4">
                  可疑
                </a-select-option>
                <a-select-option value="5">
                  损失
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="管户人工号">
              <a-input placeholder="请输入管户人工号" v-model="queryParam.ghrgh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="管户人姓名">
              <a-input placeholder="请输入管户人姓名" v-model="queryParam.ghrxm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="结息方式">
              <a-select placeholder="请选择结息方式" v-model="queryParam.jxfs">
                <a-select-option value="0">
                  全部
                </a-select-option>
                <a-select-option value="1">
                  按月计息
                </a-select-option>
                <a-select-option value="2">
                  按季计息
                </a-select-option>
                <a-select-option value="3">
                  按年计息
                </a-select-option>
                <a-select-option value="4">
                  不定期
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="信贷五级分类">
              <a-select placeholder="请选择信贷五级分类" v-model="queryParam.xdwjfl">
                <a-select-option value="0">
                  全部
                </a-select-option>
                <a-select-option value="1">
                  正常
                </a-select-option>
                <a-select-option value="2">
                  关注
                </a-select-option>
                <a-select-option value="3">
                  次级
                </a-select-option>
                <a-select-option value="4">
                  可疑
                </a-select-option>
                <a-select-option value="5">
                  损失
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="不良状态">
              <a-select placeholder="请选择不良状态" v-model="queryParam.blzt">
                <a-select-option value="0">
                  全部
                </a-select-option>
                <a-select-option value="1">
                  正常
                </a-select-option>
                <a-select-option value="2">
                  本金逾期不良
                </a-select-option>
                <a-select-option value="3">
                  利息欠息不良
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="不良起始月份">
              <a-month-picker v-model="queryParam.blqsyf"   />
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
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button icon="download" @click="handleExportXls('历史贷款管户台账')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button icon="import">导入</a-button>
      </a-upload>
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

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <lsdkghtz-modal ref="modalForm" @ok="modalFormOk"></lsdkghtz-modal>
  </a-card>
</template>

<script>
  import LsdkghtzModal from './modules/LsdkghtzModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import {filterObj} from "@/utils/util";
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import store from '@/store/'

  export default {
    name: "LsdkghtzList",
    mixins:[JeecgListMixin],
    components: {
      LsdkghtzModal,JTreeSelect
    },
    data () {
      return {
        description: '历史贷款管户台账管理页面',
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
            dataIndex: 'jgdm'
           },
		   {
            title: '贷款账号',
            align:"center",
            dataIndex: 'dkzh'
           },
		   {
            title: '第一责任人工号',
            align:"center",
            dataIndex: 'dyzrrgh'
           },
		   {
            title: '第一责任人姓名',
            align:"center",
            dataIndex: 'dyzrrxm'
           },
		   {
            title: '管户人工号',
            align:"center",
            dataIndex: 'ghrgh'
           },
		   {
            title: '管护人姓名',
            align:"center",
            dataIndex: 'ghrxm'
           },
		   {
            title: '结息方式',
            align:"center",
            dataIndex: 'jxfs'
           },
		   {
            title: '存款余额',
            align:"center",
            dataIndex: 'ckye'
           },
		   {
            title: '当前欠息',
            align:"center",
            dataIndex: 'dqqx'
           },
		   {
            title: '月季应收利息',
            align:"center",
            dataIndex: 'yjyslx'
           },
		   {
            title: '领户五级分类',
            align:"center",
            dataIndex: 'lhwjfl'
           },
		   {
            title: '信贷五级分类',
            align:"center",
            dataIndex: 'xdwjfl'
           },
		   {
            title: '不良状态',
            align:"center",
            dataIndex: 'blzt'
           },
		   {
            title: '不良起始月份',
            align:"center",
            dataIndex: 'blqsyf'
           },
		   {
            title: '逾期利率',
            align:"center",
            dataIndex: 'yqll'
           },
		   {
            title: '利率',
            align:"center",
            dataIndex: 'll'
           },
		   /*{
            title: '录入人',
            align:"center",
            dataIndex: 'lrr'
           },
		   {
            title: '录入时间',
            align:"center",
            dataIndex: 'lrsj'
           },
		   {
            title: '录入标识',
            align:"center",
            dataIndex: 'lrbz'
           },*/
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/lsdkghtz/lsdkghtz/list",
          delete: "/lsdkghtz/lsdkghtz/delete",
          deleteBatch: "/lsdkghtz/lsdkghtz/deleteBatch",
          exportXlsUrl: "lsdkghtz/lsdkghtz/exportXls",
          importExcelUrl: "lsdkghtz/lsdkghtz/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      getQueryParams(){
        let tjrqment = "";
        if(this.queryParam.blqsyf) {
          tjrqment = this.queryParam.blqsyf.format("YYYY-MM")+'-01';
        }
        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.blqsyf) {
          param.blqsyf = tjrqment;
        }
        return filterObj(param);
      },
      searchReset() {
        this.queryParam={jgdm:''};
        if(!store.getters.isRoot) {
          console.log(store.getters.ywjgdm)
          this.queryParam.jgdm = store.getters.ywjgdm
        }
      },
    },

  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>