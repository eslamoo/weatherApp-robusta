<template>
  <div id="app" class="app-wrapper" v-if="location && currentTemp">
    <loading
      :active.sync="loading"
      :can-cancel="false"
      color="#2C556D"
      :z-index="9"
      :is-full-page="fullPage"
    ></loading>
    <div class="header">
      <div class="container">
        <div class="row justify-content-between align-items-center">
          <div class="header__title text-left pl-2">
            <h3 class="header__title--heading mb-0">INSTAWEATHER</h3>
          </div>
          <div class="header__toggle text-right pr-2">
            <button
              class="header__toggle--tempType"
              :class="{ active: tempType === 'SI' }"
              @click="tempType = 'SI'"
              :disabled="tempType == 'SI'"
            >
              C
            </button>
            <button
              class="header__toggle--tempType"
              :class="{ active: tempType === 'F', Feh: tempType === 'F' }"
              @click="tempType = 'F'"
              :disabled="tempType == 'F'"
            >
              F
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="showcase ">
      <div class="container">
        <div class="row align-items-start">
          <div class="showcase__info col-6 text-left">
            <h1 class="showcase__info--city">{{ cityName }}</h1>
            <p class="showcase__info--date">
              {{ moment().format("dddd MM, YYYY") }}
            </p>
            <img
              class="tempDetails__horizontal-container__outer--inner-content--img"
              src="../public/icons/night_full_moon_clear.png"
              width="100"
              v-if="currentTemp && currentTemp.icon == 'clear-night'"
              :alt="currentTemp.icon"
            />
            <img
              class="tempDetails__horizontal-container__outer--inner-content--img"
              src="../public/icons/day_clear.png"
              width="100"
              v-if="currentTemp && currentTemp.icon == 'clear-day'"
              :alt="currentTemp.icon"
            />
            <img
              class="tempDetails__horizontal-container__outer--inner-content--img"
              src="../public/icons/day_partial_cloud.png"
              width="100"
              v-if="currentTemp && currentTemp.icon == 'partly-cloudy-day'"
              :alt="currentTemp.icon"
            />
            <img
              class="tempDetails__horizontal-container__outer--inner-content--img"
              src="../public/icons/night_full_moon_partial_cloud.png"
              width="100"
              v-if="currentTemp && currentTemp.icon == 'partly-cloudy-night'"
              :alt="currentTemp.icon"
            />
            <img
              class="tempDetails__horizontal-container__outer--inner-content--img"
              src="../public/icons/rain.png"
              width="100"
              v-if="currentTemp && currentTemp.icon == 'rain'"
              :alt="currentTemp.icon"
            />
            <img
              class="tempDetails__horizontal-container__outer--inner-content--img"
              src="../public/icons/fog.png"
              width="100"
              v-if="currentTemp && currentTemp.icon == 'fog'"
              :alt="currentTemp.icon"
            />
            <img
              class="tempDetails__horizontal-container__outer--inner-content--img"
              src="../public/icons/snow.png"
              width="100"
              v-if="currentTemp && currentTemp.icon == 'snow'"
              :alt="currentTemp.icon"
            />
            <img
              class="tempDetails__horizontal-container__outer--inner-content--img"
              src="../public/icons/sleet.png"
              width="100"
              v-if="currentTemp && currentTemp.icon == 'sleet'"
              :alt="currentTemp.icon"
            />
            <img
              class="tempDetails__horizontal-container__outer--inner-content--img"
              src="../public/icons/wind.png"
              width="100"
              v-if="currentTemp && currentTemp.icon == 'wind'"
              :alt="currentTemp.icon"
            />
            <img
              class="tempDetails__horizontal-container__outer--inner-content--img"
              src="../public/icons/cloudy.png"
              width="100"
              v-if="currentTemp && currentTemp.icon == 'cloudy'"
              :alt="currentTemp.icon"
            />
            <p class="showcase__info--summary">{{ currentTemp.summary }}</p>
          </div>
          <div class="showcase__temp col-6 text-right">
            <h1 class="showcase__temp--degree">
              {{ currentTemp.temperature.toFixed(0)
              }}<span class="temp">°</span>
            </h1>
            <h4 class="showcase__temp--LowHigh my-4" v-if="dailyTemp && dailyTemp.data">
              {{  dailyTemp.data[0].temperatureMax.toFixed(0)
              }}<span class="temp">°</span>/
              {{   dailyTemp.data[0].temperatureMin.toFixed(0)
              }}<span class="temp">°</span>
            </h4>
            <p class="showcase__temp--summary">{{ hourlyTemp.summary }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="tempDetails mt-5">
      <div class="container">
        <b-tabs v-model="tabIndex" card>
          <b-tab title="Hourly">
            <horizontal-scroll class="tempDetails__horizontal-container">
              <div class="tempDetails__horizontal-container__outer px-0">
                <div
                  v-for="(temp, i) in hourlyTemp.data"
                  :key="i"
                  class="tempDetails__horizontal-container__outer--inner-content text-center"
                >
                  <p
                    v-if="
                      moment().diff(moment(temp.time * 1000), 'minutes') > 1
                    "
                    class="tempDetails__horizontal-container__outer--inner-content--time mb-1"
                  >
                    Now
                  </p>
                  <p
                    v-else
                    class="tempDetails__horizontal-container__outer--inner-content--time mb-1"
                  >
                    {{ moment(temp.time * 1000).format("LT") }}
                  </p>
                  <img
                    class="tempDetails__horizontal-container__outer--inner-content--img"
                    src="../public/icons/night_full_moon_clear.png"
                    width="70"
                    v-if="temp.icon == 'clear-night'"
                    alt=""
                  />
                  <img
                    class="tempDetails__horizontal-container__outer--inner-content--img"
                    src="../public/icons/day_clear.png"
                    width="70"
                    v-if="temp.icon == 'clear-day'"
                    alt=""
                  />
                  <img
                    class="tempDetails__horizontal-container__outer--inner-content--img"
                    src="../public/icons/day_partial_cloud.png"
                    width="70"
                    v-if="temp.icon == 'partly-cloudy-day'"
                    alt=""
                  />
                  <img
                    class="tempDetails__horizontal-container__outer--inner-content--img"
                    src="../public/icons/night_full_moon_partial_cloud.png"
                    width="70"
                    v-if="temp.icon == 'partly-cloudy-night'"
                    alt=""
                  />
                  <img
                    class="tempDetails__horizontal-container__outer--inner-content--img"
                    src="../public/icons/rain.png"
                    width="70"
                    v-if="temp.icon == 'rain'"
                    alt=""
                  />
                  <img
                    class="tempDetails__horizontal-container__outer--inner-content--img"
                    src="../public/icons/fog.png"
                    width="70"
                    v-if="temp.icon == 'fog'"
                    alt=""
                  />
                  <img
                    class="tempDetails__horizontal-container__outer--inner-content--img"
                    src="../public/icons/snow.png"
                    width="70"
                    v-if="temp.icon == 'snow'"
                    alt=""
                  />
                  <img
                    class="tempDetails__horizontal-container__outer--inner-content--img"
                    src="../public/icons/sleet.png"
                    width="70"
                    v-if="temp.icon == 'sleet'"
                    alt=""
                  />
                  <img
                    class="tempDetails__horizontal-container__outer--inner-content--img"
                    src="../public/icons/wind.png"
                    width="70"
                    v-if="temp.icon == 'wind'"
                    alt=""
                  />
                  <img
                    class="tempDetails__horizontal-container__outer--inner-content--img"
                    src="../public/icons/cloudy.png"
                    width="70"
                    v-if="temp.icon == 'cloudy'"
                    alt=""
                  />
                  <p
                    class="tempDetails__horizontal-container__outer--inner-content--temp mt-2"
                  >
                    {{ temp.temperature.toFixed(0)
                    }}<span class="temp1">°</span>
                  </p>
                </div>
              </div>
            </horizontal-scroll>
          </b-tab>
          <b-tab title="Daily">
            <horizontal-scroll class="tempDetails__horizontal-container">
              <div class="tempDetails__horizontal-container__outer px-0">
                <div
                  v-for="(temp, i) in dailyTemp.data"
                  :key="i"
                  class="tempDetails__horizontal-container__outer--inner-content daily text-center"
                >
                  <p
                    v-if="moment(temp.time * 1000).isSame(moment(), 'day')"
                    class="tempDetails__horizontal-container__outer--inner-content--time mb-1"
                  >
                    Today
                  </p>
                  <p
                    v-else-if="
                      moment(temp.time) ==
                        moment()
                          .startOf('day')
                          .add(1, 'day')
                          .unix()
                    "
                    class="tempDetails__horizontal-container__outer--inner-content--time mb-1"
                  >
                    Tomorrow
                  </p>
                  <p
                    v-else
                    class="tempDetails__horizontal-container__outer--inner-content--time mb-1"
                  >
                    {{ moment(temp.time * 1000).format("dddd") }}
                  </p>
                  <img
                    class="tempDetails__horizontal-container__outer--inner-content--img"
                    src="../public/icons/night_full_moon_clear.png"
                    width="70"
                    v-if="temp.icon == 'clear-night'"
                    alt=""
                  />
                  <img
                    class="tempDetails__horizontal-container__outer--inner-content--img"
                    src="../public/icons/day_clear.png"
                    width="70"
                    v-if="temp.icon == 'clear-day'"
                    alt=""
                  />
                  <img
                    class="tempDetails__horizontal-container__outer--inner-content--img"
                    src="../public/icons/day_partial_cloud.png"
                    width="70"
                    v-if="temp.icon == 'partly-cloudy-day'"
                    alt=""
                  />
                  <img
                    class="tempDetails__horizontal-container__outer--inner-content--img"
                    src="../public/icons/night_full_moon_partial_cloud.png"
                    width="70"
                    v-if="temp.icon == 'partly-cloudy-night'"
                    alt=""
                  />
                  <img
                    class="tempDetails__horizontal-container__outer--inner-content--img"
                    src="../public/icons/rain.png"
                    width="70"
                    v-if="temp.icon == 'rain'"
                    alt=""
                  />
                  <img
                    class="tempDetails__horizontal-container__outer--inner-content--img"
                    src="../public/icons/fog.png"
                    width="70"
                    v-if="temp.icon == 'fog'"
                    alt=""
                  />
                  <img
                    class="tempDetails__horizontal-container__outer--inner-content--img"
                    src="../public/icons/snow.png"
                    width="70"
                    v-if="temp.icon == 'snow'"
                    alt=""
                  />
                  <img
                    class="tempDetails__horizontal-container__outer--inner-content--img"
                    src="../public/icons/sleet.png"
                    width="70"
                    v-if="temp.icon == 'sleet'"
                    alt=""
                  />
                  <img
                    class="tempDetails__horizontal-container__outer--inner-content--img"
                    src="../public/icons/wind.png"
                    width="70"
                    v-if="temp.icon == 'wind'"
                    alt=""
                  />
                  <img
                    class="tempDetails__horizontal-container__outer--inner-content--img"
                    src="../public/icons/cloudy.png"
                    width="70"
                    v-if="temp.icon == 'cloudy'"
                    alt=""
                  />
                  <p
                    class="tempDetails__horizontal-container__outer--inner-content--temp mt-2"
                  >
                    {{ temp.temperatureMax.toFixed(0)
                    }}<span class="temp1">°</span>/{{
                      temp.temperatureMin.toFixed(0)
                    }}<span class="temp1">°</span>
                  </p>
                </div>
              </div>
            </horizontal-scroll>
          </b-tab>
        </b-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import pos from "@/positionStack";
import http from "@/axios";
import moment from "moment";
import HorizontalScroll from "vue-horizontal-scroll";
import "vue-horizontal-scroll/dist/vue-horizontal-scroll.css";
export default {
  name: "App",
  data() {
    return {
      location: null,
      errorStr: null,
      tabIndex: 0,
      currentTemp: {temperature: 0},
      cityName: null,
      moment,
      tempType: "F",
      hourlyTemp: {},
      dailyTemp: {},
      loading: false,
      fullPage: true,
    };
  },
  components: {
    HorizontalScroll,
  },
  created() {
    if (!("geolocation" in navigator)) {
      Vue.$toast.open({
        message: "Geolocation is not available.",
        type: "error",
      });
      return;
    }
    if (!this.location) {
      let gettingLocation = Vue.$toast.open({
        message: "Getting your location...",
        type: "info",
        duration: 0,
      });
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          gettingLocation.dismiss();
          this.location = pos;
          this.getCityName();
          this.getWeatherData();
        },
        (err) => {
          gettingLocation.dismiss();
          Vue.$toast.open({
            message: err.message,
            type: "error",
          });
          this.errorStr = err.message;
        }
      );
    } else {
      this.getCityName();
      this.getWeatherData();
    }
  },
  watch: {
    tempType(val) {
      if (val) {
        this.getWeatherData();
      }
    },
  },
  methods: {
    async getCityName() {
      await pos
        .get(
          `reverse?access_key=c2ee5da369f6758537bc4b9a234d8ae5&query=${this.location.coords.latitude},${this.location.coords.longitude}`
        )
        .then((res) => {
          this.cityName = res.data.data[0].county;
        });
    },
    async getWeatherData() {
      if (this.tempType == "F") {
        this.loading = true;
        await http
          .get(
            `/forecast/a177f8481c31fa96c3f95ad4f4f84610/${this.location.coords.latitude},${this.location.coords.longitude}` //?units=si
          )
          .then((res) => {
            this.currentTemp = res.data.currently;
            this.hourlyTemp = res.data.hourly;
            this.dailyTemp = res.data.daily;
            this.loading = false;
          });
        this.loading = false;
      } else if (this.tempType == "SI") {
        this.loading = true;
        await http
          .get(
            `/forecast/a177f8481c31fa96c3f95ad4f4f84610/${this.location.coords.latitude},${this.location.coords.longitude}?units=si`
          )
          .then((res) => {
            this.currentTemp = res.data.currently;
            this.hourlyTemp = res.data.hourly;
            this.dailyTemp = res.data.daily;
            this.loading = false;
          });
        this.loading = false;
      }
    },
  },
};
</script>
<style lang="scss">
@import "assets/sass/style";
</style>
