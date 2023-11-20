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
    <a-row>
      <a-col :span="12" :gutter="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="考核项目">
          <j-dict-select-tag placeholder="请选择考核项目" v-decorator="['schemeId', validatorRules.schemeId]" :trigger-change="true"
                             dict-code="V_PMA_A_SCHEME,SHOW_NAME,SCHEME_ID,evl_obj_type=3" showSearch />
        </a-form-item>
      </a-col>
      <a-col :span="12" :gutter="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="考核月份">
          <a-month-picker :format="monthFormat" v-decorator="[ 'tjyf', validatorRules.tjyf ]" style="width: 100%;"/>
        </a-form-item>
      </a-col>
    </a-row>

   <a-row>
      <a-col :span="12" :gutter="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="组织标识">
          <a-input placeholder="请输入组织标识" v-decorator="['zzbz', validatorRules.zzbz ]" disabled/>
        </a-form-item>
      </a-col>
      <a-col :span="12" :gutter="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="组织名称">
          <a-input placeholder="请输入组织名称" v-decorator="['zzbz_dictText', {} ]" disabled/>
        </a-form-item>
      </a-col>
    </a-row>

      <a-row>
      <a-col :span="12" :gutter="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="岗位标识">
          <a-input placeholder="请输入岗位标识" v-decorator="['gwbz', validatorRules.gwbz ]" disabled/>
         <!-- <j-dict-select-tag
            v-decorator="['gwbz',{}]"
            placeholder="全部"
            dictCode="Hr_bas_post,gwmc,gwbz"
            :triggerChange="true"
            disabled
          />-->
        </a-form-item>
      </a-col>
      <a-col :span="12" :gutter="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="岗位名称">
          <a-input placeholder="请输入岗位名称" v-decorator="['gwbz_dictText', {} ]" disabled/>
        </a-form-item>
      </a-col>
    </a-row>
     <a-row>
       <a-col :span="12" :gutter="8">
         <a-form-item
           :labelCol="labelCol"
           :wrapperCol="wrapperCol"
           label="员工姓名">
           <j-select-yggwxx type="radio" ref="selectYggwxx" v-model="ygxm" @selectComplete="getYgxx" :sszh="false"/>
           <!--<j-dict-select-tag placeholder="请输入员工姓名" v-decorator="['yggh', {}]" :trigger-change="true" dict-code="Hr_bas_staff,ygxm,yggh"  disabled/>-->
         </a-form-item>
       </a-col>
       <a-col :span="12" :gutter="8">
         <a-form-item
           :labelCol="labelCol"
           :wrapperCol="wrapperCol"
           label="员工工号">
           <a-input placeholder="请输入员工工号" v-decorator="['yggh', {}]" disabled/>
           <!--<a-button @click="FindBackYggh" type="primary" icon="plus" v-show="this.show =='1'">查找带回</a-button>-->
         </a-form-item>
       </a-col>
     </a-row>
     <a-row>
       <a-col :span="12" :gutter="8">
         <a-form-item
           :labelCol="labelCol"
           :wrapperCol="wrapperCol"
           label="指标id">
           <a-input-search placeholder="请输入指标id" v-decorator="['zbid', validatorRules.zbid ]" readOnly @search="FindBack(2)">
             <a-button slot="enterButton">选择指标</a-button>
             <!--<a-button slot="addonAfter"   type="link" icon="search">查找带回</a-button>-->
           </a-input-search>
         </a-form-item>
       </a-col>
       <a-col :span="12" :gutter="8">
         <a-form-item
           :labelCol="labelCol"
           :wrapperCol="wrapperCol"
           label="指标名称">
           <j-dict-select-tag placeholder="请输入指标名称" v-decorator="['zbid', {}]" :trigger-change="true" dict-code="ERP_BAS_ZBK,zbmc,zbid"  disabled/>
         </a-form-item>
       </a-col>
     </a-row>
       <a-row>
       <a-col :span="12" :gutter="8">
         <a-form-item
           :labelCol="labelCol"
           :wrapperCol="wrapperCol"
           label="指标维度">
           <j-dict-select-tag placeholder="请输入指标维度" v-decorator="['zbwd', validatorRules.zbwd ]" :trigger-change="true" dict-code="zbwd" disabled/>
         </a-form-item>
       </a-col>
       <a-col :span="12" :gutter="8">
         <a-form-item
           :labelCol="labelCol"
           :wrapperCol="wrapperCol"
           label="调整类型">
           <j-dict-select-tag placeholder="请输入调整类型" v-decorator="['tzlx', validatorRules.tzlx]" :trigger-change="true" dict-code="jx_tzlx" />
         </a-form-item>
       </a-col>
     </a-row><a-row>
       <a-col :span="12" :gutter="8">
         <a-form-item
           :labelCol="labelCol"
           :wrapperCol="wrapperCol"
           label="调整值">
           <a-input placeholder="请输入调整值" v-decorator="['tzz', validatorRules.tzz]" />
         </a-form-item>
       </a-col>
       <a-col :span="12" :gutter="8">
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
    <account-info ref="accountInfo" @close="colseWindow"></account-info>
    <account-add-zbid ref="accountZbid" @close="colseZbid"></account-add-zbid>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import AccountInfo from '@views/ckjk/ckzhgl/ckzhglgl/modules/AccountInfo'
  import AccountAddZbid from '@views/pams/sjbl/zbsjtz/modules/AccountAddZbid'
  import JSelectYggwxx from '@/components/jeecgbiz/JSelectYggwxx'

  export default {
    name: "ErpAssessSjxDataTzGwModal",
    components: {
      JTreeSelect,AccountAddZbid,AccountInfo,JSelectYggwxx
    },
    data () {
      return {
        title:"操作",
        visible: false,
        disabled:false,
        flag: false,
        show:'',
        model: {},
        ygxm: '',
        monthFormat: 'YYYY-MM',
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
        tjyf:{rules: [{ required: true, message: '请选择考核月份!' }]},
        zzbz:{rules: [{ required: true, message: '请选择组织标识!' }]},
        gwbz:{rules: [{ required: true, message: '请选择岗位标识!' }]},
        zbid:{rules: [{ required: true, message: '请选择指标id!' }]},
        zbwd:{rules: [{ required: true, message: '请选择指标维度!' }]},
        tzlx:{rules: [{ required: true, message: '请选择调整类型!' }]},
        tzz:{rules: [{ required: true, message: '请输入调整值!' }]},
        },
        url: {
          add: "/zbjgbl/erpAssessSjxDataTz/add",
          edit: "/zbjgbl/erpAssessSjxDataTz/edit",
        },
      }
    },
    created () {
    },
    methods: {
      FindBackYggh () {
        this.$refs.accountInfo.init()
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
        console.log('findBack')
        this.$refs.accountZbid.init(num)
      },
      colseZbid(args){
        console.log(args)
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(args, 'zbid','zbmc','zbwd'))  // loadsh的pick方法
        })
      },
      colseWindow (args) {
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(args, 'yggh','zzbz','zzbz_dictText','gwbz','gwbz_dictText'))  // loadsh的pick方法
        })
      },
      add () {
        this.flag= true;
        this.edit({});
      },
      edit (record) {
        if (record.zbid != undefined){
          this.show ='2'
        }else {
          this.show='1'
        }
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'schemeId','zzbz','gwbz','yggh','yggh_dictText','gwbz_dictText','zzbz_dictText','zbid','zbwd','tzz','tzlx','bz'))
		  //时间格式化
          this.form.setFieldsValue({tjyf:this.model.tjyf?moment(this.model.tjyf):null})
        });

      },
      close () {
        this.$emit('close');
        this.visible = false;
        this.flag= false;
        this.ygxm = ''
      },
      handleOk () {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if(this.flag){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            formData.tjyf = formData.tjyf ? formData.tjyf.format("YYYY-MM") + '-01' : null;

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