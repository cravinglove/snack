(function () {
  var elements = []; // 存放小蛇的每个身体部分
  // 蛇构造函数
  function Snake(width, height, direction) {
    // 蛇每部分的宽高
    this.width = width || 20;
    this.height = height || 20;
    this.direction = direction || 'right';
    // 蛇身体
    this.body = [{
        x: 3,
        y: 2,
        color: 'red' // 头
      },
      {
        x: 2,
        y: 2,
        color: 'orange' // 身体
      },
      {
        x: 1,
        y: 2,
        color: 'orange' // 身体
      }
    ];
  }
  // 为原型添加方法，初始化蛇
  Snake.prototype.init = function (map) {
    // 删除前面的小蛇
    remove();
    // 创建div存放小蛇身体
    for (var i = 0; i < this.body.length; i++) {
      var obj = this.body[i];

      var div = document.createElement('div');
      map.appendChild(div);
      div.style.position = 'absolute';
      div.style.width = this.width + 'px';
      div.style.height = this.height + 'px';
      // 横纵坐标
      div.style.left = obj.x * this.width + 'px';
      div.style.top = obj.y * this.height + 'px';
      // 背景颜色
      div.style.backgroundColor = obj.color;
      // div加入到elements数组中
      elements.push(div);
    }
  }

  Snake.prototype.move = function (food, map) {
    var i = this.body.length - 1;
    for (; i > 0; i--) {
      this.body[i].x = this.body[i - 1].x;
      this.body[i].y = this.body[i - 1].y;
    }
    // 判断方向改变蛇头坐标位置
    switch (this.direction) {
      case 'left':
        this.body[0].x--;
        break;
      case 'right':
        this.body[0].x++;
        break;
      case 'top':
        this.body[0].y--;
        break;
      case 'bottom':
        this.body[0].y++;
        break;
    }
    // 判断吃到食物与否

    // 蛇头坐标
    var headX = this.body[0].x * this.width;
    var headY = this.body[0].y * this.height;

    // 蛇头坐标和食物坐标相等
    if (headX === food.x && headY === food.y) {
      var last = this.body[this.body.length - 1];
      // 复制最后的蛇尾，重新加入蛇数组
      this.body.push({
        x: last.x,
        y: last.y,
        color: last.color
      });
      // 删除食物，重新初始化食物
      food.init(map);
    }
  }

  function remove() {
    // 获取数组
    var i = elements.length - 1;
    for (; i >= 0; i--) {
      var ele = elements[i];
      ele.parentNode.removeChild(ele);
      elements.splice(i, 1);
    }
  }

  // 暴露蛇构造函数
  window.Snake = Snake;

}());