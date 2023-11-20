<template>
  <div>
    <a-input-search
      v-model="ygxm"
      :placeholder="placeholder"
      readOnly
      @search="onSearchYgxx">
      <a-button slot="enterButton" :disabled="disabled">选择客户经理</a-button>
    </a-input-search>
    <j-select-ygxx-list-modal
      ref="selectModal"
      :modal-width="modalWidth"
      :type="type"
      @ok="onSearchYgxxCallBack" />
  </div>
</template>

<script>
  import JSelectYgxxListModal from './JSelectYgxxListModal'
  export default {
    name: 'JSelectYgxx',
    components: { JSelectYgxxListModal },
    props:{
      modalWidth:{
        type:Number,
        default:1250,
        required:false
      },
      value:{
        type:String,
        required:false
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
    },
    data() {
      return {
        ygxm:"",
        yggh:"",
      }
    },
    mounted(){
      this.ygxm = this.value
    },
    watch:{
      value(val){
        this.ygxm = val
      }
    },
    model: {
      prop: 'value',
      event: 'change'
    },
    methods: {
      clearName(){
        this.ygxm="";
      },
      //通过组织机构筛选选择用户
      onSearchYgxx() {
        this.$refs.selectModal.showModal()
        this.onSearchYgxxCallBack([])
      },
      onSearchYgxxCallBack(selectedYgxxRows) {
        let ygxmArray = []
        let ygghArray = []
        selectedYgxxRows.forEach(value=>{
          console.log("value.ygxm")
          console.log(value.ygxm)
          console.log(value.yggh)
          ygxmArray.push(value.ygxm)
          ygghArray.push(value.yggh)
        })
        this.ygxm = ygxmArray.join(',')
        this.yggh  = ygghArray.join(',')
        this.$emit("selectComplete",selectedYgxxRows)
        this.$emit("change",{"ygxm":this.ygxm,"yggh":this.yggh})
      }
    }
  }
</script>

<style scoped>

</style>