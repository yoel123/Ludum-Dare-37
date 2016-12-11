
 ////////  game_manger////////
var game_manger = function(x,y,grafic)
{
	yentity.call(this,x,y,grafic);
	this.type= "game_manger";
	
	//level atts
	this.levels = [
	{norm:10,shooty:0,kills:10},
	{norm:20,shooty:10,kills:25}
	];
	this.current_level = 0;
	this.current_level_data = [];
	this.level_started = true;
	this.kills = 0;
	//spawn atts
	this.spawn_timer =  new y_timer(1);
	this.spawn_points = [[0,200],[400,200],[200,0],[200,600]];
	
	this.intro_timer =  new y_timer(8);
	this.intro_qouats = ["green and murderous",
	"now they shot too"];
	this.intro_text ="";
	this.intro_end = false;
	
	//ui 
	 this.level_txt = window.ygame.add.bitmapText(30, 230, 'eightbitwonder', ' ',10)
	
	
	this.player = new player(150,150);
};
game_manger.prototype =  yentity.prototype;
game_manger.prototype = 
{
	yinit:function()
	{
		if(this.did_init){return;}
	    this.did_init = true;
		yadd(this.world,this.player);
		a  = new enemy(0,0,"gunalian");
		a.enemy_type ="shooty";
	//	yadd(this.world,a);
	}, //end init
	update:function()
	{
		this.yinit();
		this.ui();
		
		this.spawn();
		yentity_p.update.call(this);
	}, //end update
	ui:function()
	{
		//kills text,level text,powerup text
	}, //end ui
	game_over:function()
	{
		if(this.win)
		{
			//go to win world
		}
	}, //end game_over
	spawn:function()
	{
		
		//start level
	    if(this.level_started)
		{
			//set level data
			cl =this.current_level;
			this.current_level_data = this.levels[cl];
			this.level_started = false;//flag as started
			this.intro_end = false;//do intro
			this.kills = 0;//reset kills count
			this.current_level++;
		}
		//wait till intro ends
		if(!this.intro_end){this.level_intro_do(); return;}

		timer = this.spawn_timer;
		timer.update();
		
	
		if(y_chack_timer(timer))
		{
			ytrace(1);	
			this.spawn_enemy();
		}	
		
	}, //end spawn
	spawn_enemy:function()
	{
		var random_enemy = Math.floor(6*Math.random())+1; 
		var random_spawn = Math.floor(4*Math.random()); 
		
		//check if enemies left 
		if(this.current_level_data && this.kills == this.current_level_data.kills)
		{
			//go to next level
			this.level_started = true;
			ytrace("next level")
		}
		else
		{
			//game over you win
			this.win = true;
		}
		//if no more levels game over
		if(!this.current_level_data){this.game_over=true;return;}
		
		//get spawn point.
		spawn_p = this.spawn_points[random_spawn];
		
		//regular spawn
		if(random_enemy<3 && this.current_level_data.norm >0)
		{
			//spawn norm
			enmy= new enemy(spawn_p[0],spawn_p[1],"alian");
			yadd(this.world,enmy);
			//update level data
			this.current_level_data.norm--;
		}
		//shooty spawn
		if(random_enemy>3 && this.current_level_data.shooty >0)
		{
			
			enmy = new enemy(spawn_p[0],spawn_p[1],"gunalian");
			enmy.enemy_type ="shooty"; 
			yadd(this.world,enmy);
			//update level data
			this.current_level_data.shooty--;
		}
		
		
		
	//	yremove(this.world,e);
	},//end spawn_enemy
	
	level_intro_do:function()
	{
		timer = this.intro_timer;
		timer.update();
		
		//if intro text exists show it
		if(this.intro_qouats[this.current_level-1])
		{
		   this.level_txt.setText(this.intro_qouats[this.current_level-1]);
		}
		if(y_chack_timer(timer))
		{
				//hide intro text
				this.level_txt.setText("")
				ytrace("intro end")
				this.intro_end = true;
		}
	} //end level_intro_do
};//end game_manger.prototype
game_manger_p = game_manger.prototype;
 //////// end game_manger////////
 
function move_to2()
{
	if(!this.targ){return;}
		//move until impact
	angle = yget_angle(this.x,this.y,this.targ.x,this.targ.y);
	//rotate towerds
	y_entity_p.rotate.call(this,angle);
	
	mx = this.speed * Math.cos(angle); 
	my = this.speed * Math.sin(angle) ; 
	distanse = y_entity_p.distanse.call(this,this.targ.x,this.targ.y)

	y_entity_p.move_by.call(this,mx,my);
}//
