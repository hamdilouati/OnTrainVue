<template>
  <div>
    <form @submit.prevent="submitForm">
      <div>
        <label for="email">Email:</label>
        <input
            type="email"
            id="email"
            v-model="email"
            required
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
        />
      </div>
      <div>
        <label for="password">Mot de passe:</label>
        <input type="password" id="password" v-model="password" required />
        <span class="error" v-if="passwordError">Le mot de passe doit avoir une longueur minimale de 6 caractères.</span>
      </div>
      <button type="submit">S'inscrire</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const passwordError = ref(false);

    const validatePassword = () => {
      if (password.value.length < 6) {
        passwordError.value = true;
      } else {
        passwordError.value = false;
      }
    };

    function submitForm() {
      console.log('Email:', email.value);
      console.log('Mot de passe:', password.value);
    }

    return {
      email,
      password,
      passwordError,
      validatePassword,
      submitForm
    };
  },
  watch: {
    password: {
      handler: 'validatePassword'
    }
  }
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
.error{
  color: red;
}
</style>
