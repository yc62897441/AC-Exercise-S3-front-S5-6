import { apiHelper } from '../utils/helpers'
const getToken = () => localStorage.getItem('token')

// U149 重構 API Helper
// 在 apiHelper 內設定後，刪除路由這邊的 {headers: {  Authorization: `Bearer ${getToken()}`}  }
export default {
  getRestaurant({ restaurantId }) {
    return apiHelper.get(`/restaurants/${restaurantId}`)
  },
  getRestaurants({ page, categoryId }) {
    const searchParams = new URLSearchParams({ page, categoryId })
    return apiHelper.get(`/restaurants?${searchParams.toString()}`)
  },
  getFeeds() {
    return apiHelper.get('/restaurants/feeds')
  },
  getTopRestaurants() {
    return apiHelper.get('/restaurants/top')
  },
}