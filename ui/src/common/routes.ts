import React from "react";
import { generatePath } from "react-router";

import DefaultPage from "../components/DefaultPage";

import ScentPage from "../scents/ScentPage";
import ScentsPage from "../scents/ScentsPage";

import DyePage from "../dyes/DyePage";
import DyesPage from "../dyes/DyesPage";

interface Route {
  name: string;
  path: string;
  sidebar: boolean;
  component: React.FunctionComponent;
}

export const CandlesRoute: Route = {
  name: "candles",
  path: "/candles",
  sidebar: true,
  component: DefaultPage
};

export const ScentRoute: Route = {
  name: "scent",
  path: "/scents/:id",
  sidebar: false,
  component: ScentPage
};
export const ScentsRoute: Route = {
  name: "scents",
  path: "/scents",
  sidebar: true,
  component: ScentsPage
};

export const DyeRoute: Route = {
  name: "dye",
  path: "/dyes/:id",
  sidebar: false,
  component: DyePage
};
export const DyesRoute: Route = {
  name: "dyes",
  path: "/dyes",
  sidebar: true,
  component: DyesPage
};

export const WaxesRoute: Route = {
  name: "waxes",
  path: "/waxes",
  sidebar: true,
  component: DefaultPage
};

export const BatchesRoute: Route = {
  name: "batches",
  path: "/batches",
  sidebar: true,
  component: DefaultPage
};

export const VesselsRoute: Route = {
  name: "vessels",
  path: "/vessels",
  sidebar: true,
  component: DefaultPage
};

export const ScentCombosRoute: Route = {
  name: "scent combos",
  path: "/scent_combos",
  sidebar: true,
  component: DefaultPage
};

const routes: Route[] = [
  CandlesRoute,
  ScentRoute,
  ScentsRoute,
  DyeRoute,
  DyesRoute,
  WaxesRoute,
  BatchesRoute,
  VesselsRoute,
  ScentCombosRoute
];

export default routes;

export const pathFor = (route: Route, params: {}): string => {
  return generatePath(route.path, params);
};
