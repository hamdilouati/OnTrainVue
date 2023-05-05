<template>
  <div>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Nom :</label>
        <input type="text" id="name" v-model="name" required />
      </div>
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
import gql from 'graphql-tag'
import { useMutation } from '@vue/apollo-composable';

const CREATE_USER_MUTATION = gql`
  mutation createUser($name: String!, $email: String!, $password: String!) {
    createUser(name: $name, email: $email, password: $password) {
      id
      name
      email
      email_verified_at
    }
  }
`;

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const name = ref('');

    const validations = {
      name: { required },
      email: { required },
      password: { required, minLength: minLength(6) }
    };
    const $v = useVuelidate(validations, { email, password });
    const { mutate: createUser, onDone } = useMutation(CREATE_USER_MUTATION);

    onDone(({ data }) => {
      console.log('Utilisateur est créé:', data.createUser);
    });
    async function submitForm() {
      $v.value.$touch();
      if ($v.value.$anyError) {
        return;
      }
      try {
        await createUser({
          email: email.value,
          password: password.value,
          name : name.value
        });
      } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur:', error);
      }
    }

    return { name,email, password, submitForm, $v };
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
