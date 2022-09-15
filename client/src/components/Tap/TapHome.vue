<template>
    <div class="container">
        
        <div class="my-write-title">
            <h1 v-if="roomNum === 1">내가 쓴 글</h1>
            <h1 v-else-if="roomNum === 2">좋아요</h1>
        </div>
        
    
        <div class="preview-container">
            <TapPreview v-bind:childNum="roomNum" /> 
        </div>      
    </div>
</template>

<script>
import TapPreview from '@/components/Tap/TapPreview'

export default {
    name: '',
    components: {
       TapPreview 
    },
    props: {
        roomNum : {
            type : Number,
        }
    },
    data() {
        return {
            
        }
    },
    created() {
        window.scrollTo(0,0);
        //새로고침
        window.onload = ()=>{
            setTimeout(()=>{
                scrollTo(0,0);
            },100);
        }
    },
    methods: {
        

    } 
    
}

</script>
<style scoped>
    /* .title-box{
        position: relative;
    } */
    
    /* * {
        width: 100%;
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
    } */


   .my-write-title h1{
       margin: 20px 20px 20px 50px;
       text-align: center;
       color: #807097;
   }

   .container{
       /* box-sizing: border-box; */
       margin: 0px;
       margin-bottom: 30px;
       display: flex;
       width: 100%;
       flex-wrap: wrap;
       flex-direction: column;
       justify-content: center;
   }


</style>