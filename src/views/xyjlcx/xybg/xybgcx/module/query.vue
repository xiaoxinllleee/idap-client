<template>
  <a-modal :title="title"
           :visible="visible"
           :footer="null"
           :width="800"
           :confirmLoading="confirmLoading"
           :maskClosable="false"
           @cancel="handleClose">
    <a-spin :spinning="confirmLoading">
      <a-divider orientation="left" style="color: #1890FF; font-size: 10pt; margin-top: 0px">
        被查询人信息
      </a-divider>
      <a-form :form="model">
        <a-row :gutter="12">
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="报告编号">
              <a-input v-model="model.bgbh" disabled></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="姓名">
              <a-input v-model="model.xm" disabled></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="证件号码">
              <a-input v-model="model.zjhm" disabled></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="查询原因">
              <a-input v-model="model.cxyy" disabled></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="20"></a-col>
          <a-col :span="4">
            <a-button type="primary" size="small" icon="snippets" block @click="GenerateReport" :loading="generateRepLoading">{{ this.generateBtnName }}</a-button>
          </a-col>
        </a-row>
      </a-form>
      <a-divider orientation="left" style="color: #1890FF; font-size: 10pt; margin-top: 0px">
        被查询人关联人信息
      </a-divider>
      <a-table rowKey="bgbh"
               :columns="columns"
               :data-source="dataSource"
               :bordered="true"
               size="small">
        <span slot="action" slot-scope="text, record">
          <a-button type="primary" size="small" icon="snippets" :loading="generateRepLoadingSub"
                    @click="glrReport(record)">{{ generateBySubBtnName }}</a-button>
        </span>
        <span slot="bgbh" slot-scope="text">
          <j-ellipsis :value="text" :length="16"></j-ellipsis>
        </span>
        <span slot="xm" slot-scope="text">
          <j-ellipsis :value="text" :length="7"></j-ellipsis>
        </span>
        <span slot="zjhm" slot-scope="text">
          <j-ellipsis :value="text" :length="18"></j-ellipsis>
        </span>
        <span slot="cxyy" slot-scope="text">
          <j-ellipsis :value="text" :length="12"></j-ellipsis>
        </span>
      </a-table>

      <report ref="report" @close="reportTabClose"></report>
    </a-spin>
  </a-modal>
</template>

<script>
  import {getAction, postAction, putAction} from "../../../../../api/manage"
  import JEllipsis from "../../../../../components/jeecg/JEllipsis"
  import {mapGetters} from 'vuex'
  import report from "./report"
  import store from '@/store'

  export default {
    name: "CustomerInfoDetail",
    components: {
      JEllipsis,
      report
    },
    data() {
      return {
        title: '客户信息详情',
        visible: false,
        confirmLoading: false,
        generateRepLoading: false,
        generateRepLoadingSub: false,
        labelCol: {
          xs: {span: 24},
          sm: {span: 5},
        },
        wrapperCol: {
          xs: {span: 24},
          sm: {span: 16},
        },
        model: {},
        dataSource: [],
        columns: [
          {
            title: '报告编号',
            dataIndex: 'bgbh',
            key: 'bgbh',
            scopedSlots: {customRender: 'bgbh'},
            width: '20%',
          },
          {
            title: '姓名',
            dataIndex: 'xm',
            key: 'xm',
            scopedSlots: {customRender: 'xm'},
            width: '20%',
          },
          {
            title: '证件号码',
            dataIndex: 'zjhm',
            key: 'zjhm',
            scopedSlots: {customRender: 'zjhm'},
            width: '25%',
          },
          {
            title: '查询原因',
            dataIndex: 'cxyy',
            key: 'cxyy',
            scopedSlots: {customRender: 'cxyy'},
            width: '25%',
          },
          {
            title: '操作',
            key: 'action',
            scopedSlots: {customRender: 'action'},
            align: 'center',
            width: '10%',
          },
        ],
        generateBtnName: '生成报告',//生成报告按钮名称
        generateBySubBtnName: '生成报告',//被调查关联人生成报告按钮名称
        cxyy: '',
        cxyyDictText: '',
        //客户内部信用记录报告数据接收
        object: {},
        url: {
          query: '/creditreportquery/query',//信用报告查询
          report: '/creditreportquery/report',//信用报告生成
          queryTy: '/creditreportqueryTy/query',//天易信用报告查询
          reportTy: '/creditreportqueryTy/report',//天易信用报告生成
        },
        qybm:'',
      }
    },
    created() {
      this.qybm = store.getters.qybm
    },
    methods: {
      ...mapGetters(["nickname", "avatar", "userInfo", "orgCode"]),

      query: function(bcxrzjhm, cxyy, cxyyDictText) {
        this.model.zjhm = bcxrzjhm
        this.model.cxyy = cxyyDictText
        this.cxyy = cxyy
        this.cxyyDictText = cxyyDictText
        this.confirmLoading = true
        let url=''
        if (this.qybm=='095'){
          url=this.url.queryTy
        }else {
          url=this.url.query
        }
        getAction(url, {'bcxrzjhm': bcxrzjhm, 'cxyy': cxyy}).then((response) => {
          if (response.success) {
            //console.info('被查询人及关联人信息请求返回',response.result)
            //console.info('被查询人信息详情',response.result.bcxrxx)
            //被查询人信息详情
            this.model.bgbh = response.result.bcxrxx.bgbh
            this.model.xm   = response.result.bcxrxx.khxm
            this.model.zjhm = response.result.bcxrxx.zjhm
            this.model.cxyy = response.result.bcxrxx.cxyyDictText
            //被查询人关联人信息详情
            let cxyy = response.result.bcxrxx.cxyyDictText
            //console.info('被查询人关联人信息详情-1',response.result.table)
            response.result.table.forEach((item) => {
              let array = {}
              this.$set(array, 'bgbh', item.glrbgbh)
              this.$set(array, 'xm', item.glrxm)
              this.$set(array, 'zjhm', item.glrzjhm)
              this.$set(array, 'cxyy', cxyy)
              this.dataSource.push(array)
            })
            //console.info('被查询人关联人信息详情-2',response.result.table2)
            response.result.table2.forEach((item) => {
              let array = {}
              this.$set(array, 'bgbh', item.glrbgbh)
              this.$set(array, 'xm', item.jkrmc)
              this.$set(array, 'zjhm', item.jkrzjhm)
              this.$set(array, 'cxyy', cxyy)
              this.dataSource.push(array)
            })
          }
        }).catch((error) => {
          console.info('被查询人信息详情及关联人信息详情获取失败！',error)
        }).finally(() => {
          this.confirmLoading = false
        })
      },

      // 被查询人`生成报告`
      GenerateReport: function () {
        if (this.model.zjhm) {
          let parameters = {
            'bgbh': this.model.bgbh,
            'cxyy': this.cxyy,
            'cxyyDictText': this.cxyyDictText,
            'zjhm': this.model.zjhm,
            'xm'  : this.model.xm,
          }
          console.info('请求参数', parameters)
          this.generateRepLoading = true
          this.generateBtnName = '正在生成'
          let url=''
          if (this.qybm=='095'){
            url=this.url.reportTy
          }else {
            url=this.url.report
          }
          getAction(url, parameters).then((res) => {
            if (res.success) {
              this.$message.success("客户内部信用记录报告生成成功！")
              console.info('#生成征信报告请求返回：')
              console.info(res.result)
              this.object = res.result
              this.generateBtnName = '生成报告'
              this.generateRepLoading = false
              this.$refs['report'].cxyy = this.cxyy
              this.$refs['report'].object = this.object
              this.$refs['report'].init(this.model)
            }
          }).catch((error) => {
            console.info('客户内部信用记录报告生成失败！', error)
            this.$message.error("客户内部信用记录报告生成失败，请联系系统管理员！")
          })
        } else {
          this.$message.error("被查询人证件号码不能为空！")
        }
      },

      // 被查询人关联人`生成报告`
      glrReport: function (record) {
        if (record.zjhm) {
          let parameters = {
            'bgbh': record.bgbh,
            'cxyy': this.cxyy,
            'cxyyDictText': this.cxyyDictText,
            'zjhm': record.zjhm,
            'xm'  : record.xm,
          }
          console.log('请求参数', parameters)
          let url=''
          if (this.qybm=='095'){
            url=this.url.reportTy
          }else {
            url=this.url.report
          }
          this.generateRepLoadingSub = true
          this.generateBySubBtnName = '正在生成'
          getAction(url, parameters).then((res) => {
           if (res.success) {
             console.log('#生成征信报告请求返回：', res.result)
             this.object = res.result
             this.$message.success("客户内部信用记录报告生成成功！")
             this.generateBySubBtnName = '生成报告'
             this.generateRepLoadingSub = false
             this.$refs['report'].cxyy = this.cxyy
             this.$refs['report'].object = this.object
             this.$refs['report'].init({
               'bgbh': record.bgbh,
               'cxyy': this.cxyyDictText,
               'zjhm': record.zjhm,
               'xm'  : record.xm,
             })
           }
          }).catch((error) => {
           console.log('客户内部信用记录报告生成失败！', error)
           this.$message.error("客户内部信用记录报告生成失败，请联系系统管理员！")
          })
        } else {
          this.$message.error("被查询人关联人证件号码获取失败!")
        }
      },

      printClose: function () {
        // console.log('`生成报告`窗口已关闭!')
      },

      reportTabClose: function() {},

      handleClose: function () {
        this.model = {}
        this.dataSource = []
        this.close()
      },

      close: function () {
        this.$emit('close')
        this.visible = false
      },

    },
  }
</script>

<style scoped>

</style>