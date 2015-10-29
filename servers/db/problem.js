var Tiny = require('tiny');

var dbfile =__dirname + "/prdb.tiny";

module.exports = {
    'set': function(key, value) {
        Tiny(dbfile, function(err, db) {
            db.set(key, value);
        });
    },

    'get': function(key, callback) {
        Tiny(dbfile, function(err, db) {
            db.get(key, function(err, data) {
                callback(data);
            });
        });
    },

    'remove': function(key) {
        Tiny(dbfile, function(err, db) {
            db.remove(key, function(err) {});
        });
    },


    'all': function(callback) {
        Tiny(dbfile, function(err, db) {
            db.all(function(err, docs) {
                callback(docs);
            });
        });
    },

    'each': function(callback, endcallback) {
        Tiny(dbfile, function(err, db) {
            db.each(callback, endcallback);
        });
    },

    'dump': function() {
        Tiny(dbfile, function(err, db) {
            db.dump(true, function(err) {});
        });
    },

    'compact': function() {
        Tiny(dbfile, function(err, db) {
            db.compact(function(err) {});
            
        });
    },

    'filter': function(limitnum,filter,callback) {
        Tiny(dbfile, function(err, db) {
            db.fetch({
              limit: limitnum
             }, filter, function(err, datas){
              callback(datas)
             });
            
        });
    },

    'update': function(key, value) {
        Tiny(dbfile, function(err, db) {
            db.update(key,value, function(err){});
            
        });
    },

};

