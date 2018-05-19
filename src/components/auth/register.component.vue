<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout
        column
        align-center>
        <v-form
          :style="{ width: '100%' }">
          <v-text-field
            v-validate="'required'"
            :error-messages="errors.collect('name')"
            v-model="name"
            data-vv-name="name"
            name="name"
            label="Name"
            type="text"
          />
          <v-text-field
            v-validate="'required|email'"
            :error-messages="errors.collect('email')"
            v-model="email"
            data-vv-name="email"
            name="email"
            label="Email"
            type="text"
          />
          <v-text-field
            v-validate="'required|min:6|max:30'"
            :error-messages="errors.collect('password')"
            v-model="password"
            data-vv-name="password"
            name="password"
            label="Password"
            type="password"
          />
          <v-btn
            color="primary"
            @click="submit">Register
          </v-btn>
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
      email: '',
      name: '',
      password: ''
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
