<template>
  <v-container align-center max-width="600">
    <v-file-input label="Upload image file" accept="image/*" @change="fileChanged" class="mb-4 ml-n10" />

    <v-row>
      <v-col cols="12" sm="4">
        <v-text-field label="Number of shares" v-model="numShares" class="mb-4" />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="4">
        <v-text-field label="Number of threshold" v-model="threshold" class="mb-4" />
      </v-col>
    </v-row>
  </v-container>

  <v-row>
      <v-col>
        <v-btn color="primary" class="mr-4" @click="generateShares">Encrypt</v-btn>
        <v-btn color="primary" @click="recoverSecret">Decrypt</v-btn>
      </v-col>
    </v-row>

  <v-container>
    <v-row justify="center" class="mt-4">
      <v-col cols="12" sm="8" md="6">
        <v-card v-if="result" rounded min-height="500">
          <v-img v-if="isImage" :src="result" width="100%" height="auto" />
          <v-card-text v-else>{{ result }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Header from "@/components/Header.vue";
import axios from 'axios';

export default {
  data() {
    return {
      numShares: '',
      threshold: '',
      secret: '',
      shares: [],
      file: null,
      isImage: false,
      shares: [],
    };
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0];
      this.isImage = this.file.type.startsWith('image/');
    },
    // encrypt
    async generateShares() {
      if (this.file) {
        // if image file is being encrypted, then send to image url
        const formData = new FormData();
        formData.append('image', this.file);
        formData.append('numShares', this.numShares);
        formData.append('numThreshold', this.threshold);

        const response = await axios.post('http://127.0.0.1:5000/generate-shares', formData);
        this.result = response.data;
        console.log(response.data);
      }
    },
    // decrypt
    async recoverSecret() {
      if (this.file) {
        const formData = new FormData();
        formData.append('image', this.file);
        formData.append('numBlocks', this.numBlocks);

        const response = await axios.post('http://127.0.0.1:5000/reconstruct-image', formData);
        this.result = response.data;
        console.log(response.data);
      }
    },
  }
}
</script>