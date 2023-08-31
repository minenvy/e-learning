const express = require('express')
const next = require('next')
const fs = require('fs')
const path = require('path')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  // Custom route to serve uploaded files
  server.get('/uploads/:fileName', (req, res) => {
    const filePath = path.join(
      __dirname,
      'public',
      'uploads',
      req.params.fileName
    )
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error('Error reading file:', err)
        return res.status(404).end()
      }
      res.sendFile(data)
      // res.end(data)
    })
  })

  // Default handler for other Next.js routes
  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, () => {
    console.log('> Ready on http://localhost:3000')
  })
})
