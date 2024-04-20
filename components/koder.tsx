"use client"
import React, { useEffect } from 'react';
import Koder from '@maslick/koder';
import { loadImage, createCanvas } from 'canvas';

const MyComponent: React.FC = () => {
  useEffect(() => {
    const getImageData = async (src: string) => {
      const img = await loadImage(src);
      const canvas = createCanvas(img.width, img.height);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      return {
        data: ctx.getImageData(0, 0, img.width, img.height).data,
        width: img.width,
        height: img.height
      };
    };

    (async () => {
      const url = 'https://raw.githubusercontent.com/maslick/koder/master/screenshots/app_1.png';
      const koder = await new Koder().initialized;
      const { data, width, height } = await getImageData(url);

      const t0 = new Date().getTime();
      const res = koder.decode(data, width, height);
      const t1 = new Date().getTime();

      console.log(`Scanned in ${t1 - t0} ms`);
      console.log(res);
    })();
  }, []);

  return (
    <div>
      <h1>QR Code Scanner</h1>
      <p>Open the console to see the scanned result.</p>
    </div>
  );
};

export default MyComponent;
