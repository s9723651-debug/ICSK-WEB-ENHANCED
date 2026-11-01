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
    'Nurturing Excellence,':['Exzellenz fördern,','Cultiver l’excellence,','उत्कृष्टता को बढ़ावा देना,','رعاية التميز،','சிறப்பை வளர்த்து,','卓越性を育み、'],
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
    'On-device helper':['Geräteinterner Assistent','Assistant sur l’appareil','डिवाइस पर सहायक','مساعد على الجهاز','சாதனத்திலுள்ள உதவியாளர்','端末内アシスタント'] ,
    'Admissions open for Academic Session 2026–2027 across all ICSK campuses in Kuwait.':['Die Anmeldung für das Schuljahr 2026–2027 ist an allen ICSK-Standorten in Kuwait geöffnet.','Les admissions pour l’année scolaire 2026–2027 sont ouvertes sur tous les campus ICSK au Koweït.','कुवैत के सभी ICSK परिसरों में शैक्षणिक सत्र 2026–2027 के लिए प्रवेश खुले हैं।','التسجيل للعام الدراسي 2026–2027 مفتوح في جميع فروع ICSK في الكويت.','குவைத்தில் உள்ள அனைத்து ICSK வளாகங்களிலும் 2026–2027 கல்வியாண்டிற்கான சேர்க்கை திறக்கப்பட்டுள்ளது.','クウェートのすべてのICSKキャンパスで、2026～2027年度の入学受付を開始しました。'],
    'Post a clear description, where it was found, your class and section, and a photo. The smart helper suggests a category and looks for similar reports on this device.':['Veröffentlichen Sie eine genaue Beschreibung, den Fundort, Ihre Klasse und Gruppe sowie ein Foto. Der intelligente Assistent schlägt eine Kategorie vor und sucht auf diesem Gerät nach ähnlichen Meldungen.','Ajoutez une description précise, le lieu où l’objet a été trouvé, votre classe, votre section et une photo. L’assistant suggère une catégorie et recherche des signalements similaires sur cet appareil.','वस्तु का स्पष्ट विवरण, मिलने का स्थान, अपनी कक्षा और सेक्शन तथा एक फोटो दें। स्मार्ट सहायक श्रेणी सुझाता है और इस डिवाइस पर मिलती-जुलती रिपोर्ट खोजता है।','أضف وصفاً واضحاً ومكان العثور على الغرض والصف والشعبة وصورة. يقترح المساعد الذكي فئة مناسبة ويبحث عن بلاغات مشابهة على هذا الجهاز.','தெளிவான விளக்கம், கிடைத்த இடம், உங்கள் வகுப்பு மற்றும் பிரிவு, ஒரு புகைப்படம் ஆகியவற்றைச் சேர்க்கவும். இந்தச் சாதனத்தில் ஒத்த பதிவுகளை ஸ்மார்ட் உதவியாளர் தேடும்.','品物の詳しい説明、見つかった場所、学年・クラス、写真を投稿してください。スマートアシスタントが分類を提案し、この端末内の類似報告を検索します。'],
    'Avoid photos showing student faces. Tap the preview to change the photo.':['Vermeiden Sie Fotos mit Schülergesichtern. Tippen Sie auf die Vorschau, um das Foto zu ändern.','Évitez les photos montrant des visages d’élèves. Touchez l’aperçu pour changer la photo.','ऐसी फोटो न डालें जिनमें विद्यार्थियों के चेहरे दिखें। फोटो बदलने के लिए प्रीव्यू पर टैप करें।','تجنب الصور التي تظهر وجوه الطلاب. اضغط على المعاينة لتغيير الصورة.','மாணவர்களின் முகங்கள் தெரியும் புகைப்படங்களைத் தவிர்க்கவும். புகைப்படத்தை மாற்ற முன்னோட்டத்தைத் தட்டவும்.','生徒の顔が写った写真は避けてください。写真を変更するにはプレビューをタップします。'],
    'Prototype note: reports and photos are saved only in this browser on this device. They are not uploaded or visible to other students.':['Prototyp-Hinweis: Meldungen und Fotos werden nur in diesem Browser auf diesem Gerät gespeichert. Sie werden nicht hochgeladen und sind für andere Schüler nicht sichtbar.','Note sur le prototype : les signalements et les photos sont enregistrés uniquement dans ce navigateur, sur cet appareil. Ils ne sont pas envoyés ni visibles par les autres élèves.','प्रोटोटाइप नोट: रिपोर्ट और फोटो केवल इसी डिवाइस के इस ब्राउज़र में सेव होते हैं। वे अपलोड नहीं होते और दूसरे विद्यार्थियों को दिखाई नहीं देते।','ملاحظة حول النموذج التجريبي: تُحفظ البلاغات والصور في هذا المتصفح على هذا الجهاز فقط. ولا يتم رفعها أو عرضها للطلاب الآخرين.','முன்மாதிரி குறிப்பு: அறிக்கைகளும் புகைப்படங்களும் இந்தச் சாதனத்தின் இந்த உலாவியில் மட்டுமே சேமிக்கப்படும். அவை பதிவேற்றப்படவோ மற்ற மாணவர்களுக்குக் காட்டப்படவோ மாட்டாது.','試作版の注意：報告と写真はこの端末のこのブラウザーにのみ保存されます。アップロードされず、他の生徒には表示されません。'],
    'Smart matching compares descriptions and locations to suggest possible matches.':['Der intelligente Abgleich vergleicht Beschreibungen und Orte, um mögliche Übereinstimmungen vorzuschlagen.','La recherche intelligente compare les descriptions et les lieux pour proposer des correspondances possibles.','स्मार्ट मिलान संभावित मैच सुझाने के लिए विवरण और स्थान की तुलना करता है।','تقارن المطابقة الذكية الأوصاف والمواقع لاقتراح تطابقات محتملة.','சாத்தியமான பொருத்தங்களைப் பரிந்துரைக்க விளக்கங்களையும் இடங்களையும் ஸ்மார்ட் பொருத்தம் ஒப்பிடுகிறது.','スマート照合は説明と場所を比較し、一致する可能性のある報告を提案します。'],
    'Schedule for Term 1 Final Examination 2026–27':['Zeitplan für die Abschlussprüfung des 1. Terms 2026–27','Calendrier des examens finaux du 1er trimestre 2026–2027','टर्म 1 की अंतिम परीक्षा 2026–27 का कार्यक्रम','جدول الاختبارات النهائية للفصل الأول 2026–2027','பருவம் 1 இறுதித் தேர்வு அட்டவணை 2026–27','第1学期最終試験日程 2026～27'],
    'Registration for Inter-School Arts & Sports Meet':['Anmeldung zum schulübergreifenden Kunst- und Sporttreffen','Inscription à la rencontre interscolaire des arts et du sport','अंतर-विद्यालय कला और खेल प्रतियोगिता के लिए पंजीकरण','التسجيل في اللقاء المدرسي للفنون والرياضة','பள்ளிகளுக்கிடையேயான கலை மற்றும் விளையாட்டு நிகழ்வுக்கான பதிவு','学校対抗アート・スポーツ大会の登録'],
    'Important Guidelines regarding School Transport & Safety':['Wichtige Hinweise zu Schülertransport und Sicherheit','Consignes importantes concernant le transport scolaire et la sécurité','स्कूल परिवहन और सुरक्षा संबंधी महत्वपूर्ण दिशानिर्देश','إرشادات مهمة بشأن النقل المدرسي والسلامة','பள்ளிப் போக்குவரத்து மற்றும் பாதுகாப்பு குறித்த முக்கிய வழிகாட்டுதல்கள்','スクールバスと安全に関する重要なガイドライン'],
    'Parent-Teacher Meeting (PTM) Schedule for Classes VI-XII':['Zeitplan für Eltern-Lehrer-Gespräche (PTM), Klassen VI–XII','Calendrier des réunions parents-professeurs (PTM), classes VI à XII','कक्षा 6–12 के लिए अभिभावक-शिक्षक बैठक (PTM) का कार्यक्रम','جدول اجتماع أولياء الأمور والمعلمين للصفوف من السادس إلى الثاني عشر','6–12 ஆம் வகுப்புகளுக்கான பெற்றோர்-ஆசிரியர் சந்திப்பு அட்டவணை','6～12年生の保護者・教師面談日程'],
    'Issued: Sept 02, 2026':['Veröffentlicht: 2. Sept. 2026','Publié : 2 sept. 2026','जारी: 2 सितंबर 2026','صدر في: 2 سبتمبر 2026','வெளியீடு: 2 செப்டம்பர் 2026','発行日：2026年9月2日'],
    'Issued: Aug 28, 2026':['Veröffentlicht: 28. Aug. 2026','Publié : 28 août 2026','जारी: 28 अगस्त 2026','صدر في: 28 أغسطس 2026','வெளியீடு: 28 ஆகஸ்ட் 2026','発行日：2026年8月28日'],
    'Issued: Aug 20, 2026':['Veröffentlicht: 20. Aug. 2026','Publié : 20 août 2026','जारी: 20 अगस्त 2026','صدر في: 20 أغسطس 2026','வெளியீடு: 20 ஆகஸ்ட் 2026','発行日：2026年8月20日'],
    'Issued: Aug 15, 2026':['Veröffentlicht: 15. Aug. 2026','Publié : 15 août 2026','जारी: 15 अगस्त 2026','صدر في: 15 أغسطس 2026','வெளியீடு: 15 ஆகஸ்ட் 2026','発行日：2026年8月15日'],
    'Senior Branch Auditorium • 09:00 AM':['Auditorium der Senior Branch • 09:00 Uhr','Auditorium du campus Senior • 09 h 00','सीनियर शाखा सभागार • सुबह 09:00 बजे','قاعة فرع المرحلة الثانوية • 09:00 صباحاً','மூத்த பிரிவு அரங்கம் • காலை 09:00','シニア校講堂 • 午前9:00'],
    'Khaitan Branch • 10:00 AM':['Standort Khaitan • 10:00 Uhr','Campus de Khaitan • 10 h 00','खैतान शाखा • सुबह 10:00 बजे','فرع خيطان • 10:00 صباحاً','கைதான் வளாகம் • காலை 10:00','ハイタン校 • 午前10:00'],
    "World Teachers' Day Celebrations":['Feier zum Weltlehrertag','Célébration de la Journée mondiale des enseignants','विश्व शिक्षक दिवस समारोह','احتفالات اليوم العالمي للمعلمين','உலக ஆசிரியர் தினக் கொண்டாட்டங்கள்','世界教師デーのお祝い'],
    'Amateur Athletic Stadium • 08:00 AM':['Amateur-Athletikstadion • 08:00 Uhr','Stade d’athlétisme amateur • 08 h 00','अमेच्योर एथलेटिक स्टेडियम • सुबह 08:00 बजे','ملعب ألعاب القوى للهواة • 08:00 صباحاً','அமெச்சூர் தடகள மைதானம் • காலை 08:00','アマチュア陸上競技場 • 午前8:00'],
    'Principal, The Indian Community School Kuwait':['Schulleiter, The Indian Community School Kuwait','Directeur, The Indian Community School Kuwait','प्राचार्य, द इंडियन कम्युनिटी स्कूल कुवैत','مدير مدرسة المجتمع الهندية في الكويت','முதல்வர், தி இந்தியன் கம்யூனிட்டி ஸ்கூல் குவைத்','インディアン・コミュニティ・スクール・クウェート校長'],
    "Connect to Your Child's Journey with":['Begleiten Sie den Bildungsweg Ihres Kindes mit','Accompagnez le parcours de votre enfant avec','अपने बच्चे की शैक्षिक यात्रा से जुड़ें','تابع رحلة طفلك التعليمية مع','உங்கள் குழந்தையின் கல்விப் பயணத்துடன் இணையுங்கள்','お子さまの学びの歩みを支える'],
    'Access real-time academic records, attendance, exam schedules, online fee payments, and direct school communication anytime, anywhere.':['Greifen Sie jederzeit und überall auf aktuelle Schulakten, Anwesenheit, Prüfungspläne, Online-Gebührenzahlungen und direkte Schulkommunikation zu.','Accédez à tout moment et partout aux dossiers scolaires, aux présences, aux calendriers d’examens, au paiement en ligne des frais et à la communication directe avec l’école.','कहीं से भी, कभी भी शैक्षणिक रिकॉर्ड, उपस्थिति, परीक्षा कार्यक्रम, ऑनलाइन शुल्क भुगतान और स्कूल से सीधे संपर्क की सुविधा पाएँ।','يمكنك الوصول في أي وقت ومن أي مكان إلى السجلات الأكاديمية والحضور وجداول الامتحانات ودفع الرسوم إلكترونياً والتواصل المباشر مع المدرسة.','கல்விப் பதிவுகள், வருகைப் பதிவு, தேர்வு அட்டவணைகள், இணையவழிக் கட்டணச் செலுத்தல் மற்றும் பள்ளியுடன் நேரடித் தொடர்பு ஆகியவற்றை எங்கிருந்தும் எப்போதும் அணுகலாம்.','学業記録、出席、試験日程、オンライン学費支払い、学校との直接連絡に、いつでもどこからでもアクセスできます。'],
    'Real-time Attendance Updates':['Anwesenheitsupdates in Echtzeit','Mises à jour des présences en temps réel','रीयल-टाइम उपस्थिति अपडेट','تحديثات الحضور الفورية','நிகழ்நேர வருகைப் புதுப்பிப்புகள்','リアルタイム出席更新'],
    'Digital Homework & Materials':['Digitale Hausaufgaben und Materialien','Devoirs et ressources numériques','डिजिटल होमवर्क और सामग्री','الواجبات والمواد الرقمية','மின்னணு வீட்டுப்பாடம் மற்றும் பாடப்பொருட்கள்','デジタル宿題・教材'],
    'Secure K-Net Payment Gateway':['Sicheres K-Net-Zahlungssystem','Passerelle de paiement K-Net sécurisée','सुरक्षित K-Net भुगतान गेटवे','بوابة دفع K-Net آمنة','பாதுகாப்பான K-Net கட்டண நுழைவாயில்','安全なK-Net決済ゲートウェイ'],
    'Direct Teacher Communication':['Direkte Kommunikation mit Lehrkräften','Communication directe avec les enseignants','शिक्षकों से सीधा संपर्क','التواصل المباشر مع المعلمين','ஆசிரியர்களுடன் நேரடித் தொடர்பு','教師との直接連絡'],
    'Download on the':['Laden im','Télécharger sur l’','यहाँ डाउनलोड करें','حمّل من','இங்கே பதிவிறக்கவும்','ダウンロード先：'],
    'App Store':['App Store','App Store','ऐप स्टोर','App Store','App Store','App Store'],
    'GET IT ON':['ERHÄLTLICH BEI','DISPONIBLE SUR','यहाँ उपलब्ध','متوفر على','இதில் கிடைக்கும்','入手先'],
    'Google Play':['Google Play','Google Play','गूगल प्ले','Google Play','Google Play','Google Play'],
    'Four Campuses, One Legacy of Excellence':['Vier Standorte, ein Vermächtnis der Exzellenz','Quatre campus, un héritage d’excellence','चार परिसर, उत्कृष्टता की एक विरासत','أربعة فروع وإرث واحد من التميز','நான்கு வளாகங்கள், சிறப்பின் ஒரே பாரம்பரியம்','4つのキャンパス、ひとつの卓越した伝統'],
    'Salmiya • Classes IX to XII':['Salmiya • Klassen IX bis XII','Salmiya • Classes de la IXe à la XIIe','सल्मिया • कक्षा 9 से 12','السالمية • الصفوف من التاسع إلى الثاني عشر','சால்மியா • 9 முதல் 12 ஆம் வகுப்பு வரை','サルミヤ • 9～12年生'],
    'Explore Campus →':['Standort entdecken →','Découvrir le campus →','परिसर देखें →','استكشف الفرع →','வளாகத்தைப் பாருங்கள் →','キャンパスを見る →'],
    'Salmiya • Kindergarten to Class VI':['Salmiya • Kindergarten bis Klasse VI','Salmiya • Maternelle à la classe VI','सल्मिया • किंडरगार्टन से कक्षा 6','السالمية • الروضة حتى الصف السادس','சால்மியா • மழலையர் வகுப்பு முதல் 6 ஆம் வகுப்பு வரை','サルミヤ • 幼稚園～6年生'],
    'Khaitan • Kindergarten to Class XII':['Khaitan • Kindergarten bis Klasse XII','Khaitan • Maternelle à la classe XII','खैतान • किंडरगार्टन से कक्षा 12','خيطان • الروضة حتى الصف الثاني عشر','கைதான் • மழலையர் வகுப்பு முதல் 12 ஆம் வகுப்பு வரை','ハイタン • 幼稚園～12年生'],
    'Salmiya • Kindergarten to Class X':['Salmiya • Kindergarten bis Klasse X','Salmiya • Maternelle à la classe X','सल्मिया • किंडरगार्टन से कक्षा 10','السالمية • الروضة حتى الصف العاشر','சால்மியா • மழலையர் வகுப்பு முதல் 10 ஆம் வகுப்பு வரை','サルミヤ • 幼稚園～10年生'],
    'School Rules':['Schulordnung','Règlement scolaire','स्कूल के नियम','قواعد المدرسة','பள்ளி விதிகள்','校則'],
    'Career Opportunities':['Karrieremöglichkeiten','Offres d’emploi','करियर के अवसर','فرص العمل','வேலைவாய்ப்புகள்','採用情報'],
    'Senior Salmiya':['Senior Salmiya','Senior Salmiya','सीनियर सल्मिया','السالمية الثانوية','சீனியர் சால்மியா','シニア・サルミヤ'],
    'Junior Salmiya':['Junior Salmiya','Junior Salmiya','जूनियर सल्मिया','السالمية الابتدائية','ஜூனியர் சால்மியா','ジュニア・サルミヤ'],
    'Salmiya, Kuwait':['Salmiya, Kuwait','Salmiya, Koweït','सल्मिया, कुवैत','السالمية، الكويت','சால்மியா, குவைத்','クウェート・サルミヤ'],
    'This on-device helper uses built-in school information and your local Lost & Found reports. It does not send your messages anywhere.':['Dieser Assistent nutzt integrierte Schulinformationen und lokale Fundmeldungen. Ihre Nachrichten werden nirgendwohin gesendet.','Cet assistant utilise les informations scolaires intégrées et vos signalements locaux d’objets trouvés. Vos messages ne sont envoyés nulle part.','यह सहायक स्कूल की अंतर्निहित जानकारी और आपकी स्थानीय खोया-पाया रिपोर्ट का उपयोग करता है। आपके संदेश कहीं नहीं भेजे जाते।','يستخدم هذا المساعد معلومات المدرسة المدمجة وبلاغات المفقودات المحلية. ولا يرسل رسائلك إلى أي جهة.','இந்த உதவியாளர் உள்ளமைக்கப்பட்ட பள்ளித் தகவல்களையும் உள்ளூர் தொலைந்தவை/கண்டெடுக்கப்பட்டவை அறிக்கைகளையும் பயன்படுத்துகிறது. உங்கள் செய்திகள் எங்கும் அனுப்பப்படாது.','この端末内アシスタントは内蔵の学校情報とローカルの落とし物報告を使用します。メッセージが外部に送信されることはありません。']
  };
  const dictionaries = {};
  LANGS.slice(1).forEach((language, index) => {
    dictionaries[language.code] = {};
    Object.keys(rows).forEach(key => { dictionaries[language.code][key] = rows[key][index]; });
  });
  const originals = new Map();
  const attributeOriginals = new Map();
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
    const offset = source.indexOf(clean);
    const next = source.slice(0, offset) + result + source.slice(offset + clean.length);
    if (node.nodeValue !== next) node.nodeValue = next;
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
  function restoreOriginals() {
    originals.forEach((source, node) => {
      if (node.isConnected && node.nodeValue !== source) node.nodeValue = source;
    });
    attributeOriginals.forEach((saved, element) => {
      if (!element.isConnected) return;
      Object.keys(saved).forEach(attribute => {
        if (element.hasAttribute(attribute)) element.setAttribute(attribute, saved[attribute]);
      });
    });
  }
  function applyLanguage(code) {
    active = code === 'en' || dictionaries[code] ? code : 'en';
    restoreOriginals();
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