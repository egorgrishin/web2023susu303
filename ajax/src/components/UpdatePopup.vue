<template>
  <div class="item">
    <label for="title">
      Название
    </label>
    <input type="text" name="title" v-model="title">
  </div>

  <div class="item">
    <label for="title">
      Автор
    </label>
    <select v-model="userId">
      <option
          v-for="user in props.users"
          :key="user.id"
          :value="user.id"
          :selected="user.id === props.todo.userId"
      >
        {{ user.name }}
      </option>
    </select>
  </div>

  <button @click="$emit('update', todo.id, title, userId)">Обновить</button>
</template>

<script setup>
import {ref} from "vue";

const props = defineProps({
  users: Object,
  todo: Object,
});
console.log(props.todo);
const title = ref(props.todo.title);
const userId = ref(props.todo.userId);
</script>

<style scoped>

</style>