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
        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="报表编号">
              <a-input placeholder="请输入报表编号" v-decorator="['bbbh', validatorRules.bbbh ]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="报表名称">
              <a-input placeholder="请输入报表名称" v-decorator="['bbmc', validatorRules.bbmc]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="报表类型">
              <j-dict-select-tag  v-decorator="['bblx', validatorRules.bblx]" :triggerChange="true" placeholder="请选择报表类型"
                                  dictCode="rep_bblx"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="时间类型">
              <j-dict-select-tag  v-decorator="['sjlx', validatorRules.sjlx]" :triggerChange="true" placeholder="请选择时间类型"
                                  dictCode="rep_sjlx"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="是否启用">
              <j-dict-select-tag  v-decorator="['sfqy', {rules: [],initialValue:'1'}]" :triggerChange="true" placeholder="请选择是否启用"
                                  dictCode="sfbz"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="报表顺序">
              <a-input placeholder="请输入报表顺序" v-decorator="['bbsx', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="报表填充方式">
              <j-dict-select-tag  v-decorator="['bbtcfs', {rules: [],initialValue:'1'}]" :triggerChange="true" placeholder="请选择报表填充方式"
                                  dictCode="bbtcfs"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="报表数据表名">
              <a-input placeholder="报表填充方式为列表式报表时需要填写" v-decorator="['bbsjbm', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="行数">
              <a-input-number placeholder="请输入行数" v-decorator="['rnum', {}]" style="width: 150px;"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="列数">
              <a-input-number placeholder="请输入列数" v-decorator="['cnum', {}]" style="width: 150px;"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="备注">
              <a-input placeholder="请输入备注" v-decorator="['bz', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="报表模板文件">
              <JUploadOne
                v-decorator="['uploadFile', {'initialValue': model.bblj, 'rules': validatorRules.bblj}]"
                :text="uploadText"
                class="upload-list-inline"
                biz-path="report"
              />
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
  import JUploadOne from '@/components/jeecg/JUploadOne'

  export default {
    name: "BbmbglModal",
    components: {
      JUploadOne
    },
    data () {
      return {
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
        uploadText: '上传附件',
        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
          bbbh: {rules: [{ required: true, message: '请输入报表编号!' }]},
          bbmc: {rules: [{ required: true, message: '请输入报表名称!' }]},
          bblx: {rules: [{ required: true, message: '请选择报表类型!' }]},
          sjlx: {rules: [{ required: true, message: '请选择时间类型!' }]},
          bblj: [{ required: true, message: '请上传报表模板文件!' }],
        },
        url: {
          add: "/bbgl/bbmbgl/add",
          edit: "/bbgl/bbmbgl/edit",
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
        this.form.resetFields();
        this.model = Object.assign({}, record);
        if (this.model.bbbh) {
          this.uploadText = '重新上传附件'
        } else {
          this.uploadText = '上传附件'
        }
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'bbbh','bbmc','bblx','sjlx','sfqy','bbsx','rnum','cnum','bz','bbtcfs','bbsjbm'))
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
            //文件路径
            formData.wjmc = formData.uploadFile.name
            formData.bblj = formData.uploadFile.path
            console.log(formData)
            httpAction(httpurl,formData,method).then((res)=>{
              if(res.success){
                that.$message.success(res.message);
                that.$emit('ok');
                that.close();
              }else{
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
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