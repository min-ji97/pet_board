<template>
    <div class="container">

        <div class="write">
            <input type="text" id="title-label" class="title" placeholder="제목을 입력해주세요." />

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


 <!-- =================================이미지 업로드 연습합니다 ㅎㅎ ^^ ========================================     -->   
                        <button
                        class="menubar__button"
                        @click="showImagePrompt(commands.image)"
                        > 
                            <a-icon type="file-image" />  
                        </button>

<!--  2번째 시도 -->
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
                           
                        </a-upload>         

 <!-- enctype="multipart/form-data" -->
                                        <!-- 3번째 시도 -->
                        <input type="file" ref="contentFile" id="contentFile" style="display: none"  @click="onFileChange(commands.image)"   />
                        <button
                            class="menubar__button"
                            @click="$refs.contentFile.click(commands.image)"
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
                <editor-content  class="editor__content" ref="editorContent" :editor="editor" />
                <!-- class="editor__content" -->
            </div>

                <!-- <textarea class="contents" id="contents-label" placeholder="내용을 입력해주세요."></textarea> -->
                <a-button type="primary" class="write-btn" @click="onSubmit">글 작성</a-button>
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
        return {
            testSrc: '',
            tmpImage: '', // content에 들어갈 이미지 ( 미리보기 )
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
            form: {
                name: '',
                region: undefined,
                date1: undefined,
                delivery: false,
                type: [],
                resource: '',
                desc: '',
             },

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
                content: `
                    <h2>
                    내용을 입력해주세요
                    </h2>
                    `
                ,
             
                onUpdate: ({ getHTML }) => {
                    let content = getHTML();
                    console.log(content);
                   
                },
                onPaste: () =>{
                    console.log('복붙함!!');
                },
            }),
        }
    },
    components: {
        EditorContent,
        EditorMenuBar,
        // Icon,
    },
    beforeDestroy() {
        this.editor.destroy()
    },
    methods: {
        async onFileChange(e) {
          
            // document.querySelector("#contentFile").addEventListener("click",commands.image);
            console.log('사진이 들어왔음.../!????');
            console.log('refs : ',this.$refs.contentFile);        
            // console.log('컨텐츠에 들어갈 사진',this.contentImage);
            
            var files = e.target.files || e.dataTransfer.files;
            console.log(files);
            if (!files.length)
                return;
            // this.createImage(files[0]); // 미리보기 

            const tmpImage = this.$refs.contentFile.files[0];            
            console.log('과연 사진이 잘 뜰까욯ㅎㅎㅎ^^ ',tmpImage);

            const formData = new FormData();
            formData.append('src', tmpImage);
            
            console.log('과연...^^ ',this.$refs.editorContent);
            // this.$store.dispatch('post/uploadContentImgProcess',{
            //     formData : formData
            // })
            const result = await api.uploadContentImg(formData)
                .then(res=>res)
                .catch(err=>err)
            console.log('결과는?! : ',result);
            console.log('이게 뜬다면 enctype써줘서 된것 : ',result.content_image);
            console.log('이게 뜬다면 이유는 나도모름^^ : ',result.data.content_image);
            
            const src = result.content_image;
            this.testSrc = src;
            // this.test(commands.image);

             
            // command({src});
        },
        onFileChange(command){
          
            const handleOnChange = async e => {
                var files = e.target.files || e.dataTransfer.files;
                console.log(files);
                if (!files.length)
                    return;
            
                const tmpImage = this.$refs.contentFile.files[0];            

                const formData = new FormData();
                formData.append('src', tmpImage);
                
                const result = await api.uploadContentImg(formData)
                    .then(res=>res)
                    .catch(err=>err) 
                const contentImage = result.data.content_image;
                
                // this.testSrc = src;
                this.testSrc = contentImage;

                const src = "http://localhost:3000/images/"+contentImage;
               
                if(src !== null){
                    command({ src });
                }
            }

            document.querySelector("#contentFile").addEventListener("change",handleOnChange);
                
        },
        
        onSubmit() {
            console.log('========글작성 버튼을 누름========');
    
            console.log('this.editor.content : ',this.editor.getHTML());
            const test = '<h1>되냐...?<h1>';
              // this.editor.view.dispatch(test);
            
      
        },
    

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
        justify-content: center;
        align-items: center;      
        
        
        /* margin: 20px;  */
        /* padding: 20px; */
    }
    .write{
        padding: 20px;
        display: flex;
        flex-flow: column wrap;
        
        /* flex-direction: column; */
        justify-content: center;
        align-items: center;

        width : 80%;
        /* border: 1px solid peachpuff ;  */
        background-color: rgb(250, 234, 234);
    
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
        width: 80%;
        height: 40px;
        border : 1px solid gray;
    }
    .contents{  
        margin : 10px;
        width: 80%;
        height:500px;
        border : 1px solid gray;
    }
    .write-btn{
        width: 100px;
        height: 50px;
        background-color: pink;
        border : 1px solid pink;
    }
    .write-btn:hover{
        background-color: red;
        border : 1px solid red;
    }

    /* ////////// */
    /* .editor__content{
        /* border: 1px solid black;
        margin: 20px;
        width: 100%;
        height: 400px; 
    } */

    .please{
        width: 100%;
        height: 400px;
        outline : none;
        

    }
</style>