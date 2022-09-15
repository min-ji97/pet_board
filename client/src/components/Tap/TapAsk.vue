<template>
  <div class="untitle">
        
   
    <div class="container">
      <div class="my-write-title">
            <h1 v-if="roomNum === 1">내가 쓴 글</h1>
            <h1 v-else-if="roomNum === 2">좋아요</h1>
        </div>
      
        <a-table :columns="columns" :customRow="Rowclick" :data-source="askContents"  class="board-table">
          <a slot="name"  slot-scope="text">{{ text }}</a>
        </a-table>
 
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
    const askWriteContents = this.$store.state.tap.askWriteContents;
    const askLikeContents = this.$store.state.tap.askLikeContents;

        if(this.roomNum === 1){ // : 내가 쓴 글
            // this.list = askWriteContents;
            var ask = askWriteContents;
            
            console.log('childNum이 1입니다. 내가 쓴 글을 보여줍니댜.');
        } else { // this.childNum === 2 일 경우 : 좋아요
            var ask = askLikeContents;
            console.log('childNum이 2입니다. 좋아요 글을 보여줍니다.');
        }
    return {
      columns,
      current: 2,

      askContents: ask
    };
  },
  props: {  // 1 이면 home 2면 ask 
    roomNum :{
      type : Number
    }
  },
  computed: {
    // ...mapState('post',[
    //   'askContents',
    // ]),

    ...mapState('user',[
      'user'
    ]),

  },

  async created(){
    // window.scrollTo(0,0);
    window.onload(()=>{
      setTimeout(()=>{
        scrollTo(0,0);
      },100);
    });

        //내가 쓴 글 : Ask
        await this.$store.dispatch('tap/tapAskWriteProcess',{
            userId : this.user.userId
        }); 
        console.log('ask-내가 쓴 글 잘 받아왔나여 => ',this.askWriteContents);

        // 좋아요 : Ask
        await this.$store.dispatch('tap/tapAskLikeProcess',{
            userId : this.user.userId
        }); // 좋아요가 아직 구현이 덜 됨.....ㅠ
        console.log('ask-내가 쓴 글 잘 받아왔나여 => ',this.askLikeContents);

  },

  methods: {
    gotoWrite(){
      this.$router.push({
        name: 'CreatePage',
        params: {
          boardNum : 2
        }
      })
    },


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

  .container{
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      flex-direction: column;
      width: 100%;
  
  }
  
     /* .write-btn{
        align-self: flex-end;
        width: 100px;
        height: 40px;
        border : 1px solid pink;
        background-color: pink;
    } */
    
    .board-table{
        margin: 20px 30px 70px 30px;
        /* margin-top: 20px; */
        text-align:center;
    }
    
    .my-write-title h1{
       margin: 20px 20px 20px 50px;
       text-align: center;
       color: #807097;
    }
   
</style>