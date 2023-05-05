import { defineStore } from 'pinia';
import { useQuery } from '@vue/apollo-composable';
import { gql } from 'graphql-tag';

export interface User {
  id: number;
  name: string;
  email: string;
}

interface UserState {
  users: User[];
  user: User | null;
}

const GET_USERS_QUERY = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

const GET_USER_QUERY = gql`
  query GetUser($id: Int!) {
    user(id: $id) {
      id
      name
      email
    }
  }
`;

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    users: [],
    user: null,
  }),
  getters: {
    userList(): User[] {
      return this.users;
    },
    connectedUser(): User | null {
      return this.user;
    },
  },
  actions: {
    async fetchUsers(): Promise<void> {
      const { onResult } = await useQuery(GET_USERS_QUERY);
      onResult(({ data }) => {
        if (data && data.users) {
          this.users = data.users
        }
      });
    },
    async fetchUser(id: number): Promise<void> {
      const { onResult } = await useQuery(GET_USER_QUERY, { variables: { id } });
      onResult(({ data }) => {
        if (data && data.user) {
          this.user = data.user
        }
      });
    },
    setUsers(users: User[]): void {
      this.users = users;
    },
    setConnectedUser(user: User): void {
      this.user = user;
    },
  },
});
