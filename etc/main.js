var eventBus = new Vue();

Vue.component('product', {
	props:{
		sale: {
			type: String,
			default:"sale"
		}
	},
	template: `<div class="jumbotron" >
	<div class="row">
	<div class="col-md-6">
	<a :href="url" target="_blank">
	<img :src="img" id="productImage" alt="">
	</a>
	</div>
	<div class="col-md-6">
	<h1>{{title}}</h1>
	<p class="lead">{{desc}}</p>
	<div v-if="total > 10">In Stock</div>

	<div v-else-if="total <= 10 && total >=0"> Sold out</div>
	<div v-else> Out of stock </div>

	<div class="colorDiv" @click="changeProductImg(color)" v-for="color in colors" v-bind:class="color.name" :key="color.id">

	</div>

	<br>
	<ul class="list-group">
	<li class="list-group-item" v-for="detail in details">{{detail}}</li>
	</ul>

	<br>
	<button v-on:click="addToCart" class="btn btn-outline-success my-2 my-sm-0" type="button">Add to cart ({{sale}})</button>
	<product-tabs></product-tabs>
	</div>
	</div>
	</div>`,
	data() {
		return {
			product:"Samsung",
			model:"Galaxy S10",
			desc:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, et mollitia sequi possimus corporis aperiam aliquam veritatis dolores porro nulla aspernatur atque culpa iure nesciunt tenetur, itaque consectetur repellat dignissimos!',
			img:'https://www.techmart.lk/pub/media/catalog/product/cache/1/image/500x500/e9c3970ab036de70892d86c6d221abfe/s/a/samsung-galaxy-s-10-flemingo-pink.png',
			url:'https://www.mobile57.com/sy/phones/samsung-galaxy-s10-plus-7765',
			total: 100,
			details:['Camera', 'True display', 'Samsung flagship'],
			colors:[
			{
				id:1,
				name:"red",
				img:'https://www.techmart.lk/pub/media/catalog/product/cache/1/image/500x500/e9c3970ab036de70892d86c6d221abfe/s/a/samsung-galaxy-s-10-flemingo-pink.png'
			},
			{
				id:2,
				name:"blue",
				img:'https://www.buymobiles.net/library/images/handsets/samsung/samsung-galaxy-s10-128gb-black.png'
			}
			]
		}
	},
	methods: {
		addToCart: function() {
			this.$emit('add-to-cart');
		},
		changeProductImg:function(color) {
			this.img = color.img;
		},
		alertChovui: function(){
			alert('aaaaaaaa');
		}
	},
	computed:{
		title() {
			return this.product + " " + this.model
		}
	}
});

Vue.component('product-tabs', {
	template: `<div>
		<span class="tab"
			:class="{activeTab: selectedTab === tab}"
			v-for = "(tab, index) in tabs" :key="index"
			@click="selectedTab = tab"
		> {{tab}}
		</span>
		<button type="button" class="btn btn-primary">
			
		</button>
	</div>`,
	data() {
		return {
			tabs:['tab1', 'tab2'],
			selectedTab: 'tab1'
		}
	}
});

var app = new Vue({
	el:'#app',
	data:{
		cart: 0
	},
	methods:{
		addToCart: function() {
			this.cart += 1;
		}
	},
	mounted() {
		eventBus.$on('test-bus', productReview => {
			alert('Buss arriveeeeeeeee');
		})
	}	
});

