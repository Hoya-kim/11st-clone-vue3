<template>
  <LNB />
  <TheHeader />
</template>

<script>
import LNB from '~/components/LNB'
import TheHeader from '~/components/TheHeader'

export default {
  components: {
    LNB,  // 지역등록
    TheHeader
  }
}
</script>

<style lang="scss" scope>
@import "~/scss/main";
</style>
