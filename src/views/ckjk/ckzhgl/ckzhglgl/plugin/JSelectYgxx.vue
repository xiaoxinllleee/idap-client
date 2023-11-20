<template>
  <div>
    <a-input-search :placeholder="placeholder" v-model="ygxm" @search="onSearchYgxx" readOnly>
      <a-button slot="enterButton" :disabled="disabled">选择员工</a-button>
    </a-input-search>

    <j-select-ygxx-modal ref="selectModal" :modal-width="modalWidth" :type="type" @ok="onSearchYgxxCallBack"/>
  </div>
</template>

<script>
  import JSelectYgxxModal from "./JSelectYgxxModal";

  export default {
    name: 'JSelectYgxx',
    components: {JSelectYgxxModal},
    props: {
      modalWidth: {
        type: Number,
        default: 1250,
        required: false
      },
      value: {
        type: String,
        required: false
      },
      disabled: {
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
        ygxm: "",
        yggh: "",
      }
    },
    mounted() {
      this.ygxm = this.value
    },
    watch: {
      value(val) {
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
      onSearchYgxxCallBack(record) {
        var feedBackArray = []
        if (record.length > 0) {
          console.log('员工岗位信息查找带回 record', record[0].yggh)
          this.$set(feedBackArray, 'yggh', record[0].yggh)
          this.$set(feedBackArray, 'ygxm', record[0].ygxm)
          this.$set(feedBackArray, 'zzbz', record[0].zzbz)
          this.$set(feedBackArray, 'zzmc', record[0].zzmc)
          this.$set(feedBackArray, 'gwbz', record[0].gwbz)
          this.$set(feedBackArray, 'gwmc', record[0].gwmc)
          this.$set(feedBackArray, 'khjlbz', record[0].khjlbz)
          this.$set(feedBackArray, 'gyh', record[0].gyh)
          console.log('员工岗位信息 feedBackArray:', feedBackArray)
          this.$emit("selectComplete", record);
          this.$emit("change", feedBackArray)
        }
      }
    }
  }
</script>

<style scoped>

</style>