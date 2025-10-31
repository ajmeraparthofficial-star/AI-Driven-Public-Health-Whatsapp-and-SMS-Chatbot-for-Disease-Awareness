import { Language } from './types';

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', greeting: 'Hello! I am your AI Health Companion. How can I assist you today?' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', greeting: 'नमस्ते! मैं आपका एआई स्वास्थ्य साथी हूँ। मैं आज आपकी कैसे सहायता कर सकता हूँ?' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', greeting: 'নমস্কার! আমি আপনার এআই স্বাস্থ্য সঙ্গী। আমি আজ আপনাকে কিভাবে সাহায্য করতে পারি?' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', greeting: 'నమస్కారం! నేను మీ ఏఐ ఆరోగ్య సహచరుడిని। ఈ రోజు నేను మీకు ఎలా సహాయపడగలను?' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', greeting: 'नमस्कार! मी तुमचा एआय आरोग्य सोबती आहे। मी आज तुम्हाला कशी मदत करू शकेन?' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', greeting: 'வணக்கம்! நான் உங்கள் AI சுகாதார துணைவர். இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', greeting: 'ہیلو! میں آپ کا اے آئی ہیلتھ کمپینین ہوں۔ میں آج آپ کی کس طرح مدد کر سکتا ہوں؟' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', greeting: 'નમસ્તે! હું તમારો એઆઈ હેલ્થ કમ્પેનિયન છું। આજે હું તમને કેવી રીતે મદદ કરી શકું?' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', greeting: 'ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಎಐ ಆರೋಗ್ಯ ಸಂಗಾತಿ. ಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', greeting: 'ନମସ୍କାର! ମୁଁ ଆପଣଙ୍କର AI ସ୍ୱାସ୍ଥ୍ୟ ସାଥୀ। ଆଜି ମୁଁ ଆପଣଙ୍କୁ କିପରି ସାହାଯ୍ୟ କରିପାରିବି?' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', greeting: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡਾ ਏਆਈ ਹੈਲਥ ਸਾਥੀ ਹਾਂ। ਮੈਂ ਅੱਜ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', greeting: 'നമസ്കാരം! ഞാൻ നിങ്ങളുടെ AI ആരോഗ്യ സഹ компаньയൻ ആണ്. ഇന്ന് എനിക്ക് നിങ്ങളെ എങ്ങനെ സഹായിക്കാൻ കഴിയും?' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', greeting: 'নমস্কাৰ! মই আপোনাৰ এআই স্বাস্থ্য সঙ্গী। মই আজি আপোনাক কেনেকৈ সহায় কৰিব পাৰোঁ?' },
  { code: 'kok', name: 'Konkani', nativeName: 'कोंकणी', greeting: 'नमस्कार! हांव तुमचो एआय आरोग्य साथी। आयज हांव तुमकां कशी मजत करूं?' },
  { code: 'ks', name: 'Kashmiri', nativeName: 'कश्मीरी', greeting: 'آس-السلام علیکم! بہٕ چھُس تُہُند اے آے صحتُک سٲتھی۔ بہٕ کیاہ کٔرِ تُہہِ ازِ مدد؟' },
  { code: 'mai', name: 'Maithili', nativeName: 'मैथिली', greeting: 'प्रणाम! हम अहाँक एआई स्वास्थ्य सहयोगी छी। हम आई अहाँक कोना मदत कऽ सकैत छी?' },
  { code: 'mni', name: 'Manipuri', nativeName: 'মৈতৈ', greeting: 'খুরুমজরি! ঐহাক অদোমগী এআই হেলথ কম্পেনিয়ননি। ঙসি ঐহাক্না অদোমবু করি মতেং পাংবা মঙলগে?' },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली', greeting: 'नमस्ते! म तपाईंको एआई स्वास्थ्य साथी हुँ। म आज तपाईंलाई कसरी मद्दत गर्न सक्छु?' },
  { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृत', greeting: 'नमस्कारः! अहं भवतः एआई स्वास्थ्य-सहायकः अस्मि। अद्य अहं कथं साहाय्यं करवाणि?' },
  { code: 'sd', name: 'Sindhi', nativeName: 'सिन्धी', greeting: 'नमस्कार! مان توهان جو اي آءِ صحت جو ساٿي آهيان। مان اڄ توهان جي ڪيئن مدد ڪري سگهان ٿو؟' },
  { code: 'sat', name: 'Santali', nativeName: 'संताली', greeting: 'ᱡᱚᱦᱟᱨ! ᱤᱧ ᱫᱚ ᱟᱢᱨᱮᱱ ᱮᱭᱟᱭ ᱦᱮᱞᱛᱷ ᱜᱟᱛᱮ ᱠᱟᱹᱱᱟᱹᱧ᱾ ᱛᱮᱦᱮᱧ ᱤᱧ ᱟᱢᱟᱜ ᱪᱮᱫ ᱞᱮᱠᱟᱛᱮ ᱜᱚᱲᱚ ᱫᱟᱲᱮᱭᱟᱢᱟ?' },
  // FIX: Escaped the single quote in "के'यां" to prevent a syntax error.
  { code: 'doi', name: 'Dogri', nativeName: 'डोगरी', greeting: 'नमस्ते! मैं तुंदा एआई सेहत दा साथी आं। मैं अज्ज तुंदी के\\\'यां मदद करी सकदा?' },
  { code: 'bo', name: 'Bodo', nativeName: 'बोड़ो', greeting: 'नमस्कार! आं नोंथांनि एआई सावस्रि लोगो। दिनै आं नोंथांनिसिम मा मदद खालामनो हागौ?' },
  { code: 'hinglish', name: 'Hinglish', nativeName: 'Hinglish', greeting: 'Namaste! Main aapka AI Health Companion hoon. Aaj main aapki kaise madad kar sakta hoon?' },
];