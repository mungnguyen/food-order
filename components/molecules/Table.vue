<template>
  <v-data-table :headers="headerValue" :items="items" class="elevation-1" hide-default-footer>
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>{{name}}</v-toolbar-title>
        <v-divider v-if="hasAddNew" class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn v-if="hasAddNew" color="primary" dark class="mb-2" @click="$emit('addNew')">Thêm mới</v-btn>
      </v-toolbar>
    </template>

    <!-- Items -->
    <template v-for="(el, index) in headers" :slot="`item.${el.value}`" slot-scope="column">
      <slot :name="el.value" :column="column">
        <span :key="index">{{ getTableValue(column.item, el.value) }}</span>
      </slot>
    </template>

    <!-- Actions -->
    <template v-slot:item.action="{ item }">
      <slot name="actions" :item="item">
        <Icon
          v-for="(el, inx) in iconList"
          :color="el.color"
          :icon="el.icon"
          :content="el.content"
          :key="inx"
          @click="$emit(`${el.event}`, item)"
        />
      </slot>
    </template>

    <!-- No data -->
    <template v-slot:no-data>
      <p>Chưa cập nhật dữ liệu</p>
    </template>

    <!-- Pagination -->
    <template slot="footer">
      <v-pagination
        v-model="paginationValue.page"
        :length="paginationValue.length"
        circle
        @input="handleChangePagination"
      ></v-pagination>
    </template>
  </v-data-table>
</template>

<script>
import Icon from "@/components/molecules/Icon";
export default {
  components: {
    Icon
  },

  props: {
    name: {
      type: String,
      required: true
    },

    hasAddNew: {
      type: Boolean,
      default: false
    },

    headers: {
      type: Array,
      default() {
        return [];
      },
      required: true
    },

    items: {
      type: Array,
      default() {
        return [];
      }
    },

    iconList: {
      type: Array,
      default() {
        return [];
      }
    },

    pagination: {
      type: Object,
      default() {
        return {
          page: 0,
          pageSize: 0,
          total: 0
        };
      }
    }
  },

  computed: {
    headerValue() {
      return this.headers.concat({ text: "Thao tác", value: "action" });
    },

    paginationValue() {
      const page = !Number(this.pagination.pageSize)
        ? 0
        : Number(this.pagination.page) + 1;
      const length =
        Number(this.pagination.pageSize) === 0
          ? 0
          : Math.ceil(
              Number(this.pagination.total) / Number(this.pagination.pageSize)
            );
      return {
        page: page,
        length: length
      };
    }
  },

  methods: {
    getTableValue(obj, attibuteText) {
      let result = obj;
      const attibuteArr = attibuteText.split(".");
      attibuteArr.forEach(e => {
        if (result) {
          result = result[e];
        }
      });
      return result;
    },

    handleChangePagination(value) {
      this.$emit("changePage", {page: value - 1, pageSize: this.pagination.pageSize});
    }
  }
};
</script>