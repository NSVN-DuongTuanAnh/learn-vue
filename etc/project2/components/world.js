
const cloudAnimationDurations = {
 	min: 10000, // 10 sec
 	max: 50000, // 50 sec
 }

 Vue.component('castle', {
 	template:`
 	<div class="castle" :class="'player-' + index">
 	<img :src="'svg/castle' + index + '.svg'" alt="" class="building" />
 	<img :src="'svg/ground' + index + '.svg'" alt="" class="ground" />
 	<castle-banners :player="player"></castle-banners>
 	</div>
 	`,
 	props:['player', 'index']
 });

 Vue.component('castle-banners', {
 	template: `<div class="banners">
 	<!-- Food -->
 	<img class="food-icon" src="svg/food-icon.svg" />
 	<bubble type="food" :value="player.food" :ratio="foodRatio" />
 	<banner-bar class="food-bar" color="#288339" :ratio="foodRatio"
 	/>
 	<!-- Health -->
 	<img class="health-icon" src="svg/health-icon.svg" />
 	<bubble type="health" :value="player.health" :ratio="healthRatio" />
 	<banner-bar class="health-bar" color="#9b2e2e" :ratio="healthRatio"
 	/>
 	</div>`,
 	props: ['player'],
 	computed:{
 		foodRatio() {
 			return this.player.food / maxFood;
 		},
 		healthRatio(){
 			return this.player.health / maxHealth;
 		}
 	}
 });
 Vue.component('bubble',{
 	props:['type','value','ratio'],
 	template:`<div class="stat-bubble" :class="type + '-bubble'" :style="bubbleStyle">
 	<img :src="'svg/' + type + '-bubble.svg' " alt=""  />
 	<div class="counter">{{value}}</div>		
 	</div>`,
 	computed:{
 		bubbleStyle() {
 			return {
 				top: (this.ratio * 220 + 40) * state.worldRatio + 'px'
 			}
 		}
 	}
 });
 Vue.component('banner-bar', {
 	template:'#banner',
 	props: ['color', 'ratio'],
 	computed: {
 		targetHeight () {
 			return 220 * this.ratio + 40
 		},
 	},
 	data () {
 		return {
 			height: 0
 		}
 	},
 	created() {
 		this.height = this.targetHeight;
 	},
 	watch: {
 		targetHeight(val, oldVal) {
 			const vm = this;
 			new TWEEN.Tween({value: oldVal})
 			.easing(TWEEN.Easing.Cubic.InOut)
 			.onUpdate(function(argument) {
 				vm.height = val.toFixed(0)
 			})
 			.start()
 		}
 	}
 });

  Vue.component('cloud', {
    template: `<div class="cloud" :class="'cloud-' + type" :style="style">
      <img :src="'svg/cloud' + type + '.svg'" @load="initPosition" />
    </div>`,
    props: ['type'],
    data () {
      return {
        style: {
          transform: 'none',
          zIndex: 0,
        },
      }
    },
    methods: {
      setPosition (left, top) {
        // Use transform for better performance
        this.style.transform = `translate(${left}px, ${top}px)`
      },
  
      initPosition () {
        // Element width
        const width = this.$el.clientWidth
        this.setPosition(-width, 0)
      },
  
      startAnimation (delay = 0) {
        const vm = this
  
        // Element width
        const width = this.$el.clientWidth
  
        // Random animation duration
        const { min, max } = cloudAnimationDurations
        const animationDuration = Math.random() * (max - min) + min
  
        // Bing faster clouds forward
        this.style.zIndex = Math.round(max - animationDuration)
  
        // Random position
        const top = Math.random() * (window.innerHeight * 0.3)
  
        new TWEEN.Tween({ value: -width })
          .to({ value: window.innerWidth }, animationDuration)
          .delay(delay)
          .onUpdate(function () {
            vm.setPosition(this.value, top)
          })
          .onComplete(() => {
            // With a random delay
            this.startAnimation(Math.random() * 10000)
          })
          .start()
      },
    },
    mounted () {
      // We start the animation with a negative delay
      // So it begins midway
      this.startAnimation(-Math.random() * cloudAnimationDurations.min)
    },
  })


