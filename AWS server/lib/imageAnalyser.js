'use strict';

const AWS = require('aws-sdk');

const rek = new AWS.Rekognition();

class ImageAnalyser {

  static getImageLabels(s3Config) {
    // var params = {
    //   Image: { /* required */
    //     // Bytes: new Buffer('...') /* Strings will be Base-64 encoded on your behalf */,
    //     S3Object: {
    //       Bucket: 's3Config.bucket',
    //       Name: 's3Config.imageName',
    //     }
    //   },
    //   MaxLabels: 0,
    //   MinConfidence: 0.0
    // };

    const params = {
      Image: {
        S3Object: {
          Bucket: s3Config.bucket,
          Name: s3Config.imageName,
        },
      }
      // MaxLabels: 0,
      // MinConfidence: 0.0,
    };

    console.log(`Analyzing file: https://s3.amazonaws.com/${s3Config.bucket}/${s3Config.imageName}`);

    return new Promise((resolve, reject) => {
      rek.detectText(params, (err, data) => {
        if (err) {
          return reject(new Error(err));
        }
        console.log('Analysis labels:', data.TextDetections);
        return resolve(data.TextDetections);
      });
    });
  }
}

module.exports = ImageAnalyser;
