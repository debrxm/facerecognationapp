import React from 'react';

export const Navigation = ({ changeRoute, clearData }) => {
  return (
    <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <p
        className="f4 link fw6 dim black shadow-1 pa3 pointer"
        onClick={() => {
          changeRoute('signin');
          clearData();
        }}
      >
        Sign Out
      </p>
    </nav>
  );
};
export const NavigationNotSigned = ({ changeRoute }) => {
  return (
    <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <p
        className="f5 link fw6 dim black pa3 underline pointer"
        onClick={() => changeRoute('signin')}
      >
        Sign In
      </p>
      <p
        className="f5 link fw6 dim black pa3 underline pointer"
        onClick={() => changeRoute('register')}
      >
        Register
      </p>
    </nav>
  );
};
