import React, { useState, useMemo } from 'react';
import { 
  Search, MapPin, Ticket, Clock, Info, Navigation, Star, 
  Sparkles, Coffee, Utensils, ShoppingBag, Hotel, ShieldAlert, 
  Gift, Heart, ChevronRight, X, Layers, SlidersHorizontal, 
  Music, Tv, Bus, Calendar, User, PhoneCall, Moon, Compass, Check
} from 'lucide-react';

// --- DATA DEFINITION FROM WORD DOC ---
const PARK_ZONES = [
  { id: 'logos_main', name: '邏各斯市鎮大街', color: 'bg-amber-500', pos: { x: 50, y: 80 } },
  { id: 'six_degrees', name: '六度圈之城', color: 'bg-purple-500', pos: { x: 52, y: 55 } },
  { id: 'underworld', name: '陰間部落', color: 'bg-indigo-600', pos: { x: 45, y: 30 } },
  { id: 'ice_snow', name: '邏各斯冰雪樂園', color: 'bg-cyan-400', pos: { x: 22, y: 35 } },
  { id: 'dream_zone', name: '夢境與大千世界', color: 'bg-emerald-500', pos: { x: 75, y: 40 } },
  { id: 'school_zone', name: '聖邏各斯中學區', color: 'bg-rose-500', pos: { x: 78, y: 70 } }
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
    tags: ['VR體驗', '時空穿梭', '故事導覽']
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
    tags: ['雪橇過山車', '極速刺激', '雪國景觀']
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
    tags: ['豪宅巡禮', '自動代步車', '家傳之寶']
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
    tags: ['妖怪旋轉木馬', '親子同樂', '陰間獨家音樂']
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
    tags: ['互動射擊', '時間冒險', '拯救任務']
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
    tags: ['密室逃脫', '夢境解謎', '限時挑戰']
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
    tags: ['太空體驗', '無重力飄浮', '極速加速']
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
    tags: ['暗黑探險', '沉浸式故事', '小船導覽']
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
    tags: ['電台直播', 'DJ錄音室', '枕頭樹公園現場點播']
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
    tags: ['個人化報紙', '頭條體驗', '紀念品製作']
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
    summary: '全鎮唯一水族館，飼養過千隻會講笑話的蝦！揮揮手即可聽到令人哈哈大效的笑話。',
    description: '全鎮唯一的水族館，飼養著超過一千隻蝦。只要對蝦揮揮手，這些蝦能夠對你講笑話，保證你笑得哈哈聲！',
    tags: ['會講笑話的蝦', '互動水族', '快樂解壓']
  },
  {
    id: 'exp-4',
    name: '聖邏各斯紀念中學校園祭市集',
    category: 'experiences',
    categoryName: '參觀體驗',
    zone: 'school_zone',
    zoneName: '聖邏各斯中學區',
    height: '任何高度',
    hours: '15:00 - 24:00',
    coords: { x: 78, y: 72 },
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    summary: '宇宙頂尖中學的校園祭！體驗學生精心準備的攤位遊戲、小食檔與才藝表演。',
    description: '聖邏各斯紀念中學的學生出盡渾身解數，在學校操場準備了各種攤位遊戲、小食檔、才藝表演，務求每個訪客都感到賓至如歸。學校擁有宇宙一流實驗室與師資力量，歡迎報考！',
    tags: ['校園攤位', '獨家小食', '學生才藝展覽']
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
    tags: ['全球首創', '光影匯演', '夜間重頭戲']
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
    tags: ['明星演唱', '揭尾故暖場', 'VIP搖滾區特權']
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
    tags: ['專屬城堡歌舞', 'Peggy女神', '熱門金曲演繹']
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
    tags: ['鬼節限定', '夜間花車巡遊', '現場自助餐']
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
    tags: ['必喝招牌', '生日免費特飲', '甜品飲料']
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
    tags: ['精品咖啡', '特調飲品', '休閒下午茶']
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
    tags: ['周邊精品', '官方旗艦店', '會員8折']
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // home, map, attractions, shows, hotel, tickets, rules
  const [viewMode, setViewMode] = useState('map'); // 'map' or 'list'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Ticket calculator state
  const [ticketAdult, setTicketAdult] = useState(1);
  const [ticketChild, setTicketChild] = useState(0);
  const [isStudentDiscount, setIsStudentDiscount] = useState(false);
  const [isFanClub, setIsFanClub] = useState(false);

  // Hotel Onsen builder state
  const [selectedOnsen, setSelectedOnsen] = useState(['智商提升', '美白護膚']);

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

  // Ticket total calculation
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
    <div className="min-h-screen bg-[#070B14] text-slate-100 font-sans selection:bg-violet-500/40 selection:text-white">
      
      {/* 1. TOP NAVIGATION BAR — Night-dream redesign */}
      <header className="sticky top-0 z-40 bg-[#0A0F1C]/90 backdrop-blur-xl border-b border-violet-500/20 shadow-[0_4px_30px_rgba(139,92,246,0.08)]">
        {/* Top utility bar */}
        <div className="bg-[#050810] px-4 py-1.5 text-xs text-slate-400 border-b border-violet-900/30 flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1.5 text-cyan-300/90">
              <Moon className="w-3.5 h-3.5" /> 樂園開放時間：每日 15:00 - 26:00 (02:00 AM)
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline text-slate-500">失眠鎮邏各斯大娛樂家 · 初代反斗俠創立</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="hover:text-cyan-300 transition flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" /> 登入 / 入境登記
            </button>
            <span className="text-slate-700">|</span>
            <span className="text-violet-300/90 font-medium">繁體中文 (邏各斯語)</span>
          </div>
        </div>

        {/* Main Header Menu */}
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('home')}
            className="cursor-pointer flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 p-[2px] shadow-lg shadow-violet-500/30 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#070B14] rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-300" />
              </div>
            </div>
            <div>
              <div className="text-xl md:text-2xl font-black tracking-wider bg-gradient-to-r from-violet-200 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent font-serif">
                失眠夜遊樂園
              </div>
              <div className="text-[10px] tracking-[0.2em] text-violet-400/70 uppercase font-sans">
                Philosomnia Park
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 font-medium text-sm">
            <button 
              onClick={() => setActiveTab('home')}
              className={`px-3.5 py-2 rounded-xl transition ${activeTab === 'home' ? 'bg-violet-500/20 text-violet-200 font-bold' : 'text-slate-400 hover:text-cyan-300 hover:bg-violet-950/40'}`}
            >
              首頁
            </button>
            <button 
              onClick={() => setActiveTab('map')}
              className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 ${activeTab === 'map' ? 'bg-violet-500/20 text-violet-200 font-bold' : 'text-slate-400 hover:text-cyan-300 hover:bg-violet-950/40'}`}
            >
              <Compass className="w-4 h-4 text-cyan-400" />
              樂園地圖
            </button>
            <button 
              onClick={() => { setActiveTab('attractions'); setSelectedCategory('all'); }}
              className={`px-3.5 py-2 rounded-xl transition ${activeTab === 'attractions' ? 'bg-violet-500/20 text-violet-200 font-bold' : 'text-slate-400 hover:text-cyan-300 hover:bg-violet-950/40'}`}
            >
              遊樂設施
            </button>
            <button 
              onClick={() => setActiveTab('shows')}
              className={`px-3.5 py-2 rounded-xl transition ${activeTab === 'shows' ? 'bg-violet-500/20 text-violet-200 font-bold' : 'text-slate-400 hover:text-cyan-300 hover:bg-violet-950/40'}`}
            >
              娛樂表演
            </button>
            <button 
              onClick={() => setActiveTab('hotel')}
              className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 ${activeTab === 'hotel' ? 'bg-violet-500/20 text-violet-200 font-bold' : 'text-slate-400 hover:text-cyan-300 hover:bg-violet-950/40'}`}
            >
              <Hotel className="w-4 h-4 text-cyan-400" />
              煙霧溫泉旅館
            </button>
            <button 
              onClick={() => setActiveTab('tickets')}
              className={`px-3.5 py-2 rounded-xl transition ${activeTab === 'tickets' ? 'bg-violet-500/20 text-violet-200 font-bold' : 'text-slate-400 hover:text-cyan-300 hover:bg-violet-950/40'}`}
            >
              門票預訂
            </button>
            <button 
              onClick={() => setActiveTab('rules')}
              className={`px-3.5 py-2 rounded-xl transition ${activeTab === 'rules' ? 'bg-violet-500/20 text-violet-200 font-bold' : 'text-slate-400 hover:text-cyan-300 hover:bg-violet-950/40'}`}
            >
              樂園守則
            </button>
          </nav>

          {/* Action Button */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setActiveTab('tickets')}
              className="bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-400 hover:to-blue-400 text-white font-bold px-5 py-2 rounded-full shadow-lg shadow-violet-500/25 text-sm transition-all duration-300 transform hover:scale-105 flex items-center gap-1.5"
            >
              <Ticket className="w-4 h-4" />
              購買門票
            </button>
          </div>
        </div>

        {/* Mobile quick tabs */}
        <div className="lg:hidden flex overflow-x-auto px-4 py-2 bg-[#0A0F1C] border-t border-violet-900/20 text-xs gap-2 no-scrollbar">
          <button onClick={() => setActiveTab('home')} className={`px-3 py-1.5 rounded-full whitespace-nowrap transition ${activeTab === 'home' ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold' : 'bg-violet-950/50 text-slate-400'}`}>首頁</button>
          <button onClick={() => setActiveTab('map')} className={`px-3 py-1.5 rounded-full whitespace-nowrap transition ${activeTab === 'map' ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold' : 'bg-violet-950/50 text-slate-400'}`}>樂園地圖</button>
          <button onClick={() => setActiveTab('attractions')} className={`px-3 py-1.5 rounded-full whitespace-nowrap transition ${activeTab === 'attractions' ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold' : 'bg-violet-950/50 text-slate-400'}`}>設施</button>
          <button onClick={() => setActiveTab('shows')} className={`px-3 py-1.5 rounded-full whitespace-nowrap transition ${activeTab === 'shows' ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold' : 'bg-violet-950/50 text-slate-400'}`}>表演</button>
          <button onClick={() => setActiveTab('hotel')} className={`px-3 py-1.5 rounded-full whitespace-nowrap transition ${activeTab === 'hotel' ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold' : 'bg-violet-950/50 text-slate-400'}`}>溫泉旅館</button>
          <button onClick={() => setActiveTab('tickets')} className={`px-3 py-1.5 rounded-full whitespace-nowrap transition ${activeTab === 'tickets' ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold' : 'bg-violet-950/50 text-slate-400'}`}>門票</button>
        </div>
      </header>

      {/* 2. MAIN CONTENT AREA */}
      <main className="min-h-[calc(100vh-140px)]">

        {/* ==================== HOME PAGE ==================== */}
        {activeTab === 'home' && (
          <div>
            {/* Hero Banner */}
            <div className="relative h-[480px] md:h-[580px] overflow-hidden bg-[#070B14]">
              <img 
                src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1920&q=80" 
                alt="失眠夜樂園城堡" 
                className="w-full h-full object-cover brightness-[0.55] scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-[#070B14]/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-violet-950/40 via-transparent to-cyan-950/30" />
              
              {/* Floating Hero Content */}
              <div className="absolute inset-0 flex items-center justify-center text-center px-4">
                <div className="max-w-3xl space-y-5">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/15 border border-violet-400/30 text-violet-200 text-xs md:text-sm font-medium backdrop-blur-md">
                    <Sparkles className="w-4 h-4 text-cyan-300" /> 現實與異世界交織的奇幻國度
                  </div>
                  <h1 className="text-3xl md:text-6xl font-black text-white tracking-wide font-serif leading-tight drop-shadow-lg">
                    失眠夜遊樂園<br />
                    <span className="text-xl md:text-3xl font-light text-cyan-200/90 mt-2 block font-sans">
                      「我嘅目標係設計出世界上最偉大嘅遊戲！」
                    </span>
                  </h1>
                  <p className="text-slate-300/90 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                    初代反斗俠於鎮民大會提出快樂生活方案。邀請你用自己雙腳遊歷異世界，遇見大千世界中探索的朋友，留下難忘回憶！
                  </p>
                  
                  <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                    <button 
                      onClick={() => setActiveTab('map')}
                      className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-400 hover:to-fuchsia-400 text-white font-bold px-7 py-3 rounded-full text-base transition shadow-xl shadow-violet-500/30 flex items-center gap-2"
                    >
                      <Compass className="w-5 h-5" /> 探索互動地圖
                    </button>
                    <button 
                      onClick={() => setActiveTab('attractions')}
                      className="bg-white/5 hover:bg-white/10 text-white border border-violet-400/30 px-7 py-3 rounded-full text-base backdrop-blur-md transition flex items-center gap-2"
                    >
                      查看精選設施
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Bar */}
              <div className="absolute bottom-0 inset-x-0 bg-[#070B14]/85 backdrop-blur-md border-t border-violet-500/15 py-3 px-4 hidden md:block">
                <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-slate-300">
                  <div className="flex items-center gap-6">
                    <span className="flex items-center gap-2 text-cyan-300 font-bold">
                      <Clock className="w-4 h-4" /> 今日營業：15:00 - 26:00
                    </span>
                    <span className="flex items-center gap-2">
                      <Music className="w-4 h-4 text-fuchsia-400" /> 重磅演出：光的泳行 彎曲光影匯演 (26:00)
                    </span>
                    <span className="flex items-center gap-2">
                      <Bus className="w-4 h-4 text-violet-400" /> 邏各斯飄飄鐵路 循環線班次每20分開出
                    </span>
                  </div>
                  <button onClick={() => setActiveTab('rules')} className="text-cyan-300 hover:text-cyan-200 hover:underline flex items-center gap-1">
                    樂園守則與安全須知 <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Featured Section Grid */}
            <div className="max-w-7xl mx-auto px-4 py-16 space-y-12">
              <div className="text-center space-y-2">
                <h2 className="text-2xl md:text-4xl font-bold font-serif bg-gradient-to-r from-violet-200 via-fuchsia-200 to-cyan-200 bg-clip-text text-transparent">
                  失眠夜熱門機動遊戲與體驗
                </h2>
                <p className="text-slate-400 text-sm max-w-xl mx-auto">
                  點擊任何設施卡片，即可查看營運時間、身高限制及歷史簡介！
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {ATTRACTIONS_DATA.slice(0, 6).map(att => (
                  <div 
                    key={att.id}
                    onClick={() => setSelectedAttraction(att)}
                    className="group bg-[#0C1220] rounded-2xl overflow-hidden border border-violet-500/15 hover:border-cyan-400/40 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_8px_30px_rgba(34,211,238,0.12)] flex flex-col"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={att.image} 
                        alt={att.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500" 
                      />
                      <div className="absolute top-3 left-3 bg-[#070B14]/85 backdrop-blur px-2.5 py-1 rounded-full text-xs font-medium text-cyan-300 border border-cyan-400/30">
                        {att.zoneName}
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <h3 className="font-bold text-lg text-white group-hover:text-cyan-200 transition">
                          {att.name}
                        </h3>
                        <p className="text-slate-400 text-xs line-clamp-2 mt-1">
                          {att.summary}
                        </p>
                      </div>
                      <div className="pt-3 border-t border-violet-900/40 flex items-center justify-between text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-cyan-400" /> {att.hours}
                        </span>
                        <span className="text-violet-300 font-medium group-hover:translate-x-1 transition flex items-center gap-0.5">
                          查看詳情 <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Park Highlights Banner */}
              <div className="bg-gradient-to-r from-violet-950/50 via-[#0C1220] to-cyan-950/40 border border-violet-500/25 rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-fuchsia-500/10 via-transparent to-transparent pointer-events-none" />
                <div className="space-y-4 max-w-xl relative z-10">
                  <span className="text-xs uppercase tracking-widest text-fuchsia-300 font-bold">
                    尊享特別禮遇 · 生日之星
                  </span>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-white">
                    當日壽星入園，解鎖專屬異世界祝福！
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    憑身份證明文件領取生日徽章，即享免費失眠鎮招牌星星奶乙杯、免費租借凹凸凹凸乙隻、歌瑪園特快通行證、向日葵電台點歌及北極光肖像投映！
                  </p>
                  <button 
                    onClick={() => setActiveTab('tickets')}
                    className="bg-gradient-to-r from-fuchsia-500 to-violet-500 hover:from-fuchsia-400 hover:to-violet-400 text-white font-bold px-6 py-2.5 rounded-full text-sm transition shadow-lg shadow-fuchsia-500/20"
                  >
                    查看會員與生日禮遇
                  </button>
                </div>
                <div className="w-full md:w-80 h-48 rounded-2xl overflow-hidden border border-violet-400/20 shadow-2xl flex-shrink-0 relative z-10">
                  <img 
                    src="https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80" 
                    alt="星星奶與特權" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== INTERACTIVE MAP PAGE ==================== */}
        {activeTab === 'map' && (
          <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
            {/* Map Header Controls */}
            <div className="bg-[#0C1220] p-4 rounded-2xl border border-violet-500/15 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
              <div>
                <h1 className="text-2xl font-serif font-bold text-violet-100 flex items-center gap-2">
                  <Compass className="w-6 h-6 text-cyan-400" />
                  失眠夜遊樂園 互動地圖
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  點擊地圖上的地標 Pin，即可預覽景點故事、營運時間及詳細資訊
                </p>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                <div className="bg-[#070B14] p-1 rounded-xl border border-violet-900/40 flex items-center">
                  <button 
                    onClick={() => setViewMode('map')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${viewMode === 'map' ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
                  >
                    <Layers className="w-3.5 h-3.5" /> 地圖模式
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${viewMode === 'list' ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" /> 列表顯示
                  </button>
                </div>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar text-xs">
              <button 
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition border ${selectedCategory === 'all' ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white border-transparent font-bold' : 'bg-[#0C1220] text-slate-300 border-violet-900/40 hover:border-cyan-500/40'}`}
              >
                全部景點 ({ATTRACTIONS_DATA.length})
              </button>
              <button 
                onClick={() => setSelectedCategory('rides')}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition border ${selectedCategory === 'rides' ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white border-transparent font-bold' : 'bg-[#0C1220] text-slate-300 border-violet-900/40 hover:border-cyan-500/40'}`}
              >
                🎢 機動遊戲
              </button>
              <button 
                onClick={() => setSelectedCategory('shows')}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition border ${selectedCategory === 'shows' ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white border-transparent font-bold' : 'bg-[#0C1220] text-slate-300 border-violet-900/40 hover:border-cyan-500/40'}`}
              >
                🎭 娛樂表演
              </button>
              <button 
                onClick={() => setSelectedCategory('experiences')}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition border ${selectedCategory === 'experiences' ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white border-transparent font-bold' : 'bg-[#0C1220] text-slate-300 border-violet-900/40 hover:border-cyan-500/40'}`}
              >
                🎪 參觀體驗
              </button>
              <button 
                onClick={() => setSelectedCategory('dining')}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition border ${selectedCategory === 'dining' ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white border-transparent font-bold' : 'bg-[#0C1220] text-slate-300 border-violet-900/40 hover:border-cyan-500/40'}`}
              >
                🍽️ 餐飲商店
              </button>
            </div>

            {/* MAP VIEW */}
            {viewMode === 'map' && (
              <div className="relative w-full h-[520px] md:h-[680px] bg-[#0C1220] rounded-3xl overflow-hidden border border-violet-500/20 shadow-2xl">
                {/* SVG Theme Map Background */}
                <svg className="w-full h-full object-cover" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0a0e1a" />
                      <stop offset="50%" stopColor="#0f1528" />
                      <stop offset="100%" stopColor="#080c18" />
                    </linearGradient>
                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#1e1b4b" strokeWidth="0.25" opacity="0.6" />
                    </pattern>
                  </defs>
                  
                  <rect width="100" height="100" fill="url(#bgGrad)" />
                  <rect width="100" height="100" fill="url(#grid)" />

                  {/* Rivers & Water Bodies */}
                  <path d="M 0,20 Q 25,25 45,15 T 80,10 T 100,25 L 100,0 L 0,0 Z" fill="#0e7490" opacity="0.12" />
                  <path d="M 10,80 Q 30,60 50,75 T 90,60" fill="none" stroke="#06b6d4" strokeWidth="2.5" opacity="0.25" />

                  {/* Zone Regions */}
                  {PARK_ZONES.map(z => (
                    <g key={z.id}>
                      <circle cx={z.pos.x} cy={z.pos.y} r="16" fill="white" opacity="0.02" />
                      <circle cx={z.pos.x} cy={z.pos.y} r="12" fill="none" stroke="#a78bfa" strokeWidth="0.25" strokeDasharray="1,1" opacity="0.7" />
                      <text x={z.pos.x} y={z.pos.y - 12} textAnchor="middle" fill="#94a3b8" fontSize="2.8" fontWeight="bold">
                        {z.name}
                      </text>
                    </g>
                  ))}

                  {/* Railroad Tracks */}
                  <path d="M 48,85 Q 15,80 15,40 T 40,20 T 80,35 T 80,75 Z" fill="none" stroke="#22d3ee" strokeWidth="0.55" strokeDasharray="2,2" opacity="0.45" />
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
                      <div className="w-8 h-8 rounded-full bg-[#070B14] border-2 border-cyan-400 shadow-lg shadow-cyan-500/40 flex items-center justify-center transform group-hover:scale-125 transition duration-300">
                        <Star className="w-4 h-4 text-cyan-300 fill-cyan-400" />
                      </div>
                      <div className="w-2 h-2 bg-cyan-400 rotate-45 -mt-1 shadow-sm" />
                      
                      {/* Name Label Tooltip */}
                      <div className="opacity-0 group-hover:opacity-100 transition duration-200 pointer-events-none absolute bottom-10 bg-[#070B14]/95 text-cyan-100 border border-cyan-500/40 text-[11px] font-bold px-2.5 py-1 rounded-md whitespace-nowrap shadow-xl z-20">
                        {att.name}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Map Control Helper */}
                <div className="absolute bottom-4 left-4 bg-[#070B14]/85 backdrop-blur border border-violet-500/20 px-3 py-2 rounded-xl text-xs text-slate-300 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                  點擊星號 Pin 查看設施詳情及營運狀態
                </div>
              </div>
            )}

            {/* LIST VIEW */}
            {viewMode === 'list' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAttractions.map(att => (
                  <div 
                    key={att.id}
                    onClick={() => setSelectedAttraction(att)}
                    className="bg-[#0C1220] rounded-2xl overflow-hidden border border-violet-500/15 hover:border-cyan-400/40 transition cursor-pointer shadow-lg hover:shadow-xl p-4 flex gap-4 items-center group"
                  >
                    <img 
                      src={att.image} 
                      alt={att.name} 
                      className="w-24 h-24 rounded-xl object-cover flex-shrink-0 group-hover:scale-105 transition"
                    />
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                        {att.zoneName}
                      </span>
                      <h3 className="font-bold text-white text-base truncate group-hover:text-cyan-200 transition">
                        {att.name}
                      </h3>
                      <p className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-cyan-400" /> {att.hours}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
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
          <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-violet-900/30 pb-6">
              <div>
                <h1 className="text-3xl font-serif font-bold bg-gradient-to-r from-violet-200 to-cyan-200 bg-clip-text text-transparent">
                  失眠夜遊樂設施與主題區域
                </h1>
                <p className="text-slate-400 text-sm mt-1">
                  探索邏各斯異世界中的機動遊戲、虛擬實境與探險之旅
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜尋設施、遊戲或區域..."
                  className="w-full bg-[#0C1220] border border-violet-900/40 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/30"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAttractions.filter(a => a.category === 'rides' || a.category === 'experiences').map(att => (
                <div 
                  key={att.id}
                  onClick={() => setSelectedAttraction(att)}
                  className="bg-[#0C1220] rounded-2xl overflow-hidden border border-violet-500/15 hover:border-cyan-400/40 transition-all duration-300 cursor-pointer shadow-lg group flex flex-col"
                >
                  <div className="h-48 relative overflow-hidden">
                    <img src={att.image} alt={att.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                    <div className="absolute top-3 left-3 bg-[#070B14]/85 backdrop-blur px-2.5 py-1 rounded-full text-xs font-bold text-cyan-300 border border-cyan-400/30">
                      {att.height}
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="text-xs text-violet-300/80 font-medium mb-1">{att.zoneName}</div>
                      <h3 className="font-bold text-xl text-white group-hover:text-cyan-200 transition">{att.name}</h3>
                      <p className="text-slate-400 text-xs mt-2 line-clamp-3 leading-relaxed">{att.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {att.tags.map((t, idx) => (
                        <span key={idx} className="bg-violet-950/50 text-slate-300 text-[10px] px-2 py-0.5 rounded-md border border-violet-800/40">
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
          <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
            <div className="border-b border-violet-900/30 pb-6">
              <h1 className="text-3xl font-serif font-bold bg-gradient-to-r from-violet-200 to-cyan-200 bg-clip-text text-transparent">
                娛樂表演與巡遊時間表
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                含張日寬大匯演、Peggy演唱會、光的泳行彎曲光影匯演及鬼節百鬼夜行
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {ATTRACTIONS_DATA.filter(a => a.category === 'shows').map(show => (
                <div key={show.id} className="bg-[#0C1220] border border-violet-500/15 rounded-3xl overflow-hidden shadow-xl flex flex-col md:flex-row hover:border-cyan-400/30 transition-all duration-300">
                  <img src={show.image} alt={show.name} className="w-full md:w-1/2 h-56 md:h-auto object-cover" />
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="inline-block bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-500/30 text-xs px-2.5 py-1 rounded-full font-bold mb-2">
                        {show.zoneName}
                      </span>
                      <h3 className="text-xl font-bold text-white">{show.name}</h3>
                      <p className="text-slate-400 text-xs mt-2 leading-relaxed">{show.description}</p>
                    </div>
                    <div className="space-y-2 pt-3 border-t border-violet-900/40 text-xs text-slate-300">
                      <div className="flex items-center gap-2 text-cyan-300 font-bold">
                        <Clock className="w-4 h-4" /> 演出時間：{show.hours}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== LOGOS SMOKE ONSEN HOTEL ==================== */}
        {activeTab === 'hotel' && (
          <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
            <div className="relative rounded-3xl overflow-hidden bg-[#0C1220] h-80 flex items-center justify-center p-8 border border-violet-500/20">
              <img 
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80" 
                alt="邏各斯煙霧溫泉旅館" 
                className="absolute inset-0 w-full h-full object-cover brightness-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-transparent to-violet-950/40" />
              <div className="relative z-10 text-center space-y-3 max-w-2xl">
                <span className="bg-cyan-500/15 text-cyan-200 border border-cyan-400/30 px-3 py-1 rounded-full text-xs font-bold">
                  相傳亞利麻女神亦流連忘返
                </span>
                <h1 className="text-3xl md:text-5xl font-serif font-bold text-white">
                  邏各斯 煙霧溫泉旅館
                </h1>
                <p className="text-slate-200 text-sm leading-relaxed">
                  一百種不同的氣味和質感、全天然無雜質、充滿營養的煙霧。由邏各斯最壯麗的山——轟隆轟隆山湧出，渾然天成。
                </p>
              </div>
            </div>

            {/* Onsen Builder Interactive Tool */}
            <div className="bg-[#0C1220] border border-violet-500/15 rounded-3xl p-6 md:p-10 space-y-6 shadow-2xl">
              <div className="border-b border-violet-900/30 pb-4">
                <h2 className="text-2xl font-serif font-bold text-violet-100 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-cyan-400" />
                  自選溫泉煙霧配方
                </h2>
                <p className="text-slate-400 text-xs mt-1">
                  過百種名貴材料任君選擇，點擊調配你的專屬異世界溫泉療程：
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: '智商提升', desc: '失眠鎮珍奇之最「梁子力獸」眼淚提煉靈丹', color: 'border-cyan-500/30 bg-cyan-950/20' },
                  { name: '跳唱進步神速', desc: '失眠鎮氣溫最低地區搜集的「天山鍾雪蓮」', color: 'border-violet-500/30 bg-violet-950/20' },
                  { name: '美白護膚', desc: '最清澈山水蒸餾出來的「靈魂之水」白色煙霧', color: 'border-emerald-500/30 bg-emerald-950/20' },
                  { name: '忘記煩惱', desc: '士多啤梨冬甩蒸發出的香噴噴粉紅色煙霧', color: 'border-fuchsia-500/30 bg-fuchsia-950/20' }
                ].map(onsen => {
                  const isSelected = selectedOnsen.includes(onsen.name);
                  return (
                    <div 
                      key={onsen.name}
                      onClick={() => toggleOnsen(onsen.name)}
                      className={`p-5 rounded-2xl border cursor-pointer transition flex flex-col justify-between space-y-3 ${onsen.color} ${isSelected ? 'ring-2 ring-cyan-400 border-cyan-400/60' : 'opacity-80 hover:opacity-100'}`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-white text-base">{onsen.name}</h3>
                          {isSelected && <Check className="w-4 h-4 text-cyan-400" />}
                        </div>
                        <p className="text-slate-300 text-xs leading-relaxed">{onsen.desc}</p>
                      </div>
                      <div className="text-[11px] text-cyan-300 font-medium">
                        {isSelected ? '✓ 已加入溫泉配方' : '+ 點擊選購'}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-[#070B14] p-4 rounded-2xl border border-violet-900/40 flex items-center justify-between text-xs text-slate-300">
                <div>
                  已選配方：<span className="text-cyan-200 font-bold">{selectedOnsen.join(' + ') || '無'}</span>
                </div>
                <button 
                  onClick={() => alert(`已為閣下預約「邏各斯煙霧溫泉」！含 ${selectedOnsen.join(', ')} 特別調配。`)}
                  className="bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-400 hover:to-cyan-400 text-white font-bold px-5 py-2 rounded-xl transition"
                >
                  立即預訂溫泉套房 (生日月8折)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TICKET BOOKING & CALCULATOR ==================== */}
        {activeTab === 'tickets' && (
          <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-serif font-bold bg-gradient-to-r from-violet-200 to-cyan-200 bg-clip-text text-transparent">
                失眠夜遊樂園 門票與會員預訂
              </h1>
              <p className="text-slate-400 text-sm">
                請選擇門票種類與優惠身分，系統將自動計算最佳入場票價
              </p>
            </div>

            <div className="bg-[#0C1220] border border-violet-500/15 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
              {/* Ticket selector rows */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#070B14] rounded-2xl border border-violet-900/30">
                  <div>
                    <h3 className="font-bold text-white text-base">成人標準門票 (12歲或以上)</h3>
                    <p className="text-slate-400 text-xs">單日無限次暢玩所有機動遊戲及展覽</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-cyan-300 font-bold text-lg">$90.3</span>
                    <div className="flex items-center gap-2 bg-[#0C1220] rounded-lg p-1 border border-violet-900/40">
                      <button onClick={() => setTicketAdult(Math.max(0, ticketAdult - 1))} className="w-7 h-7 bg-violet-950/60 rounded text-white font-bold hover:bg-violet-800/60">-</button>
                      <span className="w-6 text-center text-sm font-bold">{ticketAdult}</span>
                      <button onClick={() => setTicketAdult(ticketAdult + 1)} className="w-7 h-7 bg-violet-950/60 rounded text-white font-bold hover:bg-violet-800/60">+</button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#070B14] rounded-2xl border border-violet-900/30">
                  <div>
                    <h3 className="font-bold text-white text-base">兒童門票 (12歲以下)</h3>
                    <p className="text-slate-400 text-xs">特別特權價 $903 (尊貴特別版門票)</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-cyan-300 font-bold text-lg">$903.0</span>
                    <div className="flex items-center gap-2 bg-[#0C1220] rounded-lg p-1 border border-violet-900/40">
                      <button onClick={() => setTicketChild(Math.max(0, ticketChild - 1))} className="w-7 h-7 bg-violet-950/60 rounded text-white font-bold hover:bg-violet-800/60">-</button>
                      <span className="w-6 text-center text-sm font-bold">{ticketChild}</span>
                      <button onClick={() => setTicketChild(ticketChild + 1)} className="w-7 h-7 bg-violet-950/60 rounded text-white font-bold hover:bg-violet-800/60">+</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Special Discounts */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-violet-300">專屬身分折扣優惠</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <label className="flex items-center gap-3 p-3 bg-[#070B14] rounded-xl border border-violet-900/30 cursor-pointer hover:border-cyan-500/30 transition">
                    <input 
                      type="checkbox" 
                      checked={isStudentDiscount} 
                      onChange={(e) => setIsStudentDiscount(e.target.checked)}
                      className="w-4 h-4 accent-cyan-400 rounded" 
                    />
                    <div>
                      <div className="font-bold text-white">聖邏各斯中學 8折優惠</div>
                      <div className="text-slate-400 text-[11px]">適用於學生、教職員及校友</div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 bg-[#070B14] rounded-xl border border-violet-900/30 cursor-pointer hover:border-cyan-500/30 transition">
                    <input 
                      type="checkbox" 
                      checked={isFanClub} 
                      onChange={(e) => setIsFanClub(e.target.checked)}
                      className="w-4 h-4 accent-cyan-400 rounded" 
                    />
                    <div>
                      <div className="font-bold text-white">Superstar 張sir 寬寬後援會</div>
                      <div className="text-cyan-300 text-[11px]">免費入場（入寬仔數）+ VIP搖滾區</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Total Calculation & Checkout */}
              <div className="pt-6 border-t border-violet-900/30 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">應付總金額：</span>
                  <span className="text-3xl font-black text-cyan-200 font-serif">
                    HK${ticketTotal}
                  </span>
                </div>
                <button 
                  onClick={() => alert(`成功預訂門票！應付金額: HK$${ticketTotal}。歡迎入場！`)}
                  className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 hover:from-violet-400 hover:via-fuchsia-400 hover:to-cyan-400 text-white font-bold px-8 py-3.5 rounded-full shadow-xl shadow-violet-500/20 transition transform hover:scale-105"
                >
                  確認並完成預訂
                </button>
              </div>
            </div>

            {/* Annual Pass info */}
            <div className="bg-[#0C1220] border border-cyan-500/25 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="bg-cyan-500/15 text-cyan-200 text-xs px-2.5 py-1 rounded-full font-bold">全年會籍禮遇</span>
                <h3 className="text-xl font-bold text-white">入境事務處會籍 · 一年只需 $360</h3>
                <p className="text-slate-300 text-xs leading-relaxed">
                  平均每日低過 $1！全年無限次入園、免費泊車、每年免費張日寬VIP搖滾區、每月與 Peggy 會面及生日尊享禮品。
                </p>
              </div>
              <button 
                onClick={() => alert('請親臨樂園入境事務大樓辦理會籍！')}
                className="bg-violet-950/60 hover:bg-violet-900/60 text-cyan-200 border border-cyan-500/30 font-bold px-6 py-2.5 rounded-full text-xs whitespace-nowrap transition"
              >
                辦理入會手續
              </button>
            </div>
          </div>
        )}

        {/* ==================== PARK RULES & SERVICES ==================== */}
        {activeTab === 'rules' && (
          <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
            <div className="border-b border-violet-900/30 pb-4">
              <h1 className="text-3xl font-serif font-bold bg-gradient-to-r from-violet-200 to-cyan-200 bg-clip-text text-transparent">
                樂園守則與遊牧人服務
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                為保障所有遊牧人安全與秩序，請嚴格遵守以下規則
              </p>
            </div>

            {/* Rules Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: '紫沙與石頭管制', content: '紫沙為管制物品，嚴禁觸碰或攜離園區。為確保閣下人身安全，請勿執拾任何石頭。', icon: ShieldAlert, color: 'text-cyan-400' },
                { title: '禮貌對待演藝人員', content: '嚴禁對演藝人員（主要是 Peggy）作出批評、嘲笑、侵犯界線等無禮行徑。', icon: Heart, color: 'text-fuchsia-400' },
                { title: '青燈大人巡邏與閃光燈', content: '青燈大人每日不定時於陰間巡邏，如遊牧人被目擊使用電話、相機閃光燈等發光裝置，將即時判入陰間監獄十分鐘。', icon: Moon, color: 'text-violet-400' },
                { title: 'DIDISAN 緊急呼救', content: '如遇上危險，請原地大叫「DIDISAN!!!」，執法人員將立即到場支援。', icon: PhoneCall, color: 'text-rose-400' }
              ].map((rule, idx) => {
                const IconComponent = rule.icon;
                return (
                  <div key={idx} className="bg-[#0C1220] p-5 rounded-2xl border border-violet-500/15 space-y-2 hover:border-cyan-400/30 transition">
                    <div className="flex items-center gap-2">
                      <IconComponent className={`w-5 h-5 ${rule.color}`} />
                      <h3 className="font-bold text-white text-base">{rule.title}</h3>
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed">{rule.content}</p>
                  </div>
                );
              })}
            </div>

            {/* Transport Info */}
            <div className="bg-[#0C1220] border border-violet-500/15 p-6 rounded-3xl space-y-4">
              <h2 className="text-xl font-bold text-violet-100 flex items-center gap-2 font-serif">
                <Bus className="w-5 h-5 text-cyan-400" /> 園內交通網絡
              </h2>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="bg-[#070B14] p-4 rounded-xl border border-violet-900/30">
                  <span className="font-bold text-cyan-300 text-sm block mb-1">邏各斯飄飄鐵路 / 陰間列車</span>
                  途經：市鎮大街站 ➔ 六度圈之城站 ➔ 歌瑪園站（只限落客） ➔ 陰間部落站 ➔ 山海閣及邏各斯站（循環線，每逢00, 20, 40分發車，全程約40分鐘）。
                </div>
                <div className="bg-[#070B14] p-4 rounded-xl border border-violet-900/30">
                  <span className="font-bold text-cyan-300 text-sm block mb-1">邏各斯觀光車</span>
                  每日兩班，不設中途站。20:00 從霹靂啪嘞監獄開出，途經跳彈床日報報館及凹凸凹凸廣場，終點為枕頭樹汁店（20:30原路回程）。
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* 3. ATTRACTION DETAIL MODAL */}
      {selectedAttraction && (
        <div className="fixed inset-0 z-50 bg-[#070B14]/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0C1220] border border-violet-500/25 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in duration-200">
            {/* Close Button */}
            <button 
              onClick={() => setSelectedAttraction(null)}
              className="absolute top-4 right-4 z-10 bg-[#070B14]/90 hover:bg-violet-950/80 text-white p-2 rounded-full border border-violet-500/30 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Header */}
            <div className="relative h-64 md:h-72">
              <img 
                src={selectedAttraction.image} 
                alt={selectedAttraction.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C1220] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-6">
                <span className="bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                  {selectedAttraction.categoryName} · {selectedAttraction.zoneName}
                </span>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mt-1">
                  {selectedAttraction.name}
                </h2>
              </div>
            </div>

            {/* Modal Body Content */}
            <div className="p-6 md:p-8 space-y-6 text-sm">
              <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300 bg-[#070B14] p-4 rounded-2xl border border-violet-900/30">
                <div>
                  <span className="text-slate-500 block">身高要求</span>
                  <span className="font-bold text-cyan-300">{selectedAttraction.height}</span>
                </div>
                <div className="w-px h-8 bg-violet-900/40" />
                <div>
                  <span className="text-slate-500 block">今日營運時間</span>
                  <span className="font-bold text-cyan-300">{selectedAttraction.hours}</span>
                </div>
                <div className="w-px h-8 bg-violet-900/40" />
                <div>
                  <span className="text-slate-500 block">位置</span>
                  <span className="font-bold text-cyan-300">{selectedAttraction.zoneName}</span>
                </div>
              </div>

              <div className="space-y-3 leading-relaxed text-slate-300">
                <h3 className="font-serif font-bold text-lg text-violet-200">景點介紹</h3>
                <p className="whitespace-pre-line text-sm">{selectedAttraction.description}</p>
              </div>

              <div className="pt-4 border-t border-violet-900/30 flex items-center justify-between">
                <button 
                  onClick={() => {
                    alert(`已將「${selectedAttraction.name}」加入你的樂園一日遊行程！`);
                    setSelectedAttraction(null);
                  }}
                  className="bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-400 hover:to-cyan-400 text-white font-bold px-6 py-2.5 rounded-full text-xs transition shadow-lg"
                >
                  + 加入我的行程
                </button>
                <button 
                  onClick={() => setSelectedAttraction(null)}
                  className="text-slate-400 hover:text-white text-xs"
                >
                  關閉視窗
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. FOOTER */}
      <footer className="bg-[#050810] border-t border-violet-900/30 py-12 px-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto space-y-6 text-center">
          <div className="flex items-center justify-center gap-2 text-cyan-300 font-serif text-lg font-bold">
            <Sparkles className="w-5 h-5" /> 失眠夜遊樂園 Philosomnia Park
          </div>
          <p className="max-w-xl mx-auto">
            © 邏各斯大娛樂家初代反斗俠版權所有 · 「喺世界最需要娛樂嘅時候，我就會出場！」
          </p>
          <div className="flex justify-center space-x-6 text-slate-400">
            <button onClick={() => setActiveTab('rules')} className="hover:text-cyan-300 transition">使用條款</button>
            <button onClick={() => setActiveTab('rules')} className="hover:text-cyan-300 transition">私隱政策</button>
            <button onClick={() => setActiveTab('tickets')} className="hover:text-cyan-300 transition">門票條款</button>
            <button onClick={() => setActiveTab('hotel')} className="hover:text-cyan-300 transition">煙霧溫泉指南</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
