import React, { Component } from 'react';
import qs from 'qs';
import { bridge } from 'client/utils/index.js';
import DataReportCenter from 'client/utils/DataReportCenter.js';

const uuidv4 = require('uuid/v4');

// eslint-disable-next-line import/prefer-default-export
export const DataReportComponent = pageType => WrappedComponent => class extends Component {
  componentDidMount() {
    const { uid, device_code } = bridge.getAppInfo();
    // eslint-disable-next-line no-restricted-globals
    const query = qs.parse(location.search.substr(1));
    let uuid = localStorage.getItem("uuid");
    if (!uuid) {
      uuid = uuidv4();
      localStorage.setItem("uuid", uuidv4());
    }
    // eslint-disable-next-line no-nested-ternary
    const platform = bridge.andriodApp() ? 'android' : bridge.iosApp() ? 'ios' : 'browser';
    DataReportCenter.send({
      events: [{
        '@_type': 'custom',
        '@_ts': (+new Date()).toString(),
        pageType,
        uid: `${uid || ''}`,
        linkReferrer: Object.keys(query).length ? `${1}` : `${0}`,
        referrerContent: query.userId ? `${query.userId}` : '',
      },
      ],
      common: {
        '@_device_uuid': device_code || uuid,
        platform,
      },
    });
  }
    dataReportAction=(pageType, action) => {
      // eslint-disable-next-line no-restricted-globals
      const query = qs.parse(location.search.substr(1));
      const { uid, device_code } = bridge.getAppInfo();
      let uuid = window.localStorage.getItem("uuid");
      if (!uuid) {
        uuid = uuidv4();
        window.localStorage.setItem("uuid", uuidv4());
      }
      // eslint-disable-next-line max-len
      // eslint-disable-next-line no-nested-ternary
      const platform = bridge.andriodApp() ? 'android' : bridge.iosApp() ? 'ios' : 'browser';
      // eslint-disable-next-line max-len
      const common = { bizType: 'h5action', action, platform, '@_device_uuid': device_code || uuid };
      DataReportCenter.send({
        events: [{
          '@_type': 'custom',
          '@_ts': (+new Date()).toString(),
          pageType,
          uid: `${uid || ''}`,
          linkReferrer: Object.keys(query).length ? `${1}` : `${0}`,
          referrerContent: query.userId ? `${query.userId}` : '',
        }],
        common,
      });
    }
    render() {
      const { dataReportAction } = this;
      // eslint-disable-next-line max-len
      return <WrappedComponent dataReportAction={dataReportAction} {...this.props} />;
    }
};
