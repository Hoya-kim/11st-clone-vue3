import axios from 'axios'

const BASE_URL = 'https://trusting-williams-8cacfb.netlify.app/.netlify/functions/'

export default {
  install(app) {
    app.config.globalProperties.$fetch = async (options) => {
      const { requestName, endPoint, searchText } = options
      const { data } = await axios({
        url: `${BASE_URL}${endPoint}?apiKey=1216&${requestName && `requestName=${requestName}`}`,
        method: 'GET'
      })
      return data
    }
  }
}
