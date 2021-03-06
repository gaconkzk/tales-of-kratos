ig.module(
	'game.entities.menus.increaseLightningBlade'
)
.requires(
	'game.entities.abstractions.increaseSkill'
)
.defines(function(){
	ig.global.EntityIncreaseLightningBlade = ig.global.EntityIncreaseSkill.extend({
		
	   	
		update: function(){
			if(ig.game.artesCatalog['lightningBlade'].active && ig.game.player.skillPoints > 0){
	    		this.currentAnim = this.anims.idle;
	    	} else {
	    		this.currentAnim = this.anims.fade;
	    		this.currentAnim.alpha = 0.2;
	    	}
	    },

	   	clicked: function() {
	        /* Handle the click */
	        console.log("Clicked plus");
	       	if(ig.game.artesCatalog['lightningBlade'].active){
		        if(ig.game.player.skillPoints > 0){
			        ig.game.artesCatalog['lightningBlade'].level += 1;
			        ig.game.player.skillPoints -= 1;
			        ig.game.artesCatalog['lightningBlade'].points += 1;  
			    }
			}
	    },
	});
});