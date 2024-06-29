<template>
  <div id="app">
    <h1>Online Compiler</h1>
    <div class="container">
      <label for="language">Select Language:</label>
      <select v-model="selectedLanguage" id="language">
        <option v-for="language in languages" :key="language" :value="language">{{ language }}</option>
      </select>
    </div>
    <div class="container">
      <label for="code">Code:</label>
      <textarea v-model="code" id="code" rows="10" cols="50"></textarea>
    </div>
    <div class="container">
      <button @click="compileCode">Compile</button>
    </div>
    <div v-if="output">
      <h2>Output:</h2>
      <pre>{{ output }}</pre>
    </div>
  </div>
</template>

<script>
import './MainComponent.css';

export default {
  name: 'MainComponent',
  data() {
    return {
      selectedLanguage: 'nodejs',
      languages: ['nodejs', 'python', 'java', 'c', 'cpp', 'ruby'],
      code: '',
      output: ''
    };
  },
  methods: {
    async compileCode() {
      try {
        const response = await fetch('http://localhost:3000/api/execute/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            language: this.selectedLanguage,
            script: this.code
          })
        });
        const result = await response.json();
        if (result.error === 0) {
          this.output = result.output;
        } else {
          this.output = `Error: ${result.compile_message}`;
        }
      } catch (error) {
        this.output = `Error: ${error.message}`;
      }
    }
  }
};
</script>
