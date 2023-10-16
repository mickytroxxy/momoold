import crypto from 'crypto';

const decrypt = (payloadBase64: any) => {
  console.log(`decryption called `)
  const clientPayload = Buffer.from(payloadBase64, 'base64').toString('hex');
  const client_iv = clientPayload.substr(0, 32);
  const client_encrypted = clientPayload.substr(
    32,
    clientPayload.length - 32 - 32,
  );
  const client_auth_tag = clientPayload.substr(clientPayload.length - 32, 32);

  console.table({
    client_iv,
    client_encrypted,
    client_auth_tag,
  });

  try {
    let clientSharedKey =
      'a2e2ba029c581b3ee35fd804bc1231358cf44e6efbf54795fc6ce00397a15d3d';
    const decipher = crypto.createDecipheriv(
      'aes-256-gcm',
      Buffer.from(clientSharedKey, 'hex'),
      Buffer.from(client_iv, 'hex'),
    );
    // console.log('decipher', decipher);

    decipher.setAuthTag(Buffer.from(client_auth_tag, 'hex'));

    let decrypted = decipher.update(client_encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return JSON.parse(decrypted);
  } catch (error) {
    console.log('ERROR: ', error);
  }
};

export default decrypt