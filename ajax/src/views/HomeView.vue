<script setup>
import {computed, ref} from "vue";
import {getTodos, getUsers} from "@/api";
import AppPopup from "@/components/AppPopup.vue";
const emit = defineEmits(['load'])

const isModalVisible = ref(false);
const popupTitle = ref('');
const popupComponentName = ref('');
const selectedTodo = ref(null);
const users = ref([]);
users.value = await getUsers();

const todos = ref([]);
const ggetTodos = async () => {
  emit('load')
  const todos = await getTodos();
  emit('load')
  return todos;
}
todos.value = await ggetTodos();

const getUserById = (userId) => users.value.find(user => user.id === userId);

const openCreate = () => {
  isModalVisible.value = !isModalVisible.value;
  popupTitle.value = 'Создать';
  popupComponentName.value = 'create';
};

const openUpdate = (todo) => {
  isModalVisible.value = !isModalVisible.value;
  popupTitle.value = 'Обновить';
  popupComponentName.value = 'update';
  selectedTodo.value = todo;
};

const popupComponent = computed(() => popupComponentName.value + '-popup')

const create = (title, userId) => {
  todos.value.unshift({ title, userId });
  isModalVisible.value = !isModalVisible.value;
}

const update = (id, title, userId) => {
  for (let i = 0; i < todos.value.length; i++) {
    if (todos.value[i].id !== id) {
      continue;
    }
    todos.value[i] = { id, title, userId };
  }
  isModalVisible.value = !isModalVisible.value;
}

const likes = ref(JSON.parse(localStorage.getItem('likes') ?? '[]'));

const del = (todo) => {
  if (!likes.value.includes(todo.id)) {
    todos.value = todos.value.filter(todoo => todoo.id !== todo.id);
    likes.value = likes.value.filter(like => like !== todo.id);
    return;
  }

  selectedTodo.value = todo;
  isModalVisible.value = !isModalVisible.value;
  popupTitle.value = 'Удалить';
  popupComponentName.value = 'delete';
}

const pdel = (id) => {
  todos.value = todos.value.filter(todo => todo.id !== id);
  isModalVisible.value = !isModalVisible.value;
  likes.value = likes.value.filter(like => like !== id);
  localStorage.setItem('likes', JSON.stringify(likes.value));
}

const isFavorite = (id) => {
  return likes.value.includes(id);
};

const toggleFavorite = (id) => {
  if (likes.value.includes(id)) {
    likes.value = likes.value.filter(like => like !== id);
  } else {
    likes.value.push(id);
  }
  localStorage.setItem('likes', JSON.stringify(likes.value));
}

const filteredTodos = computed(() => {
  let temp = todos.value;
  temp.sort(function (a, b) {
    if (likes.value.includes(a.id) && !likes.value.includes(b.id)) {
      return -1;
    }
    if (!likes.value.includes(a.id) && likes.value.includes(b.id)) {
      return 1;
    }
    return 0;
  });
  return temp;
})
</script>

<template>
  <main>
    <div class="action">
      <button
          class="create"
          @click="openCreate"
      >
        Создать
      </button>
      <button
          class="change-theme"
          @click="$emit('changeTheme')"
      >
        Поменять тему
      </button>
    </div>
    <div class="grid">
      <div class="grid__row grid__header">
        <span>Название</span>
        <span>Автор</span>
      </div>
      <div
          class="grid__row"
          v-for="todo in filteredTodos"
          :key="todo.id"
      >
        <span>{{ todo.title }}</span>
        <span>{{ getUserById(todo.userId).name }}</span>
        <span
            @click="toggleFavorite(todo.id)"
            :class="{ liked: isFavorite(todo.id) }"
        >И</span>
        <span @click="openUpdate(todo)">P</span>
        <span @click="del(todo)">X</span>
      </div>
    </div>
  </main>

  <AppPopup
      v-if="isModalVisible"
      @close="isModalVisible = !isModalVisible"
      :title="popupTitle"
  >
    <component
        :is="popupComponent"
        :users="users"
        :todo="selectedTodo"
        @create="create"
        @update="update"
        @delete="pdel"
    ></component>
  </AppPopup>
</template>

<style scoped>
.action {
  margin-bottom: 24px;
}

.action .create {
  border: none;
  padding: 4px 16px;
  font-family: inherit;
  font-weight: 700;
  background: hsla(160, 100%, 37%, 1);
}

.action .change-theme {
  border: none;
  padding: 4px 16px;
  font-family: inherit;
  font-weight: 700;
  background: red;
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
}

.grid__header span {
  font-weight: 700;
}

.grid__row span:not(:first-child) {
  border-left: 1px solid #818181;
  padding-left: 12px;
}

.grid__row {
  border-bottom: 1px solid #818181;
  display: grid;
  grid-template-columns: 1fr 1fr 2rem 2rem 2rem;
}

.liked {
  color: #dc860e;
}
</style>
