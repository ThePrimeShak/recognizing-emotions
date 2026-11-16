<script setup>
import AppIcon from '../AppIcon.vue';
import { PROJECT } from '../../constants/project.js';
</script>

<template>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="header-inner">
      <a class="brand" href="./" :aria-label="`${PROJECT.name} home`">
        <span class="brand-icon"><AppIcon name="smile" /></span>
        <span>Recognizing<span class="brand-second"> Emotions</span></span>
      </a>
      <nav aria-label="Project links">
        <a
          class="repo-link"
          :href="PROJECT.repositoryUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AppIcon name="github" />
          <span>Repository</span>
          <AppIcon class="external-arrow" name="arrow" />
          <span class="sr-only"> (opens in a new tab)</span>
        </a>
        <span class="nav-divider" aria-hidden="true"></span>
        <a
          class="author-link"
          :href="PROJECT.linkedinUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ PROJECT.author }}
          <AppIcon name="arrow" />
          <span class="sr-only"> on LinkedIn (opens in a new tab)</span>
        </a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.skip-link {
  position: fixed;
  top: -80px;
  left: 16px;
  background: #263c31;
  color: white;
  padding: 12px;
  z-index: 10;
}

.skip-link:focus {
  top: 12px;
}

.site-header {
  background: #ffffffb3;
  border-bottom: 1px solid var(--border);
}

.header-inner {
  max-width: 1160px;
  padding: 23px 32px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 11px;
  font-size: 15px;
  font-weight: 650;
  letter-spacing: -.4px;
}

.brand-icon {
  display: grid;
  place-items: center;
  background: #eaf0e6;
  color: var(--green);
  width: 37px;
  height: 37px;
  border-radius: 11px;
  font-size: 25px;
}

nav {
  display: flex;
  align-items: center;
  gap: 24px;
  font-size: 12px;
}

nav a {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 0;
}

nav a:hover {
  color: var(--green);
  text-decoration: underline;
  text-underline-offset: 5px;
}

.repo-link {
  color: #667267;
}

.repo-link .app-icon:first-child {
  font-size: 19px;
}

.author-link {
  font-weight: 650;
}

.nav-divider {
  height: 18px;
  width: 1px;
  background: var(--border);
}

@media (max-width:800px) {
  .header-inner {
    padding-left: 22px;
    padding-right: 22px;
  }
}

@media (max-width:480px) {
  .header-inner {
    padding: 18px 16px;
    gap: 10px;
    flex-wrap: wrap;
  }
  .brand {
    font-size: 12px;
    gap: 7px;
  }
  .brand-icon {
    width: 30px;
    height: 30px;
    font-size: 22px;
  }
  .brand-second {
    display: block;
  }
  .header-inner nav {
    gap: 10px;
    font-size: 10px;
  }
  .repo-link {
    gap: 4px;
  }
  .repo-link .external-arrow {
    display: none;
  }
  .nav-divider {
    height: 14px;
  }
  .author-link {
    gap: 3px;
  }
}
</style>
