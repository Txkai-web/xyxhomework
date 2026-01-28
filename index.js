//主程序,业务逻辑
(function(){
	var _DATA = [		//地图数据
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
		[1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
		[1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1],
		[1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1],
		[1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1],
		[1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1],
		[1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1],
		[1,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,1,1],
		[1,1,1,1,1,1,0,1,1,0,1,1,1,2,2,1,1,1,0,1,1,0,1,1,1,1,1,1],
		[1,1,1,1,1,1,0,1,1,0,1,2,2,2,2,2,2,1,0,1,1,0,1,1,1,1,1,1],
		[0,0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,1,0,0,0,0,0,0,0,0,0,0],
		[1,1,1,1,1,1,0,1,1,0,1,2,2,2,2,2,2,1,0,1,1,0,1,1,1,1,1,1],
		[1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1],
		[1,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,1,1],
		[1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1],
		[1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
		[1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
		[1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1],
		[1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1],
		[1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1],
		[1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1],
		[1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1],
		[1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
	],
	_GOODS = {			//能量豆
		'1,3':1,
		'26,3':1,
		'1,23':1,
		'26,23':1
	},
	_COS = [1,0,-1,0],
	_SIN = [0,1,0,-1],
	_COLOR = ['#F00','#F93','#0CF','#F9C'],//红,橙,
	_LIFE = 3,
	_SCORE = 0;		//得分

	var game = new Game('canvas');
	//启动页
	(function(){
		var stage = game.createStage();
		//logo
		stage.createItem({
			x:game.width/2,
			y:game.height*.45,
			width:100,
			height:100,
			frames:3,
			draw:function(context){
				var t = Math.abs(5-this.times%10);
				context.fillStyle = '#FFE600';
				context.beginPath();
				context.arc(this.x,this.y,this.width/2,t*.04*Math.PI,(2-t*.04)*Math.PI,false);
				context.lineTo(this.x,this.y);
				context.closePath();
				context.fill();
				context.fillStyle = '#000';
				context.beginPath();
				context.arc(this.x+5,this.y-27,7,0,2*Math.PI,false);
				context.closePath();
				context.fill();
			}
		});
		//游戏名
		stage.createItem({
			x:game.width/2,
			y:game.height*.6,
			draw:function(context){
				context.font = 'bold 42px Helvetica';
				context.textAlign = 'center';
				context.textBaseline = 'middle';
				context.fillStyle = '#FFF';
				context.fillText('蛋仔吃豆人',this.x,this.y);
			}
		});
		//版权信息
		stage.createItem({
			x:game.width-12,
			y:game.height-5,
			draw:function(context){
				context.font = '14px Helvetica';
				context.textAlign = 'right';
				context.textBaseline = 'bottom';
				context.fillStyle = '#AAA';
				context.fillText('© xuyixiao.com',this.x,this.y);
			}
		});
		//事件绑定
		stage.bind('keydown',function(e){
			switch(e.keyCode){
				case 13:
				case 32:
				game.nextStage();
				break;
			}
		});
	})();
	//游戏主程序
	(function(){
		var stage,map,beans,player,times;
		stage = game.createStage({
			update:function(){
				var stage = this;
				if(stage.status==1){								//场景正常运行
					items.forEach(function(item){
						if(map&&!map.get(item.coord.x,item.coord.y)&&!map.get(player.coord.x,player.coord.y)){
							var dx = item.x-player.x;
							var dy = item.y-player.y;
							if(dx*dx+dy*dy<750&&item.status!=4){		//物体检测
								if(item.status==3){
									item.status = 4;
									_SCORE += 10;
								}else{
									stage.status = 3;
									stage.timeout = 30;
								}
							}
						}
					});
					if(JSON.stringify(beans.data).indexOf(0)<0){	//当没有物品的时候，进入结束画面
						game.nextStage();
					}
				}else if(stage.status==3){		//场景临时状态
					if(!stage.timeout){
						_LIFE--;
						if(_LIFE){
							stage.resetItems();
						}else{
							game.nextStage();
							return false;
						}
					}
				}
			}
		});
		//绘制地图
		map = stage.createMap({
			x:60,
			y:10,
			data:_DATA,
			cache:true,
			draw:function(context){
				context.lineWidth = 2;
				for(var j=0; j<this.y_length; j++){
					for(var i=0; i<this.x_length; i++){
						var value = this.get(i,j);
						if(value){
							var code = [0,0,0,0];
							if(this.get(i+1,j)&&!(this.get(i+1,j-1)&&this.get(i+1,j+1)&&this.get(i,j-1)&&this.get(i,j+1))){
								code[0]=1;
							}
							if(this.get(i,j+1)&&!(this.get(i-1,j+1)&&this.get(i+1,j+1)&&this.get(i-1,j)&&this.get(i+1,j))){
								code[1]=1;
							}
							if(this.get(i-1,j)&&!(this.get(i-1,j-1)&&this.get(i-1,j+1)&&this.get(i,j-1)&&this.get(i,j+1))){
								code[2]=1;
							}
							if(this.get(i,j-1)&&!(this.get(i-1,j-1)&&this.get(i+1,j-1)&&this.get(i-1,j)&&this.get(i+1,j))){
								code[3]=1;
							}
							if(code.indexOf(1)>-1){
								context.strokeStyle=value==2?"#FFF":"#09C";
								var pos = this.coord2position(i,j);
								switch(code.join('')){
									case '1100':
										context.beginPath();
										context.arc(pos.x+this.size/2,pos.y+this.size/2,this.size/2,Math.PI,1.5*Math.PI,false);
										context.stroke();
										context.closePath();
										break;
									case '0110':
										context.beginPath();
										context.arc(pos.x-this.size/2,pos.y+this.size/2,this.size/2,1.5*Math.PI,2*Math.PI,false);
										context.stroke();
										context.closePath();
										break;
									case '0011':
										context.beginPath();
										context.arc(pos.x-this.size/2,pos.y-this.size/2,this.size/2,0,.5*Math.PI,false);
										context.stroke();
										context.closePath();
										break;
									case '1001':
										context.beginPath();
										context.arc(pos.x+this.size/2,pos.y-this.size/2,this.size/2,.5*Math.PI,1*Math.PI,false);
										context.stroke();
										context.closePath();
										break;
									default:
										var dist = this.size/2;
										code.forEach(function(v,index){
											if(v){
												context.beginPath();
												context.moveTo(pos.x,pos.y);
												context.lineTo(pos.x-_COS[index]*dist,pos.y-_SIN[index]*dist);
												context.stroke();
												context.closePath();							
											}
										});
								}
							}
						}
					}
				}
			}
		});
		//物品地图
		beans = stage.createMap({
			x:60,
			y:10,
			data:_DATA,
			frames:8,
			draw:function(context){
				for(var j=0; j<this.y_length; j++){
					for(var i=0; i<this.x_length; i++){
						if(!this.get(i,j)){
							var pos = this.coord2position(i,j);
							context.fillStyle = "#F5F5DC";
							if(_GOODS[i+','+j]){
								context.beginPath();
								context.arc(pos.x,pos.y,3+this.times%2,0,2*Math.PI,true);
								context.fill();
								context.closePath();
							}else{
								context.fillRect(pos.x-2,pos.y-2,4,4);
							}
						}
					}
				}
			}
		});
		//得分
		stage.createItem({
			x:690,
			y:100,
			draw:function(context){
				context.font = 'bold 28px Helvetica';
				context.textAlign = 'left';
				context.textBaseline = 'bottom';
				context.fillStyle = '#C33';
				context.fillText('SCORE',this.x,this.y);
				context.font = '28px Helvetica';
				context.textAlign = 'left';
				context.textBaseline = 'top';
				context.fillStyle = '#FFF';
				context.fillText(_SCORE,this.x+12,this.y);
			}
		});
		//状态文字
		stage.createItem({
			x:690,
			y:320,
			frames:25,
			draw:function(context){
				if(stage.status==2&&this.times%2){
					context.font = '24px Helvetica';
					context.textAlign = 'left';
					context.textBaseline = 'center';
					context.fillStyle = '#09F';
					context.fillText('PAUSE',this.x,this.y);
				}
			}
		});
		//生命值（小号主角头像）
		stage.createItem({
			x:705,
			y:540,
			width:22,
			height:22,
			draw:function(context){
				for(var i=0;i<_LIFE-1;i++){
					var cx = this.x+40*i,
						cy = this.y,
						s  = this.width;
					var bodyR = s * 0.9;
					var faceR = s * 0.7;
					var brown  = '#8C4A1C';
					var yellow = '#FFD633';
					var skin   = '#FFE9C4';

					context.save();
					context.translate(cx, cy);

					// 外圈
					context.beginPath();
					context.fillStyle = yellow;
					context.strokeStyle = brown;
					context.lineWidth = s * 0.18;
					context.arc(0, 0, bodyR * 0.6, 0, Math.PI * 2, false);
					context.fill();
					context.stroke();
					context.closePath();

					// 脸
					context.beginPath();
					context.fillStyle = skin;
					context.strokeStyle = yellow;
					context.lineWidth = s * 0.10;
					context.arc(0, 0, faceR * 0.55, 0, Math.PI * 2, false);
					context.fill();
					context.stroke();
					context.closePath();

					// 简化眼睛
					context.fillStyle = brown;
					var eyeOffsetX = s * 0.26;
					var eyeY       = -s * 0.12;
					var eyeR       = s * 0.09;
					context.beginPath();
					context.arc(-eyeOffsetX, eyeY, eyeR, 0, 2*Math.PI, false);
					context.arc( eyeOffsetX, eyeY, eyeR, 0, 2*Math.PI, false);
					context.fill();
					context.closePath();

					// 小嘴
					context.fillStyle = '#C5563B';
					var mouthW = s * 0.16;
					var mouthH = s * 0.06;
					context.fillRect(-mouthW/2, s*0.02, mouthW, mouthH);

					context.restore();
				}
			}
		});
		//NPC
		for(var i=0;i<4;i++){
			stage.createItem({
				width:30,
				height:30,
				orientation:3,
				color:_COLOR[i],
				location:map,
				coord:{x:12+i,y:14},
				vector:{x:12+i,y:14},
				type:2,
				frames:10,
				speed:1,
				timeout:Math.floor(Math.random()*120),
				update:function(){
					var new_map;
					if(this.status==3&&!this.timeout){
						this.status = 1;
					}
					if(!this.coord.offset){			//到达坐标中心时计算
						if(this.status==1){
							if(!this.timeout){		//定时器
								new_map = JSON.parse(JSON.stringify(map.data).replace(/2/g,0));
								var id = this._id;
								items.forEach(function(item){
									if(item._id!=id&&item.status==1){	//NPC将其它所有还处于正常状态的NPC当成一堵墙
										new_map[item.coord.y][item.coord.x]=1;
									}
								});
								this.path = map.finder({
									map:new_map,
									start:this.coord,
									end:player.coord
								});
								if(this.path.length){
									this.vector = this.path[0];
								}
							}
						}else if(this.status==3){
							new_map = JSON.parse(JSON.stringify(map.data).replace(/2/g,0));
							var id = this._id;
							items.forEach(function(item){
								if(item._id!=id){
									new_map[item.coord.y][item.coord.x]=1;
								}
							});
							this.path = map.finder({
								map:new_map,
								start:player.coord,
								end:this.coord,
								type:'next'
							});
							if(this.path.length){
								this.vector = this.path[Math.floor(Math.random()*this.path.length)];
							}
						}else if(this.status==4){
							new_map = JSON.parse(JSON.stringify(map.data).replace(/2/g,0));
							this.path = map.finder({
								map:new_map,
								start:this.coord,
								end:this._params.coord
							});
							if(this.path.length){
								this.vector = this.path[0];
							}else{
								this.status = 1;
							}
						}
						//是否转变方向
						if(this.vector.change){
							this.coord.x = this.vector.x;
							this.coord.y = this.vector.y;
							var pos = map.coord2position(this.coord.x,this.coord.y);
							this.x = pos.x;
							this.y = pos.y;
						}
						//方向判定
						if(this.vector.x>this.coord.x){
							this.orientation = 0;
						}else if(this.vector.x<this.coord.x){
							this.orientation = 2;
						}else if(this.vector.y>this.coord.y){
							this.orientation = 1;
						}else if(this.vector.y<this.coord.y){
							this.orientation = 3;
						}
					}
					this.x += this.speed*_COS[this.orientation];
					this.y += this.speed*_SIN[this.orientation];
				},
				draw:function(context){
					var isSick = false;
					if(this.status==3){
						isSick = this.timeout>80||this.times%2?true:false;
					}
					if(this.status!=4){
						context.fillStyle = isSick?'#BABABA':this.color;
						context.beginPath();
						context.arc(this.x,this.y,this.width*.5,0,Math.PI,true);
						switch(this.times%2){
							case 0:
							context.lineTo(this.x-this.width*.5,this.y+this.height*.4);
							context.quadraticCurveTo(this.x-this.width*.4,this.y+this.height*.5,this.x-this.width*.2,this.y+this.height*.3);
							context.quadraticCurveTo(this.x,this.y+this.height*.5,this.x+this.width*.2,this.y+this.height*.3);
							context.quadraticCurveTo(this.x+this.width*.4,this.y+this.height*.5,this.x+this.width*.5,this.y+this.height*.4);
							break;
							case 1:
							context.lineTo(this.x-this.width*.5,this.y+this.height*.3);
							context.quadraticCurveTo(this.x-this.width*.25,this.y+this.height*.5,this.x,this.y+this.height*.3);
							context.quadraticCurveTo(this.x+this.width*.25,this.y+this.height*.5,this.x+this.width*.5,this.y+this.height*.3);
							break;
						}
						context.fill();
						context.closePath();
					}
					context.fillStyle = '#FFF';
					if(isSick){
						context.beginPath();
						context.arc(this.x-this.width*.15,this.y-this.height*.21,this.width*.08,0,2*Math.PI,false);
						context.arc(this.x+this.width*.15,this.y-this.height*.21,this.width*.08,0,2*Math.PI,false);
						context.fill();
						context.closePath();
					}else{
						context.beginPath();
						context.arc(this.x-this.width*.15,this.y-this.height*.21,this.width*.12,0,2*Math.PI,false);
						context.arc(this.x+this.width*.15,this.y-this.height*.21,this.width*.12,0,2*Math.PI,false);
						context.fill();
						context.closePath();
						context.fillStyle = '#000';
						context.beginPath();
						context.arc(this.x-this.width*(.15-.04*_COS[this.orientation]),this.y-this.height*(.21-.04*_SIN[this.orientation]),this.width*.07,0,2*Math.PI,false);
						context.arc(this.x+this.width*(.15+.04*_COS[this.orientation]),this.y-this.height*(.21-.04*_SIN[this.orientation]),this.width*.07,0,2*Math.PI,false);
						context.fill();
						context.closePath();
					}
				}
			});
		}
		items = stage.getItemsByType(2);
		//主角
		player = stage.createItem({
			width:30,
			height:30,
			type:1,
			location:map,
			coord:{x:13.5,y:23},
			orientation:2,
			speed:2,
			frames:10,
			update:function(){
				var coord = this.coord;
				if(!coord.offset){
					if(this.control.orientation!='undefined'){
						if(!map.get(coord.x+_COS[this.control.orientation],coord.y+_SIN[this.control.orientation])){
							this.orientation = this.control.orientation;
						}
					}
					this.control = {};
					var value = map.get(coord.x+_COS[this.orientation],coord.y+_SIN[this.orientation]);
					if(value==0){
						this.x += this.speed*_COS[this.orientation];
						this.y += this.speed*_SIN[this.orientation];
					}else if(value<0){
						this.x -= map.size*(map.x_length-1)*_COS[this.orientation];
						this.y -= map.size*(map.y_length-1)*_SIN[this.orientation];
					}
				}else{
					if(!beans.get(this.coord.x,this.coord.y)){	//吃豆
						_SCORE++;
						beans.set(this.coord.x,this.coord.y,1);
						if(_GOODS[this.coord.x+','+this.coord.y]){	//吃到能量豆
							items.forEach(function(item){
								if(item.status==1||item.status==3){	//如果NPC为正常状态，则置为临时状态
									item.timeout = 450;
									item.status = 3;
								}
							});
						}
					}
					this.x += this.speed*_COS[this.orientation];
					this.y += this.speed*_SIN[this.orientation];
				}
			},
			draw:function(context){
				// 使用类似 1.png 的黄胖小人造型
				context.save();
				// 被吃时简单做一个淡出效果
				if (stage.status == 3) {
					var alpha = stage.timeout ? Math.max(stage.timeout / 30, 0) : 0;
					if (alpha < 0) alpha = 0;
					if (alpha > 1) alpha = 1;
					context.globalAlpha = alpha;
				}

				// 将坐标原点移动到角色中心
				context.translate(this.x, this.y);

				var s = this.width;          // 基准尺寸 30
				var bodyR = s * 0.9;
				var faceR = s * 0.7;
				var brown  = '#8C4A1C';      // 描边棕色
				var yellow = '#FFD633';      // 衣服黄
				var skin   = '#FFE9C4';      // 肤色
				var blush  = '#FFC2A3';      // 腮红

				// 1. 外圈身体大圆
				context.beginPath();
				context.fillStyle = yellow;
				context.strokeStyle = brown;
				context.lineWidth = s * 0.18;
				context.arc(0, 0, bodyR * 0.6, 0, Math.PI * 2, false);
				context.fill();
				context.stroke();
				context.closePath();

				// 两侧小手（用圆角矩形模拟）
				var handW = s * 0.55;
				var handH = s * 0.35;
				var handY = s * 0.15;
				context.fillStyle = yellow;
				context.strokeStyle = brown;
				context.lineWidth = s * 0.12;

				// 左手
				context.beginPath();
				if (context.roundRect) {
					context.roundRect(-bodyR * 0.9 - handW * 0.05, handY, handW, handH, s * 0.1);
				} else {
					context.rect(-bodyR * 0.9 - handW * 0.05, handY, handW, handH);
				}
				context.fill();
				context.stroke();
				context.closePath();

				// 右手
				context.beginPath();
				if (context.roundRect) {
					context.roundRect(bodyR * 0.3, handY, handW, handH, s * 0.1);
				} else {
					context.rect(bodyR * 0.3, handY, handW, handH);
				}
				context.fill();
				context.stroke();
				context.closePath();

				// 头顶天线杆
				var poleW = s * 0.18;
				var poleH = s * 0.45;
				context.beginPath();
				context.fillStyle = yellow;
				context.strokeStyle = brown;
				if (context.roundRect) {
					context.roundRect(-poleW / 2, -bodyR * 0.9 - poleH * 0.6, poleW, poleH, s * 0.1);
				} else {
					context.rect(-poleW / 2, -bodyR * 0.9 - poleH * 0.6, poleW, poleH);
				}
				context.fill();
				context.stroke();
				context.closePath();

				// 天线顶小圆
				context.beginPath();
				context.arc(0, -bodyR * 0.9 - poleH, s * 0.28, 0, 2 * Math.PI, false);
				context.fill();
				context.stroke();
				context.closePath();

				// 2. 内圈脸
				context.beginPath();
				context.fillStyle = skin;
				context.strokeStyle = yellow;
				context.lineWidth = s * 0.10;
				context.arc(0, 0, faceR * 0.55, 0, Math.PI * 2, false);
				context.fill();
				context.stroke();
				context.closePath();

				// 3. 星星眼睛
				var eyeOffsetX = s * 0.33;
				var eyeY       = -s * 0.18;
				var eyeR       = s * 0.24;

				function drawStarEye(cx, cy) {
					context.save();
					context.translate(cx, cy);
					context.fillStyle = brown;

					context.beginPath();
					var rOuter = eyeR * 0.8;
					var rInner = eyeR * 0.35;
					for (var i = 0; i < 10; i++) {
						var angle = i * Math.PI / 5; // 36°
						var r = (i % 2 === 0) ? rOuter : rInner;
						var x = Math.cos(angle) * r;
						var y = Math.sin(angle) * r;
						if (i === 0) {
							context.moveTo(x, y);
						} else {
							context.lineTo(x, y);
						}
					}
					context.closePath();
					context.fill();
					context.restore();
				}

				drawStarEye(-eyeOffsetX, eyeY);
				drawStarEye( eyeOffsetX, eyeY);

				// 4. 腮红
				var blushOffsetX = s * 0.35;
				var blushY       = s * 0.05;
				var blushW       = s * 0.28;
				var blushH       = s * 0.18;
				context.fillStyle = blush;

				context.beginPath();
				if (context.roundRect) {
					context.roundRect(-blushOffsetX - blushW / 2, blushY, blushW, blushH, s * 0.08);
				} else {
					context.rect(-blushOffsetX - blushW / 2, blushY, blushW, blushH);
				}
				context.fill();
				context.closePath();

				context.beginPath();
				if (context.roundRect) {
					context.roundRect(blushOffsetX - blushW / 2, blushY, blushW, blushH, s * 0.08);
				} else {
					context.rect(blushOffsetX - blushW / 2, blushY, blushW, blushH);
				}
				context.fill();
				context.closePath();

				// 5. 小嘴
				context.fillStyle = '#C5563B';
				var mouthW = s * 0.16;
				var mouthH = s * 0.08;
				context.fillRect(-mouthW / 2, s * 0.00, mouthW, mouthH);

				// 6. 腿和鞋子
				var legW  = s * 0.28;
				var legH  = s * 0.28;
				var shoeH = s * 0.16;
				var legY  = bodyR * 0.1;

				// 左腿
				context.fillStyle = '#F5F5F5';
				context.fillRect(-s * 0.35 - legW / 2, legY, legW, legH);
				context.fillStyle = '#BBBBBB';
				context.fillRect(-s * 0.35 - legW / 2, legY + legH - shoeH, legW, shoeH);
				context.fillStyle = brown;
				context.fillRect(-s * 0.35 - legW / 2, legY + legH - shoeH * 0.3, legW, shoeH * 0.3);

				// 右腿
				context.fillStyle = '#F5F5F5';
				context.fillRect(s * 0.35 - legW / 2, legY, legW, legH);
				context.fillStyle = '#BBBBBB';
				context.fillRect(s * 0.35 - legW / 2, legY + legH - shoeH, legW, shoeH);
				context.fillStyle = brown;
				context.fillRect(s * 0.35 - legW / 2, legY + legH - shoeH * 0.3, legW, shoeH * 0.3);

				context.restore();
			}
		});
		//事件绑定
		stage.bind('keydown',function(e){
			switch(e.keyCode){
				case 13: //回车
				case 32: //空格
				this.status = this.status==2?1:2;
				break;
				case 39: //右
				player.control = {orientation:0};
				break;
				case 40: //下
				player.control = {orientation:1};
				break;
				case 37: //左
				player.control = {orientation:2};
				break;
				case 38: //上
				player.control = {orientation:3};
				break;
			}
		});
	})();
	//结束画面
	(function(){
		var stage = game.createStage();
		//游戏结束
		stage.createItem({
			x:game.width/2,
			y:game.height*.35,
			draw:function(context){
				context.fillStyle = '#FFF';
				context.font = 'bold 48px Helvetica';
				context.textAlign = 'center';
				context.textBaseline = 'middle';
				context.fillText('GAME OVER',this.x,this.y);
			}
		});
		//记分
		stage.createItem({
			x:game.width/2,
			y:game.height*.5,
			draw:function(context){
				context.fillStyle = '#FFF';
				context.font = '20px Helvetica';
				context.textAlign = 'center';
				context.textBaseline = 'middle';
				context.fillText('FINAL SCORE: '+(_SCORE+50*Math.max(_LIFE-1,0)),this.x,this.y);
			}
		});
		//事件绑定
		stage.bind('keydown',function(e){
			switch(e.keyCode){
				case 13: //回车
				case 32: //空格
				_SCORE = 0;
				_LIFE = 3;
				var st = game.setStage(1);
				st.reset();
				break;
			}
		});
	})();
	game.init();
})();
