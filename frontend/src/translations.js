// ============================================================
// DRIVER INCENTIVE TRACKER — INTERNATIONALIZATION (i18n)
// Supported Languages: English (en), Hindi (hi), Telugu (te)
// ============================================================

const translations = {
  // ── HEADER ──
  "header.brand": {
    en: "Manivtha Tours & Travels",
    hi: "मानिवता टूर्स & ट्रैवल्स",
    te: "మానివ్తా టూర్స్ & ట్రావెల్స్",
  },
  "header.admin": {
    en: "🔑 Admin",
    hi: "🔑 एडमिन",
    te: "🔑 అడ్మిన్",
  },
  "header.user": {
    en: "👥 User (Read-Only)",
    hi: "👥 उपयोगकर्ता (केवल पढ़ें)",
    te: "👥 వినియోగదారు (చదవడం మాత్రమే)",
  },
  "header.logout": {
    en: "Log Out",
    hi: "लॉग आउट",
    te: "లాగ్ అవుట్",
  },
  "header.logoutConfirm": {
    en: "Are you sure you want to log out?",
    hi: "क्या आप वाकई लॉग आउट करना चाहते हैं?",
    te: "మీరు నిజంగా లాగ్ అవుట్ చేయాలనుకుంటున్నారా?",
  },

  // ── NOTIFICATIONS ──
  "notifications.title": {
    en: "Alerts & Reminders",
    hi: "अलर्ट और रिमाइंडर",
    te: "హెచ్చరికలు & రిమైండర్లు",
  },
  "notifications.clear": {
    en: "Clear",
    hi: "साफ करें",
    te: "క్లియర్",
  },
  "notifications.empty": {
    en: "No alerts or notifications",
    hi: "कोई अलर्ट या सूचना नहीं",
    te: "హెచ్చరికలు లేదా నోటిఫికేషన్లు లేవు",
  },

  // ── ALERTS ──
  "alert.lowPunctuality": {
    en: "Low Punctuality Alert",
    hi: "कम समयबद्धता चेतावनी",
    te: "తక్కువ సమయపాలన హెచ్చరిక",
  },
  "alert.complaints": {
    en: "Complaints Escalation",
    hi: "शिकायत वृद्धि",
    te: "ఫిర్యాదుల ఎస్కలేషన్",
  },
  "alert.pendingReview": {
    en: "Pending Status Review",
    hi: "लंबित स्थिति समीक्षा",
    te: "పెండింగ్ స్టేటస్ రివ్యూ",
  },
  "alert.submitLogs": {
    en: "Submit Monthly Logs",
    hi: "मासिक लॉग जमा करें",
    te: "నెలవారీ లాగ్లు సబ్మిట్ చేయండి",
  },
  "alert.deadline": {
    en: "Operations deadline: Approve all June performance records before the system lock.",
    hi: "संचालन की समय सीमा: सिस्टम लॉक से पहले सभी जून प्रदर्शन रिकॉर्ड को अनुमोदित करें।",
    te: "ఆపరేషన్ల గడువు: సిస్టమ్ లాక్‌కు ముందు అన్ని జూన్ పనితీరు రికార్డులను ఆమోదించండి.",
  },
  "alert.justNow": {
    en: "Just now",
    hi: "अभी",
    te: "ఇప్పుడే",
  },
  "alert.reviewNeeded": {
    en: "Review needed",
    hi: "समीक्षा आवश्यक",
    te: "సమీక్ష అవసరం",
  },
  "alert.systemReminder": {
    en: "System reminder",
    hi: "सिस्टम रिमाइंडर",
    te: "సిస్టమ్ రిమైండర్",
  },

  // ── LOGIN ──
  "login.tag": {
    en: "Manivtha Tours & Travels",
    hi: "मानिवता टूर्स & ट्रैवल्स",
    te: "మానివ్తా టూర్స్ & ట్రావెల్స్",
  },
  "login.title": {
    en: "Driver Tracker Login",
    hi: "ड्राइवर ट्रैकर लॉगिन",
    te: "డ్రైవర్ ట్రాకర్ లాగిన్",
  },
  "login.subtitle": {
    en: "Sign in to access driver incentives and performance metrics.",
    hi: "ड्राइवर प्रोत्साहन और प्रदर्शन मेट्रिक्स तक पहुंचने के लिए साइन इन करें।",
    te: "డ్రైవర్ ప్రోత్సాహకాలు మరియు పనితీరు మెట్రిక్స్ యాక్సెస్ చేయడానికి సైన్ ఇన్ చేయండి.",
  },
  "login.username": {
    en: "Username or Email",
    hi: "उपयोगकर्ता नाम या ईमेल",
    te: "యూజర్‌నేమ్ లేదా ఈమెయిల్",
  },
  "login.usernamePlaceholder": {
    en: "Enter username or email",
    hi: "उपयोगकर्ता नाम या ईमेल दर्ज करें",
    te: "యూజర్‌నేమ్ లేదా ఈమెయిల్ నమోదు చేయండి",
  },
  "login.password": {
    en: "Password",
    hi: "पासवर्ड",
    te: "పాస్‌వర్డ్",
  },
  "login.passwordPlaceholder": {
    en: "Enter password",
    hi: "पासवर्ड दर्ज करें",
    te: "పాస్‌వర్డ్ నమోదు చేయండి",
  },
  "login.submit": {
    en: "Sign In",
    hi: "साइन इन",
    te: "సైన్ ఇన్",
  },
  "login.submitting": {
    en: "Signing In...",
    hi: "साइन इन हो रहा है...",
    te: "సైన్ ఇన్ అవుతోంది...",
  },
  "login.fillBoth": {
    en: "Please fill in both fields.",
    hi: "कृपया दोनों फ़ील्ड भरें।",
    te: "దయచేసి రెండు ఫీల్డ్‌లను పూరించండి.",
  },

  // ── HOME PAGE ──
  "home.tagline": {
    en: "Manivtha Tours & Travels",
    hi: "मानिवता टूर्स & ट्रैवल्स",
    te: "మానివ్తా టూర్స్ & ట్రావెల్స్",
  },
  "home.title": {
    en: "Driver Incentive & Performance Bonus Tracker",
    hi: "ड्राइवर प्रोत्साहन और प्रदर्शन बोनस ट्रैकर",
    te: "డ్రైవర్ ప్రోత్సాహక & పనితీరు బోనస్ ట్రాకర్",
  },
  "home.description": {
    en: "A digital system to track driver performance, calculate monthly incentives, monitor KPIs, and help management reward top-performing drivers fairly.",
    hi: "ड्राइवर प्रदर्शन को ट्रैक करने, मासिक प्रोत्साहन की गणना, KPI की निगरानी, और शीर्ष प्रदर्शन करने वाले ड्राइवरों को उचित रूप से पुरस्कृत करने के लिए एक डिजिटल प्रणाली।",
    te: "డ్రైవర్ పనితీరును ట్రాక్ చేయడానికి, నెలవారీ ప్రోత్సాహకాలను లెక్కించడానికి, KPIలను పర్యవేక్షించడానికి మరియు అత్యుత్తమ డ్రైవర్లకు న్యాయంగా రివార్డ్ చేయడానికి ఒక డిజిటల్ వ్యవస్థ.",
  },
  "home.openDashboard": {
    en: "Open Dashboard",
    hi: "डैशबोर्ड खोलें",
    te: "డ్యాష్‌బోర్డ్ తెరవండి",
  },
  "home.dashboardDesc": {
    en: "View driver records, filters, sorting, and status.",
    hi: "ड्राइवर रिकॉर्ड, फिल्टर, सॉर्टिंग और स्थिति देखें।",
    te: "డ్రైవర్ రికార్డులు, ఫిల్టర్లు, సార్టింగ్ మరియు స్టేటస్ చూడండి.",
  },
  "home.addRecord": {
    en: "Add Driver Record",
    hi: "ड्राइवर रिकॉर्ड जोड़ें",
    te: "డ్రైవర్ రికార్డ్ జోడించండి",
  },
  "home.addRecordDesc": {
    en: "Enter performance data and calculate incentive.",
    hi: "प्रदर्शन डेटा दर्ज करें और प्रोत्साहन की गणना करें।",
    te: "పనితీరు డేటా నమోదు చేసి ప్రోత్సాహకాన్ని లెక్కించండి.",
  },
  "home.addRecordLocked": {
    en: "Admin access required to create new records.",
    hi: "नए रिकॉर्ड बनाने के लिए एडमिन एक्सेस आवश्यक है।",
    te: "కొత్త రికార్డులు సృష్టించడానికి అడ్మిన్ యాక్సెస్ అవసరం.",
  },
  "home.viewReports": {
    en: "View Reports",
    hi: "रिपोर्ट देखें",
    te: "రిపోర్ట్‌లు చూడండి",
  },
  "home.reportsDesc": {
    en: "Check analytics, payouts, and monthly summaries.",
    hi: "एनालिटिक्स, भुगतान और मासिक सारांश देखें।",
    te: "అనలిటిక్స్, చెల్లింపులు మరియు నెలవారీ సారాంశాలు చూడండి.",
  },
  "home.loadSample": {
    en: "Load Sample Data",
    hi: "सैंपल डेटा लोड करें",
    te: "నమూనా డేటా లోడ్ చేయండి",
  },
  "home.loadSampleDesc": {
    en: "Add demo records and open the dashboard.",
    hi: "डेमो रिकॉर्ड जोड़ें और डैशबोर्ड खोलें।",
    te: "డెమో రికార్డులు జోడించి డ్యాష్‌బోర్డ్ తెరవండి.",
  },
  "home.loadSampleLocked": {
    en: "Admin access required to populate demo records.",
    hi: "डेमो रिकॉर्ड भरने के लिए एडमिन एक्सेस आवश्यक है।",
    te: "డెమో రికార్డులు నింపడానికి అడ్మిన్ యాక్సెస్ అవసరం.",
  },
  "home.accessDenied": {
    en: "Access Denied: Admin privileges are required to add driver records.",
    hi: "पहुंच अस्वीकृत: ड्राइवर रिकॉर्ड जोड़ने के लिए एडमिन विशेषाधिकार आवश्यक हैं।",
    te: "యాక్సెస్ నిరాకరించబడింది: డ్రైవర్ రికార్డులు జోడించడానికి అడ్మిన్ అధికారాలు అవసరం.",
  },
  "home.accessDeniedSample": {
    en: "Access Denied: Admin privileges are required to load sample data.",
    hi: "पहुंच अस्वीकृत: सैंपल डेटा लोड करने के लिए एडमिन विशेषाधिकार आवश्यक हैं।",
    te: "యాక్సెస్ నిరాకరించబడింది: నమూనా డేటా లోడ్ చేయడానికి అడ్మిన్ అధికారాలు అవసరం.",
  },

  // ── LOADING / ERRORS ──
  "loading.wakingUp": {
    en: "Waking up database server...",
    hi: "डेटाबेस सर्वर जाग रहा है...",
    te: "డేటాబేస్ సర్వర్ మేల్కొంటోంది...",
  },
  "loading.attempt": {
    en: "Attempt",
    hi: "प्रयास",
    te: "ప్రయత్నం",
  },
  "loading.coldStart": {
    en: "takes up to 75 seconds on cold start",
    hi: "कोल्ड स्टार्ट पर 75 सेकंड तक लग सकते हैं",
    te: "కోల్డ్ స్టార్ట్‌లో 75 సెకన్లు పట్టవచ్చు",
  },
  "loading.connecting": {
    en: "Connecting to Supabase database...",
    hi: "Supabase डेटाबेस से कनेक्ट हो रहा है...",
    te: "Supabase డేటాబేస్‌కు కనెక్ట్ అవుతోంది...",
  },
  "error.connection": {
    en: "Could not connect to the backend database server. The server took too long to wake up. Please click 'Retry Connection' to try again.",
    hi: "बैकएंड डेटाबेस सर्वर से कनेक्ट नहीं हो सका। सर्वर को जागने में बहुत समय लगा। कृपया पुनः प्रयास करने के लिए 'पुनः कनेक्ट करें' पर क्लिक करें।",
    te: "బ్యాకెండ్ డేటాబేస్ సర్వర్‌కు కనెక్ట్ కాలేదు. సర్వర్ మేల్కొనడానికి చాలా సమయం పట్టింది. దయచేసి మళ్ళీ ప్రయత్నించడానికి 'రీట్రై కనెక్షన్' క్లిక్ చేయండి.",
  },
  "error.retry": {
    en: "Retry Connection",
    hi: "पुनः कनेक्ट करें",
    te: "రీట్రై కనెక్షన్",
  },

  // ── PAGE NAVIGATION ──
  "nav.backHome": {
    en: "← Back to Home",
    hi: "← होम पर वापस",
    te: "← హోమ్‌కు తిరిగి",
  },
  "nav.page": {
    en: "Page",
    hi: "पेज",
    te: "పేజీ",
  },
  "nav.of": {
    en: "of",
    hi: "का",
    te: "లో",
  },

  // ── FORM PAGE ──
  "form.title": {
    en: "Add Driver Record",
    hi: "ड्राइवर रिकॉर्ड जोड़ें",
    te: "డ్రైవర్ రికార్డ్ జోడించండి",
  },
  "form.editTitle": {
    en: "Edit Driver Record",
    hi: "ड्राइवर रिकॉर्ड संपादित करें",
    te: "డ్రైవర్ రికార్డ్ సవరించండి",
  },
  "form.sectionTag": {
    en: "Performance Entry",
    hi: "प्रदर्शन प्रविष्टि",
    te: "పనితీరు ఎంట్రీ",
  },
  "form.sectionTitle": {
    en: "Driver Entry Form",
    hi: "ड्राइवर एंट्री फॉर्म",
    te: "డ్రైవర్ ఎంట్రీ ఫారమ్",
  },
  "form.sectionDesc": {
    en: "Enter monthly driver performance details. The system will automatically calculate punctuality percentage, incentive amount, and final payout.",
    hi: "मासिक ड्राइवर प्रदर्शन विवरण दर्ज करें। सिस्टम स्वचालित रूप से समयबद्धता प्रतिशत, प्रोत्साहन राशि और अंतिम भुगतान की गणना करेगा।",
    te: "నెలవారీ డ్రైవర్ పనితీరు వివరాలను నమోదు చేయండి. సిస్టమ్ స్వయంచాలకంగా సమయపాలన శాతం, ప్రోత్సాహక మొత్తం మరియు చివరి చెల్లింపును లెక్కిస్తుంది.",
  },
  "form.driverId": {
    en: "Driver ID",
    hi: "ड्राइवर आईडी",
    te: "డ్రైవర్ ఐడి",
  },
  "form.driverIdPlaceholder": {
    en: "Example: DRV001",
    hi: "उदाहरण: DRV001",
    te: "ఉదాహరణ: DRV001",
  },
  "form.driverName": {
    en: "Driver Name",
    hi: "ड्राइवर का नाम",
    te: "డ్రైవర్ పేరు",
  },
  "form.driverNamePlaceholder": {
    en: "Enter driver name",
    hi: "ड्राइवर का नाम दर्ज करें",
    te: "డ్రైవర్ పేరు నమోదు చేయండి",
  },
  "form.month": {
    en: "Month",
    hi: "महीना",
    te: "నెల",
  },
  "form.selectMonth": {
    en: "Select month",
    hi: "महीना चुनें",
    te: "నెల ఎంచుకోండి",
  },
  "form.status": {
    en: "Status",
    hi: "स्थिति",
    te: "స్టేటస్",
  },
  "form.tripsCompleted": {
    en: "Trips Completed",
    hi: "पूर्ण यात्राएं",
    te: "పూర్తయిన ట్రిప్‌లు",
  },
  "form.onTimeTrips": {
    en: "On-time Trips",
    hi: "समय पर यात्राएं",
    te: "సమయానికి ట్రిప్‌లు",
  },
  "form.lateTrips": {
    en: "Late Trips",
    hi: "देरी से यात्राएं",
    te: "ఆలస్యమైన ట్రిప్‌లు",
  },
  "form.customerRating": {
    en: "Customer Rating",
    hi: "ग्राहक रेटिंग",
    te: "కస్టమర్ రేటింగ్",
  },
  "form.complaints": {
    en: "Complaints",
    hi: "शिकायतें",
    te: "ఫిర్యాదులు",
  },
  "form.baseSalary": {
    en: "Base Salary",
    hi: "आधार वेतन",
    te: "బేస్ జీతం",
  },
  "form.punctuality": {
    en: "Punctuality",
    hi: "समयबद्धता",
    te: "సమయపాలన",
  },
  "form.incentive": {
    en: "Incentive",
    hi: "प्रोत्साहन",
    te: "ప్రోత్సాహకం",
  },
  "form.finalPayout": {
    en: "Final Payout",
    hi: "अंतिम भुगतान",
    te: "చివరి చెల్లింపు",
  },
  "form.save": {
    en: "Save Driver Record",
    hi: "ड्राइवर रिकॉर्ड सेव करें",
    te: "డ్రైవర్ రికార్డ్ సేవ్ చేయండి",
  },
  "form.update": {
    en: "Update Driver Record",
    hi: "ड्राइवर रिकॉर्ड अपडेट करें",
    te: "డ్రైవర్ రికార్డ్ అప్‌డేట్ చేయండి",
  },
  "form.reset": {
    en: "Reset Form",
    hi: "फॉर्म रीसेट करें",
    te: "ఫారమ్ రీసెట్ చేయండి",
  },
  "form.cancelEdit": {
    en: "Cancel Edit",
    hi: "संपादन रद्द करें",
    te: "సవరణ రద్దు చేయండి",
  },
  "form.savedSuccess": {
    en: "Driver record saved successfully!",
    hi: "ड्राइवर रिकॉर्ड सफलतापूर्वक सहेजा गया!",
    te: "డ్రైవర్ రికార్డ్ విజయవంతంగా సేవ్ చేయబడింది!",
  },
  "form.updatedSuccess": {
    en: "Driver record updated successfully!",
    hi: "ड्राइवर रिकॉर्ड सफलतापूर्वक अपडेट किया गया!",
    te: "డ్రైవర్ రికార్డ్ విజయవంతంగా అప్‌డేట్ చేయబడింది!",
  },
  "form.sampleSuccess": {
    en: "Sample data loaded successfully!",
    hi: "सैंपल डेटा सफलतापूर्वक लोड किया गया!",
    te: "నమూనా డేటా విజయవంతంగా లోడ్ చేయబడింది!",
  },

  // ── VALIDATION ──
  "val.driverIdRequired": {
    en: "Driver ID is required",
    hi: "ड्राइवर आईडी आवश्यक है",
    te: "డ్రైవర్ ఐడి అవసరం",
  },
  "val.driverNameRequired": {
    en: "Driver name is required",
    hi: "ड्राइवर का नाम आवश्यक है",
    te: "డ్రైవర్ పేరు అవసరం",
  },
  "val.selectMonth": {
    en: "Please select month",
    hi: "कृपया महीना चुनें",
    te: "దయచేసి నెల ఎంచుకోండి",
  },
  "val.tripsMin": {
    en: "Trips completed must be 0 or more",
    hi: "पूर्ण यात्राएं 0 या अधिक होनी चाहिए",
    te: "పూర్తయిన ట్రిప్‌లు 0 లేదా అంతకంటే ఎక్కువ ఉండాలి",
  },
  "val.onTimeMin": {
    en: "On-time trips must be 0 or more",
    hi: "समय पर यात्राएं 0 या अधिक होनी चाहिए",
    te: "సమయానికి ట్రిప్‌లు 0 లేదా అంతకంటే ఎక్కువ ఉండాలి",
  },
  "val.lateMin": {
    en: "Late trips must be 0 or more",
    hi: "देरी से यात्राएं 0 या अधिक होनी चाहिए",
    te: "ఆలస్యమైన ట్రిప్‌లు 0 లేదా అంతకంటే ఎక్కువ ఉండాలి",
  },
  "val.tripsExceed": {
    en: "On-time trips + late trips cannot be more than total trips",
    hi: "समय पर + देरी से यात्राएं कुल यात्राओं से अधिक नहीं हो सकतीं",
    te: "సమయానికి + ఆలస్యమైన ట్రిప్‌లు మొత్తం ట్రిప్‌ల కంటే ఎక్కువ ఉండకూడదు",
  },
  "val.ratingRange": {
    en: "Rating must be between 0 and 5",
    hi: "रेटिंग 0 से 5 के बीच होनी चाहिए",
    te: "రేటింగ్ 0 మరియు 5 మధ్య ఉండాలి",
  },
  "val.complaintsMin": {
    en: "Complaints must be 0 or more",
    hi: "शिकायतें 0 या अधिक होनी चाहिए",
    te: "ఫిర్యాదులు 0 లేదా అంతకంటే ఎక్కువ ఉండాలి",
  },
  "val.salaryMin": {
    en: "Base salary must be 0 or more",
    hi: "आधार वेतन 0 या अधिक होना चाहिए",
    te: "బేస్ జీతం 0 లేదా అంతకంటే ఎక్కువ ఉండాలి",
  },

  // ── DASHBOARD ──
  "dash.sectionTag": {
    en: "Live Dashboard",
    hi: "लाइव डैशबोर्ड",
    te: "లైవ్ డ్యాష్‌బోర్డ్",
  },
  "dash.title": {
    en: "Driver Incentive Dashboard",
    hi: "ड्राइवर प्रोत्साहन डैशबोर्ड",
    te: "డ్రైవర్ ప్రోత్సాహక డ్యాష్‌బోర్డ్",
  },
  "dash.subtitle": {
    en: "All submitted driver performance records will appear here with punctuality, incentive amount, final payout, and status.",
    hi: "सभी सबमिट किए गए ड्राइवर प्रदर्शन रिकॉर्ड यहां समयबद्धता, प्रोत्साहन राशि, अंतिम भुगतान और स्थिति के साथ दिखाई देंगे।",
    te: "సబ్మిట్ చేసిన అన్ని డ్రైవర్ పనితీరు రికార్డులు ఇక్కడ సమయపాలన, ప్రోత్సాహక మొత్తం, చివరి చెల్లింపు మరియు స్టేటస్‌తో కనిపిస్తాయి.",
  },
  "dash.exportCSV": {
    en: "Export CSV",
    hi: "CSV निर्यात करें",
    te: "CSV ఎగుమతి చేయండి",
  },
  "dash.clearRecords": {
    en: "Clear Saved Records",
    hi: "सहेजे गए रिकॉर्ड साफ करें",
    te: "సేవ్ చేసిన రికార్డులు క్లియర్ చేయండి",
  },
  "dash.topPerformer": {
    en: "Top Performer",
    hi: "शीर्ष प्रदर्शक",
    te: "టాప్ పెర్ఫార్మర్",
  },
  "dash.totalRecords": {
    en: "Total Records",
    hi: "कुल रिकॉर्ड",
    te: "మొత్తం రికార్డులు",
  },
  "dash.totalTrips": {
    en: "Total Trips",
    hi: "कुल यात्राएं",
    te: "మొత్తం ట్రిప్‌లు",
  },
  "dash.totalIncentive": {
    en: "Total Incentive",
    hi: "कुल प्रोत्साहन",
    te: "మొత్తం ప్రోత్సాహకం",
  },
  "dash.approved": {
    en: "Approved",
    hi: "अनुमोदित",
    te: "ఆమోదించబడింది",
  },
  "dash.paid": {
    en: "Paid",
    hi: "भुगतान किया",
    te: "చెల్లించబడింది",
  },
  "dash.pending": {
    en: "Pending",
    hi: "लंबित",
    te: "పెండింగ్",
  },
  "dash.avgPunctuality": {
    en: "Avg Punctuality",
    hi: "औसत समयबद्धता",
    te: "సగటు సమయపాలన",
  },
  "dash.avgRating": {
    en: "Avg Rating",
    hi: "औसत रेटिंग",
    te: "సగటు రేటింగ్",
  },
  "dash.highestPayout": {
    en: "Highest Payout",
    hi: "सर्वाधिक भुगतान",
    te: "అత్యధిక చెల్లింపు",
  },
  "dash.searchPlaceholder": {
    en: "Search by driver name or ID...",
    hi: "ड्राइवर नाम या आईडी से खोजें...",
    te: "డ్రైవర్ పేరు లేదా ఐడి ద్వారా శోధించండి...",
  },
  "dash.allStatus": {
    en: "All Status",
    hi: "सभी स्थिति",
    te: "అన్ని స్టేటస్",
  },
  "dash.allMonths": {
    en: "All Months",
    hi: "सभी महीने",
    te: "అన్ని నెలలు",
  },
  "dash.sortLatest": {
    en: "Sort: Latest First",
    hi: "सॉर्ट: नवीनतम पहले",
    te: "సార్ట్: తాజావి ముందు",
  },
  "dash.sortTrips": {
    en: "Trips: High to Low",
    hi: "यात्राएं: उच्च से निम्न",
    te: "ట్రిప్‌లు: ఎక్కువ నుండి తక్కువ",
  },
  "dash.sortPunctuality": {
    en: "Punctuality: High to Low",
    hi: "समयबद्धता: उच्च से निम्न",
    te: "సమయపాలన: ఎక్కువ నుండి తక్కువ",
  },
  "dash.sortRating": {
    en: "Rating: High to Low",
    hi: "रेटिंग: उच्च से निम्न",
    te: "రేటింగ్: ఎక్కువ నుండి తక్కువ",
  },
  "dash.sortIncentive": {
    en: "Incentive: High to Low",
    hi: "प्रोत्साहन: उच्च से निम्न",
    te: "ప్రోత్సాహకం: ఎక్కువ నుండి తక్కువ",
  },
  "dash.sortPayout": {
    en: "Payout: High to Low",
    hi: "भुगतान: उच्च से निम्न",
    te: "చెల్లింపు: ఎక్కువ నుండి తక్కువ",
  },
  "dash.resetFilters": {
    en: "Reset Filters",
    hi: "फ़िल्टर रीसेट करें",
    te: "ఫిల్టర్లు రీసెట్ చేయండి",
  },
  "dash.noRecords": {
    en: "No driver records yet",
    hi: "अभी तक कोई ड्राइवर रिकॉर्ड नहीं",
    te: "ఇంకా డ్రైవర్ రికార్డులు లేవు",
  },
  "dash.noRecordsDesc": {
    en: "Fill the Driver Performance Entry Form and click Save Driver Record. The saved record will appear in this dashboard.",
    hi: "ड्राइवर प्रदर्शन एंट्री फॉर्म भरें और ड्राइवर रिकॉर्ड सेव करें पर क्लिक करें। सहेजा गया रिकॉर्ड इस डैशबोर्ड में दिखाई देगा।",
    te: "డ్రైవర్ పనితీరు ఎంట్రీ ఫారమ్ నింపి డ్రైవర్ రికార్డ్ సేవ్ చేయండి క్లిక్ చేయండి. సేవ్ చేసిన రికార్డ్ ఈ డ్యాష్‌బోర్డ్‌లో కనిపిస్తుంది.",
  },
  "dash.noMatch": {
    en: "No matching records found",
    hi: "कोई मिलान रिकॉर्ड नहीं मिला",
    te: "సరిపోలిన రికార్డులు కనుగొనబడలేదు",
  },
  "dash.noMatchDesc": {
    en: "Try changing the search text or status filter to view more driver records.",
    hi: "अधिक ड्राइवर रिकॉर्ड देखने के लिए खोज टेक्स्ट या स्थिति फ़िल्टर बदलने का प्रयास करें।",
    te: "మరిన్ని డ్రైవర్ రికార్డులు చూడటానికి సెర్చ్ టెక్స్ట్ లేదా స్టేటస్ ఫిల్టర్ మార్చి ప్రయత్నించండి.",
  },
  "dash.view": {
    en: "View",
    hi: "देखें",
    te: "చూడండి",
  },
  "dash.edit": {
    en: "Edit",
    hi: "संपादित करें",
    te: "సవరించండి",
  },
  "dash.delete": {
    en: "Delete",
    hi: "हटाएं",
    te: "తొలగించండి",
  },
  "dash.previous": {
    en: "Previous",
    hi: "पिछला",
    te: "మునుపటి",
  },
  "dash.next": {
    en: "Next",
    hi: "अगला",
    te: "తదుపరి",
  },
  "dash.pageOf": {
    en: "Page {current} of {total}",
    hi: "पेज {current} का {total}",
    te: "పేజీ {current} లో {total}",
  },
  "dash.confirmClear": {
    en: "Are you sure you want to delete all saved driver records?",
    hi: "क्या आप वाकई सभी सहेजे गए ड्राइवर रिकॉर्ड हटाना चाहते हैं?",
    te: "మీరు నిజంగా అన్ని సేవ్ చేసిన డ్రైవర్ రికార్డులను తొలగించాలనుకుంటున్నారా?",
  },
  "dash.confirmDelete": {
    en: "Are you sure you want to delete this driver record?",
    hi: "क्या आप वाकई इस ड्राइवर रिकॉर्ड को हटाना चाहते हैं?",
    te: "మీరు నిజంగా ఈ డ్రైవర్ రికార్డ్‌ను తొలగించాలనుకుంటున్నారా?",
  },
  "dash.noExport": {
    en: "No records available to export.",
    hi: "निर्यात के लिए कोई रिकॉर्ड उपलब्ध नहीं।",
    te: "ఎగుమతి చేయడానికి రికార్డులు అందుబాటులో లేవు.",
  },

  // ── DETAILS MODAL ──
  "details.tag": {
    en: "Driver Details",
    hi: "ड्राइवर विवरण",
    te: "డ్రైవర్ వివరాలు",
  },
  "details.subtitle": {
    en: "Complete monthly performance and incentive details.",
    hi: "पूर्ण मासिक प्रदर्शन और प्रोत्साहन विवरण।",
    te: "పూర్తి నెలవారీ పనితీరు మరియు ప్రోత్సాహక వివరాలు.",
  },
  "details.print": {
    en: "Print Details",
    hi: "विवरण प्रिंट करें",
    te: "వివరాలు ప్రింట్ చేయండి",
  },
  "details.summary": {
    en: "Performance Summary",
    hi: "प्रदर्शन सारांश",
    te: "పనితీరు సారాంశం",
  },

  // ── AUDIT TIMELINE ──
  "audit.title": {
    en: "⏱️ Recent Operations Log (System Audits)",
    hi: "⏱️ हालिया संचालन लॉग (सिस्टम ऑडिट)",
    te: "⏱️ ఇటీవలి ఆపరేషన్ల లాగ్ (సిస్టమ్ ఆడిట్లు)",
  },
  "audit.empty": {
    en: "No recent activity logs available.",
    hi: "कोई हालिया गतिविधि लॉग उपलब्ध नहीं।",
    te: "ఇటీవలి కార్యాచరణ లాగ్‌లు అందుబాటులో లేవు.",
  },

  // ── TABLE HEADERS ──
  "table.driverId": {
    en: "Driver ID",
    hi: "ड्राइवर आईडी",
    te: "డ్రైవర్ ఐడి",
  },
  "table.driverName": {
    en: "Driver Name",
    hi: "ड्राइवर नाम",
    te: "డ్రైవర్ పేరు",
  },
  "table.month": {
    en: "Month",
    hi: "महीना",
    te: "నెల",
  },
  "table.trips": {
    en: "Trips",
    hi: "यात्राएं",
    te: "ట్రిప్‌లు",
  },
  "table.punctuality": {
    en: "Punctuality",
    hi: "समयबद्धता",
    te: "సమయపాలన",
  },
  "table.rating": {
    en: "Rating",
    hi: "रेटिंग",
    te: "రేటింగ్",
  },
  "table.incentive": {
    en: "Incentive",
    hi: "प्रोत्साहन",
    te: "ప్రోత్సాహకం",
  },
  "table.finalPayout": {
    en: "Final Payout",
    hi: "अंतिम भुगतान",
    te: "చివరి చెల్లింపు",
  },
  "table.status": {
    en: "Status",
    hi: "स्थिति",
    te: "స్టేటస్",
  },
  "table.actions": {
    en: "Actions",
    hi: "कार्रवाई",
    te: "చర్యలు",
  },

  // ── REPORTS ──
  "reports.sectionTag": {
    en: "Reports",
    hi: "रिपोर्ट्स",
    te: "రిపోర్ట్‌లు",
  },
  "reports.title": {
    en: "Reports & Analytics",
    hi: "रिपोर्ट और एनालिटिक्स",
    te: "రిపోర్ట్‌లు & అనలిటిక్స్",
  },
  "reports.subtitle": {
    en: "Management can use this section to understand monthly incentive cost, driver payout performance, and approval status distribution.",
    hi: "प्रबंधन इस अनुभाग का उपयोग मासिक प्रोत्साहन लागत, ड्राइवर भुगतान प्रदर्शन, और अनुमोदन स्थिति वितरण को समझने के लिए कर सकता है।",
    te: "నెలవారీ ప్రోత్సాహక ఖర్చు, డ్రైవర్ చెల్లింపు పనితీరు మరియు ఆమోద స్థితి పంపిణీని అర్థం చేసుకోవడానికి నిర్వహణ ఈ విభాగాన్ని ఉపయోగించవచ్చు.",
  },
  "reports.totalRecords": {
    en: "Total Records",
    hi: "कुल रिकॉर्ड",
    te: "మొత్తం రికార్డులు",
  },
  "reports.totalRecordsDesc": {
    en: "Driver performance entries stored",
    hi: "संग्रहित ड्राइवर प्रदर्शन प्रविष्टियां",
    te: "నిల్వ చేయబడిన డ్రైవర్ పనితీరు ఎంట్రీలు",
  },
  "reports.totalTrips": {
    en: "Total Trips",
    hi: "कुल यात्राएं",
    te: "మొత్తం ట్రిప్‌లు",
  },
  "reports.totalTripsDesc": {
    en: "Trips completed by all drivers",
    hi: "सभी ड्राइवरों द्वारा पूर्ण यात्राएं",
    te: "అన్ని డ్రైవర్లు పూర్తి చేసిన ట్రిప్‌లు",
  },
  "reports.totalIncentive": {
    en: "Total Incentive",
    hi: "कुल प्रोत्साहन",
    te: "మొత్తం ప్రోత్సాహకం",
  },
  "reports.totalIncentiveDesc": {
    en: "Extra bonus amount calculated",
    hi: "अतिरिक्त बोनस राशि गणना",
    te: "అదనపు బోనస్ మొత్తం లెక్కించబడింది",
  },
  "reports.totalPayout": {
    en: "Total Payout",
    hi: "कुल भुगतान",
    te: "మొత్తం చెల్లింపు",
  },
  "reports.totalPayoutDesc": {
    en: "Base salary plus incentives",
    hi: "आधार वेतन और प्रोत्साहन",
    te: "బేస్ జీతం మరియు ప్రోత్సాహకాలు",
  },
  "reports.avgIncentive": {
    en: "Average Incentive",
    hi: "औसत प्रोत्साहन",
    te: "సగటు ప్రోత్సాహకం",
  },
  "reports.avgIncentiveDesc": {
    en: "Average bonus per driver record",
    hi: "प्रति ड्राइवर रिकॉर्ड औसत बोनस",
    te: "ప్రతి డ్రైవర్ రికార్డ్‌కు సగటు బోనస్",
  },
  "reports.bestMonth": {
    en: "Best Month",
    hi: "सर्वश्रेष्ठ महीना",
    te: "ఉత్తమ నెల",
  },
  "reports.highestIncentive": {
    en: "Highest incentive total",
    hi: "सर्वाधिक प्रोत्साहन कुल",
    te: "అత్యధిక ప్రోత్సాహక మొత్తం",
  },
  "reports.noMonthData": {
    en: "No month data available",
    hi: "कोई मासिक डेटा उपलब्ध नहीं",
    te: "నెల డేటా అందుబాటులో లేదు",
  },
  "reports.statusDistribution": {
    en: "Status Distribution",
    hi: "स्थिति वितरण",
    te: "స్టేటస్ పంపిణీ",
  },
  "reports.statusDesc": {
    en: "Shows how many records are pending, approved, paid, or rejected.",
    hi: "दिखाता है कि कितने रिकॉर्ड लंबित, अनुमोदित, भुगतान किए गए या अस्वीकृत हैं।",
    te: "ఎన్ని రికార్డులు పెండింగ్, ఆమోదించబడ్డాయి, చెల్లించబడ్డాయి లేదా తిరస్కరించబడ్డాయో చూపిస్తుంది.",
  },
  "reports.rejected": {
    en: "Rejected",
    hi: "अस्वीकृत",
    te: "తిరస్కరించబడింది",
  },
  "reports.monthlySummary": {
    en: "Monthly Incentive Summary",
    hi: "मासिक प्रोत्साहन सारांश",
    te: "నెలవారీ ప్రోత్సాహక సారాంశం",
  },
  "reports.monthlyDesc": {
    en: "Simple bar view of incentive amount generated each month.",
    hi: "प्रत्येक माह उत्पन्न प्रोत्साहन राशि का सरल बार दृश्य।",
    te: "ప్రతి నెల ఉత్పత్తి చేయబడిన ప్రోత్సాహక మొత్తం యొక్క సాధారణ బార్ వీక్షణ.",
  },
  "reports.noData": {
    en: "No data available for reports",
    hi: "रिपोर्ट के लिए कोई डेटा उपलब्ध नहीं",
    te: "రిపోర్ట్‌ల కోసం డేటా అందుబాటులో లేదు",
  },
  "reports.noDataDesc": {
    en: "Add driver records or load sample data to generate analytics and performance insights.",
    hi: "एनालिटिक्स और प्रदर्शन अंतर्दृष्टि उत्पन्न करने के लिए ड्राइवर रिकॉर्ड जोड़ें या सैंपल डेटा लोड करें।",
    te: "అనలిటిక్స్ మరియు పనితీరు అంతర్దృష్టులను రూపొందించడానికి డ్రైవర్ రికార్డులను జోడించండి లేదా నమూనా డేటాను లోడ్ చేయండి.",
  },
  "reports.records": {
    en: "record(s)",
    hi: "रिकॉर्ड",
    te: "రికార్డ్(లు)",
  },

  // ── FOOTER ──
  "footer.title": {
    en: "Driver Incentive & Performance Bonus Tracker",
    hi: "ड्राइवर प्रोत्साहन और प्रदर्शन बोनस ट्रैकर",
    te: "డ్రైవర్ ప్రోత్సాహక & పనితీరు బోనస్ ట్రాకర్",
  },
  "footer.subtitle": {
    en: "Built for Manivtha Tours & Travels",
    hi: "मानिवता टूर्स & ट्रैवल्स के लिए बनाया गया",
    te: "మానివ్తా టూర్స్ & ట్రావెల్స్ కోసం నిర్మించబడింది",
  },

  // ── DASHBOARD PAGE LABEL ──
  "page.dashboard": {
    en: "Dashboard",
    hi: "डैशबोर्ड",
    te: "డ్యాష్‌బోర్డ్",
  },
  "page.reportsAnalytics": {
    en: "Reports & Analytics",
    hi: "रिपोर्ट और एनालिटिक्स",
    te: "రిపోర్ట్‌లు & అనలిటిక్స్",
  },

  // ── MONTHS (for selects) ──
  "month.January": { en: "January", hi: "जनवरी", te: "జనవరి" },
  "month.February": { en: "February", hi: "फरवरी", te: "ఫిబ్రవరి" },
  "month.March": { en: "March", hi: "मार्च", te: "మార్చి" },
  "month.April": { en: "April", hi: "अप्रैल", te: "ఏప్రిల్" },
  "month.May": { en: "May", hi: "मई", te: "మే" },
  "month.June": { en: "June", hi: "जून", te: "జూన్" },
  "month.July": { en: "July", hi: "जुलाई", te: "జూలై" },
  "month.August": { en: "August", hi: "अगस्त", te: "ఆగస్టు" },
  "month.September": { en: "September", hi: "सितंबर", te: "సెప్టెంబర్" },
  "month.October": { en: "October", hi: "अक्टूबर", te: "అక్టోబర్" },
  "month.November": { en: "November", hi: "नवंबर", te: "నవంబర్" },
  "month.December": { en: "December", hi: "दिसंबर", te: "డిసెంబర్" },

  // ── STATUS OPTIONS ──
  "status.Pending": { en: "Pending", hi: "लंबित", te: "పెండింగ్" },
  "status.Approved": { en: "Approved", hi: "अनुमोदित", te: "ఆమోదించబడింది" },
  "status.Paid": { en: "Paid", hi: "भुगतान किया", te: "చెల్లించబడింది" },
  "status.Rejected": { en: "Rejected", hi: "अस्वीकृत", te: "తిరస్కరించబడింది" },
  "status.Archived": { en: "Archived", hi: "संग्रहित", te: "ఆర్కైవ్ చేయబడింది" },
};

/**
 * Get a translated string by key and language
 * @param {string} lang - Language code: 'en', 'hi', or 'te'
 * @param {string} key - Translation key
 * @param {Object} [params] - Optional interpolation params like {current: 1, total: 5}
 * @returns {string} Translated string or key if not found
 */
export function t(lang, key, params) {
  const entry = translations[key];
  if (!entry) return key;
  let text = entry[lang] || entry.en || key;
  if (params) {
    Object.keys(params).forEach((param) => {
      text = text.replace(`{${param}}`, params[param]);
    });
  }
  return text;
}

export default translations;
