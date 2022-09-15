<template>
  <div class="untitle"> 
      <!-- <div>
        <a-button type="primary" class="write-btn">글작성</a-button>
      </div> -->
    <div class="container">
      <div class="search-contents">
        <a-input-search placeholder="input search text" style="width: 500px" @search="onSearch" />
      </div>

        <a-table :columns="columns" :customRow="Rowclick" :data-source="askContents"  class="board-table">
          <a slot="name"  slot-scope="text">{{ text }}</a>
        </a-table>
<!-- @click:row="goToDetailPage(contentData.content_id)"  :onRow="onRow"  -->
        <div>
          <a-button type="primary" class="write-btn" @click="gotoWrite(boardNum)">글작성</a-button>
        </div>
    </div>

    

  </div>
</template>

<script>



const columns = [
  {
    title: '제목',
    dataIndex: 'title',
    key: 'title',
    ellipsis: true,
    width: 90,
    // scopedSlots: { customRender: 'name' },
  },
  {
    title: 'name',
    dataIndex: 'nickname',
    key: 'nickname',
    width: 30,
  },
  {
    title: '조회수',
    dataIndex: 'view_num',
    key: 'view_num',
    width: 20,
  
  },
  {
    title: '좋아요',
    dataIndex: 'like_num',
    key: 'like_num',
     width: 20,
  },
];

import { mapState, mapGetters} from 'vuex'

export default {
  data() {

    // const askContent = this.$store.state.post.askContents;
    // const boardNum = Number(this.$route.params.boardNum); // 필요없을듯!!!!!!!!
    // const contentData = askContents.filter(item => item.board_num === boardNum);
    //  const contentData = askContent;
    return {
      // boardNum : boardNum, // 필요없을듯!!!!!!!
      // contentData : contentData,
      // contentId : contentData.content_id,

      columns,
      current: 2,
    };
  },
  // props: {  // 2 또는 3 
  //   boardNum :{
  //     type : Number
  //   }
  //},
  computed: {
    ...mapState('post',[
      'askContents',
    ]),

    ...mapState('user',[
      'user'
    ]),

    ...mapGetters('post',[

    ])

  },
  async created(){
    // window.scrollTo(0,0);
    window.onload(()=>{
      setTimeout(()=>{
        scrollTo(0,0);
      },100);
    });
    await this.$store.dispatch('post/getAskPostProcess');
  },
  methods: {
    gotoWrite(){
      if(!this.$store.state.user.user.id){
        this.$message.info('로그인이 필요합니다!');
        this.$router.push({
          path: '/login'
        });
      }else{
        this.$router.push({
          name: 'CreatePage',
          params: {
            boardNum : 2
          }
        })
      }
    },
    // async goToDetailPage(content_id){
     
    //   await this.$store.dispatch('post/viewUpProcess',{
    //     contentId : content_id,
    //     boardNum : 2,
    //   }); // 조회수 1 올리기

    //   this.$router.push({
    //     name: 'MainDetailPage',
    //     params: {
    //       contentId : content_id,
    //       roomNum : this.boardNum,
    //     }
    //   })
    // },

    Rowclick(record, index){
      return{
        on: {
          click: () =>{

            // 조회수 1 올리기
            this.$store.dispatch('post/viewUpProcess',{
              contentId : record.content_id,
              boardNum : 2,
            }); 

            console.log('레코드 콘텐츠 아이디..!',record.content_id);
            console.log('레코드 보드 넘..!',record.board_num);

            this.$router.push({
              name: 'MainDetailPage',
              params: {
                contentId : record.content_id,
                roomNum : record.board_num,
              }
            })
          },

        }
      }
    }
  }
};
</script>

<style scoped>
  .untitle{
    /* position: relative;
    min-height: 100%; */
    padding-bottom:100px
  }
  .container{
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      /* align-items: center; */
      /* width: 100%;
      min-height: 100%;  이렇게 하면 푸터 안겹친다고했는데,,또로록,..*/
      /* margin : 20px; */
  }
    /* .container:nth-child(2){

    } */
    /* .container-2{
        display: flex;
        margin: 10px;
        justify-content: space-between;

    } */
    /* .search-contents{
        /* align-self: flex-start;
        justify-self: left;  }*/
    
     .write-btn{
        align-self: flex-end;
        width: 100px;
        height: 40px;
        border : 1px solid #a797ff;
        background-color: #a797ff;
    }
    .write-btn:hover{
      color: #807097;
      border : 1px solid #807097;
      background-color: white;
    }
    .board-table{
        margin: 30px;
        margin-top: 20px;
        text-align:center;
    }
   
</style>