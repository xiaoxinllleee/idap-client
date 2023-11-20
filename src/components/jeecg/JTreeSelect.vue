<template>
  <a-tree-select
    labelInValue
    style="width: 100%"
    :disabled="disabled"
    :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
    :placeholder="placeholder"
    :loadData="asyncLoadTreeData"
    :value="treeValue"
    :treeData="treeData"
    :multiple="multiple"
    :treeDefaultExpandAll=treeDefaultExpandAll
    :showSearch=showSearch
    :treeNodeFilterProp="treeNodeFilterProp"
    :allowClear="allowClearProp"
    v-model="defaultValue"
    @change="onChange"
    @search="onSearch">
  </a-tree-select>
</template>
<script>

  /*
  * 异步树加载组件 通过传入表名 显示字段 存储字段 加载一个树控件
  * <j-tree-select dict="aa_tree_test,aad,id" pid-field="pid" ></j-tree-select>
  * */
  import { getAction } from '@/api/manage'
  import store from '@/store/'

  export default {
    name: 'JTreeSelect',
    desc: '组织机构树专用',
    props: {
      value:{
        type: String,
        required: false
      },
      sszh:{
        type:Boolean,
        default:false,
        required:false
      },
      placeholder:{
        type: String,
        default: '请选择',
        required: false
      },
      dict:{
        type: String,
        default: '',
        required: false
      },
      allowClear:{
        type:Boolean,
        default:true,
        required:false
      },
      pidField:{
        type: String,
        default: 'pid',
        required: false
      },
      pidValue:{
        type: String,
        default: '0',
        required: false
      },
      disabled:{
        type:Boolean,
        default:false,
        required:false
      },
      hasChildField:{
        type: String,
        default: '',
        required: false
      },
      treeDefaultExpandAll:{
        type:Boolean,
        default:false,
        required:false
      },
      showSearch:{
        type:Boolean,
        default:true,
        required:false
      },
      filterTreeNode:{
        type:Boolean,
        default:false,
        required:false
      },
      treeNodeFilterProp:{
        type:String,
        default:'title',
        required:false
      },
      condition:{
        type:String,
        default:'',
        required:false
      },
      //是否增加全选
      isAll: {
        type: Boolean,
        default: false,
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
      //是否获取所有的组织机构信息 1:是 2：否（根据权限机构）
      getAllZzjg: {
        type: String,
        default: '2',
        required: false
      }
    },
    data () {
      return {
        treeValue: null,
        treeData:[],
        url:"/sys/dict/loadOrganTreeData",
        rootUrl:"/sys/dict/loadRootTreeData",
        view:'/sys/dict/loadDictItem/',
        tableName:"",
        text:"",
        code:"",
        defaultValue: undefined,
        allowClearProp: true,
      }
    },

    watch: {
      value () {
        this.loadItemByCode()
      },
      dict(){
        this.initDictInfo()
        this.loadRoot();
      }
    },
    created(){
      this.validateProp().then(()=>{
        this.initDictInfo()
        this.loadRoot()
        //this.loadItemByCode()
      })
    },
    mounted() {
      this.allowClearProp = this.allowClear
    },
    methods: {
      loadItemByCode(){
        //console.info('loadItemByCode-this.value',this.value)
        if(!this.value || this.value=="0"){
          this.treeValue = null
          this.defaultValue = null
        }else{
          getAction(`${this.view}${this.dict}`,{key:this.value}).then(res=>{
            if(res.success){
              //console.info('loadItemByCode-res.result',res.result)
              let values = this.value.split(',')
              //console.info('loadItemByCode-values',values)
              this.treeValue = res.result.map((item, index) => ({
                key: values[index],
                value: values[index],
                label: item
              }))
              this.onLoadTriggleChange(res.result[0]);
              //解決异步加载导致设置初始值只能展示机构代码不展示机构名称的问题
              let existsData = this.treeData.filter(data => data.key == this.value)
              if (existsData && existsData.length > 0) {
                this.defaultValue = {
                  key: this.value,
                  value: this.value,
                  title: res.result[0]
                };
              } else {
                this.defaultValue = {
                  key: this.value + '-' + res.result[0],
                  value: this.value + '-' + res.result[0],
                  title: res.result[0]
                };
              }
            }
          })
        }
        //console.info('loadItemByCode-this.treeValue',this.treeValue)
      },
      onLoadTriggleChange(text){
        //只有单选才会触发
        if(!this.multiple && this.loadTriggleChange){
          this.$emit('change', this.value,text)
        }
      },
      initDictInfo(){
        let arr = this.dict.split(",")
        this.tableName = arr[0]
        this.text = arr[1]
        this.code = arr[2]
      },
      asyncLoadTreeData (treeNode) {
        return new Promise((resolve) => {
          if (treeNode.$vnode.children) {
            resolve()
            return
          }
          let pid = treeNode.$vnode.key
          let param = {
            pid:pid,
            tableName:this.tableName,
            text:this.text,
            code:this.code,
            pidField:this.pidField,
            hasChildField:this.hasChildField,
            condition:this.condition
          }
          if(this.sszh==true){
            this.url='/sys/dict/loadTreeDataToSszh'
          }
            getAction(this.url,param).then(res=>{
              if(res.success){
                for(let i of res.result){
                  i.value = i.key
                  if(i.leaf==false){
                    i.isLeaf=false
                  }else if(i.leaf==true){
                    i.isLeaf=true
                  }
                }
                this.addChildren(pid,res.result,this.treeData)
                this.treeData = [...this.treeData]
              }
              resolve()
            })
        })
      },
      addChildren(pid,children,treeArray){
        if(treeArray && treeArray.length>0){
          for(let item of treeArray){
            if(item.key == pid){
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
      loadRoot(){
        let param = {
          pid:this.pidValue,
          tableName:this.tableName,
          text:this.text,
          code:this.code,
          pidField:this.pidField,
          hasChildField:this.hasChildField,
          condition:this.condition,
          getAllZzjg: this.getAllZzjg
        }
        getAction(this.rootUrl, param).then(res => {
          if (res.success && res.result) {
            for (let i of res.result) {
              i.value = i.key
              if (i.leaf == false) {
                i.isLeaf = false
              } else if (i.leaf == true) {
                i.isLeaf = true
              }
            }
            this.treeData = [...res.result]
            //console.info('loadRoot-isRoot',store.getters.isRoot)
            //console.info('loadRoot-treeValue:',this.treeValue)
            //console.info('loadRoot-treeData:',this.treeData)
            if (!store.getters.isRoot && !this.treeValue && this.treeData.length > 0) {
              //console.info('loadRoot-allowClearProp',this.allowClearProp)
              this.allowClearProp = false
              //console.info('loadRoot-allowClearProp',this.allowClearProp)
              if(this.getAllZzjg == '2') {
                //如果不是总行，默认查询一个
                this.defaultValue = {
                  key: this.treeData[0].key,
                  value: this.treeData[0].key,
                  title: this.treeData[0].title
                }
                this.onChange({value: this.treeData[0].key, lable: this.treeData[0].title})
              }
            }
            if (this.isAll || store.getters.isRoot) {
              this.addAll();
            }
          } else {
            console.log("数根节点查询结果-else", res)
          }
        }).finally(() => {
          this.loadItemByCode()
        })
      },
      onChange(value){
        console.log('onchange', value)
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
      validateProp(){
        let mycondition = this.condition
        return new Promise((resolve,reject)=>{
          if(!mycondition){
            resolve();
          }else{
            try {
              let test=JSON.parse(mycondition);
              console.log("aaaaasdsdd",typeof test)
              if(typeof test == 'object' && test){
                resolve()
              }else{
                this.$message.error("组件JTreeSelect-condition传值有误，需要一个json字符串!")
                reject()
              }
            } catch(e) {
              this.$message.error("组件JTreeSelect-condition传值有误，需要一个json字符串!")
              reject()
            }
          }
        })
      },
      addAll() {
        let all = [
          {'children': null,'code': null,'icon': null, 'isLeaf': null, 'key':'all',
          'leaf': null,'parentId': null,'title': this.placeholder,'value': ''}
          ]
        this.treeData = all.concat(this.treeData)
      }
    },
    //2.2新增 在组件内定义 指定父组件调用时候的传值属性和事件类型 这个牛逼
    model: {
      prop: 'value',
      event: 'change'
    }
  }
</script>
