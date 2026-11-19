import bcrypt from 'bcryptjs';

const origin = `Error file origins at ${import.meta.dirname} encryptor.js`;
const encryptPassword = async (pass) => {
  try {
    let passWord = await bcrypt.hash(pass, 10);
    return passWord;
  } catch (err) {
    console.log(origin);
    throw err;
  }
};

const verify = async (current, saved) => {
  const response = await bcrypt.compare(current, saved);
  return response;
};
export { encryptPassword, verify };
