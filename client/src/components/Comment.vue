<template>
    <div class="comments">
        <div class="comment-box" v-for="list of commentList" v-bind:key="list.comment_id" >
            <div class="image-box">
                <img class="user-img" v-if="list.user_image" :src="`http://localhost:3000/images/${list.user_image}`" onerror="this.src=``" />
                <a-avatar v-else class="primary-user-img" :size="78" icon="user"  />
            </div>
            <div class="text-box">
                <div class="info-box">
                    <!-- <div class="nick-name">
                        {{list.nickName}}
                        <span v-if="(list.user_id === userId) ? true : false" style="color: #807097; font-weight: bold;"> [작성자] </span>
                    </div> -->
                    <div class="nick-name" v-if="(list.user_id === userId) ? true : false" style="color: #807097; font-weight: bold;">
                        {{list.nickName}} [작성자]
                    </div>
                    <div class="nick-name" v-else>{{list.nickName}}</div>
                    <div class="date">
                        {{$moment(list.create_at).format('YYYY-MM-DD HH:mm')}}
                    </div>

                    

                </div>
                <div class="context-box">
                    <div v-if="(list.comment_id === changeCommentId)">

                        <div class="comment-input">
                            <textarea v-model="changeCommentText" name="" id="" cols="100" rows="4" maxlength="500">
                            </textarea>
                            <a-button @click="commentChangeBtn" class="comment-btn">댓글</a-button>
                        </div>

                    </div>
                    <div v-else>
                        {{list.context}}
                    </div>
                    <div class="delete-modify-Box" v-if="(list.user_id === userId) ? true : false ">
                        <div class="delete-btn">
                            <a-icon type="delete" @click="commentDelete(list.comment_id, list.content_id)" /> 
                        </div>
                        <div class="modify-btn">
                            <a-icon type="edit" @click="commentUpdate(list.comment_id, list.context, list.content_id)"/>
                        </div>     
                   </div>      
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
            changeCommentId: null,
            changeCommentText: '', // 수정된 댓글
            originCommentText:'', // 원래댓글
            changeContentId: null, // 수정하려는 댓글의 content ID 
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
        commentList : Array,
        roomNum : Number
    },
    async created(){
 
        
    },
    mounted() {
    
    },
    methods: {
        commentDelete(commentId,contentId){
            const deletBtn = confirm("해당 댓글을 삭제하시겠습니까?");

            if(deletBtn){ // true 게시글을 삭제하겠따..!
                
                this.$store.dispatch('post/deleteCommentProcess',{
                    roomNum : this.roomNum,
                    contentId : contentId,
                    commentId : commentId
                });
                // this.$message.success('댓글을 삭제하였습니다.');
            }else{
                this.$message.info('댓글 삭제를 취소하였습니다.');
            }
        },
        commentUpdate(commentId, context, contentId){
            this.changeCommentId = commentId;
            this.originCommentText = context;
            this.changeCommentText = context;
            this.changeContentId = contentId;
        
        },

        async commentChangeBtn(){
            if(this.changeCommentText===""){
                this.$message.info('댓글을 입력해주세요.');
            }else {
                if(this.changeCommentText === this.originCommentText){
                    try{
                    this.$router.go(this.$router.currentRoute);
                    }catch(error){
                        console.error('Navigation error:', error);
                    }
                }else{
                    this.changeCommentText = this.changeCommentText + '  ( 수정됨 )' ;
                    console.log('수정중이라는 말이 추가 됐느냐 => ', this.changeCommentText);
                    if(Number(this.roomNum) === 1){ // main Comment에서 작성  
                        await this.$store.dispatch('comment/changeMainComment',{
                            commentId : this.changeCommentId,
                            contentId : this.changeContentId,
                            context : this.changeCommentText, 
                        });
                        this.$message.success('댓글을 수정했습니다.');
                        try {
                            this.$router.go(this.$router.currentRoute);
                        } catch (error) {
                            console.error('Navigation error:', error);
                        }

                
                    }else if(Number(this.roomNum) === 2){ // ask Comment에서 작성 
                        await this.$store.dispatch('comment/changeAskComment',{
                            commentId : this.changeCommentId,
                            contentId : this.changeContentId,
                            context : this.changeCommentText, 
                        });
                        this.$message.success('댓글을 수정했습니다.');
                        try{
                            this.$router.go(this.$router.currentRoute);
                        }catch(error){
                            console.error('Navigation error:', error);
                        }
                    }
                }
            }     
            this.changeCommentId = null;
            this.changeCommentText = '';
            this.originCommentText = '';
            this.changeContentId = null;
        }
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


    .delete-btn, .modify-btn{
        color: black;
        font-size: 20px;
        display: inline-block;
        margin-left : 11px;
    }

    .delete-btn i:hover, .modify-btn i:hover{
        color: #ff375a;
        transition: all 0.5s ease;
    }

    .delete-modify-Box{
        float: right;
    }
    .comment-input textarea{
        width: 100%;
    }

</style>
