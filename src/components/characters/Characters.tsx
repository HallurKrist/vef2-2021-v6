import React, { useState } from 'react';

import Link from 'next/link';

import s from './Characters.module.scss';
import { Button } from '../button/Button';
import { ICharacter, IPeopleEdges, IPeopleResponse } from '../../types';
import { fetchCharacters } from '../../lib/swapi';

type Props = {
  characters_: IPeopleEdges;
};

// Notaði ekki Excludes fallið

export function Characters({ characters_ }: Props): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [characters, setCharacters] = useState<Array<ICharacter>>(
    characters_.edges.map((edge) => edge.node),
  );
  const [nextPage, setNextPage] = useState<string | null>(characters_.pageInfo.endCursor);
  const [isNextPage, setIsNextPage] = useState<boolean>(true);

  const fetchMore = async (): Promise<void> => {
    setLoading(true);

    if (isNextPage) {
      const res = (await fetch(`/api/characters?after=${nextPage}`));
      if (res.ok) {
        const nextPageCharacters: IPeopleResponse = await fetchCharacters(nextPage ?? '');
        const newCharacters: ICharacter[] = nextPageCharacters.allPeople.edges.map(
          (edge) => edge.node,
        );

        setNextPage(nextPageCharacters?.allPeople?.pageInfo?.endCursor ?? null);
        setIsNextPage(nextPageCharacters?.allPeople?.pageInfo?.hasNextPage ?? true);
        setCharacters(characters.concat(newCharacters));
      }
    }

    setLoading(false);
  };

  return (
    <section className={s.characters}>
      <ul className={s.characters__list}>
        {characters.map((char, i) => (
          <li key={i}>
            <Link href={`/characters/${char.id}`}>{char.name}</Link>
          </li>
        ))}
      </ul>

      {loading && <p>loading...</p>}

      {isNextPage && <Button disabled={loading} onClick={fetchMore}>Fetch more</Button>}
    </section>
  );
}
