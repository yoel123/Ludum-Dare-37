yengine.Game = function(game) {

	
	yworld.call(this,"world_name");


};

yengine.Game.prototype = {
    
    create: function() 
	{
		window.ygame.world.setBounds(0, 0, 1000, 1333);
		if(!this.created){this.created = true}else{return;}
		this.gm = new game_manger(0,0,"")
		yadd(this,this.gm);
        

    },
    

	


	

	quitGame: function() {
		//this.state.start('StartMenu');
		yworld_p.change_world.call(this,'StartMenu');
	}, 
    update: function() 
	{
	
	
		
		
		yworld_p.yupdate.call(this);
	
	}
    
};
