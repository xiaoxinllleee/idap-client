<template>
  <div>
    <a-row :gutter="10">
      <a-col :md="4" :sm="24">
        <a-card :bordered="false">
          <div style="background: #fff;padding-left:16px;height: 100%; margin-top: 5px">
            <!--
                      <a-input-search @search="onSearch" style="width:100%;margin-top: 10px" placeholder="请输入节点名称"/>
            -->

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
          <dp-jdrwgl-list ref="DpJdrwglList" ></dp-jdrwgl-list>
        </a-card>
      </a-col>
    </a-row>
    <dpJdgl-modal ref="modalForm" @ok="modalFormOk"></dpJdgl-modal>
  </div>

</template>
<script>
  import {queryDpJdTreeList, searchBpJdByKeywords} from '@/api/api'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import DpJdglModal  from './modules/DpJdglModal'
  import DpJdrwglList from './modules/DpJdrwglList'
  import { deleteAction, getAction,downFile } from '@/api/manage'



  export default {
    name: 'SjjgList',
    mixins: [JeecgListMixin],
    components: {
      DpJdglModal,DpJdrwglList
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
          delete: "/system/dpJdgl/delete",
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
        queryDpJdTreeList().then((res) => {
          if (res.success) {
            for (let i = 0; i < res.result.length; i++) {
              let temp = res.result[i]
              that.dpJdTree.push(temp)
              that.setThisExpandedKeys(temp)
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

      onExpand(expandedKeys) {
        // console.log('onExpand', expandedKeys)
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.iExpandedKeys = expandedKeys
        this.autoExpandParent = false
      },

      onSearch(value) {
        let that = this
        if (value) {
          searchBpJdByKeywords({keyWord: value}).then((res) => {
            if (res.success) {
              that.dpJdTree = []
              for (let i = 0; i < res.result.length; i++) {
                let temp = res.result[i]
                that.dpJdTree.push(temp)
              }
            } else {
              that.$message.warning(res.message)
            }
          })
        } else {
          that.loadTree()
        }

      },
      onCheck(checkedKeys, e) {
        let record = e.node.dataRef;
        // console.log('onCheck', checkedKeys, e);
        this.checkedKeys = [];
        // if (e.checked === true) {
        this.currentDeptId = record.id;
        this.checkedKeys.push(record.id);
        this.$refs.DpJdrwglList.open(record);

        this.hiding = false;
        // this.checkedKeys = checkedKeys.checked
      },
      onSelect(selectedKeys, e) {
        console.log('selectedKeys',selectedKeys[0])
        if (this.selectedKeys[0] !== selectedKeys[0]) {
          this.selectedKeys = [selectedKeys[0]];
        }
        let record = e.node.dataRef;
        this.dpjdxx=record;
        console.log('record',this.dpjdxx)
        this.checkedKeys.push(record.id);
        this.$refs.DpJdrwglList.onClearSelected();
        this.$refs.DpJdrwglList.open(record);
      },
    },
    created() {
      this.currFlowId = this.$route.params.id
      this.currFlowName = this.$route.params.name
      this.loadTree()
    },
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>