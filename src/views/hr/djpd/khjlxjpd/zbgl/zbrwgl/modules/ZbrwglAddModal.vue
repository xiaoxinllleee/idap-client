<template>
  <a-modal
    :title="title"
    :width="1500"
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
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="评定周期">
              <j-dict-select-tag placeholder="请选择评定周期" v-model="this.model.pdzq" :triggerChange="true" dictCode="rqwd" :disabled="this.disabled"/>
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="评定日期">
              <a-date-picker placeholder="请选择评定日期" v-model="this.model.pdrq" style="width: 100%" :disabled="this.disabled" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="组织标识">
              <a-input placeholder="请选择组织标识" v-model="this.model.zzbz"  :disabled="this.disabled"/>
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="组织名称">
              <j-dict-select-tag placeholder="请选择组织名称" v-model="this.model.zzbz" dict-code="v_hr_bas_organization_cmms, zzjc, zzbz" :disabled="this.disabled"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="岗位标识">
              <a-input  v-model="this.model.gwbz" :disabled="this.disabled"/>
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="岗位名称">
              <j-dict-select-tag placeholder="请选择岗位名称" v-model="this.model.gwbz"  dictCode="Hr_bas_post,gwmc,gwbz" :disabled="this.disabled"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="组织性质名称">
              <j-dict-select-tag  v-model="this.zzxzmc" dictCode="wdxz" :disabled="this.disabled"/>
            </a-form-item>
          </a-col>
        </a-row>
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


      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { getAction, httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
import { FormTypes } from '@/utils/JEditableTableUtil'
import JEditableTable from '@comp/jeecg/JEditableTable'

  export default {
    name: "ZbrwglModal",
    components: {
      JTreeSelect,JEditableTable
    },
    data () {
      return {
        title:"操作",
        zzxzmc:'',
        disabled:true,
        visible: false,
        newDataSource:[],
        zbrw:[],
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        pdzbszSetTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '指标标识',
              key: 'zbid',
              width: '33%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: []
            },
            {
              title: '指标名称',
              key: 'zbmc',
              width: '33%',
              type: FormTypes.normal,
              defaultValue: '',
              placeholder: '请输入${title}',
              validateRules: []
            },
            {
              title: '指标任务',
              key: 'zbrw',
              width: '33%',
              type: FormTypes.input,
              defaultValue: '',
              placeholder: '请选择${title}',
              validateRules: []
            },
          ]
        },

        confirmLoading: false,
        form: this.$form.createForm(this),

        url: {
          add: "/zbrwgl/zbrwgl/add",
        },
      }
    },
    created () {

    },
    methods: {

      add (queryParam) {
        console.log(queryParam,'11111')
        this.visible = true;
        this.model.pdzq=queryParam.pdzq
        this.model.pdrq=queryParam.pdrq
        this.model.zzbz=queryParam.zzbz
        this.model.gwbz=queryParam.gwbz
        this.zzbzmc()
        this.loadData()
      },
      zzbzmc(){
        let param = {
          zzbz:this.model.zzbz,
        }
        getAction("/zbrwgl/zbrwgl/zzxzmc",param).then(res=>{
          if (res.success) {
            this.zzxzmc = res.result
            this.loading = false
          } else {
            this.zzxzmc= ''
            this.loading = false
          }
        })
      },
      loadData(){
        let param = {
          pdzq:this.model.pdzq,
          pdrq:this.model.pdrq,
          zzbz:this.model.zzbz,
          gwbz:this.model.gwbz,
        }
        getAction("/zbrwgl/zbrwgl/zbxx",param).then(res=>{
          if (res.success) {
            console.log(res.result)
            this.pdzbszSetTable.dataSource = res.result;
          }
        })
      },


      close () {
        this.$emit('close');
        this.visible = false;
        this.zzxzmc =''

      },

      valueChange(e){
        console.log('valueChange',e)
        this.newDataSource=e.newDataSource
        this.zbrw =e.row
        console.log(this.zbrw)
        //添加字段zbabs,给字段设置值
        this.newDataSource.forEach((item,index) =>{
          if (item.zbid == this.zbrw.zbid){
            Object.assign(item,{zbrw:this.zbrw.zbrw})
          }
        })
        console.log(this.newDataSource)
      },

      handleOk () {
        let formData = {
          'zbidList':this.newDataSource,
          'pdzq':this.model.pdzq,
          'pdrq':this.model.pdrq,
          'zzbz':this.model.zzbz,
          'gwbz':this.model.gwbz,
        }
        console.log(formData)
        const that = this;
        httpAction(this.url.add,formData,'post').then((res)=>{
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

      },
      handleCancel () {
        this.close()
      },


    }
  }
</script>

<style lang="less" scoped>

</style>