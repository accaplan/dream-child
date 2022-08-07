<template>
  <div :style="style" class="exhibition-item">
    <slot/>
    <h3 class="md:fixed text-lg md:text-xl font-mono uppercase bottom-4 right-4">{{ collection.title }}</h3>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: ['exhibition', 'accent'],
  computed: {
    style() {
      return {
        '--accentColor': this.accent
      }
    }
  },
}
</script>

<style lang="postcss">
@media screen and (min-width: 768px) {
  .exhibition-item {
    max-height:100%;
    overflow:overlay;
  }
}

.exhibition-item img:hover {
  border: 1px solid red;
}
</style>
