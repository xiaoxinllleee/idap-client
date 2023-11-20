<template>
  <div>
    <historicDetail v-if="showHistory" @close="showHistory=false" :procInstId="procInstId" />
    <a-card :bordered="false"  v-show="!showHistory">
      <!-- 查询区域 -->
      <div class="table-page-search-wrapper">
        <a-form layout="inline" @keyup.enter.native="searchQuery">
          <a-row :gutter="24">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="所属支行">
                <j-tree-select placeholder="请选择所属支行" v-model="queryParam.sszh" dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ" pidField="sjzzbz"
                               :tree-default-expand-all="true" treeNodeFilterProp="title" :filterTreeNode="true" :isAll="isAll"></j-tree-select>
              </a-form-item>
            </a-col>
            <!--<a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="所属乡镇">
                <j-dict-select-tag placeholder="请选择所属乡镇" v-model="this.yjyxdybh" dict-code="YXDYGL_YJYXDYGL,DYMC,DYBH" @change="handleChangeByYjdy" :trigger-change="true" :show-search="true"></j-dict-select-tag>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="所属村">
                <j-dict-select-tag placeholder="请选择所属村" v-model="this.ejyxdybh" @change="handleChangeByEjdy" :dict-code="dictCode" :trigger-change="true" :show-search="true"></j-dict-select-tag>
              </a-form-item>
            </a-col>
-->
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="客户名称">
                <a-input placeholder="请输入客户名称" v-model="queryParam.khmc"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="证件号码">
                <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
              </a-form-item>
            </a-col>
            <template v-if="toggleSearchStatus">
             <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="流程状态">
                <j-dict-select-tag placeholder="请选择流程状态" v-model="queryParam.status" dict-code="lczt"/>
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
        <a-button icon="download" :loading="exportLoading" @click="handleExportXls('小额农贷—授信')" v-has="'Grkhpjsx:exp'">导出</a-button>
        <a-button icon="download" :loading="exportLoadingThree"  @click="handleExportXls3()" v-has="'Grkhpjsx:expSxb'">导出授信表</a-button>
      </div>

      <!-- table区域-begin -->
      <div>
        <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
          <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
          <a style="margin-left: 24px" @click="onClearSelected">清空</a>
        </div>

        <a-table ref="table"
                 size="small"
                 bordered
                 rowKey="id"
                 :columns="columns"
                 :dataSource="dataSource"
                 :pagination="ipagination"
                 :loading="loading"
                 :scroll="{ x: 1250 }"
                 :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
                 @change="handleTableChange">

          <span slot="action" type="primary" slot-scope="text, record">

          <Button v-if="record.xtpddj == record.cpdj && record.status ==-1&&iskhjl" type="success" size="small"  @click="approval(record)" v-has="'Grkhpjsx:zjsp'">直接审批</Button>

          <Button  v-if="record.status==-1&&(record.xtpddj != record.cpdj)&&iskhjl" type="warning" size="small"  @click="handleEdit(record)" v-has="'Grkhpjsx:jrlc'">进入流程</Button>

          <Button  v-if="record.status==1&&ishz" type="info" size="small"  @click="toapply(record)" v-has="'Grkhpjsx:qsp'">去审批</Button>
          <a-divider v-if="record.status==1&&ishz" type="vertical" />
          <Button  v-if="record.status==1" type="info" size="small"  @click="showmysqjd(record)" v-has="'Grkhpjsx:ckjd'">查看进度</Button>

          <Button v-if="record.status==3||record.status==-2" type="warning" size="small"  @click="apply(record)" v-has="'Grkhpjsx:cxsq'">重新申请</Button>

          <Button v-if="record.status==2" type="error" size="small"  @click="handleEdit(record)" v-has="'Grkhpjsx:cxsx'">重新授信</Button>

          <a-divider type="vertical" />


          <a-dropdown >
             <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
             <a-menu slot="overlay">
                 <a-menu-item key="1" v-if="record.status==1||record.status==2||record.status==-1||record.status==0"  @click="ViewXxxx(record)"><Button  type="success" size="small" v-has="'Grkhpjsx:xq'">详情</Button> </a-menu-item>
                 <a-menu-item key="2" v-if="record.status==3||record.status==-2||record.status==2||record.status==-1"  @click="calculation(record)"><Button   type="primary"  size="small" v-has="'Grkhpjsx:mxjs'">模型计算</Button></a-menu-item>
                 <a-menu-item key="3" v-if="record.xtpddj == record.cpdj && record.status ==-1" @click="handleEdit(record)"><Button  type="warning" size="small" v-has="'Grkhpjsx:jrlc2'">进入流程</Button></a-menu-item>
                 <a-menu-item key="4" v-if="record.status==-2||record.status==2||record.status==3"  @click="showmysqjd(record)"><Button  type="info" size="small" v-has="'Grkhpjsx:spls'">审批历史</Button> </a-menu-item>
                 <a-menu-item key="5" v-if="record.status==1"  @click="cancel(record)"><Button  type="error" size="small" v-has="'Grkhpjsx:ch'">撤回</Button></a-menu-item>
                 <a-menu-item key="6" v-if="record.status==3||record.status==-2"  @click="handleEdit(record)"><Button  type="warning" size="small" v-has="'Grkhpjsx:xgsx'">修改授信</Button> </a-menu-item>
                 <a-menu-item key="7"  @click="view(record)"><Button  type="primary" size="small" v-has="'Grkhpjsx:yldyfj'">预览打印附件</Button></a-menu-item>
                 <a-menu-item key="8"  @click="viewModelInfo(record)"><Button  type="primary" size="small" v-has="'Grkhpjsx:mxxq'">模型详情</Button></a-menu-item>
               <!--
                 <a-menu-item key="7" v-if="record.xtpddj!=null"  @click="model(record)"><Button  type="primary" size="small">模型结果解读</Button></a-menu-item>
               -->

             </a-menu>
           </a-dropdown>
        </span>

          <span slot="status" slot-scope="status">
            <a-tag :key="status" :color="status === '未提交' ? 'blue' : status==='未申请' ? 'grey' : status==='处理中' ? 'orange' : (status==='已撤回'||status==='已驳回')? 'red' : '#87d068'"  >
              {{ status}}
            </a-tag>
          </span>

          <span slot="sskhjl" slot-scope="text, record">
            <j-ellipsis :value="text" length="4"/>
          </span>
        </a-table>
      </div>
      <!-- table区域-end -->

      <!-- 表单区域 -->
    <grkhpjsx-modal ref="modalForm" @ok="modalFormOk" @apply="apply"></grkhpjsx-modal>
      <model-info ref="modelForm"></model-info>
    </a-card>

    <Modal title="提交申请" :loading="showSqxx" v-model="modalVisible" :mask-closable="false" :width="500">
      <Form ref="form" :model="form" :label-width="85" :rules="formValidate">
        <FormItem label="选择审批人" prop="assignees" v-show="showAssign" :error="error">
          <Select placeholder="请选择或输入搜索"
                  v-model="form.assignees"
                  filterable clearable multiple
                  :loading="userLoading">
            <Option v-for="(item, i) in assigneeList" :key="i" :value="item.id" :label="item.realname">
              <span style="margin-right:10px;">{{ item.realname }}</span>
              <span style="color:#ccc;">{{ item.username }}</span>
            </Option>
          </Select>
        </FormItem>
        <FormItem label="自定义搜索选择审批人" prop="assignees" v-show="isCustom" :error="error">
          <Select placeholder="请输入用户名搜索选择用户"
                  v-model="form.assignees"
                  filterable remote multiple
                  :remote-method="searchUser" :loading="userLoading">
            <Option v-for="(item, i) in userList" :value="item.id" :key="i" :label="item.realname">
              <span style="margin-right:10px;">{{ item.realname }}</span>
              <span style="color:#ccc;">{{ item.username }}</span>
            </Option>
          </Select>
        </FormItem>
        <FormItem label="下一审批人" v-show="isGateway">
          <span>分支网关处暂不支持自定义选择下一审批人，将发送给下一节点所有人</span>
        </FormItem>
        <FormItem label="优先级" prop="priority">
          <Select v-model="form.priority" placeholder="请选择" clearable>
            <Option v-for="(item, i) in dictPriority" :key="i" :value="item.value">{{item.title}}</Option>
          </Select>
        </FormItem>
        <!-- <FormItem label="消息通知">
           <Checkbox v-model="form.sendMessage">站内消息通知</Checkbox>
           <Checkbox v-model="form.sendSms">短信通知</Checkbox>
           <Checkbox v-model="form.sendEmail">邮件通知</Checkbox>
         </FormItem>-->
      </Form>
      <div slot="footer">
        <Button type="text" @click="handelCancel">取消</Button>
        <Button type="primary" disabled :loading="submitLoading" @click="handelSubmit" >提交</Button>
      </div>
    </Modal>

    <Modal title="确认撤回" v-model="modalCancelVisible" :mask-closable="false" :width="500">
      <Form ref="delForm" v-model="cancelForm" :label-width="70">
        <FormItem label="撤回原因" prop="reason">
          <Input type="textarea" v-model="cancelForm.reason" :rows="4" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="modalCancelVisible=false">取消</Button>
        <Button type="primary"  :loading="submitLoading" @click="handelSubmitCancel">提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import GrkhpjsxModal from './modules/GrkhpjsxModal'
  import ModelInfo from './modules/ModelInfo'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '../../../components/jeecg/JTreeSelect'
  import { downFile, getAction,putAction } from '@/api/manage'

  import { mapGetters } from 'vuex'
  import store from '@/store/'
  import historicDetail from '../../activiti/historic-detail/historicDetail';

  import {
    getProcessDataList,
    getFirstNode,
    getBusinessDataList,
    applyBusiness,
    deleteBusiness,
    cancelApply,
    initActCategory,
    loadActCategory,
    searchUserByName
  } from "@/api/activiti";
  import JEllipsis from '../../../components/jeecg/JEllipsis'

  export default {
    name: "GrkhpjsxList",
    mixins:[JeecgListMixin],
    components: {
      JEllipsis,
      GrkhpjsxModal,JTreeSelect,historicDetail,ModelInfo,
    },
    data () {
      return {
        description: '小额农贷-授信',
        iskhjl:false,
        ishz:false,
        showSqxx:false,
        isAll: false,
        loading:false,
        // 表头
        yjyxdybh:"",
        ejyxdybh:"",
        showHistory: false,
        procInstId: "",
        modalVisible: false, // 提交审批窗口
        formValidate: {
          // 表单验证规则
          procDefId: [{ required: true, message: "不能为空", trigger: "blur" }],
          priority: [{ required: true, message: "不能为空", trigger: "blur" }]
        },
        dictPriority: [
          {
            value: "0",
            title: "普通"
          },
          {
            value: "1",
            title: "重要"
          },
          {
            value: "2",
            title: "紧急"
          }
        ],
        cancelForm: {
          reason: ""
        },
        modalCancelVisible: false,
        modelCancelVisible: false,
        error: "",
        assigneeList: [],
        submitLoading: false, // 添加或编辑提交状态
        form: {
          sendMessage: true,
          sendSms: true,
          sendEmail: true,
          procDefId: "",
          assignees: [],
          priority: "0"
        },
        userList: [],
        userLoading: false,
        showAssign: false,
        isGateway: false,
        isCustom: false,
        xtpdyy:"",
        columns: [
          {
            title: '所属支行',
            align:"center",
            dataIndex: 'sszh_dictText',
          },
          {
            title: '客户名称',
            align:"center",
            dataIndex: 'khmc',
            width:80
          },
          {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm',
            width:160
          },

          {
            title: '镇',
            align:"center",
            dataIndex: 'yjyxdybh_dictText',
            width:80
          },
          {
            title: '村',
            align:"center",
            dataIndex: 'ejyxdybh_dictText',
            width:80
          },
          {
            title: '组',
            align:"center",
            dataIndex: 'sjyxdybh_dictText',
            width:80
          },
          {
            title: '客户经理',
            align:"center",
            dataIndex: 'sskhjl_dictText',
            scopedSlots: { customRender: 'sskhjl' },
          },
          {
            title: '初评等级',
            align:"center",
            dataIndex: 'cpdj_dictText',
          },
          {
            title: '模型等级',
            align:"center",
            dataIndex: 'xtpddj_dictText',
          },
          {
            title: '模型得分',
            align:"center",
            dataIndex: 'xtpddf',
          },
          {
            title: '模型授信金额',
            align:"center",
            dataIndex: 'xtsxed',
            width: 120,
          },
          {
            title: '最终等级',
            align:"center",
            dataIndex: 'zzpddj_dictText',
          },
          {
            title: '最终授信',
            align:"center",
            dataIndex: 'zzsxed',
          },
          {
            title: '流程状态',
            align:"center",
            dataIndex: 'status_dictText',
            key:'status',
            fixed: 'right',
            ellipsis: true,
            scopedSlots: { customRender: 'status' },
            width:80
          },
          {
            title: '操作',
            dataIndex: 'action',
            fixed: 'right',
            align:"center",
            scopedSlots: { customRender: 'action' },
            width:220
          }
        ],
        url: {
          list: "/xdgl/grkhpjsx/list",
          delete: "/xdgl/grkhpjsx/delete",
          deleteBatch: "/xdgl/grkhpjsx/deleteBatch",
          exportXlsUrl: "xdgl/grkhpjsx/exportXls",
          exportXlsUrl2: "xdgl/grkhpjsx/downloadNotApprovalYearAudit",
          commXls: "xdgl/grkhpjsx/downloadNotApprovalYearAuditParams",
          importExcelUrl: "xdgl/grkhpjsx/importExcel",
          approvalUrl:"xdgl/grkhpjsx/approval",
        },
        record:{},
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    directives:{
      trigger:{
        inserted(el,binging){
          console.log("自动触发事件")
          el.click()
        }
      }
    },
    created(){
      this.isAll = store.getters.isRoot
      this.khjlQx();
      this.hzqxQx();
    },
    methods: {
      khjlQx(){
        let _this=this;
        putAction('/sys/user/getUserRole',{},'put').then((res) => {
          if(res.success){
            if(res.message=='true'){
              this.iskhjl=true;
            }else{
              this.iskhjl=false;
            }
            console.log('iskhjl:')
            console.log(this.iskhjl)
          }else{
            _this.$message.warning(res.message,5);
          }
        })
      },
      hzqxQx(){
        let _this=this;
        putAction('/sys/user/getUserhzRole',{},'put').then((res) => {
          if(res.success){
            if(res.message=='true'){
              this.ishz=true;
            }else{
              this.ishz=false;
            }
            console.log('hz:')
            console.log(this.ishz)
          }else{
            _this.$message.warning(res.message,5);
          }
        })
      },
      handleEdit: function (record) {
        this.record=record;
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "编辑";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.dafactivekey = '8';

      },
      ...mapGetters(["nickname", "avatar","userInfo"]),
      initQueryParams() {
        if(!store.getters.isRoot) {
          this.queryParam.sszh = store.getters.userInfo.orgCode
        }
        this.paramsInited = true
      },
      searchReset: function() {
        this.yjyxdybh = "";
        this.ejyxdybh = "";
        this.queryParam = {}
        if(!store.getters.isRoot) {
          this.queryParam.sszh = store.getters.userInfo.orgCode
        }
        this.loadData(1);
      },
      loadData: function(arg) {
        if (!this.url.list) {
          this.$message.error("请设置url.list属性!")
          return;
        }
        if (arg === 1) {
          this.ipagination.current = 1;
        }
        var params = this.getQueryParams();
        if (this.yjyxdybh) {
          params.yjyxdybh = this.yjyxdybh;
        }
        if (this.ejyxdybh) {
          params.ejyxdybh = this.ejyxdybh;
        }
        this.loading = true;
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records;
            this.ipagination.total = res.result.total;
          }
          if(res.code===510){
            this.$message.warning(res.message,5)
          }
          this.loading = false;
        })
      },
      // 一级营销单元下拉联动筛选下辖二级营销单元
      handleChangeByYjdy: function(value) {
        // 将选定值绑定至下拉选择框
        this.yjyxdybh = value;
        // 重新选择一级营销单元时清除已选择二级营销单元
        this.ejyxdybh = "";
        if (value) {
          this.dictCode = "YXDYGL_EJYXDYGL,DYMC,DYBH,YJYXDYBH=" + value;
        }
      },
      handleChangeByEjdy: function(value){
        // 将选定值绑定至下拉选择框
        this.ejyxdybh = value;
      },
      showmysqxx() {
        this.$Modal.confirm({
          title: "申请成功",
          content:
            "建议立即我的申请中提交该审批流程，是否立即跳转到我的申请?",
          onOk: () => {
            this.$router.push({
              path:'/activiti/apply-manage/applyManage'
            });
          }
        });
      },
      showmysqjd(v) {
        if (!v.procInstId) {
          this.$Message.warning("直接通过的流程,无审批历史");
          return;
        }
        console.log(v.procInstId)
        this.procInstId = v.procInstId;
        this.showHistory = true;
      },

      toapply(record) {
        this.$router.push({
          path: '/activiti/todo-manage/todoManage',
         /* query: {

            zjhm: record.hhbm,
          },*/
        })
      },

      apply(v) {
        console.log('====进入提交审批=====')
        console.log(v)
        if (!v.procDefId || v.procDefId == "null") {
          this.$Message.error("流程定义为空");
          return;
        }
        this.form.id = v.bussinessId;
        console.log("提交申请时id："+v.bussinessId)
        this.form.procDefId = v.procDefId;
        this.form.title = v.title;
        // 加载审批人
        this.userLoading = true;
        getFirstNode(v.procDefId).then(res => {
          this.userLoading = false;
          if (res.success) {
            this.error = "";
            if (res.result.type == 3 || res.result.type == 4) {
              this.isGateway = true;
              this.form.firstGateway = true;
              this.showAssign = false;
              this.isCustom = false;
              return;
            }
            if (res.result.type == 5) {
              this.isCustom = true;
              this.isGateway = false;
              this.form.firstGateway = false;
              this.showAssign = false;
              return;
            }
            if (res.result.type == 1) {
              this.showAssign = true;
              this.isGateway = false;
              this.form.firstGateway = false;
              this.isCustom = false;
              if (res.result.users && res.result.users.length > 0) {
                this.assigneeList = res.result.users;
                // 默认勾选
                let ids = [];
                res.result.users.forEach(e => {
                  ids.push(e.id);
                });
                this.form.assignees = ids;
                this.showAssign = true;
              } else {
                this.form.assignees = [];
                this.showAssign = true;
                this.error = '请进入"流程管理"为审批节点分配候选审批人员';
              }
            }

           /* setTimeout(() =>{
              this.handelSubmit();
            },1000);*/
            this.handelSubmit();
          }
        });
        this.modalVisible = false;
      },
      approval(record){
        this.loading = true;
        putAction(this.url.approvalUrl,record).then((res)=>{
          if(res.success){
            this.$Message.success("审批成功");
          }else{
            this.$Message.error("审批失败");
          }
        }).finally(() => {
          this.loadData(1);
        })
      },

      rankInfo(record){
        let formData={};
        formData.zjhm=record.zjhm;
        formData.hhbm=record.hhbm;
        getAction('/xdgl/nhxe/nhxe/existence',formData).then((res)=>{

        })
      },

      handelCancel() {
        this.modalVisible = false;
      },
      handelSubmit() {
        this.loading=true;
        this.$refs.form.validate(valid => {
          if (valid) {
            if (
              (this.showAssign || this.isCustom) &&
              this.form.assignees.length < 1
            ) {
              this.error = "请至少选择一个审批人";
              return;
            } else {
              this.error = "";
            }
            this.submitLoading = true;
            let ret = '';
            for (let it in this.form) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(this.form[it]) + '&';
            }
            ret = ret.substring(0, ret.length - 1);
            applyBusiness(ret).then(res => {
              this.submitLoading = false;
              if (res.success) {
                this.$Message.success("操作成功");
                this.modalVisible = false;
                this.loadData(1);
              }
            });
          }
        });
      },
      searchUser(v) {
        if (!v) {
          return;
        }
        this.userLoading = true;
        searchUserByName(v).then(res => {
          this.userLoading = false;
          if (res.success) {
            this.userList = res.result;
          }
        });
      },
      //撤回
      cancel(v) {
        this.cancelForm.id = v.bussinessId;
        this.cancelForm.procInstId = v.procInstId;
        this.modalCancelVisible = true;
      },
      model(record) {
        console.log(record)
        this.modelCancelVisible = true;
        this.xtpdyy = record.xtpdyy;
      },
      handelSubmitCancel() {
        this.submitLoading = true;

        let ret = '';
        for (let it in this.cancelForm) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(this.cancelForm[it]) + '&';
        }
        ret = ret.substring(0, ret.length - 1);
        cancelApply(ret).then(res => {
          this.submitLoading = false;
          if (res.success) {
            this.$Message.success("操作成功");
            this.modalCancelVisible = false;
            this.loadData(1);

          }
        });
      },

      ViewXxxx: function (record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "详情";
        this.$refs.modalForm.disableSubmit = true;
        this.$refs.modalForm.dafactivekey = '8';

      },
      calculation(record){
        let formData={};
        this.loading = true;
        formData.hhbm=record.hhbm;
        formData.zjhm=record.zjhm;
        console.log(formData)
        putAction('/xdgl/grkhpjsx/calculation',formData).then((res)=>{
          if(res.success){
            this.loadData(1);
            this.$Message.success("模型计算成功！");

          }else{
            this.$message.warning(res.message,5);
            this.loading = false;
          }
        })

      }, downloadCredit(){
        window.location.href = `${window._CONFIG['domianURL']}/`+'khgl/vKhglKrkhgl/downloadNotApprovalYearAudit'
      },
      view(record){

        let formData={};
        formData.zjhm=record.zjhm;
        formData.hhbm=record.hhbm;
        getAction('/wordinfo/camsZcsxWordinfo/xendfujian',formData).then((res)=>{
          if(res.success){
              if (res.message == "2"){
                this.$message.warning("该客户未上传过附件，请先上传附件");
                return ;
              }

              let url= `${window._CONFIG['staticDomainURL']}/`+ "xend/"+res.message;
              window.open(
                `${window._CONFIG['kkFileViewURL']}`+ '?url='+encodeURIComponent(url))

          }else{
            this.$message.warning(res.message,5);
          }
        })

      },
      viewModelInfo(record){
        let formData={};
        formData.zjhm=record.zjhm;
        formData.hhbm=record.hhbm;
        console.log(record.zjhm+" zjhm");
        console.log(record.hhbm+" hhbm");
        getAction('/grkh/camsZcsxModelInfo/getModelInfo',formData).then((res)=> {
          if (res.success){
            console.log(res.result)
            this.$refs.modelForm.edit(res.result);
            this.$refs.modelForm.title = "模型详情";
            this.$refs.modelForm.disableSubmit = true;
          }else {

          }


        })
      }

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>