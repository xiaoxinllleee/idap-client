<template>
  <a-modal
    :title="title"
    :width="1200"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row :gutter="24" type="flex" >

            <a-col :span="12" >
              <a-card style="width:100%;" title="请选择部门">
              <a-tree
                style="height: 70vh;overflow-y:auto"
                v-model="checkedKeys"
                checkable
                :tree-data="treeData2"
                :replaceFields="children"
                tree-default-expand-all
                @check="onCheck"
              />
              </a-card>
            </a-col>
          <a-col :span="12">
            <a-card style="width:100%;" title="请选择组织">
            <div style="background: #fff;padding-left:16px;height: 100%; margin-top: 5px">
              <!-- 树-->
              <div class="tree-bar">
                <a-directory-tree
                  style="height: 70vh;width:50vh;overflow-y:auto;"
                  selectable
                  :defaultExpandAll="true"
                  :checkable="true"
                  :checkStrictly="false"
                  v-model="checkedKey"
                  @check="select"
                  :dropdownStyle="{maxHeight:'200px',overflow:'auto'}"
                  :treeData="departTree"
                />
              </div>
            </div>
            </a-card>
          </a-col>

        </a-row>
        <!--   <a-form-item
             :labelCol="labelCol"
             :wrapperCol="wrapperCol"
             label="部门标识">
             <j-tree-select
               v-decorator="['bmbz',validatorRules.bmbz]"
               placeholder="请选择组织标识"
               treeNodeFilterProp="title"
               dict="v_hr_bas_organization_cmms, zzjc, zzbz"
               :sszh="true"
               pid-field="sjzzbz"
               :showSearch="true"
               :treeDefaultExpandAll=true
             />
           </a-form-item>
           <a-form-item
             :labelCol="labelCol"
             :wrapperCol="wrapperCol"
             label="组织标识">
             <j-tree-select
               v-decorator="['zzbz',validatorRules.zzbz]"
               placeholder="请选择组织标识"
               treeNodeFilterProp="title"
               dict="v_hr_bas_organization_cmms, zzjc, zzbz"
               :sszh="true"
               pid-field="sjzzbz"
               :showSearch="true"
               :treeDefaultExpandAll=true
             />
           </a-form-item>-->

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { getAction, httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JTreeSelect from '@comp/jeecg/JTreeSelect'
  import { queryDepartTreeList } from '@api/api'

  export default {
    name: "BmgpglModal",
    components: {
      JTreeSelect
    },
    data () {
      return {
        title:"操作",
        visible: false,
        checkedKey: [],
        departTree: [],
        treeData2:[],
        checkedKeys: [],
        children: {title:'zzjc',key:'zzbz',value:'zzbz' },
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
        bmbz:{rules: [{ required: true, message: '请输入部门标识!' }]},
        zzbz:{rules: [{ required: true, message: '请输入组织标识!' }]},
        },
        url: {
          add: "/bmgpgl/bmgpgl/add",
        },
      }
    },
    created () {
      this.bmbzList()
    },
    methods: {
      bmbzList(){
        getAction('/bmgpgl/bmgpgl/bmbzList', {}).then(res => {
          console.log('res.result', res.result)
          this.treeData2 = res.result
        })
      },
      select(checkedKeys, e) {
        this.checkedKey=checkedKeys;
      },
      loadTree(){
        queryDepartTreeList().then((res) => {
          this.departTree = res.result
        })
      },
      add () {
        this.visible = true;
        this.loadTree()
      },


      onSelect() {
        console.log(...arguments);
      },
      onCheck(checkedKeys) {
        console.log('onCheck', checkedKeys);
        this.checkedKeys = checkedKeys;
      },

      close () {
        this.checkedKey=[]
        this.checkedKeys=[]
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        console.log(this.checkedKey)
        console.log(this.checkedKeys)
        if (this.checkedKey.length ==0){
          this.$message.warning('请选择挂片组织机构！')
          return
        }
        if (this.checkedKeys==0){
          this.$message.warning('请选择部门！')
          return
        }
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';

              httpurl+=this.url.add;
              method = 'post';

            let formData = {
              'zzbzList':this.checkedKey,
              'bmbzList':this.checkedKeys,
                  };

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


    }
  }
</script>

<style lang="less" scoped>

</style>