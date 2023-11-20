<template lang="">
<dv-full-screen-container>

    <div class="contains">
        <big-header index="2"></big-header>

        <div>
            <div class="ddiv cfff">
                <div class="font14 sjdiv cfff">
                    数据日期：{{tjrq}}
                </div>

                <div class="tablediv">
                    <table id="t2">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>乡镇名称</th>
                                <th>总户数</th>
                                <th>系统初筛白名单</th>
                                <th>支行审定白名单</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item,index in allxz">
                                <td>{{index+1}}</td>
                                <td>{{item.wgbh_dictText}}</td>
                                <td>{{item.zhs}}</td>
                                <td>{{item.bmdhs}}</td>
                                <td>{{item.zhsdbmdhs}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>

            <div class="mapdiv">
                <div :style="{ backgroundImage: `url(${image1})` }" class="item1 itemdh" ref="item1" @mousemove="moveUp($event,'item1')" @mouseleave="restorePosition('item1')" @click="goToXzxx('云湖桥')">
                    <div class="titile fontdiv1">云湖桥</div>
                </div>
                <div :style="{ backgroundImage: `url(${image2})` }" class="item2 itemdh" ref="item2" @mousemove="moveUp($event,'item2')" @mouseleave="restorePosition('item2')" @click="goToXzxx('楠竹山')">
                    <div class="titile">楠竹山</div>
                </div>
                <div :style="{ backgroundImage: `url(${image3})` }" class="item3 itemdh" ref="item3" @mousemove="moveUp($event,'item3')" @mouseleave="restorePosition('item3')" @click="goToXzxx('鹤岭镇')">
                    <div class="titile">鹤岭镇</div>
                </div>
                <div :style="{ backgroundImage: `url(${image4})` }" class="item4 itemdh" ref="item4" @mousemove="moveUp($event,'item4')" @mouseleave="restorePosition('item4')" @click="goToXzxx('姜畲镇')">
                    <div class="titile fontdiv4">姜畲镇</div>
                </div>
                <div :style="{ backgroundImage: `url(${image5})` }" class="item5 itemdh" ref="item5" @mousemove="moveUp($event,'item5')" @mouseleave="restorePosition('item5')" @click="goToXzxx('石潭')">
                    <div class="titile">石潭</div>
                </div>
                <div :style="{ backgroundImage: `url(${image6})` }" class="item6 itemdh" ref="item6" @mousemove="moveUp($event,'item6')" @mouseleave="restorePosition('item6')" @click="goToXzxx('杨嘉桥')">
                    <div class="titile">杨嘉桥</div>
                </div>
                <div :style="{ backgroundImage: `url(${image7})` }" class="item7 itemdh" ref="item7" @mousemove="moveUp($event,'item7')" @mouseleave="restorePosition('item7')" @click="goToXzxx('河口')">
                    <div class="titile fontdiv7">河口</div>
                </div>
                <div :style="{ backgroundImage: `url(${image8})` }" class="item8 itemdh" ref="item8" @mousemove="moveUp($event,'item8')" @mouseleave="restorePosition('item8')" @click="goToXzxx('易俗河')">
                    <div class="titile fontdiv8">易俗河</div>
                </div>
                <div :style="{ backgroundImage: `url(${image9})` }" class="item9 itemdh" ref="item9" @mousemove="moveUp($event,'item9')" @mouseleave="restorePosition('item9')" @click="goToXzxx('乌石')">
                    <div class="titile">乌石</div>
                </div>
                <div :style="{ backgroundImage: `url(${image10})` }" class="item10 itemdh" ref="item10" @mousemove="moveUp($event,'item10')" @mouseleave="restorePosition('item10')" @click="goToXzxx('射埠')">
                    <div class="titile">射埠</div>
                </div>
                <div :style="{ backgroundImage: `url(${image11})` }" class="item11 itemdh" ref="item11" @mousemove="moveUp($event,'item11')" @mouseleave="restorePosition('item11')" @click="goToXzxx('谭家山')">
                    <div class="titile">谭家山</div>
                </div>
                <div :style="{ backgroundImage: `url(${image12})` }" class="item12 itemdh" ref="item12" @mousemove="moveUp($event,'item12')" @mouseleave="restorePosition('item12')" @click="goToXzxx('排头')">
                    <div class="titile fontdiv12">排头</div>
                </div>
                <div :style="{ backgroundImage: `url(${image13})` }" class="item13 itemdh" ref="item13" @mousemove="moveUp($event,'item13')" @mouseleave="restorePosition('item13')" @click="goToXzxx('梅林桥')">
                    <div class="titile">梅林桥</div>
                </div>
                <div :style="{ backgroundImage: `url(${image14})` }" class="item14 itemdh" ref="item14" @mousemove="moveUp($event,'item14')" @mouseleave="restorePosition('item14')" @click="goToXzxx('分水')">
                    <div class="titile fontdiv14">分水</div>
                </div>
                <div :style="{ backgroundImage: `url(${image15})` }" class="item15 itemdh" ref="item15" @mousemove="moveUp($event,'item15')" @mouseleave="restorePosition('item15')" @click="goToXzxx('石鼓')">
                    <div class="titile">石鼓</div>
                </div>
                <div :style="{ backgroundImage: `url(${image16})` }" class="item16 itemdh" ref="item16" @mousemove="moveUp($event,'item16')" @mouseleave="restorePosition('item16')" @click="goToXzxx('青山桥')">
                    <div class="titile">青山桥</div>
                </div>
                <div :style="{ backgroundImage: `url(${image17})` }" class="item17 itemdh" ref="item17" @mousemove="moveUp($event,'item17')" @mouseleave="restorePosition('item17')" @click="goToXzxx('花石')">
                    <div class="titile">花石</div>
                </div>
                <div :style="{ backgroundImage: `url(${image18})` }" class="item18 itemdh" ref="item18" @mousemove="moveUp($event,'item18')" @mouseleave="restorePosition('item18')" @click="goToXzxx('锦石')">
                    <div class="titile">锦石</div>
                </div>
                <div :style="{ backgroundImage: `url(${image19})` }" class="item19 itemdh" ref="item19" @mousemove="moveUp($event,'item19')" @mouseleave="restorePosition('item19')" @click="goToXzxx('中路铺')">
                    <div class="titile">中路铺</div>
                </div>
                <div :style="{ backgroundImage: `url(${image20})` }" class="item20 itemdh" ref="item20" @mousemove="moveUp($event,'item20')" @mouseleave="restorePosition('item20')" @click="goToXzxx('龙口')">
                    <div class="titile">龙口</div>
                </div>
                <div :style="{ backgroundImage: `url(${image21})` }" class="item21 itemdh" ref="item21" @mousemove="moveUp($event,'item21')" @mouseleave="restorePosition('item21')" @click="goToXzxx('白石')">
                    <div class="titile">白石</div>
                </div>
                <div :style="{ backgroundImage: `url(${image22})` }" class="item22" ref="item22" @mousemove="moveUp($event,'item22')" @mouseleave="restorePosition('item22')" @click="goToXzxx('茶恩寺')">
                    <div class="titile">茶恩寺</div>
                </div>
            </div>

            <div class="">
                <div class="xqgkdiv">
                    <div class="icondiv bj15 leftfix">
                        <div class="cfff font14 bjwz">
                            乡镇数量
                        </div>
                        <div class="cfff font14 bjwz2">
                            {{xqgk.xzsl}}个
                        </div>
                    </div>

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
                            社区居委数量
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
                            {{xqgk.zhs}}户
                        </div>
                    </div>

                    <div class="icondiv2 bj3 leftfix">
                        <div class="cfff font14 bjwz">
                            总人口
                        </div>
                        <div class="cfff font14 bjwz2">
                            {{xqgk.zrk}}人
                        </div>
                    </div>

                    <div class="icondiv2 bj4 leftfix">
                        <div class="cfff font14 bjwz">
                            金融村官
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
                            存款金额
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

                <div class="zfyxdiv">

                    <div class="yxdiv">
                        <v-gallery type="carousel" :images="dataList"  >
  </v-gallery>
                        <!-- <div class="child">
                            <img class="img2" src="/static/img/2.jpg">
                            <img class="img2" src="/static/img/3.jpg">
                            <img class="img2" src="/static/img/4.jpg">
                            <img class="img2" src="/static/img/5.jpg">
                            <img class="img2" src="/static/img/6.jpg">
                        </div> -->
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
            listData: [1, 2, 3, 4, 5, 6],
            classOption: {
                limitMoveNum: 2,
                direction: 3,
            },
            image1: '/static/sszh/云湖桥.png',
            image2: '/static/sszh/楠竹山.png',
            image3: '/static/sszh/鹤岭镇.png',
            image4: '/static/sszh/姜畲镇.png',
            image5: '/static/sszh/石潭.png',
            image6: '/static/sszh/杨嘉桥.png',
            image7: '/static/sszh/河口.png',
            image8: '/static/sszh/易俗河.png',
            image9: '/static/sszh/乌石.png',
            image10: '/static/sszh/射埠.png',
            image11: '/static/sszh/谭家山.png',
            image12: '/static/sszh/排头.png',
            image13: '/static/sszh/梅林桥.png',
            image14: '/static/sszh/分水.png',
            image15: '/static/sszh/石鼓.png',
            image16: '/static/sszh/青山桥.png',
            image17: '/static/sszh/花石.png',
            image18: '/static/sszh/锦石.png',
            image19: '/static/sszh/中路铺.png',
            image20: '/static/sszh/龙口.png',
            image21: '/static/sszh/白石.png',
            image22: '/static/sszh/茶恩寺.png',
            allxz: [],
            xqgk: {},
            tjrq: '',
            dataList: [{
                    title: '2023年11月01日 11:11:11,由刘鑫上传',
                    url: '/static/img/2.jpg'
                },
                {
                    title: '2023年11月02日 11:11:11,由刘鑫上传',
                    url: '/static/img/3.jpg'
                },
                {
                    title: '2023年11月03日 11:11:11,由刘鑫上传',
                    url: '/static/img/4.jpg'
                },
                {
                    title: '2023年11月03日 11:11:11,由刘鑫上传',
                    url: '/static/img/5.jpg'
                },
                {
                    title: '2023年11月03日 11:11:11,由刘鑫上传',
                    url: '/static/img/6.jpg'
                },
            ]

        }
    },
    mounted() {

    },

    created() {
        this.getAllZhen();
        this.run()
    },
    methods: {
        getAllZhen() {
            //   getAction("/bigscreen/index/xzinfo",{pid:'1'}).then(res => {
            //         this.allxz = res.result.list
            //     })

            getAction("/bigscreen/index/gxzzcsxgzjd", {
                wgxz: '7'
            }).then(res => {
                this.allxz = res.result.gzjd
                if (res.result.gzjd != null && res.result.gzjd.length > 0) {
                    this.tjrq = res.result.gzjd[0].tjrq;
                }

                this.xqgk = res.result.xqgk[0]
            })
        },

        moveUp(e, refName) {
            if (e.clientY > 10) {
                this.$refs[refName].style.transform = 'translateY(-30px)'

                if (refName == 'item1') {
                    this.image1 = '/static/sszhxz/云湖桥.png';
                } else if (refName == 'item2') {
                    this.image2 = '/static/sszhxz/楠竹山.png';
                } else if (refName == 'item3') {
                    this.image3 = '/static/sszhxz/鹤岭镇.png';
                } else if (refName == 'item4') {
                    this.image4 = '/static/sszhxz/姜畲镇.png';
                } else if (refName == 'item5') {
                    this.image5 = '/static/sszhxz/石潭.png';
                } else if (refName == 'item6') {
                    this.image6 = '/static/sszhxz/杨嘉桥.png';
                } else if (refName == 'item7') {
                    this.image7 = '/static/sszhxz/河口.png';
                } else if (refName == 'item8') {
                    this.image8 = '/static/sszhxz/易俗河.png';
                } else if (refName == 'item9') {
                    this.image9 = '/static/sszhxz/乌石.png';
                } else if (refName == 'item10') {
                    this.image10 = '/static/sszhxz/射埠.png';
                } else if (refName == 'item11') {
                    this.image11 = '/static/sszhxz/谭家山.png';
                } else if (refName == 'item12') {
                    this.image12 = '/static/sszhxz/排头.png';
                } else if (refName == 'item13') {
                    this.image13 = '/static/sszhxz/梅林桥.png';
                } else if (refName == 'item14') {
                    this.image14 = '/static/sszhxz/分水.png';
                } else if (refName == 'item15') {
                    this.image15 = '/static/sszhxz/石鼓.png';
                } else if (refName == 'item16') {
                    this.image16 = '/static/sszhxz/青山桥.png';
                } else if (refName == 'item17') {
                    this.image17 = '/static/sszhxz/花石.png';
                } else if (refName == 'item18') {
                    this.image18 = '/static/sszhxz/锦石.png';
                } else if (refName == 'item19') {
                    this.image19 = '/static/sszhxz/中路铺.png';
                } else if (refName == 'item20') {
                    this.image20 = '/static/sszhxz/龙口.png';
                } else if (refName == 'item21') {
                    this.image21 = '/static/sszhxz/白石.png';
                } else if (refName == 'item22') {
                    this.image22 = '/static/sszhxz/茶恩寺.png';
                }

            }
        },

        restorePosition(refName) {
            // 鼠标移出时恢复原始位置
            this.$refs[refName].style.transform = 'translateY(0)';
            if (refName == 'item1') {
                this.image1 = '/static/sszh/云湖桥.png';
            } else if (refName == 'item2') {
                this.image2 = '/static/sszh/楠竹山.png';
            } else if (refName == 'item3') {
                this.image3 = '/static/sszh/鹤岭镇.png';
            } else if (refName == 'item4') {
                this.image4 = '/static/sszh/姜畲镇.png';
            } else if (refName == 'item5') {
                this.image5 = '/static/sszh/石潭.png';
            } else if (refName == 'item6') {
                this.image6 = '/static/sszh/杨嘉桥.png';
            } else if (refName == 'item7') {
                this.image7 = '/static/sszh/河口.png';
            } else if (refName == 'item8') {
                this.image8 = '/static/sszh/易俗河.png';
            } else if (refName == 'item9') {
                this.image9 = '/static/sszh/乌石.png';
            } else if (refName == 'item10') {
                this.image10 = '/static/sszh/射埠.png';
            } else if (refName == 'item11') {
                this.image11 = '/static/sszh/谭家山.png';
            } else if (refName == 'item12') {
                this.image12 = '/static/sszh/排头.png';
            } else if (refName == 'item13') {
                this.image13 = '/static/sszh/梅林桥.png';
            } else if (refName == 'item14') {
                this.image14 = '/static/sszh/分水.png';
            } else if (refName == 'item15') {
                this.image15 = '/static/sszh/石鼓.png';
            } else if (refName == 'item16') {
                this.image16 = '/static/sszh/青山桥.png';
            } else if (refName == 'item17') {
                this.image17 = '/static/sszh/花石.png';
            } else if (refName == 'item18') {
                this.image18 = '/static/sszh/锦石.png';
            } else if (refName == 'item19') {
                this.image19 = '/static/sszh/中路铺.png';
            } else if (refName == 'item20') {
                this.image20 = '/static/sszh/龙口.png';
            } else if (refName == 'item21') {
                this.image21 = '/static/sszh/白石.png';
            } else if (refName == 'item22') {
                this.image22 = '/static/sszh/茶恩寺.png';
            }
        },

        goToXzxx(name) {
            //根据名称拿出来wgbh
            let wgbh = '';
            for (var i = 0; i < this.allxz.length; i++) {
                let obj = this.allxz[i];
                if (obj.wgbh_dictText.includes(name)) {
                    wgbh = obj.wgbh;
                }
            }
            
            //wgbh = '4301811150';


            if (wgbh == '') {
                this.$message.error(name + '暂无数据展示')
                return
            }

            this.$router.push({
                name: 'gzjd',
                query: {
                    wgmc: name,
                    wgbh: wgbh
                }
            })
        },
        sjs() {
            return Math.round(Math.random() * 10000);
        },
    },
}
</script>

    
<style scoped>
@keyframes video {
    0% {
        transform: translateX(0);
    }

    25% {
        transform: translateX(-400px);
    }

    50% {
        transform: translateX(-800px);
    }

    75% {
        transform: translateX(-1200px);
    }

    100% {
        transform: translateX(-1600px);
    }
}

.itemdh {
    transition: transform 0.3s ease;
    /* 添加过渡效果 */
}

.cfff {
    color: #fff;
}

.leftfix {
    float: left;
}

.clearfix::after {
    content: '';
    display: block;
    clear: both;
}

.contains {
    background-image: url(/static/bj.png);
    background-size: cover;
    width: 1920px;
    height: 1080px;
}

.yxdiv {
    width: 400px;
    height: 240px;
    margin: 40px 0 0 50px;
    overflow: hidden;
}

.child {
    display: flex;
    height: 300px;
    width: 2000px;
    animation: video 20s infinite;
    animation-direction: alternate;
}

.img2 {
    width: 373px;
    height: 210px;
}

.zfyxdiv {
    width: 495px;
    height: 290px;
    background-image: url(/static/xqgk/zfyx.png);
    background-size: 100% 100%;

    position: absolute;
    top: 771px;
    right: 20px;
}

.icondiv2 {
    width: 102px;
    height: 107px;
    margin: 10px 0 0 16px;
}

.icondiv {
    width: 102px;
    height: 107px;
    margin: 62px 0px 0 16px;
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

.xqgkdiv {
    width: 495px;
    height: 655px;
    background-image: url(/static/xqgk/xqgk2div.png);
    background-size: 100% 100%;

    position: absolute;
    top: 100px;
    right: 20px;
}

.mapdiv {
    margin: 0px 0px 0 100px;
    width: 856px;
    height: 622px;

    transform: scale(0.8);
    transform-origin: top;
}

table {
    text-align: center;
    color: #fff;
    width: 100%;
}

th {
    background-color: rgba(0, 138, 255, 0.4);
    height: 40px;
}

td {
    height: 36px;
}

.sjdiv {
    padding: 18px 0 0 270px;
    height: 54px;
}

.ddiv {
    width: 495px;
    height: 961px;
    background-image: url(/static/xqgk/gxzgzjd.png);
    position: absolute;
    top: 100px;
    left: 20px;
}

.item1 {
    background-image: url(/static/sszh/云湖桥.png);
    position: absolute;
    width: 224px;
    height: 112px;
    top: 286px;
    left: 762px;
    z-index: 3;
    background-size: 100% 100%;
}

.item2 {
    background-image: url(/static/sszh/楠竹山.png);
    position: absolute;
    width: 87px;
    height: 32px;
    top: 339px;
    left: 863px;
    background-size: 100% 100%;
    z-index: 4;
    display: flex;
    justify-content: center;
    align-items: center;
}

.item3 {
    background-image: url(/static/sszh/鹤岭镇.png);
    position: absolute;
    width: 55px;
    height: 66px;
    top: 241px;
    left: 1111px;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.item4 {
    background-image: url(/static/sszh/姜畲镇.png);
    position: absolute;
    width: 209px;
    height: 103px;
    top: 291px;
    left: 941px;
    z-index: 2;
    background-size: 100% 100%;

}

.item5 {
    background-image: url(/static/sszh/石潭.png);
    position: absolute;
    width: 267px;
    height: 112px;
    top: 362px;
    left: 774px;
    z-index: 4;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.item6 {
    background-image: url(/static/sszh/杨嘉桥.png);
    position: absolute;
    width: 253px;
    height: 114px;
    top: 337px;
    left: 931px;
    z-index: 3;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.item7 {
    background-image: url(/static/sszh/河口.png);
    position: absolute;
    width: 268px;
    height: 140px;
    top: 367px;
    left: 991px;
    z-index: 4;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.item8 {
    background-image: url(/static/sszh/易俗河.png);
    position: absolute;
    width: 254px;
    height: 102px;
    top: 361px;
    left: 1175px;
    z-index: 5;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.item9 {
    background-image: url(/static/sszh/乌石.png);
    position: absolute;
    width: 222px;
    height: 112px;
    top: 428px;
    left: 718px;
    z-index: 5;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.item10 {
    background-image: url(/static/sszh/射埠.png);
    position: absolute;
    width: 339px;
    height: 126px;
    top: 448px;
    left: 906px;
    z-index: 7;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.item13 {
    background-image: url(/static/sszh/梅林桥.png);
    position: absolute;
    width: 383px;
    height: 120px;
    top: 394px;
    left: 1086px;
    z-index: 6;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.item11 {
    background-image: url(/static/sszh/谭家山.png);
    position: absolute;
    width: 260px;
    height: 126px;
    top: 447px;
    left: 1182px;
    z-index: 8;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.item12 {
    background-image: url(/static/sszh/排头.png);
    position: absolute;
    width: 208px;
    height: 151px;
    top: 495px;
    left: 741px;
    z-index: 9;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.item18 {
    background-image: url(/static/sszh/锦石.png);
    position: absolute;
    width: 199px;
    height: 103px;
    top: 483px;
    left: 844px;
    z-index: 8;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.item14 {
    background-image: url(/static/sszh/分水.png);
    position: absolute;
    width: 261px;
    height: 100px;
    top: 537px;
    left: 573px;
    z-index: 10;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.item15 {
    background-image: url(/static/sszh/石鼓.png);
    position: absolute;
    width: 227px;
    height: 104px;
    top: 549px;
    left: 472px;
    z-index: 10;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.item16 {
    background-image: url(/static/sszh/青山桥.png);
    position: absolute;
    width: 353px;
    height: 109px;
    top: 585px;
    left: 534px;
    z-index: 10;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.item17 {
    background-image: url(/static/sszh/花石.png);
    position: absolute;
    width: 184px;
    height: 170px;
    top: 533px;
    left: 917px;
    z-index: 11;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.item19 {
    background-image: url(/static/sszh/中路铺.png);
    position: absolute;
    width: 289px;
    height: 140px;
    top: 523px;
    left: 1050px;
    z-index: 10;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.item20 {
    background-image: url(/static/sszh/龙口.png);
    position: absolute;
    width: 175px;
    height: 99px;
    top: 609px;
    left: 826px;
    z-index: 11;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.item21 {
    background-image: url(/static/sszh/白石.png);
    position: absolute;
    width: 273px;
    height: 96px;
    top: 593px;
    left: 1091px;
    z-index: 11;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.item22 {
    background-image: url(/static/sszh/茶恩寺.png);
    position: absolute;
    width: 266px;
    height: 109px;
    top: 643px;
    left: 994px;
    z-index: 11;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.titile {
    color: #6dffff;
    font-size: 18px;
    font-weight: 500;
    text-align: center;
    line-height: 24px;

    height: 24px;
    width: 70px;
    background-color: rgb(21, 117, 191);
    border-radius: 10%;
}

.fontdiv1 {
    position: relative;
    top: 20px;
    left: 100px;
}

.fontdiv2 {
    position: relative;
    top: 20px;
    left: 100px;
}

.fontdiv3 {
    position: relative;
    top: 20px;
    left: 100px;
}

.fontdiv4 {
    position: relative;
    top: 20px;
    left: 80px;
}

.fontdiv5 {
    position: relative;
    top: 20px;
    left: 100px;
}

.fontdiv6 {
    position: relative;
    top: 20px;
    left: 100px;
}

.fontdiv7 {
    position: relative;
    top: -20px
}

.fontdiv8 {
    position: relative;
    top: -20px;
}

.fontdiv9 {
    position: relative;
    top: 20px;
    left: 100px;
}

.fontdiv10 {
    position: relative;
    top: 20px;
    left: 100px;
}

.fontdiv11 {
    position: relative;
    top: 20px;
    left: 100px;
}

.fontdiv12 {
    position: relative;
    top: 0px;
    left: 10px;
}

.fontdiv13 {
    position: relative;
    top: 20px;
    left: 10px;
}

.fontdiv14 {
    position: relative;
    top: -20px;

}

.fontdiv15 {
    position: relative;
    top: 20px;
    left: 100px;
}

.fontdiv16 {
    position: relative;
    top: 20px;
    left: 100px;
}

.fontdiv17 {
    position: relative;
    top: 20px;
    left: 100px;
}

.fontdiv18 {
    position: relative;
    top: 20px;
    left: 100px;
}

.fontdiv19 {
    position: relative;
    top: 20px;
    left: 100px;
}

.fontdiv20 {
    position: relative;
    top: 20px;
    left: 100px;
}

.fontdiv21 {
    position: relative;
    top: 20px;
    left: 100px;
}

.tablediv {
    margin: 0 20px 0 20px;
}

#t2 tr:nth-child(even) {
    background-color: rgba(0, 138, 255, 0.15);
}
</style>
