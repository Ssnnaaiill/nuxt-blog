<template>
  <section class="util__container">
    <component
      v-if="story.content.component"
      :key="story.content._uid"
      :blok="story.content"
      :is="story.content.component"
    ></component>
  </section>
</template>

<script>
export default {
  data: () => ({
    story: {
      content: {}
    }
  }),
  asyncData(context) {
    // Load the JSON from the API
    return context.app.$storyapi.get("cdn/stories/home", {
      version: "draft"
    }).then((res) => {
      return res.data
    }).catch((res) => {
      if (!res.response) {
        console.error(res);
        context.error({ statusCode: 404, message: "Failed to receive content from api" });
      }
    });
  },
  mounted() {
    // use the bridge to listen to events
    this.$storybridge.on(["input", "published", "change"], (event) => {
      if (event.action == "input") {
        if (event.story.id === this.story.id) {
          this.story.content = event.story.content
        }
      } else {
        // window.location.reload()
        this.$nuxt.$router.go({
          path: this.$nuxt.$router.currentRoute,
          force: true
        });
      }
    });
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
