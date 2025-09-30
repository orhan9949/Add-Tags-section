<template>
  <div class="post-loop">
    <figure class="post-loop__media">

      <img
          v-if="post.image"
          :src=" post.image "
          :alt=" post.title "
          class="post-loop__image">
      <img
          v-else
          src="images/post-image-default.svg"
          :alt=" post.title "
          class="post-loop__image"
      >

      <div class="post-loop__badge">
        <div
            class="category-badge"
            :class="'category-badge--type-'+post.post_category.slug">{{ post.post_category.name }}</div>
      </div><!-- .post-loop__badge -->

      <a :href=" post.link " class="post-loop__media-link">{{ 'Read more - ' +post.title }}</a>

    </figure><!-- .post-loop__media -->

    <div class="post-loop__content">
      <div class="post-loop__header">
        <p class="post-loop__title">
          <a :href=" post.link " rel="bookmark" class="post-loop__link">
            {{ post.title }}
          </a>
        </p>
      </div><!-- .post-loop__header -->

      <div class="post-loop__meta">
        <time :datetime=" post.date ">{{ post.format_date }}</time>
      </div><!-- .post-loop__meta -->

    </div><!-- .post-loop__content -->

  </div><!-- .post-loop -->

</template>

<script>

export default {
  name: 'MenuTagsItem.vue',
  props: {
    post: {
      type: Array
    }
  }
}
</script>