import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {},
    registered () {},
    cached () {},
    updatefound () {},
    updated () {
      caches.keys().then(function(names) {
        for (const name of names) caches.delete(name);
      });
    },
    offline () {},
    error () {}
  })
}
