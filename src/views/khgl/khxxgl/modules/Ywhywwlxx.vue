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



      <a-tabs defaultActiveKey="1" >
        <a-tab-pane  key="1">
          <span slot="tab"><a-icon type="book"/>存款信息</span>
            <a-table bordered
                  size="middle"
                  :dataSource="this.ckxxdataSource"
                  :columns="ckxxTable.columns"
                  rowKey="id"
                 :loading="loading"
            />
        </a-tab-pane>
        <a-tab-pane  key="2" forceRender>
          <span slot="tab"><a-icon type="book"/>贷款信息</span>
            <a-table size="middle"
                     rowKey="id"
                     bordered
                     :dataSource="this.dkxxdataSource"
                     :columns="dkxxTable.columns"
                     :loading="loading"
            />
        </a-tab-pane>
        <a-tab-pane  key="3" forceRender>
          <span slot="tab"><a-icon type="book"/>贷款数据明细</span>
            <a-table size="middle"
                     rowKey="id"
                     bordered
                     :dataSource="this.dksjmxdataSource"
                     :columns="dksjmxTable.columns"
                     :loading="loading"
            />
        </a-tab-pane>
        <a-tab-pane  key="4" forceRender>
          <span slot="tab"><a-icon type="book"/>贷款历史数据明细</span>
          <a-table size="middle"
                   rowKey="id"
                   bordered
                   :dataSource="this.dklssjmxdataSource"
                   :columns="dklssjmxTable.columns"
                   :loading="loading"
          />
        </a-tab-pane>
        <a-tab-pane  key="5" forceRender>
          <span slot="tab"><a-icon type="book"/>手机银行信息</span>
            <a-table size="middle"
                     rowKey="id"
                     bordered
                     :dataSource="this.sjyhdataSource"
                     :columns="sjyhTable.columns"
            />
        </a-tab-pane>

        <a-tab-pane  key="6" forceRender>
          <span slot="tab"><a-icon type="book"/>ETC信息</span>
            <a-table size="middle"
                     rowKey="id"
                     bordered
                     :dataSource="this.etcdataSource"
                     :columns="etcTable.columns"
            />

        </a-tab-pane>
        <a-tab-pane  key="7" forceRender>
          <span slot="tab"><a-icon type="book"/>现金流归行检测</span>
            <a-table size="middle"
                     rowKey="id"
                     bordered
                     :dataSource="this.xjlghjcDataSource"
                     :columns="xjlghjc.columns"
            />
        </a-tab-pane>
        <a-tab-pane  key="8" forceRender>
          <span slot="tab"><a-icon type="book"/>资金归行率</span>
            <a-table size="middle"
                     rowKey="id"
                     bordered
                     :dataSource="this.zjghlDataSource"
                     :columns="zjghl.columns"
            />

        </a-tab-pane>
      </a-tabs>
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
        dklssjmxdataSource:[],
        sjyhdataSource:[],
        etcdataSource:[],
        xjlghjcDataSource:[],
        zjghlDataSource:[],
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
            {
              title: '最早开户日期',
              align:"center",
              dataIndex: 'ckzzkhrq',
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
              title: '当年收息总额',
              dataIndex: 'lx',
              key: 'lx',
              width: '10%',
              align: "center",
              scopedSlots: {customRender: 'lx'}
            },
            {
              title: '最早借款日期',
              dataIndex: 'dkzzffrq',
              key: 'dkzzffrq',
              width: '10%',
              align: "center",
              scopedSlots: {customRender: 'dkzzffrq'}
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
              title: '当年收息总额',
              dataIndex: 'lx',
              key: 'lx',
              align: "center",
              scopedSlots: {customRender: 'lx'}
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
            {
              title: '担保方式',
              dataIndex: 'dbfs',
              key: 'dbfs',
              align: "center",
            },
            {
              title: '借款日期',
              dataIndex: 'jkrq',
              key: 'jkrq',
              align: "center",
            },
            {
              title: '到期日期',
              dataIndex: 'dqrq',
              key: 'dqrq',
              align: "center",
            },
            {
              title: '剩余天数',
              dataIndex: 'syts',
              key: 'syts',
              align: "center",
            },
            {
              title: '欠息天数',
              dataIndex: 'qxts',
              key: 'qxts',
              align: "center",
            },
            {
              title: '表内外欠息和',
              dataIndex: 'bnwqxh',
              key: 'bnwqxh',
              align: "center",
            },
          ],
        },
        dklssjmxTable:{
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
              title: '当年收息总额',
              dataIndex: 'lx',
              key: 'lx',
              align: "center",
              scopedSlots: {customRender: 'lx'}
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
            {
              title: '担保方式',
              dataIndex: 'dbfs',
              key: 'dbfs',
              align: "center",
            },
            {
              title: '借款日期',
              dataIndex: 'jkrq',
              key: 'jkrq',
              align: "center",
            },
            {
              title: '到期日期',
              dataIndex: 'dqrq',
              key: 'dqrq',
              align: "center",
            },
            {
              title: '剩余天数',
              dataIndex: 'syts',
              key: 'syts',
              align: "center",
            },
            {
              title: '欠息天数',
              dataIndex: 'qxts',
              key: 'qxts',
              align: "center",
            },
            {
              title: '表内外欠息和',
              dataIndex: 'bnwqxh',
              key: 'bnwqxh',
              align: "center",
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

        //现金流归行检测
        xjlghjc : {
          columns: [
            {
              title: '时间起',
              dataIndex: 'ksrq',
              key: 'ksrq',
              align: "center",
            },
            {
              title: '时间止',
              dataIndex: 'jsrq',
              key: 'jsrq',
              align: "center",
            },
            {
              title: '客户名称',
              dataIndex: 'khxm',
              key: 'khxm',
              align: "center",
            },
            {
              title: '证件号码',
              dataIndex: 'identNo',
              key: 'identNo',
              align: "center",
            },
            {
              title: '现金流入',
              dataIndex: 'xjlr',
              key: 'xjlr',
              align: "center",
            },
            {
              title: '现金流出',
              dataIndex: 'xjlc',
              key: 'xjlc',
              align: "center",
            },
            {
              title: '总现金流',
              dataIndex: 'zxjl',
              key: 'zxjl',
              align: "center",
            },
            {
              title: '净现金流',
              dataIndex: 'jxjl',
              key: 'jxjl',
              align: "center",
            },
          ],
        },
        //资金归行率
        zjghl : {
          columns: [
            {
              title: '统计月份',
              align:"center",
              dataIndex: 'tjyf',
              customRender:function (text) {
                return !text?"":(text.length>8?text.substr(0,7):text)
              },
              sorter: (a, b) => b.tjyf.replace(/-/g, '/') - a.tjyf.replace(/-/g, '/'),
              width:120
            },
            /*{
              title: '客户姓名',
              align:"center",
              dataIndex: 'khmc'
            },
            {
              title: '证件号码',
              align:"center",
              dataIndex: 'zjhm'
            },
            {
              title: '客户类型',
              align:"center",
              dataIndex: 'khlx_dictText'
            },
            {
              title: '地址',
              align:"center",
              dataIndex: 'khdz'
            },*/
            {
              title: '贷款余额',
              align:"center",
              dataIndex: 'dkye'
            },
            {
              title: '存款余额',
              align:"center",
              dataIndex: 'ckye'
            },
            {
              title: '贷款月日平',
              align:"center",
              dataIndex: 'dkrpM'
            },
            {
              title: '存款月日平',
              align:"center",
              dataIndex: 'ckrpM'
            },
            {
              title: '月资金归行率(%)',
              align:"center",
              dataIndex: 'zjghlM'
            },
            {
              title: '贷款季日平',
              align:"center",
              dataIndex: 'dkrpQ'
            },
            {
              title: '存款季日平',
              align:"center",
              dataIndex: 'ckrpQ'
            },
            {
              title: '季资金归行率(%)',
              align:"center",
              dataIndex: 'zjghlQ'
            },
            {
              title: '贷款年日平',
              align:"center",
              dataIndex: 'dkrp'
            },
            {
              title: '存款年日平',
              align:"center",
              dataIndex: 'ckrp'
            },
            {
              title: '年资金归行率(%)',
              align:"center",
              dataIndex: 'zjghl'
            }
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