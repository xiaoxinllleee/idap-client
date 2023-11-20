<template>
  <div>
    <a-card :bordered="false">
      <!-- 查询区域 -->
      <div class="table-page-search-wrapper">
        <a-form layout="inline" @keyup.enter.native="searchQuery">
          <a-row :gutter="24">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="参数名称">
                <a-input placeholder="请输入参数名称" v-model="queryParam.paramName"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="参数编号">
                <a-input placeholder="请输入参数编号" v-model="queryParam.paramId"></a-input>
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
        <a-button @click="handleAdd"  :disabled="flag" type="primary" icon="plus">新增</a-button>
        <a-button @click="handleAddJg" v-if="selectedRowKeys.length == 1" type="primary" icon="plus">录入机构参数值</a-button>
<!--
        <a-button @click="handleAdd"  v-if="selectedRowKeys.length == 1" type="primary" icon="plus">录入岗位参数值</a-button>
-->
        <a-button @click="handleAddYg"  v-if="selectedRowKeys.length == 1" type="primary" icon="plus">录入员工参数值</a-button>
        <!--  <a-button type="primary" icon="download" @click="handleExportXls('节点任务管理')">导出</a-button>
          <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
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
          @change="handleTableChange">

          <span slot="action" slot-scope="text, record">

          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
          </a-popconfirm>

         </span>

        </a-table>
      </div>

      <PmaFParamInfoModal ref="pmaFParamInfoModal" @ok="modalFormOk"></PmaFParamInfoModal>
      <PmaFParamInfoModalJg ref="PmaFParamInfoModalJg"> </PmaFParamInfoModalJg>
      <PmaFParamInfoModalYg ref="PmaFParamInfoModalYg"> </PmaFParamInfoModalYg>
    </a-card>

  </div>

</template>

<script>
  import PmaFParamInfoModal from './PmaFParamInfoModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import {getAction, postAction, deleteAction} from '@/api/manage'
  import {sfqyBatch} from '@/api/api'
  import PmaFParamInfoModalJg from './PmaFParamInfoModalJg'
  import PmaFParamInfoModalYg from './PmaFParamInfoModalYg'
  //import DpRwrlList from './DpRwrlList'

  export default {
    name: "PmaFParamList",
    mixins:[JeecgListMixin],
    components: {
      PmaFParamInfoModal,PmaFParamInfoModalJg,PmaFParamInfoModalYg
    },
    data () {
      return {
        loading:false,
        nodeEditData:{},
        flag:true,
        description: '方案管理数据页面',
        currentDeptId:'',
        showpmaFParamInfoModal:false,
        // 表头
        columns: [
          /*{
            title: '序号',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
          },*/
          {
            title: '参数编号',
            align:"center",
            dataIndex: 'paramId'
          },
          {
            title: '参数名称',
            align:"center",
            dataIndex: 'paramName'
          },

          {
            title: '参数值',
            align:"center",
            dataIndex: 'paramValue'
          },

          {
            title: '参数值下限',
            align:"center",
            dataIndex: 'minLimit'
          },
          {
            title: '参数值上限',
            align:"center",
            dataIndex: 'maxLimit'
          },

          {
            title: '描述',
            align:"center",
            dataIndex: 'remark'
          },
          /*{
            title: '创建人',
            align: "center",
            dataIndex: 'createBy',
          },
          {
            title: '创建时间',
            align: "center",
            dataIndex: 'createTime',
          },
          {
            title: '修改人',
            align: "center",
            dataIndex: 'updateBy',
          },
          {
            title: '修改时间',
            align: "center",
            dataIndex: 'updateTime',
          },*/
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
        url: {
              list: "/csgl/csxx/pmaFParamInfo/list",
              delete: "/csgl/csxx/pmaFParamInfo/delete",
              deleteBatch: "/csgl/csxx/pmaFParamInfo/deleteBatch",
              exportXlsUrl: "csgl/csxx/pmaFParamInfo/exportXls",
              importExcelUrl: "csgl/csxx/pmaFParamInfo/importExcel",
           },
        }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      getDataList(){

      },
      searchReset() {
        this.queryParam = {}
        //this.currentDeptId = '';
        this.loadData(1);
        //this.$emit('clearSelectedDepartKeys')
      },
      loadData(arg) {
        if (!this.url.list) {
          this.$message.error("请设置url.list属性!")
          return
        }
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1;
        }

        let params = this.getQueryParams();//查询条件
        params.dirId = this.currentDeptId;
        this.loading=true;
        getAction(this.url.list, params).then((res) => {
          if (res.success && res.result) {
            this.dataSource = res.result.records;
            this.ipagination.total = res.result.total;
            this.loading=false;
          }
        })
      },
      batchDel: function () {
        if (!this.url.deleteBatch) {
          this.$message.error("请设置url.deleteBatch属性!")
          return
        }
        if (!this.currentDeptId) {
          this.$message.error("未选中任何节点目录，无法取消部关联的任务!")
          return
        }

        if (this.selectedRowKeys.length <= 0) {
          this.$message.warning('请选择一条记录！');
          return;
        } else {
          var ids = "";
          for (var a = 0; a < this.selectedRowKeys.length; a++) {
            ids += this.selectedRowKeys[a] + ",";
          }
          var that = this;
          console.log(this.currentDeptId);
          this.$confirm({
            title: "确认取消",
            content: "是否取消任务与选中节点的关联?",
            onOk: function () {
              deleteAction(that.url.deleteBatch, {jdid: that.currentDeptId, ids: ids}).then((res) => {
                if (res.success) {
                  that.$message.success("删除成功！");
                  that.loadData();
                  that.onClearSelected();
                } else {
                  that.$message.warning(res.message);
                }
              });
            }
          });
        }
      },
      handleDelete: function (id) {
        if (!this.url.delete) {
          this.$message.error("请设置url.delete属性!")
          return
        }
        if (!this.currentDeptId) {
          this.$message.error("未选中任何节点目录，无法删除目录关联的任务!")
          return
        }

        var that = this;
        deleteAction(that.url.delete, {jdid: this.currentDeptId, id: id}).then((res) => {
          if (res.success) {
            that.$message.success("删除成功！");
            if (this.selectedRowKeys.length>0){
              for(let i =0; i<this.selectedRowKeys.length;i++){
                if (this.selectedRowKeys[i] == id){
                  this.selectedRowKeys.splice(i,1);
                  break;
                }
              }
            }
            that.loadData();
          } else {
            that.$message.warning(res.message);
          }
        });
      },
      open(record) {
        console.log('open',record);
        this.currentDeptId = record.id;
        if( record.menuId!=1){
          this.flag=false;
        }else{
          this.flag=true;
        }
        this.loadData(1);
      },
      clearList() {
        this.currentDeptId = '';
        this.dataSource = [];
      },
      hasSelectDept() {
        if (this.currentDeptId == '') {
          this.$message.error("请选择一个部门!")
          return false;
        }
        return true;
      },
      handleAddUserDepart() {
        if (this.currentDeptId == '') {
          this.$message.error("请选择一个部门!")
        } else {
          this.$refs.selectUserModal.visible = true;
        }
      },
      handleEdit: function (record) {
        this.$refs.pmaFParamInfoModal.title = "编辑";
        this.$refs.pmaFParamInfoModal.disableSubmit = false;
        this.$refs.pmaFParamInfoModal.edit(record);
      },

      handleEditYwjg: function (record) {
        this.$refs.PmaFParamInfoModalJg.title = "编辑";
        this.$refs.PmaFParamInfoModalJg.disableSubmit = false;
        this.$refs.PmaFParamInfoModalJg.edit(record);
      },

      handleAdd: function () {
        if (this.currentDeptId == '') {
          this.$message.error("请选择一个节点目录!")
        } else {
          //this.showpmaFParamInfoModal = true;
          this.$refs.pmaFParamInfoModal.title = "新增参数";
          this.$refs.pmaFParamInfoModal.disableSubmit = false;
          this.$refs.pmaFParamInfoModal.add(this.currentDeptId);
        }
      },
      handleAddJg: function () {
        this.$refs.PmaFParamInfoModalJg.title = "新增机构参数";
        this.$refs.PmaFParamInfoModalJg.disableSubmit = false;
        this.$refs.PmaFParamInfoModalJg.edit(this.selectionRows[0]);
      },
      handleAddYg: function () {
        this.$refs.PmaFParamInfoModalYg.title = "新增员工参数";
        this.$refs.PmaFParamInfoModalYg.disableSubmit = false;
        this.$refs.PmaFParamInfoModalYg.edit(this.selectionRows[0]);
      },

      viewRl(record){
        this.$refs.rwrlForm.visible = true
        this.$refs.rwrlForm.open(record);
      },
      selectOK(data) {
        let params = {};
        params.jdid = this.currentDeptId;
        params.userIdList = [];
        for (var a = 0; a < data.length; a++) {
          params.userIdList.push(data[a]);
        }
        console.log(params);
        postAction(this.url.edit, params).then((res) => {
          if (res.success) {
            this.$message.success(res.message);
            this.loadData();
          } else {
            this.$message.warning(res.message,5);
          }
        })
      },
      handleDeptRole(record){
        this.$refs.deptRoleUser.add(record,this.currentDeptId);
        this.$refs.deptRoleUser.title = "部门角色分配";
      },
      handleClickFlag(record){
        let that = this;
        console.log(record)
        if(record.sfqy=='1'){
          record.sfqy='2'
          sfqyBatch({id: record.id, sfqy: 2}).then((res) => {
            if (res.success) {
              that.$message.success(res.message);
              that.loadData();
            } else {
              that.$message.warning(res.message);
            }
          });
        }else{
          record.sfqy='1'
          sfqyBatch({id: record.id, sfqy: 1}).then((res) => {
            if (res.success) {
              that.$message.success(res.message);
              that.loadData();
            } else {
              that.$message.warning(res.message);
            }
          });

        }
      },

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>