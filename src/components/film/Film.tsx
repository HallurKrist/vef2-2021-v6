import Link from 'next/link';
import { IFilm } from '../../types';

import s from './Film.module.scss';

type Props = {
  film: IFilm
};

export function Film({ film }: Props): JSX.Element {
  return (

    <section className={s.film}>
      <h2 className={s.film__title}>
        Episode {film.episodeID}: {film.title}
      </h2>
      <div className={s.film__info}>
        <p className={s.film__crawl}>
          {film.openingCrawl}
        </p>
        <div className={s.film__char}>
          <h3>
            Characters
          </h3>
          <div className={s.film__char__links}>
            {film?.characterConnection?.characters.map((char, i) => (
              <div key={i} className={s.film__char__link}>
                <Link href={`/characters/${char.id}`}>{char.name}</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={s.film__end} />
    </section>

  );
}
