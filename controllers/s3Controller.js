const fs = require('fs');
const AWS = require('aws-sdk');
// const superagent = require('superagent');
// const fetch = require('node-fetch');

// const dotenv = require('dotenv');

const catchAsync = require('../utilites/catchAsync');
const AppError = require('../utilites/appError');

// dotenv.config({ path: './config.env' });
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESSKEY_ID,
  secretAccessKey: process.env.AWS_SECERT_ACCESS_KEY,
});

const s3 = new AWS.S3({
  region: 'us-east-1',
});

// let OurUrl;

// const uploadFile = catchAsync(async (fileName) => {
//   const fileContent = fs.readFileSync(fileName);
//   const params = {
//     Bucket: process.env.AWS_BUCKET_NAME,
//     Key: 'CuteDog.jpg',
//     Expires: 600,
//     ContentType: 'image/jpg',
//     ACL: 'public-read',
//   };
//   const OurUrl = await s3.getSignedUrlPromise('putObject', params);
//   console.log(OurUrl);
//   const data = await (await superagent.post(OurUrl)).send(fileContent);
//   console.log(data);
// });
// uploadFile(`${__dirname}/GoodDog.jpg`);

const uploadFile = (fileName, content, heading, contentType) => {
  const fileContent = fs.readFileSync(fileName);
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${heading.split(' ').join('')}.${content}`,
    Body: fileContent,
    ContentType: contentType,
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

exports.s3Upload = catchAsync(async (req, res, next) => {
  if (!req.body.multimedia) return next();
  const lastIndex = req.body.multimedia.lastIndexOf('.');
  if (lastIndex === -1) {
    return next(new AppError('Please upload an appropiate file', 400));
  }
  const content = req.body.multimedia.slice(lastIndex + 1);
  let contentType;
  if (content === 'jpeg' || content === 'jpg') {
    contentType = `image/${content}`;
  } else if (content === 'mp4') {
    contentType = `videp/${content}`;
  } else {
    return next(new AppError('Please upload an appropiate file', 400));
  }

  const data = await uploadFile(
    req.body.multimedia,
    content,
    req.body.heading,
    contentType
  );
  req.body.multimedia = data.Location;
  next();
});
