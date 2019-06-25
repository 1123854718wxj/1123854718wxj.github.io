var mongoose = require('mongoose');
var users_schema = new mongoose.Schema({ username: String, nikename: String, password: String, repwd: String, time: Date });
var User = mongoose.model('User', users_schema);
exports.User = User;

var movies_schema = new mongoose.Schema({ title: String, id: String, year: String, images: Object, directors: Object, rating: Object, genres: Array });
var Movie = mongoose.model('Movie', movies_schema);
exports.Movie = Movie;

var commet_schema = new mongoose.Schema({ title: String, content:String,username:String,mid: String, time:Date, mTitle: String, atgs: Object })
var Comment = mongoose.model('Comment', commet_schema);
exports.Comment = Comment;