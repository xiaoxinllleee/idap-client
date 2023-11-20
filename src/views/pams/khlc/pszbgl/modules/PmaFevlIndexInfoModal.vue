<template>
  <a-drawer
      :title="title"
      :maskClosable="true"
      :width="800"
      placement="right"
      :closable="true"
      @close="close"
      :visible="visible"
  >

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="指标编号">
          <a-input placeholder="请输入派生指标编号"  :disabled="this.flag" v-decorator="['indexId', validatorRules.indexId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="指标名称">
          <a-input placeholder="请输入派生指标名称" v-decorator="['indexName', validatorRules.indexName ]" />
        </a-form-item>
       <!-- <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="指标归属机构">
          <a-input placeholder="请输入指标归属机构" v-decorator="['orgId', {}]" />
        </a-form-item>-->

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="度量类型">
          <j-dict-select-tag  v-decorator="['metricType', {rules: [{ required: true, message: '请选择质量类型!' }]}]" :triggerChange="true" placeholder="请选择质量类型"
                              dictCode="METRIC_TYPE"/>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="结果值类型">
          <j-dict-select-tag  v-decorator="['type', {rules: [{ required: true, message: '请选择结果值类型!' }]}]" :triggerChange="true" placeholder="请选择结果值类型"
                              dictCode="pszbjgType"/>
        </a-form-item>


        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="考核对象">
          <j-dict-select-tag  v-decorator="['evlobjTypeId', {rules: [{ required: true, message: '请选择考核对象!' }]}]" :triggerChange="true" placeholder="请选择考核对象"
                              dictCode="OBJ"/>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否简单公式">
          <j-dict-select-tag  v-decorator="['sfjdgs', {rules: [{ required: true, message: '请选择是否简单公式!' }],initialValue:'2'}]" :triggerChange="true" placeholder="请选择是否简单公式"
                              dictCode="sfbz"/>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="计算公式">

          <a-input-search
            placeholder="点击右侧按钮编辑公式"
            v-decorator="['formula', {}]"
            readOnly
            @search="onSearch">
            <a-button slot="enterButton" icon="select">编辑公式</a-button>
          </a-input-search>

<!--
          <a-input placeholder="请输入计算公式" v-decorator="['formula', {}]" /><a-button slot="enterButton" icon="search">选择</a-button>
-->


        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存储过程名称">
          <a-input placeholder="请输入存储过程名称" v-decorator="['spName', {}]" />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="公式描述">
          <a-input placeholder="请输入公式描述" v-decorator="['formulaNotes', {}]" />
        </a-form-item>


        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="描述">
          <a-input placeholder="请输入描述" v-decorator="['remark', {}]" />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="执行顺序">
          <a-input type="number" placeholder="请输入执行顺序" v-decorator="['zxsx', {}]" />
        </a-form-item>

       <!-- <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="作用域机构">
          <a-input placeholder="请输入作用域机构" v-decorator="['scopeOrgId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="数据删除标志">
          <a-input placeholder="请输入数据删除标志" v-decorator="['statFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务条线编号">
          <a-input placeholder="请输入业务条线编号" v-decorator="['bussSysNo', {}]" />
        </a-form-item>
-->
      </a-form>
    </a-spin>
    <ZbTreeModal ref="zbTreeModal" @ok="modalFormOk"></ZbTreeModal>

    <div class="drawer-bootom-button" >
      <a-popconfirm title="确定放弃编辑？" @confirm="handleCancel" okText="确定" cancelText="取消">
        <a-button style="margin-right: .8rem">取消</a-button>
      </a-popconfirm>
      <a-button @click="handleOk" type="primary" :loading="confirmLoading">提交</a-button>
    </div>



  </a-drawer>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import {duplicateCheckPams } from '@/api/api'
  import ZbTreeModal from './ZbTreeModal'

  export default {
    name: "PmaFevlIndexInfoModal",
    components: {
      ZbTreeModal,
    },
    data () {
      return {
        checkedString:'',
        flag :true,
        title:"操作",
        indexId:'',
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
        indexId:{
            rules: [{
              required: true, message: '请输入指标编号!'
            },{
              validator: this.validateIndexId,
            }]
          },
          indexName:{rules: [{ required: true, message: '请输入派生指标名称!' }]},
        },
        url: {
          add: "/khlc/pszbgl/pmaFevlIndexInfo/add",
          edit: "/khlc/pszbgl/pmaFevlIndexInfo/edit",
        },
      }
    },
    created () {
    },
    methods: {
      add () {
        this.edit({});
      },
      edit (record) {
        console.log(record)
         if(record.id){
           this.flag=true;
         }else{
           this.flag=false;
         }
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.indexId=record.indexId;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'indexId','indexName','orgId','remark','evlobjTypeId','formula','formulaNotes','metricType','type','scopeOrgId','statFlag','bussSysNo','spName','zxsx'))
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
            if(!this.model.id){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化

            console.log(formData+"============派生指标提交")
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

      validateIndexId(rule, value, callback){
        var params = {
          tableName: 'PMA_F_EVL_INDEX_INFO',
          fieldName: 'INDEX_ID',
          fieldVal: value,
          dataId: this.indexId
        };
        duplicateCheckPams(params).then((res) => {
          if (res.success) {
            callback()
          } else {
            if(!this.flag){
              callback("指标编号已存在!")
            }else{
              callback()
            }
          }
        })
      },
      handleCancel () {
        this.close()
      },
      onSearch(){
        console.log(this.$refs.zbTreeModal);
        console.log(this.model.formula )
        this.$refs.zbTreeModal.add(this.model.formula );
      },
      modalFormOk (data) {
        console.log('----',data.gsbds);
        this.form.setFieldsValue({
          formula: data.gsbds
        })
      },
    }
  }
</script>

<style lang="less" scoped>



.avatar-uploader > .ant-upload {
  width:104px;
  height:104px;
}
.ant-upload-select-picture-card i {
  font-size: 49px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}

.ant-table-tbody .ant-table-row td{
  padding-top:10px;
  padding-bottom:10px;
}

.drawer-bootom-button {
  position: absolute;
  //bottom: -8px;
  width: 100%;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  left: 0;
  background: #fff;
  border-radius: 0 0 2px 2px;
}
</style>