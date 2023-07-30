import { LowSync } from 'lowdb'
import { JSONFileSync } from 'lowdb/node'
import { seedData } from './seedData';
import { Favorite, Quote, User } from "./types";

type Data = {
  users: User[];
  quotes: Quote[];
  favorites: Favorite[];
}

const defaultData: Data = seedData;
const adapter = new JSONFileSync<Data>('db.json');
const database = new LowSync<Data>(adapter, defaultData);

database.read();
database.write();
