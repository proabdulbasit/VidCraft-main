import { createContext, useContext, useState } from 'react';

const SelectionContext = createContext();

export const SelectionProvider = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const updateSelectedItem = (item) => {
    setSelectedItem(item);
  };

  return (
    <SelectionContext.Provider value={{ selectedItem, updateSelectedItem }}>
      {children}
    </SelectionContext.Provider>
  );
};

export const useSelection = () => {
  return useContext(SelectionContext);
};