/**
 * practicalplants.org definitions that are shared between client and server.
 *
 * @namespace practicalplants
 * @memberof shared
 */

module.exports = {
  PP_BOOLEAN_VALUES: ['false', 'true'],
  PP_HARDINESS_ZONE_VALUES: 12,
  PP_SOIL_TEXTURE_VALUES: ['sandy', 'loamy', 'clay', 'heavy clay'],
  PP_SOIL_PH_VALUES: [
    'very acid',
    'acid',
    'neutral',
    'alkaline',
    'very alkaline'
  ],
  PP_SOIL_WATER_RETENTION_VALUES: ['well drained', 'moist', 'wet'],
  PP_SHADE_VALUES: [
    'no shade',
    'light shade',
    'partial shade',
    'permanent shade',
    'permanent deep shade'
  ],
  PP_SUN_VALUES: ['indirect sun', 'partial sun', 'full sun'],
  PP_WATER_VALUES: ['low', 'moderate', 'high', 'aquatic'],
  PP_DROUGHT_VALUES: ['dependent', 'tolerant', 'intolerant'],
  PP_ECOSYSTEM_NICHE_VALUES: [
    'canopy',
    'climber',
    'secondary canopy',
    'soil surface',
    'shrub',
    'herbaceous',
    'rhizosphere'
  ],
  PP_LIFE_CYCLE_VALUES: ['perennial', 'annual', 'biennial'],
  PP_HERBACEOUS_OR_WOODY_VALUES: ['herbaceous', 'woody'],
  PP_DECIDUOUS_OR_EVERGREEN_VALUES: ['deciduous', 'evergreen'],
  PP_GROWTH_RATE_VALUES: ['slow', 'moderate', 'vigorous'],
  PP_MATURE_MEASUREMENT_UNIT_VALUES: ['meters', 'feet'],
  PP_MATURE_HEIGHT_VALUES: 110,
  PP_MATURE_WIDTH_VALUES: 30,
  PP_FLOWER_TYPE_VALUES: ['hermaphrodite', 'monoecious', 'dioecious'],
  PP_POLLINATORS_VALUES: [
    'insects',
    'wind',
    'bees',
    'flies',
    'self',
    'beetles',
    'lepidoptera',
    'bats',
    'moths',
    'birds',
    'apomictic',
    'slugs',
    'snails',
    'hoverflies',
    'cleistogamous',
    'wasps',
    'water',
    'midges',
    'diptera',
    'butterflies',
    'apomixy',
    'bumblebees',
    'wind-blown sand',
    'sunbirds',
    'carrion flies',
    'hand',
    'dryoptera',
    'hymenoptera'
  ],
  PP_FUNCTIONS_VALUES: [
    'nitrogen fixer',
    'ground cover',
    'hedge',
    'windbreak',
    'pioneer',
    'earth stabiliser',
    'green manure',
    'repellant',
    'soil builder',
    'rootstock',
    'biogenic decalcifier',
    'phytoremediation',
    'bee attractor',
    'soil conditioner',
    'pest repellent'
  ],
  PP_GROW_FROM_VALUES: [
    'seed',
    'cutting',
    'layering',
    'tuber',
    'suckers',
    'graft',
    'bulb'
  ],
  PP_CUTTING_TYPE_VALUES: ['semi-ripe', 'soft wood', 'root', 'hard wood'],
  PP_FERTILITY_VALUES: ['self fertile', 'self sterile'],
  PP_ROOT_ZONE_VALUES: ['shallow', 'deep', 'surface'],
  PP_SALINITY_VALUES: ['tolerant', 'intolerant'],
  PP_FAMILY_VALUES: [
    'Acanthaceae',
    'Aceraceae',
    'Actinidiaceae',
    'Agavaceae',
    'Aizoaceae',
    'Alangiaceae',
    'Alismataceae',
    'Alliaceae',
    'Aloeaceae',
    'Alstroemeriaceae',
    'Amaranthaceae',
    'Amaryllidaceae',
    'Anacardiaceae',
    'Annonaceae',
    'Apocynaceae',
    'Aponogetonaceae',
    'Aquifoliaceae',
    'Araceae',
    'Araliaceae',
    'Araucariaceae',
    'Aristolochiaceae',
    'Asclepiadaceae',
    'Asparagaceae',
    'Asphodelaceae',
    'Asteliaceae',
    'Asteraceae',
    'Atherospermataceae',
    'Balsaminaceae',
    'Basellaceae',
    'Begoniaceae',
    'Berberidaceae',
    'Betulaceae',
    'Bignoniaceae',
    'Blechnaceae',
    'Boraginaceae',
    'Brassicaceae',
    'Bromeliaceae',
    'Buddleiaceae',
    'Burseraceae',
    'Butomaceae',
    'Buxaceae',
    'Cabombaceae',
    'Cactaceae',
    'Callitrichaceae',
    'Calochortaceae',
    'Calycanthaceae',
    'Calyceraceae',
    'Campanulaceae',
    'Cannabidaceae',
    'Cannaceae',
    'Capparidaceae',
    'Caprifoliaceae',
    'Caryophyllaceae',
    'Casuarinaceae',
    'Celastraceae',
    'Cephalotaxaceae',
    'Ceratophyllaceae',
    'Cercidiphyllaceae',
    'Chenopodiaceae',
    'Chloranthaceae',
    'Cistaceae',
    'Clethraceae',
    'Cneoraceae',
    'Colchicaceae',
    'Commelinaceae',
    'Compositae',
    'Convallariaceae',
    'Convolvulaceae',
    'Coriariaceae',
    'Cornaceae',
    'Corynocarpaceae',
    'Crassulaceae',
    'Cucurbitaceae',
    'Cunoniaceae',
    'Cupressaceae',
    'Cyatheaceae',
    'Cycadaceae',
    'Cynocrambaceae',
    'Cyperaceae',
    'Cyrillaceae',
    'Daphniphyllaceae',
    'Datiscaceae',
    'Diapensiaceae',
    'Dicksoniaceae',
    'Dioscoreaceae',
    'Dipsacaceae',
    'Droseraceae',
    'Dryopteridaceae',
    'Ebenaceae',
    'Ehretiaceae',
    'Elaeagnaceae',
    'Elaeocarpaceae',
    'Empetraceae',
    'Epacridaceae',
    'Ephedraceae',
    'Equisetaceae',
    'Ericaceae',
    'Eriocaulaceae',
    'Escalloniaceae',
    'Eucommiaceae',
    'Eucryphiaceae',
    'Euphorbiaceae',
    'Eupomatiaceae',
    'Eupteleaceae',
    'Euryalaceae',
    'Fagaceae',
    'Flacourtiaceae',
    'Fumariaceae',
    'Funkiaceae',
    'Garryaceae',
    'Gentianaceae',
    'Geraniaceae',
    'Gesneriaceae',
    'Ginkgoaceae',
    'Gleicheniaceae',
    'Globulariaceae',
    'Goodeniaceae',
    'Gramineae',
    'Grossulariaceae',
    'Gunneraceae',
    'Haemodoraceae',
    'Haloragidaceae',
    'Hamamelidaceae',
    'Hemerocallidaceae',
    'Hippocastanaceae',
    'Hippuridaceae',
    'Hyacinthaceae',
    'Hydrangeaceae',
    'Hydrocharitaceae',
    'Hydrophyllaceae',
    'Hypericaceae',
    'Hypoxidaceae',
    'Illiciaceae',
    'Iridaceae',
    'Juglandaceae',
    'Juncaceae',
    'Juncaginaceae',
    'Labiatae',
    'Lamiaceae',
    'Lardizabalaceae',
    'Lauraceae',
    'Leguminosae',
    'Leitneriaceae',
    'Lemnaceae',
    'Lentibulariaceae',
    'Liliaceae',
    'Limnanthaceae',
    'Linaceae',
    'Loasaceae',
    'Loganiaceae',
    'Lomandraceae',
    'Loranthaceae',
    'Lycopodiaceae',
    'Lythraceae',
    'Magnoliaceae',
    'Malpighiaceae',
    'Malvaceae',
    'Marrattiaceae',
    'Marsileaceae',
    'Martyniaceae',
    'Melanthiaceae',
    'Melastomataceae',
    'Meliaceae',
    'Melianthaceae',
    'Menispermaceae',
    'Menyanthaceae',
    'Misodendraceae',
    'Molluginaceae',
    'Monimiaceae',
    'Moraceae',
    'Morinaceae',
    'Musaceae',
    'Myoporaceae',
    'Myricaceae',
    'Myrsinaceae',
    'Myrtaceae',
    'Najadaceae',
    'Nelumbonaceae',
    'Nyctaginaceae',
    'Nymphaeaceae',
    'Nyssaceae',
    'Oenotheraceae',
    'Oleaceae',
    'Onagraceae',
    'Onocleaceae',
    'Ophioglossaceae',
    'Orchidaceae',
    'Orobanchaceae',
    'Osmundaceae',
    'Oxalidaceae',
    'Paeoniaceae',
    'Palmae',
    'Papaveraceae',
    'Parmeliaceae',
    'Parnassiaceae',
    'Passifloraceae',
    'Pedaliaceae',
    'Philesiaceae',
    'Phormiaceae',
    'Phrymaceae',
    'Phytolaccaceae',
    'Pinaceae',
    'Pistaciaceae',
    'Pittosporaceae',
    'Plantaginaceae',
    'Platanaceae',
    'Plumbaginaceae',
    'Podocarpaceae',
    'Podophyllaceae',
    'Polemoniaceae',
    'Polygalaceae',
    'Polygonaceae',
    'Polypodiaceae',
    'Polytrichaceae',
    'Pontederiaceae',
    'Portulacaceae',
    'Potamogetonaceae',
    'Primulaceae',
    'Proteaceae',
    'Pteridaceae',
    'Punicaceae',
    'Pyrolaceae',
    'Rafflesiaceae',
    'Ranunculaceae',
    'Resedaceae',
    'Restoniaceae',
    'Rhamnaceae',
    'Rosaceae',
    'Rubiaceae',
    'Ruscaceae',
    'Rutaceae',
    'Salicaceae',
    'Santalaceae',
    'Sapindaceae',
    'Sapotaceae',
    'Sargentodoxaceae',
    'Sarraceniaceae',
    'Saururaceae',
    'Saxifragaceae',
    'Schisandraceae',
    'Sciadoptyaceae',
    'Scrophulariaceae',
    'Selaginellaceae',
    'Simaroubaceae',
    'Smilacaceae',
    'Solanaceae',
    'Sparganiaceae',
    'Sphagnaceae',
    'Staphyleaceae',
    'Sterculiaceae',
    'Styracaceae',
    'Symplocaceae',
    'Tamaricaceae',
    'Taxaceae',
    'Taxodiaceae',
    'Tecophilaeaceae',
    'Theaceae',
    'Thelypteridaceae',
    'Thymelaeaceae',
    'Tiliaceae',
    'Trapaceae',
    'Tricyrtidaceae',
    'Trilliaceae',
    'Tropaeolaceae',
    'Turneraceae',
    'Typhaceae',
    'Ulmaceae',
    'Umbelliferae',
    'Urticaceae',
    'Uvulariaceae',
    'Valerianaceae',
    'Verbenaceae',
    'Violaceae',
    'Viscaceae',
    'Vitaceae',
    'Winteraceae',
    'Xanthorrhoeaceae',
    'Xyridaceae',
    'Zannichelliaceae',
    'Zingiberaceae',
    'Zosteraceae',
    'Zygophyllaceae'
  ],
  PP_GENUS_VALUES: [
    'Abelia',
    'Abelmoschus',
    'Abies',
    'Abobra',
    'Abronia',
    'Abutilon',
    'Acacia',
    'Acaenia',
    'Acalypha',
    'Acanthus',
    'Acca',
    'Acer',
    'Achillea',
    'Achnatherum',
    'Achyranthes',
    'Acinos',
    'Aciphylla',
    'Aconitum',
    'Acorus',
    'Acourtia',
    'Acrotriche',
    'Actaea',
    'Actinea',
    'Actinidia',
    'Adenophora',
    'Adenostoma',
    'Adesmia',
    'Adiantum',
    'Adina',
    'Adonis',
    'Aegilops',
    'Aegopodium',
    'Aesculus',
    'Aethusa',
    'Agalinis',
    'Agapanthus',
    'Agastache',
    'Agathis',
    'Agave',
    'Ageratina',
    'Ageratum',
    'Agoseris',
    'Agrimonia',
    'Agriophyllum',
    'Agropyron',
    'Agrostemma',
    'Agrostis',
    'Ailanthus',
    'Aizoon',
    'Ajuga',
    'Akebia',
    'Alangium',
    'Albizia',
    'Albuca',
    'Alcea',
    'Alchemilla',
    'Aletris',
    'Aleurites',
    'Alhagi',
    'Alisma',
    'Alkanna',
    'Alliaria',
    'Allium',
    'Alnus',
    'Aloe',
    'Alopecurus',
    'Aloysia',
    'Alstroemeria',
    'Althaea',
    'Amaranthus',
    'Ambrosia',
    'Amelanchier',
    'Amelasorbus',
    'Ammannia',
    'Ammi',
    'Ammophila',
    'Amomyrtus',
    'Amorpha',
    'Amorphophallus',
    'Ampelodesmos',
    'Ampelopsis',
    'Amphicarpaea',
    'Amsinckia',
    'Amyema',
    'Anacamptis',
    'Anacyclus',
    'Anagallis',
    'Anaphalis',
    'Anchusa',
    'Andromeda',
    'Andropogon',
    'Androsace',
    'Androstephium',
    'Anemarrhena',
    'Anemone',
    'Anemonella',
    'Anemopsis',
    'Anethum',
    'Angelica',
    'Angiopteris',
    'Angophora',
    'Anredera',
    'Antennaria',
    'Anthemis',
    'Anthoxanthum',
    'Anthriscus',
    'Anthyllis',
    'Antirrhinum',
    'Aphananthe',
    'Aphanes',
    'Apios',
    'Apium',
    'Aplectrum',
    'Apocynum',
    'Aponogeton',
    'Aquilegia',
    'Arabidopsis',
    'Arabis',
    'Arachis',
    'Aralia',
    'Araucaria',
    'Araujia',
    'Arbutus',
    'Arctium',
    'Arctostaphylos',
    'Ardisia',
    'Arenaria',
    'Argemone',
    'Argyranthemum',
    'Arisaema',
    'Arisarum',
    'Aristolochia',
    'Aristotelia',
    'Arjona',
    'Armeria',
    'Armoracia',
    'Arnebia',
    'Arnica',
    'Aronia',
    'Arracacia',
    'Artemisia',
    'Arthrocnemum',
    'Arthromeris',
    'Arthropodium',
    'Arum',
    'Arundinaria',
    'Arundinella',
    'Arundo',
    'Asarum',
    'Asclepias',
    'Asimina',
    'Aspalathus',
    'Asparagus',
    'Asperula',
    'Asphodeline',
    'Asphodelus',
    'Aspidistra',
    'Aspidosperma',
    'Asplenium',
    'Astelia',
    'Aster',
    'Astilbe',
    'Astragalus',
    'Astrantia',
    'Astrebla',
    'Astroloma',
    'Asyneuma',
    'Athamantha',
    'Atherosperma',
    'Athrotaxis',
    'Athyrium',
    'Atractylis',
    'Atractylodes',
    'Atraphaxis',
    'Atriplex',
    'Atropa',
    'Aubrietia',
    'Aucuba',
    'Aurinia',
    'Avena',
    'Azara',
    'Azorella',
    'Azorina',
    'Babiana',
    'Baccharis',
    'Backhousia',
    'Baeckea',
    'Ballota',
    'Balsamorhiza',
    'Bambusa',
    'Banksia',
    'Baptisia',
    'Barbarea',
    'Basella',
    'Bassia',
    'Bauhinia',
    'Beckmannia',
    'Begonia',
    'Beilschmiedia',
    'Belamcanda',
    'Bellis',
    'Benincasa',
    'Berberidopsis',
    'Berberis',
    'Berchemia',
    'Bergenia',
    'Berula',
    'Beta',
    'Betula',
    'Bidens',
    'Billardiera',
    'Blackstonia',
    'Blechnum',
    'Bletilla',
    'Bloomeria',
    'Bobartia',
    'Boehmeria',
    'Boenninghausenia',
    'Boerhavia',
    'Bolax',
    'Bomarea',
    'Bongardia',
    'Boopsis',
    'Borago',
    'Borinda',
    'Boronia',
    'Botrychium',
    'Bouteloua',
    'Brachychiton',
    'Brachyglottis',
    'Brachyloma',
    'Bracyloma',
    'Brahea',
    'Brasenia',
    'Brassica',
    'Brodiaea',
    'Bromus',
    'Broussonetia',
    'Bryonia',
    'Buddleia',
    'Buglossoides',
    'Bulbinella',
    'Bulbinopsis',
    'Bulbophyllum',
    'Bumelia',
    'Bunchosia',
    'Bunias',
    'Bunium',
    'Bupleurum',
    'Burchardia',
    'Bursaria',
    'Butia',
    'Butomus',
    'Buxus',
    'Cacalia',
    'Caesalpinia',
    'Caesia',
    'Cakile',
    'Calamintha',
    'Calandrinia',
    'Calceolaria',
    'Calendula',
    'Calicotome',
    'Calla',
    'Callicarpa',
    'Callicoma',
    'Calligonum',
    'Callirhoe',
    'Callistemon',
    'Callitriche',
    'Callitris',
    'Calluna',
    'Calocedrus',
    'Calochortus',
    'Caltha',
    'Calycanthus',
    'Calypso',
    'Calystegia',
    'Camassia',
    'Camelina',
    'Camellia',
    'Campanula',
    'Camphorosma',
    'Campsis',
    'Canarium',
    'Canna',
    'Cannabis',
    'Capparis',
    'Capsella',
    'Capsicum',
    'Caragana',
    'Cardamine',
    'Cardaria',
    'Cardiocrinum',
    'Cardiospermum',
    'Carduus',
    'Carex',
    'Carlina',
    'Carpesium',
    'Carpinus',
    'Carpobrotus',
    'Carthamnus',
    'Carum',
    'Carya',
    'Cassinia',
    'Cassiope',
    'Cassythia',
    'Castanea',
    'Castanopsis',
    'Castanospermum',
    'Castilleja',
    'Casuarina',
    'Catabrosa',
    'Catalpa',
    'Caucalis',
    'Caulanthus',
    'Caulophyllum',
    'Cautleya',
    'Cavendishia',
    'Ceanothus',
    'Cedronella',
    'Cedrus',
    'Celastrus',
    'Celosia',
    'Celtis',
    'Centaurea',
    'Centaurium',
    'Centella',
    'Centipeda',
    'Centranthus',
    'Centrosema',
    'Cephalanthus',
    'Cephalaria',
    'Cephalotaxus',
    'Cerastium',
    'Ceratonia',
    'Ceratophyllum',
    'Ceratostigma',
    'Cercidiphyllum',
    'Cercis',
    'Cercocarpus',
    'Ceroxylon',
    'Cetraria',
    'Chaenactis',
    'Chaenomeles',
    'Chaerophyllum',
    'Chamaecrista',
    'Chamaecyparis',
    'Chamaedaphne',
    'Chamaelirium',
    'Chamaemelum',
    'Chamaerops',
    'Chamaesaracha',
    'Chasmanthium',
    'Cheilanthes',
    'Chelidonium',
    'Chelone',
    'Chenopodium',
    'Chesneya',
    'Chiliotrichum',
    'Chilopsis',
    'Chimaphila',
    'Chimonanthus',
    'Chimonobambusa',
    'Chionanthus',
    'Chionographis',
    'Chloranthus',
    'Chlorogalum',
    'Choisya',
    'Chondrilla',
    'Chorispora',
    'Chrozophora',
    'Chrysanthemum',
    'Chrysolepis',
    'Chrysosplenium',
    'Chrysothamnus',
    'Chusquea',
    'Cibotium',
    'Cicer',
    'Cicerbita',
    'Cichorium',
    'Cicuta',
    'Cimicifuga',
    'Cinna',
    'Cinnamomum',
    'Circaea',
    'Cirsium',
    'Cistus',
    'Citrofortunella',
    'Citroncirus',
    'Citrullus',
    'Citrus',
    'Cladium',
    'Cladrastis',
    'Clarkia',
    'Claytonia',
    'Clematis',
    'Cleome',
    'Clerodendrum',
    'Clethra',
    'Cliftonia',
    'Clinopodium',
    'Clintonia',
    'Cneorum',
    'Cnicus',
    'Cnidium',
    'Coccinia',
    'Cocculus',
    'Cochlearia',
    'Codonopsis',
    'Coelopleurum',
    'Coix',
    'Colchicum',
    'Coleus',
    'Colletia',
    'Collinsonia',
    'Coluria',
    'Colutea',
    'Comandra',
    'Commelina',
    'Commersonia',
    'Comptonia',
    'Conandron',
    'Conanthera',
    'Condalia',
    'Coniogramme',
    'Conioselinum',
    'Conium',
    'Conopodium',
    'Conradina',
    'Conringia',
    'Consolida',
    'Convallaria',
    'Convolvulus',
    'Conyza',
    'Coprosma',
    'Coptis',
    'Corallorhiza',
    'Corchorus',
    'Cordyline',
    'Corema',
    'Coreopsis',
    'Coriandrum',
    'Coriaria',
    'Cornus',
    'Corokia',
    'Coronilla',
    'Coronopus',
    'Correa',
    'Corrigiola',
    'Cortaderia',
    'Corydalis',
    'Corylus',
    'Corynocarpus',
    'Cosmos',
    'Cotinus',
    'Cotoneaster',
    'Cotula',
    'Cousinia',
    'Cowania',
    'Crambe',
    'Crataegomespilus',
    'Crataegus',
    'Crepis',
    'Crinum',
    'Crithmum',
    'Crocosmia',
    'Crocus',
    'Crotalaria',
    'Cruciata',
    'Cryptomeria',
    'Cryptotaenia',
    'Cucubalus',
    'Cucumis',
    'Cucurbita',
    'Cudrania',
    'Cuminum',
    'Cunila',
    'Cunninghamia',
    'Cuphea',
    'Cupressocyparis',
    'Cupressus',
    'Cuscuta',
    'Cyananthus',
    'Cyanella',
    'Cyathea',
    'Cyathodes',
    'Cycas',
    'Cyclamen',
    'Cyclanthera',
    'Cyclea',
    'Cycloloma',
    'Cyclospermum',
    'Cydonia',
    'Cymbalaria',
    'Cymbonotus',
    'Cymopterus',
    'Cynanchum',
    'Cynara',
    'Cynodon',
    'Cynoglossum',
    'Cyperus',
    'Cyphomandra',
    'Cypripedium',
    'Cyrilla',
    'Cyrtanthus',
    'Cyrtomium',
    'Cystopteris',
    'Cytinus',
    'Cytisus',
    'Dacrycarpus',
    'Dacrydium',
    'Dactylis',
    'Dactyloctenium',
    'Dactylorhiza',
    'Dahlia',
    'Dalbergia',
    'Dalea',
    'Damasonium',
    'Daphne',
    'Daphniphyllum',
    'Darmera',
    'Dasylirion',
    'Datisca',
    'Datura',
    'Daucus',
    'Daviesia',
    'Debregeasia',
    'Decaisnea',
    'Decemium',
    'Deinanthe',
    'Delphinium',
    'Dendranthema',
    'Dendrobium',
    'Dendrostellera',
    'Dentaria',
    'Deschampsia',
    'Descurainia',
    'Desfontainia',
    'Desmanthus',
    'Desmodium',
    'Desmoschoenus',
    'Deutzia',
    'Dianella',
    'Dianthus',
    'Dicentra',
    'Dichelachne',
    'Dichelostemma',
    'Dichondra',
    'Dichopogon',
    'Dichroa',
    'Dicksonia',
    'Dicliptera',
    'Dicoria',
    'Dictamnus',
    'Diervilla',
    'Digitalis',
    'Digitaria',
    'Dioscorea',
    'Diospyros',
    'Dipcadi',
    'Diphylleia',
    'Diplotaxis',
    'Diploterigium',
    'Dipploglottis',
    'Dipsacus',
    'Dirca',
    'Disphyma',
    'Disporum',
    'Distylium',
    'Dittrichia',
    'Docynia',
    'Dodecatheon',
    'Dodonaea',
    'Dorema',
    'Doronicum',
    'Draba',
    'Dracocephalum',
    'Drepanostachyum',
    'Drimys',
    'Drosera',
    'Dryas',
    'Drymaria',
    'Dryopteris',
    'Duchesnea',
    'Dudleya',
    'Dysosma',
    'Dysoxylum',
    'Ecballium',
    'Echinacea',
    'Echinochloa',
    'Echinocystis',
    'Echinophora',
    'Echinops',
    'Echium',
    'Eclipta',
    'Edgeworthia',
    'Ehretia',
    'Eichhornia',
    'Elaeagnus',
    'Elaeocarpus',
    'Elatostema',
    'Eleocharis',
    'Eleusine',
    'Eleutherococcus',
    'Elodea',
    'Elsholtzia',
    'Elymus',
    'Elytrigia',
    'Emex',
    'Emilia',
    'Eminium',
    'Empetrum',
    'Encelia',
    'Enchylaena',
    'Ensete',
    'Entelea',
    'Ephedra',
    'Epifagus',
    'Epigaea',
    'Epilobium',
    'Epimedium',
    'Equisetum',
    'Eragrostis',
    'Erechtites',
    'Eremophila',
    'Eremurus',
    'Erica',
    'Ericameria',
    'Erigenia',
    'Erigeron',
    'Eriobotrya',
    'Eriocaulon',
    'Eriodictyon',
    'Eriogonum',
    'Eriophorum',
    'Eriophyton',
    'Erodium',
    'Erophila',
    'Eruca',
    'Erucaria',
    'Eryngium',
    'Erysimum',
    'Erythrina',
    'Erythronium',
    'Escallonia',
    'Eschscholzia',
    'Eucalyptus',
    'Euchresta',
    'Eucommia',
    'Eucryphia',
    'Euodia',
    'Euonymus',
    'Eupatorium',
    'Euphorbia',
    'Euphrasia',
    'Eupomatia',
    'Euptelea',
    'Eurya',
    'Euryale',
    'Euscaphis',
    'Eustrephus',
    'Exocarpus',
    'Fabiana',
    'Fagopyrum',
    'Fagus',
    'Fallopia',
    'Fallugia',
    'Farfugium',
    'Fargesia',
    'Fedia',
    'Ferula',
    'Festuca',
    'Fibigia',
    'Ficus',
    'Filipendula',
    'Fimbristylis',
    'Firmiana',
    'Fitzroya',
    'Foeniculum',
    'Fontanesia',
    'Forestiera',
    'Forsythia',
    'Fortunella',
    'Fragaria',
    'Frasera',
    'Fraxinus',
    'Fremontodendron',
    'Fritillaria',
    'Fuchsia',
    'Fumaria',
    'Gagea',
    'Gaillardia',
    'Galactites',
    'Galanthus',
    'Galax',
    'Galega',
    'Galeopsis',
    'Galinsoga',
    'Galium',
    'Garrya',
    'Gastrodia',
    'Gaultheria',
    'Gaylussacia',
    'Geijera',
    'Geitonoplesium',
    'Gelsemium',
    'Genista',
    'Gentiana',
    'Gentianella',
    'Geocaulon',
    'Geranium',
    'Gerbera',
    'Geum',
    'Gevuina',
    'Gillenia',
    'Gingidia',
    'Ginkgo',
    'Girardiana',
    'Gladiolus',
    'Glaucium',
    'Glaux',
    'Glechoma',
    'Gleditsia',
    'Glehnia',
    'Globularia',
    'Glochidion',
    'Glyceria',
    'Glycine',
    'Glycyrrhiza',
    'Glyptostrobus',
    'Gnaphalium',
    'Goodenia',
    'Goodyera',
    'Gratiola',
    'Greigia',
    'Grevillea',
    'Grewia',
    'Grindelia',
    'Griselinia',
    'Guizotia',
    'Gundelia',
    'Gunnera',
    'Gutierrezia',
    'Gymnadenia',
    'Gymnocladus',
    'Gynandriris',
    'Gynatrix',
    'Gynostemma',
    'Gynura',
    'Gypsophila',
    'Habenaria',
    'Hackelia',
    'Hakea',
    'Halenia',
    'Halerpestes',
    'Halesia',
    'Halimione',
    'Halimodendron',
    'Haloxylon',
    'Hamamelis',
    'Haplopappus',
    'Hardenbergia',
    'Hebe',
    'Hedeoma',
    'Hedera',
    'Hedychium',
    'Hedysarum',
    'Heimia',
    'Heldreichia',
    'Helenium',
    'Helianthemum',
    'Helianthus',
    'Helichrysum',
    'Heliotropium',
    'Helleborus',
    'Helwingia',
    'Hemerocallis',
    'Hemiphragma',
    'Hemiptelea',
    'Hemizonia',
    'Hepatica',
    'Heracleum',
    'Herniaria',
    'Herpetospermum',
    'Hesperaloe',
    'Hesperantha',
    'Hesperis',
    'Hesperocallis',
    'Heteropappus',
    'Heuchera',
    'Hibiscus',
    'Hieracium',
    'Hierochloe',
    'Hilaria',
    'Himalayacalamus',
    'Hippophae',
    'Hippuris',
    'Hirschfeldia',
    'Hoffmannseggia',
    'Hoheria',
    'Holboellia',
    'Holodiscus',
    'Hololeion',
    'Homoranthus',
    'Honckenya',
    'Hordeum',
    'Hosta',
    'Hottonia',
    'Houttuynia',
    'Hovenia',
    'Humulus',
    'Hyacinthoides',
    'Hyacinthus',
    'Hydrangea',
    'Hydrastis',
    'Hydrilla',
    'Hydrocotyle',
    'Hydrophyllum',
    'Hymenanthera',
    'Hymenopappus',
    'Hymenoxys',
    'Hyoscyamus',
    'Hypericum',
    'Hypochoeris',
    'Hypoxis',
    'Hyssopus',
    'Iberis',
    'Idesia',
    'Ilex',
    'Illicium',
    'Impatiens',
    'Imperata',
    'Incarvillea',
    'Indigofera',
    'Indocalamus',
    'Inula',
    'Ipomoea',
    'Ipomopsis',
    'Iris',
    'Isatis',
    'Isodon',
    'Isopogon',
    'Itea',
    'Iva',
    'Ixeris',
    'Jasminum',
    'Jeffersonia',
    'Jovibarba',
    'Jubaea',
    'Juglans',
    'Juncus',
    'Juniperus',
    'Jurinea',
    'Jussieva',
    'Justicia',
    'Kadsura',
    'Kalimeris',
    'Kalmia',
    'Kalopanax',
    'Kerria',
    'Keteleeria',
    'Kickxia',
    'Kinugasa',
    'Kirkophytum',
    'Knautia',
    'Knightia',
    'Kniphofia',
    'Koeleria',
    'Koelreuteria',
    'Kosteletzkya',
    'Kuhnia',
    'Kummerowia',
    'Kunzea',
    'Lablab',
    'Laburnum',
    'Lachnanthes',
    'Lactuca',
    'Lagarostrobus',
    'Lagenaria',
    'Lagerstroemia',
    'Lagochilus',
    'Lagoecia',
    'Lallemantia',
    'Lamium',
    'Lancea',
    'Lapageria',
    'Laportea',
    'Lapsana',
    'Lardizabala',
    'Laretia',
    'Larix',
    'Larrea',
    'Laser',
    'Laserpitium',
    'Lasthenia',
    'Lathyrus',
    'Laurelia',
    'Lavandula',
    'Lavatera',
    'Layia',
    'Ledebouriella',
    'Ledum',
    'Legousia',
    'Leibnitzia',
    'Leichhardtia',
    'Leitneria',
    'Lemna',
    'Lens',
    'Leontice',
    'Leontodon',
    'Leontopodium',
    'Leonurus',
    'Lepidium',
    'Lepidogrammitis',
    'Lepidosperma',
    'Lepidothamnus',
    'Leptocarpus',
    'Leptomeria',
    'Leptospermum',
    'Lespedeza',
    'Lesquerella',
    'Leucanthemum',
    'Leucas',
    'Leucocrinum',
    'Leucojum',
    'Leucopogon',
    'Leucothoe',
    'Leuzea',
    'Levisticum',
    'Lewisia',
    'Leycesteria',
    'Leymus',
    'Liatris',
    'Libocedrus',
    'Ligularia',
    'Ligusticum',
    'Ligustrum',
    'Lilaea',
    'Lilium',
    'Limnanthes',
    'Limonium',
    'Linaria',
    'Lindera',
    'Linnaea',
    'Linum',
    'Liparis',
    'Liquidambar',
    'Liriodendron',
    'Liriope',
    'Lissanthe',
    'Lithocarpus',
    'Lithospermum',
    'Litsea',
    'Livistona',
    'Lobelia',
    'Lobularia',
    'Lolium',
    'Lomandra',
    'Lomatium',
    'Lonicera',
    'Lophomyrtus',
    'Loropetalum',
    'Lotus',
    'Ludwigia',
    'Luma',
    'Lunaria',
    'Lupinus',
    'Luzula',
    'Lychnis',
    'Lycium',
    'Lycopersicon',
    'Lycopodium',
    'Lycopus',
    'Lycoris',
    'Lygeum',
    'Lygodesmia',
    'Lyonia',
    'Lyonsia',
    'Lysichiton',
    'Lysimachia',
    'Lythrum',
    'Maackia',
    'Macadamia',
    'Macleaya',
    'Maclura',
    'Macromeria',
    'Macrotomia',
    'Madia',
    'Magnolia',
    'Mahoberberis',
    'Mahonia',
    'Maianthemum',
    'Malus',
    'Malva',
    'Malvastrum',
    'Mandragora',
    'Marah',
    'Margyricarpus',
    'Marrubium',
    'Marsdenia',
    'Marsilea',
    'Marsippospermum',
    'Matricaria',
    'Matteuccia',
    'Matthiola',
    'Maytenus',
    'Mazus',
    'Meconopsis',
    'Medeola',
    'Medicago',
    'Meehania',
    'Megacarpaea',
    'Megacodon',
    'Melaleuca',
    'Melanthium',
    'Melastoma',
    'Melia',
    'Melianthus',
    'Melichrus',
    'Melicope',
    'Melicytus',
    'Melilotus',
    'Melissa',
    'Melittis',
    'Menispermum',
    'Mentha',
    'Mentzelia',
    'Menyanthes',
    'Menziesia',
    'Mercurialis',
    'Mertensia',
    'Mesembryanthemum',
    'Mespilus',
    'Metaplexis',
    'Metasequoia',
    'Metrosideros',
    'Meum',
    'Michelia',
    'Microcachrys',
    'Micromeria',
    'Microseris',
    'Microtis',
    'Milium',
    'Millettia',
    'Mimulus',
    'Mirabilis',
    'Miscanthus',
    'Misodendrum',
    'Mitchella',
    'Mitella',
    'Mollugo',
    'Momorialis',
    'Monarda',
    'Monardella',
    'Moneses',
    'Monizia',
    'Monolepis',
    'Monotoca',
    'Monotropa',
    'Montia',
    'Moraea',
    'Morina',
    'Morus',
    'Mosla',
    'Muehlenbeckia',
    'Muhlenbergia',
    'Musa',
    'Muscari',
    'Musineon',
    'Mycelis',
    'Myoporum',
    'Myosotis',
    'Myosoton',
    'Myriactis',
    'Myrica',
    'Myricaria',
    'Myriophyllum',
    'Myrrhis',
    'Myrsine',
    'Myrteola',
    'Myrtus',
    'Nabalus',
    'Nageia',
    'Najas',
    'Nandina',
    'Nannorrhops',
    'Narcissus',
    'Nardostachys',
    'Nasturtium',
    'Navarretia',
    'Neillia',
    'Nelumbo',
    'Nemopanthus',
    'Neolitsea',
    'Neomyrtus',
    'Nepeta',
    'Nerium',
    'Nertera',
    'Nicandra',
    'Nicotiana',
    'Nigella',
    'Nitraria',
    'Nothofagus',
    'Nothoscordum',
    null,
    'Nuphar',
    'Nymphaea',
    'Nymphoides',
    'Nyssa',
    'Ocimum',
    'Oemleria',
    'Oenanthe',
    'Oenothera',
    'Oldenlandia',
    'Olea',
    'Olearia',
    'Olneya',
    'Onobrychis',
    'Onoclea',
    'Ononis',
    'Onopordum',
    'Onosma',
    'Ophioglossum',
    'Ophiopogon',
    'Ophrys',
    'Oplopanax',
    'Opopanax',
    'Opuntia',
    'Orchis',
    'Oreomyrrhis',
    'Origanum',
    'Orixa',
    'Ornithogalum',
    'Ornithopus',
    'Orobanche',
    'Orogenia',
    'Orontium',
    'Orostachys',
    'Orthilia',
    'Orychophragmus',
    'Oryzopsis',
    'Osbeckia',
    'Osmanthus',
    'Osmorhiza',
    'Osmunda',
    'Osteomeles',
    'Ostrya',
    'Oxalis',
    'Oxydendrum',
    'Oxyria',
    'Oxytropis',
    'Pachyphragma',
    'Pachyrhizus',
    'Pachysandra',
    'Packera',
    'Paederia',
    'Paeonia',
    'Paliuris',
    'Panax',
    'Pancratium',
    'Panicum',
    'Papaver',
    'Parajubaea',
    'Parietaria',
    'Paris',
    'Parnassia',
    'Paronychia',
    'Parosella',
    'Parrotiopsis',
    'Parryella',
    'Parthenium',
    'Parthenocissus',
    'Passiflora',
    'Pastinaca',
    'Patrinia',
    'Paulownia',
    'Pectis',
    'Pedicularis',
    'Peganum',
    'Pelargonium',
    'Peltandra',
    'Peltaria',
    'Pennisetum',
    'Penstemon',
    'Pentachondra',
    'Pentaglottis',
    'Penthorum',
    'Peracarpa',
    'Peraphyllum',
    'Pericome',
    'Perideridia',
    'Perilla',
    'Periploca',
    'Perovskia',
    'Persea',
    'Persoonia',
    'Petasites',
    'Peteria',
    'Petroselinum',
    'Peucedanum',
    'Peumus',
    'Phacelia',
    'Phalaris',
    'Phaseolus',
    'Phellodendron',
    'Philadelphus',
    'Phillyrea',
    'Phleum',
    'Phlomis',
    'Phlox',
    'Phoenix',
    'Phoradendron',
    'Phormium',
    'Photinia',
    'Phragmites',
    'Phryma',
    'Phyla',
    'Phyllocladus',
    'Phyllospadix',
    'Phyllostachys',
    'Physaliastrum',
    'Physalis',
    'Physocarpus',
    'Phyteuma',
    'Phytolacca',
    'Picea',
    'Picrasma',
    'Picris',
    'Picrorhiza',
    'Pieris',
    'Pilosella',
    'Pimelea',
    'Pimpinella',
    'Pinckneya',
    'Pinellia',
    'Pinguicula',
    'Pinus',
    'Pistacia',
    'Pisum',
    'Pittosporum',
    'Plagianthus',
    'Plagiobothrys',
    'Planchonella',
    'Plantago',
    'Platanthera',
    'Platanus',
    'Platycarya',
    'Platycodon',
    'Platycrater',
    'Platystemon',
    'Plectranthus',
    'Pleioblastus',
    'Pleurospermum',
    'Plumbago',
    'Poa',
    'Podocarpium',
    'Podocarpus',
    'Podolepis',
    'Podophyllum',
    'Pogantherum',
    'Pogogyne',
    'Polemonium',
    'Polianthes',
    'Poliomintha',
    'Polygala',
    'Polygonatum',
    'Polygonum',
    'Polymnia',
    'Polypodium',
    'Polypogon',
    'Polyscias',
    'Polystichum',
    'Polytrichum',
    'Poncirus',
    'Pontederia',
    'Populus',
    'Portulaca',
    'Potamogeton',
    'Potentilla',
    'Prangos',
    'Pratia',
    'Prenanthes',
    'Primula',
    'Pringlea',
    'Prinsepia',
    'Proboscidea',
    'Prostanthera',
    'Protea',
    'Prumnopitys',
    'Prunella',
    'Prunus',
    'Pseudocydonia',
    'Pseudognaphalium',
    'Pseudolarix',
    'Pseudopanax',
    'Pseudosasa',
    'Pseudotsuga',
    'Pseudowintera',
    'Psidium',
    'Psophocarpus',
    'Psoralea',
    'Psychotria',
    'Ptelea',
    'Pteridium',
    'Pterocarya',
    'Pteroceltis',
    'Pterospora',
    'Pterostyrax',
    'Ptiloria',
    'Puccinellia',
    'Pueraria',
    'Pugionium',
    'Pulicaria',
    'Pulmonaria',
    'Pulsatilla',
    'Punica',
    'Puya',
    'Pycnanthemum',
    'Pyracantha',
    'Pyrocydonia',
    'Pyrola',
    'Pyronia',
    'Pyrrhopappus',
    'Pyrularia',
    'Pyrus',
    'Quercus',
    'Quillaja',
    'Ranunculus',
    'Raphanus',
    'Ratibida',
    'Reaumuria',
    'Rehmannia',
    'Reichardia',
    'Reineckia',
    'Reseda',
    'Rhagodia',
    'Rhamnella',
    'Rhamnus',
    'Rhaphiolepis',
    'Rhaponticum',
    'Rheum',
    'Rhexia',
    'Rhinanthus',
    'Rhodiola',
    'Rhododendron',
    'Rhus',
    'Rhynchosinapis',
    'Ribes',
    'Ricinus',
    'Ripogonum',
    'Robinia',
    'Rodgersia',
    'Rohdea',
    'Romanzoffia',
    'Romulea',
    'Rorippa',
    'Rosa',
    'Rubia',
    'Rubus',
    'Rudbeckia',
    'Rulingia',
    'Rumex',
    'Ruscus',
    'Ruta',
    'Sabal',
    'Sabatia',
    'Sagina',
    'Sagittaria',
    'Salicornia',
    'Salix',
    'Salsola',
    'Salvia',
    'Sambucus',
    'Samolus',
    'Sanguinaria',
    'Sanguisorba',
    'Sanicula',
    'Sanseviera',
    'Santalum',
    'Santolina',
    'Sapindus',
    'Sapium',
    'Saponaria',
    'Sarcobatus',
    'Sargentodoxa',
    'Sarracenia',
    'Sasa',
    'Sasaella',
    'Sasamorpha',
    'Sassafras',
    'Satureja',
    'Saururus',
    'Saussurea',
    'Saxifraga',
    'Scabiosa',
    'Scaevola',
    'Scandix',
    'Schinus',
    'Schisandra',
    'Schizomeria',
    'Schizophragma',
    'Sciadopitys',
    'Scilla',
    'Scirpus',
    'Scleranthus',
    'Scolymus',
    'Scopolia',
    'Scorpiurus',
    'Scorzonera',
    'Scrophularia',
    'Scutellaria',
    'Sebaea',
    'Secale',
    'Securidaca',
    'Securinega',
    'Sedum',
    'Selaginella',
    'Semiaquilegia',
    'Semiarundinaria',
    'Sempervivum',
    'Senecio',
    'Senna',
    'Sequoia',
    'Sequoiadendron',
    'Serenoa',
    'Serratula',
    'Sesamum',
    'Sesbania',
    'Seseli',
    'Sesuvium',
    'Setaria',
    'Shepherdia',
    'Sherardia',
    'Shibataea',
    'Sicyos',
    'Sidalcea',
    'Sideritis',
    'Siegesbeckia',
    'Silaum',
    'Silene',
    'Silphium',
    'Silybum',
    'Sinapis',
    'Sinofranchetia',
    'Sinomenium',
    'Siphonostegia',
    'Sison',
    'Sisymbrium',
    'Sisyrinchium',
    'Sium',
    'Skimmia',
    'Smilacena',
    'Smilax',
    'Smyrnium',
    'Solanum',
    'Soldanella',
    'Solidago',
    'Sonchus',
    'Sophora',
    'Sorbaria',
    'Sorbopyrus',
    'Sorbus',
    'Sorghum',
    'Sparaxis',
    'Sparganium',
    'Spartina',
    'Spartium',
    'Spergula',
    'Spergularia',
    'Sphagnum',
    'Spigelia',
    'Spinacia',
    'Spiraea',
    'Spiranthes',
    'Spirodela',
    'Sporobolus',
    'Stachys',
    'Stanleya',
    'Staphylea',
    'Stauntonia',
    'Stellaria',
    'Stellera',
    'Stephanandra',
    'Stephanomeria',
    'Stevia',
    'Stewartia',
    'Stilbocarpa',
    'Stillingia',
    'Stipa',
    'Stratiotes',
    'Streptopus',
    'Strobilanthes',
    'Stylophorum',
    'Styphelia',
    'Styrax',
    'Suaeda',
    'Succisa',
    'Swertia',
    'Sympholoma',
    'Symphoricarpos',
    'Symphytum',
    'Symplocarpus',
    'Symplocos',
    'Syncarpia',
    'Synurus',
    'Syringa',
    'Syzygium',
    'Tagetes',
    'Talinum',
    'Tamarix',
    'Tamus',
    'Tanacetum',
    'Taraxacum',
    'Taxodium',
    'Taxus',
    'Tellima',
    'Telopea',
    'Tephroseris',
    'Tephrosia',
    'Ternstroemia',
    'Tetragonia',
    'Tetrapanax',
    'Tetrastigma',
    'Teucrium',
    'Thalictrum',
    'Thamnocalamus',
    'Thapsia',
    'Thelesperma',
    'Theligonum',
    'Thelymitra',
    'Thelypteris',
    'Thermopsis',
    'Thladiantha',
    'Thlaspi',
    'Thuja',
    'Thujopsis',
    'Thymbra',
    'Thymus',
    'Thysanotus',
    'Tiarella',
    'Tigridia',
    'Tilia',
    'Tilingia',
    'Tinopsora',
    'Tithonia',
    'Tolmiea',
    'Toona',
    'Tordylium',
    'Torilis',
    'Torreya',
    'Trachelospermum',
    'Trachycarpus',
    'Trachymene',
    'Trachyspermum',
    'Trachystemon',
    'Tradescantia',
    'Tragopogon',
    'Trapa',
    'Tribulus',
    'Trichosanthes',
    'Tricyrtis',
    'Trientalis',
    'Trifolium',
    'Triglochin',
    'Trigonella',
    'Trigonotis',
    'Trilisa',
    'Trillium',
    'Triodia',
    'Triosteum',
    'Triphasia',
    'Tripsacum',
    'Tripterygium',
    'Trisetum',
    'Triteleia',
    'Triticosecale',
    'Triticum',
    'Tritonia',
    'Trochocarpa',
    'Trollius',
    'Tropaeolum',
    'Tsuga',
    'Tulbaghia',
    'Tulipa',
    'Tupeia',
    'Turnera',
    'Turritis',
    'Tussilago',
    'Tylophora',
    'Typha',
    'Ugni',
    'Ulex',
    'Ullucus',
    'Ulmus',
    'Umbellularia',
    'Umbilicus',
    'Uncaria',
    'Uniola',
    'Urceola',
    'Urginea',
    'Urospermum',
    'Urtica',
    'Utricularia',
    'Uvularia',
    'Vaccaria',
    'Vaccinium',
    'Valeriana',
    'Valerianella',
    'Vallisneria',
    'Veratrum',
    'Verbascum',
    'Verbena',
    'Vernonia',
    'Veronica',
    'Veronicastrum',
    'Vetiveria',
    'Viburnum',
    'Vicia',
    'Vigna',
    'Viguiera',
    'Vinca',
    'Vincetoxicum',
    'Viola',
    'Viscum',
    'Vitex',
    'Vitis',
    'Wasabia',
    'Washingtonia',
    'Weigela',
    'Weinmannia',
    'Wikstroemia',
    'Wisteria',
    'Withania',
    'Wittsteinia',
    'Wolffia',
    'Woodwardia',
    'Wyethia',
    'Xanthium',
    'Xanthoceras',
    'Xanthorhiza',
    'Xanthorrhoea',
    'Xerophyllum',
    'Xylosma',
    'Xyris',
    'Youngia',
    'Yucca',
    'Yushania',
    'Zannichellia',
    'Zantedeschia',
    'Zanthoxylum',
    'Zea',
    'Zelkova',
    'Zephyranthes',
    'Zieria',
    'Zizania',
    'Zizia',
    'Ziziphus',
    'Zostera',
    'Zoysia',
    'Zygophyllum'
  ]
};
