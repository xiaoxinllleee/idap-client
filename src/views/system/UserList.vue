<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="12">
            <a-form-item label="工号/账号">
              <a-input placeholder="请输入工号/账号" v-model="queryParam.username"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="员工姓名">
              <j-input placeholder="请输入员工姓名(可模糊查询)" v-model="queryParam.realname"></j-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="柜员号">
              <a-input placeholder="请输入柜员号" v-model="queryParam.gyh"></a-input>
            </a-form-item>
          </a-col>


          <!--<template v-if="toggleSearchStatus">
          </template>
          <a-col :md="6" :sm="8">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>-->
        </a-row>
        <a-row :gutter="24">
        <a-col :md="6" :sm="8">
          <a-form-item label="员工类型">
            <j-dict-select-tag placeholder="请选择员工类型" v-model="queryParam.yglx" dict-code="yglx"></j-dict-select-tag>
          </a-form-item>
        </a-col>
          <a-col :md="6" :sm="8">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>
        </a-row>

      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator" style="border-top: 5px">
      <a-button @click="handleAdd" v-has="'user:add'" type="primary" icon="plus">添加用户</a-button>
      <a-button icon="download" @click="handleExportXls('用户信息')">导出</a-button>
      <a-button icon="import" @click="excelImport">导入</a-button>
      <a-button icon="reload" @click="syncRgxx" :loading="loading">同步入岗信息</a-button>

      <!--<a-button type="primary" icon="hdd" @click="recycleBinVisible=true">回收站</a-button>-->
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay" @click="handleMenuClick">
          <a-menu-item key="1">
            <a-icon type="delete" @click="batchDel"/>
            删除
          </a-menu-item>
          <a-menu-item key="2">
            <a-icon type="lock" @click="batchFrozen('2')"/>
            冻结
          </a-menu-item>
          <a-menu-item key="3">
            <a-icon type="unlock" @click="batchFrozen('1')"/>
            解冻
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作
          <a-icon type="down"/>
        </a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i>已选择&nbsp;<a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项&nbsp;&nbsp;
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        bordered
        size="middle"
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <template slot="avatarslot" slot-scope="text, record, index">
          <div class="anty-img-wrap">
            <a-avatar shape="square" :src="getAvatarView(record.avatar)" icon="user"/>
          </div>
        </template>

        <span slot="pcFlag" slot-scope="text, record" >
          <a-switch v-model="record.pcFlag=='1'" @change="handleClickPcFlag(record)"  />
        </span>
        <span slot="appFlag" slot-scope="text, record">
           <a-switch v-model="record.appFlag=='1'" @click="handleClickAppFlag(record)" />
        </span>
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'user:edit'">编辑</a>

          <a-divider type="vertical" v-has="'user:edit'"/>

          <a-dropdown>
            <a class="ant-dropdown-link"> 更多 <a-icon type="down"/>
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a href="javascript:;" @click="handleDetail(record)">详情</a>
              </a-menu-item>

              <a-menu-item>
                <a href="javascript:;" @click="handleChangePassword(record.username)">密码</a>
              </a-menu-item>

              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>

              <a-menu-item v-if="record.status==1">
                <a-popconfirm title="确定冻结吗?" @confirm="() => handleFrozen(record.id,2,record.username)">
                  <a>冻结</a>
                </a-popconfirm>
              </a-menu-item>

              <a-menu-item v-if="record.status==2">
                <a-popconfirm title="确定解冻吗?" @confirm="() => handleFrozen(record.id,1,record.username)">
                  <a>解冻</a>
                </a-popconfirm>
              </a-menu-item>

              <!--<a-menu-item>
                <a href="javascript:;" @click="handleAgentSettings(record.username)">代理人</a>
              </a-menu-item>-->

            </a-menu>
          </a-dropdown>
        </span>


      </a-table>
    </div>
    <!-- table区域-end -->

    <user-modal ref="modalForm" @ok="modalFormOk"></user-modal>

    <password-modal ref="passwordmodal" @ok="passwordModalOk"></password-modal>

    <sys-user-agent-modal ref="sysUserAgentModal"></sys-user-agent-modal>

    <!-- 用户回收站 -->
    <user-recycle-bin-modal :visible.sync="recycleBinVisible" @ok="modalFormOk"/>
    <excel-import ref="excelImportModal" @ok="importComplete"/>

  </a-card>
</template>

<script>
  import UserModal from './modules/UserModal'
  import PasswordModal from './modules/PasswordModal'
  import {putAction,getFileAccessHttpUrl} from '@/api/manage';
  import { frozenBatch, pcBatch, appBatch, syncGwxxZzbz } from '@/api/api'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import SysUserAgentModal from "./modules/SysUserAgentModal";
  import JInput from '@/components/jeecg/JInput'
  import UserRecycleBinModal from './modules/UserRecycleBinModal'
  import ExcelImport from '@/components/common/ExcelImport'

  export default {
    name: "UserList",
    mixins: [JeecgListMixin],
    components: {
      SysUserAgentModal,
      UserModal,
      PasswordModal,
      JInput,
      UserRecycleBinModal,
      ExcelImport
    },
    data() {
      return {
        recycleBinVisible: false,
        description: '用户管理页面',
        pcFlagV:'',
        appFlagV:'',
        queryParam: {},
        columns: [
          // {
          //   title: '#',
          //   dataIndex: '',
          //   key:'rowIndex',
          //   width:60,
          //   align:"center",
          //   customRender:function (t,r,index) {
          //     return parseInt(index)+1;
          //   }
          // },
          {
            title: '工号/账号',
            align: "center",
            dataIndex: 'username',
          },
          {
            title: '员工姓名',
            align: "center",
            dataIndex: 'realname',
          },
          {
            title: '员工类型',
            align: "center",
            dataIndex: 'yglx_dictText',
          },
          {
            title: '柜员号',
            align: "center",
            dataIndex: 'gyh',
          },
          // {
          //   title: '客户经理编号',
          //   align: "center",
          //   dataIndex: 'khjlbh',
          // },
          {
            title: '手机号码',
            align: "center",
            dataIndex: 'phone'
          },
          {
            title: '邮箱',
            align: "center",
            dataIndex: 'email'
          },
          // {
          //   title: '头像',
          //   align: "center",
          //   width: 120,
          //   dataIndex: 'avatar',
          //   scopedSlots: {customRender: "avatarslot"}
          // },
         {
            title: '性别',
            align: "center",
            width: 80,
            dataIndex: 'sex_dictText'
          },
          // {
          //   title: '生日',
          //   align: "center",
          //   width: 100,
          //   dataIndex: 'birthday'
          // },
          // {
          //   title: '登录部门',
          //   align: "center",
          //   width: 180,
          //   dataIndex: 'orgCode_dictText'
          // },
          {
            title: '权限组织',
            align: "center",
            width: 180,
            dataIndex: 'orgCode_dictText'
          },
          {
            title: '角色',
            align: "center",
            width: 120,
            dataIndex: 'roles_dictText'
          },
          {
            title: '员工状态',
            align: "center",
            width: 100,
            dataIndex: 'ygzt_dictText',
          },
          {
            title: '状态',
            align: "center",
            width: 80,
            dataIndex: 'status_dictText'
          },
          // {
          //   title: '创建时间',
          //   align: "center",
          //   width: 150,
          //   dataIndex: 'createTime',
          //   sorter: true
          // },
          {
            title: 'PC登录',
            dataIndex: 'pcFlag',
            scopedSlots: {customRender: 'pcFlag'},
            align: "center",
          },
          {
            title: 'APP登录',
            dataIndex: 'appFlag',
            scopedSlots: {customRender: 'appFlag'},
            align: "center",
          },
          {
            title: '操作',
            dataIndex: 'action',
            scopedSlots: {customRender: 'action'},
            align: "center",
            width: 170
          }
        ],
        url: {
          imgerver: window._CONFIG['staticDomainURL'],
          syncUser: "/process/extActProcess/doSyncUser",
          list: "/sys/user/list",
          delete: "/sys/user/delete",
          deleteBatch: "/sys/user/deleteBatch",
          exportXlsUrl: "/sys/user/exportXls",
          importExcelUrl: "/sys/user/importExcel",
          exportTemplateUrl: "/sys/user/exportTemplateXls",
        },
        exportTemplateName: '用户管理导入模板',

      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      syncRgxx(){
        let that = this;
        that.$confirm({
          title:'确认操作',
          okText: '确定',
          cancelText: '取消',
          content: '改操作会将用户信息匹配入岗信息，将入岗信息中的组织标志同步到用户表的组织权限，确定同步吗?',
          onOk: () => {
            that.loading=true
            syncGwxxZzbz(null).then((res)=>{
              if (res.success) {
                that.loading=false
                that.$message.success(res.message);
                that.loadData();
                that.onClearSelected();
              }
            })
          },
          onCancel: e => {
            if (e.triggerCancel) {
              // 点击x或者按键盘esc关闭的弹窗
              return
            }
            // 函数体 方法
            e()
          }
        })
      },
      handleClickPcFlag(record){
        let that = this;
        console.log(record)
        if(record.pcFlag=='1'){
          record.pcFlag='2'
          pcBatch({id: record.id, pcFlag: 2}).then((res) => {
            if (res.success) {
              that.$message.success(res.message);
              that.loadData();
              that.onClearSelected();
            } else {
              that.$message.warning(res.message);
            }
          });
        }else{
          record.pcFlag='1'
          pcBatch({id: record.id, pcFlag: 1}).then((res) => {
            if (res.success) {
              that.$message.success(res.message);
              that.loadData();
              that.onClearSelected();
            } else {
              that.$message.warning(res.message);
            }
          });

        }
      },
      handleClickAppFlag(record){
        console.log(record)
        let that = this;
        if(record.appFlag=='1'){
          record.appFlag='2'
          appBatch({id: record.id, appFlag: 2}).then((res) => {
            if (res.success) {
              that.$message.success(res.message);
              that.loadData();
              that.onClearSelected();
            } else {
              that.$message.warning(res.message);
            }
          });

        }else{
          record.appFlag='1'
          appBatch({id: record.id, appFlag: 1}).then((res) => {
            if (res.success) {
              that.$message.success(res.message);
              that.loadData();
              that.onClearSelected();
            } else {
              that.$message.warning(res.message);
            }
          });
        }
      },

      getAvatarView: function (avatar) {
        return getFileAccessHttpUrl(avatar,this.url.imgerver,"http")
      },

      batchFrozen: function (status) {
        if (this.selectedRowKeys.length <= 0) {
          this.$message.warning('请选择一条记录！');
          return false;
        } else {
          let ids = "";
          let that = this;
          let isAdmin = false;
          that.selectionRows.forEach(function (row) {
            if (row.username == 'admin') {
              isAdmin = true;
            }
          });
          if (isAdmin) {
            that.$message.warning('管理员账号不允许此操作,请重新选择！');
            return;
          }
          that.selectedRowKeys.forEach(function (val) {
            ids += val + ",";
          });
          that.$confirm({
            title: "确认操作",
            content: "是否" + (status == 1 ? "解冻" : "冻结") + "选中账号?",
            onOk: function () {
              frozenBatch({ids: ids, status: status}).then((res) => {
                if (res.success) {
                  that.$message.success(res.message);
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
      handleMenuClick(e) {
        if (e.key == 1) {
          this.batchDel();
        } else if (e.key == 2) {
          this.batchFrozen(2);
        } else if (e.key == 3) {
          this.batchFrozen(1);
        }
      },
      handleFrozen: function (id, status, username) {
        let that = this;
        //TODO 后台校验管理员角色
        if ('admin' == username) {
          that.$message.warning('管理员账号不允许此操作！');
          return;
        }
        frozenBatch({ids: id, status: status}).then((res) => {
          if (res.success) {
            that.$message.success(res.message);
            that.loadData();
          } else {
            that.$message.warning(res.message);
          }
        });
      },
      handleChangePassword(username) {
        this.$refs.passwordmodal.show(username);
      },
      handleAgentSettings(username){
        this.$refs.sysUserAgentModal.agentSettings(username);
        this.$refs.sysUserAgentModal.title = "用户代理人设置";
      },
      passwordModalOk() {
        //TODO 密码修改完成 不需要刷新页面，可以把datasource中的数据更新一下
      }
    }

  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>