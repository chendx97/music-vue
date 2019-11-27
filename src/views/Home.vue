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
			recommendList: []
		}
	},
	mounted () {
		api.getBannerInfo(1, res => {
			if (res.data.code === 200) {
				this.bannerList = res.data.banners
			}
		}, err => {
			console.log(err)
		})
		api.getRecommendInfo(res => {
			if (res.data.code === 200) {
				this.recommendList = res.data.result
			}
		}, err => {
			console.log(err)
		})
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
