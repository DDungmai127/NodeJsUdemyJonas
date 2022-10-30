const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' }); // must place before app

const app = require('./app');
// console.log(process.env);
const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // trên bài giảng thầy Jonas có vài options đã k được hỗ trợ nữa mà nó trở thành mặc định rồi, những cái trên là những cái còn phải ghi options thôi
    })
    .then((con) => {
        // console.log(con.connections); show connections
        console.log('DB connection successful');
    });

const testTour = new Tour({
    name: 'The Park Camping',
    // rating: 4.7,
    price: 49,
});
// save to database
testTour
    .save()
    .then((doc) => {
        console.log(doc);
    })
    .catch((err) => {
        console.log('Error when save data : ' + err);
    });
// console.log(app.get('env'));
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
console.log('hello world');
