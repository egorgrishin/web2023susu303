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
      <option disabled value="">Выберите автора</option>
      <option v-for="user in props.users" :key="user.id" :value="user.id">
        {{ user.name }}
      </option>
    </select>
  </div>

  <button @click="$emit('create', title, userId)">Создать</button>
</template>

<script setup>
import {ref} from "vue";

const props = defineProps({
  users: Object,
});
const title = ref('');
const userId = ref(null);
</script>

<style scoped>

</style>