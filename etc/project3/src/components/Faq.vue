<script>
import RemoteData from '../mixins/RemoteData.js';
export default {
  data() {
    return {
      questions: [],
      error: null,
      // loading: this.remoteDataLoading  !== 0,
    };
  },
  mixins:[
    RemoteData({
      questionList:'questions'
    })
  ],
  async created() {
    // this.loading = true;
    // try {
    //     //  this.questions = await this.$fetch('questions')
    // } catch (error) {
    //     this.error = error;
    // }
    // this.loading = false;
  }
};
</script>

<template>
  <main class="faq">
    <h1>Frenquently Asked Questions</h1>
    <section class="list">
      <article v-for="question of questionList" :key="question.id">
        <h2 v-html="question.title"></h2>
        <p v-html="question.content"></p>
      </article>
    </section>
    <div class="error" v-if="hasRemoteErrors"></div>
    <Loading v-if="remoteDataBusy"/>
  </main>
</template>