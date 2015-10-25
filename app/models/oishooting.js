
// # oishooting

var jsonSelect = require('mongoose-json-select');
var mongoosePaginate = require('mongoose-paginate');

exports = module.exports = function(mongoose, iglooMongoosePlugin) {

  var Oishooting = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    offenseNum: {
      type: Number
    },
    date: {
      type: Date
    },
    dayOfWeek: {
      type: String
    },
    time: {
      type: Date
    },
    day: {
      type: String
    },
    part: {
      type: String
    },
    locationAddress: {
      type: String
    },
    premiseCategory: {
      type: String
    },
    insideOutside:{
      type: String
    },
    callTypeCategories:{
      type: String
    },
    raceEthnicitSubj:{
      type: String
    },
    genderSubj:{
        type: String
    },
    ageSubj: {
        type: String
    },
    injuriesSubj: {
        type: String
    },
    weaponSubj: {
        type: String
    },
    numOfficersPresentShots: {
        type: Number
    },
    numberOfcShooters: {
        type: Number
    },
    officerName: {
        type: String
    },
    ofcRank: {
        type: String
    },
    raceEthnicityOfc: {
        type: String
    },
    genderOfc: {
        type: String
    },
    ageOfc: {
        type: Number
    },
    pDJurisdiction: {
        type: String
    },
    yearsLEExperience: {
        type: Number
    },
    weaponCaliberOfc: {
        type: Number
    },
    weaponTypeOfc: {
        type: String
    },
    numShotsFiredOfc: {
        type: Number
    },
    numHitsIncident: {
        type: Number
    },
    howCleared: {
        type: String
    }
  });

  // virtuals
  Oishooting.virtual('object').get(function() {
    return 'oishooting';
  });

  // plugins
  //Oishooting.plugin(jsonSelect, '-_group -salt -hash');
  Oishooting.plugin(mongoosePaginate);

  // keep last
  Oishooting.plugin(iglooMongoosePlugin);

  return mongoose.model('Oishooting', Oishooting);
};

exports['@singleton'] = true;
exports['@require'] = [ 'igloo/mongo', 'igloo/mongoose-plugin' ];
