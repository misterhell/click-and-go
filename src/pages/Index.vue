<template>
  <q-page class="flex flex-center">
    <div v-if="!slected" class="text-center">
      <p class="text-h6">
        Нажмите, <br />
        чтобы отсканировать <br />
        код продукта
      </p>
      <q-btn
        @click="showScaner"
        round
        icon="crop_free"
        size="35px"
        color="teal"
      />
    </div>

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

  watch: {
    $route(to, from) {
      this.hideScaner();
    }
  },

  beforeRouteUpdate(to, from, next) {
    this.hideScaner(() => {
      next();
    });
  },

  data() {
    return {
      productFounded: true,
      itemsCount: 1
    };
  },

  mounted() {},

  computed: {
    slected() {
      return this.$store.state.cart.selectedProduct;
    }
  },

  methods: {
    showScaner() {
      this.dropCounterToDefault();
      cordova.plugins.barcodeScanner.scan(
        ({ text, format, cancelled }) => {
          if (cancelled) return;
          this.$store.commit("cart/selectRandomProduct");
        },
        error => {
          alert("Scanning failed: " + error);
        },
        {
          preferFrontCamera: false, // iOS and Android
          showFlipCameraButton: true, // iOS and Android
          showTorchButton: true, // iOS and Android
          prompt: "Поместите код в рамку сканера", // Android
          resultDisplayDuration: 500,

          disableAnimations: true, // iOS
          disableSuccessBeep: false // iOS and Android
        }
      );
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
