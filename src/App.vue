<template>
  <LNB />
  <TheHeader />
  <RNB />
</template>

<script>
import LNB from '~/components/LNB'
import RNB from '~/components/RNB'
import TheHeader from '~/components/TheHeader'

export default {
  components: {
    LNB,  // 지역등록
    TheHeader,
    RNB,
  },
}
</script>

<style lang="scss" scope>
@import "~/scss/main";
</style>
