<template lang="">
<dv-full-screen-container>
    <div class="contains">
        <BigHeader index="1"></BigHeader>

        <div class="xf">
            <div class="leftfix">

                <div class="clearfix">
                    <div class=" div3 leftfix">

                        <div class="sjrq">
                            数据日期:2023年9月20日
                        </div>

                        <div lass="clearfix">

                            <div class="cskb leftfix">
                                <div class="cskb" style="margin-left: 21px;margin-top: 19px;">
                                    <div class="wztitle">
                                        贷款金额(亿元)
                                    </div>
                                    <div class="clearfix" style="padding-top: 10px;padding-bottom: 10px;">
                                        <div class="szbk leftfix" v-for="item in dkjeArr">
                                            {{item}}
                                        </div>
                                    </div>
                                    <div>
                                        <span class="bjtitle">较上月</span>
                                        <span class="upnum"> {{ckdkwh.dkjejsy}}</span>
                                        <span class="bjtitle" style="margin-left: 50px;">较年初</span>
                                        <span class="upnum"> {{ckdkwh.dkjejnc}}</span>
                                    </div>
                                </div>

                                <div class="cskb dkbt1">
                                    <chart095 :data="dkpieList" v-if="dkpieList.length > 0"> </chart095>
                                </div>

                                <div class="cskb" style="color: #fff;">
                                    <div class="clearfix">
                                        <div class=" leftfix pietitle">

                                            <div class=" leftfix">
                                                <div class="xyd" :style="{ backgroundColor: getColorByIndex(0) }"></div>
                                            </div>
                                            <div class=" leftfix">正常</div>
                                            <div class=" leftfix" style="margin-left: 10px;">{{ckdkwh.dkjezc}} 亿</div>

                                        </div>
                                        <div class=" leftfix pietitle">

                                            <div class=" leftfix">
                                                <div class="xyd" :style="{ backgroundColor: getColorByIndex(1) }"></div>
                                            </div>
                                            <div class=" leftfix">次级</div>
                                            <div class=" leftfix" style="margin-left: 10px;">{{ckdkwh.dkjecj}} 亿</div>

                                        </div>
                                    </div>
                                    <div class="clearfix">
                                        <div class=" leftfix pietitle">

                                            <div class=" leftfix">
                                                <div class="xyd" :style="{ backgroundColor: getColorByIndex(2) }"></div>
                                            </div>
                                            <div class=" leftfix">关注</div>
                                            <div class=" leftfix" style="margin-left: 10px;">{{ckdkwh.dkjegz}} 亿</div>

                                        </div>
                                        <div class=" leftfix pietitle">

                                            <div class=" leftfix">
                                                <div class="xyd" :style="{ backgroundColor: getColorByIndex(3) }"></div>
                                            </div>
                                            <div class=" leftfix">可疑</div>
                                            <div class=" leftfix" style="margin-left: 10px;">{{ckdkwh.dkjeky}} 亿</div>

                                        </div>
                                    </div>
                                    <div class="clearfix">
                                        <div class=" leftfix pietitle">

                                            <div class=" leftfix">
                                                <div class="xyd" :style="{ backgroundColor: getColorByIndex(4) }"></div>
                                            </div>
                                            <div class=" leftfix">损失</div>
                                            <div class=" leftfix" style="margin-left: 15px;">{{ckdkwh.dkjess}}  亿</div>

                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div class="cskb leftfix">
                                <div class="cskb " style="margin-left: 21px;margin-top: 19px;">
                                    <div class="wztitle">
                                        贷款客户(户)
                                    </div>

                                    <div class="clearfix cskb" style="padding-top: 10px;padding-bottom: 10px;">
                                        <div class="szbk leftfix" v-for="item in dkkhArr">{{item}}</div>
                                    </div>

                                    <div>
                                        <span class="bjtitle">较上月</span>
                                        <span class="upnum"> {{ckdkwh.dkkhjsy}}</span>
                                        <span class="bjtitle" style="margin-left: 50px;">较年初</span>
                                        <span class="upnum"> {{ckdkwh.dkkhjnc}}</span>
                                    </div>
                                </div>

                                <div class="cskb dkbt1">
                                    <chart095 :data="khpieList" v-if="khpieList.length > 0"></chart095>
                                </div>

                                <div class="cskb" style="color: #fff;">
                                    <div class="clearfix">
                                        <div class=" leftfix pietitle">

                                            <div class=" leftfix">
                                                <div class="xyd" :style="{ backgroundColor: getColorByIndex(0) }"></div>
                                            </div>
                                            <div class=" leftfix">60后</div>
                                            <div class=" leftfix" style="margin-left: 10px;">{{ckdkwh.dkkh60}} 户</div>

                                        </div>
                                        <div class=" leftfix pietitle">

                                            <div class=" leftfix">
                                                <div class="xyd" :style="{ backgroundColor: getColorByIndex(1) }"></div>
                                            </div>
                                            <div class=" leftfix">70后</div>
                                            <div class=" leftfix" style="margin-left: 10px;">{{ckdkwh.dkkh70}} 户</div>

                                        </div>
                                    </div>
                                    <div class="clearfix">
                                        <div class=" leftfix pietitle">

                                            <div class=" leftfix">
                                                <div class="xyd" :style="{ backgroundColor: getColorByIndex(2) }"></div>
                                            </div>
                                            <div class=" leftfix">80后</div>
                                            <div class=" leftfix" style="margin-left: 10px;">{{ckdkwh.dkkh80}} 户</div>

                                        </div>
                                        <div class=" leftfix pietitle">

                                            <div class=" leftfix">
                                                <div class="xyd" :style="{ backgroundColor: getColorByIndex(3) }"></div>
                                            </div>
                                            <div class=" leftfix">90后</div>
                                            <div class=" leftfix" style="margin-left: 10px;">{{ckdkwh.dkkh90}} 户</div>

                                        </div>
                                    </div>
                                    <div class="clearfix">
                                        <div class=" leftfix pietitle">

                                            <div class=" leftfix">
                                                <div class="xyd" :style="{ backgroundColor: getColorByIndex(4) }"></div>
                                            </div>
                                            <div class=" leftfix">00后</div>
                                            <div class=" leftfix" style="margin-left: 10px;">{{ckdkwh.dkkh00}} 户</div>

                                        </div>
                                        <div class=" leftfix pietitle">

                                            <div class=" leftfix">
                                                <div class="xyd" :style="{ backgroundColor: getColorByIndex(5) }"></div>
                                            </div>
                                            <div class=" leftfix">其他</div>
                                            <div class=" leftfix" style="margin-left: 10px;">{{ckdkwh.dkkhqt}} 户</div>

                                        </div>
                                    </div>
                                    <div class="clearfix">
                                        <div class=" leftfix pietitle">

                                            <div class=" leftfix">
                                                <div class="xyd" :style="{ backgroundColor: getColorByIndex(6) }"></div>
                                            </div>
                                            <div class=" leftfix">对公</div>
                                            <div class=" leftfix" style="margin-left: 10px;">{{ckdkwh.dkkhdg}} 户</div>

                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div class=" div4 leftfix">
                        <div class="ywjbdiv leftfix">
                            <div class="ywjbtitle">贷款(亿元)</div>
                            <div>
                                <img src="/static/dkywjb.png" alt="" class="ywjbimg">

                            </div>
                            <div class="ywjbnum">{{ywjb.dk}}</div>
                            <div>
                                <span class="bjtitle">较年初</span>
                                <span class="upnum" v-if="ywjb.dkjnc > 0">+{{ywjb.dkjnc}}</span>
                                <span class="upnum" v-if="ywjb.dkjnc <= 0">{{ywjb.dkjnc}}</span>
                            </div>
                        </div>

                        <div class="ywjbdiv leftfix">
                            <div class="ywjbtitle">存款(亿元)</div>
                            <div>
                                <img src="/static/ckywjb.png" alt="" class="ywjbimg">
                            </div>
                            <div class="ywjbnum">{{ywjb.ck}}</div>
                            <div>
                                <span class="bjtitle">较年初</span>
                                <span class="upnum" v-if="ywjb.ck > 0">+{{ywjb.ck}}</span>
                                <span class="upnum" v-if="ywjb.ck <= 0">{{ywjb.ck}}</span>
                            </div>
                        </div>

                        <div class="ywjbdiv leftfix">
                            <div class="ywjbtitle">不良率(%)</div>
                            <div>
                                <img src="/static/bllywjb.png" alt="" class="ywjbimg">

                            </div>
                            <div class="ywjbnum">{{ywjb.bll}}</div>
                            <div>
                                <span class="bjtitle">较年初</span>
                                <span class="upnum" v-if="ywjb.blljnc > 0">+{{ywjb.blljnc}}</span>
                                <span class="upnum" v-if="ywjb.blljnc <= 0">{{ywjb.blljnc}}</span>
                            </div>
                        </div>

                        <div class="ywjbdiv leftfix">
                            <div class="ywjbtitle">评级</div>
                            <div>
                                <img src="/static/pjywjb.png" alt="" class="ywjbimg">

                            </div>
                            <div class="ywjbnum">{{ywjb.pj}}</div>
                            <div>
                                <span class="bjtitle">区域排名</span><span class="upnum">{{ywjb.pjpm}}</span>
                            </div>
                        </div>

                        <div class="ywjbdiv2 leftfix">
                            <div class="ywjbtitle">收入(亿元)</div>
                            <div>
                                <img src="/static/srywjb.png" alt="" class="ywjbimg">

                            </div>
                            <div class="ywjbnum">{{ywjb.sr}}</div>
                            <div>
                                <span class="bjtitle">净利润：</span><span class="upnum">{{ywjb.srjlr}}</span>
                            </div>
                        </div>

                        <div class="ywjbdiv2 leftfix">
                            <div class="ywjbtitle">纳税(亿元)</div>
                            <div>
                                <img src="/static/nsywjb.png" alt="" class="ywjbimg">

                            </div>
                            <div class="ywjbnum">{{ywjb.ns}}</div>
                            <div>
                                <span class="bjtitle">累计纳税：</span><span class="upnum">{{ywjb.nslj}}</span>
                            </div>
                        </div>

                        <div class="ywjbdiv2 leftfix">
                            <div class="ywjbtitle">资本充足率(%)</div>
                            <div>
                                <img src="/static/zbczlywjb.png" alt="" class="ywjbimg">

                            </div>
                            <div class="ywjbnum">{{ywjb.zbczl}}</div>
                            <div>
                                <span class="bjtitle">拨备率：</span><span class="upnum">{{ywjb.zbczlbbl}}</span>
                            </div>
                        </div>

                        <div class="ywjbdiv2 leftfix">
                            <div class="ywjbtitle">资产(亿元)</div>
                            <div>
                                <img src="/static/zcywjb.png" alt="" class="ywjbimg">

                            </div>
                            <div class="ywjbnum">{{ywjb.zc}}</div>
                            <div>
                                <span class="bjtitle">负债：</span><span class="upnum">{{ywjb.zcfz}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="clearfix" style="margin-top: 20px;">
                    <div class=" div5 leftfix">

                        <div class="clearfix">
                            <div class="leftfix ckdiv cskb">
                                <div class="wztitle">存款(亿元)</div>
                                <div class="noszbk">{{ckdkwh.ckye}}</div>
                                <div>
                                    <span class="bjtitle">较年初</span>
                                    <span class="upnum" v-if="ckdkwh.ckyejnc>0">+{{ckdkwh.ckyejnc}}</span>
                                    <span class="upnum" v-if="ckdkwh.ckyejnc<=0">{{ckdkwh.ckyejnc}}</span>
                                </div>
                            </div>
                            <div class="leftfix ckdiv cskb">
                                <div class="wztitle">低息比(%)</div>
                                <div class="noszbk">{{ckdkwh.dxb}}</div>
                                <div>
                                    <span class="bjtitle">较年初</span>
                                    <span class="upnum" v-if="ckdkwh.dxbjnc>0">+{{ckdkwh.dxbjnc}}</span>
                                    <span class="upnum" v-if="ckdkwh.dxbjnc<=0">{{ckdkwh.dxbjnc}}</span>
                                </div>
                            </div>
                            <div class="leftfix ckdiv cskb">
                                <div class="wztitle">存贷比(%)</div>
                                <div class="noszbk">{{ckdkwh.cdk}}</div>
                                <div>
                                    <span class="bjtitle">较年初</span>
                                    <span class="upnum" v-if="ckdkwh.cdkjnc>0"> +{{ckdkwh.cdkjnc}}</span>
                                    <span class="upnum" v-if="ckdkwh.cdkjnc<=0"> {{ckdkwh.cdkjnc}}</span>
                                </div>
                            </div>
                            <div class="leftfix ckdiv cskb">
                                <div class="wztitle">付息率(%)</div>
                                <div class="noszbk">{{ckdkwh.fxl}}</div>
                                <div>
                                    <span class="bjtitle">较年初</span>
                                    <span class="upnum" v-if="ckdkwh.fxljnc>0"> +{{ckdkwh.fxljnc}}</span>
                                    <span class="upnum" v-if="ckdkwh.fxljnc<=0"> {{ckdkwh.fxljnc}}</span>
                                </div>
                            </div>

                        </div>
                        <div class="clearfix">
                            <!-- <div class="leftfix cskb" style="width: 240px;height: 240px;margin-right: 50px;margin-left: 20px;">
                </div> -->
                            <div class="cskb dkbt1 leftfix">
                                <chart095 :data="ckpieList" v-if="ckpieList.length > 0"></chart095>

                                <div class="cskb" style="color: #fff;">
                                    <div class="clearfix">
                                        <div class=" leftfix pietitle">

                                            <div class=" leftfix">
                                                <div class="xyd" :style="{ backgroundColor: getColorByIndex(0) }"></div>
                                            </div>
                                            <div class=" leftfix">活期</div>
                                            <div class=" leftfix" style="margin-left: 10px;">{{ckdkwh.ckhq}}亿</div>

                                        </div>
                                        <div class=" leftfix pietitle">

                                            <div class=" leftfix">
                                                <div class="xyd" :style="{ backgroundColor: getColorByIndex(1) }"></div>
                                            </div>
                                            <div class=" leftfix">一年</div>
                                            <div class=" leftfix" style="margin-left: 10px;">{{ckdkwh.ckyn}}亿</div>

                                        </div>
                                    </div>
                                    <div class="clearfix">
                                        <div class=" leftfix pietitle">

                                            <div class=" leftfix">
                                                <div class="xyd" :style="{ backgroundColor: getColorByIndex(2) }"></div>
                                            </div>
                                            <div class=" leftfix">两年</div>
                                            <div class=" leftfix" style="margin-left: 10px;">{{ckdkwh.ckln}}亿</div>

                                        </div>
                                        <div class=" leftfix pietitle">

                                            <div class=" leftfix">
                                                <div class="xyd" :style="{ backgroundColor: getColorByIndex(3) }"></div>
                                            </div>
                                            <div class=" leftfix">三年</div>
                                            <div class=" leftfix" style="margin-left: 10px;">{{ckdkwh.cksn}}亿</div>

                                        </div>
                                    </div>
                                    <div class="clearfix">
                                        <div class=" leftfix pietitle">

                                            <div class=" leftfix">
                                                <div class="xyd" :style="{ backgroundColor: getColorByIndex(4) }"></div>
                                            </div>
                                            <div class=" leftfix">五年</div>
                                            <div class=" leftfix" style="margin-left: 10px;">{{ckdkwh.ckwn}}亿</div>

                                        </div>
                                        <div class=" leftfix pietitle">

                                            <div class=" leftfix">
                                                <div class="xyd" :style="{ backgroundColor: getColorByIndex(5) }"></div>
                                            </div>
                                            <div class=" leftfix">其他</div>
                                            <div class=" leftfix" style="margin-left: 10px;">{{ckdkwh.ckqt}}亿</div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div class="leftfix cskb" style="width: 240px;height: 240px;">
                                <dv-charts :option="option" />
                                <!-- <highcharts  :options="chartOptions" ></highcharts> -->
                            </div>
                        </div>

                    </div>
                    <div class=" div6 leftfix">
                        <div class="cskb" style="width: 600px; height: 50px;">
                            <div class="leftfix  zhxxtitle" style="margin-left: 320px;margin-top: 10px;padding: 0px 5px;" v-if="!sjyhShow">手机银行
                            </div>
                            <div class="leftfix  zhxxtitleChange" style="margin-left: 320px;margin-top: 10px;padding: 0px 5px;" v-if="sjyhShow">
                                手机银行
                            </div>
                            <div class="leftfix  zhxxtitle" style="margin-left: 10px;margin-top: 10px;padding: 0px 5px;" v-if="!ckShow">存款(亿)
                            </div>
                            <div class="leftfix  zhxxtitleChange" style="margin-left: 10px;margin-top: 10px;padding: 0px 5px;" v-if="ckShow">
                                存款(亿)
                            </div>
                            <div class="leftfix  zhxxtitle" style="margin-left: 10px;margin-top: 10px;padding: 0px 5px;" v-if="!dkShow">
                                贷款(亿)
                            </div>
                            <div class="leftfix  zhxxtitleChange" style="margin-left: 10px;margin-top: 10px;padding: 0px 5px;" v-if="dkShow">
                                贷款(亿)
                            </div>
                        </div>
                        <div style="margin-left: 18px;">
                            <!-- <ul class="item">
                    <li v-for="item in listData">
                      <span class="title" v-text="item.title"></span><span class="date" v-text="item.date"></span>
                    </li>
                  </ul> -->
                            <!-- <table v-if="ckShow">
                                <thead>
                                    <tr>
                                        <th style="width: 60px;">序号</th>
                                        <th style="width: 80px;">支行</th>
                                        <th style="width: 80px;">存款余额</th>
                                        <th style="width: 80px;">低息余额</th>
                                        <th style="width: 80px;">两年定期</th>
                                        <th style="width: 80px;">三年定期</th>
                                        <th style="width: 80px;">五年及以上</th>
                                    </tr>
                                </thead>
                            </table>
                            <vue-seamless-scroll :data="ckList" class="seamless-warp" v-if="ckShow" :class-option="classOption">
                                <table>
                                    <tbody>
                                        <tr v-for="item,index in ckList">
                                            <td style="width: 60px;">{{index+1}}</td>
                                            <td style="width: 80px;">{{item.zzjc}}</td>
                                            <td style="width: 80px;">{{item.ckCkye}}</td>
                                            <td style="width: 80px;">{{item.ckDyye}}</td>
                                            <td style="width: 80px;">{{item.ckLndq}}</td>
                                            <td style="width: 80px;">{{item.ckSndq}}</td>
                                            <td style="width: 80px;">{{item.ckWnjys}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </vue-seamless-scroll> -->


                            <!-- <dv-scroll-board  v-if="sjyhShow" :config="sjyhconfig" style="width:580px;line-height:40px" :rowNum="rowNum"/>
                            <dv-scroll-board  v-if="ckShow" :config="ckconfig" style="width:580px;line-height:40px" :rowNum="rowNum"/>
                            <dv-scroll-board  v-if="dkShow" :config="dkconfig" style="width:580px;line-height:40px" :rowNum="rowNum"/> -->

                            <dv-scroll-board  :config="ckconfig" style="width:580px;line-height:40px" :rowNum="rowNum"/>

                            <!-- <table v-if="sjyhShow">
                                <thead>
                                    <tr>
                                        <th style="width: 60px;">序号</th>
                                        <th style="width: 80px;">业务</th>
                                        <th style="width: 80px;">数量</th>
                                        <th style="width: 80px;">存款</th>
                                        <th style="width: 80px;">月交易量</th>
                                    </tr>
                                </thead>
                            </table>
                                <table>
                                    <tbody>
                                        <tr v-for="item,index in sjyhList">
                                            <td style="width: 60px;">{{index+1}}</td>
                                            <td style="width: 80px;">{{item.sjyhYw}}</td>
                                            <td style="width: 80px;">{{item.sjyhSl}}</td>
                                            <td style="width: 80px;">{{item.sjyhCk}}</td>
                                            <td style="width: 80px;">{{item.sjyhYjyl}}</td>
                                        </tr>
                                    </tbody>
                                </table> -->

                            <!-- <table v-if="dkShow">
                                <thead>
                                    <tr>
                                        <th style="width: 60px;">序号</th>
                                        <th style="width: 80px;">支行</th>
                                        <th style="width: 80px;">贷款</th>
                                        <th style="width: 80px;">平台</th>
                                        <th style="width: 80px;">一般</th>
                                        <th style="width: 80px;">按揭</th>
                                        <th style="width: 80px;">扶贫</th>
                                    </tr>
                                </thead>
                            </table>
                            <vue-seamless-scroll :data="dkList" class="seamless-warp" v-if="dkShow" :class-option="classOption">
                                <table>
                                    <tbody>
                                        <tr v-for="item,index in dkList">
                                            <td style="width: 60px;">{{index+1}}</td>
                                            <td style="width: 80px;">{{item.zzjc}}</td>
                                            <td style="width: 80px;">{{item.dkDk}}</td>
                                            <td style="width: 80px;">{{item.dkPT}}</td>
                                            <td style="width: 80px;">{{item.dkYb}}</td>
                                            <td style="width: 80px;">{{item.dkAj}}</td>
                                            <td style="width: 80px;">{{item.dkPp}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </vue-seamless-scroll> -->

                        </div>
                    </div>
                </div>
            </div>
            <div class="leftfix div2">
                <div class="whfcdiv1 cskb">
                    <!-- <img src="/static/cswhfc.png" alt="" style="width: 100%;height: 100%;"> -->
                    <video style="width: 100%;height: 100%;" controls src="/static/mp4/zuixin.mp4" loop>
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div class="clearfix">
                    <div class="leftfix whfcdiv2 ">

                        <div class="whfcdiv3">
                            <span class="upnum">{{ckdkwh.zhsl}}个</span>
                            <span style="font-size: 16px;color:#fff;">支行</span>
                        </div>

                    </div>
                    <div class="leftfix whfcdiv22">
                        <div class="whfcdiv3">
                            <span class="upnum">{{ckdkwh.flcsl}}个</span>
                            <span style="font-size: 16px;color:#fff;">分理处</span>
                        </div>
                    </div>
                    <div class="leftfix whfcdiv23">
                        <div class="whfcdiv3">
                            <span class="upnum">{{ckdkwh.bssl}}个</span>
                            <span style="font-size: 16px;color:#fff;">部室</span>
                        </div>
                    </div>
                    <div class="leftfix whfcdiv24">
                        <div class="whfcdiv3">
                            <span style="font-size: 16px;color:#fff;">在职员工</span>
                            <span class="upnum">{{ckdkwh.zzygsl}}人</span>
                        </div>
                    </div>
                </div>

                <div class="clearfix">
                    <div class="leftfix dkbt2">
                        <chart095 :data="sexpieList" v-if="sexpieList.length > 0"></chart095>
                    </div>
                    <div class="leftfix" style="color: #fff;margin-top: 50px;margin-left: -20px;width: 130px;">
                        <div class=" pietitle" style="margin-bottom: 20px;">
                            <div class=" leftfix">
                                <div class="xyd" :style="{ backgroundColor: getColorByIndex(0) }"></div>
                            </div>
                            <div class=" leftfix">男</div>
                            <div class=" leftfix" style="margin-left: 15px;">{{ckdkwh.ygnan}}人</div>
                        </div>
                        <div class="  pietitle">

                            <div class=" leftfix">
                                <div class="xyd" :style="{ backgroundColor: getColorByIndex(1) }"></div>
                            </div>
                            <div class=" leftfix">女</div>
                            <div class=" leftfix" style="margin-left: 15px;">{{ckdkwh.ygnv}}人</div>

                        </div>
                    </div>
                    <div class="leftfix dkbt2">
                        <chart095 :data="ygpieList" v-if="ygpieList.length > 0"></chart095>

                    </div>
                    <div class="leftfix" style="color: #fff;margin-top: 50px;margin-left: -30px;">
                        <div class=" pietitle" v-for="item,index in ygpieList">
                            <div class=" leftfix">
                                <div class="xyd" :style="{ backgroundColor: getColorByIndex(index) }"></div>
                            </div>
                            <div class=" leftfix">{{item[0]}}</div>
                            <div class=" leftfix" style="margin-left: 10px;">{{item[1]}}人</div>
                        </div>

                    </div>
                </div>

                <div style="margin-left: 20px;" class="">
                    <div class="leftfix">
                        <img src="/static//ldh.png" alt="" style="width: 170px;height: 232px;">
                    </div>
                    <div class="leftfix whfcwzdiv">
                        <div class="whfcnamediv">优秀员工</div>
                        <div class="whfcnamediv2">
                            <p>优秀员工事迹</p>
                            </div>
                    </div>
                </div>

            </div>

        </div>
    </div>
</dv-full-screen-container>
</template>

<script>
import Chart095 from '@/views/bigscreen/modules/Chart095'
import BigHeader from '@/views/bigscreen/modules/BigHeader.vue'
import { encryptedData, decryptedData } from '@/utils/jsencrypt'

import { getAction, httpAction } from '@/api/manage'

export default {
  components: {
    Chart095,
    BigHeader,
  },
  data() {
    return {
      classOption: {
        step: 0.8,
      },
      sjyhconfig: {
        data: [],
        header: ['业务', '数量', '存款', '月交易量'],
        index: true,
        columnWidth: [100, 100, 100, 100],
        align: ['center'],
        rowNum: this.rowNum,
        headerBGC: 'rgba(0, 138, 255, 0.4)',
        indexHeader:'序号'
      },
      ckconfig: {
        data: [],
        header: ['支行', '存款余额', '低息余额', '两年定期', '三年定期', '五年及以上'],
        index: true,
        columnWidth: [50, 100, 75, 75, 75, 100],
        align: ['center'],
        rowNum: this.rowNum,
        headerBGC: 'rgba(0, 138, 255, 0.4)',
        indexHeader:'序号'
      },
      dkconfig: {
        data: [],
        header: ['支行', '贷款', '平台', '一般', '按揭', '扶贫'],
        index: true,
        columnWidth: [50, 110, 80, 80, 80, 80],
        align: ['center'],
        rowNum: this.rowNum,
        headerBGC: 'rgba(0, 138, 255, 0.4)',
        indexHeader:'序号'
      },
      option: {
        title: {
          text: '存款净增',
          style: {
            fill: '#fff',
          },
        },
        series: [
          {
            type: 'gauge',
            data: [{ name: 'itemA', value: 55 }],
            center: ['50%', '55%'],
            axisLabel: {
              formatter: '{value}%',
              style: {
                fill: '#fff',
              },
            },
            axisTick: {
              style: {
                stroke: '#fff',
              },
            },
            animationCurve: 'easeInOutBack',
          },
        ],
      },
      rowNum: 10,
      nowtime: '',
      day: '00',
      hour: '00',
      min: '00',
      second: '00',
      sjyhShow: true,
      ckShow: false,
      dkShow: false,
      bz: 1,
      sjyhList: [],
      ckList: [],
      dkList: [],
      listData: [],
      allzh: [],
      ywjb: {},
      zhxxList: [],
      ckdkwh: {},
      dkjeArr: [],
      dkkhArr: [],
      dkpieList: [],
      khpieList: [],
      ckpieList: [],
      sexpieList: [],
      ygpieList: [],
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
        '#7FFF00',
      ],
      chartOptions: {
        backgroundColor: 'rgba(0,0,0,0)',
        title: {
          text: '80%<br>存款净增',
          align: 'center',
          verticalAlign: 'middle',
          y: 80,
        },

        plotOptions: {
          pie: {
            dataLabels: {
              enabled: false,
            },
            startAngle: -90, // 圆环的开始角度
            endAngle: 90, // 圆环的结束角度
            center: ['50%', '75%'],
          },
        },
        series: [
          {
            type: 'pie',
            name: '浏览器占比',
            innerSize: '50%',
            data: [['Firefox', 120]],
          },
        ],
      },
    }
  },
  created() {
    //this.getWhfcList();
    this.getListInfo()
  },
  mounted() {
    // 显示时间1s1s的显示
    let that = this

    this.timer2 = setInterval(function () {
      if (that.bz == 1) {
        that.sjyhShow = true
        that.ckShow = false
        that.dkShow = false
        that.bz = 2
      } else if (that.bz == 2) {
        that.sjyhShow = false
        that.ckShow = true
        that.dkShow = false
        that.bz = 3
      } else if (that.bz == 3) {
        that.sjyhShow = false
        that.ckShow = false
        that.dkShow = true
        that.bz = 1
      }
    }, 10000)
  },
  methods: {
    //加载我行风采
    getWhfcList() {
      console.log('1111111111111')
      getAction('/bigscreen/vDpYwhz/index', {
        zbfl: 'whfc',
      }).then((res) => {
        console.log(res)
      })
    },
    //正式接口
    getIndexInfo() {
      getAction('/bigscreen/vDpYwhz/index').then((res) => {
        console.log(res)
      })
    },

    getListInfo() {
      getAction('/bigscreen/index/info').then((res) => {
        console.log('===============================================')
        console.log(res)
        this.ywjb = res.result.ywjb[0]
        this.sjyhList = res.result.sjyhList

        let sjyhArr = []
        for (var i = 0; i < this.sjyhList.length; i++) {
          let obj = this.sjyhList[i]
          sjyhArr.push([obj.sjyhYw, obj.sjyhSl, obj.sjyhCk, obj.sjyhYjyl])
        }

        this.sjyhconfig = {
          data: sjyhArr,
          header: ['业务', '数量', '存款', '月交易量'],
          index: true,
          columnWidth: [100, 100, 100, 100],
          align: ['center'],
          rowNum: this.rowNum,
          headerBGC: 'rgba(0, 138, 255, 0.4)',
          indexHeader:'序号'
        }

        this.ckList = res.result.ckList

        let ckArr = []
        for (var i = 0; i < this.ckList.length; i++) {
          let obj = this.ckList[i]
          ckArr.push([obj.zzjc, obj.ckCkye, obj.ckDyye, obj.ckLndq, obj.ckSndq, obj.ckWnjys])
        }

        this.ckconfig = {
          data: ckArr,
          header: ['支行', '存款余额', '低息余额', '两年定期', '三年定期', '五年及以上'],
          index: true,
          columnWidth: [50, 100, 75, 75, 75, 100],
          align: ['center'],
          rowNum: this.rowNum,
          headerBGC: 'rgba(0, 138, 255, 0.4)',
          indexHeader:'序号'
        }

        this.dkList = res.result.dkList

        let dkArr = []
        for (var i = 0; i < this.dkList.length; i++) {
          let obj = this.dkList[i]
          dkArr.push([obj.zzjc, obj.dkDk, obj.dkPt, obj.dkYb, obj.dkAj, obj.dkFp])
        }

        this.dkconfig = {
          data: dkArr,
          header: ['支行', '贷款', '平台', '一般', '按揭', '扶贫'],
          index: true,
          columnWidth: [50, 110, 80, 80, 80, 80],
          align: ['center'],
          rowNum: this.rowNum,
          headerBGC: 'rgba(0, 138, 255, 0.4)',
          indexHeader:'序号'
        }

        this.ckdkwh = res.result.ckdkwh

        this.dkjeArr = res.result.ckdkwh.dkjeArr
        this.dkkhArr = res.result.ckdkwh.dkkhArr

        let dkpie = []
        dkpie.push(['正常', this.ckdkwh.dkjezc])
        dkpie.push(['关注', this.ckdkwh.dkjegz])
        dkpie.push(['次级', this.ckdkwh.dkjecj])
        dkpie.push(['可疑', this.ckdkwh.dkjeky])
        dkpie.push(['损失', this.ckdkwh.dkjess])

        let khpie = []
        khpie.push(['60后', this.ckdkwh.dkkh60])
        khpie.push(['70后', this.ckdkwh.dkkh70])
        khpie.push(['80后', this.ckdkwh.dkkh80])
        khpie.push(['90后', this.ckdkwh.dkkh90])
        khpie.push(['00后', this.ckdkwh.dkkh00])
        khpie.push(['其他', this.ckdkwh.dkkhqt])
        khpie.push(['对公', this.ckdkwh.dkkhdg])

        let ckpie = []
        ckpie.push(['活期', this.ckdkwh.ckhq])
        ckpie.push(['一年', this.ckdkwh.ckyn])
        ckpie.push(['两年', this.ckdkwh.ckln])
        ckpie.push(['三年', this.ckdkwh.cksn])
        ckpie.push(['五年', this.ckdkwh.ckwn])
        ckpie.push(['其他', this.ckdkwh.ckqt])

        let sexpie = []
        sexpie.push(['男', this.ckdkwh.ygnan])
        sexpie.push(['女', this.ckdkwh.ygnv])

        let ygpie = []
        ygpie.push(['70后', this.ckdkwh.yg70])
        ygpie.push(['80后', this.ckdkwh.yg80])
        ygpie.push(['90后', this.ckdkwh.yg90])
        ygpie.push(['00后', this.ckdkwh.yg00])
        ygpie.push(['其他', this.ckdkwh.ygqt])

        this.dkpieList = dkpie
        this.khpieList = khpie
        this.ckpieList = ckpie
        this.sexpieList = sexpie
        this.ygpieList = ygpie
      })
    },
    sjs() {
      return Math.round(Math.random() * 10000)
    },
    getColorByIndex(index) {
      return this.colors[index] || '#8277E9' // 如果index没有对应的颜色，使用默认颜色
    },
  },
  // 销毁定时器
}
</script>

<style scoped>
.xyd {
  width: 8.5px;
  height: 8.5px;
  border-radius: 8.5px;
  margin-left: 30px;
  margin-top: 5px;
  margin-right: 10px;
}

.pietitle {
  width: 150px;
  font-size: 14px;
  text-align: center;
  margin-bottom: 10px;
}

.dkbt1 {
  /* margin-top: -165px;
    margin-left: 22px; */
  width: 300px;
  margin: 10px 0 10px 0;
}

.dkbt2 {
  margin-left: 22px;
  width: 160px;
}

.seamless-warp {
  height: 360px;
  overflow: hidden;
}

.whfcnamediv2 {
  font-size: 14px;
  color: #fff;
  margin: 22px 0 21px 21px;
}

.whfcnamediv {
  font-size: 20px;
  color: #fff;
  margin: 22px 0 21px 21px;
}

.whfcwzdiv {
  height: 232px;
  background-color: #144eac;
  width: 390px;
}

.whfcdiv3 {
  text-align: center;
  margin: 100px 0px 0px 0px;
}

.whfcdiv2 {
  margin: 21px 0px 0px 20px;
  width: 128px;
  height: 158px;
  background-image: url(/static/zhsl.png);
  background-size: 100% 100%;
}

.whfcdiv22 {
  margin: 21px 0px 0px 20px;
  width: 128px;
  height: 158px;
  background-image: url(/static/flcsl.png);
  background-size: 100% 100%;
}

.whfcdiv23 {
  margin: 21px 0px 0px 20px;
  width: 128px;
  height: 158px;
  background-image: url(/static/bssl.png);
  background-size: 100% 100%;
}

.whfcdiv24 {
  margin: 21px 0px 0px 20px;
  width: 128px;
  height: 158px;
  background-image: url(/static/zzygsl.png);
  background-size: 100% 100%;
}

.whfcdiv1 {
  margin: 58px 23px 0px 22px;
  width: 570px;
  height: 320px;
}

.zhxxtitleChange {
  font-size: 14px;
  color: #1884fc;
  border: 1px #1884fc solid;
}

.zhxxtitle {
  font-size: 14px;
  color: #fff;
  border: 1px #fff solid;
}

table {
  text-align: center;
  color: #fff;
  width: 580px;
  line-height: 30px;
}

th {
  background-color: rgba(0, 138, 255, 0.4);
}

.ywjbnum {
  color: #2ee4ff;
  font-size: 30px;
  font-weight: 700;
  margin-top: 10px;
  margin-bottom: 15px;
}

.ywjbtitle {
  color: #fff;
  font-size: 17px;
  padding-top: 10px;
  padding-bottom: 10px;
}

.ywjbimg {
  width: 82px;
  height: 73px;
}

.ywjbdiv {
  width: 134px;
  height: 188px;
  margin: 60px 0px 9px 15px;
  background-color: rgba(15, 115, 224, 0.2);
  text-align: center;
}

.ywjbdiv2 {
  width: 134px;
  height: 188px;
  margin: 3px 0px 9px 15px;
  background-color: rgba(15, 115, 224, 0.2);
  text-align: center;
}

.ckdiv {
  text-align: center;
  margin: 60px 20px 20px 20px;
}

.upnum {
  font-size: 16px;
  color: #fcad23;
}

.bjtitle {
  font-size: 16px;
  color: #caf0fe;
}

.noszbk {
  font-size: 40px;
  color: #fff;
  height: 50px;
  line-height: 50px;
  font-weight: 700;
}

.szbk {
  background-image: url(/static/szbk.png);
  width: 46px;
  height: 58px;
  text-align: center;
  line-height: 58px;
  font-size: 40px;
  color: #fff;
  font-weight: 700;
}

.wztitle {
  font-size: 16px;
  color: #71a1ef;
  height: 30px;
  line-height: 30px;
}

.sjrq {
  color: #fff;
  font-size: 14px;
  height: 40px;
  line-height: 52px;
  padding-left: 380px;
}

.xf {
  margin-left: 16px;
}

.div2 {
  background-image: url(/static/whfc.png);
  height: 973px;
  width: 615px;
}

.div5 {
  background-image: url(/static/ck.png);
  height: 477px;
  width: 615px;
}

.div6 {
  background-image: url(/static/zhxx.png);
  height: 477px;
  width: 615px;
  margin-left: 20px;
  margin-right: 20px;
}

.div4 {
  background-image: url(/static/ywjb.png);
  height: 477px;
  width: 615px;
  margin-left: 20px;
  margin-right: 20px;
}

.div3 {
  background-image: url(/static/dk.png);
  height: 477px;
  width: 615px;
}

.leftfix {
  float: left;
}

.rightfix {
  float: right;
}

.clearfix::after {
  content: '';
  display: block;
  clear: both;
}

.cskb {
  border: 0px #fff solid;
}

.contains {
  background-image: url(/static/bj.png);
  background-size: cover;
  width: 1920px;
  height: 1080px;
}
</style>
