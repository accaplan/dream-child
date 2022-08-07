<template>
  <main class="index z-0">
    <section>
      <article
          class="text-md"
          v-for="item in site.featured"
          :key="item._key"
        >
        <NuxtLink :to="`/exhibitions/${item.slug.current}`">
          <div>
            <h2 class="flex flex-col sm:flex-row sm:justify-center m-4">
              <div class="md:w-[25%] w-[100%]"><span :style="accentColor">{{ item.title }}</span><br>{{ item.artist}}</div>
              <div class="md:w-[25%] w-[100%] sm:text-right">{{ item.display_date }}</div>
            </h2>
            <img :src="item.cover.asset.url" />
          </div>
        </NuxtLink>
      </article>
    </section>
  </main>
</template>

<style scoped>
article {
  max-height:100vh;
}
article img {
  object-fit: contain;
  height: 70vh;
  width: 100vw;
}
</style>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  data() {
    return {
      theme: 'light'
    }
  },
  computed: {
    ...mapState({
      site: state => state.site,
      accent: state => state.accent
    })
  },
  methods: {
    ...mapMutations(['setTheme', 'setAccent']),
  },
  beforeMount() {
    // this.setAccent(this.banner.image.metadata.palette.dominant.background)
    // if (this.banner.image.metadata.palette.dominant.foreground == "#000") {
    //   this.theme = 'dark'
    //   this.setTheme('dark')
    // } else {
    //   this.theme = 'light'
    //   this.setTheme('light')
    // }
    this.theme = 'light'
    this.setTheme = 'light'
  },
  mounted() {
    console.log(this.site)
  },
  beforeDestroy() {
  }
}
</script>
