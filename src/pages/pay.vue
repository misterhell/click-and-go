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
          <div class="col">
            <q-select filled v-model="to.day" :options="options" />
          </div>
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
          :disable="btnDiasbled"
          label="Оплатить"
          size="lg"
          color="primary"
          class="full-width"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      card: "",
      cvv: "",
      to: {
        day: "",
        year: ""
      },

      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    };
  },

  computed: {
    btnDiasbled() {
      const cardValid = /^\d{4} \d{4} \d{4} \d{4}$/g.test(this.card),
        cvvValid = this.cvv.length == 3,
        toDayValid = this.to.day != "";

      return !(cardValid && cvvValid && toDayValid);
    }
  }
};
</script>
