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
        <!--隐藏域-->
        <!--<a-form-item><a-input type="hidden" v-decorator="[ 'yggh', {}]"/></a-form-item>-->

        <a-row class="form-row" :gutter="16">
          <a-col :span="12" :gutter="8">
           <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="任务维度">
             <j-dict-select-tag placeholder="请选择任务维度" v-decorator="['rwwd', validatorRules.rwwd]" @change="SelectRwwdChange" :triggerChange="true" dictCode="rwwd"/>
           </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
          <a-form-item
            v-if="this.rwwd=='DD'"
           :labelCol="labelCol"
           :wrapperCol="wrapperCol"
           label="任务日期">
           <a-date-picker v-decorator="[ 'rwrq', validatorRules.rwrq ]" />
          </a-form-item>
         </a-col>

          <a-col :span="12" :gutter="8">
            <a-form-item
              v-if="this.rwwd=='MM'"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="任务月份">
              <a-month-picker v-decorator="[ 'rwrq', validatorRules.rwrq ]" />
            </a-form-item>
          </a-col>


          <a-col :span="12" :gutter="8">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="任务季度" v-if="this.rwwd=='Q'">
              <a-select placeholder="任务季度年份" v-model="jdssnf" :defaultValue="dateValue" @change="selectValue" style="width: 35%;">
                <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
              </a-select>
              <a-select placeholder="请选择任务季度" v-model="rwjd" @change="selectValue" style="width: 65%;">
                <a-select-option value="">请选择</a-select-option>
                <a-select-option value="01">第一季度</a-select-option>
                <a-select-option value="04">第二季度</a-select-option>
                <a-select-option value="07">第三季度</a-select-option>
                <a-select-option value="10">第四季度</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :span="12" :gutter="8">
            <a-form-item
              v-if="this.rwwd=='YY'"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="任务半年年份">
              <a-select placeholder="半年年份" v-model="bnnf" :defaultValue="dateValue" @change="selectValue" style="width: 35%;">
                <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
              </a-select>
              <a-select placeholder="请选择任务半年日期" v-model="rwbnsj" @change="selectValue" style="width: 65%;">
                <a-select-option value="">请选择</a-select-option>
                <a-select-option value="01">上半年</a-select-option>
                <a-select-option value="07">下半年</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :span="12" :gutter="8">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="任务年份" v-if="this.rwwd=='YYYY'">
              <a-select placeholder="请选择任务年份" v-model="rwnf" :defaultValue="dateValue" @change="selectValue">
                <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>




         <!-- <a-col :span="12" :gutter="8">
            <a-form-item
              v-if="this.rwwd=='YYYY'"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="任务年份">
              <a-month-picker v-decorator="[ 'rwrq', validatorRules.rwrq ]" />
            </a-form-item>
          </a-col>-->

        </a-row>

        <a-row class="form-row" :gutter="16">
        <a-col :span="12" :gutter="8">
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="组织标识">
            <a-input placeholder="组织标识" v-model="this.zzbz" :disabled="true" />
          </a-form-item>
        </a-col>
        <a-col :span="12" :gutter="8">
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="员工工号">
            <j-select-ygxx    :treeDefaultExpandAll="true"  :yggh1="yggh"  ref="ygxxModalForm"  @change="GetValue"/>
          </a-form-item>
        </a-col>
        </a-row>


        <a-row class="form-row" :gutter="16">
        <a-col :span="12" :gutter="8">
         <a-form-item
           :labelCol="labelCol"
           :wrapperCol="wrapperCol"
           label="客户经理标志">
           <a-input placeholder="请输入客户经理标志" v-model="this.khjlbz"  :disabled="true" />
         </a-form-item>
        </a-col>
        <a-col :span="12" :gutter="8">
         <a-form-item
           :labelCol="labelCol"
           :wrapperCol="wrapperCol"
           label="员工姓名">
           <a-input placeholder="请输入员工姓名" v-model="this.ygxm" :disabled="true" />
         </a-form-item>
        </a-col>
        </a-row>
        <a-row class="form-row" :gutter="16">
         <a-col :span="12" :gutter="8">
          <a-form-item
           :labelCol="labelCol"
           :wrapperCol="wrapperCol"
           label="存款净增任务">
           <a-input placeholder="请输入存款净增任务" v-decorator="['ckjzrw', {}]" />
          </a-form-item>
         </a-col>
         <a-col :span="12" :gutter="8">
          <a-form-item
           :labelCol="labelCol"
           :wrapperCol="wrapperCol"
           label="存款日平净增任务">
           <a-input placeholder="请输入存款日平净增任务" v-decorator="['ckrpjzrw', {}]" />
          </a-form-item>
         </a-col>
        </a-row>
        <a-row class="form-row" :gutter="16">
          <a-col :span="12" :gutter="8">
           <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="存款客户数净增任务">
            <a-input placeholder="请输入存款客户数净增任务" v-decorator="['ckkhsjzrw', {}]" />
           </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="贷款净增任务">
            <a-input placeholder="请输入贷款净增任务" v-decorator="['dkjzrw', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="16">
          <a-col :span="12" :gutter="8">
           <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="贷款日平净增任务">
            <a-input placeholder="请输入贷款日平净增任务" v-decorator="['dkrpjzrw', {}]" />
           </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
           <a-form-item
           :labelCol="labelCol"
           :wrapperCol="wrapperCol"
           label="法人贷款客户净增任务">
           <a-input placeholder="请输入法人贷款客户净增任务" v-decorator="['frdkkhjzrw', {}]" />
           </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="16">
          <a-col :span="12" :gutter="8">
          <a-form-item
           :labelCol="labelCol"
           :wrapperCol="wrapperCol"
           label="个人贷款客户净增任务">
           <a-input placeholder="请输入个人贷款客户净增任务" v-decorator="['grdkkhjzrw', {}]" />
          </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
          <a-form-item
           :labelCol="labelCol"
           :wrapperCol="wrapperCol"
           label="手机银行净增任务">
           <a-input placeholder="请输入手机银行净增任务" v-decorator="['sjyhjzrw', {}]" />
          </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="16">
          <a-col :span="12" :gutter="8">
           <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="ETC净增任务">
            <a-input placeholder="请输入ETC净增任务" v-decorator="['etcjzrw', {}]" />
           </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
           <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="E支付净增任务">
            <a-input placeholder="请输入E支付净增任务" v-decorator="['ezfjzrw', {}]" />
           </a-form-item>
         </a-col>
        </a-row>
        <a-row class="form-row" :gutter="16">
          <a-col :span="12" :gutter="8">
           <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="任务完成时间">
            <a-date-picker v-decorator="[ 'rwwcsj', {}]" />
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
  import  JSelectYgxx  from'./JSelectYgxx'

  export default {
    name: "GzapGrrwszModal",
    components: { JSelectYgxx },
    data () {
      return {
        title:"操作",
        visible: false,
        model: {},
        rwwd:'',dateValue: '',
        ygxm:"",khjlbz:"",zzbz:"",yggh:"",
        jdssnf:"",rwjd:"",rwnf:"",bnnf:"",rwbnsj:"",
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },

        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
        rwwd:{rules: [{ required: true, message: '请输入任务维度!' }]},
        rwrq:{rules: [{ required: true, message: '请输入任务日期!' }]},
        zzbz:{rules: [{ required: true, message: '请输入组织标识!' }]},
        yggh:{rules: [{ required: true, message: '请输入员工工号!' }]},
        },
        url: {
          add: "/gzap.grrwsz/gzapGrrwsz/add",
          edit: "/gzap.grrwsz/gzapGrrwsz/edit",
        },
      }
    },
    created () {
      this.init();
    },
    methods: {
      add () {
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.ygxm =record.ygxm,
        this.khjlbz = record.khjlbz,
        this.zzbz=record.zzbz,
        this.yggh = record.yggh,
        this.rwwd = record.rwwd


        if (record.rwwd == 'Q' && record.rwrq !='' ){
          this.jdssnf =moment(record.rwrq).format('YYYY');
          this.rwjd =moment(record.rwrq).format('MM');
          console.log("rwjd"+this.rwjd)
        }
        if (record.rwwd == 'YY' && record.rwrq !='' ){
          this.bnnf = moment(record.rwrq).format('YYYY');
          this.rwbnsj = moment(record.rwrq).format('MM');
        }
        if (record.rwwd == 'YYYY' && record.rwrq !='' ){
          this.rwnf = moment(record.rwrq).format('YYYY');
        }


/*
        that.$refs.ygxxModalForm.edit1(record.yggh)
*/
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'rwwd','zzbz','yggh','khjlbz','ygxm','ckjzrw','ckrpjzrw','ckkhsjzrw','dkjzrw','dkrpjzrw','frdkkhjzrw','grdkkhjzrw','sjyhjzrw','etcjzrw','ezfjzrw','lrbz','lrr'))
		  //时间格式化
          if (record.rwwd == 'MM' || record.rwwd == 'DD' ){
            this.form.setFieldsValue({rwrq:this.model.rwrq?moment(this.model.rwrq):null})
          }
          this.form.setFieldsValue({yggh:record.yggh})
          this.form.setFieldsValue({rwwcsj:this.model.rwwcsj?moment(this.model.rwwcsj):null})
          /*this.form.setFieldsValue({lrsj:this.model.lrsj?moment(this.model.lrsj):null})*/
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
            if(!this.model.yggh){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            formData.yggh =this.yggh
            formData.ygxm =this.ygxm
            formData.zzbz =this.zzbz
            formData.khjlbz =this.khjlbz


            if(formData.rwwd=='MM'){
              if (formData.rwrq!=null || formData.rwrq !='undefined'){
                formData.rwrq = moment(formData.rwrq).format("YYYY-MM") + "-01"
                console.log("MM"+formData.rwrq)
              }
            }else if(formData.rwwd=='Q'){
              if (this.jdssnf!='' && this.rwjd != ''){
                let day = new Date(this.jdssnf,this.rwjd,0)
                let dayCount = day.getDate()
                formData.rwrq= this.jdssnf +'-'+ this.rwjd +'-'+ dayCount
                console.log("Q"+formData.rwrq)

              }
            }else if(formData.rwwd=='YY'){
              if (this.bnnf!='' && this.rwbnsj != ''){
                let bnday = new Date(this.bnnf,this.rwbnsj,0)
                let dayCount1 = bnday.getDate()
                formData.rwrq= this.bnnf+'-' + this.rwbnsj +'-' + dayCount1
                console.log("YY"+formData.rwrq)

              }
            }else if (formData.rwwd == 'YYYY') {
              if (this.rwnf != ' ') {
                formData.rwrq = this.rwnf + "-12-01"
                console.log("YYYY"+'-'+formData.rwrq)

              }
            }




            //时间格式化
            /*formData.rwrq = formData.rwrq?formData.rwrq.format():null;
            formData.rwwcsj = formData.rwwcsj?formData.rwwcsj.format():null;
            formData.lrsj = formData.lrsj?formData.lrsj.format():null;*/
            console.log("----")
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

      SelectRwwdChange (value) {
        this.rwwd = value;
      },

      GetValue(value){
        /*if (value.ygxm){
        this.model.ygxm=value.ygxm;
        }
       if (value.zzbz){
          this.model.zzbz = value.zzbz
        }
        if (value.yggh){
          this.model.yggh = value.yggh
        }
        this.model.yggh = value.yggh
        this.model.khjlbz = value.khjlbz
        this.model.zzbz = value.zzbz
        this.model.ygxm=value.ygxm;*/
        this.yggh = value.yggh;
        this.ygxm = value.ygxm;
        this.khjlbz = value.khjlbz;
        this.zzbz = value.zzbz;
        /*this.form.setFieldsValue({yggh: value.yggh})*/
      },

      init(){
        var myDate = new Date;
        var year = myDate.getFullYear();
        this.initSelectYear(year)
      },
      // 初始化年份选择下拉框
      initSelectYear(year){
        this.years = [];
        for(let i=0; i<30; i++){
          this.years.push({value:((year - i)+''),label:((year - i)+'')});
        }
      },
      selectValue(value){
        console.log('KhdjpdList => selectValue(value)')
        console.log('selectValue::::'+value)
        let val=value;
        this.$emit('change', val);
      },

    }
  }
</script>

<style lang="less" scoped>

</style>