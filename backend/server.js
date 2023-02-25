const express = require('express');
const cors = require('cors');

const authRouter = require('./routes/auth.route');
const trainerRouter = require('./routes/trainer.route');
const bookingRouter = require('./routes/booking.route');
const userRouter = require('./routes/user.route');
const authRole = require('./middlewares/authRole');

const app = express();
app.use(express.json());
app.use(cors({
    origin : '*'
}))

app.get('/', (req,res) => {
    res.send('Base API')
})

app.use('/auth', authRouter);
app.use('/trainer', authRole(['trainer', 'admin']),trainerRouter);
app.use('/booking',bookingRouter);
app.use('user', authRole(['user','admin']), userRouter);

app.listen(8000, () => {
    console.log('Server started at PORT 8000');
})