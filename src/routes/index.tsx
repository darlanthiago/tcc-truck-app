import React from "react";
import Loading from "../components/Loading";
import { useRNAuth } from "../hooks/contexts/Auth";
import { PrivateRoutes } from "./private.routes";
import { PublicRoutes } from "./public.routes";

export const Routes = () => {
  const { isSigned, isLoading } = useRNAuth();

  if (isLoading) {
    <Loading />;
  }

  return isSigned ? <PrivateRoutes /> : <PublicRoutes />;
};
