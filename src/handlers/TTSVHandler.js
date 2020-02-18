import * as HttpClient from 'core/services/HttpClient';
import { logger } from 'core/services/Apploger';

export const GetListWithFilter = async filter => {
  const { type, hk, nh } = filter;
  const url = `xnsv/ttsv?type=${type}&hk=${hk}&nh=${nh}`;
  const response = await HttpClient.sendPut(url);
  return response;
};

// export const UpdateOneStudentByType = async (data, type) => {
//   const url = `ttluutru/sv`;
//   const keys = { data, type };
//   const response = await HttpClient.sendPost(url, keys);
//   return response;
// };

export const ExportWithFilter = async (filter) => {
    const { type, hk, nh } = filter;
    const url = `xnsv/ttsv?type=${type}&hk=${hk}&nh=${nh}`;
  
    const response = await HttpClient.sendPatch(url);
  
    return response;
  };
  