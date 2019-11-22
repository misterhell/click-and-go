<template>
  <q-page class="flex flex-center">
    <q-btn v-if="!scaner" @click="showScaner">
      сканировать
    </q-btn>
  </q-page>
</template>

<script>
export default {
  name: "PageIndex",

  data() {
    return {
      scaner: false
    };
  },

  mounted() {
    this.checkScanerPermission();
  },
  methods: {
    showScaner() {
      this.scaner = true;
      QRScanner.scan((err, text) => {
        if (err) {
          alert("error:", err);
        } else {
          this.$store.commit("cart/addRandomProduct");
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
    }
  }
};
</script>
