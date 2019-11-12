<template>
	<div class="home">
		<div class="tab-wrap">
			<div>推荐</div>
			<div>个人中心</div>
		</div>
	</div>
</template>

<script>
import api from '@/api'

export default {
	name: 'home',
	mounted () {
		// api.getRecommendSongList();
	}
}
</script>
