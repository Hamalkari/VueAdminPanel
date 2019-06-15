<template lang="pug">
  v-layout.mt-4
    v-flex
      v-card
        v-card-title.title.text-md-center 404 {{ resource }} не была найдена
</template>

<script>
export default {
  props: {
    resource: String
  }
};
</script>

<style lang="scss" scoped></style>
