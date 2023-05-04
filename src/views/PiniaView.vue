<template>
  <div class="view-container">
    <h2>Liste des utilisateurs avec Pinia</h2>
    <UserListPinia />
  </div>
</template>

<script>
import UserListPinia from "../components/UserListPinia.vue";

export default {
  components: {
    UserListPinia,
  },
};
</script>