export default ({ app, isServer, route, store, isDev }) => {
  let version = route.query._storyblok || isDev ? "draft" : "published";
  let language = route.params.language || "en";

  if (isServer) {
    store.commit("setCacheVersion", app.$storeapi.cacheVersion);
  }

  if (!store.state.settings._uid || language !== store.state.language) {
    store.commit("setLanguage", language);
    return store.dispatch("loadSettings", { version, language })
  }
}