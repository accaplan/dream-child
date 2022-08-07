<template>
  <div :class="mode == 'lightbox' ? 'flex md:flex-row flex-col lightbox-wrapper' : null">
    <figure :style="padding" :class="mode" @click="$emit('zoom-in')">
      <img
        class="lazyload"
        data-sizes="auto"
        :src="placeholder"
        :srcset="`${placeholder} 1w`"
        :data-src="src"
        :data-srcset="srcset"
        :alt="`${title}, ${year}`"
      />
    </figure>
    <figcaption class="w-auto md:w-[40%] m-4 mt-8 lg:mt-0 lg:w-[33%] lg:mr-[100px]" v-if="mode == 'lightbox' && title">
      {{ artist }}<br />
      <i>{{ title }}</i>, {{ year }}<br />
      <a @click="toggleDetails()" class="md:hidden inline-block mt-2 md:mt-0 cursor-pointer">Details <span v-if="showDetails === false">+</span><span v-if="showDetails === true">–</span></a>
      <div :class="['details', showDetails === false ? 'hidden md:block' : null]">
        {{ dimensions }}<br />
        {{ text }}
      </div>
    </figcaption>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: Object
    },
    title: {
      type: String
    },
    artist: {
      type: String
    },
    year: {
      type: String
    },
    dimensions: {
      type: String
    },
    text: {
      type: String
    },
    mobile: {
      type: Boolean
    },
    mode: {
      type: String
    }
  },
  data() {
    return {
      showDetails: false
    }
  },
  methods: {
    toggleDetails() {
      this.showDetails = !this.showDetails
    }
  },
  computed: {
    src() {
      return this.$urlFor(this.image).size(1440)
    },
    placeholder() {
      return this.$urlFor(this.image).size(88)
    },
    srcset() {
      let set = `
        ${this.$urlFor(this.image).size(640)} 320w,
        ${this.$urlFor(this.image).size(960)} 480w,
        ${this.$urlFor(this.image).size(1440)} 720w
      `
      return set
    },
    styles() {
      return {
        color: this.image.asset.metadata.palette.dominant.foreground
      }
    },
    padding() {
      return {
        paddingBottom: `${this.image.asset.metadata.dimensions.height/this.image.asset.metadata.dimensions.width*100}%`,
        paddingRight: `unset`
      }
    }
  },
  mounted() {
  },
}
</script>

<style scoped>
figure {
  position: relative;
  height: 0;
	display: block;
	width: 100%;
}
figure > * {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: block;
}
figcaption {
  white-space: pre-line;
}
img {
  image-rendering: pixelated;
}
figure.lightbox {
  position: relative;
	display: block;
	width: 100%;
  flex: 1;
}
figure > * {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: block;
}
figure.lightbox img {
  max-height:100vh;
  height:100vh;
  max-width: 100vw;
  object-fit: contain;
}
figure.lightbox:hover img {
  border: none;
}
@media screen and (min-width:768px) {
  figure {
    height: auto;
    width: 100%;
  }
}
@media screen and (max-width: 767px) {
  .lightbox-wrapper {
    height:100vh;
  }
  figure.lightbox {
    width: 100%;
    padding: 0 !important;
  }
  figure.lightbox img {
    max-height: 100%;
    max-width: 100%;
    position: relative;
  }
  .lightbox-wrapper figcaption {
    order: -1;
    pointer-events: all;
  }
}
</style>