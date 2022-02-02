module.exports =
class Stealth {
  constructor (stealth) {
    this.setParams(stealth)

    return this.stealthParams
  }

  get stealthParams () {
    return {
      languages: this.languages,
      vendor: this.vendor,
      platform: this.platform,
      webglVendor: this.webglVendor,
      renderer: this.renderer,
      fixHairlines: this.fixHairlines
    }
  }

  setParams (stealth) {
    if (stealth) {
      console.log('TODO: create set params')
    } else {
      this.languages = this.generateLanguage ()
      this.vendor = this.generateVendor ()
      this.platform = this.generatePlatform ()
      this.webglVendor = this.generateWebGlVendor ()
      this.renderer = this.generateRenderer ()
      this.fixHairlines = this.generateFixHairline ()
    }
  }

  generateVendor () {
    const Vendors = ['Google Inc.', 'Apple Computer', 'Inc.']

    return getRandomElementFromArray (Vendors)
  }

  generateLanguage () {
    const Languages = ["af", "sq", "ar-SA", "ar-IQ", "ar-EG", "ar-LY", "ar-DZ", "ar-MA", "ar-TN", "ar-OM",
    "ar-YE", "ar-SY", "ar-JO", "ar-LB", "ar-KW", "ar-AE", "ar-BH", "ar-QA", "eu", "bg",
    "be", "ca", "zh-TW", "zh-CN", "zh-HK", "zh-SG", "hr", "cs", "da", "nl", "nl-BE", "en",
    "en-US", "en-EG", "en-AU", "en-GB", "en-CA", "en-NZ", "en-IE", "en-ZA", "en-JM",
    "en-BZ", "en-TT", "et", "fo", "fa", "fi", "fr", "fr-BE", "fr-CA", "fr-CH", "fr-LU",
    "gd", "gd-IE", "de", "de-CH", "de-AT", "de-LU", "de-LI", "el", "he", "hi", "hu",
    "is", "id", "it", "it-CH", "ja", "ko", "lv", "lt", "mk", "mt", "no", "pl",
    "pt-BR", "pt", "rm", "ro", "ro-MO", "ru", "ru-MI", "sz", "sr", "sk", "sl", "sb",
    "es", "es-AR", "es-GT", "es-CR", "es-PA", "es-DO", "es-MX", "es-VE", "es-CO",
    "es-PE", "es-EC", "es-CL", "es-UY", "es-PY", "es-BO", "es-SV", "es-HN", "es-NI",
    "es-PR", "sx", "sv", "sv-FI", "th", "ts", "tn", "tr", "uk", "ur", "ve", "vi", "xh",
    "ji", "zu"]

    return [getRandomElementFromArray (["en-US"])]
  }

  generatePlatform () {
    const Platforms = [
      'HP-UX', 'Linux i686', 'Linux armv7l', 'Mac68K', 'MacPPC',
      'MacIntel', 'SunOS', 'Win16', 'Win32', 'WinCE', 'iPhone',
      'iPod', 'iPad', 'Android', 'BlackBerry', 'Opera'
    ]

    return getRandomElementFromArray (Platforms)
  }

  generateWebGlVendor () {
    const WebGlVendors = ['Intel Inc.', 'Apple Inc.', 'AMD Inc.', 'Google Inc.', 'Inc.']

    return getRandomElementFromArray (WebGlVendors)
  }

  generateRenderer () {
    const Renderers = ['Intel Iris OpenGL Engine', 'Apple Inc. OpenGL Engine', 'Google Inc. GL Engine']

    return getRandomElementFromArray (Renderers)
  }

  generateFixHairline () {
    const fixHairlines = [false, true]

    return getRandomElementFromArray (fixHairlines)
  }
}

function getRandomElementFromArray (value) {
  if (Array.isArray (value)) {
    return value[ getRandomInt (value.length) ]
  }

  return new Error('value is not array or this other soft error')
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
