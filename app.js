require('dotenv').config()

const app = require('./config')

const Prismic = require('@prismicio/client')

const initApi = req => {
  return Prismic.getApi(process.env.PRISMIC_ENDPOINT, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    req: req
  })
}

app.listen(app.get('port'), () => {
})

app.get('/', async (request, response) => {
  const api = await initApi(request)
  const home = await api.query(Prismic.Predicates.at('document.type', 'home'), {
    orderings: '[images]'
  })

  const medias = home.results[0].data
  const gallery = []

  for (let i = 0; i <= 4; i++) {
    const image = medias.gallery[i].image.url
    gallery.push(image)
  }

  response.render('pages/home', {
    home,
    gallery
  })
})

app.get('/about', async (request, response) => {
  const api = await initApi(request)
  const { results: about } = await api.query(Prismic.Predicates.at('document.type', 'about'))

  response.render('pages/about', {
    about
  })
})

app.get('/store', async (request, response) => {
  const api = await initApi(request)
  const { results: products } = await api.query(Prismic.Predicates.at('document.type', 'product'))

  response.render('pages/store', {
    products
  })
})

app.use((request, response) => {
  response.status(404)

  if (request.accepts('html')) {
    return response.redirect('/')
  }

  if (request.accepts('json')) {
    return response.send({ error: 'Not Found' })
  }

  response.type('txt').send('Not Found')
})
