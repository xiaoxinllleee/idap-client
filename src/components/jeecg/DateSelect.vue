<template>
  <a-select  :value="value"  @select="selectValue" placeholder="请选择" style="width:100px;">
    <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
  </a-select>
</template>

<script>
  export default {
    name: 'DateSelect',
    props: {
      value: {
        type: String
      }
    },
    data() {
      return {
        yearsModel:null,
        years:[],
      }
    },

    created() {
      this.init();
    },
    methods: {
      init(){
        var myDate = new Date;
        var year = myDate.getFullYear();//获取当前年
        this.initSelectYear(year)
      },
      initSelectYear(year){
        this.years = [];
        for(let i=0;i<30;i++){
          this.years.push({value:((year - i)+''),label:((year - i)+'')});
        }
      },
      selectValue(value){
        let val=value;
        this.$emit('change', val);
        //操作父组件方法
        //this.$parent.dateChange(obj);
      },
    }
  }
</script>
