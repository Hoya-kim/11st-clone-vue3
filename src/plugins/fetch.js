import axios from 'axios'

const BASE_URL = 'https://trusting-williams-8cacfb.netlify.app/.netlify/functions/'

export default {
  install(app) {
    app.config.globalProperties.$fetch = async (options) => {
      const { requestName, endPoint, searchText } = options
      const query = requestName ? `&requestName=${requestName}` : '' + searchText ? `&searchText=${searchText}` : ''
      
      const { data } = await axios({
        url: `${BASE_URL}${endPoint}?apiKey=1216${query}`,
        method: 'GET',
      })
      return data
    }
  },
}
