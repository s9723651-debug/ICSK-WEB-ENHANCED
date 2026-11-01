/* ICSK Web Enhanced multilingual UI — offline dictionaries, no translation API. */
(function () {
  'use strict';
  const KEY = 'icskPreferredLanguage';
  const LANGS = [
    { code: 'en', label: 'English' }, { code: 'de', label: 'Deutsch' },
    { code: 'fr', label: 'Français' }, { code: 'hi', label: 'हिन्दी' },
    { code: 'ar', label: 'العربية' }, { code: 'ta', label: 'தமிழ்' },
    { code: 'ja', label: '日本語' }
  ];
  // Translation order: German, French, Hindi, Arabic, Tamil, Japanese.
  const rows = {
    'Language':['Sprache','Langue','भाषा','اللغة','மொழி','言語'],
    'Latest News':['Aktuelle Nachrichten','Dernières actualités','ताज़ा समाचार','آخر الأخبار','சமீபத்திய செய்திகள்','最新ニュース'],
    'About':['Über uns','À propos','हमारे बारे में','من نحن','எங்களைப் பற்றி','学校紹介'],
    'Campuses':['Standorte','Campus','परिसर','الفروع','வளாகங்கள்','キャンパス'],
    'Academics':['Unterricht','Enseignement','शिक्षा','الشؤون الأكاديمية','கல்வி','学習案内'],
    'Notices':['Mitteilungen','Avis','सूचनाएँ','الإعلانات','அறிவிப்புகள்','お知らせ'],
    'Lost & Found':['Fundbüro','Objets trouvés','खोया-पाया','المفقودات والمعثورات','தொலைந்தவை மற்றும் கண்டெடுக்கப்பட்டவை','落とし物'],
    'Contact':['Kontakt','Contact','संपर्क','اتصل بنا','தொடர்பு','お問い合わせ'],
    'Premier Educational Institution Since 1959':['Erstklassige Bildungseinrichtung seit 1959','Établissement d’enseignement de premier plan depuis 1959','1959 से अग्रणी शैक्षणिक संस्थान','مؤسسة تعليمية رائدة منذ عام 1959','1959 முதல் முன்னணி கல்வி நிறுவனம்','1959年創立の教育機関'],
    'Nurturing Excellence, ':['Exzellenz fördern, ','Cultiver l’excellence, ','उत्कृष्टता को बढ़ावा देना, ','رعاية التميز، ','சிறப்பை வளர்த்து, ','卓越性を育み、'],
    'Empowering Futures':['Zukunft gestalten','Donner les moyens de réussir','भविष्य को सशक्त बनाना','تمكين المستقبل','எதிர்காலத்தை மேம்படுத்துதல்','未来を切り拓く'],
    'Providing holistic education with world-class facilities and academic rigor across multiple specialized campuses in Kuwait.':['Ganzheitliche Bildung mit erstklassiger Ausstattung und hohen akademischen Standards an mehreren Standorten in Kuwait.','Une éducation complète, des installations de qualité internationale et une exigence académique élevée sur plusieurs campus au Koweït.','कुवैत के कई परिसरों में विश्वस्तरीय सुविधाओं और उच्च शैक्षणिक मानकों के साथ समग्र शिक्षा।','نقدم تعليماً متكاملاً بمرافق عالمية المستوى ومعايير أكاديمية عالية في عدة فروع بالكويت.','குவைத்தின் பல வளாகங்களில் உலகத்தர வசதிகளுடனும் உயர்ந்த கல்வித் தரத்துடனும் முழுமையான கல்வி.','クウェートの複数のキャンパスで、世界水準の設備と高い学術水準を備えた総合教育を提供します。'],
    'Explore Campuses':['Standorte entdecken','Découvrir les campus','परिसरों को देखें','استكشف الفروع','வளாகங்களைப் பாருங்கள்','キャンパスを見る'],
    'Latest Updates':['Neueste Updates','Dernières mises à jour','नवीनतम अपडेट','آخر التحديثات','சமீபத்திய புதுப்பிப்புகள்','最新情報'],
    '60+ Years':['Über 60 Jahre','Plus de 60 ans','60+ वर्ष','أكثر من 60 عاماً','60+ ஆண்டுகள்','60年以上'],
    'of Academic Quality':['akademische Qualität','d’excellence académique','शैक्षणिक गुणवत्ता','من الجودة الأكاديمية','கல்வித் தரம்','質の高い教育'],
    'Active Students':['Aktive Schüler','Élèves actifs','सक्रिय विद्यार्थी','الطلاب النشطون','செயலில் உள்ள மாணவர்கள்','在籍生徒'],
    'Fee Payment':['Gebührenzahlung','Paiement des frais','शुल्क भुगतान','دفع الرسوم','கட்டணச் செலுத்தல்','学費のお支払い'],
    'ICSK Cloud':['ICSK Cloud','ICSK Cloud','ICSK Cloud','ICSK Cloud','ICSK Cloud','ICSK Cloud'],
    'Admissions':['Anmeldung','Admissions','प्रवेश','القبول','சேர்க்கை','入学案内'],
    'ICSK AI':['ICSK KI','ICSK IA','ICSK AI','مساعد ICSK الذكي','ICSK AI','ICSK AI'],
    'Circulars':['Rundschreiben','Circulaires','परिपत्र','التعاميم','சுற்றறிக்கைகள்','学校通達'],
    'Transport':['Transport','Transport','परिवहन','النقل','போக்குவரத்து','スクールバス'],
    'Uniform & Books':['Uniformen & Bücher','Uniformes et livres','यूनिफॉर्म और किताबें','الزي المدرسي والكتب','சீருடை மற்றும் புத்தகங்கள்','制服・教科書'],
    'Smart campus helper':['Intelligenter Campus-Assistent','Assistant intelligent du campus','स्मार्ट कैंपस सहायक','مساعد الحرم الذكي','ஸ்மார்ட் வளாக உதவியாளர்','スマートキャンパス案内'],
    'Lost something? Found something?':['Etwas verloren oder gefunden?','Vous avez perdu ou trouvé quelque chose ?','कुछ खोया या पाया है?','هل فقدت شيئاً أو عثرت على شيء؟','ஏதேனும் தொலைந்ததா அல்லது கிடைத்ததா?','何かをなくした、または見つけましたか？'],
    'Share an item report':['Einen Gegenstand melden','Signaler un objet','वस्तु की रिपोर्ट साझा करें','إرسال بلاغ عن غرض','பொருள் பற்றிய அறிக்கையைப் பகிரவும்','持ち物の情報を投稿'],
    'Please don’t include phone numbers, home addresses, or other private details.':['Bitte geben Sie keine Telefonnummern, Privatadressen oder andere persönliche Daten an.','N’indiquez pas de numéros de téléphone, d’adresses personnelles ni d’autres informations privées.','कृपया फ़ोन नंबर, घर का पता या अन्य निजी जानकारी शामिल न करें।','يرجى عدم تضمين أرقام الهواتف أو عناوين المنازل أو أي تفاصيل خاصة.','தொலைபேசி எண்கள், வீட்டு முகவரிகள் அல்லது பிற தனிப்பட்ட விவரங்களைச் சேர்க்க வேண்டாம்.','電話番号、自宅住所、その他の個人情報は記載しないでください。'],
    'Report type':['Meldungsart','Type de signalement','रिपोर्ट का प्रकार','نوع البلاغ','அறிக்கை வகை','報告の種類'],
    'I found an item':['Ich habe etwas gefunden','J’ai trouvé un objet','मुझे एक वस्तु मिली','عثرت على غرض','ஒரு பொருளைக் கண்டெடுத்தேன்','物を見つけました'],
    'I lost an item':['Ich habe etwas verloren','J’ai perdu un objet','मेरी एक वस्तु खो गई','فقدت غرضاً','ஒரு பொருளைத் தொலைத்தேன்','物をなくしました'],
    'Describe the item':['Beschreiben Sie den Gegenstand','Décrivez l’objet','वस्तु का विवरण दें','صف الغرض','பொருளை விவரிக்கவும்','品物を説明してください'],
    'Where was it found / last seen?':['Wo wurde es gefunden / zuletzt gesehen?','Où a-t-il été trouvé / vu pour la dernière fois ?','यह कहाँ मिला / आख़िरी बार कहाँ देखा गया?','أين عُثر عليه / شوهد آخر مرة؟','அது எங்கே கிடைத்தது / கடைசியாகப் பார்க்கப்பட்டது?','見つかった場所／最後に見た場所'],
    'Class and section':['Klasse und Gruppe','Classe et section','कक्षा और सेक्शन','الصف والشعبة','வகுப்பு மற்றும் பிரிவு','学年・クラス'],
    'Photo of the item':['Foto des Gegenstands','Photo de l’objet','वस्तु की फोटो','صورة الغرض','பொருளின் புகைப்படம்','品物の写真'],
    'Drop a photo here or choose a file':['Foto hier ablegen oder Datei auswählen','Déposez une photo ici ou choisissez un fichier','यहाँ फोटो डालें या फ़ाइल चुनें','أفلت صورة هنا أو اختر ملفاً','புகைப்படத்தை இங்கே இடவும் அல்லது கோப்பைத் தேர்ந்தெடுக்கவும்','写真をここにドロップするか、ファイルを選択'],
    'JPG, PNG or WebP · up to 2 MB':['JPG, PNG oder WebP · bis zu 2 MB','JPG, PNG ou WebP · jusqu’à 2 Mo','JPG, PNG या WebP · अधिकतम 2 MB','JPG أو PNG أو WebP · حتى 2 ميغابايت','JPG, PNG அல்லது WebP · அதிகபட்சம் 2 MB','JPG、PNG、WebP · 最大2 MB'],
    'Post report & check for matches':['Meldung senden und Übereinstimmungen prüfen','Envoyer le signalement et rechercher des correspondances','रिपोर्ट पोस्ट करें और मिलान देखें','إرسال البلاغ والتحقق من التطابقات','அறிக்கையைப் பதிவிட்டு பொருத்தங்களைச் சரிபார்க்கவும்','報告を投稿して一致を確認'],
    'Item reports':['Gegenstandsmeldungen','Signalements d’objets','वस्तु रिपोर्ट','بلاغات الأغراض','பொருள் அறிக்கைகள்','持ち物の報告'],
    'All reports':['Alle Meldungen','Tous les signalements','सभी रिपोर्ट','كل البلاغات','அனைத்து அறிக்கைகள்','すべての報告'],
    'Lost items':['Verlorene Gegenstände','Objets perdus','खोई हुई वस्तुएँ','الأغراض المفقودة','தொலைந்த பொருட்கள்','なくした物'],
    'Found items':['Gefundene Gegenstände','Objets trouvés','मिली हुई वस्तुएँ','الأغراض التي تم العثور عليها','கண்டெடுக்கப்பட்ட பொருட்கள்','見つかった物'],
    'Stay Updated':['Bleiben Sie informiert','Restez informé','अपडेट रहें','ابقَ على اطلاع','புதுப்பித்த நிலையில் இருங்கள்','最新情報をチェック'],
    'Notices & Upcoming Events':['Mitteilungen und bevorstehende Veranstaltungen','Avis et événements à venir','सूचनाएँ और आगामी कार्यक्रम','الإعلانات والفعاليات القادمة','அறிவிப்புகள் மற்றும் வரவிருக்கும் நிகழ்வுகள்','お知らせ・今後のイベント'],
    'Latest Circulars':['Neueste Rundschreiben','Dernières circulaires','नवीनतम परिपत्र','أحدث التعاميم','சமீபத்திய சுற்றறிக்கைகள்','最新の通達'],
    'View All →':['Alle anzeigen →','Tout afficher →','सभी देखें →','عرض الكل →','அனைத்தையும் காண்க →','すべて表示 →'],
    'Upcoming Events':['Bevorstehende Veranstaltungen','Événements à venir','आगामी कार्यक्रम','الفعاليات القادمة','வரவிருக்கும் நிகழ்வுகள்','今後のイベント'],
    'Full Calendar →':['Vollständiger Kalender →','Calendrier complet →','पूरा कैलेंडर →','التقويم الكامل →','முழு நாட்காட்டி →','カレンダー全体 →'],
    'Sep':['Sep','Sept.','सितंबर','سبتمبر','செப்','9月'],
    'Oct':['Okt','Oct.','अक्टूबर','أكتوبر','அக்','10月'],
    'Science & Innovation Exhibition 2026':['Wissenschafts- und Innovationsausstellung 2026','Exposition scientifique et d’innovation 2026','विज्ञान और नवाचार प्रदर्शनी 2026','معرض العلوم والابتكار 2026','அறிவியல் மற்றும் புதுமைக் கண்காட்சி 2026','科学・イノベーション展示会 2026'],
    'Inter-Campus Debate Championship':['Campusübergreifender Debattierwettbewerb','Championnat de débat inter-campus','अंतर-परिसर वाद-विवाद प्रतियोगिता','بطولة المناظرات بين الفروع','வளாகங்களுக்கு இடையிலான விவாதப் போட்டி','キャンパス対抗ディベート大会'],
    'All Campuses':['Alle Standorte','Tous les campus','सभी परिसर','جميع الفروع','அனைத்து வளாகங்கள்','全キャンパス'],
    'Annual Sports Day & Athletic Meet':['Jährliches Sportfest und Leichtathletiktreffen','Journée sportive annuelle et rencontre d’athlétisme','वार्षिक खेल दिवस और एथलेटिक मीट','اليوم الرياضي السنوي ولقاء ألعاب القوى','ஆண்டு விளையாட்டு நாள் மற்றும் தடகளச் சந்திப்பு','年次スポーツデー・陸上競技大会'],
    'ICSK Mobile App':['ICSK Mobile App','Application mobile ICSK','ICSK मोबाइल ऐप','تطبيق ICSK للهواتف','ICSK மொபைல் செயலி','ICSKモバイルアプリ'],
    'Smart Campus Ecosystem':['Intelligentes Campus-Ökosystem','Écosystème de campus intelligent','स्मार्ट कैंपस इकोसिस्टम','منظومة الحرم الذكي','ஸ்மார்ட் வளாகச் சூழல்','スマートキャンパス・エコシステム'],
    'Our Campuses':['Unsere Standorte','Nos campus','हमारे परिसर','فروعنا','எங்கள் வளாகங்கள்','キャンパス一覧'],
    'Four Campuses, One Legacy of Excellence':['Vier Standorte, ein Vermächtnis der Exzellenz','Quatre campus, un héritage d’excellence','चार परिसर, उत्कृष्टता की एक विरासत','أربعة فروع وإرث واحد من التميز','நான்கு வளாகங்கள், சிறப்பின் ஒரே பாரம்பரியம்','4つのキャンパス、ひとつの卓越した伝統'],
    'Senior Branch':['Senior-Standort','Campus Senior','सीनियर शाखा','فرع المرحلة الثانوية','மூத்த பிரிவு','シニア校'],
    'Junior Branch':['Junior-Standort','Campus Junior','जूनियर शाखा','فرع المرحلة الابتدائية','இளையோர் பிரிவு','ジュニア校'],
    'Khaitan Branch':['Standort Khaitan','Campus de Khaitan','खैतान शाखा','فرع خيطان','கைதான் வளாகம்','ハイタン校'],
    'Amman Branch':['Standort Amman','Campus d’Amman','अम्मान शाखा','فرع عمّان','அம்மான் வளாகம்','アンマン校'],
    'Quick Links':['Schnellzugriffe','Liens rapides','त्वरित लिंक','روابط سريعة','விரைவு இணைப்புகள்','クイックリンク'],
    'About Us':['Über uns','À propos de nous','हमारे बारे में','معلومات عنا','எங்களைப் பற்றி','学校について'],
    'Academic Calendar':['Akademischer Kalender','Calendrier scolaire','शैक्षणिक कैलेंडर','التقويم الأكاديمي','கல்வி நாட்காட்டி','学事暦'],
    'School Rules':['Schulordnung','Règlement scolaire','स्कूल के नियम','قواعد المدرسة','பள்ளி விதிகள்','校則'],
    'Career Opportunities':['Karrieremöglichkeiten','Offres d’emploi','करियर के अवसर','فرص العمل','வேலைவாய்ப்புகள்','採用情報'],
    'Contact Info':['Kontaktinformationen','Coordonnées','संपर्क जानकारी','معلومات الاتصال','தொடர்பு விவரங்கள்','連絡先'],
    'Not Now':['Nicht jetzt','Pas maintenant','अभी नहीं','ليس الآن','இப்போது வேண்டாம்','今はしない'],
    'Continue on ICSK Website':['Auf der ICSK-Website fortfahren','Continuer sur le site ICSK','ICSK वेबसाइट पर जारी रखें','المتابعة على موقع ICSK','ICSK இணையதளத்தில் தொடரவும்','ICSKウェブサイトで続行'],
    'On-device helper':['Geräteinterner Assistent','Assistant sur l’appareil','डिवाइस पर सहायक','مساعد على الجهاز','சாதனத்திலுள்ள உதவியாளர்','端末内アシスタント']
  };
  const dictionaries = {};
  LANGS.slice(1).forEach((language, index) => {
    dictionaries[language.code] = {};
    Object.keys(rows).forEach(key => { dictionaries[language.code][key] = rows[key][index]; });
  });
  const originals = new WeakMap();
  const attributeOriginals = new WeakMap();
  let active = 'en';

  function translate(value) {
    return (dictionaries[active] && dictionaries[active][value]) || value;
  }
  function translateNode(node) {
    if (!originals.has(node)) originals.set(node, node.nodeValue);
    const source = originals.get(node);
    const clean = source.trim();
    if (!clean) return;
    const result = translate(clean);
    if (result === clean) return;
    const offset = source.indexOf(clean);
    node.nodeValue = source.slice(0, offset) + result + source.slice(offset + clean.length);
  }
  function translateAttributes(root) {
    const list = [];
    if (root.nodeType === Node.ELEMENT_NODE && root.matches('[placeholder],[aria-label],[title]')) list.push(root);
    if (root.querySelectorAll) list.push(...root.querySelectorAll('[placeholder],[aria-label],[title]'));
    list.forEach(element => {
      let saved = attributeOriginals.get(element);
      if (!saved) { saved = {}; attributeOriginals.set(element, saved); }
      ['placeholder', 'aria-label', 'title'].forEach(attribute => {
        if (!element.hasAttribute(attribute)) return;
        if (!(attribute in saved)) saved[attribute] = element.getAttribute(attribute);
        element.setAttribute(attribute, translate(saved[attribute]));
      });
    });
  }
  function translateSubtree(root) {
    if (root.nodeType === Node.TEXT_NODE) {
      const parent = root.parentElement;
      if (parent && !parent.closest('script,style,noscript,code,pre,[data-no-translate]')) translateNode(root);
      return;
    }
    if (root.nodeType !== Node.ELEMENT_NODE && root !== document.body) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const parent = node.parentElement;
      if (parent && !parent.closest('script,style,noscript,code,pre,[data-no-translate]')) translateNode(node);
    }
    translateAttributes(root);
  }
  function applyLanguage(code) {
    active = dictionaries[code] ? code : 'en';
    document.documentElement.lang = active;
    document.documentElement.dir = active === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dataset.language = active;
    document.body.dataset.language = active;
    translateSubtree(document.body);
    const select = document.getElementById('icsk-language-select');
    if (select) select.value = active;
    try { localStorage.setItem(KEY, active); } catch (error) { /* storage disabled */ }
    window.dispatchEvent(new CustomEvent('icsk:languagechange', { detail: { language: active } }));
  }
  function addSelector() {
    const nav = document.querySelector('.nav-wrapper');
    if (!nav || document.getElementById('icsk-language-select')) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'language-switcher';
    const label = document.createElement('label');
    label.htmlFor = 'icsk-language-select';
    label.textContent = 'Language';
    const select = document.createElement('select');
    select.id = 'icsk-language-select';
    select.setAttribute('aria-label', 'Choose website language');
    LANGS.forEach(language => {
      const option = document.createElement('option');
      option.value = language.code;
      option.textContent = language.label;
      select.appendChild(option);
    });
    select.addEventListener('change', () => applyLanguage(select.value));
    wrapper.append(label, select);
    nav.appendChild(wrapper);
    const style = document.createElement('style');
    style.textContent =
      '.language-switcher{display:flex;align-items:center;gap:8px;flex:0 0 auto;margin-inline-start:12px}' +
      '.language-switcher label{font-size:12px;font-weight:700;color:var(--text-medium);white-space:nowrap}' +
      '.language-switcher select{max-width:150px;min-width:112px;padding:9px 30px 9px 11px;border:1px solid var(--border-color);border-radius:10px;background:var(--bg-card);color:var(--text-dark);font:600 13px var(--font-body);cursor:pointer}' +
      '.language-switcher select:focus{outline:3px solid rgba(2,132,199,.18);border-color:var(--color-cyan)}' +
      '@media(max-width:768px){.language-switcher{width:100%;justify-content:flex-end;margin:2px 0 0}.language-switcher select{max-width:190px}}' +
      'html[dir="rtl"] body{direction:rtl;text-align:right}' +
      'html[dir="rtl"] .hero-card-floating{left:auto;right:22px;border-left:0;border-right:4px solid var(--color-green)}' +
      'html[dir="rtl"] .hero-card-floating.top-right{right:auto;left:22px;border-right:0;border-left:4px solid var(--color-orange)}' +
      'html[dir="rtl"] .top-contacts,html[dir="rtl"] .ticker-wrapper,html[dir="rtl"] .lf-card,html[dir="rtl"] .lf-toolbar{direction:rtl}' +
      'html[dir="rtl"] input,html[dir="rtl"] textarea,html[dir="rtl"] select{text-align:right}' +
      'html[dir="rtl"] .btn-download{direction:ltr}' +
      'html[dir="rtl"] .brand-title-box p{letter-spacing:0}';
    document.head.appendChild(style);
  }
  function init() {
    addSelector();
    let saved = 'en';
    try {
      const stored = localStorage.getItem(KEY);
      if (LANGS.some(language => language.code === stored)) saved = stored;
    } catch (error) { /* English is the default */ }
    applyLanguage(saved);
    const observer = new MutationObserver(records => {
      records.forEach(record => record.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) translateSubtree(node);
      }));
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();