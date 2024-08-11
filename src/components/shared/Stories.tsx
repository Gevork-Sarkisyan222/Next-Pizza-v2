'use client';

import React, { useEffect } from 'react';
import { Api } from '../../../services/api-client';
import { IStory } from '../../../services/stories';
import { Container } from './Container';
import Image from 'next/image';
import { X } from 'lucide-react';
import ReactStories from 'react-insta-stories';
import toast from 'react-hot-toast';

function Stories() {
  const [stories, setStories] = React.useState<IStory[]>([]);
  const [open, setOpen] = React.useState(false);
  const [selectedStory, setSelectedStory] = React.useState<IStory>();

  React.useEffect(() => {
    async function fetchStories() {
      try {
        const data = await Api.stories.getAll();
        setStories(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchStories();
  }, []);

  const onClickStory = (story: IStory) => {
    setSelectedStory(story);

    if (story.items.length > 0) {
      setOpen(true);
    }

    if (story.items.length === 0) {
      toast.error('Сторисы пустые');
    }
  };

  useEffect(() => {
    open && document.body.classList.add('no-scroll');

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [open]);

  return (
    <Container className="flex items-center justify-between gap-2 my-10">
      {stories.length === 0 ? (
        [...Array(6)].map((_, index) => (
          <div
            key={index}
            className="w-[200px] h-[250px] bg-gray-200 animate-pulse rounded-md cursor-pointer"
          />
        ))
      ) : (
        <>
          {stories.map((story) => (
            <Image
              key={story.id}
              onClick={() => onClickStory(story)}
              className="rounded-md cursor-pointer"
              width={200}
              height={250}
              src={story.previewImageUrl}
              alt="story image"
            />
          ))}
        </>
      )}

      {open && (
        <div className="absolute left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-[5555555555555]">
          <div className="relative" style={{ width: 520 }}>
            <button className="absolute -right-10 -top-5 z-30" onClick={() => setOpen(false)}>
              <X className="absolute top-5 right-0 w-8 h-8 text-white/50" />
            </button>

            <ReactStories
              onAllStoriesEnd={() => setOpen(false)}
              stories={selectedStory?.items.map((item) => ({ url: item.sourceUrl })) || []}
              defaultInterval={3000}
              width={520}
              height={700}
            />
          </div>
        </div>
      )}
    </Container>
  );
}

export default Stories;
