import fs from 'fs';
import https from 'https';
import http from 'http';

const dir = 'public/reels';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const download = (url, dest) => {
  return new Promise((resolve) => {
    const file = fs.createWriteStream(dest);
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        client.get(res.headers.location, (redRes) => {
          redRes.pipe(file);
          file.on('finish', () => file.close(() => resolve(true)));
        }).on('error', () => resolve(false));
      } else if (res.statusCode === 200) {
        res.pipe(file);
        file.on('finish', () => file.close(() => resolve(true)));
      } else {
        resolve(false);
      }
    }).on('error', () => resolve(false));
  });
};

const videos = [
  { url: 'https://vjs.zencdn.net/v/oceans.mp4', dest: 'public/reels/reel1.mp4' },
  { url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', dest: 'public/reels/reel2.mp4' },
  { url: 'https://www.w3schools.com/html/mov_bbb.mp4', dest: 'public/reels/reel3.mp4' },
  { url: 'https://media.w3.org/2010/05/sintel/trailer.mp4', dest: 'public/reels/reel4.mp4' },
  { url: 'https://media.w3.org/2010/05/bunny/trailer.mp4', dest: 'public/reels/reel5.mp4' },
  { url: 'https://media.w3.org/2010/05/video/movie_300.mp4', dest: 'public/reels/reel6.mp4' },
];

async function run() {
  for (const v of videos) {
    const ok = await download(v.url, v.dest);
    console.log(v.dest, ok ? 'Downloaded' : 'Failed');
  }
}
run();
