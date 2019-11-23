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

      <q-card-section class="text-center q-mt-xl">
        <span>Товар найден!</span>
      </q-card-section>

      <q-card-actions align="around">
        <q-btn @click="back" style="width: 120px">Назад</q-btn>
        <q-btn
          :to="{ path: '/add-to-cart' }"
          color="primary"
          style="width: 120px"
          >Добавить в корзину</q-btn
        >
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import ProductDialog from "../components/ProductDialog";
export default {
  name: "PageIndex",

  components: {
    ProductDialog
  },

  data() {
    return {
      scaner: false,
      productFounded: true
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

    add() {},

    back() {
      this.$store.commit("cart/unselectProduct");
    }
  }
};
</script>
