<template>
    <div>
         <div class="footer">
            <p class="email_txt">whalswl576@gmail.com</p>
            <a href="https://github.com/min-ji97" target="_blank">
                <i class="fab fa-github-alt"></i>
            </a>
            <p class="copyright_txt">Copyright 2021.joeMinJi All rights reserved.</p>
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
        background-color:pink;
        width: 100%;
        height: 80px;
        position: absolute;
        /* position:fixed; */
        bottom: 0;
        text-align: center;
        color: white;
        padding: 20px;
    }

    .email_txt{
        font-size: 30px;
    }
    .copyright_txt{
        font-size: 30px;

    }
    .footer i{
        font-size: 50px;
        padding: 40px;
        color: #c0f9ba;
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