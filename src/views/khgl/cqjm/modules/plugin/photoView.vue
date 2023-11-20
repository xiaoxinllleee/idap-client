<template>
  <a-model :visible="alert"
           @ok="handlerView">
    <img id="pic" :src="studentImg" preview style="width: 30px; height: 30px;">
  </a-model>
</template>

<script>
  export default {
    name: 'PhotoViewPlugin',
    data(){
      return{
        alert: false,
        studentImg: "",
      }
    },
    created() {},
    methods:{
      showModal() {
        this.alert = true;
      },
      handlerView() {},
    }
  }
</script>

