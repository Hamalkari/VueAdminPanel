<template lang="pug">
  v-layout(justify-center).mt-4
    v-flex(sm6)
      v-card
        v-card-title
          h2.title Изменить пользователя
          v-spacer
          router-link(:to="{name:'user',params: {id}}") Назад
        v-card-text
          form 
            v-text-field(v-model="username" label="Имя пользователя" :error-messages="usernameErrors" @blur="$v.username.$touch()")
            v-text-field(v-model="email" label="Email" :error-messages="emailErrors" @blur="$v.email.$touch()") 
            v-text-field(v-model="password" label="Пароль" :error-messages="passwordErrors" @blur="$v.password.$touch()" :type="showPass ? 'text' : 'password'" @click:append="showPass = !showPass" :append-icon="showPass ? 'visibility' : 'visibility_off'")
        v-card-actions
          v-spacer
          v-btn(color="success" @click="updateUser") Сохранить
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';
import Nprogress from 'nprogress';
export default {
  props: {
    id: String
  },
  mixins: [validationMixin],
  data() {
    return {
      username: null,
      email: null,
      password: null,
      showPass: false
    };
  },
  validations: {
    username: {
      required
    },
    email: {
      required,
      email
    },
    password: {
      required
    }
  },
  computed: {
    usernameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      if (!this.$v.username.required) errors.push('Это обязательное поле');
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      if (!this.$v.email.required) errors.push('Это обязательное поле');
      if (!this.$v.email.email) errors.push('Введите валидный почтовый ящик');
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      if (!this.$v.password.required) errors.push('Это обязательное поле');
      return errors;
    }
  },
  methods: {
    validate() {
      this.$v.$touch();

      return !this.$v.$invalid;
    },
    updateUser() {
      const isvalid = this.validate();
      if (isvalid) {
        const payload = {
          username: this.username,
          email: this.email,
          password: this.password,
          id: this.id
        };
        Nprogress.start();
        this.$store.dispatch('updateUser', payload).then(() => {
          this.$router.push({ name: 'users' });
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
