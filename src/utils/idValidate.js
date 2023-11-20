
export function IdCardValidate(idCard) {
  const idCards = trim(idCard.replace(/ /g, ''));
  if (idCard.length === 15) {
    return isValidityBrithBy15IdCard(idCards);
  } else if (idCards.length === 18) {
    const idCardS = idCards.split(''); // 得到身份证数组
    if (isValidityBrithBy18IdCard(idCards) && isTrueValidateCodeBy18IdCard(idCardS)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }

  function isTrueValidateCodeBy18IdCard(aIdCard) {
    const Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];
    const ValideCode = ['1', '0', '10', '9', '8', '7', '6', '5', '4', '3', '2'];
    let sum = 0;
    const AidCard = aIdCard;
    if (AidCard[17].toLowerCase() === 'x') {
      AidCard[17] = '10';
    }
    for (let i = 0; i < 17; i += 1) {
      sum += Wi[i] * AidCard[i];
    }
    const valCodePosition = sum % 11;
    if (AidCard[17] === ValideCode[valCodePosition]) {
      return true;
    } else {
      return false;
    }
  }

  function isValidityBrithBy18IdCard(idCard18) {
    const year = idCard18.substring(6, 10);
    const month = idCard18.substring(10, 12);
    const day = idCard18.substring(12, 14);
    const tempDate = new Date(year, parseFloat(month) - 1, parseFloat(day));
// 这里用getFullYear()获取年份，避免千年虫问题
    if (tempDate.getFullYear()
      !== parseFloat(year)
      || tempDate.getMonth()
      !== parseFloat(month) - 1
      || tempDate.getDate()
      !== parseFloat(day)) {
      return false;
    } else {
      return true;
    }
  }

  function isValidityBrithBy15IdCard(idCard15) {
    const year = idCard15.substring(6, 8);
    const month = idCard15.substring(8, 10);
    const day = idCard15.substring(10, 12);
    const tempDate = new Date(year, parseFloat(month) - 1, parseFloat(day));
    if (tempDate.getYear()
      !== parseFloat(year) ||
      tempDate.getMonth()
      !== parseFloat(month) - 1 || tempDate.getDate() !== parseFloat(day)) {
      return false;
    } else {
      return true;
    }
  }
  function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, '');
  }
}

export function getIdCardInfo(idCard) {
  let len = idCard.length
  let sex = null;
  let birth = null;
  let myDate = new Date();
  let month = myDate.getMonth() + 1;
  let day = myDate.getDate();
  let age = 0;

  if(len === 18){
    age = myDate.getFullYear() - idCard.substring(6, 10) - 1;
    sex = idCard.substring(16,17);
    birth = idCard.substring(6,10) + "-" + idCard.substring(10,12) + "-" + idCard.substring(12,14);
    if (idCard.substring(10, 12) < month || idCard.substring(10, 12) == month && idCard.substring(12, 14) <= day) age++;
  }
  if(len === 15){
    age = myDate.getFullYear() - idCard.substring(6, 8) - 1901;
    sex = idCard.substring(13,14);
    birth = "19"+ idCard.substring(6,8) + "-" + idCard.substring(8,10) + "-" + idCard.substring(10,12);
    if (idCard.substring(8, 10) < month || idCard.substring(8, 10) == month && idCard.substring(10, 12) <= day) age++;
  }
  //1 男 2 女
  if(sex%2 === 0)
    sex = '2';
  else
    sex = '1';
  let idCardInfo = {}
  idCardInfo.sex = sex;
  idCardInfo.age = age;
  idCardInfo.birthday = birth;
  return idCardInfo
}

export function getSexForCard(idCard) {
  var inputStr = str.toString();
  var sex;
  if (inputStr.length == 18) {
    sex = inputStr.charAt(16);
    if (sex % 2 == 0) {
      return 2;
    } else {
      return 1;
    }
  } else {
    sex = inputStr.charAt(14);
    if (sex % 2 == 0) {
      return 2;
    } else {
      return 1;
    }
  }
}
