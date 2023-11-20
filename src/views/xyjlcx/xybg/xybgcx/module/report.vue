<template>
  <a-modal :title="title"
           :width="1300"
           :visible="visible"
           :confirmLoading="confirmLoading"
           :keyboard="false"
           :maskClosable="false"
           @ok="handleClose"
           okText="关闭"
           @cancel="handleClose"
           cancelText="取消">

    <a-spin :spinning="confirmLoading ">
      <a-card :bordered="true" :class="{'abcdefg':true}">
        <div class="no-print" style="text-align: right">
          <a-button v-print="'#printContentReport'" ghost type="primary">打印</a-button>
        </div>
        <section ref="print" id="printContentReport" class="abcdefg">
          <a-row>
            <div>
              <a-col :span="8"></a-col>
              <a-col :span="8" style="align-content: center;">
                <p style="font-size: 12pt; font-weight: bolder; text-align: center; margin-top: 8px">{{bankName}}</p>
                <!--<p style="font-size: 14pt; font-weight: lighter; text-align: center;  margin-top: 2px">客户内部信用记录报告</p>-->
              </a-col>
              <a-col :span="8"></a-col>
            </div>
          </a-row>

          <a-row>
            <div style="padding-top: 20px;">
              <h4 style="padding-left: 10px;">报告编号: {{ this.reportNo }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;报告时间: {{ this.reportTime }}</h4>
              <a-table :columns="columnsOne"
                       :data-source="dataOne"
                       class="table_info"
                       :bordered="true"
                       :pagination="false"
                       :locale="{emptyText: emptyText}"
                       :customHeaderRow="customHeaderRow"
                       :customRow="customRow"/>
            </div>
          </a-row>

          <a-row>
            <div style="margin-top: 20px;">
              <a-col :span="8"></a-col>
              <a-col :span="8" style="align-content: center;">
                <p style="font-size: 12pt; text-align: center; font-weight: bold">一、基本信息</p>
              </a-col>
              <a-col :span="8"></a-col>
              <a-col :span="24">
                <p style="margin-top: 10px; margin-left: 10px; font-size: 10pt; text-align: center;">身份信息</p>
                <a-table :columns="columnsTwo"
                         class="table_info"
                         :data-source="dataTwo"
                         :bordered="true"
                         :pagination="false"
                         :locale="{emptyText: emptyText}"
                         :customHeaderRow="customHeaderRow"
                         :customRow="customRow"/>
              </a-col>
              <a-col :span="24">
                <p style="margin-top: 10px; margin-left: 10px; font-size: 10pt; text-align: center;">
                  关联人信息</p>
                <a-table :columns="columnsThree"
                         :data-source="dataThree"
                         class="table_info"
                         :bordered="true"
                         :pagination="false"
                         :locale="{emptyText: emptyText}"
                         :customHeaderRow="customHeaderRow"
                         :customRow="customRow"/>
              </a-col>
            </div>
          </a-row>

          <a-row>
            <div style="margin-top: 20px;">
              <a-col :span="8"></a-col>
              <a-col :span="8" style="align-content: center;">
                <p style="font-size: 12pt; text-align: center; font-weight: bold">二、信息概要</p>
              </a-col>
              <a-col :span="8"></a-col>
              <a-col :span="24">
                <p style="margin-top: 10px; margin-left: 10px; font-size: 10pt; text-align: center;">(一) 信用提示</p>
                <a-table :columns="columnsFour"
                         :data-source="dataFour"
                         class="table_info"
                         :bordered="true"
                         :pagination="false"
                         :locale="{emptyText: emptyText}"
                         :customHeaderRow="customHeaderRow"
                         :customRow="customRow"/>
              </a-col>
              <a-col :span="24">
                <p style="margin-top: 10px; margin-left: 10px; font-size: 10pt; text-align: center;">(二) 其他信息概要</p>
                <p v-for="(item, index) in otherInfo"  :key="index" style="padding-top: 2px; font-size: 9pt;">{{ item }}</p>
              </a-col>
            </div>
          </a-row>

          <a-row>
            <div style="margin-top: 20px;">
              <a-col :span="8"></a-col>
              <a-col :span="8" style="align-content: center;">
                <p style="font-size: 12pt; text-align: center; font-weight: bold">三、 信贷交易信息明细</p>
              </a-col>
              <a-col :span="8"></a-col>
              <a-col :span="24">
                <p style="margin-top: 10px; font-size: 10pt; text-align: center;">(一) 贷款</p>
                <p style="font-size: 9pt;">该户贷款用信明细如下：</p>
                <a-table :columns="columnsFive"
                         :data-source="dataFive"
                         class="table_info"
                         :bordered="true"
                         :pagination="false"
                         :locale="{emptyText: emptyText}"
                         :customHeaderRow="customHeaderRow"
                         :customRow="customRow"/>
              </a-col>
              <a-col :span="24" v-if="openKey"><!---->
                <!--利息违约明细-->
                <p v-for="(item, index) in dkyqInfo"  :key="index" style="padding-top: 2px; font-size: 9pt;">{{ item }}</p>
                <p style="padding-top: 2px; font-size: 9pt;" v-if="mxOpenKey">明细如下：</p>
                <a-table :columns="columnsFive2"
                         class="table_info"
                         :data-source="dataFive2"
                         :bordered="true"
                         :pagination="false"
                         :locale="{emptyText: emptyText}"
                         :customHeaderRow="customHeaderRow"
                         :customRow="customRow"
                         v-if="mxOpenKey"/>
              </a-col>
              <a-col :span="24">
                <p style="margin-top: 10px; font-size: 10pt; text-align: center;">(二) 贷记卡</p>
                <p v-for="(item, index) in djkInfo" :key="index" style="margin-top: 10px; font-size: 9pt;">{{ item }}</p>
              </a-col>
              <a-col :span="24">
                <p style="margin-top: 10px; margin-left: 10px; font-size: 10pt; text-align: center;">(三) 担保信息</p>
                <p style="font-size: 9pt;">
                  截至{{ this.sjgxrShow }}，
                  被查询人共为{{ this.dbrs }}人提供担保，
                  担保金额合计{{ this.dbjehj }}元，
                  余额合计{{ this.dbyehj }}元。
                  担保明细如下：
                </p>
                <a-table :columns="columnsSix"
                         :data-source="dataSix"
                         class="table_info"
                         :bordered="true"
                         :pagination="false"
                         :locale="{emptyText: emptyText}"
                         :customHeaderRow="customHeaderRow"
                         :customRow="customRow"/>
              </a-col>
            </div>
          </a-row>

          <a-row>
            <div style="margin-top: 20px;">
              <a-col :span="8"></a-col>
              <a-col :span="8" style="align-content: center;">
                <p style="font-size: 12pt; text-align: center; font-weight: bold">四、 查询记录</p>
              </a-col>
              <a-col :span="8"></a-col>
              <a-col :span="24">
                <p style="margin-top: 5px; margin-bottom: 2px; font-size: 10pt; text-align: center;">信贷审批查询记录明细</p>
              </a-col>
              <a-table :columns="columnsSeven"
                       :data-source="dataSeven"
                       class="table_info"
                       :bordered="true"
                       :pagination="false"
                       :locale="{emptyText: emptyText}"
                       :customHeaderRow="customHeaderRow"
                       :customRow="customRow"/>
            </div>
          </a-row>

          <a-row>
            <div style="margin-top: 10px;">
              <a-col :span="8"></a-col>
              <a-col :span="8" style="align-content: center;">
                <p style="font-size: 12pt; font-weight: bold; text-align: center;">报告说明</p>
              </a-col>
              <a-col :span="8"></a-col>
              <a-col :span="24">
                <p style=" margin-left: 10px; font-size: 9pt;">{{ this.otherInfoFour }}</p>
                <p style=" margin-left: 10px; font-size: 9pt;">{{ this.otherInfoFive }}</p>
                <p style=" margin-left: 10px; font-size: 9pt;">{{ this.otherInfoSix }}</p>
                <p style=" margin-left: 10px; font-size: 9pt;">{{ this.otherInfoSeven }}</p>
                <p style=" margin-left: 10px; font-size: 9pt;">{{ this.otherInfoEight }}</p>
              </a-col>
            </div>
          </a-row>

          <a-row v-show="this.ysbl=='1'"><!---->
            <div style="margin-top: 10px;">
              <a-col :span="8"></a-col>
              <a-col :span="8" style="align-content: center;"><p style="font-size: 12pt; text-align: center; font-weight: bold">疑似不良核查证实书</p></a-col>
              <a-col :span="8"></a-col>
              <a-col :span="24" style="margin-top: 10px;">
                <p style="font-size: 9pt;">
                  {{ this.reportDate }}，{{ this.cxjgmc }}在查询客户内部信用报告时，发现被查询人{{ this.bcxrxm }}本人<span v-if="this.bcxrglrxm != ''">关联人{{ this.bcxrglrxm }}</span>有同名表外贷款，需要客户经理核实是否为同一人。报告编号:{{ this.reportNo }}。
                </p>
                <p style="font-size: 9pt;">同名表外贷款明细如下：</p>
              </a-col>
              <a-table :columns="columnsEight"
                       class="table_info"
                       :data-source="dataEight"
                       :bordered="true"
                       :pagination="false"
                       :locale="{emptyText: emptyText}"
                       :customHeaderRow="customHeaderRow"
                       :customRow="customRow"/>
              <p style="font-size: 9pt;">客户经理已对上述表外贷款进行核实，核实结果如上表所填，并将上述表外不良贷款的证件号码等基础数据进行了补录。</p>
            </div>
            <div style="margin-top: 20px;">
              <a-col :span="8"></a-col>
              <a-col :span="8"></a-col>
              <a-col :span="8"><p style="text-align: left;">客户经理签字：</p></a-col>
            </div>
          </a-row>
        </section>
      </a-card>
    </a-spin>

  </a-modal>
</template>

<script>
  import moment from 'moment'
  import {mapGetters} from 'vuex'
  import pick from 'lodash.pick'
  import store from '@/store'

  export default {
    name: "InternalCreditRecordReport",
    components: {},
    data() {
      return {
        title: '客户信用报告',
        visible: false,
        object: {}, //客户内部信用记录报告数据接收
        confirmLoading: false,
        emptyText: '暂无数据',
        //报告编号
        reportNo: '',
        reportDate: moment(new Date()).format('YYYY年MM月DD日'), //报告日期
        reportTime: moment(new Date()).format('YYYY.MM.DD HH:mm:ss'), //报告时间
        //被查询人姓名/证件号码 & 查询机构/操作员/原因
        columnsOne: [
          {
            title: '被查询者姓名',
            dataIndex: 'xm',
            key: 'xm',
            scopedSlots: {customRender: 'xm'},
            align: 'center'
          },
          {
            title: '被查询者证件号码',
            dataIndex: 'zjhm',
            key: 'zjhm',
            scopedSlots: {customRender: 'zjhm'},
            align: 'center'
          },
          {
            title: '查询机构',
            dataIndex: 'cxjgmc',
            key: 'cxjgmc',
            scopedSlots: {customRender: 'cxjgmc'},
            align: 'center'
          },
          {
            title: '查询操作员',
            dataIndex: 'cxczyxm',
            key: 'cxczyxm',
            scopedSlots: {customRender: 'cxczyxm'},
            align: 'center'
          },
          {
            title: '查询原因',
            dataIndex: 'queryReason',
            key: 'queryReason',
            scopedSlots: {customRender: 'queryReason'},
            align: 'center'
          },
        ],
        dataOne: [],
        cxyy: '', //查询原因（汉字）

        //一 基本信息/身份信息
        columnsTwo: [
          {
            title: '性别',
            dataIndex: 'gender',
            key: 'gender',
            scopedSlots: {customRender: 'gender'},
            align: 'center',
            width: '7%',
          },
          {
            title: '出生日期',
            dataIndex: 'birthday',
            key: 'birthday',
            scopedSlots: {customRender: 'birthday'},
            align: 'center',
            width: '14%',
          },
          {
            title: '婚姻状况',
            dataIndex: 'marriage',
            key: 'marriage',
            scopedSlots: {customRender: 'marriage'},
            align: 'center',
            width: '14%',
          },
          {
            title: '手机号码',
            dataIndex: 'mobilePhone',
            key: 'mobilePhone',
            scopedSlots: {customRender: 'mobilePhone'},
            align: 'center',
            width: '15%',
          },
          {
            title: '住宅电话',
            dataIndex: 'homeTel',
            key: 'homeTel',
            scopedSlots: {customRender: 'homeTel'},
            align: 'center',
            width: '15%',
          },
          {
            title: '学历',
            dataIndex: 'highestSchooling',
            key: 'highestSchooling',
            scopedSlots: {customRender: 'highestSchooling'},
            align: 'center',
            width: '10%',
          },
          {
            title: '通讯地址',
            dataIndex: 'postAddr',
            key: 'postAddr',
            scopedSlots: {customRender: 'postAddr'},
            align: 'center',
            width: '25%',
          },
        ],
        dataTwo: [],

        //一 基本信息/关联人信息
        columnsThree: [
          {
            title: '姓名',
            dataIndex: 'glrxm',
            key: 'glrxm',
            scopedSlots: {customRender: 'glrxm'},
            align: 'center'
          },
          {
            title: '证件类型',
            dataIndex: 'glrzjlx',
            key: 'glrzjlx',
            scopedSlots: {customRender: 'glrzjlx'},
            align: 'center'
          },
          {
            title: '证件号码',
            dataIndex: 'glrzjhm',
            key: 'glrzjhm',
            scopedSlots: {customRender: 'glrzjhm'},
            align: 'center'
          },
          {
            title: '关联关系',
            dataIndex: 'glgx',
            key: 'glgx',
            scopedSlots: {customRender: 'glgx'},
            align: 'center'
          },
        ],
        dataThree: [],

        //二 信息概要/（一） 信用提示
        columnsFour: [
          {
            title: '项目',
            dataIndex: 'xytsxm',
            key: 'xytsxm',
            scopedSlots: {customRender: 'xytsxm'},
            align: 'center'
          },
          {
            title: '信贷往来机构数',
            dataIndex: 'xdwljgs',
            key: 'xdwljgs',
            align: 'center'

          },
          {
            title: '历史业务次数累计',
            dataIndex: 'lsywcslj',
            key: 'lsywcslj',
            align: 'center'
          },
          {
            title: '存量笔数',
            dataIndex: 'clbs',
            key: 'clbs',
            align: 'center'
          },
          {
            title: '存量首笔开户日期',
            dataIndex: 'clsbkhrq',
            key: 'clsbkhrq',
            scopedSlots: {customRender: 'clsbkhrq'},
            align: 'center'
          },
          {
            title: '合同金额',
            dataIndex: 'htje',
            key: 'htje',
            align: 'center'
          },
          {
            title: '用信余额',
            dataIndex: 'yxye',
            key: 'yxye',
            align: 'center'
          },
          {
            title: '历史本金逾期次数',
            dataIndex: 'lsbjyqcs',
            key: 'lsbjyqcs',
            align: 'center'
          },
          {
            title: '历史利息违约次数',
            dataIndex: 'lslxwycs',
            key: 'lslxwycs',
            align: 'center'
          },
          {
            title: '单月最高欠息总额',
            dataIndex: 'dyzgqxze',
            key: 'dyzgqxze',
            align: 'center'
          },
          {
            title: '特殊交易次数',
            dataIndex: 'tsjycs',
            key: 'tsjycs',
            align: 'center'
          },
        ],
        dataFour: [],
        //（二） 其他信息概要
        otherInfo: [],

        //三 信贷交易信息明细/（一） 贷款
        columnsFive: [
          {
            title: '机构名称',
            dataIndex: 'jgmc',
            key: 'jgmc',
            scopedSlots: {customRender: 'jgmc'},
            align: 'center'
          },
          {
            title: '账号',
            dataIndex: 'dkzh',
            key: 'dkzh',
            scopedSlots: {customRender: 'dkzh'},
            align: 'center'
          },
          {
            title: '借款日期',
            dataIndex: 'jkrq',
            key: 'jkrq',
            scopedSlots: {customRender: 'jkrq'},
            align: 'center'
          },
          {
            title: '到期日期',
            dataIndex: 'dqrq',
            key: 'dqrq',
            scopedSlots: {customRender: 'dqrq'},
            align: 'center'
          },
          {
            title: '贷款金额',
            dataIndex: 'dkje',
            key: 'dkje',
            scopedSlots: {customRender: 'dkje'},
            align: 'center'
          },
          {
            title: '核心余额',
            dataIndex: 'hxye',
            key: 'hxye',
            scopedSlots: {customRender: 'hxye'},
            align: 'center'
          },
          {
            title: '最小欠息日期',
            dataIndex: 'zxqxr',
            key: 'zxqxr',
            scopedSlots: {customRender: 'zxqxr'},
            align: 'center',
          },
          {
            title: '累计欠息次数',
            dataIndex: 'ljqxcs',
            key: 'ljqxcs',
            scopedSlots: {customRender: 'ljqxcs'},
            align: 'center'
          },
          {
            title: '五级分类',
            dataIndex: 'wjflbzShow',
            key: 'wjflbz',
            scopedSlots: {customRender: 'wjflbz'},
            align: 'center'
          },
          {
            title: '客户经理',
            dataIndex: 'khjl',
            key: 'khjl',
            scopedSlots: {customRender: 'khjl'},
            align: 'center',
          },
        ],
        dataFive: [],
        dkyxList: {}, //该户贷款用信明细：存放单条数据放入`dataFive`内
        DkjeSum: 0, //贷款金额合计
        HxyeSum: 0, //核心余额合计
        openKey: false, //`历史欠息明细`展示开关
        mxOpenKey: false,
        columnsFive2: [
          {
            title: '贷款账号',
            dataIndex: 'dkzh',
            key: 'dkzh',
            scopedSlots: {customRender: 'dkzh'},
            align: 'center',
          },
          {
            title: '逾期月份',
            dataIndex: 'yqyf',
            key: 'yqyf',
            scopedSlots: {customRender: 'yqyf'},
            align: 'center',
          },

          {
            title: '逾期利息',
            dataIndex: 'yqlx',
            key: 'yqlx',
            scopedSlots: {customRender: 'yqlx'},
            align: 'center'
          },
          {
            title: '逾期本金',
            dataIndex: 'yqbj',
            key: 'yqbj',
            scopedSlots: {customRender: 'yqbj'},
            align: 'center'
          },
        ],
        dataFive2: [],
        dkyqInfo: [],

        //三 信贷交易信息明细/（一） 贷款/历史欠息明细
        columnQxmx: [],
        dataQxmx: [],

        //三 信贷交易信息明细/（二） 贷记卡
        djkInfo: [],

        //三 信贷交易信息明细/（三） 担保信息
        sjgxrShow: moment(new Date()).format('YYYY年MM月DD日'),
        columnsSix: [
          {
            title: '机构名称',
            dataIndex: 'jgmc',
            key: 'jgmc',
            scopedSlots: {customRender: 'jgdm'},
            align: 'center',
            width: '120px',
          },
          {
            title: '账号',
            dataIndex: 'dkzh',
            key: 'dkzh',
            scopedSlots: {customRender: 'dkzh'},
            align: 'center',
            width: '120px',
          },
          {
            title: '借款人姓名',
            dataIndex: 'jkrxm',
            key: 'jkrxm',
            scopedSlots: {customRender: 'jkrxm'},
            align: 'center',
            width: '120px',
          },
          {
            title: '借款日期',
            dataIndex: 'jkrq',
            key: 'jkrq',
            scopedSlots: {customRender: 'jkrq'},
            align: 'center',
            width: '120px',
          },
          {
            title: '到期日期',
            dataIndex: 'dqrq',
            key: 'dqrq',
            scopedSlots: {customRender: 'dqrq'},
            align: 'center',
            width: '120px',
          },
          {
            title: '贷款金额',
            dataIndex: 'dkje',
            key: 'dkje',
            scopedSlots: {customRender: 'dkje'},
            align: 'center',
            width: '120px',
          },
          {
            title: '核心余额',
            dataIndex: 'hxye',
            key: 'hxye',
            scopedSlots: {customRender: 'hxye'},
            align: 'center',
            width: '120px',
          },
          {
            title: '最小欠息日期',
            dataIndex: 'zxqxrShow',
            key: 'zxqxr',
            scopedSlots: {customRender: 'zxqxr'},
            align: 'center',
            width: '150px',
          },
          {
            title: '累计欠息次数',
            dataIndex: 'ljqxcs',
            key: 'ljqxcs',
            scopedSlots: {customRender: 'ljqxcs'},
            align: 'center',
            width: '150px',
          },
          {
            title: '五级分类',
            dataIndex: 'wjflmc',
            key: 'wjflmc',
            scopedSlots: {customRender: 'wjflbz'},
            align: 'center',
            width: '120px',
          },
          {
            title: '客户经理',
            dataIndex: 'khjlxm',
            key: 'khjlxm',
            scopedSlots: {customRender: 'khjl'},
            align: 'center',
            width: '120px',
          },
        ],
        dataSix: [],
        dbrs: 0, //担保合计人数
        dbjehj: 0, //担保合计金额
        dbyehj: 0, //担保合计余额

        //四 查询记录/信贷审批查询记录明细
        columnsSeven: [
          {
            title: '编号',
            dataIndex: '',
            key: 'rowIndex',
            align: "center",
            customRender: function (t, r, index) {
              return parseInt(index) + 1;
            }
          },
          {
            title: '查询编号',
            dataIndex: 'bgbh',
            key: 'bgbh',
            scopedSlots: {customRender: 'bgbh'},
            align: 'center'
          },
          {
            title: '查询日期',
            dataIndex: 'cxrq',
            key: 'cxrq',
            scopedSlots: {customRender: 'cxrq'},
            align: 'center'
          },
          {
            title: '查询网点',
            dataIndex: 'czyjgdm_dictText',
            key: 'czyjgdm_dictText',
            scopedSlots: {customRender: 'czyjgdm_dictText'},
            align: 'center'
          },
          {
            title: '查询操作员',
            dataIndex: 'cxczyxm',
            key: 'cxczyxm',
            scopedSlots: {customRender: 'cxczyxm'},
            align: 'center'
          },
          {
            title: '查询原因',
            dataIndex: 'cxyy_dictText',
            key: 'cxyy_dictText',
            scopedSlots: {customRender: 'cxyy_dictText'},
            align: 'center'
          },
        ],
        dataSeven: [],

        //疑似不良核查证实书
        columnsEight: [
          {
            title: '机构名称',
            dataIndex: 'jgmc',
            key: 'jgmc',
            scopedSlots: {customRender: 'jgmc'},
            align: 'center'
          },
          {
            title: '账号',
            dataIndex: 'dkzh',
            key: 'dkzh',
            scopedSlots: {customRender: 'dkzh'},
            align: 'center'
          },
          {
            title: '借款人',
            dataIndex: 'khmc',
            key: 'khmc',
            scopedSlots: {customRender: 'khmc'},
            align: 'center'
          },
          {
            title: '贷款金额',
            dataIndex: 'jkje',
            key: 'jkje',
            scopedSlots: {customRender: 'jkje'},
            align: 'center'
          },
          {
            title: '核心余额',
            dataIndex: 'hxye',
            key: 'hxye',
            scopedSlots: {customRender: 'hxye'},
            align: 'center'
          },
          {
            title: '表外类型',
            dataIndex: 'zrbwlxShow',
            key: 'zrbwlxShow',
            scopedSlots: {customRender: 'zrbwlxShow'},
            align: 'center'
          },
          {
            title: '包收责任人',
            dataIndex: 'bszrr',
            key: 'bszrr',
            scopedSlots: {customRender: 'bszrr'},
            align: 'center'
          },
          {
            title: '管理责任人',
            dataIndex: 'glzrr',
            key: 'glzrr',
            scopedSlots: {customRender: 'glzrr'},
            align: 'center'
          },
          {
            title: '客户经理核实结果',
            dataIndex: 'verificationResults',
            key: 'verificationResults',
            align: 'center'
          },
        ],
        dataEight: [],
        cxjgmc: '', //查询机构名称
        bcxrxm: '', //同名表外贷款：被查询人姓名
        bcxrglrxm: '', //同名表外贷款：被查询人关联人姓名
        ysbl: '0', // 疑似不良标识 0 否 默认值/1 是

        otherInfoFour: '1. 本报告中的`特殊交易`是指再融资、展期、续贷。',
        otherInfoFive: '2. 本报告中的金额类数据均以人民币计算，精确到元。',
        otherInfoSix: '3. 本报告所展示的客户信息以省联社下发数据为基础，所展示的授信用信情况和不良行为期限以相关管理办法为准。',
        otherInfoSeven: '4. 本报告仅作为我行内部业务开展提供参考，对外不具备任何承诺或者效力。',
        otherInfoEight: '5. 本报告内容涉及个人隐私，查询者应依法使用、妥善保管，严禁对外提供此报告，严禁挪作他用。因使用不当造成个人隐私泄露的，总部将追究相关人员相关责任。',
        bankName:'',
        qybm:'',
      }
    },
    created() {
      this.qybm = store.getters.qybm
      if (this.qybm=='095'){
        this.bankName='天易农商银行客户内部信用报告'
      }else {
        this.bankName='浏阳农商银行客户内部信用报告'
      }
    },
    methods: {
      ...mapGetters(["nickname", "avatar", "userInfo", "orgCode"]),

      report: function(model) {
        console.info('model',model)
        console.info('object',this.object)
      },
      subreport: function(param) {
        console.info('param',param)
        console.info('object',this.object)
      },

      init: function (model) {
        this.visible  = true
        this.$nextTick(() => {
          console.info('#征信报告表单数据model')
          console.info(model)
          console.info('#征信报告请求返回数据object')
          console.info(this.object)
          this.reportNo = model.bgbh
          this.bcxrxm   = model.xm
          this.ysbl     = this.object.xxgy.ysbl //疑似不良 0 无 1 疑似
          console.info('#疑似不良标识\n',this.ysbl,'\n返回值:',this.object.xxgy.ysbl)
          let arrayOne = {}
          this.$set(arrayOne, 'xm', model.xm == null ? "\\" : model.xm)
          this.$set(arrayOne, 'zjhm', model.zjhm == null ? "\\" : model.zjhm)
          this.$set(arrayOne, 'cxjgmc', this.object.jbxx.cxjgmc == null ? "浏阳农商行" : this.object.jbxx.cxjgmc)
          this.$set(arrayOne, 'cxczyxm', this.object.jbxx.cxczyxm == null ? "\\" : this.object.jbxx.cxczyxm)
          this.$set(arrayOne, 'queryReason', this.object.jbxx.cxyyShow == null ? "\\" : this.object.jbxx.cxyyShow)
          this.dataOne.push(arrayOne)

          //一 基本信息
          //身份信息
          let arrayTwo = {}
          this.$set(arrayTwo, 'gender', this.object.jbxx.xb == "" ? "\\" : this.object.jbxx.xb)
          var birthday = this.object.jbxx.csrq
          if (birthday) {
            if (Number.parseInt(this.object.jbxx.csrq.length) !== 8) {
              this.$set(arrayTwo, 'birthday', this.object.jbxx.csrq == "" ? "\\" : this.object.jbxx.csrq)
            } else {
              this.$set(arrayTwo, 'birthday', this.object.jbxx.csrq == "" ? "\\" : moment(this.object.jbxx.csrq).format('YYYY.MM.DD'))
            }
          } else {
            this.$set(arrayTwo, 'birthday','\\')
          }
          this.$set(arrayTwo, 'marriage', this.object.jbxx.hyzk == "" ? "\\" : this.object.jbxx.hyzk)
          this.$set(arrayTwo, 'mobilePhone', this.object.jbxx.sjhm == "" ? "\\" : this.object.jbxx.sjhm)
          //console.info('住宅电话',this.object.jbxx.zzdh)
          this.$set(arrayTwo, 'homeTel', this.object.jbxx.zzdh == "" ? "\\" : this.object.jbxx.zzdh)
          this.$set(arrayTwo, 'highestSchooling', this.object.jbxx.xl == "" ? "\\" : this.object.jbxx.xl)
          this.$set(arrayTwo, 'postAddr', this.object.jbxx.txdz == "" ? "\\" : this.object.jbxx.txdz)
          this.dataTwo.push(arrayTwo)
          //关联人信息
          if (this.object.glrInfo.glrTable !== undefined) {
            this.object.glrInfo.glrTable.forEach((item) => {
              let arrayThree = {}
              this.$set(arrayThree, 'glrxm', item.glrxm == null ? "\\" : item.glrxm)
              this.$set(arrayThree, 'glrzjlx', item.zjlxDictText == null ? "\\" : item.zjlxDictText)
              this.$set(arrayThree, 'glrzjhm', item.glrzjhm == null ? "\\" : item.glrzjhm)
              this.$set(arrayThree, 'glgx', item.gllxDictText == null ? "\\" : item.gllxDictText)
              this.dataThree.push(arrayThree)
            })
          }
          if (this.object.glrInfo.glrTable2 !== undefined) {
            this.object.glrInfo.glrTable2.forEach((item) => {
              let arrayThree = {}
              this.$set(arrayThree, 'glrxm', item.jkrmc == null ? "\\" : item.jkrmc)
              this.$set(arrayThree, 'glrzjlx', item.zjlxDictText == null ? "\\" : item.zjlxDictText)
              this.$set(arrayThree, 'glrzjhm', item.jkrzjhm == null ? "\\" : item.jkrzjhm)
              this.$set(arrayThree, 'glgx', item.gllxDictText == null ? "\\" : item.gllxDictText)
              this.dataThree.push(arrayThree)
            })
          }

          //二 信息概要
          //(一) 信用提示
          if (this.object.xxgy.xytsTable !== undefined) {
            this.object.xxgy.xytsTable.forEach((item,index) => {
              console.info(index,'. 信用提示\n',item)
              let arrayFour = {}
              this.$set(arrayFour, 'xytsxm', item.xytsxm_dictText == null ? "\\" : item.xytsxm_dictText)
              this.$set(arrayFour, 'xdwljgs', item.xdwljgs == null ? "\\" : item.xdwljgs)
              this.$set(arrayFour, 'lsywcslj', item.lsywcslj == null ? "\\" : item.lsywcslj)
              this.$set(arrayFour, 'clbs', item.clbs == null ? "\\" : item.clbs)
              this.$set(arrayFour, 'clsbkhrq', item.clsbkhrq == null ? "\\" : item.clsbkhrq)
              this.$set(arrayFour, 'htje', item.htje == null ? "\\" : Number(item.htje).toFixed(0))
              this.$set(arrayFour, 'yxye', item.yxye == null ? "\\" : Number(item.yxye).toFixed(0))
              this.$set(arrayFour, 'lsbjyqcs', item.bjyqcs == null ? "\\" : item.bjyqcs)
              this.$set(arrayFour, 'lslxwycs', item.lxyqcs == null ? "\\" : item.lxyqcs)
              this.$set(arrayFour, 'dyzgqxze', item.dyzgqxze == null ? "\\" : Number(item.dyzgqxze).toFixed(0))
              this.$set(arrayFour, 'tsjycs', item.tsjycs == null ? "\\" : item.tsjycs)
              this.dataFour.push(arrayFour)
            })
          }
          //(二) 其他信息概要
          //console.info('其他信息概要=>',this.object.xxgy.qtxxgy)
          this.otherInfo = []
          if (this.object.xxgy.qtxxgy !== undefined) {
            this.object.xxgy.qtxxgy.forEach((item,index) => {
              item = Number(index+1)+'.'+item
              this.otherInfo.push(item)
            })
          }

          //三 信贷交易信息明细
          //（一） 贷款
          //this.dataFive = this.object.xdjymxTable.dksjTable
          if (this.object.xdjymxTable.dksjTable !== undefined) {
            this.object.xdjymxTable.dksjTable.forEach((item)=>{
              var arrayFive = {}
              this.$set(arrayFive, 'jgmc', item.jgdm_dictText == null ? "\\" : item.jgdm_dictText)
              this.$set(arrayFive, 'dkzh', item.dkzh == null ? "\\" : item.dkzh)
              this.$set(arrayFive, 'jkrq', item.jkrq == null ? "\\" : item.jkrq)
              this.$set(arrayFive, 'dqrq', item.dqrq == null ? "\\" : item.dqrq)
              this.$set(arrayFive, 'dkje', Number(item.dkje).toFixed(0) == null ? 0 : Number(item.dkje).toFixed(0))
              this.$set(arrayFive, 'hxye', Number(item.hxye).toFixed(0) == null ? 0 : Number(item.hxye).toFixed(0))
              this.$set(arrayFive, 'zxqxr', item.zxqxr == null ? "\\" : item.zxqxr)
              this.$set(arrayFive, 'ljqxcs', Number(item.ljqxcs).toFixed(0) == null ? 0 : Number(item.ljqxcs).toFixed(0))
              this.$set(arrayFive, 'wjflbzShow', item.wjflbzShow == null ? "\\" : item.wjflbzShow)
              this.$set(arrayFive, 'khjl', item.khjl_dictText == null ? "\\" : item.khjl_dictText)
              this.dataFive.push(arrayFive)
            })
            this.DkjeSum = this.object.xdjymxTable.dkjeSum
            this.HxyeSum = this.object.xdjymxTable.hxyeSum
            let total = {}
            this.$set(total, 'jgmc', '')
            this.$set(total, 'dkzh', '')
            this.$set(total, 'jkrq', '')
            this.$set(total, 'dqrq', '合计')
            this.$set(total, 'dkje', this.DkjeSum)
            this.$set(total, 'hxye', this.HxyeSum)
            this.$set(total, 'zxqxr', '')
            this.$set(total, 'ljqxcs', '')
            this.$set(total, 'wjflbzShow', '')
            this.$set(total, 'khjl', '')
            this.dataFive.push(total)
          }
          //逾期明细信息
          this.dkyqInfo = []
          //console.info('逾期明细信息')
          //console.info(this.object.xdjymxTable.dksjTable2)
          this.sjgxrShow = this.object.xdjymxTable.sjgxrShow
          if (this.object.xdjymxTable.dksjTable2 !== undefined) {
            this.object.xdjymxTable.dksjTable2.forEach((item,index) => {
              var zhlx   = item.zhlx
              zhlx = Number.parseInt(zhlx)
              var qxcs = item.ljqxcs
              qxcs = Number.parseInt(qxcs)
              if (zhlx !== 1 || (zhlx === 1 && !(qxcs === 0 || qxcs === null || qxcs === undefined))) {
                this.openKey = true
                var no = index + 1
                var info = no + ". 贷款账号" + item.dkzh + "，" + item.dkzlShow + "，账户状态\"" + item.dkzhztShow + "\"";
                var ljqxcs = item.ljqxcs
                ljqxcs = Number.parseInt(ljqxcs)
                console.info('累计逾期次数',ljqxcs)
                if (ljqxcs === 0) {
                  info = info + "。";
                } else {
                  info = info + "，利息违约次数累计达" + ljqxcs + "次，欠息合计" + Number.parseInt(item.qxhj==null?"0":item.qxhj) + "元。"
                  this.mxOpenKey = true
                  item.dkqxdjbTable.forEach((qxmx,index) => {
                    let arrayFive = {}
                    this.$set(arrayFive, 'dkzh', qxmx.acctNo == null ? "\\" : qxmx.acctNo)
                    this.$set(arrayFive, 'yqyf', qxmx.yqyf == null ? "\\" : qxmx.yqyf)
                    this.$set(arrayFive, 'yqlx', Number(qxmx.yqlx).toFixed(2) == null ? "\\" : Number(qxmx.yqlx).toFixed(2))
                    this.$set(arrayFive, 'yqbj', Number(qxmx.yqbj).toFixed(2) == null ? "\\" : Number(qxmx.yqbj).toFixed(2))
                    this.dataFive2.push(arrayFive)
                  })
                }
                this.dkyqInfo.push(info)
              }
            })
          }

          //（二） 贷记卡
          //console.info('贷记卡信息',this.object.djkTable.djkdksjms)
          this.djkInfo = []
          if (this.object.djkTable.djkdksjms !== undefined) {
            this.object.djkTable.djkdksjms.forEach((item) => {
              this.djkInfo.push(item)
            })
          }
          //（三） 担保信息
          //console.info('担保信息',this.object.dbxx)
          this.dbrs   = this.object.dbxx.dbrs
          this.dbjehj = this.object.dbxx.dbjehj
          this.dbyehj = this.object.dbxx.dbyehj
          //担保明细
          if (this.object.djkTable.djkdksjms !== undefined) {
            this.object.djkTable.djkdksjms.forEach((item) => {
              let arraySix = {}
              this.$set(arraySix, 'jgdm', item.jgdm_dictText == null ? "\\" : item.jgdm_dictText)
              this.$set(arraySix, 'dkzh', item.dkzh == null ? "\\" : item.dkzh)
              this.$set(arraySix, 'jkrxm', item.khmc == null ? "\\" : item.khmc)
              this.$set(arraySix, 'jkrq', item.jkrq == null ? "\\" : item.jkrq)
              this.$set(arraySix, 'dqrq', item.dqrq == null ? "\\" : item.dqrq)
              this.$set(arraySix, 'dkje', item.dkje == null ? "\\" : item.dkje)
              this.$set(arraySix, 'hxye', item.hxye == null ? "\\" : item.hxye)
              this.$set(arraySix, 'zxqxrShow', item.zxqxr == null ? "\\" : item.zxqxr)
              this.$set(arraySix, 'ljqxcs', item.ljqxcs == null ? "\\" : item.ljqxcs)
              this.$set(arraySix, 'wjflmc', item.wjflbz_dictText == null ? "\\" : item.wjflbz_dictText)
              this.$set(arraySix, 'khjlxm', item.khjl_dictText == null ? "\\" : item.khjl_dictText)
              this.dataSix.push(arraySix)
            })
          }

          //四 查询记录/信贷审批查询记录明细
          //console.info('信贷审批查询记录明细', this.object.cxjlmxTable)
          this.dataSeven = this.object.cxjlmxTable;
          console.info('查询记录 / 信贷审批查询记录明细 / 返回数据：', this.object.cxjlmxTable)
          console.info('查询记录 / 信贷审批查询记录明细 / 结果数据：', this.dataSeven)

          //疑似不良核查证实书
          console.info('疑似不良核查 / 表外同名贷款明细\n',this.object.xxgy.bwtmdk)
          if (this.object.xxgy.bwtmdk.bcxglrBwtmDkmx) {
            console.info('疑似不良核查，被查询人关联人表外同名贷款明细\n',this.object.xxgy.bwtmdk.bcxglrBwtmDkmx)
            this.bcxrglrxm = this.object.xxgy.bwtmdk.bcxglrBwtmDkmx.glrxm
          }
          console.info('疑似不良核查 / 被查询人表外同名贷款明细\n',this.object.bwtmdkList)
          if (this.object.bwtmdkList !== undefined) {
            this.object.bwtmdkList.forEach((item) => {
              let arrayEight = {}
              this.$set(arrayEight, 'jgmc', item.jgmc == null ? "\\" : item.jgmc)
              this.$set(arrayEight, 'dkzh', item.dkzh == null ? "\\" : item.dkzh)
              this.$set(arrayEight, 'khmc', item.khmc == null ? "\\" : item.khmc)
              this.$set(arrayEight, 'jkje', item.jkje == null ? "\\" : Number(item.jkje).toFixed(0))
              this.$set(arrayEight, 'hxye', item.hxye == null ? "\\" : Number(item.hxye).toFixed(0))
              this.$set(arrayEight, 'zrbwlxShow', item.zrbwlxShow == null ? "\\" : item.zrbwlxShow)
              this.$set(arrayEight, 'bszrr', item.bszrr == null ? "" : item.bszrr)
              this.$set(arrayEight, 'glzrr', item.glzrr == null ? "" : item.glzrr)
              this.$set(arrayEight, 'verificationResults', item.verificationResults == null ? "" : item.verificationResults)
              this.dataEight.push(arrayEight)
            })
          }
        })
        this.$forceUpdate();
      },
      handlePrint: function () {},
      handleClose: function () {
        this.dataOne = []
        this.dataTwo = []
        this.dataThree = []
        this.dataFour = []
        this.dataFive = []
        this.dataFive2 = []
        this.dataSix = []
        this.dataSeven = []
        this.dataEight = []
        this.close()
      },
      close: function () {
        this.$emit('close')
        this.visible = false
      },

      customHeaderRow() {
        return {
          style: {
            'font-size' : '4pt'
          },
        }
      },
      customRow() {
        return {
          style: {
            'font-size' : '3pt'
          },
        }
      },

    },
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'

  .ant-table-tbody > tr > td {
    padding: 0px!important;
  }
  #printContentReport tr{
    height: 80%;
  }

  @page{
    size: auto A4 landscape;
    margin: 15mm;
  }

  /deep/ .ant-table table tr td{
    font-size: 10px;
    padding: 2px;
    border: 1px solid;
  }

  /deep/ .ant-table table tr th{
    font-size: 12px;
    padding: 2px;
    border: 1px solid;
  }

  /deep/ .ant-table table{
    border: 1px solid;
  }
</style>