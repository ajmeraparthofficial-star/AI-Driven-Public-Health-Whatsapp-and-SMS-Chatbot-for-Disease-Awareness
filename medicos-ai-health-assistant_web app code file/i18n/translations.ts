// Using English as a fallback for all languages initially.
// In a real project, these would be translated by native speakers.
const en = {
  // General
  loading: 'Loading...',
  language: 'Language',
  // Layout
  nav_profile: 'Profile',
  nav_reports: 'Reports',
  nav_checkup: 'Checkup',
  nav_vaccine: 'Vaccine',
  nav_tracker: 'Tracker',
  nav_health_centers: 'Map',
  // Auth Page
  auth_welcome_back: 'Welcome Back!',
  auth_create_account: 'Create Your Account',
  auth_full_name: 'Full Name',
  auth_email: 'Email Address',
  auth_password: 'Password',
  auth_login: 'Login',
  auth_signup: 'Sign Up',
  auth_processing: 'Processing...',
  auth_toggle_signup: "Don't have an account? Sign Up",
  auth_toggle_login: 'Already have an account? Login',
  // Profile Page
  profile_title: 'My Profile',
  profile_dob: 'DOB',
  profile_not_set: 'Not set',
  profile_blood_group: 'Blood Group',
  profile_health_schedule: 'Health Schedule',
  profile_settings: 'Settings',
  profile_dark_mode: 'Dark Mode',
  profile_health_vitals: 'Health Vitals',
  profile_logout: 'Logout',
  // Medical Reports
  reports_title: 'My Medical Reports',
  reports_add_new: 'Add New Report',
  reports_report_title: 'Report Title (e.g., MRI Scan)',
  reports_choose_file: 'Choose File',
  reports_add: 'Add',
  reports_date: 'Date',
  reports_file: 'File',
  // Health Checkup
  checkup_title: 'AI Health Checkup',
  checkup_disclaimer_title: 'Disclaimer',
  checkup_disclaimer_text: 'I am an AI assistant and not a medical professional. Please consult a qualified doctor for any health concerns.',
  checkup_how_can_i_help: 'How can I help you?',
  checkup_suggestion_prompt: 'Select a suggestion or type your own query below.',
  checkup_suggestion_term: 'Explain a medical term',
  checkup_suggestion_symptom: 'Ask about a symptom',
  checkup_suggestion_fitness: 'Get fitness advice',
  checkup_suggestion_diet: 'Ask about diet',
  checkup_input_placeholder: 'Describe your symptoms...',
  checkup_whatsapp_bot: 'WhatsApp Bot',
  checkup_sms_bot: 'SMS Bot',
  // Vaccination
  vaccine_title: 'Schedule Vaccination',
  vaccine_select: 'Select a vaccine...',
  vaccine_appointment_scheduled: 'Appointment Scheduled!',
  vaccine_confirmation: 'Your vaccination for {vaccine} is confirmed for {date} at {time}.',
  vaccine_reminder: 'You will receive a reminder notification.',
  vaccine_schedule_another: 'Schedule Another',
  vaccine_label: 'Vaccine',
  vaccine_about: 'About this vaccine',
  vaccine_fetching_info: 'Fetching vaccine information...',
  vaccine_date: 'Date',
  vaccine_time: 'Time',
  vaccine_schedule_appointment: 'Schedule Appointment',
  // Disease Tracker
  tracker_title: 'Disease Outbreak Tracker',
  tracker_select_state: 'Select a state from the list to view details.',
  tracker_select_state_list: 'Indian States & UTs',
  tracker_get_precautions: 'Get Precautions',
  tracker_health_precautions: 'Health Precautions',
  tracker_realtime_alerts: 'Real-time Health Alerts',
  tracker_enter_location: 'Enter city, state, or country',
  tracker_use_my_location: 'Use My Location',
  tracker_check_alerts: 'Check for Alerts',
  tracker_checking: 'Checking...',
  tracker_alerts_for_area: 'Alerts for your area',
  tracker_sources: 'Sources:',
  tracker_map_hover: 'Cases by State (Hover for details)',
  tracker_map_cases: 'Cases',
  // Health Centers
  health_centers_title: 'Nearby Health Centers',
  health_centers_intro: 'Find government-run health centers and clinics near your current location.',
  health_centers_find_button: 'Find Centers Near Me',
  health_centers_finding: 'Finding health centers...',
  health_centers_navigate: 'Navigate',
  health_centers_no_results: 'No health centers found nearby. Please try again or broaden your search area.',
  health_centers_error: 'Could not fetch location data. Please ensure location services are enabled and try again.',
};

const hi = {
  // General
  loading: 'लोड हो रहा है...',
  language: 'भाषा',
  // Layout
  nav_profile: 'प्रोफ़ाइल',
  nav_reports: 'रिपोर्ट',
  nav_checkup: 'जाँच',
  nav_vaccine: 'टीका',
  nav_tracker: 'ट्रैकर',
  nav_health_centers: 'नक्शा',
  // Auth Page
  auth_welcome_back: 'वापसी पर स्वागत है!',
  auth_create_account: 'अपना खाता बनाएं',
  auth_full_name: 'पूरा नाम',
  auth_email: 'ईमेल पता',
  auth_password: 'पासवर्ड',
  auth_login: 'लॉग इन करें',
  auth_signup: 'साइन अप करें',
  auth_processing: 'प्रसंस्करण हो रहा है...',
  auth_toggle_signup: "खाता नहीं है? साइन अप करें",
  auth_toggle_login: 'पहले से ही एक खाता है? लॉग इन करें',
  // Profile Page
  profile_title: 'मेरी प्रोफ़ाइल',
  profile_dob: 'जन्म तिथि',
  profile_not_set: 'निर्धारित नहीं है',
  profile_blood_group: 'रक्त समूह',
  profile_health_schedule: 'स्वास्थ्य अनुसूची',
  profile_settings: 'सेटिंग्स',
  profile_dark_mode: 'डार्क मोड',
  profile_health_vitals: 'स्वास्थ्य संकेतक',
  profile_logout: 'लॉग आउट',
  // Medical Reports
  reports_title: 'मेरी मेडिकल रिपोर्ट',
  reports_add_new: 'नई रिपोर्ट जोड़ें',
  reports_report_title: 'रिपोर्ट शीर्षक (उदा. एमआरआई स्कैन)',
  reports_choose_file: 'फ़ाइल चुनें',
  reports_add: 'जोड़ें',
  reports_date: 'तारीख',
  reports_file: 'फ़ाइल',
  // Health Checkup
  checkup_title: 'एआई स्वास्थ्य जांच',
  checkup_disclaimer_title: 'अस्वीकरण',
  checkup_disclaimer_text: 'मैं एक एआई सहायक हूं, चिकित्सा पेशेवर नहीं। कृपया किसी भी स्वास्थ्य संबंधी चिंता के लिए एक योग्य चिकित्सक से परामर्श करें।',
  checkup_how_can_i_help: 'मैं आपकी कैसे मदद कर सकता हूँ?',
  checkup_suggestion_prompt: 'एक सुझाव चुनें या नीचे अपना प्रश्न लिखें।',
  checkup_suggestion_term: 'एक चिकित्सा शब्द समझाएं',
  checkup_suggestion_symptom: 'एक लक्षण के बारे में पूछें',
  checkup_suggestion_fitness: 'फिटनेस सलाह लें',
  checkup_suggestion_diet: 'आहार के बारे में पूछें',
  checkup_input_placeholder: 'अपने लक्षण बताएं...',
  checkup_whatsapp_bot: 'व्हाट्सएप बॉट',
  checkup_sms_bot: 'एसएमएस बॉट',
  // Vaccination
  vaccine_title: 'टीकाकरण शेड्यूल करें',
  vaccine_select: 'एक टीका चुनें...',
  vaccine_appointment_scheduled: 'अपॉइंटमेंट शेड्यूल हो गया!',
  vaccine_confirmation: 'आपका {vaccine} का टीकाकरण {date} को {time} बजे के लिए कन्फर्म हो गया है।',
  vaccine_reminder: 'आपको एक रिमाइंडर सूचना मिलेगी।',
  vaccine_schedule_another: 'दूसरा शेड्यूल करें',
  vaccine_label: 'टीका',
  vaccine_about: 'इस टीके के बारे में',
  vaccine_fetching_info: 'टीके की जानकारी लाई जा रही है...',
  vaccine_date: 'तारीख',
  vaccine_time: 'समय',
  vaccine_schedule_appointment: 'अपॉइंटमेंट शेड्यूल करें',
  // Disease Tracker
  tracker_title: 'रोग प्रकोप ट्रैकर',
  tracker_select_state: 'विवरण देखने के लिए सूची से एक राज्य चुनें।',
  tracker_select_state_list: 'भारतीय राज्य और केंद्र शासित प्रदेश',
  tracker_get_precautions: 'सावधानियां जानें',
  tracker_health_precautions: 'स्वास्थ्य सावधानियां',
  tracker_realtime_alerts: 'वास्तविक समय स्वास्थ्य अलर्ट',
  tracker_enter_location: 'शहर, राज्य या देश दर्ज करें',
  tracker_use_my_location: 'मेरा वर्तमान स्थान उपयोग करें',
  tracker_check_alerts: 'अलर्ट की जाँच करें',
  tracker_checking: 'जाँच हो रही है...',
  tracker_alerts_for_area: 'आपके क्षेत्र के लिए अलर्ट',
  tracker_sources: 'स्रोत:',
  tracker_map_hover: 'राज्य द्वारा मामले (विवरण के लिए होवर करें)',
  tracker_map_cases: 'मामले',
  // Health Centers
  health_centers_title: 'आस-पास के स्वास्थ्य केंद्र',
  health_centers_intro: 'अपने वर्तमान स्थान के पास सरकारी स्वास्थ्य केंद्र और क्लीनिक खोजें।',
  health_centers_find_button: 'मेरे पास केंद्र खोजें',
  health_centers_finding: 'स्वास्थ्य केंद्र खोजे जा रहे हैं...',
  health_centers_navigate: 'नेविगेट करें',
  health_centers_no_results: 'आस-पास कोई स्वास्थ्य केंद्र नहीं मिला। कृपया पुनः प्रयास करें या अपना खोज क्षेत्र विस्तृत करें।',
  health_centers_error: 'स्थान डेटा प्राप्त नहीं किया जा सका। कृपया सुनिश्चित करें कि स्थान सेवाएं सक्षम हैं और पुनः प्रयास करें।',
};

export const translations = {
  en: en,
  hi: hi,
  as: { ...en, language: 'ভাষা' }, // Assamese
  bn: { ...en, language: 'ভাষা' }, // Bengali
  brx: { ...en, language: 'भाषा' }, // Bodo
  doi: { ...en, language: 'भाषा' }, // Dogri
  gu: { ...en, language: 'ભાષા' }, // Gujarati
  kn: { ...en, language: 'ಭಾಷೆ' }, // Kannada
  ks: { ...en, language: 'زبان' }, // Kashmiri
  kok: { ...en, language: 'भाس' }, // Konkani
  mai: { ...en, language: 'भाषा' }, // Maithili
  ml: { ...en, language: 'ഭാഷ' }, // Malayalam
  mni: { ...en, language: 'மொழி' }, // Manipuri
  mr: { ...en, language: 'भाषा' }, // Marathi
  ne: { ...en, language: 'भाषा' }, // Nepali
  or: { ...en, language: 'ଭାଷା' }, // Odia
  pa: { ...en, language: 'ਭਾਸ਼ਾ' }, // Punjabi
  sa: { ...en, language: 'भाषा' }, // Sanskrit
  sat: { ...en, language: 'ᱯᱟᱹᱨᱥᱤ' }, // Santali
  sd: { ...en, language: 'ٻولي' }, // Sindhi
  ta: { ...en, language: 'மொழி' }, // Tamil
  te: { ...en, language: 'భాష' }, // Telugu
  ur: { ...en, language: 'زبان' }, // Urdu
};

export const availableLanguages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'as', name: 'অসমীয়া' }, // Assamese
    { code: 'bn', name: 'বাংলা' }, // Bengali
    { code: 'brx', name: 'बोड़ो' }, // Bodo
    { code: 'doi', name: 'डोगरी' }, // Dogri
    { code: 'gu', name: 'ગુજરાતી' }, // Gujarati
    { code: 'kn', name: 'ಕನ್ನಡ' }, // Kannada
    { code: 'ks', name: 'کٲشُر' }, // Kashmiri
    { code: 'kok', name: 'कोंकणी' }, // Konkani
    { code: 'mai', name: 'मैथिली' }, // Maithili
    { code: 'ml', name: 'മലയാളം' }, // Malayalam
    { code: 'mni', name: 'মৈতৈলোন্' }, // Manipuri (Meitei)
    { code: 'mr', name: 'मराठी' }, // Marathi
    { code: 'ne', name: 'नेपाली' }, // Nepali
    { code: 'or', name: 'ଓଡ଼ିଆ' }, // Odia
    { code: 'pa', name: 'ਪੰਜਾਬੀ' }, // Punjabi
    { code: 'sa', name: 'संस्कृतम्' }, // Sanskrit
    { code: 'sat', name: 'ᱥᱟᱱᱛᱟᱲᱤ' }, // Santali
    { code: 'sd', name: 'सिन्धी' }, // Sindhi
    { code: 'ta', name: 'தமிழ்' }, // Tamil
    { code: 'te', name: 'తెలుగు' }, // Telugu
    { code: 'ur', name: 'اردو' }, // Urdu
];