<template>
    <div>
         <div class="footer">
            
            <div class="footer_git">
                <a href="https://github.com/min-ji97/pet_board" target="_blank">
                    <a-icon type="github" />
                    <!-- <GithubOutlined /> -->
                </a>
            </div>
            <p class="email_txt">whalswl576@gmail.com</p>
            <p class="copyright_txt">Copyright 2022.joeMinJi All rights reserved.</p>
         </div>
    </div>
</template>

<script>
    export default{
        data() {
            return {

            }
        }

    }
</script>

<style scoped>
    .footer{
        background-color:#807097 ;
        width: 100%;
        height: 161px;
        position: absolute;
        /* position:fixed; */
        bottom: 0;
        text-align: center;
        color: white;
        padding: 7px;
    }

    .email_txt, .copyright_txt{
        font-size: 15px;
        margin: 10px;
    }
  
    .footer_git{
        display: flex;
        justify-content:center;
        margin-bottom: 19px;
    }

    .footer_git a {
        font-size: 50px;
        color: white;
        width:100px;
        height: 60px;
    }
    .footer_git a:hover{
        color: black ;
    }

    /* 
    footer {
    clear: both;
    position: relative;
    height: 200px;
    margin-top: -200px;
}
    */

</style>