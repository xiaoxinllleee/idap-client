<template lang="">
<dv-full-screen-container>
    <div class="containsgzjd">

        <big-header index="2"></big-header>

        <div>
            <div class="leftfix jddiv">
                <div class="sjdiv font14 cfff">
                    {{tjrq}}
                </div>
                <div class="tbdiv">
                    <table id="t2">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>村委</th>
                                <th>支行员工</th>
                                <th>总户数</th>
                                <th>系统初筛白名单</th>
                                <th>支行审定白名单</th>
                                <th>授信金额</th>
                                <th>惠农快贷导入户数</th>
                                <th>惠农快贷导入金额</th>
                                <th>新增签约户数</th>
                                <th>新增签约金额</th>
                                <th>新增用信户数</th>
                                <th>新增用信金额</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item,index in allxc" @click="goToWgxx(item)">
                                <td>{{index +1}}</td>
                                <td>{{item.wgbh_dictText}}</td>
                                <td>{{item.zkhjl_dictText}}</td>
                                <td>{{item.zhs}}</td>
                                <td>{{item.bmdhs}}</td>
                                <td>{{item.zhsdBmdhs}}</td>
                                <td>{{item.zhsdEdhz}}</td>
                                <td>{{item.hnkdDrhs}}</td>
                                <td>{{item.hnkdEdhz}}</td>
                                <td>{{item.dkhtXzkhs}}</td>
                                <td>{{item.dkhtQyedhz}}</td>
                                <td>{{item.dkyxXzkhs}}</td>
                                <td>{{item.dkyxEdhz}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="leftfix">
                <div class="xqgkdiv">
                    <div class="icondiv bj15 leftfix">
                        <div class="cfff font14 bjwz">
                            行政村数量
                        </div>
                        <div class="cfff font14 bjwz2">
                            {{xqgk.xzcsl}}个
                        </div>
                    </div>

                    <div class="icondiv bj1 leftfix">
                        <div class="cfff font14 bjwz">
                            社区/居委数量
                        </div>
                        <div class="cfff font14 bjwz2">
                            {{xqgk.sqjwsl}}个
                        </div>
                    </div>

                    <div class="icondiv bj2 leftfix">
                        <div class="cfff font14 bjwz">
                            总户数
                        </div>
                        <div class="cfff font14 bjwz2">
                            {{xqgk.zhs}}个
                        </div>
                    </div>

                    <div class="icondiv bj3 leftfix">
                        <div class="cfff font14 bjwz">
                            总人口
                        </div>
                        <div class="cfff font14 bjwz2">
                            {{xqgk.zrk}}个
                        </div>
                    </div>

                    <div class="icondiv2 bj4 leftfix">
                        <div class="cfff font14 bjwz">
                            金融村官信息
                        </div>
                        <div class="cfff font14 bjwz2">
                            {{xqgk.jrcg}}个
                        </div>
                    </div>
                    <div class="icondiv2 bj5 leftfix">
                        <div class="cfff font14 bjwz">
                            有效合同客户
                        </div>
                        <div class="cfff font14 bjwz2">
                            {{xqgk.yxhtkh}}个
                        </div>
                    </div>
                    <div class="icondiv2 bj6 leftfix">
                        <div class="cfff font14 bjwz">
                            有效合同金额
                        </div>
                        <div class="cfff font14 bjwz2">
                            {{xqgk.yxhtje}}亿
                        </div>
                    </div>

                    <div class="icondiv2 bj7 leftfix">
                        <div class="cfff font14 bjwz">
                            贷款用信户数
                        </div>
                        <div class="cfff font14 bjwz2">
                            {{xqgk.dkyxhs}}户
                        </div>
                    </div>
                    <div class="icondiv2 bj8 leftfix">
                        <div class="cfff font14 bjwz">
                            贷款用信金额
                        </div>
                        <div class="cfff font14 bjwz2">
                            {{xqgk.dkyxje}}亿
                        </div>
                    </div>
                    <div class="icondiv2 bj9 leftfix">
                        <div class="cfff font14 bjwz">
                            存款客户
                        </div>
                        <div class="cfff font14 bjwz2">
                            {{xqgk.ckkh}}个
                        </div>
                    </div>

                    <div class="icondiv2 bj10 leftfix">
                        <div class="cfff font14 bjwz">
                            存款余额
                        </div>
                        <div class="cfff font14 bjwz2">
                            {{xqgk.ckye}}亿
                        </div>
                    </div>
                    <div class="icondiv2 bj11 leftfix">
                        <div class="cfff font14 bjwz">
                            福祥E站
                        </div>
                        <div class="cfff font14 bjwz2">
                            {{xqgk.fxez}}个
                        </div>
                    </div>
                    <div class="icondiv2 bj12 leftfix">
                        <div class="cfff font14 bjwz">
                            社保卡客户
                        </div>
                        <div class="cfff font14 bjwz2">
                            {{xqgk.sbkkh}}个
                        </div>
                    </div>

                    <div class="icondiv2 bj13 leftfix">
                        <div class="cfff font14 bjwz">
                            手机银行
                        </div>
                        <div class="cfff font14 bjwz2">
                            {{xqgk.sjyh}}个
                        </div>
                    </div>
                    <div class="icondiv2 bj14 leftfix">
                        <div class="cfff font14 bjwz">
                            信用卡客户
                        </div>
                        <div class="cfff font14 bjwz2">
                            {{xqgk.xykkh}}个
                        </div>
                    </div>

                    <div class="icondiv2 bj16 leftfix">
                        <div class="cfff font14 bjwz">
                            福祥E支付
                        </div>
                        <div class="cfff font14 bjwz2">
                            {{xqgk.fxezf}}个
                        </div>
                    </div>

                </div>

                <div class="mapdiv" :style="{ backgroundImage: 'url(/static/sszh2/' + mapname + '.png)' }">
                    <div v-for="item,index in mapList" :style="{ position: 'relative', top: `${item.top}px`, left: `${item.left*0.65}px` }" class="cundiv" @click="goToWgxx(item.wgbh)">
                        {{item.wgmc}}
                    </div>
                </div>
            </div>
        </div>

    </div>
</dv-full-screen-container>
</template>

<script>
import BigHeader from './BigHeader.vue'
import {
    getAction,
    httpAction
} from '@/api/manage'
export default {
    components: {
        BigHeader
    },
    data() {
        return {
            nowtime: '',
            mapname: '',
            wgbh: '',
            tjrq: '',
            listData: [{
                wgbh: '1',
                wgmc: ''
            }],
            allxc: [],
            mapList: [],
            xqgk:[]
        }
    },
    created() {
        let query = this.$route.query;
        this.mapname = query.wgmc;
        this.wgbh = query.wgbh;
        this.getAllZhen();
    },
    mounted() {

    },
    methods: {
      moveUp(e) {
            if (e.clientY > 10) {
                this.$refs.cundiv.style.transform = 'translateY(-30px)'
            }
        },

        restorePosition() {
            // 鼠标移出时恢复原始位置
            this.$refs.cundiv.style.transform = 'translateY(0)';
        },

        goToWgxx(item) {
            this.$router.push({
                name: 'wgxx',
                query: {
                    mapname: this.mapname,
                    item:item,
                    mapList:this.mapList
                }
            })
        },
        getAllZhen() {
            getAction("/bigscreen/index/gxzzcsxgzjd",{wgbh:this.wgbh}).then(res=>{
                this.allxc = res.result.gzjd
                if(res.result.gzjd != null && res.result.gzjd.length > 0){
                    this.tjrq = res.result.gzjd[0].tjrq;
                }
                this.xqgk = res.result.xqgk[0]
                this.mapList=res.result.mapList
           }) 
        },
    },
}
</script>

<style scoped>
@import '../common.css';

.mapdiv {
    margin-top: 40px;
    margin-left: 20px;
    width: 506px;
    height: 255px;
    background-image: url('/static/xqgk/map.png');
    background-size: 100% 100%;
}

.jddiv {
    width: 1316px;
    height: 951px;
    background-image: url('/static/xqgk/gzjd.png');
    margin: 0 20px 0px 20px;
    background-size: 100% 100%;
}

.sjdiv {
    padding: 18px 0 0 1157px;
    height: 54px;
}

th {
    background-color: rgba(0, 138, 255, 0.4);
    height: 40px;
}

td {
    height: 36px;
}

table {
    text-align: center;
    color: #fff;
    width: 100%;
}

#t2 tr:nth-child(even) {
    background-color: rgba(0, 138, 255, 0.15);
}

.xqgkdiv {
    width: 549px;
    height: 551px;
    background-image: url('/static/xqgk/xqgk2div.png');
    background-size: cover;
}

.icondiv2 {
    width: 102px;
    height: 107px;
    margin: 10px 10px 0 22px;
}

.icondiv {
    width: 102px;
    height: 107px;
    margin: 62px 10px 0 22px;
}

.bj1 {
    background-image: url(/static/xqgk/bj1.png);
    background-size: 100% 100%;
}

.bj2 {
    background-image: url(/static/xqgk/bj2.png);
    background-size: 100% 100%;
}

.bj3 {
    background-image: url(/static/xqgk/bj3.png);
    background-size: 100% 100%;
}

.bj4 {
    background-image: url(/static/xqgk/bj4.png);
    background-size: 100% 100%;
}

.bj5 {
    background-image: url(/static/xqgk/bj5.png);
    background-size: 100% 100%;
}

.bj6 {
    background-image: url(/static/xqgk/bj6.png);
    background-size: 100% 100%;
}

.bj7 {
    background-image: url(/static/xqgk/bj7.png);
    background-size: 100% 100%;
}

.bj8 {
    background-image: url(/static/xqgk/bj8.png);
    background-size: 100% 100%;
}

.bj9 {
    background-image: url(/static/xqgk/bj9.png);
    background-size: 100% 100%;
}

.bj10 {
    background-image: url(/static/xqgk/bj10.png);
    background-size: 100% 100%;
}

.bj11 {
    background-image: url(/static/xqgk/bj11.png);
    background-size: 100% 100%;
}

.bj12 {
    background-image: url(/static/xqgk/bj12.png);
    background-size: 100% 100%;
}

.bj13 {
    background-image: url(/static/xqgk/bj13.png);
    background-size: 100% 100%;
}

.bj14 {
    background-image: url(/static/xqgk/bj14.png);
    background-size: 100% 100%;
}

.bj15 {
    background-image: url(/static/xqgk/bj15.png);
    background-size: 100% 100%;
}

.bj16 {
    background-image: url(/static/xqgk/bj16.png);
    background-size: 100% 100%;
}

.bjwz {
    text-align: center;
    margin: 66px 0px 0px 0px;
    font-weight: 400;
}

.bjwz2 {
    text-align: center;
    color: #FCAD23;
    margin-top: 3px;
    font-weight: 400;
}

.tbdiv {
    margin: 0 20px 0 20px;
    overflow-y: auto;
    height: 870px;
}

.containsgzjd {
    background-image: url(/static/xqgk/bjgzjd.png);
    background-size: cover;
    width: 1920px;
    height: 1080px;
}

.cundiv {
    color: #6dffff;
    font-size: 12.8px;
    font-weight: 500;
    text-align: center;
    line-height: 12.8px;

    width: auto;
    background-color: rgb(21, 117, 191);
    border-radius: 10%;

    display: inline-block;
    padding: 5px;
    transition: transform 0.3s ease; /* 添加过渡效果 */

}

.cundiv:hover{
  transform: translate(0, -20px); /* 移动上浮30px */
}
</style>
