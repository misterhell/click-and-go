<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Click&Go {{ pageTitle || "" }} </q-toolbar-title>

        <div>
          <q-btn
            flat
            dense
            round
            @click="leftDrawerOpen = !leftDrawerOpen"
            icon="menu"
            aria-label="Menu"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Click&Go | Меню</q-item-label>
        <q-item
          clickable
          v-for="(item, i) in menuItems"
          :key="i"
          :to="item.to"
          exact
        >
          <q-item-section avatar>
            <q-icon :name="item.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ item.name }}</q-item-label>
            <q-item-label caption>{{ item.sub }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-footer elevated>
      <q-toolbar>
        <div class="row justify-between full-width q-px-md">
          <div class="col-12 text-right">
            товаров на сумму:
            <b>
              {{ cost }}
            </b>
          </div>
        </div>
      </q-toolbar>
      <q-toolbar>
        <div class="row justify-between full-width q-px-md">
          <div class="col-2">
            <q-btn
              to="/"
              :outline="'/' == $route.path"
              flat
              color="white"
              icon="crop_free"
            />
          </div>
          <div class="col-2">
            <q-btn
              to="cart"
              :outline="'/cart' == $route.path"
              flat
              color="white"
              icon="shopping_cart"
            >
              <q-badge color="blue" floating>{{ count }}</q-badge>
            </q-btn>
          </div>
          <div class="col-2">
            <q-btn
              to="pay"
              :outline="'/pay' == $route.path"
              flat
              color="white"
              icon="payment"
            />
          </div>
        </div>
      </q-toolbar>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MyLayout",

  data() {
    return {
      leftDrawerOpen: false,
      menuItems: this.$store.state.app.menu
    };
  },

  computed: {
    pageTitle() {
      const route = this.$route.matched.find(
        route => route.path == this.$route.path
      );
      if (route) {
        return `| ${route.props.default.screenName}`;
      }
      return "";
    },

    cost() {
      return this.$store.getters["cart/sum"];
    },

    count() {
      return this.$store.getters["cart/count"];
    }
  }
};
</script>
