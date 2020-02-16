import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import shortid from 'shortid';

import { getOwnedPokemons } from '../../dux/actions';
import pokemonSelector from '../../dux/selectors';
import { IOwnedPokemonState } from '../../types/ownedPokemon';
import ItemList from './ItemList';
import AlertDialog from '@components/Dialog/AlertDialog';
import BackdropDialog from '@components/Dialog/BackdropDialog';
import TextLoading from '@components/Loading/TextLoading';
import Empty from '@components/Result/Empty';

export default function PokemonOwnedContainer() {
  const dispatch = useDispatch();
  const { selectOwnedPokemon } = pokemonSelector();

  const [alertMessage, setAlertMessage] = useState('');
  const [removedPokemon, setRemovedPokemon] = useState({
    pokemonName: '',
    pokemonNick: '',
    pokemonId: 0,
    pokemonOwnId: 0,
    count: 0,
    isFromCheckboxes: false,
    checkedOwnIds: [],
  });

  const ownedPokemons: IOwnedPokemonState = useSelector(selectOwnedPokemon());
  const { isFetching, pokemons, isOpenDialog, isPosting } = ownedPokemons;

  const fetchOwnedPokemons = () => dispatch(getOwnedPokemons.request());

  const openAlertDialog = pokemon => {
    if (pokemon.isFromCheckboxes) {
      // if removed pokemon from checkboxes it will open Alert with total of selected pokemon
      setAlertMessage(`It will remove (${pokemon.count}) of your pokemon`);
    } else {
      setAlertMessage(
        `Are you sure want to remove your ${pokemon.pokemonName} - ${pokemon.pokemonNick}`
      );
    }

    setRemovedPokemon(pokemon);
    dispatch(removeOwnedPokemons.openRemoveDialog({ isOpenDialog: true }));
  };

  const closeAlertDialog = () =>
    dispatch(removeOwnedPokemons.openRemoveDialog({ isOpenDialog: false }));

  const removePokemon = () =>
    dispatch(removeOwnedPokemons.request({ params: removedPokemon }));

  useEffect(() => {
    fetchOwnedPokemons();
  }, [dispatch]);

  if (isFetching) {
    return (
      <div>
        {[...Array(6)].map(() => (
          <TextLoading key={shortid.generate()} />
        ))}
      </div>
    );
  }

  if (pokemons.length === 0) {
    return <Empty />;
  }

  return (
    <div>
      <div>
        {pokemons && (
          <div>
            <AlertDialog
              title={`Remove Pokemon`}
              desc={alertMessage}
              isOpen={isOpenDialog}
              onClickClose={closeAlertDialog}
              onSubmit={removePokemon}
              isPosting={isPosting}
            />
            <BackdropDialog isOpen={isPosting} />

            <ItemList onClickOpen={openAlertDialog} pokemons={pokemons} />
          </div>
        )}
      </div>
    </div>
  );
}
