<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <a-modal
    :title="title"
    :width="1450"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :okButtonProps="{ props: {disabled: false} }"
    @ok="handleOk"
    @cancel="handleCancel"
    >
    <a-spin :spinning="confirmLoading">
      <!-- 主表单区域 -->
      <a-form :form="form">
        <a-tabs default-active-key="1">
          <a-tab-pane tab="文档信息补录" key="1" :forceRender="true">
            <a-divider orientation="left" style="color: #1890FF;">农户小额申请书</a-divider>
            <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="借款用途">
              <a-input placeholder="请输入借款用途"style="width: 100%;" v-model="jkyt" />
            </a-form-item></a-col>

            <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="贷款金额">
              <a-input placeholder="请输入贷款金额(元)"style="width: 100%;" v-model="dkje" />
            </a-form-item></a-col>

            <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="贷款期限">
              <a-input placeholder="请输入贷款金额(月)"style="width: 100%;" v-model="dkqx" />
            </a-form-item></a-col>

            <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="还款来源">
              <a-input placeholder="请输入还款来源(月)"style="width: 100%;" v-model="hkly" />
            </a-form-item></a-col>
          </a-tab-pane>
      </a-tabs>
      </a-form>

    </a-spin>


  </a-modal>

</template>

<script>

  import moment from 'moment'
  import pick from 'lodash.pick'
  import { JEditableTableMixin } from '@/mixins/JEditableTableMixin'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { httpAction,putAction,getAction } from '@/api/manage'
  import { mapGetters } from 'vuex'




  export default {
    components: {},
    name: 'WordSupplement',
    mixins: [JEditableTableMixin,JeecgListMixin],
    data() {
      return {
        jkyt:"",
        dkje:"",
        dkqx:"",
        hkly:"",
        zjhm:"",
        url: {
          list: "/khgl/vKhglKrkhgl/list",
          add: "/khgl/vKhglKrkhgl/add",
          edit: "/khgl/vKhglKrkhgl/edit",
        }
      }
    },

    created () {
      this.querycsz()
    },


    methods: {

      add (value) {
        this.addzjhm = value.zjhm
        this.zjhm=this.addzjhm
        this.edit({});
      },
      edit (record) {
          this.jkyt="";
          this.dkje="",
          this.dkqx="",
          this.hkly="",
          this.zjhm="",
        this.model = Object.assign({});
        this.visible = true;
        this.zjhm = record.zjhm;
      },
      handleCancel () {
        this.close()
      },

      close () {
        this.$emit('close');
        this.visible = false;
      },
      //查询是否开通三级营销单元
      querycsz(){
        let params = { "csm":"CS0004"}
        putAction("/yxdygl/yxdyglPqzrrgl/querycsz", params).then(res => {
          if (res.success) {
            console.log("---------")
            console.log(res.result.csz)
            this.sfktsjyxdy =res.result.csz
          }
        });
      },

      handleOk () {
        let formData={}
        formData.zjhm = this.zjhm;
        formData.jkyt = this.jkyt;
        formData.dkje = this.dkje;
        formData.dkqx = this.dkqx;
        formData.hkly = this.hkly;

        putAction('/xdgl/nhxe/nhxe/supplement',formData).then((res)=>{
          if(res.success){
            this.$message.success(res.message);
          }else{
            this.$message.warning(res.message,5);
          }
        }).finally(() => {
          this.confirmLoading = false;
          this.close();
      })

      },

    }
  }
</script>

<style scoped>
  .ant-form .ant-form-item {
    margin-bottom: 10px;
  }
</style>