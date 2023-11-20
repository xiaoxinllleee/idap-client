<template>
  <div>
    <a-card :bordered="false">
      <!-- 查询区域 -->
      <div class="table-page-search-wrapper">
        <a-form layout="inline" @keyup.enter.native="searchQuery">
          <a-row :gutter="24">
            <a-col :md="12" :sm="24">
              <a-form-item label="考核项目名称">
                <a-input placeholder="请输入考核项目名称" v-model="queryParam.schemeName"></a-input>
              </a-form-item>
            </a-col>

            <a-col :md="12" :sm="24">
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
        <a-button @click="handleAdd"  :disabled="flag" type="primary" icon="plus" v-has="'PmaASheme:add'">新增考核项目</a-button>
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
          :scroll="{x:1200}"
          :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
          @change="handleTableChange">


        <span slot="sfqy" slot-scope="text, record" >
          <a-switch v-model="record.sfqy=='1'"  @change="handleClickFlag(record)"  />
        </span>

          <span slot="action" slot-scope="text, record">
<!--          <Button   type="warning" size="small"  @click="viewRl(record)">查看日历</Button>-->
          <a @click="handleEdit(record)" v-has="'PmaASheme:edit'">编辑</a>
          <a-divider type="vertical" />
            <a @click="viewIndexInfo(record)" v-has="'PmaASheme:view'">查看指标</a>
          <a-divider type="vertical" />
         <a-popconfirm title="删除此考核项目会导致与此关联的所有考核设置与考核结果失效，是否确定删除?" @confirm="() => handleDelete(record.id)">
                  <a v-has="'PmaASheme:delete'">删除</a>
          </a-popconfirm>

        </span>

        </a-table>
      </div>
      <!-- table区域-end -->

      <!-- 表单区域 -->
      <!--    <dpJdrwgl-modal ref="modalForm" @ok="modalFormOk"></dpJdrwgl-modal>
          <dp-rwrl-list ref="rwrlForm" @ok="modalFormOk"></dp-rwrl-list>-->

      <KhfaEdits ref="khfaEdit" @ok="modalFormOk"></KhfaEdits>
      <scheme-and-index-info-modal ref="indexInfo"></scheme-and-index-info-modal>
<!--      <KhfaEdit
        v-if="showKhfaEdit"
        @close="showKhfaEdit=false"
        :nodeEditData="nodeEditData"
        @submited="getDataList"
      />-->
    </a-card>

  </div>

</template>

<script>
  import KhfaEdits from './KhfaEdits'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import {getAction, postAction, deleteAction} from '@/api/manage'
  import {sfqyBatchPma} from '@/api/api'
  import SchemeAndIndexInfoModal from '@views/pams/khlc/khfagl/modules/SchemeAndIndexInfoModal'
  //import DpRwrlList from './DpRwrlList'

  export default {
    name: "DpJdrwglList",
    mixins:[JeecgListMixin],
    components: {
     KhfaEdits,SchemeAndIndexInfoModal
    },
    data () {
      return {
        nodeEditData:{},
        flag:true,
        description: '方案管理数据页面',
        currentDeptId:'',
        showKhfaEdit:false,
        // 表头
        columns: [
          {
            title: '序号',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
          },

          /*{
            title: '考核方案ID',
            align:"center",
            dataIndex: 'schemeId'
          },*/
          {
            title: '所属方案',
            align:"center",
            dataIndex: 'menuId_dictText'
          },
          {
            title: '考核项目',
            align:"center",
            dataIndex: 'schemeName'
          },

          {
            title: '考核场景',
            align:"center",
            dataIndex: 'checkScene_dictText'
          },
          {
            title: '评价对象类型',
            align:"center",
            dataIndex: 'evlObjType_dictText',
            width: 110,
          },

          {
            title: '是否启用',
            dataIndex: 'sfqy',
            scopedSlots: {customRender: 'sfqy'},
            align: "center",
            width: 80,
          },
          {
            title: '创建人',
            align: "center",
            dataIndex: 'createBy_dictText',
            width: 80,
          },
          {
            title: '创建时间',
            align: "center",
            dataIndex: 'createTime',
            width: 100,
          },
          {
            title: '修改人',
            align: "center",
            dataIndex: 'updateBy_dictText',
            width: 80,
          },
          {
            title: '修改时间',
            align: "center",
            dataIndex: 'updateTime',
            width: 100,
          },

         /* {
            title: '机构等级',
            align:"center",
            dataIndex: 'orgLevel'
          },
          {
            title: '方案所属机构',
            align:"center",
            dataIndex: 'orgId'
          },*/

          /*{
            title: '业务条线编号',
            align:"center",
            dataIndex: 'bussSysNo'
          },*/
          /*{
            title: '描述',
            align:"center",
            dataIndex: 'remark'
          },*/
          /*{
            title: '生效日期',
            align:"center",
            dataIndex: 'startDate'
          },
          {
            title: '失效日期',
            align:"center",
            dataIndex: 'endDate'
          },
          {
            title: '考核场景',
            align:"center",
            dataIndex: 'checkScene'
          },
          {
            title: '评价对象类型',
            align:"center",
            dataIndex: 'evlObjType'
          },
          {
            title: '特殊规则类型',
            align:"center",
            dataIndex: 'speRuleType'
          },
          {
            title: '数据删除标志',
            align:"center",
            dataIndex: 'statFlag'
          },*/
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            fixed: 'right',
            scopedSlots: { customRender: 'action' },
          }
        ],
        url: {
            list: "/khlc/khfagl/pmaAScheme/list",
            delete: "/khlc/khfagl/pmaAScheme/delete",
            deleteBatch: "/khlc/khfagl/pmaAScheme/deleteBatch",
            exportXlsUrl: "khlc/khfagl/pmaAScheme/exportXls",
            importExcelUrl: "khlc/khfagl/pmaAScheme/importExcel",
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
        params.menuId = this.currentDeptId;
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
        this.currentDeptId = record.menuId;
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
      viewIndexInfo: function (record) {
        this.$refs.indexInfo.title = "查看";
        this.$refs.indexInfo.disableSubmit = false;
        this.$refs.indexInfo.edit(record);
      },

      handleEdit: function (record) {
        this.$refs.khfaEdit.title = "编辑";
        this.$refs.khfaEdit.disableSubmit = false;
        this.$refs.khfaEdit.edit(record);
      },
      handleAdd: function () {
        if (this.currentDeptId == '') {
          this.$message.error("请选择一个节点目录!")
        } else {
          //this.showKhfaEdit = true;
          this.$refs.khfaEdit.title = "新增方案";
          this.$refs.khfaEdit.disableSubmit = false;
          this.$refs.khfaEdit.add(this.currentDeptId);
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
          sfqyBatchPma({id: record.id, sfqy: 2}).then((res) => {
            if (res.success) {
              that.$message.success(res.message);
              that.loadData();
            } else {
              that.$message.warning(res.message);
            }
          });
        }else{
          record.sfqy='1'
          sfqyBatchPma({id: record.id, sfqy: 1}).then((res) => {
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