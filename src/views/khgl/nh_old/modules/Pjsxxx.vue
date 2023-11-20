<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <a-form :form="form">

      <a-divider orientation="left" style="color: #1890FF;">房产情况</a-divider>
      <a-card class="card" :bordered="false" style="margin: -20px 0px 0px 0px">
        <fcqkxx ref="fcxxList" />
      </a-card>

      <a-divider orientation="left" style="color: #1890FF; margin-top: -20px;">资产情况</a-divider>
      <a-card class="card" :bordered="false" style="margin: -20px 0px 0px 0px">
        <zcfzqk ref="zcfzqklist" />
      </a-card>

      <a-divider orientation="left" style="color: #1890FF; margin-top: -20px;">负债情况</a-divider>
      <a-card class="card" :bordered="false" style="margin: -20px 0px 0px 0px">
        <fzqk ref="fzqktable" />
      </a-card>

      <a-divider orientation="left" style="color: #1890FF; margin-top: -20px;">经营情况</a-divider>
      <a-card class="card" :bordered="false" style="margin: -20px 0px 0px 0px">
        <jyqk ref= "jyqktable"/>
      </a-card>

      <a-divider orientation="left" style="color: #1890FF;">总评打分</a-divider>
        <a-row class="form-row" :gutter="16">
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="净资产">
            <a-input placeholder="自动运算项" v-model="pjsxmodel.nhjzc"/>
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="纯收入">
            <a-input placeholder="自动运算项" v-model="pjsxmodel.nhcsr"  />
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="劳动力人数">
            <j-dict-select-tag placeholder="请选择劳动力人数"  v-model="pjsxmodel.ndlrs"   dict-code="khgl_ldlrs" />
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="社会评价">
            <j-dict-select-tag placeholder="请选择社会评价"  v-model="pjsxmodel.nhshpj"   dict-code="khgl_shpj" />
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="项目从业时间">
            <j-dict-select-tag placeholder="==请选择=="  v-model="pjsxmodel.jyxmcysj"   dict-code="khgl_jyxmcysj"/>
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="与本行往来时间">
            <j-dict-select-tag placeholder="==请选择==" v-model="pjsxmodel.ybhlwsj"   dict-code="khgl_jyxmcysj"/>
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="综合竞争实力">
            <j-dict-select-tag placeholder="==请选择==" v-model="pjsxmodel.zhjzsl"  dict-code="khgl_zhjzsl" />
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="资信状况">
            <a-input placeholder="自动运算项"  v-model="pjsxmodel.nhzxzk"/>
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="贷记卡逾期情况">
            <j-dict-select-tag placeholder="==请选择=="   v-model="pjsxmodel.djkyqqk"   dict-code="khgl_djkyqqk" />
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="总评得分小计">
            <a-input placeholder="自动运算项"  v-model="pjsxmodel.zpdfxj"  disabled />
          </a-form-item></a-col>
        </a-row>
      <a-divider orientation="left" style="color: #1890FF;">评级授信</a-divider>
      <a-row class="form-row" :gutter="16">

        <a-col :lg="12"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="系统测算等级">
          <a-input placeholder="系统测算等级" v-model="pjsxmodel.xtcspddj" />
        </a-form-item></a-col>
        <a-col :lg="12"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="系统测算额度">
          <a-input placeholder="系统测算额度"   v-model="pjsxmodel.xtcssxed"    />
        </a-form-item></a-col>
        <a-col :lg="12"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="调整后等级">
          <j-dict-select-tag placeholder="==请选择=="   v-model="pjsxmodel.tzhdj"   dict-code="tzhdj" />
        </a-form-item></a-col>
        <a-col :lg="12"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="等级调整事项">
          <a-input placeholder="等级调整事项"   v-model="pjsxmodel.djtzsx" />
        </a-form-item></a-col>
        <a-col :lg="12"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="内部授信额度">
          <a-input placeholder="内部授信额度"   v-model="pjsxmodel.nbcsed" />
        </a-form-item></a-col>
        <a-col :lg="12"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="公开授信额度">
          <a-input placeholder="公开授信额度"   v-model="pjsxmodel.gksxed" />
        </a-form-item></a-col>
        <a-col :lg="12"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="背靠背评议信用等级">
          <j-dict-select-tag placeholder="==请选择=="  v-model="pjsxmodel.czlwpddj"   dict-code="bkbpy_xydj" />
        </a-form-item></a-col>
        <a-col :lg="12"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="背靠背评议额度">
          <a-input placeholder="背靠背评议额度"   v-model="pjsxmodel.czlwsxed" />
        </a-form-item></a-col>
        <a-col :lg="12"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户经理评定等级">
          <j-dict-select-tag placeholder="==请选择=="    v-model="pjsxmodel.khjlpddj"   dict-code="pddj" />
        </a-form-item></a-col>
        <a-col :lg="12"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户经理授信额度">
          <a-input placeholder="背靠背评议额度"   v-model="pjsxmodel.khjlsxed" />
        </a-form-item></a-col>
        <a-col :lg="12"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="最终授信额度">
          <a-input placeholder="最终授信额度"   v-model="pjsxmodel.nhzzsxed" />
        </a-form-item></a-col>
        <a-col :lg="12"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="备注">
          <a-input placeholder="备注"   v-model="pjsxmodel.bz" />
        </a-form-item></a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
  import ARow from "ant-design-vue/es/grid/Row";
  import JSelectUserByDep from '@/components/jeecgbiz/JSelectUserByDep'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JEllipsis from '@/components/jeecg/JEllipsis'
  import pick from 'lodash.pick'
  import Fcqkxx from './Fcqkxx.vue'
  import Zcfzqk from './Zcfzqk.vue'
  import Fzqk from './Fzqk.vue'
  import Jyqk from './Jyqk.vue'
  import { getAction,putAction,httpAction,downFile } from '@/api/manage'


  export default {
    components: {
      ARow,JSelectUserByDep,JEllipsis,Fzqk,Fcqkxx,Zcfzqk,Jyqk
    },
    name: 'Ywxx',
    mixins: [JeecgListMixin],
    data() {
      return {
        // 新增时子表默认添加几行空数据
        addDefaultRowNum: 1,
        validatorRules: {},
        loading: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8},
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        form: this.$form.createForm(this),
        pjsxmodel:{},
        dataSource_fcqkxx:[],
        url: {
          list: "sh/vShxxgl/query",
        }
      }
    },

    methods: {
      edit(record) {
        //请求评级授信信息
        if(record.hhbm) {
          let params = {hhbm: record.hhbm}
          getAction('/nh/nhjbxx/queryPjsxxxByHhbm', params).then((res) => {
            console.info(res)
            if(res.success) {
              this.pjsxmodel = Object.assign({}, res.result);
            }else {
              this.pjsxmodel = {nhjzc: 0, nhcsr: 0};
            }
            this.pjsxmodel.czlwpddj = record.pyxydj
            this.pjsxmodel.czlwsxed = record.pysxed
            console.log("---负债情况-----")
            console.log(res.result)
          });
        }

        // 加载房产情况子表数据
        if(record.hhbm) {
          let params = {hhbm: record.hhbm}
          getAction("/nh/nhjbxx/queryFcxxByHhbm", params).then((res) => {
            if(res.success) {
              this.$refs.fcxxList.dataSource_fcqkxx = res.result;
              console.log("---房产情况-----")
              console.info(res.result)
            }
          });
        }

        // 加载资产情况子表数据
         if(record.hhbm) {
           let params = {hhbm: record.hhbm}
           getAction("/nh/nhjbxx/queryPjsxZcTable", params).then((res) => {
             if(res.success) {
               this.$refs.zcfzqklist.dataSource_zcqkxx = res.result;
               console.log("---资产情况-----")
               console.info(res.result)
             } else {
               this.$refs.zcfzqklist.dataSource_zcqkxx  = [
                 {'zclx': "股权"},
                 {'zclx': "农机具"},
                 {'zclx': "家用电器"},
                 {'zclx': "交通工具"},
                 {'zclx': "种植成品"},
                 {'zclx': "养殖成品"},
                 {'zclx': "其他资产"},
               ];
             }
           });
         }


        //加载负债情况子表数据
        if(record.hhbm) {
          let params = {hhbm: record.hhbm}
          getAction('/nh/nhjbxx/queryPjsxFzTable', params).then((res) => {
            console.info(res)
            if(res.success) {
              this.$refs.fzqktable.dataSource_fzqkxx = res.result;
            }else {
              this.$refs.fzqktable.dataSource_fzqkxx = [
                {'jkfs': "本系统"},
                {'jkfs': "他行"},
                {'jkfs': "信用卡"},
                {'jkfs': "其他"},
              ];
            }
            console.log("---负债情况-----")
            console.log(res.result)
          });
        }


        // 加载经营情况子表数据
        if(record.hhbm) {
          let params = {hhbm: record.hhbm}
          getAction('/nh/nhjbxx/queryPjsxJyqkTable', params).then((res) => {
            console.info(res)
            if(res.success) {
              this.$refs.jyqktable.dataSource_jyqkxx = res.result;
            } else {
              this.$refs.jyqktable.dataSource_jyqkxx  = [
                {'xmlx': "养殖"},
                {'xmlx': "种植"},
                {'xmlx': "商务"},
                {'xmlx': "劳务"},
                {'xmlx': "租金"},
                {'xmlx': "国家补贴"},
                {'xmlx': "其他"},
              ];
            }
            console.log("---经营情况-----")
            console.log(res.result)
          });
        }

      },

    }
  }
</script>

<style lang="less" scoped>
  .ant-form .ant-form-item {
    margin-bottom: 10px;
  }
</style>