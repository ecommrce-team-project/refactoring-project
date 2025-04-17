
'use client';

import styles from "./page.module.css";
import EstateDetails from "./estate/estateDetails/estateDetails";

export default function Home() {
  return (
    
      <EstateDetails isHomePage={true} />
 
  );
}

