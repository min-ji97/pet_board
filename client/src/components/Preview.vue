<template>
    <div>
                <!-- <div class="previewImg">image</div> -->
        <div class="previewContainer">
            <div v-for=" content of mainContentsPreview" v-bind:key="content.contentId">
                <div class="previewBox" @click="goToDetailPage(content.content_id)">
                    <img class="previewImg"  alt="" :src="`http://localhost:${port}/images/${content.preview_image}`">
                    <div class="previewText">
                        <div>{{content.title}}</div>
                        <!-- <div>{{content.context}}</div> -->
                        <div>{{content.nickname}}</div>
                        <div>{{content.view_num}}</div>
                        <div>{{content.like_num}}</div>
                        <div>{{content.create_at}}</div>
                        <!-- 

                            content.userId === user.userId -> 

                         -->
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>

import { mapState ,mapGetters} from 'vuex'

export default{
    data() {
        return {    
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

        console.log('과연ㅎ',this.$store.state.post.mainContentsPreview);

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

<style>
    .previewContainer{
        display: flex;
       justify-content: center;
        /* flex-direction: row; */
        margin: 10px;
        width: 330px;
        height: 330px; 
    }
    .previewBox{
        margin: 10px;
        width: 330px;
        height: 330px;
    }
    .previewImg{
        width: 100%;
        height: 70%;
        border: 1px solid rgb(216, 213, 213);
        object-fit: cover;
       

    }
    .previewText{
        width: 100%;
        height: 30%;    
        border: 1px solid rgb(216, 213, 213);
        text-align: center;

    }
</style>