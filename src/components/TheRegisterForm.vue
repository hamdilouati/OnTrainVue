<template>
  <div>
    <form @submit.prevent="submitForm">
      <div>
        <label for="email">Email:</label>
        <input
            type="email"
            id="email"
            v-model="email"
            :class="{ 'is-invalid': $v.email.$error }"
            required
        />
        <div v-if="$v.email.$error" class="error-message">
          Veuillez entrer un email valide.
        </div>
      </div>
      <div>
        <label for="password">Mot de passe:</label>
        <input
            type="password"
            id="password"
            v-model="password"
            :class="{ 'is-invalid': $v.password.$error }"
            required
        />
        <div v-if="$v.password.$error" class="error-message">
          Le mot de passe doit contenir au moins 6 caractères.
        </div>
      </div>
      <button type="submit">S'inscrire</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength } from '@vuelidate/validators';

export default {
  setup() {
    const email = ref('');
    const password = ref('');

    const validations = {
      email: { required },
      password: { required, minLength: minLength(6) }
    };
    const $v = useVuelidate(validations, { email, password });

    function submitForm() {
      $v.value.$touch();
      if ($v.value.$anyError) {
        return;
      }
      console.log('Email:', email.value, 'Mot de passe:', password.value);
    }

    return { email, password, submitForm, $v };
  },
};
</script>
<style scoped>
html,
form {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

form h2 {
  margin-bottom: 20px;
  text-align: center;
}

form div {
  margin-bottom: 10px;
}

form label {
  display: block;
  margin-bottom: 5px;
}

form input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

form button {
  width: 100%;
  padding: 10px;
  background-color: #0076ff;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

form button:hover {
  background-color: #0051cc;
}
.error-message{
  color: red;
  font-size: 12px;
  margin-top: 5px;
}
</style>
