import "./App.css";
import { SettingsProvider } from "./context/settingsContext";
import Epg from "./views/Epg/Epg";
import { SettingsPanel } from "./views/SettingsPanel/SettingsPanel";

function App() {
  return (
    <>
      <SettingsProvider>
        <h1>Virtual EPG</h1>
        <SettingsPanel />
        <Epg />
      </SettingsProvider>
    </>
  );
}

export default App;
