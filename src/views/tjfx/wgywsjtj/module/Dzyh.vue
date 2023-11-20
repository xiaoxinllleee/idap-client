<template>
  <a-modal :title="title"
           :width="1600"
           :visible="visible"
           @cancel="handleCancel"
           @ok="handleCancel"
  >
    <a-button style="margin-bottom: 10px" @click="dcmx">导出明细</a-button>
    <a-button style="margin: 0 0 10px 10px" @click="dcwktmx" v-show="type=='sjyh' || type=='wsyh'">导出未开通明细</a-button>
    <a-table bordered
             :columns="columns"
             :dataSource="dataSource"
             rowKey="id"
             :pagination="ipagination"
             :loading="loading"
             @change="handleTableChange"
    />

  </a-modal>


</template>

<script>
import JTreeSelect from '@comp/jeecg/JTreeSelect'
import JTreeSelectNotJg from '@comp/jeecg/JTreeSelectNotJg'
import pick from 'lodash.pick'
import moment from 'moment'
import { httpAction,getAction } from '@api/manage'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'


export default {
  name: "Dzyh",
  mixins:[JeecgListMixin],
  components: {
    JTreeSelect,JTreeSelectNotJg
  },
  data () {
    return {
      title:"电子银行",
      visible: false,
      loading:false,
      result:[],
      model: {},
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
      url:{
        list:'/qhywxx/qhywxx/getYwsjBySjyh',
      },
      columns: [
        { title: '客户姓名', dataIndex: 'khmc' },
        { title: '证件号码', dataIndex: 'zjhm' },
        { title: '开户机构', dataIndex: 'openJgdm' },
        { title: '开户日期', dataIndex: 'openDate' },
        { title: '开户类型', dataIndex: 'openType' },
        { title: '销户姓名', dataIndex: 'cancelGyh' },
        { title: '状态', dataIndex: 'status' },
        { title: '本月交易金额', dataIndex: 'jyjeBy' },
        { title: '本月交易笔数', dataIndex: 'jybsBy' },
        { title: '本年交易金额', dataIndex: 'jyjeBn' },
        { title: '本年交易笔数', dataIndex: 'jybsBn' },
        { title: '历史交易金额', dataIndex: 'jyjeLs' },
        { title: '历史交易笔数', dataIndex: 'jybsLs' }
      ],
      sjyhColunms: [
        { title: '客户姓名', dataIndex: 'khmc' },
        { title: '证件号码', dataIndex: 'zjhm' },
        { title: '开户机构', dataIndex: 'openJgdm' },
        { title: '开户日期', dataIndex: 'openDate' },
        { title: '开户类型', dataIndex: 'openType' },
        { title: '销户姓名', dataIndex: 'cancelGyh' },
        { title: '状态', dataIndex: 'status' },
        { title: '本月交易金额', dataIndex: 'jyjeBy' },
        { title: '本月交易笔数', dataIndex: 'jybsBy' },
        { title: '本年交易金额', dataIndex: 'jyjeBn' },
        { title: '本年交易笔数', dataIndex: 'jybsBn' },
        { title: '历史交易金额', dataIndex: 'jyjeLs' },
        { title: '历史交易笔数', dataIndex: 'jybsLs' }
      ],
      wsyhColunms: [
        { title: '客户姓名', dataIndex: 'khmc' },
        { title: '证件号码', dataIndex: 'zjhm' },
        { title: '开户机构', dataIndex: 'openJgdm' },
        { title: '开户日期', dataIndex: 'openDate' },
        { title: '开户类型', dataIndex: 'openType' },
        { title: '销户姓名', dataIndex: 'cancelDate' },
      ],
      //ETC
      etcColunms: [{ title: '客户姓名', dataIndex: 'khmc' },
        { title: '证件号码', dataIndex: 'zjhm' },
        { title: '操作网点', dataIndex: 'operJgdm' },
        { title: '绑定时间', dataIndex: 'workDate' },
        { title: '操作人员', dataIndex: 'operYggh' },
        { title: '账户类型', dataIndex: 'zhlx' },
        { title: '开户机构', dataIndex: 'openJgdm' },
        { title: '账号', dataIndex: 'zh' },
        { title: '车牌号码', dataIndex: 'cphm' },
        { title: '状态', dataIndex: 'status' },
        { title: '预解绑日期', dataIndex: 'yjbrq' }],
      //信用卡
      xykcolunms: [
        { title: '客戶名称', dataIndex: 'khmc' },
        { title: '证件号码', dataIndex: 'custrNbr' },
        // { title: '联系电话', dataIndex: 'lxdh' },
        // { title: '卡品种', dataIndex: 'kpz' },
        { title: '发卡日期', dataIndex: 'issueDay' },
        { title: '卡号', dataIndex: 'cardNbr' },
        // { title: '信用额度', dataIndex: 'xyed' },
        //{ title: '推广人员', dataIndex: 'tgry' }
      ],
      tpjchmdColumn: [
        { title: '健康状况', dataIndex: 'jkzk' },
        { title: '劳动技能', dataIndex: 'ldjn' },
        { title: '致贫原因1', dataIndex: 'zpyy' },
        { title: '联系电话', dataIndex: 'lxdh' },
        { title: '户类型', dataIndex: 'hlx' },
        { title: '易返贫致贫户(监测对象)类型', dataIndex: 'yfpzpflx' },
        { title: '风险是否消除', dataIndex: 'fxsfxc' }
      ],
      fxezfcolumns: [
        {
          title: '商户名称',
          dataIndex: 'shmc',
          key: 'shmc',
          align: "center",
        },
        {
          title: '商户类型',
          dataIndex: 'shlx',
          key: 'shlx',
          align: "center",
        },
        {
          title: '法人代表姓名',
          dataIndex: 'frdbxx',
          key: 'frdbxx',
          align: "center",
        },
        {
          title: '法人代表证件号',
          dataIndex: 'drzjhm',
          key: 'drzjhm',
          align: "center",
        },
        {
          title: '商户联系电话',
          dataIndex: 'shlxdh',
          key: 'shlxdh',
          align: "center",
        },
        {
          title: '营业地区',
          dataIndex: 'yydq',
          key: 'yydq',
          align: "center",
        },
        {
          title: '商户入网状态',
          dataIndex: 'ssrwzt',
          key: 'ssrwzt',
          align: "center",
        },
        {
          title: '交易状态',
          dataIndex: 'jyzt',
          key: 'jyzt',
          align: "center",
        },
        {
          title: '渠道',
          dataIndex: 'qd',
          key: 'qd',
          align: "center",
        },
      ],
      type:''
    }
  },
  created () {
  },
  methods: {
    view(record,val){
      this.model = record
      this.visible = true
      this.type = val
      //this.queryParam.rq = record.tjrq
      console.log(val,"111111111111111")

      if ('sjyh' == val){
        this.columns = this.sjyhColunms;
      }
      if ('wsyh' == val){
        this.columns = this.wsyhColunms;
      }
      if ('etc' == val){
        this.columns = this.etcColunms;
      }
      if ('xyk' == val){
        this.columns = this.xykcolunms;
      }
      if ('fxezf' == val){
        this.columns = this.fxezfcolumns;
      }
      if ('tpjjch' == val){
        this.columns = this.tpjchmdColumn;
      }

      this.queryParam.wgbh = record.wgbh
      this.queryParam.type = val
      this.loadData(1)

    },
    close () {
      this.visible = false;
    },
    handleCancel () {
      this.close()
    },
    dcmx(){
      window.location.href = `${window._CONFIG['domianURL']}/` + 'qhywxx/qhywxx/mxdc?wgbh='+this.model.wgbh+'&type='+this.type
    },
    dcwktmx(){
      window.location.href = `${window._CONFIG['domianURL']}/` + 'qhywxx/qhywxx/wktmxdc?wgbh='+this.model.wgbh+'&type='+this.type
    }

  }
}
</script>

<style scoped>

</style>