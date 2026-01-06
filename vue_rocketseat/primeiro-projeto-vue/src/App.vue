<template>
  <!-- <img src="./assets/logo.png" alt="Vue Logo">
  <HelloWorld msg="Bem vindo ao novo Projeto Vue.js App" /> -->
  <div class="container-box">
    <TaskList />
  </div>
</template>

<script>
import TaskList from './components/TaskList.vue';


export default {
  name: 'App',
  components: {
    TaskList
  }
}
</script>

<style>
.container-box {
  display: flex;
  flex-direction: row;
  gap: 10px;
  border: 1px solid black;
  padding: 10px;
  justify-content: center;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
