<template>
  <q-page padding>
    <div class="column">
      <div class="col">
        <span class="text-h6">
          Общая сумма в корзине: <b>{{ cost }}</b>
        </span>
      </div>
      <div class="col">
        <q-list bordered separator>
          <q-item v-for="(item, i) in items" :key="i" clickable v-ripple>
            <q-item-section avatar>
              {{ item.name }}
            </q-item-section>
            <q-item-section>{{ item.cost }}</q-item-section>
            <q-item-section> x {{ item.count }}</q-item-section>

            <q-item-section side>
              {{ (item.count * item.cost).toFixed() }}
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div class="col">
        <q-btn @click="addItem">
          add
        </q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  computed: {
    items: {
      get() {
        return this.$store.state.cart.items;
      }
    },
    cost() {
      return this.$store.getters["cart/sum"];
    }
  },

  methods: {
    addItem() {
      this.$store.commit("cart/addRandomProduct");
    }
  }
};
</script>
