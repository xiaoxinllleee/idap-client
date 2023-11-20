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
        <a-row class="form-row" :gutter="0">
        <a-col :lg="12">
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="区域编码">
            <a-input placeholder="请输入区域编码" v-decorator="['qybm', validatorRules.qybm ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="12">
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="乡镇">
            <a-input placeholder="请输入乡镇" v-decorator="['town', validatorRules.town ]" />
          </a-form-item>
        </a-col>
        </a-row>
        <a-row class="form-row" :gutter="0">
        <a-col :lg="12">
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="村/街道/居委会">
            <a-input placeholder="请输入村（街道/居委会）" v-decorator="['village', validatorRules.village ]" />
          </a-form-item>
        </a-col>
          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="组">
              <a-input placeholder="请输入组" v-decorator="['organize',  ]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="0">
          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="所属机构代码">
              <!--          <a-input placeholder="请输入所属机构代码" v-decorator="['ssjgdm', validatorRules.ssjgdm ]" />-->
             <!-- <j-tree-select
                v-model="model.ssjgdm"
                placeholder="请选择支行"
                dict="v_hr_bas_organization_cmmszh,zzjc,ywjgdm"
                pidField="sjzzbz"
                :treeDefaultExpandAll="true"
              >
              </j-tree-select>-->


              <j-tree-select v-model="model.ssjgdm"
                             :showSearch="true"
                             placeholder="请选择支行"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmmszh, zzjc, ywjgdm"
                             treeNodeFilterProp="title"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>


          </a-col>
          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="主客户经理">
           <a-input  hidden="true" v-model="this.model.zkhjl" />
              <j-select-ygxx    :treeDefaultExpandAll="true" ref="zkhjl"
               v-model="this.zkhjlacct" @change="GetValueZkhjl"  ></j-select-ygxx>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="0">
          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="辅客户经理">
              <a-input  hidden="true" v-model="this.model.fkhjl"/>
              <j-select-ygxx    :treeDefaultExpandAll="true"  ref="fkhjl"
                v-model="this.fkhjlacct" @change="GetValueFkhjl"></j-select-ygxx>
            </a-form-item>
          </a-col>
          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="备注">
              <a-input placeholder="请输入备注" v-decorator="['bz', {}]" />
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
  import JSelectDepart from '@/components/jeecgbiz/JSelectDepart'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JSelectUserByDep from '@/components/jeecgbiz/JSelectUserByDep'
  import JSelectYgxx from '@/components/jeecgbiz/JSelectYgxx'

  export default {
    name: "Yxdygl_czxxglModal",
    components: {
      JTreeSelect,
      JSelectDepart,JSelectUserByDep,JSelectYgxx
    },
    data () {
      return {
        title:"操作",
        visible: false,
        model: {
          zkhjl:"",
          fkhjl:"",
          qybm:"",
        },
        zkhjlacct:"",
        fkhjlacct:"",
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
        qybm:{rules: [{ required: true, message: '请输入区域编码!' }]},
        town:{rules: [{ required: true, message: '请输入乡镇!' }]},
        village:{rules: [{ required: true, message: '请输入村（街道/居委会）!' }]},
        organize:{rules: [{ required: true, message: '请输入组!' }]},
        ssjgdm:{rules: [{ required: true, message: '请输入所属机构代码!' }]},
        zkhjl:{rules: [{ required: true, message: '请输入主客户经理!' }]},
        },
        url: {
          add: "/yxdygl_czxxgl/yxdygl_czxxgl/add",
          edit: "/yxdygl_czxxgl/yxdygl_czxxgl/edit",
        },
      }
    },
    created () {
    },

    methods: {
      GetValueZkhjl(value){
        this.model.zkhjl=value.yggh;
        this.zkhjlacct=value.ygxm;
      },
      GetValueFkhjl(value){
        this.model.fkhjl=value.yggh;
        this.fkhjlacct=value.ygxm;
      },
      add () {
        this.zkhjlacct="";
        this.fkhjlacct="";
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        console.info(record)
        if(record.qybm){
          this.zkhjlacct=record.zkhjl_dictText;
          this.fkhjlacct=record.fkhjl_dictText;
        }
        this.model = Object.assign({}, record);
        this.visible = true;
        setTimeout(()=>{
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'qybm','town','village','organize','ssjgdm','zkhjl','fkhjl','bz'))
		  //时间格式化
        }) },0);
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
            if(!this.model.qybm){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            formData.zkhjl=this.model.zkhjl;
            formData.fkhjl=this.model.fkhjl;
            console.info(formData)
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