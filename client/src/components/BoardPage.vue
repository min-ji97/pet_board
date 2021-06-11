<template>
  <div class="untitle" :v-model="boardNum"> 
    {{boardNum}} 이래도 안뜸?!?!
      <!-- <div>
        <a-button type="primary" class="write-btn">글작성</a-button>
      </div> -->
    <div class="container">
      <div class="search-contents">
        <a-input-search placeholder="input search text" style="width: 500px" @search="onSearch" />
      </div>

        <a-table :columns="columns" :customRow="Rowclick" :data-source="contentData"  class="board-table">
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

export default {
  data() {

    const askContents = this.$store.state.post.askContents;
    const boardNum = Number(this.$route.params.boardNum);
    const contentData = askContents.filter(item => item.board_num === boardNum);
    return {
      boardNum : boardNum,
      contentData : contentData,
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
  async created(){
    await this.$store.dispatch('post/getAskPostProcess');
  },
  methods: {
    gotoWrite(boardNum){
      this.$router.push({
        name: 'CreatePage',
        params: {
          boardNum : boardNum
        }
      })
    },
    goToDetailPage(content_id){
      console.log('고투디테일페이지');
      console.log('컨텐츠 아이디가 뭐가 뜨느냐!!!!!!!!안뜨냐!?!?!?',content_id);
      this.$router.push({
        name: 'MainDetailPage',
        params: {
                    contentId : content_id,
                    roomNum : this.boardNum,
                }
      })

    },
    Rowclick(record, index){
      return{
        on: {
          click: () =>{
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
      /* align-items: center; */
      width: 100%;
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
        border : 1px solid pink;
        background-color: pink;
    }
    
    .board-table{
        margin: 30px;
        margin-top: 20px;
        text-align:center;
    }
   
</style>