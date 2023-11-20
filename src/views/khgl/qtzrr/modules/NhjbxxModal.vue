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
          <a-tab-pane tab="农户基本信息" key="1" :forceRender="true">
            <a-card class="card" :bordered="false">
        <a-divider orientation="left" style="color: #1890FF;">基本信息</a-divider>
        <a-row class="form-row" :gutter="16">
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属支行">
            <j-dict-select-tag placeholder="请输入所属支行" v-decorator="['sszh', {} ]" :triggerChange="true" dict-code="HR_BAS_ORGANIZATION,zzjc,zzbz"/>
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="原所属村">
            <a-input placeholder="原所属村" v-decorator="['yxzc', {} ]" />
          </a-form-item></a-col>

          <a-col :lg="8"><a-form-item :labelCol="labelCol":wrapperCol="wrapperCol"label="原所属乡镇">
              <a-input placeholder="请输入所属乡镇" v-decorator="['yssxz', {}]" />
          </a-form-item></a-col>


         <!-- <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol"label="所属营销单元">
              <j-dict-select-tag  v-decorator="['ssyxdy', {rules: [{ required: true, message: '请选择所属营销单元!' }]}]" :triggerChange="true" placeholder="请选择所属营销单元" dictCode="V_CZXXGL_ORGANIZE,ORGANIZE,QYBM"/>
            </a-form-item>
          </a-col>-->

          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="主客户经理">
              <a-input  hidden="true" v-model="this.model.sskhjl" />
              <j-select-ygxx    :treeDefaultExpandAll="true" ref="zkhjl"
                                v-model="zkhjlacct" @change="GetValueZkhjl"  ></j-select-ygxx>
            </a-form-item>
          </a-col>

          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="证件号码">
            <a-input placeholder="请输入身份证号码" v-decorator="['zjhm', {} ]" />
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="户号编码">
            <a-input placeholder="请输入户号编码" v-decorator="['hhbm', {} ]" />
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="户口性质">
            <j-dict-select-tag placeholder="请选择户口性质" v-decorator="['hkxz', {rules: [{  message: '请选择户口性质!' }]}]" :triggerChange="true" dictCode="khgl_hkxz"/>
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否户主">
            <j-dict-select-tag placeholder="请选择是否户主" v-decorator="['sfhz', {rules: [{  message: '' }]}]" :triggerChange="true" dictCode="sfbz"/>
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="与户主关系">
            <j-dict-select-tag placeholder="请选择与户主关系" v-decorator="['yhzgx', {rules: [{  message: '请选择与户主关系!' }]}]" :triggerChange="true" dictCode="yhzgx"/>
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户名称">
            <a-input placeholder="请输入客户名称" v-decorator="['khmc', {}]" />
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户年龄">
            <a-input placeholder="请输入客户年龄" v-decorator="['nl', {}]" />
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="手机号码">
            <a-input placeholder="请输入手机号码" v-decorator="['sjhm', {}]" />
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否授信">
            <j-dict-select-tag placeholder="是否授信" v-decorator="['sfsx', {rules: [{  message: '是否授信!' }]}]" :triggerChange="true" dictCode="sfbz"/>
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="民族">
            <j-dict-select-tag placeholder="请选择客户民族" v-decorator="['mz', {}]" :triggerChange="true" dict-code="mz"/>
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="文化程度">
            <j-dict-select-tag placeholder="请选择文化程度" v-decorator="['whcd', {}]" :triggerChange="true" dict-code="whcd"/>
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="婚姻状况">
            <j-dict-select-tag placeholder="请选择婚姻状况" v-decorator="['hyzk', {}]" :triggerChange="true" dict-code="bkbpy_hyzk"/>
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户性别">
            <j-dict-select-tag placeholder="请选择客户性别" v-decorator="['xb', {rules: [{  }]}]" :triggerChange="true" dictCode="sex"/>
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="户籍地址">
            <a-input placeholder="请输入户籍地址" v-decorator="['hjdz', {}]"/>
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="居住地址">
            <a-input placeholder="请输入居住地址" v-decorator="['zz', {}]"/>
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="曾住地址">
            <a-input placeholder="请输入曾住地址" v-decorator="['zz1', {}]"/>
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="其他地址">
            <a-input placeholder="请输入其他地址" v-decorator="['zz2', {}]"/>
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="{xs:{span:24},sm:{span:8}}" :wrapperCol="{xs:{span:24},sm:{span:16}}" label="从事行业或工作单位">
            <a-input placeholder="请输入从事行业或工作单位" v-decorator="['cshygz', {}]"/>
          </a-form-item></a-col>
        </a-row>
        </a-card>
       </a-tab-pane>

          <a-tab-pane tab="家庭相关情况" key="2" :forceRender="true">
            <jtxgqk ref="jtcyList" />
          </a-tab-pane>

          <a-tab-pane tab="业务信息" key="3" :forceRender="true">
            <a-card class="card" :bordered="false">
              <a-divider orientation="left" style="color: #1890FF;">业务信息</a-divider>
              <a-row class="form-row" :gutter="16">
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否外出务工">
                  <j-dict-select-tag placeholder="请选择是否外出务工" v-decorator="['sfycdg', {}]" :triggerChange="true" dictCode="sfbz"/>
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
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否不良贷款客户">
                  <j-dict-select-tag v-decorator="['sfbldkh', {rules: [{  }]}]" :triggerChange="true" dictCode="sfbz"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否贫困户">
                  <j-dict-select-tag v-decorator="['sfpkh', {rules: [{  }]}]" :triggerChange="true" dictCode="sfbz"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否低保户">
                  <j-dict-select-tag v-decorator="['sfdbh', {rules: [{  }]}]" :triggerChange="true" dictCode="sfbz"/>
                </a-form-item></a-col>
              </a-row>

              <a-divider orientation="left" style="color: #1890FF;">与我行相关业务信息</a-divider>
              <a-row class="form-row" :gutter="10">
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="存款余额">
                  <a-input placeholder="请输入存款余额" v-decorator="['ckye', {} ]" disabled />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="存款日平余额">
                  <a-input placeholder="请输入存款日平余额" v-decorator="['ckrpye', { }]" disabled />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="存款年日平余额">
                  <a-input placeholder="请输入存款年日平余额" v-decorator="['cknrpye', {} ]" disabled />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否开通存款业务">
                  <j-dict-select-tag  v-decorator="['sfktckyw', {} ]" disabled :triggerChange="true" dictCode="sfbz"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否开通贷款业务">
                  <j-dict-select-tag v-decorator="['sfktdkyw',{} ]" disabled :triggerChange="true" dictCode="sfbz"/>
                </a-form-item></a-col>
                <!--<a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否不良贷款户">
                  <j-dict-select-tag  v-decorator="['sfbldkh', {} ]" disabled :triggerChange="true" dictCode="sfbz"/>
                </a-form-item></a-col>-->
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="贷款余额">
                  <a-input placeholder="请输入贷款余额" disabled  v-decorator="['dkye', {} ]" />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="不良贷款余额">
                  <a-input placeholder="请输入不良贷款余额" disabled v-decorator="['bldkye', {} ]" />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="表外不良贷款余额">
                  <a-input placeholder="请输入表外不良贷款余额" disabled v-decorator="['bwbldkye', {} ]" />
                </a-form-item></a-col>



                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否开通手机银行业务">
                  <j-dict-select-tag  v-decorator="['sfktsjyhyw', {} ]"  :triggerChange="true" dictCode="sfbz"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否开通网上银行业务">
                  <j-dict-select-tag  v-decorator="['sfktwsyhyw', {} ]"  :triggerChange="true" dictCode="sfbz"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否办理etc业务">
                  <j-dict-select-tag  v-decorator="['sfbletcyw', {} ]"  :triggerChange="true" dictCode="sfbz"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否开通社保卡">
                  <j-dict-select-tag  v-decorator="['sfktsbk', {} ]"  :triggerChange="true" dictCode="sfbz"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否开通POS机">
                  <j-dict-select-tag  v-decorator="['sfktpos', {} ]" :triggerChange="true" dictCode="sfbz"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否开通聚合支付">
                  <j-dict-select-tag  v-decorator="['sfktjhzf', {} ]"  :triggerChange="true" dictCode="sfbz"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否办理E支付">
                  <j-dict-select-tag  v-decorator="['sfblezf', {} ]"  :triggerChange="true" dictCode="sfbz"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否办理E缴费">
                  <j-dict-select-tag  v-decorator="['sfblejf', {} ]"  :triggerChange="true" dictCode="sfbz"/>
                </a-form-item></a-col>

                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否办理助农终端">
                  <j-dict-select-tag  v-decorator="['sfblznzd', {} ]"  :triggerChange="true" dictCode="sfbz"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否办理理财业务">
                  <j-dict-select-tag  v-decorator="['sfbllcyw', {} ]"  :triggerChange="true" dictCode="sfbz"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否办理代理保险业务">
                  <j-dict-select-tag  v-decorator="['sfbldlbx', {} ]"  :triggerChange="true" dictCode="sfbz"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否关注我行公众号">
                  <j-dict-select-tag  v-decorator="['sfgzgzh', {} ]"  :triggerChange="true" dictCode="sfbz"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否开通信用卡">
                  <j-dict-select-tag  v-decorator="['sfktxyk', {} ]" :triggerChange="true" dictCode="sfbz"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否开通福民卡">
                  <j-dict-select-tag  v-decorator="['sfktfmk', {} ]"  :triggerChange="true" dictCode="sfbz"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否开扫码付">
                  <j-dict-select-tag  v-decorator="['sfktsmf', {} ]"  :triggerChange="true" dictCode="sfbz"/>
                </a-form-item></a-col>

              </a-row>
            </a-card>
          </a-tab-pane>

          <a-tab-pane tab="房产情况" key="4" :forceRender="true">
            <fcqkxx ref="fcxxList" />
          </a-tab-pane>

          <a-tab-pane tab="资产情况" key="5" :forceRender="true">
            <zcfzqk ref="zcfzqklist" />
          </a-tab-pane>

          <a-tab-pane tab="负债情况" key="6" :forceRender="true">
            <fzqk ref="fzqktable" />
          </a-tab-pane>

          <a-tab-pane tab="经营情况" key="7" :forceRender="true">
            <jyqk ref= "jyqktable"/>
          </a-tab-pane>

          <a-tab-pane tab="总评打分" key="8" :forceRender="true">
            <a-card class="card" :bordered="false">
              <a-row class="form-row" :gutter="16">
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="劳动力人数">
                  <j-dict-select-tag placeholder="请选择劳动力人数"  :triggerChange="true" v-decorator="['ndlrs', {}]"  dict-code="khgl_ldlrs" />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="社会评价">
                  <j-dict-select-tag placeholder="请选择社会评价" :triggerChange="true" v-decorator="['nhshpj', {}]"  dict-code="khgl_shpj" />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="净资产">
                  <a-input placeholder="自动运算项" v-decorator="['nhjzc', {}]" />
                </a-form-item></a-col>
              </a-row>

              <a-row class="form-row" :gutter="16">
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="纯收入">
                  <a-input placeholder="自动运算项"  v-decorator="['nhcsr', {}]" />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="当前经营项目从业时间">
                  <j-dict-select-tag placeholder="==请选择==" v-decorator="['jyxmcysj', {}]"  :triggerChange="true" dict-code="khgl_jyxmcysj"/>
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="与本行信贷往来时间">
                  <j-dict-select-tag placeholder="==请选择==" v-decorator="['ybhlwsj', {}]"   :triggerChange="true" dict-code="khgl_jyxmcysj"/>
                </a-form-item></a-col>
              </a-row>

              <a-row class="form-row" :gutter="16">
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="综合竞争实力">
                  <j-dict-select-tag placeholder="==请选择=="  :triggerChange="true" v-decorator="['zhjzsl', {}]"   dict-code="khgl_zhjzsl" />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="资信状况">
                  <a-input placeholder="自动运算项"  v-decorator="['nhzxzk', {}]"  />
                </a-form-item></a-col>
                <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="总评得分小计">
                  <a-input placeholder="自动运算项"  v-decorator="['zpdfxj', {}]" disabled />
                </a-form-item></a-col>
              </a-row>
            </a-card>
          </a-tab-pane>





        </a-tabs>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction,putAction,getAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import AFormItem from 'ant-design-vue/es/form/FormItem'
  import JUploadOne from '@/components/jeecg/JUploadOne'
  import  photoView from './photoView.vue'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import Jtxgqk from './jtxgqk.vue'
  import Fcqkxx from './Fcqkxx.vue'
  import Zcfzqk from './Zcfzqk.vue'
  import Fzqk from './Fzqk.vue'
  import Jyqk from './Jyqk.vue'
  import JMultiSelectTag from '../../../../components/dict/JMultiSelectTag'
  import JSelectYgxx from '@/components/jeecgbiz/JSelectYgxx'





  export default {
    name: "NhjbxxModal",
    components: { AFormItem ,JUploadOne,photoView,Jtxgqk,Fcqkxx,Zcfzqk,Fzqk,Jyqk,JMultiSelectTag,JSelectYgxx},
    mixins:[JeecgListMixin],
    data () {
      return {
        title:"操作",
        visible: false,
        model: {sskhjl:" "},
        zkhjlacct:'',
        jtcy :[],
        jtxgqklist:[],
        nhcjxxb:{},
        ywhxgywxxmodel:{},
        zpdfmodel:{},
        zcfzqk :[],
        zcqk:[],
        jyqk:[],
        labelCol: {
          xs: {span: 24},
          sm: {span: 8},
        },
        wrapperCol: {
          xs: {span: 24},
          sm: {span: 16},
        },
        disableSubmit: false,
        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
        zjhm:{rules: [{ required: true, message: '请输入证件号码!' }]},
        qydm:{rules: [{ required: true, message: '请输入区域代码!' }]},
        },
        url: {
          add: "/nh/nhjbxx/add",
          edit: "/nh/nhjbxx/edit",
          list: "/nh/nhjbxx/list",

        },
      }
    },
    created () {
    },
    methods: {
      add () {
        this.zkhjlacct="";
        this.edit({});
         this.$refs.jtcyList.add();
        this.$refs.fcxxList.dataSource_fcqkxx=[];
        this.$refs.zcfzqklist.dataSource_zcqkxx =[];
        this.$refs.fzqktable.dataSource_fzqkxx =[];
        this.$refs.jyqktable.dataSource_jyqkxx = [];

      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'xtpdsm','xgr','sfxdry','sfpkh','sfdb','sfktxyk','sfktfmk','sfgzry','sfffjz','hbjl','infoRate','sfktsmf','sflqsbk','sfktsbk','yssxz','yxzc','xtpdjg','jgdm','sszh','ssyxdy','hhbm','yhzgx','sfhz','khmc','zjhm','khlx','lxfs','dz','xb','nl','mz','hyzk','bz','lrbz','lrr'))
		  //时间格式化
         /* this.form.setFieldsValue({lrsj:this.model.lrsj?moment(this.model.lrsj):null})
          this.form.setFieldsValue({zjqfrq:this.model.zjqfrq?moment(this.model.zjqfrq):null})
          this.form.setFieldsValue({zjdqrq:this.model.zjdqrq?moment(this.model.zjdqrq):null})
          this.form.setFieldsValue({fxsj:this.model.fxsj?moment(this.model.fxsj):null})*/
        });


        // 农户采集信息
        if (this.model.zjhm) {
          let params = { "zjhm": record.zjhm}
          getAction("/nh/nhjbxx/nhcjxx", params).then(res => {
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
          getAction("/nh/nhjbxx/queryJtcy", { hhbm: record.hhbm, sszh:record.sszh}).then((res) => {
            if (res.success) {
              this.jtcy = res.result;
              this.$refs.jtcyList.dataSource_jtcy = this.jtcy;
              console.log("---家庭相关情况-----")
              console.log('dataSource_jtcy', res)
            }
          });
        }


        // 加载与我行相关业务信息子表数据
        if (this.model.zjhm) {
          let params = { "zjhm": record.zjhm,"hmcId":record.id}
          console.log("zjhm"+params)
          getAction("/nh/nhjbxx/queryYwhxgywxx", params,this.form).then(res => {
            this.ywhxgywxxmodel = Object.assign({}, res.result);
            console.log("---与我行相关业务信息-----")
            console.log(this.ywhxgywxxmodel)
            this.$nextTick(() => {
              let fields = pick(this.ywhxgywxxmodel, 'sfdfgz','sfktpos','sfktjhzf','sfblezf','sfblejf','sfblznzd','sfbllcyw','sfbldlbx','sfgzgzh','sfktxyk','sfktfmk','sfktsmf','khmc','hmcId','zjhm','sfktckyw','ckye','ckrpye','cknrpye','hqckye','dqckye','hqckrpye','dqckrpye','hqcknrpye','dqcknrpye','sfktdkyw','dkje','dkye','bldkye','bwbldkye','sfktsjyhyw','sfktwsyhyw','sfbletcyw','sfktsbk')
              this.form.setFieldsValue(fields)
            })
          });
        }



        // 加载房产情况子表数据
        if(record.zjhm) {
          let params = {zjhm: record.zjhm}
          getAction("/nh/nhjbxx/queryCams_Zcsx_NhfxxxByMainId", params).then((res) => {
            if(res.success) {
              this.$refs.fcxxList.dataSource_fcqkxx = res.result;
              console.log("---房产情况-----")
              console.info(res.result)
            }
          });
        }

        // 加载资产情况子表数据
        if(record.zjhm) {
          let params = {zjhm: record.zjhm}
          getAction('/nh/nhjbxx/queryCams_Zcsx_NhzcxxByMainId', params).then((res) => {
            console.info(res)
            if(res.success) {
             this.$refs.zcfzqklist.dataSource_zcqkxx = res.result;
            }
            console.log("---资产情况-----")
            console.log(res.result)
          });
        }


        // 加载负债情况子表数据
        if(record.zjhm) {
          let params = {zjhm: record.zjhm}
          getAction('/nh/nhjbxx/queryCams_Zcsx_NhfzqkByMainId', params).then((res) => {
            console.info(res)
            if(res.success) {
              this.$refs.fzqktable.dataSource_fzqkxx = res.result ||[] ;
            }
            console.log("---负债情况-----")
            console.log(res.result)
          });
        }

        // 加载经营情况子表数据
        if(record.zjhm) {
          let params = {zjhm: record.zjhm}
          getAction('/nh/nhjbxx/queryCams_Zcsx_NhjyqkByMainId', params).then((res) => {
            console.info(res)
            if(res.success) {
              this.$refs.jyqktable.dataSource_jyqkxx = res.result;
            }
            console.log("---经营情况-----")
            console.log(res.result)
          });
        }


        // 加载总评打分子表数据
        if (this.model.zjhm) {
          let params = { "zjhm": record.zjhm}
          console.log("zjhm"+params)
          getAction('/nh/nhjbxx/queryCams_Zcsx_NhpjxxByMainId', params,this.form).then(res => {
            console.log(res.result)
            this.zpdfmodel = Object.assign({}, res.result);
            console.log("---总评打分-----")
            console.log(this.zpdfmodel.zjhm)
            this.$nextTick(() => {
              let fields = pick(this.zpdfmodel, 'ndlrs', 'nhjzc', 'nhcsr', 'nhshpj', 'jyxmcysj', 'ybhlwsj', 'zhjzsl', 'nhzxzk','zpdfxj')
              this.form.setFieldsValue(fields)
            })
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
            if(!this.model.zjhm){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let zbtable = Object.assign(this.model, values);

            //获取家庭相关情况子表数据
            console.log("------家庭相关情况---------")
            /*this.$refs.jtcyList.edit();
            console.log(this.$refs.jtcyList.jtxgqk)*/
            let jtxgqk = []
            jtxgqk.push(zbtable)
            console.log(jtxgqk)

            //获取房产情况子表数据
            console.log("------房产情况表数据---------")
            this.$refs.fcxxList.edit();
            console.log(this.$refs.fcxxList.fcqkxx)


            //获取资产负债情况子表数据
            console.log("------资产负债情况---------")
            this.$refs.zcfzqklist.edit();
            console.log(this.$refs.zcfzqklist.zcfzqk)
            this.zcfzqk = this.$refs.zcfzqklist.zcfzqk

            //获取负债情况子表数据
            console.log("------负债情况---------")
            this.$refs.fzqktable.edit();
            console.log(this.$refs.fzqktable.fzqkxx)
            this.zcqk = this.$refs.fzqktable.fzqkxx


            //获取经营情况子表数据
            console.log("------经营情况---------")
            this.$refs.jyqktable.edit();
            console.log(this.$refs.jyqktable.jyqkxx)
            this.jyqk = this.$refs.jyqktable.jyqkxx


            //遍历资产负债情况表数组把数组内的数据汇总成一条
            var zcqk={};
            var hz ={};
            for (let i=0; i<this.zcfzqk.length; i++){
              if (this.zcfzqk[i].zclx == "股权") {
                zcqk ={"gq":this.zcfzqk[i].zclx,"gqsl":this.zcfzqk[i].zcsl,"gqjz":this.zcfzqk[i].zcjg
                ,"gqxqsm":this.zcfzqk[i].zcsm};
                hz=Object.assign(hz, zcqk);
              }
              if (this.zcfzqk[i].zclx == "农机具") {
                zcqk ={"njj":this.zcfzqk[i].zclx,"njjsl":this.zcfzqk[i].zcsl,"njjjz":this.zcfzqk[i].zcjg
                  ,"njjqxsm":this.zcfzqk[i].zcsm};
                hz=Object.assign(hz, zcqk);
              }
              if (this.zcfzqk[i].zclx == "家用电器") {
                zcqk ={"jydq":this.zcfzqk[i].zclx,"jydqsl":this.zcfzqk[i].zcsl,"jydqjz":this.zcfzqk[i].zcjg
                  ,"jydqxqsm":this.zcfzqk[i].zcsm};
                hz=Object.assign(hz, zcqk);
              }
              if (this.zcfzqk[i].zclx == "交通工具") {
                zcqk ={"jtgj":this.zcfzqk[i].zclx,"jtgjsl":this.zcfzqk[i].zcsl,"jtgjjz":this.zcfzqk[i].zcjg
                  ,"jtgjxqsm":this.zcfzqk[i].zcsm};
                hz=Object.assign(hz, zcqk);
              }
              if (this.zcfzqk[i].zclx == "其他资产") {
                zcqk ={"qtzc":this.zcfzqk[i].zclx,"qtzcsl":this.zcfzqk[i].zcsl,"qtzcjz":this.zcfzqk[i].zcjg
                  ,"qtzcxqsm":this.zcfzqk[i].zcsm};
                hz=Object.assign(hz, zcqk);
              }
            }


            var fzqk= {};
            for (let i=0;i<this.zcqk.length ;i++){
              if (this.zcqk[i].jkfs=="本系统"){
                fzqk ={"bxtjkzqr":this.zcqk[i].zqr, "bxtjksl":this.zcqk[i].jkje,"bxtjkxqsm":this.zcqk[i].jksm}
                hz = Object.assign(hz,fzqk)
              }
              if (this.zcqk[i].jkfs=="他行"){
                fzqk ={"thjkzqr":this.zcqk[i].zqr, "thjksl":this.zcqk[i].jkje,"thjkxqsm":this.zcqk[i].jksm}
                hz = Object.assign(hz,fzqk)
              }
              if (this.zcqk[i].jkfs=="信用卡"){
                fzqk ={"xykzqr":this.zcqk[i].zqr, "xyksl":this.zcqk[i].jkje,"xykxqsm":this.zcqk[i].jksm}
                hz = Object.assign(hz,fzqk)
              }
              if (this.zcqk[i].jkfs=="其他"){
                fzqk ={"qtfzzqr":this.zcqk[i].zqr, "qtfzsl":this.zcqk[i].jkje,"qtfzxqsm":this.zcqk[i].jksm}
                hz = Object.assign(hz,fzqk)
              }
            }


            var jyqk = {};
            for (let i=0;i<this.jyqk.length ;i++){
              if (this.jyqk[i].xmlx=="种植"){
                jyqk ={"种植":this.jyqk[i].xmlx,"zzxmqk":this.jyqk[i].xmqk, "zzxmjsr":this.jyqk[i].xmjsr}
                hz = Object.assign(hz,jyqk)
              }
              if (this.jyqk[i].xmlx=="养殖"){
                jyqk ={"养殖":this.jyqk[i].xmlx, "yzxmqk":this.jyqk[i].xmqk, "yzxmjsr":this.jyqk[i].xmjsr}
                hz = Object.assign(hz,jyqk)
              }
              if (this.jyqk[i].xmlx=="商业"){
                jyqk ={"商业":this.jyqk[i].xmlx, "syxmqk":this.jyqk[i].xmqk, "syxmjsr":this.jyqk[i].xmjsr}
                hz = Object.assign(hz,jyqk)
              }
              if (this.jyqk[i].xmlx=="劳务"){
                jyqk ={"劳务":this.jyqk[i].xmlx, "nwxmqk":this.jyqk[i].xmqk, "nwxmjsr":this.jyqk[i].xmjsr}
                hz = Object.assign(hz,jyqk)
              }
              if (this.jyqk[i].xmlx=="其他"){
                jyqk ={"其他":this.jyqk[i].xmlx, "qtxmqk":this.jyqk[i].xmqk, "qtxmjsr":this.jyqk[i].xmjsr}
                hz = Object.assign(hz,jyqk)
              }
            }

            hz = Object.assign(hz,zbtable)
            let pjsxqk = []
            pjsxqk.push(hz)
            console.log("------测试结果---------")
            console.log(hz)
            console.log("------测试结果2---------")

            console.log(pjsxqk)

            let nhcjxx = []
            nhcjxx.push(zbtable)

            let ywhywwlxx = []
            ywhywwlxx.push(zbtable)



            //时间格式化
           /* formData.lrsj = formData.lrsj?formData.lrsj.format():null;
            formData.zjqfrq = formData.zjqfrq?formData.zjqfrq.format():null;
            formData.zjdqrq = formData.zjdqrq?formData.zjdqrq.format():null;
            formData.fxsj = formData.fxsj?formData.fxsj.format():null;*/

            let formData = {
              ...zbtable,
              ywhxgywList: jtxgqk,
              nhfcxxList:this.$refs.fcxxList.fcqkxx,
              nhPjsxxxList:pjsxqk,
              fjglList:[],
              nhbkbpyList:[],
              camsZcsxNhcjxxList:nhcjxx,
              ywhxgywList:ywhywwlxx
            }
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

     /* getC(value){
        let that = this;
        that.jtxgqklist=vuels ;
      }*/


      /*requestSubTableData(url, params, tab) {
        tab.loading = true
        getAction(url, params).then(res => {
          tab.dataSource = res.result || []
        }).finally(() => {
          tab.loading = false
        })
      },*/

    }
  }
</script>

<style lang="less" scoped>

</style>