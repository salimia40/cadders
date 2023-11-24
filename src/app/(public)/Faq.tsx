import { Image, Accordion, Grid, Container, Title, AccordionItem, AccordionControl, AccordionPanel, GridCol } from '@mantine/core';
import classes from './Faq.module.css';

const placeholder =
    'It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon.';

export function Faq() {
    return (
        <div className={classes.wrapper}>
            <Container size="lg">
                <Grid id="faq-grid" gutter={50}>
                    <GridCol span={{ base: 12, md: 6 }}>
                        <Image src={'/faq.svg'} alt="Frequently Asked Questions" />
                    </GridCol>
                    <GridCol span={{ base: 12, md: 6 }}>
                        <Title order={2} ta="left" className={classes.title}>
                            Frequently Asked Questions
                        </Title>

                        <Accordion chevronPosition="right" defaultValue="reset-password" variant="separated">
                            <AccordionItem className={classes.item} value="reset-password">
                                <AccordionControl>How can I reset my password?</AccordionControl>
                                <AccordionPanel>{placeholder}</AccordionPanel>
                            </AccordionItem>

                            <AccordionItem className={classes.item} value="another-account">
                                <AccordionControl>Can I create more that one account?</AccordionControl>
                                <AccordionPanel>{placeholder}</AccordionPanel>
                            </AccordionItem>

                            <AccordionItem className={classes.item} value="newsletter">
                                <AccordionControl>How can I subscribe to monthly newsletter?</AccordionControl>
                                <AccordionPanel>{placeholder}</AccordionPanel>
                            </AccordionItem>

                            <AccordionItem className={classes.item} value="credit-card">
                                <AccordionControl>
                                    Do you store credit card information securely?
                                </AccordionControl>
                                <AccordionPanel>{placeholder}</AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    </GridCol>
                </Grid>
            </Container>
        </div>
    );
}