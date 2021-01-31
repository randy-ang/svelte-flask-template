import { RAND_PATH } from "@url";

const RandPage = () =>
  import(/* webpackChunkName: 'rand-view' */ "./Rand.svelte");

const RandRoute = {
  path: RAND_PATH,
  component: RandPage,
};

export default RandRoute;
