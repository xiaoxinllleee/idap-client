<template lang="">
    <dv-full-screen-container>
        <div class="contains">
            <big-header index="2"></big-header>
    
            <!--下发分成左右2个div-->
            <div>
    
                <!--先分成3个div-->
                <div class="leftfix" style="width:1336px">
                    <!--各行行政村整村授信工作进度-->
                    <div class="zcsxdiv">
                        <div class="font14 cfff sjdiv">
                            {{item.tjrq}}
                        </div>
                        <!--表格-->
                        <div class="jddiv">
                            <table>
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
                                    <tr>
                                        <td>1</td>
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
                    <!--客群数据分析-->
                    <div class="leftfix kqsjfx">
                        <!--时间-->
                        <div class="font14 cfff sjdiv2">2023年9月7日</div>
    
                        <div class="leftfix btdiv ">
                            <div class=" pttitle">客户主要行业分布</div>
                            <chart095 :data="zyhyflList" v-if="zyhyflList.length > 0"></chart095>
                            <div class="pietitle" v-for=" item,index in zyhyflList">
                                <div class="xyd" :style="{ backgroundColor: getColorByIndex(index) }"></div>
                                <div class="">{{item[0]}}</div>
                                <div class=" " style="margin-left: 15px;">{{item[1]}} 人</div>
                            </div>
                        </div>
                        <div class="leftfix btdiv ">
                            <div class=" pttitle">客户主要就业地点分布</div>
                            <chart095 :data="zyjyddList" v-if="zyjyddList.length > 0"></chart095>
                            <div class="pietitle" v-for=" item,index in zyjyddList">
                                <div class="xyd" :style="{ backgroundColor: getColorByIndex(index) }"></div>
                                <div class="">{{item[0]}}</div>
                                <div class=" " style="margin-left: 15px;">{{item[1]}} 人</div>
                            </div>
                        </div>
                        <div class="leftfix btdiv ">
                            <div class=" pttitle">主要就业分类</div>
                            <chart095 :data="jyflList" v-if="jyflList.length > 0"></chart095>
                            <div class="pietitle" v-for=" item,index in jyflList">
                                <div class="xyd" :style="{ backgroundColor: getColorByIndex(index) }"></div>
                                <div class="">{{item[0]}}</div>
                                <div class=" " style="margin-left: 15px;">{{item[1]}} 人</div>
                            </div>
                        </div>
                        <div class="leftfix btdiv ">
                            <div class=" pttitle">城区购房客户占比</div>
                            <chart095 :data="cqmfList" v-if="cqmfList.length > 0"></chart095>
                            <div class="pietitle" v-for=" item,index in cqmfList">
                                <div class="xyd" :style="{ backgroundColor: getColorByIndex(index) }"></div>
                                <div class="">{{item[0]}}</div>
                                <div class=" " style="margin-left: 15px;">{{item[1]}} 人</div>
                            </div>
    
                        </div>
                    </div>
                    <div class="leftfix mapdiv" :style="{ backgroundImage: 'url(/static/sszh2/' + mapname + '.png)' }">
                        <div v-for="item,index in mapList" :style="{ position: 'absolute', top: `${item.top+400}px`, left: `${item.left+500}px` }" class="cundiv" @click="goToWgxx(item.parentId)">
                            {{item.wgmc}}
                        </div>
                    </div>
                </div>
    
                <!--辖区概况-->
                <div class=" leftfix xqgk">
    
                    <div class="icondiv bj1 leftfix">
                        <div class="cfff font14 bjwz">
                            村民小组
                        </div>
                        <div class="cfff font14 bjwz2">
                            {{childCount}}个
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
                            {{xqgk.zrk}}人
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
    
                </div>
    
            </div>
    
        </div>
    </dv-full-screen-container>
    </template>
    
    <script>
    import Chart095 from '@/views/bigscreen/modules/Chart095'
    import BigHeader from './BigHeader.vue'
    import {
        getAction,
        httpAction
    } from '@/api/manage'
    import {
        objectEach
    } from 'xe-utils/methods'
    export default {
        components: {
            Chart095,
            BigHeader
        },
    
        data() {
            return {
                mapname: '',
                wgbh: '',
                wgmc: '',
                mapList: [],
                zyhyflList: [],
                zyjyddList: [],
                cqmfList: [],
                jyflList: [],
                item: {},
                xqgk: {},
                childCount: 0,
                colors: [
                        '#62F4FF',
                        '#3D7FFF',
                        '#AA57E5',
                        '#FFB77E',
                        '#FF5050',
                        '#3DC5FF',
                        '#FFD700',
                        '#FF85A2',
                        '#A4DBE8',
                        '#7FFF00'
                    ],
            }
        },
        mounted() {
    
        },
        created() {
            let query = this.$route.query;
            this.mapname = query.mapname;
            this.wgbh = query.item.wgbh;
            this.wgmc = query.item.wgmc_dictText;
            this.item = query.item;
            this.mapList = query.mapList;
    
            this.getAllZhen();
        },
        methods: {
            goToWgxx(wgbh) {
                this.$router.push({
                    name: 'gzjd',
                    query: {
                        wgbh: wgbh,
                        wgmc: this.mapname,
                    }
                })
            },
    
            getAllZhen() {
                getAction("/bigscreen/index/gxzzcsxgzjd", {
                    wgbh: this.wgbh,
                    wgxz: '2'
                }).then(res => {
                    this.xqgk = res.result.xqgk[0]
                    this.childCount = res.result.childCount
    
                    let zyhyfl = res.result.zyhyfl;
                    let cqmf = res.result.cqmf;
                    let jyfl = res.result.jyfl;
                    let zyjydd = res.result.zyjydd;
    
                    this.szcl(zyhyfl, 'zyhyfl');
                    this.szcl(cqmf, 'cqmf');
                    this.szcl(jyfl, 'jyfl');
                    this.szcl(zyjydd, 'zyjydd');
                    //this.mapList=res.result.mapList
    
                })
            },
    
            szcl(sz, type) {
                console.log('==========');
                console.log(sz);
                console.log(type);
                let result = [];
                let khs = 0;
                let zkhs = 0;
                for (let index = 0; index < sz.length; index++) {
                    const element = sz[index];
                    khs += element.khs;
                    zkhs = element.zkhs;
                    if (type == 'cqmf') {
                        result.push(['已购房', element.khs]);
                    } else {
                        result.push([element.itemtext, element.khs]);
                    }
                }
    
                //对比总客户数
                if (zkhs > khs) {
                    let obj = [];
                    if (type == 'cqmf') {
                        result.push(['未购房', zkhs - khs]);
                    } else {
                        result.push(['其他', zkhs - khs]);
                    }
                }
    
                if (type == 'zyhyfl') {
                    this.zyhyflList = result;
                } else if (type == 'cqmf') {
                    this.cqmfList = result;
                } else if (type == 'jyfl') {
                    this.jyflList = result
                } else if (type == 'zyjydd') {
                    this.zyjyddList = result
                }
                console.log(result);
                console.log('==========');
            }
    
            ,
            getColorByIndex(index) {
                return this.colors[index] || '#8277E9'; // 如果index没有对应的颜色，使用默认颜色
            }
        },
    }
    </script>
    
    <style scoped>
    @import '../common.css';
    
    .mapdiv {
        margin-top: 100px;
        width: 779px;
        height: 440px;
        background-size: 100% 100%;
    }
    
    .bjwz {
        text-align: center;
        margin: 84px 0px 0px 0px;
        font-weight: 400;
    }
    
    .bjwz2 {
        text-align: center;
        color: #FCAD23;
        margin-top: 3px;
        font-weight: 400;
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
    
    .icondiv2 {
        width: 127px;
        height: 129px;
        margin: 20px 30px 0 22px;
    }
    
    .icondiv {
        width: 127px;
        height: 129px;
        margin: 62px 30px 0 22px;
    }
    
    .xqgk {
        width: 537px;
        height: 971px;
        background-image: url('/static/xqgk/xqgkzu.png');
        background-size: cover;
        margin: 0 20px 20px 20px;
    }
    
    .xyd {
        width: 8.5px;
        height: 8.5px;
        border-radius: 8.5px;
        margin-right: 10px;
    }
    
    .pietitle {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        color: #fff;
        margin-top: 5px;
    
    }
    
    .pttitle {
        text-align: center;
        font: 16px;
        color: #71A1EF;
        margin-bottom: 10px;
    }
    
    .btdiv {
        width: 220px;
        height: 358px;
        margin: 10px 0px 20px 20px;
    
    }
    
    .kqsjfx {
        height: 811px;
        width: 495px;
        background-image: url('/static/xqgk/kqsjfximg.png');
        background-size: cover;
        margin: 0 20px 20px 20px;
    
    }
    
    .jddiv {
        margin: 0 20px 0 20px;
    }
    
    .sjdiv {
        padding: 18px 0 0 1157px;
        height: 54px;
    }
    
    .sjdiv2 {
        padding: 14px 0 0 346px;
        height: 54px;
    }
    
    .zcsxdiv {
        width: 1316px;
        height: 144px;
        background-image: url('/static/xqgk/zcsx.png');
        background-size: cover;
        margin: 0 20px 20px 20px;
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
    
    .contains {
        background-image: url(/static/bj.png);
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
        transition: transform 0.3s ease;
        /* 添加过渡效果 */
    
    }
    
    .cundiv:hover {
        transform: translate(0, -20px);
        /* 移动上浮30px */
    
    }
    </style>
    