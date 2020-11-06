<template>
    <footer class="footer">
        <div class="container d-flex justify-content-around">
            <i class="fas fa-user-friends fa-2x"></i>
            <i class="fas fa-phone fa-2x"></i>
            <i v-if="unreadMessages > 0" class="fas fa-comment-dots fa-2x badged" :data-count="unreadMessages"></i>
            <i v-else class="fas fa-comment-dots fa-2x"></i>
            <i class="fas fa-credit-card fa-2x"></i>
            <i class="fas fa-ellipsis-h fa-2x"></i>
        </div>
    </footer>
</template>

<script>
	export default {
		name: "Menu",
    props: {
			unreadMessages: Number,
    }
	}
</script>

<style scoped>
    .footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 50px;
        background-color: #f5f5f5;
    }
    .container {
        width: auto;
        max-width: 680px;
        padding: 0 15px;
    }
    .fas {
        line-height: inherit;
    }
    .badged[data-count] {
        position:relative;
    }
    .badged[data-count]:after {
        position: absolute;
        right: -0.5em;
        content: attr(data-count);
        padding: .2em;
        border-radius: 10em;
        line-height: .9em;
        color: white;
        background: rgba(255,0,0,.75);
        text-align: center;
        width: 1.5em;
        font: bold .4em sans-serif;
    }
</style>
