<template>
  <footer>
    <div>
      <!-- <img
        src="./images/abc.png"
        :style="{ height: '50px', marginBottom: '10px' }"
        alt=""
      /> -->
      <h1 style="color: var(--text-color)">
        <span style="color: var(--primary-color)">Broh</span> Fitness
      </h1>
    </div>
    <div class="footer-main">
      <div>
        <p class="footer-heading">Address</p>

        <p>Lehal Chownk , Rajbaha Road</p>
        <p>near 21 no. Flyover</p>
        <p>Patiala, Punjab (147001)</p>
      </div>
      <div>
        <p class="footer-heading">Contact us</p>

        <p><i class="pi pi-whatsapp" style="font-size: 1rem"></i> 9878377527</p>
        <p><i class="pi pi-github" style="font-size: 1rem"></i> Rohithanss</p>
        <p>
          <i class="pi pi-envelope" style="font-size: 1rem"></i>
          rohithanss@icloud.com
        </p>
      </div>
      <div>
        <p class="footer-heading">Follow Us</p>

        <p>
          <i class="pi pi-facebook" style="font-size: 1rem"></i> Broh Fitness
        </p>
        <p>
          <i class="pi pi-instagram" style="font-size: 1rem"></i> Broh Fitness
        </p>
        <p>
          <i class="pi pi-youtube" style="font-size: 1rem"></i> Broh Fitness
        </p>
      </div>
    </div>
  </footer>
  <div
    :style="{
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'black',
      color: 'white',
      fontSize: '0.8rem',
    }"
  >
    Made With Code By Rohit Hans & Brijesh Savaliya
  </div>
</template>

<script setup></script>

<style scoped>
footer {
  padding: 1.5rem 3rem;
  background-color: var(--surface-200);
}
.footer-main {
  justify-content: space-between;
  display: flex;
}
.footer-heading {
  color: var(--text-color);
  font-weight: 700;
  font-size: 1.4rem;
  cursor: auto;
}
p {
  color: var(--text-color-secondary);
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
}
p:hover {
  color: var(--text-color);
}
</style>
