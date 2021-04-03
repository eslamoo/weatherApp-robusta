/* eslint-disable */

import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
const http = Vue.axios.create({
    baseURL: 'https://api.darksky.net/',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*'


    }
})

export default http