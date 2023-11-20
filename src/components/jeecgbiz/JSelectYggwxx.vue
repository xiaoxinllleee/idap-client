<template>
  <div>
    <a-input-search
      v-model="ygxm"
      :placeholder="placeholder"
      readOnly
      @search="onSearchYgxx">
      <a-button slot="enterButton" :disabled="disabled">选择员工</a-button>
    </a-input-search>
    <j-select-yggwxx-list-modal
      ref="selectModal"
      :modal-width="modalWidth"
      :type="type"
      :sszh="sszh"
      @ok="onSearchYgxxCallBack" />
  </div>
</template>

<script>
  import JSelectYggwxxListModal from './modal/JSelectYggwxxListModal'
  export default {
    name: 'JSelectYgxx',
    components: { JSelectYggwxxListModal },
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
      sszh:{
        type:Boolean,
        default:true,
        required:false
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
        console.log('watch', val)
        this.ygxm = val
      }
    },
    // model: {
    //   prop: 'value',
    //   event: 'change'
    // },
    methods: {
      //通过组织机构筛选选择用户
      onSearchYgxx() {
        this.$refs.selectModal.showModal()
        // this.onSearchYgxxCallBack([])
      },
      onSearchYgxxCallBack(selectedYgxxRows) {
        let ygxmArray = []
        let ygghArray = []
        let zzbzArray = []
        let zzmcArray = []
        let khjlbzArray = []
        selectedYgxxRows.forEach(value=>{
          value.ygxm = value.yggh_dictText
          console.log("value.ygxm")
          console.log(value.ygxm)
          console.log(value.yggh)
          ygxmArray.push(value.ygxm)
          ygghArray.push(value.yggh)
          zzbzArray.push(value.zzbz)
          zzmcArray.push(value.zzbz_dictText)
          khjlbzArray.push(value.khjlbz)
        })
        this.ygxm = ygxmArray.join(',')
        console.log('this.ygxm11', this.ygxm)
        this.yggh  = ygghArray.join(',')
        this.$emit("selectComplete",selectedYgxxRows)
        this.$emit("change",{"zzbz":zzbzArray.join(','), "zzmc": zzmcArray.join(','), "ygxm":this.ygxm,"yggh":this.yggh,"khjlbz": khjlbzArray.join(',') })
      }
    }
  }
</script>

<style scoped>

</style>