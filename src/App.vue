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
  background-color: #FFF;
	box-sizing: border-box;
	padding: 0;
	width: 100%;
}
.container{
  background-color: #FFF;
	box-sizing: border-box;
	padding: 0;
	width: 100%;
	img{
		width: 100%;
	}
}

</style>

