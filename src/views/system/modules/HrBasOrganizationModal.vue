<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row :gutter="24">
          <a-col  :md="12" :sm="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="组织标识">
              <a-input  placeholder="请输入组织标识" v-decorator="['zzbz', {rules: [{ required: true, message: '请输入组织标志' }]}]"  />
            </a-form-item>
          </a-col>
          <a-col  :md="12" :sm="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="组织名称">
              <a-input :required="true" placeholder="请输入组织名称" v-decorator="['zzmc', {rules: [{ required: true, message: '请输入组织名称' }]}]" />
            </a-form-item>
          </a-col>
        </a-row>



        <a-row :gutter="24">
          <a-col  :md="12" :sm="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="组织类别">
              <a-select placeholder="请选择组织类别"  style="width: 220px" :required="true"  v-decorator="['zzlb', {rules: [{ required: true, message: '请选择组织类别' }]}]">
                <a-select-option value="1">联社</a-select-option>
                <a-select-option value="2">分社</a-select-option>
                <a-select-option value="3">部门</a-select-option>
                <a-select-option value="4">支行/社</a-select-option>
                <a-select-option value="5">网点/分社</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col  :md="12" :sm="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="组织级别">
              <a-select placeholder="请选择组织级别"  style="width: 220px" :required="true"  v-decorator="['zzjb', {rules: [{ required: true, message: '请选择组织级别' }]}]">
                <a-select-option value="1">省联社</a-select-option>
                <a-select-option value="2">市联社</a-select-option>
                <a-select-option value="3">农商行/县联社</a-select-option>
                <a-select-option value="4">支行/社/部门</a-select-option>
                <a-select-option value="5">网点/分社</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="24">
          <a-col  :md="12" :sm="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="启用标识">
              <a-select placeholder="请选择启用标识"  style="width: 220px" :required="true"  v-decorator="['qybz', {rules: [{ required: true, message: '请选择启用标识' }]}]">
                <a-select-option value="1">是</a-select-option>
                <a-select-option value="2">否</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col  :md="12" :sm="6">
          <!--  <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="上级组织标志">
              <a-input  placeholder="请输入上级组织标志" v-decorator="['sjzzbz', {rules: [{ required: true, message: '请输入上级组织标志' }]}]"  />
            </a-form-item>-->

            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="上级组织">
              <a-tree-select
                style="width:100%"
                :dropdownStyle="{maxHeight:'200px',overflow:'auto'}"
                :treeData="departTree"
                v-model="model.sjzzbz"
                placeholder="请选择上级部门"
                :disabled="condition">
              </a-tree-select>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="24">
          <a-col  :md="12" :sm="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="组织简称">
              <a-input placeholder="请输入组织简称" v-decorator="['zzjc', {rules: [{ required: true, message: '请输入组织名称' }]}]"/>
            </a-form-item>
          </a-col>
          <a-col  :md="12" :sm="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="业务机构代码">
              <a-input placeholder="请输入业务机构代码"  v-decorator="['ywjgdm', {}]"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col  :md="12" :sm="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="报表权限机构代码">
              <a-input placeholder="请输入报表权限机构代码" v-decorator="['bbqxjgdm', {}]" />
            </a-form-item>
          </a-col>
          <a-col  :md="12" :sm="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="业务机构类型">
              <a-select placeholder="请选择业务机构类型"  style="width: 220px"  v-decorator="['ywjglx', {}]">
                <a-select-option value="1">准柜员制</a-select-option>
                <a-select-option value="2">复合制</a-select-option>
                <a-select-option value="3">综合制</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col  :md="12" :sm="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="业务机构性质">
              <a-select placeholder="请选择业务机构性质"  style="width: 220px" :required="true"  v-decorator="['ywjgxz', {}]">
                <a-select-option value="1">有贷款城区支行</a-select-option>
                <a-select-option value="2">有贷款农村支行</a-select-option>
                <a-select-option value="3">无贷款支行</a-select-option>
                <a-select-option value="4">有不良贷款支行</a-select-option>
                <a-select-option value="5">无不良贷款支行</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col  :md="12" :sm="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="业务机构标识">
              <a-select placeholder="请选择业务机构标识"  style="width: 220px" :required="true"  v-decorator="['ywjgbz', {rules: [{ required: true, message: '请选择业务机构标识' }]}]">
                <a-select-option value="1">是</a-select-option>
                <a-select-option value="2">否</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="24">
          <a-col  :md="12" :sm="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="排序序号">
              <a-input placeholder="请输入排序序号"  v-decorator="['pxxh', {rules: [{ required: true, message: '请输入排序序号' }]}]" />
            </a-form-item>
          </a-col>
          <a-col  :md="12" :sm="6">

            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="所在区域">
              <a-select placeholder="请选择所在区域"  style="width: 220px" :required="true"  v-decorator="['szqy', {}]">
                <a-select-option value="1">城区社</a-select-option>
                <a-select-option value="2">城郊社</a-select-option>
                <a-select-option value="3">农村社</a-select-option>
                <a-select-option value="4">农村一类</a-select-option>
                <a-select-option value="5">农村二类</a-select-option>
                <a-select-option value="6">农村三类</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col  :md="12" :sm="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="机构经营类型">
              <a-select placeholder="请选择机构经营类型"  style="width: 220px" :required="true"  v-decorator="['jgjylx', {}]">
                <a-select-option value="1">经营型</a-select-option>
                <a-select-option value="2">服务型</a-select-option>
                <a-select-option value="3">效益型</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

        </a-row>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import {queryDepartTreeList, searchByKeywords, deleteByDepartId} from '@/api/api'

  export default {
    name: "HrBasOrganizationModal",
    data () {
      return {
        condition:false,
        departTree:[],
        title:"操作",
        visible: false,
        model: {},
        labelCol: {
          xs: {span: 24},
          sm: {span: 10}
        },
        wrapperCol: {
          xs: {span: 80},
          sm: {span: 12}
        },
        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
        zzbz:{rules: [{ required: true, message: '请输入组织标识!' }]},
        zzmc:{rules: [{ required: true, message: '请输入组织名称!' }]},
        },
        url: {
          add: "/sys/hrBasOrganization/add",
          edit: "/sys/hrBasOrganization/edit",
        },
      }
    },
    created () {
    },
    methods: {
      loadTreeData(){
        var that = this;
        queryDepartTreeList().then((res)=>{
          if(res.success){
            that.departTree = [];
            for (let i = 0; i < res.result.length; i++) {
              let temp = res.result[i];
              that.departTree.push(temp);
            }
          }

        })
      },
      add () {
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.loadTreeData();
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'zzbz','zzmc','zzlb','zzjb','qybz','sjzzbz','zzjc','ywjgdm','bbqxjgdm','ywjglx','ywjgxz','ywjgbz','pxxh','szqy','jgjylx'))
		  //时间格式化
        });

      },
      close () {
        this.$emit('close');
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
            if(!this.model.zzbz){
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
                this.loadTreeData();
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