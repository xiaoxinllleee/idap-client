<template>
  <div class="page-header-index-wide">
    <a-row :gutter="0">
      <a-card :style="{ marginBottom: '12px', backgroundColor: 'dark'}" :bodyStyle="{ backgroundColor: '#33CC99'}">
        <a-col :span="6" :style="{paddingTop: '2px'}">
          <!--<j-tree-select  @change="onChangev" style="width: 80%" placeholder="请选择支行"
                          dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                          :sszh="true"  :treeDefaultExpandAll="true" :filterTreeNode="true" :isAll="true"/>-->
          <a-input-search :style="{paddingTop: '5px'}" placeholder="输入姓名/证件号码/户籍编号查询" @search="customerSearch" style="width: 80%;" enterButton/>
        </a-col>
        <!--<a-col :span="3">
          <a href="#" @click="jdrsclick"><a-statistic title="本月有效建档人数" :value="this.xnsj.jdrs"/></a>
        </a-col>-->
        <a-col :span="3">
          <a href="#" @click="byzfsclick"><a-statistic title="本月走访数" :value="this.xnsj.zfhs"  /></a>
        </a-col>
        <a href="#" @click="yxsxclick">
          <a-col :span="3">
            <a-statistic title="本月预授信户数" :value="this.xnsj.sxhs" />
          </a-col>
          <a-col :span="3">
            <a-statistic title="本月预授信金额" :value="this.xnsj.sxje | NumberFormat"/>
          </a-col>
          <a-col :span="3">
            <a-statistic title="本月用信户数" :value="this.xnsj.yxhs" />
          </a-col>
          <a-col :span="3">
            <a-statistic title="本月用信金额" :value="this.xnsj.yxje | NumberFormat"/>
          </a-col>
        </a>
      </a-card>
    </a-row>

    <a-row :gutter="16">
      <a-col :sm="24" :md="12" :xl="4" :style="{ marginBottom: '12px'}">
        <!--<chart-card :loading="loading" title="有效存贷款客户数" :total="khinfo.zkh | NumberFormat" bgcolor="#66CCCC">
          <a-tooltip :title="dksjrqstr" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <span slot="term">其中存款户:{{ khinfo.ckkh | NumberFormat }},</span>
            <span slot="term">贷款户:{{ khinfo.dkkh | NumberFormat }}</span>
          </div>
        </chart-card>-->
        <chart-card :loading="loading" title="存款日平余额" :total="this.xnsj.ckrpye | NumberFormat" bgcolor="#66CCCC">
        <a-tooltip :title="dksjrqstr" slot="action">
        <a-icon type="info-circle-o" />
        </a-tooltip>
          <div >
            <trend :flag="zbinfo.bncyrpbs">
              <span slot="term">比年初</span>
              {{ this.xnsj.bncyrp | NumberFormat }}
            </trend>
          </div>
          <span slot="footer" >任务: {{ this.xnsj.ckrpyerw | NumberFormat }}<br/> <a-progress  status="active" style="width: 92%" :percent=" this.xnsj.ckrpwcl" size="small" /></span>
        </chart-card>

      </a-col>

      <a-col :sm="24" :md="12" :xl="4" :style="{ marginBottom: '12px' }">
        <chart-card :loading="loading" title="存款余额" :total=" this.xnsj.ckye | NumberFormat" bgcolor="#CCFF66">
          <a-tooltip  :title="zrckyestr" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <trend :flag="zbinfo.ckbs">
              <span slot="term">比年初</span>
              {{this.xnsj.bncckye | NumberFormat }}
            </trend>
          </div>
          <span slot="footer" >任务: {{this.xnsj.ckyerw | NumberFormat }}<br/> <a-progress  status="active" style="width: 92%" :percent="this.xnsj.ckyewcl" size="small" /></span>

        </chart-card>
      </a-col>

      <a-col :sm="24" :md="12" :xl="4" :style="{ marginBottom: '12px' }">
        <chart-card :loading="loading" title="贷款余额" :total=" this.xnsj.dkye | NumberFormat" bgcolor="#FF99CC">
          <a-tooltip :title="zrdkyestr" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <trend :flag=zbinfo.dkbs>
              <span slot="term">比年初</span>
              {{ this.xnsj.bncdkye | NumberFormat }}
            </trend>
          </div>
          <span slot="footer" >任务: {{ this.xnsj.dkyerw | NumberFormat }}<br/> <a-progress  status="active" style="width: 92%" :percent=" this.xnsj.dkyewcl" size="small" /></span>
        </chart-card>
      </a-col>

      <a-col :sm="24" :md="12" :xl="4" :style="{ marginBottom: '12px' }">
        <chart-card :loading="loading" title="本年新增存款户数" :total=" this.xnsj.bncxzckhs | NumberFormat" bgcolor="#FFCC00">
          <a-tooltip :title="xzckhsstr" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <!--<trend :flag="zbinfo.xzckbs">-->
              <span slot="term">新增存款笔数：</span>
              {{ this.xnsj.bncxzckbs | NumberFormat }}
            <!--</trend>-->
          </div>
          <span slot="footer" >任务: {{ this.xnsj.xzckhsrw | NumberFormat }}<br/> <a-progress  status="active" style="width: 92%" :percent=" this.xnsj.ckhsjzwcl" size="small" /></span>
        </chart-card>
      </a-col>

      <a-col :sm="24" :md="12" :xl="4" :style="{ marginBottom: '12px' }">
        <chart-card :loading="loading" title="本年新增贷款户数" :total=" this.xnsj.bncxzdkhs | NumberFormat" bgcolor="#FF6666">
          <a-tooltip :title="xzdkhsstr" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <!--<trend :flag="cdkyeinfo.lxbs">-->
              <span slot="term">新增贷款笔数：</span>
              {{ this.xnsj.bncxzdkbs | NumberFormat }}
            <!--</trend>-->
          </div>
          <span slot="footer" >任务: {{ this.xnsj.xzdkhsrw | NumberFormat }}<br/> <a-progress  status="active" style="width: 92%" :percent=" this.xnsj.dkhsjzwcl" size="small" /></span>

        </chart-card>
      </a-col>

      <a-col :sm="24" :md="12" :xl="4" :style="{ marginBottom: '12px' }">
        <chart-card :loading="loading" title="贷款不良率(%)" :total=" this.xnsj.dkbll | NumberFormat" bgcolor="#FF9933">
          <a-tooltip :title="zrdkbllstr" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <trend :flag="zbinfo.bllbs">
              <span slot="term">比年初</span>
              {{ this.xnsj.bncbldkl | NumberFormat }}
            </trend>
          </div>
          <span slot="footer" >任务: {{ this.xnsj.dkbllrw | NumberFormat }}<br/> <span>&nbsp;</span></span>
        </chart-card>
      </a-col>
    </a-row>

    <!--<a-card :loading="loading" :bordered="true" :body-style="{padding: '0'}">-->
      <!--<div class="salesCard">-->

    <a-row :gutter="16">
      <a-col :sm="24" :md="12" :xl="12" :style="{ marginBottom: '12px' }">
        <a-card :loading="loading" :bordered="true" :body-style="{padding: '0'}">
          <a-tabs defaultActiveKey="1" :tabBarGutter="0">
            <a-tab-pane tab="走访覆盖率" key="1" :forceRender="true">
              <zffgl :jgdmCode="this.jddmCode"/>
            </a-tab-pane>
            <a-tab-pane tab="建档覆盖率" key="2">
              <jdfgl :jdgmCode="this.jddmCode"/>
            </a-tab-pane>
            <a-tab-pane tab="授信户数" key="3">
              <sxjd :jdgmCode="this.jddmCode"/>
            </a-tab-pane>
            <a-tab-pane tab="用信户数" key="4">
              <yxjd :jdgmCode="this.jddmCode"/>
            </a-tab-pane>
            <a-tab-pane tab="用信额度" key="5">
              <yxed :jdgmCode="this.jddmCode"/>
            </a-tab-pane>
          </a-tabs>
        </a-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="12" :style="{ marginBottom: '12px' }">
        <a-card :loading="loading" :bordered="true" :body-style="{padding: '0'}">
          <a-tabs defaultActiveKey="1" :tabBarGutter="0">
            <a-tab-pane tab="存款占比" key="1">
              <ckzb :jdgmCode="this.jddmCode"/>
            </a-tab-pane>
            <a-tab-pane tab="贷款占比" key="2">
              <dkzb :jdgmCode="this.jddmCode"/>
            </a-tab-pane>
            <a-tab-pane tab="不良贷款占比" key="3">
              <bldkzb :jdgmCode="this.jddmCode"/>
            </a-tab-pane>
          </a-tabs>
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="16">
      <a-col :sm="24" :md="12" :xl="12" :style="{ marginBottom: '12px' }">
          <a-card :loading="loading" :bordered="true" :body-style="{padding: '0'}">
            <a-tabs defaultActiveKey="1" :tabBarGutter="0">
                <a-tab-pane tab="存款趋势分析" key="1" :forceRender="true">
                  <jynckqsfx :jdgmCode="this.jddmCode" title="近一年存款分析"/>
                </a-tab-pane>
                <a-tab-pane tab="定期活期分析" key="2">
                  <dqhqye :jdgmCode="this.jddmCode" title="余额"/>
                </a-tab-pane>
                <a-tab-pane tab="对公对私分析" key="3">
                  <dgdsye :jdgmCode="this.jddmCode" title="余额"/>
                </a-tab-pane>
                <a-tab-pane tab="存款年龄段分析" key="4">
                  <nlye :jdgmCode="this.jddmCode" title="余额"/>
                </a-tab-pane>
                <a-tab-pane tab="单户存款余额区间分析" key="5">
                  <ckqj :jdgmCode="this.jddmCode" title="余额"/>
                </a-tab-pane>
              </a-tabs>
          </a-card>
      </a-col>

      <a-col :sm="24" :md="12" :xl="12" :style="{ marginBottom: '12px' }">
        <a-card :loading="loading" :bordered="true" :body-style="{padding: '0'}">
          <a-tabs defaultActiveKey="1" :tabBarGutter="0">
            <a-tab-pane tab="贷款趋势分析" key="1">
              <jyndkqsfx :jdgmCode="this.jddmCode" title="近一年贷款分析" />
            </a-tab-pane>
            <a-tab-pane tab="个人贷款按年龄段分析" key="2">
              <nldkye :jdgmCode="this.jddmCode" title="余额" />
            </a-tab-pane>
            <a-tab-pane tab="贷款五级分类" key="3">
              <wjfldksj :jdgmCode="this.jddmCode" title="余额" />
            </a-tab-pane>
            <a-tab-pane tab="单户贷款余额区间分析" key="4">
              <dkqj :jdgmCode="this.jddmCode" title="余额" />
            </a-tab-pane>
          </a-tabs>
        </a-card>
      </a-col>
    </a-row>

    <a-card :loading="loading" :bordered="false" :body-style="{padding: '0'}">
      <a-tabs defaultActiveKey="1">
        <a-tab-pane loading="true" tab="支行存贷款排名" key="1">
          <a-row :gutter="8">
            <a-col :sm="24" :xl="12">
              <zhckwclpm title="支行存款排名TOP5" ></zhckwclpm>
            </a-col>
            <a-col :sm="24" :xl="12">
              <zhdkwclpm title="支行贷款排名TOP5" ></zhdkwclpm>
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script>
  import zffgl from './tbsj/zfjd_hz/zffgl'
  import jdfgl from './tbsj/zfjd_hz/jdfgl'
  import sxjd from './tbsj/zfjd_hz/sxjd'
  import yxjd from './tbsj/zfjd_hz/yxjd'
  import yxed from './tbsj/zfjd_hz/yxed'

  import ckzb from './tbsj/cdkywfx_hz/ckzb'
  import dkzb from './tbsj/cdkywfx_hz/dkzb'
  import bldkzb from './tbsj/cdkywfx_hz/bldkzb'

  import jynckqsfx from './tbsj/ckfx/jynckqsfx'
  import dqhqye from './tbsj/ckfx/dqhq_ye'
  import dgdsye from './tbsj/ckfx/dgds_ye'
  import nlye from './tbsj/ckfx/nl_ye'
  import ckqj from './tbsj/ckfx/ckqj'
  import dkqj from './tbsj/dkfx/dkqj'
  import jyndkqsfx from './tbsj/dkfx/jyndkqsfx'
  import wjfldksj from './tbsj/dkfx/wjfldksj'
  import nldkye from './tbsj/dkfx/nl_dkye'
  import ChartCard from '@/components/ChartCard'
  import ACol from "ant-design-vue/es/grid/Col"
  import zhckwclpm from './tbsj/ckfx/zhckwclpm'
  import zhdkwclpm from './tbsj/dkfx/zhdkwclpm'
  import HeadInfo from '@/components/tools/HeadInfo.vue'
  import Trend from '@/components/Trend'
  import { getKhCount,getLoginfo,getVisitInfo } from '@/api/api'
  import { getAction } from '../../api/manage'
  import { mapActions, mapGetters } from 'vuex'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'

  export default {
    name: "Analysis_yx",
    components: {
      zffgl, jdfgl, sxjd, yxjd, yxed,
      ckzb, dkzb, bldkzb,
      Trend, ACol, ChartCard,HeadInfo,
      dqhqye, dgdsye, nlye, jyndkqsfx,jynckqsfx,
      nldkye,ckqj,wjfldksj,dkqj,zhckwclpm,zhdkwclpm,JTreeSelect
    },
    data() {
      return {
        center: null,
        loading: true,
        isQhqx:true,
        loginfo:{},
        khinfo:{},
        cdkyeinfo:{},
        zbinfo:{},
        visitInfo:[],
        tabMode:'1',
        jddmCode:'1',
        zrckyestr:'',
        zrdkyestr:'',
        zrshlxstr:'',
        zrdkbllstr:'',
        dksjrqstr:'',
        xzdkhsstr:'',
        xzckhsstr:'',
        xnsj: {
          //本月有效建档人数
          jdrs: '5680人',
          //本月走访数
          zfhs: '3890人',
          //本月预授信户数
          sxhs: '2950',
          //本月预授信金额
          sxje: '8635万元',
          //本月用信户数
          yxhs: '1483户',
          //本月用信金额
          yxje: '1985万元',
          //存款月日平
          ckrpye:   '1,206,830万元',
          bncyrp:   '3,000万元',
          ckrpyerw: '1,500,000万元',
          ckrpwcl:  '80.50',
          //存款余额
          ckye:    '1,586,051万元',
          bncckye: '1,700万元',
          ckyerw:  '1,800,000万元',
          ckyewcl: '88.11',
          //贷款余额
          dkye:    '1,085,860万元',
          bncdkye: '623万元',
          dkyerw:  '1,200,000万元',
          dkyewcl: '90.50',
          //本年新增存款户数
          bncxzckhs: '18,950户',
          bncxzckbs: '132',
          xzckhsrw:  '20,000户',
          ckhsjzwcl: '94.75',
          //本年新增贷款户数
          bncxzdkhs: '2,895户',
          bncxzdkbs: '130',
          xzdkhsrw:  '3,500户',
          dkhsjzwcl: '82.71',
          //贷款不良率
          dkbll:    '2.67%',
          bncbldkl: '0.32',
          dkbllrw:  '2',
        },
      }
    },
    created() {
      setTimeout(() => {
        this.loading = !this.loading
      }, 1000)
      this.initLogInfo();
      this.jddmCode=this.orgCode()
      console.log(this.orgCode())
    },
    mounted() {
      let tabs = document.querySelectorAll(".ant-tabs-tab");
      tabs.forEach(item => {
        console.log(item)
      })
    },
    methods: {
      ...mapGetters(["nickname", "avatar","userInfo","orgCode"]),
      initLogInfo () {
        getAction("/userinfo/getHomePageInfo",{jgdm:this.jddmCode}).then(res=>{
          if(res.success){
            this.zbinfo = res.result;
            this.isQhqx=this.zbinfo.isQhqx;
            this.dksjrqstr="数据日期："+"2020-09-11"+"，年初存款日平余额为:"+"1,203,830万元";
            this.zrckyestr="年初存款余额为："+"1,584,351万元";
            this.zrdkyestr="年初贷款余额为："+"1,085,237万元";
            this.xzckhsstr="本年度任务："+"20,000户"+" | 完成比例:"+"94.75%";
            this.xzdkhsstr="本年度任务："+"3,500户"+" | 完成比例:"+"82.71%";
            this.zrdkbllstr="年初贷款不良率为："+"2.35%";
          }
        })
      },
      customerSearch(value) {
        console.log(value)
        this.$router.push({path:'/khgl/khglkhtycx/VkhglKhtycxList',query: {type:'1',queryValue:value}})
      },
      onChangev(value){
       console.log(value)
        this.jddmCode=value;
        this.loading = true;
        if (value!=1) {
          this.isQhqx=false;
        } else {
          this.isQhqx=true;
        }
        console.log(this.isQhqx)
        getAction("/userinfo/getHomePageInfo",{jgdm:value}).then(res=>{
          if(res.success){
            this.zbinfo = res.result;
            this.isQhqx=this.zbinfo.isQhqx;
            this.dksjrqstr="数据日期 : "+this.zbinfo.dksjrq  +",年初存款日平余额为:"+this.zbinfo.ncyrp;
            this.zrckyestr="年初存款余额为:"+this.zbinfo.ncckye;
            this.zrdkyestr="年初贷款余额为:"+this.zbinfo.ncdkye;
            this.xzckhsstr="本年度任务:"+this.zbinfo.xzckhsrw+";完成比例:"+this.zbinfo.ckhsjzwcl;
            this.xzdkhsstr="本年度任务:"+this.zbinfo.xzdkhsrw+";完成比例:"+this.zbinfo.dkhsjzwcl;
            this.zrdkbllstr="年初贷款不良率为:"+this.zbinfo.ncdkbll;
          }
          this.loading = false;
        })
      },
      jdrsclick() {
        if(this.isQhqx){
          this.$router.push({path: '/tjfx/jdsjmx/tjfx_khjdltj_qh/Tjfx_khjdltj_qhList', query: {}})
        }else{
          let curDate = new Date();
          let curMonth= { year : curDate.getFullYear(), month: curDate.getMonth() + 1, }
          let tjyf=curMonth.year+'-'+0+curMonth.month+'-01';
          this.$router.push({path: '/tjfx/jdsjmx/tjfx_khjdltj_zhmx/Tjfx_khjdltj_zhmxList', query: {sszh:this.jddmCode,tjyf:tjyf}})
        }
      },
      byzfsclick() {
        if(this.isQhqx){
          this.$router.push({path: '/tjfx/zfsjmx/qhsjmx/ZfsjmxQhList', query: {}})
        }else{
          let curDate = new Date();
          let curMonth= { year : curDate.getFullYear(), month: curDate.getMonth() + 1, }
          let tjyf=curMonth.year+'-'+0+curMonth.month+'-01';
          this.$router.push({path: '/tjfx/zfsjmx/zhsjmx/ZfsjmxZhList', query: {sszh:this.jddmCode,tjyf:tjyf}})
        }
      },
      yxsxclick() {
        if(this.isQhqx){
          this.$router.push({path: '/tjfx/sxsjmx/tjfx_khsxyxtj_qh/Tjfx_khsxyxtj_qhList', query: {}})
        }else{
          let curDate = new Date();
          let curMonth= { year : curDate.getFullYear(), month: curDate.getMonth() + 1, }
          let tjyf=curMonth.year+'-'+0+curMonth.month+'-01';
          this.$router.push({path: '/tjfx/sxsjmx/tjfx_khsxyxtj_zhmx/Tjfx_khsxyxtj_zhmxList', query: {sszh:this.jddmCode,tjyf:tjyf}})
        }
      },
    }
  }
</script>

<style lang="less" scoped>
  .circle-cust{
    position: relative;
    top: 28px;
    left: -100%;
  }
  .extra-wrapper {
    line-height: 55px;
    padding-right: 24px;

    .extra-item {
      display: inline-block;
      margin-right: 24px;

      a {
        margin-left: 24px;
      }
    }
  }


  /* 首页访问量统计 */
  .head-info {
    position: relative;
    text-align: left;
    padding: 0 32px 0 0;
    min-width: 125px;

    &.center {
      text-align: center;
      padding: 0 32px;
    }

    span {
      color: rgba(0, 0, 0, .45);
      display: inline-block;
      font-size: .95rem;
      line-height: 42px;
      margin-bottom: 4px;
    }
    p {
      line-height: 42px;
      margin: 0;
      a {
        font-weight: 600;
        font-size: 1rem;
      }
    }
  }
</style>