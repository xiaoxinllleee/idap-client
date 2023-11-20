<template>
  <a-spin :spinning="loading">
    <a-tree-select
      allowClear
      labelInValue
      :getPopupContainer="(node) => node.parentNode"
      style="width: 100%"
      :disabled="disabled"
      :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
      :placeholder="placeholder"
      :loadData="asyncLoadTreeData"
      :showSearch=showSearch
      :treeNodeFilterProp="treeNodeFilterProp"
      :value="treeValue"
      :treeData="treeData"
      :replaceFields=replaceFields
      :multiple="multiple"
      @change="onChange"
      @search="onSearch">
    </a-tree-select>
  </a-spin>
</template>
<script>

  /*
  * 异步树加载组件 通过传入表名 显示字段 存储字段 加载一个树控件
  * <j-tree-select dict="aa_tree_test,aad,id" pid-field="pid" ></j-tree-select>
  * */
  import { getAction } from '@/api/manage'

  export default {
    name: 'WgxxTreeSelect',
    props: {
      // 选项数据
      options: {
        type: Array,
        required: true,
      },
      loading: {
        type: Boolean,
        default: false,
        required: false
      },
      value:{
        type: String,
        required: false
      },
      placeholder:{
        type: String,
        default: '请选择',
        required: false
      },
      disabled:{
        type:Boolean,
        default:false,
        required:false
      },
      // 是否支持多选
      multiple: {
        type: Boolean,
        default: false,
      },
      loadTriggleChange:{
        type: Boolean,
        default: false,
        required:false
      },
      showSearch:{
        type:Boolean,
        default:true,
        required:false
      },
      treeNodeFilterProp:{
        type:String,
        default:'title',
        required:false
      },
    },
    data () {
      return {
        replaceFields:
          { children: 'children', title: 'wgmc', key: 'wgbh', value: 'wgbh' },
        treeValue: null,
        treeData: []
      }
    },
    watch: {
      options(val) {
        this.treeData = val
      },
      value () {
        console.log('watch value', this.value)
        if(!this.value){
          this.treeValue = null
        }
      }
    },
    methods: {
      onLoadTriggleChange(text){
        //只有单选才会触发
        if(!this.multiple && this.loadTriggleChange){
          this.$emit('change', this.value,text)
        }
      },
      asyncLoadTreeData (treeNode) {
        console.log('asyncLoadTreeData', treeNode.dataRef)
        return new Promise((resolve) => {
          if (treeNode.dataRef.children && treeNode.dataRef.children.length > 0) {
            resolve()
            return
          }
          let pid = treeNode.dataRef.wgbh
          //根据网格编号查询下级数据

          getAction('/yxdyglmain/yxdyglMain/getZuByCun', {wgbh: pid}).then(res => {
            if(res.success) {
              this.addChildren(pid,res.result,this.treeData)
              this.treeData = [...this.treeData]
              resolve()
            }
          })
        })
      },
      addChildren(pid,children,treeArray){
        if(treeArray && treeArray.length>0){
          for(let item of treeArray){
            if(item.wgbh == pid){
              if(!children || children.length==0){
                item.isLeaf=true
              }else{
                item.children = children
              }
              break
            }else{
              this.addChildren(pid,children,item.children)
            }
          }
        }
      },
      onChange(value){
        if(!value){
          this.$emit('change', '');
          this.treeValue = null
        } else if (value instanceof Array) {
          this.$emit('change', value.map(item => item.value).join(','))
          this.treeValue = value
        } else {
          this.$emit('change', value.value,value.label)
          this.treeValue = value
        }

      },
      onSearch(value){
        console.log(value)
      },
      getCurrTreeData(){
        return this.treeData
      },
    },
    //2.2新增 在组件内定义 指定父组件调用时候的传值属性和事件类型 这个牛逼
    model: {
      prop: 'value',
      event: 'change'
    }
  }
</script>
