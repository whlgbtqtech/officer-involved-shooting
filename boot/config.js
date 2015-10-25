
// # config

var path = require('path');
var autoprefixer = require('autoprefixer-core');

var parentDir = path.join(__dirname, '..');
var appDir = path.join(parentDir, 'app');

var pkg = require(path.join(parentDir, 'package'));

var assetsDir = path.join(parentDir, 'assets');
var distDir = path.join(parentDir, 'dist');
var publicDir = path.join(assetsDir, 'public');
var templatesDir = path.join(assetsDir, 'emails');
var viewsDir = path.join(appDir, 'views');

var maxAge = 24 * 60 * 60 * 1000;

exports = module.exports = function() {

  var config = {

    defaults: {
      basicAuth: {
        enabled: false,
        name: 'admin',
        pass: 'password'
      },
      facebook: {
        enabled: false,
        appID: '',
        appSecret: '',
        scope: [ 'email' ]
      },
      google: {
        enabled: false,
        scope: [
          'https://www.googleapis.com/auth/userinfo.profile',
          'https://www.googleapis.com/auth/userinfo.email'
        ],
        clientID: '',
        clientSecret: ''
      },
      pkg: pkg,
      cache: false,
      showStack: true,
      assetsDir: assetsDir,
      distDir: distDir,
      publicDir: publicDir,
      views: {
        dir: viewsDir,
        engine: 'jade'
      },
      password: {
        minStrength: 0,
        limitAttempts: false
      },
      email: {
        templates: {
          dir: templatesDir,
          options: {
          }
        },
        // <https://github.com/andris9/Nodemailer>
        transport: {
          service: 'gmail',
          auth: {
            user: 'hi@eskimo.io',
            pass: 'abc123'
          }
        },
        headers: {
          from: 'hi@eskimo.io'
        }
      },
      hipchat: {
        level: 'error',
        silent: false,
        token: '',
        notify: false,
        color: 'yellow',
        room: '',
        from: '',
        messageFormat: 'text'
      },
      session: {
        secret: 'NuYYD#EDJJ#qP7iXS$2@gIJUFrOfyoIjU1o&Ay$0im]ipB^nwz0)AFOEsM4tj&[XIcGwEn9aS%RRb6Wl@sRQF(*oea2oz0NZkM7eVzO9O1I#lJK[N(INcSB$68G&aU)!Dc',
        key: 'officer-involved-shooting',
        cookie: {
          maxAge: maxAge
        },
        resave: true,
        saveUninitialized: true
      },
      trustProxy: true,
      updateNotifier: {
        enabled: true,
        dependencies: {},
        updateCheckInterval: 1000 * 60 * 60,
        updateCheckTimeout: 1000 * 20
      },
      staticServer: {
        maxAge: maxAge
      },
      server: {
        host: 'localhost',
        cluster: false,
        ssl: {
          enabled: false,
          options: {}
        }
      },
      cookieParser: '@t[jPu&Uh$9FgLZW]dwSH[*EmnZN%D6k#Z1zNsr]*!@bh&Si!uQvY1FaPLe9Ptaahtq!7^!XotiUJ%i3Q8xxHlx2)(GpIyX9qFSUtV((Y!)qFhA$g37oXU4%XkHA)e]te]',
      csrf: {
        enabled: true,
        options: {
          cookie: {
            maxAge: maxAge
          }
        }
      },
      mongo: {
        host: 'localhost',
        port: 27017,
        opts: {},
        // faster - don't perform 2nd request to verify
        // log message was received/saved
        safe: false
      },
      knex: {
        client: 'mysql'
      },
      redis: {
        host: 'localhost',
        port: 6379,
        maxAge: maxAge
      },
      output: {
        handleExceptions: false,
        colorize: true,
        prettyPrint: false
      },
      logger: {
        'console': true,
        requests: true,
        mongo: false,
        file: false,
        hipchat: false,
        slack: false
      },
      less: {
        enabled: true,
        path: publicDir,
        options: {
          force: true,
          postprocess: {
            css: function(css, req) {
              return autoprefixer.process(css).css;
            }
          }
        }
      },
      jade: {
        amd: {
          path: '/js/tmpl/',
          options: {}
        }
      },
      liveReload: {
        enabled: false,
        port: 35729
      }
    },

    test: {
      url: 'http://localhost:5000',
      server: {
        env: 'test',
        port: 5000
      },
      mongo: {
        dbname: 'officer-involved-shooting_test',
        db: 'officer-involved-shooting_test' // keep for winston logger
      },
      redis: {
        prefix: 'officer-involved-shooting_test',
      },
      logger: {
        'console': false,
        requests: false
      }
    },

    development: {
      cache: true,
      url: 'http://officer-involved-shooting-dev.eskimo.io',
      server: {
        env: 'development',
        port: 3000,
      },
      mongo: {
        dbname: 'officer-involved-shooting_development',
        db: 'officer-involved-shooting_development' // keep for winston logger
      },
      knex: {
        debug: true,
        connection: {
          host: '127.0.0.1',
          user: 'root',
          password: '',
          database: 'officer-involved-shooting_development'
        }
      },
      redis: {
        prefix: 'officer-involved-shooting_development'
      }
    },

    staging: {
      cache: true,
      url: 'http://officer-involved-shooting-stag.eskimo.io',
      password: {
        minStrength: 1,
        limitAttempts: true
      },
      views: {
        dir: path.join(assetsDir, 'dist'),
      },
      publicDir: path.join(assetsDir, 'dist'),
      showStack: false,
      updateNotifier: {
        enabled: false,
      },
      server: {
        env: 'staging',
        port: 3080,
        cluster: true
      },
      mongo: {
        dbname: 'officer-involved-shooting_staging',
        db: 'officer-involved-shooting_staging' // keep for winston logger
      },
      knex: {
        connection: {
          host: '127.0.0.1',
          user: 'root',
          password: '',
          database: 'officer-involved-shooting_staging'
        }
      },
      redis: {
        prefix: 'officer-involved-shooting_staging'
      },
      output: {
        colorize: false
      },
      logger: {
        'console': true,
        requests: true,
        mongo: false,
        file: false
        /*
        // <https://github.com/flatiron/winston#file-transport>
        file: {
          filename: '/var/log/igloo.log',
          // TODO: maxsize
          // TODO: maxFiles
          timestamp: true
        }
        */
      }
    },

    production: {
      cache: true,
      url: 'http://officer-involved-shooting-prod.eskimo.io',
      password: {
        minStrength: 1,
        limitAttempts: true
      },
      views: {
        dir: path.join(distDir, 'views'),
      },
      publicDir: path.join(distDir, 'assets'),
      showStack: false,
      updateNotifier: {
        enabled: false,
      },
      server: {
        env: 'production',
        port: 3080,
        cluster: true
      },
      mongo: {
        dbname: 'officer-involved-shooting_production',
        db: 'officer-involved-shooting_production' // keep for winston logger
      },
      knex: {
        connection: {
          host: '127.0.0.1',
          user: 'root',
          password: '',
          database: 'officer-involved-shooting_production'
        }
      },
      redis: {
        prefix: 'officer-involved-shooting_production'
      },
      output: {
        colorize: false
      },
      logger: {
        'console': true,
        requests: true,
        mongo: false,
        file: false
        /*
        // <https://github.com/flatiron/winston#file-transport>
        file: {
          filename: '/var/log/igloo.log',
          // TODO: maxsize
          // TODO: maxFiles
          timestamp: true
        }
        */
      }
    }

  };

  return config;

};

exports['@singleton'] = true;
