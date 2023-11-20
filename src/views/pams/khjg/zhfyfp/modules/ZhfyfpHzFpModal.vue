<template>
  <a-modal
    :title="title"
    :width="1400"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-card title="基本信息" style="width: 100%">
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="分配月份">
              <a-date-picker v-decorator="[ 'fpyf',{} ]" style="width: 100%;" disabled/>
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
              label="总分配金额">
              <a-input placeholder="请输入总金额" v-decorator="['zje', {}]" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="费用类型">
              <j-dict-select-tag placeholder="请选择费用类型" v-decorator="['fylx', {}]" dict-code="fylx" disabled/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="已分配金额">
              <a-input placeholder="请输入已分配金额" v-decorator="['yfpje', {}]" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="未分配金额">
              <a-input placeholder="请输入未分配金额" v-decorator="['dfpje', {}]" disabled/>
            </a-form-item>
          </a-col>
        </a-row>
        </a-card>


        <a-card title="员工信息" style="width: 100%">
          <j-editable-table
            @valueChange="valueChange"
            ref="pdzbszSetTable"
            :loading="pdzbszSetTable.loading"
            :columns="pdzbszSetTable.columns"
            :dataSource="pdzbszSetTable.dataSource"
            :maxHeight="300"
            :rowNumber="true"
            :rowSelection="false"
            :actionButton="false"/>
        </a-card>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { httpAction, postAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JTreeSelect from '@comp/jeecg/JTreeSelect'
  import { FormTypes } from '@/utils/JEditableTableUtil'
  import JEditableTable from '@comp/jeecg/JEditableTable'

  export default {
    name: "ZhfyfpHzFpModal",
    components:{
      JTreeSelect,JEditableTable
    },
    data () {
      return {
        title:"操作",
        visible: false,
        model: {},
        fpyf: '',
        yfpje: '',
        wfpje: '',
        fylx: '',
        zzbz: '',
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

        },

        pdzbszSetTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '组织标志',
              key: 'zzbz',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: []
            },
            {
              title: '所属组织',
              key: 'zzbz_dictText',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: []
            },
            {
              title: '员工工号',
              key: 'yggh',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [],
            },
            {
              title: '员工姓名',
              key: 'yggh_dictText',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: []
            },
            {
              title: '岗位标志',
              key: 'gwbz',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: []
            },
            {
              title: '岗位名称',
              key: 'gwbz_dictText',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '员工类型',
              key: 'yglx_dictText',
              width: '10%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },

            {
              title: '分配金额',
              key: 'je',
              width: '10%',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: [{ required: true, message: '${title}不能为空' }]
            },
            {
              title: '备注',
              key: 'bz',
              width: '20%',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: []
            },

          ]
        },



      }
    },
    created () {
    },
    methods: {
      init(record){
        this.fpyf =record.fpyf
        this.fylx =record.fylx
        this.zzbz =record.zzbz
        console.log(record)
        let param = {
          'fpyf':record.fpyf,
          'zzbz':record.zzbz,
          'fylx':record.fylx,
        }
        postAction('/zhfyfp/zhfyfpHz/set',param).then((res) => {
          if (res.success) {
            this.pdzbszSetTable.dataSource = res.result;
          }
        })
      },

      valueChange(e){
        console.log('valueChange',e)
        this.newDataSource=e.newDataSource
        let sum = 0;
        this.newDataSource.forEach((item,index) =>{
          sum=this.numAdd(sum,item.je)
        })
        console.log(sum)
        this.yfpje=sum
        this.form.setFieldsValue({yfpje:sum});
        let wfpje = this.model.zje - sum
        this.wfpje=wfpje
        console.log(zje)
      if (wfpje < 0){
        this.$message.error('已分配金额:'+sum+',已超出当月可分配支行费用金额'+this.model.zje+',请重新分配');
        return false;
      }else {
        this.form.setFieldsValue({dfpje:wfpje});
      }

      },
       // 数字累加
      numAdd(num1, num2) {
        var baseNum, baseNum1, baseNum2;
        try {
          baseNum1 = num1.toString().split(".")[1].length;
        } catch (e) {
          baseNum1 = 0;
        }
        try {
          baseNum2 = num2.toString().split(".")[1].length;
        } catch (e) {
          baseNum2 = 0;
        }
        baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
        return (num1 * baseNum + num2 * baseNum) / baseNum;
      },

      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'zzbz_dictText','fylx','zje','yfpje','dfpje'))
		  //时间格式化
          this.form.setFieldsValue({fpyf:this.model.fpyf?moment(this.model.fpyf):null})
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
          /*if (!err) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            httpurl+=this.url.edit;
            method = 'put';
            let formData = Object.assign(this.model, values);
            //时间格式化
            //formData.fpyf = formData.fpyf?formData.fpyf.format():null;

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
          }*/

          let parm = {
            'list':this.newDataSource,
            'wfpje':this.wfpje,
            'yfpje':this.yfpje,
            'zzbz':this.zzbz,
            'fylx':this.fylx,
            'fpyf':this.fpyf,
            }
            console.log(parm)
            const that = this;
            httpAction('/zhfyfp/zhfyfpHz/add',parm,'post').then((res)=>{
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