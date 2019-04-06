var config ={
    Port:8080,
    secretKey:'sjgafjhdsgfd',
    site: 'http://localhost/#/',
      mongo:{
          hostname:'localhost',
          port:'27017',
          db:'godaddy'

      }
}
config.mongo.url='mongodb://'+config.mongo.hostname+':'+config.mongo.port+'/'+config.mongo.db;

module.exports = config;