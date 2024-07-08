<template>
    <div class="tags-main">
        <div class="tag">
            Esto es contenido para probar
        </div>
        <div class="tag">
            Esto es contenido para probar
        </div><div class="tag">
            Esto es contenido para probar
        </div>
        <div class="tag">
            Esto es contenido para probar
        </div>
        <div class="tag">
            Esto es contenido para probar
        </div>
        <div class="tag">
            Esto es contenido para probar
        </div>
        <div class="tag">
            Esto es contenido para probar
        </div>
    </div>
</template>


<style lang="sass" scoped>
@import "../css/variables.sass"

.tags-main
    display: flex
    width: 100%
    padding: 2rem
    flex-direction: row
    flex-wrap: wrap
    .tag
        width: 100%
        margin-bottom: 2rem
        background: $white
        box-shadow: 0 0 10px #0000002c
        padding: 2rem
        text-align: center
</style>