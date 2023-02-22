<template>
  <div class="about-main">
    <div
      class="about-text"
      :style="{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }"
    >
      <h1 class="about-name">Broh Fitness</h1>
      <h2 class="about-title">
        Professional Gym and Fitness Training Platform
      </h2>
      <p class="about-summary">
        Trained 1000+ People online and offline Since 2017
      </p>
    </div>
    <!-- <div class="image">
      <img
        src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg"
        alt=""
      />
    </div> -->
  </div>
</template>

<script></script>

<style scoped>
.about-main {
  background-color: var(--surface-200);
  padding: 1rem 3rem;
  gap: 3rem;
  display: flex;
  justify-content: center;
}

.about-name {
  color: var(--primary-color);
  text-align: center;
  font-size: 3.5rem;
}
.about-title {
  font-size: 2rem;
  font-weight: 500;
  color: var(--text-color);
  text-align: center;
}
.about-summary {
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
}
img {
  aspect-ratio: 1;
  width: 15rem;
  object-fit: cover;
  object-position: top;
  border-radius: 50%;
}
</style>
