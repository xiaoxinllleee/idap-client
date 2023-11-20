<template>
  <div class="page-header-index-wide">
    <a-row :gutter="0">
      <a-card :style="{ marginBottom: '12px', backgroundColor: 'dark'}" :bodyStyle="{ backgroundColor: '#33CC99'}">
        <a-col :span="6" :style="{paddingTop: '2px'}">
          <j-tree-select  @change="onChangev" style="width: 80%" placeholder="请选择支行"
                          dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                          :sszh="true"  :treeDefaultExpandAll="true" :filterTreeNode="true" :isAll="true"/>
          <a-input-search  :style="{paddingTop: '5px'}" placeholder="输入姓名/证件号码/户籍编号查询" @search="customerSearch"  style="width: 80%;" enterButton />
        </a-col>
        <!--<a-col :span="3">
          <a href="#" @click="jdrsclick"> <a-statistic  @click="jdrsclick"  title="本月有效建档人数" :value="zbinfo.jdrs"/></a>
        </a-col>-->
        <a-col :span="3">
          <a href="#" @click="byzfsclick"><a-statistic title="本月走访数" :value="zbinfo.zfhs"  /></a>
        </a-col>
        <a href="#" @click="yxsxclick">
          <a-col :span="3">
            <a-statistic title="本月预授信户数" :value="zbinfo.sxhs" />
          </a-col>
          <a-col :span="3">
            <a-statistic title="本月预授信金额" :value="zbinfo.sxje | NumberFormat"/>
          </a-col>
          <a-col :span="3">
            <a-statistic title="本月用信户数" :value="zbinfo.yxhs" />
          </a-col>
          <a-col :span="3">
            <a-statistic title="本月用信金额" :value="zbinfo.yxje | NumberFormat"/>
          </a-col>
        </a>
      </a-card>
    </a-row>

    <a-row :gutter="16">
      <a-col :sm="24" :md="12" :xl="4" :style="{ marginBottom: '12px'}">
        <chart-card :loading="loading" title="存款日平余额" :total="zbinfo.ckrpye | NumberFormat" bgcolor="#66CCCC">
          <a-tooltip :title="dksjrqstr" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div >
            <trend :flag="zbinfo.bncyrpbs">
              <span slot="term">比年初</span>{{zbinfo.bncyrp | NumberFormat }}
            </trend>
          </div>
          <span slot="footer" >
            任务: {{zbinfo.ckrpyerw | NumberFormat }}<br/>
            <a-progress  status="active" style="width: 92%" :percent="Number(this.zbinfo.ckrpwcl)" size="small" />
          </span>
        </chart-card>
      </a-col>

      <a-col :sm="24" :md="12" :xl="4" :style="{ marginBottom: '12px' }">
        <chart-card :loading="loading" title="存款余额" :total="zbinfo.ckye | NumberFormat" bgcolor="#CCFF66">
          <a-tooltip  :title="zrckyestr" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <trend :flag="zbinfo.ckbs">
              <span slot="term">比年初</span>
              {{zbinfo.bncckye | NumberFormat }}
            </trend>
          </div>
          <span slot="footer" >任务: {{zbinfo.ckyerw | NumberFormat }}<br/>
            <a-progress  status="active" style="width: 92%" :percent="Number(this.zbinfo.ckyewcl)" size="small" />
          </span>
        </chart-card>
      </a-col>

      <a-col :sm="24" :md="12" :xl="4" :style="{ marginBottom: '12px' }">
        <chart-card :loading="loading" title="贷款余额" :total="zbinfo.dkye | NumberFormat" bgcolor="#FF99CC">
          <a-tooltip :title="zrdkyestr" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <trend :flag=zbinfo.dkbs>
              <span slot="term">比年初</span>
              {{ zbinfo.bncdkye | NumberFormat }}
            </trend>
          </div>
          <span slot="footer" >任务: {{zbinfo.dkyerw | NumberFormat }}<br/>
            <a-progress  status="active" style="width: 92%" :percent="Number(this.zbinfo.dkyewcl)" size="small" />
          </span>
        </chart-card>
      </a-col>

      <a-col :sm="24" :md="12" :xl="4" :style="{ marginBottom: '12px' }">
        <chart-card :loading="loading" title="本年新增存款户数" :total="zbinfo.bncxzckhs | NumberFormat" bgcolor="#FFCC00">
          <a-tooltip :title="xzckhsstr" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <!--<trend :flag="zbinfo.xzckbs">-->
              <span slot="term">新增存款笔数：</span>
              {{ zbinfo.bncxzckbs | NumberFormat }}
            <!--</trend>-->
          </div>
          <span slot="footer" >任务: {{zbinfo.xzckhsrw | NumberFormat }}<br/> <a-progress  status="active" style="width: 92%" :percent="Number(this.zbinfo.ckhsjzwcl)" size="small" /></span>
        </chart-card>
      </a-col>

      <a-col :sm="24" :md="12" :xl="4" :style="{ marginBottom: '12px' }">
        <chart-card :loading="loading" title="本年新增贷款户数" :total="zbinfo.bncxzdkhs | NumberFormat" bgcolor="#FF6666">
          <a-tooltip :title="xzdkhsstr" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <!--<trend :flag="cdkyeinfo.lxbs">-->
              <span slot="term">新增贷款笔数：</span>
              {{ zbinfo.bncxzdkbs | NumberFormat }}
            <!--</trend>-->
          </div>
          <span slot="footer" >任务: {{zbinfo.xzdkhsrw | NumberFormat }}<br/> <a-progress  status="active" style="width: 92%" :percent="Number(this.zbinfo.dkhsjzwcl)" size="small" /></span>

        </chart-card>
      </a-col>

      <a-col :sm="24" :md="12" :xl="4" :style="{ marginBottom: '12px' }">
        <chart-card :loading="loading" title="贷款不良率" :total="zbinfo.dkbll | NumberFormat" bgcolor="#FF9933">
          <a-tooltip :title="zrdkbllstr" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <trend :flag="zbinfo.bllbs">
              <span slot="term">比年初</span>
              {{ zbinfo.bncbldkl | NumberFormat }}
            </trend>
          </div>
          <span slot="footer" >
            任务: {{zbinfo.dkbllrw | NumberFormat }}<br/>
            <span>&nbsp;</span>
          </span>
        </chart-card>
      </a-col>
    </a-row>

    <a-row :gutter="16">
      <a-col :sm="24" :md="12" :xl="12" :style="{ marginBottom: '12px' }">
        <a-card :loading="loading" :bordered="true" :body-style="{padding: '0'}">
          <a-tabs defaultActiveKey="1" :tabBarGutter="0">
            <a-tab-pane tab="存款趋势分析" key="1" :forceRender="true">
              <jynckqsfx :jdgmCode="this.jddmCode"  title="近一年存款分析" />
            </a-tab-pane>

            <a-tab-pane tab="定期活期分析" key="2">
              <dqhqye :jdgmCode="this.jddmCode" title="定期活期"/>
            </a-tab-pane>

            <a-tab-pane tab="对公对私分析" key="3">
              <dgdsye  :jdgmCode="this.jddmCode" title="对公对私" />
            </a-tab-pane>

            <a-tab-pane tab="存款年龄段分析" key="4">
              <nlye :jdgmCode="this.jddmCode"  title="存款年龄段" />
            </a-tab-pane>

            <a-tab-pane tab="单户存款余额区间分析" key="5">
              <ckqj :jdgmCode="this.jddmCode"  title="单户存款余额区间" />
            </a-tab-pane>
          </a-tabs>
        </a-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="12" :style="{ marginBottom: '12px' }">
        <a-card :loading="loading" :bordered="true" :body-style="{padding: '0'}">
          <a-tabs defaultActiveKey="1" :tabBarGutter="0">
            <a-tab-pane tab="贷款趋势分析" key="1">
              <jyndkqsfx  :jdgmCode="this.jddmCode"  title="近一年贷款分析" />
            </a-tab-pane>
            <a-tab-pane tab="个人贷款按年龄段分析" key="2">
              <nldkye :jdgmCode="this.jddmCode"  title="个人贷款按年龄段" />
            </a-tab-pane>
            <a-tab-pane tab="贷款五级分类" key="3">
              <wjfldksj  :jdgmCode="this.jddmCode"  title="贷款五级分类" />
            </a-tab-pane>
            <a-tab-pane tab="单户贷款余额区间分析" key="4">
              <dkqj :jdgmCode="this.jddmCode" title="单户贷款余额区间" />
            </a-tab-pane>
          </a-tabs>
        </a-card>
      </a-col>
    </a-row>

    <a-card :loading="loading" :bordered="false" :body-style="{padding: '0'}">
      <!-- Radis 信息实时监控 -->
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
      Trend, ACol, ChartCard,HeadInfo,
      dqhqye, dgdsye, nlye, jyndkqsfx,jynckqsfx,
      nldkye,ckqj,wjfldksj,dkqj,zhckwclpm,zhdkwclpm,JTreeSelect
    },
    data() {
      return {
        jddmCode: '1',
        loading: true,
        center: null,
        loginfo: {},
        khinfo: {},
        cdkyeinfo: {},
        visitInfo: [],
        zrckyestr: '',
        zrdkyestr: '',
        zrshlxstr: '',
        zrdkbllstr: '',
        dksjrqstr: '',
        xzdkhsstr: '',
        xzckhsstr: '',
        tabMode: '1',
        zbinfo: {},
        isQhqx: true,
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
            this.dksjrqstr="数据日期 : "+this.zbinfo.dksjrq  +",年初存款日平余额为:"+this.zbinfo.ncyrp;
            this.zrckyestr="年初存款余额为:"+this.zbinfo.ncckye;
            this.zrdkyestr="年初贷款余额为:"+this.zbinfo.ncdkye;
            this.xzckhsstr="本年度任务:"+this.zbinfo.xzckhsrw+";完成比例:"+this.zbinfo.ckhsjzwcl;
            this.xzdkhsstr="本年度任务:"+this.zbinfo.xzdkhsrw+";完成比例:"+this.zbinfo.dkhsjzwcl;
            this.zrdkbllstr="年初贷款不良率为:"+this.zbinfo.ncdkbll;
          }
        })
      },
      customerSearch(value) {
        console.log(value)
        this.$router.push({path:'/khgl/khglkhtycx/VKhglKhtycxList',query: {type:'1',queryValue:value}})
      },
      onChangev(value){
       console.log(value)
        this.jddmCode=value;
        this.loading = true;
        if(value!=1){
          this.isQhqx=false;
        }else{
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
      jdrsclick(){
        if(this.isQhqx){
          this.$router.push({path: '/tjfx/jdsjmx/tjfx_khjdltj_qh/Tjfx_khjdltj_qhList', query: {}})
        }else{
          let curDate = new Date();
          let curMonth= { year : curDate.getFullYear(), month: curDate.getMonth() + 1, }
          let tjyf=curMonth.year+'-'+0+curMonth.month+'-01';
          this.$router.push({path: '/tjfx/jdsjmx/tjfx_khjdltj_zhmx/Tjfx_khjdltj_zhmxList', query: {sszh:this.jddmCode,tjyf:tjyf}})
        }
      },
      byzfsclick(){
        if(this.isQhqx){
          this.$router.push({path: '/tjfx/zfsjmx/qhsjmx/ZfsjmxQhList', query: {}})
        }else{
          let curDate = new Date();
          let curMonth= { year : curDate.getFullYear(), month: curDate.getMonth() + 1, }
          let tjyf=curMonth.year+'-'+0+curMonth.month+'-01';
          this.$router.push({path: '/tjfx/zfsjmx/zhsjmx/ZfsjmxZhList', query: {sszh:this.jddmCode,tjyf:tjyf}})
        }
      },
      yxsxclick(){
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