/* eslint-disable */

import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
const pos = Vue.axios.create({
    baseURL: 'https://api.positionstack.com/v1',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    }
})
export default pos