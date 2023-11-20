<template>
  <a-drawer
    :title="title"
    :maskClosable="true"
    width=800
    placement="right"
    :closable="true"
    @close="close"
    :visible="visible"
    style="height: calc(100% - 5px);overflow: auto;padding-bottom: 53px;">
    <a-form>
      <a-row :gutter="24">
        <a-col :span="16">
          <a-card title="菜单权限" :loading="treeLoading" :headStyle="{backgroundColor:'rgb(234, 234, 234)'}">
            <a-empty v-if="!treeData || treeData.length ===0"/>
            <a-tree
            checkable
            @check="onCheck"
            :checkedKeys="checkedKeys"
            :treeData="treeData"
            @expand="onExpand"
            @select="onTreeNodeSelect"
            :replaceFields="{ key:'id'}"
            :selectedKeys="selectedKeys"
            :expandedKeys="expandedKeysss"
            :checkStrictly="checkStrictly">
            <span slot="hasDatarule" slot-scope="{slotTitle,ruleFlag}">
            {{ slotTitle }}<a-icon v-if="ruleFlag" type="align-left" style="margin-left:5px;color: red;"></a-icon>
            </span>
            </a-tree>
          </a-card>
        </a-col>
      </a-row>
    </a-form>


    <div class="drawer-bootom-button">
      <a-dropdown style="float: left" :trigger="['click']" placement="topCenter">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="switchCheckStrictly(1)">父子关联</a-menu-item>
          <a-menu-item key="2" @click="switchCheckStrictly(2)">取消关联</a-menu-item>
          <a-menu-item key="3" @click="checkALL">全部勾选</a-menu-item>
          <a-menu-item key="4" @click="cancelCheckALL">取消全选</a-menu-item>
          <a-menu-item key="5" @click="expandAll">展开所有</a-menu-item>
          <a-menu-item key="6" @click="closeAll">合并所有</a-menu-item>
        </a-menu>
        <a-button>
          树操作 <a-icon type="up" />
        </a-button>
      </a-dropdown>
      <a-popconfirm title="确定放弃编辑？" @confirm="close" okText="确定" cancelText="取消">
        <a-button style="margin-right: .8rem">取消</a-button>
      </a-popconfirm>
      <a-button @click="handleSubmit(false)" type="primary" :loading="loading" style="margin-right: .8rem">提交</a-button>
      <a-button @click="handleSubmit(true)" type="primary" :loading="loading">提交并关闭</a-button>
    </div>

    <role-datarule-modal ref="datarule"></role-datarule-modal>

  </a-drawer>

</template>
<script>
  import {queryTreeListForRole,queryRolePermission,saveRolePermission,getAllSubSystemList,queryRoleSubSystem} from '@/api/api'
  import RoleDataruleModal from './RoleDataruleModal.vue'
  import { getAction,postAction} from '@/api/manage'


  export default {
    name: "RoleModal",
    components:{
      RoleDataruleModal
    },
    data(){
      return {
        roleId:"",
        treeData: [],
        defaultCheckedKeys:[],
        checkedKeys:[],
        expandedKeysss:[],
        allTreeKeys:[],
        autoExpandParent: true,
        checkStrictly: true,
        title:"角色权限配置",
        visible: false,
        loading: false,
        selectedKeys:[],
        subSystemAllList:[],
        subSystemIdChecked:[],
        subSystemIdSelected:[],
        replaceFields: {title:'xtmc',key:'id'},
        checked: false,
        submit: false,
        treeLoading: false,
        treeDisabled: false,
      }
    },
    methods: {
      onTreeNodeSelect(id){
        if(id && id.length>0){
          this.selectedKeys = id
        }
        this.$refs.datarule.show(this.selectedKeys[0],this.roleId)
      },
      onCheck (o) {
        if(this.checkStrictly){
          this.checkedKeys = o.checked;
        }else{
          this.checkedKeys = o
        }
        this.checked = true
        this.submit = false
      },
      show(roleId){
        this.roleId=roleId
        this.visible = true;
        this.getAll();
      },
      close () {
        this.reset()
        this.$emit('close');
        this.visible = false;
      },
      onExpand(expandedKeys){
        this.expandedKeysss = expandedKeys;
        this.autoExpandParent = false
      },
      reset () {
        this.expandedKeysss = []
        this.checkedKeys = []
        this.defaultCheckedKeys = []
        this.loading = false
      },
      expandAll () {
        this.expandedKeysss = this.allTreeKeys
      },
      closeAll () {
        this.expandedKeysss = []
      },
      checkALL () {
        this.checkedKeys = this.allTreeKeys
      },
      cancelCheckALL () {
        //this.checkedKeys = this.defaultCheckedKeys
        this.checkedKeys = []
      },
      switchCheckStrictly (v) {
        if(v==1){
          this.checkStrictly = false
        }else if(v==2){
          this.checkStrictly = true
        }
      },
      handleCancel () {
        this.close()
      },
      handleSubmit(doClose){
        let that = this;
        let params =  {
          roleId:that.roleId,
          permissionId:that.checkedKeys.join(","),
        };
        console.log(params)
        that.loading = true;
        postAction("/system/sysRolePermissionApp/add",params).then(res=>{
          if(res.success){
            that.$message.success(res.message);
            that.loading = false;
            that.submit = true
            if (doClose) {
              that.close();
            }
          }else {
            that.$message.error(res.message);
            that.loading = false;
            // that.close();
          }
        })

      },



      getAll(){
        console.log("1111111111111111")
        getAction("/home/appHomepage/getAll").then(res=>{
          if (res.success){
            this.treeData = res.result;
            getAction("/system/sysRolePermissionApp/getRoleAppList",{roleId:this.roleId}).then(res=>{
              this.checkedKeys = [...res.result];
              this.defaultCheckedKeys = [...res.result];
            })
          }
        })
      }

    },
    created () {
      this.getAll();
    },
    // watch: {
  //   visible () {
  //     if (this.visible) {
  //       this.subSystemIdSelected = []
  //       //查询系统权限
  //       getAllSubSystemList().then((res) => {
  //         this.subSystemAllList = res.result
  //         this.subSystemIdSelected.push(this.subSystemAllList[0].id)
  //         queryRoleSubSystem({roleId: this.roleId}).then((res) => {
  //           this.subSystemIdChecked = [...res.result]
  //         })
  //         this.treeLoading = true
  //         this.treeDisabled = true
  //         let subSystemId = this.subSystemAllList[0].id
  //         queryTreeListForRole({subSystemId: subSystemId}).then((res) => {
  //           this.treeData = res.result.treeList
  //           this.allTreeKeys = res.result.ids
  //           queryRolePermission({subSystemId: subSystemId, roleId:this.roleId}).then((res)=>{
  //             this.checkedKeys = [...res.result];
  //             this.defaultCheckedKeys = [...res.result];
  //             this.expandedKeysss = this.allTreeKeys;
  //             //console.log(this.defaultCheckedKeys)
  //             this.treeLoading = false
  //             this.treeDisabled = false
  //           })
  //         })
  //       })
  //     }
  //   }
  // }
  }

</script>
<style lang="less" scoped>
  .drawer-bootom-button {
    position: absolute;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    left: 0;
    background: #fff;
    border-radius: 0 0 2px 2px;
  }

</style>