<template>
  <div>
    <a-input-search
      v-model="dybh"
      :placeholder="placeholder"
      readOnly
      @search="onSearchLookup">
      <a-button slot="enterButton" :disabled="disabled">修改地址</a-button>
    </a-input-search>
    <j-select-sjyxdy-list-modal
      ref="selectModal"
      :modal-width="modalWidth"
      :type="type"
      @ok="onSearchLookupCallBack"
    />
  </div>
</template>

<script>
  import JSelectSjyxdyListModal from './JSelectSjyxdyListModal'
  export default {
    name: 'JSelectSjyxdy',
    components: { JSelectSjyxdyListModal },
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
        default: '请选择营销单元'
      },
    },
    data() {
      return {
        yjdybh:"",
        yjdymc:"",
        ejdybh:"",
        ejdymc:"",
        dybh:"",
        dymc:"",
        sszh:"",
        sszhmc:"",

      }
    },
    mounted(){
      this.dybh = this.value

    },
    watch:{
      value(val){
        this.dybh = val

      }
    },
    model: {
      prop: 'value',
      event: 'change'
    },
    methods: {
      //通过组织机构筛选选择用户
      onSearchLookup() {
        this.$refs.selectModal.showModal()
        this.onSearchLookupCallBack([])
      },
      onSearchLookupCallBack(selectedYgxxRows) {
        let yjdybhArray = []
        let yjdymcArray = []
        let ejdybhArray = []
        let ejdymcArray = []
        let sjdybhArray = []
        let sjdymcArray = []
        let sszhArray = []
        let sszhmcArray =[]

        selectedYgxxRows.forEach(value=>{
          yjdybhArray.push(value.yjyxdybh)
          yjdymcArray.push(value.yjyxdybh_dictText)
          ejdybhArray.push(value.ejyxdybh)
          ejdymcArray.push(value.ejyxdybh_dictText)
          sjdybhArray.push(value.dybh)
          sjdymcArray.push(value.dymc)
          sszhArray.push(value.sszh)
          sszhmcArray.push(value.sszh_dictText)

        })
        this.yjdybh = yjdybhArray.join(',')
        this.yjdymc = yjdymcArray.join(',')
        this.ejdybh = ejdybhArray.join(',')
        this.ejdymc = ejdymcArray.join(',')
        this.dybh = sjdybhArray.join(',')
        this.dymc = sjdymcArray.join(',')
        this.sszh = sszhArray.join(',')
        this.sszhmc = sszhmcArray.join(',')

        this.$emit("selectComplete",selectedYgxxRows)
        this.$emit("change",{"dybh":this.dybh,"dymc":this.dymc,"yjdybh":this.yjdybh,"yjdymc":this.yjdymc,"ejdybh":this.ejdybh,
          "ejdymc":this.ejdymc,"sszh":this.sszh,"sszhmc":this.sszhmc})


      },

    }
  }
</script>

<style scoped>

</style>