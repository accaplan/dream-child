<template>
    <footer
      :class="[
        theme == 'dark' ? 'text-black' : 'text-white',
        'text-center md:m-4'
      ]"
    >
    <SanityContent :blocks="site.about" />
      <!-- {{ currentDate.getFullYear() }} -->
    </footer>
</template>

<script>
export default {
  props: ['theme', 'site'],
  data(){
    return {
      currentDate: new Date,
    }
  }
}
</script>

<style scoped>
footer {
  white-space: pre-line;
}
</style>