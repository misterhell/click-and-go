<template>
  <q-page class="flex flex-center items-baseline">
    <div class="column q-mt-lg q-pa-lg" style="width: 100%;">
      <div class="row">
        <span class="text-h6">Введите данные карты</span>
      </div>
      <div class="row q-my-sm">
        <div class="col">
          <q-input
            filled
            v-model="card"
            label="Номер карты"
            mask="#### #### #### ####"
            fill-mask="-"
          />
        </div>
      </div>
      <div class="row  q-my-sm">
        <div class="col">
          <q-input
            filled
            v-model="to"
            label="Действует до"
            mask="##/##"
            fill-mask="#"
          />
        </div>
        <div class="col q-ml-xs">
          <q-input
            filled
            v-model="cvv"
            label="CVV2/CVC2"
            mask="###"
            fill-mask="*"
          />
        </div>
      </div>

      <div class="row q-my-lg">
        <q-btn
          @click="pay"
          :disable="btnDiasbled"
          label="Оплатить"
          size="lg"
          color="primary"
          class="full-width"
        />
      </div>
    </div>
    <q-inner-loading :showing="loading">
      <q-spinner-ios size="50px" color="primary" />
    </q-inner-loading>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      card: "",
      cvv: "",
      to: "",
      loading: false
    };
  },

  mounted() {},

  computed: {
    btnDiasbled() {
      const cardValid = /^\d{4} \d{4} \d{4} \d{4}$/g.test(this.card),
        cvvValid = this.cvv.length == 3,
        toDayValid = this.to.day != "";

      return !(cardValid && cvvValid && toDayValid);
    }
  },

  methods: {
    pay() {
      this.loading = true;
      // request to payment server
      setTimeout(() => {
        this.$store.commit("cart/clearCart");
        this.clearFields();
        this.$q.notify({
          position: "top",
          timeout: 5000,
          message: "Ваша корзина оплачена! Спасибо за покупку.",
          actions: [{ icon: "close", color: "white" }],
          color: "green"
        });
        this.loading = false;
      }, 2000);
    },

    clearFields() {
      this.card = this.cvv = this.to = "";
    }
  }
};
</script>
