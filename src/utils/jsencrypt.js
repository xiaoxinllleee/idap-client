import JsEncrypt from 'jsencrypt'

const publicKey = '-----BEGIN PUBLIC KEY-----\n' +
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDrEnuWnAC0xJyAklYO6YJTadwh\n' +
  '/EcvQZm5Rknh2+7x76qc9qywQDJehTp0YzF0eoDEAZiaGiQXB3QQ40m/EcX88cQN\n' +
  'j6En80YL1bNxUJl1zuUKCfDVNwEcS1xvB+BEF9TVx9cv/STUnl/U97XZf930u1uv\n' +
  'bZHVcVOD1Hg1vFrMJQIDAQAB\n' +
  '-----END PUBLIC KEY-----'

const privateKey = '-----BEGIN PRIVATE KEY-----\n' +
  'MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBAOsSe5acALTEnICS\n' +
  'Vg7pglNp3CH8Ry9BmblGSeHb7vHvqpz2rLBAMl6FOnRjMXR6gMQBmJoaJBcHdBDj\n' +
  'Sb8RxfzxxA2PoSfzRgvVs3FQmXXO5QoJ8NU3ARxLXG8H4EQX1NXH1y/9JNSeX9T3\n' +
  'tdl/3fS7W69tkdVxU4PUeDW8WswlAgMBAAECgYEAr1rCRr9o53AjLuX6vHUEeyTk\n' +
  'yZVfpKjS+5qrUoi13lRieWSpvXCmIkxQJrI4GiOoGo72Pz5w3Zz5v/9M6/NeNLw3\n' +
  '6SeZ8rGkqNPiiknZq0d8hMSNz75SejTV5SnLL4cWG3h3/nACC0vkSOG0iHpIdTp4\n' +
  'dQtKh7Hmq9nPOoFlT6ECQQD5t13RZs11ZFmCILj/GW3QFwBos7cSfq2Dibu2I4t1\n' +
  'tm9AKzjrQk+9+e21yBSh7tDpCcsxO1J2geC+PjzqlJ1PAkEA8PzICvUNed0IntW2\n' +
  '3v1NZ14UrwHxtz6QwiAQXMC8ZEHT1THwvoSUo31hLD4QXKbLqojwkvjePQ7k+trl\n' +
  'q/JqSwJBAO5FJZK52c9qefGtUXevhtVoLS66VDOkheGd2WtYjSg7c/mxhDUOZ9Io\n' +
  'mMW77Nv6aIIDo0sNhIipMo20CyH1vgcCQH9z4cTRx/fMq/N9akNTSm3B90R7zcAx\n' +
  'idPxq1Wy5bBMlGFsETxh2E8DT7JbfMHTwWGHHV1N3BQE3ZvCy7d99TMCQQD020lr\n' +
  'mZVcNpxJ23yAse0pcHw4hTamUFKZStqFawTxn+B5aj8si20TgscI/8EI64o8nUqx\n' +
  'DnetloDdWXtn9pF4\n' +
  '-----END PRIVATE KEY-----\n'

//加密
export function encryptedData(data) {
  // 新建JSEncrypt对象
  let encryptor = new JsEncrypt();
  // 设置公钥
  encryptor.setPublicKey(publicKey);
  // 加密数据
  return encryptor.encrypt(data);
}

//解密
export function decryptedData(data) {
  // 新建JSEncrypt对象
  let encryptor = new JsEncrypt();
  // 设置公钥
  encryptor.setPrivateKey(privateKey)
  // 加密数据
  return encryptor.decrypt(data);
}
