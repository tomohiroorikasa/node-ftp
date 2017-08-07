var co = require('co');
var path = require('path');
var prompt = require('prompt');

var schema = [{
  name: 'host',
  default: '',
  required: true
},{
  name: 'port',
  default: '21',
  required: true
},{
  name: 'user',
  default: 'anonymous',
  required: true
},{
  name:'password',
  //required: true
},{
  name:'path',
  default: '/',
  //required: true
},{
  name:'file',
  default: '',
  required: true
}];

var Client = require('../lib/connection');

prompt.get(schema, function (err,result) {

  config = {
    host: result.host,
    port: result.port,
    user: result.user,
    password: result.password
  };

  var c = new Client();

  c.connect(config);

  c.on('ready',function(){
    co(function* (){
      yield new Promise(function(resolve,reject){
        c.site('HELP',function(err,str){
          if(!err) {
            console.log('success help',str);
            resolve();
          } else {
            console.log('failed help',str);
            reject();
          }
        });
      });

      yield new Promise(function(resolve,reject){
        c.cwd(result.path,function(err,dir){
          if(!err) {
            console.log('success cwd', result.path);
            resolve();
          } else {
            console.log('failed cwd');
            reject();
          }
        });
      });

      yield new Promise(function(resolve,reject){
        c.pwd(function(err,dir){
          if(!err) {
            console.log('success pwd', dir);
            resolve();
          } else {
            console.log('failed pwd');
            reject();
          }
        });
      });

      if (result.path && result.path!=='') {
        yield new Promise(function(resolve,reject){
          c.list(result.path,function(err,list){
            if(!err) {
              //console.log('success list', list.length);
              console.log('success list', list);
              resolve();
            } else {
              console.log('failed list');
              reject();
            }
          });
        });

        yield new Promise(function(resolve,reject){
          c.nlist(result.path,function(err,nlist){
            if(!err) {
              //console.log('success nlist', nlist.length);
              console.log('success nlist', nlist);
              resolve();
            } else {
              console.log('failed nlist');
              reject();
            }
          });
        });

        if (result.file && result.file!=='') {
          yield new Promise(function(resolve,reject){
            c.get(path.join(result.path,result.file),function(err,rs){
              if(!err) {
                //console.log('success get',rs);
                console.log('success get');
                resolve();
              } else {
                console.log('failed get');
                reject();
              }
            });
          });
        }
      }
      return;
    }).then( function () {
      c.end();
      //console.log('finish');
    }, function (err) {
      console.error(err);
      c.end();
    });
  });
});
