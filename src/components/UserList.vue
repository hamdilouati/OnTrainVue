<template>
  <div>
    <h2>Liste des utilisateurs</h2>
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
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { gql } from 'graphql-tag';

const GET_USERS_QUERY = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

export default {
  setup() {
    const { onResult } = useQuery(GET_USERS_QUERY);
    const users = ref([]);

    onResult(({ data }) => {
      if (data && data.users) {
        users.value = data.users;
      }
    });

    return { users };
  },
};
</script>


<style scoped>
.user-table {
  width: 100%;
  min-width: 600px;
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