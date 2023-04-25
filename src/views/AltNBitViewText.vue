<template>
  <v-container align-center max-width="600">
    <v-alert
      v-if="errorStatus"
      type="error"
      title="Oops! Something went wrong :c Try again."
    ></v-alert>

    <v-file-input
      label="Upload file for decryption"
      @change="fileChanged"
      class="mb-4 ml-n10"
    />

    <v-row>
      <v-col cols="12" sm="4">
        <v-text-field
          label="Number of blocks 'n'"
          v-model="numBlocks"
          class="mb-4"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="4">
        <v-text-field
          label="Enter the encryption key (ENCK)"
          v-model="enck"
          class="mb-4"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="8">
        <v-textarea
          label="Text for encryption/decryption"
          v-model="text"
          no-resize
          rows="10"
          class="mb-4 mr-4"
        />
      </v-col>
    </v-row>
  </v-container>

  <v-row>
    <v-col>
      <v-btn color="orange" class="mr-4" @click="encrypt">Encrypt</v-btn>
      <v-btn color="orange" @click="decrypt">Decrypt</v-btn>
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
// @ is an alias to /src
import axios from "axios";

export default {
  data() {
    return {
      numBlocks: "",
      text: "",
      file: null,
      result: null,
      enck: "",
      errorStatus: false,
    };
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0];
      // this.isZip = this.file.type.startsWith('application/');
      this.errorStatus = false;
    },

    // Send encryption data to the flask app
    async encrypt() {
      this.errorStatus = false;
      if (this.file) {
        // TODO do we need this part?
      } else {
        // original data
        // const response = await axios.post('http://127.0.0.1:5000/encrypt-text', { text: this.text, numBlocks: this.numBlocks, enck: this.enck });
        // this.result = response.data;
        // console.log(response.data);

        // GETTING THE ZIP BACK BABY
        try {
          const response = await axios.post(
            "http://127.0.0.1:5000/encrypt-text",
            { text: this.text, numBlocks: this.numBlocks, enck: this.enck },
            { responseType: "blob" }
          );
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Text_Encrypted_Data.zip");
          document.body.appendChild(link);
          link.click();
        } catch (error) {
          console.log(error);
          this.errorStatus = true;
        }
      }
    },
    async decrypt() {
      this.errorStatus = false;
      if (this.file) {
        // handle non-image file decryption
        const formData = new FormData();
        formData.append("file", this.file);
        formData.append("enck", this.enck);

        try {
          const response = await axios.post(
            "http://127.0.0.1:5000/decrypt-zip",
            formData
          );
          this.result = response.data;
          console.log(response.data);
        } catch (error) {
          console.log(error);
          this.errorStatus = true;
        }
      } else {
        // const response = await axios.post('/decrypt-text', { text: this.text, numBlocks: this.numBlocks });
        try {
          const response = await axios.post(
            "http://127.0.0.1:5000/decrypt-text",
            { text: this.text, numBlocks: this.numBlocks, enck: this.enck }
          );
          this.result = response.data;
          console.log(response.data);
        } catch (error) {
          console.log(error);
          this.errorStatus = true;
        }
      }
    },
  },
};
</script>

<style scoped>
p {
  margin: 40px 20px 20px;
}
</style>