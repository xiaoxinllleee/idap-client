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

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="基础指标编号">
          <a-input placeholder="请输入基础指标编号" v-decorator="['indexId', validatorRules.Id]" />
        </a-form-item>


        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="基础指标名称">
          <a-input placeholder="请输入基础指标名称" v-decorator="['indexName', {}]" />
        </a-form-item>
        <!--<a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="指标归属机构">
          <a-input placeholder="请输入指标归属机构" v-decorator="['orgId', {}]" />
        </a-form-item>-->
        <!--<a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务类型标志">
          <a-input placeholder="请输入业务类型标志" v-decorator="['bizFlg', {}]" />
        </a-form-item>-->


        <a-form-item label="业务类型标志" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag :triggerChange="true"  placeholder="可以选择业务类型标志" v-decorator="['bizFlg', {}]" dict-code="BIZ_FLG" style="width: 100%;"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存储过程名称">
          <a-input placeholder="请输入存储过程名称" v-decorator="['spName', {}]" />
        </a-form-item>
        <!--<a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="数据删除标志">
          <a-input placeholder="请输入数据删除标志" v-decorator="['statFlag', {}]" />
        </a-form-item>-->
        <!--<a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务条线编号">
          <a-input placeholder="请输入业务条线编号" v-decorator="['bussSysNo', {}]" />
        </a-form-item>-->

        <a-form-item label="币种" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <j-multi-select-tag placeholder="可以多选择币种" v-decorator="['selectedBz', {}]" dict-code="BZ_TYPE" style="width: 100%;"/>
        </a-form-item>

        <a-form-item label="余额类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-multi-select-tag placeholder="可以多选择余额类型" v-decorator="['selectedYe', {}]" dict-code="YE_TYPE" style="width: 100%;"/>
        </a-form-item>

        <a-form-item label="评价对象" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-multi-select-tag placeholder="可以多选择评价对象" v-decorator="['selectedPj', {}]" dict-code="OBJ" style="width: 100%;"/>
        </a-form-item>

        <a-form-item label="应用类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-multi-select-tag placeholder="可以多选择应用类型" v-decorator="['selectedYy', {}]" dict-code="INDEX_APPLY_TYPE" style="width: 100%;"/>
        </a-form-item>

        <a-form-item label="逻辑类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag :triggerChange="true"  placeholder="可以选择逻辑类型" v-decorator="['logicType', {}]" dict-code="LOGIC_TYPE" style="width: 100%;"/>
        </a-form-item>


        <!--<a-form-item label="余额类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select
            mode="multiple"
            placeholder="请选择余额类型"
            optionFilterProp = "children"
            v-model="selectedYe"
          >
            <a-select-option v-for="(i,index) in YeList" :key="index" :value="i.value">
              {{i.text}}
            </a-select-option>
          </a-select>
        </a-form-item>-->

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="备注">
          <a-textarea placeholder="请输入备注" :rows="4" v-decorator="['indexRemark', {}]"/>
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction,getAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import JMultiSelectTag from '@/components/dict/JMultiSelectTag'
  import JDictSelectTag from '@/components/dict/JDictSelectTag'
  import {  duplicateCheckPams, ajaxGetDictItems } from '@api/api'

  export default {
    name: "PmaFBaseIndexInfoModal",
    components:{
      JMultiSelectTag,JDictSelectTag
    },
    data () {
      return {
        title:"操作",
        visible: false,
        model: {},
        indexTypeId:'',
        pName:'可以多选择逻辑类型',
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
          Id:{
            rules: [{
              required: true, message: '请输入指标编号!'
            },{
              validator: this.validateId,
            }]
          },
          indexName:{rules: [{ required: true, message: '请输入派生指标名称!' }]},
        },
        url: {
          add: "/jczbgl/pmaFBaseIndexInfo/add",
          edit: "/jczbgl/pmaFBaseIndexInfo/edit",
          bz: "/jczbgl/pmaFCurDim/queryByIndexId",
        },
        id:'',
      }
    },
    created () {
    },
    methods: {
      add (data) {
        this.indexTypeId = data
        this.edit()
      },
      edit (record) {

        if (record != null && record.id != null){
          this.id = record.id;
        }

        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;

        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'indexId','indexName','orgId','indexRemark','bizFlg','spName','statFlag','bussSysNo','selectedBz','selectedYe','selectedYy','selectedPj','logicType'))
		  //时间格式化
        });
        this.model.indexTypeId = this.indexTypeId

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
            if(this.model.id == null || this.model.id == ''){
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
      validateId(rule, value, callback){
        var params = {
          tableName: 'PMA_F_BASE_INDEX_INFO',
          fieldName: 'INDEX_ID',
          fieldVal: value,
          dataId: this.id
        };
        duplicateCheckPams(params).then((res) => {
          if (res.success) {
            callback()
          } else {
            if(!this.flag){
              callback("用户名已存在!")
            }else{
              callback()
            }
          }
        })
      },
      handleCancel () {
        this.close()
      },
      initAllData(){
        this.initBzType()
      },
      initBzType(){
        ajaxGetDictItems("BZ_TYPE").then((res)=>{
          if(res.success){
            this.bzList = res.result;
          }else{
            console.log(res.message);
          }
        });
      },



    }
  }
</script>

<style lang="less" scoped>

</style>