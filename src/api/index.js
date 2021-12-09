import axios from 'axios';
import {storageKey} from '@constants';
import {removeData, setMultipleAsyncStorage} from '@storage';
import {getData} from './getData';

export function callApi(api_inputs) {
  return new Promise((resolve, reject) => {
    var api_container = [];
    api_inputs.map((item, index) => {
      api_container.push(getData(item));
      if (index == api_inputs.length - 1) {
        axios.all(api_container).then(
          axios.spread((...response) => {
            handleApiResponse(response)
              .then(value => {
                resolve(value);
              })
              .catch(error => {
                reject(error);
              });
          }),
        );
      }
    });
  });
}

function handleApiResponse(response) {
  return new Promise((resolve, reject) => {
    var api_response = [];

    //check if any api return server error or not
    const is_success = response.every((val, index) => {
      if (val.status == 200) {
        //check if any api return api side error or not
        const data = JSON.parse(val.data);
        console.log('response of api >>>>>> ', data);

        if (
          data.status != 200 ||
          (Object.keys(data).length === 0 && data.constructor === Object)
        ) {
          if (data.status == 403 || data.status == 501) {
            data.status = 403;
            let keys = [
              storageKey.USER_ID,
              storageKey.TOKEN,
              storageKey.FIRST_NAME,
              storageKey.LAST_NAME,
              storageKey.COUNTRY_CODE,
              storageKey.PHONE_NUMBER,
              storageKey.USER_PROFILE,
              storageKey.GENDER,
            ];
            removeData(keys).then(data => {
              setMultipleAsyncStorage([
                [storageKey.INITIAL_SCREEN_NAME, 'Login'],
              ]);
            });
          }
          reject({
            message: data.message,
            status: data.status,
            index: index,
            data: data.data,
          });

          return false;
        } else {
          api_response.push(data);
          return true;
        }
      } else {
        console.log('val >>>> ', val);
        if (typeof val === 'Object') {
          if (!val.hasOwnProperty('message')) {
            val.message = '';
          }
        } else {
          val = {message: ''};
        }

        reject({message: `server error ${val.message}`, index: index});
        return false;
      }
    });

    Promise.all(is_success).then(() => resolve(api_response));
  });
}
