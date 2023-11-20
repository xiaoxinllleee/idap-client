<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="查询时间(必填)">
              <a-range-picker v-model:value="value3" />
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="归属机构">
              <j-tree-select placeholder="请选择所属机构"
                             v-model="queryParam.sszh"
                             treeNodeFilterProp="title"
                             pid-field="sjzzbz"
                             dict="v_hr_bas_organization_cmms, zzjc, zzbz"
                             :showSearch="true"
                             :treeDefaultExpandAll="true" />
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="归属网格">
              <a-tree-select
                :treeData=sswgTreeDateoptions
                :replaceFields=replaceFields
                v-model="queryParam.wgbh"
                :dropdownStyle="{maxHeight:'400px',overflow:'auto'}"
                allow-clear
                tree-default-expand-all
              >

              </a-tree-select>

            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item :label="labelName">
              <a-select
                v-model:value="queryParam.ghzrr"
                show-search
                :placeholder="placeholder"
                :options="options"
                :allowClear="allowClear"
              >
              </a-select>
            </a-form-item>
          </a-col>


          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="主体分类">
              <j-dict-select-tag placeholder="请选择主体分类" v-model="queryParam.ztfl" dictCode="xxnyzt-ztfl" />
            </a-form-item>
          </a-col>


          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a-button @click="dctjfx2mx" style="margin-left: 8px" icon="download" v-has="'xxnyztTjfx2:exp'">导出</a-button>

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

        <span slot="detail-ghs" slot-scope="ghs,record">
          <a @click="tjfxmx(record,'',ghs)">{{ghs}}</a>
        </span>

        <span slot="detail-czzs" slot-scope="czzs,record">
          <a @click="tjfxmx(record,'1',czzs)">{{czzs}}</a>
        </span>

        <span slot="detail-syrs" slot-scope="syrs,record">
          <a @click="tjfxmx(record,'2',syrs)">{{syrs}}</a>
        </span>

        <span slot="detail-czzstj" slot-scope="czzstj,record">
          <a @click="tjfxmx(record,'3',czzstj)">{{czzstj}}</a>
        </span>

        <span slot="detail-rhzs" slot-scope="rhzs,record">
          <a @click="tjfxmx(record,'4',rhzs)">{{rhzs}}</a>
        </span>

        <span slot="detail-rhzstj" slot-scope="rhzstj,record">
          <a @click="tjfxmx(record,'5',rhzstj)">{{rhzstj}}</a>
        </span>
        <span slot="detail-yxzs" slot-scope="yxzs,record">
          <a @click="tjfxmx(record,'6',yxzs)">{{yxzs}}</a>
        </span>
        <span slot="detail-yxzstj" slot-scope="yxzstj,record">
          <a @click="tjfxmx(record,'7',yxzstj)">{{yxzstj}}</a>
        </span>
      </a-table>
      <xxnyzt-tjfx-mx-modal ref="tjfxmx"></xxnyzt-tjfx-mx-modal>

    </div>
  </a-card>
</template>

<script>
import { JeecgListMixin } from '../../../../mixins/JeecgListMixin'
import JTreeSelect from '@/components/jeecg/JTreeSelect'
import { downFile, getAction } from '@api/manage'
import xxnyztTjfxMxModal from '../modules/xxnyztTjfxMxModal'
import store from '@/store/'

export default {
  name: 'xxnyztTjfx2',
  mixins: [JeecgListMixin],
  components: { JTreeSelect,xxnyztTjfxMxModal },
  data () {
    return {
      placeholder:'',
      labelName:'',
      allowClear:true,
      url: {
        list: '/khxxgl/khxxglKhxqXxnyzt/tjfx2'
      },
      columns:[],
      columns1: [
        {
          title: '基本信息',
          children: [
            {
              title: '序号',
              dataIndex: '',
              key: 'rowIndex',
              width: 60,
              align: 'center',
              customRender: function (t, r, index) {
                return parseInt(index) + 1
              }
            },
            {
              title: '所属支行',
              align: 'center',
              dataIndex: 'sszh_dictText',
              width: 100,
              sorter: true
            },
            {
              title: '管户责任人',
              align: 'center',
              dataIndex: 'ghzrr_dictText',
              width: 100,
              sorter: true
            },
            {
              title: '管户数',
              align: 'center',
              dataIndex: 'ghs',
              width: 100,
              sorter: true
             ,scopedSlots: { customRender: 'detail-ghs' }
            }
          ]
        },
        {
          title: '村组评定',
          children: [
            {
              title: '完成总数',
              align: 'center',
              dataIndex: 'czzs',
              width: 100,
              sorter: true,scopedSlots: { customRender: 'detail-czzs' }
            },
            {
              title: '待村组评定数',
              align: 'center',
              dataIndex: 'syrs',
              width: 100,
              sorter: true,scopedSlots: { customRender: 'detail-syrs' }
            },
            {
              title: '统计期间完成数',
              align: 'center',
              dataIndex: 'czzstj',
              width: 100,
              sorter: true,scopedSlots: { customRender: 'detail-czzstj' }
            }
          ]
        },
        {
          title: '入户核定',
          children: [
            {
              title: '完成总数',
              align: 'center',
              dataIndex: 'rhzs',
              width: 100,
              sorter: true,scopedSlots: { customRender: 'detail-rhzs' }
            },
            {
              title: '统计期间完成数',
              align: 'center',
              dataIndex: 'rhzstj',
              width: 100,
              sorter: true,scopedSlots: { customRender: 'detail-rhzstj' }
            }
          ]
        },
        {
          title: '有效走访',
          children: [
            {
              title: '完成总数',
              align: 'center',
              dataIndex: 'yxzs',
              width: 100,
              sorter: true,scopedSlots: { customRender: 'detail-yxzs' }
            },
            {
              title: '统计期间完成数',
              align: 'center',
              dataIndex: 'yxzstj',
              width: 100,
              sorter: true,scopedSlots: { customRender: 'detail-yxzstj' }
            }
          ]
        }
      ],
      columns2: [
        {
          title: '基本信息',
          children: [
            {
              title: '序号',
              dataIndex: '',
              key: 'rowIndex',
              width: 60,
              align: 'center',
              customRender: function (t, r, index) {
                return parseInt(index) + 1
              }
            },
            {
              title: '所属支行',
              align: 'center',
              dataIndex: 'sszh_dictText',
              width: 100,
              sorter: true
            },
            {
              title: '走访人',
              align: 'center',
              dataIndex: 'ghzrr_dictText',
              width: 100,
              sorter: true
            },
            {
              title: '走访数',
              align: 'center',
              dataIndex: 'ghs',
              width: 100,
              sorter: true
              ,scopedSlots: { customRender: 'detail-ghs' }
            }
          ]
        },
        {
          title: '村组评定',
          children: [
            {
              title: '完成总数',
              align: 'center',
              dataIndex: 'czzs',
              width: 100,
              sorter: true,scopedSlots: { customRender: 'detail-czzs' }
            },
            {
              title: '待村组评定数',
              align: 'center',
              dataIndex: 'syrs',
              width: 100,
              sorter: true,scopedSlots: { customRender: 'detail-syrs' }
            },
            {
              title: '统计期间完成数',
              align: 'center',
              dataIndex: 'czzstj',
              width: 100,
              sorter: true,scopedSlots: { customRender: 'detail-czzstj' }
            }
          ]
        },
        {
          title: '入户核定',
          children: [
            {
              title: '完成总数',
              align: 'center',
              dataIndex: 'rhzs',
              width: 100,
              sorter: true,scopedSlots: { customRender: 'detail-rhzs' }
            },
            {
              title: '统计期间完成数',
              align: 'center',
              dataIndex: 'rhzstj',
              width: 100,
              sorter: true,scopedSlots: { customRender: 'detail-rhzstj' }
            }
          ]
        },
        {
          title: '有效走访',
          children: [
            {
              title: '完成总数',
              align: 'center',
              dataIndex: 'yxzs',
              width: 100,
              sorter: true,scopedSlots: { customRender: 'detail-yxzs' }
            },
            {
              title: '统计期间完成数',
              align: 'center',
              dataIndex: 'yxzstj',
              width: 100,
              sorter: true,scopedSlots: { customRender: 'detail-yxzstj' }
            }
          ]
        }
      ],
      columns3: [
        {
          title: '基本信息',
          children: [
            {
              title: '序号',
              dataIndex: '',
              key: 'rowIndex',
              width: 60,
              align: 'center',
              customRender: function (t, r, index) {
                return parseInt(index) + 1
              }
            },
            {
              title: '所属支行',
              align: 'center',
              dataIndex: 'sszh_dictText',
              width: 100,
              sorter: true
            },
            {
              title: '采集人',
              align: 'center',
              dataIndex: 'ghzrr_dictText',
              width: 100,
              sorter: true
            },
            {
              title: '采集数',
              align: 'center',
              dataIndex: 'ghs',
              width: 100,
              sorter: true
              ,scopedSlots: { customRender: 'detail-ghs' }
            }
          ]
        },
        {
          title: '村组评定',
          children: [
            {
              title: '完成总数',
              align: 'center',
              dataIndex: 'czzs',
              width: 100,
              sorter: true,scopedSlots: { customRender: 'detail-czzs' }
            },
            {
              title: '待村组评定数',
              align: 'center',
              dataIndex: 'syrs',
              width: 100,
              sorter: true,scopedSlots: { customRender: 'detail-syrs' }
            },
            {
              title: '统计期间完成数',
              align: 'center',
              dataIndex: 'czzstj',
              width: 100,
              sorter: true,scopedSlots: { customRender: 'detail-czzstj' }
            }
          ]
        },
        {
          title: '入户核定',
          children: [
            {
              title: '完成总数',
              align: 'center',
              dataIndex: 'rhzs',
              width: 100,
              sorter: true,scopedSlots: { customRender: 'detail-rhzs' }
            },
            {
              title: '统计期间完成数',
              align: 'center',
              dataIndex: 'rhzstj',
              width: 100,
              sorter: true,scopedSlots: { customRender: 'detail-rhzstj' }
            }
          ]
        },
        {
          title: '有效走访',
          children: [
            {
              title: '完成总数',
              align: 'center',
              dataIndex: 'yxzs',
              width: 100,
              sorter: true,scopedSlots: { customRender: 'detail-yxzs' }
            },
            {
              title: '统计期间完成数',
              align: 'center',
              dataIndex: 'yxzstj',
              width: 100,
              sorter: true,scopedSlots: { customRender: 'detail-yxzstj' }
            }
          ]
        }
      ],
      value3: [],
      value2: [],
      options:[
      ],
      loadWgxxBySskhjl:true,
      qybm:''
    }
  },
  methods: {
    init(){
      let qybm=store.getters.qybm
      console.log("qybm---------"+qybm)
      this.qybm=qybm
      if (qybm=='390'){
        this.columns=this.columns2
        this.labelName='走访人'
        this.placeholder='请选择走访人'
      } else if (qybm=='350'){
        this.columns=this.columns3
        this.labelName='采集人'
        this.placeholder='请选择管户人'
      } else{
        this.columns=this.columns1
        this.labelName='管户人'
        this.placeholder='请选择管户人'
      }
    },
    searchQuery () {
      console.log(this.value3)
      if (this.value3.length != 2) {
        this.errorInfo('请选择入户核定时间')
        return
      }
      this.value2 = this.value3;
      this.queryParam.pyyxm = this.value3[0].format('yyyyMMDD')+'000000'
      this.queryParam.pyyzjhm = this.value3[1].format('yyyyMMDD')+'235959'
      this.loadData(1)
    },
    searchReset () {
      this.queryParam = {}
      this.value3 = []
    },
    getAllGhzrr(){
      getAction("/khxxgl/khxxglKhxqXxnyzt/getAllGhzrr").then(res=>{
        if (res.success){
          this.options = res.result
        }
      })
    },
    tjfxmx(row,type,sl){
      if (sl <= 0){
        this.successInfo("数量为0不展示明细！")
        return;
      }
      let query = {};
      query.sszh = row.sszh;
      query.ghzrr = row.ghzrr;
      query.pyyxm = this.value2[0].format('yyyyMMDD')+'000000';
      query.pyyzjhm = this.value2[1].format('yyyyMMDD')+'235959';
      query.xh = type;
      query.tjfx2List = "/khxxgl/khxxglKhxqXxnyzt/tjfx2mx";
      query.qybm=this.qybm;

      this.$refs.tjfxmx.init(query);

    },
    dctjfx2mx(){
      if (this.value3.length != 2) {
        this.errorInfo('请选择入户核定时间')
        return
      }
      let cs = '';
      cs += 'pyyxm='+this.value3[0].format('yyyyMMDD')+'000000'
      cs +='&pyyzjhm='+ this.value3[1].format('yyyyMMDD')+'235959'
      if (this.queryParam.sszh){
        cs += '&sszh='+ this.queryParam.sszh
      }
      if (this.queryParam.ghzrr){
        cs += '&ghzrr='+this.queryParam.ghzrr
      }
      if (this.queryParam.ztfl){
        cs += '&ztfl='+this.queryParam.ztfl
      }
      if (this.qybm){
        cs += '&qybm='+this.qybm
      }
      window.location.href = `${window._CONFIG['domianURL']}/` + 'khxxgl/khxxglKhxqXxnyzt/tjfx2exp?'+cs
    }
  },
  created () {
    this.init()
    this.getAllGhzrr()
  }
}
</script>

<style scoped>

</style>