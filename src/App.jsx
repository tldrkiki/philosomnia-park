import React, { useState, useMemo } from 'react';
import { 
  Search, MapPin, Ticket, Clock, Info, Navigation, Star, 
  Sparkles, Coffee, Utensils, ShoppingBag, Hotel, ShieldAlert, 
  Gift, Heart, ChevronRight, X, Layers, SlidersHorizontal, 
  Music, Tv, Bus, Calendar, User, PhoneCall, Moon, Compass, Check,
  Award, ChevronDown, CheckCircle2, AlertCircle
} from 'lucide-react';

const PARK_ZONES = [
  { id: 'logos_main', name: '邏各斯市鎮大街', color: 'from-amber-400 to-yellow-600', pos: { x: 50, y: 80 } },
  { id: 'six_degrees', name: '六度圈之城', color: 'from-purple-400 to-indigo-600', pos: { x: 52, y: 55 } },
  { id: 'underworld', name: '陰間部落', color: 'from-indigo-500 to-blue-900', pos: { x: 45, y: 30 } },
  { id: 'ice_snow', name: '邏各斯冰雪樂園', color: 'from-cyan-300 to-blue-500', pos: { x: 22, y: 35 } },
  { id: 'dream_zone', name: '夢境與大千世界', color: 'from-emerald-400 to-teal-700', pos: { x: 75, y: 40 } },
  { id: 'school_zone', name: '聖邏各斯中學區', color: 'from-rose-400 to-red-600', pos: { x: 78, y: 70 } }
];

const ATTRACTIONS_DATA = [
  // Rides & Attractions
  {
    id: 'att-1',
    name: '邏各斯時空穿梭歷險',
    category: 'rides',
    categoryName: '精選機動遊戲',
    zone: 'six_degrees',
    zoneName: '六度圈之城',
    height: '任何高度',
    hours: '15:00 - 25:30',
    coords: { x: 48, y: 58 },
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80',
    summary: '走進失眠圖書館，由邏各斯虛擬精靈妙音帶你穿梭邏各斯不同歷史時空，於虛擬實境中記錄歷史。',
    description: '走進失眠圖書館，由邏各斯虛擬精靈妙音帶你穿梭邏各斯不同歷史時空，於虛擬實境中為無眠太太記錄和見證失眠鎮不同紀元的歷史事件。（P.S. 不要得罪妙音，裂音隨時出沒）',
    tags: ['VR體驗', '時空穿梭', '故事導覽'],
    fastPass: true
  },
  {
    id: 'att-2',
    name: '邏各斯冰雪之旅',
    category: 'rides',
    categoryName: '精選機動遊戲',
    zone: 'ice_snow',
    zoneName: '邏各斯冰雪樂園',
    height: '102厘米或以上',
    hours: '15:00 - 25:45',
    coords: { x: 20, y: 38 },
    image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80',
    summary: '乘坐雪橇列車從雪山頂急速滑下，感受冰冷寒風劃過肌理的極速刺激。',
    description: '一望無際的邏各斯冰雪樂園新設了一部雪橇列車，讓你先從雪山眺望邏各斯優美的風景，再從山頂急速滑下，感受冰冷寒風劃過肌理的刺激。在速度與零度之間，且看看雪國裡那雪獸會否滲奇香？',
    tags: ['雪橇過山車', '極速刺激', '雪國景觀'],
    fastPass: true
  },
  {
    id: 'att-3',
    name: '芝士山大宅',
    category: 'rides',
    categoryName: '精選機動遊戲',
    zone: 'six_degrees',
    zoneName: '六度圈之城',
    height: '任何高度',
    hours: '15:00 - 26:00',
    coords: { x: 55, y: 50 },
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
    summary: '乘坐自動代步車穿梭豪華大宅，一睹邏各斯最富有家庭的奢華生活與家傳之寶。',
    description: '在偌大的豪華大宅內，乘坐自動代步車穿梭衣物房、化妝房、健身房、玩具房、睡房、娛樂大廳、按摩院、電影院、卡拉OK室、室內運動場、圖書館、私人花園及博物館，親身探索全邏各斯最有錢家庭金碧輝煌的奢侈生活。你更有機會一睹大宅家傳之寶真身及其珍貴紀錄片！',
    tags: ['豪宅巡禮', '自動代步車', '家傳之寶'],
    fastPass: false
  },
  {
    id: 'att-4',
    name: '轉圈轉圈妖怪共你',
    category: 'rides',
    categoryName: '精選機動遊戲',
    zone: 'underworld',
    zoneName: '陰間部落',
    height: '任何高度',
    hours: '15:00 - 26:00',
    coords: { x: 42, y: 28 },
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    summary: '妖怪版旋轉木馬！登上烏狐、窿龍、夢瓜等妖怪坐騎，伴隨陰間悠揚樂韻翩然共舞。',
    description: '朋友最多，轉圈轉圈妖怪共你～ 烏狐、窿龍、夢瓜等人氣妖怪和他們的一眾朋友都已悉心打扮，圍成一圈，準備就緒！各位大人快快登上這座妖怪版旋轉木馬，伴隨陰間音樂人特製的悠揚樂韻，於陰間一角與那些可愛的小朋友們翩然共舞吧。',
    tags: ['妖怪旋轉木馬', '親子同樂', '陰間獨家音樂'],
    fastPass: false
  },
  {
    id: 'att-5',
    name: '盈救時間大作戰！',
    category: 'rides',
    categoryName: '精選機動遊戲',
    zone: 'six_degrees',
    zoneName: '六度圈之城',
    height: '任何高度',
    hours: '15:00 - 25:00',
    coords: { x: 58, y: 62 },
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
    summary: '拿起時間使者法寶槍，透過傳送陣收集時間碎片！記得避開陳八妹的時間碎片。',
    description: '這是一個來自十年前的求救訊號，「死神好友盈」急需協助！馬上進入駖子小姐以靈力操控的人間傳送陣，拿起時間使者法寶槍，幫陸月盈將灑落的時間碎片一塊一塊收集回來吧。記得千萬別收集楊嘉兒婆婆陳八妹的時間碎片！',
    tags: ['互動射擊', '時間冒險', '拯救任務'],
    fastPass: true
  },
  {
    id: 'att-6',
    name: '逃出夢遊之境',
    category: 'rides',
    categoryName: '精選機動遊戲',
    zone: 'dream_zone',
    zoneName: '夢境與大千世界',
    height: '110厘米或以上',
    hours: '16:00 - 25:00',
    coords: { x: 72, y: 38 },
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    summary: '在夢貘宮殿裏發個共感夢！限時尋找密碼逃脫，否則夢境將被夢貘大人吞噬。',
    description: '與親朋好友在夢貘宮殿裏發個共感夢，留意細節，尋找密碼，挑戰一場緊張刺激又神秘莫測的密室逃脫。注意，如果限時之內未能逃出，夢貘大人將會吞噬你的夢境！',
    tags: ['密室逃脫', '夢境解謎', '限時挑戰'],
    fastPass: false
  },
  {
    id: 'att-7',
    name: 'Gravity 極速飄浮之旅',
    category: 'rides',
    categoryName: '精選機動遊戲',
    zone: 'dream_zone',
    zoneName: '夢境與大千世界',
    height: '120厘米或以上',
    hours: '15:30 - 25:30',
    coords: { x: 80, y: 32 },
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    summary: '末日逃生膠囊Gravity！體驗驚心動魄的太空加速與無重力飄浮感。',
    description: '末離之際登上逃生膠囊 Gravity，飄浮到浩瀚太空，少不免要體驗一場驚心動魄的緊急狀況。坐穩，Gravity要加速了！',
    tags: ['太空體驗', '無重力飄浮', '極速加速'],
    fastPass: true
  },
  {
    id: 'att-8',
    name: '歌瑪園X號',
    category: 'rides',
    categoryName: '精選機動遊戲',
    zone: 'underworld',
    zoneName: '陰間部落',
    height: '102厘米或以上',
    hours: '16:00 - 26:00',
    coords: { x: 38, y: 22 },
    image: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=800&q=80',
    summary: '乘坐小船入住失憶者療養院，面對內心恐懼，解開大宅隱藏的最終真相。',
    description: '你乘坐小船，越過河流湖泊，入住這座失憶者療養院。可是陰森的古典大宅內好像隱藏了一些秘密，一些執念，一些......幻像？但別擔心，只需跟著看護小姐的引導，面對你的恐懼，找回你的記憶，發掘歌瑪園的真相。作出你最後的選擇前，好好休息吧。',
    tags: ['暗黑探險', '沉浸式故事', '小船導覽'],
    fastPass: true
  },

  // Experiences & Exhibits
  {
    id: 'exp-1',
    name: '失眠鎮電台直播室',
    category: 'experiences',
    categoryName: '參觀體驗',
    zone: 'logos_main',
    zoneName: '邏各斯市鎮大街',
    height: '任何高度',
    hours: '15:00 - 26:00',
    coords: { x: 48, y: 82 },
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80',
    summary: '現場觀看人氣 DJ 向日葵、Peggy 朱碧麗《失眠藥》、《The Peggy Show》等節目咪後實況！',
    description: '走進你哋嘅失眠鎮電台節目主持人向日葵、Peggy 朱碧麗等人氣 DJ 的錄音室，現場觀看《傻瓜撩秘史》、《The Peggy Show》、《失眠藥》等皇牌電台節目的咪後實況！台主向日葵全天候廣播美好聲音。',
    tags: ['電台直播', 'DJ錄音室', '現場點播'],
    fastPass: false
  },
  {
    id: 'exp-2',
    name: '跳彈床日報報館',
    category: 'experiences',
    categoryName: '參觀體驗',
    zone: 'logos_main',
    zoneName: '邏各斯市鎮大街',
    height: '任何高度',
    hours: '15:00 - 25:00',
    coords: { x: 55, y: 78 },
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80',
    summary: '親自撰寫頭條文章並拍照，現場印製獨一無二的《跳彈床日報》頭版報紙帶回家。',
    description: '不用再羨慕別人，你也可以一嚐登上邏各斯跳彈床日報頭版的滋味！走進記者莉莉的工作場地，親自撰寫頭條文章，拍下照片，即可讓報館職員為你印製一份獨一無二的跳彈床日報，留住美好回憶。',
    tags: ['個人化報紙', '頭條體驗', '紀念品製作'],
    fastPass: false
  },
  {
    id: 'exp-3',
    name: '破涕為笑水族館',
    category: 'experiences',
    categoryName: '參觀體驗',
    zone: 'dream_zone',
    zoneName: '夢境與大千世界',
    height: '任何高度',
    hours: '15:00 - 26:00',
    coords: { x: 82, y: 48 },
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    summary: '全鎮唯一水族館，飼養過千隻會講笑話的蝦！揮揮手即可聽到令人哈哈大笑的笑話。',
    description: '全鎮唯一的水族館，飼養著超過一千隻蝦。只要對蝦揮揮手，這些蝦能夠對你講笑話，保證你笑得哈哈聲！',
    tags: ['會講笑話的蝦', '互動水族', '快樂解壓'],
    fastPass: false
  },

  // Shows & Entertainment
  {
    id: 'show-1',
    name: '光的泳行：高泳行全球首創彎曲光影匯演',
    category: 'shows',
    categoryName: '娛樂表演',
    zone: 'logos_main',
    zoneName: '凹凸凹凸廣場',
    height: '任何高度',
    hours: '26:00 晚間場',
    coords: { x: 50, y: 75 },
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    summary: '由魔法仔高泳行呈獻！以彎曲光線劃破科學裂縫，伴隨廣播劇主題曲的奇幻光影盛宴。',
    description: '誰說光只能直線前進？由魔法仔高泳行全球獨家呈獻，在星空下以彎曲光線劃破科學裂縫，伴隨失眠藥廣播劇主題曲及插曲，上演一場魔術般的奇幻盛宴。演出時長：20分鐘。',
    tags: ['全球首創', '光影匯演', '夜間重頭戲'],
    fastPass: true
  },
  {
    id: 'show-2',
    name: '張日寬大匯演 ft. 光頭校長',
    category: 'shows',
    categoryName: '娛樂表演',
    zone: 'six_degrees',
    zoneName: '六度圈廣場',
    height: '任何高度',
    hours: '16:30, 20:00 (每場60分鐘)',
    coords: { x: 52, y: 52 },
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    summary: '人氣小學老師張日寬公開獻唱！前場更有準張太楊嘉兒「揭尾故」暖場及光頭校長驚喜登場。',
    description: '最受歡迎小學老師張日寬將會在六度圈廣場公開獻唱，讓大中小學生和家長一起透過歌聲感受他的熱情與冷漠。歌單場場不同，保證新鮮！演出開場前更有準張太楊嘉兒小姐親自出馬暖場！',
    tags: ['明星演唱', '揭尾故暖場', 'VIP搖滾區特權'],
    fastPass: false
  },
  {
    id: 'show-3',
    name: 'Peggy美麗動人珍朱歌聲演唱會',
    category: 'shows',
    categoryName: '娛樂表演',
    zone: 'six_degrees',
    zoneName: '碧麗宮城堡',
    height: '任何高度',
    hours: '19:30, 23:30 (每場60分鐘)',
    coords: { x: 56, y: 48 },
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    summary: '人氣女星 Peggy 朱碧麗於碧麗宮獻唱《遊樂三分甜》、《Make My Day》等金曲！',
    description: '人氣女星 Peggy 朱碧麗閃耀登場，於她的專屬城堡碧麗宮為每位 pegpegchu 獻唱《遊樂三分甜》、《Make My Day》、《自信！美麗！傲人！》等經典金曲，每月14日更有特別巡迴會面！',
    tags: ['專屬城堡歌舞', 'Peggy女神', '熱門金曲演繹'],
    fastPass: true
  },
  {
    id: 'show-4',
    name: '百鬼夜行夜間巡遊',
    category: 'shows',
    categoryName: '娛樂表演',
    zone: 'underworld',
    zoneName: '陰間部落',
    height: '任何高度',
    hours: '農曆七月每晚 23:00',
    coords: { x: 40, y: 32 },
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
    summary: '鬼節特備夜間花車巡遊！妖魔鬼怪隨花車勁歌熱舞，現場設自助餐及最佳部落投票。',
    description: '一年一度鬼節特備夜間花車巡遊載譽歸來！一眾妖魔鬼怪將會在部落神明的領導下隨花車出巡，傾盡全力勁歌熱舞。現場更有自助餐及留言板供各位大人寫下感言與投票！',
    tags: ['鬼節限定', '夜間花車巡遊', '現場自助餐'],
    fastPass: false
  },

  // Dining & Shopping
  {
    id: 'dine-1',
    name: '流星堂星星奶專賣店',
    category: 'dining',
    categoryName: '餐飲商店',
    zone: 'logos_main',
    zoneName: '邏各斯市鎮大街',
    height: '任何高度',
    hours: '15:00 - 26:00',
    coords: { x: 45, y: 85 },
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80',
    summary: '失眠鎮招牌飲品！香醇溫潤的星星奶，生日之星更可憑證免費領取乙杯。',
    description: '樂園招牌人氣飲品！嚴選失眠鎮特級星星精華調製，口感滑順充滿星光滋味。生日當天免費贈送乙杯！',
    tags: ['必喝招牌', '生日免費特飲', '甜品飲料'],
    fastPass: false
  },
  {
    id: 'dine-2',
    name: 'Whatever Coffee 咖啡杯小館',
    category: 'dining',
    categoryName: '餐飲商店',
    zone: 'six_degrees',
    zoneName: '六度圈之城',
    height: '任何高度',
    hours: '15:00 - 25:30',
    coords: { x: 60, y: 56 },
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
    summary: '咖啡香氣四溢，配合活潑樂律，品嚐獨特精品咖啡與現烘甜點。',
    description: '在 Whatever Coffee 伴隨活潑旋律，品嚐特調美式與極致拉花咖啡，旋轉 One More Round！',
    tags: ['精品咖啡', '特調飲品', '休閒下午茶'],
    fastPass: false
  },
  {
    id: 'shop-1',
    name: '反斗俠魔法工房',
    category: 'dining',
    categoryName: '餐飲商店',
    zone: 'logos_main',
    zoneName: '邏各斯市鎮大街',
    height: '任何高度',
    hours: '15:00 - 26:00',
    coords: { x: 52, y: 86 },
    image: 'https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?auto=format&fit=crop&w=800&q=80',
    summary: '反斗俠官方周邊總店！獨家發售凹凸凹凸公仔、時間使者法寶槍及會員八折精品。',
    description: '初代反斗俠親自設計的玩具與娛樂周邊！包含凹凸凹凸絨毛玩偶、嚴永牧魔法書、各種夢幻紀念品。會員尊享全單8折優惠！',
    tags: ['周邊精品', '官方旗艦店', '會員8折'],
    fastPass: false
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [viewMode, setViewMode] = useState('map');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  // Ticket calculator state
  const [ticketAdult, setTicketAdult] = useState(1);
  const [ticketChild, setTicketChild] = useState(0);
  const [isStudentDiscount, setIsStudentDiscount] = useState(false);
  const [isFanClub, setIsFanClub] = useState(false);

  // Hotel Onsen builder state
  const [selectedOnsen, setSelectedOnsen] = useState(['智商提升', '美白護膚']);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Filtered attractions based on Category and Search
  const filteredAttractions = useMemo(() => {
    return ATTRACTIONS_DATA.filter(item => {
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.zoneName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const ticketTotal = useMemo(() => {
    if (isFanClub) return 0;
    let base = (ticketAdult * 90.3) + (ticketChild * 903);
    if (isStudentDiscount) base *= 0.8;
    return base.toFixed(1);
  }, [ticketAdult, ticketChild, isStudentDiscount, isFanClub]);

  const toggleOnsen = (item) => {
    if (selectedOnsen.includes(item)) {
      setSelectedOnsen(selectedOnsen.filter(i => i !== item));
    } else {
      setSelectedOnsen([...selectedOnsen, item]);
    }
  };

  return (
    <div className="min-h-screen bg-[#050b18] text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950 flex flex-col relative overflow-x-hidden">
      
      {/* Dynamic Luxury Toast Popup */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0f1d38] border border-amber-400/50 text-amber-100 px-5 py-3.5 rounded-2xl shadow-2xl backdrop-blur-xl flex items-center gap-3 animate-bounce border-l-4 border-l-amber-400">
          <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0" />
          <span className="text-xs md:text-sm font-medium">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* DISNEY ROYAL MIDNIGHT TOP NAVIGATION */}
      <header className="sticky top-0 z-40 bg-[#070e22]/95 backdrop-blur-md border-b border-amber-500/20 shadow-2xl shadow-blue-950/80">
        
        {/* Top Disney Utility Banner */}
        <div className="bg-[#030712] px-4 py-1.5 text-[11px] text-slate-400 border-b border-blue-950 flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1.5 text-amber-300 font-medium">
              <Moon className="w-3.5 h-3.5 text-amber-400" /> 園區開放時間：每日 15:00 - 26:00 (02:00 AM)
            </span>
            <span className="hidden md:inline text-blue-900">|</span>
            <span className="hidden md:inline tracking-wide text-slate-400">失眠鎮邏各斯大娛樂家 · 初代反斗俠旗艦創立</span>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => showToast('歡迎使用邏各斯通行證登入服務！')}
              className="hover:text-amber-300 transition flex items-center gap-1 text-slate-300"
            >
              <User className="w-3.5 h-3.5 text-amber-400" /> 入境會員登入
            </button>
            <span className="text-blue-950">|</span>
            <span className="text-amber-300 font-serif font-bold tracking-wider">繁體中文 (邏各斯)</span>
          </div>
        </div>

        {/* Main Brand & Disney Navigation Header */}
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          
          {/* Logo with Disney Castle Sparkle Feel */}
          <div 
            onClick={() => setActiveTab('home')}
            className="cursor-pointer flex items-center gap-3 group"
          >
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-amber-500 via-amber-300 to-yellow-500 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition duration-300">
              <div className="w-full h-full bg-[#081026] rounded-full flex items-center justify-center border border-amber-300/30">
                <Sparkles className="w-5 h-5 text-amber-300 animate-spin-slow" />
              </div>
            </div>
            <div>
              <div className="text-xl md:text-2xl font-black tracking-widest bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-400 bg-clip-text text-transparent font-serif drop-shadow-sm">
                失眠夜遊樂園
              </div>
              <div className="text-[9px] tracking-[0.25em] text-amber-400/90 uppercase font-sans font-bold">
                Insomnia Night Resort · Logos
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1 font-medium text-sm">
            {[
              { id: 'home', label: '首頁' },
              { id: 'map', label: '樂園地圖', icon: Compass },
              { id: 'attractions', label: '遊樂設施' },
              { id: 'shows', label: '娛樂表演' },
              { id: 'hotel', label: '煙霧溫泉旅館', icon: Hotel },
              { id: 'tickets', label: '門票預訂' },
              { id: 'rules', label: '樂園守則' }
            ].map(tab => {
              const IconComp = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    if (tab.id === 'attractions') setSelectedCategory('all');
                  }}
                  className={`px-3.5 py-2 rounded-xl transition-all duration-300 flex items-center gap-1.5 font-serif tracking-wider ${
                    isActive 
                      ? 'bg-amber-500/15 text-amber-300 font-bold border border-amber-500/30 shadow-inner' 
                      : 'text-slate-300 hover:text-amber-300 hover:bg-blue-950/60'
                  }`}
                >
                  {IconComp && <IconComp className="w-4 h-4 text-amber-400" />}
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Buy Ticket CTA Button */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveTab('tickets')}
              className="bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-serif font-bold px-5 py-2.5 rounded-full shadow-lg shadow-amber-500/25 text-xs md:text-sm transition transform hover:scale-105 flex items-center gap-2 border border-amber-200/50 tracking-wider"
            >
              <Ticket className="w-4 h-4 fill-slate-950" />
              購買樂園門票
            </button>
          </div>
        </div>

        {/* Mobile quick navigation tabs */}
        <div className="lg:hidden flex overflow-x-auto px-4 py-2 bg-[#050b18] border-t border-blue-950 text-xs gap-2 no-scrollbar">
          {[
            { id: 'home', label: '首頁' },
            { id: 'map', label: '樂園地圖' },
            { id: 'attractions', label: '設施' },
            { id: 'shows', label: '表演' },
            { id: 'hotel', label: '溫泉旅館' },
            { id: 'tickets', label: '門票' },
            { id: 'rules', label: '守則' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition text-xs ${
                activeTab === tab.id 
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-bold shadow' 
                  : 'bg-[#0f1a35] text-slate-300 border border-blue-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* MAIN CONTENT REGION */}
      <main className="flex-1">

        {/* ==================== HOME PAGE (ROYAL DISNEY BANNER) ==================== */}
        {activeTab === 'home' && (
          <div>
            <div className="relative h-[520px] md:h-[640px] overflow-hidden bg-[#070e22]">
              <img 
                src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1920&q=80" 
                alt="失眠夜樂園城堡" 
                className="w-full h-full object-cover brightness-60 scale-105 filter saturate-120"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050b18] via-[#050b18]/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050b18]/80 via-transparent to-[#050b18]/80" />

              {/* Floating Hero Content */}
              <div className="absolute inset-0 flex items-center justify-center text-center px-4">
                <div className="max-w-4xl space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/40 text-amber-300 text-xs md:text-sm font-medium backdrop-blur-md shadow-lg">
                    <Sparkles className="w-4 h-4 text-amber-400" /> 歡迎來到邏各斯 · 夢境與奇幻交織的星光大會
                  </div>
                  
                  <h1 className="text-3xl md:text-6xl font-black text-white tracking-widest font-serif leading-tight text-shadow-xl">
                    失眠夜遊樂園<br />
                    <span className="text-lg md:text-2xl font-normal text-amber-200/90 mt-3 block font-sans tracking-normal italic">
                      「我嘅目標係設計出世界上最偉大嘅遊戲！」
                    </span>
                  </h1>
                  
                  <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-light">
                    初代反斗俠於鎮民大會提出快樂生活方案。邀請你用自己雙腳遊歷異世界，遇見大千世界中探索的朋友，留下難忘回憶！
                  </p>
                  
                  <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                    <button 
                      onClick={() => setActiveTab('map')}
                      className="bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-serif font-bold px-8 py-3.5 rounded-full text-base transition duration-300 shadow-2xl shadow-amber-500/30 flex items-center gap-2 border border-amber-200/60"
                    >
                      <Compass className="w-5 h-5 text-slate-950" /> 探索尊榮互動地圖
                    </button>
                    <button 
                      onClick={() => setActiveTab('attractions')}
                      className="bg-[#0e1b38]/80 hover:bg-[#14264f] text-amber-200 border border-amber-500/30 px-8 py-3.5 rounded-full text-base backdrop-blur-md transition flex items-center gap-2 font-serif"
                    >
                      瀏覽所有設施與節目
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Info Ticker Bar */}
              <div className="absolute bottom-0 inset-x-0 bg-[#070e22]/90 backdrop-blur-md border-t border-amber-500/20 py-3 px-6 hidden md:block">
                <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-slate-300">
                  <div className="flex items-center space-x-8">
                    <span className="flex items-center gap-2 text-amber-300 font-serif font-bold">
                      <Clock className="w-4 h-4 text-amber-400" /> 今日營運時間：15:00 - 26:00
                    </span>
                    <span className="flex items-center gap-2">
                      <Music className="w-4 h-4 text-purple-400" /> 夜間重頭戲：光的泳行 彎曲光影匯演 (26:00)
                    </span>
                    <span className="flex items-center gap-2">
                      <Bus className="w-4 h-4 text-cyan-400" /> 邏各斯飄飄鐵路 每20分鐘班次
                    </span>
                  </div>
                  <button onClick={() => setActiveTab('rules')} className="text-amber-300 hover:underline flex items-center gap-1 font-serif">
                    樂園守則與安全須知 <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Featured Attractions Grid (Disney Style Cards) */}
            <div className="max-w-7xl mx-auto px-4 py-16 space-y-12">
              <div className="text-center space-y-3">
                <div className="text-amber-400 text-xs tracking-widest uppercase font-bold font-sans">
                  DISNEY-STYLE INSOMNIA HIGHLIGHTS
                </div>
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-amber-100 tracking-wide">
                  失眠夜精選熱門設施
                </h2>
                <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto" />
                <p className="text-slate-400 text-sm max-w-xl mx-auto font-light">
                  點擊任何設施卡片，即刻查看營運時間、身高限制及失眠鎮歷史簡介
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {ATTRACTIONS_DATA.slice(0, 6).map(att => (
                  <div 
                    key={att.id}
                    onClick={() => setSelectedAttraction(att)}
                    className="group bg-[#0a1329] rounded-3xl overflow-hidden border border-amber-500/20 hover:border-amber-400/60 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col relative"
                  >
                    {att.fastPass && (
                      <div className="absolute top-3 right-3 z-10 bg-amber-400 text-slate-950 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow flex items-center gap-1">
                        <Zap className="w-3 h-3 fill-slate-950" /> 快證預約
                      </div>
                    )}
                    <div className="relative h-52 overflow-hidden">
                      <img 
                        src={att.image} 
                        alt={att.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-700 brightness-90" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1329] via-transparent to-transparent opacity-80" />
                      <div className="absolute bottom-3 left-4 bg-[#070e22]/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-serif font-bold text-amber-300 border border-amber-500/30">
                        {att.zoneName}
                      </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="font-serif font-bold text-xl text-white group-hover:text-amber-300 transition">
                          {att.name}
                        </h3>
                        <p className="text-slate-400 text-xs line-clamp-2 mt-2 leading-relaxed">
                          {att.summary}
                        </p>
                      </div>
                      
                      <div className="pt-4 border-t border-blue-950 flex items-center justify-between text-xs text-slate-400">
                        <span className="flex items-center gap-1.5 text-amber-200/80">
                          <Clock className="w-3.5 h-3.5 text-amber-400" /> {att.hours}
                        </span>
                        <span className="text-amber-400 font-serif font-bold group-hover:translate-x-1 transition flex items-center gap-0.5">
                          了解詳情 <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Royal Privilege VIP Banner */}
              <div className="bg-gradient-to-r from-[#121c38] via-[#0c1630] to-[#141b36] border border-amber-500/30 rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
                <div className="space-y-4 max-w-xl">
                  <span className="text-xs uppercase tracking-widest text-amber-400 font-bold font-sans flex items-center gap-1">
                    <Award className="w-4 h-4 text-amber-400" /> 尊享特別禮遇 · 生日之星
                  </span>
                  <h3 className="text-2xl md:text-4xl font-serif font-bold text-amber-100">
                    當日壽星入園，解鎖專屬異世界祝福！
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed font-light">
                    憑身份證明文件領取生日徽章，即享免費失眠鎮招牌星星奶乙杯、免費租借凹凸凹凸乙隻、歌瑪園特快通行證、向日葵電台點歌及北極光肖像投映！
                  </p>
                  <button 
                    onClick={() => setActiveTab('tickets')}
                    className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-serif font-bold px-7 py-3 rounded-full text-sm transition shadow-lg border border-amber-200/50"
                  >
                    查看會員與生日特別尊享禮遇
                  </button>
                </div>
                
                <div className="w-full md:w-80 h-52 rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl flex-shrink-0 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80" 
                    alt="星星奶與特權" 
                    className="w-full h-full object-cover brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1329] via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 bg-amber-400 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded">
                    招牌星星奶
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== PARK INTERACTIVE MAP (NAVY DISNEY DESIGN) ==================== */}
        {activeTab === 'map' && (
          <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
            <div className="bg-[#0a1329] p-6 rounded-3xl border border-amber-500/20 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xl">
              <div>
                <h1 className="text-2xl md:text-3xl font-serif font-bold text-amber-200 flex items-center gap-2.5">
                  <Compass className="w-7 h-7 text-amber-400" />
                  失眠夜遊樂園 尊榮互動地圖
                </h1>
                <p className="text-xs text-slate-400 mt-1 font-light">
                  點擊地圖上的星號地標，即刻預覽景點故事、營運時間及現場設施詳情
                </p>
              </div>

              {/* View Switcher (Matches HKDL Screenshot '列表顯示' Layout) */}
              <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                <div className="bg-[#050b18] p-1.5 rounded-2xl border border-blue-950 flex items-center">
                  <button 
                    onClick={() => setViewMode('map')}
                    className={`px-4 py-2 rounded-xl text-xs font-serif transition flex items-center gap-1.5 ${
                      viewMode === 'map' 
                        ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-bold shadow' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" /> 地圖視圖
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`px-4 py-2 rounded-xl text-xs font-serif transition flex items-center gap-1.5 ${
                      viewMode === 'list' 
                        ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-bold shadow' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" /> 列表顯示
                  </button>
                </div>
              </div>
            </div>

            {/* Category Filter Badges */}
            <div className="flex items-center gap-2.5 overflow-x-auto pb-2 no-scrollbar text-xs">
              {[
                { id: 'all', label: `全部景點 (${ATTRACTIONS_DATA.length})` },
                { id: 'rides', label: '🎢 機動遊戲' },
                { id: 'shows', label: '🎭 娛樂表演' },
                { id: 'experiences', label: '🎪 參觀體驗' },
                { id: 'dining', label: '🍽️ 餐飲商店' }
              ].map(cat => (
                <button 
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition border text-xs font-medium ${
                    selectedCategory === cat.id 
                      ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold shadow' 
                      : 'bg-[#0a1329] text-slate-300 border-blue-950 hover:border-amber-500/40'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* MAP GRAPHICAL CANVAS VIEW */}
            {viewMode === 'map' && (
              <div className="relative w-full h-[540px] md:h-[700px] bg-[#070f24] rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl">
                <svg className="w-full h-full object-cover" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="disneyBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#040914" />
                      <stop offset="50%" stopColor="#0a142c" />
                      <stop offset="100%" stopColor="#060c1d" />
                    </linearGradient>
                    <pattern id="disneyGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#132448" strokeWidth="0.25" />
                    </pattern>
                  </defs>
                  
                  <rect width="100" height="100" fill="url(#disneyBgGrad)" />
                  <rect width="100" height="100" fill="url(#disneyGrid)" />

                  {/* Water & Park Features */}
                  <path d="M 0,25 Q 25,30 45,18 T 80,12 T 100,28 L 100,0 L 0,0 Z" fill="#0284c7" opacity="0.2" />
                  <path d="M 10,85 Q 30,65 50,80 T 90,65" fill="none" stroke="#38bdf8" strokeWidth="2.5" opacity="0.3" />

                  {/* Park Zones Styling */}
                  {PARK_ZONES.map(z => (
                    <g key={z.id}>
                      <circle cx={z.pos.x} cy={z.pos.y} r="18" fill="white" opacity="0.02" />
                      <circle cx={z.pos.x} cy={z.pos.y} r="14" fill="none" stroke="#fbbf24" strokeWidth="0.3" strokeDasharray="1,1" opacity="0.8" />
                      <text x={z.pos.x} y={z.pos.y - 13} textAnchor="middle" fill="#fef3c7" fontSize="2.8" fontWeight="bold" fontFamily="serif">
                        {z.name}
                      </text>
                    </g>
                  ))}

                  {/* Railroad Tracks */}
                  <path d="M 48,85 Q 15,80 15,40 T 40,20 T 80,35 T 80,75 Z" fill="none" stroke="#fbbf24" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.7" />
                </svg>

                {/* Interactive Map Pins */}
                {filteredAttractions.map((att) => (
                  <div
                    key={att.id}
                    onClick={() => setSelectedAttraction(att)}
                    style={{ left: `${att.coords.x}%`, top: `${att.coords.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10"
                  >
                    <div className="relative flex flex-col items-center">
                      <div className="w-9 h-9 rounded-full bg-[#070e22] border-2 border-amber-400 shadow-xl shadow-amber-500/40 flex items-center justify-center transform group-hover:scale-125 transition duration-300">
                        <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
                      </div>
                      <div className="w-2.5 h-2.5 bg-amber-400 rotate-45 -mt-1 shadow" />
                      
                      {/* Name Label Tooltip */}
                      <div className="opacity-0 group-hover:opacity-100 transition duration-200 pointer-events-none absolute bottom-11 bg-[#040914]/95 text-amber-200 border border-amber-400/50 text-[11px] font-serif font-bold px-3 py-1.5 rounded-xl whitespace-nowrap shadow-2xl z-20">
                        {att.name}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Map Bottom Indicator */}
                <div className="absolute bottom-4 left-4 bg-[#050b18]/90 backdrop-blur-md border border-amber-500/30 px-4 py-2.5 rounded-2xl text-xs text-slate-200 flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                  點擊地圖上的金星 Pin 圖標查看設施故事與營運狀態
                </div>
              </div>
            )}

            {/* LIST VIEW (HKDL STYLE) */}
            {viewMode === 'list' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAttractions.map(att => (
                  <div 
                    key={att.id}
                    onClick={() => setSelectedAttraction(att)}
                    className="bg-[#0a1329] rounded-2xl overflow-hidden border border-amber-500/20 hover:border-amber-400/60 transition duration-300 cursor-pointer shadow-lg p-4 flex gap-4 items-center group"
                  >
                    <img 
                      src={att.image} 
                      alt={att.name} 
                      className="w-24 h-24 rounded-xl object-cover flex-shrink-0 group-hover:scale-105 transition duration-300"
                    />
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        {att.zoneName}
                      </span>
                      <h3 className="font-serif font-bold text-white text-base truncate group-hover:text-amber-300 transition">
                        {att.name}
                      </h3>
                      <p className="text-xs text-amber-200/80 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-400" /> {att.hours}
                      </p>
                      <p className="text-xs text-slate-400 truncate font-light">
                        {att.summary}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ==================== ATTRACTIONS CATALOGUE ==================== */}
        {activeTab === 'attractions' && (
          <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
            <div className="flex flex-col md:flex-row items-md-center justify-between gap-4 border-b border-blue-950 pb-6">
              <div>
                <h1 className="text-3xl font-serif font-bold text-amber-200">
                  失眠夜遊樂設施與主題區域
                </h1>
                <p className="text-slate-400 text-sm mt-1 font-light">
                  探索邏各斯異世界中的機動遊戲、虛擬實境與探險之旅
                </p>
              </div>

              {/* Search input */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-3.5" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜尋設施、遊戲或區域..."
                  className="w-full bg-[#0a1329] border border-amber-500/30 rounded-2xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAttractions.filter(a => a.category === 'rides' || a.category === 'experiences').map(att => (
                <div 
                  key={att.id}
                  onClick={() => setSelectedAttraction(att)}
                  className="bg-[#0a1329] rounded-3xl overflow-hidden border border-amber-500/20 hover:border-amber-400/60 transition duration-300 cursor-pointer shadow-xl group flex flex-col"
                >
                  <div className="h-52 relative overflow-hidden">
                    <img src={att.image} alt={att.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                    <div className="absolute top-3 left-3 bg-[#050b18]/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-300 border border-amber-400/30">
                      {att.height}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="text-xs text-amber-400 font-serif font-medium mb-1">{att.zoneName}</div>
                      <h3 className="font-serif font-bold text-xl text-white group-hover:text-amber-300 transition">{att.name}</h3>
                      <p className="text-slate-400 text-xs mt-2 line-clamp-3 leading-relaxed font-light">{att.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {att.tags.map((t, idx) => (
                        <span key={idx} className="bg-[#050b18] text-slate-300 text-[10px] px-2.5 py-1 rounded-lg border border-blue-900">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== SHOWS & ENTERTAINMENT ==================== */}
        {activeTab === 'shows' && (
          <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
            <div className="border-b border-blue-950 pb-6">
              <h1 className="text-3xl font-serif font-bold text-amber-200">
                娛樂表演與巡遊時間表
              </h1>
              <p className="text-slate-400 text-sm mt-1 font-light">
                含張日寬大匯演、Peggy演唱會、光的泳行彎曲光影匯演及鬼節百鬼夜行
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {ATTRACTIONS_DATA.filter(a => a.category === 'shows').map(show => (
                <div key={show.id} className="bg-[#0a1329] border border-amber-500/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
                  <img src={show.image} alt={show.name} className="w-full md:w-1/2 h-60 md:h-auto object-cover" />
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="inline-block bg-purple-500/15 text-amber-300 border border-purple-500/30 text-xs px-3 py-1 rounded-full font-serif font-bold mb-2">
                        {show.zoneName}
                      </span>
                      <h3 className="text-xl font-serif font-bold text-white">{show.name}</h3>
                      <p className="text-slate-400 text-xs mt-2 leading-relaxed font-light">{show.description}</p>
                    </div>
                    <div className="space-y-2 pt-4 border-t border-blue-950 text-xs text-slate-300">
                      <div className="flex items-center gap-2 text-amber-300 font-serif font-bold">
                        <Clock className="w-4 h-4 text-amber-400" /> 演出時間：{show.hours}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== LOGOS SMOKE ONSEN HOTEL (DISNEY SPA SUITE) ==================== */}
        {activeTab === 'hotel' && (
          <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
            <div className="relative rounded-3xl overflow-hidden bg-[#0a1329] h-88 flex items-center justify-center p-8 border border-amber-500/30 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80" 
                alt="邏各斯煙霧溫泉旅館" 
                className="absolute inset-0 w-full h-full object-cover brightness-40"
              />
              <div className="relative z-10 text-center space-y-4 max-w-2xl">
                <span className="bg-amber-400 text-slate-950 px-4 py-1 rounded-full text-xs font-serif font-bold uppercase tracking-widest shadow">
                  相傳亞利麻女神亦流連忘返
                </span>
                <h1 className="text-3xl md:text-5xl font-serif font-bold text-amber-100">
                  邏各斯 煙霧溫泉旅館
                </h1>
                <p className="text-slate-200 text-sm leading-relaxed font-light">
                  一百種不同的氣味和質感、全天然無雜質、充滿營養的煙霧。由邏各斯最壯麗的山——轟隆轟隆山湧出，渾然天成。
                </p>
              </div>
            </div>

            {/* Onsen Builder Interactive Tool */}
            <div className="bg-[#0a1329] border border-amber-500/20 rounded-3xl p-6 md:p-10 space-y-6 shadow-2xl">
              <div className="border-b border-blue-950 pb-4">
                <h2 className="text-2xl font-serif font-bold text-amber-200 flex items-center gap-2.5">
                  <Sparkles className="w-6 h-6 text-amber-400" />
                  自選溫泉煙霧配方 (Disney Signature Spa)
                </h2>
                <p className="text-slate-400 text-xs mt-1 font-light">
                  過百種名貴材料任君選擇，點擊調配你的專屬異世界溫泉療程：
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: '智商提升', desc: '失眠鎮珍奇之最「梁子力獸」眼淚提煉靈丹', color: 'border-blue-500/40 bg-[#051126]' },
                  { name: '跳唱進步神速', desc: '失眠鎮氣溫最低地區搜集的「天山鍾雪蓮」', color: 'border-purple-500/40 bg-[#0f0e26]' },
                  { name: '美白護膚', desc: '最清澈山水蒸餾出來的「靈魂之水」白色煙霧', color: 'border-emerald-500/40 bg-[#081e21]' },
                  { name: '忘記煩惱', desc: '士多啤梨冬甩蒸發出的香噴噴粉紅色煙霧', color: 'border-pink-500/40 bg-[#21091b]' }
                ].map(onsen => {
                  const isSelected = selectedOnsen.includes(onsen.name);
                  return (
                    <div 
                      key={onsen.name}
                      onClick={() => toggleOnsen(onsen.name)}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col justify-between space-y-3 ${onsen.color} ${
                        isSelected ? 'ring-2 ring-amber-400 border-amber-400 shadow-xl' : 'opacity-75 hover:opacity-100'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-serif font-bold text-white text-base">{onsen.name}</h3>
                          {isSelected && <Check className="w-4 h-4 text-amber-400" />}
                        </div>
                        <p className="text-slate-300 text-xs leading-relaxed font-light">{onsen.desc}</p>
                      </div>
                      <div className="text-[11px] text-amber-300 font-serif font-bold">
                        {isSelected ? '✓ 已加入溫泉配方' : '+ 點擊選購'}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-[#050b18] p-5 rounded-2xl border border-blue-950 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-300">
                <div>
                  已選專屬配方：<span className="text-amber-300 font-serif font-bold">{selectedOnsen.join(' + ') || '無'}</span>
                </div>
                <button 
                  onClick={() => showToast(`已為閣下預約「邏各斯煙霧溫泉」！含 ${selectedOnsen.join(', ')} 特調。`)}
                  className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-serif font-bold px-6 py-2.5 rounded-full transition shadow-lg border border-amber-200/50"
                >
                  立即預訂溫泉套房 (生日月8折)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TICKET CALCULATOR ==================== */}
        {activeTab === 'tickets' && (
          <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
            <div className="text-center space-y-2">
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-amber-200">
                失眠夜遊樂園 門票與會員預訂
              </h1>
              <p className="text-slate-400 text-sm font-light">
                請選擇門票種類與優惠身分，系統將自動計算最佳入場票價
              </p>
            </div>

            <div className="bg-[#0a1329] border border-amber-500/20 rounded-3xl p-6 md:p-10 space-y-8 shadow-2xl">
              <div className="space-y-4">
                {/* Adult ticket */}
                <div className="flex items-center justify-between p-5 bg-[#050b18] rounded-2xl border border-blue-950">
                  <div>
                    <h3 className="font-serif font-bold text-white text-base">成人標準門票 (12歲或以上)</h3>
                    <p className="text-slate-400 text-xs font-light">單日無限次暢玩所有機動遊戲及展覽</p>
                  </div>
                  <div className="flex items-center gap-5">
                    <span className="text-amber-300 font-serif font-bold text-xl">$90.3</span>
                    <div className="flex items-center gap-2 bg-[#0a1329] rounded-xl p-1 border border-blue-900">
                      <button onClick={() => setTicketAdult(Math.max(0, ticketAdult - 1))} className="w-8 h-8 bg-blue-950 rounded-lg text-white font-bold hover:bg-amber-400 hover:text-slate-950 transition">-</button>
                      <span className="w-6 text-center text-sm font-bold">{ticketAdult}</span>
                      <button onClick={() => setTicketAdult(ticketAdult + 1)} className="w-8 h-8 bg-blue-950 rounded-lg text-white font-bold hover:bg-amber-400 hover:text-slate-950 transition">+</button>
                    </div>
                  </div>
                </div>

                {/* Child ticket */}
                <div className="flex items-center justify-between p-5 bg-[#050b18] rounded-2xl border border-blue-950">
                  <div>
                    <h3 className="font-serif font-bold text-white text-base">兒童門票 (12歲以下)</h3>
                    <p className="text-slate-400 text-xs font-light">特別特權價 $903 (尊貴特別版門票)</p>
                  </div>
                  <div className="flex items-center gap-5">
                    <span className="text-amber-300 font-serif font-bold text-xl">$903.0</span>
                    <div className="flex items-center gap-2 bg-[#0a1329] rounded-xl p-1 border border-blue-900">
                      <button onClick={() => setTicketChild(Math.max(0, ticketChild - 1))} className="w-8 h-8 bg-blue-950 rounded-lg text-white font-bold hover:bg-amber-400 hover:text-slate-950 transition">-</button>
                      <span className="w-6 text-center text-sm font-bold">{ticketChild}</span>
                      <button onClick={() => setTicketChild(ticketChild + 1)} className="w-8 h-8 bg-blue-950 rounded-lg text-white font-bold hover:bg-amber-400 hover:text-slate-950 transition">+</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Special Discounts */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-serif font-bold uppercase tracking-wider text-amber-400">專屬身分折扣優惠</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <label className="flex items-center gap-3 p-4 bg-[#050b18] rounded-2xl border border-blue-950 cursor-pointer hover:border-amber-500/40 transition">
                    <input 
                      type="checkbox" 
                      checked={isStudentDiscount} 
                      onChange={(e) => setIsStudentDiscount(e.target.checked)}
                      className="w-4 h-4 accent-amber-400 rounded" 
                    />
                    <div>
                      <div className="font-serif font-bold text-white">聖邏各斯中學 8折優惠</div>
                      <div className="text-slate-400 text-[11px] font-light">適用於學生、教職員及校友</div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 bg-[#050b18] rounded-2xl border border-blue-950 cursor-pointer hover:border-amber-500/40 transition">
                    <input 
                      type="checkbox" 
                      checked={isFanClub} 
                      onChange={(e) => setIsFanClub(e.target.checked)}
                      className="w-4 h-4 accent-amber-400 rounded" 
                    />
                    <div>
                      <div className="font-serif font-bold text-white">Superstar 張sir 寬寬後援會</div>
                      <div className="text-amber-400 text-[11px] font-light">免費入場（入寬仔數）+ VIP搖滾區</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Checkout Calculation */}
              <div className="pt-6 border-t border-blue-950 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-400 block font-light">應付總金額：</span>
                  <span className="text-4xl font-black text-amber-300 font-serif">
                    HK${ticketTotal}
                  </span>
                </div>
                <button 
                  onClick={() => showToast(`門票預訂成功！總金額: HK$${ticketTotal}。歡迎來訪！`)}
                  className="w-full md:w-auto bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-serif font-bold px-10 py-4 rounded-full shadow-2xl transition transform hover:scale-105 border border-amber-200/50"
                >
                  確認並完成預訂
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== PARK RULES & SERVICES ==================== */}
        {activeTab === 'rules' && (
          <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
            <div className="border-b border-blue-950 pb-4">
              <h1 className="text-3xl font-serif font-bold text-amber-200">
                樂園守則與遊牧人服務
              </h1>
              <p className="text-slate-400 text-sm mt-1 font-light">
                為保障所有遊牧人安全與秩序，請嚴格遵守以下規則
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: '紫沙與石頭管制', content: '紫沙為管制物品，嚴禁觸碰或攜離園區。為確保閣下人身安全，請勿執拾任何石頭。', icon: ShieldAlert, color: 'text-amber-400' },
                { title: '禮貌對待演藝人員', content: '嚴禁對演藝人員（主要是 Peggy）作出批評、嘲笑、侵犯界線等無禮行徑。', icon: Heart, color: 'text-pink-400' },
                { title: '青燈大人巡邏與閃光燈', content: '青燈大人每日不定時於陰間巡邏，如遊牧人被目擊使用電話、相機閃光燈等發光裝置，將即時判入陰間監獄十分鐘。', icon: Moon, color: 'text-indigo-400' },
                { title: 'DIDISAN 緊急呼救', content: '如遇上危險，請原地大叫「DIDISAN!!!」，執法人員將立即到場支援。', icon: PhoneCall, color: 'text-rose-400' }
              ].map((rule, idx) => {
                const IconComponent = rule.icon;
                return (
                  <div key={idx} className="bg-[#0a1329] p-6 rounded-3xl border border-amber-500/20 space-y-3 shadow-xl">
                    <div className="flex items-center gap-2.5">
                      <IconComponent className={`w-5 h-5 ${rule.color}`} />
                      <h3 className="font-serif font-bold text-white text-base">{rule.title}</h3>
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed font-light">{rule.content}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </main>

      {/* ATTRACTION DETAIL MODAL (Matching HKDL Disney Popup Layout) */}
      {selectedAttraction && (
        <div className="fixed inset-0 z-50 bg-[#02050c]/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0a1329] border border-amber-500/30 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in fade-in duration-200">
            
            <button 
              onClick={() => setSelectedAttraction(null)}
              className="absolute top-4 right-4 z-10 bg-[#050b18]/80 hover:bg-[#0a1329] text-white p-2 rounded-full border border-amber-500/30 transition"
            >
              <X className="w-5 h-5 text-amber-300" />
            </button>

            <div className="relative h-64 md:h-72">
              <img 
                src={selectedAttraction.image} 
                alt={selectedAttraction.name} 
                className="w-full h-full object-cover brightness-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1329] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-6">
                <span className="bg-amber-400 text-slate-950 font-serif font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                  {selectedAttraction.categoryName} · {selectedAttraction.zoneName}
                </span>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mt-1.5">
                  {selectedAttraction.name}
                </h2>
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-6 text-sm">
              <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300 bg-[#050b18] p-4 rounded-2xl border border-blue-950">
                <div>
                  <span className="text-slate-500 block font-light">身高要求</span>
                  <span className="font-serif font-bold text-amber-300">{selectedAttraction.height}</span>
                </div>
                <div className="w-px h-8 bg-blue-950" />
                <div>
                  <span className="text-slate-500 block font-light">今日營運時間</span>
                  <span className="font-serif font-bold text-amber-300">{selectedAttraction.hours}</span>
                </div>
                <div className="w-px h-8 bg-blue-950" />
                <div>
                  <span className="text-slate-500 block font-light">所屬園區</span>
                  <span className="font-serif font-bold text-amber-300">{selectedAttraction.zoneName}</span>
                </div>
              </div>

              <div className="space-y-3 leading-relaxed text-slate-300">
                <h3 className="font-serif font-bold text-lg text-amber-200">景點歷史與介紹</h3>
                <p className="whitespace-pre-line text-xs md:text-sm font-light leading-relaxed">{selectedAttraction.description}</p>
              </div>

              <div className="pt-4 border-t border-blue-950 flex items-center justify-between">
                <button 
                  onClick={() => {
                    showToast(`已成功將「${selectedAttraction.name}」加入你的行程安排！`);
                    setSelectedAttraction(null);
                  }}
                  className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-serif font-bold px-6 py-2.5 rounded-full text-xs transition shadow-lg border border-amber-200/50"
                >
                  + 加入我的行程
                </button>
                <button 
                  onClick={() => setSelectedAttraction(null)}
                  className="text-slate-400 hover:text-white text-xs font-serif"
                >
                  關閉視窗
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-[#030712] border-t border-blue-950 py-12 px-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto space-y-6 text-center">
          <div className="flex items-center justify-center gap-2 text-amber-300 font-serif text-lg font-bold">
            <Sparkles className="w-5 h-5 text-amber-400" /> 失眠夜遊樂園 Insomnia Night Resort · Logos
          </div>
          <p className="max-w-xl mx-auto font-light text-slate-400">
            © 邏各斯大娛樂家初代反斗俠版權所有
          </p>
          <div className="flex justify-center space-x-6 text-slate-400 font-serif">
            <button onClick={() => setActiveTab('rules')} className="hover:text-amber-300">使用條款</button>
            <button onClick={() => setActiveTab('rules')} className="hover:text-amber-300">樂園守則</button>
            <button onClick={() => setActiveTab('tickets')} className="hover:text-amber-300">門票條款</button>
            <button onClick={() => setActiveTab('hotel')} className="hover:text-amber-300">煙霧溫泉指南</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
