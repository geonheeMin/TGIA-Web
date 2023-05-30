import { create }from "zustand"

const useStore = create(() => ({
  url: "http://43.201.250.93:8080" 
}));

export default useStore; 