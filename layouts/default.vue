<template>
  <div
    :class="[
      theme,
      theme == 'light' ? 'bg-black' : '',
      'min-h-screen'
    ]"
  >
    <Header :theme="theme" :accent="accent" />
    <Nuxt :nuxt-child-key="$route.name" />
    <Footer :theme="theme" :site="site" />
  </div>
</template>

<style>
html, body {
  cursor: url('data:image/x-icon;base64,AAACAAEAICAQAAAAAADoAgAAFgAAACgAAAAgAAAAQAAAAAEABAAAAAAAAAIAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAD/AKPu9wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARAAAAAAAAAAAAAAAAAAAAEQAAAAAAAAAAAAARAAAAESIAAAAAAAAAAAAAEQAAABEiAAAAAAAAAAAAABEAABEiAAAAAAAAAAAAAAARAAARIgAAAAAAAAAAAAAREQARIgAAAAAAAAAAAAAAEREAESIAAAAAAAAAAAAAABERESIAAAAAAAAAAAAAAAAREREiAAAAAAAAAAAAAAARERERERERAAAAAAAAAAAAEREREREREQAAAAAAAAAAABERERERIiIAAAAAAAAAAAARERERESIiAAAAAAAAAAARERERIiIAAAAAAAAAAAAAERERESIiAAAAAAAAAAAAABERIiIAAAAAAAAAAAAAAAARESIiAAAAAAAAAAAAAAARIiIAAAAAAAAAAAAAAAAAESIiAAAAAAAAAAAAAAAAESIAAAAAAAAAAAAAAAAAABEiAAAAAAAAAAAAAAAAAAD////////////////////////////////////////////////////////D////w///DwP//w8D//8MD///DA///AA///wAP//8AP///AD///AAD//wAA//8AAP//AAD//AAP//wAD//8AP///AD///AP///wD///8P////D////w=='), auto;
  font-smooth: never;
  -webkit-font-smoothing: none;
}
</style>

<script>
import { mapMutations, mapGetters } from 'vuex'


export default {
  head() {
    return {
      title: this.site.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: this.site.description
        }
      ],
    }
  },
  computed: {
     ...mapGetters({
      theme: 'getTheme',
      accent: 'getAccent',
      site: 'getSite'
    })
  },
}
</script>
