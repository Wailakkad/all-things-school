'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Clock,
  Heart,
  Bookmark,
  Share2,
  Check,
  ChevronDown,
  ListOrdered,
  Sparkles,
} from 'lucide-react';
import { useSiteState } from '../../../lib/saved-context';

interface Hairstyle {
  id: number;
  name: string;
  time: string;
  bestFor: string;
  description: string;
  image: string;
  steps: string[];
}

interface HairstyleCategory {
  title: string;
  subtitle: string;
  color: string;
  emoji: string;
  items: Hairstyle[];
}

const CATEGORIES: HairstyleCategory[] = [
  {
    title: '5-Minute Ponytails',
    subtitle: 'Quick, polished, always school-ready',
    color: '#F47C7C',
    emoji: '\uD83D\uDC87',
    items: [
      { id: 1, name: 'Classic High Ponytail', time: '2 min', bestFor: 'All hair types', description: 'Gather all hair at the crown and secure with a soft elastic. Pull a small section from the ponytail and wrap it around the base to hide the tie. Simple, timeless, and survives any playground adventure.', image: 'https://res.cloudinary.com/dhkyla1rv/image/upload/v1788456605/Classic_High_Ponytail.jpg', steps: ['Brush all hair upward toward the crown, smoothing bumps with your fingers or a boar-bristle brush.', 'Hold the gathered hair firmly and secure with a soft fabric elastic, wrapping it 2\u20133 times.', 'Take a thin section from the underside of the ponytail.', 'Wrap that section around the base to conceal the elastic.', 'Tuck the end under the elastic or pin with a hidden bobby pin.', 'Mist lightly with water or a light-hold spray to smooth flyaways.'] },
      { id: 2, name: 'Side-Swept Ponytail', time: '2 min', bestFor: 'Medium to long hair', description: 'Create a deep side part, then gather hair low behind one ear. This asymmetrical twist looks instantly more polished and keeps hair away from the face during class.', image: 'https://res.cloudinary.com/dhkyla1rv/image/upload/v1788456623/Side-Swept_Ponytail.jpg', steps: ['Create a deep side part using a comb or your finger.', 'Brush all hair smoothly toward the lower side, gathering behind the ear at nape level.', 'Secure with a soft elastic, keeping the ponytail low and to one side.', 'Gently tug the crown area for a little volume.', 'Wrap a small section around the elastic or leave a scrunchie visible for color.'] },
      { id: 3, name: 'Bubble Ponytail', time: '4 min', bestFor: 'Long hair', description: 'Make a high ponytail, then add elastics every two inches. Gently tug each section to create a rounded "bubble" effect. Fun, playful, and looks much harder than it is.', image: 'https://res.cloudinary.com/dhkyla1rv/image/upload/v1788456743/Bubble_Ponytail.jpg', steps: ['Create a high or mid-height ponytail and secure with a firm elastic.', 'About two inches below, tie a clear elastic around the ponytail.', 'Gently tug the hair between elastics outward to create a rounded "bubble."', 'Repeat: add another elastic two inches lower, then tug into a bubble.', 'Continue until two inches from the ends.', 'Secure the final end. Fluff any uneven bubbles.'] },
      { id: 4, name: 'Low Ponytail with Bow', time: '2 min', bestFor: 'All hair types', description: 'Pull hair back into a low ponytail at the nape and tie with a fabric bow or scrunchie. The bow adds a sweet touch without extra effort.', image: 'https://res.cloudinary.com/dhkyla1rv/image/upload/v1788456748/Low_Ponytail_with_Bow.jpg', steps: ['Brush hair smooth and gather at the nape of the neck.', 'Secure with a soft elastic.', 'Slide a fabric bow clip or tie a ribbon bow over the elastic.', 'Adjust the bow so it sits centered or slightly to one side.', 'Smooth flyaways with a tiny dab of styling cream on your fingertips.'] },
      { id: 5, name: 'Double Ponytails', time: '3 min', bestFor: 'All hair types', description: 'Part hair down the middle and create two low ponytails. This youthful style keeps thick hair manageable and looks adorable on younger kids.', image: 'https://res.cloudinary.com/dhkyla1rv/image/upload/v1788456749/Double_Ponytails_Low_Pigtails.jpg', steps: ['Create a center part from forehead to nape.', 'Gather the right section into a low ponytail behind the ear and secure.', 'Repeat on the left side at the same height.', 'Tug gently at the crown for soft volume.', 'Optional: wrap hair around each elastic or use matching scrunchies.'] },
    ],
  },
  {
    title: 'Easy Braids',
    subtitle: 'Protective styles that last all day',
    color: '#8FAF9A',
    emoji: '\uD83E\uDDF5',
    items: [
      { id: 6, name: 'Three-Strand Side Braid', time: '3 min', bestFor: 'Medium to long hair', description: 'Sweep all hair to one side and create a classic three-strand braid. Secure with a clear elastic. Timeless and keeps hair neat through PE and art class.', image: 'https://res.cloudinary.com/dhkyla1rv/image/upload/v1788456731/Simple_Three-Strand_Side_Braid.jpg', steps: ['Sweep all hair over one shoulder.', 'Divide into three equal sections.', 'Cross the right section over the middle, then left over the new middle.', 'Repeat right-over-middle, left-over-middle down the length.', 'Secure the ends with a clear elastic.', 'Gently pull on each braid loop to loosen and widen for fullness.'] },
      { id: 7, name: 'Fishtail Accent Braid', time: '5 min', bestFor: 'All hair types', description: 'Take a small section near the temple and create a thin fishtail braid, blending it into loose hair. A delicate touch without a full updo.', image: 'https://res.cloudinary.com/dhkyla1rv/image/upload/v1788456630/Fishtail_Accent_Braid.jpg', steps: ['Take a 2-inch section near one temple.', 'Split it into two equal halves.', 'Take a tiny piece from the outer left edge and cross to the right.', 'Take a tiny piece from the outer right edge and cross to the left.', 'Repeat this criss-cross pattern to the ends.', 'Secure with a small clear elastic and blend into loose hair.'] },
      { id: 8, name: 'Braided Headband', time: '4 min', bestFor: 'All hair types', description: 'Braid a section from one ear across the forehead like a headband, securing behind the opposite ear. Keeps bangs and flyaways off beautifully.', image: 'https://res.cloudinary.com/dhkyla1rv/image/upload/v1788456630/Braided_Headband.jpg', steps: ['Take a 2-inch section from just above one ear.', 'Begin a three-strand braid directing toward the forehead.', 'Braid to the ends and secure with a tiny clear elastic.', 'Drape across the top of the head, 2 inches from the hairline.', 'Tuck the end behind the opposite ear and pin with 2\u20133 bobby pins.', 'Cover the pinned end with loose hair from above the ear.'] },
      { id: 9, name: 'Double French Braids', time: '5 min', bestFor: 'All hair types', description: 'Part hair center and create two French braids from forehead to nape. Secure style that holds during sports and keeps hair completely out of the way.', image: 'https://res.cloudinary.com/dhkyla1rv/image/upload/v1788456675/Double_French_Braids.jpg', steps: ['Create a clean center part from forehead to nape.', 'On the right, take a 2-inch section near the hairline and split into three.', 'French braid by adding small sections to each strand as you cross over.', 'At the nape, continue with a regular three-strand braid to the ends.', 'Repeat on the left side, mirroring the technique.', 'Optional: gently pancake the braid edges for a fuller look.'] },
      { id: 10, name: 'Pull-Through Braid', time: '5 min', bestFor: 'Long hair', description: 'A series of small ponytails, splitting each and pulling the next through. Looks like an intricate braid but requires zero braiding skills.', image: 'https://res.cloudinary.com/dhkyla1rv/image/upload/v1788456608/Pull-Through_Braid.jpg', steps: ['Take a small section at the crown and tie with a clear elastic.', 'Take a second section below and tie into a ponytail.', 'Split the first ponytail into two halves.', 'Pull the second ponytail up through the split.', 'Take a third section, tie it, split the second, and pull the third through.', 'Continue down the length. Tug each loop outward for volume.'] },
    ],
  },
  {
    title: 'Buns & Half-Up',
    subtitle: 'Effortlessly chic for every school day',
    color: '#E5A93C',
    emoji: '\uD83D\uDCAB',
    items: [
      { id: 11, name: 'Messy Top Knot', time: '2 min', bestFor: 'Medium to long hair', description: 'Pull hair into a high ponytail, twist into a bun, secure with a scrunchie. The messy look is the whole point. Pull out face-framing pieces for softness.', image: 'https://res.cloudinary.com/dhkyla1rv/image/upload/v1788457717/Messy_Top_Knot.jpg', steps: ['Flip your head upside down and gather all hair into a high ponytail.', 'Secure with a fabric elastic, but on the last wrap pull only halfway through to make a loop.', 'Wrap loose ends around the base and tuck under the elastic.', 'Use 1\u20132 bobby pins to anchor loose pieces.', 'Pull out thin strands around the face and ears.', 'Tug the bun gently in all directions for messy volume.'] },
      { id: 12, name: 'Half-Up Claw Clip', time: '1 min', bestFor: 'All hair types', description: 'Gather the top section and clip it at the back with a claw clip. The fastest way to look put-together with 60 seconds to spare.', image: 'https://res.cloudinary.com/dhkyla1rv/image/upload/v1788457719/Half-Up_Claw_Clip.jpg', steps: ['Trace a line from above each ear to the back of the crown to section the top half.', 'Gather the top section at the back of your head.', 'Twist once or twice for a cleaner look (optional).', 'Open the claw clip and clamp over the twisted section.', 'Adjust the remaining loose hair to fall naturally.'] },
      { id: 13, name: 'Double Space Buns', time: '4 min', bestFor: 'All hair types', description: 'Part center and create two buns on top. Secure with elastics and bobby pins. Fun, trendy, and perfect for spirit days or picture day.', image: 'https://res.cloudinary.com/dhkyla1rv/image/upload/v1788457721/Double_Space_Buns.jpg', steps: ['Create a clean center part from forehead to nape.', 'Gather the right section into a high ponytail on top and secure.', 'Twist into a bun, wrapping ends around the base.', 'Secure with bobby pins or a second elastic.', 'Repeat on the left at the same height.', 'Tug each bun for a fuller shape. Pin loose strands.'] },
      { id: 14, name: 'Low Bun with Headband', time: '3 min', bestFor: 'All hair types', description: 'Pull hair into a low bun at the nape, then slide a fabric headband over. Adds color and keeps baby hairs smooth all day.', image: 'https://res.cloudinary.com/dhkyla1rv/image/upload/v1788457712/Low_Bun_with_Headband.jpg', steps: ['Brush all hair back smoothly toward the nape.', 'Gather into a low ponytail and secure.', 'Twist into a tight coil and wrap into a bun.', 'Pin with 3\u20134 bobby pins around the edges.', 'Slide a fabric headband over, 2 inches from the hairline.', 'Use a small brush to smooth baby hairs under the headband.'] },
      { id: 15, name: 'Half-Up Twist', time: '3 min', bestFor: 'All hair types', description: 'Take two front sections, twist them back, and pin together at the crown. Romantic, soft, and keeps hair out of the eyes.', image: 'https://res.cloudinary.com/dhkyla1rv/image/upload/v1788457666/Half-Up_Twist.jpg', steps: ['Take a 1-inch section from the right side near the temple.', 'Twist it away from your face toward the back.', 'Hold at the back and repeat on the left side.', 'Cross the two twisted sections at the crown.', 'Secure with 2\u20133 bobby pins, hiding under the twists.', 'Gently pull on twists to loosen for a softer look.'] },
    ],
  },
  {
    title: 'Short Hair',
    subtitle: 'Cute styles for pixies, bobs, and crops',
    color: '#1F2A44',
    emoji: '\u2702\uFE0F',
    items: [
      { id: 16, name: 'Pixie + Headband', time: '1 min', bestFor: 'Short / pixie hair', description: 'Slide a colorful headband over a pixie cut for instant personality. Zero styling required beyond placing the band.', image: 'https://res.cloudinary.com/dhkyla1rv/image/upload/v1788457561/Pixie_Cut_with_Headband.jpg', steps: ['Choose a fabric or elastic headband that complements the outfit.', 'Hold with both hands and slide over the head from the front.', 'Position 1\u20132 inches from the hairline.', 'Adjust the hair in front for soft, face-framing texture.', 'Optional: use a tiny bit of styling cream to piece out the top.'] },
      { id: 17, name: 'Textured Crop + Clips', time: '2 min', bestFor: 'Short to medium hair', description: 'Add texture with styling cream, then pin one side back with two decorative clips. Asymmetrical editorial look in seconds.', image: 'https://res.cloudinary.com/dhkyla1rv/image/upload/v1788457600/Textured_Crop_with_Clips.jpg', steps: ['Rub a pea-sized amount of styling cream between palms.', 'Work through the hair, scrunching and tousling for texture.', 'Sweep the right side back behind the ear.', 'Place two decorative clips parallel, about an inch apart.', 'Adjust the top and left for a tousled, asymmetric shape.', 'Mist with light-hold spray if needed.'] },
      { id: 18, name: 'Side-Swept Bangs + Pin', time: '1 min', bestFor: 'Short to medium hair', description: 'Sweep bangs to one side and secure with a decorative pin. Keeps hair out of the eyes during reading without sacrificing style.', image: 'https://res.cloudinary.com/dhkyla1rv/image/upload/v1788457570/Side-Swept_Bangs_with_Pin.jpg', steps: ['Comb bangs to one side for a smooth, even sweep.', 'Hold the swept section flat against the temple.', 'Slide a decorative pin in from the top, angling slightly upward.', 'Ensure the pin catches enough hair to hold all day.', 'Adjust remaining hair to fall naturally around the pin.'] },
    ],
  },
  {
    title: 'Curly Hair',
    subtitle: 'Embrace natural texture with confidence',
    color: '#F47C7C',
    emoji: '\uD83D\uDCA6',
    items: [
      { id: 19, name: 'Curly Pineapple Updo', time: '3 min', bestFor: 'Curly / coily hair', description: 'Gather all curls loosely on top of the head with a silk scrunchie. Preserves curl definition and works as a bold daytime style too.', image: 'https://res.cloudinary.com/dhkyla1rv/image/upload/v1788457545/Curly_Pineapple_Updo.jpg', steps: ['Flip your head forward so all curls hang toward the floor.', 'Gather all hair loosely at the very top of the head.', 'Secure with a silk or satin scrunchie\u2014do not pull tight.', 'Let curls cascade forward and to the sides.', 'Arrange individual curls with your fingers for balance.', 'Optional: wrap a scarf around the base for frizz control.'] },
      { id: 20, name: 'Twist-Out Coils', time: '5 min (night before)', bestFor: 'Curly / coily hair', description: 'Twist small sections of damp hair the night before and unravel in the morning. A wash-day style that lasts 3\u20134 school days.', image: 'https://res.cloudinary.com/dhkyla1rv/image/upload/v1788457576/Twist-Out_Coils.jpg', steps: ['On wash day, apply leave-in conditioner and curl cream to damp hair.', 'Divide hair into 8\u201312 equal sections.', 'Twist each section tightly from root to tip (two-strand twist).', 'Secure each twist with a small clip or let it hang.', 'Sleep on a satin pillowcase or with a satin bonnet.', 'In the morning, unravel gently and separate with fingers\u2014do not brush.'] },
      { id: 21, name: 'Curly Half-Up Puff', time: '2 min', bestFor: 'Curly / coily hair', description: 'Gather the top section of curls into a puff with a fabric band. Remaining curls frame the face while the puff adds height.', image: 'https://res.cloudinary.com/dhkyla1rv/image/upload/v1788458480/Curly_Half-Up_Puff.jpg', steps: ['Section off the top half from above the ears to the crown.', 'Gather the top section and pull upward.', 'Secure with a fabric band or puff cuff at the crown.', 'Fluff the curls in the puff by gently pulling outward.', 'Arrange loose curls around the face for balance.'] },
      { id: 22, name: 'Braided Curly Ponytail', time: '4 min', bestFor: 'Curly / wavy hair', description: 'A loose braid from a low ponytail, leaving the ends curly. Controls volume while showing off natural texture.', image: 'https://res.cloudinary.com/dhkyla1rv/image/upload/v1788458475/Braided_Curly_Ponytail.jpg', steps: ['Gather all hair into a low ponytail at the nape and secure.', 'Loosely braid with a three-strand technique, keeping tension gentle.', 'Stop braiding about 3 inches from the ends.', 'Secure the braid with a clear elastic.', 'Gently tug on braid sections to loosen and add width.', 'Fluff the curly tail with your fingers for volume.'] },
      { id: 23, name: 'Wash-and-Go + Diffuser', time: '5 min', bestFor: 'Wavy / curly hair', description: 'Apply leave-in conditioner to wet hair, then use a diffuser on low heat. Quick, low-manipulation, and celebrates natural texture.', image: 'https://res.cloudinary.com/dhkyla1rv/image/upload/v1788458468/Wash-and-Go_Curly_Definition_No_tools_shown.jpg', steps: ['Start with freshly washed, soaking wet hair.', 'Apply leave-in conditioner, scrunching upward through curls.', 'Add a golf-ball-sized amount of curl cream or gel.', 'Attach a diffuser, set to low heat and low speed.', 'Cup sections in the diffuser bowl, hold against scalp 15\u201320 seconds.', 'Repeat until 80\u201390% dry. Let the rest air-dry.'] },
    ],
  },
  {
    title: 'Picture Day',
    subtitle: 'Special touches with accessories',
    color: '#8FAF9A',
    emoji: '\uD83D\uDCF8',
    items: [
      { id: 24, name: 'Ribbon-Woven Braid', time: '5 min', bestFor: 'Long hair', description: 'Weave a satin ribbon through a three-strand braid for a colorful, photo-ready look. Match ribbon to school colors or outfit.', image: 'https://res.cloudinary.com/dhkyla1rv/image/upload/v1788458448/Ribbon-Woven_Braid.jpg', steps: ['Cut a 24-inch satin ribbon and fold in half.', 'Drape the folded ribbon over a braid section so two tails hang with two hair strands.', 'Braid normally, treating each ribbon tail as part of a strand.', 'Braid to the ends, incorporating ribbon fully.', 'Secure with an elastic, tucking ribbon ends in.', 'Adjust braid loops so ribbon peeks through evenly.'] },
      { id: 25, name: 'Floral Clip Updo', time: '4 min', bestFor: 'Medium to long hair', description: 'Create a messy bun and tuck two or three floral clips around the base. Instantly photo-worthy and special.', image: 'https://res.cloudinary.com/dhkyla1rv/image/upload/v1788458394/Floral_Clip_Updo.jpg', steps: ['Create a messy top knot (see Hairstyle #11).', 'Choose 2\u20133 small floral clips that complement the outfit.', 'Place the first clip at the bun base on one side.', 'Place the second on the opposite side, slightly higher.', 'Add the third at the back if desired.', 'Adjust clips so they are visible from the front.'] },
      { id: 26, name: 'Glitter Part Line', time: '2 min', bestFor: 'All hair types', description: 'Apply a thin line of hair-safe glitter gel along the part. Subtle for school, sparkly for photos.', image: 'https://res.cloudinary.com/dhkyla1rv/image/upload/v1788458367/Glitter_Part_Line.jpg', steps: ['Create a clean part using a comb.', 'Squeeze a thin line of glitter gel onto your fingertip or a small brush.', 'Trace directly along the part from forehead to crown.', 'Press gently to ensure glitter adheres.', 'Allow 30 seconds to dry.', 'Style the rest of the hair as desired.'] },
      { id: 27, name: 'Scrunchie Stack Ponytail', time: '2 min', bestFor: 'All hair types', description: 'Create a high ponytail and stack two or three coordinating scrunchies. Layered look adds dimension and color.', image: 'https://res.cloudinary.com/dhkyla1rv/image/upload/v1788458355/Scrunchie_Stack_Ponytail.jpg', steps: ['Gather all hair into a high ponytail at the crown.', 'Secure with a firm elastic as the base.', 'Slide the first scrunchie to the base.', 'Slide a second, contrasting scrunchie on top.', 'Optional: add a third for extra volume.', 'Adjust the ponytail hair to fan out evenly above the stack.'] },
      { id: 28, name: 'Bow-Tied Half-Up', time: '3 min', bestFor: 'All hair types', description: 'Pull the top section back and tie with a fabric bow instead of an elastic. The bow becomes the focal point.', image: 'https://res.cloudinary.com/dhkyla1rv/image/upload/v1788458349/Bow-Tied_Half-Up.jpg', steps: ['Section off the top half from above the ears.', 'Gather it at the back of the head.', 'Tie a fabric bow ribbon around the section.', 'Adjust bow loops so they are even and facing outward.', 'Let the remaining hair fall loosely.', 'Smooth flyaways with a touch of styling cream.'] },
      { id: 29, name: 'Beaded Braid Accents', time: '5 min', bestFor: 'All hair types', description: 'Thread colorful beads onto braid ends. Kids love choosing their own colors\u2014a fun morning bonding activity.', image: 'https://res.cloudinary.com/dhkyla1rv/image/upload/v1788458319/Beaded_Braid_Accents.jpg', steps: ['Create a three-strand braid, leaving 3 inches unbraided at the ends.', 'Thread 3\u20135 small beads onto a beading tool or thin wire loop.', 'Slide beads from the tool onto the unbraided ends.', 'Secure with a clear elastic tied just above the beads.', 'Repeat on the other side for double braids.', 'Let the child choose their bead colors.'] },
      { id: 30, name: 'Woven Crown Braid', time: '5 min', bestFor: 'Long hair', description: 'Two braids from behind each ear, brought up and over the head. Looks like a tiara made of hair\u2014perfect for photos.', image: 'https://res.cloudinary.com/dhkyla1rv/image/upload/v1788458290/Woven_Crown_Braid.jpg', steps: ['Part hair down the center.', 'Take a section behind the right ear and braid to the ends. Secure.', 'Repeat on the left side.', 'Lift the right braid up and over the head, 2 inches from the hairline.', 'Pin in place, hiding pins under the braid.', 'Lift the left braid behind the first. Pin and tuck ends underneath.'] },
    ],
  },
];

const FAQ_ITEMS = [
  { q: 'How do you do quick school hair in the morning?', a: 'Start by prepping hair the night before\u2014brush out tangles and apply a light leave-in conditioner. In the morning, mist with water, detangle quickly, and choose a style based on your time budget: 1\u20132 minutes for a ponytail or claw clip, 3\u20134 minutes for braids or buns. Keep all supplies in a dedicated "hair station" basket so you\u2019re not searching for a bobby pin at 7:45 AM.' },
  { q: 'What are the best no-heat hairstyles for kids?', a: 'Ponytails, braids, buns, and half-up styles are all excellent no-heat options. They protect young hair from heat damage, take under 5 minutes, and hold up through a full school day. Bubble ponytails, pull-through braids, and messy top knots are especially popular because they look intricate but require zero heat tools.' },
  { q: 'How can I make my kid\u2019s hairstyle last all day?', a: 'Use soft fabric-covered elastics (never rubber bands), double up ties at the base of ponytails for extra hold, and avoid heavy products that weigh hair down. For very active kids, braided styles and double French braids tend to last the longest through PE and recess.' },
  { q: 'What hairstyles work best for curly hair?', a: 'Curly pineapple updos, twist-outs, and curly half-up puffs are ideal because they work with the natural curl pattern instead of against it. Avoid tight ponytails that flatten curls\u2014instead, use silk scrunchies and leave-in conditioner to maintain definition and reduce frizz.' },
  { q: 'How do I get my child to cooperate?', a: 'Let them pick their style the night before using a printed "style menu" on the bathroom mirror. Give them small choices (which scrunchie color, which side for the braid) to build ownership. Older kids can learn to do their own simple styles\u2014a claw clip or basic ponytail takes 2 minutes and builds independence.' },
  { q: 'Are these appropriate for school dress codes?', a: 'Yes, all 30 styles are school-appropriate. They keep hair neat and out of the face, use modest accessories, and avoid anything distracting or unsafe. Glitter gel and colorful beads are generally allowed but check your school\u2019s specific policy.' },
];

export default function HairstylesArticle() {
  const { isSaved, toggleSave } = useSiteState();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(760);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openTutorial, setOpenTutorial] = useState<number | null>(null);
  const [activeCat, setActiveCat] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const catRefs = useRef<(HTMLElement | null)[]>([]);
  const articleId = '7';

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = catRefs.current.indexOf(entry.target as HTMLElement);
            if (idx !== -1) setActiveCat(idx);
          }
        });
      },
      { rootMargin: '-100px 0px -60% 0px', threshold: 0 }
    );
    catRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToCat = (idx: number) => {
    setActiveCat(idx);
    catRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((p) => (liked ? p - 1 : p + 1));
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#F5EFE6] text-[#333333]">
      {/* Sticky Mobile Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-xl border-t border-[#1F2A44]/10 px-4 py-3 flex items-center justify-between gap-3 sm:hidden">
        <button
          onClick={() => toggleSave(articleId)}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            isSaved(articleId)
              ? 'bg-[#F47C7C] text-white'
              : 'bg-[#F5EFE6] text-[#1F2A44]'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${isSaved(articleId) ? 'fill-white' : ''}`} />
          {isSaved(articleId) ? 'Saved' : 'Save'}
        </button>
        <button
          onClick={handleLike}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            liked ? 'bg-[#F47C7C] text-white' : 'bg-[#F5EFE6] text-[#1F2A44]'
          }`}
        >
          <Heart className={`w-4 h-4 ${liked ? 'fill-white' : 'text-[#F47C7C]'}`} />
          {likeCount}
        </button>
        <button
          onClick={handleCopyLink}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold bg-[#F5EFE6] text-[#1F2A44] cursor-pointer"
        >
          {copiedLink ? <Check className="w-4 h-4 text-[#8FAF9A]" /> : <Share2 className="w-4 h-4" />}
          {copiedLink ? 'Copied!' : 'Share'}
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 pb-24 sm:pb-16">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 sm:gap-2 bg-white text-[#1F2A44] hover:bg-[#1F2A44] hover:text-white px-3 sm:px-4 py-2 rounded-xl sm:rounded-2xl text-xs font-bold transition-all shadow-2xs border border-[#1F2A44]/10"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden xs:inline">Back</span>
          </Link>
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => toggleSave(articleId)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                isSaved(articleId)
                  ? 'bg-[#F47C7C] text-white shadow-2xs'
                  : 'bg-white text-[#1F2A44] hover:bg-[#F5EFE6] border border-[#1F2A44]/10'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved(articleId) ? 'fill-white' : ''}`} />
              {isSaved(articleId) ? 'Saved' : 'Save'}
            </button>
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 bg-white text-[#1F2A44] hover:bg-[#1F2A44] hover:text-white px-3.5 py-2 rounded-full text-xs font-bold transition-all border border-[#1F2A44]/10 cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-[#8FAF9A]" /> : <Share2 className="w-3.5 h-3.5" />}
              {copiedLink ? 'Copied!' : 'Share'}
            </button>
          </div>
        </div>

        {/* Hero */}
        <header className="relative rounded-[2rem] overflow-hidden mb-6 sm:mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F47C7C]/20 via-[#F5EFE6] to-[#8FAF9A]/20" />
          <div className="relative p-5 sm:p-8 md:p-10 flex flex-col gap-5">
            {/* Decorative blurs */}
            <div className="absolute -top-20 -right-20 w-56 h-56 bg-[#F47C7C]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-[#8FAF9A]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative w-full aspect-[16/9] sm:aspect-[2.4/1] rounded-2xl overflow-hidden shadow-lg border border-white/50">
              <img src="https://res.cloudinary.com/dhkyla1rv/image/upload/v1788467130/Design_school_hairstyles_blog_cover_202609032224.jpg" alt="30 Cute Easy School Hairstyles for Kids" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#1F2A44] text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full">07 &bull; Teacher Hacks</span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="bg-[#F47C7C] text-white text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full uppercase tracking-wider">Teacher Hacks</span>
              <span className="bg-white/70 backdrop-blur-sm text-[#1F2A44] text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full">Back to School</span>
              <span className="bg-white/70 backdrop-blur-sm text-[#F47C7C] text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full flex items-center gap-1"><Clock className="w-3 h-3" />9 min</span>
            </div>

            <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1F2A44] leading-[1.1] tracking-tight">
              30 Cute Easy School Hairstyles for Kids
            </h1>

            <p className="text-sm sm:text-base text-[#333333]/80 leading-relaxed max-w-2xl">
              Need cute easy hairstyles for school for kids? Explore 30 quick 5-minute, no-heat school hairstyles&mdash;braids, ponytails, buns, and more for busy mornings.
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-[#1F2A44]/10 text-xs text-[#333333]/70">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#1F2A44] text-white font-bold flex items-center justify-center text-xs shadow-sm">SJ</div>
                <div className="flex flex-col">
                  <span className="font-bold text-[#1F2A44] text-xs sm:text-sm">Sarah Jenkins, M.Ed.</span>
                  <span className="text-[10px] sm:text-[11px] text-[#333333]/60">3rd Grade Educator</span>
                </div>
              </div>
              <div className="flex items-center gap-3 font-semibold text-[#1F2A44] ml-auto">
                <span className="flex items-center gap-1 text-[10px] sm:text-xs"><Clock className="w-3 h-3 text-[#8FAF9A]" />Sep 03, 2026</span>
                <button onClick={handleLike} className={`hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full transition-colors cursor-pointer text-[10px] sm:text-xs ${liked ? 'bg-[#F47C7C] text-white' : 'bg-white/70 text-[#1F2A44] hover:bg-[#F47C7C]/20'}`}>
                  <Heart className={`w-3 h-3 ${liked ? 'fill-white' : 'text-[#F47C7C]'}`} />
                  {likeCount}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Intro */}
        <section className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-[#1F2A44]/5 shadow-sm mb-5 sm:mb-8">
          <h2 className="text-lg sm:text-2xl font-bold text-[#1F2A44] mb-3 sm:mb-4">Why No-Heat Hairstyles Win Every Morning</h2>
          <div className="text-sm text-[#333333] leading-relaxed space-y-3 sm:space-y-4">
            <p>Mornings before school are chaos&mdash;alarm clocks snoozed, backpacks still half-packed, and a child standing in the doorway insisting they have <em>nothing</em> to wear. The last thing any parent or teacher needs is a hairstyle that takes 20 minutes and a arsenal of hot tools.</p>
            <p>The good news? You don&apos;t need a blow dryer, curling iron, or any heat whatsoever to send your kid out the door looking polished and feeling confident. <strong>Cute easy hairstyles for school for kids</strong> are all about speed, simplicity, and styles that actually survive recess, PE, and a full day of learning.</p>
            <p>We&apos;ve rounded up <strong>30 no-heat hairstyles</strong> organized by time, hair type, and difficulty level. Whether your child has pin-straight strands, tight curls, or something in between, you&apos;ll find a go-to style that takes five minutes or less&mdash;no salon skills required.</p>
            <p>Pair these with a solid morning routine (check out our <Link href="/blog/color-coded-10-drawer-rolling-cart-organization" className="text-[#F47C7C] font-semibold underline underline-offset-2 hover:text-[#1F2A44]">rolling cart organization guide</Link>), and you&apos;ll wonder why mornings ever felt stressful.</p>
          </div>
        </section>

        {/* Tools You Need */}
        <section className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-[#1F2A44]/5 shadow-sm mb-5 sm:mb-8">
          <h2 className="text-lg sm:text-2xl font-bold text-[#1F2A44] mb-2 sm:mb-3">Tools You Need</h2>
          <p className="text-xs sm:text-sm text-[#333333]/60 mb-4">Keep these in a small basket near the mirror.</p>
          <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none sm:grid sm:grid-cols-4 sm:gap-3 sm:overflow-visible">
            {['Detangling Brush', 'Soft Hair Ties', 'Bobby Pins', 'Clear Elastics', 'Claw Clips', 'Scrunchies', 'Spray Bottle', 'Leave-In Cond.'].map((tool, i) => (
              <div key={i} className="flex-shrink-0 w-[100px] sm:w-auto bg-gradient-to-br from-[#F5EFE6] to-white p-3 rounded-xl border border-[#1F2A44]/5 text-center">
                <div className="w-9 h-9 rounded-lg bg-[#8FAF9A]/15 flex items-center justify-center mx-auto mb-1.5 text-base">
                  {['\uD83E\uDDF8', '\uD83D\uDD00', '\uD83E\uDEA1', '\uD83E\uDDF7', '\uD83E\uDDFA', '\uD83D\uDD04', '\uD83D\uDCE6', '\uD83C\uDF1F'][i]}
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-[#1F2A44] leading-tight block">{tool}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Sticky Category Nav */}
        <nav className="sticky top-14 sm:top-16 z-30 bg-white/80 backdrop-blur-xl rounded-2xl p-2 sm:p-3 border border-[#1F2A44]/10 shadow-sm mb-6 sm:mb-8 -mx-1">
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat, i) => (
              <button
                key={i}
                onClick={() => scrollToCat(i)}
                className={`flex items-center gap-1.5 text-[10px] sm:text-xs font-bold px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                  activeCat === i
                    ? 'text-white shadow-md'
                    : 'bg-[#F5EFE6] text-[#333333] hover:bg-[#1F2A44]/10'
                }`}
                style={activeCat === i ? { backgroundColor: cat.color } : undefined}
              >
                <span className="text-xs sm:text-sm">{cat.emoji}</span>
                {cat.title}
              </button>
            ))}
            <button
              onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-[#F5EFE6] text-[#333333] hover:bg-[#1F2A44]/10 transition-all whitespace-nowrap cursor-pointer shrink-0"
            >
              <span className="text-xs sm:text-sm">{'\u2753'}</span>
              FAQ
            </button>
          </div>
        </nav>

        {/* Hairstyle Categories */}
        {CATEGORIES.map((cat, catIdx) => (
          <section
            key={catIdx}
            ref={(el) => { catRefs.current[catIdx] = el; }}
            id={`cat-${catIdx}`}
            className="mb-8 sm:mb-12 scroll-mt-32"
          >
            {/* Category Header */}
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm"
                style={{ backgroundColor: `${cat.color}18` }}
              >
                <span className="text-xl sm:text-2xl">{cat.emoji}</span>
              </div>
              <div>
                <h2 className="text-lg sm:text-2xl font-extrabold text-[#1F2A44] leading-tight">{cat.title}</h2>
                <p className="text-[10px] sm:text-xs text-[#333333]/50 font-medium">{cat.subtitle}</p>
              </div>
              <span
                className="ml-auto text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full"
                style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
              >
                {cat.items.length} styles
              </span>
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
              {cat.items.map((style) => (
                <div
                  key={style.id}
                  className="bg-white rounded-2xl sm:rounded-3xl border border-[#1F2A44]/5 shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 group"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={style.image}
                      alt={style.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <span className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-sm text-[#1F2A44] text-[10px] font-bold px-2 py-0.5 rounded-full">
                      #{style.id}
                    </span>
                    <span className="absolute bottom-2.5 left-2.5 bg-white/90 backdrop-blur-sm text-[#1F2A44] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#F47C7C]" />
                      {style.time}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-3.5 sm:p-4">
                    <h3 className="font-bold text-[#1F2A44] text-sm sm:text-[15px] mb-1 leading-snug group-hover:text-[#F47C7C] transition-colors">
                      {style.name}
                    </h3>
                    <span className="text-[10px] font-bold text-[#8FAF9A] uppercase tracking-wider block mb-2">
                      Best for: {style.bestFor}
                    </span>
                    <p className="text-xs text-[#333333]/65 leading-relaxed mb-3 line-clamp-3">
                      {style.description}
                    </p>

                    {/* Tutorial Toggle */}
                    <button
                      onClick={() => setOpenTutorial(openTutorial === style.id ? null : style.id)}
                      className="w-full flex items-center justify-between gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border"
                      style={{
                        backgroundColor: openTutorial === style.id ? `${cat.color}12` : '#F9F7F4',
                        borderColor: openTutorial === style.id ? `${cat.color}30` : 'transparent',
                        color: '#1F2A44',
                      }}
                    >
                      <span className="flex items-center gap-1.5">
                        <ListOrdered className="w-3.5 h-3.5" style={{ color: cat.color }} />
                        Step-by-Step
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${openTutorial === style.id ? 'rotate-180' : ''}`}
                        style={{ color: '#33333380' }}
                      />
                    </button>

                    {/* Expanded Steps */}
                    <div
                      className="overflow-hidden transition-all duration-300 ease-in-out"
                      style={{
                        maxHeight: openTutorial === style.id ? '600px' : '0px',
                        opacity: openTutorial === style.id ? 1 : 0,
                      }}
                    >
                      <div className="pt-3 flex flex-col gap-2.5">
                        {style.steps.map((step, stepIdx) => (
                          <div key={stepIdx} className="flex gap-2.5 text-xs leading-relaxed">
                            <div
                              className="w-5 h-5 rounded-full text-white font-bold flex items-center justify-center shrink-0 text-[9px] mt-0.5 shadow-sm"
                              style={{ backgroundColor: cat.color }}
                            >
                              {stepIdx + 1}
                            </div>
                            <span className="text-[#333333]/75 pt-px">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* FAQ */}
        <section id="faq" className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-[#1F2A44]/5 shadow-sm mb-5 sm:mb-8 scroll-mt-32">
          <div className="flex items-center gap-2 mb-5 sm:mb-6">
            <Sparkles className="w-5 h-5 text-[#F47C7C]" />
            <h2 className="text-lg sm:text-2xl font-extrabold text-[#1F2A44]">Frequently Asked Questions</h2>
          </div>
          <div className="flex flex-col gap-2">
            {FAQ_ITEMS.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl sm:rounded-2xl overflow-hidden border transition-colors"
                style={{
                  borderColor: openFaq === i ? '#F47C7C30' : '#1F2A440D',
                  backgroundColor: openFaq === i ? '#F47C7C08' : 'transparent',
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-3 p-3.5 sm:p-4 text-left cursor-pointer"
                >
                  <span className="font-bold text-xs sm:text-sm text-[#1F2A44]">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180 text-[#F47C7C]' : 'text-[#333333]/30'}`} />
                </button>
                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{
                    maxHeight: openFaq === i ? '300px' : '0px',
                    opacity: openFaq === i ? 1 : 0,
                  }}
                >
                  <div className="px-3.5 sm:px-4 pb-3.5 sm:pb-4 text-xs sm:text-sm text-[#333333]/70 leading-relaxed">{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-[#1F2A44]/5 shadow-sm">
          <h2 className="text-base sm:text-xl font-bold text-[#1F2A44] mb-4">Keep Exploring</h2>
          <div className="flex flex-col sm:grid sm:grid-cols-3 gap-3">
            {[
              { href: '/blog/color-coded-10-drawer-rolling-cart-organization', title: 'Rolling Cart Organization', cat: 'Organization', emoji: '\uD83D\uDDC4\uFE0F' },
              { href: '/blog/calming-boho-botanical-reading-nook', title: 'Boho Reading Nook', cat: 'Classroom Decor', emoji: '\uD83C\uDF3F' },
              { href: '/blog/student-voice-and-morning-check-in-sel-board', title: 'Morning Check-In Board', cat: 'Organization', emoji: '\uD83D\uDCCA' },
            ].map((link, i) => (
              <Link key={i} href={link.href} className="flex items-center gap-3 bg-[#F9F7F4] p-3.5 rounded-xl border border-[#1F2A44]/5 hover:bg-[#8FAF9A]/10 hover:border-[#8FAF9A]/20 transition-all group">
                <span className="text-xl">{link.emoji}</span>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-[#F47C7C] uppercase tracking-wider block">{link.cat}</span>
                  <span className="text-xs sm:text-sm font-bold text-[#1F2A44] group-hover:text-[#F47C7C] transition-colors truncate block">{link.title}</span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[#333333]/20 -rotate-90 shrink-0" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
