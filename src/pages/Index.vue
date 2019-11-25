<template>
  <q-page class="flex flex-center">
    <!-- <q-btn v-if="!scaner" @click="showScaner">
      сканировать
    </q-btn> -->

    <q-card v-if="slected" class="q-pa-md">
      <q-card-section>
        <div class="text-h4">
          <div class="row justify-between">
            <div class="col">
              {{ slected.name }}
            </div>
            <div class="col text-right">{{ slected.cost }}$</div>
          </div>
        </div>
        <div class="text-subtitle2 text-grey">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas velit,
          possimus nam inventore accusantium a consectetur, quis ipsum et
          perferendis ducimus minima sunt. Maxime aspernatur sed itaque?
          Quibusdam, architecto eius.
        </div>
      </q-card-section>

      <!-- <q-card-section class="text-center q-mt-xl">
        <span>Товар найден!</span>
      </q-card-section> -->

      <q-card-actions align="around">
        <item-counter v-model="itemsCount" />
      </q-card-actions>
      <q-card-actions align="around" class="q-mt-lg">
        <q-btn @click="back" style="width: 130px; height: 55px">Назад</q-btn>
        <q-btn
          @click="addToCart"
          color="primary"
          style="width: 130px; height: 55px"
          >Добавить в корзину</q-btn
        >
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import ItemCounter from "../components/ItemCounter";
export default {
  name: "PageIndex",

  components: {
    ItemCounter
  },

  data() {
    return {
      scaner: false,
      productFounded: true,
      itemsCount: 1
    };
  },

  mounted() {
    // this.checkScanerPermission();
    this.$store.commit("cart/selectRandomProduct");
  },

  computed: {
    slected() {
      return this.$store.state.cart.selectedProduct;
    }
  },

  methods: {
    showScaner() {
      this.scaner = true;
      QRScanner.scan((err, text) => {
        if (err) {
          alert("error:", err);
        } else {
          this.$store.commit("cart/selectRandomProduct");
        }
      });

      QRScanner.show();
      this.dropCounterToDefault();
    },

    checkScanerPermission() {
      QRScanner.getStatus(status => {
        if (!status.authorized && status.canOpenSettings) {
          if (
            confirm(
              "Для активации сканирования необходимо дать право на использование камеры. Открыть настройки?."
            )
          ) {
            QRScanner.openSettings();
          }
        }
      });
    },

    back() {
      this.$store.commit("cart/unselectProduct");
    },

    dropCounterToDefault() {
      this.itemsCount = 1;
    },

    async addToCart() {
      try {
        await this.$store.dispatch("cart/addToCart", {
          count: this.itemsCount
        });
        this.$q.notify({
          position: "top",
          timeout: 2500,
          message: "Товар добавлен в корзину!",
          actions: [{ icon: "close", color: "white" }],
          color: "teal"
        });
      } catch (e) {
        this.$q.notify({
          position: "top",
          timeout: 2500,
          message: "Ошибка! Что-то пошло не так:" + e,
          actions: [{ icon: "close", color: "white" }],
          color: "negative"
        });
      }

      this.dropCounterToDefault();
    }
  }
};
</script>
