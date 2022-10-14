import {createApp} from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.directive('scroll', (el, binding) => {
    document.addEventListener('scroll', function () {
        console.log(window.scrollY, el.clientHeight)

        if (window.scrollY + window.innerHeight >= el.scrollHeight) {
            binding.value()
        }
    })
})


app.mount('#app')
