import BaseLayout from '../layout/BaseLayout';
import Paragraph from '../components/Paragraph';
import Anchor from '../components/Anchor';
import ImageGrid from '../components/ImageGrid';

import ImageDef from '../types/ImageDef';
import { homeCrumb } from '../types/Crumbs';

import styles from '../styles/module/Photos.module.scss';

type PhotosProps = { photos: ImageDef[] };

// TODO add lazy loading to these, lol
const Photos = ({ photos }: PhotosProps) => {
  return (
    <BaseLayout title='Photos' crumbs={[homeCrumb]}>
      <div className={styles.photos}>
        <Paragraph>
          I travel a lot. Sometimes I take pictures, and every now and then they come out pretty good and I feel like sharing them. Here&#39;s some of those pictures.
        </Paragraph>

        <ImageGrid images={photos} gallery useThumbs />

        <Paragraph>
          All photos here are free to use for whatever you like under the <Anchor href='https://creativecommons.org/licenses/by/4.0/'>Creative Commons Attribution license</Anchor>. To keep file sizes reasonable, all images hosted here are resized to fit a maximum size of 1920×1920 and optimized for the web. If you want one in the original size and quality, just <a href='mailto:teofum@outlook.com'>send me an email</a>.
        </Paragraph>

        <Paragraph>
          For camera nerds like me, most of these pictures were taken with a Nikon D7000 and the amazing <Anchor href='https://www.kenrockwell.com/nikon/35af.htm'>AF-D Nikkor 35mm f/2</Anchor>, which you should absolutely get if you own a Nikon camera and enjoy photography.
        </Paragraph>
      </div>
    </BaseLayout>
  );
};

export const getStaticProps = async () => {
  const photos: ImageDef[] = [
    {
      src: '/content/photos/bpest-street',
      formats: ['jpeg', 'webp'],
      alt: 'Budapest street'
    },
    {
      src: '/content/photos/bpest-ferris',
      formats: ['jpeg', 'webp'],
      alt: 'Budapest ferris wheel',
      vertical: true
    },
    {
      src: '/content/photos/bpest-tram',
      formats: ['jpeg', 'webp'],
      alt: 'Budapest tram'
    },
    {
      src: '/content/photos/bpest-river',
      formats: ['jpeg', 'webp'],
      alt: 'Budapest river'
    },
    {
      src: '/content/photos/bpest-alley',
      formats: ['jpeg', 'webp'],
      alt: 'Budapest alley',
      vertical: true
    },
    {
      src: '/content/photos/bpest-train',
      formats: ['jpeg', 'webp'],
      alt: 'Budapest train'
    },
    {
      src: '/content/photos/bpest-bridge',
      formats: ['jpeg', 'webp'],
      alt: 'Budapest bridge'
    },
    {
      src: '/content/photos/bpest-parl',
      formats: ['jpeg', 'webp'],
      alt: 'Hungarian parliament building at night'
    },
    {
      src: '/content/photos/bpest-parl-day',
      formats: ['jpeg', 'webp'],
      alt: 'Hungarian parliament building'
    },
    {
      src: '/content/photos/london-vette',
      formats: ['jpeg', 'webp'],
      alt: 'Corvette Z06 in London'
    },
    {
      src: '/content/photos/london-shard',
      formats: ['jpeg', 'webp'],
      alt: 'The Shard at dusk',
      vertical: true
    },
    {
      src: '/content/photos/giant-road',
      formats: ['jpeg', 'webp'],
      alt: 'Road entrance to Giant\'s Causeway'
    },
    {
      src: '/content/photos/giant-path',
      formats: ['jpeg', 'webp'],
      alt: 'Trail behind Giant\'s Causeway'
    },
    {
      src: '/content/photos/giant-fields',
      formats: ['jpeg', 'webp'],
      alt: 'Fields behind Giant\'s Causeway'
    },
    {
      src: '/content/photos/giant-wave',
      formats: ['jpeg', 'webp'],
      alt: 'A wave hitting some rocks'
    },
    {
      src: '/content/photos/giant-rocks',
      formats: ['jpeg', 'webp'],
      alt: 'Cool rocks at Giant\'s Causeway'
    },
    {
      src: '/content/photos/giant-pillars',
      formats: ['jpeg', 'webp'],
      alt: 'Very tall rocks'
    },
    {
      src: '/content/photos/vla-boat',
      formats: ['jpeg', 'webp'],
      alt: 'A boat in a lake'
    },
    {
      src: '/content/photos/vla-mountain',
      formats: ['jpeg', 'webp'],
      alt: 'Lake and mountains landscape'
    },
    {
      src: '/content/photos/vla-trail',
      formats: ['jpeg', 'webp'],
      alt: 'Forest trail by a stream'
    },
    {
      src: '/content/photos/vla-flower',
      formats: ['jpeg', 'webp'],
      alt: 'An orange flower'
    },
    {
      src: '/content/photos/vla-pier',
      formats: ['jpeg', 'webp'],
      alt: 'Lake pier'
    },
    {
      src: '/content/photos/vla-wave',
      formats: ['jpeg', 'webp'],
      alt: 'A wave'
    },
    {
      src: '/content/photos/wing',
      formats: ['jpeg', 'webp'],
      alt: 'Airplane wing'
    }
  ];

  return {
    props: {
      photos
    }
  };
};

export default Photos;
