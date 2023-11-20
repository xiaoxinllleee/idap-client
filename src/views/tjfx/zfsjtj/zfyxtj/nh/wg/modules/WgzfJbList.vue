<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

<!--          <a-col :md="6" :sm="8">-->
<!--            <a-form-item label="统计月份">-->
<!--              <a-month-picker placeholder="请输入统计月份" v-model="queryParam.tjrq" :defaultValue="defaultMonthOpera"-->
<!--                              :format="monthFormat" style="width: 100%;"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计季度">
              <a-select placeholder="统计年份" v-model="jdssnf" :defaultValue="dateValue" @change="selectValue"
                        style="width: 35%;">
                <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
              </a-select>
              <a-select placeholder="统计季度" v-model="tjjd" @change="selectValue" style="width: 65%;">
                <a-select-option value="">请选择</a-select-option>
                <a-select-option value="01">第一季度</a-select-option>
                <a-select-option value="04">第二季度</a-select-option>
                <a-select-option value="07">第三季度</a-select-option>
                <a-select-option value="10">第四季度</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属网格">
              <JTreeSelectNotJg placeholder="请选择所属网格"
                                v-model="queryParam.wgbh"
                                treeNodeFilterProp="title"
                                pidField="PARENT_ID"
                                dict="YXDYGL_MAIN,WGMC,ID"
                                pidValue="0"
                                :showSearch="true"
                                :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button icon="download" @click="handleExportXls('网格走访（季报）')" v-has="'WgzfJb:exp'">导出</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        bordered
        :rowKey="rowKey"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">
        <span slot="zfhs" slot-scope="zfhs,record">
          <a @click="zfs(record,'4')">{{zfhs}}</a>
        </span>
        <span slot="yxzfhs" slot-scope="yxzfhs,record">
          <a @click="zfs(record,'10')">{{yxzfhs}}</a>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->
    <nhzfmx-modal ref="nhzfmxModal"/>
    <!-- 表单区域 -->
  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelectNotJg from '@/components/jeecg/JTreeSelectNotJg'
  import {filterObj} from "@/utils/util";
  import moment from 'moment'
  import NhzfmxModal from '@views/tjfx/zfsjtj/zfyxtj/nh/gr/modules/NhzfmxModal'

  export default {
    name: "WgZfyxtjJbList",
    mixins:[JeecgListMixin],
    components:{
      JTreeSelectNotJg, NhzfmxModal
    },
    data () {
      return {
        description: '网格走访营销统计管理页面',
        khlx:'1',
        tjwd: 'Q',
        dateValue: '',
        years: [],
        jdssnf: '',
        tjjd: '',
        isorter: {
          columns: 'tjrq',
          order: 'desc',
        },
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
          },
          {
            title: '统计日期',
            align:"center",
            dataIndex: 'tjrq'
          },

          {
            title: '网格名称',
            align:"center",
            dataIndex: 'wgbh_dictText'
          },
          {
            title: '走访户数',
            align:"center",
            dataIndex: 'zfhs',
            scopedSlots: { customRender: 'zfhs' }
          },

          {
            title: '有效户数',
            align:"center",
            dataIndex: 'yxzfhs',
            scopedSlots: { customRender: 'yxzfhs' }
          },
          {
            title: '有效户数比上季度',
            align:"center",
            dataIndex: 'yxzfhsBsq'
          },
          {
            title: '有效走访排名',
            align:"center",
            dataIndex: 'yxzfpm'
          }
        ],
        url: {
          list: "/zfyxtj/wgZfyxtj/list",
          delete: "/zfyxtj/wgZfyxtj/delete",
          deleteBatch: "/zfyxtj/wgZfyxtj/deleteBatch",
          exportXlsUrl: "zfyxtj/wgZfyxtj/exportXlsnhjb",
          importExcelUrl: "zfyxtj/wgZfyxtj/importExcel",
        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    created() {
      this.dqnf();
    },
    methods: {
      // 获取当前年份
      dqnf() {
        var myDate = new Date;
        var year = myDate.getFullYear();
        this.initSelectYear(year)
        this.jdssnf = year
        this.tjjd = this.dqjd()
      },
      dqjd() {
        let today = new Date(); //获取当前时间
        let month = today.getMonth() + 1;//getMonth返回0-11
        if(month >=1 && month <=3){
          return '01'
        }else if(month >=4 && month <=6){
          return '04'
        }else if(month >=7 && month <=9){
          return '07'
        }else{
          return  '10'
        }
      },
      // 初始化年份选择下拉框
      initSelectYear(year) {
        this.years = [];
        for (let i = 0; i < 30; i++) {
          this.years.push({value: ((year - i) + ''), label: ((year - i) + '')});
        }
      },
      // 下拉选择Func
      selectValue(value) {
        //console.log('ShdjpdList => selectValue(value)')
        //console.log('selectValue::::' + value)
        //let val = value;
        this.$emit('change', value);
      },

      // 查询条件[pdrq]格式化Func
      getQueryParams() {
        let tjrqMoment = ""
        let day = new Date(this.jdssnf, this.tjjd, 0)
        let dayCount = day.getDate()
        if (this.jdssnf && this.tjjd) {
          tjrqMoment = this.jdssnf + '-' + this.tjjd + '-01'
        }
        console.log('查询条件 pdlx, pdzq', tjrqMoment)
        let lx = {khlx: this.khlx,tjwd: this.tjwd}
        var param = Object.assign({}, this.queryParam, this.isorter,lx);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        param.tjrq = tjrqMoment;
        return filterObj(param);
      },
      searchReset() {
        //this.queryParam = {}
        // 重置时清除季度所属年份
        this.jdssnf = new Date().getFullYear()
        // 重置时清除评定年份
        this.tjjd = this.dqjd()
        this.loadData(1)
      },
      zfs(record,lx){
        this.$refs.nhzfmxModal.init(record,lx,'WG', null,null,'2');
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>