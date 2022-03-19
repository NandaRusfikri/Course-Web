<template>
  <div>
    <v-dialog max-width="450px" v-model="dialog_add">
      <v-card class="rounded-lg">
        <v-toolbar color="secondary" dark flat dense>
          <v-toolbar-title dark><b>Add Topic </b></v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog_add = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <br />
        <v-card-text>
          <div v-if="!topic.photo">
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
                  Recomended resolution Image 2:3
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
                >Filename : {{ topic.photo.name }}</span
              >
              <span class="dropZone-title">Size : {{ topic.photo.size }}</span>

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
              <v-autocomplete
                label="Type"
                :items="ListType"
                item-value="id"
                item-text="name"
                v-model="topic.type_id"
                dense
                outlined
                flat
              ></v-autocomplete>
            </v-col>
            <v-col class="leadform" cols="12" md="12" sm="6">
              <v-autocomplete
                label="Level"
                :items="ListLevel"
                item-value="id"
                item-text="name"
                v-model="topic.level_id"
                dense
                outlined
                flat
              ></v-autocomplete>
            </v-col>
            <v-col class="leadform" cols="12" md="12" sm="6">
              <v-autocomplete
                label="Category"
                :items="ListCategory"
                item-value="id"
                item-text="name"
                v-model="topic.category_id"
                dense
                outlined
                flat
              ></v-autocomplete>
            </v-col>

            <v-col class="leadform" cols="12" md="12" sm="6">
              <v-autocomplete
                label="Is Any Pre Test"
                :items="PreTest"
                item-value="name"
                item-text="name"
                v-model="topic.pretest"
                dense
                outlined
                flat
              ></v-autocomplete>
            </v-col>

            <v-col class="leadform" cols="12" md="12" sm="6">
              <v-text-field
                label="Name"
                v-model="topic.name"
                dense
                hint="Name Topic"
                persistent-hint
                outlined
                flat
              ></v-text-field>
            </v-col>

            <v-col class="leadform" cols="12" md="12" sm="6">
              <v-text-field
                label="Code"
                v-model="topic.code"
                dense
                hint="Code Topic"
                persistent-hint
                outlined
                flat
              ></v-text-field>
            </v-col>
            <v-col class="leadform" cols="12" md="12" sm="6">
              <v-text-field
                label="Description"
                v-model="topic.description"
                dense
                hint="Description Topic"
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
              topic.name == '' || topic.code == '' || topic.description == ''
            "
            dense
            small
            @click="FuncAddTopic()"
            color="primary"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog max-width="450px" v-model="dialog_detail">
      <v-card class="rounded-lg">
        <v-toolbar color="secondary" dark flat dense>
          <v-toolbar-title dark><b>Info Topic </b></v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog_detail = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text>
          <v-img :src="topic.photo_path" contain height="150px" />
        </v-card-text>
        <v-card-text>
          <div v-if="!topic.photo">
            <div
              :class="['dropZone', dragging ? 'dropZone-over' : '']"
              @dragenter="dragging = true"
              @dragleave="dragging = false"
            >
              <div class="dropZone-info" @drag="onChange">
                <span class="fa fa-cloud-upload dropZone-title"></span>
                <div class="dropZone-title">Drag and Drop to upload file</div>

                <div class="dropZone-title">or</div>
                <v-btn small color="btnprimary" outlined>Choose File</v-btn>
                <!-- <div class="dropZone-upload-limit-info">
                  <div>extension support: txt</div>
                  <div>maximum file size: 5 MB</div>
                </div> -->
                <div class="dropZone-title">
                  Recomended resolution Image 2:3
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
                >Filename : {{ topic.photo.name }}</span
              >
              <span class="dropZone-title">Size : {{ topic.photo.size }}</span>

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
            <v-col class="leadform" cols="12" md="6" sm="3">
              <v-autocomplete
                label="Type"
                :items="ListType"
                item-value="id"
                item-text="name"
                v-model="topic.type_id"
                dense
                outlined
                flat
              ></v-autocomplete>
            </v-col>
            <v-col class="leadform" cols="12" md="6" sm="3">
              <v-autocomplete
                label="Level"
                :items="ListLevel"
                item-value="id"
                item-text="name"
                v-model="topic.level_id"
                dense
                outlined
                flat
              ></v-autocomplete>
            </v-col>
            <v-col class="leadform" cols="12" md="6" sm="3">
              <v-autocomplete
                label="Category"
                :items="ListCategory"
                item-value="id"
                item-text="name"
                v-model="topic.category_id"
                dense
                outlined
                flat
              ></v-autocomplete>
            </v-col>

            <v-col class="leadform" cols="12" md="6" sm="3">
              <v-autocomplete
                label="Is Any Pre Test"
                :items="PreTest"
                item-value="name"
                item-text="name"
                v-model="topic.pretest"
                dense
                outlined
                flat
              ></v-autocomplete>
            </v-col>

            <v-col class="leadform" cols="12" md="12" sm="6">
              <v-text-field
                label="Name"
                v-model="topic.name"
                dense
                hint="Name Topic"
                persistent-hint
                outlined
                flat
              ></v-text-field>
            </v-col>

            <v-col class="leadform" cols="12" md="12" sm="6">
              <v-text-field
                label="Code"
                v-model="topic.code"
                dense
                hint="Code Topic"
                persistent-hint
                outlined
                flat
              ></v-text-field>
            </v-col>
            <v-col class="leadform" cols="12" md="12" sm="6">
              <v-text-field
                label="Description"
                v-model="topic.description"
                dense
                hint="Description Topic"
                persistent-hint
                outlined
                flat
              ></v-text-field>
            </v-col>
            <v-col class="leadform" cols="12" md="12" sm="6">
              <v-autocomplete
                label="Is Active"
                :items="Active"
                item-value="name"
                item-text="name"
                v-model="topic.is_active"
                dense
                outlined
                flat
              ></v-autocomplete>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            dense
            small
            outlined
            @click="dialog_detail = false"
            color="primary"
          >
            Cancel
          </v-btn>
          <v-btn @click="FuncUpdateTopic()" dense small color="primary">
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- <v-toolbar flat class="mx-4">
      <v-toolbar-title
        v-if="!this.$vuetify.breakpoint.mobile"
        style="font-family: Comfortaa, sans-serif"
        class="text-capitalize"
      >
        <b>Topic</b></v-toolbar-title
      >
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
        @change="GetListTopic()"
        outlined
        flat
      ></v-select>
      <v-btn
        color="primary"
        @click="
          (dialog_add = true),
            (topic.id = null),
            (topic.name = null),
            (topic.code = null),
            (topic.description = null),
            (topic.is_active = null),
            (topic.photo_path = null),
            (topic.type_id = null),
            (topic.category_id = null),
            (topic.level_id = null),
            (topic.pretest = null)
        "
        class="white--text"
      >
        <v-icon dark> mdi-plus </v-icon>
        <template v-if="!this.$vuetify.breakpoint.mobile">New Topic</template>
      </v-btn>
    </v-toolbar> -->
    <v-row justify="center" align="center">
      <v-col cols="12" md="10" lg="10" xl="8">
        <v-card outlined v-if="DetailCourse != null" class="mx-auto rounded-lg">
          <v-img
            gradient="to top right, rgba(90,90,90,0), rgba(90,90,90,0)"
            class="white--text align-end"
            :aspect-ratio="100 / 25"
            :src="DetailCourse.photo_path"
          >
            <p class="font-weight-medium py-0 px-3 my-0 display-1">
              {{ DetailCourse.name }}
            </p>
            <p class="font-weight-medium py-0 px-3 my-0 title">
              <b>{{ DetailCourse.code }}</b>
            </p>
          </v-img>
        </v-card>
        <br />

        <v-row>
          <v-col cols="12" md="3">
            <v-card flat outlined class="mx-auto" max-width="344">
              <v-card-text>
                <div>Word of the Day</div>
                <p class="text-h4 text--primary">be•nev•o•lent</p>
                <p>adjective</p>
                <div class="text--primary">
                  well meaning and kindly.<br />
                  "a benevolent smile"
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn text color="deep-purple accent-4"> Learn More </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col v-if="renderComponent" cols="12" md="9">
            <template v-for="item in ListTopic">
              <v-card class="mb-5 rounded-lg" outlined :key="item.id">
                <v-chip
                  style="z-index: 4"
                  absolute
                  bottom
                  small
                  color="teal"
                  label
                  text-color="white"
                >
                  {{ item.topic_category.name }}
                </v-chip>
                <v-chip small color="purple" label text-color="white">
                  {{ item.topic_level.name }}
                </v-chip>
                <v-chip small color="red" label text-color="white">
                  {{ item.topic_type.name }}
                </v-chip>

                <v-list-item two-line>
                  <v-list-item-avatar>
                    <v-icon dark class="blue">mdi-clipboard-text</v-icon>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title> {{ item.name }}</v-list-item-title>
                    <v-list-item-subtitle>
                      {{ item.code }}</v-list-item-subtitle
                    >
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-menu offset-y>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          icon
                          color="secondary"
                          dark
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon> mdi-dots-vertical</v-icon>
                        </v-btn>
                      </template>
                      <v-list>
                        <v-list-item
                          @click="
                            (dialog_detail = true),
                              (topic.id = item.id),
                              (topic.name = item.name),
                              (topic.code = item.code),
                              (topic.description = item.description),
                              (topic.is_active = item.is_active),
                              (topic.photo_path = item.photo_path),
                              (topic.type_id = item.topic_type_id),
                              (topic.category_id = item.topic_category_id),
                              (topic.level_id = item.topic_level_id),
                              (topic.pretest = item.is_any_pre_test)
                          "
                        >
                          <v-list-item-title>Edit</v-list-item-title>
                        </v-list-item>
                        <v-list-item
                          @click="
                            $router.push({
                              path: '/setting/topic/detail',
                              query: { id: item.id },
                            })
                          "
                        >
                          <v-list-item-title>Lihat</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-list-item-action>
                </v-list-item>
              </v-card>
            </template>
          </v-col>
        </v-row>
      </v-col></v-row
    >
  </div>
</template>
<script>
export default {
  layout: "home",
  middleware({ store, redirect }) {
    console.log("course ", store.state.token);
    if (store.state.token == undefined) {
      return redirect("/login");
    }
  },
  data() {
    return {
      renderComponent: true,
      DetailCourse: null,
      loading: false,
      dragging: false,
      ListTopic: [],
      show: false,
      dialog_add: false,
      dialog_detail: false,
      topic: {
        id: null,
        photo: null,
        name: null,
        code: null,
        description: null,
        type_id: 1,
        category_id: 1,
        level_id: 1,
        pretest: "NO",
        is_active: null,
        photo_path: null,
      },
      ListType: [],
      ListLevel: [],
      ListCategory: [],
      PreTest: [{ name: "YES" }, { name: "NO" }],
      Active: [{ name: "Active" }, { name: "No Active" }],
      DefaultIsActive: "Active",
    };
  },

  async mounted() {
    // await this.GetListTopic();
    this.GetListLevel();
    this.GetListType();
    this.GetListCategory();
    this.GetDetailCourse();
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

      this.topic.photo = file;
      console.log(this.topic.photo);
      this.dragging = false;
    },
    removeFile() {
      this.topic.photo = "";
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
      this.GetListTopic();
    },
    async GetListTopic() {
      await this.$req
        .post("api/v1/topic/list", { is_active: this.DefaultIsActive })
        .then((response) => {
          this.ListTopic = response.data.items;
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
    async GetDetailCourse() {
      await this.$req
        .post("api/v1/course/" + this.$route.query.id)
        .then((response) => {
          this.DetailCourse = response.data.item;
          this.ListTopic = response.data.item.topic;
          this.$store.commit("SET_HEADER", response.data.item.name);
          this.$store.commit("SET_SUB_HEADER", response.data.item.code);
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
    async GetListCategory() {
      await this.$req
        .get("api/v1/topic/category")
        .then((response) => {
          this.ListCategory = response.data.items;
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
    async GetListLevel() {
      await this.$req
        .get("api/v1/topic/level")
        .then((response) => {
          this.ListLevel = response.data.items;
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
    async GetListType() {
      await this.$req
        .get("api/v1/topic/type")
        .then((response) => {
          this.ListType = response.data.items;
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
    async FuncAddTopic() {
      this.loading = true;
      let formData = new FormData();

      formData.append("code", this.topic.code);
      formData.append("name", this.topic.name);
      formData.append("description", this.topic.description);
      formData.append("topic_type_id", this.topic.type_id);
      formData.append("topic_category_id", this.topic.category_id);
      formData.append("topic_level_id", this.topic.level_id);
      formData.append("photo", this.topic.photo);
      formData.append("is_any_pre_test", this.topic.pretest);
      formData.append("course_id", this.$route.query.id);
      formData.append("is_active", this.Active[0].name);

      await this.$req
        .post("api/v1/topic", formData)
        .then((response) => {
          var topic = {
            id: null,
            photo: null,
            name: null,
            code: null,
            description: null,
            type_id: 1,
            category_id: 1,
            level_id: 1,
            pretest: "NO",
            is_active: null,
            photo_path: null,
          };
          this.topic = topic;
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
    async FuncUpdateTopic() {
      this.loading = true;
      let formData = new FormData();

      formData.append("code", this.topic.code);
      formData.append("name", this.topic.name);
      formData.append("description", this.topic.description);
      formData.append("topic_type_id", this.topic.type_id);
      formData.append("topic_category_id", this.topic.category_id);
      formData.append("topic_level_id", this.topic.level_id);
      formData.append("is_any_pre_test", this.topic.pretest);
      formData.append("course_id", this.$route.query.id);
      formData.append("is_active", this.topic.is_active);
      if (this.topic.photo) {
        formData.append("photo", this.topic.photo);
      }

      await this.$req
        .put("api/v1/topic/" + this.topic.id, formData)
        .then((response) => {
          var topic = {
            id: null,
            photo: null,
            name: null,
            code: null,
            description: null,
            type_id: 1,
            category_id: 1,
            level_id: 1,
            pretest: "NO",
            is_active: null,
            photo_path: null,
          };
          this.topic = topic;
          this.ReloadComponent();
          let snackbar = {
            color: "success",
            message: response.data.message,
            enabled: true,
          };

          this.$store.commit("SET_SNACKBAR", snackbar);
          this.dialog_detail = false;
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
