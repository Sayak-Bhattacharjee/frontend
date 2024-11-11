<template>
  <div>
    <h2>Welcome to SkyServe</h2>
    <MapComponent v-if="files.length" :files="files" />

    <form @submit.prevent="uploadFile">
      <input type="text" v-model="filename" placeholder="File Name" required />

      <select v-model="fileType">
        <option value="GeoJSON">GeoJSON</option>
        <option value="KML">KML</option>
      </select>

      <input type="file" @change="handleFileChange" required />
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

      <button type="submit">Upload File</button>
    </form>

    <ul>
      <li v-for="file in files" :key="file.id">
        {{ file.filename }} - {{ file.fileType }}
      </li>
    </ul>
  </div>
</template>

<script>
import api from "../api";
import MapComponent from "../components/MapComponent.vue";

export default {
  components: { MapComponent },
  data() {
    return {
      files: [],
      filename: "",
      fileType: "GeoJSON",
      selectedFile: null,
      fileContent: "", // Store file content
      errorMessage: "",
    };
  },
  async created() {
    this.fetchFiles();
  },
  methods: {
    async fetchFiles() {
      const userId = 1; // Replace with actual user ID if needed
      const response = await api.get(`/files/user/${userId}`);
      this.files = response.data;
    },

    handleFileChange(event) {
      const file = event.target.files[0];
      const maxFileSize = 10 * 1024 * 1024; // 10MB

      if (file.size > maxFileSize) {
        this.errorMessage =
          "File is too large. Please upload a file smaller than 10MB.";
        this.selectedFile = null;
        this.fileContent = "";
        return;
      }
      this.selectedFile = file;

      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        this.fileContent = e.target.result; // Store file content as text
      };
      fileReader.readAsText(file); // Read file content as text

      // Validate file type
      const fileExtension = file.name.split(".").pop().toLowerCase();
      const isValidFileType =
        (this.fileType === "GeoJSON" && fileExtension === "geojson") ||
        (this.fileType === "KML" && fileExtension === "kml");

      if (!isValidFileType) {
        this.errorMessage = `File type does not match selected option. Please upload a ${this.fileType} file.`;
        this.selectedFile = null; // Reset the selected file
        this.fileContent = ""; // Reset file content
      } else {
        this.errorMessage = ""; // Clear error if the file type is valid
      }
    },

    async uploadFile() {
      if (!this.selectedFile || !this.fileContent) {
        this.errorMessage = "Please select a valid file to upload.";
        return;
      }

      const userId = 1; // Replace with actual user ID if needed
      const fileData = {
        filename: this.filename,
        fileType: this.fileType,
        userId,
        fileContent: this.fileContent, // Send file content
      };

      try {
        
        const response = await api.post("/files/upload", fileData);
        this.files.push(response.data.file); // Add the new file metadata to the list
        this.resetForm(); // Clear the form after successful upload
      } catch (error) {
        this.errorMessage = "Error uploading file. Please try again.";
      }
    },

    resetForm() {
      this.filename = "";
      this.fileType = "GeoJSON";
      this.selectedFile = null;
      this.fileContent = "";
      this.errorMessage = "";
    },
  },
};
</script>

<style>
.error {
  color: red;
}
</style>
