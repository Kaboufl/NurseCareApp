<script setup lang="ts"></script>

<template>
  <main>
    <h1>NurseCare</h1>
    <p>Votre compagnon santé</p>

    <RouterLink to="/login" class="login-button">Se connecter</RouterLink>
  </main>
</template>

<style scoped>
main {
  position: relative;
  height: 100dvh;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

main::-webkit-scrollbar {
  display: none;
}

h1 {
  width: fit-content;
  margin: 0 auto;
  margin-top: 20vh;
  font-family: colortube;
  font-size: 1.875rem;
  color: #0c3762;
}

p {
  width: fit-content;
  margin: 0 auto;
  margin-top: 2vh;
  font-size: 1.25rem;
  font-weight: bold;
  color: black;
}

.login-button {
  width: 100%;
  background-color: #f6a2d2;
  color: #fbecf5;
  margin-top: auto;
  text-align: center;
  font-size: 1.125rem;
  font-weight: 600;
  border-radius: 0.5rem;
  padding: 1.25rem 0.625rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>
