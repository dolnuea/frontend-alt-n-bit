<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" lg="4">
        <v-avatar size="200">
          <v-img src="https://avatars.githubusercontent.com/u/32684258?v=4" />
        </v-avatar>
        <v-card-title class="text-center mt-3">
          <h3>Luna Dagci</h3>
        </v-card-title>
        <v-card-subtitle class="text-center mb-3">
          Master of Science Student in Computer Science,
          <br>
           SUNY Albany
        </v-card-subtitle>
        <v-card-actions>
          <v-btn size="x-large" color="blue" fab href="https://www.linkedin.com/in/dolunay-dagci/" icon="mdi-linkedin"></v-btn>
          <v-btn size="x-large" color="primary" fab href="https://github.com/dolnuea" icon="mdi-github"></v-btn>
        </v-card-actions>
      </v-col>
      <v-col cols="12" md="6" lg="4">
        <v-avatar size="200">
          <v-img src="https://avatars.githubusercontent.com/u/58919856?v=4" />
        </v-avatar>
        <v-card-title class="text-center mt-3">
          <h3>Jake Clouse</h3>
        </v-card-title>
        <v-card-subtitle class="text-center mb-3">
          Master of Science Student in Computer Science,
          <br>
           SUNY Albany
        </v-card-subtitle>
        <v-card-actions>
          <v-btn size="x-large" color="blue" fab href="https://www.linkedin.com/in/jpclouse/" icon="mdi-linkedin"></v-btn>
          <v-btn size="x-large" color="primary" fab href="https://github.com/jacobpclouse" icon="mdi-github"></v-btn>
        </v-card-actions>
      </v-col>
      <v-col cols="12" md="12" lg="4">
        <v-avatar size="200">
          <v-img src="https://www.cs.albany.edu/~patrey/index_files/pkatrey_homepage.JPG" />
        </v-avatar>
        <v-card-title class="text-center mt-3">
          <h3>Dr. Pradeep Atrey</h3>
        </v-card-title>
        <v-card-subtitle class="text-center mb-3">
          Computer Science Professor, SUNY Albany
        </v-card-subtitle>
        <v-card-actions>
          <v-btn size="x-large" color="primary" fab href="https://www.cs.albany.edu/~patrey/" icon="mdi-link"></v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
    
    <v-row>
      <v-col cols="12" md="12" lg="12">
        <v-card-text class="text-center mt-5">
          <h2>Our Motivation</h2>
        <p>We wanted to tackle something that would be challenging but also have real world applications. As we have learned in our 526 class, just because a cipher seems to be secure doesn’t mean that it is. This paper has explored post-encryption pattern (PEP) left behind by RSA and alerted us how this can be used to help unravel a cipher. It explores the idea of adding additional processes to obfuscate the residual data and make a rock-solid cipher.</p>
      </v-card-text>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import jake from '@/assets/jake.jpeg'
import luna from '@/assets/luna.jpeg'
import atrey from '@/assets/pkatrey.jpeg'


export default {
  
}
</script>

<style scoped>
h2 {
  font-size: 2rem;
  margin-bottom: 0;
}

p {
  margin-top: 0;
  font-size: 1.2rem;
}

.v-btn {
  margin-right: 8px;
}
</style>
