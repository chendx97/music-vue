<template>
	<div class="home">
		<div class="header">
			<div class="header-menu">
				<div class="setting">
					<i class="iconfont icon-toggle"></i>
				</div>
				<div class="tab-wrap">
					<div :class="currentTab ? '' : 'active'" @click="switchTab(0)">推荐</div>
					<div :class="currentTab ? 'active' : ''" @click="switchTab(1)">个人中心</div>
				</div>
				<div class="search">
					<i class="iconfont icon-huaban"></i>
				</div>
			</div>
			<swipe class="my-swipe" :speed="3000">
				<swipe-item class="slide1"></swipe-item>
				<swipe-item class="slide2"></swipe-item>
				<swipe-item class="slide3"></swipe-item>
			</swipe>
		</div>
		<div class="body">{{currentTab ? personal : recommand}}</div>
	</div>
</template>

<script>
// import api from '@/api'
export default {
	name: 'home',
	data () {
		return {
			currentTab: 0,
			recommand: 'aa',
			personal: 'bb'
		}
	},
	mounted () {
		// api.getRecommendSongList(res => {
		// 	console.log(res)
		// 	this.result = res.data.result
		// }, err => {
		// })
	},
	methods: {
		switchTab (idx) {
			this.currentTab = idx
		}
	}
}
</script>

<style lang="stylus" scoped>
.home {
	.header {
		background: #d43c33;
		color: #fff;
		height: 40vw;
		padding: 0 5vw;

		.header-menu {
			height: 10vw;
			line-height: 10vw;
			display: flex;
			justify-content: space-between;

			.tab-wrap {
				width: 40%;
				display: flex;
				justify-content: space-between;
				font-size: 4vw;
				color: #f18686;

				.active {
					color: #fff;
				}
			}
		}

		.my-swipe {
			width: 100%;
			background: #888873;
			border-radius: 1.3vw;
		}
	}
}
</style>
<style lang="stylus">
.mint-swipe-indicator {
	background: rgba(255, 255, 255, 0.8) !important;

	&.is-active {
		background: rgba(255, 255, 255, 0.5) !important;
	}
}
</style>
