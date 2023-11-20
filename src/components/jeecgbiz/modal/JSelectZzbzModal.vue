<template>
  <a-modal
    title="选择部门"
    :width="modalWidth"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    cancelText="关闭">
    <a-spin tip="Loading..." :spinning="false">
      <div class="tree-bar">
        <span>父子关联：</span>
        <a-radio-group v-model="fzglValue" @change="fzglChange">
          <a-radio value="1">是</a-radio>
          <a-radio value="2">否</a-radio>
        </a-radio-group>
        <a-directory-tree
          selectable
          :defaultExpandAll="true"
          :checkable="true"
          :checkStrictly="checkStrictly"
          v-model="checkedKeys"
          @check="onSelect"
          :dropdownStyle="{maxHeight:'200px',overflow:'auto'}"
          :treeData="treeData"
        />
      </div>

    </a-spin>
  </a-modal>
</template>

<script>
  import { queryDepartTreeList } from '@/api/api'
  export default {
    name: 'JSelectDepartModal',
    props:['modalWidth','multi','rootOpened','departId'],
    data(){
      return {
        visible:false,
        confirmLoading:false,
        treeData:[],
        autoExpandParent:true,
        expandedKeys:[],
        checkStrictly:false,
        dataList:[],
        spinningZzjg:true,
        checkedKeys:[],
        checkedRows:[],
        searchValue:"",
        fzglValue: '1',
      }
    },
    created(){
      this.loadDepart();
    },
    watch:{
      departId(){
        this.initDepartComponent()
      },
      visible: {
        handler() {
          console.log('3333333333333333333333')
          console.log(this.departId)
          if (this.departId) {
            this.checkedKeys = this.departId.split(",");
          } else {
            this.checkedKeys = [];
          }
        }
      }
    },
    methods:{
      fzglChange(e) {
        let val = e.target.value
        if(val==1){
          this.checkStrictly = false
        }else if(val==2){
          this.checkStrictly = true
        }
      },
      show(){
        this.visible=true
        this.checkedKeys=[]
      },
      loadDepart(){
        queryDepartTreeList().then(res=>{
          if(res.success){
            let arr = [...res.result]
            this.reWriterWithSlot(arr)
            this.treeData = arr
            this.initDepartComponent()
            if(this.rootOpened){
              this.initExpandedKeys(res.result)
            }
          }
        })
      },
      initDepartComponent(){
        let names = ''
        if(!this.departId){
          this.checkedKeys=[]
        }
        if(this.departId){
          let currDepartId = this.departId
          console.log('this.departId',this.departId)
         //this.checkedKeys = this.departId.split(",");
          let checklist=this.departId.split(",");
          for(let checkvalue of checklist){
            for(let item of this.dataList){
              if(checkvalue==item.key){
                names+=","+item.title
              }
            }
          }
          if(names){
            names = names.substring(1)
          }
        }
        console.log("initComp",names)
        this.$emit("initComp",names)
      },
      reWriterWithSlot(arr){
        for(let item of arr){
          if(item.children && item.children.length>0){
            this.reWriterWithSlot(item.children)
            let temp = Object.assign({},item)
            temp.children = {}
            this.dataList.push(temp)
          }else{
            this.dataList.push(item)
            item.scopedSlots={ title: 'title' }
          }
        }
      },
      initExpandedKeys(arr){
        if(arr && arr.length>0){
          let keys = []
          for(let item of arr){
            if(item.children && item.children.length>0){
              keys.push(item.id)
            }
          }
          this.expandedKeys=[...keys]
        }else{
          this.expandedKeys=[]
        }
      },

    onSelect(checkedKeys, e) {
        console.log('onSelect', checkedKeys, e)
        if (this.checkStrictly) {
          this.checkedKeys = checkedKeys.checked
        } else {
          this.checkedKeys=checkedKeys;
        }

      },
      handleSubmit(){
        if(!this.checkedKeys || this.checkedKeys.length==0){
          this.$emit("ok",'')
        }else{
          this.$emit("ok",this.checkedRows,this.checkedKeys.join(","))
        }
        this.handleClear()
      },
      handleCancel(){
        this.handleClear()
      },
      handleClear(){
        this.visible=false
        this.checkedKeys=[]
      },
      getParentKey(currKey,treeData){
        let parentKey
        for (let i = 0; i < treeData.length; i++) {
          const node = treeData[i]
          if (node.children) {
            if (node.children.some(item => item.key === currKey)) {
              parentKey = node.key
            } else if (this.getParentKey(currKey, node.children)) {
              parentKey = this.getParentKey(currKey, node.children)
            }
          }
        }
        return parentKey
      },
      onSearch(value){
        const expandedKeys = this.dataList.map((item) => {
          if (item.title.indexOf(value) > -1) {
            return this.getParentKey(item.key,this.treeData)
          }
          return null
        }).filter((item, i, self) => item && self.indexOf(item) === i)

        Object.assign(this, {
          expandedKeys,
          searchValue: value,
          autoExpandParent: true,
        })


      },
      // 根据 checkedKeys 获取 rows
      getCheckedRows(checkedKeys) {
        const forChildren = (list, key) => {
          for (let item of list) {
            if (item.id === key) {
              return item
            }
            if (item.children instanceof Array) {
              let value = forChildren(item.children, key)
              if (value != null) {
                return value
              }
            }
          }
          return null
        }

        let rows = []
        for (let key of checkedKeys) {
          let row = forChildren(this.treeData, key)
          if (row != null) {
            rows.push(row)
          }
        }
        return rows
      }
    }
  }

</script>

<style scoped>

</style>