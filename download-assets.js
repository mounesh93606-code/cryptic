import fs from 'fs';
import path from 'path';
import https from 'https';

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const downloadFile = (url, dest) => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      // Already downloaded
      return resolve(dest);
    }
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        // Handle redirect
        https.get(response.headers.location, (redirectResponse) => {
          redirectResponse.pipe(file);
          file.on('finish', () => {
            file.close(() => resolve(dest));
          });
        }).on('error', (err) => {
          fs.unlink(dest, () => {});
          reject(err);
        });
        return;
      }
      if (response.statusCode !== 200) {
        fs.unlink(dest, () => {});
        return reject(new Error(`Failed with status ${response.statusCode}`));
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(dest));
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
};

const assets = [
  // Story avatars (matching reference screenshot)
  { url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80', dest: 'public/images/avatars/avatar1.jpg' }, // blonde woman
  { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80', dest: 'public/images/avatars/avatar2.jpg' }, // young man stubble
  { url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80', dest: 'public/images/avatars/avatar3.jpg' }, // woman glasses
  { url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80', dest: 'public/images/avatars/avatar4.jpg' }, // smiling young man
  { url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80', dest: 'public/images/avatars/avatar5.jpg' }, // blonde bob
  { url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=80', dest: 'public/images/avatars/avatar6.jpg' }, // brunette
  { url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80', dest: 'public/images/avatars/avatar7.jpg' }, // bearded man
  { url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80', dest: 'public/images/avatars/avatar8.jpg' }, // blonde woman
  { url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80', dest: 'public/images/avatars/avatar9.jpg' }, // young stylish guy
  { url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80', dest: 'public/images/avatars/dom_hill.jpg' },
  { url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80', dest: 'public/images/avatars/john_kelson.jpg' },

  // Story Full View Images
  { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80', dest: 'public/images/stories/story1.jpg' },
  { url: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=800&auto=format&fit=crop&q=80', dest: 'public/images/stories/story2.jpg' },
  { url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&auto=format&fit=crop&q=80', dest: 'public/images/stories/story3.jpg' },
  { url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop&q=80', dest: 'public/images/stories/story4.jpg' },
  { url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80', dest: 'public/images/stories/story5.jpg' },
  { url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80', dest: 'public/images/stories/story6.jpg' },
  { url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80', dest: 'public/images/stories/story7.jpg' },
  { url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80', dest: 'public/images/stories/story8.jpg' },

  // Reels Vertical Images / Posters
  { url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&auto=format&fit=crop&q=80', dest: 'public/images/reels/reel1.jpg' }, // car/drive
  { url: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=600&auto=format&fit=crop&q=80', dest: 'public/images/reels/reel2.jpg' }, // dance
  { url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&auto=format&fit=crop&q=80', dest: 'public/images/reels/reel3.jpg' }, // snowboard / mountains
  { url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80', dest: 'public/images/reels/reel4.jpg' }, // coffee/food
  { url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80', dest: 'public/images/reels/reel5.jpg' }, // fitness

  // Shop Products
  { url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80', dest: 'public/images/shop/shoes.jpg' }, // Nike red shoe
  { url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format&fit=crop&q=80', dest: 'public/images/shop/camera.jpg' }, // camera
  { url: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600&auto=format&fit=crop&q=80', dest: 'public/images/shop/sunglasses.jpg' }, // sunglasses
  { url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80', dest: 'public/images/shop/headphones.jpg' }, // headphones
  { url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80', dest: 'public/images/shop/watch.jpg' }, // watch
  { url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=80', dest: 'public/images/shop/hoodie.jpg' }, // hoodie
  { url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80', dest: 'public/images/shop/backpack.jpg' }, // backpack
  { url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80', dest: 'public/images/shop/cup.jpg' }, // coffee mug

  // Additional Feed / Profile posts
  { url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80', dest: 'public/images/feed/feed_waterfall.jpg' },
  { url: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800&auto=format&fit=crop&q=80', dest: 'public/images/feed/feed_cat.jpg' },
  { url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80', dest: 'public/images/feed/feed_foggy_forest.jpg' },
  { url: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&auto=format&fit=crop&q=80', dest: 'public/images/feed/feed_nature_tree.jpg' },
  { url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=80', dest: 'public/images/feed/feed_party.jpg' },
];

async function main() {
  ensureDir('public/images/avatars');
  ensureDir('public/images/stories');
  ensureDir('public/images/reels');
  ensureDir('public/images/shop');
  ensureDir('public/images/feed');

  console.log(`Starting download of ${assets.length} assets...`);
  for (const asset of assets) {
    try {
      await downloadFile(asset.url, asset.dest);
      console.log(`✓ Downloaded ${asset.dest}`);
    } catch (err) {
      console.error(`✗ Error downloading ${asset.dest}:`, err.message);
    }
  }
  console.log('All downloads completed!');
}

main();
