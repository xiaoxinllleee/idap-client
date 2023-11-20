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
        <a-row>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="统计维度">
              <j-dict-select-tag placeholder="请选择" v-decorator="['pdzq', validatorRules.pdzq ]" :triggerChange="true"
                                 dictCode="rqwd" :disabled="this.disabled" @change="tjwdChange" />
            </a-form-item>
           <!-- <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="评定周期">
              <j-dict-select-tag placeholder="请选择评定周期" v-decorator="['pdzq', validatorRules.pdzq]" :triggerChange="true" dictCode="rqwd"/>
            </a-form-item>-->
          </a-col>
          <a-col :span="12">
            <!--<a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="评定日期">
              <a-date-picker v-decorator="[ 'pdrq', validatorRules.pdrq ]" style="width: 100%" />
            </a-form-item>-->
            <a-form-item v-if="this.wdlx=='DD' || this.model.pdzq =='DD'"
                         :labelCol="labelCol"
                         :wrapperCol="wrapperCol"
                         label="评定日期">
              <a-date-picker placeholder="请选择评定日期" v-decorator="['pdrq', {}]" style="width: 100%" :disabled="this.disabled"/>
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
          </a-col>
        </a-row>


        <a-row>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="员工工号">
              <a-input placeholder="请输入员工工号" v-decorator="['yggh', validatorRules.yggh ]" disabled />
              <a-button @click="FindBack" type="primary" icon="plus" v-show="model.pdrq === undefined">查找带回</a-button>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="员工姓名">
              <a-input placeholder="请输入员工姓名" v-decorator="['ygxm', {}]" disabled/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="组织标识">
              <j-tree-select
                v-decorator="['zzbz',{}]"
                placeholder="请选择组织标识"
                treeNodeFilterProp="title"
                dict="v_hr_bas_organization_cmms, zzjc, zzbz"
                :sszh="true"
                pid-field="sjzzbz"
                :showSearch="true"
                :treeDefaultExpandAll=true
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="组织名称">
              <j-tree-select
                v-decorator="['zzbz_dictText',{}]"
                placeholder="请选择组织名称"
                treeNodeFilterProp="title"
                dict="v_hr_bas_organization_cmms, zzjc, zzbz"
                :sszh="true"
                pid-field="sjyzzbz"
                :showSearch="true"
                :treeDefaultExpandAll=true
                disabled
              />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="岗位标志">
              <!--<a-input placeholder="请输入岗位标识" v-decorator="['gwbz', validatorRules.gwbz ]" />-->
              <a-input placeholder="请输入岗位标识" v-decorator="['gwbz', {} ]" disabled/>
           <!--   <j-dict-select-tag
                v-decorator="['gwbz',{}]"
                placeholder="全部"
                dictCode="Hr_bas_post,gwmc,gwbz"
                :triggerChange="true"
              />-->
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="岗位名称">
              <!--<a-input placeholder="请输入岗位标识" v-decorator="['gwbz', validatorRules.gwbz ]" />-->
              <j-dict-select-tag
                v-decorator="['gwbz_dictText',{}]"
                placeholder="全部"
                dictCode="Hr_bas_post,gwmc,gwbz"
                :triggerChange="true"
                disabled
              />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="身份证号码">
              <a-input placeholder="请输入身份证号码" v-decorator="['sfzhm', {}]"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="电话">
              <a-input placeholder="请输入电话" v-decorator="['phone', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="年龄">
              <a-input placeholder="请输入年龄" v-decorator="['age', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="工龄">
              <a-input placeholder="请输入工龄" v-decorator="['gl', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="入行时间">
              <a-date-picker v-decorator="['rhsj', {}]" style="width: 100%"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="从事客户经理时间">
              <a-date-picker v-decorator="[ 'cskhjlsj', {}]" style="width: 100%" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="是否参与评定">
              <j-dict-select-tag placeholder="请选择是否参与评定" v-decorator="['sfcypd', {}]" :triggerChange="true" dictCode="sfcypd"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">

          </a-col>
        </a-row>


      </a-form>
    </a-spin>

    <account-info ref="accountInfo" @close="colseWindow"></account-info>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import AccountInfo from './AccountInfo'

  export default {
    name: "KhjljcsjszModal",
    components:{
      JTreeSelect,AccountInfo
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
        disabled: false,
        visible: false,
        model: {},
        queryParam: { },
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
        pdzq:{rules: [{ required: true, message: '请输入评定周期!' }]},
        pdrq:{rules: [{ required: true, message: '请输入评定日期!' }]},
        zzbz:{rules: [{ required: true, message: '请输入组织标识!' }]},
        gwbz:{rules: [{ required: true, message: '请输入岗位标识!' }]},
        yggh:{rules: [{ required: true, message: '请输入员工工号!' }]},
        },
        url: {
          add: "/khjljcsjsz/khjljcsjsz/add",
          edit: "/khjljcsjsz/khjljcsjsz/edit",
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
      //初始化年份选择下拉框
      initSelectYear(year){
        this.years = [];
        for(let i=0; i<30; i++){
          this.years.push({value:((year - i)+''),label:((year - i)+'')});
        }
      },

      FindBack () {
        this.$refs.accountInfo.init()
      },
      colseWindow (args) {
        this.queryParam.ygxm = args.yggh_dictText
        this.queryParam.zzbz_dictText=args.zzbz_dictText
        this.queryParam.gwbz = args.gwbz
        this.queryParam.gwbz_dictText = args.gwbz_dictText
        this.queryParam.khjlbz = args.khjlbz
        this.queryParam.zzbz = args.zzbz
        this.queryParam.rglx = args.rglx
        this.queryParam.yggh = args.yggh
        this.queryParam.zzbz = args.zzbz
        this.queryParam.jgdm = args.ywjgdm
        this.queryParam.gyh =args.gyh;
        this.model = Object.assign({}, this.queryParam)
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'ygxm', 'yggh', 'gyh', 'khjlbz', 'zzbz', 'gwbz','gwbz_dictText','zzbz_dictText'))  // loadsh的pick方法
        })
      },
      add () {
        this.flag = true;
        this.edit({});
      },
      edit (record) {
        this.disabled = true
        this.form.resetFields();
        this.model = Object.assign({}, record);
        if (this.model.pdrq!=null) {
          this.tjjd = this.model.pdrq.substring(5, 7)
          this.ssnf = this.model.pdrq.substring(0, 4)
        }
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'pdzq','pdrq','zzbz','gwbz','yggh','ygxm','khjlbz','sfzhm','zzbz_dictText','gwbz_dictText','age','gl','phone','sfcypd'))
		  //时间格式化
          //this.form.setFieldsValue({pdrq:this.model.pdrq?moment(this.model.pdrq):null})
          this.form.setFieldsValue({rhsj:this.model.rhsj?moment(this.model.rhsj):null})
          this.form.setFieldsValue({cskhjlsj:this.model.cskhjlsj?moment(this.model.cskhjlsj):null})
          /*this.form.setFieldsValue({lrsj:this.model.lrsj?moment(this.model.lrsj):null})*/
        });

      },
      close () {
        this.$emit('close');
        this.visible = false;
        this.flag = false;
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
            if(this.flag){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            console.log(this.model.pdrq+'1111111111')
            let formData = Object.assign(this.model,this.model.pdrq, values);
            //时间格式化
            //formData.pdrq = formData.pdrq?formData.pdrq.format():null;
            formData.rhsj = formData.rhsj?formData.rhsj.format():null;
            formData.cskhjlsj = formData.cskhjlsj?formData.cskhjlsj.format():null;
            //formData.lrsj = formData.lrsj?formData.lrsj.format():null;

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