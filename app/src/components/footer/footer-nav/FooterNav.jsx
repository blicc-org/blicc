import React, { useContext } from 'react';
import FooterNavList from './FooterNavList';
import { AppContext } from '../../../AppContext';

export default function FooterNav() {
  const data = useContext(AppContext);
  return (
    <>
      {data.footerNavigation.map(list => (
        <FooterNavList key={list.category} list={list} />
      ))}
    </>
  );
}
