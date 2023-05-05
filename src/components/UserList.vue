<template>
  <div>
    <template v-if="!loading">
      <table class="user-table">
        <table class="user-table">
          <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Email</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
          </tr>
          </tbody>
        </table>
      </table>
    </template>
    <div v-else>
      <p>Chargement des utilisateurs...</p>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted,computed } from 'vue';
import { useUserStore } from '../stores/user';

export default {
  setup() {
    const userStoreInstance = useUserStore();
    const loading = ref(true);

    onMounted(async () => {
      await userStoreInstance.fetchUsers();
      loading.value = false;
    });
    const users  = computed(() => userStoreInstance.userList);

    return {
      users,
      loading
    };
  },
};
</script>


<style scoped>
.user-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
}

.user-table th,
.user-table td {
  padding: 1rem;
  text-align: left;
  border: 1px solid #ccc;
}

.user-table thead {
  background-color: #f5f5f5;
  font-weight: bold;
}

.user-table tbody tr:nth-child(odd) {
  background-color: #f9f9f9;
}

.user-table tbody tr:hover {
  background-color: #e8f4fd;
  cursor: pointer;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
</style>