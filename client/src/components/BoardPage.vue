<template>
  <div class="untitle"> 

    
      
      <!-- <div>
        <a-button type="primary" class="write-btn">글작성</a-button>
      </div> -->
  

    <div class="container">
      <div class="search-contents">
        <a-input-search placeholder="input search text" style="width: 500px" @search="onSearch" />
      </div>

        <a-table :columns="columns" :data-source="data"  class="board-table">
            <a slot="name" slot-scope="text">{{ text }}</a>
        </a-table>

        <div>
        <a-button type="primary" class="write-btn" @click="gotoWrite()">글작성</a-button>
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
    dataIndex: 'name',
    key: 'name',
    width: 30,
  },
  {
    title: '조회수',
    dataIndex: 'count',
    key: 'count',
    width: 20,
  
  },
  {
    title: '좋아요',
    dataIndex: 'good',
    key: 'good',
     width: 20,
  },
];

const data = [  // 수정할 예정 
  {
    key: '1',
    title:'고양이 사료 추천해주세요',
    name: 'John Brown',
    count: '22',
    good: '4',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    title:'강아지 사료도 추천해주세요',
    name: 'John Brown',
    count: '22',
    good: '4',
    tags: ['nice', 'developer'],
  },
  {
    key: '3',
    title:'길고양이 겨울집어떤가요? ',
    name: 'John Brown',
    count: '22',
    good: '4',
    tags: ['nice', 'developer'],
  },
  {
    key: '4',
    title:'우와 와이파이가 안되네^^',
    name: '조민지',
    count: '13',
    good: '1',
    tags: ['nice', 'developer'],
  },
  {
    key: '5',
    title:'디코 드라마방 열었습니다',
    name: '석찌',
    count: '22',
    good: '4',
    tags: ['nice', 'developer'],
  },
  {
    key: '6',
    title:'근데 와이파이 또안돼 ^%^',
    name: '융기',
    count: '22',
    good: '4',
    tags: ['nice', 'developer'],
  },
  {
    key: '7',
    title:'1시 48분....선바 한참 재밌을때인데,,,띠ㅏ...',
    name: 'John Brown',
    count: '22',
    good: '4',
    tags: ['nice', 'developer'],
  },
  {
    key: '8',
    title:'이새벽에 공사를 한다구^^',
    name: 'John Brown',
    count: '22',
    good: '4',
    tags: ['nice', 'developer'],
  },
  {
    key: '9',
    title:'불닭볶음면이 먹고싶따',
    name: 'John Brown',
    count: '22',
    good: '4',
    tags: ['nice', 'developer'],
  },
   {
    key: '10',
    title:'강아지 옷 추천합니다',
    name: 'John Brown',
    count: '22',
    good: '4',
    tags: ['nice', 'developer'],
  },
  
];

export default {
  data() {
    return {
      data,
      columns,
      current: 2,
    };
  },
  methods: {
    gotoWrite(){
      this.$router.push({
        path: '/create',
      })
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