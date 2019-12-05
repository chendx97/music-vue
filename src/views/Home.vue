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
					<i @click="goSearch" class="iconfont icon-huaban"></i>
				</div>
			</div>
			<div class="header-menu2" ref="header2">
				<div class="address">杭州</div>
				<div class="search" @click="goSearch">请输入关键词</div>
				<div class="personnal">
					<i class="iconfont icon-gerenzhongxinwoderenwubiaozhuntouxianxingcopy"></i>
				</div>
			</div>
			<template v-if="currentTab">personal</template>
			<template v-else>
				<swipe class="my-swipe" :speed="3000">
					<template v-for="(banner, idx) in bannerList">
						<swipe-item :class="`slide${idx}`" :key="idx">
							<img :src="banner.pic" />
						</swipe-item>
					</template>
				</swipe>
			</template>
		</div>
		<div class="body">
			<div class="menu">
				<template v-for="(item, idx) in menuList">
					<div class="menu-item" :key="idx">
						<div class="item-wrap">
							<i :class="`iconfont ${item.icon}`"></i>
						</div>
						<div class="under-text">{{item.title}}</div>
					</div>
				</template>
			</div>
			<div class="recommend-list">
				<p class="recommend-title">推荐歌单</p>
				<div class="recommend-wrap">
					<template v-for="(song, idx) in recommendList">
						<div class="recommend-item" :key="idx">
							<img :src="song.picUrl" alt />
							<p class="recommend-desc">{{song.name}}</p>
						</div>
					</template>
				</div>
			</div>
			<div class="list-over">已经到底啦~</div>
			<transition name="el-fade-in">
				<div class="back-top" v-show="isShowBackTop" @click="scrollToTop">
					<i class="iconfont icon-huidingbu"></i>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
import api from '@/api/serverRequests'

export default {
	name: 'home',
	data () {
		return {
			currentTab: 0,
			bannerList: [],
			menuList: [
				{
					icon: 'icon-erji',
					title: '私人FM'
				},
				{
					icon: 'icon-tuijian',
					title: '每日推荐'
				},
				{
					icon: 'icon-gedan',
					title: '歌单'
				},
				{
					icon: 'icon-paixingbang',
					title: '排行榜'
				}
			],
			recommendList: [],
			isShowBackTop: false
		}
	},
	mounted () {
		api.getBannerInfo(1, res => {
			if (res.data.code === 200) {
				this.bannerList = res.data.banners
			}
		}, () => {
			console.log('netowrk error')
		})
		api.getRecommendInfo(res => {
			if (res.data.code === 200) {
				this.recommendList = res.data.result
			}
		}, () => {
			console.log('netowrk error')
		})
		window.addEventListener('scroll', this.handleScroll)
	},
	beforeDestroy () {
		window.removeEventListener('scroll', this.handleScroll)
	},
	methods: {
		switchTab (idx) {
			this.currentTab = idx
		},
		handleScroll () {
			const scrollTop = window.pageYOffset || document.documentElement.scrollTop
				|| document.body.scrollTop
			if (scrollTop > 500) {
				this.isShowBackTop = true
			} else {
				this.isShowBackTop = false
			}
			if (scrollTop > 5) {
				this.$refs.header2.style.transform = 'translateY(0vw)'
			} else {
				this.$refs.header2.style.transform = 'translateY(-9.6vw)'
			}
		},
		scrollToTop () {
			let scroll = document.documentElement.scrollTop
			let timer = null
			cancelAnimationFrame(timer)
			timer = requestAnimationFrame(function fn () {
				if (scroll > 0) {
					scroll -= 50
					document.documentElement.scrollTop = scroll
					timer = requestAnimationFrame(fn)
				} else {
					cancelAnimationFrame(timer)
				}
			})
		},
		goSearch () {
			this.$router.push('/search')
		}
	}
}
</script>

<style lang="stylus" scoped>
.home {
	background: #fff;

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
				color: #f18686;

				.active {
					color: #fff;
				}
			}
		}

		.header-menu2 {
			display: flex;
			justify-content: space-between;
			width: 100%;
			height: 11.3vw;
			line-height: 11.3vw;
			padding: 0 5vw;
			box-sizing: border-box;
			background: #d43c33;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 100;
			transform: translateY(-9.6vw);
			transition: all 0.5s ease;

			.search {
				text-align: center;
				color: #999999;
				width: 70%;
				height: 6.7vw;
				line-height: 6.7vw;
				border-radius: 3.3vw;
				background: #f5f5f5;
				align-self: center;
			}
		}

		.my-swipe {
			width: 100%;
			background: #888873;
			border-radius: 1.3vw;

			img {
				width: 100%;
				height: 100%;
			}
		}
	}

	.menu {
		margin-top: 10vw;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 5.3vw 4.2vw;

		.item-wrap {
			height: 13.3vw;
			width: 13.3vw;
			line-height: 13.3vw;
			background: #d43c33;
			border-radius: 50%;
			margin: 0 10px;

			i {
				color: #fff;
			}
		}

		.under-text {
			padding-top: 2vw;
			text-align: center;
		}
	}

	.recommend-list {
		padding: 0 4.2vw;

		.recommend-title {
			text-align: left;

			&:before {
				content: '';
				display: inline-block;
				margin-right: 1.3vw;
				width: 0.6vw;
				height: 3.7vw;
				vertical-align: middle;
				background: #d43c33;
			}
		}

		.recommend-wrap {
			display: flex;
			flex-wrap: wrap;

			.recommend-item {
				width: 32%;
				margin-right: 2%;

				&:nth-of-type(3n + 3) {
					margin-right: 0;
				}

				img {
					width: 100%;
				}

				.recommend-desc {
					text-align: left;
				}
			}
		}
	}

	.list-over {
		font-size: 3.2vw;
		height: 7.3vw;
		line-height: 7.3vw;
		text-align: center;
	}

	.back-top {
		position: fixed;
		bottom: 50px;
		right: 5%;
		width: 50px;
		height: 50px;
		border: 1px solid silver;
		border-radius: 50%;
		background-color: hsla(0, 0%, 100%, 0.85);
		line-height: 50px;
		z-index: 100;
		transition: 0.3s;

		i {
			color: silver;
			font-size: 25px;
		}
	}
}
</style>
<style lang="stylus">
.mint-swipe-indicator {
	background: rgba(255, 255, 255, 0.8) !important;

	&.is-active {
		background: rgba(255, 255, 255, 0.2) !important;
	}
}
</style>
