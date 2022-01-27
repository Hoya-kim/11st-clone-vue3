<template>
  <header>
    <div class="inner">
      <div
        class="open-nav-drawer"
        @click="onNav">
      </div>
      <a
        href="/"
        class="logo"></a>
      <div class="search">
        <input
          v-model="searchText"
          placeholder="찾고 싶은 상품을 검색해 보세요!"
          @keypress.enter="search" />
        <div
          class="search__icon"
          @click="search"></div>
      </div>
      <div class="ranking">
        <div
          ref="swiper"
          class="swiper">
          <div class="swiper-wrapper">
            <div
              v-for="(rank, index) in rankings.rankings"
              :key="rank.name"
              class="swiper-slide">
              <a :href="rank.href">
                <span class="index">{{ index + 1 }}</span>
                <span class="name">{{ rank.name }}</span>
              </a>
            </div>
          </div>
        </div>
        <div
          class="open-more"
          @click="toggleRankingWrap"></div>
        <div 
          v-if="isShowRankingWrap"
          class="ranking-wrap">
          <!-- wrap: title -->
          <div class="title">
            <h3>실시간 쇼핑 검색어</h3>
            <div class="time">
              <!-- 기준 날짜 -->
              {{ referenceDate }} 기준
            </div>
            <div
              class="close-wrap"
              @click="toggleRankingWrap"></div>
          </div>
          <!-- wrap: tabs -->
          <ul class="tabs">
            <li class="tab">
              1~10위
            </li>
            <li class="tab">
              11~20위
            </li>
          </ul>
          <!-- wrap: list -->
          <ul class="list">
            <li
              v-for="(rank, index) in filteredRankings"
              :key="rank.name"
              class="list-keywords">
              <a href="rank.href">
                <span class="index">인덱스</span>
                <span class="name">{{ rank.name }}</span>
                <span class="relative-name">{{ rank.relativeName }}</span>
              </a>
              <div :class="`icon ${rank.status}`"></div>
            </li>
          </ul>
        </div>
      </div>
      <div class="user-menu">
      </div>
    </div>
  </header>
</template>

<script>
import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'

export default {
  data() {
    return {
      searchText: '',
      rankings: {},
      isShowRankingWrap: false,
    }
  },
  computed: {
    filteredRankings() {
      // @TODO: 1~10, 11~20 필터처리
      return this.rankings.rankings
    },
    referenceDate() {
      const date = new Date(this.rankings.referenceDate)
      
      let [month, day] = [date.getMonth() + 1, date.getDate()]
      let [hour, minute] = [date.getHours(), date.getMinutes()]

      month = month >= 10 ? month : '0' + month
      day = day >= 10 ? day : '0' + day
      hour = hour >= 10 ? hour : '0' + hour
      minute = minute >= 10 ? minute : '0' + minute
      
      return [date.getFullYear(), month, day].join('.') + ' ' + [hour, minute].join(':')
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      this.rankings = await this.$fetch({
        requestName: 'rankings',
        endPoint: 'main',
      })

      await this.$nextTick()  // 콜백으로 넘겨줘도 됨

      // new Swiper(요소, 옵션)
      new Swiper(this.$refs.swiper, {
        direction: 'vertical',
        speed: 1000,
        autoplay: {
          delay: 3000,
        },
        loop: true,
      })
    },
    onNav() {
      this.$store.dispatch('navigation/onNav')
    },
    async search() {
      const result = await this.$fetch({
        endPoint: 'search',
        searchText: this.searchText,
      })
      console.log(result)
    },
    toggleRankingWrap() {
      this.isShowRankingWrap = !this.isShowRankingWrap
    },
  },
}
</script>

<style lang="scss" scoped>
header {
  background-color: #fff;
  
  &.fixed {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 97;
    box-shadow: 0 2px 8px rgba(#000, .07);
    
    .inner {
      height: 80px;
    }
  }

  .inner {
    height: 120px;
    display: flex;
    align-items: center;
  }

  .open-nav-drawer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    cursor: pointer;
    box-shadow:
      0 2px 6px rgba(#000,.06),
      0 0 1px rgba(#000,.4);
    &::after {
      content: "";
      display: block;
      width: 36px;
      height: 36px;
      background-image: url("https://trusting-williams-8cacfb.netlify.app/images/globals_2x.png");
      background-position: -302px -203px;
      background-size: 363px;
    }
  }
  .logo {
    width: 94px;
    height: 40px;
    margin: 0 24px;
    background-image: url("https://trusting-williams-8cacfb.netlify.app/images/globals_2x.png");
    background-position: -162px 0;
    background-size: 363px;
    cursor: pointer;
  }
  .search {
    position: relative;
    input {
      width: 500px;
      height: 50px;
      padding: 0 27px;
      border: 1px solid #ddd;
      border-radius: 25px;
      box-sizing: border-box;
      background-color: #fafafa;
      outline: none;
      font-size: 18px;
      font-family: 'Noto Sans KR', sans-serif;
      &::placeholder {
        color: #bbb;
      }
    }
    &__icon {
      width: 50px;
      height: 50px;
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;
      background-image: url("https://trusting-williams-8cacfb.netlify.app/images/globals_2x.png");
      background-position: -162px -45px;
      background-size: 363px;
    }
  }
  .ranking {
    width: 210px;
    position: relative;
    margin: 0 30px;
    .swiper {
      width: 182px;
      height: 28px;
      margin: 0;
      .swiper-slide {
        transition: .4s;
        opacity: 0;
        a {
          display: block;
          height: 28px;
          line-height: 28px;
          text-decoration: none;
          font-size: 15px;
          color: #333;
          font-weight: 700;
          .index {
            margin-right: 10px;
            color: #f43142;
            font-style: italic;
          }
          &:hover .name {
            color: #f43142;
          }
        }
        &.swiper-slide-active {
          opacity: 1;
        }
      }
    }
    .open-more {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 1; // Required! Cause Swiper.
      cursor: pointer;
      user-select: none; // 실시간 쇼핑 검색어가 자동으로 선택(Selection)되는 것을 방지.
      &:hover {
        background-color: #ececec;
      }
      &::after {
        content: "";
        display: block;
        width: 7px;
        height: 7px;
        margin-top: -3px;
        border: solid #999;
        border-width: 0 1px 1px 0;
        box-sizing: border-box;
        transform: rotate(45deg);
      }
    }
    .ranking-wrap {
      position: absolute;
      top: 44px;
      z-index: 2;
      width: 410px;
      padding: 18px 25px 25px;
      border: 1px solid #eee;
      border-radius: 4px;
      box-sizing: border-box;
      box-shadow: 0 6px 24px rgba(#000,.1);
      background-color: #fff;
      .title {
        display: flex;
        align-items: flex-end;
        h3 {
          font-size: 17px;
          font-weight: 700;
        }
        .time {
          margin-left: 10px;
          font-size: 13px;
          color: #999;
          flex: 1;
        }
        .close-wrap {
          width: 36px;
          height: 36px;
          background-image: url("https://trusting-williams-8cacfb.netlify.app/images/globals_2x.png");
          background-position: -261px -203px;
          background-size: 363px;
          cursor: pointer;
          margin: -6px -10px;
          transform: scale(.6666); // from 36px to 24px
        }
      }
      .tabs {
        height: 40px;
        margin: 18px 0;
        border: 1px solid #eee;
        box-sizing: border-box;
        background-color: #fafafa;
        display: flex;
        .tab {
          flex: 1;
          color: #7d7d7d;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          &:first-child {
            border-right: 1px solid #eee;
          }
          &.active {
            background-color: #fff;
            font-weight: 700;
            color: #333;
          }
        }
      }
      .list {
        li {
          position: relative;
          margin-top: 14px;
          &:first-child {
            margin-top: 0;
          }
          a {
            display: block;
            height: 22px;
            line-height: 22px;
            text-decoration: none;
            font-size: 15px;
            color: #000;
            .index {
              font-weight: 700;
              margin-right: 10px;
              color: #f43142;
              font-style: italic;
            }
            .relative-name {
              margin-left: 4px;
              font-size: 13px;
              color: #999;
            }
          }
          .icon {
            position: absolute;
            top: 0;
            right: 0;
            width: 22px;
            height: 22px;
            background-image: url("https://trusting-williams-8cacfb.netlify.app/images/globals_2x.png");
            background-size: 363px;
            &.stay {
              background-image: none;
              &::after {
                content: "";
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                margin: auto;
                width: 6px;
                height: 2px;
                background: #999;
              }
            }
            &.up {
              background-position: -110px -251px;
            }
            &.down {
              background-position: -58px -251px;
            }
          }
        }
      }
    }
  }
}
</style>
