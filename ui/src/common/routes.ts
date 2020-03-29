import React from "react";
import { generatePath } from "react-router";

import DefaultPage from "../components/DefaultPage";

import BatchPage from "../batches/BatchPage";
import BatchesPage from "../batches/BatchesPage";


import ScentPage from "../scents/ScentPage";
import ScentsPage from "../scents/ScentsPage";

import DyePage from "../dyes/DyePage";
import DyesPage from "../dyes/DyesPage";

import ScentComboPage from "../scent_combos/ScentComboPage";
import ScentCombosPage from "../scent_combos/ScentCombosPage";

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

export const BatchRoute: Route = {
  name: "batch",
  path: "/batch/:id",
  sidebar: false,
  component: BatchPage
};
export const BatchesRoute: Route = {
  name: "batches",
  path: "/batches",
  sidebar: true,
  component: BatchesPage
};

export const VesselsRoute: Route = {
  name: "vessels",
  path: "/vessels",
  sidebar: true,
  component: DefaultPage
};

export const ScentComboRoute: Route = {
  name: "scent combo",
  path: "/scent_combos/:id",
  sidebar: false,
  component: ScentComboPage
};

export const ScentCombosRoute: Route = {
  name: "scent combos",
  path: "/scent_combos",
  sidebar: true,
  component: ScentCombosPage
};

const routes: Route[] = [
  CandlesRoute,
  ScentRoute,
  ScentsRoute,
  DyeRoute,
  DyesRoute,
  WaxesRoute,
  BatchRoute,
  BatchesRoute,
  VesselsRoute,
  ScentComboRoute,
  ScentCombosRoute
];

export default routes;

export const pathFor = (route: Route, params: {}): string => {
  return generatePath(route.path, params);
};
