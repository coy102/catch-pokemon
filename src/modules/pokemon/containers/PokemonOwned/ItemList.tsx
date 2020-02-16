import React, { useState, useEffect } from 'react';
import * as _ from 'lodash';
import {
  Card,
  Avatar,
  makeStyles,
  Box,
  Theme,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Button,
  FormControlLabel,
} from '@material-ui/core';
import capitalize from 'lodash/capitalize';
import DeleteIcon from '@material-ui/icons/Delete';
import { green } from '@material-ui/core/colors';
import shortid from 'shortid';
import ChipTypes from '@components/Chip/ChipTypes';
import { IOwnedPokemonStorage } from '@modules/pokemon/types/ownedPokemon';
import Link from '@components/Link';

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    width: 50,
    height: 50,
    backgroundColor: green[300],
  },
  chipMargin: {
    marginRight: theme.spacing(1),
  },
  cardMargin: {
    marginTop: theme.spacing(1),
    marginButtom: theme.spacing(1),
  },
}));

interface CheckedState {
  pokemonId: number;
  ownsId: Array<any>;
}

interface Props {
  pokemons: Array<IOwnedPokemonStorage>;
  onClickOpen: any;
}

export default function AccordionItems(props: Props) {
  const { pokemons, onClickOpen } = props;
  const [checkedOwnIds, setCheckedOwnIds] = useState<Array<CheckedState>>([]);
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [count, setCount] = useState(0);
  const classes = useStyles({});

  const handleSingleRemovePokemon = (pokemon, owned) => {
    onClickOpen({
      pokemonId: pokemon.id,
      pokemonOwnId: owned.id,
      pokemonName: pokemon.name,
      pokemonNick: owned.name,
    });
  };

  const handleSelectedRemovePokemon = () => {
    onClickOpen({
      checkedOwnIds,
      count,
      isFromCheckboxes: true,
    });
  };

  useEffect(() => {
    if (pokemons.length > 0) {
      let countPokemons = 0;
      let countCheckedOwnIds = 0;

      // counting owneds length in pokemons and countCheckedOwnIds
      // for get checked select all
      pokemons.map(p => {
        countPokemons += p.owneds.length;
      });

      checkedOwnIds.map(p => {
        countCheckedOwnIds += p.ownsId.length;
      });
      const trues = countPokemons === countCheckedOwnIds;
      setIsCheckedAll(trues);
      setCount(countCheckedOwnIds);
    }
  }, [checkedOwnIds]);

  const handleCheckedAll = e => {
    const checked = e ? e.target.checked : false;
    pokemons.map(pokemon => {
      handleChekedPokemons(pokemon.id, null, checked);
    });
  };

  const handleChekedPokemons = (pokemonId, e?, _checkedAll?) => {
    const checked = e ? e.target.checked : false;
    pokemons.map(pokemon => {
      if (pokemon.id === pokemonId) {
        pokemon.owneds.map(own => {
          if (_checkedAll) {
            const isAlreadCheked = _.find(checkedOwnIds, o => {
              return o.ownsId.includes(own.id);
            });

            if (!isAlreadCheked) {
              handleCheckedOwns(pokemonId, own.id, checked);
              return;
            }

            if (pokemon.owneds.length === 1 && checked) {
              // remove array object if owns id equals 1 any spesific pokemon
              _.remove(checkedOwnIds, o => {
                return o.pokemonId === pokemonId;
              });
              return;
            }
            return;
          }

          handleCheckedOwns(pokemonId, own.id, checked);
          return;
        });

        return;
      }
    });
  };

  const handleCheckedOwns = (pokemonId, ownId, _checkedAll?, e?) => {
    // find or default checkedOwnIds by pokemon id
    const fodChecked = _.find(checkedOwnIds, { pokemonId });
    const checked = e ? e.target.checked : false;
    if (fodChecked) {
      // if has any checkedOwnIds it will process to insert new ownId

      checkedOwnIds.map(own => {
        if (own.pokemonId === fodChecked.pokemonId) {
          // it will only update array on same pokemon id
          if (own.ownsId.includes(ownId) && !_checkedAll) {
            // if already has ownId it will remove, and unchecked checkbox
            if (own.ownsId.length === 1) {
              // remove array object if owns id equals 1 any spesific pokemon
              _.remove(checkedOwnIds, o => {
                return o.pokemonId === pokemonId;
              });
              return;
            }
            // else only remove owns id on spesific pokemon
            _.remove(own.ownsId, o => {
              return o === ownId;
            });
            return;
          }
          // else push new string to array of string ownsId
          if (_checkedAll) {
            const isAlreadyChecked = _.find(checkedOwnIds, o => {
              return o.ownsId.includes(ownId);
            });

            if (!isAlreadyChecked) {
              // If not already checked or dont have any values, it will push new owned id
              fodChecked.ownsId.push(ownId);
              return;
            }

            if (own.ownsId.length === 1 && checked) {
              // remove array object if owns id equals 1 any spesific pokemon and
              // if not base on checked owneds checkboxes
              _.remove(checkedOwnIds, o => {
                return o.pokemonId === pokemonId;
              });
              return;
            }

            return;
          }
          // Add new checked owns id
          fodChecked.ownsId.push(ownId);
          return;
        }
      });
      setCheckedOwnIds([...checkedOwnIds]);

      return;
    } else {
      // else create new array object for new pokemon

      checkedOwnIds.push({
        pokemonId,
        ownsId: [ownId],
      });

      setCheckedOwnIds([...checkedOwnIds]);
      return;
    }
  };

  return (
    <div>
      <Card>
        <Box display="flex" displayPrint="row" px={2}>
          <Box width={1 / 2}>
            <FormControlLabel
              value="End"
              control={
                <Checkbox
                  checked={isCheckedAll}
                  onChange={handleCheckedAll}
                  size="small"
                />
              }
              label="Select All"
              labelPlacement="end"
            />
          </Box>
          <Box py={1} width={1 / 2} textAlign="right">
            <Button
              size="small"
              variant="contained"
              color="secondary"
              disabled={checkedOwnIds.length <= 0}
              onClick={handleSelectedRemovePokemon}>
              Remove
            </Button>
          </Box>
        </Box>
      </Card>
      {pokemons.map(pokemon => {
        let isCheckedPokemon = false;
        const findedCheckedOwns = _.find(checkedOwnIds, {
          pokemonId: pokemon.id,
        });
        if (findedCheckedOwns) {
          isCheckedPokemon =
            findedCheckedOwns.ownsId.length === pokemon.owneds.length;
        }
        return (
          <Card className={classes.cardMargin} key={shortid.generate()}>
            <Box display="flex" displayPrint="row" py={2} px={1}>
              <Box width="auto">
                <Checkbox
                  checked={isCheckedPokemon}
                  size="small"
                  onChange={e => handleChekedPokemons(pokemon.id, e)}
                />
              </Box>
              <Box width="20%">
                <Link
                  href="/pokemon/[pokename]"
                  as={`/pokemon/${pokemon.name}`}>
                  <Avatar
                    src={pokemon.sprites.front_default}
                    className={classes.avatar}
                    variant="rounded"
                  />
                </Link>
              </Box>
              <Box width={1}>
                <Box px={3}>
                  <Link
                    href="/pokemon/[pokename]"
                    as={`/pokemon/${pokemon.name}`}>
                    <Box fontSize={16}>{capitalize(pokemon.name)}</Box>
                  </Link>
                  <Box>
                    {pokemon.types.map(type => (
                      <ChipTypes
                        type={type.type.name}
                        key={shortid.generate()}
                      />
                    ))}
                  </Box>
                </Box>
              </Box>
              <Box width="20%">
                <Box fontSize={12} color="primary">
                  Owns : {pokemon.owneds.length}
                </Box>
              </Box>
            </Box>
            <Divider />
            <Box pl={2}>
              <List>
                {pokemon.owneds.map(owned => {
                  let checked = false;
                  const filteredOwnsIds = _.find(checkedOwnIds, {
                    pokemonId: pokemon.id,
                  });

                  if (filteredOwnsIds) {
                    checked = _.includes(filteredOwnsIds.ownsId, owned.id);
                  }

                  return (
                    <ListItem dense key={owned.id}>
                      <Checkbox
                        checked={checked}
                        onChange={e =>
                          handleCheckedOwns(pokemon.id, owned.id, false, e)
                        }
                        size="small"
                      />

                      <ListItemText
                        primary={owned.name}
                        secondary={owned.dateCatch}
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() =>
                            handleSingleRemovePokemon(pokemon, owned)
                          }>
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          </Card>
        );
      })}
    </div>
  );
}
