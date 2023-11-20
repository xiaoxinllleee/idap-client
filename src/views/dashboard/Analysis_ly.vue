<template>
  <div class="page-header-index-wide">
<!--    <a-row :gutter="0">-->
<!--      <a-card :style="{ marginBottom: '12px', backgroundColor: 'dark'}" :bodyStyle="{ backgroundColor: '#33CC99'}">-->
<!--        <a-col :span="6" :style="{paddingTop: '15px'}">-->
<!--            <a-input-search placeholder="输入姓名/证件号码/户籍编号查询" @search="customerSearch"  style="width: 80%;" enterButton />-->
<!--        </a-col>-->
<!--         <a-col :span="3">-->
<!--           <a href="#" @click="jdrsclick"> <a-statistic  @click="jdrsclick"  title="本月有效建档人数" :value="zbinfo.jdrs"/></a>-->
<!--         </a-col>-->
<!--        <a-col :span="3">-->
<!--          <a href="#" @click="byzfsclick"><a-statistic title="本月走访数" :value="zbinfo.zfhs"  /></a>-->
<!--        </a-col>-->
<!--       <a href="#" @click="yxsxclick">-->
<!--        <a-col :span="3">-->
<!--          <a-statistic title="本月预授信户数" :value="zbinfo.sxhs" />-->
<!--        </a-col>-->
<!--        <a-col :span="3">-->
<!--          <a-statistic title="本月预授信金额" :value="zbinfo.sxje | NumberFormat"/>-->
<!--        </a-col>-->
<!--        <a-col :span="3">-->
<!--          <a-statistic title="本月用信户数" :value="zbinfo.yxhs" />-->
<!--        </a-col>-->
<!--        <a-col :span="3">-->
<!--          <a-statistic title="本月用信金额" :value="zbinfo.yxje | NumberFormat"/>-->
<!--        </a-col>-->
<!--       </a>-->
<!--    </a-card>-->

<!--    </a-row>-->

    <a-row :gutter="16">
      <a-col :sm="24" :md="12" :xl="4" :style="{ marginBottom: '12px'}">
        <!--<chart-card :loading="loading" title="有效存贷款客户数" :total="khinfo.zkh | NumberFormat" bgcolor="#66CCCC">-->
          <!--<a-tooltip :title="dksjrqstr" slot="action">-->
            <!--<a-icon type="info-circle-o" />-->
          <!--</a-tooltip>-->
          <!--<div>-->
            <!--<span slot="term">其中存款户:{{ khinfo.ckkh | NumberFormat }},</span>-->
            <!--<span slot="term">贷款户:{{ khinfo.dkkh | NumberFormat }}</span>-->
          <!--</div>-->
        <!--</chart-card>-->
        <chart-card :loading="loading" title="存款日平余额" :total="zbinfo.ckrpye | NumberFormat" bgcolor="#66CCCC">
        <a-tooltip :title="dksjrqstr" slot="action">
        <a-icon type="info-circle-o" />
        </a-tooltip>
        <div>
        <span slot="term">个人:{{ zbinfo.grckrpye | NumberFormat }},</span>
        <span slot="term">对公:{{ zbinfo.dgckrpye | NumberFormat }}</span>
        </div>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="4" :style="{ marginBottom: '12px' }">
        <chart-card :loading="loading" title="存款余额" :total="zbinfo.ckye | NumberFormat" bgcolor="#CCFF66">
          <a-tooltip  :title="zrckyestr" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <trend :flag="zbinfo.ckbs">
              <span slot="term">比昨日</span>
              {{zbinfo.bzrckye | NumberFormat }}
            </trend>
          </div>
        </chart-card>
      </a-col>

      <a-col :sm="24" :md="12" :xl="4" :style="{ marginBottom: '12px' }">
        <chart-card :loading="loading" title="贷款余额" :total="zbinfo.dkye | NumberFormat" bgcolor="#FF99CC">
          <a-tooltip :title="zrdkyestr" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <trend :flag=zbinfo.dkbs>
              <span slot="term">比昨日</span>
              {{ zbinfo.bzrdkye | NumberFormat }}
            </trend>
          </div>
        </chart-card>
      </a-col>

      <a-col :sm="24" :md="12" :xl="4" :style="{ marginBottom: '12px' }">
        <chart-card :loading="loading" title="本月新增存款户数" :total="zbinfo.xzckhs | NumberFormat" bgcolor="#FFCC00">
          <!--<a-tooltip :title="zrshlxstr" slot="action">-->
            <!--<a-icon type="info-circle-o" />-->
          <!--</a-tooltip>-->
          <div>
            <!--<trend :flag="zbinfo.xzckbs">-->
              <span slot="term">新增存款笔数：</span>
              {{ zbinfo.xzckbs | NumberFormat }}
            <!--</trend>-->
          </div>
        </chart-card>
      </a-col>

      <a-col :sm="24" :md="12" :xl="4" :style="{ marginBottom: '12px' }">
        <chart-card :loading="loading" title="本月新增贷款户数" :total="zbinfo.xzdkhs | NumberFormat" bgcolor="#FF6666">
          <!--<a-tooltip :title="zrshlxstr" slot="action">-->
            <!--<a-icon type="info-circle-o" />-->
          <!--</a-tooltip>-->
          <div>
            <!--<trend :flag="cdkyeinfo.lxbs">-->
              <span slot="term">新增贷款笔数：</span>
              {{ zbinfo.xzdkbs | NumberFormat }}
            <!--</trend>-->
          </div>
        </chart-card>
      </a-col>

      <a-col :sm="24" :md="12" :xl="4" :style="{ marginBottom: '12px' }">
        <chart-card :loading="loading" title="贷款不良率" :total="zbinfo.dkbll | NumberFormat" bgcolor="#FF9933">
          <a-tooltip :title="zrdkbllstr" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <trend :flag="zbinfo.bllbs">
              <span slot="term">比上月</span>
              {{ zbinfo.bsybldkl | NumberFormat }}
            </trend>
          </div>
        </chart-card>
      </a-col>
    </a-row>

    <!--<a-card :loading="loading" :bordered="true" :body-style="{padding: '0'}">-->
      <!--<div class="salesCard">-->

        <a-row :gutter="16">
          <a-col :sm="24" :md="12" :xl="12" :style="{ marginBottom: '12px' }">
            <a-card :loading="loading" :bordered="true" :body-style="{padding: '0'}">
            <a-tabs defaultActiveKey="1" :tabBarGutter="0">
              <a-tab-pane tab="存款趋势分析" key="1" :forceRender="true">
                <jynckqsfx title="近一年存款分析" />
              </a-tab-pane>

              <a-tab-pane tab="定期活期分析" key="2">
                <dqhqye title="余额" />
                <!-- <a-row :gutter="8">
                   <a-col :sm="24" :xl="12">
                     <dqhqye title="余额" />
                   </a-col>
                   <a-col :sm="24" :xl="12">
                     <dqhqhs title="户数" />
                   </a-col>
                 </a-row>-->
              </a-tab-pane>

              <a-tab-pane tab="对公对私分析" key="3">
                <dgdsye title="余额" />
                <!-- <a-row :gutter="8">
                   <a-col :sm="24" :xl="12">
                     <dgdsye title="余额" />
                   </a-col>
                   <a-col :sm="24" :xl="12">
                     <dgdshs title="户数" />
                   </a-col>
                 </a-row>-->
              </a-tab-pane>

              <a-tab-pane tab="存款年龄段分析" key="4">
                <nlye title="余额" />
                <!--<a-row :gutter="8">
                  <a-col :sm="24" :xl="12">
                    <nlye title="余额" />
                  </a-col>
                  <a-col :sm="24" :xl="12">
                    <nlhs title="户数" />
                  </a-col>
                </a-row>-->
              </a-tab-pane>
              <a-tab-pane tab="单户存款余额区间分析" key="5">
                <ckqj title="余额" />
              </a-tab-pane>
            </a-tabs>
            </a-card>
          </a-col>
          <a-col :sm="24" :md="12" :xl="12" :style="{ marginBottom: '12px' }">
            <a-card :loading="loading" :bordered="true" :body-style="{padding: '0'}">
            <a-tabs defaultActiveKey="1" :tabBarGutter="0">
              <a-tab-pane tab="贷款趋势分析" key="1">
                <jyndkqsfx title="近一年贷款分析" />
              </a-tab-pane>
              <a-tab-pane tab="个人贷款按年龄段分析" key="2">
                <nldkye title="余额" />
              </a-tab-pane>
              <a-tab-pane tab="贷款五级分类" key="3">
                <wjfldksj title="余额" />
              </a-tab-pane>
              <a-tab-pane tab="单户贷款余额区间分析" key="4">
                <dkqj title="余额" />
              </a-tab-pane>
            </a-tabs>
            </a-card>
          </a-col>
        </a-row>
      <!--</div>-->
    <!--</a-card>-->

        <!--<a-card :loading="loading" :bordered="false" :body-style="{padding: '0'}">-->
          <!--<div class="salesCard">-->


        <!--<a-radio-group v-model="tabMode" :style="{ marginBottom: '8px' }">-->
          <!--<a-radio-button value="1">存款分析</a-radio-button>-->
          <!--<a-radio-button value="2">贷款分析</a-radio-button>-->
        <!--</a-radio-group>-->
        <!--&lt;!&ndash;<a-tabs v-model="tabMode">&ndash;&gt;-->
         <!--&lt;!&ndash; <a-tab-pane loading="true" tab="存款客户分析" key="1">-->
            <!--<a-row :gutter="24">-->
              <!--<a-col :sm="24" :md="18" :xl="9" :style="{ marginBottom: '24px' }">-->
                <!--<dsdg title="客户类型图"  />-->
              <!--</a-col>-->
              <!--<a-col :sm="24" :md="18" :xl="9" :style="{ marginBottom: '24px' }">-->
                <!--<nlfl title="分年龄端客户图" />-->
              <!--</a-col>-->
            <!--</a-row>-->
          <!--</a-tab-pane>&ndash;&gt;-->
          <!--&lt;!&ndash;<a-tab-pane  key="1">&ndash;&gt;-->
                <!--<a-tabs defaultActiveKey="1" v-show="tabMode=='1'">-->
                  <!--<a-tab-pane tab="存款趋势分析" key="1" :forceRender="true">-->
                    <!--<jynckqsfx title="近一年存款分析" />-->
                  <!--</a-tab-pane>-->

                  <!--<a-tab-pane tab="定期活期分析" key="2">-->
                    <!--<dqhqye title="余额" />-->
                    <!--&lt;!&ndash; <a-row :gutter="8">-->
                       <!--<a-col :sm="24" :xl="12">-->
                         <!--<dqhqye title="余额" />-->
                       <!--</a-col>-->
                       <!--<a-col :sm="24" :xl="12">-->
                         <!--<dqhqhs title="户数" />-->
                       <!--</a-col>-->
                     <!--</a-row>&ndash;&gt;-->
                  <!--</a-tab-pane>-->

                  <!--<a-tab-pane tab="对公对私分析" key="3">-->
                    <!--<dgdsye title="余额" />-->
                    <!--&lt;!&ndash; <a-row :gutter="8">-->
                       <!--<a-col :sm="24" :xl="12">-->
                         <!--<dgdsye title="余额" />-->
                       <!--</a-col>-->
                       <!--<a-col :sm="24" :xl="12">-->
                         <!--<dgdshs title="户数" />-->
                       <!--</a-col>-->
                     <!--</a-row>&ndash;&gt;-->
                  <!--</a-tab-pane>-->

                  <!--<a-tab-pane tab="个人存款按年龄段分析" key="4">-->
                    <!--<nlye title="余额" />-->
                    <!--&lt;!&ndash;<a-row :gutter="8">-->
                      <!--<a-col :sm="24" :xl="12">-->
                        <!--<nlye title="余额" />-->
                      <!--</a-col>-->
                      <!--<a-col :sm="24" :xl="12">-->
                        <!--<nlhs title="户数" />-->
                      <!--</a-col>-->
                    <!--</a-row>&ndash;&gt;-->
                  <!--</a-tab-pane>-->
                  <!--<a-tab-pane tab="单户存款余额区间分析" key="5">-->
                    <!--<ckqj title="余额" />-->
                  <!--</a-tab-pane>-->
                <!--</a-tabs>-->
          <!--&lt;!&ndash;</a-tab-pane>&ndash;&gt;-->
          <!--&lt;!&ndash;<a-tab-pane  key="2">&ndash;&gt;-->
                <!--<a-tabs defaultActiveKey="1" v-show="tabMode=='2'">-->
                  <!--<a-tab-pane tab="贷款趋势分析" key="1">-->
                    <!--<jyndkqsfx title="近一年贷款分析" />-->
                  <!--</a-tab-pane>-->
                  <!--<a-tab-pane tab="个人贷款按年龄段分析" key="2">-->
                    <!--<nldkye title="余额" />-->
                  <!--</a-tab-pane>-->
                  <!--<a-tab-pane tab="贷款五级分类" key="3">-->
                    <!--<wjfldksj title="余额" />-->
                  <!--</a-tab-pane>-->
                  <!--<a-tab-pane tab="单户贷款余额区间分析" key="4">-->
                    <!--<dkqj title="余额" />-->
                  <!--</a-tab-pane>-->
                <!--</a-tabs>-->
          <!--&lt;!&ndash;</a-tab-pane>&ndash;&gt;-->
        <!--&lt;!&ndash;</a-tabs>&ndash;&gt;-->
      <!--</div>-->
    <!--</a-card>-->

    <a-card :loading="loading" :bordered="false" :body-style="{padding: '0'}">
      <!-- Radis 信息实时监控 -->
      <a-tabs defaultActiveKey="1">
        <a-tab-pane loading="true" tab="支行存贷款排名" key="1">
          <a-row :gutter="8">
            <a-col :sm="24" :xl="12">
              <zhckpm title="支行存款排名TOP5" ></zhckpm>
            </a-col>
            <a-col :sm="24" :xl="12">
              <zhdkpm title="支行贷款排名TOP5" ></zhdkpm>
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
  import zhckpm from './tbsj/ckfx/zhckpm'
  import zhdkpm from './tbsj/dkfx/zhdkpm'
  import HeadInfo from '@/components/tools/HeadInfo.vue'
  import Trend from '@/components/Trend'
  import { getKhCount,getLoginfo,getVisitInfo } from '@/api/api'
  import { getAction } from '../../api/manage'
  import { mapActions, mapGetters } from 'vuex'


  export default {
    name: "Analysis",
    components: {
      Trend, ACol, ChartCard,HeadInfo,
      dqhqye, dgdsye, nlye, jyndkqsfx,jynckqsfx,
      nldkye,ckqj,wjfldksj,dkqj,zhckpm,zhdkpm
    },
    data() {
      return {
        loading: true,
        center: null,
        loginfo:{},
        khinfo:{},
        cdkyeinfo:{},
        visitInfo:[],
        zrckyestr:'',
        zrdkyestr:'',
        zrshlxstr:'',
        zrdkbllstr:'',
        dksjrqstr:'',
        tabMode:'1',
        zbinfo:{},
        isQhqx:true,
      }
    },
    created() {
      setTimeout(() => {
        this.loading = !this.loading
      }, 1000)
      this.initLogInfo();
    },
    mounted() {
      let tabs = document.querySelectorAll(".ant-tabs-tab");
      tabs.forEach(item => {
        console.log(item)
      })
    },
    methods: {
      ...mapGetters(["nickname", "avatar","userInfo","orgCode"]),
      // test() {
      //   alert(123)
      // },
      initLogInfo () {
        getLoginfo(null).then((res)=>{
          if(res.success){
            Object.keys(res.result).forEach(key=>{
              res.result[key] =res.result[key]+""
            })
            this.loginfo = res.result;
          }
        })
        // getAction("/sys/khCount",{jgdm:this.orgCode()}).then(res=>{
        //   if(res.success){
        //     this.khinfo = res.result[0];
        //   }
        // }),
        // getAction("/sys/getcdkye",{jgdm:this.orgCode()}).then(res=>{
        //     if(res.success){
        //       this.cdkyeinfo = res.result;
        //       this.zrckyestr="昨日存款余额为:"+this.cdkyeinfo.zrckye;
        //       this.zrdkyestr="昨日贷款余额为:"+this.cdkyeinfo.zrdkye;
        //       this.zrshlxstr="昨日收回利息为:"+this.cdkyeinfo.zrshlx;
        //       this.dksjrqstr="数据日期 : "+this.cdkyeinfo.dksjrq ;
        //     }
        // }),
        getVisitInfo().then(res=>{
          if(res.success){
            this.visitInfo = res.result;
          }
        }),
        getAction("/userinfo/getHomePageInfo",{jgdm:this.orgCode()}).then(res=>{
          if(res.success){
            this.zbinfo = res.result;
            this.isQhqx=this.zbinfo.isQhqx;
            this.zrckyestr="昨日存款余额为:"+this.zbinfo.zrckye;
            this.zrdkyestr="昨日贷款余额为:"+this.zbinfo.zrdkye;
            this.zrdkbllstr="上月贷款不良率为:"+this.zbinfo.sydkbll;
            this.dksjrqstr="数据日期 : "+this.zbinfo.dksjrq ;
          }
        })
      },
      customerSearch(value) {
        console.log(value)
        this.$router.push({path:'/khgl/khglkhtycx/VkhglKhtycxList',query: {type:'1',queryValue:value}})
      },

      jdrsclick(){
        if(this.isQhqx){
          this.$router.push({path: '/tjfx/jdsjmx/tjfx_khjdltj_qh/Tjfx_khjdltj_qhList', query: {}})
        }else{
          let curDate = new Date();
          let curMonth= { year : curDate.getFullYear(), month: curDate.getMonth() + 1, }
          let tjyf=curMonth.year+'-'+0+curMonth.month+'-01';
          this.$router.push({path: '/tjfx/jdsjmx/tjfx_khjdltj_zhmx/Tjfx_khjdltj_zhmxList', query: {sszh:this.orgCode(),tjyf:tjyf}})
        }
      },
      byzfsclick(){
        if(this.isQhqx){
          this.$router.push({path: '/tjfx/zfsjmx/qhsjmx/ZfsjmxQhList', query: {}})
        }else{
          let curDate = new Date();
          let curMonth= { year : curDate.getFullYear(), month: curDate.getMonth() + 1, }
          let tjyf=curMonth.year+'-'+0+curMonth.month+'-01';
          this.$router.push({path: '/tjfx/zfsjmx/zhsjmx/ZfsjmxZhList', query: {sszh:this.orgCode(),tjyf:tjyf}})
        }
      },
      yxsxclick(){
        if(this.isQhqx){
          this.$router.push({path: '/tjfx/sxsjmx/tjfx_khsxyxtj_qh/Tjfx_khsxyxtj_qhList', query: {}})
        }else{
          let curDate = new Date();
          let curMonth= { year : curDate.getFullYear(), month: curDate.getMonth() + 1, }
          let tjyf=curMonth.year+'-'+0+curMonth.month+'-01';
          this.$router.push({path: '/tjfx/sxsjmx/tjfx_khsxyxtj_zhmx/Tjfx_khsxyxtj_zhmxList', query: {sszh:this.orgCode(),tjyf:tjyf}})
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