<template>
  <v-data-table
    :headers="headers"
    :items="$store.state.documents"
    :pagination="pagination"
    :total-items="pagination.totalItems"
    :rows-per-page-items="[pagination.rowsPerPage]"
    :hide-actions="pagination.totalItems <= pagination.rowsPerPage"
    @update:pagination="pageChanged"
  >
    <template slot="headers" slot-scope="props" justify-start>
      <tr>
        <th
          v-if="(!header.permissions || $can(header.permissions)) && !$vuetify.breakpoint[header.hidden]"
          v-for="header in props.headers"
          :key="header.text"
          class="column text-xs-left"
        >{{ header.text }}</th>
      </tr>
    </template>

    <template slot="items" slot-scope="props">
      <v-hover>
        <tr class="clickable table-row" slot-scope="{ hover }" @click="onRowClick(props)">
          <td
            v-if="!$vuetify.breakpoint[headers[0].hidden]"
          >{{ props.index + 1 + ((pagination.page - 1) * pagination.rowsPerPage) }}.</td>

          <td v-if="!$vuetify.breakpoint[headers[1].hidden]">{{ props.item.file_name }}</td>

          <td v-if="!$vuetify.breakpoint[headers[2].hidden]">
            <v-checkbox
              v-if="props.item.is_signatures_needed"
              v-model="props.item.is_signed_by_all_signees"
              hide-details
              @click.stop="emitEvent('markSigned', props.item, props.index)"
            ></v-checkbox>
          </td>

          <td
            v-if="!$vuetify.breakpoint[headers[3].hidden]"
          >{{ props.item.model ? props.item.model.date.slice(0, 10) : '' }}</td>

          <td
            v-if="!$vuetify.breakpoint[headers[4].hidden]"
          >{{ props.item.model ? props.item.model.hourly_rate : '' }}</td>

          <td v-if="!$vuetify.breakpoint[headers[5].hidden]">
            <div
              v-if="props.item.model && props.item.model.project_id"
            >{{ $t('general.project') }}: {{ props.item.model.project_id }}</div>
            <div
              v-if="props.item.model && props.item.model.sprint_id"
            >{{ $t('general.sprint') }}: {{ props.item.model.sprint_id }}</div>
            <div
              v-if="props.item.model && props.item.model.sprint_start"
            >Sprint starts: {{ props.item.model.sprint_start.slice(0, 10) }}</div>
            <div
              v-if="props.item.model && props.item.model.sprint_end"
            >Sprint ends: {{ props.item.model.sprint_end.slice(0, 10) }}</div>
          </td>
        </tr>
      </v-hover>
    </template>

    <template slot="expand" slot-scope="props">
      <div class="row-detail-wrapper clickable">

        <template v-if="$vuetify.breakpoint[headers[1].hidden]">
          <v-layout justify-space-between align-center>
            <strong>{{ headers[1].text }}:</strong>
            <span class="text-xs-right">{{ props.item.file_name }}</span>
          </v-layout>
          <v-divider class="row-detail-divider"/>
        </template>

        <template v-if="$vuetify.breakpoint[headers[2].hidden]">
          <v-layout justify-space-between align-center>
            <strong>{{ headers[2].text }}:</strong>
            <span class="text-xs-right">
              <v-checkbox
                v-if="props.item.is_signatures_needed"
                v-model="props.item.is_signed_by_all_signees"
                hide-details
                @click.stop="emitEvent('markSigned', props.item, props.index)"
              ></v-checkbox>
            </span>
          </v-layout>
          <v-divider class="row-detail-divider"/>
        </template>

        <template v-if="$vuetify.breakpoint[headers[3].hidden] && props.item.model">
          <v-layout justify-space-between align-center>
            <strong>{{ headers[3].text }}:</strong>
            <span class="text-xs-right">{{ props.item.model.date.slice(0, 10) }}</span>
          </v-layout>
          <v-divider class="row-detail-divider"/>
        </template>

        <template
          v-if="$vuetify.breakpoint[headers[4].hidden] && props.item.model && props.item.model.hourly_rate"
        >
          <v-layout justify-space-between align-center>
            <strong>{{ headers[4].text }}:</strong>
            <span class="text-xs-right">{{ props.item.model.hourly_rate }}</span>
          </v-layout>
          <v-divider class="row-detail-divider"/>
        </template>

        <template v-if="$vuetify.breakpoint[headers[5].hidden] && props.item.model">
          <v-layout justify-space-between align-center>
            <strong>{{ headers[5].text }}:</strong>
            <span class="text-xs-right">
              <div
                v-if="props.item.model && props.item.model.project_id"
              >{{ $t('general.project') }}: {{ props.item.model.project_id }}</div>
              <div
                v-if="props.item.model && props.item.model.sprint_id"
              >{{ $t('general.sprint') }}: {{ props.item.model.sprint_id }}</div>
              <div
                v-if="props.item.model && props.item.model.sprint_start"
              >Sprint starts: {{ props.item.model.sprint_start.slice(0, 10) }}</div>
              <div
                v-if="props.item.model && props.item.model.sprint_end"
              >Sprint ends: {{ props.item.model.sprint_end.slice(0, 10) }}</div>
            </span>
          </v-layout>
          <v-divider class="row-detail-divider"/>
        </template>
      </div>
    </template>
  </v-data-table>
</template>

<script>
import tableMixin from '../../mixins/table-mixin';
import documentListMixin from '../../mixins/document-list-mixin';

export default {
  name: 'ContractSupplementsTable',

  mixins: [tableMixin],

  props: {
    pagination: Object
  },

  computed: {
    headers() {
      return [
        { text: this.$t('general.no'), sortable: false, hidden: 'smAndDown' },
        { text: this.$t('documents.labels.file'), sortable: false },
        {
          text: this.$t('documents.labels.signed'),
          sortable: false,
          hidden: 'smAndDown'
        },
        {
          text: this.$t('documents.labels.document_date'),
          sortable: false,
          hidden: 'smAndDown'
        },
        {
          text: 'Hour rate',
          sortable: false,
          hidden: 'smAndDown'
        },
        {
          text: this.$t('documents.labels.project_info'),
          sortable: false,
          hidden: 'smAndDown'
        }
      ];
    }
  }
};
</script>
