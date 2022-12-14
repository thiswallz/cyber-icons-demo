import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import * as CyberIcons from '@vastjs/cyber-icons-react'
import { colors, categories, iconsByCategory } from '@vastjs/cyber-icons-react'

function formatName(text: string) {
  return text.replace(/\-/g, ' ')
}

const initialCustomColor = {
  primary: '',
  secondary: '',
  border: ''
}

export default function Home() {
  const [theme, setTheme] = useState('eclipse')
  const [iconName, setIconName] = useState('VideoDisplay')
  const [search, setSearch] = useState('')
  const [size, setSize] = useState(2.5)
  const [customColor, setCustomColor] = useState(initialCustomColor)

  const CurrentIcon = (CyberIcons as any)[iconName]

  return (
    <div className={styles.container}>
      <Head>
        <title>Cyber Icons for React and Vue</title>
        <meta name="description" content="Cyber Icons, SVG Icons for vue and react." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`${styles.main}`}>

        <div className="fixed top-5 left-5 flex gap-4 text-sm z-50">
          <img width="30px" src="/logo.png" alt="VastJS" />
          VastJS
        </div>
        <div className="fixed top-24 right-5 flex gap-4 text-sm z-50">
          <a href="https://github.com/avastjs/cyber-icons" target={'_blank'} rel="noreferrer">
            <img width="50em" src="/GitHub_Logo_White.png" alt="Support on github" />
            Support by giving us a star ❤️🌟
          </a>
        </div>
        <div className="fixed z-50 top-5 right-5 flex">
          <a href="https://github.com/avastjs/cyber-icons" target={'_blank'} rel="noreferrer">
            <img width="60em" src="/react-min.png" alt="React" />
          </a>

          <a href="https://github.com/avastjs/cyber-icons" target={'_blank'} rel="noreferrer">
            <img width="60em" src="/vue-min.png" alt="Vue" />
          </a>
        </div>
        <div>
          <h1 className={styles.title}>
            Cyber Icons
          </h1>
          <h2 className="text-xl text-center">Select Theme</h2>
        </div>
        <div className="w-full sticky top-0 bg-black/80">
          <div className="flex justify-center m-5 mx-16 gap-4">
            {
              Object.keys(colors).map((color, index) => <div className="flex-none flex flex-col items-center" key={index}>
                <div>{color}</div>
                <div className="hover:opacity-75 cursor-pointer">
                  <CurrentIcon theme={color} size="4em" onClick={() => { setTheme(color); setCustomColor(initialCustomColor); }} />
                </div>
              </div>)
            }
            <div className="flex-none items-center flex flex-col">
              <div>custom</div>
              <div className="flex flex-col gap-1">
                <input type="color" className="w-16 h-6" value={customColor.primary} onChange={(e) => setCustomColor({ ...customColor, primary: e.target.value })} />
                <input type="color" className="w-16 h-6" value={customColor.secondary} onChange={(e) => setCustomColor({ ...customColor, secondary: e.target.value })} />
                <input type="color" className="w-16 h-6" value={customColor.border} onChange={(e) => setCustomColor({ ...customColor, border: e.target.value })} />
                <button className="w-16 h-8" onClick={() => setCustomColor(initialCustomColor)}>reset</button>
              </div>
            </div>
          </div>
          <code className="flex justify-center">
            {`<${iconName} theme="${theme}" ${customColor.primary ? 'primary="' + customColor.primary + '"' : ''} ${customColor.secondary ? 'secondary="' + customColor.secondary + '"' : ''} ${customColor.border ? 'border="' + customColor.border + '"' : ''} size={\`${size}em\`} />`}
          </code>
        </div>
        <input type="range" min="1" max="10" value={size} onChange={(e) => setSize(parseInt(e.target.value))} step=".1" className="fixed top-1/2 left-0 z-10" />
        <section className="m-10">
          <div className="flex justify-center"><input className="w-1/2 p-2 rounded-xl" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} /></div>
          {
            Object.keys(iconsByCategory).map((category, index) => <div key={index}>
              <h2 className="mt-20 ml-10 text-xl capitalize my-4">{formatName(category)}</h2>
              <section className="icons-section dark flex gap-4 flex-wrap justify-center">
                {
                  iconsByCategory[category]
                    .filter(icon => icon.toLowerCase().includes(search.toLowerCase()))
                    .map((icon, i) => {
                      const S = (CyberIcons as any)[icon];
                      return <div className="w-48 flex flex-col gap-2 justify-center items-center" key={i}>
                        <S
                          size={`${size}em`}
                          theme={theme}
                          className="hover:opacity-75 cursor-pointer"
                          primary={customColor.primary}
                          secondary={customColor.secondary}
                          border={customColor.border}
                          stroke={'1px'}
                          onClick={() => setIconName(icon)}
                        />
                        <div className="text-xs">{`<${icon} />`}</div>
                      </div>
                    })
                }
                <div className="item-empty w-48"></div>
                <div className="item-empty w-48"></div>
                <div className="item-empty w-48"></div>
                <div className="item-empty w-48"></div>
                <div className="item-empty w-48"></div>
                <div className="item-empty w-48"></div>
              </section>

            </div>)
          }
        </section>
     </main>

      <footer className={styles.footer}>

      </footer>
    </div>
  )
}
