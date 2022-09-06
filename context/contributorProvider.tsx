import type { NextComponentType, NextPageContext } from "next";
import { useRouter } from "next/router";
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { createContext, useContext } from "react";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

import { Contributor } from "../models/user";
import HttpService from "../services/HttpService";
import UserService from "../services/UserService";
import { Tokens } from "../models/generic";

interface ContributorContextType {
  contributor: Contributor | null;
  setContributor: Dispatch<SetStateAction<Contributor | null>> | null;
  login: (username: string, password: string, setError: Dispatch<SetStateAction<string>>) => void;
  logout: () => void;
}

const ContributorContextDefaultValues: ContributorContextType = {
  contributor: null,
  setContributor: null,
  login: () => {},
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
  const [contributor, setContributor] = useState<Contributor | null>(null);

  useEffect(() => {
    getContributor();
  }, []);

  const getContributor = async () => {
    const tokensStr = localStorage.getItem("tokens");
    if (tokensStr !== null) {
      const { access, refresh } = JSON.parse(tokensStr);

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

      getContributor();

      router.push("/");
    } catch (err: any) {
      setError(err.response.data.detail);
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