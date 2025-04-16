import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext(null);

export default function MyTestApp() {
  const [theme, setTheme] = useState('light');
  return (
   <>
   <h1>{theme}</h1>
       <div>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias iusto obcaecati hic quos fugit harum voluptatum non repellat eveniet. Accusantium rerum natus, praesentium porro quidem nisi expedita ut neque, repellat architecto nemo perspiciatis. Rerum illo, adipisci ex, voluptatibus porro suscipit ab dolorum quidem animi molestiae repudiandae unde libero corporis dolorem.</div>

       <button onClick={()=>{setTheme('dark')}}>click me</button>
   </>

  )
}

