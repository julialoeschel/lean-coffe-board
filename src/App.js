import { useState } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import Entry from './components/Entry';
import EntryForm from './components/EntryForm';
import EnterUser from './components/EnterUser';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function App() {
  const [user, setUser] = useState('');
  const [color, setColor] = useState('');
  const [userExsists, setUserExists] = useState(false);

  const {
    data: entries,
    error: entriesError,
    mutate: mutateEntries,
  } = useSWR('/api/entries', fetcher, {
    refreshInterval: 1000,
  });
  if (entriesError) return <h1>Sorry, could not fetch.</h1>;

  function handleUserSubmit(user, color) {
    setUser(user);
    setUserExists(true);
    setColor(color);
  }

  return (
    <>
      {!userExsists && <EnterUser onSubmit={handleUserSubmit}></EnterUser>}
      {userExsists && (
        <Grid>
          <h1>Lean Coffee Board</h1>
          <EntryList role="list">
            {entries
              ? entries.map(({ text, author, _id, tempId, color }) => (
                  <li key={_id ?? tempId}>
                    <Entry text={text} author={author} color={color} />
                  </li>
                ))
              : '... loading! ...'}
          </EntryList>
          <EntryForm onSubmit={handleNewEntry} />
        </Grid>
      )}
    </>
  );

  async function handleNewEntry(text) {
    const newEntry = {
      text,
      author: user,
      color: color,
      tempId: Math.random(),
    };

    mutateEntries([...entries, newEntry], false);
    await fetch('/api/entries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEntry),
    });
    mutateEntries();
  }
}

const Grid = styled.div`
  display: grid;
  height: 100vh;
  padding: 0 20px 12px;
  grid-template-rows: auto 1fr auto;
`;

const EntryList = styled.ul`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-auto-rows: 100px;
  list-style: none;
  padding: 0;
`;
