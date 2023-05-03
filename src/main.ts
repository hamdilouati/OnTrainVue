import { createApp, provide, h } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import './assets/main.css'

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
    cache,
    uri: 'http://127.0.0.1:8000/graphql',
})
const app = createApp({
    setup () {
        provide(DefaultApolloClient, apolloClient)
    },
    render: () => h(App),
})

app.use(createPinia())
app.use(router)

app.mount('#app')
