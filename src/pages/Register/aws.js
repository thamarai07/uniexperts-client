import AWS from 'aws-sdk';

AWS.config.update({
  region: 'us-east-1',
  accessKeyId: 'AKIAVN5B7DYHDLFN5KVM',
  secretAccessKey: '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',
});

export default new AWS.S3();
