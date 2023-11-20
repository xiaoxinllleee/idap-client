<template>


  <j-modal
    :title="title"
    :width="1450"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :destroyOnClose="true"
    switchFullscreen
    :fullscreen="false"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-card title="审批历史" :bordered="true" v-if="splsTable.dataSource.length > 0">
          <a-table
            size="small"
            :pagination="false"
            :columns="splsTable.columns"
            :dataSource="splsTable.dataSource"
            bordered>
          </a-table>
        </a-card>


        <a-card title="评定及意见" :bordered="true">

          <a-row type="flex" justify="start" align="middle">
            <a-col :span="4" :offset="2">
              初评等级
            </a-col>
            <a-col :span="8">
              <a-form-item >
                <j-dict-radio-tag v-model="model.cpdj" dictCode="pjsx_pddj"/>
              </a-form-item>
            </a-col>
          </a-row>

<!--          <a-row justify="start" align="middle" style="margin-bottom: 20px">-->
<!--            <a-col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }">-->
<!--              模型评定等级：<a-input size="small"   style="border:hidden;width: 100px;" v-model="pjsxxx.xtpddj" />-->
<!--            </a-col>-->
<!--            <a-col :xs="{ span: 11, offset: 1 }" :lg="{ span: 6, offset: 2 }">-->
<!--              模型授信额度：<a-input size="small"   style="border:hidden;width: 100px;" v-model="pjsxxx.xtsxed" /> (万元)-->
<!--            </a-col>-->
<!--          </a-row>-->
          <a-row justify="start" align="middle">
            <a-col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }">
              <a-form-item  label="">
                <font bold color="red"> <strong>申请评定等级：</strong></font><j-dict-select-tag     @change="changeZzsxed" style="width: 100px;" size="small"  v-decorator="['zzpddj', { rules: [{ required: true, message: '请选择最终评定等级!' }] } ]"   :triggerChange="true" dictCode="pjsx_pddj"/>
              </a-form-item>
            </a-col>
            <a-col :xs="{ span: 11, offset: 1 }" :lg="{ span: 6, offset: 2 }">

              <a-form-item >
                <font bold color="red"><strong>申请授信额度：</strong></font><a-input-number    :min="this.min" :max="this.max" size="small"  style="border:hidden;width: 100px;border-bottom: 1px solid #ddd;"  v-decorator="['zzsxed', { rules: [{ required: true, message: '请输入最终授信额度!' }] } ]"/>(万元)
              </a-form-item>
            </a-col>
          </a-row>
          <a-row type="flex" justify="start" align="middle">
            <a-col :span="20" :offset="2">
              <a-form-item >
                <font bold color="red"> <strong>评定意见:</strong></font><a-textarea    :rows="4"  v-decorator="['yj', { rules: [{ required: true, message: '请填写评定意见!' }] } ]" />
              </a-form-item>
            </a-col>
          </a-row>
          <!--<a-button type="primary" block :loading="loading" @click="calculation">
            {{csbtname}}
          </a-button>-->
        </a-card>



      </a-form>

    </a-spin>

  </j-modal>

</template>

<script>
import pjsxEdit from './pjsxEdit'
import { getAction, putAction } from '@api/manage'
import JDictRadioTag from '@comp/dict/JDictRadioTag.vue'
import pick from 'lodash.pick'
import moment from 'moment/moment'

export default {
  components:{
    JDictRadioTag
  },
  data(){
    return{
      title: '评级授信流程',
      visible: false,
      confirmLoading:false,
      form: this.$form.createForm(this),
      formData:{},
      model:{},
      pjsxxx:{},
      min:0,
      max:30,
      splsTable: {
        loading: false,
        dataSource: [ ],
        columns: [
          {
            title: '审批人',
            key: 'yggh',
            align: "center",
            dataIndex: 'yggh_dictText',

          },
          {
            title: '评定等级',
            key: 'pddj',
            align: "center",
            dataIndex: 'pddj_dictText',

          },
          {
            title: '建议额度(万元)',
            key: 'jyed',
            align: "center",
            dataIndex: 'jyed',

          },
          {
            title: '审批意见',
            key: 'spyj',
            align: "center",
            dataIndex: 'spyj',
          },
          {
            title: '审批时间',
            key: 'createTime',
            align: "center",
            dataIndex: 'createTime',
            customRender: function (text) {
              return !text ? "" : (text.length > 10 ? text.substr(0, 10) : text)
            },
          },
        ]
      },
      url: {
        list: "/xdgl/grkhpjsx/list",
        add: "/khgl/vKhglKrkhgl/add",
        edit: "/xdgl/grkhpjsx/edit",
        ywhywxx:{
          list: '/xdgl/grdkgl/queryYwhywxxByHhbm'
        }
      }
    }
  },
  methods:{
    edit(record){

      if (record.spid) {
        let params = {"spid":record.spid}
        putAction("xdgl/grkhpjsx/splsXend", params).then(res => {
          if (res.success) {
            this.splsTable.dataSource = res.result.spls
          }
        });
      }

      this.form.resetFields();
      this.model = Object.assign({}, record);
      this.visible = true;
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model,'zjhm','zzpddj','zzsxed','yj',))
        //时间格式化
      });
    },
    loadPjsx(){
      getAction('/grpjsx/queryById', { id: this.formData.id }).then(res => {
        if (res.success){
          this.pjsxxx = res.result;
          if (!res.result.hmcId){
            this.pjsxxx.hmcId = this.formData.id;
            this.pjsxxx.hhbm = this.formData.hhbm;
            this.pjsxxx.qybm = this.formData.wgbh;
          }
        }
      })
    },

    handleOk () {
      const that = this;
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values);

          that.confirmLoading = true;
          let httpurl = this.url.edit;
          let zbtable = Object.assign(this.model, values);
          let formData = {
            ...zbtable
          }
          putAction(httpurl,formData).then((res)=>{
            if(res.success){
              that.$emit('apply',res.result);
            }else{
              that.$message.warning(res.message);
            }
          }).finally(() => {
            that.confirmLoading = false;
            that.close();
          })
        }else{
          that.$message.error("请填写评定信息！");
          that.activeKey='8';
          that.dafactivekey='8';

        }
      })
    },
    handleCancel () {
      this.close()
    },
    close () {
      this.visible = false;
    },
    changeZzsxed: function(value){
      // 将选定值绑定至下拉选择框
      if(value=='A'){
        this.min=0;
        this.max=30;
      }else if(value=='B'){
        this.min=0;
        this.max=20;
      }else if(value=='C'){
        this.min=0;
        this.max=10;
      }else if(value=='D'){
        this.min=0;
        this.max=5;
      }else if(value=='E'){
        this.min=0;
        this.max=0;
      }
    },
  }
}

</script>

<style>

</style>