<template>
    <div class="loader"></div>
</template>

<script setup>

</script>

<style scoped>

.loader {
    width: 60px;
    aspect-ratio: 4;
    --_g: no-repeat radial-gradient(circle closest-side, #dcdcdc 90%, #0000);
    background:
        var(--_g) 0% 50%,
        var(--_g) 50% 50%,
        var(--_g) 100% 50%;
    background-size: calc(100%/3) 100%;
    animation: l7 1s infinite linear;
}

@keyframes l7 {
    33% {
        background-size: calc(100%/3) 0%, calc(100%/3) 100%, calc(100%/3) 100%
    }

    50% {
        background-size: calc(100%/3) 100%, calc(100%/3) 0%, calc(100%/3) 100%
    }

    66% {
        background-size: calc(100%/3) 100%, calc(100%/3) 100%, calc(100%/3) 0%
    }
}
</style>