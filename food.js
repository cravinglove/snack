(function () {
  // 保存食物数组
  var elements = [];

  function Food(x, y, width, height, color) {
    // 横纵坐标
    this.x = x;
    this.y = y;
    // 宽高默认20
    this.width = width || 20;
    this.height = height || 20;
    // 背景颜色默认绿色
    this.color = color || 'green';
  }

  // 食物需要在地图显示，需要传地图参数
  Food.prototype.init = function (map) {
    remove();
    // 创建div放置食物
    var div = document.createElement('div');
    map.appendChild(div);
    // 设置样式
    div.style.width = this.width + 'px';
    div.style.height = this.height + 'px';
    div.style.backgroundColor = this.color;
    // 每次食物出现的位置是随机的
    // 横纵坐标随机生成
    // 先脱离文档流
    div.style.position = 'absolute';
    // 生成随机坐标
    this.x = parseInt(Math.random() * (map.offsetWidth / this.width)) * this.width;
    this.y = parseInt(Math.random() * (map.offsetHeight / this.height)) * this.height;

    div.style.left = this.x + 'px';
    div.style.top = this.y + 'px';
    // 将div放到食物数组中
    elements.push(div);
  }

  // 私有的remove函数
  function remove() {
    for (var i = 0; i < elements.length; i++) {
      var ele = elements[i];
      ele.parentNode.removeChild(ele);
      elements.splice(i, 1);
    }
  }
  // 暴露给外部
  window.Food = Food;
}());