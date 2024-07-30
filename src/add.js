
import cloneDeep from 'lodash/cloneDeep.js';
import forEach from 'lodash/forEach.js';
import isEqual from 'lodash/isEqual.js';
import startsWith from 'lodash/startsWith.js';
import remove from 'lodash/remove.js';

export const cleanObject = (obj, fieldName, removeNull) => {
  const object = cloneDeep(obj);
  forEach(object, (_value, _key) => {
    if (isEqual(typeof _value, "object")) {
      object[_key] = cleanObject(_value, fieldName, removeNull);
    }

    if (
      startsWith(_key, "_") ||
      (fieldName && isEqual(_key, fieldName)) ||
      (removeNull && _value === undefined) ||(removeNull && _value === null)
    ) {
      delete object[_key];
    }
    
  });
  return object;
};

export const removeInactiveRoles = (roles) => {
  remove(roles, (el) => {
    return el.roleType === "inactive" || el.roleDisplay === ""||el.roleType===null||el.roleType===""||el.roleDisplay===null||el.roleType===undefined;
  });
  return roles;
};



export function calculateTotalPrice(items, discount = 0) {
  if (!Array.isArray(items) || items.length === 0) {
      throw new Error('Items must be a non-empty array');
  }

  if (typeof discount !== 'number' || discount < 0 || discount > 100) {
      throw new Error('Discount must be a number between 0 and 100');
  }

  const total = items.reduce((sum, item) => {
      if (typeof item.price !== 'number' || typeof item.quantity !== 'number') {
          throw new Error('Each item must have valid price and quantity');
      }
      return sum + (item.price * item.quantity);
  }, 0);

  const discountedTotal = total * (1 - discount / 100);
  return Number(discountedTotal.toFixed(2));
}