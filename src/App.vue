<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav class="navbar bg-white px-md-5 py-md-2 mb-2">
      <a class="navbar-brand" href="#">
        <img src="/src/assets/logo.svg" alt="logo" width="70" height="40">
      </a>
      <div>
        <RouterLink to="/" class="text-decoration-none px-2" :active-class="active">
          ثبت آدرس
        </RouterLink>
        <RouterLink to="/Address" class="text-decoration-none px-3">
          مشاهده آدرس ها
        </RouterLink>
      </div>
    </nav>
  </header>
  <RouterView />
</template>

<style scoped>
.navbar {
  box-shadow: 0px 5px 2px -4px rgba(0, 0, 0, 0.15);
  /* margin-bottom: 1rem; */
}

.navbar img {
  width: 45px;
  height: 25px;
}

.navbar div a {
  font-size: 13px;
  font-weight: 700;
  color: #37474F;
  font-family: 'Vazir';
}

.router-link-exact-active {
  color: #00BFA5 !important;
}

@media(min-width:768px) {
  .navbar div a {
    font-size: 14px;
    color: #37474F;
  }

  .navbar img {
    width: 70px;
    height: 40px;
  }
}
</style>
