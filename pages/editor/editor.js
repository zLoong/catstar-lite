// pages/editor.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timmer: null,
    dragStart: false,
    dragMove: false,
    dragStartX: 0,
    dragStartY: 0,
    imgList: [{ 'positionX': 0, 'positionY': 0, 'src': 'http://res.imtt.qq.com/tagapp/DTLite/cat.png', 'class': '' }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //..上传图片
  chooseImgs: function () {
    console.log(123);
    wx.chooseImage({
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        if (res.tempFilePaths && res.tempFilePaths.length > 0) {
          let imageList = this.data.imgList;
          for (let i = 0; i < res.tempFilePaths.length; i++) {
            let imgObj = { 'positionX': 0, 'positionY': 0, 'src': res.tempFilePaths[i], 'class': '' };
            imageList.push(imgObj);
          }
          this.setData({
            imgList: imageList
          });
        }
      }
    })
  },

  //..拖动图片
  imageTouchStart: function (e) {
    let timmer =
      setTimeout(() => {
        let curIndex = e.currentTarget.id;
        let imageList = this.data.imgList;
        imageList[curIndex].class = 'drag';
        this.setData({
          dragStart: true,
          dragStartX: e.touches[0].clientX,
          dragStartY: e.touches[0].clientY,
          imgList: imageList
        });
      }, 400);
    this.setData({
      timmer: timmer
    })
    return false;
  },
  imageTouchEnd: function (e) {
    clearTimeout(this.data.timmer);
    let curIndex = e.currentTarget.id;
    let imageList = this.data.imgList;
    imageList[curIndex].positionX = 0;
    imageList[curIndex].positionY = 0;
    imageList[curIndex].class = '';
    this.setData({
      dragStart: false,
      dragMove: false,
      imgList: imageList,
      timmer: null
    });
    return false;
  },
  imageTouchMove: function (e) {
    clearTimeout(this.data.timmer);
    if (!this.data.dragStart) return false;
    let curIndex = e.currentTarget.id;
    let imageList = this.data.imgList;
    imageList[curIndex].positionX = e.touches[0].clientX - this.data.dragStartX;
    imageList[curIndex].positionY = e.touches[0].clientY - this.data.dragStartY;
    imageList[curIndex].class = 'drag';
    console.log(imageList);
    this.setData({
      dragMove: true,
      imgList: imageList
    });
    return false;
  },

  gotoEditorImage: function () {
    wx.navigateTo({
      url: '../editorimage/editorimage'
    })
  }
})