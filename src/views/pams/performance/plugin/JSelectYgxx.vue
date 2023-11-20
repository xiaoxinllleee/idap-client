<template>
  <div>
    <a-input-search readOnly v-model="ygxm" :placeholder="placeholder" @search="onSearchYgxx">
      <a-button slot="enterButton" :disabled="disabled" type="primary">{{buttonName}}</a-button>
    </a-input-search>
    <j-select-ygxx-list-modal ref="selectModal" :modal-width="modalWidth" :type="type" :isAll="isAll" @ok="onSearchYgxxCallBack"/>
  </div>
</template>

<script>
  import JSelectYgxxListModal from "./JSelectYgxxListModal";

  export default {
    name: 'JSelectYgxx',
    components: { JSelectYgxxListModal },
    props:{
      modalWidth:{
        type: Number,
        default: 1250,
        required: false
      },
      buttonName:{
        type: String,
        required: false,
        default: '选择接收人'
      },
      value:{
        type: String,
        required: false
      },
      disabled:{
        type: Boolean,
        required: false,
        default: false
      },
      type: {
        type: String,
        required: false,
        default: 'checkbox'
      },
      placeholder: {
        type: String,
        required: false,
        default: '请选择员工'
      },
      isAll: {
        type: Boolean,
        required: false,
        default: true
      }
    },
    data() {
      return {
        zzjc: "",
        ygxm: "",
        yggh: "",
      }
    },
    mounted() {
      this.ygxm = this.value;
    },
    watch: {
      value(val) {
        this.ygxm = val;
      }
    },
    model: {
      prop: 'value',
      event: 'change',
    },
    methods: {
      //通过组织机构筛选选择用户
      onSearchYgxx() {
        this.$refs.selectModal.showModal()
        this.onSearchYgxxCallBack([])
      },
      onSearchYgxxCallBack(selectedYgxxRows) {
        let zzjcArray = [];
        let ygxmArray = [];
        let ygghArray = [];
        selectedYgxxRows.forEach(value => {
          // console.info('所选员工所属组织 -',value.zzbz_dictText);
          // console.info('所选员工工号 -',value.yggh);
          // console.info('所选员工姓名 -',value.ygxm);
          zzjcArray.push(value.zzbz_dictText);
          ygxmArray.push(value.ygxm);
          ygghArray.push(value.yggh);
        })
        this.zzjc = zzjcArray.join(',')
        this.ygxm = ygxmArray.join(',')
        this.yggh = ygghArray.join(',')
        this.$emit("selectComplete",selectedYgxxRows)
        this.$emit("change",{"zzjc":this.zzjc,"ygxm":this.ygxm,"yggh":this.yggh})
      }
    }
  }
</script>

<style scoped>

</style>