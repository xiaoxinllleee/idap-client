<style lang="less">
@import "../../../../../styles/tree-common.less";
@import "../../../../../styles/single-common.less";
</style>
<template>
  <j-modal
    :title="title"
    :width="1450"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :okButtonProps="{ props: {disabled: true} }"
    :destroyOnClose="true"
    :fullscreen="true"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <div style="display:flex;justify-content:center;margin: 10px 0 30px 0;">
        <Steps :current="current" style="width: 1200px">
          <Step title="考核方案"></Step>
          <Step title="考核设置"></Step>
<!--          <Step title="考核指标"></Step>
          <Step title="参数维护"></Step>
          <Step title="评分模型"></Step>-->
        </Steps>
      </div>
      <Row type="flex" justify="center" style="height: 400px" v-show="current==0">
        <Col :xs="24" :md="24" :lg="16" :xl="9">
          <Alert type="warning" show-icon >方案基本信息</Alert>
          <Form
            ref="basicForm"
            :model="basicForm"
            label-position="left"
            :label-width="110"
            :rules="formValidate"
          >
            <FormItem label="考核项目名称" prop="schemeName">
              <Input
                placeholder="请输入考核项目名称"
                v-model="basicForm.schemeName"
                clearable
                style="margin-right:10px;"
              />
            </FormItem>
            <FormItem label="考核对象类型" prop="evlObjType">
              <Select v-model="basicForm.evlObjType" placeholder="请选择考核对象类型" clearable>
                <Option
                  v-for="(item, i) in dictForm"
                  :key="i"
                  :value="item.value"
                  :label="item.title"
                >
                  <span style="margin-right:10px;">{{ item.title }}</span>
                  <span style="color:#ccc;">{{ item.value }}</span>
                </Option>
              </Select>
            </FormItem>
            <FormItem label="考核场景" prop="checkScene">
              <Select v-model="basicForm.checkScene" placeholder="请选择考核场景" clearable >
                <Option
                  v-for="(item, i) in dictTable"
                  :key="i"
                  :value="item.value"
                  :label="item.title"
                >
                  <span style="margin-right:10px;">{{ item.title }}</span>
                  <span style="color:#ccc;">{{ item.value }}</span>
                </Option>
              </Select>
            </FormItem>

<!--            <FormItem label="执行顺序" prop="checkScene">
              <Input
                placeholder="请输入执行顺序"
                v-model="basicForm.zxsx"
                clearable
                style="margin-right:10px;"
              />
            </FormItem>-->
          </Form>
        </Col>
      </Row>
      <Row type="flex" justify="center" style="height: 400px" v-show="current==1">
        <Col :md="8" :lg="8" :xl="5">
          <Alert show-icon>
            机构选择
          </Alert>

          <div class="tree-bar">
            <span>父子关联：</span>
            <a-radio-group v-model="fzglValue" @change="fzglChange">
              <a-radio value="1">是</a-radio>
              <a-radio value="2">否</a-radio>
            </a-radio-group>

            <a-directory-tree
              style="height: 680px"
              selectable
              :defaultExpandAll="true"
              :checkable="true"
              :checkStrictly="checkStrictly"
              v-model="checkedKeys"
              @check="onSelect"
              :dropdownStyle="{maxHeight:'200px',overflow:'auto'}"
              :treeData="departTree"
              v-if="!spinningZzjg"
            />
          </div>
        </Col>
        <Col :md="8" :lg="8" :xl="9" style="margin-left:10px;" v-if="sfshow">
          <Alert type="warning" show-icon v-if="sfshow" >岗位选择</Alert>
          <div class="tree-bar" >
            <div v-show="sfshow">
              <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
                <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
                <a style="margin-left: 24px" @click="onClearSelected">清空</a>
              </div>
              <a-table
                :pagination="{ pageSize: 50 }"
                :scroll="{ y: 200 }"
                ref="table"
                size="small"
                bordered
                rowKey="gwbz"
                :columns="columns"
                :dataSource="dataSource"
                :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
              >
              </a-table>
            </div>
          </div>
          <Alert type="success" show-icon  v-show="sfshow">特殊考核对象</Alert>
          <div class="table-page-search-wrapper" v-show="sfshow">
            <a-form layout="inline">
              <a-row :gutter="12">
                <a-col :span="10">
                  <a-form-item label="特殊规则">
                    <j-dict-select-tag  placeholder="请选择特殊规则" v-model="tsgz" dict-code="evlobjrule" :pleaseSelect="false"/>
                  </a-form-item>
                </a-col>
                <a-col :span="14">
                  <a-form-item label="特殊考核对象">
                    <a-button @click="handleSelectGw" style="margin-right: 5px">选择岗位</a-button>
                    <a-button @click="handleAddUserDepart">选择员工</a-button>
                    <!--<a-input-search-->
                      <!--placeholder="选择用户"-->
                      <!--readOnly-->
                      <!--@search="handleAddUserDepart" >-->
                      <!--<a-button slot="enterButton" icon="search"></a-button>-->
                    <!--</a-input-search>-->
                  </a-form-item>
                </a-col>
              </a-row>
            </a-form>
            <a-table
              :pagination="{ pageSize: 50 }"
              :scroll="{ y: 500 }"
              ref="table"
              size="small"
              bordered
              rowKey="id"
              :columns="columnsObj"
              :dataSource="dataSourceKhdx"

            >
              <template slot="operation" slot-scope="text, record">
                <a-popconfirm
                  v-if="dataSourceKhdx.length"
                  title="确认删除?"
                  @confirm="() => onDelete(record.id)"
                >
                  <a href="javascript:;">删除</a>
                </a-popconfirm>
              </template>

            </a-table>
          </div>
        </Col>
        <Col :md="8" :lg="8" :xl="6" style="margin-left:10px;">
          <Alert show-icon>
            关联指标选择
          </Alert>
          <a-input-search v-model:value="searchValue" style="margin-bottom: 8px" placeholder="Search" />
          <div class="tree-bar">
            <a-tree
              checkable
              style="height: 600px"
              :defaultExpandAll="true"
              :selectedKeys="selectedKeysJczb"
              v-model="checkedZbids"
              @check="checkzbxx"
              :checkStrictly="false"
              :dropdownStyle="{maxHeight:'200px',overflow:'auto'}"
              :treeData="treeDataJczb"
              v-if="treeDataJczb.length"
              >
              <template #title="{ title }">
                    <span v-if="title.indexOf(searchValue) > -1">
                      {{ title.substr(0, title.indexOf(searchValue)) }}
                      <span style="color: #f50">{{ searchValue }}</span>
                      {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
                    </span>
                <span v-else>{{ title }}</span>
              </template>
            </a-tree>
          </div>
        </Col>
      </Row>

    </a-spin>
    <template slot="footer">
      <Row type="flex" justify="center" v-show="current==0">
        <Button type="warning" @click="currentStep(1)">
          下一步 <Icon type="ios-arrow-forward" />
        </Button>
      </Row>
      <Row type="flex" justify="center" v-show="current==1" >
        <Button type="warning" icon="ios-arrow-back" style="margin-left: 8px" @click="currentStepj">上一步</Button>
        <Button type="warning"
                @click="currentStep(2)"
                :loading="submitLoading"
                icon="ios-create-outline"
         >
          完成 <Icon type="ios-arrow-forward" />
        </Button>
      </Row>
    </template>
    <Select-User-Modal ref="selectUserModal" @selectFinished="selectOK"></Select-User-Modal>
    <select-gw-modal ref="selectGwModal" @selectFinished="selectGwOK"></select-gw-modal>
  </j-modal>
</template>

<script>
import { deleteAction, getAction, httpAction, postAction } from '@/api/manage'

import pick from 'lodash.pick'
import moment from "moment"
import {queryDepartTreeList, searchByKeywords} from '@/api/api'
import { getDictDataByType, updateInfo } from '@/api/activiti'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import SelectUserModal from './SelectUserModal'
import SelectGwModal from './SelectGwModal'

export default {
  components: {
    SelectUserModal, SelectGwModal
  },
  mixins:[JeecgListMixin],
  name: "PmaASchemeModal",
  data () {
    return {
      searchValue:'',
      sfshow:true,
      tsgz:'1',
      loading:false,
      spinning:true,
      spinningZzjg:true,
      current:0,
      disableSubmit:false,
      submitLoading:false,
      title:"操作",
      visible: false,
      model: {},
      menuJdId:'',
      schemeId:'',
      id:'',
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
      iExpandedKeys:[],
      selectedKeysJczb:[],
      checkedKeys:[],
      checkedZbids:[],
      treeDataJczb:[],
      treeData: [],
      departTree: [],
      selectedKeys: [],
      fzglValue: '1',
      checkStrictly: false,
      dictTable: [],
      dictForm: [],
      basicForm: {
        id:'',
        menuId:'',
        schemeId:'',
        schemeName:'',
        evlObjType:'',
        checkScene:'',
        zxsx:'',
      },
      ObjPostForm:{
        schemeId:'',
        evlObjType:'',
        tsgz:'',
        objIds:[],
        postIds:[],
        zbids:[],
        khdxs:[],
      },
      formValidate: {
        schemeName: [{ required: true, message: "方案名称不能为空", trigger: "blur" }],
        evlObjType: [{ required: true, message: "请选择考核对象类型", trigger: "blur" }],
        checkScene: [{ required: true, message: "请选择考核场景", trigger: "blur" }],
        startDate: [{required: true, message: '生效日期不能为空!', trigger: 'blur', pattern: /.+/}],
        endDate: [{ required: true, message: "失效日期不能为空", trigger: "blur" , pattern: /.+/}],

      },
      /* 分页参数 */
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
      confirmLoading: false,
      form: this.$form.createForm(this),
      validatorRules:{
      },
      dataSource:[],
      dataSourceKhdx:[],
      columnsGlzblb: [
        {
          title: '考核方案',
          align:"center",
          dataIndex: 'schemeId_dictText',
          width: 100,
        },
        {
          title: '指标类型',
          align:"center",
          dataIndex: 'indexType_dictText'
        },
        {
          title: '指标编号',
          align:"center",
          dataIndex: 'indexId'
        },
        {
          title: '指标名称',
          align:"center",
          dataIndex: 'indexId_dictText'
        },
        {
          title: '余额类型',
          align:"center",
          dataIndex: 'balTypeId_dictText'
        },
        {
          title: '评价对象类型',
          align:"center",
          dataIndex: 'evlObjType_dictText'
        },
        {
          title: '币种',
          align:"center",
          dataIndex: 'curTypeId_dictText'
        },
        {
          title: '应用类型',
          align:"center",
          dataIndex: 'applyTypeId_dictText'
        },
        {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' },
        }

      ],
      selectedRowKeys: [],
      selectionRows: [],
      // 表头
      columns: [
        {
          title: '岗位标识',
          align:"center",
          dataIndex: 'gwbz',
          width: 150,
        },
        {
          title: '岗位名称',
          align:"center",
          dataIndex: 'gwmc',
          width: 150,
        },

      ],
      // 表头
      columnsObj: [
        {
          title: '组织简称',
          align:"center",
          dataIndex: 'zzbz_dictText',
        },
        {
          title: '岗位名称',
          align:"center",
          dataIndex: 'gwbz_dictText',
        },
        {
          title: '员工工号',
          align:"center",
          dataIndex: 'yggh',
        },
        {
          title: '员工姓名',
          align:"center",
          dataIndex: 'ygxm',
        },
        {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' },
          width: 100,
        },
      ],
      columnsPszb: [
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
      url: {
        add: "/khlc/khfagl/pmaAScheme/add",
        addObj: "/khfagl/pmaASchemeOrgRel/add",
        edit: "/khlc/khfagl/pmaAScheme/edit",
        list:"gwxxgl/hrBasPost/listAll",
        treeUrl:"/khlc/jczbgl/vpmaFBaseIndexType/queryTreeList",
        addIndexInfo: "/khfagl/pmaAShemeIndexRel/add",
        getOrgAndPost:"/khfagl/pmaASchemeOrgRel/getOrgAndPost",
        getkhdxList:"/khfagl/pmaASchemeEvlobjRel/queryList",
      },
    }
  },
  created () {
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getDictDataType();
    },
    add(menuId) {
      this.menuJdId=menuId;
      this.schemeId=this.guid();
      this.id=this.guid();
      console.log("-----------1-------2--------3-------------")
      console.log("menuId",menuId)
      this.current=this.current*0;
      this.visible = true;
      this.form.resetFields();
      this.getDictDataType();
    },
    edit (record) {
      console.log('record',record)
      this.menuJdId=record.menuId;
      this.schemeId=record.schemeId;
      this.id=record.id;
      this.current=this.current*0;
      this.basicForm.schemeName=record.schemeName;
      this.basicForm.evlObjType=record.evlObjType;
      this.basicForm.checkScene=record.checkScene;
      this.basicForm.menuId=record.menuId;
      this.basicForm.id=record.id;
      this.basicForm.schemeId=record.schemeId;
      this.basicForm.zxsx=record.zxsx;
      this.tsgz=record.speRuleType;
      this.getDictDataType();
      this.form.resetFields();
      this.visible = true;
      //this.checkedKeys

      getAction(this.url.getOrgAndPost,{schemeId:this.schemeId,khcj:record.checkScene}).then((res) => {
        if (res.success && res.result) {
          console.log(res.result)
          this.selectedRowKeys=res.result.post;
          this.checkedKeys=res.result.org;
          this.checkedZbids=res.result.zbid;
        }
      });
      let params = {schemeId:this.schemeId}
      getAction(this.url.getkhdxList, params).then((res) => {
        if (res.success && res.result) {
          this.dataSourceKhdx = res.result;
        } else {
          this.dataSourceKhdx = []
        }
      })



    },
    close () {
      this.current=this.current*0;
      this.schemeId='';
      this.id='';
      this.basicForm={};
      this.selectedRowKeys = [];
      this.selectionRows = [];
      this.checkedZbids = [];
      this.checkedKeys = []
      this.fzglValue = '1'
      this.checkStrictly = false
      this.$emit('ok');
      this.visible = false;
    },
    handleOk () {
      const that = this;
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
          that.confirmLoading = true;
          let httpurl = '';
          let method = '';
          if(!this.model.id){
            httpurl+=this.url.add;
            method = 'post';
          }else{
            httpurl+=this.url.edit;
            method = 'put';
          }
          let formData = Object.assign(this.model, values);
          //时间格式化

          console.log(formData)
          httpAction(httpurl,formData,method).then((res)=>{
            if(res.success){
              that.$message.success(res.message);
              that.$emit('ok');
            }else{
              that.$message.warning(res.message);
            }
          }).finally(() => {
            that.confirmLoading = false;
            that.close();
          })



        }
      })
    },
    handleCancel () {
      this.close()
    },
    currentStep(step){
      console.info("step",step)
      if(step==1){
        this.loadTreeJczb();
        console.log('guid',this.guid())
        this.$refs.basicForm.validate(valid => {
          if (valid) {
            this.basicForm.menuId=this.menuJdId;
            this.basicForm.id=this.id;
            this.basicForm.schemeId=this.schemeId;

           /* this.basicForm.startDate=moment(this.basicForm.startDate).format('YYYY-MM-DD');
            this.basicForm.endDate=moment(this.basicForm.endDate).format('YYYY-MM-DD');*/
            let data=this.basicForm;
            console.info("data",data)
            //menuId
            let httpurl = this.url.add;
            let method = 'post';
            console.log(data)
            httpAction(httpurl,data,method).then((res)=>{
              if(res.success){
                //this.$message.success(res.message);
                this.current=this.current+1;
                if(this.basicForm.evlObjType=='3'){
                    this.sfshow=true;
                }else{
                    this.sfshow=false;
                }

              }else{
                this.$message.warning(res.message,5);
              }
            });
          }else{
            console.info("valid",valid)
            this.$message.error("请正确输入各项必要信息！");

          }
        });
      }else if(step==2){
        this.submitLoading=true;
        this.ObjPostForm.schemeId=this.schemeId;
        this.ObjPostForm.evlObjType=this.basicForm.evlObjType;
        this.ObjPostForm.khcj=this.basicForm.checkScene;
        this.ObjPostForm.tsgz=this.tsgz;
        //评价对象为机构的时候 不添加岗位和员工。
        if(this.basicForm.evlObjType!='3'){
            this.selectedRowKeys=[];
            this.dataSourceKhdx=[];
        }
        console.log('tsgz',this.tsgz)
        if((this.tsgz==null||this.tsgz==''||this.tsgz=='undefined')&&this.basicForm.evlObjType=='3'){
          this.submitLoading=false;
          return this.$message.error("请选择考核对象的特殊规则值！");
        }
        if(this.tsgz=='0'&&this.dataSourceKhdx.length==0){
          this.submitLoading=false;
          return this.$message.error("特殊规则为<仅选择生效>,必须选择生效人！");
        }
        this.ObjPostForm.objIds=this.checkedKeys;
        console.log('selectedRowKeys',this.selectedRowKeys)
        this.ObjPostForm.postIds=this.selectedRowKeys;
        this.ObjPostForm.khdxs=this.dataSourceKhdx;
        this.ObjPostForm.zbids=this.checkedZbids;
        let data=this.ObjPostForm;
        console.log('ObjPostForm',this.ObjPostForm)
        let httpurl = this.url.addObj;
        let method = 'post';
        httpAction(httpurl,data,method).then((res)=>{
          if(res.success){
            //this.$message.success(res.message);
            this.current=this.current+1;
            this.submitLoading=false;
            this.$message.success('保存成功',5);
            this.close();

          }else{
            this.$message.warning(res.message,5);
            this.submitLoading=false;

          }
        });

      }/*else{
        this.current=this.current+1;
      }*/

    },
    currentStepj(){
      this.current=this.current-1;
    },
    fzglChange(e) {
      console.log('fzglChange', e)
      let val = e.target.value
      if(val==1){
        this.checkStrictly = false
      }else if(val==2){
        this.checkStrictly = true
      }
    },
    getDictDataType() {
      getDictDataByType("CHECK_SCENE").then(res => {
        if (res.success) {
          this.dictTable = res.result;
        }
      });
      getDictDataByType("OBJ").then(res => {
        if (res.success) {
          this.dictForm = res.result;
        }
      });
      this.loadTree();
      getAction(this.url.list,{}).then((res) => {
        if (res.success && res.result) {
          console.log(res.result)
          this.dataSource = res.result;
        }
      });

    },

    loadTreeJczb(){
      let params = {
        'khfs':this.basicForm.checkScene,
        'zblx':this.basicForm.evlObjType,
      }
      console.log('params', params);

      getAction(this.url.treeUrl,params).then((res) => {
        console.log(res.result)
        this.treeDataJczb = res.result
        this.spinning=false;

      })
    },

    loadTree(){
      queryDepartTreeList().then((res) => {
        this.departTree = res.result
        this.spinningZzjg=false;
      })
    },
    onSelect(checkedKeys, e) {
      console.log('onSelect', checkedKeys, e)
      if (this.checkStrictly) {
        this.checkedKeys = checkedKeys.checked
      } else {
        this.checkedKeys=checkedKeys;
      }

    },
    handelSubmit(){
        this.close();
    },
    onSelectChange(selectedRowKeys, selectionRows) {
      this.selectedRowKeys = selectedRowKeys;
      this.selectionRows = selectionRows;
    },
    onClearSelected() {
      this.selectedRowKeys = [];
      this.selectionRows = [];
    },
    selectedJczb(event, node){
      console.log('event',event)
      console.log('dataRef',node.dataRef)
      console.log('node',node)
      if(node.dataRef.dirType!=3){
        this.$message.error('请选择指标！',5)
        return;
      }
      this.$refs.modalForm.edit(this.schemeId,'01',node.dataRef);
      this.$refs.modalForm.title = "编辑";
      this.$refs.modalForm.disableSubmit = false;

    },

    checkzbxx(checkedKeys,event){
      console.log(checkedKeys)
      console.log(event)
    },
    dblclick(record, index){
      return {
        on: {
          dblclick: () => {
            console.log(record,index)
            this.$refs.modalForm.edit(this.schemeId,'02',{id:record.indexId,typeName:record.indexName});
            this.$refs.modalForm.title = "编辑";
            this.$refs.modalForm.disableSubmit = false;
          }
        }
      }
    },

    modalFormOk(data){
      console.log('data', data);
      let httpurl = this.url.addIndexInfo;
      let method = 'post';
      httpAction(httpurl,data,method).then((res)=>{
        if(res.success){
          this.$message.success(res.message);
        }else{
          this.$message.warning(res.message,5);
        }
      });
    },
    //用于生成uuid
     S4() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
      },
     guid() {
      return (this.S4()+this.S4()+this.S4()+this.S4()+this.S4()+this.S4()+this.S4()+this.S4());
    },
    handleAddUserDepart() {
       this.$refs.selectUserModal.visible = true;
    },
    handleSelectGw() {
      this.$refs.selectGwModal.init(this.departTree, this.dataSource)
    },
    selectOK(data) {
      var newArr = [];
      if(data && data.length) {
        data.forEach(el => {
          var isContain = false;
          for(var i = 0; i < this.dataSourceKhdx.length; i ++ ) {
            if(el.yggh == this.dataSourceKhdx[i].yggh) {
              isContain = true;
              break;
            }else{
              isContain = false;
            }
          }
          if(!isContain) {
            newArr.push(el)
          }
        })
      }
      this.dataSourceKhdx = this.dataSourceKhdx.concat(newArr)

    },
    selectGwOK(array) {
      console.log('selectGwOK', array)
      console.log('this.dataSourceKhdx', this.dataSourceKhdx)
      var newArr = [];
      if(array && array.length) {
        array.forEach(el => {
          var isContain = false;
          for(var i = 0; i < this.dataSourceKhdx.length; i ++ ) {
            if(el.zzbz == this.dataSourceKhdx[i].zzbz && el.gwbz == this.dataSourceKhdx[i].gwbz && !this.dataSourceKhdx[i].yggh) {
              isContain = true;
              break;
            }else{
              isContain = false;
            }
          }
          if(!isContain) {
            newArr.push(el)
          }
        })
      }
      this.dataSourceKhdx = this.dataSourceKhdx.concat(newArr)
    },
    onDelete(key) {
      const dataSource = [...this.dataSourceKhdx];
      this.dataSourceKhdx = dataSource.filter(item => item.id !== key);
    },
  }
}
</script>

<style lang="less" scoped>

</style>