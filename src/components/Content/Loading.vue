<template>
  <div class="loading">
    <i-eos-icons-loading />
  </div>
</template>

<style>
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2.5rem;
  animation: defer-blink ease-in 1s;

  display: inline-flex;
  background-color: hsla(var(--bg-color-raw), 0.75);
  backdrop-filter: blur(5px);
  border-radius: 100%;
  padding: 5px;
}

@keyframes defer-blink {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  75% {
    opacity: 0.25;
  }
  100% {
    opacity: 1;
  }
}
</style>
