<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <Header msg="Welcome to Your Vue.js App" />
    <p>Upload file here</p>
    <v-file-input label="File input"></v-file-input>

    <p>OR.... enter text below!</p>

    <v-container fluid>
    <v-textarea
      label="Enter ciphertext/plaintext text here"
      no-resize
      rows="10"
      :model-value="value"
    ></v-textarea>
  </v-container>

    <v-btn style="margin: 20px;">Encrypt</v-btn>
    <v-btn>Decrypt</v-btn>

    <v-row justify="center" style="margin: 50px;">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card title="Results" rounded min-height="500"></v-card>
      </v-card>
    </v-col>
  </v-row>

  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";

export default {
  name: "HomeView",
  components: {
    Header,
  },
};
</script>

<style scoped>
.home {
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

p {
  margin: 40px 20px 20px;
}
</style>