<template>
  <a-modal
    :title="title"
    :width="1200"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    :okButtonProps="{ props: {disabled: disableSubmit} }"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row class="form-row" :gutter="8">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="组织标识">
              <a-input placeholder="组织标识" :disabled="model.zzbz != undefined" v-decorator="['zzbz' ,validatorRules.zzbz]"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="组织名称">
              <a-input placeholder="请输入组织名称" v-decorator="['zzmc', validatorRules.zzmc ]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="8">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="组织简称">
              <a-input placeholder="请输入组织简称" v-decorator="['zzjc', validatorRules.zzjc]"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="上级组织">
              <j-tree-select
                v-decorator="['sjzzbz',{rules: [{ required: true, message: '请选择上级组织!' }]}]"
                placeholder="请选择支行"
                dict="hr_bas_organization,zzjc,zzbz"
                pidField="sjzzbz"
                :treeDefaultExpandAll=true
                :disabled="false"
              >
              </j-tree-select>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="8">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="排序序号">
              <a-input type="number" placeholder="请输入排序序号" v-decorator="['pxxh', {rules: [{ required: true, message: '请选择排序序号!' }]}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="启用标识">
              <j-dict-select-tag  v-decorator="['qybz', {rules: [],initialValue:'1'}]" :triggerChange="true" placeholder="请选择启用标识"
                                  dictCode="sfbz" :pleaseSelect="false" allowClear/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="8">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="组织类别">
              <j-dict-select-tag  v-decorator="['zzlb', {rules: []}]" :triggerChange="true" placeholder="请选择组织类别"
                                  dictCode="zzlb" :pleaseSelect="false" allowClear/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="组织级别">
              <j-dict-select-tag  v-decorator="['zzjb', {rules: []}]" :triggerChange="true" placeholder="请选择组织级别"
                                  dictCode="zzjb" :pleaseSelect="false" allowClear/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="8">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="业务机构代码">
              <a-input placeholder="请输入业务机构代码" v-decorator="['ywjgdm', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="报表权限机构代码">
              <a-input placeholder="请输入报表权限机构代码" v-decorator="['bbqxjgdm', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="8">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="业务机构标识">
              <j-dict-select-tag  v-decorator="['ywjgbz', {rules: [],initialValue:'1'}]" :triggerChange="true" placeholder="请选择业务机构标识"
                                  dictCode="sfbz" :pleaseSelect="false" allowClear/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="机构经营类型">
              <j-dict-select-tag  v-decorator="['jgjylx', {rules: [],initialValue:'1'}]" :triggerChange="true" placeholder="请选择组织类别"
                                  dictCode="jgjylx" :pleaseSelect="false" allowClear/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="8">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="业务机构类型">
              <j-dict-select-tag  v-decorator="['ywjglx']" :triggerChange="true" placeholder="请选择组织类别"
                                  dictCode="wdlx" :pleaseSelect="false" allowClear/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="业务机构性质">
              <j-dict-select-tag  v-decorator="['ywjgxz', {rules: [],initialValue:'1'}]" :triggerChange="true" placeholder="请选择组织级别"
                                  dictCode="wdxz" :pleaseSelect="false" allowClear/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="8">

          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="所在区域">
              <j-dict-select-tag  v-decorator="['szqy', {rules: [],initialValue:'1'}]" :triggerChange="true" placeholder="请选择组织级别"
                                  dictCode="szqy" :pleaseSelect="false" allowClear/>
            </a-form-item>
          </a-col>
        </a-row>


      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@api/manage'
  import pick from 'lodash.pick'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { duplicateCheck } from '@/api/api'
  export default {
    name: "HrBasOrganizationModal",
    components: {
      JTreeSelect
    },
    data () {
      return {
        title:"操作",
        visible: false,
        disableSubmit: false,
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
          zzbz:{rules: [{ required: true, message: '请输入组织标识!' }, {validator:this.validateInputZzbz}]},
          zzmc:{rules: [{ required: true, message: '请输入组织名称!' }]},
          zzjc:{rules: [{ required: true, message: '请输入组织简称!' }]},
          //pxxh:{rules: [{ required: true, message: '请输入排序序号!' }]},
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
      validateInputZzbz(rule, value, callback){
        console.log("value",value)
        if (!this.model.zzbz && value) {
          var params = {
            tableName: "HR_BAS_ORGANIZATION",
            fieldName: "zzbz",
            fieldVal: value,
            //dataId: this.model.id
          };
          duplicateCheck(params).then((res)=>{
            if(res.success){
              callback();
            }else{
              callback(res.message);
            }
          })
        } else {
          callback();
        }
      },
      add () {
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'jgjylx','zzbz','zzmc','zzlb','zzjb','qybz','sjzzbz','zzjc','ywjgdm','bbqxjgdm','ywjglx','ywjgxz','ywjgbz','pxxh','szqy'))
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