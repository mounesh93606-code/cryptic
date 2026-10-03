export const currentUser = {
  id: 'user_main',
  name: 'Karyell Hill',
  username: 'karyell',
  avatar: '/images/profile_avatar.jpg',
  postsCount: 46,
  followersCount: 2842,
  followingCount: 526,
  bio: 'Visual Creator & Travel Enthusiast 📸✨\nCapturing moments between the lines.\nCalifornia & Worldwide ✈️\nlinktr.ee/karyell',
  isVerified: true
};

export const initialStories = [
  {
    id: 'story_add',
    isAddStory: true,
    user: {
      name: 'Your Story',
      username: 'karyell',
      avatar: '/images/profile_avatar.jpg'
    }
  },
  {
    id: 'story_1',
    user: {
      name: 'Sarah Walker',
      username: 'sarah_w',
      avatar: '/images/avatars/avatar1.jpg'
    },
    media: '/images/stories/story1.jpg',
    time: '2h ago',
    hasUnseen: true
  },
  {
    id: 'story_2',
    user: {
      name: 'Alex Miller',
      username: 'alex_m',
      avatar: '/images/avatars/avatar2.jpg'
    },
    media: '/images/stories/story2.jpg',
    time: '3h ago',
    hasUnseen: true
  },
  {
    id: 'story_3',
    user: {
      name: 'Elena Rostova',
      username: 'elena_r',
      avatar: '/images/avatars/avatar3.jpg'
    },
    media: '/images/stories/story3.jpg',
    time: '5h ago',
    hasUnseen: true
  },
  {
    id: 'story_4',
    user: {
      name: 'Marcus Thorne',
      username: 'marcus_t',
      avatar: '/images/avatars/avatar4.jpg'
    },
    media: '/images/stories/story4.jpg',
    time: '6h ago',
    hasUnseen: true
  },
  {
    id: 'story_5',
    user: {
      name: 'Chloe Bennett',
      username: 'chloe_b',
      avatar: '/images/avatars/avatar5.jpg'
    },
    media: '/images/stories/story5.jpg',
    time: '8h ago',
    hasUnseen: true
  },
  {
    id: 'story_6',
    user: {
      name: 'Maya Lin',
      username: 'maya_l',
      avatar: '/images/avatars/avatar6.jpg'
    },
    media: '/images/stories/story6.jpg',
    time: '9h ago',
    hasUnseen: false
  },
  {
    id: 'story_7',
    user: {
      name: 'David Kim',
      username: 'david_k',
      avatar: '/images/avatars/avatar7.jpg'
    },
    media: '/images/stories/story7.jpg',
    time: '12h ago',
    hasUnseen: false
  },
  {
    id: 'story_8',
    user: {
      name: 'Emma Watson',
      username: 'emma_watson',
      avatar: '/images/avatars/avatar8.jpg'
    },
    media: '/images/stories/story8.jpg',
    time: '14h ago',
    hasUnseen: false
  },
  {
    id: 'story_9',
    user: {
      name: 'Lucas Gray',
      username: 'lucas_gray',
      avatar: '/images/avatars/avatar9.jpg'
    },
    media: '/images/stories/story2.jpg',
    time: '16h ago',
    hasUnseen: false
  }
];

export const initialPosts = [
  {
    id: 'post_1',
    user: {
      name: 'Dom Hill',
      username: 'Dom.Hill',
      avatar: '/images/avatars/dom_hill.jpg',
      isVerified: true
    },
    image: '/images/feed_yellow_hoodie.jpg',
    likesCount: 5200,
    commentsCount: 38,
    isLiked: false,
    isSaved: false,
    caption: 'Golden hour mood on the blacktop. Chasing that pure focus and energy under the open skies ☀️🏀 #streetwear #goldenhour #lifestyle',
    timestamp: '2 HOURS AGO',
    location: 'Brooklyn, New York',
    comments: [
      { id: 'c1_1', username: 'karyell', text: 'This lighting and outfit is unreal! 🔥', time: '1h' },
      { id: 'c1_2', username: 'alex_m', text: 'Where did you get that hoodie set?', time: '45m' },
      { id: 'c1_3', username: 'elena_r', text: 'Pure golden hour magic ✨', time: '30m' }
    ]
  },
  {
    id: 'post_2',
    user: {
      name: 'John Kelson',
      username: 'John.Kelson',
      avatar: '/images/avatars/john_kelson.jpg',
      isVerified: false
    },
    image: '/images/feed_camper_van.jpg',
    likesCount: 546,
    commentsCount: 38,
    isLiked: false,
    isSaved: false,
    caption: 'Roam far, wander free 🚐🏜️ Endless sandstone canyons and highway dreams. Utah roadtrip season is officially here.',
    timestamp: '4 HOURS AGO',
    location: 'Moab, Utah',
    comments: [
      { id: 'c2_1', username: 'karyell', text: 'Dream road trip! Adding this to my bucket list.', time: '3h' },
      { id: 'c2_2', username: 'david_k', text: 'Classic VW van vibes never get old ✌️', time: '2h' }
    ]
  },
  {
    id: 'post_3',
    user: {
      name: 'John Kelson',
      username: 'John.Kelson',
      avatar: '/images/avatars/john_kelson.jpg',
      isVerified: false
    },
    image: '/images/feed_surfer.jpg',
    likesCount: 546,
    commentsCount: 38,
    isLiked: false,
    isSaved: false,
    caption: 'Inside the emerald barrel 🌊🏄‍♂️ Nothing beats the raw power of the Pacific morning swell.',
    timestamp: '5 HOURS AGO',
    location: 'Mavericks, California',
    comments: [
      { id: 'c3_1', username: 'marcus_t', text: 'Incredible timing on this capture man!!', time: '4h' },
      { id: 'c3_2', username: 'sarah_w', text: 'Water looks crystal clean 🌊💙', time: '3h' }
    ]
  },
  {
    id: 'post_4',
    user: {
      name: 'Dom Hill',
      username: 'Dom.Hill',
      avatar: '/images/avatars/dom_hill.jpg',
      isVerified: true
    },
    image: '/images/feed_man_coast.jpg',
    likesCount: 1240,
    commentsCount: 45,
    isLiked: false,
    isSaved: false,
    caption: 'Aegean sea breeze & timeless coastal stone architecture. Summer days that linger forever 🇬🇷🕊️',
    timestamp: '6 HOURS AGO',
    location: 'Santorini, Greece',
    comments: [
      { id: 'c4_1', username: 'karyell', text: 'Such a timeless portrait!', time: '5h' },
      { id: 'c4_2', username: 'chloe_b', text: 'Greece in the summer is unmatched', time: '4h' }
    ]
  },
  {
    id: 'post_5',
    user: {
      name: 'Karyell Hill',
      username: 'karyell',
      avatar: '/images/profile_avatar.jpg',
      isVerified: true
    },
    image: '/images/feed_street_flowers.jpg',
    likesCount: 3410,
    commentsCount: 82,
    isLiked: false,
    isSaved: false,
    caption: 'Found the most charming cobblestone alley overflowing with bougainvillea blooms 🌸 cobblestones, stone walls, and warm sunshine.',
    timestamp: '1 DAY AGO',
    location: 'Rhodes Old Town',
    comments: [
      { id: 'c5_1', username: 'Dom.Hill', text: 'Incredible colors! Look at those flowers.', time: '20h' },
      { id: 'c5_2', username: 'John.Kelson', text: 'Straight out of a postcard 📮', time: '18h' }
    ]
  },
  {
    id: 'post_6',
    user: {
      name: 'Maya Lin',
      username: 'maya_l',
      avatar: '/images/avatars/avatar6.jpg',
      isVerified: false
    },
    image: '/images/feed/feed_waterfall.jpg',
    likesCount: 2150,
    commentsCount: 29,
    isLiked: false,
    isSaved: false,
    caption: 'Deep in the lush green misty forest 🌿 Waterfalls roaring and fresh mountain air.',
    timestamp: '2 DAYS AGO',
    location: 'Pacific Northwest',
    comments: [
      { id: 'c6_1', username: 'sarah_w', text: 'Nature therapy at its finest! 🌲', time: '1d' }
    ]
  },
  {
    id: 'post_7',
    user: {
      name: 'Chloe Bennett',
      username: 'chloe_b',
      avatar: '/images/avatars/avatar5.jpg',
      isVerified: false
    },
    image: '/images/feed/feed_cat.jpg',
    likesCount: 8920,
    commentsCount: 142,
    isLiked: false,
    isSaved: false,
    caption: 'Little ginger paws enjoying afternoon sunbeams 🐾 Meet Mochi!',
    timestamp: '3 DAYS AGO',
    location: 'Home Sweet Home',
    comments: [
      { id: 'c7_1', username: 'karyell', text: 'OMG Mochi is precious! 😍', time: '2d' }
    ]
  }
];

export const mockReels = [
  {
    id: 'reel_1',
    user: {
      name: 'Marcus Thorne',
      username: 'marcus_t',
      avatar: '/images/avatars/avatar4.jpg',
      isVerified: true
    },
    video: '/reels/reel1.mp4',
    poster: '/images/reels/reel1.jpg',
    likes: 12400,
    comments: 382,
    caption: 'Deep sea depths & ocean wildlife magic 🌊🐋 Nothing compares to this serenity.',
    audio: 'Original Audio · Synthwave Nights',
    isLiked: false
  },
  {
    id: 'reel_2',
    user: {
      name: 'Chloe Bennett',
      username: 'chloe_b',
      avatar: '/images/avatars/avatar5.jpg',
      isVerified: false
    },
    video: '/reels/reel2.mp4',
    poster: '/images/reels/reel2.jpg',
    likes: 38900,
    comments: 940,
    caption: 'Blooming botanical macro moments ✨🌸 Spring petals unfolding.',
    audio: 'Dua Lipa · Dance The Night',
    isLiked: false
  },
  {
    id: 'reel_3',
    user: {
      name: 'Alex Miller',
      username: 'alex_m',
      avatar: '/images/avatars/avatar2.jpg',
      isVerified: true
    },
    video: '/reels/reel3.mp4',
    poster: '/images/reels/reel3.jpg',
    likes: 21700,
    comments: 512,
    caption: 'Animation studio storyboards coming to life 🎬✨ Classic moments.',
    audio: 'Odesza · Higher Ground',
    isLiked: false
  },
  {
    id: 'reel_4',
    user: {
      name: 'David Kim',
      username: 'david_k',
      avatar: '/images/avatars/avatar7.jpg',
      isVerified: false
    },
    video: '/reels/reel4.mp4',
    poster: '/images/reels/reel4.jpg',
    likes: 15300,
    comments: 290,
    caption: 'Dragon fantasy cinema trailer & visual effects showcase 🐉⚔️',
    audio: 'Lo-fi Chill Beats · Cinematic',
    isLiked: false
  },
  {
    id: 'reel_5',
    user: {
      name: 'Sarah Walker',
      username: 'sarah_w',
      avatar: '/images/avatars/avatar1.jpg',
      isVerified: false
    },
    video: '/reels/reel5.mp4',
    poster: '/images/reels/reel5.jpg',
    likes: 45200,
    comments: 1100,
    caption: 'Woodland creatures in 4K resolution 🌲🐰 Nature storytelling at its finest.',
    audio: 'Kanye West · Stronger',
    isLiked: false
  },
  {
    id: 'reel_6',
    user: {
      name: 'Elena Rostova',
      username: 'elena_r',
      avatar: '/images/avatars/avatar3.jpg',
      isVerified: true
    },
    video: '/reels/reel6.mp4',
    poster: '/images/reels/reel4.jpg',
    likes: 29400,
    comments: 642,
    caption: 'Fresh morning petals & gentle dew drops 🌿💧 Macro photography.',
    audio: 'Taylor Swift · Cruel Summer',
    isLiked: false
  },
  {
    id: 'reel_7',
    user: {
      name: 'Dom Hill',
      username: 'Dom.Hill',
      avatar: '/images/avatars/dom_hill.jpg',
      isVerified: true
    },
    video: '/reels/reel7.mp4',
    poster: '/images/reels/reel2.jpg',
    likes: 54100,
    comments: 1420,
    caption: 'Cartoons and coffee Saturday morning nostalgia 📺☕️',
    audio: 'Billie Eilish · Birds of a Feather',
    isLiked: false
  },
  {
    id: 'reel_8',
    user: {
      name: 'Lucas Gray',
      username: 'lucas_gray',
      avatar: '/images/avatars/avatar9.jpg',
      isVerified: false
    },
    video: '/reels/reel8.mp4',
    poster: '/images/reels/reel3.jpg',
    likes: 18900,
    comments: 410,
    caption: 'Weekend wilderness adventures & quiet forest trail vibes 🌲🎒',
    audio: 'Coldplay · Yellow (Acoustic)',
    isLiked: false
  }
];

export const mockProducts = [
  {
    id: 'prod_1',
    name: 'Air Max Retro Pulse',
    brand: 'Nike Sportswear',
    price: 135.00,
    category: 'Footwear',
    rating: 4.8,
    reviews: 142,
    image: '/images/shop/shoes.jpg',
    description: 'Iconic cushioned running sneakers with heritage color-blocking and durable waffle outsole for everyday style.',
    colors: ['Crimson Red', 'Triple White', 'Volt Black'],
    sizes: ['US 8', 'US 9', 'US 10', 'US 11']
  },
  {
    id: 'prod_2',
    name: 'Classic 35mm Rangefinder Camera',
    brand: 'Leica Heritage',
    price: 489.00,
    category: 'Tech',
    rating: 4.9,
    reviews: 89,
    image: '/images/shop/camera.jpg',
    description: 'Mechanical manual focus film camera with 40mm f/2.0 prime lens. Authentic analog texture in every frame.',
    colors: ['Silver Chrome', 'Matte Black'],
    sizes: ['Standard Kit']
  },
  {
    id: 'prod_3',
    name: 'Aviator Gold Polarized Shades',
    brand: 'Ray-Ban Classic',
    price: 165.00,
    category: 'Accessories',
    rating: 4.7,
    reviews: 310,
    image: '/images/shop/sunglasses.jpg',
    description: 'Ultra-lightweight 24k gold-tone wireframe with crystal polarized green lenses providing 100% UV protection.',
    colors: ['Gold / G-15 Green', 'Silver / Gradient Blue'],
    sizes: ['Standard (58mm)']
  },
  {
    id: 'prod_4',
    name: 'Wireless Studio ANC Headphones',
    brand: 'Sony Audio',
    price: 299.00,
    category: 'Tech',
    rating: 4.9,
    reviews: 520,
    image: '/images/shop/headphones.jpg',
    description: 'Industry-leading noise canceling with dual noise sensor technology. 30-hour battery life with quick charge.',
    colors: ['Midnight Black', 'Silver Cloud', 'Sand Dune'],
    sizes: ['One Size']
  },
  {
    id: 'prod_5',
    name: 'Minimalist Chrono Sapphire Watch',
    brand: 'Nordic Time',
    price: 210.00,
    category: 'Accessories',
    rating: 4.6,
    reviews: 77,
    image: '/images/shop/watch.jpg',
    description: 'Swiss quartz movement encased in 316L stainless steel with genuine Italian tanned leather strap.',
    colors: ['Tan Leather', 'Black Steel', 'Navy Mesh'],
    sizes: ['40mm Dial']
  },
  {
    id: 'prod_6',
    name: 'Heavyweight Fleece Oversized Hoodie',
    brand: 'Karyell Studio',
    price: 88.00,
    category: 'Apparel',
    rating: 4.9,
    reviews: 195,
    image: '/images/shop/hoodie.jpg',
    description: 'Custom 450 GSM French terry cotton with relaxed dropped shoulders and double-lined hood.',
    colors: ['Washed Black', 'Oatmeal Heather', 'Forest Sage'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'prod_7',
    name: 'Explorer Waterproof Canvas Backpack',
    brand: 'Heritage Gear',
    price: 119.00,
    category: 'Lifestyle',
    rating: 4.8,
    reviews: 164,
    image: '/images/shop/backpack.jpg',
    description: 'Waxed cotton canvas with vegetable-tanned leather straps, 16" padded laptop sleeve, and brass hardware.',
    colors: ['Olive Drab', 'Charcoal', 'Caramel Brown'],
    sizes: ['24 Liters']
  },
  {
    id: 'prod_8',
    name: 'Handcrafted Ceramic Speckled Mug',
    brand: 'Clay & Kiln',
    price: 34.00,
    category: 'Lifestyle',
    rating: 4.9,
    reviews: 63,
    image: '/images/shop/cup.jpg',
    description: 'Hand-thrown stoneware mug finished with matte speckled glaze and ergonomic thumb rest handle. 12 oz capacity.',
    colors: ['Natural Speckle', 'Terrazzo White'],
    sizes: ['12 oz']
  }
];

export const mockNotifications = [
  {
    id: 'notif_1',
    type: 'like',
    user: {
      username: 'Dom.Hill',
      avatar: '/images/avatars/dom_hill.jpg'
    },
    text: 'liked your photo.',
    targetImage: '/images/feed_street_flowers.jpg',
    time: '5m ago',
    unread: true
  },
  {
    id: 'notif_2',
    type: 'follow',
    user: {
      username: 'elena_r',
      avatar: '/images/avatars/avatar3.jpg'
    },
    text: 'started following you.',
    time: '25m ago',
    unread: true,
    isFollowing: false
  },
  {
    id: 'notif_3',
    type: 'comment',
    user: {
      username: 'John.Kelson',
      avatar: '/images/avatars/john_kelson.jpg'
    },
    text: 'commented: "Straight out of a postcard 📮"',
    targetImage: '/images/feed_street_flowers.jpg',
    time: '2h ago',
    unread: false
  },
  {
    id: 'notif_4',
    type: 'like',
    user: {
      username: 'sarah_w',
      avatar: '/images/avatars/avatar1.jpg'
    },
    text: 'and 24 others liked your post.',
    targetImage: '/images/feed_street_flowers.jpg',
    time: '4h ago',
    unread: false
  },
  {
    id: 'notif_5',
    type: 'follow',
    user: {
      username: 'alex_m',
      avatar: '/images/avatars/avatar2.jpg'
    },
    text: 'started following you.',
    time: '1d ago',
    unread: false,
    isFollowing: true
  }
];

export const mockChats = [
  {
    id: 'chat_1',
    user: {
      username: 'Dom.Hill',
      name: 'Dom Hill',
      avatar: '/images/avatars/dom_hill.jpg',
      isOnline: true
    },
    lastMessage: 'Hey! Loved that street photo from Rhodes!',
    time: '12m',
    unread: 2,
    messages: [
      { id: 'm1', sender: 'Dom.Hill', text: 'Hey Karyell! How are you doing?', time: '2:14 PM' },
      { id: 'm2', sender: 'karyell', text: 'Hey Dom! Doing great, working on some new photography edits.', time: '2:16 PM' },
      { id: 'm3', sender: 'Dom.Hill', text: 'Hey! Loved that street photo from Rhodes!', time: '2:18 PM' }
    ]
  },
  {
    id: 'chat_2',
    user: {
      username: 'John.Kelson',
      name: 'John Kelson',
      avatar: '/images/avatars/john_kelson.jpg',
      isOnline: false
    },
    lastMessage: 'We should plan that California road trip soon 🚐',
    time: '2h',
    unread: 1,
    messages: [
      { id: 'm4', sender: 'John.Kelson', text: 'We should plan that California road trip soon 🚐', time: '12:30 PM' }
    ]
  },
  {
    id: 'chat_3',
    user: {
      username: 'elena_r',
      name: 'Elena Rostova',
      avatar: '/images/avatars/avatar3.jpg',
      isOnline: true
    },
    lastMessage: 'Thanks for the follow! Love your creative work.',
    time: '1d',
    unread: 0,
    messages: [
      { id: 'm5', sender: 'elena_r', text: 'Thanks for the follow! Love your creative work.', time: 'Yesterday' }
    ]
  }
];

export const mockStats = {
  impressions: '142,850',
  reach: '98,420',
  profileViews: '14,290',
  engagementRate: '6.4%',
  growthWeekly: '+18.5%',
  topLocations: ['United States (42%)', 'United Kingdom (18%)', 'Germany (12%)', 'Australia (9%)'],
  followerDemographics: {
    women: '58%',
    men: '40%',
    other: '2%'
  }
};
