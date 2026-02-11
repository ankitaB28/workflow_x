


export function camelToSnake(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(item => camelToSnake(item));
  }

  if (obj !== null && typeof obj === 'object' && !(obj instanceof Date)) {
    return Object.keys(obj).reduce((result: any, key: string) => {
      const snakeKey = key
        .replace(/([A-Z])/g, '_$1')
        .toLowerCase();

      result[snakeKey] = camelToSnake(obj[key]);
      return result;
    }, {});
  }

  return obj;
}


export function snakeToCamel(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(item => snakeToCamel(item));
  }

  if (obj !== null && typeof obj === 'object' && !(obj instanceof Date)) {
    return Object.keys(obj).reduce((result: any, key: string) => {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) =>
        letter.toUpperCase()
      );

      result[camelKey] = snakeToCamel(obj[key]);
      return result;
    }, {});
  }

  return obj;
}
