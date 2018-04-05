(function () {
  var that = null;
  // 游戏构造函数
  function Game(map) {
    this.food = new Food(); // 食物对象
    this.snake = new Snake(); //小蛇对象
    this.map = map;
    that = this;
  }

  Game.prototype.init = function () {
    // 初始化游戏
    // 食物初始化
    this.food.init(this.map);
    // 小蛇初始化
    this.snake.init(this.map);
    // 调用小蛇自运动方法
    this.runSnake(this.food, this.map);
    // 调用按键的方法，监测键盘按下事件
    this.bindKey();
    // setInterval(function(){
    //   that.snake.move(that.food,that.map);
    //   that.snake.init(that.map);
    // },150)
  }


  Game.prototype.runSnake = function (food, map) {
    var timerId = setInterval(function () {
      this.snake.move(food, map);
      this.snake.init(map);
      // 横坐标最大值
      var maxX = map.offsetWidth / this.snake.width;
      // 纵坐标最大值
      var maxY = map.offsetHeight / this.snake.height;
      // 蛇头坐标
      var headX = this.snake.body[0].x;
      var headY = this.snake.body[0].y;
      // 判断撞墙与否
      if (headX >= maxX || headX < 0) {
        clearInterval(timerId);
        alert('游戏结束');
      }
      if (headY < 0 || headY >= maxY) {
        clearInterval(timerId);
        alert('游戏结束');
      }
    }.bind(that), 150)
  }

  Game.prototype.bindKey = function () {
    document.addEventListener('keydown', function (e) {
      switch (e.keyCode) {
        case 37:
          this.snake.direction = 'left';
          break;
        case 38:
          this.snake.direction = 'top';
          break;
        case 39:
          this.snake.direction = 'right';
          break;
        case 40:
          this.snake.direction = 'bottom';
          break;
      }
    }.bind(that), false)
  }
  window.Game = Game;
}())