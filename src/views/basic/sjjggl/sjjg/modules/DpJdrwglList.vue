<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="任务名称">
              <a-input placeholder="请输入任务名称" v-model="queryParam.rwmc"></a-input>
            </a-form-item>
          </a-col>

        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="节点id">
              <a-input placeholder="请输入节点id" v-model="queryParam.jdid"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="是否启用">
              <a-input placeholder="请输入是否启用" v-model="queryParam.sfqy"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="最近一次执行时间">
              <a-input placeholder="请输入最近一次执行时间" v-model="queryParam.zjyczxsj"></a-input>
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
        <span slot="sfqy" slot-scope="text, record" >
          <a-switch v-model="record.sfqy=='1'"  @change="handleClickFlag(record)"  />
        </span>
        <span slot="action" slot-scope="text, record">
          <Button   type="warning" size="small"  @click="viewRl(record)">查看日历</Button>
          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a @click="handleEdit(record)">编辑</a>
              </a-menu-item>
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
    <dpJdrwgl-modal ref="modalForm" @ok="modalFormOk"></dpJdrwgl-modal>
    <dp-rwrl-list ref="rwrlForm" @ok="modalFormOk"></dp-rwrl-list>
  </a-card>
</template>

<script>
  import DpJdrwglModal from './DpJdrwglModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import {getAction, postAction, deleteAction} from '@/api/manage'
  import {sfqyBatch} from '@/api/api'
  import DpRwrlList from './DpRwrlList'

  export default {
    name: "DpJdrwglList",
    mixins:[JeecgListMixin],
    components: {
      DpJdrwglModal,DpRwrlList
    },
    data () {
      return {
        description: '节点任务管理管理页面',
        currentDeptId:'',
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
            title: '节点目录',
            align:"center",
            dataIndex: 'jdid_dictText'
          },
		   {
            title: '任务名称',
            align:"center",
            dataIndex: 'rwmc'
           },
		   {
            title: '任务存储过程',
            align:"center",
            dataIndex: 'rwgc'
           },

          {
            title: '是否启用',
            dataIndex: 'sfqy',
            scopedSlots: {customRender: 'sfqy'},
            align: "center",
          },
		   {
            title: '最近一次统计日期',
            align:"center",
            dataIndex: 'zjyczxsj'
           },

		     {
            title: '最近一次执行耗时',
            align:"center",
            dataIndex: 'zjyczxhs'
           },
          {
            title: '最近一次执行状态',
            align:"center",
            dataIndex: 'zjyczxzt_dictText'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/system/dpJdrwgl/list",
          delete: "/system/dpJdrwgl/delete",
          deleteBatch: "/system/dpJdrwgl/deleteBatch",
          exportXlsUrl: "system/dpJdrwgl/exportXls",
          importExcelUrl: "system/dpJdrwgl/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      searchReset() {
        this.queryParam = {}
        this.currentDeptId = '';
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
        params.jdid = this.currentDeptId;
        getAction(this.url.list, params).then((res) => {
          if (res.success && res.result) {
            this.dataSource = res.result.records;
            this.ipagination.total = res.result.total;
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
        //console.log(record);
        this.currentDeptId = record.id;
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
        this.$refs.modalForm.title = "编辑";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.edit(record);
      },
      handleAdd: function () {
        if (this.currentDeptId == '') {
          this.$message.error("请选择一个节点目录!")
        } else {
          this.$refs.modalForm.disableSubmit = true;
          this.$refs.modalForm.add(this.currentDeptId);
          this.$refs.modalForm.title = "新增";
        }
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