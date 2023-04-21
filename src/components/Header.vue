<template>
  <v-card>
    <v-toolbar color="primary">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Alternate N-Bit Key Encryption and Secret Sharing Showcase</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs v-model="tab" align-tabs="title">
          <router-link v-for="(item, index) in items" :key="index" :to="item.link">
            <v-tab :value="item.name">
              {{ item.name }}
            </v-tab>
          </router-link>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-window v-model="tab">
      <v-window-item v-for="(item, index) in items" :key="index" :value="item.name">
        {{ item.content }}
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script>
export default {
  name: "Header",
  props: {
    msg: String,
  },
  data() {
    return {
      tab: null,
      items: [
        {
          name: 'Alternate N Bit Encryption',
          link: '/',
          content: 'Content for Alternate N Bit Encryption',
        },
        {
          name: 'Secret Sharing and Homomorphism',
          link: '/sss',
          content: 'Content for Secret Sharing and Homomorphism',
        },
        {
          name: 'About our Team!',
          link: '/about',
          content: 'Our fabulous, gorgeous Team! ✨',
        },
      ]
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #eaa5d8;
}
</style>
