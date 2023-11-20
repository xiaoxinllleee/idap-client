<template>

 <img :id="this.id" :src="this.studentImg"  preview style="width:100px; height:100px">

</template>

<script>
  export default {
    name: 'photo_view',

    props:{
      id:{
        type:String
      },
      studentImg:{
        type:String
      }

    },

    data(){
      return{
        alert1: false,
      }
    },
    created() {

    },
    methods:{
      showModal(vuler) {
        alert(1)
        this.studentImg =vuler,
        console.log(vuler)
        console.log(this.studentImg)
        this.alert1 = true;
      },
    }
  }
</script>

