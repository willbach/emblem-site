<template>
  <div class="container centered-column">
    <div class="col-lg-5 col-md-6 col-sm-7 col-xs-12">
      <form id="upload-form" class="centered-column">
        <h2>Upload Transcripts</h2>
        <div class="dropbox centered-column-center">
          <p v-if="!transcripts.length">
              Drag your file(s) here to begin<br> or click to browse
          </p>
          <input type="file" class="input-file" multiple :disabled="isSaving" :name="uploadFieldName" accept="application/pdf" v-on:change="handleFile($event.target.name, $event.target.files); fileCount=$event.target.files.length">
          <ul class="transcripts">
            <li v-for="transcript in transcripts" :key="transcript.name">
              {{ transcript.name }}
            </li>
          </ul>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Upload',

  data () {
    return {
      studentUsername: '',
      fileCount: 0,
      isSaving: false,
      uploadFieldName: 'transcriptUpload',
      transcripts: []
    }
  },

  methods: {
    handleFile (name, files) {
      this.$data.transcripts = files
    },
    uploadFiles () {
      this.$store.dispatch('uploadTranscripts', this.$data.transcripts)
    }
  }
}
</script>
