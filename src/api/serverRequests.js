import api from './httpJs'
const request = {
  getBannerInfo: (type, succ, fail) => {
    api._get(`/banner?type=${type}`, succ, fail)
  },
  getRecommendInfo: (succ, fail) => {
    api._get(`/personalized`, succ, fail)
  },
  getSearchInfo: (params, succ, fail) => {
    api._get(`/search?keywords=${params.keywords}&type=${params.type}`, succ, fail)
  }
}
export default request
