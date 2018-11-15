const nav = [
  { name: "国内", newsType: "gn"},
  { name: "国际", newsType: "gj" },
  { name: "财经", newsType: "cj" },
  { name: "娱乐", newsType: "yl" },
  { name: "军事", newsType: "js" },
  { name: "体育", newsType: "ty" },
  { name: "其他", newsType: "other" }];
Page({
  data: {
    nav: nav,            //导航栏
    currentNav:"gn",     //当前导航
    newsLists:[],         //页面新闻列表
    bigImg:"",
    bigTitle: "",
    bigSubTitle: "",
    bigId:"",
  },
  onLoad() {
    this.getRequest();
  },
  getRequest(callBack){          //api请求
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: this.data.currentNav
      },
      success: res => {
        let results = res.data.result;
        for (let i = 0; i < results.length; i++) {
          let dateObj = new Date(results[i].date);
          results[i].time = (dateObj.getMonth() + 1) + '-' + dateObj.getDate() + ' ' + dateObj.getHours() + ':' + dateObj.getMinutes();//时间格式化
          if(results[i].source == "") {
            results[i].source = "未知来源";
          }
        }
        let firstResult = results.shift();//删除第一个元素
        this.setData({
          newsLists: results,
          bigImg: firstResult.firstImage,
          bigTitle: firstResult.title,
          bigSubTitle: firstResult.source + firstResult.time,
          bigId: firstResult.id
        });
      },
      complete: () => {
        callBack && callBack();
      }
    });
  },
  onTapNav(e){         //点击导航
    let newsType = e.target.dataset.newstype;
    this.setData({
      currentNav: newsType
    });
    this.getRequest();//请求新页面
  },
  onTapList(e) {         //点击新闻 跳转页面
    let listid = e.currentTarget.dataset.listid;
    wx.navigateTo({
      url: '/pages/list/list?listid=' + listid,
    })
  },
  onPullDownRefresh() {
    this.getRequest(() => {
      wx.stopPullDownRefresh()
    });
  },
})
