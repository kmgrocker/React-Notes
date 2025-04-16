import React from 'react'

export const UseEffectTwo = () => {
    const [name, setName] = React.useState('');
  const [user, setUser] = React.useState({
    name: '',
    selected: false,
  });

  const handleAdd = () => {
    setUser((prev) => ({ ...prev, name }));
  };

  const memoizedUser = React.useMemo(() => {
    return { name: user.name, selected: user.selected };
  }, [user.name, user.selected]);

  const handleSelect = () => {
    setUser((prev) => ({ ...prev, selected: true }));
  };

  React.useEffect(() => {
    // console.log('useEffect depend on user');
    //! but in case of non primitive (object,array) even the prev value is same useEffect will run because of referencial integrity
  }, [user]);

  React.useEffect(() => {
    console.log('useEffect depend on memoized user');
    // here we passed a memoized version of user
  }, [memoizedUser]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        margin: '2% 8%',
        gap: '.8rem',
      }}
    >
      <input
        type={'text'}
        placeholder={'enter the name'}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleAdd}>Add name</button>
      <button onClick={handleSelect}>select name</button>
      <p>{`{name:${user.name}, selected:${user.selected}}`}</p>
    </div>
  );
}
