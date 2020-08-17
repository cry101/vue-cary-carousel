<template>
    <div id="app">
        <vue-cary-carousel :list="list" autoplay :delay="2000" />
    </div>
</template>

<script>

export default {
    name: 'App',
    data() {
        return {
            list: [
                require('./assets/2.jpg'),
                require('./assets/3.jpg'),
                require('./assets/4.jpg'),
                require('./assets/5.jpg'),
                require('./assets/6.jpg'),
                require('./assets/1.jpg')
            ]
        }
    }
}
</script>

<style>
*{ margin:0; padding:0;}
body{
    overflow:hidden;
}
</style>
