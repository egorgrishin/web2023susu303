<template>
  <div class="popup">
    <div
        :class="{
          block__dark: isDark,
          block__light: !isDark,
        }"
        class="popup__block"
    >
      <div class="popup__header">
        <h3>{{ props.title }}</h3>
        <h3 @click="$emit('close')">X</h3>
      </div>
      <slot>

      </slot>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";

const props = defineProps({
  title: String,
})
const isDark = ref((localStorage.getItem('isDark') ?? '1') === '1');
</script>

<style scoped>
.popup {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup__block {
  border: 2px solid #999999;
  width: 320px;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
}

.popup__header {
  display: flex;
  justify-content: space-between;
}
</style>