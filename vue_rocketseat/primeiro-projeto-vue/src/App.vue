<template>
  <!-- <img src="./assets/logo.png" alt="Vue Logo">
  <HelloWorld msg="Bem vindo ao novo Projeto Vue.js App" /> -->
  <div class="container-box">
    <h2 :style="{color: changeColorCount}">
      {{ count }}
    </h2>

    <CounterButtons :count-value="count" @change-count="handleCountChange" />

    <p :style="{color: changeColorCount}">
      {{ countState }}
    </p>

  </div>
</template>

<script>
import CounterButtons from './components/CounterButtons.vue';


export default {
  name: 'App',
  components: {
    CounterButtons
  },
  data() {
    return {
      count: Number(localStorage.getItem('count')) || 0
    }
  },
  methods: {
    handleCountChange(action, value = 1) {
      switch (action) {
        case 'increment':
          this.count += value
          break
        case 'decrement':
          this.count -= value
          break
        case 'reset':
          this.count = 0
          break
      }
    }
  },
  computed: {
    changeColorCount() {
      if (this.count === 0) return 'black'
      if (this.count > 0) return 'green'
      return 'red'
    },
    countState() {
      if (this.count === 0) return 'É zero'
      if (this.count < 0) return 'É negativo'
      return 'É positivo'
    }
  },
  watch: {
    count(newValue) {
      // alert(`O contador mudou de ${oldValue} para ${newValue}`)
      localStorage.setItem('count', newValue)
    },
    changeColorCount(newValue) {
      alert(`Color selecionada é: ${newValue}`)
    }
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
