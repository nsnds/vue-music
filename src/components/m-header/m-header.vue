<template>
  <div class="m-header">
    <div class="icon"></div>
    <h1 class="text">Vue Music</h1>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'

  .m-header
    position: relative
    height: 44px
    text-align: center
    color: #color-theme
    font-size: 0

    .icon
      display: inline-block
      vertical-align: top
      margin: 6px 9px auto auto
      width: 30px
      height: 32px
      bg-image('logo')
      background-size: 30px 32px

    .text
      display: inline-block
      vertical-align: top
      line-height: 44px
      font-size: $font-size-large
    .mine
      postion: absolute
      top: 0
      right: 0

      .icon-mine
        dispaly: block
        padding: 12px
        font-size: 20px
</style>
