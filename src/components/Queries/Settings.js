import { gql } from 'apollo-boost';

// Save setting
export const SAVE_SETTINGS = gql`
  mutation saveSettings($settings: [SettingsInput]) {
    saveSettings(settings: $settings) {
      statusCode
      data
    }
  }
`;

export const GET_SETTINGS_PREFIX = gql`
  query getSettingsByCodePrefix($codePrefix: String!) {
    getSettingsByCodePrefix(codePrefix: $codePrefix) {
      totalElements,
      list {
        code,
        value,
        description
      }
    }
  }
`; 