import Vue from "vue";
import Router from "vue-router";
import LandingPage from "./views/LandingPage.vue";
import SearchResults from "./views/SearchResults.vue";

Vue.use(Router);

export default new Router({
	mode: "history",
	base: process.env.BASE_URL,
	routes: [
		{
			path: "/",
			name: "LandingPage",
			component: LandingPage
		},
		{
			path: "/search-results",
			name: "search",
			component: SearchResults
		}
	]
});
