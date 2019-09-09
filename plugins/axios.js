import * as axios from 'axios'
import querystring from 'querystring'

let options = {}
// The server-side needs a full url to works
if (process.server) {
  // options.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`
  options = {
    baseURL: `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`,
    timeout: 10000,
    withCredentials: true,
    headers: [
      { 'X-Requested-With': 'XMLHttpRequest' },
      { 'Content-Type': 'application/x-www-form-urlencoded' },
      { 'Access-Control-Allow-Methods': 'GET,POST' },
      { 'Access-Control-Allow-Origin': '*' },
      { 'Access-Control-Allow-Headers:x-requested-with': 'content-type' }
    ],
    transformRequest: [data => {
      return querystring.stringify(data)
    }]
  }
}

axios.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic3BvbmdlY2l0eSIsImlkIjoxLCJpYXQiOjE1MzAwMDI4OTB9.GGEueJgfBdwHIUo6OLpYaavsP3zZ9DsQGRnti0COpUw'

export default axios.create(options)
