import { getCurrentUserId } from '@/lib/getCurrentUser'
import { Accordion, AccordionControl, AccordionItem, AccordionPanel, Button, Container, Text, Title, Tooltip } from '@mantine/core'
import { Dots } from '@/lib/components/Dots'
import { SimpleGrid, rem } from '@mantine/core';
import { IconTruck, IconCertificate, IconCoin } from '@tabler/icons-react';

interface FeatureProps extends React.ComponentPropsWithoutRef<'div'> {
  icon: React.FC<any>;
  title: string;
  description: string;
}

function Feature({ icon: Icon, title, description, className, ...others }: FeatureProps) {
  return (
    <div  {...others}>
      <div />

      <div >
        <Icon style={{ width: rem(38), height: rem(38) }} stroke={1.5} />
        <Text fw={700} fz="lg" mb="xs" mt={5} >
          {title}
        </Text>
        <Text c="dimmed" fz="sm">
          {description}
        </Text>
      </div>
    </div>
  );
}

const mockdata = [
  {
    icon: IconTruck,
    title: 'Free Worldwide shipping',
    description:
      'As electricity builds up inside its body, it becomes more aggressive. One theory is that the electricity.',
  },
  {
    icon: IconCertificate,
    title: 'Best Quality Product',
    description:
      'Slakoth’s heart beats just once a minute. Whatever happens, it is content to loaf around motionless.',
  },
  {
    icon: IconCoin,
    title: 'Very Affordable Pricing',
    description:
      'Thought to have gone extinct, Relicanth was given a name that is a variation of the name of the person who discovered.',
  },
];


const placeholder =
  'It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon.It was born from sludge on the ocean floor. In a sterile environment, the germs within its body can’t multiply, and it dies.It has no eyeballs, so it can’t see. It checks its surroundings via the ultrasonic waves it emits from its mouth.';


export default async function Home() {
  const items = mockdata.map((item) => <Feature {...item} key={item.title} />);
  return (
    <>
      <Container size={1400}>
        <Dots style={{ left: 0, top: 0 }} />
        <Dots style={{ left: 60, top: 0 }} />
        <Dots style={{ left: 0, top: 140 }} />
        <Dots style={{ right: 0, top: 60 }} />

        <div >
          <Title >
            Organized {' '}
            <Text component="span" inherit>
              design reviews
            </Text>{' '}
            for any project
          </Title>

          <Container p={0} size={600}>
            <Text size="lg" c="dimmed" >
              Cadders is a design feedback tool that helps you collect and organize
              feedback on any project.
            </Text>
          </Container>

          <div >
            <Tooltip label={'not gonna work'} >
              <Button size="lg" variant="default" color="gray">
                Book a demo
              </Button>
            </Tooltip>
            <Tooltip label={'not gonna work'} >
              <Button size="lg">
                join us
              </Button>
            </Tooltip>
          </div>
        </div>
      </Container>
      <Container mt={30} mb={30} size="lg">
        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={50}>
          {items}
        </SimpleGrid>
      </Container>

      <Container size="sm" >
        <Title ta="center" >
          Frequently Asked Questions
        </Title>

        <Accordion variant="separated">
          <AccordionItem value="reset-password">
            <AccordionControl>How can I reset my password?</AccordionControl>
            <AccordionPanel>{placeholder}</AccordionPanel>
          </AccordionItem>

          <AccordionItem value="another-account">
            <AccordionControl>Can I create more that one account?</AccordionControl>
            <AccordionPanel>{placeholder}</AccordionPanel>
          </AccordionItem>

          <AccordionItem value="newsletter">
            <AccordionControl>How can I subscribe to monthly newsletter?</AccordionControl>
            <AccordionPanel>{placeholder}</AccordionPanel>
          </AccordionItem>

          <AccordionItem value="credit-card">
            <AccordionControl>Do you store credit card information securely?</AccordionControl>
            <AccordionPanel>{placeholder}</AccordionPanel>
          </AccordionItem>

          <AccordionItem value="payment">
            <AccordionControl>What payment systems to you work with?</AccordionControl>
            <AccordionPanel>{placeholder}</AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Container>


    </>
  )
}
