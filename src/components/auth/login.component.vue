<template>
  <v-container fluid
    :style="{ display: 'flex', alignItems: 'center' }">
    <v-slide-y-transition mode="out-in">
      <v-layout
        column
        align-center>
        <v-form
          :style="{ width: '100%' }">
          <v-text-field
            v-validate="'required|email'"
            :error-messages="errors.collect('email')"
            v-model="form.email"
            data-vv-name="email"
            name="email"
            label="Email"
            type="text"
          />
          <v-text-field
            v-validate="'required|min:6|max:30'"
            :error-messages="errors.collect('password')"
            v-model="form.password"
            data-vv-name="password"
            name="password"
            label="Lozinka"
            type="password"
          />
          <v-btn
            color="primary"
            @click="submit">Uloguj se
          </v-btn>
          <br />
          <br />
          Nemate nalog? <router-link :to="{ name: 'register' }">Registrujte se!</router-link>
        </v-form>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import authService from '../../api-services/auth.service';

export default {
  name: 'Login',
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    async submit() {
      const isValid = await this.$validator.validateAll();

      if (isValid) {
        authService.login(this.form);
      }
    }
  }
};
</script>
