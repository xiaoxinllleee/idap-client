<template>
  <a-radio-group v-if="tagType=='radio'" @change="handleInput" :value="getValueSting" :disabled="disabled">
    <a-radio v-for="(item, key) in dictOptions" :key="key" :value="item.value">{{ item.text }}</a-radio>
  </a-radio-group>

  <a-select v-else-if="tagType=='select'" :style="{width: width}" :showSearch="showSearch" :getPopupContainer = "(target) => target.parentNode" :placeholder="placeholder" :disabled="disabled"
            :value="getValueSting" @change="handleInput" :filterOption="filterOption" optionFilterProp="children" :allowClear="allowClear">
    <a-select-option value="undefined" v-if="pleaseSelect">请选择</a-select-option>
    <a-select-option v-for="(item, key) in dictOptions" :key="key" :value="item.value" :disabled="item.disabled">
      <template v-if="showSearch">
        {{item.text}}
      </template>
      <span v-else style="display: inline-block;width: 100%" :title=" item.text || item.label ">
        {{ item.text || item.label }}
      </span>
    </a-select-option>
  </a-select>
</template>

<script>
  import {ajaxGetDictItems} from '@/api/api'

  export default {
    name: "JDictSelectTag",
    props: {
      dictCode: String,
      placeholder: String,
      triggerChange: {
        type: Boolean,
        required: false,
        default: false
      },
      disabled: Boolean,
      value: [String, Number],
      type: String,
      qydm:  {
        type: Boolean,
        required: false,
        default: false
      },
      showSearch: Boolean,
      pleaseSelect: {
        type: Boolean,
        required: false,
        default: true
      },
      width: String,
      allowClear: {
        type: Boolean,
        required: false,
        default: false
      },
      optionDisabled: Array
    },
    data() {
      return {
        dictOptions: [],
        tagType:""
      }
    },
    watch:{
      dictCode:{
        immediate:true,
        handler() {
          this.initDictData()
        },
      }
    },
    created() {
      // console.log(this.dictCode);
      if(!this.type || this.type==="list"){
        this.tagType = "select"
      }else{
        this.tagType = this.type
      }
      //获取字典数据
      // this.initDictData();
    },
    computed: {
      getValueSting(){
        return this.value || this.value == '0'? this.value.toString() : null;
      },
    },
    methods: {
      initDictData() {
        //根据字典Code, 初始化字典数组
        ajaxGetDictItems(this.dictCode, { qydm:this.qydm }).then((res) => {
          if (res.success) {
            this.dictOptions = res.result;
            if (this.optionDisabled && this.optionDisabled.length > 0) {
              this.dictOptions.map((option) => {
                if(this.optionDisabled.includes(option.value)) {
                  option.disabled = true
                }
              })
            }
          }
        })
      },
      handleInput(e) {
        let val;
        if(this.tagType=="radio"){
          val = e.target.value
        }else{
          val = e
        }
        if(this.triggerChange){
          this.$emit('change', val);
        }else{
          this.$emit('input', val);
        }
      },
      setCurrentDictOptions(dictOptions){
        this.dictOptions = dictOptions
      },
      getCurrentDictOptions(){
        return this.dictOptions
      },
      filterOption(input, option) {
        return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      },
    }
  }
</script>

<style scoped>
</style>