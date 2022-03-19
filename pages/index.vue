<template>
  <div>
    <v-dialog max-width="450px" v-model="dialog_add">
      <v-card class="rounded-lg">
        <v-toolbar color="secondary" dark flat dense>
          <v-toolbar-title dark><b>Add Course </b></v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog_add = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <br />
        <v-card-text>
          <div v-if="!course.photo">
            <div
              :class="['dropZone', dragging ? 'dropZone-over' : '']"
              @dragenter="dragging = true"
              @dragleave="dragging = false"
            >
              <div class="dropZone-info" @drag="onChange">
                <span class="fa fa-cloud-upload dropZone-title"></span>
                <div class="dropZone-title">Drop and Drop to upload file</div>

                <div class="dropZone-title">or</div>
                <v-btn small color="btnprimary" outlined>Choose File</v-btn>
                <!-- <div class="dropZone-upload-limit-info">
                  <div>extension support: txt</div>
                  <div>maximum file size: 5 MB</div>
                </div> -->
                <div class="dropZone-title">
                  Recomended resolution Image 2:4
                </div>
              </div>
              <input
                type="file"
                accept="image/png, image/jpeg"
                @change="onChange"
              />
            </div>
          </div>
          <div v-else class="dropZone-uploaded">
            <div class="dropZone-uploaded-info">
              <span class="dropZone-title"
                >Filename : {{ course.photo.name }}</span
              >
              <span class="dropZone-title">Size : {{ course.photo.size }}</span>

              <v-btn
                type="button"
                class=""
                small
                color="error"
                outlined
                @click="removeFile"
              >
                Remove File
              </v-btn>
            </div>
          </div>
        </v-card-text>
        <v-card-text>
          <v-row>
            <v-col class="leadform" cols="12" md="12" sm="6">
              <v-text-field
                label="Name"
                v-model="course.name"
                dense
                hint="e.g : Cyber Security Awareness"
                persistent-hint
                outlined
                flat
              ></v-text-field>
            </v-col>

            <v-col class="leadform" cols="12" md="12" sm="6">
              <v-text-field
                label="Code"
                v-model="course.code"
                dense
                hint="e.g : VIII"
                persistent-hint
                outlined
                flat
              ></v-text-field>
            </v-col>
            <v-col class="leadform" cols="12" md="12" sm="6">
              <v-text-field
                label="Description"
                v-model="course.description"
                dense
                hint="Description Course"
                persistent-hint
                outlined
                flat
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            dense
            small
            outlined
            @click="dialog_add = false"
            color="primary"
          >
            Cancel
          </v-btn>
          <v-btn
            :disabled="
              course.name == '' || course.code == '' || course.description == ''
            "
            dense
            small
            @click="FuncAddCourse()"
            color="primary"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row
      v-if="AssessmentList && GotoAssessment"
      align="center"
      justify="center"
    >
      <v-alert
        class="mt-3 rounded-lg"
        max-width="500px"
        align="center"
        justify="center"
        prominent
        outlined
        type="error"
      >
        <v-row align="center">
          <v-col class="grow"> Ada Assessment Yang Berlangsung !!! </v-col>
          <v-col class="shrink">
            <v-btn
              color="error"
              @click="
                $router.push({
                  path: '/assessment',
                  query: { id: AssessmentList[0].id },
                })
              "
              >Selesaikan</v-btn
            >
          </v-col>
        </v-row>
      </v-alert>
    </v-row>
    <v-toolbar flat class="mx-4">
      <v-spacer />
      <v-select
        style="max-width: 150px"
        class="shrink mx-4"
        hide-details
        solo
        single-line
        label="Is Active ?"
        :items="Active"
        item-value="name"
        item-text="name"
        v-model="DefaultIsActive"
        dense
        @change="GetListCourse()"
        outlined
        flat
      ></v-select>
    </v-toolbar>
    <v-row v-if="renderComponent" justify="center" align="center">
      <v-col cols="12" md="10">
        <v-row v-if="renderComponent" justify="center" align="center">
          <template v-for="item in ListCourse">
            <v-col cols="12" sm="4" md="4" :key="item.id">
              <v-card  outlined hover class="rounded-lg mx-auto">
                <v-card>
                  <v-img
                    class="align-center"
                    :aspect-ratio="100 / 25"
                    :src="item.photo_path"
                    gradient="to top right, rgba(100,100,100,0), rgba(100,100,100,0)"
                  >
                    <v-card-text>
                      <p
                        class="font-weight-medium white--text text-capitalize title py-0 my-0"
                      >
                        {{ item.name }}
                      </p>

                      <p
                        class="font-weight-medium white--text text-capitalize subtitle-1 py-0 my-0"
                      >
                        {{ item.code }}
                      </p>
                    </v-card-text>
                  </v-img>
                  <v-btn v-if="!$vuetify.breakpoint.mobile" icon fab bottom right absolute>
                    <v-avatar size="75">
                      <img
                        src="https://cdn.vuetifyjs.com/images/john.jpg"
                        alt="John"
                      /> </v-avatar
                  ></v-btn>
                </v-card>

                <v-card v-if="!$vuetify.breakpoint.mobile" min-height="80px" flat></v-card>
                <v-divider />
                <v-card-actions v-if="!$vuetify.breakpoint.mobile">
                  <v-spacer />
                  <v-btn icon>

                  <v-icon
                  color="black"
                    @click="
                      $router.push({ path: '/course', query: { id: item.id } })
                    "
                  >
                   mdi-folder-outline
                  </v-icon>
                  </v-btn>
                </v-card-actions>
                <v-btn
                  v-if="$vuetify.breakpoint.mobile"
                  style="z-index: 3"
                  small
                  icon
                  dark
                  right
                  absolute
                  top
                  @click="
                    $router.push({ path: '/course', query: { id: item.id } })
                  "
                >
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </v-card>
            </v-col>
          </template>
        </v-row>
      </v-col>
      <v-col cols="12" md="2"></v-col>
    </v-row>

  </div>
</template>
<script>
export default {
  middleware({ app, store, redirect }) {
    console.log("dashboard ", app.$cookies.get("token"));
    if (!app.$cookies.get("token")) {
      return redirect("/login");
    }
  },
  layout: "home",
  data() {
    return {
      GotoAssessment: false,
      AssessmentList: null,
      Active: [{ name: "Active" }, { name: "No Active" }],
      DefaultIsActive: "Active",
      DataUser: null,
      DataToken: null,
      renderComponent: true,
      loading: false,
      dragging: false,
      ListCourse: [],
      show: false,
      dialog_add: false,
      dialog_detail: false,
      course: {
        id: null,
        photo: null,
        name: null,
        code: null,
        description: null,
        is_active: null,
        photo_path: null,
      },
    };
  },

  mounted() {
    this.GetListCourse();
    this.FuncListAssessmentProgress();
  },
  created() {
    this.DataUser = this.$cookies.get("user");
  },

  methods: {
    onChange(e) {
      var files = e.target.files || e.dataTransfer.files;

      if (!files.length) {
        this.dragging = false;
        return;
      }

      this.createFile(files[0]);
    },
    createFile(file) {
      if (file.size > 5000000) {
        alert("please check file size no over 5 MB.");
        this.dragging = false;
        return;
      }

      this.course.photo = file;
      this.dragging = false;
    },
    removeFile() {
      this.course.photo = "";
    },
    isNumber: function (evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    forceRerender() {
      this.renderComponent = false;
      this.$nextTick(() => {
        this.renderComponent = true;
      });
    },
    async ReloadComponent() {
      this.forceRerender();
      this.GetListCourse();
    },
    async GetListCourse() {
      this.ListCourse = [];
      await this.$req
        .post("api/v1/course/list", { is_active: this.DefaultIsActive })
        .then((response) => {
          this.ListCourse = response.data.items;
        })
        .catch((error) => {
          this.loading = false;
          let snackbar = {
            color: "error",
            message: error.response.data.message,
            enabled: true,
          };

          this.$store.commit("SET_SNACKBAR", snackbar);
        });
    },
    async FuncCourse() {
      this.loading = true;
      let formData = new FormData();

      formData.append("code", this.course.code);
      formData.append("name", this.course.name);
      formData.append("description", this.course.description);
      formData.append("photo", this.course.photo);
      formData.append("is_active", this.Active[0].name);

      await this.$req
        .post("api/v1/course", formData)
        .then((response) => {
          var course = {
            name: null,
            description: "",
            code: "",
            photo: "",
          };
          this.course = course;
          this.ReloadComponent();
          let snackbar = {
            color: "success",
            message: response.data.message,
            enabled: true,
          };

          this.$store.commit("SET_SNACKBAR", snackbar);
          this.dialog_add = false;
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
          let snackbar = {
            color: "error",
            message: error.response.data.message,
            enabled: true,
          };

          this.$store.commit("SET_SNACKBAR", snackbar);
        });
    },
    async FuncListAssessmentProgress() {
      await this.$req
        .post("api/v1/assessment/list", {
          user_id: this.DataUser.user.id,
          status: "PROGRESS",
        })
        .then((response) => {
          this.AssessmentList = response.data.items;

          var now = new Date().getTime();
          var batas = new Date(this.AssessmentList[0].created_at);
          batas.setMinutes(
            batas.getMinutes() + this.AssessmentList[0].topic.duration
          );
          var distance = batas.getTime() - now;
          if (distance > 0) {
            this.GotoAssessment = true;
          }
        })
        .catch((error) => {
          this.loading = false;
          let snackbar = {
            color: "error",
            message: error.response.data.message,
            enabled: true,
          };

          this.$store.commit("SET_SNACKBAR", snackbar);
        });
    },
  },

  computed: {},
};
</script>
<style scoped>
.leadform {
  padding-bottom: 0px;
  padding-top: 0px;
}
.dropZone {
  width: 100%;
  height: 120px;
  position: relative;
  border: 3px dashed rgb(126, 115, 115);
}

.dropZone:hover {
  border: 2px solid #2e94c4;
}

.dropZone:hover .dropZone-title {
  color: #1975a0;
}

.dropZone-info {
  color: #a8a8a8;
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translate(0, -50%);
  text-align: center;
}

.dropZone-title {
  color: #787878;
}

.dropZone input {
  position: absolute;
  cursor: pointer;
  top: 0px;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.dropZone-upload-limit-info {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}

.dropZone-over {
  background: #5c5c5c;
  opacity: 0.8;
}

.dropZone-uploaded {
  width: 100%;
  height: 120px;
  position: relative;
  border: 3px dashed rgb(126, 115, 115);
}

.dropZone-uploaded-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #a8a8a8;
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translate(0, -50%);
  text-align: center;
}

.removeFile {
  width: 200px;
}
</style>
