
Vue.component('top-bar',{
	props:['players','currentPlayerIndex', 'turn'],
	template:`<div class="top-bar" :class="'player-' + currentPlayerIndex">
		<div class="player p0">{{ players[0].name }}</div>
		<div class="turn-counter">
		<img class="arrow" src="svg/turn.svg" @click="testClick" />
		 <div class="turn">Turn {{ turn }}</div>
 		</div>
 		<div class="player p1">{{ players[1].name }}</div>
	</div>`,
	methods:{
		testClick(){
			console.log('aaaa0');
		}
	}
});

Vue.component('card', {
	props:['def'],
	template: `
	<div class="card" :class="'type-' + def.type" @click="play">
		<div class="title" >{{ def.title }}</div>
		<img class="separator" src="svg/card-separator.svg" />
		<div class="description"><div v-html="def.description"></div></div>
		<div class="note" v-if="def.note"><div v-html="def.note"></div></div>
	</div>
	`,
	methods:{
		play(){
			this.$emit('play');
		}
	}

});

Vue.component('hand', {
	props:['cards'],
	template: `<div class="hand">
		<div class="wrapper">
			<transition-group name="card" tag="div" class="cards" @after-leave="handleLeaveTransitionEnd">
			<card v-for="card of cards" :def="card.def"
			 @play="handlePlay(card)" :key="card.uid" />
			 </transition-group>
		</div>
	</div>`,
	methods:{
		handlePlay(card){
			this.$emit('card-play', card);
		},
		handleLeaveTransitionEnd() {
			this.$emit('card-leave-end');
		}
	}
});

Vue.component('overlay', {
	template:`<div class="overlay" @click="handleClick" >
		<div class="content">
			<slot></slot>
		</div>
	</div>`,
	methods:{
		handleClick(){
			this.$emit('close');
		}
	}
});

Vue.component('overlay-content-player-turn',{
	props:['player'],
	template:`<div>
		<div class="big" v-if="player.skipTurn">
			{{player.name}}, your turn is skipped!
		</div>
		<div class="big" v-else="player.skipTurn">
			{{player.name}}, your turn has come!
		</div>
		<div>Tap to continue</div>
	</div>`
});

Vue.component('overlay-content-last-play', {
	props:['opponent'],
	template:`<div>
		<div v-if="opponent.skippedTurn">
			{{opponent.name}} turn was skipped!!
		</div>
		<template v-else>
			<div>{{opponent.name}} just played!!</div>
			<card :def="lastplayedCard"></card>
		</template>
	</div>`,
	computed:{
		lastplayedCard() {
			return getLastPlayedCard(this.opponent);
		}
	}
});

Vue.component('player-result', {
	props:['player'],
	template:`
		<div class="player-result" :class="result">
			<span class="name">{{player.name}}</span> is
			<span class="result">{{result}}</span>
		</div>
	`,
	computed:{
		result() {
			return this.player.dead ? 'defeated' : 'victorious';
		}
	}
});

Vue.component('overlay-content-game-over',{
	props:['players'],
	template:`<div>
		<div class="big">
			Game Over
		</div>
		<player-result v-for="player in players" :player="player"></player-result>
	</div>`
})