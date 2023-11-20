<template>
  <div>
    <a-row :gutter="10">
      <a-col :md="4" :sm="24">
        <a-card :bordered="false">
          <div style="background: #fff;padding-left:16px;height: 100%; margin-top: 5px">
            <a-button  @click="handleAdd"  size="small" type="primary">
              新增
            </a-button >
            <a-divider type="vertical" />
            <a-button @click="handleEdit"  size="small" type="primary">
              修改
            </a-button>
            <a-divider type="vertical" />
            <a-button @click="handleDel"  size="small" type="primary">
              删除
            </a-button>
            <a-divider />
            <!-- 树-->
            <template>
              <a-directory-tree
                selectable
                :selectedKeys="selectedKeys"
                :checkStrictly="true"
                @select="onSelect"
                :dropdownStyle="{maxHeight:'200px',overflow:'auto'}"
                :treeData="dpJdTree"
              />
            </template>

          </div>
        </a-card>
      </a-col>
      <a-col :md="20" :sm="24">
        <a-card :bordered="false">
          <PmaFParamList ref="PmaFParamList" ></PmaFParamList>
        </a-card>
      </a-col>
    </a-row>
   <munu-modal ref="modalForm" @ok="modalFormOk"></munu-modal>
  </div>

</template>
<script>
  import {queryDpJdTreeList, searchBpJdByKeywords} from '@/api/api'
  import {queryParamMenuTree } from '@/api/pams'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import MunuModal  from './modules/MunuModal'
  import PmaFParamList from './modules/PmaFParamList'
  import { deleteAction, getAction,downFile } from '@/api/manage'



  export default {
    name: 'KhfaMain',
    mixins: [JeecgListMixin],
    components: {
      PmaFParamList,MunuModal
    },
    data() {
      return {
        currentDeptId: '',
        iExpandedKeys: [],
        loading: false,
        autoExpandParent: true,
        currFlowId: '',
        currFlowName: '',
        disable: true,
        visible: false,
        dpJdTree: [],
        rightClickSelectedKey: '',
        hiding: true,
        model: {},
        dropTrigger: '',
        depart: {},
        disableSubmit: false,
        checkedKeys: [],
        selectedKeys: [],
        dpjdxx:{},
        autoIncr: 1,
        currSelected: {},
        form: this.$form.createForm(this),
        labelCol: {
          xs: {span: 24},
          sm: {span: 5}
        },
        wrapperCol: {
          xs: {span: 24},
          sm: {span: 16}
        },
        graphDatasource: {
          nodes: [],
          edges: []
        },
        url: {
          delete: "/csgl/csml/pmaFParamMenu/delete",
        },
      }
    },
    methods: {
      handleAdd(){
       console.log(this.selectedKeys[0])
        if (this.selectedKeys[0] == ''||this.selectedKeys[0]==undefined) {
          this.$message.error("请选择一个节点!")
        } else {
          console.log('dpJdTree',this.dpJdTree)
          console.log('1111',this.selectedKeys[0])
          this.$refs.modalForm.add(this.selectedKeys[0]);
          this.$refs.modalForm.title = "新增";
          this.$refs.modalForm.disableSubmit = false;
        }
      },
      handleEdit(){
        if (this.selectedKeys[0] == ''||this.selectedKeys[0]==undefined) {
          this.$message.error("请选择一个节点!")
        } else {
          console.log('dpJdTree',this.dpJdTree)
          this.$refs.modalForm.edit(this.dpjdxx);
          this.$refs.modalForm.title = "编辑";
          this.$refs.modalForm.disableSubmit = false;
        }
      },
      handleDel(){
        if (this.selectedKeys[0] == ''||this.selectedKeys[0]==undefined) {
          this.$message.error("请选择一个节点!")
        } else {
          if(this.dpjdxx.id==1){
            this.$message.error("顶级节点不能删除！")
          }else{
            var that = this;
            deleteAction(that.url.delete, {id: this.dpjdxx.id}).then((res) => {
              if (res.success) {
                that.$message.success(res.message);
                that.refresh();
              } else {
                that.$message.warning(res.message);
              }
            });
          }

        }
      },
      callback(key) {
        console.log(key)
      },
      loadData() {
        this.refresh();
      },
      modalFormOk() {
        this.refresh();
      },
      loadTree() {
        var that = this
        that.dpJdTree = []
        queryParamMenuTree().then((res) => {
          if (res.success) {
            for (let i = 0; i < res.result.length; i++) {
              let temp = res.result[i]
              that.dpJdTree.push(temp)
              that.setThisExpandedKeys(temp)
              this.selectedKeys=[]
              this.$refs.PmaFParamList.onClearSelected();
              this.$refs.PmaFParamList.open({id:1});
              // console.log(temp.id)
            }
            this.loading = false
          }
        })
      },
      setThisExpandedKeys(node) {
        if (node.children && node.children.length > 0) {
          this.iExpandedKeys.push(node.key)
          for (let a = 0; a < node.children.length; a++) {
            this.setThisExpandedKeys(node.children[a])
          }
        }
      },
      refresh() {
        this.loading = true
        this.loadTree()
      },

      onSelect(selectedKeys, e) {
        console.log('selectedKeys',selectedKeys[0])
        if (this.selectedKeys[0] !== selectedKeys[0]) {
          this.selectedKeys = [selectedKeys[0]];
        }
        let record = e.node.dataRef;
        this.dpjdxx=record;
        console.log('record',this.dpjdxx)
        this.checkedKeys.push(record.menuId);
        this.$refs.PmaFParamList.onClearSelected();
        this.$refs.PmaFParamList.open(record);
      },
    },
    created() {
      this.currFlowId = this.$route.params.id
      this.currFlowName = this.$route.params.name
      // this.loadTree()
    },
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>