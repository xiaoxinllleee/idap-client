<template>
  <a-row>
    <a-radio-group v-model="selectedValue" :disabled="disabled" @change="handleInput">
      <a-radio v-for="item in dictOptions" :value="item.value" > {{ item.text }}</a-radio>
    </a-radio-group>
  </a-row>

</template>

<script>
import { getAction } from '../../api/manage'

export default {
  name: "JDictSelectTag",
  props: {
    dictCode: String,
    disabled: Boolean,
    value:String,
    type: String,
  },
  data() {
    return {
      dictOptions: [],
      selectedValue:'',
    }
  },
  watch:{
    dictCode:{
      immediate:true,
      handler() {
        this.initDictData()
      },
    },
    value:{
      immediate:true,
      handler() {
        this.selectedValue = this.value ? this.value.toString() : null;
      },
    }
  },
  computed: {
  },

  mounted() {
    //this.selectedValue = this.value ? this.value.toString() : null;
  },

  methods: {
    initDictData() {
      //根据字典Code, 初始化字典数组
      var params = null
      getAction(`/sys/dict/getDictItems/${this.dictCode}`,params).then((res) => {
        if (res.success) {
          this.dictOptions = res.result;
        }
      })
    },
    handleInput(e) {
      this.$emit('input', e.target.value);
    },

  }
}
</script>

<style scoped>
</style>
