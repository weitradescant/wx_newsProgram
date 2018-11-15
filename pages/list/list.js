Page({
  data: {
    listid: "",
    result:{},
  },
  onLoad(options) {
    this.setData({
      listid: options.listid
    })
    this.getRequest();
  },
  getRequest(callBack) {          //api请求
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: this.data.listid
      },
      success: res => {
        let result = res.data.result;
        let dateObj = new Date(result.date);
        let time = (dateObj.getMonth() + 1) + '-' + dateObj.getDate() + ' ' + dateObj.getHours() + ':' + dateObj.getMinutes();//时间格式化
        this.setData({
          result: result,
          time: time
        });
      },
      complete: () => {
        callBack && callBack();
      }
    });
  },
  onPullDownRefresh() {
    this.getRequest(() => {
      wx.stopPullDownRefresh()
    });
  },
})