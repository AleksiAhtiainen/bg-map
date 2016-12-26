import express from 'express';

const app = express();

app.use('/', express.static('src/client'));
app.use('/material-design-icons/', express.static('node_modules/material-design-icons'));

app.listen(process.env.PORT || 3000);
