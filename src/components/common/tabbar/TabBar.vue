<template>
	<div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
	export default {
		name: "TabBar",
		components: {
		
		}
	}
</script>

<style scoped>
#tab-bar {
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0px;
  background-color: #f6f6f6;
  box-shadow: 0px -2px 5px rgba(100,100,100,.1);
}
</style>