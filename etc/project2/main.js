new Vue({
	name:'game',
	el:'#app',
	data:state,
	template:`<div id="app">
	
	<top-bar :turn="turn" :current-player-index="currentPlayerIndex" :players="players">
	</top-bar>

	<card :def="testCard" @play="handlePlay" />
	</div>`,
	computed:{
		testCard() {
			return cards.archers;
		}
	},
	methods:{
		handlePlay (el) {
			console.log('You played a card!', el);
		},
		createTestHand(){
			const cards = [];
 			// Get the possible ids
 			const ids = Object.keys(cards);
 			for (let i = 0; i < 5; i++) {
 				cards.push(testDrawCard());
 			}
 			return cards;
 		},
 		testDrawCard(){
			// Choose a card at random with the ids
			const ids = Object.keys(cards);
			const randomId = ids[Math.floor(Math.random() * ids.length)];
 			// Return a new card with this definition
 			return {
				// Unique id for the card
				uid: cardUid ++,
				// Id of the definition
				id: randomId,
				// Definition object
				def: cards[randomId],
 			}

		}
	}
});

window.addEventListener('resize', () => {
	state.worldRatio = getWorldRatio();
})