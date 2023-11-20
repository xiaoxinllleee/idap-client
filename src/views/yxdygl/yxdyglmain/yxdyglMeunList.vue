<template>
  <div>
    <a-row :gutter="10">
      <a-col :md="4" :sm="24">
        <a-card :bordered="false">
          <div style="background: #fff;height: 100%; margin-top: 5px">
            <a-spin :spinning="spinning">
              <a-button  @click="handleAdd" v-has="'yxdyglMain:add'" size="small" type="primary">
                新增
              </a-button >
  <!--            <a-divider type="vertical" />-->
  <!--            <a-button @click="handleEdit"  v-has="'yxdyglMenu:update'" size="small" type="primary">
                修改
              </a-button>
              <a-divider type="vertical" />-->
  <!--            <a-popconfirm
                title="您确定删除吗?"
                ok-text="是"
                cancel-text="否"
                @confirm="handleDel"
                @cancel="handleCancel"
              >
                <a-button  size="small" type="primary" v-has="'yxdyglMain:del'">
                  删除
                </a-button>
              </a-popconfirm>-->
              <a-divider />
              <!-- 树-->
              <template>
                <a-tree
                  @select="onSelect"
                  :style="{height: treeHeight, overflowY: 'auto'}"
                  :treeData="treeData"
                  :loadData="loadGridData"
                  :replaceFields="{ title:'wgmc', key:'id', value: 'id'}"
                />

              </template>
            </a-spin>
          </div>
        </a-card>
      </a-col>
      <a-col :md="20" :sm="24">
        <a-card :bordered="false">
          <yxdygl-main-list ref="YxdyglMainList" @ok="modalFormOk"> </yxdygl-main-list>
        </a-card>
      </a-col>
    </a-row>
    <yxdygl-meun-modal ref="modalForm" @ok="modalFormOk"></yxdygl-meun-modal>

  </div>

</template>

<script>
import { deleteAction, getAction } from '@/api/manage'
import {JeecgListMixin} from '@/mixins/JeecgListMixin'
import YxdyglMainList from './YxdyglMainList'
import YxdyglMeunModal from './modules/YxdyglMeunModal'
export default {
  name: "yxdyglMeunList",
  components: {
    JeecgListMixin,YxdyglMainList,YxdyglMeunModal
  },
  data () {
    return {
      id:"",
      treeData:[],
      selectTreeData:[],
      url: {
        list: "/yxdyglmain/yxdyglMain/list",
        delete: "/yxdyglmain/yxdyglMain/delete",
        treeUrl:"/yxdyglmain/yxdyglMain/getYxdyglMainTreeByKhjl",
      },
      spinning: false,
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    },
    treeHeight: function() {
      return (document.documentElement.clientHeight - 200 - 50) + 'px';
    },
  },
  methods: {
    onSelect(keys, event) {
      this.id=keys[0];
      this.selectTreeData = event.node.$vnode.data.props
      //刷新子组件信息
      this.$refs.YxdyglMainList.myRefresh(this.selectTreeData);
    },

    handleAdd(){
      if ( this.treeData.length > 0 && (this.id == ''||this.id== undefined ||this.id == null)) {
        this.$message.error("请选择一个节点!")
      } else {
        this.$refs.modalForm.add(this.selectTreeData);
        this.$refs.modalForm.title = "新增";
        this.$refs.modalForm.disableSubmit = false;
      }
    },
    handleEdit(){
      if (this.id == ''||this.id== undefined ||this.id == null) {
        this.$message.error("请选择一个节点!")
      } else {
        this.$refs.modalForm.edit(this.selectTreeData);
        this.$refs.modalForm.title = "编辑";
        this.$refs.modalForm.disableSubmit = false;
      }
    },
    handleCancel () {
      this.close()
    },
    handleDel(){
      if (this.id == ''||this.id== undefined ||this.id == null) {
        this.$message.error("请选择一个节点!")
      } else {
        deleteAction(this.url.delete, {id: this.id}).then((res) => {
          if (res.success) {
            this.$message.success(res.message);
            this.refresh()
          } else {
            this.$message.warning(res.message,5);
          }
        });
      }
    },
    modalFormOk() {
      console.log("come in ok")
      this.refresh();
    },
    refresh() {
      this.loading = true
      this.loadTree()
      this.$refs.YxdyglMainList.loadData();
    },
    loadTree() {
      var that = this
      that.treeData = []
      getAction(that.url.treeUrl, {previousLevel: '1', pId: '0'}).then((res) => {
        that.treeData = res.result
      })
    },
    loadGridData(treeNode) {
      return new Promise(resolve => {
        console.log('loadGridData', treeNode, treeNode.dataRef)
        const {id} = treeNode.dataRef
        //获取网格树
        getAction(this.url.treeUrl, {previousLevel: '1', pId: id}).then(res => {
          if (res.success) {
            treeNode.dataRef.children = res.result
            this.treeData = [...this.treeData]
            // this.expandedAreaKeys.push(res.result[0].id)
          }
          console.log('treeData', this.treeData)
          resolve()
        })
      })

    },
  },
  created () {
    this.spinning = true
    getAction(this.url.treeUrl, {previousLevel: '1', pId: '0'}).then((res) => {
      this.treeData = res.result
      this.$refs.YxdyglMainList.loadData();
    }).finally(() => {
      this.spinning = false
    })
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less'
</style>