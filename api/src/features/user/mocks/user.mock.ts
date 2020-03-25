/*eslint-disable */
export const user = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe5234@email.com',
  password: 'PJTjthaX2kSM8hvG',
}

export const invalidEmails = [
  '#@%^%#$@#$@#.com',
  '@example.com',
  'Joe Doe <email@example.com>',
  'email@example.com (Joe Doe)',
  'email.example.com',
  'email@example@example.com',
  '.email@example.com',
  'email.@example.com',
  'email..email@example.com',
  'email@example',
  'email@example..com',
  'Abc..123@example.com',
]

export const invalidPasswords = [
  '1234',
  'hallo123',
  'AD63KE8RE52DL834',
  '193"$874$§%)"=62',
]

export const injectionAttacks = ['']

export const dataSourceExample = {
  title: 'Manufacturing Data Example',
  description: 'Example to showcase how to query data from an api call.',
  data: {
    request: {
      url: 'https://mock.blicc.org/manufacturing-data',
      headers: [],
    },
    query:
      "{labels: ['Shift 1', 'Shift 2', 'Shift 3'], datasets: [{label: 'OEE', data: [?date == '2020-01-01T00:00:00.000Z'].oee}, {label: 'Availability', data: [?date == '2020-01-01T00:00:00.000Z'].availability}, {label: 'Performance', data: [?date == '2020-01-01T00:00:00.000Z'].performance}, {label: 'Quality', data: [?date == '2020-01-01T00:00:00.000Z'].quality}]}",
  },
  persistData: false,
  fetchFrequency: 86400000,
}

export const dataSourceExampleTwo = {
  title: 'Manufacturing Data Overtime Example',
  description: 'Example to showcase how to query data from an api call.',
  data: {
    request: {
      url: 'https://mock.blicc.org/manufacturing-data',
      headers: [],
    },
    query:
      "{datasets: [{label: 'Shift 1', data: [?shift == `1`].{x: date, y: oee}}, {label: 'Shift 2', data: [?shift == `2`].{x: date, y: oee}}, {label: 'Shift 3', data: [?shift == `3`].{x: date, y: oee}}]}",
  },
  persistData: false,
  fetchFrequency: 86400000,
}

export const dashboardExample = {
  title: '	Manufacturing Data Example',
  description:
    'A simple example to showcase a way to visualise manufacturing data.',
  data: {
    arrangement: {
      direction: 'column',
      items: [
        {
          direction: 'row',
          items: [
            { id: '54e7932b-e246-415d-ab1a-eda5411a9033' },
            { id: 'ee76dfb4-8328-41b7-a628-9a9a01f2169a' },
          ],
        },
        { id: '733ee4d4-8815-415a-bc8b-df348f99ed77' },
      ],
    },
    settings: {
      '54e7932b-e246-415d-ab1a-eda5411a9033': {
        data_source: 'r3K3PSi9N',
        chart_type: 'essentials/BarChart',
        plugin_settings: '',
      },
      '733ee4d4-8815-415a-bc8b-df348f99ed77': {
        chart_type: 'essentials/LineChart',
        data_source: 'eYGmA1NtT',
        plugin_settings: { unit: { xAxis: 'time', yAxis: 'number' } },
      },
      'ee76dfb4-8328-41b7-a628-9a9a01f2169a': {
        chart_type: 'essentials/PieChart',
        data_source: 'r3K3PSi9N',
        plugin_settings: '',
      },
    },
  },
}
/*eslint-enable */
