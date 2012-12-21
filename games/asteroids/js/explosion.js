/** @class Ast.Explosion */
declare( 'Ast.Explosion', App.Element, {

	zIndex: 5,
	angle: 0,


	configure: function () {
		this.settings.get('controller').sounds.play('explosion');

		this.angle = Number.random(0, 360).degree();
		this.animation = new Animation({
			sheet   : this.settings.get('sheet'),
			onUpdate: this.redraw,
			onStop  : this.destroy
		});


		for (var i = Number.random(5, 8); i--;) {
			new Ast.Explosion.Debris(this.layer, {
				shape: new Circle(this.shape.center.clone(), 5)
			});
		}
	},

	renderTo: function (ctx) {
		var image = this.animation.get();

		if (image) {
			ctx.drawImage({
				image: image,
				center: this.shape.center,
				angle: this.angle
			});
		}
	}
});

/** @name Ast.Explosion.Debris */
atom.declare( 'Ast.Explosion.Debris', App.Element, {

	opacity: 1,
	zIndex : 7,
	angle  : 0,

	configure: function () {
		var shape = this.shape;
		this.angle = Number.random(0, 360).degree();


		new atom.Animatable(this).animate({
			time: 1500,
			props: {
				'shape.center.x': shape.center.x + Number.random(-200, 200),
				'shape.center.y': shape.center.y + Number.random(-200, 200),
				'opacity': 0
			},
			fn: 'circ-out',
			onTick    : this.redraw,
			onComplete: this.destroy
		});
	},

	renderTo: function (ctx, resources) {
		ctx
			.save()
			.set({ globalAlpha: (this.opacity*1.5).limit(0,1) })
			.drawImage({
				image : resources.get('images').get('debris'),
				center: this.shape.center,
								angle: this.angle
			})
			.restore();
	}
});