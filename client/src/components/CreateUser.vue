<template lang="pug">
  .create
    v-snackbar(v-model="alert.show" absolute bottom :color="alert.status" :timeout="4000") {{ alert.message }}
    v-card.mt-3
      v-card-title.headline Создание пользователя
      v-card-text
        form
          v-text-field(v-model="form.username" label="Имя пользователя" @blur="$v.form.username.$touch()" :error-messages="usernameErrors")
          v-text-field(v-model="form.email" label="Email" @blur="$v.form.email.$touch()" :error-messages="emailErrors")
          v-text-field(v-model="form.password" @click:append="showPass = !showPass" :type="showPass ? 'text' : 'password'" label="Пароль" @blur="$v.form.password.$touch()" :append-icon="showPass ? 'visibility' : 'visibility_off'" :error-messages="passwordErrors")
          v-text-field(v-model="form.repeatPass" @click:append="showRepeatPass = !showRepeatPass" :type="showRepeatPass ? 'text' : 'password'" label="Повторите пароль" @blur="$v.form.repeatPass.$touch()" :append-icon="showRepeatPass ? 'visibility' : 'visibility_off'" :error-messages="repeatPassErrors")
      v-card-actions
        v-spacer
        v-btn(@click="clear" color="error" large) Очистить
        v-btn(@click="createUser" color="success" large) Создать
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, email, sameAs } from 'vuelidate/lib/validators';
import Nprogress from 'nprogress';

export default {
  mixins: [validationMixin],
  data() {
    return {
      form: {
        username: null,
        email: null,
        password: null,
        repeatPass: null
      },
      showPass: false,
      showRepeatPass: false,
      alert: {
        show: false,
        message: null,
        status: null
      }
    };
  },
  validations: {
    form: {
      username: {
        required
      },
      email: {
        required,
        email
      },
      password: {
        required
      },
      repeatPass: {
        required,
        sameAsPassword: sameAs('password')
      }
    }
  },
  computed: {
    usernameErrors() {
      const errors = [];
      if (!this.$v.form.username.$dirty) return errors;
      if (!this.$v.form.username.required) errors.push('Это поле обязательное');
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.form.email.$dirty) return errors;
      if (!this.$v.form.email.required) errors.push('Это поле обязательное');
      if (!this.$v.form.email.email)
        errors.push('Введите валидный почтовый ящик');
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.form.password.$dirty) return errors;
      if (!this.$v.form.password.required) errors.push('Это поле обязательное');
      return errors;
    },
    repeatPassErrors() {
      const errors = [];
      if (!this.$v.form.repeatPass.$dirty) return errors;
      if (!this.$v.form.repeatPass.required)
        errors.push('Это поле обязательное');
      if (!this.$v.form.repeatPass.sameAsPassword)
        errors.push('Пароли должны быть одинаковыми');
      return errors;
    }
  },
  methods: {
    validateForm() {
      this.$v.$touch();

      return !this.$v.$invalid;
    },
    showAlert(res) {
      this.alert.show = true;
      this.alert.message = res.message;
      this.alert.status = res.status;
    },
    clear() {
      this.$v.$reset();
      this.form.username = null;
      this.form.email = null;
      this.form.password = null;
      this.form.repeatPass = null;
    },
    createUser() {
      const isValid = this.validateForm();
      if (isValid) {
        const payload = {
          username: this.form.username,
          email: this.form.email,
          password: this.form.password
        };
        Nprogress.start();
        this.$store
          .dispatch('createUser', payload)
          .then(res => {
            this.$router.push({ name: 'user', params: { id: res.id } });
          })
          .catch(err => {
            this.showAlert(err);
            Nprogress.done();
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
