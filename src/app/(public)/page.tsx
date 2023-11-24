import { getCurrentUserId } from '@/lib/getCurrentUser'
import { Accordion, AccordionControl, AccordionItem, AccordionPanel, Button, Container, Group, Text, Title, Tooltip } from '@mantine/core'
import { Dots } from '@/lib/components/Dots'
import { SimpleGrid, rem } from '@mantine/core';
import { IconTruck, IconCertificate, IconCoin } from '@tabler/icons-react';
import { Features } from './Features';
import { Hero } from './Hero';
import { Faq } from './Faq';


const placeholder =
  'It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon.It was born from sludge on the ocean floor. In a sterile environment, the germs within its body can’t multiply, and it dies.It has no eyeballs, so it can’t see. It checks its surroundings via the ultrasonic waves it emits from its mouth.';


export default async function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Faq />

    </>
  )
}
