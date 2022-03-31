<template>
    <div class="comments">
        <div class="comment-box">
            으갸갸갸ssssssssssssssssssssssssssssssssssssssssssssssss
            sssssssssssssssssssssssssssssssssssssss
            sssssssssssssssssssssssssssssssssssssssssss
            sssssssssssssssssssssssssssssssssssssss
            sssssssssssssssssssssssssssssssssssssssssss
            sssssssssssssssssssssssssssssssssssssss
            sssssssssssssssssssssssssssssssssssssssssss
            sssssssssssssssssssssssssssssssssssssss
            sssssssssssssssssssssssssssssssssssssssssss
            sssssssssssssssssssssssssssssssssssssss
            {{this.contentId}}
            {{this.roomNum}}
        </div>
        <div class="comment-box">
            으갸갸갸
            {{this.contentId}}
            {{this.roomNum}}
        </div>
        <div class="comment-box">
            으갸갸갸
            {{this.contentId}}
            {{this.roomNum}}
        </div>
        <div class="comment-box">
            으갸갸갸
            {{this.contentId}}
            {{this.roomNum}}
        </div>
        <div class="comment-box">
            으갸갸갸
            {{this.contentId}}
            {{this.roomNum}}
        </div>
        <div class="comment-box">
            으갸갸갸
            {{this.contentId}}
            {{this.roomNum}}
        </div>
        
    </div>
</template>

<script>


export default {
    data() {
        const contentId = Number(this.$route.params.contentId);
        const roomNum = Number(this.$route.params.roomNum);
        return {
            contentId : contentId,
            roomNum : roomNum,
        }
    },
    props:{
        contentId : Number,
        roomNum : Number,
    },
    async created(){
       

        
    },
    methods: {

    }
}
</script>

<style scoped>
    .comments{
        display: flex;
        /* justify-content: center; */
        flex-direction: column;
    }
    .comment-box{
        align-self: center;
        width : 80%;
        min-height : 120px;
        height: auto;
        background-color : white;
        border: 1px solid;
        border-color: black white;
        box-sizing: border-box;
        padding: 10px;
        /* margin : 10px; */
    }

</style>
