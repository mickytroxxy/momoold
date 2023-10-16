import crypto from 'crypto';

// USED FOR PAYLOAD ENCRYPTION
const encrypt = async (payloadData: any | {}) => {
  let data = JSON.stringify(payloadData);

  try {
    const IV = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
      'aes-256-gcm',
      Buffer.from(`a2e2ba029c581b3ee35fd804bc1231358cf44e6efbf54795fc6ce00397a15d3d`, 'hex'),
      IV,
    );

    let encrypted = cipher.update(data, 'utf8', 'hex');

    encrypted += cipher.final('hex');

    const auth_tag = cipher.getAuthTag().toString('hex');
    console.table({
      IV: IV.toString('hex'),
      encrypted: encrypted,
      auth_tag: auth_tag,
    });

    const payload = IV.toString('hex') + encrypted + auth_tag;

    const encryptedData = Buffer.from(payload, 'hex').toString('base64');
    console.log('PayloadBase64: ', encryptedData);

    return encryptedData;
  } catch (error) {
    // handleCatch(error)
    console.log('error', error);
  }
};

export default encrypt;
