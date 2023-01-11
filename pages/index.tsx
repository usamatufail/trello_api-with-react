import { trelloClient } from 'lib/trello.lib';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  // 'CLxFvf2l'
  const lists = await trelloClient.boards.getBoardLists({ id: 'CLxFvf2l' });
  const allPromises = lists?.map((list) => {
    const cards = trelloClient.lists.getListCards({ id: list.id });
    return cards;
  });
  const cards = await Promise.all(allPromises);
  return {
    props: {
      cards: cards.flat(),
      lists,
    },
  };
};

export default function Home({ cards, lists }: { cards: any; lists: any }) {
  return (
    <>
      <Head>
        <title>Trello Board Snapshot</title>
        <meta name="description" content="Trello board api for giving view only access to specific users" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex items-start gap-[10px] p-4">
          {/* Lists for Board */}
          {lists?.map((list: any) => {
            // Get cards for this list
            const listCards = cards.filter((card: any) => card.idList === list.id);
            return (
              <div key={list.id} className="bg-[#ebecf0] p-2 rounded-[3px] w-[290px]">
                {/* Heading of List */}
                <h1 className="font-semibold font-sans mb-[20px]">{list?.name}</h1>
                {/* Cards of List */}
                <div className="flex flex-col gap-3">
                  {listCards?.map((card: any) => {
                    return (
                      // Single Card of List
                      <p key={card?.id} className="cursor-pointer bg-white shadow-md p-3 rounded-[3px]">
                        {card?.name}
                      </p>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
