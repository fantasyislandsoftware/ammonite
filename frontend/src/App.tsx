import { Screen } from './components/Screen';
import { useScreenStore } from './components/Screen/useScreenStore';

const App = () => {
  const { screens } = useScreenStore();


  

  return (
    <>
      {screens.map((screen) => (
        <Screen key={screen.id} screen={screen} />
      ))}
    </>
  );
};

export default App;
