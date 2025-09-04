import { createContext, useContext, useState, type FC, type PropsWithChildren } from "react";

interface IDeleteRoleContext {
  roleId: number | null;
  setRoleId: (id: number | null) => void;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const DeleteRoleContext = createContext<IDeleteRoleContext | undefined>(undefined);

export const DeleteRoleProvider: FC<PropsWithChildren> = ({ children }) => {
  const [roleId, setRoleId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <DeleteRoleContext.Provider value={{ roleId, setRoleId, isModalOpen, setIsModalOpen }}>
      {children}
    </DeleteRoleContext.Provider>
  );
};

export const useDeleteRole = () => {
  const context = useContext(DeleteRoleContext);

  if (!context) {
    throw new Error("useDeleteRoleContext must be used within a DeleteRoleProvider");
  }

  return context;
};
