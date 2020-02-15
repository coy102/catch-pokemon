import React from 'react';
import { isEmpty, capitalize } from 'lodash';
import shortid from 'shortid';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Grid
} from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import { IEvolutionChain } from '@modules/pokemon/types/pokemonDetail/evolutionChain';
import { getId } from '@utils/helpers/splitFromUrl';
import Link from '@components/Link';
interface Props {
  evolutions: IEvolutionChain;
}

export default function PokeEvolutions(props: Props) {
  const { evolutions } = props;
  const {
    chain: { species, evolves_to }
  } = evolutions;
  return (
    <Box my={2}>
      <Box width={1}>
        <Card>
          <CardContent>
            <Typography variant="h6" color="primary">
              Evolutions
            </Typography>

            {!isEmpty(species) && (
              <Box>
                <Link
                  href="/pokemon/[pokename]"
                  as={`/pokemon/${species.name}`}
                >
                  <Box textAlign="center">
                    <img
                      style={{ width: 80 }}
                      src={`${process.env.IMAGE_URL}${getId(species.url)}.png`}
                    />
                    <Box>{capitalize(species.name)}</Box>
                  </Box>
                  <Divider />
                </Link>
              </Box>
            )}
            {evolves_to && (
              <Box>
                <Grid container>
                  {evolves_to.map(evo1 => (
                    <React.Fragment key={shortid.generate()}>
                      <Grid item xs={6} sm={6} md={6}>
                        <Link
                          href="/pokemon/[pokename]"
                          as={`/pokemon/${evo1.species.name}`}
                        >
                          <Box textAlign="center">
                            <img
                              style={{ width: 80 }}
                              src={`${process.env.IMAGE_URL}${getId(
                                evo1.species.url
                              )}.png`}
                            />
                            <Box>{capitalize(evo1.species.name)}</Box>
                          </Box>
                        </Link>
                      </Grid>
                      <Box>
                        {evo1.evolves_to.map(evo2 => (
                          <Grid
                            item
                            xs={6}
                            sm={6}
                            md={6}
                            key={shortid.generate()}
                          >
                            <Link
                              href="/pokemon/[pokename]"
                              as={`/pokemon/${evo2.species.name}`}
                            >
                              <Box
                                display="flex"
                                displayPrint="row"
                                textAlign="center"
                              >
                                <Box py={5}>
                                  <ArrowForwardIcon />
                                </Box>
                                <Box ml={3}>
                                  <img
                                    style={{ width: 80 }}
                                    src={`${process.env.IMAGE_URL}${getId(
                                      evo2.species.url
                                    )}.png`}
                                  />
                                  <Box>{capitalize(evo2.species.name)}</Box>
                                </Box>
                              </Box>
                            </Link>
                          </Grid>
                        ))}
                      </Box>
                    </React.Fragment>
                  ))}
                </Grid>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
