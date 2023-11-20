<template>
  <a-tabs defaultActiveKey="1"  @change="callback">
    <a-tab-pane loading="true" tab="支行按客户经理" key="1">
      <xxnyzt-ly-tjfx-modal tjlx="1" :columns="columns" ref="ref0"></xxnyzt-ly-tjfx-modal>
    </a-tab-pane>
    <a-tab-pane loading="true" tab="建档评级跟踪检测表" key="2">
      <xxnyzt-ly-jcb ref="ref2"></xxnyzt-ly-jcb>
    </a-tab-pane>
<!--    <a-tab-pane loading="true" tab="支行按主体分类" key="2">-->
<!--      <xxnyzt-tjfx-modal tjlx="2" :columns="columns2" ref="ref1"></xxnyzt-tjfx-modal>-->
<!--    </a-tab-pane>-->
<!--    <a-tab-pane loading="true" tab="支行汇总" key="3">-->
<!--      <xxnyzt-tjfx-modal tjlx="3" :columns="columns3" ref="ref2"></xxnyzt-tjfx-modal>-->
<!--    </a-tab-pane>-->
<!--    <a-tab-pane loading="true" tab="全行汇总" key="4">-->
<!--      <xxnyzt-tjfx-modal tjlx="4" :columns="columns4" ref="ref3"></xxnyzt-tjfx-modal>-->
<!--    </a-tab-pane>-->

  </a-tabs>
</template>

<script>
import xxnyztLyTjfxModal from './xxnyztLyTjfxModal'
import xxnyztLyJcb from './xxnyztLyJcb'
export default {
  name: 'xxnyztTjfx',
  components:{xxnyztLyTjfxModal,xxnyztLyJcb},
  data(){
    return{
      columns: [
        { align: 'center',title: '所属支行', dataIndex: 'sszh_dictText' },
        { align: 'center',title: '客户经理', dataIndex: 'updatot' },
        { align: 'center',title: '管户数', dataIndex: 'ghs',scopedSlots: { customRender: 'detail-ghs' } },
        { align: 'center',title: '走访数', dataIndex: 'zfs',scopedSlots: { customRender: 'detail-clkhs' } },
        { align: 'center',title: '参与农贷评级负责人数', dataIndex: 'xends'},
        { align: 'center',title: '负责人已授信额(万)', dataIndex: 'fzrysxs',scopedSlots: { customRender: 'detail-hmdhs' }},
        { align: 'center',title: '评级数', dataIndex: 'pjs'},
        { align: 'center',title: '待定数', dataIndex: 'dds'},
        { align: 'center',title: '客户经理授信意向(万)', dataIndex: 'khjlsxyx'},
        { align: 'center',title: '审批金额(万)', dataIndex: 'sped'},
        { align: 'center',title: '审批数', dataIndex: 'sps'},
        { align: 'center',title: '走访率', dataIndex: 'zfl'},
        { align: 'center',title: '建档评级率', dataIndex: 'jdpjl'},
        { align: 'center',title: '审批率', dataIndex: 'spl'},
      ],

      // columns2: [
      //   { align: 'center',title: '组织机构', dataIndex: 'sszh_dictText', width: '80' },
      //   { align: 'center',title: '主体分类', dataIndex: 'ztfl_dictText', width: '140' },
      //   { align: 'center',title: '户数', dataIndex: 'ghs', scopedSlots: { customRender: 'detail-ghs' } },
      //   { align: 'center',title: '其中存量客户数', dataIndex: 'clkhs', scopedSlots: { customRender: 'detail-clkhs' } },
      //   { align: 'center',title: '存量额度', dataIndex: 'clje' },
      //   { align: 'center',title: '黑名单户', dataIndex: 'hmdhs', scopedSlots: { customRender: 'detail-hmdhs' } },
      //   { align: 'center',title: '无效户', dataIndex: 'wxh', scopedSlots: { customRender: 'detail-wxh' } },
      //   { align: 'center',title: '待村组评定', dataIndex: 'dczpdhs',scopedSlots: { customRender: 'detail-dczpdhs' } },
      //   { align: 'center',title: '待入户核定户数', dataIndex: 'drhhdhs',scopedSlots: { customRender: 'detail-drhhdhs' } },
      //   { align: 'center',title: '灰名单户数', dataIndex: 'huimdhs', scopedSlots: { customRender: 'detail-huimdhs' } },
      //   { align: 'center',title: '白名单户数', dataIndex: 'bmdhs', scopedSlots: { customRender: 'detail-bmdhs' } },
      //   { align: 'center',title: '授信额度', dataIndex: 'sxed',  },
      // ],
      // columns3: [
      //   { align: 'center',title: '支行', dataIndex: 'sszh_dictText'},
      //   { align: 'center',title: '管户数', dataIndex: 'ghs', scopedSlots: { customRender: 'detail-管户数' }},
      //   { align: 'center',title: '其中存量客户数', dataIndex: 'clkhs', scopedSlots: { customRender: 'detail-clkhs' } },
      //   { align: 'center',title: '存量金额', dataIndex: 'clje' },
      //   { align: 'center',title: '存量不良金额', dataIndex: 'clblje' },
      //   { align: 'center',title: '黑名单户', dataIndex: 'hmdhs', scopedSlots: { customRender: 'detail-hmdhs' } },
      //   { align: 'center',title: '无效户', dataIndex: 'wxh', scopedSlots: { customRender: 'detail-wxh' } },
      //   { align: 'center',title: '待村组评定', dataIndex: 'dczpdhs', scopedSlots: { customRender: 'detail-dczpdhs' } },
      //   { align: 'center',title: '待入户核定户数', dataIndex: 'drhhdhs', scopedSlots: { customRender: 'detail-drhhdhs' } },
      //   { align: 'center',title: '灰名单户数', dataIndex: 'huimdhs',scopedSlots: { customRender: 'detail-huimdhs' } },
      //   { align: 'center',title: '白名单户数', dataIndex: 'bmdhs', scopedSlots: { customRender: 'detail-bmdhs' } },
      //   { align: 'center',title: '授信额度', dataIndex: 'sxed'},
      // ],
      // columns4: [
      //   { align: 'center',title: '主体分类', dataIndex: 'ztfl_dictText'},
      //   { align: 'center',title: '户数', dataIndex: 'ghs', scopedSlots: { customRender: 'detail-ghs' } },
      //   { align: 'center',title: '其中存量客户数', dataIndex: 'clkhs', scopedSlots: { customRender: 'detail-clkhs' } },
      //   { align: 'center',title: '存量金额', dataIndex: 'clje' },
      //   { align: 'center',title: '存量不良金额', dataIndex: 'clblje'},
      //   { align: 'center',title: '黑名单户', dataIndex: 'hmdhs',scopedSlots: { customRender: 'detail-hmdhs' } },
      //   { align: 'center',title: '无效户', dataIndex: 'wxh', scopedSlots: { customRender: 'detail-wxh' } },
      //   { align: 'center',title: '待村组评定', dataIndex: 'dczpdhs',scopedSlots: { customRender: 'detail-dczpdhs' } },
      //   { align: 'center',title: '待入户核定户数', dataIndex: 'drhhdhs',scopedSlots: { customRender: 'detail-drhhdhs' } },
      //   { align: 'center',title: '灰名单户数', dataIndex: 'huimdhs', scopedSlots: { customRender: 'detail-huimdhs' } },
      //   { align: 'center',title: '白名单户数', dataIndex: 'bmdhs', scopedSlots: { customRender: 'detail-bmdhs' } },
      //   { align: 'center',title: '授信额度', dataIndex: 'sxed',  },
      // ]
    }
  },
  methods: {
    callback(key) {
      console.log(key)
      if (key=='1'){
        this.$refs.ref0.searchQuery();
      }
      if (key=='2'){
        this.$refs.ref2.searchQuery();
      }
      // if (key=='3'){
      //   this.$refs.ref2.searchQuery();
      // }
      // if (key=='4'){
      //   this.$refs.ref3.searchQuery();
      // }
    },
  },
}
</script>

<style scoped>

</style>