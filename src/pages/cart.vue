<template>
  <q-page padding>
    <div class="column">
      <div class="col q-py-sm text-center">
        <span class="text-h6">
          В корзине <b>{{ count }}</b> товарa(ов)
        </span>
        <q-btn
          v-if="items.length"
          @click="clearCart"
          color="primary"
          icon="delete"
          flat
        />
      </div>
      <div class="col">
        <q-list bordered separator>
          <q-slide-item
            @left="onLeft(item)"
            @right="onRight(item)"
            @action="slideAction"
            v-for="item in items"
            :key="item.id"
            left-color="green"
            right-color="red"
          >
            <template v-slot:right>
              <q-icon name="delete" />
            </template>
            <template v-slot:left>
              <q-icon name="add" />
            </template>

            <q-item clickable v-ripple>
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
          </q-slide-item>
          <q-item v-if="!items.length" clickable v-ripple>
            <q-item-section class="text-center">
              <small>корзина пуста</small>
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
          :disable="!items.length"
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
    },

    onLeft({ id, name }) {
      this.$store.commit("cart/addCountById", {
        id: id,
        count: 1
      });
      this.$q.notify({
        position: "top",
        timeout: 1000,
        message: `${name} - товар добавлен`,
        actions: [{ icon: "close", color: "white" }],
        color: "secondary"
      });
    },

    onRight({ id, name }) {
      this.$store.commit("cart/deleteById", id);
      this.$q.notify({
        position: "top",
        timeout: 1000,
        message: `${name} - товар удален`,
        actions: [{ icon: "close", color: "white" }],
        color: "red"
      });
    },

    clearCart() {
      this.$q
        .dialog({
          title: "Подтвердите",
          message: "Удалить все товары из корзины?",
          cancel: true,
          persistent: true,
          ok: {
            label: "да",
            flat: true
          },
          cancel: {
            label: "отмена",
            flat: true
          }
        })
        .onOk(() => {
          this.$store.commit("cart/clearCart");
          this.$q.notify({
            position: "top",
            timeout: 2500,
            message: "Ваша корзина очищена.",
            actions: [{ icon: "close", color: "white" }],
            color: "secondary"
          });
        });
    },

    slideAction({ reset }) {
      reset();
    }
  }
};
</script>
