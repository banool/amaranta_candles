import React from "react";
import { generatePath } from "react-router";

import DefaultPage from "../components/DefaultPage";

import BatchPage from "../batches/BatchPage";
import BatchesPage from "../batches/BatchesPage";

import CandlePage from "../candles/CandlePage";
import CandlesPage from "../candles/CandlesPage";

import ScentPage from "../scents/ScentPage";
import ScentsPage from "../scents/ScentsPage";

import DyePage from "../dyes/DyePage";
import DyesPage from "../dyes/DyesPage";

import ScentComboPage from "../scent_combos/ScentComboPage";
import ScentCombosPage from "../scent_combos/ScentCombosPage";

import WaxPage from "../waxes/WaxPage";
import WaxesPage from "../waxes/WaxesPage";

import VesselPage from "../vessels/VesselPage";
import VesselsPage from "../vessels/VesselsPage";

interface Route {
  name: string;
  path: string;
  sidebar: boolean;
  component: React.FunctionComponent;
}

export const CandleRoute: Route = {
  name: "candle",
  path: "/candles/:id",
  sidebar: false,
  component: CandlePage
};
export const CandlesRoute: Route = {
  name: "candles",
  path: "/candles",
  sidebar: true,
  component: CandlesPage
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

export const WaxRoute: Route = {
  name: "wax",
  path: "/waxes/:id",
  sidebar: false,
  component: WaxPage
};
export const WaxesRoute: Route = {
  name: "waxes",
  path: "/waxes",
  sidebar: true,
  component: WaxesPage
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

export const VesselRoute: Route = {
  name: "vessel",
  path: "/vessels/:id",
  sidebar: false,
  component: VesselPage
};
export const VesselsRoute: Route = {
  name: "vessels",
  path: "/vessels",
  sidebar: true,
  component: VesselsPage
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
  CandleRoute,
  CandlesRoute,
  ScentRoute,
  ScentsRoute,
  DyeRoute,
  DyesRoute,
  WaxRoute,
  WaxesRoute,
  BatchRoute,
  BatchesRoute,
  VesselRoute,
  VesselsRoute,
  ScentComboRoute,
  ScentCombosRoute
];

export default routes;

export const pathFor = (route: Route, params: {}): string => {
  return generatePath(route.path, params);
};
