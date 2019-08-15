/**
 * Support code for the crop database exported from practicalplants.org wiki.
 *
 * @namespace practicalplants
 * @memberof db
 */

const readline = require('readline');
const fs = require('fs');
const shared = require('../shared/practicalplants.js');
const utils = require('../shared/utils.js');

/**
 * @typedef {Object} Crop
 * @property {String} binomialName Binomial name. This exists for each crop.
 * @property {String} commonName Common name. May not exist for each crop.
 * @property {Boolean} poorNutrition
 * @property {Number} hardinessZone TODO define range
 * @property {Array} soilTexture TODO define enum values
 * @property {Array} soilPh TODO define enum values
 * @property {Array} soilWaterRetention TODO define enum values
 * @property {Array} shade TODO define enum values
 * @property {Array} sun TODO define enum values
 * @property {Array} water TODO define enum values
 * @property {Array} drought TODO define enum values
 * @property {Array} ecosystemNiche TODO define enum values
 * @property {Array} lifeCycle TODO define enum values
 * @property {String} herbaceousOrWoody
 * @property {String} deciduousOrEvergreen
 * @property {String} growthRate
 * @property {String} matureMeasurementUnit TODO remove from processed output
 * @property {Number} matureHeight TODO convert always to meters
 * @property {Number} matureWidth TODO convert always to meters
 * @property {String} flowerType
 * @property {Array} pollinators TODO define enum values
 * @property {Boolean} wind Wind resistant
 * @property {Boolean} maritime Maritime resistant
 * @property {Boolean} pollution Pollution resistant
 * @property {Array} functions TODO define enum values
 * @property {String} growFrom
 * @property {String} cuttingType
 * @property {String} fertility
 * @property {String} rootZone
 * @property {String} family
 * @property {String} genus
 * @property {String} salinity
 */

/**
 * Read the mongoexport file and normalize its contents to ease
 * processing.
 *
 * @return {Crop[]} Crop objects
 */
function readCrops() {
  return readCropsLower().map(inputObject => {
    /*
     * Select properties that are useful for powerplant. Nulls or empty
     * arrays are used for missing values in normalized objects.
     */
    const object = {};
    Object.values(PP_MAPPINGS).forEach(property => {
      if (
        !(property in inputObject) ||
        [undefined, null, '', '\n'].includes(inputObject[property])
      ) {
        object[property] = ARRAY_PROPERTIES.includes(property) ? [] : null;
      } else {
        object[property] = inputObject[property];
      }
    });

    /*
     * Parse objects to strings.
     */
    if (!Array.isArray(object['functions'])) {
      object['functions'] = object['functions']['function'];
    }

    /*
     * Convert numeric properties from strings to actual numbers.
     *
     * TODO Sometimes the value is given as a range ("1.5 - 3"),
     * take average in such cases?
     */
    NUMBER_PROPERTIES.forEach(property => {
      object[property] = object[property] ? parseFloat(object[property]) : null;
    });

    /*
     * Values of these properties are sometimes arrays and
     * sometimes CSV strings. Normalize all of them to arrays.
     *
     * TODO Where does this come from? From original
     * practicalplants.org data, mediawiki_scraper, or the
     * code here?
     */
    ARRAY_PROPERTIES.forEach(property => convertToArray(object, property));

    /*
     * Normalize values.
     */
    BOOLEAN_PROPERTIES.forEach(property => {
      replaceValue(object, property, ['No', 'False'], 'false');
      replaceValue(object, property, ['Yes', 'True'], 'true');
    });

    replaceValue(object, 'matureMeasurementUnit', ['metres'], 'meters');

    replaceArrayValue(object['pollinators'], ['bees. self'], ['bees', 'self']);
    replaceArrayValue(object['pollinators'], ['hover-flies'], ['hoverflies']);
    replaceArrayValue(
      object['pollinators'],
      ['apomyctic', 'apomixy'],
      ['apomictic']
    );
    replaceArrayValue(
      object['pollinators'],
      ['cleistogomous', 'cleistogomy', 'cleistogamy'],
      ['cleistogamous']
    );
    replaceArrayValue(
      object['pollinators'],
      ['flies and small bees'],
      ['flies', 'bees']
    );
    replaceArrayValue(
      object['pollinators'],
      ['bees. lepidoptera'],
      ['bees', 'lepidoptera']
    );
    replaceArrayValue(object['pollinators'], ['lepdioptera'], ['lepidoptera']);
    replaceArrayValue(object['pollinators'], ['humble bees'], ['bumblebees']);
    replaceArrayValue(
      object['pollinators'],
      ['flies lepidoptera'],
      ['flies', 'lepidoptera']
    );
    replaceArrayValue(
      object['pollinators'],
      ['self. occasionally flies'],
      ['flies', 'self']
    );
    replaceArrayValue(
      object['pollinators'],
      ['self. occasionally bees'],
      ['bees', 'self']
    );
    replaceArrayValue(
      object['pollinators'],
      ['insects? self'],
      ['insects', 'self']
    );
    replaceArrayValue(object['pollinators'], ['self?'], ['self']);
    replaceArrayValue(object['pollinators'], ['insect'], ['insects']);

    replaceArrayValue(
      object['functions'],
      ['biogenic decalcifier/pioneer species'],
      ['biogenic decalcifier', 'pioneer']
    );
    replaceArrayValue(object['functions'], [''], []);

    PP_PROPERTIES.forEach(property => {
      if (
        object[property] &&
        !NUMBER_PROPERTIES.concat(
          ARRAY_PROPERTIES,
          BOOLEAN_PROPERTIES,
          NAME_PROPERTIES
        ).includes(property)
      ) {
        object[property] = object[property].toLowerCase();
      }
    });

    return object;
  });
}

function replaceArrayValue(array, from, to) {
  from.forEach(fromValue => {
    let index;
    while ((index = array.findIndex(value => value == fromValue)) >= 0) {
      array.splice(index, 1, ...to);
    }
  });
}

function replaceValue(object, property, from, to) {
  from.forEach(fromValue => {
    if (object[property] == fromValue) {
      object[property] = to;
    }
  });
}

function convertToArray(object, property) {
  object[property] = getAsArray(object[property]).map(value =>
    value.toLowerCase()
  );
  object[property] = object[property].filter(
    value => count(object[property], value) == 1
  );
}

function count(array, match) {
  let counter = 0;
  array.forEach(value => {
    if (value == match) {
      counter++;
    }
  });
  return counter;
}

function getAsArray(value) {
  return typeof value === 'object' ? value : parseCsvLine(value);
}

function parseCsvLine(line) {
  return line.split(',').map(value => value.trim());
}

/**
 * Read the whole mongoexport file to an array of crop objects.
 *
 * @return {Array} Crop objects
 */
function readCropsLower() {
  const lines = fs
    .readFileSync(__dirname + '/practicalplants.json', { encoding: 'latin1' })
    .split('\n');
  const crops = lines.splice(0, lines.length - 1).map(line => JSON.parse(line));

  /*
   * Rename property names to camelCase.
   */
  crops.forEach(crop => {
    Object.keys(PP_MAPPINGS).forEach(property => {
      const renamedProperty = PP_MAPPINGS[property];
      if (renamedProperty != property && crop[property] !== undefined) {
        crop[renamedProperty] = crop[property];
        delete crop[property];
      }
    });
  });

  return crops;
}

/*
 * All possible properties that may appear in raw practicalplants.org data.
 */
const ALL_PROPERTIES = [
  '_id',
  'append to article summary',
  'article summary',
  'primary image',
  'binomial',
  'genus',
  'family',
  'life cycle',
  'herbaceous or woody',
  'deciduous or evergreen',
  'flower type',
  'growth rate',
  'mature height',
  'mature width',
  'sun',
  'shade',
  'hardiness zone',
  'water',
  'drought',
  'soil texture',
  'soil ph',
  'wind',
  'maritime',
  'pollution',
  'poornutrition',
  'edible part and use', // TODO Appears in practicalplants.org MediaWiki API but missing in our data.
  'material use notes',
  'PFAF material use notes',
  'material part and use', // TODO Appears in practicalplants.org MediaWiki API but missing in our data.
  'medicinal part and use', // TODO Appears in practicalplants.org MediaWiki API but missing in our data.
  'toxic parts', // TODO Looks useful, special format
  'functions',
  'shelter', // TODO Looks useful, little used, special format
  'forage', // TODO Looks useful, little used, special format
  'propagation notes',
  'PFAF propagation notes',
  'seed requires stratification',
  'seed dormancy depth', // TODO Looks useful, little used
  'seed requires scarification', // TODO Looks useful, little used
  'seed requires smokification', // TODO Looks useful, little used
  'rootstocks',
  'cultivation notes',
  'PFAF cultivation notes',
  'crops', // TODO Looks useful, little used, special format
  'interactions',
  'botanical references',
  'material uses references',
  'range',
  'habitat', // TODO Maybe information could be parsed from the free-form text.
  'enabled',
  'title irregular',
  'common',
  'soil water retention',
  'medicinal use notes',
  'toxicity notes',
  'grow from',
  'germination details',
  'cultivation',
  'edible uses references',
  'medicinal uses references',
  'mature measurement unit',
  'pollinators',
  'edible use notes',
  'PFAF edible use notes',
  'PFAF medicinal use notes',
  'override summary',
  'ecosystem niche',
  'problems',
  'PFAF toxicity notes',
  'infraspecific epithet',
  'cultivar of groups',
  'cultivar epithet',
  'cultivar group epithet',
  'life references',
  'subspecies',
  'subspecies',
  'cultivar groups',
  'cutting type',
  'cutting details',
  'problem notes',
  'salinity',
  'fertility',
  'propagation',
  'common use description',
  'flower colour',
  'common habit description',
  'ungrouped cultivars',
  'functions notes',
  'botanical description',
  'crop notes',
  'classification references',
  'environmental references',
  'native range',
  'native environment', // TODO Looks useful, little used, free-formish
  'ecosystems references',
  'uses intro',
  'seed saving details',
  'root zone',
  'taxonomic rank',
  'functions as', // TODO Duplicate with 'functions', these should probably be combined?
  'shelter notes',
  'forage notes',
  'material uses', // TODO Looks useful, little used
  'heat zone', // TODO Looks useful, little used
  'bulb type', // TODO Looks useful, little used
  'graft rootstock', // TODO Looks useful, little used
  'edible parts', // TODO Looks useful, little used
  'edible uses', // TODO Looks useful, little used
  'show cultivar group',
  'cultivar group',
  'is a variety',
  'variety type',
  'cultivar name',
  'cultivar of',
  'variety name',
  'variety of',
  'subspecies name',
  'subspecies of',
  'summary',
  'cultivar group of',
  'seed stratification instructions',
  'graft details',
  'bulb details',
  'subspecific epithet',
  'cultivar notes',
  ''
];

function toCamelCase(property) {
  return { [property]: utils.toCamelCase(property) };
}

const PP_MAPPINGS = {
  binomial: 'binomialName',
  common: 'commonName',
  poornutrition: 'poorNutrition',
  ...toCamelCase('hardiness zone'),
  ...toCamelCase('soil texture'),
  ...toCamelCase('soil ph'),
  ...toCamelCase('soil water retention'),
  ...toCamelCase('shade'),
  ...toCamelCase('sun'),
  ...toCamelCase('water'),
  ...toCamelCase('drought'),
  ...toCamelCase('ecosystem niche'),
  ...toCamelCase('life cycle'),
  ...toCamelCase('herbaceous or woody'),
  ...toCamelCase('deciduous or evergreen'),
  ...toCamelCase('growth rate'),
  ...toCamelCase('mature measurement unit'),
  ...toCamelCase('mature height'),
  ...toCamelCase('mature width'),
  ...toCamelCase('flower type'),
  ...toCamelCase('pollinators'),
  ...toCamelCase('wind'),
  ...toCamelCase('maritime'),
  ...toCamelCase('pollution'),
  ...toCamelCase('functions'),
  ...toCamelCase('grow from'),
  ...toCamelCase('cutting type'),
  ...toCamelCase('fertility'),
  ...toCamelCase('root zone'),
  ...toCamelCase('family'),
  ...toCamelCase('genus'),
  ...toCamelCase('salinity')
};

/*
 * Subset of ALL_PROPERTIES that are currently used by powerplant.
 */
const PP_PROPERTIES = Object.values(PP_MAPPINGS);

/*
 * Subset of PP_PROPERTIES that have boolean values.
 */
const BOOLEAN_PROPERTIES = ['poorNutrition', 'wind', 'maritime', 'pollution'];

/*
 * Subset of PP_PROPERTIES that have numeric values.
 */
const NUMBER_PROPERTIES = ['hardinessZone', 'matureHeight', 'matureWidth'];

/*
 * Subset of PP_PROPERTIES that have array values.
 */
const ARRAY_PROPERTIES = [
  'soilTexture',
  'soilPh',
  'soilWaterRetention',
  'ecosystemNiche',
  'lifeCycle',
  'pollinators',
  'growFrom',
  'cuttingType',
  'fertility',
  'functions'
];

/*
 * Subset of PP_PROPERTIES that have any kind of names for the crop.
 */
const NAME_PROPERTIES = ['binomialName', 'commonName'];

/*
 * Values that appear in raw practicalplants.org data, and the corresponding
 * normalized values.
 */
const ALL_BOOLEAN_VALUES = ['No', 'False', 'Yes', 'True'];
const PP_BOOLEAN_VALUES = shared.PP_BOOLEAN_VALUES;

const ALL_HARDINESS_ZONE_VALUES = 12;
const PP_HARDINESS_ZONE_VALUES = shared.PP_HARDINESS_ZONE_VALUES;

const ALL_SOIL_TEXTURE_VALUES = ['sandy', 'loamy', 'clay', 'heavy clay'];
const PP_SOIL_TEXTURE_VALUES = shared.PP_SOIL_TEXTURE_VALUES;

const ALL_SOIL_PH_VALUES = [
  'very acid',
  'acid',
  'neutral',
  'alkaline',
  'very alkaline'
];
const PP_SOIL_PH_VALUES = shared.PP_SOIL_PH_VALUES;

const ALL_SOIL_WATER_RETENTION_VALUES = ['well drained', 'moist', 'wet'];
const PP_SOIL_WATER_RETENTION_VALUES = shared.PP_SOIL_WATER_RETENTION_VALUES;

const ALL_SHADE_VALUES = [
  'no shade',
  'light shade',
  'partial shade',
  'permanent shade',
  'permanent deep shade'
];
const PP_SHADE_VALUES = shared.PP_SHADE_VALUES;

const ALL_SUN_VALUES = ['indirect sun', 'partial sun', 'full sun'];
const PP_SUN_VALUES = shared.PP_SUN_VALUES;

const ALL_WATER_VALUES = ['low', 'moderate', 'high', 'aquatic'];
const PP_WATER_VALUES = shared.PP_WATER_VALUES;

const ALL_DROUGHT_VALUES = ['dependent', 'tolerant', 'intolerant'];
const PP_DROUGHT_VALUES = shared.PP_DROUGHT_VALUES;

const ALL_ECOSYSTEM_NICHE_VALUES = [
  'Canopy',
  'Climber',
  'Secondary canopy',
  'Soil surface',
  'Climber',
  'Shrub',
  'Herbaceous',
  'Rhizosphere'
];
const PP_ECOSYSTEM_NICHE_VALUES = shared.PP_ECOSYSTEM_NICHE_VALUES;

const ALL_LIFE_CYCLE_VALUES = ['perennial', 'annual', 'biennial'];
const PP_LIFE_CYCLE_VALUES = shared.PP_LIFE_CYCLE_VALUES;

const ALL_HERBACEOUS_OR_WOODY_VALUES = ['herbaceous', 'woody', ''];
const PP_HERBACEOUS_OR_WOODY_VALUES = shared.PP_HERBACEOUS_OR_WOODY_VALUES;

const ALL_DECIDUOUS_OR_EVERGREEN_VALUES = ['deciduous', 'evergreen', ''];
const PP_DECIDUOUS_OR_EVERGREEN_VALUES =
  shared.PP_DECIDUOUS_OR_EVERGREEN_VALUES;

const ALL_GROWTH_RATE_VALUES = ['slow', 'moderate', 'vigorous'];
const PP_GROWTH_RATE_VALUES = shared.PP_GROWTH_RATE_VALUES;

const ALL_MATURE_MEASUREMENT_UNIT_VALUES = ['meters', 'metres', 'feet'];
const PP_MATURE_MEASUREMENT_UNIT_VALUES =
  shared.PP_MATURE_MEASUREMENT_UNIT_VALUES;

const ALL_MATURE_HEIGHT_VALUES = 110;
const PP_MATURE_HEIGHT_VALUES = shared.PP_MATURE_HEIGHT_VALUES;

const ALL_MATURE_WIDTH_VALUES = 30;
const PP_MATURE_WIDTH_VALUES = shared.PP_MATURE_WIDTH_VALUES;

const ALL_FLOWER_TYPE_VALUES = ['hermaphrodite', 'monoecious', 'dioecious'];
const PP_FLOWER_TYPE_VALUES = shared.PP_FLOWER_TYPE_VALUES;

const ALL_POLLINATORS_VALUES = [
  'Insects',
  'Wind',
  'Bees',
  'Flies',
  'Self',
  'Beetles',
  'Lepidoptera',
  'Bats',
  'Moths',
  'insects',
  'wind',
  'lepidoptera',
  'birds',
  'Apomictic',
  'Bees. self',
  'Apomyctic',
  'Slugs',
  'Snails',
  'Hover-flies',
  'Cleistogamous',
  'Wasps',
  'Water',
  'Midges',
  'Birds',
  'Flies and small bees',
  'Bees. lepidoptera',
  'Diptera',
  'Cleistogomous',
  'Butterflies',
  'Hoverflies',
  'Lepdioptera',
  'Apomixy',
  'Bumblebees',
  'Insect',
  'Humble bees',
  'Cleistogamy',
  'Wind-blown sand',
  'Flies lepidoptera',
  'Cleistogomy',
  'Self. Occasionally flies',
  'Insects? Self',
  'Sunbirds',
  'Self. Occasionally bees',
  'Carrion flies',
  'Self?',
  'Hand',
  'Dryoptera',
  'Hymenoptera'
];
const PP_POLLINATORS_VALUES = shared.PP_POLLINATORS_VALUES;

const ALL_FUNCTIONS_VALUES = [
  'Nitrogen fixer',
  'Ground cover',
  'Hedge',
  'Windbreak',
  'Pioneer',
  'Nitrogen Fixer',
  'Earth stabiliser',
  'Green manure',
  'Repellant',
  'Soil builder',
  'Rootstock',
  'Biogenic Decalcifier/Pioneer Species',
  'Phytoremediation',
  'Bee attractor',
  'Soil conditioner',
  'Pest Repellent'
];
const PP_FUNCTIONS_VALUES = shared.PP_FUNCTIONS_VALUES;

const ALL_GROW_FROM_VALUES = [
  'seed',
  'cutting',
  'layering',
  'tuber',
  'suckers',
  'graft',
  'bulb'
];
const PP_GROW_FROM_VALUES = shared.PP_GROW_FROM_VALUES;

const ALL_CUTTING_TYPE_VALUES = [
  'semi-ripe',
  'soft wood',
  'root',
  'hard wood',
  ''
];
const PP_CUTTING_TYPE_VALUES = shared.PP_CUTTING_TYPE_VALUES;

const ALL_FERTILITY_VALUES = ['self fertile', 'self sterile'];
const PP_FERTILITY_VALUES = shared.PP_FERTILITY_VALUES;

const ALL_ROOT_ZONE_VALUES = ['shallow', 'deep', 'surface'];
const PP_ROOT_ZONE_VALUES = shared.PP_ROOT_ZONE_VALUES;

const ALL_FAMILY_VALUES = [
  'Acanthaceae','Aceraceae','Actinidiaceae','Agavaceae','Aizoaceae','Alangiaceae','Alismataceae','Alliaceae','Aloeaceae','Alstroemeriaceae','Amaranthaceae','Amaryllidaceae','Anacardiaceae','Annonaceae','Apocynaceae','Aponogetonaceae','Aquifoliaceae','Araceae','Araliaceae','Araucariaceae','Aristolochiaceae','Asclepiadaceae','Asparagaceae','Asphodelaceae','Asteliaceae','Asteraceae','Atherospermataceae','Balsaminaceae','Basellaceae','Begoniaceae','Berberidaceae','Betulaceae','Bignoniaceae','Blechnaceae','Boraginaceae','Brassicaceae','Bromeliaceae','Buddleiaceae','Burseraceae','Butomaceae','Buxaceae','Cabombaceae','Cactaceae','Callitrichaceae','Calochortaceae','Calycanthaceae','Calyceraceae','Campanulaceae','Cannabidaceae','Cannaceae','Capparidaceae','Caprifoliaceae','Caryophyllaceae','Casuarinaceae','Celastraceae','Cephalotaxaceae','Ceratophyllaceae','Cercidiphyllaceae','Chenopodiaceae','Chloranthaceae','Cistaceae','Clethraceae','Cneoraceae','Colchicaceae','Commelinaceae','Compositae','Convallariaceae','Convolvulaceae','Coriariaceae','Cornaceae','Corynocarpaceae','Crassulaceae','Cucurbitaceae','Cunoniaceae','Cupressaceae','Cyatheaceae','Cycadaceae','Cynocrambaceae','Cyperaceae','Cyrillaceae','Daphniphyllaceae','Datiscaceae','Diapensiaceae','Dicksoniaceae','Dioscoreaceae','Dipsacaceae','Droseraceae','Dryopteridaceae','Ebenaceae','Ehretiaceae','Elaeagnaceae','Elaeocarpaceae','Empetraceae','Epacridaceae','Ephedraceae','Equisetaceae','Ericaceae','Eriocaulaceae','Escalloniaceae','Eucommiaceae','Eucryphiaceae','Euphorbiaceae','Eupomatiaceae','Eupteleaceae','Euryalaceae','Fagaceae','Flacourtiaceae','Fumariaceae','Funkiaceae','Garryaceae','Gentianaceae','Geraniaceae','Gesneriaceae','Ginkgoaceae','Gleicheniaceae','Globulariaceae','Goodeniaceae','Gramineae','Grossulariaceae','Gunneraceae','Haemodoraceae','Haloragidaceae','Hamamelidaceae','Hemerocallidaceae','Hippocastanaceae','Hippuridaceae','Hyacinthaceae','Hydrangeaceae','Hydrocharitaceae','Hydrophyllaceae','Hypericaceae','Hypoxidaceae','Illiciaceae','Iridaceae','Juglandaceae','Juncaceae','Juncaginaceae','Labiatae','Lamiaceae','Lardizabalaceae','Lauraceae','Leguminosae','Leitneriaceae','Lemnaceae','Lentibulariaceae','Liliaceae','Limnanthaceae','Linaceae','Loasaceae','Loganiaceae','Lomandraceae','Loranthaceae','Lycopodiaceae','Lythraceae','Magnoliaceae','Malpighiaceae','Malvaceae','Marrattiaceae','Marsileaceae','Martyniaceae','Melanthiaceae','Melastomataceae','Meliaceae','Melianthaceae','Menispermaceae','Menyanthaceae','Misodendraceae','Molluginaceae','Monimiaceae','Moraceae','Morinaceae','Musaceae','Myoporaceae','Myricaceae','Myrsinaceae','Myrtaceae','Najadaceae','Nelumbonaceae','Nyctaginaceae','Nymphaeaceae','Nyssaceae','Oenotheraceae','Oleaceae','Onagraceae','Onocleaceae','Ophioglossaceae','Orchidaceae','Orobanchaceae','Osmundaceae','Oxalidaceae','Paeoniaceae','Palmae','Papaveraceae','Parmeliaceae','Parnassiaceae','Passifloraceae','Pedaliaceae','Philesiaceae','Phormiaceae','Phrymaceae','Phytolaccaceae','Pinaceae','Pistaciaceae','Pittosporaceae','Plantaginaceae','Platanaceae','Plumbaginaceae','Podocarpaceae','Podophyllaceae','Polemoniaceae','Polygalaceae','Polygonaceae','Polypodiaceae','Polytrichaceae','Pontederiaceae','Portulacaceae','Potamogetonaceae','Primulaceae','Proteaceae','Pteridaceae','Punicaceae','Pyrolaceae','Rafflesiaceae','Ranunculaceae','Resedaceae','Restoniaceae','Rhamnaceae','Rosaceae','Rubiaceae','Ruscaceae','Rutaceae','Salicaceae','Santalaceae','Sapindaceae','Sapotaceae','Sargentodoxaceae','Sarraceniaceae','Saururaceae','Saxifragaceae','Schisandraceae','Sciadoptyaceae','Scrophulariaceae','Selaginellaceae','Simaroubaceae','Smilacaceae','Solanaceae','Sparganiaceae','Sphagnaceae','Staphyleaceae','Sterculiaceae','Styracaceae','Symplocaceae','Tamaricaceae','Taxaceae','Taxodiaceae','Tecophilaeaceae','Theaceae','Thelypteridaceae','Thymelaeaceae','Tiliaceae','Trapaceae','Tricyrtidaceae','Trilliaceae','Tropaeolaceae','Turneraceae','Typhaceae','Ulmaceae','Umbelliferae','Urticaceae','Uvulariaceae','Valerianaceae','Verbenaceae','Violaceae','Viscaceae','Vitaceae','Winteraceae','Xanthorrhoeaceae','Xyridaceae','Zannichelliaceae','Zingiberaceae','Zosteraceae','Zygophyllaceae'
];
const PP_FAMILY_VALUES = shared.PP_FAMILY_VALUES;

const ALL_GENUS_VALUES = [
  'Abelia','Abelmoschus','Abies','Abobra','Abronia','Abutilon','Acacia','Acaenia','Acalypha','Acanthus','Acca','Acer','Achillea','Achnatherum','Achyranthes','Acinos','Aciphylla','Aconitum','Acorus','Acourtia','Acrotriche','Actaea','Actinea','Actinidia','Adenophora','Adenostoma','Adesmia','Adiantum','Adina','Adonis','Aegilops','Aegopodium','Aesculus','Aethusa','Agalinis','Agapanthus','Agastache','Agathis','Agave','Ageratina','Ageratum','Agoseris','Agrimonia','Agriophyllum','Agropyron','Agrostemma','Agrostis','Ailanthus','Aizoon','Ajuga','Akebia','Alangium','Albizia','Albuca','Alcea','Alchemilla','Aletris','Aleurites','Alhagi','Alisma','Alkanna','Alliaria','Allium','Alnus','Aloe','Alopecurus','Aloysia','Alstroemeria','Althaea','Amaranthus','Ambrosia','Amelanchier','Amelasorbus','Ammannia','Ammi','Ammophila','Amomyrtus','Amorpha','Amorphophallus','Ampelodesmos','Ampelopsis','Amphicarpaea','Amsinckia','Amyema','Anacamptis','Anacyclus','Anagallis','Anaphalis','Anchusa','Andromeda','Andropogon','Androsace','Androstephium','Anemarrhena','Anemone','Anemonella','Anemopsis','Anethum','Angelica','Angiopteris','Angophora','Anredera','Antennaria','Anthemis','Anthoxanthum','Anthriscus','Anthyllis','Antirrhinum','Aphananthe','Aphanes','Apios','Apium','Aplectrum','Apocynum','Aponogeton','Aquilegia','Arabidopsis','Arabis','Arachis','Aralia','Araucaria','Araujia','Arbutus','Arctium','Arctostaphylos','Ardisia','Arenaria','Argemone','Argyranthemum','Arisaema','Arisarum','Aristolochia','Aristotelia','Arjona','Armeria','Armoracia','Arnebia','Arnica','Aronia','Arracacia','Artemisia','Arthrocnemum','Arthromeris','Arthropodium','Arum','Arundinaria','Arundinella','Arundo','Asarum','Asclepias','Asimina','Aspalathus','Asparagus','Asperula','Asphodeline','Asphodelus','Aspidistra','Aspidosperma','Asplenium','Astelia','Aster','Astilbe','Astragalus','Astrantia','Astrebla','Astroloma','Asyneuma','Athamantha','Atherosperma','Athrotaxis','Athyrium','Atractylis','Atractylodes','Atraphaxis','Atriplex','Atropa','Aubrietia','Aucuba','Aurinia','Avena','Azara','Azorella','Azorina','Babiana','Baccharis','Backhousia','Baeckea','Ballota','Balsamorhiza','Bambusa','Banksia','Baptisia','Barbarea','Basella','Bassia','Bauhinia','Beckmannia','Begonia','Beilschmiedia','Belamcanda','Bellis','Benincasa','Berberidopsis','Berberis','Berchemia','Bergenia','Berula','Beta','Betula','Bidens','Billardiera','Blackstonia','Blechnum','Bletilla','Bloomeria','Bobartia','Boehmeria','Boenninghausenia','Boerhavia','Bolax','Bomarea','Bongardia','Boopsis','Borago','Borinda','Boronia','Botrychium','Bouteloua','Brachychiton','Brachyglottis','Brachyloma','Bracyloma','Brahea','Brasenia','Brassica','Brodiaea','Bromus','Broussonetia','Bryonia','Buddleia','Buglossoides','Bulbinella','Bulbinopsis','Bulbophyllum','Bumelia','Bunchosia','Bunias','Bunium','Bupleurum','Burchardia','Bursaria','Butia','Butomus','Buxus','Cacalia','Caesalpinia','Caesia','Cakile','Calamintha','Calandrinia','Calceolaria','Calendula','Calicotome','Calla','Callicarpa','Callicoma','Calligonum','Callirhoe','Callistemon','Callitriche','Callitris','Calluna','Calocedrus','Calochortus','Caltha','Calycanthus','Calypso','Calystegia','Camassia','Camelina','Camellia','Campanula','Camphorosma','Campsis','Canarium','Canna','Cannabis','Capparis','Capsella','Capsicum','Caragana','Cardamine','Cardaria','Cardiocrinum','Cardiospermum','Carduus','Carex','Carlina','Carpesium','Carpinus','Carpobrotus','Carthamnus','Carum','Carya','Cassinia','Cassiope','Cassythia','Castanea','Castanopsis','Castanospermum','Castilleja','Casuarina','Catabrosa','Catalpa','Caucalis','Caulanthus','Caulophyllum','Cautleya','Cavendishia','Ceanothus','Cedronella','Cedrus','Celastrus','Celosia','Celtis','Centaurea','Centaurium','Centella','Centipeda','Centranthus','Centrosema','Cephalanthus','Cephalaria','Cephalotaxus','Cerastium','Ceratonia','Ceratophyllum','Ceratostigma','Cercidiphyllum','Cercis','Cercocarpus','Ceroxylon','Cetraria','Chaenactis','Chaenomeles','Chaerophyllum','Chamaecrista','Chamaecyparis','Chamaedaphne','Chamaelirium','Chamaemelum','Chamaerops','Chamaesaracha','Chasmanthium','Cheilanthes','Chelidonium','Chelone','Chenopodium','Chesneya','Chiliotrichum','Chilopsis','Chimaphila','Chimonanthus','Chimonobambusa','Chionanthus','Chionographis','Chloranthus','Chlorogalum','Choisya','Chondrilla','Chorispora','Chrozophora','Chrysanthemum','Chrysolepis','Chrysosplenium','Chrysothamnus','Chusquea','Cibotium','Cicer','Cicerbita','Cichorium','Cicuta','Cimicifuga','Cinna','Cinnamomum','Circaea','Cirsium','Cistus','Citrofortunella','Citroncirus','Citrullus','Citrus','Cladium','Cladrastis','Clarkia','Claytonia','Clematis','Cleome','Clerodendrum','Clethra','Cliftonia','Clinopodium','Clintonia','Cneorum','Cnicus','Cnidium','Coccinia','Cocculus','Cochlearia','Codonopsis','Coelopleurum','Coix','Colchicum','Coleus','Colletia','Collinsonia','Coluria','Colutea','Comandra','Commelina','Commersonia','Comptonia','Conandron','Conanthera','Condalia','Coniogramme','Conioselinum','Conium','Conopodium','Conradina','Conringia','Consolida','Convallaria','Convolvulus','Conyza','Coprosma','Coptis','Corallorhiza','Corchorus','Cordyline','Corema','Coreopsis','Coriandrum','Coriaria','Cornus','Corokia','Coronilla','Coronopus','Correa','Corrigiola','Cortaderia','Corydalis','Corylus','Corynocarpus','Cosmos','Cotinus','Cotoneaster','Cotula','Cousinia','Cowania','Crambe','Crataegomespilus','Crataegus','Crepis','Crinum','Crithmum','Crocosmia','Crocus','Crotalaria','Cruciata','Cryptomeria','Cryptotaenia','Cucubalus','Cucumis','Cucurbita','Cudrania','Cuminum','Cunila','Cunninghamia','Cuphea','Cupressocyparis','Cupressus','Cuscuta','Cyananthus','Cyanella','Cyathea','Cyathodes','Cycas','Cyclamen','Cyclanthera','Cyclea','Cycloloma','Cyclospermum','Cydonia','Cymbalaria','Cymbonotus','Cymopterus','Cynanchum','Cynara','Cynodon','Cynoglossum','Cyperus','Cyphomandra','Cypripedium','Cyrilla','Cyrtanthus','Cyrtomium','Cystopteris','Cytinus','Cytisus','Dacrycarpus','Dacrydium','Dactylis','Dactyloctenium','Dactylorhiza','Dahlia','Dalbergia','Dalea','Damasonium','Daphne','Daphniphyllum','Darmera','Dasylirion','Datisca','Datura','Daucus','Daviesia','Debregeasia','Decaisnea','Decemium','Deinanthe','Delphinium','Dendranthema','Dendrobium','Dendrostellera','Dentaria','Deschampsia','Descurainia','Desfontainia','Desmanthus','Desmodium','Desmoschoenus','Deutzia','Dianella','Dianthus','Dicentra','Dichelachne','Dichelostemma','Dichondra','Dichopogon','Dichroa','Dicksonia','Dicliptera','Dicoria','Dictamnus','Diervilla','Digitalis','Digitaria','Dioscorea','Diospyros','Dipcadi','Diphylleia','Diplotaxis','Diploterigium','Dipploglottis','Dipsacus','Dirca','Disphyma','Disporum','Distylium','Dittrichia','Docynia','Dodecatheon','Dodonaea','Dorema','Doronicum','Draba','Dracocephalum','Drepanostachyum','Drimys','Drosera','Dryas','Drymaria','Dryopteris','Duchesnea','Dudleya','Dysosma','Dysoxylum','Ecballium','Echinacea','Echinochloa','Echinocystis','Echinophora','Echinops','Echium','Eclipta','Edgeworthia','Ehretia','Eichhornia','Elaeagnus','Elaeocarpus','Elatostema','Eleocharis','Eleusine','Eleutherococcus','Elodea','Elsholtzia','Elymus','Elytrigia','Emex','Emilia','Eminium','Empetrum','Encelia','Enchylaena','Ensete','Entelea','Ephedra','Epifagus','Epigaea','Epilobium','Epimedium','Equisetum','Eragrostis','Erechtites','Eremophila','Eremurus','Erica','Ericameria','Erigenia','Erigeron','Eriobotrya','Eriocaulon','Eriodictyon','Eriogonum','Eriophorum','Eriophyton','Erodium','Erophila','Eruca','Erucaria','Eryngium','Erysimum','Erythrina','Erythronium','Escallonia','Eschscholzia','Eucalyptus','Euchresta','Eucommia','Eucryphia','Euodia','Euonymus','Eupatorium','Euphorbia','Euphrasia','Eupomatia','Euptelea','Eurya','Euryale','Euscaphis','Eustrephus','Exocarpus','Fabiana','Fagopyrum','Fagus','Fallopia','Fallugia','Farfugium','Fargesia','Fedia','Ferula','Festuca','Fibigia','Ficus','Filipendula','Fimbristylis','Firmiana','Fitzroya','Foeniculum','Fontanesia','Forestiera','Forsythia','Fortunella','Fragaria','Frasera','Fraxinus','Fremontodendron','Fritillaria','Fuchsia','Fumaria','Gagea','Gaillardia','Galactites','Galanthus','Galax','Galega','Galeopsis','Galinsoga','Galium','Garrya','Gastrodia','Gaultheria','Gaylussacia','Geijera','Geitonoplesium','Gelsemium','Genista','Gentiana','Gentianella','Geocaulon','Geranium','Gerbera','Geum','Gevuina','Gillenia','Gingidia','Ginkgo','Girardiana','Gladiolus','Glaucium','Glaux','Glechoma','Gleditsia','Glehnia','Globularia','Glochidion','Glyceria','Glycine','Glycyrrhiza','Glyptostrobus','Gnaphalium','Goodenia','Goodyera','Gratiola','Greigia','Grevillea','Grewia','Grindelia','Griselinia','Guizotia','Gundelia','Gunnera','Gutierrezia','Gymnadenia','Gymnocladus','Gynandriris','Gynatrix','Gynostemma','Gynura','Gypsophila','Habenaria','Hackelia','Hakea','Halenia','Halerpestes','Halesia','Halimione','Halimodendron','Haloxylon','Hamamelis','Haplopappus','Hardenbergia','Hebe','Hedeoma','Hedera','Hedychium','Hedysarum','Heimia','Heldreichia','Helenium','Helianthemum','Helianthus','Helichrysum','Heliotropium','Helleborus','Helwingia','Hemerocallis','Hemiphragma','Hemiptelea','Hemizonia','Hepatica','Heracleum','Herniaria','Herpetospermum','Hesperaloe','Hesperantha','Hesperis','Hesperocallis','Heteropappus','Heuchera','Hibiscus','Hieracium','Hierochloe','Hilaria','Himalayacalamus','Hippophae','Hippuris','Hirschfeldia','Hoffmannseggia','Hoheria','Holboellia','Holodiscus','Hololeion','Homoranthus','Honckenya','Hordeum','Hosta','Hottonia','Houttuynia','Hovenia','Humulus','Hyacinthoides','Hyacinthus','Hydrangea','Hydrastis','Hydrilla','Hydrocotyle','Hydrophyllum','Hymenanthera','Hymenopappus','Hymenoxys','Hyoscyamus','Hypericum','Hypochoeris','Hypoxis','Hyssopus','Iberis','Idesia','Ilex','Illicium','Impatiens','Imperata','Incarvillea','Indigofera','Indocalamus','Inula','Ipomoea','Ipomopsis','Iris','Isatis','Isodon','Isopogon','Itea','Iva','Ixeris','Jasminum','Jeffersonia','Jovibarba','Jubaea','Juglans','Juncus','Juniperus','Jurinea','Jussieva','Justicia','Kadsura','Kalimeris','Kalmia','Kalopanax','Kerria','Keteleeria','Kickxia','Kinugasa','Kirkophytum','Knautia','Knightia','Kniphofia','Koeleria','Koelreuteria','Kosteletzkya','Kuhnia','Kummerowia','Kunzea','Lablab','Laburnum','Lachnanthes','Lactuca','Lagarostrobus','Lagenaria','Lagerstroemia','Lagochilus','Lagoecia','Lallemantia','Lamium','Lancea','Lapageria','Laportea','Lapsana','Lardizabala','Laretia','Larix','Larrea','Laser','Laserpitium','Lasthenia','Lathyrus','Laurelia','Lavandula','Lavatera','Layia','Ledebouriella','Ledum','Legousia','Leibnitzia','Leichhardtia','Leitneria','Lemna','Lens','Leontice','Leontodon','Leontopodium','Leonurus','Lepidium','Lepidogrammitis','Lepidosperma','Lepidothamnus','Leptocarpus','Leptomeria','Leptospermum','Lespedeza','Lesquerella','Leucanthemum','Leucas','Leucocrinum','Leucojum','Leucopogon','Leucothoe','Leuzea','Levisticum','Lewisia','Leycesteria','Leymus','Liatris','Libocedrus','Ligularia','Ligusticum','Ligustrum','Lilaea','Lilium','Limnanthes','Limonium','Linaria','Lindera','Linnaea','Linum','Liparis','Liquidambar','Liriodendron','Liriope','Lissanthe','Lithocarpus','Lithospermum','Litsea','Livistona','Lobelia','Lobularia','Lolium','Lomandra','Lomatium','Lonicera','Lophomyrtus','Loropetalum','Lotus','Ludwigia','Luma','Lunaria','Lupinus','Luzula','Lychnis','Lycium','Lycopersicon','Lycopodium','Lycopus','Lycoris','Lygeum','Lygodesmia','Lyonia','Lyonsia','Lysichiton','Lysimachia','Lythrum','Maackia','Macadamia','Macleaya','Maclura','Macromeria','Macrotomia','Madia','Magnolia','Mahoberberis','Mahonia','Maianthemum','Malus','Malva','Malvastrum','Mandragora','Marah','Margyricarpus','Marrubium','Marsdenia','Marsilea','Marsippospermum','Matricaria','Matteuccia','Matthiola','Maytenus','Mazus','Meconopsis','Medeola','Medicago','Meehania','Megacarpaea','Megacodon','Melaleuca','Melanthium','Melastoma','Melia','Melianthus','Melichrus','Melicope','Melicytus','Melilotus','Melissa','Melittis','Menispermum','Mentha','Mentzelia','Menyanthes','Menziesia','Mercurialis','Mertensia','Mesembryanthemum','Mespilus','Metaplexis','Metasequoia','Metrosideros','Meum','Michelia','Microcachrys','Micromeria','Microseris','Microtis','Milium','Millettia','Mimulus','Mirabilis','Miscanthus','Misodendrum','Mitchella','Mitella','Mollugo','Momorialis','Monarda','Monardella','Moneses','Monizia','Monolepis','Monotoca','Monotropa','Montia','Moraea','Morina','Morus','Mosla','Muehlenbeckia','Muhlenbergia','Musa','Muscari','Musineon','Mycelis','Myoporum','Myosotis','Myosoton','Myriactis','Myrica','Myricaria','Myriophyllum','Myrrhis','Myrsine','Myrteola','Myrtus','Nabalus','Nageia','Najas','Nandina','Nannorrhops','Narcissus','Nardostachys','Nasturtium','Navarretia','Neillia','Nelumbo','Nemopanthus','Neolitsea','Neomyrtus','Nepeta','Nerium','Nertera','Nicandra','Nicotiana','Nigella','Nitraria','Nothofagus','Nothoscordum',null,'Nuphar','Nymphaea','Nymphoides','Nyssa','Ocimum','Oemleria','Oenanthe','Oenothera','Oldenlandia','Olea','Olearia','Olneya','Onobrychis','Onoclea','Ononis','Onopordum','Onosma','Ophioglossum','Ophiopogon','Ophrys','Oplopanax','Opopanax','Opuntia','Orchis','Oreomyrrhis','Origanum','Orixa','Ornithogalum','Ornithopus','Orobanche','Orogenia','Orontium','Orostachys','Orthilia','Orychophragmus','Oryzopsis','Osbeckia','Osmanthus','Osmorhiza','Osmunda','Osteomeles','Ostrya','Oxalis','Oxydendrum','Oxyria','Oxytropis','Pachyphragma','Pachyrhizus','Pachysandra','Packera','Paederia','Paeonia','Paliuris','Panax','Pancratium','Panicum','Papaver','Parajubaea','Parietaria','Paris','Parnassia','Paronychia','Parosella','Parrotiopsis','Parryella','Parthenium','Parthenocissus','Passiflora','Pastinaca','Patrinia','Paulownia','Pectis','Pedicularis','Peganum','Pelargonium','Peltandra','Peltaria','Pennisetum','Penstemon','Pentachondra','Pentaglottis','Penthorum','Peracarpa','Peraphyllum','Pericome','Perideridia','Perilla','Periploca','Perovskia','Persea','Persoonia','Petasites','Peteria','Petroselinum','Peucedanum','Peumus','Phacelia','Phalaris','Phaseolus','Phellodendron','Philadelphus','Phillyrea','Phleum','Phlomis','Phlox','Phoenix','Phoradendron','Phormium','Photinia','Phragmites','Phryma','Phyla','Phyllocladus','Phyllospadix','Phyllostachys','Physaliastrum','Physalis','Physocarpus','Phyteuma','Phytolacca','Picea','Picrasma','Picris','Picrorhiza','Pieris','Pilosella','Pimelea','Pimpinella','Pinckneya','Pinellia','Pinguicula','Pinus','Pistacia','Pisum','Pittosporum','Plagianthus','Plagiobothrys','Planchonella','Plantago','Platanthera','Platanus','Platycarya','Platycodon','Platycrater','Platystemon','Plectranthus','Pleioblastus','Pleurospermum','Plumbago','Poa','Podocarpium','Podocarpus','Podolepis','Podophyllum','Pogantherum','Pogogyne','Polemonium','Polianthes','Poliomintha','Polygala','Polygonatum','Polygonum','Polymnia','Polypodium','Polypogon','Polyscias','Polystichum','Polytrichum','Poncirus','Pontederia','Populus','Portulaca','Potamogeton','Potentilla','Prangos','Pratia','Prenanthes','Primula','Pringlea','Prinsepia','Proboscidea','Prostanthera','Protea','Prumnopitys','Prunella','Prunus','Pseudocydonia','Pseudognaphalium','Pseudolarix','Pseudopanax','Pseudosasa','Pseudotsuga','Pseudowintera','Psidium','Psophocarpus','Psoralea','Psychotria','Ptelea','Pteridium','Pterocarya','Pteroceltis','Pterospora','Pterostyrax','Ptiloria','Puccinellia','Pueraria','Pugionium','Pulicaria','Pulmonaria','Pulsatilla','Punica','Puya','Pycnanthemum','Pyracantha','Pyrocydonia','Pyrola','Pyronia','Pyrrhopappus','Pyrularia','Pyrus','Quercus','Quillaja','Ranunculus','Raphanus','Ratibida','Reaumuria','Rehmannia','Reichardia','Reineckia','Reseda','Rhagodia','Rhamnella','Rhamnus','Rhaphiolepis','Rhaponticum','Rheum','Rhexia','Rhinanthus','Rhodiola','Rhododendron','Rhus','Rhynchosinapis','Ribes','Ricinus','Ripogonum','Robinia','Rodgersia','Rohdea','Romanzoffia','Romulea','Rorippa','Rosa','Rubia','Rubus','Rudbeckia','Rulingia','Rumex','Ruscus','Ruta','Sabal','Sabatia','Sagina','Sagittaria','Salicornia','Salix','Salsola','Salvia','Sambucus','Samolus','Sanguinaria','Sanguisorba','Sanicula','Sanseviera','Santalum','Santolina','Sapindus','Sapium','Saponaria','Sarcobatus','Sargentodoxa','Sarracenia','Sasa','Sasaella','Sasamorpha','Sassafras','Satureja','Saururus','Saussurea','Saxifraga','Scabiosa','Scaevola','Scandix','Schinus','Schisandra','Schizomeria','Schizophragma','Sciadopitys','Scilla','Scirpus','Scleranthus','Scolymus','Scopolia','Scorpiurus','Scorzonera','Scrophularia','Scutellaria','Sebaea','Secale','Securidaca','Securinega','Sedum','Selaginella','Semiaquilegia','Semiarundinaria','Sempervivum','Senecio','Senna','Sequoia','Sequoiadendron','Serenoa','Serratula','Sesamum','Sesbania','Seseli','Sesuvium','Setaria','Shepherdia','Sherardia','Shibataea','Sicyos','Sidalcea','Sideritis','Siegesbeckia','Silaum','Silene','Silphium','Silybum','Sinapis','Sinofranchetia','Sinomenium','Siphonostegia','Sison','Sisymbrium','Sisyrinchium','Sium','Skimmia','Smilacena','Smilax','Smyrnium','Solanum','Soldanella','Solidago','Sonchus','Sophora','Sorbaria','Sorbopyrus','Sorbus','Sorghum','Sparaxis','Sparganium','Spartina','Spartium','Spergula','Spergularia','Sphagnum','Spigelia','Spinacia','Spiraea','Spiranthes','Spirodela','Sporobolus','Stachys','Stanleya','Staphylea','Stauntonia','Stellaria','Stellera','Stephanandra','Stephanomeria','Stevia','Stewartia','Stilbocarpa','Stillingia','Stipa','Stratiotes','Streptopus','Strobilanthes','Stylophorum','Styphelia','Styrax','Suaeda','Succisa','Swertia','Sympholoma','Symphoricarpos','Symphytum','Symplocarpus','Symplocos','Syncarpia','Synurus','Syringa','Syzygium','Tagetes','Talinum','Tamarix','Tamus','Tanacetum','Taraxacum','Taxodium','Taxus','Tellima','Telopea','Tephroseris','Tephrosia','Ternstroemia','Tetragonia','Tetrapanax','Tetrastigma','Teucrium','Thalictrum','Thamnocalamus','Thapsia','Thelesperma','Theligonum','Thelymitra','Thelypteris','Thermopsis','Thladiantha','Thlaspi','Thuja','Thujopsis','Thymbra','Thymus','Thysanotus','Tiarella','Tigridia','Tilia','Tilingia','Tinopsora','Tithonia','Tolmiea','Toona','Tordylium','Torilis','Torreya','Trachelospermum','Trachycarpus','Trachymene','Trachyspermum','Trachystemon','Tradescantia','Tragopogon','Trapa','Tribulus','Trichosanthes','Tricyrtis','Trientalis','Trifolium','Triglochin','Trigonella','Trigonotis','Trilisa','Trillium','Triodia','Triosteum','Triphasia','Tripsacum','Tripterygium','Trisetum','Triteleia','Triticosecale','Triticum','Tritonia','Trochocarpa','Trollius','Tropaeolum','Tsuga','Tulbaghia','Tulipa','Tupeia','Turnera','Turritis','Tussilago','Tylophora','Typha','Ugni','Ulex','Ullucus','Ulmus','Umbellularia','Umbilicus','Uncaria','Uniola','Urceola','Urginea','Urospermum','Urtica','Utricularia','Uvularia','Vaccaria','Vaccinium','Valeriana','Valerianella','Vallisneria','Veratrum','Verbascum','Verbena','Vernonia','Veronica','Veronicastrum','Vetiveria','Viburnum','Vicia','Vigna','Viguiera','Vinca','Vincetoxicum','Viola','Viscum','Vitex','Vitis','Wasabia','Washingtonia','Weigela','Weinmannia','Wikstroemia','Wisteria','Withania','Wittsteinia','Wolffia','Woodwardia','Wyethia','Xanthium','Xanthoceras','Xanthorhiza','Xanthorrhoea','Xerophyllum','Xylosma','Xyris','Youngia','Yucca','Yushania','Zannichellia','Zantedeschia','Zanthoxylum','Zea','Zelkova','Zephyranthes','Zieria','Zizania','Zizia','Ziziphus','Zostera','Zoysia','Zygophyllum'
];

const PP_GENUS_VALUES = shared.PP_GENUS_VALUES;

const ALL_SALINITY_VALUES = ['tolerant', 'intolerant'];
const PP_SALINITY_VALUES = shared.PP_SALINITY_VALUES;

module.exports = {
  readCrops,
  readCropsLower,

  getAsArray,

  ALL_PROPERTIES,
  PP_PROPERTIES,
  NUMBER_PROPERTIES,
  ARRAY_PROPERTIES,

  ALL_BOOLEAN_VALUES,
  ALL_HARDINESS_ZONE_VALUES,
  ALL_SOIL_TEXTURE_VALUES,
  ALL_SOIL_PH_VALUES,
  ALL_SOIL_WATER_RETENTION_VALUES,
  ALL_SHADE_VALUES,
  ALL_SUN_VALUES,
  ALL_WATER_VALUES,
  ALL_DROUGHT_VALUES,
  ALL_ECOSYSTEM_NICHE_VALUES,
  ALL_LIFE_CYCLE_VALUES,
  ALL_HERBACEOUS_OR_WOODY_VALUES,
  ALL_DECIDUOUS_OR_EVERGREEN_VALUES,
  ALL_GROWTH_RATE_VALUES,
  ALL_MATURE_MEASUREMENT_UNIT_VALUES,
  ALL_MATURE_HEIGHT_VALUES,
  ALL_MATURE_WIDTH_VALUES,
  ALL_FLOWER_TYPE_VALUES,
  ALL_POLLINATORS_VALUES,
  ALL_FUNCTIONS_VALUES,
  ALL_GROW_FROM_VALUES,
  ALL_CUTTING_TYPE_VALUES,
  ALL_FERTILITY_VALUES,
  ALL_ROOT_ZONE_VALUES,
  ALL_FAMILY_VALUES,
  ALL_GENUS_VALUES,
  ALL_SALINITY_VALUES,

  PP_BOOLEAN_VALUES,
  PP_HARDINESS_ZONE_VALUES,
  PP_SOIL_TEXTURE_VALUES,
  PP_SOIL_PH_VALUES,
  PP_SOIL_WATER_RETENTION_VALUES,
  PP_SHADE_VALUES,
  PP_SUN_VALUES,
  PP_WATER_VALUES,
  PP_DROUGHT_VALUES,
  PP_ECOSYSTEM_NICHE_VALUES,
  PP_LIFE_CYCLE_VALUES,
  PP_HERBACEOUS_OR_WOODY_VALUES,
  PP_DECIDUOUS_OR_EVERGREEN_VALUES,
  PP_GROWTH_RATE_VALUES,
  PP_MATURE_MEASUREMENT_UNIT_VALUES,
  PP_MATURE_HEIGHT_VALUES,
  PP_MATURE_WIDTH_VALUES,
  PP_FLOWER_TYPE_VALUES,
  PP_POLLINATORS_VALUES,
  PP_FUNCTIONS_VALUES,
  PP_GROW_FROM_VALUES,
  PP_CUTTING_TYPE_VALUES,
  PP_FERTILITY_VALUES,
  PP_ROOT_ZONE_VALUES,
  PP_FAMILY_VALUES,
  PP_GENUS_VALUES,
  PP_SALINITY_VALUES
};
