import type { NextComponentType, NextPageContext } from "next";
import { useRouter } from "next/router";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

import HttpService from "@services/HttpService";
import UserService from "@services/UserService";
import { Contributor } from "@models/user";
import { Tokens } from "@models/generic";
import { SimplifiedContributor } from "./../models/user";

interface ContributorContextType {
  contributor: SimplifiedContributor | null;
  setContributor: Dispatch<SetStateAction<SimplifiedContributor | null>> | null;
  login: (username: string, password: string, setError: Dispatch<SetStateAction<string>>) => boolean | Promise<boolean>;
  logout: () => void;
}

const ContributorContextDefaultValues: ContributorContextType = {
  contributor: null,
  setContributor: null,
  login: () => false,
  logout: () => {},
};

const ContributorContext = createContext<ContributorContextType>(ContributorContextDefaultValues);
ContributorContext.displayName = "AuthContext";

export const useContributorContext = () => {
  return useContext(ContributorContext);
};

interface Props {
  children: ReactNode;
}

export const ContributorProvider: NextComponentType<NextPageContext, {}, Props> = ({ children }: Props) => {
  const router = useRouter();
  const [contributor, setContributor] = useState<SimplifiedContributor | null>(null);

  useEffect(() => {
    getContributor().then((r) => r);
  }, []);

  const getContributor = async () => {
    const tokensStr = localStorage.getItem("tokens");
    if (tokensStr !== null) {
      const { access } = JSON.parse(tokensStr);

      // Set header for future requests
      HttpService.setAuthHeader(access);

      // Get contributor and set it
      const { user_id }: { user_id: number } = jwtDecode(access);
      const contr = await UserService.getContributor(user_id);
      setContributor(contr ?? null);
    }
  };

  const login = async (username: string, password: string, setError: Dispatch<SetStateAction<string>>) => {
    try {
      const data: Tokens = await toast.promise(UserService.getJWT({ username, password }), {
        pending: "Logging in",
        success: "Logged in",
        error: "Error when logging in",
      });

      setError("");
      localStorage.setItem("tokens", JSON.stringify(data));

      await getContributor();
      return true;
    } catch (err: any) {
      setError(err.response?.data?.detail);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("tokens");
    setContributor(null);
    HttpService.resetAuthHeader();
    toast.success("Logged out 👌");
  };

  const value = {
    contributor,
    setContributor,
    login,
    logout,
  };

  return (
    <>
      <ContributorContext.Provider value={value}>{children}</ContributorContext.Provider>
    </>
  );
};
