
// # oishooting

var _ = require('underscore');
var _str = require('underscore.string');
_.mixin(_str.exports());

var paginate = require('express-paginate');

exports = module.exports = function(Oishooting) {

  function index(req, res, next) {
    Oishooting.paginate({}, req.query.page, req.query.limit, function(err, pageCount, oishootings, itemCount) {
      if (err) {
        return next(err);
      }

      res.format({
        html: function() {
          res.render('oishootings', {
            oishootings: oishootings,
            pageCount: pageCount,
            itemCount: itemCount
          });
        },
        json: function() {
          // inspired by Stripe's API response for list objects
          res.json({
            object: 'list',
            has_more: paginate.hasNextPages(req)(pageCount, oishootings.length),
            data: oishootings
          });
        }
      });
    });
  }

  function _new(req, res, next) {
    res.render('oishootings/new');
  }

  function create(req, res, next) {
    if (!_.isString(req.body.name) || _.isBlank(req.body.name)) {
      return next({
        param: 'name',
        message: 'Name is missing or blank'
      });
    }

    Oishooting.create({
      name: req.body.name
    }, function(err, oishooting) {
      if (err) {
        return next(err); 
      }

      res.format({
        html: function() {
          req.flash('success', 'Successfully created oishooting');
          res.redirect('/oishootings');
        },
        json: function() {
          res.json(oishooting);
        }
      });
    });
  }

  function show(req, res, next) {
    Oishooting.findById(req.params.id, function(err, oishooting) {
      if (err) {
        return next(err);
      }

      if (!oishooting) {
        return next(new Error('Oishooting does not exist'));
      }

      res.format({
        html: function() {
          res.render('oishootings/show', {
            oishooting: oishooting
          });
        },
        json: function() {
          res.json(oishooting);
        }
      });
    });
  }

  function edit(req, res, next) {
    Oishooting.findById(req.params.id, function(err, oishooting) {
      if (err) {
        return next(err);
      }

      if (!oishooting) {
        return next(new Error('Oishooting does not exist'));
      }

      res.render('oishootings/edit', {
        oishooting: oishooting
      });
    });
  }

  function update(req, res, next) {
    Oishooting.findById(req.params.id, function(err, oishooting) {
      if (err) {
        return next(err);
      }

      if (!oishooting) {
        return next(new Error('Oishooting does not exist'));
      }

      if (!_.isString(req.body.name) || _.isBlank(req.body.name)) {
        return next({
          param: 'name',
          message: 'Name is missing or blank'
        });
      }

      oishooting.name = req.body.name;
      oishooting.save(function(err, oishooting) {
        if (err) {
          return next(err);
        }

        res.format({
          html: function() {
            req.flash('success', 'Successfully updated oishooting');
            res.redirect('/oishootings/' + oishooting.id);
          },
          json: function() {
            res.json(oishooting);
          }
        });
      });
    });
  }

  function destroy(req, res, next) {
    Oishooting.findById(req.params.id, function(err, oishooting) {
      if (err) {
        return next(err);
      }

      if (!oishooting) {
        return next(new Error('Oishooting does not exist'));
      }

      oishooting.remove(function(err) {
        if (err) {
          return next(err);
        }

        res.format({
          html: function() {
            req.flash('success', 'Successfully removed oishooting');
            res.redirect('/oishootings');
          },
          json: function() {
            // inspired by Stripe's API response for object removals
            res.json({
              id: oishooting.id,
              deleted: true
            });
          }
        });
      });
    });
  }

  return {
    index: index,
    'new': _new,
    create: create,
    show: show,
    edit: edit,
    update: update,
    destroy: destroy
  };

};

exports['@singleton'] = true;
exports['@require'] = [ 'models/oishooting' ];
