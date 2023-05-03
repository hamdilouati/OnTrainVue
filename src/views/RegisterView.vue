<template>
  <div class="view-container">
    <h2>Créer un nouvel utilisateur</h2>
    <RegisterForm />
  </div>
</template>

<script>
import RegisterForm from '../components/TheRegisterForm.vue';

export default {
  components: {
    RegisterForm,
  },
};
</script>