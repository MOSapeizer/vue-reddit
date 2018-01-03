// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()
const PostController = jsonServer.router('src/server/post.json')
const parser = jsonServer.bodyParser
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(parser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()

    let content = req.body.content || ''
    let isImage = content.match(/\.(jpeg|jpg|gif|png)$/) != null
    req.body.author = req.body.author || "wretch"
    req.body.title = req.body.title || "missing title"
    req.body.content = content;
    req.body.thumbnail = isImage ? content : ''
  }

  next()
})
PostController.render = (req, res) => {
  let data = res.locals.data
  if (!Array.isArray(data)) {
    data.show = false
    return res.jsonp(data)
  }

  res.jsonp(data.map(post => {
    post.show = false
    return post
  }))
}
server.use(PostController)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
