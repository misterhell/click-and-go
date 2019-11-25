<template>
  <q-page padding>
    <div class="column">
      <div class="col q-py-sm">
        <span class="text-h5">
          В корзине <b>{{ count }}</b> товарa(ов)
        </span>
      </div>
      <div class="col">
        <q-list bordered separator>
          <q-item v-for="(item, i) in items" :key="i" clickable v-ripple>
            <q-item-section avatar>
              {{ item.name }}
            </q-item-section>
            <q-item-section></q-item-section>
            <q-item-section side
              ><small>{{ item.cost }}</small></q-item-section
            >
            <q-item-section side
              ><small>{{ item.count }}</small></q-item-section
            >

            <q-item-section side>
              <b>{{ (item.count * item.cost).toFixed(2) }}</b>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div class="text-right text-h5">
        сумма: <b>{{ cost }} $</b>
      </div>
      <div class="col text-center q-mt-md">
        <q-btn
          @click="$router.push('/pay')"
          color="primary"
          icon-right="payment"
          label="перейти к оплате"
        />
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
    },
    count() {
      return this.$store.getters["cart/count"];
    }
  },

  methods: {
    addItem() {
      this.$store.commit("cart/addRandomProduct");
    }
  }
};
</script>
