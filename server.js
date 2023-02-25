const express = require('express')
const path = require('path')
const app = express()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const mergedPdf = require('./merge.js')
app.use('/static', express.static('public'))
const port = 3000

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/index.html'))
})

app.post('/merge', upload.array('pdfs', 2), async function (req, res, next) {
if (req.files.length === 2) {

    let d = await mergedPdf(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path))
    res.redirect(`/static/${d}.pdf`)
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
 
} else {
   res.redirect('/') 
}
   
      
})



app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on localhost http://localhost:3000')
})