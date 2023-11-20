<template>
  <a-modal
    :title="title"
    width="75%"
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
              label="考核项目">
              <j-dict-select-tag placeholder="请选择考核项目" v-decorator="['schemeId', validatorRules.schemeId]" :trigger-change="true"
                                 dict-code="V_PMA_A_SCHEME,SHOW_NAME,SCHEME_ID,evl_obj_type=3" showSearch />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="考核月份">
              <a-month-picker v-decorator="[ 'khsj', validatorRules.khsj ]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="组织标识">
              <a-input placeholder="请输入组织标识" v-decorator="['zzbz', validatorRules.zzbz ]" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="组织名称">
              <a-input placeholder="请输入组织名称" v-decorator="['zzbz_dictText', {} ]" disabled/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="岗位标识">
              <a-input placeholder="请输入岗位标识" v-decorator="['gwbz', validatorRules.gwbz ]" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="岗位名称">
              <a-input placeholder="请输入岗位名称" v-decorator="['gwbz_dictText', {} ]" disabled/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="员工姓名">
              <j-select-yggwxx type="radio" ref="selectYggwxx" v-model="ygxm" @selectComplete="getYgxx"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="员工工号">
              <a-input placeholder="请输入员工工号" v-decorator="['yggh', {}]" disabled/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="指标ID">
              <a-input-search placeholder="请输入指标ID" v-decorator="['zbid', validatorRules.zbid ]" readOnly @search="FindBack(2)">
                <a-button slot="enterButton" :disabled="this.model.id">选择指标</a-button>
                <!--<a-button slot="addonAfter"  @click="FindBack(2)" type="link" icon="search" v-show="!this.model.id">查找带回</a-button>-->
              </a-input-search>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="指标名称">
              <j-dict-select-tag placeholder="请输入指标名称" v-decorator="['zbid', {}]" :trigger-change="true" dict-code="ERP_BAS_ZBK,zbmc,zbid"  disabled/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="考核维度">
              <j-dict-select-tag placeholder="请输入考核维度" v-decorator="['khwd', validatorRules.khwd ]" :trigger-change="true" dict-code="zbwd" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="考核方式">
              <j-dict-select-tag placeholder="请输入考核方式" v-decorator="['khfs', validatorRules.khfs ]" :trigger-change="true" dict-code="khfs" disabled/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="指标任务">
              <a-input placeholder="请输入指标任务" v-decorator="['zbrw', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
    <account-add-zbid ref="accountZbid" @close="colseZbid"></account-add-zbid>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import AccountAddZbid from '@/views/pams/sjbl/zbsjtz/modules/AccountAddZbid'
  import JSelectYggwxx from '@/components/jeecgbiz/JSelectYggwxx'
  import AInputSearch from "ant-design-vue/es/input/Search";

  export default {
    name: "ErpAssessTasksetGwModal",
    components: {
      AInputSearch,
      JTreeSelect, AccountAddZbid, JSelectYggwxx
    },
    data () {
      return {
        title:"操作",
        visible: false,
        model: {},
        ygxm: '',
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
          schemeId:{rules: [{ required: true, message: '请选择考核项目!' }]},
          zzbz:{rules: [{ required: true, message: '请输入组织标识!' }]},
          gwbz:{rules: [{ required: true, message: '请选择岗位标志!' }]},
        zbid:{rules: [{ required: true, message: '请输入指标ID!' }]},
        khwd:{rules: [{ required: true, message: '请输入考核维度!' }]},
        khsj:{rules: [{ required: true, message: '请输入考核时间!' }]},
        khfs:{rules: [{ required: true, message: '请输入考核方式!' }]},
        },
        url: {
          add: "/farwsz/erpAssessTaskset/add",
          edit: "/farwsz/erpAssessTaskset/edit",
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
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'schemeId','zzbz','gwbz','yggh','yggh_dictText','zbid_dictText','zbid','khwd','khfs','zbrw'))
		  //时间格式化
          this.form.setFieldsValue({khsj:this.model.khsj?moment(this.model.khsj):null})
        });

      },
      getYgxx(selectedYgxxRows) {
        console.log('getYgxx selectedYgxxRows', selectedYgxxRows)
        if (selectedYgxxRows && selectedYgxxRows[0]) {
          this.ygxm = selectedYgxxRows[0].yggh_dictText
          console.log('this.ygxm', this.ygxm)
          this.form.setFieldsValue(pick(selectedYgxxRows[0], 'yggh','zzbz','zzbz_dictText','gwbz','gwbz_dictText'))
        }
      },
      FindBack(num){
        this.$refs.accountZbid.init(num)
      },
      colseZbid(args){
        console.log('colseZbid', args)
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(args, 'zbid','khfs'))  // loadsh的pick方法
          this.form.setFieldsValue({khwd: args.zbwd})
        })
      },
      close () {
        this.$emit('close');
        this.ygxm = ''
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
            formData.khsj = formData.khsj?moment(formData.khsj).format("YYYY-MM")+"-01":null;

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