import Vue from 'vue'
import Router from 'vue-router'
import DataTable from '@/components/DataTable'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(Router)
Vue.use(Buefy)

Vue.use(VueAxios, axios)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'DataTable',
      component: DataTable
    }
  ]
})
