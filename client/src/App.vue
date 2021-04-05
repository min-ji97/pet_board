<template>
  <div id="app">
    <Header />
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style>
html,
body {
   margin:0;
   padding:0;
   height:100%;
   
  /* background-color:yellowgreen; */
}
#app {
  margin: 0px;
  padding: 0px; 

  min-height: 100%;
  position: relative;
  padding-bottom: 100px; /* footer height */ 

  /* background-color:salmon; */
}
</style>
