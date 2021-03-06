(function(){
	
	
BidiStructureText_LRM = "\u200e";
BidiStructureText_RLM = "\u200f";
BidiStructureText_LRE = '\u202A';
BidiStructureText_RLE = '\u202B';
BidiStructureText_PDF = '\u202C';

defaultDelimiters = "\\/:."
FilepathDelimiters = "\\/:."
URLDelimiters = "/:.?=&#"
EMailDelimiters = "<>@.,;"

var structuralBidi = function(str, type) {
  index = 0;
  indexOfDelimiter = [];
  //console.log(type)
  ArabicNum = new RegExp("[u0660\\u0661\\u0662\\u0663\\u0664\\u0665\\u0666\\u0667\\u0668\\u0669]");
  RTLchars = new RegExp(
    "[\\u061b\\u0621-\\u064a\\u066d-\\u066f\\u0671-\\u06d5"
    + "\\u06dd\\u06e5\\u06e6\\u06ee\\u06ef\\u06fa-\\u070d\\u0710\\u0712-\\u072f"
    + "\\u074d-\\u07a5\\u07b1\\ufb50-\\ufd3d\\ufd50-\\ufdfc\\ufe70-\\ufefc]"
  );
  LTRchars = new RegExp("[a-zA-Z]");

  if (type == "email")
    delimiters = EMailDelimiters;
  else if (type == "url")
    delimiters = URLDelimiters;
  else if (type = "filePath")
    delimiters = FilepathDelimiters;
  else delimiters = defaultDelimiters
  //console.log(delimiters);
let del = 0;

  for (var i = 0; i <= str.length; i++) {

    test = str.charAt(i);
    //indexOfDelimiter=[ ];
    for (var j = 0; j <delimiters.length; j++) {
      if (test == delimiters.charAt(j)) {
        for (var k = i-1; k >= 0; k--) {
          chars = str.charAt(k);
          if (RTLchars.test(chars) || LTRchars.test(chars)) {
            if (RTLchars.test(chars)) {
    
              // console.log(str); 
              str = str.slice(0, i+del) + BidiStructureText_LRM + str.slice(i+del);
              del += 1;
              // console.log(str); 
              break;
            }
            break;
          }
          else if (ArabicNum.test(chars)) {
            break;
          }
    
        break;
    
      }
      }     
    }
  }
  
    

  newStr = BidiStructureText_LRE + str + BidiStructureText_PDF;
  return newStr;
}
var baseTextDir= function(dir, str, defaultdDir = "ltr") {
  if (dir == "rtl")
    return "rtl"
  else if (dir == "ltr")
    return "ltr"
  else if (dir == "auto") {
    let chars = '';
    RTLchars = new RegExp(
      "[\\u061b\\u0621-\\u064a\\u066d-\\u066f\\u0671-\\u06d5"
      + "\\u06dd\\u06e5\\u06e6\\u06ee\\u06ef\\u06fa-\\u070d\\u0710\\u0712-\\u072f"
      + "\\u074d-\\u07a5\\u07b1\\ufb50-\\ufd3d\\ufd50-\\ufdfc\\ufe70-\\ufefc]"
    );

    LTRchars = new RegExp("[a-zA-Z]");

    for (var i = 0; i <= str.length; i++) {
      chars = str.charAt(i);

      if (RTLchars.test(chars)) {
        return "rtl"

      }
      else if (LTRchars.test(chars)) {
        return "ltr"

      }
    }
    return defaultDir;

  }
}



	
	/* As of Unicode 7.0, the Arabic script is contained in the following blocks:
	 * 
	 * Arabic (0600—06FF, 255 characters)Arabic Supplement (0750—077F, 48 characters)
	 * Arabic Extended-A (08A0—08FF, 39 characters)
	 * Arabic Presentation Forms-A (FB50—FDFF, 608characters)
	 * Arabic Presentation Forms-B (FE70—FEFF, 140 characters)
	 */

	//strongArabic : /[\u0608\u060B\u060D\u061B-\u064A\u066D-\u066F\u0671-\u06D5\u06E5-\u06E6\u06EE-\u06EF\u06FA-\u06FF\u0750-\u077F\u08A0-\u08E3\u200F\u202B\u202E\u2067\uFB50-\uFD3D\uFD40-\uFDCF\uFDF0-\uFDFC\uFDFE-\uFDFF\uFE70-\uFEFE]/,
	//weakArabic : /[\u0600-\u0607\u0609-\u060A\u060C\u060E-\u061A\u064B-\u066C\u0670\u06D6-\u06E4\u06E7-\u06ED\u06F0-\u06F9\u08E4-\u08FF\uFD3E-\uFD3F\uFDD0-\uFDEF\uFDFD\uFEFF]/,

	/* As of Unicode 7.0, the latin script is contained in the following blocks:
	 *
	 * Basic Latin, 0000–007F.
	 * Latin Extended-A, 0100–017F
	 * Latin Extended-B, 0180–024F
	 * IPA Extensions, 0250–02AF
	 * Spacing Modifier Letters, 02B0–02FF
	 * Phonetic Extensions, 1D00–1D7F
	 * Phonetic Extensions Supplement, 1D80–1DBF
	 * Latin Extended Additional, 1E00–1EFF
	 * Superscripts and Subscripts, 2070-209F
	 * Letter-like Symbols, 2100–214F
	 * Number Forms, 2150–218F
	 * Latin Extended-C, 2C60–2C7F
	 * LatinExtended-D, A720–A7FF
	 * Latin Extended-E, AB30–AB6F
	 * Alphabetic Presentation Forms (Latin ligatures) FB00–FB4F
	 * Halfwidth and Fullwidth Forms (fullwidthLatin letters) FF00–FFEF
	 */

	//weakLatin : /[\u0000-\u0040\u005B-\u0060\u007B-\u007F\u0080-\u00A9\u00AB-\u00B4\u00B6-\u00B9\u00BB-\u00BF\u00D7\u00F7\u02B9-\u02BA\u02C2-\u02CF\u02D2-\u02DF\u02E5-\u02ED\u02EF-\u02FF\u2070\u2074-\u207E\u2080-\u208E\u2100-\u2101\u2103-\u2106\u2108-\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A-\u213B\u2140-\u2144\u214A-\u214D\u2150-\u215F\u2189\uA720-\uA721\uA788\uFF01-\uFF20\uFF3B-\uFF40\uFF5B-\uFF65\uFFE0-\uFFE6\uFFE8-\uFFEE]/,

	// regex: Regex object
	//      To detect (Latin digit) | (Arabic digit) | (strong Arabic letter) | (strong Latin letter).
	//      Strong Latin letter is a letter which is not Arabic/Latin digit & not weak Arabic/Latin letter & not strong Arabic letter.
	var regex = /([0-9])|([\u0660-\u0669])|([\u0608\u060B\u060D\u061B-\u064A\u066D-\u066F\u0671-\u06D5\u06E5-\u06E6\u06EE-\u06EF\u06FA-\u06FF\u0750-\u077F\u08A0-\u08E3\u200F\u202B\u202E\u2067\uFB50-\uFD3D\uFD40-\uFDCF\uFDF0-\uFDFC\uFDFE-\uFDFF\uFE70-\uFEFE]+)|([^0-9\u0660-\u0669\u0608\u060B\u060D\u061B-\u064A\u066D-\u066F\u0671-\u06D5\u06E5-\u06E6\u06EE-\u06EF\u06FA-\u06FF\u0750-\u077F\u08A0-\u08E3\u200F\u202B\u202E\u2067\uFB50-\uFD3D\uFD40-\uFDCF\uFDF0-\uFDFC\uFDFE-\uFDFF\uFE70-\uFEFE\u0600-\u0607\u0609-\u060A\u060C\u060E-\u061A\u064B-\u066C\u0670\u06D6-\u06E4\u06E7-\u06ED\u06F0-\u06F9\u08E4-\u08FF\uFD3E-\uFD3F\uFDD0-\uFDEF\uFDFD\uFEFF\u0000-\u0040\u005B-\u0060\u007B-\u007F\u0080-\u00A9\u00AB-\u00B4\u00B6-\u00B9\u00BB-\u00BF\u00D7\u00F7\u02B9-\u02BA\u02C2-\u02CF\u02D2-\u02DF\u02E5-\u02ED\u02EF-\u02FF\u2070\u2074-\u207E\u2080-\u208E\u2100-\u2101\u2103-\u2106\u2108-\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A-\u213B\u2140-\u2144\u214A-\u214D\u2150-\u215F\u2189\uA720-\uA721\uA788\uFF01-\uFF20\uFF3B-\uFF40\uFF5B-\uFF65\uFFE0-\uFFE6\uFFE8-\uFFEE]+)/g;

	// summary:
			//      this function is used to converts the digits in the text to European 
	        //      or Arabic digits According to the shaperType & the textDir.
			// description:
			//      This function is intended to convert the digits in the input
			//      Text from European to Arabic & vice versa according to

			//      The shaperType & the textDir as the following:
	        //      ----------------------------------------------
			//      1-Arabic: if shaperType = 'National'.
			//      2-Arabic: if shaperType = 'Contextual' & the preceding character is Arabic.
			//      3-Arabic: if shaperType = 'Contextual' & textDir='rtl' & no preceding strong character.
			//      4-European: if shaperType = 'Nominal'.
			//      5-European: if shaperType = 'Contextual' & the preceding character is English.
			//      6-European: if shaperType = 'Contextual' & textDir='ltr' & no preceding strong character.
	        //
			// text: String - The text to be shaped.
			// shaperType: String - The type of the shaper to be used.
			//      Allowed values: "National", "Nominal", "Contextual"
			// textDir: String - The direction of the input text.
			//      Allowed values: "ltr", "rtl", "auto"
			// returns: The shaped string.

	var _shapeNumerals = function( text, shaperType, textDir) {
		if (!text) {
			return text;
		}

		switch(shaperType){
			case "National":
				return _shapeArabic(text);
			case "Nominal":
				return _shapeEuropean(text);
			case "Contextual":
				return _shapeContextual(text, textDir === "rtl" ? 2 : 1);
			default: return text;
		}

	}

	// summary:
	//      Converts the digits in the text to European digits.
	// text: String - The text to be shaped.
	// return: The shaped string in European format.
	// tags: private

	var _shapeEuropean = function(/*String*/text) {
		return text.replace(/[\u0660-\u0669]/g, function(c) {

			return c.charCodeAt(0) - 1632;

		});

	}

	// summary:
	//      Converts the digits in the text to Arabic-Indic digits.
	// text: String - The text to be shaped.
	// return: The shaped string in European format.
	// tags: private
	
	var _shapeArabic = function(/*String*/text) {

		return text.replace(/[0-9]/g, function(c) {

			return String.fromCharCode(parseInt(c) + 1632);

		});

	}


	// summary:
	//      Converts the digits in the text to European or Arabic digits
	//      According to the type of the preceding strong character.
	// text: String - The text to be shaped.
	// context: int - The current effective context.
	//      If the value is 1, the digits will shaped to European.
	//      If the value is 2, the digits will shaped to Arabic.
	//      Allowed values: European context, Arabic context
	// return: The shaped string.

	var _shapeContextual = function(text, context) {
		return text.replace(regex, function(match, latinDigit, arabicDigit, strongArabic, strongLatin){
			if(latinDigit){
				return context === 2 ? String.fromCharCode(parseInt(latinDigit) + 1632) : latinDigit;
			}else if(arabicDigit){
				return context === 1 ? arabicDigit.charCodeAt(0) - 1632 : arabicDigit;
			}else if(strongArabic){
				context = 2;
			}else if(strongLatin){
				context = 1;
			}
			return match;		// default: keep this text as-is

		});
	}


	return {

		shapeNumerals: _shapeNumerals,
		baseTextDir :_baseTextDir,
		structuralBidi:_structuralBidi

	}
}())
