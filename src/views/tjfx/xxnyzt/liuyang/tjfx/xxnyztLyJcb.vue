<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="主体类别">
              <j-dict-select-tag v-model="queryParam.ztlb" placeholder="请选择客户类型" dictCode="ly_xxnyzt_ztlb" allowClear/>
            </a-form-item>
          </a-col>



          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a-button icon="download" :loading="exportLoading" style="margin-left: 8px" @click="tjfxexp" v-has="'xxnyztTjfx:exp'">导出</a-button>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <!-- table区域-begin -->
    <div>
      <a-table
        ref="table"
        size="middle"
        bordered
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange">

      </a-table>

    </div>
  </a-card>
</template>

<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import JTreeSelect from '@/components/jeecg/JTreeSelect'
import { downFile,getAction } from '@api/manage'

export default {
  name: 'xxnyztLyTjfxModal',
  mixins:[JeecgListMixin],
  components:{JTreeSelect},
  data(){
    return{
      url: {
        list: '/khxxgl/xxnyztLy/tjfx2',
        exportXlsUrl: "tjfx/xxnyztTjfx/exportXls",
      },
      columns: [
        { align: 'center',title: '主体类别', dataIndex: 'ztlb_dictText' },
        { align: 'center',title: '辖区内主体户数', dataIndex: 'hs' },
        { align: 'center',title: '有合理信贷需求主体户数', dataIndex: 'xqhs', },
        {
          title: '信用建档评级',children:[
            { align: 'center',title: '户数', dataIndex: 'jdhs' },
            { align: 'center',title: '占比', dataIndex: 'jdhszb'}
          ]
        },
        {
          title: '授信',children:[
            { align: 'center',title: '户数', dataIndex: 'sxhs' },
            { align: 'center',title: '占比', dataIndex: 'sxhszb' }
          ]
        },
        { align: 'center',title: '授信额度', dataIndex: 'sxed' },
        { align: 'center',title: '贷款余额', dataIndex: 'dkye' },
        { align: 'center',title: '其中：信用贷款余额', dataIndex: 'xydkye', },
        { align: 'center',title: '贷款户数', dataIndex: 'dkhs'},
        { align: 'center',title: '其中：首贷户', dataIndex: 'sdh' },
        { align: 'center',title: '信用贷款户数', dataIndex: 'xydkhs' },
        { align: 'center',title: '当年累计贷款金额', dataIndex: 'dnljdkje' },
        { align: 'center',title: '其中：当年累计放信用贷款金额', dataIndex: 'dnljxydkje' },
        { align: 'center',title: '其他需要说明事项', dataIndex: 'bz' },
      ],
    }
  },
  created () {
    //if (this.tjlx == '1'){
      this.searchQuery();
    //}
  },
  methods:{

    tjfxexp(){
      let param = this.getQueryParams();
      getAction("/khxxgl/xxnyztLy/tjfxexp2",param).then(res=>{
        if (res.success){
          if (res.message){
            window.location.href = `${window._CONFIG['staticDomainURL']}/` + res.message
          }
        }else {
          this.errorInfo(res.message)
        }
      })
    },


    tjfxmx(row,type){
      console.log("tjfxmx")
      console.log(row)
      //window.history.pushState(null, null, '#');
      let query = {};

      if (this.tjlx == "1"){//必须sszh ghzrr
        query.sszh = row.sszh;
        query.ghzrr = row.ghzrr;
      }

      if (this.tjlx == "2"){//必须sszh ghzrr
        query.sszh = row.sszh;
        query.ztfl = row.ztfl;
      }

      if (this.tjlx == "3"){//必须sszh ghzrr
        query.sszh = row.sszh;
      }

      if (this.tjlx == "4"){//必须sszh ghzrr
        query.ztfl = row.ztfl;
      }

      if (type == "clkhs"){
        query.clkhs = row.clkhs;
        if (row.clkhs == 0){
          this.successInfo("数量为0不展示明细！")
          return;
        }
      }
      if (type == "hmdhs"){
        query.hmdhs = row.hmdhs;
        if (row.hmdhs == 0){
          this.successInfo("数量为0不展示明细！")
          return;
        }
      }
      if (type == "wxh"){
        query.wxh = row.wxh;
        if (row.wxh == 0){
          this.successInfo("数量为0不展示明细！")
          return;
        }
      }

      if (type == "dczpdhs"){
        query.dczpdhs = row.dczpdhs;
        if (row.dczpdhs == 0){
          this.successInfo("数量为0不展示明细！")
          return;
        }
      }

      if (type == "drhhdhs"){
        query.drhhdhs = row.drhhdhs;
        if (row.drhhdhs == 0){
          this.successInfo("数量为0不展示明细！")
          return;
        }
      }

      if (type == "huimdhs"){
        query.huimdhs = row.huimdhs;
        if (row.huimdhs == 0){
          this.successInfo("数量为0不展示明细！")
          return;
        }
      }

      if (type == "bmdhs"){
        query.bmdhs = row.bmdhs;
        if (row.bmdhs == 0){
          this.successInfo("数量为0不展示明细！")
          return;
        }
      }


      this.$refs.tjfxmx.init(query);

    }
  }
}
</script>

<style scoped>

</style>