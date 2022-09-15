<template>
    <div class="comments">
        <div class="comment-box" v-for="list of commentList" v-bind:key="list.comment_id" >
            <div class="image-box">
                <img class="user-img" v-if="list.user_image" :src="`http://localhost:3000/images/${list.user_image}`" onerror="this.src=``" />
                <a-avatar v-else class="primary-user-img" :size="78" icon="user"  />
            </div>
            <div class="text-box">
                <div class="info-box">
                    <div class="nick-name">{{list.nickName}}</div>
                    <div class="date">
                        {{$moment(list.create_at).format('YYYY-MM-DD h:mm:ss')}}

                        

                    </div>

                    

                </div>
                <div class="context-box">{{list.context}}</div>
                <div v-if=" (list.user_id === userId) ? true : false " class="delete-btn" >
                    <a-icon type="delete" @click="postDelete()" />       
                </div>
            </div>
        </div>
    
       
        
    </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
    data() {


        return {
            myWriteBoolean : '',

            userId : this.$store.state.user.user.userId,

            // contentId : contentId,
            // roomNum : roomNum,

            // commentList : commentList,

            // mainCommentList : mainCommentList,
            // askCommentList : askCommentList,
        }
    },
    computed: {
        ...mapState('comment',[ 
            'mainComment',
            'askComment'
        ])
    },
    props:{
        commentList : Array
    },
    async created(){
 
        
    },
    mounted() {
    
    },
    methods: {
        postDelete(){
            const deletBtn = confirm("해당 댓글을 삭제하시겠습니까?");

            if(deletBtn){ // true 게시글을 삭제하겠따..!
                this.$message.success('게시글을 삭제하였습니다!');
                // 댓글을 삭제를 하려면 roomNum / comment_id / content_id 
            }else{
                this.$message.info('게시글을 삭제하지않았슴~');
            }
        },
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
        display: flex;
        flex-direction: row;
        align-self: center;
        width : 90%;
        min-height : 120px;
        height: auto;
        background-color : white;
        border: 1px solid;
        border-color: black white;
        box-sizing: border-box;
        padding: 10px;
        /* margin : 10px; */
    }

    .image-box{
        width: 16%;
        margin: 10px;
        /* border: 1px solid red; */
    }
    .text-box{
        width: 100%;
        /* border: 1px solid red; */
        margin: 10px;
        display: flex;
        flex-direction: column;
    }
    .info-box{
        margin-left: 20px;
        display: flex;
        justify-content: space-between;

        /* border: 1px solid orange; */
        /* font-size:10px; */

    }
    .info-box .nick-name{
        font-size: 20px ;
    }
    .info-box .date{
        font-size: 13px ;
        margin-left: 10px;
    }
    .context-box{
        /* margin: 10px; */
        font-size: 24px;
        /* border: 1px solid orange; */
        box-sizing: border-box;
        padding: 10px;
    }

    .user-img{
        width: 100px;
        height: 100px;
        border-radius: 50px; 
        object-fit: cover;
    }

    .primary-user-img{
        background-color: #e7e3ff;
    }


    .delete-btn{
        color: black;
        font-size: 20px;
        display: inline-block;
    }

    .delete-btn i {
        float: right;
    }

    .delete-btn i:hover{
        color: #ff375a;
        transition: all 0.5s ease;
    }
</style>
