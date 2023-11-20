<template>
  <a-card :bordered="true">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row type="flex">
          <a-col :flex="1">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="bcxrzjhm" allow-clear>
                <a-icon slot="prefix" type="user"/>
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :flex="2">
            <a-form-item label="查询原因" style="padding-left: 15px">
              <a-radio-group v-model="cxyy" :default-value="1" @change="queryReasonOnChange">
                <a-radio :value="1">贷款审批</a-radio>
                <a-radio :value="2">信用卡审批</a-radio>
                <a-radio :value="3">贷后管理</a-radio>
                <a-radio :value="4">担保资格审查</a-radio>
                <a-radio :value="5">特约商户实名审查</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :flex="2"></a-col>
        </a-row>
      </a-form>
    </div>

    <div class="table-operator">
      <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
    </div>

    <query ref="queryTab" @close="infoDetailClose"></query>
  </a-card>
</template>

<script>
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import query from "./module/query";

  export default {
    name: "CreditReportQuery",
    mixins: [JeecgListMixin],
    components: {
      query
    },
    data() {
      return {
        bcxrzjhm: '',
        cxyy: 1,
        cxyyDictText: '',
      }
    },
    methods: {
      loadData(arg) {
        this.bcxrzjhm = ''
        this.cxyy = 1
        this.cxyyDictText = ''
      },
      searchQuery: function () {
        let identNo = this.bcxrzjhm
        if (identNo === undefined || identNo === '') {
          this.$message.warning('请输入证件号码！')
          return false
        } else {
          // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
          var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
          if (reg.test(identNo) === false) {
            this.$message.warning('请输入正确格式的证件号码！')
            return false
          }
        }
        let cxyy = this.cxyy
        if (cxyy === undefined || cxyy === '') {
          this.$message.warning('请选择查询原因！')
          return false
        } else {
          if (cxyy === 1) this.cxyyDictText = '贷款审批'
          if (cxyy === 2) this.cxyyDictText = '信用卡审批'
          if (cxyy === 3) this.cxyyDictText = '贷后管理'
          if (cxyy === 4) this.cxyyDictText = '担保资格审查'
          if (cxyy === 5) this.cxyyDictText = '特约商户实名审查'
        }
        console.info('查询原因', '\nthis.cxyy',this.cxyy, '\ncxyy',cxyy, '\ncxyyDictText',this.cxyyDictText)
        this.$refs['queryTab'].title = '客户信息详情'
        this.$refs['queryTab'].query(identNo,cxyy,this.cxyyDictText)
        this.$refs['queryTab'].visible = true
      },
      queryReasonOnChange: function (e) {
        console.log('查询原因发生改变\n', e.target.value)
        let cxyy = e.target.value
        if (cxyy === 1) this.cxyyDictText = '贷款审批'
        if (cxyy === 2) this.cxyyDictText = '信用卡审批'
        if (cxyy === 3) this.cxyyDictText = '贷后管理'
        if (cxyy === 4) this.cxyyDictText = '担保资格审查'
        if (cxyy === 5) this.cxyyDictText = '特约商户实名审查'
      },
      infoDetailClose: function () {
        console.log('`客户信息详情`窗口已关闭！')
      },
    },
  }
</script>

<style scoped>

</style>