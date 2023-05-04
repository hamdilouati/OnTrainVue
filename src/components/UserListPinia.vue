<!-- src/components/AnotherComponent.vue -->
<template>
  <div>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }} - {{ user.email }}
      </li>
    </ul>
  </div>
</template>

<script>
import { useUserStore } from '../store';

export default {
  setup() {
    const userStoreInstance = useUserStore();

    return {
      users: userStoreInstance.users,
    };
  },
};
</script>

<style scoped>
h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
</style>
