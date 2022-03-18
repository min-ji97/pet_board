<template>
    <div class="container">
        
        <div class="preview-container">
            <Preview/> 
        </div>

        
          
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
    created() {
        window.scrollTo(0,0);
        //새로고침
        window.onload = ()=>{
            setTimeout(()=>{
                scrollTo(0,0);
            },100);
        }
    },
    methods: {
        

    } 
    
}

</script>
<style scoped>
   




</style>