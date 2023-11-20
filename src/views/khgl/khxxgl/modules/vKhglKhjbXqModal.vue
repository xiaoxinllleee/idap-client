<template>
  <a-modal
    :title="title"
    :width="1450"
    :visible="visible"
    :okButtonProps="{ props: {disabled: true} }"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-tabs default-active-key="1">
          <a-tab-pane tab="客户基本信息" key="1" :forceRender="true">
            <a-divider orientation="left" style="color: #1890FF;">基本信息</a-divider>
          <!--Tab 1：农户基本信息\Begin-->
              <a-row class="form-row" :gutter="16">
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属支行">
                  <j-dict-select-tag placeholder="请输入所属支行" v-decorator="['sszh', {} ]" :triggerChange="true" dict-code="HR_BAS_ORGANIZATION,zzjc,zzbz"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="原所属村">
                  <a-input placeholder="原所属村" v-decorator="['yxzc', {} ]" />
                </a-form-item></a-col>

                <a-col :lg="8"><a-form-item :labelCol="labelCol":wrapperCol="wrapperCol"label="原所属乡镇">
                  <a-input placeholder="请输入原所属乡镇" v-decorator="['yssxz', {}]" />
                </a-form-item></a-col>

                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户名称">
                  <a-input placeholder="请输入客户名称" v-decorator="['khmc', {}]" />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="证件号码">
                  <a-input placeholder="请输入身份证号码" v-decorator="['zjhm', {} ]" />
                </a-form-item></a-col>
                <!--<a-col :lg="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="主客户经理">
                    <a-input  hidden="true" v-model="this.model.sskhjl" />
                    <j-select-ygxx    :treeDefaultExpandAll="true" ref="zkhjl"
                                      v-model="zkhjlacct" @change="GetValueZkhjl"  ></j-select-ygxx>
                  </a-form-item>
                </a-col>-->
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="户号编码">
                  <a-input placeholder="请输入户号编码" v-decorator="['hhbm', {} ]" />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否户主">
                  <j-dict-select-tag placeholder="请选择是否户主" v-decorator="['sfhz', {rules: [{  message: '' }]}]" :triggerChange="true" dictCode="sfbz"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="与户主关系">
                  <j-dict-select-tag placeholder="请选择与户主关系" v-decorator="['yhzgx', {rules: [{  message: '请选择与户主关系!' }]}]" :triggerChange="true" dictCode="yhzgx"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户性别">
                  <j-dict-select-tag placeholder="请选择客户性别" v-decorator="['xb', {rules: [{  }]}]" :triggerChange="true" dictCode="sex"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户年龄">
                  <a-input placeholder="请输入客户年龄" v-decorator="['nl', {}]" />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="民族">
                  <j-dict-select-tag placeholder="请选择客户民族" v-decorator="['mz', {}]" :triggerChange="true" dict-code="mz"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="手机号码">
                  <a-input placeholder="请输入手机号码" v-decorator="['sjhm', {}]" />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="婚姻状况">
                  <j-dict-select-tag placeholder="请选择婚姻状况" v-decorator="['hyzk', {}]" :triggerChange="true" dict-code="bkbpy_hyzk"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="户籍地址">
                  <a-input placeholder="请输入户籍地址" v-decorator="['hjdz', {}]"/>
                </a-form-item></a-col>
              </a-row>

              <a-divider orientation="left" style="color: #1890FF;">详细信息</a-divider>
              <a-row class="form-row" :gutter="16">
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="文化程度">
                  <j-dict-select-tag placeholder="请选择文化程度" v-decorator="['whcd', {}]" :triggerChange="true" dict-code="whcd"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="户口性质">
                  <j-dict-select-tag placeholder="请选择户口性质" v-decorator="['hkxz', {rules: [{  message: '请选择户口性质!' }]}]" :triggerChange="true" dictCode="khgl_hkxz"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="备用号码">
                  <a-input placeholder="请输入备用号码" v-decorator="['byhm', {}]" />
                </a-form-item></a-col>

                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="QQ号码">
                  <a-input placeholder="请输入QQ号码" v-decorator="['qq', {}]" />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户类型I">
                  <j-dict-select-tag placeholder="请选择客户类型I" v-decorator="['khlx1', {}]" dictCode="khlx1"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户类型II">
                  <j-dict-select-tag placeholder="请选择客户类型II" v-decorator="['khlx2', {}]" dictCode="khlx2"/>
                </a-form-item></a-col>

                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="居住地址">
                  <a-input placeholder="请输入常住地址" v-decorator="['zz', {}]"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="曾住地址">
                  <a-input placeholder="请输入曾住地址" v-decorator="['zz1', {}]"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="其他地址">
                  <a-input placeholder="请输入其他地址" v-decorator="['zz2', {}]"/>
                </a-form-item></a-col>

                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="有无子女">
                  <j-dict-select-tag placeholder="请选择有无子女" v-decorator="['ywzn', {}]" dictCode="sfbz"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="健康状况">
                  <j-dict-select-tag placeholder="请选择健康状况" v-decorator="['jkzk', {}]" dictCode="jkzk"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="劳动能力">
                  <j-dict-select-tag placeholder="请选择劳动能力" v-decorator="['ldnl', {}]" dictCode="ldnl"/>
                </a-form-item></a-col>

                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="居住年限">
                  <j-dict-select-tag placeholder="请选择居住年限" v-decorator="['jznx', {}]" dictCode="jznx"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="居住状态">
                  <a-input placeholder="请输入居住状态" v-decorator="['jzzt', {}]"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="最高学历">
                  <j-dict-select-tag placeholder="请选择最高学历" v-decorator="['zgxl', {}]" dictCode="whcd"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="最高学位">
                  <j-dict-select-tag placeholder="请选择最高学位" v-decorator="['zgxw', {}]" dictCode="zgxw"/>
                </a-form-item></a-col>

                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否不良贷款户">
                  <j-dict-select-tag placeholder="是否不良贷款户" v-decorator="['sfbldkh', {}]" dictCode="sfbz"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否贫困户">
                  <j-dict-select-tag placeholder="是否贫困户" v-decorator="['sfpkh', {}]" dictCode="sfbz"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否低保户">
                  <j-dict-select-tag placeholder="是否低保户" v-decorator="['sfdbh', {}]" dictCode="sfbz"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否外出务工">
                  <j-dict-select-tag placeholder="是否外出务工" v-decorator="['sfycdg', {}]" dictCode="sfbz"/>
                </a-form-item></a-col>

                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="务工城市">
                  <a-input placeholder="请输入务工城市" v-decorator="['wgcs', {}]"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="陪访人">
                  <a-input placeholder="请输入陪访人" v-decorator="['pfr', {}]"/>
                </a-form-item></a-col>

                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否授信">
                  <j-dict-select-tag placeholder="是否授信" v-decorator="['sfsx', {}]" dictCode="sfbz"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="从事行业或工作单位">
                  <a-input placeholder="请输入从事行业或工作单位" v-decorator="['cshygz', {}]"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户重要程度">
                  <j-dict-select-tag placeholder="请选择客户重要程度" v-decorator="['kfyyqk', {}]" :triggerChange="true" dictCode="khgl_khzycd"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户潜在业务">
                  <j-multi-select-tag placeholder="客户潜在业务" v-decorator="['kcqzyw', {}]" dict-code="khqzyw" style="width: 100%;"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户授信情况">
                  <j-dict-select-tag v-decorator="['khsxqk', {rules: [{  }]}]" :triggerChange="true" dictCode="khgl_sxqk"/>
                </a-form-item></a-col>
              </a-row>
              <a-row class="form-row" :gutter="16">
                <a-col :lg="24"><a-form-item :labelCol="{span:8}" :wrapperCol="{span: 8}" label="户主及家庭成员社会诚信，家庭及邻里关系，道德品质等综合评价">
                  <j-dict-select-tag placeholder="" v-decorator="['ddpzzhpj', {}]" dictCode="ddpzzhpj"/>
                </a-form-item></a-col>
              </a-row>
          </a-tab-pane>

          <a-tab-pane tab="家庭相关情况" key="2" :forceRender="true">
            <jtcyxx ref="jtcyxxList"/>
          </a-tab-pane>
          <a-tab-pane tab="业务信息" key="3" :forceRender="true">
            <ywhywwlxx ref="YwxxList" />
          </a-tab-pane>
          <a-tab-pane tab="存款余额趋势图（一年内）" key="4" :forceRender="true">
            <jynckqsfx ref="ckyeqsfxList" title="近一年存款分析" />
          </a-tab-pane>

          <a-tab-pane tab="贷款余额趋势图（一年内）" key="5" :forceRender="true">
            <jyndkqsfx ref="dkyeqsfxList" title="近一年贷款分析" />
          </a-tab-pane>
        </a-tabs>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction,getAction} from '@/api/manage'
  import pick from 'lodash.pick'
  import AFormItem from 'ant-design-vue/es/form/FormItem'
  import JMultiSelectTag from '@/components/dict/JMultiSelectTag'
  import JSelectYgxx from '@/components/jeecgbiz/JSelectYgxx'
  import Jtcyxx from './Jtcyxx.vue'
  import Ywxx from './Ywxx.vue'
  import Ywhywwlxx from './Ywhywwlxx.vue'
  import jynckqsfx from './jynckqsfx.vue'
  import jyndkqsfx from './jyndkqsfx.vue'


  export default {
    name: "vKhglKhjbxxModal",
    components: { AFormItem ,JMultiSelectTag,JSelectYgxx,Jtcyxx,Ywxx,Ywhywwlxx,jynckqsfx,jyndkqsfx},
    data () {
      return {
        title:"操作",
        visible: false,
        model: {},
        nhcjxxb:{},
        zkhjlacct:{},
        labelCol: {
          xs: {span: 24},
          sm: {span: 8},
        },
        wrapperCol: {
          xs: {span: 24},
          sm: {span: 16},
        },

        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
        },
        url: {
          add: "/khgl.khxx/vKhglKhjbxx/add",
          edit: "/khgl.khxx/vKhglKhjbxx/edit",
        },
      }
    },
    created () {
    },
    methods: {
      add () {
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'sszh','ssyxdy','hhbm','yhzgx','sfhz','khmc','zjhm','khlx','lxfs','dz','xb','nl','mz','hyzk','bz','lrbz','lrr','yssxz','yxzc','sflqsbk','sfktsbk','jgdm','xtpdjg','xtpdsm','xgr','sfxdry','sfpkh','sfdb','sfgzry','sfffjz','hbjl','infoRate','sskhjl','whcd','sjhm','hkxz','cjr','upDt','upTm','sfcj','sfypyjl'))
		  //时间格式化
         /* this.form.setFieldsValue({lrsj:this.model.lrsj?moment(this.model.lrsj):null})
          this.form.setFieldsValue({xgsj:this.model.xgsj?moment(this.model.xgsj):null})
          this.form.setFieldsValue({cjsj:this.model.cjsj?moment(this.model.cjsj):null})*/
        });

        // 农户采集信息
        if (this.model.zjhm) {
          let params = { "zjhm": record.zjhm}
          getAction("/khgl.khxx/vKhglKhjbxx/nhcjxx", params).then(res => {
            console.log(res.result)
            this.nhcjxxb = Object.assign({}, res.result.nhcjxxList);
            this.zkhjlacct=res.result.zkhjl_dictText;

            console.log("---农户采集信息-----")
            console.log(this.nhcjxxb)
            this.$nextTick(() => {
              let fieldscjxx = pick(this.nhcjxxb, 'pyxxFlag','khxxFlag','khglFlag','signFlag','sskhjl','gzdw','gzdwdz','khmc','zjhm','whcd','sjhm','hkxz','zz','zz1','zz2','sfbldkh','sfpkh','sfdbh','xtpdjg','xtpdsm','gjrpdjg','gjrpdsm','zzpdjg','zzpdsm','cshygz','sfycdg','kfyyqk','kcqzyw','khsxqk','longitude','latitude','sign1','sign2','bz','byhm','pfr','khlx1','khlx2','zdyzbm','ywzn','jkzk','ldnl','jznx','zgxl','zgxw','ddpzzhpj','jzzt','upDt','upTm','ddpzzhpj1','ddpzzhpj2','khblsh','qzywyysj','hjdz','sfsx')
              this.form.setFieldsValue(fieldscjxx)
            })
          });
        }
        //加载家庭相关情况字表数据
        if(record.zjhm) {
          getAction("/khgl.khxx/vKhglKhjbxx/queryJtcy", { hhbm: record.hhbm,}).then((res) => {
            if (res.success) {
              this.$refs.jtcyxxList.dataSource = res.result;
              console.log("---家庭相关情况-----")
              console.log('dataSource_jtcy', res)
            }
          });
        }
       //加载业务往来信息
        if (this.model.zjhm) {
          let params = { "zjhm": record.zjhm,"hmcId":record.id}
          getAction("/khgl.khxx/vKhglKhjbxx/queryYwhxgywxx",{"zjhm": record.zjhm}).then(res => {
            this.$refs.YwxxList.ywhxgywxxmodel =  res.result.ywhywwlxx;
            this.$refs.YwxxList.ckxxdataSource = res.result.ywhywwlxxList;
            this.$refs.YwxxList.dkxxdataSource = res.result.ywhywwlxxList;
            this.$refs.YwxxList.dksjmxdataSource = res.result.khywxxDksjmxList;
            this.$refs.YwxxList.sjyhdataSource = res.result.khywxxSjyhList;
            this.$refs.YwxxList.etcdataSource = res.result.khywxxEtcList;
            this.$refs.YwxxList.xjlghjcDataSource = res.result.khywxxXjlghjcList;
            this.$refs.YwxxList.zjghlDataSource = res.result.khywxxZjghlList;
            this.$refs.YwxxList.dklssjmxdataSource = res.result.khywxxDklssjmxList;
            console.log("---与我行相关业务信息-----")
            console.log(res.result)
          });
        }

        if(record.zjhm) {
          getAction("/tjfx.grcdksjmx/khglGrcdsjmx/getzhjynck",{"zjhm": record.zjhm}).then(res=>{
            if(res.success){
              this.$refs.ckyeqsfxList.dataSource =  res.result.ckyeList;
              this.$refs.dkyeqsfxList.dataSource =  res.result.dkyeList;
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
           /* formData.lrsj = formData.lrsj?formData.lrsj.format():null;
            formData.xgsj = formData.xgsj?formData.xgsj.format():null;
            formData.cjsj = formData.cjsj?formData.cjsj.format():null;*/

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

      GetValueZkhjl(value){
        this.model.sskhjl=value.yggh;
        this.zkhjlacct=value.ygxm;
      },

    }
  }
</script>

<style lang="less" scoped>
  .ant-form .ant-form-item {
    margin-bottom: 10px;
  }
</style>