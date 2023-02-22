<template>
  <div>
    <Galleria
      :value="images"
      :responsiveOptions="responsiveOptions"
      :numVisible="5"
      containerStyle="max-width: 100%"
      :circular="true"
      :autoPlay="autoPlayProp"
      :transitionInterval="2000"
      :showIndicators="false"
      :showItemNavigators="true"
      :showThumbnails="false"
    >
      <template #item="slotProps">
        <img
          :src="slotProps.item.imageSrc"
          :alt="slotProps.item.alt"
          :style="{
            width: '100%',
            display: 'block',
            aspectRatio: 9 / 3,
            objectFit: 'cover',
          }"
        />
      </template>
    </Galleria>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  data() {
    return {
      autoPlayProp: ref(true),

      images: [
        {
          imageSrc:
            "https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg",
          alt: "alternate text",
        },
        {
          imageSrc:
            "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg",
          alt: "alternate text",
        },
        {
          imageSrc:
            "https://images.pexels.com/photos/1552249/pexels-photo-1552249.jpeg",
          alt: "alternate text",
        },
        {
          imageSrc:
            "https://images.pexels.com/photos/903171/pexels-photo-903171.jpeg",
          alt: "alternate text",
        },
        {
          imageSrc:
            "https://images.pexels.com/photos/1756959/pexels-photo-1756959.jpeg",
          alt: "alternate text",
        },
      ],
      responsiveOptions: [
        {
          breakpoint: "1024px",
          numVisible: 5,
        },
        {
          breakpoint: "768px",
          numVisible: 3,
        },
        {
          breakpoint: "560px",
          numVisible: 1,
        },
      ],
    };
  },

  created() {},
  mounted() {},
};
</script>

<style scoped>
.p-galleria-item-container * {
  border: none;
}
</style>
