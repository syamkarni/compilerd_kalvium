<template>
  <div id="app">
    <h1>Online Compiler</h1>
    <div>
      <label for="language">Select Language:</label>
      <select v-model="selectedLanguage" id="language">
        <option v-for="language in languages" :key="language" :value="language">{{ language }}</option>
      </select>
    </div>
    <div>
      <label for="code">Code:</label>
      <textarea v-model="code" id="code" rows="10" cols="50"></textarea>
    </div>
    <button @click="compileCode">Compile</button>
    <div v-if="output">
      <h2>Output:</h2>
      <pre>{{ output }}</pre>
    </div>
  </div>
</template>

<script>
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

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

label {
  display: block;
  margin-top: 20px;
}

textarea {
  width: 100%;
  margin-top: 10px;
}

button {
  margin-top: 20px;
}

pre {
  text-align: left;
  background: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
}
</style>
