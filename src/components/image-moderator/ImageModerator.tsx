'use client'
import { useState, useEffect, useRef, ChangeEvent } from 'react';
import * as nsfwjs from 'nsfwjs';

import toast, { Toaster } from 'react-hot-toast';
import { Button } from '../ui/button';
import Image from 'next/image';

interface Prediction {
  className: string;
  probability: number;
}

export default function ImageModerator() {
  const [model, setModel] = useState<nsfwjs.NSFWJS | null>(null);
  const [imageURL, setImageURL] = useState('');
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [threshold, setThreshold] = useState(0.8);
  const imgRef = useRef(null);

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await nsfwjs.load();
      setModel(loadedModel);
    };

    loadModel();
  }, []);

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      console.error("No files selected");
      return;
    }

    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageURL(url);

      if (model) {
        const image = document.createElement('img');
        image.src = url;
        image.onload = async () => {
          try {
            const predictions = await model.classify(image) as Prediction[];
            setPredictions(predictions);
          } catch (error) {
            console.error('Error classifying the image:', error);
          } finally {
            URL.revokeObjectURL(url); // Clean up the object URL
          }
        };
      }
    }
  };

  const isNSFW = predictions.some(p => (p.className === 'Porn' || p.className === 'Sexy') && p.probability > threshold);

  console.log(predictions, "PREDICTIONS")
  console.log(threshold, "THRESHOLD")
  return (
    <div className="container mx-auto p-4 ">
      <Toaster position="top-center" />
      <h1 className="text-2xl font-bold mb-4">NSFW Content Moderation</h1>
      {imageURL ? (
        <div className="w-full mt-4 h-full relative border rounded-md p-4">
          <Image
            className={`w-[500px] mx-auto object-contain ${isNSFW ? 'blur-lg' : ''}`}
            width={200}
            height={200}
            src={imageURL}
            alt="Preview"
          />
             <Button
                size={"icon"}
                className="rounded-full absolute top-4 right-4 bg-red-500"
                onClick={() => setImageURL("")}
              >
                <svg
                  width="14"
                  height="15"
                  viewBox="0 0 14 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 1.76953H9M1 3.76953H13M11.6667 3.76953L11.1991 10.7824C11.129 11.8346 11.0939 12.3606 10.8667 12.7595C10.6666 13.1107 10.3648 13.3931 10.0011 13.5693C9.58798 13.7695 9.06073 13.7695 8.00623 13.7695H5.99377C4.93927 13.7695 4.41202 13.7695 3.99889 13.5693C3.63517 13.3931 3.33339 13.1107 3.13332 12.7595C2.90607 12.3606 2.871 11.8346 2.80086 10.7824L2.33333 3.76953"
                    stroke="#F8FAFC"
                    strokeOpacity="0.57"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
        </div>
      ) : (
        <div className="w-full border p-4 rounded-md h-full flex flex-col items-center justify-center">
          <div className="flex items-center gap-4">
            <Button
              asChild
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 rounded-full flex-wrap cursor-pointer pointer-events-auto"
            >
              <label className="" htmlFor="spark-content">
                <svg
                  width="17"
                  height="15"
                  viewBox="0 0 17 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.83203 10.4362L8.4987 7.76953M8.4987 7.76953L11.1654 10.4362M8.4987 7.76953V13.7695M13.832 10.9314C14.6464 10.2589 15.1654 9.24149 15.1654 8.10286C15.1654 6.07782 13.5237 4.4362 11.4987 4.4362C11.353 4.4362 11.2167 4.3602 11.1428 4.23469C10.2734 2.75942 8.66832 1.76953 6.83203 1.76953C4.07061 1.76953 1.83203 4.00811 1.83203 6.76953C1.83203 8.14693 2.389 9.39425 3.29 10.2986"
                    stroke="#F8FAFC"
                    strokeOpacity="0.57"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-muted">Click to Upload</span>
                <input
                  onChange={handleImageChange}
                  id="spark-content"
                  className="hidden"
                  type="file"
                />
              </label>
            </Button>
            <div className="text-sm text-muted">
              or Drag and drop here
            </div>
          </div>
          {/* <div className="text-xs text-muted mt-4">
            PNG, JPG <span className="text-opacity-40 text-muted">or</span> GIF
          </div> */}
          <div className="text-xs text-muted text-opacity-40">
          </div>
        </div>
      )}
            <div className='mt-4'>
        {predictions.map((p, index) => (
          <div key={index}>
            <p>{`${p.className}: ${(p.probability * 100).toFixed(2)}%`}</p>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <label htmlFor="threshold" className="block mb-2">NSFW Threshold:</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={threshold}
          onChange={(e) => setThreshold(parseFloat(e.target.value))}
          className="w-full"
        />
        <div className="text-center">{threshold}</div>
      </div>
    </div>
  );
}
