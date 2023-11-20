<template>
  <div>
    <a-input-search
      v-model="yggh1"
      :placeholder="placeholder"
      readOnly
      @search="onSearchYgxx">
      <a-button slot="enterButton" :disabled="disabled">选择员工</a-button>
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
      yggh1:{
        type:String,
        default:" ",
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
        khjlbh:"",
        zzbz:"",
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
      //通过组织机构筛选选择用户
      onSearchYgxx() {
        this.$refs.selectModal.showModal()
        this.onSearchYgxxCallBack([])
      },
      onSearchYgxxCallBack(selectedYgxxRows) {
        let ygxmArray = []
        let ygghArray = []
        let zzbzArray = []
        let khjlbhArray = []

        selectedYgxxRows.forEach(value=>{
          console.log("value.ygxm")
          console.log(value.ygxm)
          console.log(value.yggh)
          ygxmArray.push(value.ygxm)
          ygghArray.push(value.yggh)
          zzbzArray.push(value.zzbz)
          khjlbhArray.push(value.khjlbz)
        })
        this.ygxm = ygxmArray.join(',')
        this.yggh  = ygghArray.join(',')
       /* this.yggh1  = ygghArray.join(',')
        alert(this.yggh1)*/
        this.khjlbh =khjlbhArray.join(',')
        this.zzbz = zzbzArray.join(',')
        this.$emit("selectComplete",selectedYgxxRows)
        this.$emit("change",{"ygxm":this.ygxm,"yggh":this.yggh,"khjlbz":this.khjlbh,"zzbz":this.zzbz})
      },
      /*edit1(record){
        alert(321)
        this.yggh = record.yggh

      }*/
    }
  }
</script>

<style scoped>

</style>