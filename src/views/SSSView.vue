<template>
  <v-container align-center max-width="600">
    <v-alert v-if="errorStatus" type="error" title="Oops! Something went wrong :c Try again."></v-alert>
    <v-file-input label="Upload file" @change="fileChanged" class="mb-4 ml-n10" />

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
      <v-btn color="orange" class="mr-4" @click="generateShares">Encrypt</v-btn>
      <v-btn color="orange" @click="recoverSecret">Decrypt</v-btn>
    </v-col>
  </v-row>

  <v-container>
    <v-row justify="center" class="mt-4">
      <v-col cols="12" sm="8" md="6">
        <v-card v-if="result" rounded min-height="500">
          <div v-if="encrypt">
            <v-col v-for="(file, index) in shares" :key="index" cols="12" md="4">
              <v-img :src="file" height="200" contain></v-img>
            </v-col>
          </div>

          <div v-else>
            <v-img :src="result" width="100%" height="auto" />
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      numShares: 3,
      threshold: 2,
      secret: "",
      shares: [],
      file: null,
      isImage: false,
      encrypt: false,
      errorStatus: false,
    };
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0];
      this.isImage = this.file.type.startsWith("image/");
      this.errorStatus = false;
    },
    // encrypt
    async generateShares() {
      this.encrypt = true;
      this.errorStatus = false;
      if (this.file) {
        console.log("file")
        console.log(this.file)
        // if file is being encrypted, then send to image url
        const formData = new FormData();
        formData.append("image", this.file);
        formData.append("numShares", this.numShares);
        formData.append("numThreshold", this.threshold);

        console.log("form data")
        console.log(formData)

        try {
          const response = await axios.post(
            "http://127.0.0.1:5000/generate-shares",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
              responseType: "blob",
            }
          );
          // this.result = response.data;
          // console.log(response.data);
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "generated_shares.zip");
          document.body.appendChild(link);
          link.click();
        } catch (error) {
          console.log(error);
          this.errorStatus = true;
        }
      }
    },
    // decrypt
    async recoverSecret() {
      this.encrypt = false;
      this.errorStatus = false;
      if (this.file) {
        const formData = new FormData();
        formData.append("file", this.file);
        formData.append("numShares", this.numShares);
        formData.append("numThreshold", this.threshold);

        try {
          const response = await axios.post(
            "http://127.0.0.1:5000/reconstruct-image",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
              responseType: "blob",
            }
          );
          // this.result = response.data;
          // console.log(response.data);

          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "reconstructed_img.bmp");
          document.body.appendChild(link);
          link.click();
        } catch (error) {
          console.log(error);
          this.errorStatus = true;
        }
      }
    },
  },
};
</script>