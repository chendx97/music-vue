import api from './httpJs'
const request = {
  getBannerInfo: (type, succ, fail) => {
    api._get(`/api/banner?type=${type}`, succ, fail)
  },
  getRecommendInfo: (succ, fail) => {
    api._get(`/api/personalized`, succ, fail)
  },
  getSearchInfo: (params, succ, fail) => {
    api._get(`/api/search?keywords=${params.keywords}&type=${params.type}`, succ, fail)
  }
}
export default request
