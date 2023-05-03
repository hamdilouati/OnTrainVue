<template>
  <div class="view-container">
    <h2>Liste des utilisateurs</h2>
    <UserList />
  </div>
</template>

<script>
import UserList from '../components/UserList.vue';

export default {
  components: {
    UserList,
  },
};
</script>