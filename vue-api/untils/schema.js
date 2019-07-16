
var mongoose = require("mongoose");
var users_schema = new mongoose.Schema({ username: String, nickname: String, password: String, dbpwd: String, time: Date, photo: String, content: String });
var User = mongoose.model("User", users_schema);

exports.User = User;

var movies_schema = new mongoose.Schema({ id: String, title: String, year: String, images: Object, directors: Object, rating: Object, genres: Array });
var Movie = mongoose.model("Movie", movies_schema);

exports.Movie = Movie;


var comments_schema = new mongoose.Schema({ title: String, content: String, username: String, mid: String, time: Date, mTitle: String, mv: Object });
var Comment = mongoose.model("Comment", comments_schema);

exports.Comment = Comment;


var goods_schema = new mongoose.Schema({ name: String, price: Number, discount: Number, img: String, type: Object, _id: String });
var Good = mongoose.model("Good", goods_schema);

exports.Good = Good;

var cars_schema = new mongoose.Schema({ username: String, goodId: String, count: Number, good: Object, money: Number });
var Car = mongoose.model("Car", cars_schema);
exports.Car = Car;

var addrs_schema = new mongoose.Schema({ username: String, myMsg: Object });
var Addr = mongoose.model("Addr", addrs_schema);
exports.Addr = Addr;