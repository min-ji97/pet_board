<template>
    <div class="container">
        <div class="introduce">
            자 몇번 방이냐!!!!!!!!!!!!!!! {{boardNum}}
        </div>

        <div class="write">
            <input type="text" id="title-label" class="title" maxlength="30" v-model="titleValue" placeholder="제목을 입력해주세요." />

            <div class="editor">
                <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
                    <div class="menubar">

                        <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.bold() }"
                        @click="commands.bold"
                        >
                            <a-icon type="bold" />
                        </button>

                        <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.italic() }"
                        @click="commands.italic"
                        >
                            <a-icon type="italic" />
                        </button>

                        <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.strike() }"
                        @click="commands.strike"
                        >
                            <a-icon type="strikethrough" />
                        </button>

                        <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.underline() }"
                        @click="commands.underline"
                        >
                            <a-icon type="underline" />
                        </button>

                        <!-- <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.code() }"
                        @click="commands.code"
                        >
                            <icon name="code" /> 
                        </button> -->

                        <!-- <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.paragraph() }"
                        @click="commands.paragraph"
                        >
                            <icon name="paragraph" /> 
                        </button> -->

                        <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.heading({ level: 1 }) }"
                        @click="commands.heading({ level: 1 })"
                        >
                            H1
                        </button>

                        <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.heading({ level: 2 }) }"
                        @click="commands.heading({ level: 2 })"
                        >
                            H2
                        </button>

                        <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.heading({ level: 3 }) }"
                        @click="commands.heading({ level: 3 })"
                        >
                            H3
                        </button>

                        <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.bullet_list() }"
                        @click="commands.bullet_list"
                        >
                            <a-icon type="unordered-list" />
                        </button>

                        <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.ordered_list() }"
                        @click="commands.ordered_list"
                        >
                            <a-icon type="ordered-list" />
                        </button>


 <!-- =================================이미지 업로드 연습합니다 ㅎㅎ ^^ ========================================     
                        <button
                        class="menubar__button"
                        @click="showImagePrompt(commands.image)"
                        > 
                            <a-icon type="file-image" />  
                        </button>

  2번째 시도 
                        <a-upload
                            :show-upload-list="false"
                            ref="contentImage"
                            id="contentImage"
                            @click="onFileChange()"
                        >
                            <button
                            class="menubar__button"
                            @click="showImagePrompt(commands.image)"
                            >
                                <a-icon type="file-image" />                           
                            </button>                        
                        </a-upload>          -->
 <!-- enctype="multipart/form-data" -->

 <!-- @click="$refs.contentFile.click(commands.image)" -->

                                        <!-- 3번째 시도 -->
                        <!-- <input type="file" ref="contentFile" id="contentFile" style="display: none"  @click="onFileChange(commands.image)"   /> -->
                        <button
                            class="menubar__button"
                            @click="onFileChange(commands.image)"
                            > 
                                <a-icon type="file-image" />  
                        </button> 

                        <button
                        class="menubar__button"
                        @click="commands.horizontal_rule"
                        >
                           <a-icon type="strikethrough" />
                        </button>

                        <button
                        class="menubar__button"
                        @click="commands.undo"
                        >
                           <a-icon type="undo" />
                        </button>

                        <button
                        class="menubar__button"
                        @click="commands.redo"
                        >
                            <a-icon type="redo" />
                        </button>
                    </div>
                </editor-menu-bar>
                <editor-content class="editor__content" ref="editorContent" :editor="editor" />
                <!-- class="editor__content" -->
            </div>

                <!-- <textarea class="contents" id="contents-label" placeholder="내용을 입력해주세요."></textarea> -->
                <a-button type="primary" class="write-btn" @click="onSubmit">작 성</a-button>
        </div>
    </div>   
</template>


<script>
import api from '@/api/ApiService';
// import Icon from './../icon'
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Image,
} from 'tiptap-extensions'

export default {
    data() {
        const contentData = this.$route.params.contentData;
        const boardNum = Number(this.$route.params.boardNum);
        const updateBool = Boolean(this.$route.params.updateBool);

        const userId = this.$store.state.user.user.userId;

        if(updateBool){ // 게시글 수정
            console.log('게시글 수정입니다~~~ ');
            console.log('콘텐츠 데이터가 잘 넘어 왔을 까요~~',contentData);
            var titleValue = contentData.title;
            var contentValue = contentData.content;
 
        }else{ // 새로운 게시글 작성 
            var titleValue = '';
            var contentValue = "<h3>내용을 입력해주세요.</h3>";
            // updateBool = false; // 게시글 수정 아님 
        }

        return {
            contentData : contentData,
            boardNum : boardNum,
            updateBool: updateBool, // true면 수정
            userId : userId,

            titleValue : titleValue,
            contentValue: contentValue,
            
            testSrc: '',
            tmpImage: '', // content에 들어갈 이미지 ( 미리보기 )
            // labelCol: { span: 4 },
            // wrapperCol: { span: 14 },
            // form: {
            //     name: '',
            //     region: undefined,
            //     date1: undefined,
            //     delivery: false,
            //     type: [],
            //     resource: '',
            //     desc: '',
            //  },

            editor: new Editor({
                extensions: [
                    new Blockquote(),
                    new BulletList(),
                    new CodeBlock(),
                    new HardBreak(),
                    new Heading({ levels: [1, 2, 3] }),
                    new HorizontalRule(),
                    new ListItem(),
                    new OrderedList(),
                    new TodoItem(),
                    new TodoList(),
                    new Link(),
                    new Bold(),
                    new Code(),
                    new Italic(),
                    new Strike(),
                    new Underline(),
                    new History(),
                    new Image(),
                ],
                content: contentValue,
                //  content: `
                //     <h3>
                //     내용을 입력해주세요.
                //     </h3>
                //     `
                // ,
             
                onUpdate: ({ getHTML }) => {
                    let content = getHTML();
                    console.log(content);
                   
                },
                onPaste: () =>{
                    console.log('복붙');
                },
            }),
        }
    },
    components: {
        EditorContent,
        EditorMenuBar,
    },
    // props: {
    //     boardNum : {
    //         type : Number,
    //     }
    // },
    created(){
        // if(this.boardNum === 3){
        //     // const temp1 = this.$store.state.user.user.userId;
        //     console.log('수정을 클릭했나봄..!!');
        //     console.log('콘텐츠 데이터가 잘 넘어 왔을 까요~~',this.contentData);
        //     this.editor.commands.setContent(`<p>이게 되면 너무 기분이가 좋을 듯 합니다...</p>`);
        // }
    },
    beforeDestroy() {
        this.editor.destroy()
    },

    methods: {
//         async onFileChange(e) {
          
//             //document.querySelector("#contentFile").addEventListener("click",commands.image);
//             console.log('사진이 들어왔음.../!????');
//             console.log('refs : ',this.$refs.contentFile);        
//             //console.log('컨텐츠에 들어갈 사진',this.contentImage);
            
//             var files = e.target.files || e.dataTransfer.files;
//             console.log(files);
//             if (!files.length)
//                 return;
//             // this.createImage(files[0]); // 미리보기 

//             const tmpImage = this.$refs.contentFile.files[0];            
//             console.log('과연 사진이 잘 뜰까욯ㅎㅎㅎ^^ ',tmpImage);

//             const formData = new FormData();
//             formData.append('src', tmpImage);
            
//             console.log('과연...^^ ',this.$refs.editorContent);
//             // this.$store.dispatch('post/uploadContentImgProcess',{
//             //     formData : formData
//             // })
//             const result = await api.uploadContentImg(formData)
//                 .then(res=>res)
//                 .catch(err=>err)
//             console.log('결과는?! : ',result);
//             console.log('이게 뜬다면 enctype써줘서 된것 : ',result.content_image);
//             console.log('이게 뜬다면 이유는 나도모름^^ : ',result.data.content_image);
            
//             const src = result.content_image;
//             this.testSrc = src;
//             // this.test(commands.image);
            
// //             $("img").resize(function(){
// //                 console.log("saadsdsaadsasdsaijashjadshsakjhsakjasn");
// // }           );
             
//             // command({src});
//         },


        
        onFileChange(command){

            const input = document.createElement('input');
            input.setAttribute('type','file');
            input.setAttribute('accept','image/*');
            input.click();

            input.onchange = async() => {
                const file = input.files[0];
                const formData = new FormData();
                formData.append('src', file);
                
                const result = await api.uploadContentImg(formData)
                    .then(res=>res)
                    .catch(err=>err) 
                const contentImage = result.data.content_image;
                
                const src = "http://localhost:3000/images/"+contentImage;
                if(src !== null){
                    command({ src });
                }
            } 

        },

        onSubmit() {
    
            const editorHtml = this.editor.view.dom;    
            //  console.log('콘텐츠 첫번째 방법 : ',this.editor.getHTML());
            // this.editor.view.dom
            // const editorEncode = Server.HtmlEncode(editorHtml);
            const editorEncode = editorHtml ;
            console.log('그냥 뷰 돔...^^ ',editorEncode);


/*      자바스크립트로 이렇게 하는 방법에 대해서 좀더 알아봐야할듯..!!  */
            // var isImg = false;
            // if(editorHtml.getElementsByTagName("img")){
            //     isImg = true;    
            // }else {
            //      isImg = false; 
            // }
//////////////////////////////////////


            const getHtml = this.editor.getHTML();

            if( !this.titleValue ) {
                this.$message.info('제목을 적어주세요!');
            } else {  

                if( this.boardNum === 1 ){ // 사진이 꼭 필요
                    console.log('1번방이요~~');
                    
                    console.log(editorHtml.getElementsByTagName("img").length);
                    if( editorHtml.getElementsByTagName("img").length ) { // 썸네일 있음!! 
                        const imgPath = editorHtml.getElementsByTagName("img")[0].src;
                        const img = imgPath.replace("http://localhost:3000/images/",""); //썸네일 사진 이름
                        
                        if(this.updateBool){ // 수정기능
                        
                            this.$store.dispatch('post/updateMainProcess',{
                                userId : this.userId,
                                title : this.titleValue,
                                contents: getHtml,
                                previewImg : img
                            });
                        }
                        else{
                            this.$store.dispatch('post/mainWriteProcess',{
                            userId : this.userId,
                            title : this.titleValue,
                            contents: getHtml,
                            previewImg : img
                        });
                        }
                        this.$router.push({
                            path: '/',
                        });
                    
                    }else {
                        this.$message.warning('최소 한장의 사진을 올려주세요! ');
                    }
                } else if( this.boardNum === 2) { // part = 2 썸네일이 필요 없음~  질문 게시판이니까..!
                    console.log('2번방이요~~');
                    if(this.updateBool){
                        this.$store.dispatch('post/updateAskProcess',{
                            userId : this.userId,
                            title : this.titleValue,
                            contents: getHtml,
                            boardNum: this.boardNum
                        });
                    }else{
                        this.$store.dispatch('post/writeProcess',{
                            userId : this.userId,
                            title : this.titleValue,
                            contents: getHtml,
                            boardNum: this.boardNum
                        });
                    }
                    this.$router.push({
                        path: '/',
                    });
                        // console.log("user_id : ",this.userId);
                        // console.log("제목 :",this.titleValue);
                        // console.log('콘텐츠 : ',editorEncode);
                        // console.log('어떤 게시판인지 알려줘야지!! : 2또는 3',);

                } 
                // else {  // board_num === 3  수정 기능!
                //  console.log('3번방이요~~');
                //     if(this.contentData.boardNum === 1){
                //         console.log('ㅋㅋㅋ진짜 이렇게 까지 한다구.... 여기 방번호는 1번임..');
                //     }else{

                //         console.log('요기는 2번임.... ');
                //         console.log('유저아이디:',this.userId,' 제목 :',this.titleValue,' 내용 :',getHtml,'방 번호 :', this.contentData.boardNum);
                    
                //         this.$store.dispatch('post/updateProcess',{
                //             userId : this.userId,
                //             title : this.titleValue,
                //             contents: getHtml,
                //             boardNum: this.contentData.boardNum,
                //         });

                //         this.$router.push({
                //             path: '/',
                //         });

                //     }   
                // }
            }

          
            // console.log("user_id : ",this.userId);
            // console.log("제목 :",this.titleValue);
            // console.log('콘텐츠 : ',this.editor.view.dom);
            // console.log("썸네일 : ",img);
            // console.log('어떤 게시판인지 알려줘야지!! : ');
            // console.log("게시 날짜 : 이건 디비에서 해줄 문제일듯ㅎㅎ^^"); // 이건 디비에서 하는것인갸...?!!??!?!
        }

    }//  https://66.media.tumblr.com/dcd3d24b79d78a3ee0f9192246e727f1/tumblr_o00xgqMhPM1qak053o1_400.gif
    
}
</script>

<style lang="scss" scoped>
    // @import '@/styles/tiptap/variables.scss';   
    // @import '@/styles/tiptap/editor.scss';
    // @import '@/styles/tiptap/main.scss'; 
    // @import "@/styles/tiptap/menubar.scss";
    // @import '@/styles/tiptap/menububble.scss';
    

    .container{
        display : flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;   
    }

    .introduce{
        float: left;
    }

    .write{
        padding: 20px;
        display: flex;
        flex-flow: column wrap;
        
        /* flex-direction: column; */
        justify-content: center;
        align-items: center;

        width : 60%;
        /* border: 1px solid peachpuff ;  */
        // background-color: rgb(247, 240, 240);
    
    }   
    .title-box{
        width: 100%; 
    }
    .contents-box{
        width: 100%;
    }
    /* .part{
        width: 20%;
        align-self: flex-start;
    } */
    .title{
        margin: 10px;
        width: 60rem;
        height: 80px;
        font-size: 25px;
        border:none;
        font-weight: 500;
        border-bottom: 2px solid rgb(151, 150, 150);
        
    }
    .contents {  
        margin : 10px;
        width: 80%;
        height:500px;
        border : 1px solid gray;
    }
    .write-btn {
        width: 120px;
        height: 70px;
        font-size: 25px;
        font-weight: 500;
        background-color: #ffc0cb;
        border : 1px solid white;
        // #ff9797
    }
    .write-btn:hover{
        color: #ff9797;
        background-color: white;
        border: 1px solid #ff9797;
    }


    /* tiptap 수정 */
    .editor {
        max-width: 60rem;
        min-height: 20rem;
        margin: 2rem auto 10rem auto;
    }
    .editor__content{
        padding-top: 20px;
        font-size: 25px;     
    }
    .menubar{
        font-size: 25px;
        width: 60rem;
    }
    img {
        width: 50%;
    }
 
</style>