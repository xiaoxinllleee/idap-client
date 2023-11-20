<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <a-modal
    :title="title"
    :width="1200"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :okButtonProps="{ props: {disabled: false} }"
    @ok="handleCancel"
    @cancel="handleCancel"
    okText="关闭"
  >
    <a-card :bordered="false" :class="{'abcdefg':true}">
      <div class="no-print" style="text-align: right" v-if="this.model.spzt == 1">
        <a-button v-print="'#printContent'" ghost type="primary">打印</a-button>
      </div>
      <section ref="print" id="printContent" class="abcdefg">
      <br/>
      <br/>
      <br/>
        <!--<div style="text-align: center">
          &lt;!&ndash;<p style="font-size: 24px;font-weight: 800">{{this.nhxxcj.qydm}}贷款利率定价计算表</p>&ndash;&gt;
          <p style="font-size: 24px;font-weight: 800">浏阳农商行贷款利率定价计算表</p>
        </div>-->
        <!--签字-->

        <div style="font-size:14px;font-weight:bolder;float:right">
          定价编号: {{this.model.djid}}
        </div>
        <div class="sign" style="text-align: left;height: inherit">

          <div>
            <p style="padding-top: 1px; text-align:center;font-size:25px;height: 40px;font-weight:bolder" class="title">
              宁远贷款特殊利率定价计算表</p>

            <table align="center" class="tableCss" width="100%">
              <colgroup>
                <col width="25%">
                <col width="25%">
                <col width="25%">
                <col width="25%">
              </colgroup>
              <tbody>


              <tr style="page-break-after:always">
                <td colspan="4">
                  <table align="center" class="tableCss" width="100%">
                    <tr>
                      <td width="25%">计算日期</td>
                      <td width="25%">{{this.model.lrsj}}</td>
                      <td width="25%">单位：</td>
                      <td width="25%">万元</td>
                    </tr>
                    <tr>
                      <td width="25%">申请客户名称:</td>
                      <td width="25%">{{this.model.khmc}}</td>
                      <td width="25%">法人代表：</td>
                      <td width="25%">{{this.model.frdb}}</td>
                    </tr>
                    <tr>
                      <td width="25%">贷款期限:</td>
                      <td width="25%">{{this.model.dkqx}}</td>
                      <td width="25%">基准利率:</td>
                      <td width="25%">4.35%</td>
                    </tr>

                  </table>
                </td>
              </tr>
              </tbody>
            </table>

            <table align="center" class="tableCss" width="100%">
              <colgroup>
                <col width="100%">
              </colgroup>
              <tbody>


              <tr style="page-break-after:always">
                <td colspan="1">
                  <table align="center" class="tableCss" width="100%">
                    <tr>
                      <td colspan="1" width="20%" style="font-size:14px;font-weight:bolder;" >贷款类型</td>
                    </tr>

                    <tr>
                      <td colspan="1" width="20%" >{{this.model.dklxVal}}</td>
                    </tr>

                  </table>
                </td>
              </tr>
              </tbody>
            </table>

            <table align="center" class="tableCss" width="100%" v-if="this.model.dklx == 1 ||this.model.dklx == 2 || this.model.dklx == 3">
              <colgroup>
                <col width="100%">
              </colgroup>
              <tbody>


              <tr style="page-break-after:always">
                <td colspan="1">
                  <table align="center" class="tableCss" width="100%">
                    <tr>
                      <td colspan="1" width="20%" style="font-size:14px;font-weight:bolder;" >贷款类型详情</td>
                    </tr>

                    <tr>
                      <td colspan="1" width="20%">{{this.model.dklxxq}}</td>
                    </tr>

                  </table>
                </td>
              </tr>
              </tbody>
            </table>


            <table align="center" class="tableCss" width="100%">
              <tbody>


              <tr style="page-break-after:always">
                <td colspan="6">
                  <table align="center" class="tableCss" width="100%">
                    <tr>
                      <td colspan="3" style="font-size:14px;font-weight:bolder;" >执行利率：</td>
                      <td colspan="3" style="font-size:14px;font-weight:bolder;" >{{this.model.zxll}}</td>
                    </tr>
                    <tr v-if="this.model.dklx == 4 || this.model.dklx == 5">
                      <td colspan="3" style="font-size:14px;font-weight:bolder;" >情况说明：</td>
                      <td colspan="3" style="font-size:14px;font-weight:bolder;" >{{this.model.qksm}}</td>
                    </tr>
                    <tr>
                      <td colspan="2">客户经理签字：</td>
                      <td colspan="2">信贷内勤签字：</td>
                      <td colspan="2">行长签字：</td>
                    </tr>

                  </table>
                </td>
              </tr>
              </tbody>
            </table>

          </div>
        </div>
      </section>
    </a-card>


  </a-modal>

</template>

<script>

import moment from 'moment'
import pick from 'lodash.pick'
import { JEditableTableMixin } from '@/mixins/JEditableTableMixin'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { httpAction, putAction, getAction } from '@/api/manage'
import { mapGetters } from 'vuex'
import ACol from 'ant-design-vue/es/grid/Col'
import ARow from 'ant-design-vue/es/grid/Row'
import ATextarea from 'ant-design-vue/es/input/TextArea'

export default {
  components: {},
  name: 'ModelInfo',
  mixins: [JEditableTableMixin, JeecgListMixin],
  data () {
    return {
      model: {},
      dbxx:{},
      ckrps:{},
      dqrps:{},
      url:{
        list:"/list",
        getDbxxByZjhm: "/dklldj/lldjsq/getDbxxByZjhm",
        getCkrps: "/dklldj/lldjjs/getCkrps",
      },

    }
  },

  created () {

  },

  methods: {

    handleCancel () {
      this.close()
    },

    edit (record) {
      console.log('====print info ====')
      console.log(record)
      this.model = Object.assign( record);
      console.log(this.model)
      this.visible = true
    },
    close () {
      this.$emit('close');
      this.visible = false;
    }
  },

}
</script>

<style scoped>
.abcdefg .ant-card-body {
  margin-left: 0%;
  margin-right: 0%;
  margin-bottom: 1%;
  border: 0px solid black;
  min-width: 800px;
}

.explain {
  text-align: left;
  margin-left: 50px;
}

.explain .ant-input, .sign .ant-input {
  font-weight: bolder;
  text-align: center;
  border-left-width: 0px !important;
  border-top-width: 0px !important;;
  border-right-width: 0px !important;;
}

.explain div {
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

table.tableCss {
  font-family: verdana, arial, sans-serif;
  font-size: 11px;
  color: #000000;
  border-width: 1px;
  border-color: #000000;
  border-collapse: collapse;
}

table.tableCss th {
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #000000;
  background-color: #FFFFFF;
}

table.tableCss td {
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #000000;
  background-color: #ffffff;
}
</style>