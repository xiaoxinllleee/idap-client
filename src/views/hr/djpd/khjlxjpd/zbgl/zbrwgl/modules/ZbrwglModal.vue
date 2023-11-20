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
        <!--<a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="组织标识">
          <a-input placeholder="请输入组织标识" v-decorator="['zzbz', {}]" />
        </a-form-item>-->
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="评定周期">
          <j-dict-select-tag placeholder="请选择评定周期" v-decorator="['pdzq', validatorRules.pdzq]" :triggerChange="true" dictCode="rqwd" :disabled="this.disabled"
                             @change="tjwdChange" />
        </a-form-item>
        <a-form-item v-if="this.wdlx=='DD' || this.model.pdzq =='DD'"
                     :labelCol="labelCol"
                     :wrapperCol="wrapperCol"
                     label="评定日期">
          <a-date-picker placeholder="请选择评定日期" v-decorator="['pdrq', validatorRules.pdrq]" style="width: 100%" :disabled="this.disabled"/>
        </a-form-item>
        <a-form-item v-if="this.wdlx=='MM' || this.model.pdzq =='MM'"
                     :labelCol="labelCol"
                     :wrapperCol="wrapperCol"
                     label="统计月份">
          <a-month-picker v-decorator="[ 'pdrq', validatorRules.pdrq]" :disabled="this.disabled" />
        </a-form-item>

        <a-row class="form-row" :gutter="0" v-if="this.wdlx=='Q' || this.model.pdzq =='Q'">
          <a-col :span="3">
          </a-col>
          <a-col :span="10">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="年份">
              <a-date-picker
                placeholder="请选择年份"
                format="YYYY"
                mode="year"
                :value="ssnf"
                :open="open"
                @openChange="openChange"
                @panelChange="panelChange2"
                :disabled="this.disabled"
                :defaultValue="dateValue"
              />
            </a-form-item>
          </a-col>
          <a-col :span="11">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="季度">
              <a-select placeholder="季度" v-model="tjjd" @change="selectValue" style="width: 148px;"
                        :disabled="this.disabled">
                <a-select-option value="01">第一季度</a-select-option>
                <a-select-option value="04">第二季度</a-select-option>
                <a-select-option value="07">第三季度</a-select-option>
                <a-select-option value="10">第四季度</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>

        <a-form-item v-if="this.wdlx=='YYYY' || this.model.pdzq =='YYYY'"
                     :labelCol="labelCol"
                     :wrapperCol="wrapperCol"
                     label="统计年份">
          <a-date-picker
            style="width: 100%"
            placeholder="请选择年份"
            :format="monthFormat"
            mode="year"
            :value="year"
            :open="this.open"
            @openChange="openChange"
            @panelChange="panelChange"
            :disabled="this.disabled"
            :defaultValue="dateValue"
          />
        </a-form-item>
      <!--  <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="评定日期">
          <a-date-picker placeholder="请选择评定日期" v-decorator="['pdrq', validatorRules.pdrq]" style="width: 100%" :disabled="this.disabled" />
        </a-form-item>-->
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="组织标识">
          <a-input placeholder="请输入组织标识" v-decorator="['zzbz', {}]" :disabled="this.disabled" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="组织名称">
        <j-dict-select-tag placeholder="请选择组织名称" v-decorator="['zzbz', {}]" dict-code="v_hr_bas_organization_cmms, zzjc, zzbz" :disabled="this.disabled"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="岗位标识">
          <a-input
            v-decorator="['gwbz']"
            placeholder="请选择岗位标识"
            :disabled="this.disabled"
          />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="岗位名称">
          <j-dict-select-tag
            v-decorator="['gwbz',validatorRules.gwbz]"
            placeholder="请选择岗位名称"
            dictCode="Hr_bas_post,gwmc,gwbz"
            :triggerChange="true"
            :disabled="this.disabled"
          />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="员工工号">
          <a-input placeholder="请输入员工工号" v-decorator="['yggh', {}]" :disabled="this.disabled"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="员工姓名">
          <a-input placeholder="请输入员工姓名" v-decorator="['ygxm', {}]" :disabled="this.disabled" />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="指标ID">
          <a-input placeholder="请输入指标ID" v-decorator="['zbid', {}]" :disabled="this.disabled"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="指标名称">
          <a-input placeholder="请输入指标名称" v-decorator="['zbmc', {}]" :disabled="this.disabled"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="指标任务">
          <a-input placeholder="请输入指标任务" v-decorator="['zbrw', {}]" />
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JTreeSelect from '@/components/jeecg/JTreeSelect'

  export default {
    name: "ZbrwglModal",
    components: {
      JTreeSelect
    },
    data () {
      return {
        title:"操作",
        flag: false,
        dafaultYear: '',
        open: false,
        year: moment(),
        dateValue: '',
        monthFormat: 'YYYY',
        wdlx: '',
        ssnf: '',
        nf: '',
        tjjd: '',
        disabled:true,
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
        },
        url: {
          add: "/zbrwgl/zbrwgl/add",
          edit: "/zbrwgl/zbrwgl/edit",
        },
      }
    },
    created () {
    },
    methods: {
      /** 下拉选择 */
      selectValue (value, date) {
        console.log('selectValue(value) => ' + value, date)
        //this.$emit('change', val)
        //this.model.pdrq=this.year.format("YYYY-"+val+"-01");
        console.log(this.ssnf)
        console.log(this.tjjd)
        let ssnf = this.ssnf.format('YYYY')
        console.log(ssnf)
        let startDate = ssnf + '-' + this.tjjd + '-01'
        console.log(startDate)
        this.model.pdrq = startDate
      },
      openChange (status) {
        if (status) {
          this.open = true
        } else {
          this.open = false
        }
      },
      panelChange (value) {
        this.year = value

        let nf = this.year.format('YYYY' + '-01' + '-01')
        if (nf == null && nf == undefined && nf == '') {
          this.$message.warning('请重新选择日期')
          return
        }
        this.model.pdrq = nf
        console.log(nf)
        this.open = false
      },
      panelChange2 (value) {
        this.ssnf = value
        this.ssnf.format('YYYY')
        this.open = false
      },
      tjwdChange (value) {
        this.wdlx = value
      },

      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'pdzq','zzbz','zbid','zbmc','zbrw','yggh','ygxm','gwbz'))
		  //时间格式化
          this.form.setFieldsValue({pdrq:this.model.pdrq?moment(this.model.pdrq):null})
          /*this.form.setFieldsValue({lrsj:this.model.lrsj?moment(this.model.lrsj):null})*/
          /*this.form.setFieldsValue({xgsj:this.model.xgsj?moment(this.model.xgsj):null})*/
        });

      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        if (this.wdlx == 'YYYY') {
          this.model.pdrq = moment(this.year).format('YYYY') + '-01-01'
        }
        if (this.wdlx=="Q"){
          if (this.model.pdrq==null){
            this.$message.warning('请选择季度')
            return
          }
        }
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if(!this.model.pdzq && !this.model.pdrq && !this.model.zzbz && !this.model.gwbz && !this.model.yggh && !this.model.zbid){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            formData.pdrq = formData.pdrq?formData.pdrq.format():null;
            //formData.lrsj = formData.lrsj?formData.lrsj.format():null;
            //formData.xgsj = formData.xgsj?formData.xgsj.format():null;

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