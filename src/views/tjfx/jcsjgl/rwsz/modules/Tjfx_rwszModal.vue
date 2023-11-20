<template>
  <a-modal :title="title"
           :width="1000"
           :visible="visible"
           :confirmLoading="confirmLoading"
           @ok="handleOk"
           @cancel="handleCancel"
           cancelText="关闭">
    
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-card class="card" :bordered="false">

          <a-divider orientation="left" style="color: #1890FF; margin-top: 0px;">任务年份 & 组织机构</a-divider>

          <a-row class="form-row" :gutter="24">
            <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="任务年份" hasFeedback>
              <a-select placeholder="请选择统计年份" v-decorator="['rwnf', validatorRules.rwnf]" :initialValues="defaultYear" @change="selectValue">
                <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
              </a-select>
            </a-form-item></a-col>
            <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="组织机构" hasFeedback>
              <j-tree-select placeholder="请选择组织机构" v-decorator="['zzbz', validatorRules.zzbz]"
                             dict="HR_BAS_ORGANIZATION, ZZJC, ZZBZ" pid-field="sjzzbz" treeNodeFilterProp="title" :showSearch="true" :tree-default-expand-all="true"/>
            </a-form-item></a-col>
            <a-col :lg="8"></a-col>
          </a-row>

          <a-divider style="color: #1890FF; margin-top: 0px;">存款任务</a-divider>

          <a-row class="form-row" :gutter="24">
            <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="存款日平余额" hasFeedback>
              <a-input-number placeholder="请输入存款日平余额" v-decorator="['ckrpye', {}]" :min="0" style="width: 100%"/>
            </a-form-item></a-col>
            <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="存款余额" hasFeedback>
              <a-input-number placeholder="请输入存款余额" v-decorator="['ckye', {}]" :min="0" style="width: 100%"/>
            </a-form-item></a-col>
            <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="存款户数净增" hasFeedback>
              <a-input-number placeholder="请输入存款户数净增" v-decorator="['ckhsjz', {}]" :min="0" style="width: 100%"/>
            </a-form-item></a-col>
          </a-row>

          <a-divider style="color: #1890FF; margin-top: 0px;">贷款任务</a-divider>

          <a-row class="form-row" :gutter="24">
            <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="贷款余额" hasFeedback>
              <a-input-number placeholder="请输入贷款余额" v-decorator="['dkye', {}]" :min="0" style="width: 100%"/>
            </a-form-item></a-col>
            <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="贷款户数净增" hasFeedback>
              <a-input-number placeholder="请输入贷款户数净增" v-decorator="['dkhsjz', {}]" :min="0" style="width: 100%"/>
            </a-form-item></a-col>
            <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="贷款不良率" hasFeedback>
              <a-input-number placeholder="请输入贷款不良率" v-decorator="['dkbll', {}]" :min="0" style="width: 100%"/>
            </a-form-item></a-col>
          </a-row>
        </a-card>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JInput from '../../../../../components/jeecg/JInput'
  export default {
    name: "Tjfx_rwszModal",
    components: { JTreeSelect, moment, JInput, },
    data () {
      return {
        title: "任务设置",
        visible: false,
        confirmLoading: false,
        form: this.$form.createForm(this),
        model: {},
        rwnf: '',
        zzbz: '',
        defaultYear: '',
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 14 },
        },
        validatorRules:{
          rwnf:{rules: [{ required: true, message: '请选择任务年份!😅' }]},
          zzbz:{rules: [{ required: true, message: '请选择组织机构!😅' }]},
        },
        url: {
          add: "/tjfx_rwsz/tjfx_rwsz/add",
          edit: "/tjfx_rwsz/tjfx_rwsz/edit",
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
        this.rwnf = record.rwnf;
        this.zzbz = record.zzbz;
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'rwnf','zzbz','ckrpye','ckye','ckhsjz','dkye','dkhsjz','dkbll'))
          //时间格式化
          this.form.setFieldsValue({ rwnf: record.rwnf.slice(0,4) })
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
            let method  = '';
            if(!this.model.zzbz){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
              method = 'put';
            }
            console.log("原-任务年份："+this.rwnf);
            let oldRwnf = this.rwnf;
            console.log("原-组织标识："+this.zzbz);
            let oldZzbz = this.zzbz;
            let formData = Object.assign(this.model, values);
            // 时间格式化
            formData.rwnf = moment(formData.rwnf+"-01-01").format("YYYY-MM-DD");
            console.log("新-任务年份："+formData.rwnf);
            console.log("新-组织标识："+formData.zzbz);
            // { tjfxRwsz: formData, oldRwnf: oldRwnf, oldZzbz: oldZzbz }
            httpAction(httpurl, formData, method).then((res)=>{
              if (res.success) {
                that.$message.success(res.message);
                that.$emit('ok');
              } else {
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
      /** 获取当前年份 */
      init() {
        let date = new Date
        let year = date.getFullYear()
        this.initYear(year)
      },
      /** 初始化年份下拉框 */
      initYear(year) {
        this.years = []
        for(let i=0; i<30; i++) {
          this.years.push({ value:((year-i)+''),label:((year-i)+'') })
        }
      },
      /** 下拉选择 */
      selectValue(value) {
        console.log('selectValue(value) => '+value)
        let val = value
        this.$emit('change', val)
      },
    }
  }
</script>

<style lang="less" scoped>
  .ant-form .ant-form-item {
    margin-bottom: 10px;
  }
</style>