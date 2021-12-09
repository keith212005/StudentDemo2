import axios from 'axios';
import {Api} from '@constants';

export function getData(data) {
  var type = data.contentType || undefined;
  const api_config = {
    method: data.method || 'post',
    baseURL: data.baseURL || Api.BASE_URL,
    transformRequest: [
      function (data) {
        if (data != undefined && type == undefined) {
          console.log('body json params ', data);
          return JSON.stringify(data);
        } else if (data != undefined && type != undefined) {
          var formData = new FormData();
          for (var i in data) {
            formData.append(i, data[i]);
          }
          console.log('body multipart params :', data);
          return formData;
        }
      },
    ],
    transformResponse: [
      function (data) {
        return data;
      },
    ],
    headers: {
      Accept: 'application/json',
      'Content-Type': type || 'application/json',
      'x-access-token': data.token || '',
    },
    validateStatus: function (status) {
      return status;
    },
    ...data,
  };

  return axios(api_config)
    .then((response) => {
      console.log('response >>> ', response);
      return response;
    })
    .catch((error) => {
      console.log(' error ', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx

        return {
          status: error.response.status,
          message: error.message,
        };
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error ', error.message);
        return {status: 500, message: error['message']};
      }
    });
}
