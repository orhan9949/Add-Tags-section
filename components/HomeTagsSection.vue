<template>
    <div class="home-tags__section">
      <div class="home-tags__container">

        <div class="home-tags__menu">

          <HomeTagsMenuItem
              v-for="( item, index ) in menu_arr"
              :key="index"
              :class="{'active':item.id === tag_id}"
              :menuItem="item"
              @getPosts="get_posts(item.id)"
          />

        </div>

        <div class="home-tags__items">
          <div class="loader" v-if=" loader === true "></div>

          <HomeTagsItem
              v-for="( item, index ) in posts_arr"
              :key="index"
              :post="item"
              :class="{'active':tr}"
          />

        </div>
        <div class="home-tags__btn-container">
          <div class="home-tags__btn-item">
            <a :href=" tag_url " class="home-tags__btn button button--style-ghost">{{ tag_name_btn }}</a>
          </div>
        </div>

      </div>
      <div class="home-tags__form-block">
        <div class="home-tags__form">
          <svg  aria-hidden="true" >
            <use xlink:href="#icon-letter"></use>
          </svg>
          <div class="newsletter-form-container" data-id="104194351428535361"></div>
        </div>
      </div>
    </div>

</template>


<script>
import {decode} from 'html-entities';
import HomeTagsMenuItem from './HomeTagsMenuItem.vue';
import HomeTagsItem from './HomeTagsItem.vue';
export default {
  name: 'HomeTagsSection',
  components: {
    HomeTagsMenuItem, HomeTagsItem
  },
  props: {
    tags: {
      type: Array
    }
  },
  data() {
    return {
      tags_arr: this.tags.split(','),
      tag_name_btn: '',
      tag_url: '',
      tag_id: '',
      menu_arr: [],
      posts_arr: [],
      loader: false,
      tr: true
    }
  },
  mounted() {
    this.get_tags();
    this.get_posts(this.tags_arr[0]);
  },
  methods: {
    get_tags() {
      for (let tag of this.tags_arr) {
        fetch('/wp-json/wp/v2/tags/' + tag + '?_fields=id,name,slug,link')
          .then((response) => response.json())
          .then((e) => this.menu_arr.push(e))
          .then(() => {
            this.tag_name_btn = `view all ${this.menu_arr[0].name} news`;
            this.tag_url = this.menu_arr[0].link;
            this.tag_id = this.menu_arr[0].id;
          })
      }
    },

    get_posts(tag) {
      for(let e of this.menu_arr) {
        if(e.id === tag){
          this.tag_name_btn = `view all ${e.name} news`;
          this.tag_url = e.link;
          this.tag_id = e.id;
        }
      }
      this.loader = true;

      this.posts_arr = [];

      fetch('/wp-json/wp/v2/posts?tags=' + tag + '&_embed=wp:featuredmedia,wp:term&_fields=title,date,id,link,_links.wp:featuredmedia,_links.wp:term,_embedded,categories&per_page=8')
      .then((response) => response.json())
      .then((data) => {
        for(let e of data){
          e.title = decode(e.title.rendered, {level: 'html5'});
          e.image = e._embedded['wp:featuredmedia'][0].media_details.sizes['legacy-medium'].source_url;
          e.format_date = this.format_date(e.date);
          e.post_category = '';

          let wpTermArr = e._embedded['wp:term'].filter(function(number) {
            return number.length > 0;
          });

          let wpTermArrNew = [];

          for(let i of wpTermArr){
            for(let ii of i) {
              wpTermArrNew.push(ii);
            }
          }

          for(let i of wpTermArrNew){
            if(i.taxonomy === 'category'){
              e.post_category = i;
            }
          }

          this.posts_arr.push(e);
        }
      })

      .then(() => {

        this.loader = false;

      })
    },

    format_date(date){
      let post_date = new Date(date);
      let month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(post_date);
      let day = post_date.getDate();
      let year = post_date.getFullYear();
      let time = post_date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
      let total = `${month} ${day}, ${year} at ${time.toLowerCase()} `;
      return total;
    }
  }
}
</script>