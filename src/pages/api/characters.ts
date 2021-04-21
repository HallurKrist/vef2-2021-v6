import { NextApiRequest, NextApiResponse } from 'next';
import { fetchCharacters } from '../../lib/swapi';
import { IPeopleResponse } from '../../types';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const after = req.query?.after as string | null;
  const nextPageCharacters: IPeopleResponse = await fetchCharacters(after ?? undefined);

  if (nextPageCharacters?.allPeople?.edges.length !== 0) {
    res.status(200).json(null);
  } else {
    res.status(400).end();
  }
};
