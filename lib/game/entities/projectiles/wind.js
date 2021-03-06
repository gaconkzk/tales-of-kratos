ig.module(
	'game.entities.projectiles.wind'
)
.requires(
	'impact.entity'
)

.defines(function(){
	EntityWind = ig.Entity.extend({
		/* Set up projectile properties */
		size: {x: 38, y: 38},
		offset: {x: 0, y: 0},
		animSheet: new ig.AnimationSheet('media/windattack.png', 38, 38),
		maxVel: {x:100, y: 0},
		speed: 100,
        gravity: 0,
        lifetime: 0,

		/* Set up collision properties */
		type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.ACTIVE,
        name: 'wind',

		/* init method */
		init: function( x, y, settings ) {
			// Define animation frames
			this.addAnim('idle', 0.1, [0, 1, 2]); 
			// Read settings from parent object (player.js)
        	this.parent( x , y, settings );           
        	// Assign velocity based on flip property of player (stored in settings)
            this.vel.x = settings.flip ? -1*this.speed : 1*this.speed;
            // Flip projectile based on player's flip value
            this.currentAnim.flip.x = settings.flip;
        },

        update: function(){
            this.parent();
            console.log(this.lifetime);
            this.lifetime++;
            if(this.lifetime > 120){
                this.kill();
                this.lifetime = 0;
            }
        },

        /* Kill projectile on collision on the x-axis */
        handleMovementTrace: function(res){
            this.parent(res);
            if(res.collision.x){
            	this.kill();
            }
        },

        collideWith: function(other, axis){
            if(other instanceof EntityArcher){
                ig.game.hitSFX.volume = 0.7;
                ig.game.hitSFX.play();
                console.log('Wind fang hit archer');
                ig.game.screenshakeIntensity = 10;
                other.receiveDamage(5, this);
                this.kill();
            } else if (other instanceof EntityStone){
                this.kill();
            } 

            else {
                other.kill();
                this.kill();
            }
        },

	});
});