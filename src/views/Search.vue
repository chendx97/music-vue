<template>
	<div class="search">
		<div class="header">
			<i class="iconfont icon-fanhui"></i>
			<span>搜索</span>
		</div>
		<div class="body">
			<div class="search-input">
				<select @change="changeSelect">
					<template v-for="(item, idx) in searchOptions">
						<option :value="item.value" :key="idx">{{item.label}}</option>
					</template>
				</select>
				<input v-model="searchKey" @keyup.enter="getSearchResult" placeholder="请输入搜索关键词" />
			</div>
			<div class="search-result" v-if="searchType === 100">
				<template v-for="(result, idx) in searchResult">
					<div class="result-item" :key="idx">
						<div class="item-left">
							<img :src="result.img1v1Url" alt />
						</div>
						<div class="item-right">
							<p>{{result.name}}</p>
							<p class="achieve-count">
								<span v-if="result.albumSize !== 0">专辑{{result.albumSize}}</span>
								<span v-if="result.mvSize !== 0">mv{{result.mvSize}}</span>
							</p>
						</div>
					</div>
				</template>
			</div>
			<div class="search-result" v-if="searchType === 1">
				<template v-for="(result, idx) in searchResult">
					<div :key="idx">
						<p>{{result.name}}</p>
						<p>
							<span>歌手{{result.artists[0].name}}</span>
							<span>专辑{{result.album.name}}</span>
							<span>时长{{(result.duration / 1000 / 60).toFixed(2)}}</span>
						</p>
					</div>
				</template>
			</div>
		</div>
	</div>
</template>

<script>
import api from '@/api/serverRequests'

export default {
	name: 'search',
	data () {
		return {
			searchType: 1018,
			searchOptions: [
				{
					label: '综合',
					value: 1018
				},
				{
					label: '单曲',
					value: 1
				},
				{
					label: '专辑',
					value: 10
				},
				{
					label: '歌手',
					value: 100
				},
				{
					label: '歌单',
					value: 1000
				},
				{
					label: '用户',
					value: 1002
				},
				{
					label: 'MV',
					value: 1004
				},
				{
					label: '歌词',
					value: 1006
				},
				{
					label: '电台',
					value: 1009
				},
				{
					label: '视频',
					value: 1014
				}
			],
			searchKey: '',
			searchResult: []
		}
	},
	methods: {
		changeSelect (e) {
			this.searchType = this.searchOptions[e.target.selectedIndex].value
			this.getSearchResult()
		},
		getSearchResult () {
			if (!this.searchKey) {
				return
			}
			const resultKeys = {
				1: 'songs',
				10: 'albums',
				100: 'artists',
				1000: 'playlists',
				1002: 'userprofiles',
				1004: 'mvs',
				1006: 'songs',
				1009: 'djRadios',
				1014: 'videos'
			}
			api.getSearchInfo({
				keywords: this.searchKey,
				type: this.searchType
			}, res => {
				const response = res.data.result
				if (response.order) {
					console.log(response)
				} else {
					this.searchResult = response[resultKeys[this.searchType]]
				}
			}, () => {
				console.log('netowrk error')
			})
		}
	}
}
</script>

<style lang="stylus" scoped>
.search {
	.header {
		height: 9.6vw;
		line-height: 9.6vw;
		background: #d43c33;
		color: #fff;

		.iconfont {
			float: left;
			padding-left: 10px;
		}

		span {
			padding-right: 25px;
		}
	}

	.body {
		.search-input {
			display: flex;
			background: #efeff4;
			padding: 10px;

			select {
				width: 15vw;
				height: 8vw;
				line-height: 8vw;
				border-radius: 1vw;
				outline: none;
			}

			input {
				height: 8vw;
				line-height: 8vw;
				margin-left: 10px;
				width: 85vw;
				box-sizing: border-box;
				border: 1px solid rgb(169, 169, 169);
				border-radius: 1vw;
			}
		}

		.search-result {
			text-align: left;

			.result-item {
				display: flex;
				margin-bottom: 5px;

				.item-left {
					width: 16vw;
					display: flex;
					align-items: center;
					padding: 0 10px;

					img {
						width: 100%;
						border-radius: 50%;
					}
				}

				.item-right {
					width: 84vw;
					padding-left: 3vw;
					box-sizing: border-box;

					.achieve-count {
						span:first-child {
							margin-right: 5px;
						}
					}
				}
			}
		}
	}
}
</style>
<style lang="stylus">
::-webkit-input-placeholder {
	padding-left: 10px;
}
</style>
