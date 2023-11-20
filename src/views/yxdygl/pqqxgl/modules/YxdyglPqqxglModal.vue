<template>
  <a-modal
    :title="title"
    :width="1400"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    :body-style="{height: modalHeight, overflowY: 'auto'}"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-row :gutter="24">
        <a-col :md="6" :sm="24">
          <a-card title="选择网格" :bordered="false">
            <!-- 默认父子关联-->
            <!--<a-radio-group default-value="2" @change="switchCheckStrictly" slot="extra">-->
              <!--<a-radio-button value="1">-->
                <!--父子关联-->
              <!--</a-radio-button>-->
              <!--<a-radio-button value="2">-->
                <!--取消关联-->
              <!--</a-radio-button>-->
            <!--</a-radio-group>-->
            <a-spin :spinning="treeDataLoading">
              <div style="background: #fff;padding-left:16px;height: 100%; margin-top: 5px">
                <!-- 树-->
                <a-tree
                  v-model="checkedKeys"
                  checkable
                  @check="onCheck"
                  :treeData="treeData"
                  :checkStrictly="checkStrictly"
                  :replaceFields="{ title:'wgmc', key:'id'}"
                />
              </div>
            </a-spin>
          </a-card>
        </a-col>
        <a-col :md="18" :sm="24">
          <a-row>
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="客户经理权限类型">
              <j-dict-select-tag placeholder="请选择客户经理权限类型" style="width: 200px;"
                                 v-model="sfzkhjl" dictCode="sfzkhjl" />
            </a-form-item>
          </a-row>
          <a-row>
            <a-col :md="24" :sm="24">
              <a-card :bordered="true">
                <div class="table-page-search-wrapper">
                  <a-form layout="horizontal">
                    <a-row>
                      <a-col :span="6">
                        <a-form-item label="所属支行" :label-col="{span: 8}"
                                     :wrapper-col="{span: 14}">
                          <j-tree-select placeholder="请选择所属支行" v-model="queryParam.zzbz"
                                         dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                                         :sszh="true" :showSearch="false" :treeDefaultExpandAll="true" :filterTreeNode="true" :isAll="isAll"/>
                        </a-form-item>
                      </a-col>

                      <a-col :span="6"><a-form-item label="员工姓名" :label-col="{span: 8}" :wrapper-col="{span: 14}">
                        <j-input placeholder="请输入员工姓名" v-model="queryParam.ygxm"/>
                      </a-form-item></a-col>
                      <a-col :span="6"><a-form-item label="员工工号" :label-col="{span: 8}" :wrapper-col="{span: 14}">
                        <a-input placeholder="请输入员工工号" v-model="queryParam.yggh"/>
                      </a-form-item>
                      </a-col>
                      <!--<a-col :span="6"><a-form-item label="客户经理标识">-->
                        <!--<a-input placeholder="请输入客户经理标识" v-model="queryParam.khjlbz"/>-->
                      <!--</a-form-item></a-col>-->
                      <a-col :span="6" ><span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
                          <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
                          <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
                        </span>
                      </a-col>
                    </a-row>
                  </a-form>
                </div>

                <a-table bordered
                         ref="table"
                         :scroll="scrollTrigger"
                         size="middle"
                         rowKey="yggh"
                         :columns="columns"
                         :dataSource="dataSource"
                         :pagination="ipagination"
                         :loading="loading"
                         :rowSelection="{type: myType, selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
                         @change="handleTableChange"/>
              </a-card>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction,getAction,postAction } from '@/api/manage'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JInput from '@/components/jeecg/JInput'

  export default {
    name: "YxdyglPqqxglModal",
    mixins: [JeecgListMixin],
    props:{
      modalWidth:'',
      type: {
        type: String,
        required: false,
        default: 'checkbox'
      },
    },
    components: {JInput, JTreeSelect},
    data () {
      return {
        myType:'checkbox',
        sfzkhjl:'',
        isAll:false,
        checkStrictly: false,
        selectedRowKeys:[],
        selectedRows:[],
        scrollTrigger: {},
        checkedKeys: [],
        treeData:[],
        treeDataLoading: false,
        title:"操作",
        visible: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },

        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
        sfzkhjl:{rules: [{ required: true, message: '请输入是否主客户经理!' }]},
        },
        url: {
          list: "/hr/vhrbasstaffpost/list",
          add: "/pqqxgl/yxdyglPqqxgl/add",
          edit: "/YXDYGL_PQQXGL/yxdyglPqqxgl/edit",
          treeUrl:"/yxdyglmain/yxdyglMain/getYxdyglMaimTreeDate",
        },
        columns: [
          {
            title: '所属支行',
            align: "center",
            dataIndex: 'zzbz_dictText',
            fixed: 'left',
            width: 200
          },
          {
            title: '员工工号',
            align: "center",
            dataIndex: 'yggh',
            fixed: 'left',
            width: 200
          },
          {
            title: '员工姓名',
            align: "center",
            dataIndex: 'ygxm',
          },
          {
            title: '客户经理编号',
            align: "center",
            dataIndex: 'khjlbz'
          },
        ],
        dataSource: [],
        ykhjl:'',
      }
    },
    computed: {
      modalHeight: function() {
        return (document.documentElement.clientHeight - 200 - 50) + 'px';
      },
    },
    watch:{
      sfzkhjl:'sfChange'
    },
    methods: {
      add () {
        this.edit({});
      },
      onSelectChange(selectedRowKeys, selectionRows) {
          this.selectedRowKeys = selectedRowKeys;
          this.selectedRows = selectionRows;
      },
      switchCheckStrictly (e) {
        console.log('switchCheckStrictly', e)
        let v = e.target.value
        if(v==1){
          this.checkStrictly = false
        }else if(v==2){
          this.checkStrictly = true
        }
      },
      edit (record) {
        let params = {"khjl":record.khjl, "queryOrganize": '2'}
        this.ykhjl = record.khjl;
        this.treeDataLoading = true
        getAction(this.url.treeUrl,params).then((res) => {
          this.treeData = res.result
        }).finally(()=>{
          this.treeDataLoading = false
        })
        this.visible = true;

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
      onCheck(checkedKeys) {
        console.log('onCheck', checkedKeys);
        if(this.checkStrictly){
          this.checkedKeys = checkedKeys.checked;
        }else{
          this.checkedKeys = checkedKeys
        }
      },

      close () {
        this.$emit('close');
        this.checkedKeys = []
        this.selectedRowKeys = []
        this.selectedRows = []
        this.sfzkhjl = '';
        this.visible = false;
      },
      handleOk () {
        if (this.sfzkhjl == null || this.sfzkhjl == ''){
          this.$message.warning("请选择客户经理权限类型");
          return
        }

        if (this.selectedRowKeys.length < 1){
          this.$message.warning("至少选择一个用户");
          return
        }
        if (this.checkedKeys.length < 1){
          this.$message.warning("至少选择一个单元");
          return
        }
        let formData = {"selectedRowKeys":this.selectedRowKeys
        ,"checkedKeys":this.checkedKeys,"khjl":this.ykhjl,"sfzkhjl":this.sfzkhjl}
        console.log(formData)
        postAction(this.url.add,formData).then((res)=>{
          if(res.success){
            this.$message.success(res.message);
            this.$emit('ok');
            this.close();
          }else{
            this.$message.warning(res.message,5);
          }
        })
        /*this.form.validateFields((err, values) => {
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
        })*/
      },
      handleCancel () {
        this.close()
      },
      sfChange(){
        console.log(this.sfzkhjl)
        if (this.sfzkhjl == 1){
          this.myType = "radio";
          this.selectedRowKeys = [];
          this.selectedRows = [];
        }else {
          this.myType = "checkbox";
          this.selectedRowKeys = [];
          this.selectedRows = [];
        }
      },


    },


  }
</script>

<style lang="less" scoped>

</style>