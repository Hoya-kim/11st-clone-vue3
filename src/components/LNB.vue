<template>
  <nav
    v-if="done"
    :class="{ show: isShow }">
    <div class="user">
      <a>로그인</a>
      <div class="flex-space"></div>
      <div
        class="close-nav"
        @click="offNav('LNB')"></div>
    </div>
    <div
      class="container"
      @mouseleave="categoryHover = -1">
      <!-- 카테고리 -->
      <div class="group categories">
        <h3 class="group__title">
          카테고리
        </h3>
        <ul class="group__list">
          <li
            v-for="(item1, index) in navigations.categories.list"
            :key="item1.name"
            :class="{ hover: categoryHover === index }"
            @mouseenter="categoryHover = index">
            <div class="category-icon"></div>
            {{ item1.name }}
            <ul class="depth">
              <li
                v-for="item2 in item1.list"
                :key="item2.name">
                <a :href="item2.href">
                  {{ item2.name }}
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!-- 주요 서비스 -->
      <div class="group major-services">
        <div class="group__title">
          주요 서비스
        </div>
        <ul class="group__list">
          <li
            v-for="item in navigations.majorServices.list"
            :key="item.name">
            <a href="item.href">
              {{ item.name }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div
    v-if="isShow"
    class="nav-bg"
    @click="offNav('LNB')"></div>
</template>

<script>
export default {
  data() {
    return {
      navigations: {},
      done: false,
      categoryHover: -1,
    }
  },
  computed: {
    isShow() {
      return this.$store.state.navigation.isShowLNB
    },
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      this.navigations = await this.$fetch({
        requestName: 'navigations',
        endPoint: 'main',
      })
      this.done = true
      console.log(this.navigations)
    },
    offNav(name) {
      this.$store.dispatch('navigation/offNav', name)
    },
  },
}
</script>

<style scoped lang="scss">
  nav {
    width: 300px;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    background-color: #f6f6f6;
    transition:  transform .4s;
    transform: translateX(-300px);

    &.show {
      transform: translateX(0);
    }

    .user {
      height: 70px;
      padding: 0 25px;
      background-color: #fff;
      display: flex;
      align-items: center;
      
      a {
        font-size: 20px;
        font-weight: 700;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }

      .flex-space {
        flex-grow: 1;
      }

      .close-nav {
        width: 36px;
        height: 36px;
        background-image: url("https://trusting-williams-8cacfb.netlify.app/images/globals_2x.png");
        background-position: -261px -203px;
        background-size: 363px;
        cursor: pointer;
      }
    }
    .container {
      height: calc(100% - 164px); // user height 70px + exhibitions height 94px
      padding: 10px 0;
      box-sizing: border-box;
      overflow-y: auto;

      a {
        color: #333;
      }

      .group {
        background-color: #fff;
        margin-bottom: 10px;

        &:last-child {
          margin-bottom: 0;
        }

        &__title {
          padding: 14px 25px;
          font-size: 17px;
          font-weight: 700;
          position: relative;
        }

        &__list {

          li {
            display: flex;
            align-items: center;
            box-sizing: border-box;
            cursor: pointer;
            
            a {
              display: flex;
              align-items: center;
              width: 100%;
              height: 100%;
              box-sizing: border-box;
            }
          }
        }
      }
      // 개별
      .group {
        &.categories {
          .group__list {
            > li {
              height: 50px;
              padding: 0 25px;
              .category-icon {
                width: 24px;
                height: 24px;
                margin-right: 4px;
                background-image: url("https://trusting-williams-8cacfb.netlify.app/images/categories_2x.png");
                background-size: 48px; // Origin 96px
              }
              @for $i from 1 through 13 {
                &:nth-child(#{$i}) {
                  .category-icon {
                    background-position: 0 -#{($i - 1) * 24}px;
                  }
                }
              }
              &.hover {
                background-color: #ff5534;
                color: #fff;
                @for $i from 1 through 13 {
                  &:nth-child(#{$i}) {
                    .category-icon {
                      background-position: -24px -#{($i - 1) * 24}px;
                    }
                  }
                }
              }
              .depth {
                display: none;
                width: 200px;
                height: 100%;
                border-left: 1px solid #eee;
                padding: 20px 0;
                box-sizing: border-box;
                position: fixed;
                top: 0;
                bottom: 0;
                left: 300px;
                background-color: #fff;
                overflow-y: auto;
                font-size: 15px;
                li {
                  height: 40px;
                  a {
                    padding: 0 20px;
                  }
                  &:hover {
                    background-color: #fafafa;
                    color: #ff5534;
                    a {
                      color: #ff5534;
                    }
                  }
                }
              }
              &.hover .depth {
                display: block;
              }
            }
          }
        }
        &.major-services {
          .group__list {
            display: flex;
            flex-wrap: wrap;
            li {
              width: 50%;
              height: 50px;

              a {
                padding-left: 25px;
              }
              
              &:hover {
                background-color: #fafafa;
                color: #ff5534;
                a {
                  color: #ff5534;
                }
              }
            }
          }
        }
      }
    }
  }

  .nav-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(#000, .2);
    z-index: 98;
  }
</style>
