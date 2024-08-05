import './App.css'
import AnimatedCursor from 'react-animated-cursor';
import TableComponent from './shared/components/Table/TableComponent';
import TableDescription from './shared/components/Table/TableDescription';
import Button from './shared/components/Button/Button';
import { useEffect, useState } from 'react';
import useTelegram from './hooks/useTelegram';

type TMode = 'edit' | 'normal'

function App() {
  const [mode, setMode] = useState<TMode>('normal');
  const onToggleMode = () => {
    setMode(mode === 'edit' ? 'normal' : 'edit')
  }

  useEffect(() => {
    tg.ready();
  }, [])

  const { tg } = useTelegram();
  console.log(tg)
  return (
    <main className='rosha-main'>
      <AnimatedCursor
        innerSize={9}
        outerSize={40}
        outerScale={3.7}
        outerAlpha={0.2}
        innerScale={2.5}
        color='221, 20, 5'
        clickables={['a', 'button']}
      />
      <TableDescription />
      <TableComponent mode={mode} />
      <Button onClick={onToggleMode}>
        {tg?.initDataUnsafe?.user?.username}
      </Button>
    </main>
  )
}

export default App
