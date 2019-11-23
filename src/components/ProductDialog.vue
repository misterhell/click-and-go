<template>
  <q-dialog maximized persistent @before-hide="beforeHide" v-model="alert">
    <q-card>
      <q-img
        src="https://media-cdn.tripadvisor.com/media/photo-s/0a/47/a8/91/chicken-salad-sandwich.jpg"
      />

      <q-card-section>
        <div class="text-subtitle1">$・Italian, Cafe</div>
        <div class="text-subtitle2 text-grey">
          Small plates, salads & sandwiches in an intimate setting.
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions>
        <q-btn flat round icon="event" v-close-popup />
        <q-btn flat v-close-popup>5:30PM</q-btn>
        <q-btn flat v-close-popup>7:30PM</q-btn>
        <q-btn flat v-close-popup>9:00PM</q-btn>
        <q-btn flat color="primary" v-close-popup>Reserve</q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: () => ({})
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
