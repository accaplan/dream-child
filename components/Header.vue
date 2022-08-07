<template>
  <header class="p-4 w-auto m-auto flex justify-center">
    <h1>
      <NuxtLink to="/" replace exact>
        Dream Child Gallery
      </NuxtLink>
    </h1>
  </header>
</template>

<script>
export default {
  props: ['theme', 'accent'],
}
</script>

<style @lang="postcss" scoped>
header {
  width: auto;
}
</style>
