<template>
    <div class="container">
        <div class="my-write-title">
            <h1 v-if="roomNum === 1">내가 쓴 글을 확인 합니다..!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!</h1>
            <h1 v-else-if="roomNum === 2">좋아요...!~!</h1> 
        </div>
        <div class="preview-container">
            <Preview/> 
        </div>

        
          
    </div>
</template>

<script>
import Preview from '@/components/Preview'
export default {
    name: 'App',
    components: {
       Preview
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
        console.log('내가 쓴 글그륵르르ㅡ르르르르르르ㅡ르ㅡ르르를 룸넘벌 :  ', roomNum);
    },
    methods: {
        

    } 
    
}

</script>
<style scoped>
   .my-write-title{
       margin: 30px;
   }




</style>