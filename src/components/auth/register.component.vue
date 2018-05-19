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
            v-validate="'required'"
            :error-messages="errors.collect('name')"
            v-model="form.name"
            data-vv-name="name"
            name="name"
            label="Ime"
            type="text"
          />
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
            @click="submit">Registruj se
          </v-btn>
          <br />
          <br />
          Već imate nalog? <router-link :to="{ name: 'login' }">Ulogujte se!</router-link>
        </v-form>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import authService from '../../api-services/auth.service';

export default {
  name: 'Register',
  data() {
    return {
      form: {
        email: '',
        name: '',
        password: ''
      }
    };
  },
  methods: {
    async submit() {
      const isValid = await this.$validator.validateAll();

      if (isValid) {
        authService.register(this.form);
      }
    }
  }
};
</script>
