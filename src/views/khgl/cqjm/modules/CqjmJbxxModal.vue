<template>
  <a-modal :title="title"
           :width="1400"
           :visible="visible"
           :confirmLoading="confirmLoading"
           :okButtonProps="{ props: {disabled: disableSubmit} }"
           :destroyOnClose="true"
           @ok="handleOk"
           @cancel="handleCancel"
           cancelText="关闭">
    
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-tabs :defaultActiveKey="1">
          <a-tab-pane :key="1" :forceRender="true">
            <span slot="tab"><a-icon type="idcard"/>基本信息</span>
            <a-card class="card" :bordered="true">
              <a-row class="form-row" :gutter="24">
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol" :wrapperCol="layout.wrapperCol" label="档案编号" hasFeedback>
                  <a-input placeholder="档案编号" v-decorator="['dabh', {}]" :disabled="disabled_1"/>
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol" :wrapperCol="layout.wrapperCol" label="是否户主" hasFeedback>
                  <j-dict-select-tag placeholder="是否为户主" v-decorator="['sfhz', {}]" dict-code="sfbz" :trigger-change="true"/>
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol" :wrapperCol="layout.wrapperCol" label="所属支行" hasFeedback>
                  <j-tree-select placeholder="所属支行" v-decorator="['sszh', {}]" dict="HR_BAS_ORGANIZATION, ZZJC, ZZBZ" pidField="sjzzbz"
                                 :tree-default-expand-all="true"/>
                </a-form-item></a-col>
                <a-col :lg="6"><!--<a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属社区" hasFeedback>
                  &lt;!&ndash;<j-dict-select-tag placeholder="请选择所属社区" v-decorator="['sscbm',{}]" dict-code="YXDYGL_CZXXGL, VILLAGE, QYBM"
                                     :show-search="true"  :disabled="disabled_1"/>&ndash;&gt;
                  <j-search-select-tag placeholder="请选择所属社区" v-decorator="['sscbm',{}]" dict-code="V_CZXXGL,VILLAGE,QYBM" :async="true"/>
                </a-form-item>--></a-col>
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol" :wrapperCol="layout.wrapperCol" label="户号编号" hasFeedback>
                  <a-input placeholder="户号编号" v-decorator="['hhbm', {}]" />
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol" :wrapperCol="layout.wrapperCol" label="关系描述" hasFeedback>
                  <j-dict-select-tag placeholder="与户主关系" v-decorator="['yhzgx', {}]" dict-code="yhzgx" :trigger-change="true"/>
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol" :wrapperCol="layout.wrapperCol" label="客户名称" hasFeedback>
                  <a-input placeholder="客户名称" v-decorator="['khmc', {}]"/>
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol" :wrapperCol="layout.wrapperCol" label="证件号码" hasFeedback>
                  <a-input placeholder="证件号码" v-decorator="['zjhm', {}]"/>
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol" :wrapperCol="layout.wrapperCol" label="年龄" hasFeedback>
                  <a-input-number placeholder="客户年龄" v-decorator="['age', {}]" :min="0" style="width: 100%;" />
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol" :wrapperCol="layout.wrapperCol" label="性别" hasFeedback>
                  <j-dict-select-tag placeholder="客户性别" v-decorator="['sex', {}]" dict-code="sex" :trigger-change="true"/>
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol" :wrapperCol="layout.wrapperCol" label="民族" hasFeedback>
                  <a-input placeholder="所属民族" v-decorator="['nation', {}]" />
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol" :wrapperCol="layout.wrapperCol" label="文化程度" hasFeedback>
                  <j-dict-select-tag placeholder="客户文化程度" v-decorator="['whcd', {}]" dict-code="whcd" :trigger-change="true"/>
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol" :wrapperCol="layout.wrapperCol" label="联系方式" hasFeedback>
                  <a-input placeholder="手机号码" v-decorator="['lxfs', {}]" />
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol" :wrapperCol="layout.wrapperCol" label="婚姻状况" hasFeedback>
                  <j-dict-select-tag placeholder="婚姻状况" v-decorator="['hyzk', {}]" dict-code="hyzk" :trigger-change="true"/>
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol" :wrapperCol="layout.wrapperCol" label="户口性质" hasFeedback>
                  <j-dict-select-tag placeholder="户口性质" v-decorator="['hkxz', {}]" dict-code="khgl_hkxz" :trigger-change="true"/>
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol" :wrapperCol="layout.wrapperCol" label="户籍地址" hasFeedback>
                  <a-input placeholder="户籍地址" v-decorator="['hjdz', {}]" />
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol" :wrapperCol="layout.wrapperCol" label="近期住址" hasFeedback>
                  <a-input placeholder="近期住址" v-decorator="['address', {}]" />
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol" :wrapperCol="layout.wrapperCol" label="从事行业" hasFeedback>
                  <a-input placeholder="从事行业" v-decorator="['cshy', {}]" />
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol" :wrapperCol="layout.wrapperCol" label="工作单位" hasFeedback>
                  <a-input placeholder="工作单位" v-decorator="['gzdw', {}]" />
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol" :wrapperCol="layout.wrapperCol" label="单位地址" hasFeedback>
                  <a-input placeholder="单位地址" v-decorator="['dwdz', {}]" />
                </a-form-item></a-col>
              </a-row>
            </a-card>
          </a-tab-pane>
          <a-tab-pane :key="2" :forceRender="true">
            <span slot="tab"><a-icon type="ordered-list"/>家庭成员情况</span>
            <JtcyqkModal ref="JtcyqkList"/>
          </a-tab-pane>
          <a-tab-pane :key="3" :forceRender="true">
            <span slot="tab"><a-icon type="bank"/>业务信息</span>
            <a-card class="card" :bordered="true">
              <a-row class="form-row" :gutter="24">
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol_1" :wrapperCol="layout.wrapperCol_1" label="所属客户经理" hasFeedback>
                  <j-dict-select-tag placeholder="所属客户经理" v-decorator="['sskhjl', {}]"
                                     dict-code="HR_BAS_STAFF,YGXM,YGGH" :trigger-change="true" :show-search="true" />
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol_1" :wrapperCol="layout.wrapperCol_1" label="客户重要程度" hasFeedback>
                  <j-dict-select-tag placeholder="客户重要程度" v-decorator="['khzycd', {}]" dict-code="khzycd" :trigger-change="true"/>
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol_1" :wrapperCol="layout.wrapperCol_1" label="是否外出务工" hasFeedback>
                  <j-dict-select-tag placeholder="是否外出务工" v-decorator="['sfwcwg', {}]" dict-code="sfbz" :trigger-change="true"/>
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol_1" :wrapperCol="layout.wrapperCol_1" label="最早返乡时间" hasFeedback>
                  <a-date-picker placeholder="最早返乡时间" v-decorator="['zzfxsj', {}]" style="width: 100%;" />
                </a-form-item></a-col>
              </a-row>
              <a-row class="form-row" :gutter="24">
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol_1" :wrapperCol="layout.wrapperCol_1" label="是否贫困户" hasFeedback>
                  <j-dict-select-tag placeholder="是否贫困户" v-decorator="['sfpkh', {}]" dict-code="sfbz" :trigger-change="true"/>
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol_1" :wrapperCol="layout.wrapperCol_1" label="是否低保户" hasFeedback>
                  <j-dict-select-tag placeholder="是否低保户" v-decorator="['sfdbh', {}]" dict-code="sfbz" :trigger-change="true"/>
                </a-form-item></a-col>
                <a-col :lg="12"><a-form-item :labelCol="{xs: { span: 24 },sm: { span: 5 }}" :wrapperCol="{xs: { span: 24 },sm: { span: 18 }}"
                                             label="客户潜在业务" hasFeedback>
                  <j-multi-select-tag placeholder="客户潜在业务" v-decorator="['khqzyw', {}]" dict-code="khqzyw"/>
                </a-form-item></a-col>
              </a-row>
              <a-divider style="color: #1890FF; margin-top: 0px;">与我行业务往来信息</a-divider>
              <a-row class="form-row" :gutter="24">
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol_1" :wrapperCol="layout.wrapperCol_1" label="是否开通存款业务" hasFeedback>
                  <j-dict-select-tag placeholder="是否开通" v-model="this.CqjmYwhywwlxx.sfktckyw" dict-code="sfbz" :disabled="disabled"/>
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol_1" :wrapperCol="layout.wrapperCol_1" label="存款日平余额" hasFeedback>
                  <a-input-number placeholder="存款日平余额" v-model="this.CqjmYwhywwlxx.ckrpye" :min="0" style="width: 100%;" :disabled="disabled"/>
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol_1" :wrapperCol="layout.wrapperCol_1" label="存款年日平余额" hasFeedback>
                  <a-input-number placeholder="存款年日平余额" v-model="this.CqjmYwhywwlxx.cknrpye" :min="0" style="width: 100%;" :disabled="disabled"/>
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol_1" :wrapperCol="layout.wrapperCol_1" label="存款余额" hasFeedback>
                  <a-input-number placeholder="存款余额" v-model="this.CqjmYwhywwlxx.ckye" :min="0" style="width: 100%;" :disabled="disabled"/>
                </a-form-item></a-col>

                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol_1" :wrapperCol="layout.wrapperCol_1" label="是否开通贷款业务" hasFeedback>
                  <j-dict-select-tag placeholder="是否开通" v-model="this.CqjmYwhywwlxx.sfktdkyw" dict-code="sfbz" :disabled="disabled"/>
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol_1" :wrapperCol="layout.wrapperCol_1" label="贷款金额" hasFeedback>
                  <a-input-number placeholder="贷款金额" v-model="this.CqjmYwhywwlxx.dkje" :min="0" style="width: 100%;" :disabled="disabled"/>
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol_1" :wrapperCol="layout.wrapperCol_1" label="贷款余额" hasFeedback>
                  <a-input-number placeholder="贷款余额" v-model="this.CqjmYwhywwlxx.dkye" :min="0" style="width: 100%;" :disabled="disabled"/>
                </a-form-item></a-col>
<!--                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol_1" :wrapperCol="layout.wrapperCol_1" label="是否不良贷款户" hasFeedback>-->
<!--                  <j-dict-select-tag placeholder="是否不良贷款户" v-model="this.CqjmYwhywwlxx.sfbldkh" dict-code="sfbz" :disabled="disabled"/>-->
<!--                </a-form-item></a-col>-->
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol_1" :wrapperCol="layout.wrapperCol_1" label="最近贷款到期日期" hasFeedback>
                  <a-date-picker placeholder="最近贷款到期日期" v-model="this.CqjmYwhywwlxx.zjdkdqrq" style="width: 100%;" :disabled="disabled"/>
                </a-form-item></a-col>

                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol_1" :wrapperCol="layout.wrapperCol_1" label="不良贷款余额" hasFeedback>
                  <a-input-number placeholder="不良贷款余额" v-model="this.CqjmYwhywwlxx.bldkye" :min="0" style="width: 100%;" :disabled="disabled"/>
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol_1" :wrapperCol="layout.wrapperCol_1" label="表外不良贷款余额" hasFeedback>
                  <a-input-number placeholder="表外不良贷款余额" v-model="this.CqjmYwhywwlxx.bwbldkye" :min="0" style="width: 100%;" :disabled="disabled"/>
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol_1" :wrapperCol="layout.wrapperCol_1" label="是否开通手机银行" hasFeedback>
                  <j-dict-select-tag placeholder="是否开通" v-model="this.CqjmYwhywwlxx.sfktsjyhyw" dict-code="sfbz" :disabled="disabled"/>
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol_1" :wrapperCol="layout.wrapperCol_1" label="是否开通网上银行" hasFeedback>
                  <j-dict-select-tag placeholder="是否开通" v-model="this.CqjmYwhywwlxx.sfktwsyhyw" dict-code="sfbz" :disabled="disabled"/>
                </a-form-item></a-col>

                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol_1" :wrapperCol="layout.wrapperCol_1" label="是否办理ETC业务" hasFeedback>
                  <j-dict-select-tag placeholder="是否办理ETC业务" v-model="this.CqjmYwhywwlxx.sfbletcyw" dict-code="sfbz" :disabled="disabled"/>
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol_1" :wrapperCol="layout.wrapperCol_1" label="是否开通社保卡" hasFeedback>
                  <j-dict-select-tag placeholder="是否开通社保卡" v-model="this.CqjmYwhywwlxx.sfktsbk" dict-code="sfbz" :disabled="disabled"/>
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol_1" :wrapperCol="layout.wrapperCol_1" label="是否开通POS机" hasFeedback>
                  <j-dict-select-tag placeholder="是否开通" v-model="this.CqjmYwhywwlxx.sfktpos" dict-code="sfbz" :disabled="disabled"/>
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol_1" :wrapperCol="layout.wrapperCol_1" label="是否开通聚合支付" hasFeedback>
                  <j-dict-select-tag placeholder="是否开通" v-model="this.CqjmYwhywwlxx.sfktjhzf" dict-code="sfbz" :disabled="disabled"/>
                </a-form-item></a-col>

                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol_1" :wrapperCol="layout.wrapperCol_1" label="是否办理E支付" hasFeedback>
                  <j-dict-select-tag placeholder="是否办理" v-model="this.CqjmYwhywwlxx.sfblejf" dict-code="sfbz" :disabled="disabled"/>
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol_1" :wrapperCol="layout.wrapperCol_1" label="是否办理助农终端" hasFeedback>
                  <j-dict-select-tag placeholder="是否办理" v-model="this.CqjmYwhywwlxx.sfblznzd" dict-code="sfbz" :disabled="disabled"/>
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol_1" :wrapperCol="layout.wrapperCol_1" label="是否办理理财业务" hasFeedback>
                  <j-dict-select-tag placeholder="是否办理" v-model="this.CqjmYwhywwlxx.sfbllcyw" dict-code="sfbz" :disabled="disabled"/>
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol_1" :wrapperCol="layout.wrapperCol_1" label="是否办理代理保险" hasFeedback>
                  <j-dict-select-tag placeholder="是否办理" v-model="this.CqjmYwhywwlxx.sfbldlbx" dict-code="sfbz" :disabled="disabled"/>
                </a-form-item></a-col>

                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol_1" :wrapperCol="layout.wrapperCol_1" label="是否关注公众号" hasFeedback>
                  <j-dict-select-tag placeholder="是否关注" v-model="this.CqjmYwhywwlxx.sfgzgzh" dict-code="sfbz" :disabled="disabled"/>
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol_1" :wrapperCol="layout.wrapperCol_1" label="是否开通信用卡" hasFeedback>
                  <j-dict-select-tag placeholder="是否开通" v-model="this.CqjmYwhywwlxx.sfktxyk" dict-code="sfbz" :disabled="disabled"/>
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol_1" :wrapperCol="layout.wrapperCol_1" label="是否开通福民卡" hasFeedback>
                  <j-dict-select-tag placeholder="是否开通" v-model="this.CqjmYwhywwlxx.sfktfmk" dict-code="sfbz" :disabled="disabled"/>
                </a-form-item></a-col>
                <a-col :lg="6"><a-form-item :labelCol="layout.labelCol_1" :wrapperCol="layout.wrapperCol_1" label="是否开通扫码付" hasFeedback>
                  <j-dict-select-tag placeholder="是否开通扫码付" v-model="this.CqjmYwhywwlxx.sfktsmf" dict-code="sfbz" :disabled="disabled"/>
                </a-form-item></a-col>

              </a-row>
            </a-card>
          </a-tab-pane>
          <a-tab-pane :key="4" :forceRender="true">
            <span slot="tab"><a-icon type="home"/>房产信息</span>
            <FcxxModal ref="FcxxList"/>
          </a-tab-pane>
          <a-tab-pane :key="5" :forceRender="true">
            <span slot="tab"><a-icon type="pound"/>资产情况</span>
            <ZcqkModal ref="ZcqkList"/>
          </a-tab-pane>
          <a-tab-pane :key="6" :forceRender="true">
            <span slot="tab"><a-icon type="pound"/>负债情况</span>
            <FzqkModal ref="FzqkList"/>
          </a-tab-pane>
          <a-tab-pane :key="7" :forceRender="true">
            <span slot="tab"><a-icon type="pound"/>经营情况</span>
            <JyqkModal ref="JyqkList"/>
          </a-tab-pane>
<!--          <a-tab-pane :key="8" :forceRender="true">-->
<!--            <span slot="tab"><a-icon type="block"/>附件信息</span>-->
<!--            <FjxxModal ref="FjxxList"/>-->
<!--          </a-tab-pane>-->
        </a-tabs>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction, putAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JTreeSelect from '../../../../components/jeecg/JTreeSelect'
  import JEllipsis from '../../../../components/jeecg/JEllipsis'
  import JMultiSelectTag from '../../../../components/dict/JMultiSelectTag'
  import JSearchSelectTag from '../../../../components/dict/JSearchSelectTag'
  import JtcyqkModal from './tab/Tab1_JtcyqkModal'
  import YwxxModal from './tab/Tab2_YwxxModal'
  import FcxxModal from './tab/Tab3_FcxxModal'
  import ZcqkModal from './tab/Tab4_ZcqkModal'
  import FzqkModal from './tab/Tab5_FzqkModal'
  import JyqkModal from './tab/Tab6_JyqkModal'
  //import FjxxModal from './tab/Tab7_FjxxModal'

  export default {
    name: "CqjmJbxxModal",
    components: {
      JSearchSelectTag, JMultiSelectTag, JEllipsis, JTreeSelect,
      JtcyqkModal, YwxxModal, FcxxModal, ZcqkModal, FzqkModal, JyqkModal,
    },
    //FjxxModal
    data () {
      return {
        title: "操作",
        loading: false,
        visible: false,
        disabled: false,
        disabled_1: false,
        disableSubmit: false,
        confirmLoading: false,
        JtcyqkGetList: [],
        FcxxGetList:   [],
        zcqkGetList:   [],
        fzqkGetList:   [],
        jyqkGetList:   [],
        //fjxxGetList:   [],
        model: {},
        layout: {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 5 },
          },
          labelCol_1: {
            xs: { span: 24 },
            sm: { span: 10 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
          },
          wrapperCol_1: {
            xs: { span: 24 },
            sm: { span: 12 },
          },
        },
        ipagination: {
          current: 1,
          pageSize: 10,
          pageSizeOptions: ['10', '20', '30'],
          // showTotal: (total, range) => {
          //   return range[0] + "-" + range[1] + " 共" + total + "条"
          // },
          showQuickJumper: true,
          showSizeChanger: true,
          total: 0
        },
        form: this.$form.createForm(this),
        CqjmYwhywwlxx: {},
        validatorRules:{
          //dabh:{rules: [{ required: true, message: '请输入档案编号!' }]},
        },
        url: {
          add  : "/khgl.cqjm/cqjmJbxx/add",
          edit : "/khgl.cqjm/cqjmJbxx/edit",
          ywhxgywList: "/khgl.cqjm/cqjmJbxx/queryYwhxgyw",
        },
      }
    },
    created () {},
    methods: {
      add () {
        this.edit({});
        this.$refs.JtcyqkList.add();
        this.CqjmYwhywwlxx = [];
        this.$refs.FcxxList.add();
        this.$refs.ZcqkList.add();
        this.$refs.FzqkList.add();
        this.$refs.JyqkList.add();
        //this.$refs.FjxxList.add();
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,
            'sszh','ssyxdy','sscbm','sscmc','sskhjl','dabh','hhbm','sfhz','yhzgx','khmc','zjhm','age','sex','nation','whcd',
            'hyzk','lxfs','hkxz','hjdz','address','sfpkh','sfdbh','cshy','gzdw','dwdz','sfwcwg','khzycd','khqzyw','bz'
          ))
		      // 时间格式化
          this.form.setFieldsValue({zzfxsj: this.model.zzfxsj ? moment(this.model.zzfxsj) : null})
          // 加载其它字段数据
          if (record.zjhm) {
            // 查询城区居民客户家庭成员情况
            putAction(this.$refs.JtcyqkList.url.list, {hhbm: record.hhbm, sszh: record.sszh}).then((res) => {
              if (res.success) {
                this.$refs.JtcyqkList.dataSource = res.result;
              }
            });
            putAction(this.url.ywhxgywList, { zjhm: record.zjhm }).then((res) => {
              if (res.success) {
                this.CqjmYwhywwlxx = res.result;
                // 最近贷款到期日期格式化
                this.CqjmYwhywwlxx.zjdkdqrq = this.CqjmYwhywwlxx.zjdkdqrq ? moment(this.CqjmYwhywwlxx.zjdkdqrq) : null;
              }
            })
            // 查询城区居民客户房产信息
            putAction(this.$refs.FcxxList.url.list, { zjhm: record.zjhm }).then((res) => {
              if (res.success) {
                this.$refs.FcxxList.dataSource = res.result;
              }
            })
            // 资产情况
            putAction(this.$refs.ZcqkList.url.list, { zjhm: record.zjhm }).then((res) => {
              if (res.success) {
                this.$refs.ZcqkList.dataSource = res.result;
              }
            })
            // 负债情况
            putAction(this.$refs.FzqkList.url.list, { zjhm: record.zjhm }).then((res) => {
              if (res.success) {
                this.$refs.FzqkList.dataSource = res.result;
              }
            })
            // 经营情况
            putAction(this.$refs.JyqkList.url.list, { zjhm: record.zjhm }).then((res) => {
              if (res.success) {
                this.dataSourceForJyqk = res.result;
              }
            })
            // 城区居民附件信息
            // putAction(this.$refs.FjxxList.url.list, { zjhm: record.zjhm }).then((res) => {
            //   if (res.success) {
            //     this.$refs.FjxxList.dataSource = res.result;
            //   }
            // })
          }
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
            if (!(this.model.id && this.model.dabh)) {
              httpurl+=this.url.add;
              method = 'post';
            } else {
              httpurl+=this.url.edit;
              method = 'put';
            }

            let tabTable = Object.assign(this.model, values);
            console.log(tabTable);
            //获取家庭成员情况数据
            console.log(">>>>>>>>>>>>家庭成员情况<<<<<<<<<<<<");
            this.JtcyqkGetList.push(tabTable);
            //获取房产信息数据
            console.log(">>>>>>>>>>>>房产信息数据<<<<<<<<<<<<");
            this.$refs.FcxxList.edit();
            console.log(this.$refs.FcxxList.FcxxResultList);
            this.FcxxGetList = this.$refs.FcxxList.FcxxResultList;
            //获取资产情况数据
            console.log(">>>>>>>>>>>>资产情况数据<<<<<<<<<<<<");
            this.$refs.ZcqkList.edit();
            console.log(this.$refs.ZcqkList.ZcqkResultList);
            this.zcqkGetList = this.$refs.ZcqkList.ZcqkResultList
            //获取负债情况数据
            console.log(">>>>>>>>>>>>负债情况数据<<<<<<<<<<<<");
            this.$refs.FzqkList.edit();
            console.log(this.$refs.FzqkList.FzqkResultList);
            this.fzqkGetList = this.$refs.FzqkList.FzqkResultList;
            //获取经营情况数据
            console.log(">>>>>>>>>>>>经营情况数据<<<<<<<<<<<<");
            this.$refs.JyqkList.edit();
            console.log(this.$refs.JyqkList.JyqkResultList);
            this.jyqkGetList = this.$refs.JyqkList.JyqkResultList;

            //资产负债情况数据汇总
            var AllInGroup  = {};
            // 资产情况
            var zcqkGroup = {};
            for (let i=0; i<this.zcqkGetList.length; i++) {
              if (this.zcqkGetList[i].zclx=='股权') {
                zcqkGroup = {
                  'gq'  : this.zcqkGetList[i].zclx,
                  'gqsl': this.zcqkGetList[i].zcsl, 'gqjz': this.zcqkGetList[i].zcjz, 'gqxqsm': this.zcqkGetList[i].zcxqsm
                };
                AllInGroup  = Object.assign(AllInGroup, zcqkGroup);
              }
              if (this.zcqkGetList[i].zclx=='农机具') {
                zcqkGroup = {
                  'njj': this.zcqkGetList[i].zclx,
                  'njjsl': this.zcqkGetList[i].zcsl, 'njjjz': this.zcqkGetList[i].zcjz, 'njjxqsm': this.zcqkGetList[i].zcxqsm
                };
                AllInGroup  = Object.assign(AllInGroup, zcqkGroup);
              }
              if (this.zcqkGetList[i].zclx=='家用电器') {
                zcqkGroup = {
                  'jydq': this.zcqkGetList[i].zclx,
                  'jydqsl': this.zcqkGetList[i].zcsl, 'jydqjz': this.zcqkGetList[i].zcjz, 'jydqxqsm': this.zcqkGetList[i].zcxqsm
                };
                AllInGroup  = Object.assign(AllInGroup, zcqkGroup);
              }
              if (this.zcqkGetList[i].zclx=='交通工具') {
                zcqkGroup = {
                  'jtgj': this.zcqkGetList[i].zclx,
                  'jtgjsl': this.zcqkGetList[i].zcsl, 'jtgjjz': this.zcqkGetList[i].zcjz, 'jtgjxqsm': this.zcqkGetList[i].zcxqsm
                };
                AllInGroup  = Object.assign(AllInGroup, zcqkGroup);
              }
              if (this.zcqkGetList[i].zclx=='其它资产') {
                zcqkGroup = {
                  'qtzc': this.zcqkGetList[i].zclx,
                  'qtzcsl': this.zcqkGetList[i].zcsl, 'qtzcjz': this.zcqkGetList[i].zcjz, 'qtzcxqsm': this.zcqkGetList[i].zcxqsm
                };
                AllInGroup  = Object.assign(AllInGroup, zcqkGroup);
              }
            }
            // 负债情况
            var fzqkGroup = {};
            for (let i=0; i<this.fzqkGetList.length; i++) {
              if (this.fzqkGetList.jkfs=='本系统') {
                fzqkGroup = {
                  'bxtjkzqr': this.fzqkGetList[i].zqr, 'bxtjksl': this.fzqkGetList[i].fzje, 'bxtjkxqsm': this.fzqkGetList[i].fzsm
                };
                AllInGroup  = Object.assign(AllInGroup, fzqkGroup);
              }
              if (this.fzqkGetList.jkfs=='他行') {
                fzqkGroup = {
                  'thjkzqr': this.fzqkGetList[i].zqr, 'thjksl': this.fzqkGetList[i].fzje, 'thjkxqsm': this.fzqkGetList[i].fzsm
                };
                AllInGroup  = Object.assign(AllInGroup, fzqkGroup);
              }
              if (this.fzqkGetList.jkfs=='信用卡') {
                fzqkGroup = {
                  'xykjkzqr': this.fzqkGetList[i].zqr, 'xykjksl': this.fzqkGetList[i].fzje, 'xykjkxqsm': this.fzqkGetList[i].fzsm
                };
                AllInGroup  = Object.assign(AllInGroup, fzqkGroup);
              }
              if (this.fzqkGetList.jkfs=='其它') {
                fzqkGroup = {
                  'qtfzzqr': this.fzqkGetList[i].zqr, 'qtfzsl': this.fzqkGetList[i].fzje, 'qtfzxqsm': this.fzqkGetList[i].fzsm
                };
                AllInGroup  = Object.assign(AllInGroup, fzqkGroup);
              }
            }
            // 经营情况
            var jyqkGroup = {};
            for (let i=0; i<this.jyqkGetList.length; i++) {
              if (this.jyqkGetList.xmlx=='种植') {
                jyqkGroup = {
                  '种植': this.jyqkGetList[i].xmlx,
                  'zzxmqk': this.jyqkGetList[i].xmqk, 'zzxmzc': this.jyqkGetList[i].xmnzc,
                  'zzxmsr': this.jyqkGetList[i].xmnsr, 'zzxmjsr': this.jyqkGetList[i].xmjlr
                };
                AllInGroup= Object.assign(AllInGroup, jyqkGroup);
              }
              if (this.jyqkGetList.xmlx=='养殖') {
                jyqkGroup = {
                  '养殖': this.jyqkGetList[i].xmlx,
                  'yzxmqk': this.jyqkGetList[i].xmqk, 'yzxmzc': this.jyqkGetList[i].xmnzc,
                  'yzxmsr': this.jyqkGetList[i].xmnsr, 'yzxmjsr': this.jyqkGetList[i].xmjlr
                };
                AllInGroup= Object.assign(AllInGroup, jyqkGroup);
              }
              if (this.jyqkGetList.xmlx=='商业') {
                jyqkGroup = {
                  '商业': this.jyqkGetList[i].xmlx,
                  'syxmqk': this.jyqkGetList[i].xmqk, 'syxmzc': this.jyqkGetList[i].xmnzc,
                  'syxmsr': this.jyqkGetList[i].xmnsr, 'syxmjsr': this.jyqkGetList[i].xmjlr
                };
                AllInGroup= Object.assign(AllInGroup, jyqkGroup);
              }
              if (this.jyqkGetList.xmlx=='劳务') {
                jyqkGroup = {
                  '劳务': this.jyqkGetList[i].xmlx,
                  'nwxmqk': this.jyqkGetList[i].xmqk, 'nwxmzc': this.jyqkGetList[i].xmnzc,
                  'nwxmsr': this.jyqkGetList[i].xmnsr, 'nwxmjsr': this.jyqkGetList[i].xmjlr
                };
                AllInGroup= Object.assign(AllInGroup, jyqkGroup);
              }
              if (this.jyqkGetList.xmlx=='其他') {
                jyqkGroup = {
                  '其他': this.jyqkGetList[i].xmlx,
                  'qtxmqk': this.jyqkGetList[i].xmqk, 'qtxmzc': this.jyqkGetList[i].xmnzc,
                  'qtxmsr': this.jyqkGetList[i].xmnsr, 'qtxmjsr': this.jyqkGetList[i].xmjlr
                };
                AllInGroup= Object.assign(AllInGroup, jyqkGroup);
              }
            }

            AllInGroup = Object.assign(AllInGroup, tabTable);
            console.log(">>>>>>>>>>>>AllInGroup<<<<<<<<<<<<");
            console.log(AllInGroup);
            console.log(">>>>>>>>>>>>zcfzqkGetList<<<<<<<<<<<<");
            let zcfzqkGetList = [];
            zcfzqkGetList.push(AllInGroup);
            console.log(zcfzqkGetList);
            console.log(">>>>>>>>>>>>ywhxgywGetList<<<<<<<<<<<<");
            let ywhxgywGetList = [];
            ywhxgywGetList.push(tabTable);

            let formData = {
              ...tabTable,
              cqjmZcxxList      : this.FcxxGetList,
              cqjmYwhywwlxxList : this.ywhxgywGetList,
              cqjmZcfzqkList    : this.zcfzqkGetList,
              cqjmFjxxList      : []
            };
            console.log(">>>>>>>>>>>>formData<<<<<<<<<<<<");
            //let formData = Object.assign(this.model, values);
            // 时间格式化
            //formData.zzfxsj = formData.zzfxsj?formData.zzfxsj.format():null;
            console.log(formData)
            httpAction(httpurl,formData,method).then((res)=>{
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
    }
  }
</script>

<style lang="less" scoped>
  .ant-form .ant-form-item {
    margin-bottom: 10px;
  }
</style>