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
              <a-input placeholder="请输入借款用途"style="width: 100%;" v-model="jkyt"/>
            </a-form-item></a-col>

            <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="贷款金额">
              <a-input placeholder="请输入贷款金额(元)"style="width: 100%;" v-model="dkje" type="number" />
            </a-form-item></a-col>

            <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="贷款期限">
              <a-input placeholder="请输入贷款金额(月)"style="width: 100%;" v-model="dkqx" type="number" @change="checkNum()"/>
            </a-form-item></a-col>

            <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="还款来源">
              <a-input placeholder="请输入还款来源"style="width: 100%;" v-model="hkly" />
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
        hhbm:"",
        oldje:"",
        id:null,
        spid:"",
        url: {
          list: "/",
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
        this.model = Object.assign({});
        this.visible = true;
        this.zjhm = record.zjhm;
        this.hhbm = record.hhbm;
        this.jkyt = record.wordColumnOne;
        this.dkje = record.wordColumnTwo;
        if (record.wordColumnTwo == null || record.wordColumnTwo == ""){
          this.dkje = record.zzsxed;
        }
        this.oldje = record.zzsxed;
        this.dkqx = record.wordColumnThree;
        if (record.wordColumnThree == null || record.wordColumnThree == ""){
          this.dkqx = 12;
        }

        this.hkly = record.wordColumnFour;
        if (record.wordColumnFour == null || record.wordColumnFour == ""){
          this.hkly = "各项收入";
        }
        this.id = record.id;
        this.spid = record.spid;
        this.wordType ="nhxe";
      },
      handleCancel () {
        this.close()
      },
      checkNum(){
        if (this.dkqx > 24){
          this.dkqx = 24;
          this.$message.info("您输入的贷款期限不能超过24个月");
        }
      },

      close () {
        this.jkyt= null;
        this.dkje=null;
        this.dkqx=null;
        this.hkly=null;
        this.id = null;
        this.spid = null;
        this.zjhm =null;
        this.hhbm =null;
        this.oldje=null;
        this.$emit('close');
        this.visible = false;
      },
      //查询是否开通三级营销单元
      querycsz(){
        let params = { "csm":"CS0004"}
        putAction("/yxdygl/yxdyglPqzrrgl/querycsz", params).then(res => {
          if (res.success) {
            this.sfktsjyxdy =res.result.csz
          }
        });
      },

      handleOk () {
        let formData={}
        formData.zjhm = this.zjhm;
        formData.hhbm = this.hhbm;
        formData.wordColumnOne = this.jkyt;
        formData.wordColumnTwo = this.dkje;
        formData.wordColumnThree = this.dkqx;
        formData.wordColumnFour = this.hkly;
        formData.id = this.id;
        formData.spid = this.spid;
        formData.wordType = this.wordType;
        formData.type = "1";

        var reg = /^[0-9]+.?[0-9]*$/
        var dz = this.zjhm;


          if (this.oldje < this.dkje){
            this.$message.error("您输入的借款金额大于授信金额");
            return;

        }

        /*if (this.oldje < this.dkje){
          this.$message.error("您输入的借款金额大于授信金额");
          return;
        }*/

        /*if (this.jkyt.length > 100){
          this.$message.error("您输入的借款用途字数长度限制在100");
          return ;
        }

        if (!this.dkje.test(reg)){
          this.$message.error("您输入的借款金额必须是整数");
          return ;
        }

        if (!this.dkje.test(reg)){
          this.$message.error("您输入的借款期限必须是整数");
          return ;
        }*/
        putAction('/wordinfo/camsZcsxWordinfo/edit',formData).then((res)=>{
          if(res.success){

            getAction('/word/creditWord',formData).then((res)=>{
              if(res.success){
                  let url= `${window._CONFIG['staticDomainURL']}/`+res.message
                  window.open(
                    `${window._CONFIG['kkFileViewURL']}`+ '?url='+encodeURIComponent(url))

              }else{
                this.$message.warning(res.message,5);
              }
            })
          }else{
            this.$message.warning(res.message,5);
          }
        }).finally(() => {
          this.confirmLoading = false;
          this.close();
      })

      },
      radioChange(e){
        this.wordType = e.target.value;
      }

    }
  }
</script>

<style scoped>
  .ant-form .ant-form-item {
    margin-bottom: 10px;
  }
</style>