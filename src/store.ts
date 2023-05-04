import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        users: [],
    }),
    actions: {
        setUsers(users:any) {
            this.users = users;
        },
    },
});
