const express = require('express');
const cors = require('cors');

const authRouter = require('./routes/auth.route');
const trainerRouter = require('./routes/trainer.route');

const app = express();
app.use(express.json());
app.use(cors({
    origin : '*'
}))

app.get('/', (req,res) => {
    res.send('Base API')
})

app.use('/auth', authRouter);
app.use('/trainer', trainerRouter);

app.listen(8000, () => {
    console.log('Server started at PORT 8000');
})