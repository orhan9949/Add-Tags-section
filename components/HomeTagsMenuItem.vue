<template>
  <div class="home-tags__menu-item" :data-slug=" menuItem.slug " :id=" menuItem.id " @click="$emit('getPosts')">
    {{ menuItem.name }}
  </div>
</template>
<script>
  export default {
    name: 'HomeTagsMenuItem',
    props: {
      menuItem: {
        type: Array
      }
    }
  }
</script>