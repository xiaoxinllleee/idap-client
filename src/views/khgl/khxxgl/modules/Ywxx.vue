<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <a-form :form="form">
        <a-divider orientation="left" style="color: #1890FF;">与我行相关业务信息</a-divider>
        <a-row class="form-row" :gutter="10">
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="存款余额">
            <a-input placeholder="请输入存款余额" v-model="this.ywhxgywxxmodel.ckye" readonly="true" />
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="存款日平余额">
            <a-input placeholder="请输入存款日平余额" v-model="this.ywhxgywxxmodel.ckrpye"  readonly="true" />
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="存款年日平余额">
            <a-input placeholder="请输入存款年日平余额" v-model="this.ywhxgywxxmodel.cknrpye"  readonly="true" />
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否开通存款业务">
            <j-dict-select-tag v-model="this.ywhxgywxxmodel.sfktckyw"  readonly="true" :triggerChange="true" dictCode="sfbz"/>
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否开通贷款业务">
            <j-dict-select-tag v-model="this.ywhxgywxxmodel.sfktdkyw"  readonly="true" :triggerChange="true" dictCode="sfbz"/>
          </a-form-item></a-col>
          <!--<a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否不良贷款户">
            <j-dict-select-tag  v-decorator="['sfbldkh', {} ]" disabled :triggerChange="true" dictCode="sfbz"/>
          </a-form-item></a-col>-->
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="贷款余额">
            <a-input placeholder="请输入贷款余额" v-model="this.ywhxgywxxmodel.dkye"  readonly="true"/>
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="不良贷款余额">
            <a-input placeholder="请输入不良贷款余额" v-model="this.ywhxgywxxmodel.bldkye"  readonly="true" />
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="表外不良贷款余额">
            <a-input placeholder="请输入表外不良贷款余额"  readonly="true" v-model="this.ywhxgywxxmodel.bwbldkye" />
          </a-form-item></a-col>

          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否开通手机银行业务">
            <j-dict-select-tag v-model="this.ywhxgywxxmodel.sfktsjyhyw" :triggerChange="true" dictCode="sfbz"/>
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否开通网上银行业务">
            <j-dict-select-tag v-model="this.ywhxgywxxmodel.sfktwsyhyw" :triggerChange="true" dictCode="sfbz"/>
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否办理etc业务">
            <j-dict-select-tag v-model="this.ywhxgywxxmodel.sfbletcyw" :triggerChange="true" dictCode="sfbz"/>
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否开通社保卡">
            <j-dict-select-tag v-model="this.ywhxgywxxmodel.sfktsbk" :triggerChange="true" dictCode="sfbz"/>
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否开通POS机">
            <j-dict-select-tag v-model="this.ywhxgywxxmodel.sfktpos" :triggerChange="true" dictCode="sfbz"/>
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否开通聚合支付">
            <j-dict-select-tag v-model="this.ywhxgywxxmodel.sfktjhzf" :triggerChange="true" dictCode="sfbz"/>
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否办理E支付">
            <j-dict-select-tag v-model="this.ywhxgywxxmodel.sfblezf" :triggerChange="true" dictCode="sfbz"/>
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否办理E缴费">
            <j-dict-select-tag v-model="this.ywhxgywxxmodel.sfblejf" :triggerChange="true" dictCode="sfbz"/>
          </a-form-item></a-col>

          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否办理助农终端">
            <j-dict-select-tag v-model="this.ywhxgywxxmodel.sfblznzd" :triggerChange="true" dictCode="sfbz"/>
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否办理理财业务">
            <j-dict-select-tag v-model="this.ywhxgywxxmodel.sfbllcyw" :triggerChange="true" dictCode="sfbz"/>
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否办理代理保险业务">
            <j-dict-select-tag v-model="this.ywhxgywxxmodel.sfbldlbx" :triggerChange="true" dictCode="sfbz"/>
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否关注我行公众号">
            <j-dict-select-tag v-model="this.ywhxgywxxmodel.sfgzgzh" :triggerChange="true" dictCode="sfbz"/>
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否开通信用卡">
            <j-dict-select-tag v-model="this.ywhxgywxxmodel.sfktxyk" :triggerChange="true" dictCode="sfbz"/>
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否开通福民卡">
            <j-dict-select-tag v-model="this.ywhxgywxxmodel.sfktfmk" :triggerChange="true" dictCode="sfbz"/>
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否开扫码付">
            <j-dict-select-tag v-model="this.ywhxgywxxmodel.sfktsmf" :triggerChange="true" dictCode="sfbz"/>
          </a-form-item></a-col>
        </a-row>




      <a-divider orientation="left" style="color: #1890FF;">存款信息</a-divider>
      <a-card class="card" :bordered="false">
        <a-table bordered
             size="middle"
             :dataSource="this.ckxxdataSource"
             :columns="ckxxTable.columns"
              rowKey="id"
             :loading="loading"
             :pagination="ipagination"
        />
      </a-card>
      <a-divider orientation="left" style="color: #1890FF;">贷款信息</a-divider>
      <a-card class="card" :bordered="false">
        <a-table size="middle"
              rowKey="id" bordered
             :dataSource="this.dkxxdataSource"
             :columns="dkxxTable.columns"
             :loading="loading"

        />
      </a-card>

      <a-divider orientation="left" style="color: #1890FF;">贷款数据明细</a-divider>
      <a-card class="card" :bordered="false">
        <a-table size="middle"
                 bordered
                 :pagination="false"
                 rowKey="zclx"
                 :dataSource="this.dksjmxdataSource"
                 :columns="dksjmxTable.columns"
        />
      </a-card>
      <a-divider orientation="left" style="color: #1890FF;">手机银行信息</a-divider>
      <a-card class="card" :bordered="false">
        <a-table size="middle"
                 bordered
                 :pagination="false"
                 rowKey="zclx"
                 :dataSource="this.sjyhdataSource"
                 :columns="sjyhTable.columns"

        />
      </a-card>
      <a-divider orientation="left" style="color: #1890FF;">ETC信息</a-divider>
      <a-card class="card" :bordered="false">
        <a-table size="middle"
                 bordered
                 :pagination="false"
                 rowKey="zclx"
                 :dataSource="this.etcdataSource"
                 :columns="etcTable.columns"
        />
      </a-card>

    </a-form>
  </div>
</template>

<script>
  import ARow from "ant-design-vue/es/grid/Row";
  import JSelectUserByDep from '@/components/jeecgbiz/JSelectUserByDep'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JEllipsis from '@/components/jeecg/JEllipsis'
  import pick from 'lodash.pick'


  export default {
    components: {
      ARow,JSelectUserByDep,JEllipsis
    },
    name: 'Ywxx',
    mixins: [JeecgListMixin],
    data() {
      return {
        // 新增时子表默认添加几行空数据
        validatorRules: {},
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
        ywhxgywxxmodel:{},

        ckxxdataSource:[],
        dkxxdataSource:[],
        dksjmxdataSource:[],
        sjyhdataSource:[],
        etcdataSource:[],
        pjsxxxFormData:{},
        loading: false,
        // 存款信息
        ckxxTable : {
          columns: [
            {
              title:'存款累计(单位:元) ',
              children:[
                {
                  title: '余额',
                  align:"center",
                  dataIndex: 'ckye',
                },
                {
                  title: '月日平',
                  align:"center",
                  dataIndex: 'ckrpye',
                },
                {
                  title: '年日平',
                  align:"center",
                  dataIndex: 'cknrpye',
                },
              ]
            },
            {
              title:'活期存款(单位:元) ',
              children:[
                {
                  title: '余额',
                  align:"center",
                  dataIndex: 'hqckye',
                },
                {
                  title: '月日平',
                  align:"center",
                  dataIndex: 'hqckrpye',
                },
                {
                  title: '年日平',
                  align:"center",
                  dataIndex: 'hqcknrpye',
                },
              ]
            },
            {
              title:'定期存款(单位:元) ',
              children:[
                {
                  title: '余额',
                  align:"center",
                  dataIndex: 'dqckye',
                },
                {
                  title: '月日平',
                  align:"center",
                  dataIndex: 'dqckrpye',
                },
                {
                  title: '年日平',
                  align:"center",
                  dataIndex: 'dqcknrpye',
                },
              ]
            },
          ],
        },
        // 贷款信息
        dkxxTable : {
          columns: [
            {
              title: '贷款金额',
              dataIndex: 'dkje',
              key: 'dkje',
              width: '10%',
              align: "center",
              scopedSlots: {customRender: 'dkje'}
            },
            {
              title: '贷款余额',
              dataIndex: 'dkye',
              key: 'dkye',
              width: '10%',
              align: "center",
              scopedSlots: {customRender: 'dkye'}
            },
            {
              title: '最近贷款到期日',
              dataIndex: 'zjdkdqrq',
              key: 'zjdkdqrq',
              width: '10%',
              align: "center",
              scopedSlots: {customRender: 'zjdkdqrq'}
            },
            {
              title: '不良贷款余额',
              dataIndex: 'bldkye',
              key: 'bldkye',
              width: '10%',
              align: "center",
              scopedSlots: {customRender: 'bldkye'}
            },
            {
              title: '表外不良贷款余额',
              dataIndex: 'bwbldkye',
              key: 'bwbldkye',
              width: '10%',
              align: "center",
              scopedSlots: {customRender: 'bwbldkye'}
            },
          ],
        },
        // 贷款数据明细
        dksjmxTable : {
          columns: [
            {
              title: '贷款账号',
              dataIndex: 'dkzh',
              key: 'dkzh',
              align: "center",
              scopedSlots: {customRender: 'dkzh'}
            },
            {
              title: '便民卡卡号',
              dataIndex: 'bmkkh',
              key: 'bmkkh',
              align: "center",
              scopedSlots: {customRender: 'bmkkh'}
            },
            {
              title: '贷款金额',
              dataIndex: 'dkje',
              key: 'dkje',
              align: "center",
              scopedSlots: {customRender: 'dkje'}
            },
            {
              title: '贷款余额',
              dataIndex: 'dkye',
              key: 'dkye',
              align: "center",
              scopedSlots: {customRender: 'dkye'}
            },
            {
              title: '贷款形态',
              dataIndex: 'dkxt',
              key: 'dkxt',
              align: "center",
              scopedSlots: {customRender: 'dkxt'}
            },
            {
              title: '贷款利率',
              dataIndex: 'dkll',
              key: 'dkll',
              align: "center",
              scopedSlots: {customRender: 'dkll'}
            },
          ],
        },
        // 手机银行信息
        sjyhTable : {
          columns: [
            {
              title: '开户机构',
              dataIndex: 'openJgdm',
              key: 'openJgdm',
              align: "center",
              scopedSlots: {customRender: 'openJgdm'}
            },
            {
              title: '开户日期',
              dataIndex: 'openDate',
              key: 'openDate',
              align: "center",
              scopedSlots: {customRender: 'openDate'}
            },
            {
              title: '开户类型',
              dataIndex: 'openType ',
              key: 'openType',
              align: "center",
              scopedSlots: {customRender: 'openType'}
            },
            {
              title: '销户机构名称',
              dataIndex: 'cancelJgmc',
              key: 'cancelJgmc',
              align: "center",
              scopedSlots: {customRender: 'cancelJgmc'}
            },
            {
              title: '状态',
              dataIndex: 'status',
              key: 'status',
              align: "center",
              scopedSlots: {customRender: 'status'}
            },
            {
              title: '本月交易金额',
              dataIndex: 'jyjeBy',
              key: 'jyjeBy',
              align: "center",
              scopedSlots: {customRender: 'jyjeBy'}
            },
          ],
        },
        //ETC信息
        etcTable : {
          columns: [
            {
              title: '绑定日期',
              dataIndex: 'workDate',
              key: 'workDate',
              align: "center",
              scopedSlots: {customRender: 'workDate'}
            },
            {
              title: '开户机构',
              dataIndex: 'operJgdm',
              key: 'operJgdm',
              align: "center",
              scopedSlots: {customRender: 'operJgdm'}
            },
            {
              title: '车牌号码',
              dataIndex: 'cphm',
              key: 'cphm',
              align: "center",
              scopedSlots: {customRender: 'cphm'}
            },
            {
              title: '账户类型',
              dataIndex: 'zhlx',
              key: 'zhlx',
              align: "center",
              scopedSlots: {customRender: 'zhlx'}
            },
            {
              title: '状态',
              dataIndex: 'status',
              key: 'status',
              align: "center",
              scopedSlots: {customRender: 'status'}
            },
          ],
        },

        url: {
          list: "sh/vShxxgl/query",
        }
      }
    },

    methods: {
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'sszh','ssyxdy','hhbm','yhzgx','sfhz','khmc','zjhm','khlx','lxfs','dz','xb','nl','mz','hyzk','bz','lrbz','lrr','yssxz','yxzc','sflqsbk','sfktsbk','jgdm','xtpdjg','xtpdsm','xgr','sfxdry','sfpkh','sfdb','sfgzry','sfffjz','hbjl','infoRate','sskhjl','whcd','sjhm','hkxz','cjr','upDt','upTm','sfcj','sfypyjl'))
        });

      },

    }
  }
</script>

<style lang="less" scoped>
  .ant-form .ant-form-item {
    margin-bottom: 10px;
  }
</style>