// Grupos
this.enemies = this.physics.add.group({
            
});
this.cartBoardBoxes = this.physics.add.group({
   setImmovable:true
});
this.woodBoxes = this.physics.add.group({
   setImmovable:true
});
this.objects=this.physics.add.group({
   setImmovable:true
});



//Añadir a los grupos (El createFromObjects transforma cosas de un tilemap en objetos)
let cardBoardArray = this.map.createFromObjects('objetos', [{ gid: 561, classType: CardBoard, key: 'cartBoard' }]);
		this.cartBoardBoxes.addMultiple(cardBoardArray);
		cardBoardArray.forEach(obj => {
			obj.body.setImmovable();
		});

		// Cajas de madera
		let woodBoxesArray = this.map.createFromObjects('objetos', [{ gid: 562, classType: WoodBox, key: 'woodBox' }]);
		this.woodBoxes.addMultiple(woodBoxesArray);
		woodBoxesArray.forEach(obj => {
			obj.body.setImmovable();
		});

		// Persecutores
		let EnemyPersecutorArray = this.map.createFromObjects('objetos', [{ gid: 564, classType: Persecutor, key: 'persecutor' }]);
		EnemyPersecutorArray.forEach(obj => {
			obj.setScale(2);
		});
		this.enemies.addMultiple(EnemyPersecutorArray);

		// Lanzadores
		let EnemyLanzadorArray = this.map.createFromObjects('objetos', [{ gid: 565, classType: Lanzador, key: 'lanzador' }]);	
		this.enemies.addMultiple(EnemyLanzadorArray);
		EnemyLanzadorArray.forEach(obj => {
			obj.setScale(2.5);
			obj.body.setImmovable();
		});