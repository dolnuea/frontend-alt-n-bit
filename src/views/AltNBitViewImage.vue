<template>
  <v-container align-center max-width="600">
    <v-alert
      v-if="errorStatus"
      type="error"
      title="Oops! Something went wrong :c Try again."
    ></v-alert>
    <v-file-input
      label="Upload image file for encryption/decryption"
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
      file: null,
      isImage: false,
      result: null,
      enck: "",
      errorStatus: false,
    };
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0];
      this.isImage = this.file.type.startsWith("image/");
      // this.isZip = this.file.type.startsWith('application/');
      this.errorStatus = false;
    },

    // Send encryption data to the flask app
    async encrypt() {
      this.errorStatus = false;
      if (this.file) {
        if (this.isImage) {
          console.log(this.isImage);
          let formData = new FormData();
          formData.append('image', this.file);
          formData.append("numBlocks", this.numBlocks);
          console.log(formData.get('image')); // check that the image data is present in the formData object

          try {
            const response = await axios.post(
              "http://127.0.0.1:5000/encrypt-image",
              formData
            );
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "Image_Encrypted_Data.zip");
            document.body.appendChild(link);
            link.click();

            // this.result = response.data;
            // console.log(response.data);


          } catch (error) {
            this.errorStatus = true;
            console.log(error);
          }



          
        } else {
          // handle non-image file encryption
          // TODO do we need this part?
        }
      } else {
        // original data
        // const response = await axios.post('http://127.0.0.1:5000/encrypt-text', { text: this.text, numBlocks: this.numBlocks, enck: this.enck });
        // this.result = response.data;
        // console.log(response.data);
        // GETTING THE ZIP BACK BABY
        // TODO same as text? But also display an image (if possible)
        // const response = await axios.post(
        //   "http://127.0.0.1:5000/encrypt-text",
        //   { text: this.text, numBlocks: this.numBlocks, enck: this.enck },
        //   { responseType: "blob" }
        // );
        // const url = window.URL.createObjectURL(new Blob([response.data]));
        // const link = document.createElement("a");
        // link.href = url;
        // link.setAttribute("download", "Text_Encrypted_Data.zip");
        // document.body.appendChild(link);
        // link.click();
      }
    },
    async decrypt() {
      this.errorStatus = false;
      if (this.file) {
        if (this.isImage) {
          const formData = new FormData();
          formData.append("file", this.file);
          formData.append("numBlocks", this.numBlocks);
          formData.append("enck", this.enck);

          try {
            const response = await axios.post(
              "http://127.0.0.1:5000/decrypt-image",
              formData
            );
            this.result = response.data;
            console.log(response.data);
          } catch (error) {
            this.errorStatus = true;
            console.log(error);
          }
        } else {
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
            this.errorStatus = true;
            console.log(error);
          }
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