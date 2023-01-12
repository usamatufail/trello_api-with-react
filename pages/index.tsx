import { trelloClient } from 'lib/trello.lib';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const board = await trelloClient.boards.getBoard({ id: 'yI4swIr3' });
  const lists = await trelloClient.boards.getBoardLists({ id: 'yI4swIr3' });
  const allPromises = lists?.map((list) => {
    const cards = trelloClient.lists.getListCards({ id: list.id });
    return cards;
  });
  const cards = await Promise.all(allPromises);
  return {
    props: {
      cards: cards.flat(),
      lists,
      board,
    },
  };
};

export default function Home({ board, lists, cards }: { board: any; lists: any; cards: any }) {
  return (
    <>
      <Head>
        <title>Trello Board Snapshot</title>
        <meta name="description" content="Trello board api for giving view only access to specific users" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className="p-4"
        style={{
          backgroundImage:
            'url("https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2400x1600/d7ddba3d264f179f01cccb5de39c9312/photo-1646977934200-c86e5d609dad.jpg")',
          backgroundPosition: '50%',
          backgroundSize: 'cover',
          minHeight: '100vh',
          backgroundBlendMode: 'darken',
        }}
      >
        <h1 className="text-white mb-[30px] font-bold text-[25px]">{board.name}</h1>
        <div className="flex items-start gap-[10px]">
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
