<template>
  <q-dialog persistent @before-hide="beforeHide" v-model="alert"> </q-dialog>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: () => ({
        name: "Hello"
      })
    }
  },

  data() {
    return {
      alert: true
    };
  },

  methods: {
    beforeHide() {
      this.$emit("hide");
    }
  }
};
</script>
