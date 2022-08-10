const mongoose = require('mongoose');
const app = require('./app');

const port = 3000

let server

mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>
{
  server = app.listen(port, () => {
          console.log(`Example app listening on port ${port}`)
        })
});
