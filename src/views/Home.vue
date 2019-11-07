<template>
  <div class="home">
    home
  </div>
</template>

<script>
import api from '@/api';

export default {
  name: 'home',
  mounted() {
    api.getRecommendSongList();
  },
};
</script>
