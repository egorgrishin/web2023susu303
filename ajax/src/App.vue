<script setup>
import IconTodo from "@/components/icons/IconTodo.vue";
import {ref} from "vue";
import HomeView from "@/views/HomeView.vue";

const isDark = ref((localStorage.getItem('isDark') ?? '1') === '1');
const isVisibleLoader = ref(false);

const changeTheme = () => {
  isDark.value = !isDark.value;
  localStorage.setItem('isDark', +isDark.value);
}
</script>

<template>
  <div :class="{
    block__dark: isDark,
    block__light: !isDark,
  }" class="div__body">
    <header>
      <IconTodo/>
      <h1>To-dos</h1>
    </header>

    <Suspense>
      <HomeView
          @change-theme="changeTheme"
          @load="isVisibleLoader = !isVisibleLoader"
      />
    </Suspense>
  </div>

  <div :class="{
    block__dark: isDark,
    block__light: !isDark,
  }" class="loader" v-if="isVisibleLoader">
    <img src="@/assets/loader.gif" alt="load">
  </div>
</template>

<style scoped>
.loader {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #dc860e;
}

.div__body {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  transition:
      color 0.5s,
      background-color 0.5s;
  line-height: 1.6;
  font-family:
      Helvetica,
      Inter,
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      sans-serif;
  font-size: 15px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

header {
  display: flex;
  align-items: center;
  line-height: 1.5;
  max-height: 100vh;
  margin-bottom: 24px;
}

header svg {
  height: 28px;
  width: 28px;
}

header h1 {
  font-weight: 700;
  font-size: 32px;
  margin-left: 12px;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
