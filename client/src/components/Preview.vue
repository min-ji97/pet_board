<template>
    <div>
                <!-- <div class="previewImg">image</div> -->
        <div class="previewContainer">
            <div v-for=" content of mainContentsPreview" v-bind:key="content.contentId">
                <div class="previewBox" @click="goToDetailPage(content.content_id)">
                    <img class="previewImg"  alt="" :src="`http://localhost:${port}/images/${content.preview_image}`">
                    <div class="previewText">
                        <div class="pre-title">{{content.title}}</div>
                        <!-- <div>{{content.context}}</div> -->
                        <div class="pre-nickname">{{content.nickname}}</div>
                        <div >
                            <span class="pre-view"><a-icon type="eye" />{{ content.view_num}}</span>
                            <span class="pre-like"><a-icon type="heart"/>{{ content.like_num}}</span>
                        </div>
                        <!-- <div ><a-icon type="heart" />{{content.like_num}}</div> -->
                        <div class="pre-date">{{content.create_at}}</div>
                        <!-- 

                            content.userId === user.userId -> 
                         -->
                    </div>
                </div>
            </div>
            <!-- <a-pagination v-model="current" :total="mainContentsPreview.length" show-less-items />  좀 더 고민...-->
        </div>
    </div>
</template>

<script>

import { mapState ,mapGetters} from 'vuex'

export default{
    data() {
        return {   
            current: 1, 
            port : 3000,
        }
    },
    computed: {
        ...mapState('post',[
            'introContents',
            'askContents',
            'mainContentsPreview',
        ]),
        ...mapState('user',[
            'user'
        ]),
        ...mapGetters('post',[

        ])
    },
    async created(){
        await this.$store.dispatch('post/getMainPostProcess');
    },
    methods: {
        goToDetailPage(content_id){
            this.$router.push({
                name: 'MainDetailPage',
                params: {
                    contentId : content_id,
                    roomNum : 1
                }
            });
        },
    }
}
</script>

<style scoped>
    .previewContainer{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        /* flex-direction: row; */
        margin: 10px;
        width: 100%;
        height: 100%; 
    }
    .previewBox{
        margin: 60px 10px;
        width: 400px;
        height: 400px;
    }
    .previewImg{
        width: 100%;
        height: 90%;
        border: 1px solid rgb(216, 213, 213);
        object-fit: cover;
    }
    .previewText{
        width: 100%;
        /* height: 30%;     */
        border: 1px solid rgb(216, 213, 213);
        border-top: none;
        text-align: center;
        font-size : 17px;
    }
    .previewText .pre-title{
        font-size: 20px;
        font-weight: bold;
        /* color: black; */
        overflow: hidden;  /* 넘치는거 안보이게  */
        text-overflow: ellipsis; /* ...으로 대체 */
        white-space: nowrap; /* 줄넘김 없음 */
    }
    .pre-view{
        margin-right: 10px;
    }
    .pre-view a-icon{
         margin-right: 10px;
    }
</style>