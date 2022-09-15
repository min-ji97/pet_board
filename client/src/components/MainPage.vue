<template>
    <div class="container">
        <div class="search-contents">
            <a-input-search placeholder="input search text" style="width: 500px" @search="onSearch" />
        </div>
        <div class="preview-container">
            <Preview/> 
        </div>
        <div class="create-box">
            <a-button type="primary" class="createBtn" @click="gotoWrite()">
                <a-icon type="edit" />
            </a-button>
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
    data() {
        return {
            
        }
    },
    async created() {
        window.scrollTo(0,0);
        //새로고침
        window.onload = ()=>{
            setTimeout(()=>{
                scrollTo(0,0);
            },100);
        }
        // await this.$store.dispatch('');
        await this.$store.dispatch('comment/getMainCommentProcess');
        await this.$store.dispatch('comment/getAskCommentProcess');
    },
    methods: {
        gotoWrite() {
            if(!this.$store.state.user.user.id){
                this.$message.info('로그인이 필요합니다!');
                this.$router.push({
                    path: '/login'
                })
            }else{
                this.$router.push({
                    name: 'CreatePage',
                    params: { boardNum : 1 },
                });
            }
        }

    } 
    
}

</script>
<style scoped>
    .container{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }
    .margin-20{
        margin:20px;
        /* align-self: ; */
    }
 
    .preview-container { 
        /* 이거 필요 X preview.vue에서 적용해줌 */
        /* display: flex; */
        /* flex-wrap: wrap; */
        /* justify-content: center;  */
        /* align-items: center; */
        width: 98%;
        margin: 20px;
    }
    .create-box{
        margin: 100px;
    }

    .createBtn{
        /* float: right; */
        /* margin: 30px; */
        width: 90px;
        height: 60px;
        font-size: 30px;
        font-weight: 500;
        background-color: #a797ff ;
        border: 1px solid white;
    }

    .createBtn:hover{
       color: #807097;
       background-color: white;
       border: 1px solid #807097;
    }




</style>