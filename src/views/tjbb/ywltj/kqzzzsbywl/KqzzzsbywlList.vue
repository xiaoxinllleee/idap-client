<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计维度">
              <a-select placeholder="请选择统计维度" v-model="queryParam.tjwd">
                <a-select-option value="MM">
                  月
                </a-select-option>
                <a-select-option value="Q">
                  季
                </a-select-option>
                <a-select-option value="YYYY">
                  年
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计月份" v-if="this.queryParam.tjwd == 'MM'">
              <a-month-picker placeholder="请选择统计月份" v-model="queryParam.tjyf" @change="selectValue"
                              style="width: 100%"></a-month-picker>
            </a-form-item>

            <a-form-item label="统计季度" v-if="this.queryParam.tjwd == 'Q'">
              <a-select placeholder="季度年份" v-model="jdssnf" :defaultValue="dateValue" @change="selectValue"
                        style="width: 35%;">
                <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}
                </a-select-option>
              </a-select>
              <a-select placeholder="请选择统计季度" v-model="tjjd" style="width: 65%;" @change="selectValue">
                <a-select-option value="01">第一季度</a-select-option>
                <a-select-option value="04">第二季度</a-select-option>
                <a-select-option value="07">第三季度</a-select-option>
                <a-select-option value="10">第四季度</a-select-option>
              </a-select>
            </a-form-item>

            <a-form-item label="统计年份" v-if="this.queryParam.tjwd == 'YYYY'">
              <a-select placeholder="请选择统计年份" v-model="tjnf" :defaultValue="dateValue" @change="selectValue">
                <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}
                </a-select-option>
              </a-select>
            </a-form-item>

          </a-col>
          <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
          <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
          <!--<a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">

            </span>
          </a-col>-->

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button :loading="exportLoading" icon="download" @click="handleExportXls('卡前置自助设备业务量')"
                v-has="'kqzzzsbywl:exportXls'">导出
      </a-button>
      <a-button icon="area-chart" @click="init" v-has="'kqzzzsbywl:init'">提取</a-button>
    </div>

    <!-- table区域-begin -->
    <div>


      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange">

      </a-table>
    </div>
    <!-- table区域-end -->

  </a-card>
</template>

<script>
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import moment from "moment";
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import {filterObj} from "@/utils/util";
  import {putAction, downFile} from "@/api/manage";
  import {notification} from "ant-design-vue";

  export default {
    name: "KqzzzsbywlList",
    mixins: [JeecgListMixin],
    components: {
      JTreeSelect
    },
    data() {
      return {
        description: '卡前置自助设备业务量管理页面',
        // 统计维度初始默认为月
        queryParam: {tjwd: 'MM'},
        jdssnf: '',
        tjnf: '',
        tjjd: '',
        dateValue: '',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: "center",
            customRender: function (t, r, index) {
              return parseInt(index) + 1;
            }
          },
          {
            title: '统计维度',
            align: "center",
            dataIndex: 'tjwd_dictText'
          },
          {
            title: '统计日期',
            align: "center",
            dataIndex: 'tjyf'
          },
          {
            title: '操作柜员',
            align: "center",
            dataIndex: 'tellerNo'
          },
          {
            title: '终端标识',
            align: "center",
            dataIndex: 'devId'
          },
          {
            title: '终端类型',
            align: "center",
            dataIndex: 'devType'
          },
          {
            title: '业务类型',
            align: "center",
            dataIndex: 'tradeType_dictText'
          },
          {
            title: '业务标识',
            align: "center",
            dataIndex: 'busiFlag'
          },
          {
            title: '交易笔数',
            align: "center",
            dataIndex: 'transNumber'
          },
          {
            title: '交易金额',
            align: "center",
            dataIndex: 'transAmount'
          },
          /*{
               title: '录入标识',
               align:"center",
               dataIndex: 'lrbz_dictText'
              },
          {
               title: '录入人',
               align:"center",
               dataIndex: 'lrr'
              },
          {
               title: '录入时间',
               align:"center",
               dataIndex: 'lrsj'
              },*/
        ],
        url: {
          list: "/kqzzzsbywl/kqzzzsbywl/list",
          delete: "/kqzzzsbywl/kqzzzsbywl/delete",
          deleteBatch: "/kqzzzsbywl/kqzzzsbywl/deleteBatch",
          exportXlsUrl: "kqzzzsbywl/kqzzzsbywl/exportXls",
          importExcelUrl: "kqzzzsbywl/kqzzzsbywl/importExcel",
          init: "/kqzzzsbywl/kqzzzsbywl/init",
        },
      }
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },

    created() {
      this.dqnf();
    },

    methods: {
      init() {
        let tjyfStr
        let tjwdStr
        var params = this.queryParam;
        console.log("评定周期：：：" + params.tjwd)
        console.log("评定日期：：：" + params.tjyf)
        if (params.tjwd == null || params.tjwd === undefined) {
          notification.warning({message: '系统提示', description: '请选择统计维度！', duration: 4})
          return false
        }
        if (params.tjwd == 'MM') {
          if (params.tjyf == null || params.tjyf === undefined) {
            notification.warning({message: '系统提示', description: '请选择统计月份！', duration: 4})
            return false
          } else {
            tjyfStr = moment(params.tjyf).format("YYYY-MM") + '-01'
          }
          //获取当前月份
          var currentMon = moment(new Date()).format("YYYYMM")
          if (currentMon.indexOf('0',0) === 0) {
            currentMon = currentMon.slice(1)
          }
          var selectedMon = moment(tjyfStr).format("YYYYMM").substring(0,6);
          if (selectedMon.indexOf('0',0) === 0) {
            selectedMon = selectedMon.slice(1)
          }
          if (Number(selectedMon) > Number(currentMon)) {
            notification.warning({message: '系统提示', description: '选择的月份必须小于等于当前月份！', duration: 4})
            return false
          }
        } else if (params.tjwd == 'Q') {
          if (this.jdssnf == '' || this.tjjd == '') {
            notification.warning({message: '系统提示', description: '请选择季度所属年份/所属季度！', duration: 4})
            return false
          } else {
            let day = new Date(this.jdssnf, this.tjjd, 0)
            let dayCount = day.getDate()
            tjyfStr = this.jdssnf + '-' + this.tjjd + '-01'
          }
        } else {
          if (this.tjnf == '') {
            notification.warning({message: '系统提示', description: '请选择统计年份！', duration: 4})
            return false
          } else {
            tjyfStr = this.tjnf + "-01-01"
          }
        }
        tjwdStr = params.tjwd
        console.log("提取 => 评定周期@@@@@@@@::" + tjwdStr)
        console.log("提取 => 评定日期@@@@@@@@::" + tjyfStr)
        this.loading = true
        putAction(this.url.init, {"tjwd": tjwdStr, "tjyf": tjyfStr}, 'put').then((res) => {
          if (res.success) {
            notification.success({message: '系统提示', description: '提取成功！', duration: 4})
            this.loadData(1);
          } else {
            notification.warning({message: '系统提示', description: '提取失败！' + res.message, duration: 4})
          }
        }).finally(() => {
          this.loading = false
        })
      },

      dqnf() {
        var myDate = new Date;
        var year = myDate.getFullYear();
        this.initSelectYear(year)
      },

      //初始化年份选择下拉框
      initSelectYear(year) {
        this.years = [];
        for (let i = 0; i < 30; i++) {
          this.years.push({value: ((year - i) + ''), label: ((year - i) + '')});
        }
      },

      //下拉框选择
      selectValue(value) {
        console.log('selectValue::::' + value)
        let val = value;
        this.$emit('change', val);
      },

      // 查询条件格式化Func
      getQueryParams() {
        console.log(this.tjnf)
        let tjwd = this.queryParam.tjwd
        let tjwdMoment = ""
        if (this.queryParam.tjwd || this.queryParam.tjyf) {
          if (tjwd == "MM") {
            if (this.queryParam.tjyf != null && this.queryParam.tjyf != 'undefined') {
              tjwdMoment = this.queryParam.tjyf.format("YYYY-MM") + '-01'
            }
          } else if (tjwd == "Q") {
            if (this.jdssnf != '' && this.tjjd != '') {
              let day = new Date(this.jdssnf, this.tjjd, 0)
              let dayCount = day.getDate()
              tjwdMoment = this.jdssnf + '-' + this.tjjd + '-01'
            }
          } else if (tjwd == "YYYY") {
            if (this.tjnf != '') {
              tjwdMoment = this.tjnf + '-01-01'
            }
          }
        }
        console.log('查询 => tjwd::::::::::' + tjwd)
        console.log('查询 => tjwdMoment::::' + tjwdMoment)
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        param.tjyf = tjwdMoment;
        return filterObj(param);
      },
      // 查询条件重置Func
      searchReset() {
        this.queryParam = {}
        // 重置时清除季度所属年份
        this.jdssnf = ''
        // 重置时清除评定年份
        this.tjnf = ''
        this.tjjd = ''
        this.loadData(1)
      },
      handleExportXls(fileName) {
        if (!fileName || typeof fileName != "string") {
          fileName = "导出文件"
        }
        let tjyfStr
        let tjwdStr
        // var param = this.queryParam;
        let param = {...this.queryParam};
        // if (param.tjyf!=null||tjyf!=undefined){
        //   param.tjyf= moment(param.tjyf).format("YYYY-MM")+'-01';
        // }
        if (param.tjwd == "MM" && this.tjyf != '') {
          tjyfStr = moment(param.tjyf).format("YYYY-MM") + '-01'
        }
        if (param.tjwd == "Q" && this.jdssnf != '' && this.tjjd != '') {
          let day = new Date(this.jdssnf, this.tjjd, 0)
          let dayCount = day.getDate()
          tjyfStr = this.jdssnf + '-' + this.tjjd + '-01'
        }
        if (param.tjwd == "YYYY" && this.tjnf != '') {
          tjyfStr = this.tjnf + "-01-01"
        }
        tjwdStr = param.tjwd
        if (this.selectedRowKeys && this.selectedRowKeys.length > 0) {
          param['selections'] = this.selectedRowKeys.join(",")
        }
        let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()));
        console.log("导出参数========", param)
        this.exportLoading = true
        downFile(this.url.exportXlsUrl, {"tjwd": tjwdStr, "tjyf": tjyfStr}).then((data) => {
          if (!data) {
            this.$message.warning("文件下载失败")
            return
          }
          /* if (typeof window.navigator.msSaveBlob !== 'undefined') {
             window.navigator.msSaveBlob(new Blob([data]), fileName+'.xls')
           }else{
             let url = window.URL.createObjectURL(new Blob([data]))
             let link = document.createElement('a')
             link.style.display = 'none'
             link.href = url
             link.setAttribute('download', fileName+'.xls')
             document.body.appendChild(link)
             link.click()
             document.body.removeChild(link); //下载完成移除元素
             window.URL.revokeObjectURL(url); //释放掉blob对象

           }*/
          var blob = new Blob([data]);
          if ('msSaveOrOpenBlob' in navigator) {
            window.navigator.msSaveOrOpenBlob(blob, fileName + '.xls');
            return;
          }
          var eleLink = document.createElement('a');
          eleLink.download = fileName + '.xls';
          eleLink.style.display = 'none'
          eleLink.href = URL.createObjectURL(blob);
          document.body.appendChild(eleLink);
          eleLink.click();
          document.body.removeChild(eleLink);
        }).finally(() => {
          this.exportLoading = false
          this.loadData(1)
        })
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>