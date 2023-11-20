<style lang="less">
@import "../../../styles/table-common.less";
@import "./todoManage.less";
</style>
<template>
  <div class="search">
    <grkhpjsx-modal   ref="modalForm"  @getDataList="getDataList"></grkhpjsx-modal>
    <grdkgl-modal     ref="GrdkmodalForm" @getDataList="getDataList" />
    <loan-defer-approval ref="loanDeferApproval" />

    <component :is="hrefComponent" :modalCreated="componentCreate" :modalParam="modalParam" @close="modalClose" ref="detailModal"/>
    <historicDetail v-if="showHistory" @close="showHistory=false" :procInstId="procInstId" />
    <Card v-show="!showHistory">
      <Row v-show="openSearch" @keydown.enter.native="handleSearch">
        <Form ref="searchForm" :model="searchForm" inline :label-width="70">
          <Form-item label="标题" prop="title">
            <Input
              type="text"
              v-model="searchForm.title"
              placeholder="请输入"
              clearable
              style="width: 200px"
            />
          </Form-item>
          <Form-item label="任务名称" prop="name">
            <Input
              type="text"
              v-model="searchForm.name"
              placeholder="请输入"
              clearable
              style="width: 200px"
            />
          </Form-item>
          <Form-item style="margin-left:-35px;" class="br">
            <Button @click="handleSearch" type="primary" icon="ios-search">搜索</Button>
            <Button @click="handleReset">重置</Button>
          </Form-item>
        </Form>
      </Row>
      <Row class="operation">
       <!-- <Button @click="passAll" icon="md-checkmark-circle-outline">批量通过</Button>
        <Button @click="backAll" icon="md-close">批量驳回</Button>-->
        <Button @click="getDataList" icon="md-refresh">刷新</Button>
        <Button type="dashed" @click="openSearch=!openSearch">{{openSearch ? "关闭搜索" : "开启搜索"}}</Button>
        <!--<Button type="dashed" @click="openTip=!openTip">{{openTip ? "关闭提示" : "开启提示"}}</Button>-->
      </Row>
     <!-- <Row v-show="openTip">
        <Alert show-icon>
          已选择
          <span class="select-count">{{selectCount}}</span> 项
          <a class="select-clear" @click="clearSelectAll">清空</a>
        </Alert>
      </Row>-->
      <Row>
        <Table
          :loading="loading"
          border
          :columns="columns"
          sortable="custom"
          :data="data"
          @on-sort-change="changeSort"
          @on-selection-change="showSelect"
          ref="table"
        ></Table>
      </Row>
      <Row type="flex" justify="end" class="page">
        <Page
          :current="searchForm.pageNumber"
          :total="total"
          :page-size="searchForm.pageSize"
          @on-change="changePage"
          @on-page-size-change="changePageSize"
          :page-size-opts="[10,20,50]"
          size="small"
          show-total
          show-elevator
          show-sizer
        ></Page>
      </Row>
    </Card>

    <!-- 审批操作 -->
    <Modal :title="modalTaskTitle" v-model="modalTaskVisible" :mask-closable="false" :width="500">
      <Form ref="form" :model="form" :label-width="85" :rules="formValidate">
        <FormItem label="审批意见" prop="comment">
          <Input type="textarea" v-model="form.comment" :rows="4" />
        </FormItem>

        <FormItem label="评定等级" v-show="this.form.type == 0 && this.form.sfty == 1 ">
          <Select v-model="form.pddj">
            <Option v-for="(item, i) in pddjlist" :key="i" :value="item.key">{{item.name}}</Option>
          </Select>

        </FormItem>
        <FormItem label="审批额度" v-show="this.form.type == 0 && this.form.sfty == 1 " >
          <a-input-number  :step="0.1" v-model="form.jysxed" />万元
        </FormItem>
        <FormItem label="下一审批人" prop="assignees" v-show="showAssign" :error="error">
          <Select
            v-model="form.assignees"
            placeholder="请选择或输入搜索"
            filterable
            clearable
            multiple
            :loading="userLoading"
          >
            <Option
              v-for="(item, i) in assigneeList"
              :key="i"
              :value="item.id"
              :label="item.realname"
            >
              <span style="margin-right:10px;">{{ item.realname }}</span>
              <span style="color:#ccc;">{{ item.username }}</span>
            </Option>
          </Select>
        </FormItem>
        <FormItem label="自定义搜索选择审批人" prop="assignees" v-show="isCustom" :error="error">
          <Select
            v-model="form.assignees"
            placeholder="请输入用户名搜索选择用户"
            filterable
            remote
            multiple
            :remote-method="searchUser"
            :loading="userLoading"
          >
            <Option v-for="(item, i) in userList" :value="item.id" :key="i" :label="item.realname">
              <span style="margin-right:10px;">{{ item.realname }}</span>
              <span style="color:#ccc;">{{ item.username }}</span>
            </Option>
          </Select>
        </FormItem>
        <FormItem label="下一审批人" v-show="isGateway">
          <span>分支网关处暂不支持自定义选择下一审批人，将发送给下一节点所有人</span>
        </FormItem>
        <div v-show="form.type==1">
          <FormItem label="驳回至">
            <Select
              v-model="form.backTaskKey"
              filterable
              :loading="backLoading"
              @on-change="changeBackTask"
            >
              <Option v-for="(item, i) in backList" :key="i" :value="item.key">{{item.name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="指定原节点审批人" prop="assignees" v-show="form.backTaskKey!=-1" :error="error">
            <Select
              v-model="form.assignees"
              placeholder="请选择或输入搜索"
              filterable
              clearable
              multiple
              :loading="userLoading"
            >
              <Option
                v-for="(item, i) in assigneeList"
                :key="i"
                :value="item.id"
                :label="item.realname"
              >
                <span style="margin-right:10px;">{{ item.realname }}</span>
                <span style="color:#ccc;">{{ item.username }}</span>
              </Option>
            </Select>
          </FormItem>
        </div>
        <FormItem label="选择委托人" prop="userId" :error="error" v-show="form.type==2">
          <Select
            v-model="form.userId"
            placeholder="请输入用户名搜索选择用户"
            filterable
            remote
            :remote-method="searchUser"
            :loading="userLoading"
          >
            <Option v-for="(item, i) in userList" :value="item.id" :key="i" :label="item.realname">
              <span style="margin-right:10px;">{{ item.realname }}</span>
              <span style="color:#ccc;">{{ item.username }}</span>
            </Option>
          </Select>
        </FormItem>
       <!-- <FormItem label="消息通知">
          <Checkbox v-model="form.sendMessage">站内消息通知</Checkbox>
          <Checkbox v-model="form.sendSms">短信通知</Checkbox>
          <Checkbox v-model="form.sendEmail">邮件通知</Checkbox>
        </FormItem>-->
      </Form>
      <div slot="footer">
        <Button type="text" @click="modalTaskVisible=false">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="handelSubmit">提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import {
  todoList,
  pass,
  back,
  getBackList,
  backToTask,
  delegate,
  getNextNode,
  getNode,
  passAll,
  backAll,
  getDictDataByType,
  searchUserByName,
  idapPass
} from "@/api/activiti";
import { getAction } from '@/api/manage'
import GrkhpjsxModal from './modules/GrkhpjsxModal'
import GrdkglModal from './modules/grdk/GrdkSplcModal'


import historicDetail from "../historic-detail/historicDetail.vue";
import store from '@/store/'
export default {
  name: "todo-manage",
  components: {
    historicDetail,GrkhpjsxModal,GrdkglModal,
    ckkhghyj: ()=> import('@views/pams/performance/deposit/ckkhxxgl/modules/CkkhxxglSpxxModal'),
    ckzhtzyj: ()=> import('@views/pams/performance/deposit/ckzhtzxx/modules/CkzhSpxxModal'),
    dkkhyj:()=>import('@views/pams/performance/loancustomer/dkkhzhxx/modules/DkkhSpxxModal'),
    ckkhrl: ()=> import('@views/yjgs/ckkhdfpxx/modules/YjgsCkkhdfpxxbModal'),
    ckzhrl: ()=> import('@views/yjgs/ckzhdfpxx/modules/YjgsCkzhdfpxxModal'),
    etcyxxxProcess: ()=> import('@views/ywgl/etcyxgl/etcyxxxgl/modules/EtcyxxxglTransferDetail'),
    loanApproval: ()=> import('@views/xdgl/dksp/xdspydagl/modules/XdspydaglModal'),
    creditApproval: ()=> import('@views/xdgl/dksp/xdspydagl/modules/XdspydaglModal'),
    loanApprovalHj: ()=> import('@views/xdgl/dksp/dkspkhzc/modules/DkspKhzcModal'),
    creditApprovalHj: ()=> import('@views/xdgl/dksp/dkspsxsp/modules/DkspSxspModal'),
    loanDeferApproval: ()=> import('@views/xdgl/dksp/dkzqywsp/modules/CamsZqywspYwzcModal'),
  },
  data() {
    return {
      pjsxpddj: [
        {
          key: "A",
          name: "特级"
        },
        {
          key: "B",
          name: "优秀"
        },
        {
          key: "C",
          name: "较好"
        },
        {
          key: "D",
          name: "一般"
        },
        {
          key: "E",
          name: "级外"
        }
      ],
      grdkpddj: [
        {
          name: "AAAAA",
          key: "1"
        },
        {
          name: "AAAA",
          key: "2"
        },
        {
          name: "AAA",
          key: "3"
        },
        {
          name: "AA",
          key: "4"
        },
        {
          name: "A",
          key: "5"
        },

      ],
      showHistory: false,
      procInstId: "",
      openSearch: true,
      openTip: true,
      loading: true, // 表单加载状态
      modalTaskVisible: false,
      userLoading: false,
      backLoading: false,
      userList: [],
      selectCount: 0, // 多选计数
      selectList: [], // 多选数据
      assigneeList: [],
      backList: [
        {
          key: "-1",
          name: "发起人"
        }
      ],
      pddjlist:[

      ],

      error: "",
      showAssign: false,
      searchForm: {
        // 搜索框对应data对象
        name: "",
        pageNumber: 1, // 当前页数
        pageSize: 10 // 页面大小
      },
      modalTaskTitle: "",
      modalTitle: "", // 添加或编辑标题
      khjlsxed:0,
      form: {
        id: "",
        userId: "",
        procInstId: "",
        comment: "",
        pddj:"",
        jysxed:0,
        type: 0,
        sfty:1,
        assignees: [],
        backTaskKey: "-1",
        sendMessage: true,
        sendSms: true,
        sendEmail: true,
        key: "",
        hhbm:"",
        zjhm:"",
        spid:""
      },
      formValidate: {
        // 表单验证规则
        comment: [
          { required: true, message: '审批意见不能为空', trigger: 'blur' }
        ],
      },
      submitLoading: false, // 添加或编辑提交状态
      columns: [
        // 表头
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          type: "index",
          width: 60,
          align: "center"
        },

        {
          title: "标题",
          key: "title",
          minWidth: 150,
          sortable: true
        },
        {
          title: "任务名称",
          key: "name",
          minWidth: 160
        },
        {
          title: "所属流程",
          key: "processName",
          minWidth: 150,
          render: (h, params) => {
            let text = "";
            if (params.row.version) {
              text = params.row.processName + " - v." + params.row.version;
            }
            return h("div", [h("span", text)]);
          }
        },
      /*  {
          title: "委托代办人",
          key: "owner",
          minWidth: 130,
          align: "center",
          render: (h, params) => {
            if (!params.row.owner) {
              return h("span", "-");
            }
            return h(
              "Tooltip",
              {
                props: {
                  placement: "top",
                  content: params.row.ownerUsername
                }
              },
              [
                h(
                  "Tag",
                  {
                    style: {
                      "margin-right": "8px"
                    },
                    props: {
                      type: "border"
                    }
                  },
                  params.row.owner
                )
              ]
            );
          }
        },*/
        {
          title: "流程发起人",
          key: "applyer",
          minWidth: 130,
          align: "center",
          render: (h, params) => {
            return h(
              "Tooltip",
              {
                props: {
                  placement: "top",
                  content: params.row.applyerUsername
                }
              },
              [
                h(
                  "Tag",
                  {
                    style: {
                      "margin-right": "8px"
                    },
                    props: {
                      type: "border"
                    }
                  },
                  params.row.applyer
                )
              ]
            );
          }
        },
/*        {
          title: "优先级",
          key: "priority",
          width: 100,
          sortable: true,
          render: (h, params) => {
            let text = "无",
              color = "";
            if (params.row.priority == 0) {
              text = "普通";
              color = "default";
            } else if (params.row.priority == 1) {
              text = "重要";
              color = "orange";
            } else if (params.row.priority == 2) {
              text = "紧急";
              color = "red";
            } else {
              color = "default";
            }

            return h("div", [
              h(
                "Tag",
                {
                  props: {
                    color: color
                  }
                },
                text
              )
            ]);
          }
        },
        {
          title: "状态",
          key: "isSuspended",
          align: "center",
          width: 110,
          render: (h, params) => {
            if (!params.row.isSuspended) {
              return h("div", [
                h("Badge", {
                  props: {
                    status: "success",
                    text: "已激活"
                  }
                })
              ]);
            } else if (params.row.isSuspended) {
              return h("div", [
                h("Badge", {
                  props: {
                    status: "error",
                    text: "已挂起"
                  }
                })
              ]);
            }
          },
          filters: [
            {
              label: "已激活",
              value: false
            },
            {
              label: "已挂起",
              value: true
            }
          ],
          filterMultiple: false,
          filterMethod(value, row) {
            if (value) {
              return row.isSuspended == true;
            } else if (!value) {
              return row.isSuspended == false;
            }
          }
        },*/
        {
          title: "创建时间",
          key: "createTime",
          width: 180,
          sortType: "desc",
          sortable: true
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 280,
          fixed: "right",
          render: (h, params) => {
            return h("div", [

              h(
                "Button",
                {
                  props: {
                    size: "small",
                    type: "success"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.passTask(params.row);
                    }
                  }
                },
                "通过"
              ),

              h(
                "Button",
                {
                  props: {
                    size: "small",
                    type: "warning"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.backTask(params.row);
                    }
                  }
                },
                "驳回"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.detail(params.row);
                    }
                  }
                },
                "申请详情"
              ),

             /* h(
                "Button",
                {
                  props: {
                    size: "small",
                    type: "info"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.history(params.row);
                    }
                  }
                },
                "历史"
              )*/
            ]);
          }
        }
      ],
      data: [], // 表单数据
      total: 0, // 表单数据总数
      dictPriority: [],
      isGateway: false,
      isCustom: false,
      hrefComponent: undefined,
      componentCreate: false,
      modalParam: {},
    };
  },
  methods: {
    init() {
      this.getDataList();
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
    changeSort(e) {
      this.searchForm.sort = e.key;
      this.searchForm.order = e.order;
      if (e.order == "normal") {
        this.searchForm.order = "";
      }
      this.getDataList();
    },
    changePage(v) {
      this.searchForm.pageNumber = v;
      this.getDataList();
      this.clearSelectAll();
    },
    changePageSize(v) {
      this.searchForm.pageSize = v;
      this.getDataList();
    },
    getDataList() {
      this.loading = true;
      todoList(this.searchForm).then(res => {
        this.loading = false;
        if (res.success) {
          this.data = res.result.content;
          this.total = res.result.totalElements;
        }
      });
    },
    handleSearch() {
      this.searchForm.pageNumber = 1;
      this.searchForm.pageSize = 10;
      this.getDataList();
    },
    handleReset() {
      this.$refs.searchForm.resetFields();
      this.searchForm.pageNumber = 1;
      this.searchForm.pageSize = 10;
      // 重新加载数据
      this.getDataList();
    },
    showSelect(e) {
      this.selectList = e;
      this.selectCount = e.length;
    },
    clearSelectAll() {
      this.$refs.table.selectAll(false);
    },

    sjzb(data){
      this.form.jysxed=data.jysxed;
      this.form.pddj=data.pddj;
      this.form.comment=data.comment;
      console.log('111111111')
     this.handelSubmit();
    },
    handelSubmit() {
      console.log('2222222');
      this.$refs['form'].validate((valid) => {
        if(valid) {
          this.submitLoading = true;
          if (this.form.type == 0) {
            // 通过
            if (
              (this.showAssign || this.isCustom) &&
              this.form.assignees.length < 1
            ) {
              this.error = "请至少选择一个审批人";
              this.submitLoading = false;
              return;
            } else {
              this.error = "";
            }

            if(this.form.jysxed>this.khjlsxed){
              this.$Message.error("审批额度不能大于客户经理提交的额度!");
              this.submitLoading = false;
              return;
            }

            let ret = '';
            for (let it in this.form) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(this.form[it]) + '&';
            }
            ret = ret.substring(0, ret.length - 1);
            // console.log("----------ret------------")
            console.info('ret -',ret);
            console.info('this.form.key -',this.form.key);
            if (this.form.key == 'ckkhdfpxx' ||
              this.form.key == 'ckzhdfpxx' ||
              this.form.key === 'LoanAccManaTransfer' ||
              this.form.key === 'LoanCustRecoveryTrans') {
              idapPass(ret).then(res => {
                this.submitLoading = false;
                if (res.success) {
                  this.$Message.success("操作成功！");
                  this.modalTaskVisible = false;
                  this.getDataList();
                }
              })
            } else {
              pass(ret).then(res => {
                this.submitLoading = false;
                if (res.success) {
                  this.$Message.success("操作成功！");
                  this.modalTaskVisible = false;
                  this.getDataList();
                }
              })
            }

          } else if (this.form.type == 1) {
            // 驳回
            if (this.form.backTaskKey == "-1") {
              // 驳回至发起人
              let ret = '';
              for (let it in this.form) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(this.form[it]) + '&';
              }
              ret = ret.substring(0, ret.length - 1);
              back(ret).then(res => {
                this.submitLoading = false;
                if (res.success) {
                  this.$Message.success("操作成功");
                  this.modalTaskVisible = false;
                  this.getDataList();
                }
              });
            } else {
              // 自定义驳回
              if (this.form.backTaskKey != "-1" && this.form.assignees.length < 1) {
                this.error = "请至少选择一个审批人";
                this.submitLoading = false;
                return;
              } else {
                this.error = "";
              }
              let ret = '';
              for (let it in this.form) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(this.form[it]) + '&';
              }
              ret = ret.substring(0, ret.length - 1);
              backToTask(ret).then(res => {
                this.submitLoading = false;
                if (res.success) {
                  this.$Message.success("操作成功");
                  this.modalTaskVisible = false;
                  this.getDataList();
                }
              });
            }
          } else if (this.form.type == 2) {
            // 委托
            if (!this.form.userId) {
              this.error = "请搜索选择一委托人";
              this.submitLoading = false;
              return;
            } else {
              this.error = "";
            }
            let ret = '';
            for (let it in this.form) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(this.form[it]) + '&';
            }
            ret = ret.substring(0, ret.length - 1);
            delegate(ret).then(res => {
              this.submitLoading = false;
              if (res.success) {
                this.$Message.success("操作成功");
                this.modalTaskVisible = false;
                this.getDataList();
              }
            });
          }
        } else {

        }
      })
    },
    detail(v) {
      if(v.procDefId.split(":")[0]=='sxsplc'){
        let params = Object.assign({})
        params.spid=v.businessKey;
        let record;
        // getAction('/xdgl/grkhpjsx/grpjsxspjl/list', params).then((res) => {
        getAction('/nh/vNhPjsx/list', params).then((res) => {
          if (res.success) {
            record = res.result.records[0];
            this.$refs.modalForm.edit(record);
            this.$refs.modalForm.title = "详情";
            this.$refs.modalForm.disableSubmit = true;
            this.$refs.modalForm.dafactivekey = '8';
          }
          if(res.code===510){
            this.$message.warning(res.message,5)
          }
          this.loading = false;
        })

        /* console.log('sxsplc=======================')
         console.log('hhbm:'+v.tableId)
         let query = { type: 2, id: v.tableId, backRoute: this.$route.name };
         this.$router.push({
           name: v.routeName,
           query: query
         });*/
      }else if(v.procDefId.split(":")[0]=='grdksplc'){
        console.log('grdksplc=======================')
        let params = Object.assign({})
        params.bussinessId=v.businessKey;
        console.log(v.businessKey)
        let record;
        getAction('/xdgl/grdkgl/grdksplc/list', params).then((res) => {
          if (res.success) {
            record = res.result.records[0];
            this.$refs.GrdkmodalForm.edit(record);
            this.$refs.GrdkmodalForm.title = "详情";
            this.$refs.GrdkmodalForm.disableSubmit = true;
            this.$refs.GrdkmodalForm.activeTab = '10';
            this.$refs.GrdkmodalForm.isfxjl = true;
            this.$refs.GrdkmodalForm.showSpls = true;
            this.$refs.GrdkmodalForm.iszhfxpj = true;
          }
          if(res.code===510){
            this.$message.warning(res.message,5)
          }
          this.loading = false;
        })
      }else if(v.procDefId.split(":")[0]=='ckzhdfpxx'){
        console.log('ckzhdfpxx=======================')
        let params = Object.assign({})
        params.id =v.tableId;
        console.log("id"+v.tableId)
        this.$refs.YjgsCkzhdfpxxModal.edit(v);
        this.$refs.YjgsCkzhdfpxxModal.title = "详情";
        this.$refs.YjgsCkzhdfpxxModal.disableSubmit = true;
      }else if (v.procDefId.split(":")[0]=='loanDeferApproval'){
        this.$nextTick(()=>{
          this.$refs.loanDeferApproval.showModal(v.tableId);
          this.$refs.loanDeferApproval.title = "详情";
          this.$refs.loanDeferApproval.visible = true;
        })
      } else{
        this.hrefComponent = v.procDefId.split(":")[0]
        if(store.getters.qybm=='440'){
          if (v.procDefId.split(":")[0]=='creditApproval'){
            this.hrefComponent = 'creditApprovalHj'
          }
          if (v.procDefId.split(":")[0]=='loanApproval'){
            this.hrefComponent = 'loanApprovalHj'
          }
        }
        this.modalParam = {tableId: v.tableId}
        this.$nextTick(() =>{
          this.componentCreate = true
          // this.hrefComponent.is.edit(v)
          // this.$refs['detailModal'].edit(v)
        })
      }

    },
    passTask(v) {
      console.log("--------v-----------")
      console.log(v)
      let record;
      if(v.procDefId.split(":")[0]=='sxsplc'){
      }else if(v.procDefId.split(":")[0]=='grdksplc'){
      }else{
        this.form.sfty = 2;
        this.form.key = v.procDefId.split(":")[0];
        this.modalTaskVisible = true;
      }
      this.modalTaskTitle = "审批通过";
      this.form.id = v.id;
      this.form.procInstId = v.procInstId;
      this.form.priority = v.priority;
      this.form.type = 0;
      this.form.tableId = v.tableId
      this.form.comment = ''
      this.showAssign = false;
      this.userLoading = true;
      getNextNode(v.procDefId, v.key, {tableId: v.tableId}).then(res => {
        this.userLoading = false;
        console.info("getNextNode - result -",res)
        if (res.success) {
          this.error = "";
          if (res.result.type == 3 || res.result.type == 4) {
            this.isGateway = true;
            this.showAssign = false;
            this.isCustom = false;
            return;
          }
          if (res.result.type == 5) {
            this.isCustom = true;
            this.isGateway = false;
            this.showAssign = false;
            return;
          }
          if (res.result.type == 1) {
            this.showAssign = true;
            this.isGateway = false;
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
              this.showAssign = false;
            }
          }
        }
      });

      if(v.procDefId.split(":")[0]=='sxsplc'){
        let params = Object.assign({})
        params.spid=v.businessKey;
        this.form.spid=v.businessKey;
        this.form.key ='sxsplc';
        this.pddjlist=this.pjsxpddj;
        //getAction('/xdgl/grkhpjsx/grpjsxspjl/list', params).then((res) => {
        getAction('/nh/vNhPjsx/list', params).then((res) => {
          if (res.success) {
            record = res.result.records[0];
            this.form.pddj=res.result.records[0].zzpddj;
            this.form.jysxed=res.result.records[0].zzsxed;
            this.khjlsxed=res.result.records[0].zzsxed;
            this.form.hhbm = res.result.records[0].hhbm;
            this.form.zjhm = res.result.records[0].zjhm;
            this.$refs.modalForm.edit(record);
            this.$refs.modalForm.title = "详情";
            this.$refs.modalForm.disableSubmit = false;
            this.$refs.modalForm.dafactivekey = '8';
            this.$refs.modalForm.spform = this.form;
          }
          if(res.code===510){
            this.$message.warning(res.message,5)
          }
          this.loading = false;
        })
      }
      if(v.procDefId.split(":")[0]=='grdksplc'){
        console.log('grdksplc=======================')
        let params = Object.assign({})
        params.bussinessId=v.businessKey;
        this.form.spid=v.businessKey;
        this.form.key ='grdksplc';
        this.pddjlist=this.grdkpddj;
        console.log(v.businessKey)
        let record;
        getAction('/xdgl/grdkgl/grdksplc/list', params).then((res) => {
          if (res.success) {
            record = res.result.records[0];
            console.log(record)
            this.form.pddj=res.result.records[0].pddj;
            this.form.jysxed=res.result.records[0].sxje;
            this.khjlsxed=res.result.records[0].sxje;
            this.form.hhbm = res.result.records[0].hhbm;
            this.form.zjhm = res.result.records[0].zjhm;
            this.$refs.GrdkmodalForm.edit(record);
            this.$refs.GrdkmodalForm.title = "详情";
            this.$refs.GrdkmodalForm.disableSubmit = false;
            this.$refs.GrdkmodalForm.activeTab = '10';
            this.$refs.GrdkmodalForm.isfxjl = true;
            this.$refs.GrdkmodalForm.showSpls = true;
            this.$refs.GrdkmodalForm.iszhfxpj = true;
            this.$refs.GrdkmodalForm.spform = this.form;

          }
          if(res.code===510){
            this.$message.warning(res.message,5)
          }
          this.loading = false;
        })
      }

    },
    changeBackTask(v) {
      if (v == "-1") {
        return;
      }
      this.userLoading = true;
      getNode(v).then(res => {
        this.userLoading = false;
        if (res.success) {
          if (res.result.users && res.result.users.length > 0) {
            this.assigneeList = res.result.users;
            // 默认勾选
            let ids = [];
            res.result.users.forEach(e => {
              ids.push(e.id);
            });
            this.form.assignees = ids;
          }
        }
      });
    },
    backTask(v) {
      this.modalTaskTitle = "审批驳回";
      this.form.id = v.id;
      this.form.procInstId = v.procInstId;
      this.form.procDefId = v.procDefId;
      this.form.priority = v.priority;
      this.form.type = 1;
      this.form.comment = '';
      this.showAssign = false;
      this.isCustom = false;
      this.modalTaskVisible = true;
      // 获取可驳回节点
      this.backList = [
        {
          key: "-1",
          name: "发起人"
        }
      ];
      this.form.backTaskKey = "-1";
      this.backLoading = true;
      getBackList(v.procInstId).then(res => {
        this.backLoading = false;
        if (res.success) {
          res.result.forEach(e => {
            this.backList.push(e);
          });
        }
      });
    },
    delegateTask(v) {
      this.modalTaskTitle = "委托他人代办";
      this.form.id = v.id;
      this.form.procInstId = v.procInstId;
      this.form.type = 2;
      this.showAssign = false;
      this.isCustom = false;
      this.modalTaskVisible = true;
    },
    history(v) {
      if (!v.procInstId) {
        this.$Message.error("流程实例ID不存在");
        return;
      }
      this.procInstId = v.procInstId;
      this.showHistory = true;
    },
    passAll() {
      if (this.selectCount <= 0) {
        this.$Message.warning("您还未选择要通过的数据");
        return;
      }
      // 批量通过
      this.modalVisible = true;
      this.$Modal.confirm({
        title: "确认批量通过",
        content:
          "您确认要通过所选的 " +
          this.selectCount +
          " 条数据?<br>【注意】将默认分配给节点设定的所有可审批用户，不支持自选审批人的节点",
        loading: true,
        onOk: () => {
          let ids = "";
          this.selectList.forEach(function(e) {
            ids += e.id + ",";
          });
          ids = ids.substring(0, ids.length - 1);
          passAll("ids="+ids).then(res => {
            this.$Modal.remove();
            if (res.success) {
              this.$Message.info(res.message);
              this.modalVisible = false;
              this.clearSelectAll();
              this.getDataList();
            }
          });
        }
      });
    },
    backAll() {
      if (this.selectCount <= 0) {
        this.$Message.warning("您还未选择要驳回的数据");
        return;
      }
      // 批量驳回
      this.modalVisible = true;
      this.$Modal.confirm({
        title: "确认批量驳回",
        content:
          "您确认要驳回所选的 " +
          this.selectCount +
          " 条数据? <br>【注意】所有流程将驳回至发起人",
        loading: true,
        onOk: () => {
          let procInstIds = "";
          this.selectList.forEach(function(e) {
            procInstIds += e.procInstId + ",";
          });
          procInstIds = procInstIds.substring(0, procInstIds.length - 1);
          backAll("procInstIds="+procInstIds).then(res => {
            this.$Modal.remove();
            if (res.success) {
              this.$Message.success("操作成功");
              this.modalVisible = false;
              this.clearSelectAll();
              this.getDataList();
            }
          });
        }
      });
    },
    modalClose() {
      console.log('modalClose')
      this.componentCreate = false
    }
  },
  mounted() {
    this.init();
  },
  watch: {
    // 监听路由变化
    $route(to, from) {
      if (to.name == "todo-manage") {
        this.getDataList();
      }
    }
  }
};
</script>