import { ReactNode, createContext, useContext, useState } from "react";

export type SettingsContextType = {
  enableTimeline: boolean;
  setEnableTimeline: (value: boolean) => void;
  enableSidebar: boolean;
  setEnableSidebar: (value: boolean) => void;
  enable24Format: boolean;
  setEnable24Format: (value: boolean) => void;
};

const initData = {
  enableTimeline: true,
  enableSidebar: true,
  enable24Format: true,
};

export const SettingsContext = createContext<SettingsContextType | null>(null);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [enableTimeline, setEnableTimeline] = useState(initData.enableTimeline);
  const [enableSidebar, setEnableSidebar] = useState(initData.enableSidebar);
  const [enable24Format, setEnable24Format] = useState(initData.enable24Format);

  return (
    <SettingsContext.Provider
      value={{
        enableTimeline,
        setEnableTimeline,
        enableSidebar,
        setEnableSidebar,
        enable24Format,
        setEnable24Format,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => {
  const context = useContext<SettingsContextType | null>(SettingsContext);
  if (context === undefined) {
    throw new Error(
      "useSettingsContext must be used within a ExtensionProvider"
    );
  }
  return context;
};
