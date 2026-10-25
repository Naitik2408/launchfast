const sharp = require('sharp');

async function extractSections() {
  const img = sharp('public/dadum-full.webp');
  
  // In 304 x 1024:
  // 1. Hero group (y: ~38 to 160)
  await sharp('public/dadum-full.webp')
    .extract({ left: 54, top: 40, width: 196, height: 120 })
    .toFile('public/dadum-hero.png');

  // 2. Headliner 1 (Bbalou)
  await sharp('public/dadum-full.webp')
    .extract({ left: 65, top: 188, width: 54, height: 55 })
    .toFile('public/headliner-1.png');

  // 3. Headliner 2 (Emma Vinez)
  await sharp('public/dadum-full.webp')
    .extract({ left: 125, top: 188, width: 54, height: 55 })
    .toFile('public/headliner-2.png');

  // 4. Headliner 3 (Matilda)
  await sharp('public/dadum-full.webp')
    .extract({ left: 185, top: 188, width: 54, height: 55 })
    .toFile('public/headliner-3.png');

  // 5. Crowd / Story Banner
  await sharp('public/dadum-full.webp')
    .extract({ left: 63, top: 572, width: 80, height: 65 })
    .toFile('public/story-crowd.png');

  // 6. Video Player Stage
  await sharp('public/dadum-full.webp')
    .extract({ left: 63, top: 686, width: 178, height: 80 })
    .toFile('public/video-stage.png');

  // 7. Merch Tote Bag
  await sharp('public/dadum-full.webp')
    .extract({ left: 78, top: 835, width: 30, height: 38 })
    .toFile('public/merch-tote.png');

  // 8. Merch Bottle
  await sharp('public/dadum-full.webp')
    .extract({ left: 167, top: 850, width: 30, height: 35 })
    .toFile('public/merch-bottle.png');

  // 9. Merch Cap
  await sharp('public/dadum-full.webp')
    .extract({ left: 213, top: 804, width: 28, height: 28 })
    .toFile('public/merch-cap.png');

  console.log('All Dadum sections extracted cleanly!');
}

extractSections().catch(console.error);
