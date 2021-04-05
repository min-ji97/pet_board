<template>
    <div class="container">
        <div class="search-contents">
            <a-input-search placeholder="input search text" style="width: 500px" @search="onSearch" />
        </div>
        <div class="preview-container">
            <Preview />
           
        </div>
        <a-button type="primary" class="createBtn" @click="gotoWrite()">글작성</a-button>  
    </div>
</template>

<script>
import Preview from '@/components/Preview'
export default {
    name: 'App',
    components: {
       Preview
    },
    data() {
        return {
            
        }
    },
    methods: {
        gotoWrite() {
            this.$router.push({
                path: '/create'
            })
        }

    } 
    
}

</script>
<style >
    .container{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }
    .margin-20{
        margin:20px;
        /* align-self: ; */
    }
 
    .preview-container {
        display: flex;
        /* flex-wrap: wrap; */
        justify-content: center; 
        align-items: center;
        width: 98%;
        margin:20px;
        
    }
    .createBtn{
        /* float: right; */
        margin: 30px;
        width: 100px;
        height: 50px;
    }
</style>