<template>
  <a-modal
    :width="modalWidth"
    :visible="visible"
    title="编辑公式"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    cancelText="关闭"
    wrapClassName="ant-modal-cust-warp"
    >
    <!--部门树-->
    <div>
      <a-row :gutter="10">
        <a-col :md="8" :sm="24">
          <a-card :bordered="true">
            <div style="background: #fff;padding-left:16px; margin-top: 5px">
              <a-tabs default-active-key="1">
                <a-tab-pane tab="基础指标" key="1" :forceRender="true">
<!--                  <a-directory-tree
                    selectable
                    :selectedKeys="selectedKeys"
                    :checkStrictly="true"
                    @dblclick="selectedJczb"
                    :dropdownStyle="{maxHeight:'200px',overflow:'auto'}"
                    :replaceFields="{children:'child', title:'typeName', key:'id'}"
                    :treeData="treeData"
                  />-->
                  <a-directory-tree

                    selectable
                    :defaultExpandAll="true"
                    @dblclick="selectedJczb"
                    :dropdownStyle="{maxHeight:'200px',overflow:'auto'}"
                    :treeData="treeData"
                    v-if="!spinning"
                  />



                </a-tab-pane>
                <a-tab-pane tab="派生指标" key="2" :forceRender="true">
                  <a-card class="card" :bordered="false">
                    <a-table
                      ref="table"
                      size="middle"
                      bordered
                      rowKey="id"
                      :columns="columns"
                      :dataSource="dataSource"
                      :pagination="ipagination"
                      :loading="loading"
                      :customRow="dblclick"
                      @change="handleTableChange">

                    </a-table>
                  </a-card>
                </a-tab-pane>
                <a-tab-pane tab="参数" key="3" :forceRender="true">
                    <a-card class="card" :bordered="false">
                      <a-table
                        ref="cstable"
                        size="middle"
                        bordered
                        rowKey="id"
                        :columns="columns2"
                        :dataSource="dataSource2"
                        :pagination="ipagination2"
                        :loading="loading"
                        :customRow="csIdClick"
                        @change="handleTableChange">
                      </a-table>

                    </a-card>
                </a-tab-pane>

              </a-tabs>
            </div>
          </a-card>
        </a-col>
        <a-col :md="16" :sm="24">
          <a-card :bordered="false">
            <div>
              <a-divider orientation="left">
                工具栏
              </a-divider>
              <a-space :size="size">
                <a-button type="primary" @click="calculation('+')">+</a-button>
                <a-button type="primary" @click="calculation('-')">-</a-button>
                <a-button type="primary" @click="calculation('*')">×</a-button>
                <a-button type="primary" @click="calculation('/')">÷</a-button>
                <a-button type="primary" @click="calculation('(')">(</a-button>
                <a-button type="primary" @click="calculation(')')">)</a-button>
                <!--<a-select v-model="secondFun" @change="changeFun" placeholder="插入函数" style="width: 120px">
                  <a-select-option value=""> 插入函数</a-select-option>
                  <a-select-option value="MIN"> 最小值 </a-select-option>
                  <a-select-option value="MAX"> 最大值 </a-select-option>
                  <a-select-option value="AVG"> 平均值 </a-select-option>
                  <a-select-option value="SUM"> 合计值 </a-select-option>
                  <a-select-option value="IF"> IF函数 </a-select-option>
                  <a-select-option value="ORG"> ORG函数 </a-select-option>
                </a-select>-->
                <a-button type="primary" @click="remove">清空</a-button>
              </a-space>
            </div>

            <a-row class="form-row" >
              <a-col >
                <a-form-item  label="公式表达式">
                   <a-input   ref="elInput" v-model="gsbds"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" >
              <a-col>
                <a-form-item label="中文表达式">
                   <a-input  v-model="zwbds"/>
                </a-form-item>
              </a-col>
            </a-row>
          </a-card>
        </a-col>
      </a-row>
    </div>
    <BaseIndexInfoModal ref="modalForm" @ok="modalFormOk"></BaseIndexInfoModal>
  </a-modal>

</template>

<script>
  import pick from 'lodash.pick'
  import { getAction,postAction } from '@/api/manage'
  import { queryIdTree } from '@/api/api'
  import {queryDpJdTreeList, searchBpJdByKeywords} from '@/api/api'
  import  BaseIndexInfoModal from './BaseIndexInfoModal'
  import { FormTypes } from '@/utils/JEditableTableUtil'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "ZbTreeModal",
    mixins: [JeecgListMixin],
    components: {
      BaseIndexInfoModal
    },
    data () {
      return {
        spinning:true,
        loading:false,
        secondFun:'',
        gsbds:'',
        zwbds:'',
        size:8,
        dpjdxx:{},
        dataSource:[],
        dataSource2:[],
        checkedKeys:[], // 存储选中id
        iExpandedKeys: [],
        userId:"", // 存储用户id
        model:{}, // 存储SysUserDepartsVO表
        modalWidth:1600,
        departTree:[],
        selectedKeys: [],
        treeData: [],
        title:"操作",
        visible: false,
        confirmLoading: false,
        headers:{},
        form:this.$form.createForm(this),
        columns: [
          {
            title: '指标编号',
            align:"center",
            dataIndex: 'indexId'
          },
          {
            title: '指标名称',
            align:"center",
            dataIndex: 'indexName'
          },
        ],
        columns2: [
          {
            title: '指标编号',
            align:"center",
            dataIndex: 'paramId'
          },
          {
            title: '指标名称',
            align:"center",
            dataIndex: 'paramName'
          },
        ],
        ipagination:{
          current: 1,
          pageSize: 10,
          pageSizeOptions: ['10', '20', '30'],
          showTotal: (total, range) => {
            return range[0] + "-" + range[1] + " 共" + total + "条"
          },
          showQuickJumper: true,
          showSizeChanger: true,
          total: 0
        },
        ipagination2:{
          current: 1,
          pageSize: 10,
          pageSizeOptions: ['10', '20', '30'],
          showTotal: (total, range) => {
            return range[0] + "-" + range[1] + " 共" + total + "条"
          },
          showQuickJumper: true,
          showSizeChanger: true,
          total: 0
        },
        url: {
          userId:"/sys/user/generateUserId", // 引入生成添加用户情况下的url
          treeUrl:"/khlc/jczbgl/vpmaFBaseIndexType/queryTreeList",
          list: "/khlc/pszbgl/pmaFevlIndexInfo/list",
        },

      }
    },
    methods: {
      created() {
       this.loadTree();
      },
      loadTree() {
        getAction(this.url.treeUrl).then((res) => {
          this.treeData = res.result
          this.spinning=false;
          console.log('jczbxx',res.result)
        })
      },
      loadCs() {
        getAction("/csgl/csxx/pmaFParamInfo/listNoDir",{area:"0"}).then((res) => {
          this.dataSource2 = res.result.records
          this.spinning=false;
          console.log('cs',res.result)
        })
      },

      calculation(val){
        this.gsbds=this.gsbds+val;
        this.zwbds=this.zwbds+val;
      },
      changeFun(val){
        this.gsbds=this.gsbds+val;
      },
      remove(){
        this.gsbds='';
      },
    /* insertInputTxt(insertTxt) {
          console.log(insertTxt)
          var elInput =   this.$refs.elInput;

          var startPos = elInput.selectionStart;
          var endPos = elInput.selectionEnd;
          console.log('startPos',startPos)
          console.log('endPos',endPos)

       if (startPos === undefined || endPos === undefined) return
          var txt = elInput.value;
          var result = txt.substring(0, startPos) + insertTxt + txt.substring(endPos)
          elInput.value = result;
          elInput.focus();
          elInput.selectionStart = startPos + insertTxt.length;
          elInput.selectionEnd = startPos + insertTxt.length;
     },*/
      setThisExpandedKeys(node) {
        if (node.children && node.children.length > 0) {
          this.iExpandedKeys.push(node.key)
          for (let a = 0; a < node.children.length; a++) {
            this.setThisExpandedKeys(node.children[a])
          }
        }
      },
      onSelect(selectedKeys, e) {
        if (this.selectedKeys[0] !== selectedKeys[0]) {
          this.selectedKeys = [selectedKeys[0]];
        }
        let record = e.node.dataRef;
        this.dpjdxx=record;
        console.log('record',this.dpjdxx)
        this.checkedKeys.push(record.id);
        //this.$refs.DpJdrwglList.onClearSelected();
       // this.$refs.DpJdrwglList.open(record);
      },

      selectedJczb(event, node){
        console.log('event',event)
        console.log('dataRef',node.dataRef)
        console.log('node',node)
        if(node.dataRef.dirType!=3){
          this.$message.error('请选择指标！',5)
          return;
        }

        this.$refs.modalForm.edit(node.dataRef);
        this.$refs.modalForm.title = "编辑";
        this.$refs.modalForm.disableSubmit = false;

      },
      add (gsbds) {
        console.log(gsbds)
        this.gsbds=gsbds;
        this.edit({});
      },
      edit (record) {
        this.loadTree();
        this.loadCs();
        this.visible = true;
      },
      close () {
        this.$emit('close');
        this.visible = false;
        this.gsbds='';
        this.zwbds='';
      },
      handleSubmit () {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err) => {
          if (!err) {
            postAction("/khlc/pszbgl/pmaFevlIndexInfo/checkFormula",{formula:that.gsbds}).then(res=>{
              if(res.success){
                that.$emit('ok', {gsbds:that.gsbds,zwbds:that.zwbds});
                that.confirmLoading = false;
                that.close();
              }else{
                this.$message.warning(res.message,5)
              }
            })

          }
        })
      },
      handleCancel () {
        this.close()
      },

      // 选择部门时作用的API
      onCheck(checkedKeys, info){
        this.departList = [];
        this.checkedKeys = checkedKeys.checked;
        let checkedNodes = info.checkedNodes;
        for (let i = 0; i < checkedNodes.length; i++) {
          let de = checkedNodes[i].data.props;
          let depart = {key:"",value:"",title:""};
          depart.key = de.value;
          depart.value = de.value;
          depart.title = de.title;
          this.departList.push(depart);
        }
        console.log('onCheck', checkedKeys, info);
      },

      modalFormOk(data){
        var string = data.split("=");
        this.addGs('{'+string[0]+'}',string[1])
      },
      addGs(var1,var2){
        if(this.gsbds != null &&  this.gsbds != ''){
          this.gsbds=this.gsbds+var1;
          this.zwbds=this.zwbds+var2;
        }else {
          this.gsbds=var1;
          this.zwbds=var2;
        }
      }
      ,

      csIdClick(record,index){
          return {
            on: {
              click: () => {
                console.log(record, index, "单击");
                this.addGs('{'+record.paramId+'}',record.paramName)
              },
              dblclick: () => {
                console.log(record, index, 2222);

              }
            }
          };
      },
      dblclick(record, index){
        return {
          on: {
            dblclick: () => {
              console.log(record,index)
              this.$refs.modalForm.edit({id:record.indexId,typeName:record.indexName});
              this.$refs.modalForm.title = "编辑";
              this.$refs.modalForm.disableSubmit = false;
            }
          }
        }
      },

    },
  }
</script>

<style scoped>
  .ant-table-tbody .ant-table-row td{
    padding-top:10px;
    padding-bottom:10px;
  }
  /deep/ .ant-modal{
    height: 700px;
  }
</style>