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

          <td
            v-if="!$vuetify.breakpoint[headers[1].hidden]"
          >{{ props.item.model ? props.item.model.no : '' }}</td>

          <td v-if="!$vuetify.breakpoint[headers[2].hidden]">{{ props.item.file_name }}</td>

          <td v-if="!$vuetify.breakpoint[headers[3].hidden]">
            <v-checkbox
              v-if="props.item.is_signatures_needed"
              v-model="props.item.is_signed_by_all_signees"
              hide-details
              @click.stop="emitEvent('markSigned', props.item, props.index)"
            ></v-checkbox>
          </td>

          <td
            v-if="!$vuetify.breakpoint[headers[4].hidden]"
          >{{ props.item.model ? props.item.model.date.slice(0, 10) : '' }}</td>

          <td
            v-if="!$vuetify.breakpoint[headers[5].hidden]"
          >{{ props.item.model && props.item.model.client ? props.item.model.client.name : '' }}</td>

          <td
            v-if="hover && !$store.state.isTouchDevice && !props.item.is_signed_by_all_signees"
            class="row-actions actions-column"
          >
            <v-tooltip v-if="props.item.model && props.item.model.supplements.length" lazy bottom>
              <v-btn slot="activator" icon class="mx-0" @click.stop="viewSupplements(props.item)">
                <v-icon color="iconbtn">exit_to_app</v-icon>
              </v-btn>
              <span>{{ $t('documents.labels.view_supplements') }}</span>
            </v-tooltip>

            <v-tooltip lazy bottom>
              <v-btn
                slot="activator"
                icon
                class="mx-0"
                @click.stop="emitEvent('newSupplement', props.item, props.index)"
              >
                <v-icon color="iconbtn">directions_run</v-icon>
              </v-btn>
              <span>{{ $t('documents.labels.new_contract_supplement') }}</span>
            </v-tooltip>
          </td>

          <td v-else-if="$store.state.isTouchDevice" class="actions-column">
            <v-menu
              v-if="!props.item.is_signed_by_all_signees"
              bottom
              lazy
              offset-y
              @click.native.stop
            >
              <v-btn slot="activator" icon class="mx-0">
                <v-icon color="iconbtn">more_vert</v-icon>
              </v-btn>
              <v-list>
                <v-list-tile v-if="props.item.model && props.item.model.supplements.length" @click="viewSupplements(props.item)">
                  <v-list-tile-action>
                    <v-icon>exit_to_app</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-title>{{ $t('documents.labels.view_supplements') }}</v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="emitEvent('newSupplement', props.item, props.index)">
                  <v-list-tile-action>
                    <v-icon>directions_run</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-title>{{ $t('documents.labels.new_contract_supplement') }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </td>
        </tr>
      </v-hover>
    </template>

    <template slot="expand" slot-scope="props">
      <div class="row-detail-wrapper clickable">
        <template v-if="$vuetify.breakpoint[headers[1].hidden] && props.item.model">
          <v-layout justify-space-between align-center>
            <strong>{{ headers[1].text }}:</strong>
            <span class="text-xs-right">{{ props.item.model.no }}</span>
          </v-layout>
          <v-divider class="row-detail-divider"/>
        </template>

        <template v-if="$vuetify.breakpoint[headers[2].hidden]">
          <v-layout justify-space-between align-center>
            <strong>{{ headers[2].text }}:</strong>
            <span class="text-xs-right">{{ props.item.file_name }}</span>
          </v-layout>
          <v-divider class="row-detail-divider"/>
        </template>

        <template v-if="$vuetify.breakpoint[headers[3].hidden]">
          <v-layout justify-space-between align-center>
            <strong>{{ headers[3].text }}:</strong>
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

        <template v-if="$vuetify.breakpoint[headers[4].hidden] && props.item.model">
          <v-layout justify-space-between align-center>
            <strong>{{ headers[4].text }}:</strong>
            <span class="text-xs-right">{{ props.item.model.date.slice(0, 10) }}</span>
          </v-layout>
          <v-divider class="row-detail-divider"/>
        </template>

        <template
          v-if="$vuetify.breakpoint[headers[5].hidden] && props.item.model && props.item.model.client"
        >
          <v-layout justify-space-between align-center>
            <strong>{{ headers[5].text }}:</strong>
            <span class="text-xs-right">{{ props.item.model.client.name }}</span>
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
  name: 'ContractsTable',

  mixins: [tableMixin],

  props: {
    pagination: Object
  },

  computed: {
    headers() {
      return [
        { text: this.$t('general.no'), sortable: false, hidden: 'smAndDown' },
        {
          text: this.$t('documents.labels.doc_no'),
          sortable: false,
          hidden: 'xsOnly'
        },
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
        { text: this.$t('general.client'), sortable: false, hidden: 'xsOnly' }
      ];
    }
  },

  methods: {
    viewSupplements(item) {
      this.$router.push({
        name: 'contract-supplements',
        params: { id: item.id }
      });
    }
  }
};
</script>
