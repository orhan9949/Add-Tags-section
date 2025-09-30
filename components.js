import { createApp } from 'vue';
import NewsletterForm from './components/NewsletterForm.vue';
import HomeTagsSection from './components/HomeTagsSection.vue';

const homeTagsSection = document.querySelector('.home-tags');

if (homeTagsSection) {

  createApp(HomeTagsSection, { ...homeTagsSection.dataset }).mount('.home-tags');

  const newsletterForms = document.querySelectorAll('.home-tags .newsletter-form-container');

  newsletterForms.forEach(function (el) {
    createApp(NewsletterForm, { ...el.dataset }).mount(el);
  });
}