<!--// TODO 二级营销单元责任领导选择组件 -->
<template>
  <div>
    <a-input-search :placeholder="placeholder" v-model="ygxm" readOnly @search="onSearchYgxx">
      <a-button slot="enterButton" :disabled="disabled">请选择</a-button>
    </a-input-search>
    <j-select-zrld-modal ref="zrld" :modal-width="modalWidth" :type="type" @ok="onSearchYgxxCallBack" />
  </div>
</template>

<script>
  import JSelectZrldModal from './modal/JSelectZrldModal'

  export default {
    name: 'JSelectYgxx',
    components: { JSelectZrldModal },
    props:{
      modalWidth:{
        type: Number,
        default: 1000,
        required: false
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
        default: '请选择'
      },
    },
    data() {
      return {
        ygxm: "",
        yggh: "",
      }
    },
    mounted(){
      this.ygxm = this.value;
    },
    watch:{
      value(val){
        this.ygxm = val;
      }
    },
    model: {
      prop: 'value',
      event: 'change'
    },
    methods: {
      //通过组织机构筛选选择用户
      onSearchYgxx() {
        this.$refs.zrld.showModal();
        this.onSearchYgxxCallBack([]);
      },
      onSearchYgxxCallBack(selectedYgxxRows) {
        let ygxmArray = [];
        let ygghArray = [];
        selectedYgxxRows.forEach(value=>{
          console.log("员工工号：[ " + value.yggh + "]；员工姓名：[" + value.ygxm + "]。");
          ygxmArray.push(value.ygxm);
          ygghArray.push(value.yggh);
        })
        this.ygxm = ygxmArray.join(',');
        this.yggh = ygghArray.join(',');
        this.$emit("selectComplete", selectedYgxxRows);
        this.$emit("change",{ "ygxm": this.ygxm, "yggh": this.yggh });
      }
    }
  }
</script>

<style scoped>

</style>