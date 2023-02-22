<template>
  <div class="we-offers">
    <h2>Transform Yourself Today with Best Certified Trainers</h2>
    <div class="we-offers-main">
      <div class="offers-card">
        <h3>Live Training Sessions</h3>
        <ul>
          <li class="course">Fat Loss</li>
          <li class="course">Weight Gain</li>
          <li class="course">Many More</li>
        </ul>
        <p class="starting-from">Starting From Just Rs. 9999</p>
        <RouterLink to="/trainings" :style="{ width: '100%' }">
          <Button :style="{ cursor: 'pointer', width: '100%' }"
            >Explore More</Button
          >
        </RouterLink>
      </div>
      <div class="offers-card">
        <h3>Train Yourself (Recorded Courses)</h3>
        <ul>
          <li class="course">Diet Planning Course</li>
          <li class="course">Exercise Schedule for a Month</li>
          <li class="course">Basic Yoga Course (Beginner)</li>
        </ul>
        <p class="starting-from">Starting From Just Rs. 1499</p>
        <Button>Explore More</Button>
      </div>
    </div>
  </div>
</template>

<script></script>

<style scoped>
.we-offers {
  width: 100vw;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 2rem 0;
  align-items: center;
  background-color: var(--surface-100);
}
.we-offers-main {
  display: flex;
  width: 80%;
  justify-content: space-between;
  margin: 2rem 0;
}
.offers-card > h3 {
  font-size: 1.5rem;
}
.offers-card {
  width: 45%;
  padding: 2rem 3rem;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
ul {
  font-size: 1.2rem;
  padding-left: 30px;
  font-weight: 500;
  color: var(--text-color-secondary);
}
.starting-from {
  color: var(--text-color);
  font-weight: 600;
}
.p-button {
  justify-content: center;
}
a {
  text-decoration: none;
}
</style>
