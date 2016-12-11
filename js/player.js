
 ////////  player////////
var player = function(x,y)
{
	yentity.call(this,x,y,5,"player");
	this.type= "player";
	this.anchor_center = true;
	this.last_dir = "up";
	this.dir = "up";
	this.attack_timer =  new y_timer(1.2);
};
player.prototype =  yentity.prototype;
player.prototype = 
{
	yinit:function()
	{
		if(this.did_init){return;}
		this.did_init = true;
		this.graf.frame = 0;
		this.graf.animations.add('walk',[0,1,0]);
		this.graf.animations.add('fire',[2,3,0]);
	}, //end init
	update:function()
	{
		this.yinit();
		this.move();
		this.shoot();
		this.animate();
		yentity_p.update.call(this);
	}, //end update
	move:function()
	{
		yentity_p.kyboard_control.call(this);
		if(this.lock_dir){ return;}
		this.last_dir = this.dir;
		if(this.dir=="up"){yentity_p.rotate.call(this,0);}
		if(this.dir=="down"){yentity_p.rotate.call(this,180);}
		if(this.dir=="left"){yentity_p.rotate.call(this,-90);}
		if(this.dir=="right"){yentity_p.rotate.call(this,90);}
	}, //end move
	shoot:function()
	{
		space = window.ygame.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		
		timer = this.attack_timer;
		timer.update();
		
		//ytrace(mouse_down);
		if(space.isDown && y_chack_timer(timer))
		{
		
			this.shootin = true;
			b = new bullet(this.x,this.y,this.last_dir);
			yadd(this.world,b);
		}
		if(space.isDown )
		{
		
			this.lock_dir = true;
		}else
		{
			this.lock_dir = false;
		}
	}, //end shoot
	animate:function()
	{
		
		if(this.shootin)
		{
			this.graf.animations.play('fire', 15,false);
			this.shootin = false;
			
			this.lock_dir = true;
			return;
		}
		if(this.moving)
		{
			this.graf.animations.play('walk', 15,false); 
			this.moving = false;
		}
		
	}, //end shoot
	
	take_dmg:function()
	{
		
	}//end take dmg
};//end player.prototype
player_p = player.prototype;
 //////// end player////////
