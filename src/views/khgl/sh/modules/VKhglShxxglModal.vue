<template>
  <a-modal
    :title="title"
    :width="1450"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :okButtonProps="{ props: {disabled: disableSubmit} }"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-tabs default-active-key="1">
          <a-tab-pane tab="商户基本信息" key="1" :forceRender="true">
            <a-divider orientation="left" style="color: #1890FF;">基本信息</a-divider>
            <a-row class="form-row" :gutter="16">
              <a-col :lg="8">
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属支行">
                  <j-dict-select-tag placeholder="请输入所属支行" v-decorator="['sszh', {} ]" :triggerChange="true" dict-code="HR_BAS_ORGANIZATION,zzjc,zzbz"/>
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属区域">
                  <a-input placeholder="请输入所属区域" v-decorator="['ssyxdy', {}]" />
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="商户名称">
                  <a-input placeholder="请输入商户名称" v-decorator="['shmc', {}]" />
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="成立日期">
                  <a-date-picker v-decorator="[ 'clrq', {}]" style="width: 300px" />
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="曾用名">
                  <a-input placeholder="请输入曾用名" v-decorator="['cym', {}]" />
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="经营状态">
                  <j-dict-select-tag placeholder="请选择经营状态" v-decorator="['jyzt', {}]" :triggerChange="true" dictCode="jyzt"/>
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="法定代表人">
                  <a-input placeholder="请输入法定代表人" v-decorator="['fddbr', {}]" />
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="法人证件号码">
                  <a-input placeholder="请输入法人证件号码" v-decorator="['frzjhm', {}]" />
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="注册资本">
                  <a-input placeholder="请输入注册资本" v-decorator="['zczb', {}]" />
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="社会信用代码">
                  <a-input placeholder="请输入统一社会信用代码" v-decorator="['tyshxydm', {}]" />
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="联系方式">
                  <a-input placeholder="请输入联系方式" v-decorator="['lxfs', {}]" />
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="更多联系方式">
                  <a-input placeholder="请输入更多联系方式" v-decorator="['gdlxfs', {}]" />
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属行业">
                  <a-input placeholder="请输入所属行业" v-decorator="['sshy', {}]" />
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="邮箱地址">
                  <a-input placeholder="请输入邮箱地址" v-decorator="['yxdz', {}]" />
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="商户类型">
                  <j-dict-select-tag placeholder="请选择商户类型" v-decorator="['shlx', {}]" :triggerChange="true" dictCode="qylx"/>
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="授信对象">
                  <a-input  v-decorator="['sxdxmc', {}]" />
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="经营期限(月份)">
                  <a-input  v-decorator="['jyqx', {}]" />
                </a-form-item>
              </a-col>
            </a-row>

            <a-row style="margin-top: -20px;">
              <a-col :span="24" :pull="2">
                <a-form-item label="企业地址":labelCol="{ xs: { span: 24 }, sm: { span: 4} }" :wrapperCol="{ xs: { span: 24 }, sm: { span: 19 } }" hasFeedback>
                  <a-textarea placeholder="请输入企业地址" v-decorator="['dz', validatorRules.wcqk]" :autosize="{ minRows: 2, maxRows: 4 }"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row style="margin-top: -20px;">
              <a-col :span="24" :pull="2">
                <a-form-item label="经营范围":labelCol="{ xs: { span: 24 }, sm: { span: 4} }" :wrapperCol="{ xs: { span: 24 }, sm: { span: 19 } }" hasFeedback>
                  <a-textarea placeholder="请输入经营范围" v-decorator="['jyfw', validatorRules.wcqk]" :autosize="{ minRows: 2, maxRows: 4 }"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row style="margin-top: -20px;">
              <a-col :span="24" :pull="2">
                <a-form-item label="备注":labelCol="{ xs: { span: 24 }, sm: { span: 4} }" :wrapperCol="{ xs: { span: 24 }, sm: { span: 19 } }" hasFeedback>
                  <a-textarea placeholder="请输入备注" v-decorator="['bz', validatorRules.wcqk]" :autosize="{ minRows: 2, maxRows: 4 }"/>
                </a-form-item>
              </a-col>
            </a-row>

            <a-divider orientation="left" style="color: #1890FF;">采集信息</a-divider>
            <a-row class="form-row" :gutter="16">
              <a-col :lg="8">
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="经度">
                  <a-input placeholder="请输入商户名称" v-decorator="['longitude', {}]" />
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="纬度">
                  <a-input placeholder="请输入纬度" v-decorator="['latitude', {}]" />
                </a-form-item>
              </a-col>
              <a-col :lg="8">
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="采集人">
                  <j-dict-select-tag placeholder="请输入采集人" v-decorator="['cjr', {} ]" :triggerChange="true" dict-code="HR_BAS_STAFF,ygxm,yggh"/>
                </a-form-item>
              </a-col>
            </a-row>
          </a-tab-pane>
          <a-tab-pane tab="关系人信息" key="2" :forceRender="true">
            <glrxx ref="glrxxList"/>
          </a-tab-pane>
          <a-tab-pane tab="法人家庭信息" key="3" :forceRender="true">
            <frjtxx ref="frjtxxList" />
          </a-tab-pane>
          <a-tab-pane tab="对公业务信息" key="4" :forceRender="true">
            <dgywxx ref="dgywxx" />
          </a-tab-pane>
          <a-tab-pane tab="评级授信" key="5" :forceRender="true">
            <pjsxxx  ref="pjsxxx"/>
          </a-tab-pane>
          <a-tab-pane tab="附件信息" key="6" :forceRender="true">
            <fjxx ref="fjxx" />
          </a-tab-pane>
        </a-tabs>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { getAction,httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import glrxx from './glrxx.vue'
  import pjsxxx from './pjsxxx.vue'
  import dgywxx from './dgywxx.vue'
  import fjxx from './fjxx.vue'
  import frjtxx from './frjtxx.vue'

  export default {
    name: "VKhglShxxglModal",
    components:{ glrxx,pjsxxx,dgywxx,fjxx,frjtxx},
    data () {
      return {
        frzjhm:"",
        disableSubmit:false,
        title:"操作",
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
          add: "sh/vShxxgl/add",
          edit: "sh/vShxxgl/edit",
        },
      }
    },
    created () {
    },
    methods: {
      add () {
        this.edit({});
      },
      edit (record,qfbs) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        //qfbs 1:商户页面跳转进入，2：统一查询页面进入
        if (qfbs==2){

          // 加载商户基本信息
          if (this.model.id) {
            let params = { "id": record.id}
            getAction("sh/vShxxgl/queryShjbxx", params,this.form).then(res => {
              this.model = Object.assign({}, res.result);
              console.log("---商户基本信息-----")
              console.log(this.model)
              // this.$nextTick(() => {
              //   let fields = pick(this.ywhxgywxxmodel, 'sfdfgz','sfktpos','sfktjhzf','sfblezf','sfblejf','sfblznzd','sfbllcyw','sfbldlbx','sfgzgzh','sfktxyk','sfktfmk','sfktsmf','khmc','hmcId','zjhm','sfktckyw','ckye','ckrpye','cknrpye','hqckye','dqckye','hqckrpye','dqckrpye','hqcknrpye','dqcknrpye','sfktdkyw','dkje','dkye','bldkye','bwbldkye','sfktsjyhyw','sfktwsyhyw','sfbletcyw','sfktsbk')
              //   this.form.setFieldsValue(fields)
              // })
              let fields = pick(this.model, 'sszh','clrq','ssxz','xzc','ssyxdy','zkhjl','shmc','fddbr','frzjhm','tyshxydm','yyzz','nsrsbh','zzjgdm','zch','jyzt','zczb','lxfs','gdlxfs','yxdz','gdyxdz','dz','jyqx','sxdxzjh','sxdxmc','cbrs','shlx','sshy','cym','wz','jyfw','bz','lrbz','lrr','xtpdjg','xtpdsm','xgr','infoRate','sfsx','zzpddj','zzsxed','sfycj','latitude','longitude','cjr')
              this.form.setFieldsValue(fields)
            });
          }
        }else {
          this.$nextTick(() => {
            this.form.setFieldsValue(pick(this.model,'sszh','clrq','ssxz','xzc','ssyxdy','zkhjl','shmc','fddbr','frzjhm','tyshxydm','yyzz','nsrsbh','zzjgdm','zch','jyzt','zczb','lxfs','gdlxfs','yxdz','gdyxdz','dz','jyqx','sxdxzjh','sxdxmc','cbrs','shlx','sshy','cym','wz','jyfw','bz','lrbz','lrr','xtpdjg','xtpdsm','xgr','infoRate','sfsx','zzpddj','zzsxed','sfycj','latitude','longitude','cjr'))
          });
        }


        //加载商户数据
        if(record.id) {
          getAction("sh/vShxxgl/query", { shid: record.id}).then((res) => {
            console.log("信息")
            console.log(res)
            if (res.success) {
              //关联人信息
              this.$refs.glrxxList.dataSource = res.result.glrxxList;
              console.log("------关联人信息-----")
              console.log(res.result.glrxxList)
              //商戶评级授信息
              let shpjsx = {
                ...res.result.shpjsx,
                fz:res.result.fz,
                jtzzc:res.result.jtzzc
              }
              //shpjsx = Object.assign(res.result.shpjsx,res.result.fz,res.result.jtzzc)
              console.log("------商戶评级授信息-----")
              console.log(res.result.fz)
              this.$refs.pjsxxx.pjsxxxFormData = shpjsx;
              //商戶房产信息
              this.$refs.pjsxxx.dataSource = res.result.shfcxxList;
              //商戶资产信息
              this.$refs.pjsxxx.zcqkdataSource = res.result.shzcxx;
              //商戶负债信息
              this.$refs.pjsxxx.fzqkdataSource = res.result.shfzxx;
              //贷款数据
              this.$refs.dgywxx.dkxxdataSource = res.result.ywwlxxList;
              //存款数据
              this.$refs.dgywxx.ckxxdataSource = res.result.ywwlxxList;
              //贷款数据明细
              this.$refs.dgywxx.dksjmxdataSource = res.result.dksjmxList;
              //手机银行
              this.$refs.dgywxx.sjyhdataSource = res.result.sjyhList;
              //ETC
              //this.$refs.dgywxx.etcdataSource = res.result.etcList;
              //福祥E支付
              this.$refs.dgywxx.ezfdataSource = res.result.fxezhList;
              //信用卡
              this.$refs.dgywxx.xykdataSource = res.result.xykList;
              //现金流归行检测
              this.$refs.dgywxx.XjlghjctableDate = res.result.xjlghjcList;
            }
          });

          //获取法人家庭信息
          getAction("/sh/vShxxgl/selectByFrzjhm", {frzjhm:record.frzjhm}).then((res) => {
            if (res.success) {
              console.log("------法人家庭信息-----")
              console.log(res.result)
              this.$refs.frjtxxList.dataSource=res.result.list

            }
          });

          //获取附件信息
            let params = { "id": record.id }
            getAction("/sh/vShxxgl/img", params).then((res) => {
              if (res.success) {
                // console.log("result")
                // console.log(res.result)
                this.$refs.fjxx.showImg(res.result)
              }
            });

        }
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
            if(!this.model.id){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            formData.clrq = formData.clrq?formData.clrq.format():null;
            formData.lrsj = formData.lrsj?formData.lrsj.format():null;
            formData.xgsj = formData.xgsj?formData.xgsj.format():null;

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
  .ant-form .ant-form-item {
    margin-bottom: 10px;
  }

</style>