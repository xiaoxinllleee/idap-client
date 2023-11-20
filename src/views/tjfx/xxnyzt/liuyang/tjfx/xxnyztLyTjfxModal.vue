<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="归属机构">
              <j-tree-select placeholder="请选择所属机构"
                             v-model="queryParam.sszh"
                             treeNodeFilterProp="title"
                             pid-field="sjzzbz"
                             dict="v_hr_bas_organization_cmms, zzjc, zzbz"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计分类">
              <j-dict-select-tag v-model="queryParam.cxlx" placeholder="请选择统计分类" dictCode="ly_xxnyzt_cxlx" allowClear/>
            </a-form-item>
          </a-col>



          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a-button icon="download" :loading="exportLoading" style="margin-left: 8px" @click="tjfxexp">导出</a-button>
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

<!--        <span slot="detail-ghs" slot-scope="ghs,record">-->
<!--          <a @click="tjfxmx(record,'ghs')">{{ghs}}</a>-->
<!--        </span>-->

<!--        <span slot="detail-clkhs" slot-scope="clkhs,record">-->
<!--          <a @click="tjfxmx(record,'clkhs')">{{clkhs}}</a>-->
<!--        </span>-->

<!--        <span slot="detail-hmdhs" slot-scope="hmdhs,record">-->
<!--          <a @click="tjfxmx(record,'hmdhs')">{{hmdhs}}</a>-->
<!--        </span>-->

<!--        <span slot="detail-wxh" slot-scope="wxh,record">-->
<!--          <a @click="tjfxmx(record,'wxh')">{{wxh}}</a>-->
<!--        </span>-->

<!--        <span slot="detail-dczpdhs" slot-scope="dczpdhs,record">-->
<!--          <a @click="tjfxmx(record,'dczpdhs')">{{dczpdhs}}</a>-->
<!--        </span>-->

<!--        <span slot="detail-drhhdhs" slot-scope="drhhdhs,record">-->
<!--          <a @click="tjfxmx(record,'drhhdhs')">{{drhhdhs}}</a>-->
<!--        </span>-->

<!--        <span slot="detail-huimdhs" slot-scope="huimdhs,record">-->
<!--          <a @click="tjfxmx(record,'huimdhs')">{{huimdhs}}</a>-->
<!--        </span>-->

<!--        <span slot="detail-bmdhs" slot-scope="bmdhs,record">-->
<!--          <a @click="tjfxmx(record,'bmdhs')">{{bmdhs}}</a>-->
<!--        </span>-->
      </a-table>

      <xxnyzt-ly-tjfx-mx-modal ref="tjfxmx"></xxnyzt-ly-tjfx-mx-modal>
    </div>
  </a-card>
</template>

<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import JTreeSelect from '@/components/jeecg/JTreeSelect'
import xxnyztLyTjfxMxModal from './xxnyztLyTjfxMxModal'
import { downFile, getAction } from '@api/manage'

export default {
  name: 'xxnyztLyTjfxModal',
  mixins:[JeecgListMixin],
  components:{JTreeSelect,xxnyztLyTjfxMxModal},
  props: {
    tjlx: String,
    columns: Array
  },
  data(){
    return{
      url: {
        list: '/khxxgl/xxnyztLy/tjfx',
        exportXlsUrl: "tjfx/xxnyztTjfx/exportXls",
      },
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
      getAction("/khxxgl/xxnyztLy/tjfxexp",param).then(res=>{
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