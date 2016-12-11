
 ////////  enemy////////
var enemy = function(x,y,grafic)
{
	yentity.call(this,x,y,1.5,grafic);
	this.type= "enemy";
	this.enemy_type = "norm";
	this.alpha = 1;
	this.alive = true;
	this.attack_timer =  new y_timer(2);
};
enemy.prototype =  yentity.prototype;
enemy.prototype = 
{
	yinit:function()
	{
	  if(this.did_init){return;}
	  this.did_init = true;
	  if(this.enemy_type =="shooty"){this.speed=0.5;}
	  this.player = y_entity_p.get_by_type.call(this,"player")[0];
	  this.gm = y_entity_p.get_by_type.call(this,"game_manger")[0];
	}, //end init
	update:function()
	{
		this.yinit();
		this.move();
		this.hit();
		this.shot();
		this.die();
		yentity_p.update.call(this);
	}, //end update
	move:function()
	{
		if(!this.alive ){return;}//dont move if dead
		//move to target
		this.targ = this.player;
		move_to2.call(this);
		
		if(this.dir=="up"){yentity_p.rotate.call(this,0);}
		if(this.dir=="down"){yentity_p.rotate.call(this,180);}
		if(this.dir=="left"){yentity_p.rotate.call(this,-90);}
		if(this.dir=="right"){yentity_p.rotate.call(this,90);}
	}, //end move
	hit:function()
	{
		p = y_entity_p.colide.call(this,"yplayer");
		b = y_entity_p.colide.call(this,"bullet");
		//collide player
		if(p){}
		//collide bullet
		if(b && b.team==1)
		{
			this.take_dmg();
			yremove(this.world,b);
			
		}
		
	}, //end hit
	take_dmg:function()
	{
		this.alive = false;
		/*this.stats.hp -= dmg;
		ytrace(this.stats.hp);
		if(this.stats.hp <= 0 && this.alive)
		{
			this.alive = false;
			
			//this.graf.frame = 2;
		
			
		//	yremove(this,this);
			
		}*/
	}, //end init
	die:function()
	{
			if(!this.alive )
			{
				if(this.alpha<0.03){yremove(this.world,this);this.gm.kills++;}
				
				y_entity_p.alpha.call(this,this.alpha);
				
				this.alpha -= 0.03;
			}
	}, //end init
	shot:function()
	{
		if(this.enemy_type !="shooty"){return;}
		timer = this.attack_timer;
		timer.update();
		
		//ytrace(mouse_down);
		if(y_chack_timer(timer))
		{
			b = new bullet(this.x,this.y);
			b.team =2
			yadd(this.world,b);
		}
		
	}
};//end enemy.prototype
enemy_p = enemy.prototype;
 //////// end enemy////////
