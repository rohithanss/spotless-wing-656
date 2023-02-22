<template>
  <div>
    <div class="main">
      <h2 id="running-text"></h2>
      <RouterLink to="/trainings">
        <Button :style="{ fontWeight: '600' }">Book Training</Button>
      </RouterLink>
    </div>
    <div>
      <BrohFitness />
    </div>
    <div>
      <Offers />
    </div>
    <div>
      <ImageGallery />
    </div>
    <div>
      <SuccessStories />
    </div>
  </div>
</template>
<script>
import { RouterLink } from "vue-router";
import Typewriter from "typewriter-effect/dist/core";
import { ref } from "vue";
import SuccessStories from "../components/SuccessStories.vue";
import BrohFitness from "../components/BrohFitness.vue";
import Offers from "../components/Offers.vue";
import ImageGallery from "../components/ImageGallery.vue";
export default {
  setup() {
    const hostname = ref("");
    return { hostname };
  },
  mounted() {
    new Typewriter("#running-text", {
      strings: [
        "Want to Be the better version of yourself?",
        "Want to be physically fit? Book Training Today...",
      ],
      loop: true,
      autoStart: true,
    });
  },
  components: { BrohFitness, SuccessStories, Offers, ImageGallery },
};
</script>
<style scoped>
.main {
  width: 100vw;
  padding: 2.5rem 0;
  display: flex;
  margin: 1.5rem 0;
  gap: 2.5rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  overflow: hidden;

  background: -webkit-linear-gradient(
      rgba(29, 38, 113, 0.8),
      rgba(52, 52, 52, 0.8)
    ),
    url(https://emilypost.com/client_media/images/blogs/everyday-gym.jpg);

  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
h2 {
  color: var(--text-color);
  color: white;
  font-size: 3rem;
}
button {
  font-size: 1.5rem;
}
a {
  text-decoration: none;
}
</style>
