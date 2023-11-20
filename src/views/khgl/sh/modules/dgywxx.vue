<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
<div>
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
             :pagination="false"
              rowKey="id"
             :dataSource="this.dkxxdataSource"
             :columns="dkxxTable.columns"
        />
      </a-card>

      <a-divider orientation="left" style="color: #1890FF;">贷款数据明细</a-divider>
      <a-card class="card" :bordered="false">
        <a-table size="middle"
                 :pagination="false"
                 rowKey="zclx"
                 :scroll="{ x: 2000}"
                 :dataSource="this.dksjmxdataSource"
                 :columns="dksjmxTable.columns"

        />
      </a-card>
      <a-divider orientation="left" style="color: #1890FF;">手机银行信息</a-divider>
      <a-card class="card" :bordered="false">
        <a-table size="middle"
                 :pagination="false"
                 rowKey="zclx"
                 :scroll="{ x: 2000}"
                 :dataSource="this.sjyhdataSource"
                 :columns="sjyhTable.columns"
        />
      </a-card>
      <a-divider orientation="left" style="color: #1890FF;">福祥E支付</a-divider>
      <a-card class="card" :bordered="false">
        <a-table size="middle"
                 :pagination="false"
                 rowKey="drzjhm"
                 :dataSource="this.ezfdataSource"
                 :columns="ezfTable.columns"
        />
      </a-card>

      <a-divider orientation="left" style="color: #1890FF;">信用卡</a-divider>
       <a-card class="card" :bordered="false">
       <a-table size="middle"
               :pagination="false"
                rowKey="zjhm"
               :dataSource="this.xykdataSource"
               :columns="xykTable.columns"
       />
       </a-card>

       <a-divider orientation="left" style="color: #1890FF;">现金流归行检测</a-divider>
       <a-card class="card" :bordered="false">
       <a-table size="middle"
               :pagination="false"
                rowKey="identNo"
               :dataSource="this.XjlghjctableDate"
               :columns="Xjlghjc.columns"
       />
       </a-card>



</div>
</template>

<script>
  import ARow from "ant-design-vue/es/grid/Row";
  import JSelectUserByDep from '@/components/jeecgbiz/JSelectUserByDep'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JEllipsis from '@/components/jeecg/JEllipsis'


  export default {
    components: {
      ARow,JSelectUserByDep,JEllipsis
    },
    name: 'dgywxx',
    mixins: [JeecgListMixin],
    data() {
      return {
        // 新增时子表默认添加几行空数据
        validatorRules: {},
        model: {},
        ckxxdataSource:[],
        dkxxdataSource:[],
        dksjmxdataSource:[],
        sjyhdataSource:[],
        etcdataSource:[],
        XjlghjctableDate:[],
        xykdataSource:[],
        ezfdataSource:[],
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
            {
              title: '担保方式',
              dataIndex: 'dbfs',
              key: 'dbfs',
              align: "center",
              scopedSlots: {customRender: 'dbfs'}
            },
            {
              title: '第一责任人',
              dataIndex: 'dyzrr',
              key: 'dyzrr',
              align: "center",
              scopedSlots: {customRender: 'dyzrr'}
            },
            {
              title: '主客户经理',
              dataIndex: 'khjlbz',
              key: 'khjlbz',
              align: "center",
              scopedSlots: {customRender: 'khjlbz'}
            },
            {
              title: '贷款品种',
              dataIndex: 'dkpz',
              key: 'dkpz',
              align: "center",
              scopedSlots: {customRender: 'dkpz'}
            },
            {
              title: '借款日期',
              dataIndex: 'jkrq',
              key: 'jkrq',
              align: "center",
              scopedSlots: {customRender: 'jkrq'}
            },
            {
              title: '到期日期',
              dataIndex: 'dqrq',
              key: 'dqrq',
              align: "center",
              scopedSlots: {customRender: 'dqrq'}
            },
            {
              title: '剩余天数',
              dataIndex: 'syts',
              key: 'syts',
              align: "center",
              scopedSlots: {customRender: 'syts'}
            },
            {
              title: '欠息天数',
              dataIndex: 'qxts',
              key: 'qxts',
              align: "center",
              scopedSlots: {customRender: 'qxts'}
            },
            {
              title: '表内外欠息和',
              dataIndex: 'bnwqxh',
              key: 'bnwqxh',
              align: "center",
              scopedSlots: {customRender: 'bnwqxh'}
            },
          ],
        },
        // 手机银行信息
        sjyhTable : {
          columns: [
            {
              title: '客户姓名',
              dataIndex: 'khmc',
              key: 'khmc',
              align: "center",
              scopedSlots: {customRender: 'khmc'}
            },
            {
              title: '证件号码',
              dataIndex: 'zjhm',
              key: 'zjhm',
              align: "center",
              scopedSlots: {customRender: 'zjhm'}
            },
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
              dataIndex: 'openType',
              key: 'openType',
              align: "center",
              scopedSlots: {customRender: 'openType'}
            },
            {
              title: '销户姓名',
              dataIndex: 'cancelGyh ',
              key: 'cancelGyh',
              align: "center",
              scopedSlots: {customRender: 'cancelGyh'}
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
            {
              title: '本月交易笔数',
              dataIndex: 'jybsBy',
              key: 'jybsBy',
              align: "center",
              scopedSlots: {customRender: 'jybsBy'}
            },
            {
              title: '本年交易金额',
              dataIndex: 'jyjeBn',
              key: 'jyjeBn',
              align: "center",
              scopedSlots: {customRender: 'jyjeBn'}
            },
            {
              title: '本年交易笔数',
              dataIndex: 'jybsBn',
              key: 'jybsBn',
              align: "center",
              scopedSlots: {customRender: 'jybsBn'}
            },
            {
              title: '历史交易金额',
              dataIndex: 'jyjeLs',
              key: 'jyjeLs',
              align: "center",
              scopedSlots: {customRender: 'jyjeLs'}
            },
            {
              title: '历史交易笔数',
              dataIndex: 'jybsLs',
              key: 'jybsLs',
              align: "center",
              scopedSlots: {customRender: 'jybsLs'}
            },
          ],
        },

        //E支付
        ezfTable:{
          columns: [
            {
              title: '商户名称',
              dataIndex: 'shmc',
              key: 'shmc',
              align: "center",
              scopedSlots: {customRender: 'shmc'}
            },
            {
              title: '商户类型',
              dataIndex: 'shlx',
              key: 'shlx',
              align: "center",
              scopedSlots: {customRender: 'shlx'}
            },
            {
              title: '法人代表姓名',
              dataIndex: 'frdbxx',
              key: 'frdbxx',
              align: "center",
              scopedSlots: {customRender: 'frdbxx'}
            },
            {
              title: '法人代表证件号',
              dataIndex: 'drzjhm',
              key: 'drzjhm',
              align: "center",
              scopedSlots: {customRender: 'drzjhm'}
            },
            {
              title: '商户联系电话',
              dataIndex: 'shlxdh',
              key: 'shlxdh',
              align: "center",
              scopedSlots: {customRender: 'shlxdh'}
            },
            {
              title: '营业地区',
              dataIndex: 'yydq',
              key: 'yydq',
              align: "center",
              scopedSlots: {customRender: 'yydq'}
            },
            {
              title: '商户入网状态',
              dataIndex: 'ssrwzt',
              key: 'ssrwzt',
              align: "center",
              scopedSlots: {customRender: 'ssrwzt'}
            },
            {
              title: '交易状态',
              dataIndex: 'jyzt',
              key: 'jyzt',
              align: "center",
              scopedSlots: {customRender: 'jyzt'}
            },
            {
              title: '渠道',
              dataIndex: 'qd',
              key: 'qd',
              align: "center",
              scopedSlots: {customRender: 'qd'}
            },
          ],
        },

        //信用卡信息
        xykTable : {
          columns: [
            {
              title: '客户名称',
              dataIndex: 'khmc',
              key: 'khmc',
              align: "center",
              scopedSlots: {customRender: 'khmc'}
            },
            {
              title: '证件号码',
              dataIndex: 'zjhm',
              key: 'zjhm',
              align: "center",
              scopedSlots: {customRender: 'zjhm'}
            },
            {
              title: '联系电话',
              dataIndex: 'lxdh',
              key: 'lxdh',
              align: "center",
              scopedSlots: {customRender: 'lxdh'}
            },
            {
              title: '卡品种',
              dataIndex: 'kpz',
              key: 'kpz',
              align: "center",
              scopedSlots: {customRender: 'kpz'}
            },
            {
              title: '发卡日期',
              dataIndex: 'fkrq',
              key: 'fkrq',
              align: "center",
              scopedSlots: {customRender: 'fkrq'}
            },
            {
              title: '卡号',
              dataIndex: 'kh',
              key: 'kh',
              align: "center",
              scopedSlots: {customRender: 'kh'}
            },
            {
              title: '信用额度',
              dataIndex: 'xyed',
              key: 'xyed',
              align: "center",
              scopedSlots: {customRender: 'xyed'}
            },
            {
              title: '推广人员',
              dataIndex: 'tgry',
              key: 'tgry',
              align: "center",
              scopedSlots: {customRender: 'tgry'}
            },
          ],
        },

        //现金流归行检测
         Xjlghjc: {
           columns: [
             {
               title: '时间起',
               dataIndex: 'ksrq',
               key: 'ksrq',
               align: "center",
               scopedSlots: {customRender: 'ksrq'}
             },
             {
               title: '时间止',
               dataIndex: 'jsrq',
               key: 'jsrq',
               align: "center",
               scopedSlots: {customRender: 'jsrq'}
             },
             {
               title: '客户名称',
               dataIndex: 'khxm',
               key: 'khxm',
               align: "center",
               scopedSlots: {customRender: 'khxm'}
             },
             {
               title: '证件号码',
               dataIndex: 'identNo',
               key: 'identNo',
               align: "center",
               scopedSlots: {customRender: 'identNo'}
             },
             {
               title: '现金流入',
               dataIndex: 'xjlr',
               key: 'xjlr',
               align: "center",
               scopedSlots: {customRender: 'xjlr'}
             },
             {
               title: '现金流出',
               dataIndex: 'xjlc',
               key: 'xjlc',
               align: "center",
               scopedSlots: {customRender: 'xjlc'}
             },
             {
               title: '总现金流',
               dataIndex: 'zxjl',
               key: 'zxjl',
               align: "center",
               scopedSlots: {customRender: 'zxjl'}
             },
             {
               title: '总现金流',
               dataIndex: 'jxjl',
               key: 'jxjl',
               align: "center",
               scopedSlots: {customRender: 'jxjl'}
             },
           ],
        },

        url: {
          list: "sh/vShxxgl/query",
        }
      }
    },

    methods: {


    }
  }
</script>

<style lang="less" scoped>

</style>