<!-- src/App.vue -->
<script setup>
</script>

<template>
  <div class="app">
    <router-view />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  min-height: 100vh;
  background: #f3f3f5;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang TC',
    'Microsoft JhengHei', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

.app {
  padding: 0;
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (min-width: 415px) {
  .app {
    padding: 24px 0;
  }
}

#app {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>