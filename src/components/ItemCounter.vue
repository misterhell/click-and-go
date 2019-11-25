<template>
  <div class="q-px-lg">
    <q-input
      :value="val"
      @blur="checkVal"
      @input="onInput"
      filled
      input-class="text-center text-h6"
    >
      <template v-slot:before>
        <q-btn
          @click="minus"
          size="1.2rem"
          icon="remove"
          color="secondary"
          :disabled="inputVal <= 1"
        />
      </template>

      <template v-slot:after>
        <q-btn @click="plus" size="1.2rem" icon="add" color="secondary" />
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  name: "ItemCounter",

  props: {
    value: {
      type: Number,
      nullable: true,
      default: () => 1
    }
  },

  data() {
    return {
      inputVal: this.value
    };
  },

  computed: {
    val() {
      return this.value;
    }
  },

  methods: {
    onInput(v) {
      this.inputVal = +v || 1;

      this.$nextTick(() => {
        this.$emit("input", this.inputVal);
      });
    },

    plus() {
      this.inputVal += 1;
      this.onInput(this.inputVal);
    },

    minus() {
      if (this.inputVal > 1) this.inputVal -= 1;
      this.onInput(this.inputVal);
    },

    /**
     * check for valid integer, more than 0
     */
    checkVal() {
      const onlyNumsRegex = /^\d+$/g;
      if (!onlyNumsRegex.test(this.inputVal) || this.inputVal < 1)
        this.inputVal = 1;
    }
  }
};
</script>
