<template>
<a-model :visible="alert1">
 <img id="picT" :src="studentImg"  preview style="width:100px; height:100px;">
</a-model>
</template>

<script>
  export default {
    name: 'photo_view',
    data(){
      return{
        alert1: false,
        studentImg:"",
      }
    },
    created() {
    },
    methods:{
      showModal() {
        alert(1)
        this.alert1 = true;
      },
    }
  }
</script>

