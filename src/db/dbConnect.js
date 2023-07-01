const mongoose = require('mongoose');

const dbConnect = async () => {
    mongoose.connect(process.env.MONGODB_URI, {
        // useCreateIndex: true,
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // useFindAndModify: false
    })
        .then(() => console.log('✅ MongoDB Connected Successfully'))
        .catch((err) => console.error('❌ Fail to connect MongoDB🥺',{error:err}));
}

module.exports = dbConnect;