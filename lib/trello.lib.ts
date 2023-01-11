import { TrelloClient } from 'trello.js';

export const trelloClient = new TrelloClient({
  key: process.env.NEXT_PUBLIC_TRELLO_API_KEY as string,
  token: process.env.NEXT_PUBLIC_TRELLO_TOKEN as string,
});
