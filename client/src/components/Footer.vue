<template>
    <div>
         <div class="footer">
             여기는 footer입니다. 
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
    }

</style>