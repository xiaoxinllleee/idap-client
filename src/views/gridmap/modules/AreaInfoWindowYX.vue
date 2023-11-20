<template>
  <!-- 信息窗体-->

  <bm-info-window style="height: 60vh;overflow-y:auto;" :position="infoWindow.position" :show="infoWindow.show" :title="title" @close="infoWindowClose" @open="infoWindowOpen" :width="0" :height="0">
    <div class="info-window" >
      <a-collapse v-show="!iscun" v-model="activeKey">
        <a-collapse-panel key="1" header="基本信息">
          <a-descriptions :column="3"  size="small" bordered>
            <a-descriptions-item label="网格编号">
              {{model.wgbh}}
            </a-descriptions-item>
            <a-descriptions-item label="网格名称">
              {{model.wgmc}}
            </a-descriptions-item>
            <a-descriptions-item label="总户籍">
              {{model.zhs}}
            </a-descriptions-item>
            <a-descriptions-item label="总人口">
              {{model.zrs}}
            </a-descriptions-item>
            <a-descriptions-item label="我行客户数/占比">
              {{model.clkhs}} / {{clkhszb}}
            </a-descriptions-item>
            <a-descriptions-item label="潜在客户数/占比">
              {{model.qzkhs}} / {{qzkhszb}}
            </a-descriptions-item>
          </a-descriptions>
        </a-collapse-panel>
        <a-collapse-panel  key="2" header="业务情况" >
          <a-descriptions :column="3" size="small" bordered>
            <a-descriptions-item label="存款客户数">
              {{model.ckkhs}}
            </a-descriptions-item>
            <a-descriptions-item label="存款总额">
              {{model.ckye}}
            </a-descriptions-item>
            <a-descriptions-item label="贷款客户数">
              {{model.dkkhs}}
            </a-descriptions-item>

            <a-descriptions-item label="贷款覆盖面">
              {{model.dkfgm}}
            </a-descriptions-item>


            <a-descriptions-item label="贷款总额">
              {{model.dkye}}
            </a-descriptions-item>

            <a-descriptions-item label="贷款无余额户数">
              {{model.dkwyekhs}}
            </a-descriptions-item>
            <a-descriptions-item label="合同金额">
              {{model.dkje}}
            </a-descriptions-item>

            <a-descriptions-item label="资金归行率">
              {{zjghl}}
            </a-descriptions-item>

            <a-descriptions-item label="我行社保卡">
              {{model.sbkkhs}}
            </a-descriptions-item>
            <a-descriptions-item label="外部社保卡">
              {{model.wbsbk}}
            </a-descriptions-item>

            <a-descriptions-item label="表内不良户数">
              {{model.bnbldkhs}}
            </a-descriptions-item>

            <a-descriptions-item label="支行内表内不良户数">
              {{model.zhnbnbldkhs}}
            </a-descriptions-item>

            <a-descriptions-item label="支行外表内不良户数">
              {{model.zhwbnbldkhs}}
            </a-descriptions-item>



            <a-descriptions-item label="表内不良余额">
              {{model.bnbldkye}}
            </a-descriptions-item>

            <a-descriptions-item label="支行内表内不良余额">
              {{model.zhnbnbldkye}}
            </a-descriptions-item>

            <a-descriptions-item label="支行外表内不良余额">
              {{model.zhwbnbldkye}}
            </a-descriptions-item>




            <a-descriptions-item label="表外不良户数">
              {{model.bwbldkhs}}
            </a-descriptions-item>


            <a-descriptions-item label="支行内表外不良户数">
              {{model.zhnbwbldkhs}}
            </a-descriptions-item>

            <a-descriptions-item label="支行外表外不良户数">
              {{model.zhwbwbldkhs}}
            </a-descriptions-item>


            <a-descriptions-item label="表外不良余额">
              {{model.bwbldkye}}
            </a-descriptions-item>


            <a-descriptions-item label="支行内表外不良余额">
              {{model.zhnbwbldkye}}
            </a-descriptions-item>

            <a-descriptions-item label="支行外表外不良余额">
              {{model.zhwbwbldkye}}
            </a-descriptions-item>




            <a-descriptions-item label="手机银行">
              {{model.sjyhkhs}}
            </a-descriptions-item>
            <a-descriptions-item label="ETC">
              {{model.etckhs}}
            </a-descriptions-item>
          </a-descriptions>
        </a-collapse-panel>
        <a-collapse-panel key="3" header="走访评议情况" >
          <a-descriptions :column="3" size="small" bordered>
            <a-descriptions-item label="白名单">
              {{model.bmdlrhs}}
            </a-descriptions-item>
            <a-descriptions-item label="灰名单">
              {{model.huimdhs}}
            </a-descriptions-item>
            <a-descriptions-item label="黑名单">
              {{model.heimdhs}}
            </a-descriptions-item>
            <a-descriptions-item label="背靠背评议户数">
              {{model.bkbpyhs}}
            </a-descriptions-item>
            <a-descriptions-item label="走访户数">
              {{model.zfhs}}
            </a-descriptions-item>
            <a-descriptions-item label="授信户数">
              {{model.sxhs}}
            </a-descriptions-item>
            <a-descriptions-item label="授信金额">
              {{model.nhzzsxed}}
            </a-descriptions-item>
            <a-descriptions-item label="授信户数增量">
              {{model.zlsxhs}}
            </a-descriptions-item>
            <a-descriptions-item label="授信金额增量">
              {{model.zlsxje}}
            </a-descriptions-item>
            <a-descriptions-item label="用信户数">
              {{model.yxhs}}
            </a-descriptions-item>
            <a-descriptions-item label="用信金额">
              {{model.yxje}}
            </a-descriptions-item>
            <a-descriptions-item label="用信户数增量">
              {{model.zlhs}}
            </a-descriptions-item>
            <a-descriptions-item label="用信金额增量">
              {{model.zlyxje}}
            </a-descriptions-item>
            <a-descriptions-item label="惠农快贷录入户数">

            </a-descriptions-item>
          </a-descriptions>
        </a-collapse-panel>
        <a-collapse-panel key="4" header="外部数据情况" >
          <a-descriptions  :column="3" size="small" bordered>
            <a-descriptions-item label="共产党员">
              {{model.dyrs}}
            </a-descriptions-item>
            <a-descriptions-item label="公职人员">
              {{model.gzryrs}}
            </a-descriptions-item>
            <a-descriptions-item label="特岗教师">
              {{model.tgjsrs}}
            </a-descriptions-item>
            <a-descriptions-item label="脱贫及检测户">
              {{model.tpjch}}
            </a-descriptions-item>
            <a-descriptions-item label="五保、低保">
              {{model.wbdbh}}
            </a-descriptions-item>
            <a-descriptions-item label="重大疾病">
              {{model.zdjbrs}}
            </a-descriptions-item>
            <a-descriptions-item label="诈骗人员">
              {{model.zpry}}
            </a-descriptions-item>
            <a-descriptions-item label="非法集资">
              {{model.ffjzrs}}
            </a-descriptions-item>
            <a-descriptions-item label="吸毒人员">
              {{model.xdry}}
            </a-descriptions-item>
            <a-descriptions-item label="服刑人员">
              {{model.fxry}}
            </a-descriptions-item>
            <a-descriptions-item label="我行诉讼">
              {{model.ssrs}}
            </a-descriptions-item>
            <a-descriptions-item label="涉案人数">
              {{model.sfsa}}
            </a-descriptions-item>
          </a-descriptions>
        </a-collapse-panel>
      </a-collapse>
      <a-collapse v-show="iscun" v-model="activeKey">
        <a-collapse-panel key="1" header="基本信息">
          <a-descriptions :column="3"  size="small" bordered>
            <a-descriptions-item label="网格编号">
              {{model.wgbh}}
            </a-descriptions-item>
            <a-descriptions-item label="网格名称">
              {{model.wgmc}}
            </a-descriptions-item>
            <a-descriptions-item label="总户籍">
              {{model.zhs}}
            </a-descriptions-item>
            <a-descriptions-item label="总人口">
              {{model.zrs}}
            </a-descriptions-item>
            <a-descriptions-item label="我行客户数/占比">
              {{model.clkhs}} / {{clkhszb}}
            </a-descriptions-item>
            <a-descriptions-item label="潜在客户数/占比">
              {{model.qzkhs}} / {{qzkhszb}}
            </a-descriptions-item>
          </a-descriptions>
        </a-collapse-panel>
        <a-collapse-panel  key="2" header="业务情况" >
          <a-descriptions :column="3" size="small" bordered>
            <a-descriptions-item label="存款客户数">
              {{model.ckkhs}}
            </a-descriptions-item>
            <a-descriptions-item label="存款总额">
              {{model.ckye}}
            </a-descriptions-item>


            <a-descriptions-item label="支行内存款户数/占比">
              {{model.zhnckkhs}} / {{zhnckkhszb}}
            </a-descriptions-item>
            <a-descriptions-item label="支行外存款户数/占比">
              {{model.zhwkhs}} / {{zhwckkhszb}}
            </a-descriptions-item>
            <a-descriptions-item label="支行内存款总额/占比">
              {{model.zhnckye}} / {{zhnckyezb}}
            </a-descriptions-item>
            <a-descriptions-item label="支行外存款总额/占比">
              {{model.zhwckye}} / {{zhwckyezb}}
            </a-descriptions-item>
            <a-descriptions-item label="贷款客户数">
              {{model.dkkhs}}
            </a-descriptions-item>

            <a-descriptions-item label="贷款覆盖面">
              {{model.dkfgm}}
            </a-descriptions-item>

            <a-descriptions-item label="贷款总额">
              {{model.dkye}}
            </a-descriptions-item>

            <a-descriptions-item label="支行内贷款户数/占比">
              {{model.zhndkhs}} / {{zhndkhszb}}
            </a-descriptions-item>
            <a-descriptions-item label="支行外贷款户数/占比">
              {{model.zhwdkhs}} / {{zhwdkhszb}}
            </a-descriptions-item>
            <a-descriptions-item label="支行内贷款总额/占比">
              {{model.zhndkye}} / {{zhndkyezb}}
            </a-descriptions-item>
            <a-descriptions-item label="支行外贷款款总额/占比">
              {{model.zhwdkye}} / {{zhwdkyezb}}
            </a-descriptions-item>


            <a-descriptions-item label="贷款无余额户数">
              {{model.dkwyekhs}}
            </a-descriptions-item>
            <a-descriptions-item label="合同金额">
              {{model.dkje}}
            </a-descriptions-item>

            <a-descriptions-item label="资金归行率">
              {{zjghl}}
            </a-descriptions-item>

            <a-descriptions-item label="我行社保卡">
              {{model.sbkkhs}}
            </a-descriptions-item>
            <a-descriptions-item label="外部社保卡">
              {{model.wbsbk}}
            </a-descriptions-item>


            <a-descriptions-item label="表内不良户数">
              {{model.bnbldkhs}}
            </a-descriptions-item>


            <a-descriptions-item label="支行内表内不良户数">
              {{model.zhnbnbldkhs}}
            </a-descriptions-item>

            <a-descriptions-item label="支行外表内不良户数">
              {{model.zhwbnbldkhs}}
            </a-descriptions-item>


            <a-descriptions-item label="表内不良余额">
              {{model.bnbldkye}}
            </a-descriptions-item>


            <a-descriptions-item label="支行内表内不良余额">
              {{model.zhnbnbldkye}}
            </a-descriptions-item>

            <a-descriptions-item label="支行外表内不良余额">
              {{model.zhwbnbldkye}}
            </a-descriptions-item>



            <a-descriptions-item label="表外不良户数">
              {{model.bwbldkhs}}
            </a-descriptions-item>


            <a-descriptions-item label="支行内表外不良户数">
              {{model.zhnbwbldkhs}}
            </a-descriptions-item>
            <a-descriptions-item label="支行外表外不良户数">
              {{model.zhwbwbldkhs}}
            </a-descriptions-item>



            <a-descriptions-item label="表外不良余额">
              {{model.bwbldkye}}
            </a-descriptions-item>


            <a-descriptions-item label="支行内表外不良余额">
              {{model.zhnbwbldkye}}
            </a-descriptions-item>
            <a-descriptions-item label="支行外表外不良余额">
              {{model.zhwbwbldkye}}
            </a-descriptions-item>


            <a-descriptions-item label="手机银行">
              {{model.sjyhkhs}}
            </a-descriptions-item>
            <a-descriptions-item label="ETC">
              {{model.etckhs}}
            </a-descriptions-item>
          </a-descriptions>
        </a-collapse-panel>
        <a-collapse-panel key="3" header="走访评议情况" >
          <a-descriptions :column="3" size="small" bordered>
            <a-descriptions-item label="白名单">
              {{model.bmdlrhs}}
            </a-descriptions-item>
            <a-descriptions-item label="灰名单">
              {{model.huimdhs}}
            </a-descriptions-item>
            <a-descriptions-item label="黑名单">
              {{model.heimdhs}}
            </a-descriptions-item>
            <a-descriptions-item label="背靠背评议户数">
              {{model.bkbpyhs}}
            </a-descriptions-item>
            <a-descriptions-item label="走访户数">
              {{model.zfhs}}
            </a-descriptions-item>
            <a-descriptions-item label="授信户数">
              {{model.sxhs}}
            </a-descriptions-item>
            <a-descriptions-item label="授信金额">
              {{model.nhzzsxed}}
            </a-descriptions-item>
            <a-descriptions-item label="授信户数增量">
              {{model.zlsxhs}}
            </a-descriptions-item>
            <a-descriptions-item label="授信金额增量">
              {{model.zlsxje}}
            </a-descriptions-item>
            <a-descriptions-item label="用信户数">
              {{model.yxhs}}
            </a-descriptions-item>
            <a-descriptions-item label="用信金额">
              {{model.yxje}}
            </a-descriptions-item>
            <a-descriptions-item label="用信户数增量">
              {{model.zlhs}}
            </a-descriptions-item>
            <a-descriptions-item label="用信金额增量">
              {{model.zlyxje}}
            </a-descriptions-item>
            <a-descriptions-item label="惠农快贷录入户数">

            </a-descriptions-item>
          </a-descriptions>
        </a-collapse-panel>
        <a-collapse-panel key="4" header="外部数据情况" >
          <a-descriptions  :column="3" size="small" bordered>
            <a-descriptions-item label="共产党员">
              {{model.dyrs}}
            </a-descriptions-item>
            <a-descriptions-item label="公职人员">
              {{model.gzryrs}}
            </a-descriptions-item>
            <a-descriptions-item label="特岗教师">
              {{model.tgjsrs}}
            </a-descriptions-item>
            <a-descriptions-item label="外部社保卡">
              {{model.wbsbk}}
            </a-descriptions-item>
            <a-descriptions-item label="脱贫及检测户">
              {{model.tpjch}}
            </a-descriptions-item>
            <a-descriptions-item label="五保、低保">
              {{model.wbdbh}}
            </a-descriptions-item>
            <a-descriptions-item label="重大疾病">
              {{model.zdjbrs}}
            </a-descriptions-item>
            <a-descriptions-item label="诈骗人员">
              {{model.zpry}}
            </a-descriptions-item>
            <a-descriptions-item label="非法集资">
              {{model.ffjzrs}}
            </a-descriptions-item>
            <a-descriptions-item label="吸毒人员">
              {{model.xdry}}
            </a-descriptions-item>
            <a-descriptions-item label="服刑人员">
              {{model.fxry}}
            </a-descriptions-item>
            <a-descriptions-item label="我行诉讼">
              {{model.ssrs}}
            </a-descriptions-item>
            <a-descriptions-item label="涉案人数">
              {{model.sfsa}}
            </a-descriptions-item>
          </a-descriptions>
        </a-collapse-panel>
      </a-collapse>

    </div>
    <div style="float: right">
      <a-button @click="downloadCqbg" v-show="iscun"   style="margin: 5px 5px;">下载村情报告</a-button>
      <a-button @click="infoWindowClose" style="margin: 0;">关闭</a-button>
    </div>
  </bm-info-window>
</template>

<script>
  import BmInfoWindow from 'vue-baidu-map/components/overlays/InfoWindow.vue'
  import { getAction ,downFile} from '@/api/manage'
  import { formatDecimals } from '@/utils/util'
  export default {
    name: 'GridInfoWindow',
    components: {
      BmInfoWindow
    },
    computed: {
      clkhszb() {
        return formatDecimals(this.model.clkhs/this.model.zrs*100)+'%'
      },
      qzkhszb(){
        return formatDecimals(this.model.qzkhs/this.model.zrs*100)+'%'
      },
      zhnckkhszb(){
        return formatDecimals(this.model.zhnckkhs/this.model.ckkhs*100)+'%'
      },
      zhwckkhszb(){
        return formatDecimals(this.model.zhwkhs/this.model.ckkhs*100)+'%'
      },
      zhnckyezb(){
        return formatDecimals(this.model.zhnckye/this.model.ckye*100)+'%'
      },
      zhwckyezb(){
        return formatDecimals(this.model.zhwckye/this.model.ckye*100)+'%'
      },
      zhndkhszb(){
        return formatDecimals(this.model.zhndkhs/this.model.dkkhs*100)+'%'
      },
      zhwdkhszb(){
        return formatDecimals(this.model.zhwdkhs/this.model.dkkhs*100)+'%'
      },

      zhndkyezb(){
        return formatDecimals(this.model.zhndkye/this.model.dkye*100)+'%'
      },
      zhwdkyezb(){
        return formatDecimals(this.model.zhwdkye/this.model.dkye*100)+'%'
      },
      zjghl(){
        return formatDecimals(this.model.cknrp/this.model.zhndkye*100)+'%'
      },
      ckhszb() {
        return formatDecimals(this.model.wgywxxModel.ckhs/this.model.wgxxModel.zhs*100)+'%'
      },
      dkhszb() {
        return formatDecimals(this.model.wgywxxModel.dkhs/this.model.wgxxModel.zhs*100)+'%'
      },
      bldkhszb() {
        return formatDecimals(this.model.wgywxxModel.bldkhs/this.model.wgxxModel.zhs*100)+'%'
      },
      bwbldkhszb() {
        return formatDecimals(this.model.wgywxxModel.bwbldkhs/this.model.wgxxModel.zhs*100)+'%'
      },
    },
    data () {
      return {
        wgmc:'',
        iscun:false,
        activeKey:1,
        visible: false,
        confirmLoading:false,
        infoWindow: {
          show: false,
          position: undefined,
          contents: undefined
        },
        title: '详情',
        url: {
          getOrgInfo: '/jgtjfx/jghztj/getLatestInfo',
          getGridInfo: '/wgtjfx/wghztj/getLatestInfo',
          getWgxx: '/wgtjfx/wgxxtj/queryByWgbh',
          getWgywxx: '/wgtjfx/wgywtj/queryByWgbh',
          getWgxq: '/wgtjfx/wgxxtj/queryWgxqByWgbh',
          downloadCqbg: '/yxdyglmain/yxdyglMain/download',
        },
        gridInfo: {},
        model: {wgbh:'', wgmc:''},
        //model1: {wgxxModel:{},wgywxxModel:{},type:""},
        wgywxxData: [],
      }
    },
    methods: {
      // 关闭信息窗口
      infoWindowClose(e) {
        this.infoWindow.show = false
      },
      infoWindowOpen(e) {
        this.infoWindow.show = true
      },
      // 打开信息窗口
      infoWindowShow(position, wgmc) {
        console.log('infoWindowShow', position)
        this.infoWindow.show = true
        this.infoWindow.position = position
        this.title=wgmc + '详情'
      },
      getAreaInfo(wgbh, wgmc) {
        this.model.wgbh = wgbh
        this.model.wgmc = wgmc
        this.wgmc=wgmc
        getAction(this.url.getWgxq, {wgbh: wgbh}).then(res => {
          if (res.success && res.result) {
            if(res.result.wgxz==2){
              this.iscun=true
            }else{
              this.iscun=false
            }
            this.model = Object.assign({}, res.result)
            console.log('this.model', this.model)
          }
        })

       /* getAction(this.url.getWgxx, {wgbh: wgbh}).then(res => {
          if (res.success && res.result) {
            this.model.wgxxModel = Object.assign({}, res.result)
            console.log('this.model.wgxxModel', this.model.wgxxModel)
          }
        })
        getAction(this.url.getWgywxx, {wgbh: wgbh}).then(res => {
          if (res.success && res.result) {
            this.model.wgywxxModel = Object.assign({}, res.result)
            console.log('this.model.wgxxModel', this.model.wgxxModel)
            this.wgywxxData.push(res.result)
          }
        })*/
      },
      downloadCqbg(){
        console.log(this.model.wgbh)
        downFile(this.url.downloadCqbg+'?wgbh='+this.model.wgbh).then((data) => {
          if (!data) {
            this.$message.warning('文件下载失败')
            return
          }
          var blob = new Blob([data])
          if ('msSaveOrOpenBlob' in navigator) {
            window.navigator.msSaveOrOpenBlob(blob, this.wgmc+'村情报告' + '.doc')
            return
          }
          var eleLink = document.createElement('a')
          eleLink.download = this.wgmc+'村情报告' + '.doc'
          eleLink.style.display = 'none'
          eleLink.href = URL.createObjectURL(blob)
          document.body.appendChild(eleLink)
          eleLink.click()
          document.body.removeChild(eleLink)
        })
        /*getAction(this.url.downloadCqbg+'?wgbh='+this.model.wgbh).then(res => {
          if (res.success && res.result) {

          }
        })*/
      }
    }
  }
</script>

<style>
  .sample {
    width: 120px;
    height: 40px;
    line-height: 40px;
    background: rgba(0,0,0,0.5);
    overflow: hidden;
    box-shadow: 0 0 5px #000;
    color: #fff;
    text-align: center;
    padding: 10px;
    position: absolute;
  }
  .sample.active {
    background: rgba(0,0,0,0.75);
    color: #fff;
  }
  .ant-descriptions-title {
    margin-bottom: 5px;
  }
</style>