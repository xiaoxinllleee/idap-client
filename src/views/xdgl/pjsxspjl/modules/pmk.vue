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


            <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="请选择联系人">

              <a-select
                label-in-value
                style="width: 100%"
                @change="selectChange"
                placeholder="请选择联系人，若无，则补充"
              >

                <a-select-option  v-for="(i,index) in familys" :key="index">
                  {{i.yhzgx_dictText +" "+ i.khmc}}
                </a-select-option>

              </a-select>
            </a-form-item></a-col>

            <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="共同债务人姓名">
              <a-input placeholder="请输入共同债务人姓名"style="width: 100%;" v-model="zwr"/>
            </a-form-item></a-col>

            <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="联系人">
              <a-input placeholder="请输入联系人"style="width: 100%;" v-model="lxr"/>
            </a-form-item></a-col>

            <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="联系人身份证">
              <a-input placeholder="请输入联系人身份证"style="width: 100%;" v-model="szjhm"/>
            </a-form-item></a-col>

            <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="联系人电话">
              <a-input placeholder="请输入联系人电话"style="width: 100%;" v-model="sphone"/>
            </a-form-item></a-col>

            <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="联系人住址">
              <a-input placeholder="请输入联系人住址"style="width: 100%;" v-model="szz"/>
            </a-form-item></a-col>

            <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="借款需要">
              <a-input placeholder="请输入借款需要"style="width: 100%;" v-model="jkyt"/>
            </a-form-item></a-col>

            <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="贷款授信金额">
              <a-input placeholder="请输入贷款授信金额(万元)"style="width: 100%;" v-model="dkje" type="number" />
            </a-form-item></a-col>

            <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="授信期限">
              <a-input placeholder="请输入授信期限(月)"style="width: 100%;" v-model="dkqx"  type="number" @change="checkNum()"/>
            </a-form-item></a-col>

            <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="还款来源">
              <a-input placeholder="请输入还款来源"style="width: 100%;" v-model="hkly" />
            </a-form-item></a-col>

            <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="结息方式">
              <a-input placeholder="请输入结息方式"style="width: 100%;" v-model="jxfs" />
            </a-form-item></a-col>
            <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="还款保证">
              <a-input placeholder="请输入还款保证"style="width: 100%;" v-model="hkbz" />
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
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { httpAction,putAction,getAction } from '@/api/manage'
  import { mapGetters } from 'vuex'
  import { JEditableTableMixin } from '@/mixins/JEditableTableMixin'




  export default {
    components: {},
    name: 'WordSupplement',
    mixins: [JeecgListMixin,JEditableTableMixin],
    data() {

      return {
        confirmLoading:false,
        form:{},
        jkyt:"",
        dkje:"",
        dkqx:"",
        hkly:"",
        zjhm:"",
        wordType:"",
        zwr:"",
        yhzgx:"",
        szjhm:"",
        sphone:"",
        szz:"",
        lxr:"",
        jxfs:"",
        hhbm:"",
        hkbz:"",
        oldje:"",
        id:null,
        spid:"",
        url: {
          list: "/",
        },
        familys:[

        ],
        data:[],
        columns: [
          {
            title: '姓名',
            align:"center",
            dataIndex: 'xm',
          },
          {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm',
          },
          {
            title: '联系方式',
            align:"center",
            dataIndex: 'lxfs',
          },
          {
            title: '住址',
            align:"center",
            dataIndex: 'zz',
          },
        ]
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
        this.jkyt = record.wordColumnOne;
        this.dkje = record.wordColumnTwo;

        if (record.wordColumnTwo == null || record.wordColumnTwo == ""){
          this.dkje = record.zzsxed;
        }
        this.oldje = record.zzsxed;
        this.dkqx = record.wordColumnThree;

        if (record.wordColumnThree == null || record.wordColumnThree == ""){
          this.dkqx = 36;
        }
        this.hkly = record.wordColumnFour;
        if (record.wordColumnFour == null || record.wordColumnFour == ""){
          this.hkly = "各项收入";
        }
        this.jxfs = record.wordColumnFive;
        if (record.wordColumnFive == null || record.wordColumnFive == ""){
          this.jxfs = "按月结息";
        }
        this.id = record.id;
        this.spid = record.spid;
        this.hhbm = record.hhbm;
        this.yhzgx = record.yhzgx;
        this.hkbz = record.hkbz;
        if (record.hkbz == null || record.hkbz == ""){
          this.hkbz = "各项收入";
        }

        this.lxr = record.lxr;
        this.zwr = record.zwr;
        this.szjhm = record.szjhm;
        this.sphone = record.sphone;
        this.szz = record.szz;


        if (record.hhbm != null){
        getAction("/xdgl/pjsxspjl/camsZcsxGrpjsxxxSpjl/jointbDebtor",record).then(res=>{
          if (res.success) {
            this.familys  =  res.result;
            console.log(res.result)
            var name = "";
            if (res.result.length != 0){

              for (let i = 0; i < res.result.length; i++) {
                if (i==res.result.length-1){
                  name = name + res.result[i].khmc;
                }else {
                  name = name + res.result[i].khmc+"，";
                }

                if (this.yhzgx == res.result[i].yhzgx){
                  this.lxr = res.result[i].khmc;
                  this.sIdn = res.result[i].zjhm;
                  this.sPhone = res.result[i].lxfs;
                  this.sZz = res.result[i].dz;
                }
              }
              this.zwr = name;
            }else {
              this.familys =[
                {"yhzgx":"2",
                "yhzgx_dictText":"配偶",
                "khmc":""},
                {"yhzgx":"3",
                  "yhzgx_dictText":"父与子","khmc":""},
                {"yhzgx":"4",
                  "yhzgx_dictText":"母与子","khmc":""}
              ]
            }
          }
        })
        }
      },
      handleCancel () {
        this.close()
      },
      checkNum(){
        if (this.dkqx > 36){
          this.dkqx = 36;
          this.$message.info("您输入的授信期限不能超过36个月");
        }
      },

      close () {
        this.jkyt= null;
        this.dkje=null;
        this.dkqx=null;
        this.hkly=null;
        this.sName=null;
        this.yhzgx = null;
        this.jxfs = null;
        this.lxr = null;

        this.szjhm = null;
        this.hkbz = null;
        this.zwr = null;
        this.sphone = null;
        this.szz = null;
        this.id = null;
        this.spid = null;
        this.familys = null;
        this.oldje = null;
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
        formData.hhbm = this.hhbm;
        formData.wordColumnOne = this.jkyt;
        formData.wordColumnTwo = this.dkje;
        formData.wordColumnThree = this.dkqx;
        formData.wordColumnFour = this.hkly;
        formData.wordColumnFive = this.jxfs;
        formData.id = this.id;
        formData.spid = this.spid;
        formData.wordType = "pmk"
        formData.yhzgx = this.yhzgx;
        formData.szjhm = this.szjhm;
        formData.zwr = this.zwr;
        formData.sphone = this.sphone;
        formData.szz = this.szz;
        formData.lxr = this.lxr;
        formData.hkbz = this.hkbz;



        if (this.lxr != ""){
          if (this.yhzgx == ""){
            this.$message.error("新增联系人请选择关系");
            return ;
          }
        }

        if (this.oldje < this.dkje){
          this.$message.error("您输入的借款金额大于授信金额");
          return;
        }


        var reg = /^[0-9]+.?[0-9]*$/
        var dz= this.zjhm;


        putAction('/wordinfo/camsZcsxWordinfo/edit',formData).then((res)=>{
          if(res.success){
            getAction('/word/bmkInfo',formData).then((res)=>{
              if(res.success){
                console.log(res.message)
                let url= `${window._CONFIG['staticDomainURL']}/`+res.message
                window.open(
                  //'http://127.0.0.1:8012/onlinePreview?url='+encodeURIComponent(url)
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
        console.log(this.wordType)
        putAction('/wordinfo/camsZcsxWordinfo/edit',{}).then((res)=>{
          if(res.success){
            getAction('/xdgl/nhxe/nhxe/generate',formData).then((res)=>{
              if(res.success){
                if(res.message=="生成农户小额申请书成功"){
                  let url= `${window._CONFIG['staticDomainURL']}/`+ "dkzl/"+record.zjhm+"nhxe.doc"
                  window.open(
                    //'http://127.0.0.1:8012/onlinePreview?url='+encodeURIComponent(url)
                    `${window._CONFIG['kkFileViewURL']}`+ '?url='+encodeURIComponent(url))
                }else {
                  let url= `${window._CONFIG['staticDomainURL']}/`+ "dkzl/"+record.zjhm+"pmk.doc"
                  window.open(
                    //'http://127.0.0.1:8012/onlinePreview?url='+encodeURIComponent(url)
                    `${window._CONFIG['kkFileViewURL']}`+ '?url='+encodeURIComponent(url))
                }
              }else{
                this.$message.warning(res.message,5);
              }
            })
          }else{
            this.$message.warning(res.message,5);
          }
        })

      },selectChange(i){
        this.lxr = this.familys[i.key].khmc
        this.szjhm = this.familys[i.key].zjhm
        this.sphone = this.familys[i.key].lxfs
        this.szz = this.familys[i.key].dz
        this.yhzgx = this.familys[i.key].yhzgx


      }

    }
  }
</script>

<style scoped>
  .ant-form .ant-form-item {
    margin-bottom: 10px;
  }
</style>