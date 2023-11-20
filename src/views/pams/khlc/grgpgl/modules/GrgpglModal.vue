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

        <a-row>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="员工工号">
              <a-input placeholder="请输入员工工号" v-decorator="['yggh', validatorRules.yggh ]" disabled/>
              <a-button @click="FindBack" type="primary" icon="plus" v-show="model.pdrq === undefined">查找带回</a-button>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="员工姓名">
              <a-input placeholder="请输入员工姓名" v-decorator="['yggh_dictText', {}]" disabled/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
        <a-col :span="12">
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="组织标识">
            <j-tree-select
              v-decorator="['zzbz',{}]"
              placeholder="请选择组织标识"
              treeNodeFilterProp="title"
              dict="v_hr_bas_organization_cmms, zzjc, zzbz"
              :sszh="true"
              pid-field="sjzzbz"
              :showSearch="true"
              :treeDefaultExpandAll=true
              disabled
            />
          </a-form-item>
        </a-col>
        <!--<a-col :span="12">-->
          <!--<a-form-item-->
            <!--:labelCol="labelCol"-->
            <!--:wrapperCol="wrapperCol"-->
            <!--label="组织标识">-->
            <!--<j-tree-select-->
              <!--v-decorator="['zzbz_dictText',{}]"-->
              <!--placeholder="请选择组织标识"-->
              <!--treeNodeFilterProp="title"-->
              <!--dict="v_hr_bas_organization_cmms, zzjc, zzbz"-->
              <!--:sszh="true"-->
              <!--pid-field="sjzzbz"-->
              <!--:showSearch="true"-->
              <!--:treeDefaultExpandAll=true-->
              <!--disabled-->
            <!--/>-->
          <!--</a-form-item>-->
        <!--</a-col>-->
        </a-row>


        <a-row>
        <a-col :span="12">
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="岗位标志">
            <a-input placeholder="请输入岗位标识" v-decorator="['gwbz', {} ]" disabled/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="岗位名称">
            <j-dict-select-tag
              v-decorator="['gwbz_dictText',{}]"
              placeholder="全部"
              dictCode="Hr_bas_post,gwmc,gwbz"
              :triggerChange="true"
              disabled
            />
          </a-form-item>
        </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="挂片部门">
          <div style="background: #fff;padding-left:16px;height: 100%; margin-top: 5px">
            <!-- 树-->
            <div class="tree-bar">
              <a-directory-tree
                style="height: 30vh;overflow-y:auto;"
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
        <!--  <j-tree-select
            v-decorator="['bmbz',{}]"
            placeholder="请选择挂片部门"
            treeNodeFilterProp="title"
            dict="v_hr_bas_organization_cmms, zzjc, zzbz"
            :sszh="true"
            pid-field="sjzzbz"
            :showSearch="true"
            :treeDefaultExpandAll=true
          />-->
        </a-form-item>
          </a-col>
          <a-col :span="12">
          </a-col>
        </a-row>

      </a-form>
    </a-spin>

    <account-info ref="accountInfo" @close="colseWindow"></account-info>

  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import AccountInfo from './AccountInfo'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'
  import { queryDepartTreeList } from '@api/api'

  export default {
    name: "GrgpglModal",
    components:{
      JTreeSelect,AccountInfo
    },
    data () {
      return {
        title:"操作",
        visible: false,
        checkedKey: [],
        departTree: [],
        bmbz: [],
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
        yggh:{rules: [{ required: true, message: '请输入员工工号!' }]},
        bmbz:{rules: [{ required: true, message: '请输入部门标识!' }]},
        gwbz:{rules: [{ required: true, message: '请输入岗位标识!' }]},
        zzbz:{rules: [{ required: true, message: '请输入组织标识!' }]},
        },
        url: {
          add: "/grgpgl/grgpgl/add",
        },
      }
    },
    created () {
    },
    methods: {
      select(checkedKeys, e) {
        console.log(checkedKeys)
        this.checkedKey=checkedKeys;
      },
      loadTree(){
        queryDepartTreeList().then((res) => {
          this.departTree = res.result
        })
      },


      FindBack () {
        this.$refs.accountInfo.init()
      },
      colseWindow (args) {
        this.queryParam =args
        /*this.queryParam.gwbz = args.gwbz
        this.queryParam.gwbz_dictText = args.gwbz_dictText
        this.queryParam.zzbz = args.zzbz
        this.queryParam.yggh = args.yggh
        this.queryParam.yggh_dictText = args.yggh_dictText
        this.queryParam.zzbz = args.zzbz
        this.queryParam.zzbz_dictText = args.zzbz_dictText*/
        this.model = Object.assign({}, this.queryParam)
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'yggh', 'yggh_dictText', 'zzbz', 'gwbz','gwbz_dictText','zzbz_dictText'))  // loadsh的pick方法
        })
      },

      add () {
        this.visible = true;
        this.loadTree()
      /*  this.edit({});*/
      },
     /* edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'yggh','yggh_dictText','bmbz','gwbz','gwbz_dictText','zzbz','zzbz_dictText'))
		  //时间格式化
        });

      },*/
      close () {
        this.form.resetFields()
        this.model={}
        this.checkedKey=[]
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        if (this.checkedKey==0){
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
            //this.model.bmbz=this.checkedKey
            //let formData = Object.assign(this.model, values);
            console.log(this.model,'@@@@@@@')
            let formData ={
              "bmbzList":this.checkedKey,
              "yggh":this.model.yggh,
              "gwbz":this.model.gwbz,
              "zzbz":this.model.zzbz,
            }
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