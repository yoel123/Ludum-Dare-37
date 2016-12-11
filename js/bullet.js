
 ////////  bullet////////
var bullet = function(x,y,dir)
{
	yentity.call(this,x,y,7,"shot");
	this.type= "bullet";
	this.dir = dir;
	this.team = 1;
	this.life = new y_timer(1);
};
bullet.prototype =  yentity.prototype;
bullet.prototype = 
{
	yinit:function()
	{
		if(this.did_init){return;}
		this.did_init = true;
		this.graf.frame = 0;
		if(this.team==2)
		{
			this.player = y_entity_p.get_by_type.call(this,"player")[0];
			this.targ = {x:this.player.x,y:this.player.y}
			this.speed =3;
		}
	}, //end init
	update:function()
	{
		this.yinit();
		this.move();
		this.life_chack();
		yentity_p.update.call(this);
	}, //end update
	move:function()
	{
		if(this.team ==2)
		{
			move_to2.call(this);
			return;
		}
		if(this.dir=="up")
		{
			//yentity_p.rotate.call(this,0); 
			ymove_by(this,0,-this.speed);
		}
		if(this.dir=="down")
		{
			//yentity_p.rotate.call(this,180);
			ymove_by(this,0,this.speed);
		}
		if(this.dir=="left")
		{
			yentity_p.rotate.call(this,-90);
			ymove_by(this,-this.speed,0);
		}
		if(this.dir=="right")
		{
			yentity_p.rotate.call(this,90);
			ymove_by(this,this.speed,0);
		}
	}, //end move
	life_chack:function()
	{
		this.life.update();
		if(this.life.finished ){yremove(this.world,this);}
	} //end life_chack
};//end bullet.prototype
bullet_p = bullet.prototype;
 //////// end bullet////////
