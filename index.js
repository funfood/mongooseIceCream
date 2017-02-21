//include mongoose
var mongoose = require('mongoose');
//conect to mongoose on server that we made with `mongod`
mongoose.connect('mongodb://localhost/test');

//creat database
var db = mongoose.connection;
//on error log it
db.on('error', console.error.bind(console, 'connection error:'));
//if we are connected, log it
db.once('open', function(err) {
  //console.log("we are connected!"); //this gets annoying
  if(err) return console.error(err);
});

//make schema.  an object like thing
var iceCreamSchema = mongoose.Schema({
  //id    : type
    flavor: String
});

//adding a tast method to the schema
iceCreamSchema.methods.tast = function () {
  //make a variable -- assign it to the flavor of the ice cream
  var label = this.flavor
    ? "I am " + this.flavor
    : "There is nothing to see here...";
  //output flavor or say there is nothing
  console.log(label);
}
//put our schema in the data base
var iceCream = mongoose.model('iceCream', iceCreamSchema);


//make new flavor
var vanilla = new iceCream({ flavor: 'Vanilla' });

//save it so we can use it later
vanilla.save(function (err, vanilla) {
  if (err) return console.error(err);
  vanilla.tast();
});

//find specific flavor that begins with vanill...
iceCream.find({ flavor: /^vanill/ }, function(err){
  if(err) return console.error(err);
});

//make another flavor
var chocolate = new iceCream({ flavor: 'Chocolate' });

//save it
chocolate.save(function (err, chocolate) {
  if (err) return console.error(err);
  chocolate.tast();
});

//find it
iceCream.find({ flavor: /^chocol/ }, function(err){
  if(err) return console.error(err);
});
