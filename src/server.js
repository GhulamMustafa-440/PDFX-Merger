const express = require('express')
const serverless = require('serverless-http')
const path = require('path')
const app = express()
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const mergedPdf = require('./merge.js')
router.use('/static', express.static('public'))
const port = 3000

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/index.html'))
})

router.post('/merge', upload.array('pdfs', 2), async function (req, res, next) {
if (req.files.length === 2) {

    let d = await mergedPdf(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path))
    res.redirect(`/static/${d}.pdf`)
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
 
} else {
   res.redirect('/') 
}
   
      
})

app.use('/.netlify/functions/api', router)

module.exports.handler = serverless(app)