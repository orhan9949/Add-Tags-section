<template>
  <div class="newsletter-form">
    <h3 class="newsletter-form__title">Sign up for our free newsletters</h3>
    <p class="newsletter-form__description">
      Get crypto analysis, news and updates right to your inbox! Sign up here so
      you don't miss a single newsletter.
    </p>
    <div class="newsletter-form__main">
      <ul v-if="errors.length" class="newsletter-form__error">
        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
      </ul>
      <div v-if="success" class="newsletter-form__success">
        You have successfully joined! Please check your inbox and confirm email!
      </div>
      <p>
        <input
          v-model="email"
          type="email"
          name="email"
          placeholder="Enter your email address"
          class="newsletter-form__field"
        />
      </p>
      <div class="newsletter-form__groups">
        <div class="newsletter-form__group">
          <input
            type="checkbox"
            id="newsletter-form-group-recap"
            value="82101723852703208"
            v-model="groups"
            checked
          />
          <label for="newsletter-form-group-recap"> The Recap </label>
        </div>
        <div class="newsletter-form__group">
          <input
            type="checkbox"
            id="newsletter-form-group-markets"
            value="104096097448757090"
            v-model="groups"
          />
          <label for="newsletter-form-group-markets">The Market Outlook </label>
        </div>
        <div class="newsletter-form__group">
          <input
            type="checkbox"
            id="newsletter-form-group-alpha"
            value="111964147807159491"
            v-model="groups"
          />
          <label for="newsletter-form-group-alpha"> Alpha Beat</label>
        </div>
      </div>
      <p>
        <button
          type="button"
          name="submit"
          class="newsletter-form__button button button--size-large"
          @click="subscribe"
          ref="button"
        >
          Subscribe
        </button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewsletterForm',
  props: {
    id: String,
    track: String,
  },
  data() {
    return {
      email: '',
      groups: ['82101723852703208', '104096097448757090', '111964147807159491'],
      success: false,
      errors: [],
    };
  },
  mounted() {
    if ('true' === this.track) {
      fetch(this.getTrack());
    }
  },
  methods: {
    getAction() {
      return (
        'https://assets.mailerlite.com/jsonp/3416184/forms/' +
        this.id +
        '/subscribe'
      );
    },
    getTrack() {
      return (
        'https://assets.mailerlite.com/jsonp/3416184/forms/' + this.id + '/takel'
      );
    },
    subscribe() {
      this.success = false;
      this.errors = [];

      this.$refs.button.blur();

      const formData = new FormData();

      formData.append('fields[email]', this.email);
      formData.append('fields[groups]', this.groups);

      fetch(this.getAction(), {
        method: 'post',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            this.success = true;
            this.email = '';
          } else {
            for (const field in data.errors.fields) {
              this.errors = [...this.errors, ...data.errors.fields[field]];
            }
          }
        });
    },
  },
};
</script>
