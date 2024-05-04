import mongoose from 'mongoose';
const url = `mongodb+srv://praneshaditya3:30l1if1XXzSXvvB6@cluster0.es9mcig.mongodb.net/`; 
// mongodb url
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  
  export const db = mongoose.connection;
  
  db.on('error', console.error.bind(console, 'Error connecting MongoDB'));
  
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });