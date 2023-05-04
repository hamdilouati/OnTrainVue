<template>
  <div id="app">
    <nav>
      <ul>
        <li>
          <router-link to="/users">Liste des utilisateurs</router-link>
        </li>
        <li>
          <router-link to="/register">Créer un nouvel utilisateur</router-link>
        </li>
        <li>
          <router-link to="/pinia">Liste des utilisateurs avec Pinia</router-link>
        </li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {};
</script>
