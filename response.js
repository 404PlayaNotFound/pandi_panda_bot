let responses = [
  {
      "keyword": ["bonjour", "hello", "salut", "coucou", "yo", "wesh", "kikou", "allo", "guten tag", "konichiwa", "ohayo", "ohayou"],
      "responses": {
          "default": ["Hello mon cher ! Que puis-je faire pour toi ?", "Salut toi, comment je peux t'aider ?", "Salut, t'as besoin d'aide ?", "Yo, besoin d'aide ?"],
          "angry" : ["Ouais, salut. Qu'est-ce que tu veux ?", "Hm ?"]
      }
  },
  {
      "keyword": ["au revoir", "bye", "tchao", "a+"],
      "responses": {
          "default": ["A bientôt", "A la prochaine"],
          "angry": ["C'est ça, casse toi", "Enfin tranquille..."]
      }
  }
];

let special_responces = {
    "waiting_too_much" : ["", ""],
    "no_response_match" : [""],
    "no_wiki_response_match" : [""],
    "one_wiki_response_match" : ["{0} avec {1}"], // {0} => titre du match {1}=> snipet du match
    "too_much_wiki_response_match" : ["{0}"] // {0} => nombre de match wiki
};


let stopwords = ["a", "à", "â", "abord", "absolument", "actuellement", "à demi", "afin", "ah", "ai", "aie", "ainsi", "allaient", "allo", "allô", "allons", "alors", "à peine", "à peu près", "apparemment", "approximativement", "après", "après-demain", "assez", "assurément", "attendu", "au", "aucun", "aucune", "aucunement", "aucuns", "aujourd", "aujourd'hui", "auparavant", "auquel", "aura", "auront", "aussi", "aussitôt", "autant", "autre", "autrefois", "autrement", "autres", "aux", "auxquelles", "auxquels", "avaient", "avais", "avait", "avant", "avant-hier", "avec", "avoir", "ayant", "b", "bah", "beaucoup", "bien", "bientôt", "bigre", "bon", "boum", "bravo", "brrr", "c", "c'", "ça", "car", "carrément", "ce", "ceci", "cela", "celle", "celle-ci", "celle-là", "celles", "celles-ci", "celles-là", "celui", "celui-ci", "celui-là", "cent", "cependant", "certain", "certaine", "certainement", "certaines", "certains", "certes", "ces", "c'est", "cet", "cette", "ceux", "ceux-ci", "ceux-là", "chacun", "chaque", "cher", "chère", "chères", "chers", "chez", "chiche", "chut", "ci", "cinq", "cinquantaine", "cinquante", "cinquantième", "cinquième", "clac", "clic", "combien", "comme", "comment", "complètement", "compris", "concernant", "contre", "couic", "crac", "d", "d'", "da", "d'abord", "dans", "davantage", "de", "debout", "debut", "début", "dedans", "dehors", "déjà", "delà", "demain", "depuis", "derechef", "derrière", "des", "dès", "désormais", "desquelles", "desquels", "dessous", "dessus", "deux", "deuxième", "deuxièmement", "devant", "devers", "devra", "devrait", "diablement", "différent", "différente", "différentes", "différents", "dire", "divers", "diverse", "diverses", "divinement", "dix", "dix-huit", "dixième", "dix-neuf", "dix-sept", "doit", "doivent", "donc", "dont", "dorénavant", "dos", "douze", "douzième", "dring", "droite", "drôlement", "du", "d'un", "d'une", "duquel", "durant", "e", "effet", "egalement", "eh", "elle", "elle-même", "elles", "elles-mêmes", "en", "encore", "enfin", "ensuite", "entièrement", "entre", "entre-temps", "en vérité", "envers", "environ", "es", "ès", "essai", "est", "et", "étaient", "étais", "était", "etant", "étant", "état", "etc", "ete", "été", "étions", "etre", "être", "eu", "euh", "eux", "eux-mêmes", "excepté", "extrêmement", "f", "façon", "fais", "faisaient", "faisant", "fait", "faites", "feront", "fi", "flac", "floc", "fois", "font", "force", "g", "gens", "grace", "grâce", "grandement", "guère", "h", "ha", "habituellement", "haut", "hé", "hein", "hélas", "hem", "hep", "hi", "hier", "ho", "holà", "hop", "hormis", "hors", "hou", "houp", "hue", "hui", "huit", "huitième", "hum", "hurrah", "i", "ici", "il", "ils", "importe", "infiniment", "insuffisamment", "j", "jadis", "jamais", "je", "joliment", "jusqu", "jusque", "juste", "k", "ka", "l", "la", "là", "laquelle", "las", "le", "lequel", "les", "lès", "lesquelles", "lesquels", "leur", "leurs", "lol", "longtemps", "lors", "lorsque", "lui", "lui-même", "m", "ma", "maint", "maintenant", "mais", "malgré", "mdr", "me", "meme", "même", "mêmes", "merci", "mes", "mien", "mienne", "miennes", "miens", "mieux", "mille", "mince", "mine", "moi", "moi-même", "moins", "mon", "mot", "moyennant", "n", "na", "naguère", "ne", "néanmoins", "neuf", "neuvième", "ni", "nombreuses", "nombreux", "nommés", "non", "nos", "notre", "nôtre", "nôtres", "nous", "nous-mêmes", "nouveaux", "nul", "nullement", "o", "o|", "ô", "oh", "ohé", "olé", "ollé", "on", "ont", "onze", "onzième", "ore", "ou", "où", "ouf", "oui", "ouias", "oust", "ouste", "outre", "p", "paf", "pan", "par", "parce", "parfois", "parmi", "parole", "partant", "particulier", "particulière", "particulièrement", "pas", "pas mal", "passablement", "passé", "pendant", "personne", "personnes", "peu", "peut", "peut-être", "peuvent", "peux", "pff", "pfft", "pfut", "pièce", "pif", "plein", "plouf", "plupart", "plus", "plusieurs", "plutôt", "point", "pouah", "pour", "pourquoi", "précisément", "premier", "première", "premièrement", "près", "presque", "probablement", "proche", "prou", "psitt", "puis", "puisque", "q", "qu", "quand", "quant", "quanta", "quant-à-soi", "quarante", "quasi", "quasiment", "quatorze", "quatre", "quatre-vingt", "quatrième", "quatrièmement", "que", "quel", "quelconque", "quelle", "quelles", "quelque", "quelquefois", "quelques", "quelqu'un", "quels", "qui", "quiconque", "quinze", "quoi", "quoique", "quotidiennement", "r", "revoici", "revoilà", "rien", "rudement", "s", "s'", "sa", "sacrebleu", "sans", "sans doute", "sapristi", "sauf", "se", "seize", "selon", "sept", "septième", "sera", "seront", "ses", "seulement", "si", "sien", "sienne", "siennes", "siens", "sinon", "sitôt", "six", "sixième", "soi", "soi-même", "soit", "soixante", "son", "sont", "soudain", "sous", "souvent", "soyez", "stop", "subitement", "suffisamment", "suis", "suivant", "sujet", "sur", "surtout", "t", "t'", "ta", "tac", "tandis", "tant", "tantôt", "tard", "te", "té", "tel", "telle", "tellement", "telles", "tels", "tenant", "terriblement", "tes", "tic", "tien", "tienne", "tiennes", "tiens", "toc", "toi", "toi-même", "ton", "tôt", "totalement", "touchant", "toujours", "tous", "tout", "tout à fait", "toute", "toutefois", "toutes", "treize", "trente", "tres", "très", "trois", "troisième", "troisièmement", "trop", "tsoin", "tsouin", "tu", "u", "un", "une", "unes", "uns", "v", "va", "vais", "valeur", "vas", "vé", "vers", "via", "vif", "vifs", "vingt", "vivat", "vive", "vives", "vlan", "voici", "voie", "voient", "voilà", "volontiers", "vont", "vos", "votre", "vôtre", "vôtres", "vous", "vous-mêmes", "vraiment", "vraisemblablement", "vu", "w", "x", "y", "z", "zut"];
