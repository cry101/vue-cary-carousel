# Vue-Cary-Carousel
![Vue 2.x](https://img.shields.io/badge/vue-2.x-green.svg "Vue 2 Compatible")

A carousel plugin for vue2.

**Note:**
Issue/PR is welcomed, I'll response as soon as possible.

## Usage

#### install
`npm install vue-cary-carousel --save`

#### Quickstart
```javascript
// global
import VueCaryCarousel from 'vue-cary-carousel'
require('vue-cary-carousel/dist/carousel.css')

Vue.use(VueCaryCarousel)

// in your code
<vue-cary-carousel :list="list" /> // list must required


```

##### Options

Parameter | Type | Default | Required | Description
--------- | ---- | ---- | ---- |-----------
list | `array` | `[]` | true | The images list
height | `number`| `500` | false | The container height
imgWidth | `number` | `140` | false | The image width
imgHeight | `number` | `180` | false | The image height
translateZ | `number` | `250` | false | The image positon
autoplay | `boolean` | `false` | false | Whether to auto play
delay | `number` | `3000` | false | The autoplay delay
shadow | `boolean` | `true` | false | The image shadow


##### example
```javascript
<template>
    <vue-cary-carousel :list="list" />
</template>

<script>
    import VueCaryCarousel from 'vue-cary-carousel'
    require('vue-cary-carousel/dist/carousel.css')

    export default{
        components: {
            VueCaryCarousel
        },
        data() {
            return {
                list: [
                    'http://xxx.com/1.png',
                    'http://xxx.com/2.png',
                    'http://xxx.com/3.png',
                ]
            }
        })
    }
</script>
```

##### TODO
*  more style? more animation

## License
MIT
