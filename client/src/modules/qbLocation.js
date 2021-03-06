'use strict';

/*
 * QuickBlox JavaScript SDK
 * Location module
 */

var config = require('../qbConfig'),
    Utils = require('../qbUtils');

var geoFindUrl = config.urls.geodata + '/find';
var deprecatedMsg = 'Avoid using it, this feature will be removed in future version. Instread of it use Custom Object (https://quickblox.com/developers/Sample-customobjects-javascript)';

function LocationProxy(service) {
  this.service = service;
  this.geodata = new GeoProxy(service);
}

function GeoProxy(service){
  this.service = service;
}

GeoProxy.prototype = {
  create: function(params, callback){
    Utils.QBLog('[GeoProxy]', 'create', params);
    Utils.QBLog('Deprecated!', deprecatedMsg);

    this.service.ajax({url: Utils.getUrl(config.urls.geodata), data: {geo_data: params}, type: 'POST'}, function(err,result){
      if (err){ callback(err, null); }
      else { callback (err, result.geo_datum); }
    });
  },

  update: function(params, callback){
    Utils.QBLog('Deprecated!', deprecatedMsg);

    var allowedProps = ['longitude', 'latitude', 'status'], prop, msg = {};
    for (prop in params) {
      if (params.hasOwnProperty(prop)) {
        if (allowedProps.indexOf(prop)>0) {
          msg[prop] = params[prop];
        }
      }
    }

    Utils.QBLog('[GeoProxy]', 'update', params);

    this.service.ajax({url: Utils.getUrl(config.urls.geodata, params.id), data: {geo_data:msg}, type: 'PUT'},
                     function(err,res){
                      if (err) { callback(err,null);}
                      else { callback(err, res.geo_datum);}
                     });
  },

  get: function(id, callback){
    Utils.QBLog('[GeoProxy]', 'get', id);
    Utils.QBLog('Deprecated!', deprecatedMsg);

    this.service.ajax({url: Utils.getUrl(config.urls.geodata, id)}, function(err,result){
       if (err) { callback (err, null); }
       else { callback(null, result.geo_datum); }
    });
  },

  list: function(params, callback){
    Utils.QBLog('Deprecated!', deprecatedMsg);

    if (typeof params === 'function') {
      callback = params;
      params = undefined;
    }

    Utils.QBLog('[GeoProxy]', 'find', params);

    this.service.ajax({url: Utils.getUrl(geoFindUrl), data: params}, callback);
  },

  delete: function(id, callback){
    Utils.QBLog('[GeoProxy]', 'delete', id);
    Utils.QBLog('Deprecated!', deprecatedMsg);

    this.service.ajax({url: Utils.getUrl(config.urls.geodata, id), type: 'DELETE', dataType: 'text'},
                     function(err,res){
                      if (err) { callback(err, null);}
                      else { callback(null, true);}
                     });
  },

  purge: function(days, callback){
    Utils.QBLog('[GeoProxy]', 'purge', days);
    Utils.QBLog('Deprecated!', deprecatedMsg);

    this.service.ajax({url: Utils.getUrl(config.urls.geodata), data: {days: days}, type: 'DELETE', dataType: 'text'},
                     function(err, res){
                      if (err) { callback(err, null);}
                      else { callback(null, true);}
                     });
  }
};

module.exports = LocationProxy;
