<template>
  <div v-show="$route.params.slug" class="exhibition m-4">
    <header>
      <h1 class="my-0 pr-2">{{ exhibition.title }} <br/> {{exhibition.artist}}</h1>
      <span v-if="exhibition.display_date">{{ exhibition.display_date }}</span>
      <a v-if="exhibition.text.length > 0" :class="[displayText ? 'underline' : null, 'block', 'mt-4', 'cursor-pointer']" @click="toggleText()">Text</a>
    </header>
    <div class="zoom-wrapper z-20 fixed top-0 bg-white bottom-0 left-0 right-0 p-0" v-show="zoom">
      <button class="zoom-out right-0 p-4 absolute z-30" @click="zoomOut()">CLOSE</button>
      <div class="indicator left-0 p-4 absolute z-30">{{ index }} / {{ length }}</div>
      <div v-swiper:mySwiper="swiperOptions" @slide-change="handleSlideChange">
        <div class="swiper-wrapper">
          <div class="swiper-slide" :key="image._key" v-for="image in exhibition.images">
             <Figure
                :image="image"
                :mobile="screenWidth < 768 ? true : false"
                :mode="'lightbox'"
                :title="image.title"
                :artist="exhibition.artist"
                :key="image._key"
                :year="image.year"
                :dimensions="image.dimensions"
                :text="image.text"
              />
          </div>
        </div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>
    </div>
    <section class="text grid gap-4 pt-4 pb-8 max-w-2xl">
      <SanityContent v-if="exhibition.text && displayText" :blocks="exhibition.text" class="blurb" />
    </section>
    <section class="images grid gap-4 pt-4 pb-8">
      <Figure
        v-for="image, i in exhibition.images"
        :image="image"
        :key="image._key"
        :mobile="screenWidth < 768 ? true : false"
        @zoom-in="zoomIn(i)"
      />
    </section>
  </div>
</template>

<script>
import { groq } from '@nuxtjs/sanity'
import { mapGetters } from 'vuex'

export default {
  head() {
    return {
      title: this.exhibition.title && this.exhibition.artist ? (this.exhibition.artist.toUpperCase() + ' - ' + this.exhibition.title.toUpperCase()) : 'DREAM CHILD GALLERY',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: this.exhibition.text
        }
      ],
      bodyAttrs: {
        class: ['scroll-horizontal']
      }
    }
  },
  scrollToTop: true,
  computed: {
    ...mapGetters({
      screenWidth: 'getScreenWidth'
    }),
  },
  methods: {
    zoomIn(i) {
      console.log('zoomin ', i)
      this.index = i + 1
      this.length = this.exhibition.images.length
      this.zoom = true
      this.mySwiper.slideTo(i, 100, false)
    },
    zoomOut() {
      this.zoom = false
    },
    handleSlideChange(index) {
      this.index = this.mySwiper.activeIndex + 1
    },
    toggleText() {
      this.displayText = !this.displayText
    }
  },
  data() {
    return {
      displayText: false,
      zoom: false,
      index: 0,
      length: 1,
      swiperOptions: {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        // Some Swiper option/callback...
      }
    }
  },
  asyncData({ route, $sanity }) {
    const query = groq`{
      "exhibition": *[_type == "exhibition" && slug.current == "${route.params.slug}"][0] {
        ...,
        images[] {
          asset->,
          ...
        }
      }
    }`
    return $sanity.fetch(query)
  },
  mounted() {
    console.log('Current Swiper instance object', this.swiper)
  }
}
</script>

<style scoped>
h1 {
  font-weight:normal;
}
section.images {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-auto-columns: 1fr;
  align-items: center;
}
section.text p {
  margin-bottom: 1rem;
}
.swiper-wrapper {
  height: 100vh;
}
.swiper-button-prev, .swiper-button-next {
  bottom: 1rem;
  top: unset;
  color: #000;
}

.swiper-button-prev {
  left: 1rem;
}

.swiper-button-next {
  right: 1rem;
}

.swiper-button-prev:after, .swiper-button-next:after {
  font-size: 24px;
}

@media screen and (max-width: 768px) {
  section.images {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
  .blurb {
    padding: 0 1rem;
  }
}
@media screen and (max-width: 650px) {
  section.images {
    grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  }
}
@media screen and (min-width: 1280px) {
  section.images {
    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  }
}
</style>