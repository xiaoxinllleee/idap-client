<template>
  <a-modal :width="900"
           :visible="visible"
           :confirmLoading="confirmLoading"
           :destroyOnClose="true"
           :bodyStyle="{padding: '0px'}"
           @ok="handleOk"
           @cancel="handleCancel"
           okText="导出"
           cancelText="关闭">


  <a-card :bordered="false" :class="{'abcdefg':true}">
    <div class="no-print" style="text-align: right;padding-right: 20px;">
      <a-button v-print="'#printContent'" ghost type="primary">打印</a-button>
    </div>
    <section ref="print" id="printContent" class="abcdefg">
      <div style="text-align: center">
        <p style="font-size: 20px;font-weight: 800">{{zzjc}}{{nd}}农户评议授信信息表</p>
      </div>
      <!--签字-->

        <div class="sign" style="text-align: left;height: inherit">

          <table   width="100%" >
            <colgroup>
              <col style="text-align:center;width:60px;word-break: break-all;"></col>
              <col style="text-align:center;width:60px;word-break: break-all;"></col>
              <col style="text-align:center;width:60px;word-break: break-all;"></col>
              <col style="text-align:center;width:60px;word-break: break-all;"></col>
              <col style="text-align:center;width:40px;word-break: break-all;"></col>
              <col style="text-align:center;width:60px;word-break: break-all;"></col>
              <col style="text-align:center;width:30px;word-break: break-all;"></col>
              <col style="text-align:center;width:40px;word-break: break-all;"></col>
              <col style="text-align:center;width:60px;word-break: break-all;"></col>
              <col style="text-align:center;width:120px;word-break: break-all;"></col>
              <col style="text-align:center;width:70px;word-break: break-all;"></col>
              <col style="text-align:center;width:100px;word-break: break-all;"></col>
              <col style="text-align:center;width:60px;word-break: break-all;"></col>
            </colgroup>
            <tr>
              <td colspan="1" style="text-align:center;width: 60px;">
                住址：
              </td>
              <td colspan="2" style="text-align:left;width: 120px;">
                <a-input  style="border: black;width: 120px;text-align:left;" v-model="this.model.ssxz_dictText"/>
              </td>
              <!--<td colspan="1" style="text-align:center;width: 60px;">-->
                <!--乡(镇)-->
              <!--</td>-->
              <td colspan="2" style="text-align:left;width: 100px;">
                <a-input  style="border: black;width: 100px;text-align:left;" v-model="this.model.xzc_dictText"/>
              </td>
              <!--<td colspan="1" style="text-align:center;width: 40px;">-->
                <!--村-->
              <!--</td>-->
              <td colspan="2" style="text-align:left;width: 100px;">
                <a-input  style="border: black;text-align:left;" v-model="this.model.xzz_dictText"/>
              </td>
              <!--<td colspan="1" style="text-align:center;width: 40px;">-->
                <!--组-->
              <!--</td>-->
              <td colspan="2" style="text-align:center;width: 90px;">
                户号编码：
              </td>
              <td colspan="1" style="text-align:center;width: 120px;">
                <a-input  style="border: black;width: 120px;text-align:left;" v-model="this.model.hhbm"/>
              </td>
              <td colspan="1" style="text-align:center;width: 70px">
                评议日期:
              </td>
              <td colspan="1"style="text-align:center;">
                <a-input  style="border: black;width: 100px;text-align:left;" />
              </td>
              <td colspan="1"style="text-align:center;">
                单位:元
              </td>
            </tr>
          </table>

          <table align="center" border="1"  width="100%" >
            <colgroup>
              <col style="text-align:center;width:60px;word-break: break-all;"></col>
              <col style="text-align:center;width:60px;word-break: break-all;"></col>
              <col style="text-align:center;width:60px;word-break: break-all;"></col>
              <col style="text-align:center;width:60px;word-break: break-all;"></col>
              <col style="text-align:center;width:40px;word-break: break-all;"></col>
              <col style="text-align:center;width:60px;word-break: break-all;"></col>
              <col style="text-align:center;width:30px;word-break: break-all;"></col>
              <col style="text-align:center;width:40px;word-break: break-all;"></col>
              <col style="text-align:center;width:60px;word-break: break-all;"></col>
              <col style="text-align:center;width:120px;word-break: break-all;"></col>
              <col style="text-align:center;width:60px;word-break: break-all;"></col>
              <col style="text-align:center;width:70px;word-break: break-all;"></col>
              <col style="text-align:center;width:100px;word-break: break-all;"></col>
            </colgroup>
            <tr>
              <td :rowspan="sj" colspan="1" style="text-align:center;width:60px ">
                户主及家庭成员情况
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;width: 60px;">
                关系
              </td>
              <td rowspan="1" colspan="2" style="text-align:center;width: 120px;">
                姓名
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;width: 40px;">
                性别
              </td>
              <td rowspan="1" colspan="3" style="text-align:center;width: 130px">
                身份证号码
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;width: 60px;">
                职业
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;width: 120px;">
                工作单位
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;width: 60px;" >
                联系电话
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;width: 70px;">
                健康状况
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;width: 100px;" >
                劳动能力
              </td>
            </tr>

            <tr v-for='(list,index) in jtcyList' v-bind:key='list.zjhm'>
              <td rowspan="1" colspan="1" style="text-align:center;">
                {{list.yhzgx}}
              </td>
              <td rowspan="1" colspan="2" style="text-align:center;">
                {{list.khmc}}
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                {{list.xb}}
              </td>
              <td rowspan="1" colspan="3" style="text-align:center;word-break: break-all;">
                {{list.zjhm}}
              </td>
              <td colspan="1" style="text-align:center;">
                {{list.zy}}
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                {{list.gzdw}}
              </td>
              <td colspan="1" style="text-align:center;word-break: break-all;">
                {{list.lxfs}}
              </td>
              <td colspan="1" style="text-align:center;">
                {{list.jkzk}}
              </td>
              <td colspan="1" style="text-align:center;">
                {{list.ldnl}}
              </td>
            </tr>


            <tr>
              <td rowspan=3 colspan="1" style="text-align:center;">
                资产
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                类别
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                房产
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                家电
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                家具
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                交通运输工具
              </td>
              <td rowspan="1" colspan="2" style="text-align:center;">
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                其他
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                合计
              </td>
            </tr>

            <tr>
              <td rowspan="1" colspan="1" style="text-align:center;">
                数量
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                {{nhPjsxxx.fcsl}}
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                {{nhPjsxxx.jydqsl}}
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">

              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                {{nhPjsxxx.jtgjsl}}
              </td>
              <td rowspan="1" colspan="2" style="text-align:center;">
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                {{nhPjsxxx.qtzcsl}}
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">

              </td>
            </tr>

            <tr>
              <td rowspan="1" colspan="1" style="text-align:center;">
                价值
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                {{nhPjsxxx.fcjz}}
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                {{nhPjsxxx.jydqjz}}
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">

              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                {{nhPjsxxx.jtgjjz}}
              </td>
              <td rowspan="1" colspan="2" style="text-align:center;">
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                {{nhPjsxxx.qtzcjz}}
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                {{nhPjsxxx.zcjzSum}}
              </td>
            </tr>

            <tr>
              <td rowspan=3 colspan="1" style="text-align:center;">
                负债
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                类型
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                本系统
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                他行
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                信用卡
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
              </td>
              <td rowspan="1" colspan="2" style="text-align:center;">
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                其他
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">

              </td>
            </tr>

            <tr>
              <td rowspan="1" colspan="1" style="text-align:center;">
                债权人
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                {{nhPjsxxx.bxtjkzqr}}
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                {{nhPjsxxx.thjkzqr}}
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                {{nhPjsxxx.xykzqr}}
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">

              </td>
              <td rowspan="1" colspan="2" style="text-align:center;">
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                {{nhPjsxxx.qtfzzqr}}
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">

              </td>
            </tr>

            <tr>
              <td rowspan="1" colspan="1" style="text-align:center;">
                金额
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                {{nhPjsxxx.bxtjksl}}
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                {{nhPjsxxx.thjksl}}
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                {{nhPjsxxx.xyksl}}
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">

              </td>
              <td rowspan="1" colspan="2" style="text-align:center;">
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                {{nhPjsxxx.qtfzsl}}
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                {{nhPjsxxx.fzSum}}
              </td>
            </tr>

            <tr>
              <td rowspan=5 colspan="1" style="text-align:center;">
                经营情况
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                类别
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                种植
              </td>
              <td rowspan="1" colspan="2" style="text-align:center;">
                养殖
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                商业
              </td>
              <td rowspan="1" colspan="3" style="text-align:center;">
                劳务
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                其他
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                合计
              </td>
            </tr>

            <tr>
              <td rowspan="1" colspan="1" style="text-align:center;">
                项目情况
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                {{nhPjsxxx.zzxmqk}}
              </td>
              <td rowspan="1" colspan="2" style="text-align:center;">
                {{nhPjsxxx.yzxmqk}}
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                {{nhPjsxxx.syxmqk}}
              </td>
              <td rowspan="1" colspan="3" style="text-align:center;">
                {{nhPjsxxx.lwxmqk}}
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                {{nhPjsxxx.qtxmqk}}
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">

              </td>
            </tr>

            <tr>
              <td rowspan="1" colspan="1" style="text-align:center;">
                年收入
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                {{nhPjsxxx.zzxmsr}}
              </td>
              <td rowspan="1" colspan="2" style="text-align:center;">
                {{nhPjsxxx.yzxmsr}}
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                {{nhPjsxxx.syxmsr}}
              </td>
              <td rowspan="1" colspan="3" style="text-align:center;">
                {{nhPjsxxx.nwxmsr}}
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                {{nhPjsxxx.qtxmsr}}
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                {{nhPjsxxx.srSum}}
              </td>
            </tr>

            <tr>
              <td rowspan="1" colspan="1" style="text-align:center;">
                年支出
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                {{nhPjsxxx.zzxmzc}}
              </td>
              <td rowspan="1" colspan="2" style="text-align:center;">
                {{nhPjsxxx.yzxmzc}}
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                {{nhPjsxxx.syxmzc}}
              </td>
              <td rowspan="1" colspan="3" style="text-align:center;">
                {{nhPjsxxx.nwxmzc}}
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                {{nhPjsxxx.qtxmzc}}
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                {{nhPjsxxx.zcSum}}
              </td>
            </tr>

            <tr>
              <td rowspan="1" colspan="1" style="text-align:center;">
                净收入
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                {{nhPjsxxx.zzxmjsr}}
              </td>
              <td rowspan="1" colspan="2" style="text-align:center;">
                {{nhPjsxxx.yzxmjsr}}
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                {{nhPjsxxx.syxmjsr}}
              </td>
              <td rowspan="1" colspan="3" style="text-align:center;">
                {{nhPjsxxx.nwxmjsr}}
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                {{nhPjsxxx.qtxmjsr}}
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                {{nhPjsxxx.jsrSum}}
              </td>
            </tr>

            <tr>
              <td rowspan=2 colspan="1" style="text-align:center;">
                家庭开支
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                生活开支
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">

              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">

              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                其他
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                合计
              </td>
              <td rowspan="2" colspan="6" style="text-align:center;">
                户主及家庭成员社会诚信、家庭及邻里关系、道德品质等信用度综合评价（优秀、较好、一般、差）
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                评价结果
              </td>
            </tr>

            <tr style="height: 30px;">
              <td rowspan="1" colspan="1" style="text-align:center;">

              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">

              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">

              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">

              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">

              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                {{nhPjsxxx.shpj}}
              </td>
            </tr>

            <tr>
              <td rowspan=2 colspan="1" style="text-align:center;">
                与我行相关业务
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                存款余额
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                存款日平
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                贷款余额
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                不良余额
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                手机银行
              </td>
              <td rowspan="1" colspan="2" style="text-align:center;">
                ETC
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                社保卡
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                E支付
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                信用卡
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                便民卡
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">

              </td>
            </tr>
            <tr style="height: 30px;">
              <td rowspan="1" colspan="1" style="text-align:center;">
                {{ywhywwlxx.ckye}}
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                {{ywhywwlxx.ckrpye}}
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                {{ywhywwlxx.dkye}}
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                {{ywhywwlxx.bldkye}}
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                {{ywhywwlxx.sjyh}}
              </td>
              <td rowspan="1" colspan="2" style="text-align:center;">
                {{ywhywwlxx.etc}}
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                {{ywhywwlxx.sbk}}
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                {{ywhywwlxx.ezf}}
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                {{ywhywwlxx.xyk}}
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">
                {{ywhywwlxx.bmk}}
              </td>
              <td rowspan="1" colspan="1" style="text-align:center;">

              </td>
            </tr>

            <tr style="height: 60px;">
              <td rowspan="1" colspan="13" style="text-align:left;">
                <span style="font-weight: bold">评议结果：</span>{{pyxx.pysl}}人评议平均{{pyxx.pypjdf}}分，授信额度 {{pyxx.jysxed}} 元。最终授信额度 {{nhPjsxxx.nhzzsxed}} 元。
              </td>
            </tr>

            <tr>
              <td rowspan="1" colspan="7" style="text-align:left;border-bottom: none;">
                <span style="font-weight: bold">管户信贷员意见：</span> 同意该户&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年度内部授信最高限额
              </td>
              <td rowspan="1" colspan="6" style="text-align:left;border-bottom: none;">
                <span style="font-weight: bold">支行审核意见：</span>同意核定该户&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年度，内部授信最高限额
              </td>
            </tr>

            <tr>
              <td rowspan="1" colspan="7" style="text-align:left;border-width: 0px 1px;">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;万元，其中：公开授信最高限额&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;万元。
              </td>
              <td rowspan="1" colspan="6" style="text-align:left;border-width: 0px 1px;">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;万元，其中：公开授信最高限额&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;万元。
              </td>
            </tr>

            <tr style="height: 60px;">
              <td rowspan="1" colspan="7" style="text-align:left;border-width: 0px 1px;">
                &nbsp;&nbsp;信贷员 签字（章）：
              </td>
              <td rowspan="1" colspan="6" style="text-align:left;border-width: 0px 1px;">
                &nbsp;&nbsp;负责人 签字（章）：
              </td>
            </tr>

            <tr>
              <td rowspan="1" colspan="7" style="text-align:right;border-top:none;">
                20&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日
              </td>
              <td rowspan="1" colspan="6" style="text-align:right;border-top:none;">
                20&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日
              </td>
            </tr>
            <tr>
              <td rowspan="1" colspan="13" style="text-align:left;border-width: 0px 1px;">
                <span style="font-weight: bold">待审小组意见：</span>
              </td>
            </tr>
            <tr style="height: 60px;">
              <td rowspan="1" colspan="13" style="text-align:left;border-width: 0px 1px;">
                &nbsp;&nbsp;签字（章）：
              </td>
            </tr>
            <tr>
              <td rowspan="1" colspan="13" style="text-align:right;border-top:none;">
                20&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日
              </td>
            </tr>
          </table>


        </div>
    </section>
  </a-card>
  <!--</page-layout>-->
  </a-modal>
</template>
<script>
  import ACol from "ant-design-vue/es/grid/Col";
  import ARow from "ant-design-vue/es/grid/Row";
  import ATextarea from 'ant-design-vue/es/input/TextArea'
  import { httpAction,putAction,getAction,downFile } from '@/api/manage'


  export default {
    components: {
      ATextarea,
      ARow,
      ACol,
    },
    name: 'Printgzsld',
    props:{
      reBizCode:{
        type: String,
        default: ''
      }
    },
    data(){
      return {
        jtnsr:" ",
        jtnzc:" ",
        jtcsr:" ",
        sj:5,
        nd:'',
        zzjc:'',
        nhPjsxxx:{},
        ywhywwlxx: {},
        pxx: {},
        model:{},
        visible:false,
        confirmLoading: false,
        lists:[
          {id:1, xm:"张三",nl:22},{id:2,xm:"王五",nl:21},{id:3,xm:"赵柳",nl:23}
        ],
        jtcyList:[],

        columns: [{
        }
        ],
        labelCol: {
          xs: { span: 24 },
          sm: { span: 2 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        previewVisible: false,
        previewImage: '',

        url:{
          loadApplicant:"/sps/register/loadApplicants",
          loadRegisterFiles:"/sps/register/getRegisterFilesConfig",
          khxxcjportXlsUrl:"/nh/nhjbxx/nhpysxxxExportXls"
        }
      }
    },
    created() {
      this.getDate();
    },
    /*mounted() {
      this.sj=this.Jtcylist.length+3;
    },*/
    methods: {
      edit (record) {
        this.model = Object.assign({}, record)
        console.log("--------")
        console.log(record)
        //加载家庭相关情况字表数据
        if(record.zjhm) {
          getAction("/nh/nhjbxx/nhpysxxx", { hhbm: record.hhbm,zjhm: record.zjhm}).then((res) => {
            if (res.success) {
              this.nhPjsxxx = res.result.nhPjsxxx || {};
              this.ywhywwlxx = res.result.ywhywwlxx || {}
              this.pyxx = res.result.pyxx || {}
             /* this.jtnsr = this.nhxxcj.zzxmsr+this.nhxxcj.yzxmsr+this.nhxxcj.syxmsr+this.nhxxcj.nwxwsr;
              this.jtnzc = this.nhxxcj.zzxmzc+this.nhxxcj.yzxmzc+this.nhxxcj.syxmzc+this.nhxxcj.nwxwzc;
              this.jtcsr = this.nhxxcj.zzxmcsr+this.nhxxcj.yzxmcsr+this.nhxxcj.syxmcsr+this.nhxxcj.nwxwcsr;*/
              //获取家庭成员数量
              this.jtcyList = res.result.jtcyList || []
              this.sj=this.jtcyList.length+1;
              this.nd = res.result.nd
              this.zzjc = res.result.zzjc
              console.log("---农户采集信息表-----")
              console.log('nhxxcj', res.result)
              console.log("Jtcylist",this.jtcyList)
            } else {
              this.$message.error("查询客户评议授信信息失败!")
            }
          });
        }
        this.visible = true;
      },

      loadData(){

      },
      getDate(){
        // 当前时间
      },
      handleCancel () {
        this.previewVisible = false;
        this.close();
      },
      handlePreview (file) {
        this.previewImage = file.url || file.thumbUrl
        this.previewVisible = true
      },
      handleChange ({ fileList }) {
        this.fileList = fileList
      },

      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        this.handleExportXls("农户评议授信信息表")
      },

      handleExportXls(fileName){
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        console.log("---------")
        console.log(this.model)
        let param = {"hhbm":this.model.hhbm, "ssxz":this.model.ssxz_dictText,"xzc":this.model.xzc_dictText,"xzz":this.model.xzz_dictText};
        console.log("导出参数",param)
        downFile(this.url.khxxcjportXlsUrl,param).then((data)=>{
          if (!data) {
            this.$message.warning("文件下载失败")
            return
          }
          var blob = new Blob([data]);
          if('msSaveOrOpenBlob' in navigator){
            window.navigator.msSaveOrOpenBlob(blob, fileName+'.xls');
            return;
          }
          var eleLink = document.createElement('a');
          eleLink.download = fileName+'.xls';
          eleLink.style.display = 'none'
          eleLink.href = URL.createObjectURL(blob);
          document.body.appendChild(eleLink);
          eleLink.click();
          document.body.removeChild(eleLink);
        })
      },

    }
  }
</script>
<style scoped>
  .abcdefg .ant-card-body{
    margin-left: 0%;
    margin-right: 0%;
    margin-bottom: 1%;
    border:0px solid black;
    min-width: 800px;
  }
  .explain{
    text-align: left;
    margin-left: 50px;
  }
  .explain .ant-input,.sign .ant-input{
    /*font-weight:bolder;*/
    text-align:center;
    border-left-width:0px!important;
    border-top-width:0px!important;;
    border-right-width:0px!important;;
  }
  .sign table {
    table-layout: fixed;
    /*word-break: break-all;*/
  }
  .sign table tr td{
    padding: 3px 0;
    /*word-break: break-all;*/
  }
  .explain div{
    margin-bottom: 10px;
  }
  /* you can make up upload button and sample style by using stylesheets */
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
</style>