<template>
  <span>Удалить?</span>
  <button @click="$emit('delete', props.todo.id)">Удалить</button>
</template>

<script setup>
const props = defineProps({
  todo: Object,
});
</script>

<style scoped>

</style>