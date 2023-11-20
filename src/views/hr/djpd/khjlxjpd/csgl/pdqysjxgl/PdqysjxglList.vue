<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="数据项ID">
              <a-input placeholder="请输入数据项ID" v-model="queryParam.sjxid"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="数据项名称">
              <a-input placeholder="请输入数据项名称" v-model="queryParam.sjxmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="数据项维度">
              <a-select placeholder="全部" v-model="queryParam.sjxwd">
                <a-select-option value="DD">
                  天
                </a-select-option>
                <a-select-option value="MM">
                  月
                </a-select-option>
                <a-select-option value="Q">
                  季
                </a-select-option>
                <a-select-option value="YYYY">
                  年
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="数据项类型">
              <a-select placeholder="全部" v-model="queryParam.sjxlx">
                <a-select-option value="1">
                  机构
                </a-select-option>
                <a-select-option value="2">
                  部门
                </a-select-option>
                <a-select-option value="3">
                  岗位
                </a-select-option>
                <a-select-option value="4">
                  个人
                </a-select-option>
                <a-select-option value="5">
                  系统参数
                </a-select-option>
                <a-select-option value="6">
                  扣减项
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="考核方式">
              <a-select placeholder="全部" v-model="queryParam.khfs">
                <a-select-option value="1">
                  平衡计分法
                </a-select-option>
                <a-select-option value="2">
                  贡献率
                </a-select-option>
                <a-select-option value="3">
                  按量计酬
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'Pdqysjxgl:add'">新增</a-button>
      <a-button icon="download" @click="handleExportXls('评定区域数据项管理')" v-has="'Pdqysjxgl:exp'">导出</a-button>
     <!-- <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button icon="import">导入</a-button>
      </a-upload>-->
      <!--<a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>-->
    </div>

    <!-- table区域-begin -->
    <div>
      <!--<div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>-->

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey=""
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{x:2000}"
        @change="handleTableChange">
        <span slot="gzjssql" slot-scope="text">
          <j-ellipsis :value="text" :length="8" />
        </span>
        <span slot="khjssql" slot-scope="text">
          <j-ellipsis :value="text" :length="8" />
        </span>
        <span slot="khjsljsm" slot-scope="text">
          <j-ellipsis :value="text" :length="8" />
        </span>
        <span slot="gzsjljsm" slot-scope="text">
          <j-ellipsis :value="text" :length="8" />
        </span>



        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'Pdqysjxgl:edit'">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)">
                  <a v-has="'Pdqysjxgl:del'">删除</a>
                </a-popconfirm>
              </a-menu-item>
              <a-menu-item>
                  <a href="javascript:;" @click="xq(record)" v-has="'Pdqysjxgl:view'">详情</a>
               </a-menu-item>
            </a-menu>

          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <pdqysjxgl-modal ref="modalForm" @ok="modalFormOk"></pdqysjxgl-modal>
  </a-card>
</template>

<script>
  import PdqysjxglModal from './modules/PdqysjxglModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { deleteAction } from '@/api/manage'
  import JEllipsis from '@/components/jeecg/JEllipsis'

  export default {
    name: "PdqysjxglList",
    mixins:[JeecgListMixin],
    components: {
      PdqysjxglModal,JEllipsis
    },
    data () {
      return {
        description: '评定区域数据项管理管理页面',
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
            title: '数据项编号',
            align:"center",
            dataIndex: 'sjxno'
           },
		   {
            title: '数据项ID',
            align:"center",
            dataIndex: 'sjxid'
           },
		   {
            title: '数据项类型',
            align:"center",
            dataIndex: 'sjxlx_dictText'
           },
		   {
            title: '数据项维度',
            align:"center",
            dataIndex: 'sjxwd_dictText'
           },
		   {
            title: '数据项名称',
            align:"center",
            dataIndex: 'sjxmc'
           },
		   {
            title: '区域代码',
            align:"center",
            dataIndex: 'qydm'
           },
		   {
            title: '指标考核数据计算SQL',
            align:"center",
            dataIndex: 'khjssql',
            scopedSlots: { customRender: 'khjssql' }
           },
		   {
            title: '指标工资计算SQL',
            align:"center",
            dataIndex: 'gzjssql',
            scopedSlots: { customRender: 'gzjssql' }
           },
		   {
            title: '启用标识名称',
            align:"center",
            dataIndex: 'qybz_dictText'
           },
		   {
            title: '录入时间',
            align:"center",
            dataIndex: 'lrsj'
           },
		   {
            title: '录入标志',
            align:"center",
            dataIndex: 'lrbz_dictText'
           },
		   {
            title: '录入人',
            align:"center",
            dataIndex: 'lrr'
           },
		   {
            title: '考核方式',
            align:"center",
            dataIndex: 'khfs_dictText'
           },
		   {
            title: '执行批次',
            align:"center",
            dataIndex: 'zxpc'
           },
		   {
            title: '执行顺序',
            align:"center",
            dataIndex: 'zxsx'
           },
		   {
            title: '考核数据逻辑说明',
            align:"center",
            dataIndex: 'khjsljsm',
            scopedSlots: { customRender: 'khjsljsm' }
           },
		   {
            title: '工资计算逻辑说明',
            align:"center",
            dataIndex: 'gzsjljsm',
            scopedSlots: { customRender: 'gzsjljsm' }
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
            fixed: 'right',
          }
        ],
		url: {
          list: "/pdqysjxgl/pdqysjxgl/list",
          delete: "/pdqysjxgl/pdqysjxgl/delete",
          deleteBatch: "/pdqysjxgl/pdqysjxgl/deleteBatch",
          exportXlsUrl: "pdqysjxgl/pdqysjxgl/exportXls",
          importExcelUrl: "pdqysjxgl/pdqysjxgl/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      handleDelete: function (record) {
        console.log(record)
        if(!this.url.delete){
          this.$message.error("请设置url.delete属性!")
          return
        }
        var that = this;
        deleteAction(that.url.delete, {sjxno: record.sjxno}).then((res) => {
          if (res.success) {
            that.$message.success(res.message);
            that.loadData();
          } else {
            that.$message.warning(res.message);
          }
        });
      },
      xq:function(record){
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title="详情";
        this.$refs.modalForm.disableSubmit = true;
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>