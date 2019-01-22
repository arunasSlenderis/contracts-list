<template>
  <div>
    <app-autocomplete
      v-if="settings.type === 'autocomplete'"
      v-model="defaultAutocompleteObject"
      :searchRoute="searchRoute"
      :error-messages="backendErrors"
      :item="defaultAutocompleteObject"
      :labelText="settings.label"
      :textField="settings.display_field[0]"
      :name="settings.field"
      @itemSelected="dataUpdatedAutocomplete"
      @blur="clearErrors(settings.field)"
    ></app-autocomplete>
    <div v-if="settings.field === 'sprint_id' && settings.type === 'autocomplete'">
      <div
        v-if="autocompleteSelection.hour_rate"
      >{{ $t('projects.labels.hour_rate') }}: {{autocompleteSelection.hour_rate}}</div>
      <div
        v-if="autocompleteSelection.starts_at"
      >{{ $t('projects.labels.starts') }}: {{autocompleteSelection.starts_at}}</div>
      <div
        v-if="autocompleteSelection.deadline"
      >{{ $t('projects.labels.deadline') }}: {{autocompleteSelection.deadline}}</div>
    </div>

    <v-text-field
      v-if="settings.type === 'text'"
      v-model="item[settings.field]"
      :error-messages="backendErrors"
      :name="settings.field"
      :label="settings.label"
      @change="dataUpdated"
      @blur="clearErrors(settings.field);"
    ></v-text-field>

    <v-textarea
      v-if="settings.type === 'textarea'"
      v-model="item[settings.field]"
      :error-messages="backendErrors"
      :name="settings.field"
      :label="settings.label"
      auto-grow
      @change="dataUpdated"
      @blur="clearErrors(settings.field)"
    ></v-textarea>

    <v-checkbox
      v-if="settings.type === 'checkbox'"
      v-model="item[settings.field]"
      :error-messages="backendErrors"
      :name="settings.field"
      :label="settings.label"
      @change="dataUpdated"
      @blur="clearErrors(settings.field)"
    ></v-checkbox>

    <v-select
      v-if="settings.type === 'select'"
      v-model="item[settings.field]"
      :items="settings.items"
      :error-messages="backendErrors"
      :name="settings.field"
      :label="settings.label"
      @change="dataUpdated"
      @blur="clearErrors(settings.field)"
    ></v-select>

    <v-menu
      v-if="settings.type === 'date'"
      v-model="datePicker"
      :close-on-content-click="false"
      min-width="290"
      lazy
      offset-y
      full-width
    >
      <v-text-field
        slot="activator"
        v-model="passedItem[settings.field]"
        :error-messages="backendErrors"
        :name="settings.field"
        :label="settings.label"
        append-icon="event"
        @blur="passedItem[settings.field] = formatDate($event.target.value); updateDate(passedItem[settings.field]); clearErrors(settings.field);"
      ></v-text-field>
      <v-date-picker
        v-model="passedItem[settings.field]"
        :locale="$store.state.settings.locale"
        first-day-of-week="1"
        no-title
        scrollable
        @input="updateDate(passedItem[settings.field]); datePicker = false;"
      ></v-date-picker>
    </v-menu>
  </div>
</template>

<script>
import Autocomplete from '../Autocomplete';
import formMixin from '../../mixins/form-mixin';
import dateUtilsMixin from '../../mixins/date-utils-mixin';

export default {
  name: 'FormField',

  inject: ['parentValidator'],

  mixins: [formMixin, dateUtilsMixin],

  props: [
    'client',
    'contract',
    'supplement',
    'item',
    'settings',
    'backendErrors',
    'findDependency'
  ],

  components: {
    appAutocomplete: Autocomplete
  },

  computed: {
    defaultAutocompleteObject() {
      if (this.client && this.client.id && this.settings.model === 'client') return this.client;
      return null;
    },
    searchRoute() {
      if (!this.settings.depends_on || !this.findDependency)
        return this.settings.find_route;
      return `${this.settings.find_route}${this.settings.depends_on}/${
        this.findDependency
      }/`;
    }
  },

  data() {
    return {
      datePicker: false,
      passedItem: this.item,
      autocompleteSelection: {}
    };
  },

  methods: {
    dataUpdatedAutocomplete(data) {
      this.autocompleteSelection = data;
      const dataToSend = {};
      dataToSend[this.settings.model] = data;
      dataToSend[this.settings.field] = data[this.settings.display_field[1]];

      this.$emit('dataUpdated', dataToSend);
    },

    dataUpdated(data) {
      const dataToSend = {};
      dataToSend[this.settings.field] = data;

      this.$emit('dataUpdated', dataToSend);
    },

    updateDate(date) {
      if (date) {
        this.dataUpdated(date);
      }
    }
  }
};
</script>
