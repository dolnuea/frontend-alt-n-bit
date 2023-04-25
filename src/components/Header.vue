<template>
  <v-card>
    <v-toolbar color="primary" class="pt-5">
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

      <v-avatar size="200" style="position: absolute; right: 0;">
        <img src="https://media.tenor.com/ZmZ7UKIc0soAAAAM/anonymous-anonymous-bites-back.gif" alt="avatar">
      </v-avatar>

      <v-toolbar-title>Alternate N-Bit Key Encryption and Secret Sharing Showcase</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn> -->

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
      <v-window-item v-for="(item, index) in items" :key="index" :value="item.name" >
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
          name: 'Alternate N Bit Text Encryption',
          link: '/',
          content: 'Overcome post-encryption patterns in text with Alternate N Bit Encryption! 💥',
        },
        {
          name: 'Alternate N Bit Image Encryption',
          link: '/alt-n-bit-image',
          content: 'Overcome post-encryption patterns in image with Alternate N Bit Encryption! 💥',
        },
        {
          name: 'Secret Sharing and Homomorphism',
          link: '/sss',
          content: 'Secret sharing with downscaling and homomorphism! 🤫',
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

/* .v-avatar {
  position: relative;
  margin-right: 0;
  width: 200px;
  height: 200px;
}

.v-avatar img {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
} */

</style>
