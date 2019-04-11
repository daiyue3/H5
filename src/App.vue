<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app',
  data(){
    return {

    }
  },
  methods: {},
  created() {
    
  }
}
</script>


<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  background-color: #FFF;
}
.container{
  background-color: #FFF;
}
p{
	width: 100%;
	display: block;
}
img{
	width: 100%;
}
</style>

